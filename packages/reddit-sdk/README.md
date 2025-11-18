# @q8t/reddit-sdk

Reddit API SDK with code generation from YAML definitions.

## Features

- OAuth 2.0 authentication
- Auto-generated TypeScript types from OpenAPI YAML
- Type-safe API methods
- Token refresh handling

## Usage

```typescript
import { createRedditClient, RedditApi } from "@q8t/reddit-sdk";

const client = createRedditClient({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "user-access-token",
  refreshToken: "user-refresh-token",
  userAgent: "your-app:v1.0.0 (by /u/username)",
});

const api = new RedditApi(client);
const me = await api.getMe();
const posts = await api.getSubredditPosts({ subreddit: "programming" });
```

## Authentication

```typescript
import { generateAuthUrl, exchangeCodeForToken } from "@q8t/reddit-sdk";

const { url, state } = generateAuthUrl({
  clientId: "your-client-id",
  redirectUri: "http://localhost:3000/callback",
  scopes: ["identity", "read", "submit"],
  duration: "permanent",
});

const tokens = await exchangeCodeForToken({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  code: "authorization-code",
  redirectUri: "http://localhost:3000/callback",
});
```

## Code Generation

```bash
pnpm generate  # Generate lib/ from api/openapi.yaml
pnpm build     # Build the package
```
