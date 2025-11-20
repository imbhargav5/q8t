# @q8t/monday-sdk

Comprehensive Monday.com GraphQL API SDK with TypeScript support and multiple authentication methods.

## Features

- **Multiple Authentication Methods**
  - Personal API Token (V2)
  - OAuth 2.0
  - Seamless Authentication (Short-lived tokens)

- **Complete API Coverage**
  - All GraphQL queries and mutations
  - Boards, Items, Columns, Groups
  - Updates, Users, Teams, Workspaces
  - Webhooks, Notifications, Docs
  - Marketplace apps and more

- **TypeScript Support**
  - Fully typed GraphQL schema
  - Auto-generated types from schema
  - Type-safe query and mutation methods

- **Code Generation**
  - Automatic SDK generation from GraphQL schema
  - Up-to-date with latest Monday.com API

## Installation

```bash
pnpm install @q8t/monday-sdk
```

## Usage

### Personal Token Authentication

```typescript
import { MondaySDK } from '@q8t/monday-sdk';

const monday = MondaySDK.createWithToken({
  token: 'your-api-token'
});

// Query boards
const boards = await monday.boards.query({
  ids: [123456789]
});

// Create an item
const item = await monday.items.create({
  boardId: 123456789,
  itemName: 'New Task',
  columnValues: {
    status: 'Working on it'
  }
});
```

### OAuth 2.0 Authentication

```typescript
import { MondaySDK } from '@q8t/monday-sdk';

// Generate authorization URL
const { url, state } = MondaySDK.oauth.generateAuthUrl({
  clientId: 'your-client-id',
  redirectUri: 'https://your-app.com/callback',
  scopes: ['boards:read', 'boards:write']
});

// After user authorization, exchange code for token
const tokens = await MondaySDK.oauth.exchangeCodeForToken({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  code: 'authorization-code',
  redirectUri: 'https://your-app.com/callback'
});

// Create client with OAuth token
const monday = MondaySDK.createWithToken({
  token: tokens.access_token
});
```

## API Categories

The SDK organizes the Monday.com API into logical categories:

- **Boards** - Board management, views, permissions
- **Items** - Item CRUD operations, positioning, archiving
- **Columns** - Column management, value updates
- **Groups** - Group operations within boards
- **Updates** - Comments, replies, likes
- **Users** - User management and teams
- **Workspaces** - Workspace operations
- **Webhooks** - Webhook management
- **Docs** - Document management
- **Notifications** - Notification settings
- **Audit** - Audit logs and events
- **Marketplace** - App integrations

## Development

```bash
# Generate SDK from GraphQL schema
pnpm generate

# Build the SDK
pnpm build

# Run tests
pnpm test

# Type check
pnpm check
```

## License

MIT
