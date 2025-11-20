import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseOpenAPISpec } from "./parser";
import { generateTypes } from "./type-generator";
import { generateApi } from "./api-generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function main() {
  const packageRoot = join(__dirname, "../..");
  const specPath = join(packageRoot, "api/openapi.yaml");
  const libDir = join(packageRoot, "lib");

  console.log("Parsing OpenAPI spec...");
  const spec = parseOpenAPISpec(specPath);

  console.log("Generating types...");
  const types = generateTypes(spec);

  console.log("Generating API methods...");
  const api = generateApi(spec);

  // Ensure lib directory exists
  mkdirSync(libDir, { recursive: true });

  // Write generated files
  writeFileSync(join(libDir, "types.ts"), types);
  console.log("Generated lib/types.ts");

  writeFileSync(join(libDir, "api.ts"), api);
  console.log("Generated lib/api.ts");

  // Generate index.ts
  const indexContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export * from "./types";
export { ClickUpApi } from "./api";
`;

  writeFileSync(join(libDir, "index.ts"), indexContent);
  console.log("Generated lib/index.ts");

  console.log("Code generation complete!");
}

main();
