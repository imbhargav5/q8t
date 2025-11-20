import { readFileSync } from "node:fs";
import { parse } from "yaml";

export interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  servers: Array<{ url: string }>;
  paths: Record<string, PathItem>;
  components: {
    schemas: Record<string, SchemaObject>;
    securitySchemes?: Record<string, SecurityScheme>;
  };
}

export interface SecurityScheme {
  type: string;
  scheme?: string;
  description?: string;
  flows?: {
    authorizationCode?: {
      authorizationUrl: string;
      tokenUrl: string;
      refreshUrl?: string;
      scopes: Record<string, string>;
    };
  };
}

export interface PathItem {
  parameters?: Array<Parameter | RefObject>;
  get?: Operation;
  post?: Operation;
  put?: Operation;
  delete?: Operation;
  patch?: Operation;
}

export interface Operation {
  operationId: string;
  summary?: string;
  description?: string;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses: Record<string, Response>;
  tags?: string[];
}

export interface Parameter {
  name: string;
  in: "path" | "query" | "header";
  required?: boolean;
  schema: SchemaObject;
  description?: string;
}

export interface RequestBody {
  required?: boolean;
  content: {
    "application/json"?: {
      schema: SchemaObject | RefObject;
    };
    "application/x-www-form-urlencoded"?: {
      schema: SchemaObject | RefObject;
    };
  };
}

export interface Response {
  description: string;
  content?: {
    "application/json": {
      schema: SchemaObject | RefObject;
    };
  };
}

export interface SchemaObject {
  type?: string;
  format?: string;
  properties?: Record<string, SchemaObject | RefObject>;
  required?: string[];
  items?: SchemaObject | RefObject;
  $ref?: string;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  maxLength?: number;
  allOf?: Array<SchemaObject | RefObject>;
  anyOf?: Array<SchemaObject | RefObject>;
  oneOf?: Array<SchemaObject | RefObject>;
  additionalProperties?: boolean | SchemaObject | RefObject;
  description?: string;
}

export interface RefObject {
  $ref: string;
}

export function parseOpenAPISpec(filePath: string): OpenAPISpec {
  const content = readFileSync(filePath, "utf-8");
  return parse(content) as OpenAPISpec;
}

export function resolveRef(ref: string): string {
  // Extract type name from $ref: "#/components/schemas/TypeName"
  const parts = ref.split("/");
  return parts[parts.length - 1];
}

export function isRefObject(obj: SchemaObject | RefObject): obj is RefObject {
  return "$ref" in obj;
}
