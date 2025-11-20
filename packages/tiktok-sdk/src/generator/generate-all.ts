import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parseOpenAPISpec } from "./parser";
import { generateTypes } from "./type-generator";
import { generateApi } from "./api-generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface APISpec {
  name: string;
  specFile: string;
  clientName: string;
  description: string;
}

const API_SPECS: APISpec[] = [
  {
    name: "user-oauth",
    specFile: "user-oauth-api.yaml",
    clientName: "UserOAuthApi",
    description: "User OAuth API (Display API, Content Posting API)",
  },
  {
    name: "client-credentials",
    specFile: "client-credentials-api.yaml",
    clientName: "ClientCredentialsApi",
    description: "Client Credentials API (Research API, Commercial Content API)",
  },
  {
    name: "business",
    specFile: "business-api.yaml",
    clientName: "BusinessApi",
    description: "Business/Marketing API (Campaign, Ad, Creative Management)",
  },
];

function generateForSpec(spec: APISpec, packageRoot: string) {
  const specPath = join(packageRoot, "api", spec.specFile);
  const libDir = join(packageRoot, "lib", spec.name);

  console.log(`\n=== Generating ${spec.description} ===`);
  console.log(`Reading spec: ${specPath}`);

  const openApiSpec = parseOpenAPISpec(specPath);

  console.log("Generating types...");
  const types = generateTypes(openApiSpec);

  console.log("Generating API methods...");
  const api = generateApi(openApiSpec, spec.clientName);

  // Ensure lib directory exists
  mkdirSync(libDir, { recursive: true });

  // Write generated files
  writeFileSync(join(libDir, "types.ts"), types);
  console.log(`✓ Generated lib/${spec.name}/types.ts`);

  writeFileSync(join(libDir, "api.ts"), api);
  console.log(`✓ Generated lib/${spec.name}/api.ts`);

  // Generate index.ts for this API
  const indexContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/${spec.specFile}

export * from "./types";
export { ${spec.clientName} } from "./api";
`;

  writeFileSync(join(libDir, "index.ts"), indexContent);
  console.log(`✓ Generated lib/${spec.name}/index.ts`);
}

function main() {
  const packageRoot = join(__dirname, "../..");

  console.log("TikTok SDK Code Generator");
  console.log("========================\n");

  // Generate code for each API spec
  for (const spec of API_SPECS) {
    try {
      generateForSpec(spec, packageRoot);
    } catch (error) {
      console.error(`✗ Error generating ${spec.name}:`, error);
      process.exit(1);
    }
  }

  // Generate main lib index that exports all APIs
  const mainLibDir = join(packageRoot, "lib");
  const mainIndexContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// Main entry point for all TikTok APIs

// User OAuth API (Display API, Content Posting API)
export * as UserOAuthAPI from "./user-oauth";

// Client Credentials API (Research API, Commercial Content API)
export * as ClientCredentialsAPI from "./client-credentials";

// Business API (Marketing/Advertising API)
export * as BusinessAPI from "./business";
`;

  writeFileSync(join(mainLibDir, "index.ts"), mainIndexContent);
  console.log("\n✓ Generated lib/index.ts (main exports)");

  console.log("\n=========================");
  console.log("Code generation complete!");
  console.log("=========================\n");
}

main();
