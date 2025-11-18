# @q8t/instagram-sdk

Instagram Graph API SDK with code generation from YAML definitions.

## Features

- OAuth 2.0 authentication flow (via Facebook OAuth)
- Type-safe API client generated from OpenAPI spec
- Automatic token refresh
- Full Instagram Graph API coverage

## Installation

```bash
pnpm add @q8t/instagram-sdk
```

## Quick Start

### 1. Configure OAuth

```typescript
import { InstagramAuthConfig, INSTAGRAM_AUTH_ENDPOINTS } from "@q8t/instagram-sdk";

const config: InstagramAuthConfig = {
  clientId: "your-app-id",
  clientSecret: "your-app-secret",
  redirectUri: "https://yourapp.com/callback",
  scopes: ["instagram_basic", "instagram_content_publish", "instagram_manage_insights"],
};
```

### 2. Generate Authorization URL

```typescript
import { generateAuthUrl } from "@q8t/instagram-sdk";

const { url, state } = await generateAuthUrl(config);
// Redirect user to url
// Store state for verification
```

### 3. Exchange Code for Token

```typescript
import { exchangeCodeForToken } from "@q8t/instagram-sdk";

const tokens = await exchangeCodeForToken({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  code: authorizationCode,
  redirectUri: config.redirectUri,
});
```

### 4. Create API Client

```typescript
import { createInstagramClient, InstagramApi } from "@q8t/instagram-sdk";

const client = createInstagramClient({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  accessToken: tokens.access_token,
});

const api = new InstagramApi(client);

// Get user media
const media = await api.getUserMedia("me");

// Get insights
const insights = await api.getUserInsights("me", { metric: "impressions,reach" });
```

## Available Scopes

- `instagram_basic` - Read user profile and media
- `instagram_content_publish` - Publish content to feed
- `instagram_manage_insights` - Access account insights
- `instagram_manage_comments` - Manage comments
- `pages_show_list` - Show list of pages
- `pages_read_engagement` - Read page engagement
- `business_management` - Business management access

## API Endpoints

The SDK provides typed methods for Instagram Graph API endpoints:

- `getUserMedia(userId)` - Get user's media
- `getMedia(mediaId)` - Get single media details
- `getUserInsights(userId, params)` - Get account insights
- `createMedia(userId, body)` - Create media container

## Development

### Generate API from OpenAPI spec

```bash
pnpm generate
```

This will parse `api/openapi.yaml` and generate:
- `lib/types.ts` - TypeScript interfaces
- `lib/api.ts` - API client methods
- `lib/index.ts` - Exports

### Build

```bash
pnpm build
```

## Authentication Notes

Instagram Graph API uses Facebook OAuth for authentication. Users must:

1. Have a Facebook account
2. Have an Instagram Professional account (Business or Creator)
3. Connect their Instagram account to a Facebook Page

The OAuth flow uses Facebook's authorization endpoints but grants access to Instagram data.

## License

MIT
