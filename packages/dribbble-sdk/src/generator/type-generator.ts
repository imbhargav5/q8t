import type { OpenAPISpec, RefObject, SchemaObject } from "./parser";
import { isRefObject, resolveRef } from "./parser";

export function generateTypes(spec: OpenAPISpec): string {
  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    "// Generated from api/openapi.yaml",
    "",
  ];

  const schemas = spec.components.schemas;

  for (const [name, schema] of Object.entries(schemas)) {
    lines.push(generateInterface(name, schema));
    lines.push("");
  }

  return lines.join("\n");
}

function generateInterface(name: string, schema: SchemaObject): string {
  const lines: string[] = [];

  // Add description as JSDoc if available
  if (schema.description) {
    lines.push("/**");
    lines.push(` * ${schema.description}`);
    lines.push(" */");
  }

  lines.push(`export interface ${name} {`);

  if (schema.properties) {
    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      const isRequired = schema.required?.includes(propName) ?? false;
      const optional = isRequired ? "" : "?";
      const tsType = schemaToTsType(propSchema);
      const safePropName = propName.includes(".") ? `"${propName}"` : propName;

      // Add property description if available
      if (!isRefObject(propSchema) && propSchema.description) {
        lines.push(`  /** ${propSchema.description} */`);
      }

      lines.push(`  ${safePropName}${optional}: ${tsType};`);
    }
  }

  lines.push("}");

  return lines.join("\n");
}

function schemaToTsType(schema: SchemaObject | RefObject): string {
  if (isRefObject(schema)) {
    return resolveRef(schema.$ref);
  }

  const nullable = schema.nullable ? " | null" : "";

  if (schema.type === "string") {
    if (schema.enum) {
      return `${schema.enum.map((v) => `"${v}"`).join(" | ")}${nullable}`;
    }
    return `string${nullable}`;
  }

  if (schema.type === "integer" || schema.type === "number") {
    return `number${nullable}`;
  }

  if (schema.type === "boolean") {
    return `boolean${nullable}`;
  }

  if (schema.type === "array") {
    if (schema.items) {
      const itemType = schemaToTsType(schema.items);
      return `${itemType}[]${nullable}`;
    }
    return `unknown[]${nullable}`;
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
      return `{ ${props.join("; ")} }${nullable}`;
    }
    return `Record<string, unknown>${nullable}`;
  }

  return `unknown${nullable}`;
}
