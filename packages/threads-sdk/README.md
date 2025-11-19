# @q8t/threads-sdk

TypeScript SDK for the Threads API, generated from OpenAPI specifications.

## Features

- **Type-safe API client** - Generated from OpenAPI spec with full TypeScript support
- **OAuth 2.0 authentication** - Complete auth flow implementation
- **Comprehensive API coverage** - All Threads API v1.0 endpoints
- **Auto-generated** - SDK generated from YAML specifications

## Installation

```bash
pnpm install @q8t/threads-sdk
```

## Quick Start

```typescript
import {
  ThreadsApi,
  createThreadsClient,
  generateAuthUrl,
  exchangeCodeForToken,
  exchangeForLongLivedToken,
  type ThreadsAuthConfig,
} from '@q8t/threads-sdk';

// 1. Generate authorization URL
const authConfig: ThreadsAuthConfig = {
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  redirectUri: 'https://your-app.com/callback',
  scopes: ['threads_basic', 'threads_content_publish'],
};

const { url, state } = generateAuthUrl(authConfig);
// Redirect user to `url`

// 2. Exchange authorization code for tokens
const shortLivedToken = await exchangeCodeForToken({
  clientId: authConfig.clientId,
  clientSecret: authConfig.clientSecret,
  code: authorizationCode,
  redirectUri: authConfig.redirectUri,
});

const longLivedToken = await exchangeForLongLivedToken({
  clientSecret: authConfig.clientSecret,
  accessToken: shortLivedToken.access_token,
});

// 3. Create API client
const client = createThreadsClient({
  accessToken: longLivedToken.access_token,
  onTokenRefresh: (newToken) => {
    // Save new token
    console.log('Token refreshed:', newToken);
  },
});

const api = new ThreadsApi(client);

// 4. Use the API
const profile = await api.getMyProfile({ access_token: longLivedToken.access_token });
console.log('Profile:', profile);

// Create a text post
const container = await api.createMediaContainer(
  profile.id!,
  {
    media_type: 'TEXT',
    text: 'Hello from Threads SDK! 🧵',
  },
  { access_token: longLivedToken.access_token }
);

// Wait 30 seconds before publishing
await new Promise((resolve) => setTimeout(resolve, 30000));

const published = await api.publishMediaContainer(
  profile.id!,
  { creation_id: container.id },
  { access_token: longLivedToken.access_token }
);
console.log('Published:', published);
```

## API Coverage

### Authentication (3 methods)
- `exchangeCodeForToken` - Exchange authorization code for short-lived token
- `exchangeToken` - Exchange short-lived for long-lived token
- `refreshToken` - Refresh long-lived token

### User Profile (3 methods)
- `getMyProfile` - Get authenticated user profile
- `getUserProfile` - Get user profile by ID
- `getPublishingLimit` - Get publishing rate limits

### Media Publishing (4 methods)
- `createMediaContainer` - Create media container
- `publishMediaContainer` - Publish media container
- `listUserThreads` - List user's threads
- `getMedia` - Get media details

### Replies (3 methods)
- `getReplies` - Get replies to a post
- `getConversation` - Get conversation thread
- `manageReply` - Hide/unhide reply

### Insights (2 methods)
- `getMediaInsights` - Get media metrics
- `getUserInsights` - Get user-level metrics

### Search (1 method)
- `searchContent` - Search by keyword or topic tag

## Scopes

- `threads_basic` - Read user profile and media
- `threads_content_publish` - Create and publish posts
- `threads_manage_insights` - Access analytics
- `threads_manage_replies` - Manage replies
- `threads_read_replies` - Read replies

## Rate Limits

- **Posts**: 250 per 24-hour rolling period
- **Container Publishing**: Wait ~30 seconds after creating container before publishing

## Development

```bash
# Generate SDK from OpenAPI spec
pnpm generate

# Build
pnpm build

# Run tests
pnpm test

# Type check
pnpm check
```

## Architecture

The SDK is generated from OpenAPI specifications:

- `api/openapi.yaml` - Complete Threads API specification
- `src/generator/` - Code generation utilities
- `lib/` - Generated TypeScript code (types & API)
- `src/auth/` - Authentication helpers

## Resources

- [Threads API Documentation](https://developers.facebook.com/docs/threads)
- [OAuth 2.0 Flow](https://developers.facebook.com/docs/threads/get-started/get-access-tokens-and-permissions)

## License

MIT
