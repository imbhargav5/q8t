# @q8t/x-sdk

X (Twitter) API SDK with code generation from YAML definitions.

## Features

- OAuth 2.0 authentication with PKCE
- Auto-generated TypeScript types from OpenAPI YAML
- Type-safe API methods
- Token refresh handling

## Usage

```typescript
import { createXClient, XApi } from "@q8t/x-sdk";

// Create authenticated client
const client = createXClient({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "user-access-token",
  refreshToken: "user-refresh-token",
});

// Use generated API methods
const api = new XApi(client);
const tweet = await api.createTweet({ text: "Hello from X SDK!" });
const user = await api.getMe();
```

## Authentication

The SDK supports OAuth 2.0 with PKCE flow:

```typescript
import { XAuthConfig, generateAuthUrl, exchangeCodeForToken } from "@q8t/x-sdk";

const config: XAuthConfig = {
  clientId: "your-client-id",
  redirectUri: "http://localhost:3000/callback",
  scopes: ["tweet.read", "tweet.write", "users.read"],
};

// Generate authorization URL
const { url, codeVerifier, state } = generateAuthUrl(config);

// After user authorizes, exchange code for tokens
const tokens = await exchangeCodeForToken({
  clientId: config.clientId,
  clientSecret: "your-client-secret",
  code: "authorization-code",
  redirectUri: config.redirectUri,
  codeVerifier,
});
```

## Code Generation

The SDK uses YAML definitions to generate TypeScript code:

```bash
# Generate lib/ from api/openapi.yaml
pnpm generate

# Build the package
pnpm build
```

## API Definitions

API endpoints are defined in `api/openapi.yaml`. The generator reads this file and produces:

- `lib/types.ts` - TypeScript interfaces for request/response types
- `lib/api.ts` - Type-safe API methods
- `lib/index.ts` - Main exports
