# @q8t/facebook-sdk

Facebook Graph API SDK with OAuth 2.0 authentication and code generation from YAML definitions.

## Features

- OAuth 2.0 authentication flow for Facebook
- Auto-generated TypeScript types from OpenAPI specification
- Type-safe API client for Facebook Graph API
- Automatic token refresh handling

## Installation

```bash
pnpm add @q8t/facebook-sdk
```

## Authentication

### OAuth 2.0 Flow

1. Generate an authorization URL:

```typescript
import { generateAuthUrl, FacebookAuthConfig } from "@q8t/facebook-sdk";

const config: FacebookAuthConfig = {
  clientId: "your-app-id",
  clientSecret: "your-app-secret",
  redirectUri: "https://your-app.com/callback",
  scopes: ["pages_manage_posts", "pages_read_engagement", "pages_show_list"],
};

const { url, state } = await generateAuthUrl(config);
// Redirect user to url
```

2. Exchange code for tokens:

```typescript
import { exchangeCodeForToken } from "@q8t/facebook-sdk";

const tokens = await exchangeCodeForToken({
  clientId: "your-app-id",
  clientSecret: "your-app-secret",
  code: "authorization-code-from-callback",
  redirectUri: "https://your-app.com/callback",
});
```

3. Create an authenticated client:

```typescript
import { createFacebookClient, FacebookApi } from "@q8t/facebook-sdk";

const client = createFacebookClient({
  clientId: "your-app-id",
  clientSecret: "your-app-secret",
  accessToken: tokens.access_token,
});

const api = new FacebookApi(client);
```

## Available Scopes

- `pages_manage_posts` - Create and manage page posts
- `pages_read_engagement` - Read page engagement data
- `pages_show_list` - Show list of pages user manages
- `pages_read_user_content` - Read user content on pages
- `public_profile` - Access public profile information
- `email` - Access email address

## API Usage

```typescript
// Get user profile
const profile = await api.getMe();

// Get page feed
const feed = await api.getPageFeed("page-id");

// Create a post
const post = await api.createPagePost("page-id", {
  message: "Hello from Facebook SDK!",
});

// Get page insights
const insights = await api.getPageInsights("page-id");
```

## Development

Generate TypeScript types from OpenAPI spec:

```bash
pnpm generate
```

Build the package:

```bash
pnpm build
```

## License

Private
