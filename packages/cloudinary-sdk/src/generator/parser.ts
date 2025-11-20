import { readFileSync } from "node:fs";
import * as YAML from "yaml";

export interface RefObject {
  $ref: string;
}

export interface SchemaObject {
  type?: string;
  properties?: Record<string, SchemaObject | RefObject>;
  items?: SchemaObject | RefObject;
  required?: string[];
  enum?: string[];
  format?: string;
  description?: string;
  additionalProperties?: boolean | SchemaObject | RefObject;
}

export interface Parameter {
  name: string;
  in: "path" | "query" | "header" | "cookie";
  required?: boolean;
  schema: SchemaObject;
  description?: string;
}

export interface RequestBody {
  required?: boolean;
  content: {
    [mediaType: string]: {
      schema: SchemaObject | RefObject;
    };
  };
}

export interface Response {
  description: string;
  content?: {
    [mediaType: string]: {
      schema: SchemaObject | RefObject;
    };
  };
}

export interface Operation {
  operationId: string;
  summary?: string;
  description?: string;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses: Record<string, Response>;
}

export interface PathItem {
  get?: Operation;
  post?: Operation;
  put?: Operation;
  patch?: Operation;
  delete?: Operation;
}

export interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  servers?: Array<{
    url: string;
    variables?: Record<string, { default: string; description?: string }>;
  }>;
  paths: Record<string, PathItem>;
  components?: {
    schemas?: Record<string, SchemaObject>;
    securitySchemes?: Record<string, unknown>;
  };
}

export function parseOpenAPISpec(filePath: string): OpenAPISpec {
  const content = readFileSync(filePath, "utf-8");
  return YAML.parse(content) as OpenAPISpec;
}

export function isRefObject(obj: SchemaObject | RefObject): obj is RefObject {
  return "$ref" in obj;
}

export function resolveRef(ref: string): string {
  // #/components/schemas/SomeName -> SomeName
  const parts = ref.split("/");
  return parts[parts.length - 1];
}
