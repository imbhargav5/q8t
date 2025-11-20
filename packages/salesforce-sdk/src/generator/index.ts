import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parseOpenAPISpec } from "./parser";
import { generateTypes } from "./type-generator";
import { generateApi } from "./api-generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface APISpec {
  specPath: string;
  apiName: string;
  outputDir: string;
}

function main() {
  const packageRoot = join(__dirname, "../..");
  const libDir = join(packageRoot, "lib");

  // Ensure lib directory exists
  mkdirSync(libDir, { recursive: true });

  // Define all API specs
  const apiSpecs: APISpec[] = [
    {
      specPath: join(packageRoot, "api/rest-api.yaml"),
      apiName: "RestApi",
      outputDir: join(libDir, "rest"),
    },
    {
      specPath: join(packageRoot, "api/bulk-api.yaml"),
      apiName: "BulkApi",
      outputDir: join(libDir, "bulk"),
    },
    {
      specPath: join(packageRoot, "api/tooling-api.yaml"),
      apiName: "ToolingApi",
      outputDir: join(libDir, "tooling"),
    },
  ];

  // Generate code for each API
  for (const apiSpec of apiSpecs) {
    console.log(`\nProcessing ${apiSpec.apiName}...`);

    console.log(`Parsing ${apiSpec.specPath}...`);
    const spec = parseOpenAPISpec(apiSpec.specPath);

    console.log("Generating types...");
    const types = generateTypes(spec);

    console.log("Generating API methods...");
    const api = generateApi(spec, apiSpec.apiName);

    // Ensure output directory exists
    mkdirSync(apiSpec.outputDir, { recursive: true });

    // Write generated files
    writeFileSync(join(apiSpec.outputDir, "types.ts"), types);
    console.log(`Generated ${apiSpec.outputDir}/types.ts`);

    writeFileSync(join(apiSpec.outputDir, "api.ts"), api);
    console.log(`Generated ${apiSpec.outputDir}/api.ts`);

    // Generate index.ts for each API
    const indexContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from ${apiSpec.specPath}

export * from "./types";
export { ${apiSpec.apiName} } from "./api";
`;

    writeFileSync(join(apiSpec.outputDir, "index.ts"), indexContent);
    console.log(`Generated ${apiSpec.outputDir}/index.ts`);
  }

  // Generate main index.ts that exports everything
  const mainIndexContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// Salesforce SDK - Main exports

// Export authentication modules
export * from "../src/auth";

// Export REST API
export * as RestApi from "./rest";

// Export Bulk API 2.0
export * as BulkApi from "./bulk";

// Export Tooling API
export * as ToolingApi from "./tooling";

// Re-export API classes for convenience
export { RestApi as SalesforceRestApi } from "./rest/api";
export { BulkApi as SalesforceBulkApi } from "./bulk/api";
export { ToolingApi as SalesforceToolingApi } from "./tooling/api";
`;

  writeFileSync(join(libDir, "index.ts"), mainIndexContent);
  console.log(`\nGenerated ${libDir}/index.ts`);

  console.log("\n✓ Code generation complete!");
}

main();
