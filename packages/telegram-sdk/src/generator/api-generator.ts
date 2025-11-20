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

export function generateApi(spec: OpenAPISpec, apiName: string, clientType: string, typesFile: string): string {
  const endpoints = extractEndpoints(spec);

  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    `// Generated from ${spec.info.title}`,
    "",
    `import type { ${clientType} } from "../src/${apiName}/client";`,
    `import type * as Types from "./${typesFile}";`,
    "",
    `export class ${capitalize(apiName)}Api {`,
    `  private client: ${clientType};`,
    "",
    `  constructor(client: ${clientType}) {`,
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
  if (operation.requestBody) {
    const schema = operation.requestBody.content["application/json"]?.schema;
    if (schema) {
      requestBodyType = isRefObject(schema) ? resolveRef(schema.$ref) : "unknown";
    }
  }

  // Get response type from 200 or 201 response
  let responseType = "void";
  const successResponse = operation.responses["200"] || operation.responses["201"];
  if (successResponse?.content) {
    const schema = successResponse.content["application/json"]?.schema;
    if (schema) {
      const typeName = isRefObject(schema) ? resolveRef(schema.$ref) : schemaToTsType(schema);
      responseType = typeName === "unknown" ? "void" : `Types.${typeName}`;
    }
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

function generateMethod(endpoint: EndpointInfo): string {
  const lines: string[] = [];

  // Generate JSDoc comment
  if (endpoint.summary || endpoint.description) {
    lines.push(`  /**`);
    if (endpoint.summary) {
      lines.push(`   * ${endpoint.summary}`);
    }
    if (endpoint.description && endpoint.description !== endpoint.summary) {
      lines.push(`   * ${endpoint.description}`);
    }
    lines.push(`   */`);
  }

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

  // Generate method body
  if (endpoint.method === "GET") {
    if (endpoint.queryParams.length > 0) {
      lines.push(`    return this.client.get<${endpoint.responseType}>(${pathExpr}, queryParams);`);
    } else {
      lines.push(`    return this.client.get<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "POST") {
    if (endpoint.requestBodyType) {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    return this.client.post<${endpoint.responseType}>(${pathExpr}, body, queryParams);`);
      } else {
        lines.push(`    return this.client.post<${endpoint.responseType}>(${pathExpr}, body);`);
      }
    } else {
      lines.push(`    return this.client.post<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "PUT") {
    if (endpoint.requestBodyType) {
      lines.push(`    return this.client.put<${endpoint.responseType}>(${pathExpr}, body);`);
    } else {
      lines.push(`    return this.client.put<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "DELETE") {
    lines.push(`    return this.client.delete<${endpoint.responseType}>(${pathExpr});`);
  }

  lines.push(`  }`);

  return lines.join("\n");
}

function generateMethodParams(endpoint: EndpointInfo): string {
  const params: string[] = [];

  // Path parameters
  for (const param of endpoint.pathParams) {
    const tsType = schemaToTsType(param.schema);
    params.push(`${param.name}: ${tsType}`);
  }

  // Request body
  if (endpoint.requestBodyType) {
    params.push(`body: Types.${endpoint.requestBodyType}`);
  }

  // Query parameters (as optional object)
  if (endpoint.queryParams.length > 0) {
    const queryParamTypes: string[] = [];
    for (const param of endpoint.queryParams) {
      const tsType = schemaToTsType(param.schema);
      const safeName = param.name.replace(/[.-]/g, "_");
      const required = param.required ? "" : "?";
      queryParamTypes.push(`${safeName}${required}: ${tsType}`);
    }
    params.push(`queryParams?: { ${queryParamTypes.join("; ")} }`);
  }

  return params.join(", ");
}

function schemaToTsType(schema: SchemaObject | RefObject): string {
  if (isRefObject(schema)) {
    return resolveRef(schema.$ref);
  }

  if (schema.type === "string") {
    return "string";
  }

  if (schema.type === "integer" || schema.type === "number") {
    return "number";
  }

  if (schema.type === "boolean") {
    return "boolean";
  }

  if (schema.type === "array") {
    if (schema.items) {
      const itemType = schemaToTsType(schema.items);
      return `${itemType}[]`;
    }
    return "unknown[]";
  }

  return "unknown";
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
