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
}

export function generateApi(spec: OpenAPISpec, className: string = "TikTokApi"): string {
  const endpoints = extractEndpoints(spec);

  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    "// Generated from OpenAPI specification",
    "",
    'import { Effect } from "effect";',
    'import { HttpClient } from "@q8t/effect-sdk-base";',
    'import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";',
    'import type * as Types from "./types";',
    "",
    `export class ${className} {`,
    "  constructor() {}",
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
  const successResponse = operation.responses["200"] || operation.responses["201"];
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
  };
}

function getTypeName(schema: SchemaObject | RefObject): string {
  if (isRefObject(schema)) {
    return `Types.${resolveRef(schema.$ref)}`;
  }
  return "unknown";
}

function generateMethod(endpoint: EndpointInfo): string {
  const lines: string[] = [];

  // Generate TSDoc comment
  lines.push(`  /**`);
  if (endpoint.summary) {
    lines.push(`   * ${endpoint.summary}`);
    lines.push(`   *`);
  }

  // Add method description
  lines.push(`   * @param ${endpoint.requestBodyType ? 'body - Request body data' : endpoint.pathParams.length > 0 || endpoint.queryParams.length > 0 ? 'params - Request parameters' : ''}`);
  if (endpoint.requestBodyType) {
    for (const param of endpoint.pathParams) {
      lines.push(`   * @param ${param.name} - ${param.description || 'Path parameter'}`);
    }
    if (endpoint.queryParams.length > 0) {
      lines.push(`   * @param params - Optional query parameters`);
    }
  } else if (endpoint.pathParams.length > 0 || endpoint.queryParams.length > 0) {
    for (const param of endpoint.pathParams) {
      lines.push(`   * @param ${param.name} - ${param.description || 'Path parameter'}`);
    }
    if (endpoint.queryParams.length > 0) {
      for (const param of endpoint.queryParams) {
        const safeName = param.name.replace(/\./g, "_");
        lines.push(`   * @param params.${safeName} - ${param.description || param.name}`);
      }
    }
  }

  lines.push(`   * @returns Promise resolving to the API response`);
  lines.push(`   *`);
  lines.push(`   * @example`);
  lines.push(`   * \`\`\`typescript`);
  if (endpoint.requestBodyType) {
    lines.push(`   * const response = await api.${endpoint.operationId}(requestData);`);
  } else if (endpoint.pathParams.length > 0 || endpoint.queryParams.length > 0) {
    const exampleParams: string[] = [];
    for (const param of endpoint.pathParams) {
      exampleParams.push(`${param.name}`);
    }
    if (endpoint.queryParams.length > 0) {
      exampleParams.push(`queryParams`);
    }
    lines.push(`   * const response = await api.${endpoint.operationId}(${exampleParams.join(', ')});`);
  } else {
    lines.push(`   * const response = await api.${endpoint.operationId}();`);
  }
  lines.push(`   * \`\`\``);
  lines.push(`   *`);
  lines.push(`   * @public`);
  lines.push(`   */`);

  // Generate method signature
  const params = generateMethodParams(endpoint);
  const methodName = endpoint.operationId;
  const errorType = "HttpError | NetworkError | ParseError";

  lines.push(`  ${methodName}(${params}): Effect.Effect<${endpoint.responseType}, ${errorType}, HttpClient> {`);

  // Generate path with replacements
  let pathExpr = `"${endpoint.path}"`;
  for (const param of endpoint.pathParams) {
    pathExpr = pathExpr.replace(`{${param.name}}`, `\${${param.name}}`);
  }
  if (endpoint.pathParams.length > 0) {
    pathExpr = "`" + pathExpr.slice(1, -1) + "`";
  }

  // Generate method body
  lines.push("    return Effect.gen(function* () {");
  lines.push("      const client = yield* HttpClient;");
  if (endpoint.method === "GET") {
    if (endpoint.queryParams.length > 0) {
      lines.push(`    return yield* client.get<${endpoint.responseType}>(${pathExpr}, {`);
      for (const param of endpoint.queryParams) {
        const safeName = param.name.replace(/\./g, "_");
        lines.push(`      "${param.name}": params?.${safeName},`);
      }
      lines.push(`    });`);
    } else {
      lines.push(`    return yield* client.get<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "POST") {
    if (endpoint.requestBodyType) {
      lines.push(`    return yield* client.post<${endpoint.responseType}>(${pathExpr}, body);`);
    } else {
      lines.push(`    return yield* client.post<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "PUT") {
    if (endpoint.requestBodyType) {
      lines.push(`    return yield* client.put<${endpoint.responseType}>(${pathExpr}, body);`);
    } else {
      lines.push(`    return yield* client.put<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "DELETE") {
    lines.push(`    return yield* client.delete<${endpoint.responseType}>(${pathExpr});`);
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
      const tsType = param.schema.type === "integer" ? "number" : "string";
      const safeName = param.name.replace(/\./g, "_");
      queryParamTypes.push(`${safeName}?: ${tsType}`);
    }
    params.push(`params?: { ${queryParamTypes.join("; ")} }`);
  }

  return params.join(", ");
}
