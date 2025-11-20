import type { OpenAPISpec, SchemaObject, RefObject } from "./parser";
import { resolveRef, isRefObject } from "./parser";

export function generateTypes(spec: OpenAPISpec): string {
  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    `// Generated from ${spec.info.title} OpenAPI specification`,
    "",
  ];

  // Generate type definitions from schemas
  for (const [name, schema] of Object.entries(spec.components.schemas)) {
    lines.push(generateTypeDefinition(name, schema));
    lines.push("");
  }

  return lines.join("\n");
}

function generateTypeDefinition(name: string, schema: SchemaObject): string {
  const lines: string[] = [];

  if (schema.enum) {
    // Generate enum type
    const values = schema.enum.map((v) => `"${v}"`).join(" | ");
    lines.push(`export type ${name} = ${values};`);
  } else if (schema.type === "object" && schema.properties) {
    // Generate interface
    lines.push(`export interface ${name} {`);
    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      const isRequired = schema.required?.includes(propName);
      const optional = isRequired ? "" : "?";
      const typeStr = getTypeString(propSchema);
      lines.push(`  ${propName}${optional}: ${typeStr};`);
    }
    lines.push(`}`);
  } else if (schema.type === "array" && schema.items) {
    // Generate array type
    const itemType = getTypeString(schema.items);
    lines.push(`export type ${name} = ${itemType}[];`);
  } else {
    // Generate simple type alias
    const typeStr = getTypeString(schema);
    lines.push(`export type ${name} = ${typeStr};`);
  }

  return lines.join("\n");
}

function getTypeString(schema: SchemaObject | RefObject): string {
  if (isRefObject(schema)) {
    return resolveRef(schema.$ref);
  }

  if (schema.enum) {
    return schema.enum.map((v) => `"${v}"`).join(" | ");
  }

  switch (schema.type) {
    case "string":
      return "string";
    case "number":
    case "integer":
      return "number";
    case "boolean":
      return "boolean";
    case "array":
      if (schema.items) {
        const itemType = getTypeString(schema.items);
        return `${itemType}[]`;
      }
      return "unknown[]";
    case "object":
      if (schema.properties) {
        const props: string[] = [];
        for (const [propName, propSchema] of Object.entries(schema.properties)) {
          const isRequired = schema.required?.includes(propName);
          const optional = isRequired ? "" : "?";
          const typeStr = getTypeString(propSchema);
          props.push(`${propName}${optional}: ${typeStr}`);
        }
        return `{ ${props.join("; ")} }`;
      }
      return "Record<string, any>";
    default:
      return "unknown";
  }
}
