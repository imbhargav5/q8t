# @q8t/youtube-sdk

A TypeScript SDK for the YouTube Data API v3 with OAuth 2.0 authentication and code generation from OpenAPI specifications.

## Features

- Full OAuth 2.0 flow implementation (Google OAuth)
- Automatic token refresh
- Type-safe API methods generated from OpenAPI spec
- YouTube Data API v3 endpoints support

## Installation

```bash
pnpm add @q8t/youtube-sdk
```

## Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the YouTube Data API v3
4. Go to "APIs & Services" > "Credentials"
5. Create OAuth 2.0 Client ID credentials
6. Configure the OAuth consent screen
7. Add your redirect URI

### 2. Configure OAuth Scopes

Available scopes for YouTube Data API:

- `youtube.readonly` - View YouTube account
- `youtube.upload` - Upload YouTube videos
- `youtube` - Manage YouTube account
- `youtube.force-ssl` - View and manage YouTube videos
- `youtube.channel-memberships.creator` - See channel memberships
- `youtubepartner` - View and manage YouTube assets
- `youtubepartner-channel-audit` - View YouTube channel audit reports

## Usage

### Authentication Flow

```typescript
import {
  generateAuthUrl,
  exchangeCodeForToken,
  createYouTubeClient,
  type YouTubeAuthConfig,
} from "@q8t/youtube-sdk";

// 1. Configure OAuth
const config: YouTubeAuthConfig = {
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  redirectUri: "http://localhost:3000/callback",
  scopes: ["youtube.readonly"],
};

// 2. Generate authorization URL
const { url, state, codeVerifier } = await generateAuthUrl(config);
// Redirect user to `url`

// 3. Exchange authorization code for tokens
const tokens = await exchangeCodeForToken({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  code: "AUTHORIZATION_CODE",
  redirectUri: config.redirectUri,
  codeVerifier,
});

// 4. Create API client
const client = createYouTubeClient({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  accessToken: tokens.access_token,
  refreshToken: tokens.refresh_token,
  onTokenRefresh: (newTokens) => {
    // Store new tokens
  },
});

// 5. Use the API
import { YouTubeApi } from "@q8t/youtube-sdk";

const api = new YouTubeApi(client);

// List channels
const channels = await api.listChannels({
  part: "snippet,contentDetails,statistics",
  mine: "true",
});

// List videos
const videos = await api.listVideos({
  part: "snippet,contentDetails,statistics",
  chart: "mostPopular",
  maxResults: 10,
});

// List playlists
const playlists = await api.listPlaylists({
  part: "snippet,contentDetails",
  mine: "true",
});
```

### Token Management

```typescript
import { refreshAccessToken, revokeToken } from "@q8t/youtube-sdk";

// Refresh token manually
const newTokens = await refreshAccessToken({
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  refreshToken: "YOUR_REFRESH_TOKEN",
});

// Revoke token
await revokeToken("ACCESS_TOKEN", "YOUR_CLIENT_ID", "YOUR_CLIENT_SECRET");
```

## Code Generation

Generate TypeScript types and API methods from the OpenAPI spec:

```bash
pnpm generate
```

This will:
1. Parse `api/openapi.yaml`
2. Generate `lib/types.ts` with TypeScript interfaces
3. Generate `lib/api.ts` with typed API methods
4. Generate `lib/index.ts` as the entry point

## API Reference

### Authentication

- `generateAuthUrl(config)` - Generate OAuth authorization URL with PKCE
- `exchangeCodeForToken(params)` - Exchange authorization code for access token
- `refreshAccessToken(params)` - Refresh an expired access token
- `revokeToken(token, clientId, clientSecret)` - Revoke an access token

### Client

- `createYouTubeClient(config)` - Create an HTTP client with Bearer token auth

### Generated API Methods

The `YouTubeApi` class is generated from the OpenAPI spec and includes methods for:

- `listChannels()` - List channels
- `listVideos()` - List videos
- `listPlaylists()` - List playlists
- `insertVideo()` - Upload video metadata

## License

MIT
