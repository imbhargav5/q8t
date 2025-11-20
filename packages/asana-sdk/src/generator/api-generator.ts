import type { OpenAPISpec, Operation, Parameter, RefObject, SchemaObject } from "./parser";
import { isRefObject, resolveRef } from "./parser";

interface EndpointInfo {
  operationId: string;
  method: string;
  path: string;
  pathParams: Parameter[];
  queryParams: Parameter[];
  requestBodyType?: string;
  responseType: string;
  summary?: string;
  description?: string;
  tags?: string[];
}

export function generateApi(spec: OpenAPISpec): string {
  const endpoints = extractEndpoints(spec);

  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    "// Generated from api/asana_oas.yaml",
    "",
    'import type { HttpClient } from "../src/auth/pat-client";',
    'import type * as Types from "./types";',
    "",
    "/**",
    " * Asana API client with all available endpoints",
    " * ",
    " * This class provides type-safe access to all Asana API endpoints.",
    " * Use createPATClient or createOAuth2Client to create an authenticated HTTP client,",
    " * then pass it to this class constructor.",
    " */",
    "export class AsanaApi {",
    "  private client: HttpClient;",
    "",
    "  constructor(client: HttpClient) {",
    "    this.client = client;",
    "  }",
    "",
  ];

  for (const endpoint of endpoints) {
    lines.push(generateMethod(endpoint));
    lines.push("");
  }

  lines.push("}");

  return lines.join("\n");
}

function extractEndpoints(spec: OpenAPISpec): EndpointInfo[] {
  const endpoints: EndpointInfo[] = [];

  for (const [path, pathItem] of Object.entries(spec.paths)) {
    const methods = ["get", "post", "put", "delete", "patch"] as const;

    for (const method of methods) {
      const operation = pathItem[method];
      if (operation) {
        endpoints.push(extractEndpointInfo(path, method.toUpperCase(), operation, pathItem.parameters));
      }
    }
  }

  return endpoints;
}

function extractEndpointInfo(
  path: string,
  method: string,
  operation: Operation,
  pathLevelParams?: Array<Parameter | RefObject>,
): EndpointInfo {
  const pathParams: Parameter[] = [];
  const queryParams: Parameter[] = [];

  // Extract path parameters directly from the path string (e.g., {task_gid})
  const pathParamMatches = path.match(/\{([^}]+)\}/g);
  if (pathParamMatches) {
    for (const match of pathParamMatches) {
      const paramName = match.slice(1, -1); // Remove { and }
      // Create a basic parameter object
      pathParams.push({
        name: paramName,
        in: "path",
        required: true,
        schema: { type: "string" },
      });
    }
  }

  // Process operation-level parameters for query params
  if (operation.parameters) {
    for (const param of operation.parameters) {
      if (param.in === "query") {
        queryParams.push(param);
      }
      // Path params are already extracted from the path string
    }
  }

  let requestBodyType: string | undefined;
  if (operation.requestBody?.content["application/json"]) {
    const schema = operation.requestBody.content["application/json"].schema;
    requestBodyType = getTypeName(schema);
  } else if (operation.requestBody?.content["application/x-www-form-urlencoded"]) {
    const schema = operation.requestBody.content["application/x-www-form-urlencoded"].schema;
    requestBodyType = getTypeName(schema);
  }

  let responseType = "void";
  const successResponse =
    operation.responses["200"] || operation.responses["201"] || operation.responses["204"];
  if (successResponse?.content?.["application/json"]) {
    const schema = successResponse.content["application/json"].schema;
    responseType = getTypeName(schema);
  }

  return {
    operationId: operation.operationId,
    method,
    path,
    pathParams,
    queryParams,
    requestBodyType,
    responseType,
    summary: operation.summary,
    description: operation.description,
    tags: operation.tags,
  };
}

function getTypeName(schema: SchemaObject | RefObject): string {
  if (isRefObject(schema)) {
    return `Types.${resolveRef(schema.$ref)}`;
  }

  // Handle inline schemas
  if (schema.type === "array" && schema.items) {
    const itemType = getTypeName(schema.items);
    return `${itemType}[]`;
  }

  if (schema.type === "object") {
    return "Record<string, unknown>";
  }

  return "unknown";
}

function generateMethod(endpoint: EndpointInfo): string {
  const lines: string[] = [];

  // Generate JSDoc comment
  lines.push("  /**");
  if (endpoint.summary) {
    lines.push(`   * ${endpoint.summary}`);
    if (endpoint.description) {
      lines.push("   * ");
      lines.push(`   * ${endpoint.description}`);
    }
  } else if (endpoint.description) {
    lines.push(`   * ${endpoint.description}`);
  }

  // Add parameter docs
  for (const param of endpoint.pathParams) {
    lines.push(
      `   * @param ${param.name.replace(/-/g, "_")} - ${param.description || "Path parameter"}`,
    );
  }
  if (endpoint.requestBodyType) {
    lines.push("   * @param body - Request body");
  }
  if (endpoint.queryParams.length > 0) {
    lines.push("   * @param params - Query parameters");
  }

  lines.push("   */");

  // Generate method signature
  const params = generateMethodParams(endpoint);
  const methodName = endpoint.operationId;

  lines.push(`  async ${methodName}(${params}): Promise<${endpoint.responseType}> {`);

  // Generate path with replacements
  let pathExpr = `"${endpoint.path}"`;
  for (const param of endpoint.pathParams) {
    const safeName = param.name.replace(/-/g, "_");
    pathExpr = pathExpr.replace(`{${param.name}}`, `\${${safeName}}`);
  }
  if (endpoint.pathParams.length > 0) {
    pathExpr = `\`${pathExpr.slice(1, -1)}\``;
  }

  // Generate method body
  if (endpoint.method === "GET") {
    if (endpoint.queryParams.length > 0) {
      lines.push(`    if (params) {`);
      lines.push(`      return this.client.get<${endpoint.responseType}>(${pathExpr}, {`);
      for (const param of endpoint.queryParams) {
        const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
        lines.push(`        "${param.name}": params.${safeName},`);
      }
      lines.push("      });");
      lines.push(`    }`);
      lines.push(`    return this.client.get<${endpoint.responseType}>(${pathExpr});`);
    } else {
      lines.push(`    return this.client.get<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "POST") {
    if (endpoint.requestBodyType) {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    if (params) {`);
        lines.push(`      return this.client.post<${endpoint.responseType}>(${pathExpr}, { data: body }, {`);
        for (const param of endpoint.queryParams) {
          const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
          lines.push(`        "${param.name}": params.${safeName},`);
        }
        lines.push("      });");
        lines.push(`    }`);
        lines.push(`    return this.client.post<${endpoint.responseType}>(${pathExpr}, { data: body });`);
      } else {
        lines.push(`    return this.client.post<${endpoint.responseType}>(${pathExpr}, { data: body });`);
      }
    } else {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    if (params) {`);
        lines.push(
          `      return this.client.post<${endpoint.responseType}>(${pathExpr}, undefined, {`,
        );
        for (const param of endpoint.queryParams) {
          const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
          lines.push(`        "${param.name}": params.${safeName},`);
        }
        lines.push("      });");
        lines.push(`    }`);
        lines.push(`    return this.client.post<${endpoint.responseType}>(${pathExpr});`);
      } else {
        lines.push(`    return this.client.post<${endpoint.responseType}>(${pathExpr});`);
      }
    }
  } else if (endpoint.method === "PUT") {
    if (endpoint.requestBodyType) {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    if (params) {`);
        lines.push(`      return this.client.put<${endpoint.responseType}>(${pathExpr}, { data: body }, {`);
        for (const param of endpoint.queryParams) {
          const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
          lines.push(`        "${param.name}": params.${safeName},`);
        }
        lines.push("      });");
        lines.push(`    }`);
        lines.push(`    return this.client.put<${endpoint.responseType}>(${pathExpr}, { data: body });`);
      } else {
        lines.push(`    return this.client.put<${endpoint.responseType}>(${pathExpr}, { data: body });`);
      }
    } else {
      lines.push(`    return this.client.put<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "DELETE") {
    if (endpoint.queryParams.length > 0) {
      lines.push(`    if (params) {`);
      lines.push(`      return this.client.delete<${endpoint.responseType}>(${pathExpr}, {`);
      for (const param of endpoint.queryParams) {
        const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
        lines.push(`        "${param.name}": params.${safeName},`);
      }
      lines.push("      });");
      lines.push(`    }`);
      lines.push(`    return this.client.delete<${endpoint.responseType}>(${pathExpr});`);
    } else {
      lines.push(`    return this.client.delete<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "PATCH") {
    if (endpoint.requestBodyType) {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    if (params) {`);
        lines.push(`      return this.client.put<${endpoint.responseType}>(${pathExpr}, { data: body }, {`);
        for (const param of endpoint.queryParams) {
          const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
          lines.push(`        "${param.name}": params.${safeName},`);
        }
        lines.push("      });");
        lines.push(`    }`);
        lines.push(`    return this.client.put<${endpoint.responseType}>(${pathExpr}, { data: body });`);
      } else {
        lines.push(`    return this.client.put<${endpoint.responseType}>(${pathExpr}, { data: body });`);
      }
    }
  }

  lines.push("  }");

  return lines.join("\n");
}

function generateMethodParams(endpoint: EndpointInfo): string {
  const params: string[] = [];

  // Path parameters
  for (const param of endpoint.pathParams) {
    const safeName = param.name.replace(/-/g, "_");
    params.push(`${safeName}: string`);
  }

  // Request body
  if (endpoint.requestBodyType) {
    const isRequired = !!endpoint.requestBodyType;
    params.push(`body${isRequired ? "" : "?"}: ${endpoint.requestBodyType}`);
  }

  // Query parameters (as optional object)
  if (endpoint.queryParams.length > 0) {
    const queryParamTypes: string[] = [];
    for (const param of endpoint.queryParams) {
      const tsType =
        param.schema.type === "integer" || param.schema.type === "number"
          ? "number"
          : param.schema.type === "boolean"
            ? "boolean"
            : param.schema.type === "array"
              ? "string[]"
              : "string";
      const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
      queryParamTypes.push(`${safeName}?: ${tsType}`);
    }
    params.push(`params?: { ${queryParamTypes.join("; ")} }`);
  }

  return params.join(", ");
}
