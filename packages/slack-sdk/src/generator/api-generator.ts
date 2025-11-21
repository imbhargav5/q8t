import type { OpenAPISpec, Operation, Parameter, RefObject, SchemaObject } from "./parser";
import { resolveRef, isRefObject } from "./parser";

interface EndpointInfo {
  operationId: string;
  method: string;
  path: string;
  pathParams: Parameter[];
  queryParams: Parameter[];
  headerParams: Parameter[];
  requestBodyType?: string;
  requestBodySchema?: SchemaObject | RefObject;
  responseType: string;
  summary?: string;
}

export function generateApi(spec: OpenAPISpec): string {
  const endpoints = extractEndpoints(spec);

  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    "// Generated from api/openapi.yaml",
    "",
    'import { Effect } from "effect";',
    'import { HttpClient } from "@q8t/effect-sdk-base";',
    'import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";',
    'import type * as Types from "./types";',
    "",
    "export class SlackApi {",
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
  const headerParams: Parameter[] = [];

  if (operation.parameters) {
    for (const param of operation.parameters) {
      if (param.in === "path") {
        pathParams.push(param);
      } else if (param.in === "query") {
        queryParams.push(param);
      } else if (param.in === "header") {
        headerParams.push(param);
      }
    }
  }

  let requestBodyType: string | undefined;
  let requestBodySchema: SchemaObject | RefObject | undefined;
  if (operation.requestBody) {
    const content = operation.requestBody.content;
    const schema = content["application/json"]?.schema || content["application/x-www-form-urlencoded"]?.schema;
    if (schema) {
      requestBodySchema = schema;
      requestBodyType = getTypeName(schema);
    }
  }

  let responseType = "Types.SlackResponse";
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
    headerParams,
    requestBodyType,
    requestBodySchema,
    responseType,
    summary: operation.summary,
  };
}

function getTypeName(schema: SchemaObject | RefObject): string {
  if (isRefObject(schema)) {
    return `Types.${resolveRef(schema.$ref)}`;
  }
  // For inline schemas, use SlackResponse
  return "Types.SlackResponse";
}

function generateMethod(endpoint: EndpointInfo): string {
  const lines: string[] = [];

  if (endpoint.summary) {
    lines.push(`  /**`);
    lines.push(`   * ${endpoint.summary}`);
    lines.push(`   */`);
  }

  const params = generateMethodParams(endpoint);
  const methodName = endpoint.operationId.replace(/\./g, "_");

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
  } else if (endpoint.method === "PATCH") {
    if (endpoint.requestBodyType) {
      lines.push(`    return yield* client.patch<${endpoint.responseType}>(${pathExpr}, body);`);
    } else {
      lines.push(`    return yield* client.patch<${endpoint.responseType}>(${pathExpr});`);
    }
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
    // For Slack API, check if body has properties - if so, destructure them
    if (endpoint.requestBodySchema && !isRefObject(endpoint.requestBodySchema)) {
      const schema = endpoint.requestBodySchema as SchemaObject;
      if (schema.properties) {
        const bodyParams: string[] = [];
        const bodyParamTypes: string[] = [];
        for (const [propName, propSchema] of Object.entries(schema.properties)) {
          const safeName = propName.replace(/\./g, "_");
          const isRequired = schema.required?.includes(propName) ?? false;
          const optional = isRequired ? "" : "?";
          const tsType = schemaToTsType(propSchema);
          bodyParams.push(safeName);
          bodyParamTypes.push(`${safeName}${optional}: ${tsType}`);
        }
        params.push(`{ ${bodyParams.join(", ")} }: { ${bodyParamTypes.join("; ")} } = {}`);
      } else {
        params.push(`body: ${endpoint.requestBodyType}`);
      }
    } else {
      params.push(`body: ${endpoint.requestBodyType}`);
    }
  }

  if (endpoint.queryParams.length > 0) {
    const queryParamNames: string[] = [];
    const queryParamTypes: string[] = [];
    for (const param of endpoint.queryParams) {
      const tsType = getParamType(param.schema);
      const safeName = param.name.replace(/\./g, "_");
      const optional = param.required ? "" : "?";
      queryParamNames.push(safeName);
      queryParamTypes.push(`${safeName}${optional}: ${tsType}`);
    }
    params.push(`{ ${queryParamNames.join(", ")} }: { ${queryParamTypes.join("; ")} } = {}`);
  }

  return params.join(", ");
}

function getParamType(schema: SchemaObject): string {
  if (schema.type === "integer" || schema.type === "number") {
    return "number";
  }
  if (schema.type === "boolean") {
    return "boolean";
  }
  return "string";
}

function schemaToTsType(schema: SchemaObject | RefObject): string {
  if (isRefObject(schema)) {
    return `Types.${resolveRef(schema.$ref)}`;
  }

  if (schema.type === "string") {
    if (schema.enum) {
      return schema.enum.map((v) => `"${v}"`).join(" | ");
    }
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

  if (schema.type === "object") {
    if (schema.properties) {
      const props: string[] = [];
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        const isRequired = schema.required?.includes(propName) ?? false;
        const optional = isRequired ? "" : "?";
        const tsType = schemaToTsType(propSchema);
        const safePropName = propName.includes(".") ? `"${propName}"` : propName;
        props.push(`${safePropName}${optional}: ${tsType}`);
      }
      return `{ ${props.join("; ")} }`;
    }
    return "Record<string, unknown>";
  }

  return "unknown";
}
