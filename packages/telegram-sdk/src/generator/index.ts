import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parseOpenAPISpec } from "./parser";
import { generateTypes } from "./type-generator";
import { generateApi } from "./api-generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ApiConfig {
  specFile: string;
  apiName: string;
  clientType: string;
  outputPrefix: string;
}

const APIS: ApiConfig[] = [
  {
    specFile: "bot-api.yaml",
    apiName: "bot",
    clientType: "BotHttpClient",
    outputPrefix: "bot",
  },
  {
    specFile: "gateway-api.yaml",
    apiName: "gateway",
    clientType: "GatewayHttpClient",
    outputPrefix: "gateway",
  },
  {
    specFile: "client-api.yaml",
    apiName: "client",
    clientType: "ClientHttpClient",
    outputPrefix: "client",
  },
];

function generateForApi(config: ApiConfig) {
  const packageRoot = join(__dirname, "../..");
  const specPath = join(packageRoot, "api", config.specFile);
  const libDir = join(packageRoot, "lib");

  console.log(`\nGenerating ${config.apiName} API...`);
  console.log(`Reading spec from: ${specPath}`);

  const spec = parseOpenAPISpec(specPath);

  console.log(`Parsing ${spec.info.title} v${spec.info.version}`);

  // Generate types
  console.log("Generating types...");
  const types = generateTypes(spec);

  // Generate API class
  console.log("Generating API methods...");
  const api = generateApi(spec, config.apiName, config.clientType, `${config.outputPrefix}-types`);

  // Ensure lib directory exists
  mkdirSync(libDir, { recursive: true });

  // Write generated files
  const typesFile = join(libDir, `${config.outputPrefix}-types.ts`);
  writeFileSync(typesFile, types);
  console.log(`✓ Generated ${config.outputPrefix}-types.ts`);

  const apiFile = join(libDir, `${config.outputPrefix}-api.ts`);
  writeFileSync(apiFile, api);
  console.log(`✓ Generated ${config.outputPrefix}-api.ts`);

  return {
    typesFile: `${config.outputPrefix}-types`,
    apiFile: `${config.outputPrefix}-api`,
    apiClassName: `${capitalize(config.apiName)}Api`,
  };
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function main() {
  console.log("╔═══════════════════════════════════════════════════════════╗");
  console.log("║  Telegram SDK Code Generator                              ║");
  console.log("║  Generating Bot API, Gateway API, and Client API          ║");
  console.log("╚═══════════════════════════════════════════════════════════╝");

  const packageRoot = join(__dirname, "../..");
  const libDir = join(packageRoot, "lib");

  const results = APIS.map((config) => generateForApi(config));

  // Generate main index.ts that exports all APIs
  console.log("\nGenerating main index.ts...");

  const indexContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Telegram API OpenAPI specifications

// Bot API
export * as BotTypes from "./${results[0].typesFile}";
export { ${results[0].apiClassName} } from "./${results[0].apiFile}";

// Gateway API
export * as GatewayTypes from "./${results[1].typesFile}";
export { ${results[1].apiClassName} } from "./${results[1].apiFile}";

// Client API
export * as ClientTypes from "./${results[2].typesFile}";
export { ${results[2].apiClassName} } from "./${results[2].apiFile}";
`;

  writeFileSync(join(libDir, "index.ts"), indexContent);
  console.log("✓ Generated index.ts");

  console.log("\n╔═══════════════════════════════════════════════════════════╗");
  console.log("║  Code generation complete! ✓                              ║");
  console.log("╚═══════════════════════════════════════════════════════════╝");
  console.log("\nGenerated files:");
  console.log(`  - lib/bot-types.ts (Bot API types)`);
  console.log(`  - lib/bot-api.ts (Bot API methods)`);
  console.log(`  - lib/gateway-types.ts (Gateway API types)`);
  console.log(`  - lib/gateway-api.ts (Gateway API methods)`);
  console.log(`  - lib/client-types.ts (Client API types)`);
  console.log(`  - lib/client-api.ts (Client API methods)`);
  console.log(`  - lib/index.ts (Main exports)`);
}

main();
