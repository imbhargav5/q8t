# @q8t/clickup-sdk

Comprehensive TypeScript SDK for the ClickUp API v2.

## Features

- **Full API Coverage**: Support for all ClickUp API endpoints including workspaces, spaces, folders, lists, tasks, comments, goals, time tracking, webhooks, and more
- **Multiple Authentication Methods**: Support for both Personal API Tokens and OAuth 2.0
- **Type-Safe**: Fully typed with TypeScript for excellent IDE support
- **Code Generation**: Automatically generated from OpenAPI specification
- **Modular Design**: Separate clients for different authentication methods

## Installation

```bash
npm install @q8t/clickup-sdk
# or
pnpm add @q8t/clickup-sdk
# or
yarn add @q8t/clickup-sdk
```

## Quick Start

### Using Personal API Token

```typescript
import { ClickUpSDK } from '@q8t/clickup-sdk';

// Create SDK instance with personal token
const clickup = ClickUpSDK.createWithToken('your-personal-token');

// Get authorized workspaces
const workspaces = await clickup.getAuthorizedWorkspaces();

// Get tasks from a list
const tasks = await clickup.getTasksInList('list-id');

// Create a new task
const newTask = await clickup.createTask('list-id', {
  name: 'My New Task',
  description: 'Task description',
  priority: 3,
  assignees: [123456],
});
```

### Using OAuth 2.0

```typescript
import { ClickUpSDK, generateAuthUrl, exchangeCodeForToken } from '@q8t/clickup-sdk';

// Step 1: Generate authorization URL
const { url, state } = generateAuthUrl({
  clientId: 'your-client-id',
  redirectUri: 'https://your-app.com/callback',
});

// Direct user to the authorization URL
console.log('Authorize here:', url);

// Step 2: After user authorizes, exchange code for token
const { access_token } = await exchangeCodeForToken({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  code: 'authorization-code-from-callback',
});

// Step 3: Create SDK instance with OAuth token
const clickup = ClickUpSDK.createWithOAuth(access_token);

// Use the SDK
const user = await clickup.getAuthenticatedUser();
```

## API Coverage

### Workspaces & Teams
- Get authorized workspaces
- Get workspace details

### Spaces
- List, create, update, and delete spaces
- Get space details

### Folders
- List, create, update, and delete folders
- Get folder details

### Lists
- List, create, update, and delete lists
- Support for folderless lists
- Get list details

### Tasks
- List, create, update, and delete tasks
- Get filtered tasks across workspace
- Support for subtasks
- Task assignees, tags, and custom fields
- Task dependencies and links

### Comments
- Create, update, and delete comments
- Get comments on tasks, lists, and views
- Support for threaded comments

### Checklists
- Create, update, and delete checklists
- Manage checklist items

### Goals & Key Results
- List, create, update, and delete goals
- Manage key results

### Time Tracking
- Get, create, update, and delete time entries
- Start and stop timers
- Get current running timer

### Views
- Get views at workspace, space, folder, and list levels
- Get tasks in a view

### Webhooks
- List, create, update, and delete webhooks
- Support for 30+ event types

### Members & Guests
- Get team members
- Invite and manage guests
- Get user groups

### Tags
- List, create, update, and delete tags
- Add and remove tags from tasks

### Custom Fields
- Get accessible custom fields
- Set and remove custom field values

## Development

### Generate Code

The SDK uses code generation from OpenAPI specifications:

```bash
pnpm generate
```

### Build

```bash
pnpm build
```

### Run Tests

```bash
pnpm test
```

## Authentication Methods

### Personal API Token

Personal tokens are ideal for:
- Personal automations
- Single-user scripts
- Testing and development

Tokens start with `pk_` and never expire.

### OAuth 2.0

OAuth is recommended for:
- Multi-user applications
- Third-party integrations
- Public apps

OAuth provides better security and granular permissions.

## Error Handling

```typescript
try {
  const task = await clickup.getTask('invalid-task-id');
} catch (error) {
  console.error('ClickUp API error:', error.message);
}
```

## Rate Limiting

The ClickUp API has rate limits. Make sure to handle rate limiting in your application:

- Implement exponential backoff
- Cache responses when appropriate
- Use webhooks instead of polling

## Contributing

Contributions are welcome! Please ensure that:
- All tests pass
- Code follows the existing style
- OpenAPI spec is updated for new endpoints

## License

MIT
