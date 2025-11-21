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

export function generateApi(spec: OpenAPISpec, className: string, typesNamespace: string): string {
  const endpoints = extractEndpoints(spec);

  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    "// Generated from OpenAPI specification",
    "",
    'import { Effect } from "effect";',
    'import type { HttpClient } from "@q8t/effect-sdk-base";',
    'import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";',
    `import type * as ${typesNamespace} from "./${typesNamespace.toLowerCase()}";`,
    "",
    `export class ${className} {`,
    "  constructor() {}",
    "",
  ];

  for (const endpoint of endpoints) {
    lines.push(generateMethod(endpoint, typesNamespace));
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
  } else if (operation.requestBody?.content["application/x-www-form-urlencoded"]) {
    const schema = operation.requestBody.content["application/x-www-form-urlencoded"].schema;
    requestBodyType = getTypeName(schema);
  } else if (operation.requestBody?.content["application/octet-stream"]) {
    const schema = operation.requestBody.content["application/octet-stream"].schema;
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
    return resolveRef(schema.$ref);
  }
  if (schema.type === "object") {
    return "Record<string, unknown>";
  }
  return "unknown";
}

function generateMethod(endpoint: EndpointInfo, typesNamespace: string): string {
  const lines: string[] = [];

  // Generate JSDoc comment
  if (endpoint.summary) {
    lines.push(`  /**`);
    lines.push(`   * ${endpoint.summary}`);
    lines.push(`   */`);
  }

  // Generate method signature
  const params = generateMethodParams(endpoint, typesNamespace);
  const methodName = endpoint.operationId;
  const returnType =
    endpoint.responseType === "void" ? "void" : `${typesNamespace}.${endpoint.responseType}`;
  const errorType = "HttpError | NetworkError | ParseError";

  lines.push(`  ${methodName}(${params}): Effect.Effect<${returnType}, ${errorType}, HttpClient> {`);

  // Generate path with replacements
  let pathExpr = `"${endpoint.path}"`;
  for (const param of endpoint.pathParams) {
    const safeName = param.name.replace(/-/g, "_");
    pathExpr = pathExpr.replace(`{${param.name}}`, `\${${safeName}}`);
  }
  if (endpoint.pathParams.length > 0) {
    pathExpr = "`" + pathExpr.slice(1, -1) + "`";
  }

  // Generate method body
  lines.push("    return Effect.gen(function* () {");
  lines.push("      const client = yield* HttpClient;");
  if (endpoint.method === "GET") {
    if (endpoint.queryParams.length > 0) {
      lines.push(`    return yield* client.get<${returnType}>(${pathExpr}, {`);
      for (const param of endpoint.queryParams) {
        const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
        lines.push(`      "${param.name}": params?.${safeName},`);
      }
      lines.push(`    });`);
    } else {
      lines.push(`    return yield* client.get<${returnType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "POST") {
    if (endpoint.requestBodyType) {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    return yield* client.post<${returnType}>(${pathExpr}, body, {`);
        for (const param of endpoint.queryParams) {
          const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
          lines.push(`      "${param.name}": params?.${safeName},`);
        }
        lines.push(`    });`);
      } else {
        lines.push(`    return yield* client.post<${returnType}>(${pathExpr}, body);`);
      }
    } else {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    return yield* client.post<${returnType}>(${pathExpr}, undefined, {`);
        for (const param of endpoint.queryParams) {
          const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
          lines.push(`      "${param.name}": params?.${safeName},`);
        }
        lines.push(`    });`);
      } else {
        lines.push(`    return yield* client.post<${returnType}>(${pathExpr});`);
      }
    }
  } else if (endpoint.method === "PUT") {
    if (endpoint.requestBodyType) {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    return yield* client.put<${returnType}>(${pathExpr}, body, {`);
        for (const param of endpoint.queryParams) {
          const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
          lines.push(`      "${param.name}": params?.${safeName},`);
        }
        lines.push(`    });`);
      } else {
        lines.push(`    return yield* client.put<${returnType}>(${pathExpr}, body);`);
      }
    } else {
      lines.push(`    return yield* client.put<${returnType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "DELETE") {
    if (endpoint.queryParams.length > 0) {
      lines.push(`    return yield* client.delete<${returnType}>(${pathExpr}, {`);
      for (const param of endpoint.queryParams) {
        const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
        lines.push(`      "${param.name}": params?.${safeName},`);
      }
      lines.push(`    });`);
    } else {
      lines.push(`    return yield* client.delete<${returnType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "PATCH") {
    if (endpoint.requestBodyType) {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    return yield* client.patch<${returnType}>(${pathExpr}, body, {`);
        for (const param of endpoint.queryParams) {
          const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
          lines.push(`      "${param.name}": params?.${safeName},`);
        }
        lines.push(`    });`);
      } else {
        lines.push(`    return yield* client.patch<${returnType}>(${pathExpr}, body);`);
      }
    } else {
      lines.push(`    return yield* client.patch<${returnType}>(${pathExpr});`);
    }
  }

  lines.push(`  }`);

  return lines.join("\n");
}

function generateMethodParams(endpoint: EndpointInfo, typesNamespace: string): string {
  const params: string[] = [];

  // Path parameters
  for (const param of endpoint.pathParams) {
    const safeName = param.name.replace(/-/g, "_");
    const tsType = param.schema.type === "integer" ? "number" : "string";
    params.push(`${safeName}: ${tsType}`);
  }

  // Request body
  if (endpoint.requestBodyType) {
    const bodyType = endpoint.requestBodyType.startsWith("Types.")
      ? endpoint.requestBodyType.replace("Types.", `${typesNamespace}.`)
      : endpoint.requestBodyType === "Record<string, unknown>"
        ? endpoint.requestBodyType
        : `${typesNamespace}.${endpoint.requestBodyType}`;
    params.push(`body: ${bodyType}`);
  }

  // Query parameters (as optional object)
  if (endpoint.queryParams.length > 0) {
    const queryParamTypes: string[] = [];
    for (const param of endpoint.queryParams) {
      const tsType =
        param.schema.type === "integer"
          ? "number"
          : param.schema.type === "boolean"
            ? "boolean"
            : "string";
      const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
      queryParamTypes.push(`${safeName}?: ${tsType}`);
    }
    params.push(`params?: { ${queryParamTypes.join("; ")} }`);
  }

  return params.join(", ");
}
