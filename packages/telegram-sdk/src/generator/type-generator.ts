import type { OpenAPISpec, SchemaObject, RefObject } from "./parser";
import { resolveRef, isRefObject } from "./parser";

export function generateTypes(spec: OpenAPISpec): string {
  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    `// Generated from ${spec.info.title}`,
    "",
  ];

  const schemas = spec.components.schemas;

  for (const [name, schema] of Object.entries(schemas)) {
    const interfaceCode = generateInterface(name, schema);
    if (interfaceCode) {
      lines.push(interfaceCode);
      lines.push("");
    }
  }

  return lines.join("\n");
}

function generateInterface(name: string, schema: SchemaObject): string {
  const lines: string[] = [];

  // Handle oneOf (union types)
  if (schema.oneOf) {
    const types = schema.oneOf.map((s) => schemaToTsType(s));
    return `export type ${name} = ${types.join(" | ")};`;
  }

  // Handle allOf (intersection types)
  if (schema.allOf) {
    const types = schema.allOf.map((s) => schemaToTsType(s));
    return `export type ${name} = ${types.join(" & ")};`;
  }

  // Handle enum
  if (schema.enum) {
    const enumValues = schema.enum.map((v) =>
      typeof v === "string" ? `"${v}"` : v
    );
    return `export type ${name} = ${enumValues.join(" | ")};`;
  }

  // Handle regular object interface
  if (schema.description) {
    lines.push(`/**`);
    lines.push(` * ${schema.description}`);
    lines.push(` */`);
  }

  lines.push(`export interface ${name} {`);

  if (schema.properties) {
    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      const isRequired = schema.required?.includes(propName) ?? false;
      const optional = isRequired ? "" : "?";
      const tsType = schemaToTsType(propSchema);
      const safePropName = propName.includes(".") || propName.includes("-")
        ? `"${propName}"`
        : propName;

      // Add property description if available
      if (!isRefObject(propSchema) && propSchema.description) {
        lines.push(`  /**`);
        lines.push(`   * ${propSchema.description}`);
        lines.push(`   */`);
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

  // Handle oneOf (union types)
  if (schema.oneOf) {
    const types = schema.oneOf.map((s) => schemaToTsType(s));
    return types.join(" | ");
  }

  // Handle allOf (intersection types)
  if (schema.allOf) {
    const types = schema.allOf.map((s) => schemaToTsType(s));
    return types.join(" & ");
  }

  if (schema.type === "string") {
    if (schema.enum) {
      return schema.enum.map((v) => `"${v}"`).join(" | ");
    }
    return "string";
  }

  if (schema.type === "integer" || schema.type === "number") {
    if (schema.enum) {
      return schema.enum.join(" | ");
    }
    return "number";
  }

  if (schema.type === "boolean") {
    return "boolean";
  }

  if (schema.type === "array") {
    if (schema.items) {
      const itemType = schemaToTsType(schema.items);
      return `Array<${itemType}>`;
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
        const safePropName = propName.includes(".") || propName.includes("-")
          ? `"${propName}"`
          : propName;
        props.push(`${safePropName}${optional}: ${tsType}`);
      }
      return `{ ${props.join("; ")} }`;
    }
    return "Record<string, unknown>";
  }

  return "unknown";
}
