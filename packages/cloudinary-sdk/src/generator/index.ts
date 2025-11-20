import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { type ClientType, generateApi } from "./api-generator";
import { parseOpenAPISpec } from "./parser";
import { generateTypes } from "./type-generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ApiSpec {
  specFile: string;
  apiClassName: string;
  clientType: ClientType;
  outputFile: string;
}

function main() {
  const packageRoot = join(__dirname, "../..");
  const apiDir = join(packageRoot, "api");
  const libDir = join(packageRoot, "lib");

  // Ensure lib directory exists
  mkdirSync(libDir, { recursive: true });

  // Define all API specifications
  const apiSpecs: ApiSpec[] = [
    {
      specFile: "upload.yaml",
      apiClassName: "UploadApi",
      clientType: "signed",
      outputFile: "upload-api.ts",
    },
    {
      specFile: "admin.yaml",
      apiClassName: "AdminApi",
      clientType: "signed",
      outputFile: "admin-api.ts",
    },
    {
      specFile: "unsigned-upload.yaml",
      apiClassName: "UnsignedUploadApi",
      clientType: "unsigned",
      outputFile: "unsigned-upload-api.ts",
    },
    {
      specFile: "provisioning.yaml",
      apiClassName: "ProvisioningApi",
      clientType: "provisioning",
      outputFile: "provisioning-api.ts",
    },
  ];

  // Collect all types from all specs
  const allTypes: string[] = [];

  console.log("Parsing OpenAPI specs and generating types...");

  for (const apiSpec of apiSpecs) {
    const specPath = join(apiDir, apiSpec.specFile);
    console.log(`  - Parsing ${apiSpec.specFile}...`);
    const spec = parseOpenAPISpec(specPath);

    const types = generateTypes(spec, `api/${apiSpec.specFile}`);
    if (types.trim().length > 0) {
      allTypes.push(types);
    }
  }

  // Write combined types file
  const typesContent = allTypes.join("\n\n");
  writeFileSync(join(libDir, "types.ts"), typesContent);
  console.log("Generated lib/types.ts");

  // Generate API classes
  console.log("\nGenerating API classes...");

  for (const apiSpec of apiSpecs) {
    const specPath = join(apiDir, apiSpec.specFile);
    console.log(`  - Generating ${apiSpec.apiClassName}...`);
    const spec = parseOpenAPISpec(specPath);

    const api = generateApi(
      spec,
      `api/${apiSpec.specFile}`,
      apiSpec.apiClassName,
      apiSpec.clientType,
    );

    writeFileSync(join(libDir, apiSpec.outputFile), api);
    console.log(`    Generated lib/${apiSpec.outputFile}`);
  }

  // Generate index.ts that exports all APIs
  const indexContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/*.yaml

export * from "./types";
export { UploadApi } from "./upload-api";
export { AdminApi } from "./admin-api";
export { UnsignedUploadApi } from "./unsigned-upload-api";
export { ProvisioningApi } from "./provisioning-api";
`;

  writeFileSync(join(libDir, "index.ts"), indexContent);
  console.log("\nGenerated lib/index.ts");

  console.log("\nCode generation complete!");
}

main();
