# Effect SDK Migration - Next Steps

## Current Status (Updated)

### ✅ Completed (19/25 generators)
- asana, bluesky, clickup, discord, dribbble, facebook, google-my-business
- instagram, linkedin, mastodon, notion, pinterest, reddit, slack
- threads, whatsapp, x, youtube
- **airtable** ✨ (just completed)

### ⚠️ Remaining (6 complex generators)
1. **cloudinary-sdk** - Multi-API structure (Upload, Admin, Provisioning)
2. **dropbox-sdk** - Separate Core/Team APIs
3. **farcaster-sdk** - Custom generator pattern
4. **salesforce-sdk** - Dynamic API structure
5. **telegram-sdk** - Bot/Client/Gateway split
6. **tiktok-sdk** - Dynamic class generation
7. **trustpilot-sdk** - Unique pattern
8. **monday-sdk** - Missing generator (needs investigation)

## How to Fix Remaining Generators

### Pattern to Apply (from airtable-sdk example)

**Step 1: Update imports** (lines ~16-30)
```typescript
// BEFORE:
const clientImport = clientType === "PAT"
  ? 'import type { PATHttpClient } from "../src/auth/pat-client";'
  : 'import type { OAuthHttpClient } from "../src/auth/oauth-client";';

const lines: string[] = [
  "// AUTO-GENERATED FILE - DO NOT EDIT",
  clientImport,
  'import type * as Types from "./types";',
  `export class ${className} {`,
  `  private client: ${clientTypeName};`,
  ...
];

// AFTER:
const lines: string[] = [
  "// AUTO-GENERATED FILE - DO NOT EDIT",
  'import { Effect } from "effect";',
  'import type { HttpClient } from "@q8t/effect-sdk-base";',
  'import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";',
  'import type * as Types from "./types";',
  `export class ${className} {`,
  "  constructor() {}",  // No client injection
  ...
];
```

**Step 2: Update method signature** (around line ~130)
```typescript
// BEFORE:
lines.push(`  async ${methodName}(${params}): Promise<${endpoint.responseType}> {`);

// AFTER:
const errorType = "HttpError | NetworkError | ParseError";
lines.push(`  ${methodName}(${params}): Effect.Effect<${endpoint.responseType}, ${errorType}, HttpClient> {`);
```

**Step 3: Wrap method body with Effect.gen** (around line ~135)
```typescript
// BEFORE:
// Generate method body
if (endpoint.method === "GET") {
  lines.push(`    return this.client.get<${endpoint.responseType}>(${pathExpr});`);
}

// AFTER:
// Generate method body using Effect.gen
lines.push("    return Effect.gen(function* () {");
lines.push("      const client = yield* HttpClient;");

if (endpoint.method === "GET") {
  lines.push(`      return yield* client.get<${endpoint.responseType}>(${pathExpr});`);
}

lines.push("    });");  // Close Effect.gen
```

**Step 4: Update HTTP client calls**
```typescript
// BEFORE:
return this.client.get<T>(path, params);

// AFTER:
return yield* client.get<T>(path, { queryParams: params });

// Note: Update method signature to use options object
```

**Step 5: Add closing brace for Effect.gen**
```typescript
// At the end of method generation (before `lines.push("  }")`)
lines.push("    });");  // Close Effect.gen
lines.push("  }");      // Close method
```

## Quick Fix Commands

For each remaining SDK:

```bash
# 1. Open the api-generator.ts file
code packages/cloudinary-sdk/src/generator/api-generator.ts

# 2. Apply the 5-step pattern above

# 3. Save and test generation
cd packages/cloudinary-sdk && pnpm generate

# 4. Check for compilation errors
pnpm tsc --noEmit
```

## Specific SDK Notes

### cloudinary-sdk
- Has Upload, Admin, Unsigned, and Provisioning APIs
- Each may have separate generators
- Check `src/generator/` directory for multiple generator files

### dropbox-sdk
- Core API and Team API
- Likely has 2 generator files or 2 API classes

### telegram-sdk
- Structure: `src/bot/`, `src/client/`, `src/gateway/`
- May need separate effect-client.ts in each directory
- Check if each has its own generator

### monday-sdk
- No `api-generator.ts` found in initial scan
- Check if it uses a different code generation approach
- May be hand-written or use different structure

### salesforce-sdk
- Likely uses dynamic object/class generation
- Check for template-based generation

## After Fixing Generators

### 1. Regenerate All SDK Code
```bash
# Run in each SDK directory
for sdk in packages/*-sdk; do
  echo "Regenerating $sdk..."
  cd $sdk && pnpm generate && cd ../..
done
```

### 2. Check for TypeScript Errors
```bash
# In each SDK
pnpm tsc --noEmit
```

### 3. Test Pilot SDKs
```typescript
// Test dribbble-sdk
import { createDribbbleSDK } from "@q8t/dribbble-sdk";
import { DribbbleApi } from "@q8t/dribbble-sdk/lib/api";
import { Effect } from "effect";

const sdk = createDribbbleSDK({ accessToken: "test" });
const api = new DribbbleApi();

const program = api.getUser("123");
const result = await Effect.runPromise(sdk.run(program));
```

### 4. Create Migration Guide
Document for users:
- How to migrate from Promise to Effect
- Example usage patterns
- Error handling with Effect
- Breaking changes list

## Files Modified So Far

- **Created**: `packages/effect-sdk-base/` (complete)
- **Modified**: 28 × `package.json` (dependencies)
- **Modified**: 19 × `src/generator/api-generator.ts` (Effect patterns)
- **Created**: 26 × `src/auth/effect-client.ts` (Layer factories)
- **Modified**: 26 × `src/auth/index.ts` (exports)

## Estimated Time to Complete

- Fix 6 remaining generators: ~2-3 hours (20-30 min each)
- Regenerate all SDKs: ~30 minutes
- Test pilot SDKs: ~1 hour
- Documentation: ~2 hours

**Total**: ~5-6 hours of focused work

## Branch Status

- Branch: `effect-sdk-migration`
- Latest commit: `de44a32` - "feat: Migrate 18 SDKs to Effect..."
- Files changed so far: 107
- Ready for PR after remaining generators are fixed
