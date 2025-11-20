# @q8t/mastodon-sdk

Comprehensive Mastodon API SDK with full endpoint coverage and OAuth 2.0 PKCE support.

## Features

- **Complete API Coverage**: 150+ endpoints across 18 categories
- **OAuth 2.0 with PKCE**: Industry-standard secure authentication
- **Real-time Streaming**: WebSocket support for live updates
- **Multi-Instance Support**: Works with any Mastodon instance
- **TypeScript**: Full type safety with generated types
- **Multiple Client Types**: User, Application, and Admin clients

## Installation

```bash
pnpm install @q8t/mastodon-sdk
```

## Quick Start

### 1. Register Your Application

First, register your application with the Mastodon instance:

```typescript
import { MastodonSDK } from "@q8t/mastodon-sdk";

const app = await MastodonSDK.registerApp("mastodon.social", {
  clientName: "My Awesome App",
  redirectUris: "https://myapp.com/callback",
  scopes: ["read", "write", "follow"],
  website: "https://myapp.com",
});

// Save these securely!
console.log("Client ID:", app.client_id);
console.log("Client Secret:", app.client_secret);
```

### 2. OAuth Flow (Authorization Code with PKCE)

```typescript
// Step 1: Generate authorization URL
const authResult = await MastodonSDK.generateAuthUrl({
  instanceUrl: "mastodon.social",
  clientId: app.client_id,
  clientSecret: app.client_secret,
  redirectUri: "https://myapp.com/callback",
  scopes: ["read", "write"],
});

// Store these securely in your session!
// - authResult.state (verify on callback)
// - authResult.codeVerifier (needed for token exchange)

// Redirect user to authResult.url

// Step 2: Exchange code for token (in your callback handler)
const tokens = await MastodonSDK.exchangeCode({
  instanceUrl: "mastodon.social",
  clientId: app.client_id,
  clientSecret: app.client_secret,
  code: "code_from_callback",
  redirectUri: "https://myapp.com/callback",
  codeVerifier: authResult.codeVerifier,
});

console.log("Access Token:", tokens.access_token);
```

### 3. Create API Client

```typescript
// User-authenticated client
const client = await MastodonSDK.createUserClient({
  instanceUrl: "mastodon.social",
  accessToken: tokens.access_token,
});

// Now you can use the client!
const account = await client.verifyCredentials();
console.log("Logged in as:", account.username);
```

## Usage Examples

### Account Operations

```typescript
// Get account information
const account = await client.getAccount("account_id");

// Search for accounts
const results = await client.searchAccounts({ q: "username" });

// Follow an account
await client.followAccount("account_id");

// Unfollow an account
await client.unfollowAccount("account_id");

// Get followers
const followers = await client.getAccountFollowers("account_id");

// Get following
const following = await client.getAccountFollowing("account_id");

// Block an account
await client.blockAccount("account_id");

// Mute an account
await client.muteAccount("account_id", {
  body: { notifications: true, duration: 0 },
});
```

### Status Operations (Posts)

```typescript
// Create a post (toot)
const status = await client.createStatus({
  body: {
    status: "Hello, Mastodon! 🎉",
    visibility: "public",
  },
});

// Create a post with media
const media = await client.uploadMedia({
  body: {
    file: imageBuffer,
    description: "A beautiful sunset",
  },
});

const statusWithMedia = await client.createStatus({
  body: {
    status: "Check out this sunset!",
    media_ids: [media.id],
  },
});

// Create a poll
const poll = await client.createStatus({
  body: {
    status: "What's your favorite programming language?",
    poll: {
      options: ["TypeScript", "JavaScript", "Python", "Rust"],
      expires_in: 86400, // 24 hours
      multiple: false,
    },
  },
});

// Get a status
const status = await client.getStatus("status_id");

// Favorite a status
await client.favouriteStatus("status_id");

// Boost (reblog) a status
await client.reblogStatus("status_id");

// Bookmark a status
await client.bookmarkStatus("status_id");

// Delete a status
await client.deleteStatus("status_id");

// Edit a status
const updated = await client.updateStatus("status_id", {
  body: {
    status: "Updated post content",
  },
});
```

### Timelines

```typescript
// Get home timeline
const homeTimeline = await client.getHomeTimeline({
  params: { limit: 20 },
});

// Get public timeline
const publicTimeline = await client.getPublicTimeline({
  params: { local: true, limit: 20 },
});

// Get hashtag timeline
const hashtagTimeline = await client.getHashtagTimeline("typescript", {
  params: { limit: 20 },
});

// Get list timeline
const listTimeline = await client.getListTimeline("list_id", {
  params: { limit: 20 },
});
```

### Notifications

```typescript
// Get notifications
const notifications = await client.getNotifications({
  params: { limit: 30 },
});

// Get unread count
const unreadCount = await client.getUnreadNotificationsCount();

// Dismiss a notification
await client.dismissNotification("notification_id");

// Clear all notifications
await client.clearNotifications();
```

### Search

```typescript
// Search across everything
const results = await client.search({
  params: {
    q: "mastodon",
    type: "statuses",
    limit: 20,
  },
});

console.log("Accounts:", results.accounts);
console.log("Statuses:", results.statuses);
console.log("Hashtags:", results.hashtags);
```

### Lists

```typescript
// Get all lists
const lists = await client.getLists();

// Create a list
const newList = await client.createList({
  body: {
    title: "Tech Friends",
    replies_policy: "list",
  },
});

// Add accounts to list
await client.addAccountsToList("list_id", {
  body: {
    account_ids: ["account1", "account2"],
  },
});

// Get list members
const members = await client.getListAccounts("list_id");

// Delete a list
await client.deleteList("list_id");
```

### Filters

```typescript
// Create a content filter
const filter = await client.createFilter({
  body: {
    title: "Hide cryptocurrency posts",
    context: ["home", "notifications", "public"],
    filter_action: "hide",
    keywords_attributes: [
      { keyword: "crypto", whole_word: true },
      { keyword: "bitcoin", whole_word: true },
    ],
  },
});

// Get all filters
const filters = await client.getFilters();

// Update a filter
await client.updateFilter("filter_id", {
  body: {
    title: "Updated filter",
  },
});

// Delete a filter
await client.deleteFilter("filter_id");
```

### Instance Information

```typescript
// Get instance info
const instance = await client.getInstance();

// Get trending hashtags
const trendingTags = await client.getTrendingTags({ params: { limit: 10 } });

// Get trending statuses
const trendingStatuses = await client.getTrendingStatuses({
  params: { limit: 10 },
});

// Get custom emojis
const emojis = await client.getCustomEmojis();
```

### Admin Operations (Requires Admin Scopes)

```typescript
// Create admin client
const adminClient = await MastodonSDK.createUserClient({
  instanceUrl: "mastodon.social",
  accessToken: adminAccessToken, // Token with admin:read and admin:write scopes
});

// Get accounts
const accounts = await adminClient.adminGetAccounts({
  params: {
    local: true,
    active: true,
    limit: 100,
  },
});

// Get reports
const reports = await adminClient.adminGetReports({
  params: {
    resolved: false,
  },
});

// Perform moderation action
await adminClient.adminPerformAccountAction("account_id", {
  body: {
    type: "silence",
    text: "Spam activity detected",
    send_email_notification: true,
  },
});

// Approve pending account
await adminClient.adminApproveAccount("account_id");

// Block a domain
await adminClient.adminCreateDomainBlock({
  body: {
    domain: "spam-instance.example",
    severity: "suspend",
    reject_media: true,
    private_comment: "Known spam source",
  },
});
```

## Real-time Streaming

Subscribe to real-time updates using WebSocket streaming:

```typescript
import { MastodonSDK } from "@q8t/mastodon-sdk";

const streamingClient = MastodonSDK.createStreamingClient({
  instanceUrl: "mastodon.social",
  accessToken: "your_access_token",
});

// Subscribe to user timeline and notifications
const subscription = streamingClient.subscribeToUserStream({
  onUpdate: (status) => {
    console.log("New status:", status);
  },
  onNotification: (notification) => {
    console.log("New notification:", notification);
  },
  onDelete: (statusId) => {
    console.log("Status deleted:", statusId);
  },
  onFiltersChanged: () => {
    console.log("Filters updated");
  },
  onError: (error) => {
    console.error("Stream error:", error);
  },
  onClose: () => {
    console.log("Stream closed");
  },
  onConnect: () => {
    console.log("Stream connected");
  },
});

// Unsubscribe when done
// subscription.unsubscribe();
```

### Stream Types

```typescript
// Public timeline
const publicSub = streamingClient.subscribeToPublicStream(handlers);

// Local public timeline
const localSub = streamingClient.subscribeToPublicStream(handlers, true);

// Hashtag timeline
const hashtagSub = streamingClient.subscribeToHashtagStream(
  "javascript",
  handlers
);

// List timeline
const listSub = streamingClient.subscribeToListStream("list_id", handlers);

// Direct messages
const directSub = streamingClient.subscribeToDirectStream(handlers);
```

## Client Types

### 1. User Client (OAuth Authorization Code)

For applications acting on behalf of users with full access to user-specific endpoints.

```typescript
const userClient = await MastodonSDK.createUserClient({
  instanceUrl: "mastodon.social",
  accessToken: "user_access_token",
});
```

### 2. Application Client (Client Credentials)

For bots or read-only applications that don't act on behalf of users.

```typescript
const appClient = await MastodonSDK.createAppClient(
  "mastodon.social",
  "client_id",
  "client_secret"
);
```

**Note**: Application clients are limited to `read` scope only.

### 3. Admin Client

Same as user client but with admin scopes (`admin:read`, `admin:write`).

```typescript
const adminClient = await MastodonSDK.createUserClient({
  instanceUrl: "mastodon.social",
  accessToken: "admin_access_token", // Token with admin scopes
});
```

## OAuth Scopes

### High-Level Scopes

- `profile` - Minimal authenticated user information
- `read` - Read data
- `write` - Write data
- `push` - Web Push API subscriptions
- `follow` - (Deprecated) Manage relationships

### Granular Read Scopes

- `read:accounts`, `read:blocks`, `read:bookmarks`, `read:favourites`
- `read:filters`, `read:follows`, `read:lists`, `read:mutes`
- `read:notifications`, `read:search`, `read:statuses`

### Granular Write Scopes

- `write:accounts`, `write:blocks`, `write:bookmarks`, `write:conversations`
- `write:favourites`, `write:filters`, `write:follows`, `write:lists`
- `write:media`, `write:mutes`, `write:notifications`, `write:reports`, `write:statuses`

### Admin Scopes

- `admin:read` / `admin:write` (broad)
- `admin:read:accounts`, `admin:write:accounts`
- `admin:read:reports`, `admin:write:reports`
- `admin:read:domain_blocks`, `admin:write:domain_blocks`
- And more...

**Best Practice**: Request the most limited scopes possible for your use case.

## Multi-Instance Support

This SDK works with any Mastodon instance. Simply specify the instance URL:

```typescript
// mastodon.social
const client1 = await MastodonSDK.createUserClient({
  instanceUrl: "mastodon.social",
  accessToken: "token1",
});

// mas.to
const client2 = await MastodonSDK.createUserClient({
  instanceUrl: "mas.to",
  accessToken: "token2",
});

// Custom instance
const client3 = await MastodonSDK.createUserClient({
  instanceUrl: "my-instance.example",
  accessToken: "token3",
});
```

## Error Handling

```typescript
try {
  const status = await client.createStatus({
    body: { status: "Hello!" },
  });
} catch (error) {
  if (error instanceof Error) {
    console.error("API Error:", error.message);
  }
}
```

## Development

### Build the SDK

```bash
# Generate TypeScript types and API methods from OpenAPI spec
pnpm generate

# Compile TypeScript
pnpm build

# Watch mode
pnpm dev
```

### Run Tests

```bash
pnpm test
```

### Lint & Format

```bash
pnpm lint
pnpm format
```

## API Coverage

This SDK implements **150+ endpoints** across **18 categories**:

- ✅ Accounts (25+ endpoints)
- ✅ Statuses (30+ endpoints)
- ✅ Timelines (6 endpoints)
- ✅ Notifications (5 endpoints)
- ✅ Search (1 endpoint)
- ✅ Media (3 endpoints)
- ✅ Polls (2 endpoints)
- ✅ Lists (8 endpoints)
- ✅ Conversations (3 endpoints)
- ✅ Filters (8 endpoints)
- ✅ Markers (2 endpoints)
- ✅ Instance (15+ endpoints)
- ✅ Featured Tags (4 endpoints)
- ✅ Preferences (1 endpoint)
- ✅ Suggestions (2 endpoints)
- ✅ Reports (1 endpoint)
- ✅ Push Subscriptions (4 endpoints)
- ✅ Admin APIs (30+ endpoints)
- ✅ Streaming (WebSocket/SSE)

## Architecture

```
packages/mastodon-sdk/
├── api/
│   └── openapi.yaml         # OpenAPI 3.0 specification
├── src/
│   ├── auth/                # Authentication layer
│   │   ├── config.ts        # Configuration & scopes
│   │   ├── oauth2.ts        # OAuth 2.0 PKCE flows
│   │   ├── client.ts        # HTTP client
│   │   └── index.ts
│   ├── streaming/           # WebSocket streaming
│   │   ├── client.ts
│   │   └── index.ts
│   ├── generator/           # Code generation
│   │   ├── parser.ts
│   │   ├── type-generator.ts
│   │   ├── api-generator.ts
│   │   └── index.ts
│   └── index.ts             # Main SDK exports
├── lib/                     # Generated code (gitignored)
│   ├── types.ts
│   ├── api.ts
│   └── index.ts
└── build-tests/             # Build verification
```

## License

Private

## Support

For issues and questions:
- Check the [Mastodon API documentation](https://docs.joinmastodon.org/api/)
- Review the generated types in `lib/types.ts` after running `pnpm generate`
