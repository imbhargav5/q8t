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

  // Generate Core API
  console.log("Generating Core API...");
  generateAPIFromSpec(
    join(packageRoot, "api/core-api.yaml"),
    join(packageRoot, "lib/core"),
    "DropboxCoreApi",
  );

  // Generate Team API
  console.log("Generating Team API...");
  generateAPIFromSpec(
    join(packageRoot, "api/team-api.yaml"),
    join(packageRoot, "lib/team"),
    "DropboxTeamApi",
  );

  console.log("Code generation complete!");
}

function generateAPIFromSpec(specPath: string, outputDir: string, apiClassName: string) {
  console.log(`Parsing ${specPath}...`);
  const spec = parseOpenAPISpec(specPath);

  console.log("Generating types...");
  const types = generateTypes(spec);

  console.log("Generating API methods...");
  const api = generateApi(spec, apiClassName);

  // Ensure output directory exists
  mkdirSync(outputDir, { recursive: true });

  // Write generated files
  writeFileSync(join(outputDir, "types.ts"), types);
  console.log(`Generated ${outputDir}/types.ts`);

  writeFileSync(join(outputDir, "api.ts"), api);
  console.log(`Generated ${outputDir}/api.ts`);

  // Generate index.ts
  const indexContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from ${specPath}

export * from "./types";
export { ${apiClassName} } from "./api";
`;

  writeFileSync(join(outputDir, "index.ts"), indexContent);
  console.log(`Generated ${outputDir}/index.ts`);
}

main();
