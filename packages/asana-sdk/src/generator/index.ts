import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { generateApi } from "./api-generator";
import { parseOpenAPISpec } from "./parser";
import { generateTypes } from "./type-generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function main() {
  const packageRoot = join(__dirname, "../..");
  const specPath = join(packageRoot, "api/asana_oas.yaml");
  const libDir = join(packageRoot, "lib");

  console.log("Parsing Asana OpenAPI spec...");
  const spec = parseOpenAPISpec(specPath);

  console.log(`Found ${Object.keys(spec.paths).length} API paths`);
  console.log(`Found ${Object.keys(spec.components.schemas).length} schema definitions`);

  console.log("\nGenerating TypeScript types...");
  const types = generateTypes(spec);

  console.log("Generating API methods...");
  const api = generateApi(spec);

  // Ensure lib directory exists
  mkdirSync(libDir, { recursive: true });

  // Write generated files
  writeFileSync(join(libDir, "types.ts"), types);
  console.log("✓ Generated lib/types.ts");

  writeFileSync(join(libDir, "api.ts"), api);
  console.log("✓ Generated lib/api.ts");

  // Generate index.ts
  const indexContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/asana_oas.yaml

export * from "./types";
export { AsanaApi } from "./api";
`;

  writeFileSync(join(libDir, "index.ts"), indexContent);
  console.log("✓ Generated lib/index.ts");

  console.log("\n✅ Code generation complete!");
  console.log("\nGenerated files:");
  console.log(`  - lib/types.ts (${Object.keys(spec.components.schemas).length} types)`);
  console.log(`  - lib/api.ts (${Object.keys(spec.paths).length} endpoints)`);
  console.log("  - lib/index.ts");
}

main();
