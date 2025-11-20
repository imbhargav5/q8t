import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parseOpenAPISpec } from "./parser";
import { generateTypes } from "./type-generator";
import { generateApi } from "./api-generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface GeneratorConfig {
  specPath: string;
  outputDir: string;
  className: string;
  typesFileName: string;
  apiFileName: string;
}

function generateFromSpec(config: GeneratorConfig) {
  console.log(`Parsing ${config.specPath}...`);
  const spec = parseOpenAPISpec(config.specPath);

  console.log("Generating types...");
  const types = generateTypes(spec);

  console.log("Generating API methods...");
  const api = generateApi(spec, config.className);

  // Ensure output directory exists
  mkdirSync(config.outputDir, { recursive: true });

  // Write generated files
  writeFileSync(join(config.outputDir, config.typesFileName), types);
  console.log(`Generated ${config.outputDir}/${config.typesFileName}`);

  writeFileSync(join(config.outputDir, config.apiFileName), api);
  console.log(`Generated ${config.outputDir}/${config.apiFileName}`);
}

function main() {
  const packageRoot = join(__dirname, "../..");
  const libDir = join(packageRoot, "lib");

  // Generate Public API (API Key authentication)
  generateFromSpec({
    specPath: join(packageRoot, "api/public-api.yaml"),
    outputDir: join(libDir, "public"),
    className: "TrustpilotPublicApi",
    typesFileName: "types.ts",
    apiFileName: "api.ts",
  });

  // Generate Business API (OAuth2 authentication)
  generateFromSpec({
    specPath: join(packageRoot, "api/business-api.yaml"),
    outputDir: join(libDir, "business"),
    className: "TrustpilotBusinessApi",
    typesFileName: "types.ts",
    apiFileName: "api.ts",
  });

  // Generate index files for each client
  const publicIndex = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/public-api.yaml

export * from "./types";
export { TrustpilotPublicApi } from "./api";
`;
  writeFileSync(join(libDir, "public", "index.ts"), publicIndex);
  console.log("Generated lib/public/index.ts");

  const businessIndex = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/business-api.yaml

export * from "./types";
export { TrustpilotBusinessApi } from "./api";
`;
  writeFileSync(join(libDir, "business", "index.ts"), businessIndex);
  console.log("Generated lib/business/index.ts");

  // Generate main lib index
  const mainIndex = `// AUTO-GENERATED FILE - DO NOT EDIT
// Re-exports for Trustpilot SDK

export * as PublicApi from "./public";
export * as BusinessApi from "./business";
`;
  writeFileSync(join(libDir, "index.ts"), mainIndex);
  console.log("Generated lib/index.ts");

  console.log("Code generation complete!");
}

main();
