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

export function generateApi(spec: OpenAPISpec, apiClassName: string): string {
  const endpoints = extractEndpoints(spec);

  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    `// Generated from ${spec.info.title}`,
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

  // Handle inline type definitions
  if (schema.type === "object" && schema.properties) {
    const props: string[] = [];
    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      const isRequired = schema.required?.includes(propName) ?? false;
      const optional = isRequired ? "" : "?";
      const tsType = getInlineTypeName(propSchema);
      const safePropName =
        propName.includes(".") || propName.includes("-") ? `"${propName}"` : propName;
      props.push(`${safePropName}${optional}: ${tsType}`);
    }
    return `{ ${props.join("; ")} }`;
  }

  return getInlineTypeName(schema);
}

function getInlineTypeName(schema: SchemaObject | RefObject): string {
  if (isRefObject(schema)) {
    return `Types.${resolveRef(schema.$ref)}`;
  }

  if (schema.type === "string") return "string";
  if (schema.type === "number" || schema.type === "integer") return "number";
  if (schema.type === "boolean") return "boolean";
  if (schema.type === "array") {
    if (schema.items) {
      return `${getInlineTypeName(schema.items)}[]`;
    }
    return "unknown[]";
  }

  return "unknown";
}

function generateMethod(endpoint: EndpointInfo): string {
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
      lines.push(`    return this.client.get<${endpoint.responseType}>(${pathExpr}, {`);
      for (const param of endpoint.queryParams) {
        const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
        lines.push(`      "${param.name}": params?.${safeName},`);
      }
      lines.push("    });");
    } else {
      lines.push(`    return this.client.get<${endpoint.responseType}>(${pathExpr});`);
    }
  } else if (endpoint.method === "POST") {
    if (endpoint.requestBodyType) {
      if (endpoint.queryParams.length > 0) {
        lines.push(`    return this.client.post<${endpoint.responseType}>(${pathExpr}, body, {`);
        for (const param of endpoint.queryParams) {
          const safeName = param.name.replace(/\./g, "_").replace(/-/g, "_");
          lines.push(`      "${param.name}": params?.${safeName},`);
        }
        lines.push("    });");
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
    params.push(`body: ${endpoint.requestBodyType}`);
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
