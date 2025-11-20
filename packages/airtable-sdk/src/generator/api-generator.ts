import type { OpenAPISpec, Operation, Parameter, RefObject, SchemaObject } from "./parser";
import { resolveRef, isRefObject } from "./parser";

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
}

export function generateApi(spec: OpenAPISpec, className: string, clientType: "PAT" | "OAuth"): string {
  const endpoints = extractEndpoints(spec);

  const clientImport = clientType === "PAT"
    ? 'import type { PATHttpClient } from "../src/auth/pat-client";'
    : 'import type { OAuthHttpClient } from "../src/auth/oauth-client";';

  const clientTypeName = clientType === "PAT" ? "PATHttpClient" : "OAuthHttpClient";

  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    `// Generated from ${spec.info.title}`,
    "",
    clientImport,
    'import type * as Types from "./types";',
    "",
    `export class ${className} {`,
    `  private client: ${clientTypeName};`,
    "",
    `  constructor(client: ${clientTypeName}) {`,
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
        endpoints.push(extractEndpointInfo(path, method.toUpperCase(), operation));
      }
    }
  }

  return endpoints;
}

function extractEndpointInfo(path: string, method: string, operation: Operation): EndpointInfo {
  const pathParams: Parameter[] = [];
  const queryParams: Parameter[] = [];

  if (operation.parameters) {
    for (const param of operation.parameters) {
      if (param.in === "path") {
        pathParams.push(param);
      } else if (param.in === "query") {
        queryParams.push(param);
      }
    }
  }

  let requestBodyType: string | undefined;
  if (operation.requestBody?.content["application/json"]) {
    const schema = operation.requestBody.content["application/json"].schema;
    requestBodyType = getTypeName(schema);
  }

  let responseType = "void";
  const successResponse = operation.responses["200"] || operation.responses["201"] || operation.responses["204"];
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
  };
}

function getTypeName(schema: SchemaObject | RefObject): string {
  if (isRefObject(schema)) {
    return `Types.${resolveRef(schema.$ref)}`;
  }
  if (schema.type === "object") {
    return "Record<string, unknown>";
  }
  return "unknown";
}

function generateMethod(endpoint: EndpointInfo): string {
  const lines: string[] = [];

  // Generate JSDoc comment
  lines.push(`  /**`);
  if (endpoint.summary) {
    lines.push(`   * ${endpoint.summary}`);
  }
  if (endpoint.description && endpoint.description !== endpoint.summary) {
    lines.push(`   * ${endpoint.description}`);
  }
  lines.push(`   */`);

  // Generate method signature
  const params = generateMethodParams(endpoint);
  const methodName = endpoint.operationId;

  lines.push(`  async ${methodName}(${params}): Promise<${endpoint.responseType}> {`);

  // Generate path with replacements
  let pathExpr = `"${endpoint.path}"`;
  for (const param of endpoint.pathParams) {
    pathExpr = pathExpr.replace(`{${param.name}}`, `\${${param.name}}`);
  }
  if (endpoint.pathParams.length > 0) {
    pathExpr = "`" + pathExpr.slice(1, -1) + "`";
  }

  // Generate query params object if needed
  if (endpoint.queryParams.length > 0) {
    lines.push(`    const params: Record<string, string | number | boolean | string[] | undefined> = {};`);
    for (const param of endpoint.queryParams) {
      const safeName = param.name.replace(/[.-]/g, "_");
      lines.push(`    if (queryParams?.${safeName} !== undefined) params["${param.name}"] = queryParams.${safeName};`);
    }
  }

  // Generate method body
  if (endpoint.method === "GET") {
    if (endpoint.queryParams.length > 0) {
      lines.push(`    return this.client.get<${endpoint.responseType}>(${pathExpr}, params);`);
    } else {
      lines.push(`    return this.client.get<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "POST") {
    if (endpoint.requestBodyType) {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    return this.client.post<${endpoint.responseType}>(${pathExpr}, body, params);`);
      } else {
        lines.push(`    return this.client.post<${endpoint.responseType}>(${pathExpr}, body);`);
      }
    } else {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    return this.client.post<${endpoint.responseType}>(${pathExpr}, undefined, params);`);
      } else {
        lines.push(`    return this.client.post<${endpoint.responseType}>(${pathExpr});`);
      }
    }
  } else if (endpoint.method === "PATCH") {
    if (endpoint.requestBodyType) {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    return this.client.patch<${endpoint.responseType}>(${pathExpr}, body, params);`);
      } else {
        lines.push(`    return this.client.patch<${endpoint.responseType}>(${pathExpr}, body);`);
      }
    } else {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    return this.client.patch<${endpoint.responseType}>(${pathExpr}, undefined, params);`);
      } else {
        lines.push(`    return this.client.patch<${endpoint.responseType}>(${pathExpr});`);
      }
    }
  } else if (endpoint.method === "PUT") {
    if (endpoint.requestBodyType) {
      lines.push(`    return this.client.put<${endpoint.responseType}>(${pathExpr}, body);`);
    } else {
      lines.push(`    return this.client.put<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "DELETE") {
    if (endpoint.queryParams.length > 0) {
      lines.push(`    return this.client.delete<${endpoint.responseType}>(${pathExpr}, params);`);
    } else {
      lines.push(`    return this.client.delete<${endpoint.responseType}>(${pathExpr});`);
    }
  }

  lines.push(`  }`);

  return lines.join("\n");
}

function generateMethodParams(endpoint: EndpointInfo): string {
  const params: string[] = [];

  // Path parameters
  for (const param of endpoint.pathParams) {
    params.push(`${param.name}: string`);
  }

  // Request body
  if (endpoint.requestBodyType) {
    params.push(`body: ${endpoint.requestBodyType}`);
  }

  // Query parameters (as optional object)
  if (endpoint.queryParams.length > 0) {
    const queryParamTypes: string[] = [];
    for (const param of endpoint.queryParams) {
      let tsType: string;
      if (param.schema.type === "integer" || param.schema.type === "number") {
        tsType = "number";
      } else if (param.schema.type === "boolean") {
        tsType = "boolean";
      } else if (param.schema.type === "array") {
        tsType = "string[]";
      } else {
        tsType = "string";
      }
      const safeName = param.name.replace(/[.-]/g, "_");
      queryParamTypes.push(`${safeName}?: ${tsType}`);
    }
    params.push(`queryParams?: { ${queryParamTypes.join("; ")} }`);
  }

  return params.join(", ");
}
