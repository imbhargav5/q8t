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
}

export type ClientType = "signed" | "unsigned" | "provisioning";

export function generateApi(
  spec: OpenAPISpec,
  sourceFile: string,
  apiClassName: string,
  clientType: ClientType,
): string {
  const endpoints = extractEndpoints(spec);

  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    `// Generated from ${sourceFile}`,
    "",
    'import { Effect } from "effect";',
    'import type { HttpClient } from "@q8t/effect-sdk-base";',
    'import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";',
    'import type * as Types from "./types";',
    "",
    `export class ${apiClassName} {`,
    "  constructor() {}",
    "",
  ];

  for (const endpoint of endpoints) {
    lines.push(generateMethod(endpoint, clientType));
    lines.push("");
  }

  lines.push("}");

  return lines.join("\n");
}

function getClientImport(clientType: ClientType): string {
  switch (clientType) {
    case "signed":
      return "SignedHttpClient";
    case "unsigned":
      return "UnsignedHttpClient";
    case "provisioning":
      return "ProvisioningHttpClient";
  }
}

function getClientTypeName(clientType: ClientType): string {
  switch (clientType) {
    case "signed":
      return "SignedHttpClient";
    case "unsigned":
      return "UnsignedHttpClient";
    case "provisioning":
      return "ProvisioningHttpClient";
  }
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
  } else if (operation.requestBody?.content["multipart/form-data"]) {
    const schema = operation.requestBody.content["multipart/form-data"].schema;
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

function generateMethod(endpoint: EndpointInfo, clientType: ClientType): string {
  const lines: string[] = [];

  // Generate JSDoc comment
  if (endpoint.summary) {
    lines.push("  /**");
    lines.push(`   * ${endpoint.summary}`);
    lines.push("   */");
  }

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
    pathExpr = `\`${pathExpr.slice(1, -1)}\``;
  }

  // Generate method body using Effect.gen
  lines.push("    return Effect.gen(function* () {");
  lines.push("      const client = yield* HttpClient;");

  // Generate method call
  if (endpoint.method === "GET") {
    if (endpoint.queryParams.length > 0) {
      lines.push(`      return yield* client.get<${endpoint.responseType}>(${pathExpr}, { queryParams });`);
    } else {
      lines.push(`      return yield* client.get<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "POST") {
    if (endpoint.requestBodyType) {
      lines.push(`      return yield* client.post<${endpoint.responseType}>(${pathExpr}, { body });`);
    } else {
      lines.push(`      return yield* client.post<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "PUT") {
    if (endpoint.requestBodyType) {
      lines.push(`      return yield* client.put<${endpoint.responseType}>(${pathExpr}, { body });`);
    } else {
      lines.push(`      return yield* client.put<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "PATCH") {
    if (endpoint.requestBodyType) {
      lines.push(`      return yield* client.patch<${endpoint.responseType}>(${pathExpr}, { body });`);
    } else {
      lines.push(`      return yield* client.patch<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "DELETE") {
    if (endpoint.queryParams.length > 0) {
      lines.push(`      return yield* client.delete<${endpoint.responseType}>(${pathExpr}, { queryParams });`);
    } else {
      lines.push(`      return yield* client.delete<${endpoint.responseType}>(${pathExpr});`);
    }
  }

  lines.push("    });");
  lines.push("  }");

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
      let tsType = "string";
      if (param.schema.type === "integer" || param.schema.type === "number") {
        tsType = "number";
      } else if (param.schema.type === "boolean") {
        tsType = "boolean";
      } else if (param.schema.type === "array") {
        tsType = "string[]";
      }
      const safeName = param.name.replace(/\./g, "_");
      queryParamTypes.push(`${safeName}?: ${tsType}`);
    }
    params.push(`queryParams?: { ${queryParamTypes.join("; ")} }`);
  }

  return params.join(", ");
}
