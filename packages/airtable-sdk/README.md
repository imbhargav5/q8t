# @q8t/airtable-sdk

A comprehensive TypeScript SDK for the Airtable API with code generation from OpenAPI specifications. This SDK provides full coverage of Airtable's API with type-safe interfaces and multiple authentication methods.

## Features

- **Multiple Authentication Methods**
  - Personal Access Token (PAT) - for individual/service use
  - OAuth 2.0 - for third-party integrations with PKCE support
  - Automatic token refresh for OAuth
- **Complete API Coverage**
  - Web API (records, tables, fields, views)
  - Metadata API (bases, schema)
  - Webhooks API (real-time notifications)
  - Comments API (record discussions)
  - Enterprise API (users, groups, audit logs, workspaces)
- **Type-Safe** - Auto-generated TypeScript types from OpenAPI specs
- **Modular Architecture** - Use specific API modules or the unified SDK
- **Developer-Friendly** - Clean API with JSDoc documentation

## Installation

```bash
pnpm add @q8t/airtable-sdk
```

## Quick Start

### Personal Access Token (Recommended for Server-Side)

```typescript
import { AirtableSDK } from '@q8t/airtable-sdk';

// Simple initialization
const airtable = AirtableSDK.create('your_personal_access_token');

// List records from a table
const records = await airtable.web.listRecords('baseId', 'tableName', {
  maxRecords: 10,
  view: 'Grid view',
});

console.log('Records:', records.records);

// Create a new record
const newRecord = await airtable.web.createRecords('baseId', 'tableName', {
  records: [
    {
      fields: {
        Name: 'John Doe',
        Email: 'john@example.com',
        Status: 'Active',
      },
    },
  ],
});

// Update a record
const updated = await airtable.web.updateRecord('baseId', 'tableName', 'recordId', {
  fields: {
    Status: 'Completed',
  },
});

// List bases
const bases = await airtable.web.listBases();
console.log('Your bases:', bases.bases);
```

### OAuth 2.0 (Recommended for Third-Party Apps)

```typescript
import {
  AirtableSDK,
  generateAuthUrl,
  exchangeCodeForToken,
  type AirtableOAuthConfig,
} from '@q8t/airtable-sdk';

// Step 1: Generate authorization URL
const authConfig: AirtableOAuthConfig = {
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  redirectUri: 'https://your-app.com/callback',
  scopes: [
    'data.records:read',
    'data.records:write',
    'schema.bases:read',
  ],
};

const { url, state, codeVerifier } = await generateAuthUrl(authConfig, {
  usePKCE: true, // Recommended for security
});

// Redirect user to `url`
console.log('Authorize at:', url);

// Step 2: Exchange authorization code for tokens
const tokens = await exchangeCodeForToken({
  clientId: authConfig.clientId,
  clientSecret: authConfig.clientSecret,
  code: 'authorization_code_from_callback',
  redirectUri: authConfig.redirectUri,
  codeVerifier, // Include if using PKCE
});

// Step 3: Create SDK with automatic token refresh
const airtable = AirtableSDK.withOAuth({
  accessToken: tokens.access_token,
  refreshToken: tokens.refresh_token,
  clientId: authConfig.clientId,
  clientSecret: authConfig.clientSecret,
  onTokenRefresh: (newTokens) => {
    // Save new tokens to your database
    console.log('Token refreshed:', newTokens);
  },
});

// Get current user info
const user = await airtable.web.whoami();
console.log('User:', user);

// Use the API
const records = await airtable.web.listRecords('baseId', 'tableName');
```

## API Modules

The SDK is organized into specialized modules:

### Web API

Core operations for records, tables, fields, and views.

```typescript
const airtable = AirtableSDK.create('token');

// Records
await airtable.web.listRecords('baseId', 'tableId');
await airtable.web.getRecord('baseId', 'tableId', 'recordId');
await airtable.web.createRecords('baseId', 'tableId', { records: [...] });
await airtable.web.updateRecords('baseId', 'tableId', { records: [...] });
await airtable.web.deleteRecords('baseId', 'tableId', { records: ['id1', 'id2'] });

// Metadata
await airtable.web.listBases();
await airtable.web.listTables('baseId');
await airtable.web.getTableSchema('baseId', 'tableId');
await airtable.web.createTable('baseId', { name: 'New Table', fields: [...] });
await airtable.web.createField('baseId', 'tableId', { name: 'New Field', type: 'singleLineText' });
```

### Webhooks API

Real-time notifications for base changes.

```typescript
const airtable = AirtableSDK.create('token');

// Create webhook
const webhook = await airtable.webhooks.createWebhook('baseId', {
  notificationUrl: 'https://your-app.com/webhook',
  specification: {
    options: {
      filters: {
        dataTypes: ['tableData'],
      },
    },
  },
});

console.log('Webhook secret:', webhook.macSecretBase64);

// List webhooks
const webhooks = await airtable.webhooks.listWebhooks('baseId');

// Enable/disable notifications
await airtable.webhooks.enableWebhookNotifications('baseId', 'webhookId', {
  enable: true,
});

// Get webhook payloads for testing
const payloads = await airtable.webhooks.listWebhookPayloads('baseId', 'webhookId');

// Refresh webhook to extend expiration
await airtable.webhooks.refreshWebhook('baseId', 'webhookId');

// Delete webhook
await airtable.webhooks.deleteWebhook('baseId', 'webhookId');
```

### Comments API

Add and manage comments on records.

```typescript
const airtable = AirtableSDK.create('token');

// List comments on a record
const comments = await airtable.comments.listComments('baseId', 'tableId', 'recordId');

// Create a comment
const comment = await airtable.comments.createComment('baseId', 'tableId', 'recordId', {
  text: 'This looks great! @user@example.com',
});

// Update a comment
await airtable.comments.updateComment('baseId', 'tableId', 'recordId', 'commentId', {
  text: 'Updated comment text',
});

// Delete a comment
await airtable.comments.deleteComment('baseId', 'tableId', 'recordId', 'commentId');
```

### Enterprise API

User management, groups, audit logs, and workspace administration (Enterprise only).

```typescript
const airtable = AirtableSDK.create('enterprise_token');

// Enterprise info
const enterprise = await airtable.enterprise.getEnterpriseInfo();

// User management
const users = await airtable.enterprise.listUsers();
const user = await airtable.enterprise.getUser('userId');
await airtable.enterprise.grantAdmin('userId');
await airtable.enterprise.revokeAdmin('userId');
await airtable.enterprise.removeUser('userId');
await airtable.enterprise.claimUsers({ emails: ['user@example.com'] });

// Group management
const groups = await airtable.enterprise.listGroups();
const group = await airtable.enterprise.createGroup({
  name: 'Engineering Team',
  memberUserIds: ['user1', 'user2'],
});
await airtable.enterprise.updateGroup('groupId', {
  memberUserIds: ['user1', 'user2', 'user3'],
});
await airtable.enterprise.deleteGroup('groupId');

// Audit logs
const logs = await airtable.enterprise.listAuditLogs({
  startTime: '2025-01-01T00:00:00Z',
  endTime: '2025-01-31T23:59:59Z',
  actionType: 'createRecord',
});

// Workspace management
const workspaces = await airtable.enterprise.listWorkspaces();
const workspace = await airtable.enterprise.createWorkspace({ name: 'New Workspace' });
await airtable.enterprise.deleteWorkspace('workspaceId');

// Collaborator management
await airtable.enterprise.addWorkspaceCollaborator('workspaceId', {
  email: 'user@example.com',
  permissionLevel: 'create',
});

await airtable.enterprise.addBaseCollaborator('baseId', {
  email: 'user@example.com',
  permissionLevel: 'edit',
});
```

## Advanced Usage

### Using Individual API Classes

You can use specific API classes without the unified SDK:

```typescript
import {
  AirtableWebApi,
  createPATClient,
} from '@q8t/airtable-sdk';

const client = createPATClient({ accessToken: 'your_token' });
const webApi = new AirtableWebApi(client);

const records = await webApi.listRecords('baseId', 'tableId');
```

### Filtering and Sorting Records

```typescript
const records = await airtable.web.listRecords('baseId', 'tableId', {
  filterByFormula: "AND({Status} = 'Active', {Priority} > 5)",
  sort: ['Priority', 'Created'],
  maxRecords: 100,
  pageSize: 50,
  view: 'Grid view',
  fields: ['Name', 'Status', 'Priority'],
});
```

### Pagination

```typescript
let offset: string | undefined;
const allRecords = [];

do {
  const response = await airtable.web.listRecords('baseId', 'tableId', {
    pageSize: 100,
    offset,
  });

  allRecords.push(...response.records);
  offset = response.offset;
} while (offset);

console.log(`Total records: ${allRecords.length}`);
```

### Batch Operations

```typescript
// Create multiple records
const created = await airtable.web.createRecords('baseId', 'tableId', {
  records: [
    { fields: { Name: 'Record 1' } },
    { fields: { Name: 'Record 2' } },
    { fields: { Name: 'Record 3' } },
  ],
});

// Update multiple records
const updated = await airtable.web.updateRecords('baseId', 'tableId', {
  records: [
    { id: 'rec1', fields: { Status: 'Done' } },
    { id: 'rec2', fields: { Status: 'Done' } },
  ],
});

// Upsert (update or insert)
const upserted = await airtable.web.updateRecords('baseId', 'tableId', {
  records: [
    { fields: { Email: 'john@example.com', Name: 'John Updated' } },
  ],
  performUpsert: {
    fieldsToMergeOn: ['Email'],
  },
});

// Delete multiple records
await airtable.web.deleteRecords('baseId', 'tableId', {
  records: ['rec1', 'rec2', 'rec3'],
});
```

### Error Handling

```typescript
try {
  const records = await airtable.web.listRecords('baseId', 'tableId');
} catch (error) {
  if (error instanceof Error) {
    console.error('API Error:', error.message);

    // Check for specific error types
    if (error.message.includes('401')) {
      console.error('Authentication failed - check your token');
    } else if (error.message.includes('404')) {
      console.error('Base or table not found');
    } else if (error.message.includes('429')) {
      console.error('Rate limit exceeded - wait before retrying');
    }
  }
}
```

## Authentication

### Personal Access Tokens (PAT)

Personal Access Tokens are recommended for:
- Server-side applications
- Scripts and automation
- Internal tools
- Development and testing

**Creating a PAT:**
1. Go to https://airtable.com/create/tokens
2. Click "Create new token"
3. Select scopes (permissions)
4. Select bases/workspaces
5. Generate and copy the token

**Scopes:**
- `data.records:read` - Read records
- `data.records:write` - Write records
- `data.recordComments:read` - Read comments
- `data.recordComments:write` - Write comments
- `schema.bases:read` - Read base schemas
- `schema.bases:write` - Modify schemas
- `webhook:manage` - Manage webhooks

### OAuth 2.0

OAuth is recommended for:
- Third-party integrations
- Multi-user applications
- Public-facing apps
- When you need user-specific permissions

**OAuth Scopes:**
Same as PAT, plus:
- `user.email:read` - Read user email address

**Token Refresh:**
The SDK automatically refreshes expired tokens when you provide `refreshToken`, `clientId`, and `clientSecret`.

## Code Generation

The SDK is generated from OpenAPI specifications:

```bash
# Generate SDK from YAML specs
pnpm generate

# Build TypeScript
pnpm build

# Run tests
pnpm test

# Type check
pnpm check
```

## Architecture

```
packages/airtable-sdk/
├── api/                          # OpenAPI specifications
│   ├── web-api.yaml             # Core Web API
│   ├── oauth-api.yaml           # OAuth-specific endpoints
│   ├── webhooks-api.yaml        # Webhooks API
│   ├── comments-api.yaml        # Comments API
│   └── enterprise-api.yaml      # Enterprise API
├── src/
│   ├── auth/                    # Authentication modules
│   │   ├── config.ts           # Config types
│   │   ├── pat-client.ts       # PAT HTTP client
│   │   ├── oauth-client.ts     # OAuth HTTP client
│   │   └── oauth2.ts           # OAuth 2.0 flows
│   ├── generator/              # Code generation
│   │   ├── index.ts           # Main generator
│   │   ├── parser.ts          # OpenAPI parser
│   │   ├── type-generator.ts  # TypeScript type generator
│   │   └── api-generator.ts   # API class generator
│   └── index.ts               # Unified SDK exports
└── lib/                        # Generated code
    ├── types.ts               # TypeScript types
    ├── airtable-web-api.ts    # Web API class
    ├── airtable-webhooks-api.ts
    ├── airtable-comments-api.ts
    ├── airtable-enterprise-api.ts
    └── index.ts              # Exports
```

## Rate Limits

Airtable has a rate limit of **5 requests per second per base**, consistent across all pricing tiers.

Tips for handling rate limits:
- Batch operations when possible
- Implement exponential backoff for retries
- Cache responses when appropriate
- Use webhooks instead of polling

## Resources

- [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)
- [Personal Access Tokens Guide](https://airtable.com/developers/web/guides/personal-access-tokens)
- [OAuth Integration Guide](https://airtable.com/developers/web/guides/oauth-integrations)
- [Webhooks Guide](https://airtable.com/developers/web/guides/webhooks-api)

## License

MIT
