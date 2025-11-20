import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parseOpenAPISpec } from "./parser";
import { generateTypes } from "./type-generator";
import { generateApi } from "./api-generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function main() {
  const packageRoot = join(__dirname, "../..");
  const libDir = join(packageRoot, "lib");

  console.log("Creating lib directory...");
  mkdirSync(libDir, { recursive: true });

  // ============= Hub API Generation =============
  console.log("\n=== Generating Hub API ===");
  const hubSpecPath = join(packageRoot, "api/hub-openapi.yaml");
  console.log("Parsing Hub OpenAPI spec...");
  const hubSpec = parseOpenAPISpec(hubSpecPath);

  console.log("Generating Hub types...");
  const hubTypes = generateTypes(hubSpec);

  console.log("Generating Hub API methods...");
  const hubApi = generateApi(hubSpec, "HubApi", "HubTypes");

  writeFileSync(join(libDir, "hub-types.ts"), hubTypes);
  writeFileSync(join(libDir, "hub-api.ts"), hubApi);

  console.log("✓ Hub API generation complete!");

  // ============= Warpcast API Generation =============
  console.log("\n=== Generating Warpcast API ===");
  const warpcastSpecPath = join(packageRoot, "api/warpcast-openapi.yaml");
  console.log("Parsing Warpcast OpenAPI spec...");
  const warpcastSpec = parseOpenAPISpec(warpcastSpecPath);

  console.log("Generating Warpcast types...");
  const warpcastTypes = generateTypes(warpcastSpec);

  console.log("Generating Warpcast API methods...");
  const warpcastApi = generateApi(warpcastSpec, "WarpcastApi", "WarpcastTypes");

  writeFileSync(join(libDir, "warpcast-types.ts"), warpcastTypes);
  writeFileSync(join(libDir, "warpcast-api.ts"), warpcastApi);

  console.log("✓ Warpcast API generation complete!");

  // ============= Signer API Generation =============
  console.log("\n=== Generating Signer API ===");
  const signerSpecPath = join(packageRoot, "api/signer-openapi.yaml");
  console.log("Parsing Signer OpenAPI spec...");
  const signerSpec = parseOpenAPISpec(signerSpecPath);

  console.log("Generating Signer types...");
  const signerTypes = generateTypes(signerSpec);

  console.log("Generating Signer API methods...");
  const signerApi = generateApi(signerSpec, "SignerApi", "SignerTypes");

  writeFileSync(join(libDir, "signer-types.ts"), signerTypes);
  writeFileSync(join(libDir, "signer-api.ts"), signerApi);

  console.log("✓ Signer API generation complete!");

  // ============= Generate Index File =============
  console.log("\n=== Generating index file ===");
  const indexContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from OpenAPI specifications

// Hub API
export * from "./hub-types";
export { HubApi } from "./hub-api";

// Warpcast API
export * from "./warpcast-types";
export { WarpcastApi } from "./warpcast-api";

// Signer API
export * from "./signer-types";
export { SignerApi } from "./signer-api";
`;

  writeFileSync(join(libDir, "index.ts"), indexContent);

  console.log("✓ Index file generation complete!");
  console.log("\n✅ All code generation complete!");
}

main();
