# Discord SDK

A TypeScript SDK for the Discord API with support for both Bot Token and OAuth 2.0 authentication.

## Features

- Bot Token authentication for server-side bots
- OAuth 2.0 flow for user authentication
- Auto-generated TypeScript types from OpenAPI spec
- Type-safe API client methods
- Automatic token refresh support

## Installation

```bash
pnpm install @q8t/discord-sdk
```

## Authentication Methods

### Bot Token Authentication

Bot tokens are used for Discord bots and provide access to bot-specific endpoints.

```typescript
import { createDiscordClient, DiscordApi } from "@q8t/discord-sdk";

const client = createDiscordClient({
  botToken: "YOUR_BOT_TOKEN",
});

const api = new DiscordApi(client);

// Get current bot user
const user = await api.getCurrentUser();
console.log(user);
```

### OAuth 2.0 Authentication

For user authentication, use the OAuth 2.0 flow:

```typescript
import {
  generateAuthUrl,
  exchangeCodeForToken,
  createDiscordClient,
  DiscordApi,
} from "@q8t/discord-sdk";

// 1. Generate authorization URL
const { url, state, codeVerifier } = await generateAuthUrl({
  clientId: "YOUR_CLIENT_ID",
  redirectUri: "YOUR_REDIRECT_URI",
  scopes: ["identify", "guilds", "messages.read"],
});

// 2. Redirect user to `url`
// 3. After callback, exchange code for token
const tokens = await exchangeCodeForToken({
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  code: "AUTHORIZATION_CODE",
  redirectUri: "YOUR_REDIRECT_URI",
  codeVerifier,
});

// 4. Create authenticated client
const client = createDiscordClient({
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  accessToken: tokens.access_token,
  refreshToken: tokens.refresh_token,
  onTokenRefresh: (newTokens) => {
    // Store new tokens
    console.log("Tokens refreshed:", newTokens);
  },
});

const api = new DiscordApi(client);
```

## Available Scopes

- `identify` - Access user information
- `email` - Access user email
- `guilds` - View user's guilds
- `guilds.join` - Join guilds on behalf of user
- `guilds.members.read` - Read guild member information
- `gdm.join` - Join group DMs
- `messages.read` - Read messages
- `bot` - Bot scope for adding bot to servers
- `webhook.incoming` - Create webhooks
- `applications.commands` - Create slash commands
- `applications.commands.update` - Update slash commands
- `connections` - View user connections
- `rpc` - RPC access
- `rpc.notifications.read` - Read RPC notifications

## API Methods

### User

```typescript
// Get current user
const user = await api.getCurrentUser();
```

### Guilds

```typescript
// Get guild information
const guild = await api.getGuild("GUILD_ID");
```

### Messages

```typescript
// Get channel messages
const messages = await api.getChannelMessages("CHANNEL_ID", {
  limit: 50,
});

// Send a message
const message = await api.createMessage("CHANNEL_ID", {
  content: "Hello, Discord!",
});
```

## Configuration

### Environment Variables

```env
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_REDIRECT_URI=http://localhost:3000/callback
```

## Discord API Resources

- [Discord Developer Portal](https://discord.com/developers/applications)
- [Discord API Documentation](https://discord.com/developers/docs/intro)
- [OAuth 2.0 Scopes](https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes)
- [Bot vs User Tokens](https://discord.com/developers/docs/topics/oauth2#bots)

## Development

### Generate Types

```bash
pnpm generate
```

This command reads the OpenAPI specification from `api/openapi.yaml` and generates:
- `lib/types.ts` - TypeScript interfaces
- `lib/api.ts` - API client methods
- `lib/index.ts` - Package exports

## License

MIT
