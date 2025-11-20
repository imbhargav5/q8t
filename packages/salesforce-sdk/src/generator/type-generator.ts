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
    lines.push(generateInterface(name, schema));
    lines.push("");
  }

  return lines.join("\n");
}

function generateInterface(name: string, schema: SchemaObject): string {
  const lines: string[] = [];

  lines.push(`export interface ${name} {`);

  if (schema.properties) {
    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      const isRequired = schema.required?.includes(propName) ?? false;
      const optional = isRequired ? "" : "?";
      const tsType = schemaToTsType(propSchema);
      const safePropName =
        propName.includes(".") || propName.includes("-") ? `"${propName}"` : propName;
      lines.push(`  ${safePropName}${optional}: ${tsType};`);
    }
  }

  // Handle additionalProperties
  if (schema.additionalProperties === true) {
    lines.push(`  [key: string]: unknown;`);
  } else if (typeof schema.additionalProperties === "object") {
    const additionalType = schemaToTsType(schema.additionalProperties);
    lines.push(`  [key: string]: ${additionalType};`);
  }

  lines.push("}");

  return lines.join("\n");
}

function schemaToTsType(schema: SchemaObject | RefObject): string {
  if (isRefObject(schema)) {
    return resolveRef(schema.$ref);
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
        const safePropName =
          propName.includes(".") || propName.includes("-") ? `"${propName}"` : propName;
        props.push(`${safePropName}${optional}: ${tsType}`);
      }
      return `{ ${props.join("; ")} }`;
    }

    if (schema.additionalProperties === true) {
      return "Record<string, unknown>";
    } else if (typeof schema.additionalProperties === "object") {
      const additionalType = schemaToTsType(schema.additionalProperties);
      return `Record<string, ${additionalType}>`;
    }

    return "Record<string, unknown>";
  }

  return "unknown";
}
