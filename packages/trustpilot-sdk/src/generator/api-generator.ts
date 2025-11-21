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
  serverUrl?: string;
}

export function generateApi(spec: OpenAPISpec, className: string): string {
  const endpoints = extractEndpoints(spec);

  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    `// Generated from ${spec.info.title} OpenAPI specification`,
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
  } else if (operation.requestBody?.content["application/x-www-form-urlencoded"]) {
    const schema = operation.requestBody.content["application/x-www-form-urlencoded"].schema;
    requestBodyType = getTypeName(schema);
  } else if (operation.requestBody?.content["multipart/form-data"]) {
    const schema = operation.requestBody.content["multipart/form-data"].schema;
    requestBodyType = getTypeName(schema);
  }

  let responseType = "void";
  const successResponse =
    operation.responses["200"] || operation.responses["201"] || operation.responses["204"];
  if (successResponse?.content?.["application/json"]) {
    const schema = successResponse.content["application/json"].schema;
    responseType = getTypeName(schema);
  }

  // Check if operation has custom server URL
  const serverUrl = operation.servers?.[0]?.url;

  return {
    operationId: operation.operationId,
    method,
    path,
    pathParams,
    queryParams,
    requestBodyType,
    responseType,
    summary: operation.summary,
    serverUrl,
  };
}

function getTypeName(schema: SchemaObject | RefObject): string {
  if (isRefObject(schema)) {
    return `Types.${resolveRef(schema.$ref)}`;
  }

  if (schema.type === "array" && schema.items) {
    const itemType = getTypeName(schema.items);
    return `${itemType}[]`;
  }

  if (schema.type === "object" && schema.properties) {
    const props: string[] = [];
    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      const isRequired = schema.required?.includes(propName);
      const optional = isRequired ? "" : "?";
      const typeStr = getTypeName(propSchema);
      props.push(`${propName}${optional}: ${typeStr}`);
    }
    return `{ ${props.join("; ")} }`;
  }

  return "unknown";
}

function generateMethod(endpoint: EndpointInfo): string {
  const lines: string[] = [];

  // Generate JSDoc comment
  if (endpoint.summary) {
    lines.push(`  /**`);
    lines.push(`   * ${endpoint.summary}`);
    lines.push(`   */`);
  }

  // Generate method signature
  const params = generateMethodParams(endpoint);
  const methodName = endpoint.operationId;
  const errorType = "HttpError | NetworkError | ParseError";

  lines.push(`  ${methodName}(${params}): Effect.Effect<${endpoint.responseType}, ${errorType}, HttpClient> {`);

  // Generate path with replacements
  let pathExpr = `"${endpoint.path}"`;
  for (const param of endpoint.pathParams) {
    const safeName = param.name.replace(/-/g, "_");
    pathExpr = pathExpr.replace(`{${param.name}}`, `\${${safeName}}`);
  }
  if (endpoint.pathParams.length > 0) {
    pathExpr = "`" + pathExpr.slice(1, -1) + "`";
  }

  // Add server URL override if needed
  const serverUrlOption = endpoint.serverUrl ? `, { baseUrl: "${endpoint.serverUrl}" }` : "";

  // Generate method body
  lines.push("    return Effect.gen(function* () {");
  lines.push("      const client = yield* HttpClient;");
  if (endpoint.method === "GET") {
    if (endpoint.queryParams.length > 0) {
      lines.push(`    const queryParams: Record<string, any> = {};`);
      for (const param of endpoint.queryParams) {
        const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
        lines.push(
          `    if (params?.${safeName} !== undefined) queryParams["${param.name}"] = params.${safeName};`,
        );
      }
      lines.push(
        `    return yield* client.get<${endpoint.responseType}>(${pathExpr}, queryParams${serverUrlOption});`,
      );
    } else {
      lines.push(
        `    return yield* client.get<${endpoint.responseType}>(${pathExpr}${serverUrlOption});`,
      );
    }
  } else if (endpoint.method === "POST") {
    if (endpoint.requestBodyType) {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    const queryParams: Record<string, any> = {};`);
        for (const param of endpoint.queryParams) {
          const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
          lines.push(
            `    if (params?.${safeName} !== undefined) queryParams["${param.name}"] = params.${safeName};`,
          );
        }
        lines.push(
          `    return yield* client.post<${endpoint.responseType}>(${pathExpr}, body, queryParams${serverUrlOption});`,
        );
      } else {
        lines.push(
          `    return yield* client.post<${endpoint.responseType}>(${pathExpr}, body${serverUrlOption});`,
        );
      }
    } else {
      lines.push(
        `    return yield* client.post<${endpoint.responseType}>(${pathExpr}, undefined${serverUrlOption});`,
      );
    }
  } else if (endpoint.method === "PUT") {
    if (endpoint.requestBodyType) {
      lines.push(
        `    return yield* client.put<${endpoint.responseType}>(${pathExpr}, body${serverUrlOption});`,
      );
    } else {
      lines.push(
        `    return yield* client.put<${endpoint.responseType}>(${pathExpr}, undefined${serverUrlOption});`,
      );
    }
  } else if (endpoint.method === "DELETE") {
    lines.push(
      `    return yield* client.delete<${endpoint.responseType}>(${pathExpr}${serverUrlOption});`,
    );
  } else if (endpoint.method === "PATCH") {
    if (endpoint.requestBodyType) {
      lines.push(
        `    return yield* client.patch<${endpoint.responseType}>(${pathExpr}, body${serverUrlOption});`,
      );
    } else {
      lines.push(
        `    return yield* client.patch<${endpoint.responseType}>(${pathExpr}, undefined${serverUrlOption});`,
      );
    }
  }

  lines.push(`  }`);

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
    params.push(`body: ${endpoint.requestBodyType}`);
  }

  // Query parameters (as optional object)
  if (endpoint.queryParams.length > 0) {
    const queryParamTypes: string[] = [];
    for (const param of endpoint.queryParams) {
      const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
      let tsType = "string";

      if (param.schema.type === "integer" || param.schema.type === "number") {
        tsType = "number";
      } else if (param.schema.type === "boolean") {
        tsType = "boolean";
      } else if (param.schema.type === "array") {
        if (param.schema.items && "type" in param.schema.items) {
          const itemType =
            param.schema.items.type === "integer" || param.schema.items.type === "number"
              ? "number"
              : "string";
          tsType = `${itemType}[]`;
        } else {
          tsType = "string[]";
        }
      }

      queryParamTypes.push(`${safeName}?: ${tsType}`);
    }
    params.push(`params?: { ${queryParamTypes.join("; ")} }`);
  }

  return params.join(", ");
}
