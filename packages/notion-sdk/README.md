# @q8t/notion-sdk

A comprehensive TypeScript SDK for the Notion API with multiple authentication methods and full API coverage.

## Features

- **Multiple Authentication Methods**
  - Internal Integration (Bearer Token) - Simple token-based auth
  - OAuth 2.0 (Public Integration) - Full OAuth flow with refresh tokens
- **Complete API Coverage** - All Notion API v1 endpoints including:
  - Pages, Databases, Blocks
  - Data Sources (2025 API)
  - Comments, File Uploads
  - Search, Users
- **Type-safe API Client** - Auto-generated from OpenAPI specification
- **Unified Interface** - Single SDK with factory methods for different client types
- **Code Generation** - SDK generated from YAML definitions for maintainability

## Installation

```bash
pnpm add @q8t/notion-sdk
```

## Quick Start

### Bearer Token Authentication (Internal Integration)

For internal integrations within a single workspace:

```typescript
import { NotionSDK } from '@q8t/notion-sdk';

// Create a client with Bearer Token
const notion = NotionSDK.createBearerTokenClient({
  token: process.env.NOTION_TOKEN!,
});

// Use the API
const page = await notion.pages.retrieve('page-id');
console.log('Page:', page);

// Create a new page
const newPage = await notion.pages.create({
  parent: { database_id: 'database-id' },
  properties: {
    Name: {
      title: [
        {
          text: { content: 'My New Page' },
        },
      ],
    },
  },
});

// Query a database
const results = await notion.databases.query('database-id', {
  filter: {
    property: 'Status',
    select: {
      equals: 'Active',
    },
  },
  sorts: [
    {
      property: 'Created',
      direction: 'descending',
    },
  ],
});
```

### OAuth 2.0 Authentication (Public Integration)

For public integrations accessible to any Notion user:

```typescript
import { NotionSDK } from '@q8t/notion-sdk';

// Create a client with OAuth
const notion = NotionSDK.createOAuthClient({
  clientId: process.env.NOTION_CLIENT_ID!,
  clientSecret: process.env.NOTION_CLIENT_SECRET!,
  redirectUri: 'https://your-app.com/callback',
});

// Step 1: Generate authorization URL
const { url, state } = notion.oauth.generateAuthUrl();
// Redirect user to `url` - store `state` to verify callback

// Step 2: After user authorizes, exchange code for token
const tokenResponse = await notion.oauth.exchangeCodeForToken(code);
console.log('Workspace:', tokenResponse.workspace_name);
console.log('Bot ID:', tokenResponse.bot_id);

// Step 3: Now use the API
const databases = await notion.databases.query('database-id');

// Refresh token when needed
const newToken = await notion.oauth.refreshAccessToken();

// Revoke token
await notion.oauth.revokeToken();
```

## Authentication Methods

### 1. Internal Integration (Bearer Token)

**Use case:** Workspace-specific integrations, internal tools, personal automations

**Setup:**
1. Go to https://www.notion.so/my-integrations
2. Create a new integration
3. Copy the "Internal Integration Token"
4. Share pages/databases with your integration

**Pros:**
- Simple to set up
- No OAuth flow required
- Permanent token

**Cons:**
- Single workspace only
- Manual page/database sharing required

### 2. OAuth 2.0 (Public Integration)

**Use case:** Multi-workspace apps, user-facing integrations, SaaS products

**Setup:**
1. Go to https://www.notion.so/my-integrations
2. Create a new public integration
3. Configure OAuth redirect URIs
4. Get Client ID and Client Secret
5. Submit for Notion review (required for production)

**Pros:**
- Works across any workspace
- User grants permissions
- Automatic access to user's pages

**Cons:**
- More complex OAuth flow
- Token refresh required
- Needs Notion approval for production

## API Reference

### Pages

```typescript
// Create a page
await notion.pages.create({
  parent: { database_id: 'db-id' },
  properties: { /* ... */ },
});

// Retrieve a page
await notion.pages.retrieve('page-id');

// Update a page
await notion.pages.update('page-id', {
  properties: { /* ... */ },
  archived: false,
});

// Retrieve a page property
await notion.pages.retrieveProperty('page-id', 'property-id');
```

### Databases

```typescript
// Create a database
await notion.databases.create({
  parent: { page_id: 'page-id' },
  title: [{ text: { content: 'My Database' } }],
  properties: {
    Name: { title: {} },
    Status: { select: {} },
  },
});

// Retrieve a database
await notion.databases.retrieve('database-id');

// Update a database
await notion.databases.update('database-id', {
  title: [{ text: { content: 'Updated Name' } }],
});

// Query a database with filters and sorts
await notion.databases.query('database-id', {
  filter: {
    and: [
      { property: 'Status', select: { equals: 'Active' } },
      { property: 'Priority', number: { greater_than: 3 } },
    ],
  },
  sorts: [
    { property: 'Created', direction: 'descending' },
  ],
  page_size: 50,
});
```

### Blocks

```typescript
// Retrieve a block
await notion.blocks.retrieve('block-id');

// Update a block
await notion.blocks.update('block-id', {
  paragraph: {
    rich_text: [{ text: { content: 'Updated text' } }],
  },
});

// Delete a block
await notion.blocks.delete('block-id');

// Get block children
await notion.blocks.retrieveChildren('block-id', {
  start_cursor: undefined,
  page_size: 100,
});

// Append block children
await notion.blocks.appendChildren('block-id', {
  children: [
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: 'New paragraph' } }],
      },
    },
  ],
});
```

### Data Sources (2025 API)

```typescript
// Create a data source
await notion.dataSources.create({ /* ... */ });

// Retrieve a data source
await notion.dataSources.retrieve('data-source-id');

// Update a data source
await notion.dataSources.update('data-source-id', { /* ... */ });

// Update data source properties
await notion.dataSources.updateProperties('data-source-id', { /* ... */ });

// Query a data source
await notion.dataSources.query('data-source-id', {
  filter: { /* ... */ },
  sorts: [ /* ... */ ],
});

// List data source templates
await notion.dataSources.listTemplates();
```

### Comments

```typescript
// Create a comment
await notion.comments.create({
  parent: { page_id: 'page-id' },
  rich_text: [{ text: { content: 'Great page!' } }],
});

// Retrieve a comment
await notion.comments.retrieve('comment-id');

// List comments on a block
await notion.comments.list({
  block_id: 'block-id',
  page_size: 100,
});
```

### File Uploads

```typescript
// Create a file upload
const upload = await notion.files.create({
  name: 'document.pdf',
  size: 1024000,
  mime_type: 'application/pdf',
});

// Send file data
await notion.files.send(upload.id, fileBuffer);

// Complete the upload
await notion.files.complete(upload.id);

// Retrieve a file upload
await notion.files.retrieve(upload.id);

// List file uploads
await notion.files.list({
  page_size: 100,
});
```

### Users

```typescript
// List all users
await notion.users.list({
  page_size: 100,
});

// Retrieve a user
await notion.users.retrieve('user-id');

// Get bot user
await notion.users.me();
```

### Search

```typescript
// Search all pages and databases
await notion.search({
  query: 'project',
  filter: {
    property: 'object',
    value: 'page',
  },
  sort: {
    direction: 'descending',
    timestamp: 'last_edited_time',
  },
  page_size: 50,
});
```

## Configuration

### Environment Variables

```bash
# For Bearer Token Authentication
NOTION_TOKEN=secret_...

# For OAuth Authentication
NOTION_CLIENT_ID=your-client-id
NOTION_CLIENT_SECRET=your-client-secret
NOTION_REDIRECT_URI=https://your-app.com/callback
```

### Custom Configuration

```typescript
// Custom API version
const notion = NotionSDK.createBearerTokenClient({
  token: process.env.NOTION_TOKEN!,
  apiVersion: '2022-06-28',
});

// Custom base URL (for testing)
const notion = NotionSDK.createBearerTokenClient({
  token: process.env.NOTION_TOKEN!,
  baseUrl: 'http://localhost:3000/v1',
});
```

## API Coverage

This SDK provides complete coverage of the Notion API v1:

### OAuth Endpoints (3)
- `exchangeOAuthToken` - Exchange authorization code
- `introspectOAuthToken` - Introspect token
- `revokeOAuthToken` - Revoke token

### Pages (4 methods)
- `createPage` - Create a new page
- `retrievePage` - Get page details
- `updatePage` - Update page properties
- `retrievePageProperty` - Get page property value

### Databases (4 methods)
- `createDatabase` - Create a new database
- `retrieveDatabase` - Get database details
- `updateDatabase` - Update database schema
- `queryDatabase` - Query with filters and sorts

### Blocks (5 methods)
- `retrieveBlock` - Get block details
- `updateBlock` - Update block content
- `deleteBlock` - Delete/archive a block
- `retrieveBlockChildren` - Get child blocks
- `appendBlockChildren` - Add child blocks

### Data Sources (6 methods)
- `createDataSource` - Create a data source
- `retrieveDataSource` - Get data source details
- `updateDataSource` - Update data source
- `updateDataSourceProperties` - Update properties
- `queryDataSource` - Query data source
- `listDataSourceTemplates` - List templates

### Comments (3 methods)
- `createComment` - Create a comment
- `retrieveComment` - Get comment details
- `listComments` - List comments on a page/block

### File Uploads (5 methods)
- `createFileUpload` - Initialize file upload
- `sendFileData` - Upload file data
- `completeFileUpload` - Complete upload
- `retrieveFileUpload` - Get upload status
- `listFileUploads` - List uploads

### Search (1 method)
- `search` - Search pages and databases

### Users (3 methods)
- `listUsers` - List workspace users
- `retrieveUser` - Get user details
- `retrieveBotUser` - Get bot user info

**Total: 37 API methods across 9 categories**

## Development

### Generate SDK from OpenAPI Spec

```bash
pnpm generate
```

This generates:
- `lib/types.ts` - TypeScript interfaces from schemas
- `lib/api.ts` - API client with typed methods
- `lib/index.ts` - Re-exports

### Build

```bash
pnpm build
```

### Run Tests

```bash
pnpm test
```

### Type Check

```bash
pnpm check
```

## Architecture

The SDK follows a clean, maintainable architecture:

```
packages/notion-sdk/
├── api/
│   └── openapi.yaml          # Complete Notion API specification
├── src/
│   ├── auth/                 # Authentication modules
│   │   ├── config.ts         # Configuration types
│   │   ├── bearer-token.ts   # Bearer token manager
│   │   ├── oauth.ts          # OAuth manager
│   │   ├── client.ts         # HTTP client
│   │   └── index.ts          # Auth exports
│   ├── generator/            # Code generation utilities
│   │   ├── parser.ts         # OpenAPI parser
│   │   ├── type-generator.ts # Type generation
│   │   ├── api-generator.ts  # API generation
│   │   └── index.ts          # Generator entry
│   └── index.ts              # Main SDK entry with factory methods
├── lib/                      # Generated code (created by pnpm generate)
│   ├── types.ts              # Generated TypeScript types
│   ├── api.ts                # Generated API methods
│   └── index.ts              # Generated exports
└── package.json
```

## Notion API Resources

- [Official Notion API Documentation](https://developers.notion.com/reference/intro)
- [Getting Started Guide](https://developers.notion.com/docs/getting-started)
- [Authorization Guide](https://developers.notion.com/docs/authorization)
- [Create an Integration](https://www.notion.so/my-integrations)

## Notion API Version

This SDK uses Notion API version **2022-06-28** and includes support for the **2025-09-03** features (Data Sources).

## License

MIT
