import type { OpenAPISpec, RefObject, SchemaObject } from "./parser";
import { isRefObject, resolveRef } from "./parser";

export function generateTypes(spec: OpenAPISpec): string {
  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    "// Generated from api/asana_oas.yaml",
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

  // Add description if available
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
      const safePropName =
        propName.includes(".") || propName.includes("-") ? `"${propName}"` : propName;

      // Add property description if available
      if (!isRefObject(propSchema) && propSchema.description) {
        lines.push(`  /** ${propSchema.description} */`);
      }

      lines.push(`  ${safePropName}${optional}: ${tsType};`);
    }
  } else if (schema.allOf) {
    // Handle allOf by merging properties
    const mergedProps = mergeAllOf(schema.allOf);
    for (const [propName, propSchema] of Object.entries(mergedProps)) {
      const tsType = schemaToTsType(propSchema);
      const safePropName =
        propName.includes(".") || propName.includes("-") ? `"${propName}"` : propName;
      lines.push(`  ${safePropName}: ${tsType};`);
    }
  }

  lines.push("}");

  return lines.join("\n");
}

function mergeAllOf(
  allOf: Array<SchemaObject | RefObject>,
): Record<string, SchemaObject | RefObject> {
  const merged: Record<string, SchemaObject | RefObject> = {};

  for (const schema of allOf) {
    if (!isRefObject(schema) && schema.properties) {
      Object.assign(merged, schema.properties);
    }
  }

  return merged;
}

function schemaToTsType(schema: SchemaObject | RefObject): string {
  if (isRefObject(schema)) {
    return resolveRef(schema.$ref);
  }

  if (schema.allOf) {
    return schema.allOf.map((s) => schemaToTsType(s)).join(" & ");
  }

  if (schema.anyOf || schema.oneOf) {
    const schemas = schema.anyOf || schema.oneOf || [];
    return schemas.map((s) => schemaToTsType(s)).join(" | ");
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
    if (schema.additionalProperties) {
      if (typeof schema.additionalProperties === "object") {
        const valueType = schemaToTsType(schema.additionalProperties);
        return `Record<string, ${valueType}>`;
      }
      return "Record<string, unknown>";
    }
    return "Record<string, unknown>";
  }

  // Handle null type
  if (schema.type === "null") {
    return "null";
  }

  return "unknown";
}
