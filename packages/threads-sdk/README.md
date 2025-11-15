# @q8t/threads-sdk

A TypeScript SDK for the Threads API with code generation from OpenAPI specifications.

## Features

- **OAuth 2.0 Authentication**: Full Meta OAuth flow with PKCE support
- **Type-Safe API**: Auto-generated TypeScript types from OpenAPI spec
- **Automatic Token Refresh**: Built-in token refresh handling
- **Complete Threads API Coverage**: Posts, profiles, and media management

## Installation

```bash
pnpm add @q8t/threads-sdk
```

## OAuth Setup

Threads uses Meta's OAuth 2.0 implementation. To get started:

1. Create a Meta App at [Meta for Developers](https://developers.facebook.com/)
2. Add the Threads API product to your app
3. Configure your OAuth redirect URIs
4. Note your App ID (Client ID) and App Secret

### Available Scopes

- `threads_basic` - Read user profile information
- `threads_content_publish` - Create and publish threads
- `threads_manage_insights` - Access insights data
- `threads_manage_replies` - Manage replies to threads
- `threads_read_replies` - Read replies to threads

## Quick Start

### 1. Configure Authentication

```typescript
import { ThreadsAuthConfig } from "@q8t/threads-sdk";

const config: ThreadsAuthConfig = {
  clientId: "YOUR_APP_ID",
  clientSecret: "YOUR_APP_SECRET", // Optional for public clients
  redirectUri: "https://yourapp.com/callback",
  scopes: ["threads_basic", "threads_content_publish"],
};
```

### 2. Generate Authorization URL

```typescript
import { generateAuthUrl } from "@q8t/threads-sdk";

const { url, state, codeVerifier } = await generateAuthUrl(config);
// Redirect user to `url`
// Store `state` and `codeVerifier` for the callback
```

### 3. Exchange Code for Token

```typescript
import { exchangeCodeForToken } from "@q8t/threads-sdk";

const tokens = await exchangeCodeForToken({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  code: "AUTHORIZATION_CODE_FROM_CALLBACK",
  redirectUri: config.redirectUri,
  codeVerifier: storedCodeVerifier,
});
```

### 4. Create API Client

```typescript
import { createThreadsClient, ThreadsApi } from "@q8t/threads-sdk";

const httpClient = createThreadsClient({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  accessToken: tokens.access_token,
  refreshToken: tokens.refresh_token,
  onTokenRefresh: (newTokens) => {
    // Store new tokens
    console.log("Tokens refreshed:", newTokens);
  },
});

const api = new ThreadsApi(httpClient);
```

### 5. Make API Calls

```typescript
// Get user profile
const profile = await api.getMe();
console.log("Profile:", profile);

// Create a new thread
const thread = await api.createThread("USER_ID", {
  media_type: "TEXT",
  text: "Hello from Threads SDK!",
});

// List user's threads
const threads = await api.getUserThreads("USER_ID");
```

## Token Management

### Refreshing Tokens

```typescript
import { refreshAccessToken } from "@q8t/threads-sdk";

const newTokens = await refreshAccessToken({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  refreshToken: currentRefreshToken,
});
```

### Long-Lived Tokens

Threads API supports exchanging short-lived tokens for long-lived tokens (60 days):

```typescript
import { exchangeForLongLivedToken } from "@q8t/threads-sdk";

const longLivedToken = await exchangeForLongLivedToken({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  accessToken: shortLivedToken,
});
```

## Code Generation

The SDK uses code generation from OpenAPI specifications:

```bash
# Generate API client and types
pnpm generate
```

This reads `api/openapi.yaml` and generates:

- `lib/types.ts` - TypeScript interfaces for all data models
- `lib/api.ts` - Type-safe API methods
- `lib/index.ts` - Exports

## API Endpoints

### User Profile

- `GET /me` - Get authenticated user's profile

### Threads

- `POST /{user-id}/threads` - Create a new thread
- `GET /{user-id}/threads` - List user's threads
- `GET /{thread-id}` - Get a specific thread

## Error Handling

```typescript
try {
  const profile = await api.getMe();
} catch (error) {
  if (error.message.includes("401")) {
    // Token expired - will auto-refresh if refreshToken provided
  } else if (error.message.includes("400")) {
    // Bad request - check parameters
  }
}
```

## Development

```bash
# Install dependencies
pnpm install

# Generate API client
pnpm generate

# Build
pnpm build

# Lint
pnpm lint

# Format
pnpm format
```

## License

MIT
