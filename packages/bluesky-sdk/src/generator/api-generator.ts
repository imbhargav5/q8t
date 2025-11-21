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

export function generateApi(spec: OpenAPISpec): string {
  const endpoints = extractEndpoints(spec);

  // Deduplicate method names by tracking which names have been used
  const methodNameCounts = new Map<string, number>();
  const endpointsWithNames: Array<{endpoint: EndpointInfo; methodName: string}> = [];

  for (const endpoint of endpoints) {
    const baseName = operationIdToMethodName(endpoint.operationId);
    const count = methodNameCounts.get(baseName) || 0;
    methodNameCounts.set(baseName, count + 1);

    // If this is a duplicate, append namespace prefix
    let finalName = baseName;
    if (count > 0) {
      // Extract namespace from operationId (e.g., "app.bsky.actor" from "app.bsky.actor.getProfile")
      const parts = endpoint.operationId.split('.');
      const namespace = parts.slice(0, -1).pop() || ''; // Get second-to-last part (e.g., "actor")
      finalName = namespace + baseName.charAt(0).toUpperCase() + baseName.slice(1);
    }

    endpointsWithNames.push({ endpoint, methodName: finalName });
  }

  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    "// Generated from api/openapi.yaml",
    "",
    'import { Effect } from "effect";',
    'import type { HttpClient } from "@q8t/effect-sdk-base";',
    'import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";',
    'import type * as Types from "./types";',
    "",
    "export class BlueskyApi {",
    "  constructor() {}",
    "",
  ];

  for (const {endpoint, methodName} of endpointsWithNames) {
    lines.push(generateMethod(endpoint, methodName));
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

function operationIdToMethodName(operationId: string): string {
  // Extract the last part after the last dot
  // e.g., "app.bsky.actor.getProfile" -> "getProfile"
  const parts = operationId.split('.');
  return parts[parts.length - 1];
}

function generateMethod(endpoint: EndpointInfo, methodName: string): string {
  const lines: string[] = [];

  if (endpoint.summary) {
    lines.push(`  /**`);
    lines.push(`   * ${endpoint.summary}`);
    lines.push(`   */`);
  }

  const params = generateMethodParams(endpoint);

  const errorType = "HttpError | NetworkError | ParseError";

  lines.push(`  ${methodName}(${params}): Effect.Effect<${endpoint.responseType}, ${errorType}, HttpClient> {`);

  let pathExpr = `"${endpoint.path}"`;
  for (const param of endpoint.pathParams) {
    pathExpr = pathExpr.replace(`{${param.name}}`, `\${${param.name}}`);
  }
  if (endpoint.pathParams.length > 0) {
    pathExpr = "`" + pathExpr.slice(1, -1) + "`";
  }

  if (endpoint.method === "GET") {
    if (endpoint.queryParams.length > 0) {
      lines.push(`    return yield* client.get<${endpoint.responseType}>(${pathExpr}, {`);
      for (const param of endpoint.queryParams) {
        const safeName = param.name.replace(/\./g, "_");
        lines.push(`      "${param.name}": ${safeName},`);
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

  for (const param of endpoint.pathParams) {
    params.push(`${param.name}: string`);
  }

  if (endpoint.requestBodyType) {
    params.push(`body: ${endpoint.requestBodyType}`);
  }

  if (endpoint.queryParams.length > 0) {
    const destructuringParams: string[] = [];
    const typeParams: string[] = [];
    const allOptional = endpoint.queryParams.every(p => !p.required);

    for (const param of endpoint.queryParams) {
      const tsType = param.schema.type === "integer" ? "number" : "string";
      const safeName = param.name.replace(/\./g, "_");
      const optional = param.required ? "" : "?";
      // Destructuring pattern (no optional marker in the pattern itself)
      destructuringParams.push(safeName);
      // Type annotation
      typeParams.push(`${safeName}${optional}: ${tsType}`);
    }

    // If all parameters are optional, make the entire object optional with a default value
    const objOptional = allOptional ? " = {}" : "";
    params.push(`{ ${destructuringParams.join(", ")} }: { ${typeParams.join("; ")} }${objOptional}`);
  }

  return params.join(", ");
}
