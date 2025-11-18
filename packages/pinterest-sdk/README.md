# Pinterest SDK

A TypeScript SDK for the Pinterest API v5 with OAuth 2.0 authentication.

## Features

- OAuth 2.0 authentication with PKCE support
- Auto-generated TypeScript types from OpenAPI spec
- Type-safe API client for Pinterest endpoints
- Automatic token refresh on 401 responses

## Installation

```bash
pnpm add @q8t/pinterest-sdk
```

## OAuth 2.0 Setup

### 1. Create a Pinterest App

1. Go to [Pinterest Developers](https://developers.pinterest.com/apps/)
2. Create a new app
3. Note your App ID (Client ID) and App Secret (Client Secret)
4. Configure your redirect URI

### 2. Generate Authorization URL

```typescript
import { generateAuthUrl, type PinterestAuthConfig } from "@q8t/pinterest-sdk";

const config: PinterestAuthConfig = {
  clientId: "your-app-id",
  clientSecret: "your-app-secret",
  redirectUri: "https://yourapp.com/callback",
  scopes: ["boards:read", "pins:read", "user_accounts:read"],
};

const { url, state, codeVerifier } = await generateAuthUrl(config);

// Store state and codeVerifier securely (e.g., in session)
// Redirect user to url
```

### 3. Exchange Code for Token

```typescript
import { exchangeCodeForToken } from "@q8t/pinterest-sdk";

const tokens = await exchangeCodeForToken({
  clientId: "your-app-id",
  clientSecret: "your-app-secret",
  code: "authorization-code-from-callback",
  redirectUri: "https://yourapp.com/callback",
  codeVerifier: "stored-code-verifier",
});

// tokens.access_token - Use for API requests
// tokens.refresh_token - Store securely for token refresh
```

### 4. Make API Requests

```typescript
import { createPinterestClient, PinterestApi } from "@q8t/pinterest-sdk";

const client = createPinterestClient({
  clientId: "your-app-id",
  clientSecret: "your-app-secret",
  accessToken: tokens.access_token,
  refreshToken: tokens.refresh_token,
  onTokenRefresh: (newTokens) => {
    // Store new tokens securely
    console.log("Tokens refreshed:", newTokens);
  },
});

const api = new PinterestApi(client);

// Get user account info
const user = await api.getUserAccount();

// List boards
const boards = await api.listBoards();

// List pins
const pins = await api.listPins();

// Create a pin
const newPin = await api.createPin({
  board_id: "board-id",
  media_source: {
    source_type: "image_url",
    url: "https://example.com/image.jpg",
  },
  title: "My Pin",
  description: "Pin description",
});
```

## Available Scopes

- `boards:read` - Read access to boards
- `boards:write` - Write access to boards
- `pins:read` - Read access to pins
- `pins:write` - Write access to pins
- `user_accounts:read` - Read access to user account info

## API Endpoints

The SDK provides methods for the following Pinterest API v5 endpoints:

- `getUserAccount()` - Get authenticated user's account info
- `listBoards()` - List user's boards
- `listPins()` - List user's pins
- `createPin(body)` - Create a new pin

## Token Refresh

The SDK automatically handles token refresh when receiving a 401 response. You can provide an `onTokenRefresh` callback to persist the new tokens.

## Code Generation

To regenerate the API client from the OpenAPI spec:

```bash
pnpm generate
```

This will parse `api/openapi.yaml` and generate TypeScript types and API methods in the `lib/` directory.

## License

MIT
