import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parseOpenAPISpec } from "./parser";
import { generateTypes } from "./type-generator";
import { generateApi } from "./api-generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface APISpec {
  file: string;
  className: string;
  clientType: "PAT" | "OAuth";
  description: string;
}

const API_SPECS: APISpec[] = [
  {
    file: "web-api.yaml",
    className: "AirtableWebApi",
    clientType: "PAT",
    description: "Core Web API for records, tables, fields, and views",
  },
  {
    file: "oauth-api.yaml",
    className: "AirtableOAuthApi",
    clientType: "OAuth",
    description: "OAuth-authenticated Web API",
  },
  {
    file: "webhooks-api.yaml",
    className: "AirtableWebhooksApi",
    clientType: "PAT",
    description: "Webhooks API for real-time notifications",
  },
  {
    file: "comments-api.yaml",
    className: "AirtableCommentsApi",
    clientType: "PAT",
    description: "Comments API for record discussions",
  },
  {
    file: "enterprise-api.yaml",
    className: "AirtableEnterpriseApi",
    clientType: "PAT",
    description: "Enterprise API for user and workspace management",
  },
];

function main() {
  const packageRoot = join(__dirname, "../..");
  const apiDir = join(packageRoot, "api");
  const libDir = join(packageRoot, "lib");

  console.log("Generating Airtable SDK...\n");

  // Ensure lib directory exists
  mkdirSync(libDir, { recursive: true });

  // Collect all schemas across all specs
  const allSchemas: Record<string, any> = {};

  console.log("Parsing OpenAPI specifications...");
  for (const apiSpec of API_SPECS) {
    const specPath = join(apiDir, apiSpec.file);
    console.log(`  - ${apiSpec.file}`);
    const spec = parseOpenAPISpec(specPath);

    // Merge schemas
    Object.assign(allSchemas, spec.components.schemas);
  }

  // Generate unified types file
  console.log("\nGenerating unified types...");
  const typesContent = generateUnifiedTypes(allSchemas);
  writeFileSync(join(libDir, "types.ts"), typesContent);
  console.log("  ✓ Generated lib/types.ts");

  // Generate API classes for each spec
  console.log("\nGenerating API classes...");
  for (const apiSpec of API_SPECS) {
    const specPath = join(apiDir, apiSpec.file);
    const spec = parseOpenAPISpec(specPath);

    console.log(`  - ${apiSpec.className} (${apiSpec.description})`);
    const apiContent = generateApi(spec, apiSpec.className, apiSpec.clientType);

    const apiFileName = apiSpec.className
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .slice(1) + ".ts";

    writeFileSync(join(libDir, apiFileName), apiContent);
    console.log(`    ✓ Generated lib/${apiFileName}`);
  }

  // Generate index.ts with all exports
  console.log("\nGenerating index file...");
  const indexContent = generateIndexFile(API_SPECS);
  writeFileSync(join(libDir, "index.ts"), indexContent);
  console.log("  ✓ Generated lib/index.ts");

  console.log("\n✨ Code generation complete!");
}

function generateUnifiedTypes(schemas: Record<string, any>): string {
  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    "// Generated from api/*.yaml OpenAPI specifications",
    "",
  ];

  for (const [name, schema] of Object.entries(schemas)) {
    lines.push(generateInterface(name, schema));
    lines.push("");
  }

  return lines.join("\n");
}

function generateInterface(name: string, schema: any): string {
  const lines: string[] = [];

  if (schema.description) {
    lines.push(`/**`);
    lines.push(` * ${schema.description}`);
    lines.push(` */`);
  }

  lines.push(`export interface ${name} {`);

  if (schema.properties) {
    for (const [propName, propSchema] of Object.entries(schema.properties) as any) {
      const isRequired = schema.required?.includes(propName) ?? false;
      const optional = isRequired ? "" : "?";
      const tsType = schemaToTsType(propSchema);
      const safePropName = propName.includes(".") || propName.includes("-") ? `"${propName}"` : propName;

      if (propSchema.description) {
        lines.push(`  /** ${propSchema.description} */`);
      }

      lines.push(`  ${safePropName}${optional}: ${tsType};`);
    }
  }

  if (schema.additionalProperties === true) {
    lines.push(`  [key: string]: unknown;`);
  } else if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
    const additionalType = schemaToTsType(schema.additionalProperties);
    lines.push(`  [key: string]: ${additionalType};`);
  }

  lines.push("}");

  return lines.join("\n");
}

function schemaToTsType(schema: any): string {
  if (schema.$ref) {
    const parts = schema.$ref.split("/");
    return parts[parts.length - 1];
  }

  if (schema.type === "string") {
    if (schema.enum) {
      return schema.enum.map((v: string) => `"${v}"`).join(" | ");
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
      for (const [propName, propSchema] of Object.entries(schema.properties) as any) {
        const isRequired = schema.required?.includes(propName) ?? false;
        const optional = isRequired ? "" : "?";
        const tsType = schemaToTsType(propSchema);
        const safePropName = propName.includes(".") || propName.includes("-") ? `"${propName}"` : propName;
        props.push(`${safePropName}${optional}: ${tsType}`);
      }
      return `{ ${props.join("; ")} }`;
    }
    if (schema.additionalProperties) {
      if (schema.additionalProperties === true) {
        return "Record<string, unknown>";
      }
      const additionalType = schemaToTsType(schema.additionalProperties);
      return `Record<string, ${additionalType}>`;
    }
    return "Record<string, unknown>";
  }

  return "unknown";
}

function generateIndexFile(specs: APISpec[]): string {
  const lines: string[] = [
    "// AUTO-GENERATED FILE - DO NOT EDIT",
    "// Generated from api/*.yaml OpenAPI specifications",
    "",
    "// Export types",
    'export * from "./types";',
    "",
    "// Export API classes",
  ];

  for (const spec of specs) {
    const fileName = spec.className
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .slice(1);
    lines.push(`export { ${spec.className} } from "./${fileName}";`);
  }

  return lines.join("\n");
}

main();
