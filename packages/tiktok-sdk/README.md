# TikTok SDK

A TypeScript SDK for the TikTok API with OAuth 2.0 authentication and auto-generated type-safe API client.

## Features

- OAuth 2.0 Authorization Code Flow with PKCE
- Type-safe API client generated from OpenAPI specification
- Automatic token refresh
- Built-in support for common TikTok API endpoints

## Installation

```bash
pnpm install
```

## Configuration

```typescript
import { TikTokAuthConfig } from "@q8t/tiktok-sdk";

const config: TikTokAuthConfig = {
  clientId: "YOUR_CLIENT_KEY",
  clientSecret: "YOUR_CLIENT_SECRET",
  redirectUri: "https://your-app.com/callback",
  scopes: ["user.info.basic", "video.list"],
};
```

## OAuth 2.0 Flow

### 1. Generate Authorization URL

```typescript
import { generateAuthUrl } from "@q8t/tiktok-sdk";

const { url, state, codeVerifier } = await generateAuthUrl(config);
// Redirect user to `url`
// Store `state` and `codeVerifier` for the callback
```

### 2. Exchange Authorization Code for Tokens

```typescript
import { exchangeCodeForToken } from "@q8t/tiktok-sdk";

const tokens = await exchangeCodeForToken({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  code: authorizationCode,
  redirectUri: config.redirectUri,
  codeVerifier: storedCodeVerifier,
});
```

### 3. Create API Client

```typescript
import { createTikTokClient } from "@q8t/tiktok-sdk";
import { TikTokApi } from "@q8t/tiktok-sdk/lib";

const httpClient = createTikTokClient({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  accessToken: tokens.access_token,
  refreshToken: tokens.refresh_token,
});

const api = new TikTokApi(httpClient);
```

### 4. Make API Calls

```typescript
// Get user info
const userInfo = await api.getUserInfo({
  fields: "open_id,union_id,avatar_url,display_name",
});

// List user videos
const videos = await api.listVideos({
  fields: "id,title,video_description,duration,cover_image_url",
  max_count: 20,
});
```

## Available Scopes

- `user.info.basic` - Read basic user profile information
- `user.info.profile` - Read detailed user profile
- `user.info.stats` - Read user statistics
- `video.list` - List user's videos
- `video.upload` - Upload videos (future)

## API Endpoints

The SDK currently supports:

- `GET /user/info/` - Get authenticated user information
- `POST /video/list/` - List user's videos
- `GET /video/query/` - Query specific video information

## Development

### Generate Types

```bash
pnpm generate
```

This reads `api/openapi.yaml` and generates TypeScript types and API client in the `lib/` directory.

### Build

```bash
pnpm build
```

## License

Private
