# @q8t/asana-sdk

A comprehensive TypeScript SDK for the Asana API with multiple authentication methods and complete API coverage.

## Features

- **Multiple Authentication Methods**
  - Personal Access Token (PAT) - Simple token-based auth for single-user apps
  - OAuth 2.0 - Full OAuth flow with automatic token refresh for multi-user applications
  - Service Account support (uses PAT authentication)
- **Complete API Coverage** - All 153 Asana API endpoints with 244 typed schemas
- **Type-Safe** - Generated from official Asana OpenAPI specification
- **Auto-generated** - SDK generated from Asana's OpenAPI spec for accuracy
- **Modern TypeScript** - Full type safety and IntelliSense support

## Installation

```bash
pnpm add @q8t/asana-sdk
```

## Quick Start

### Using Personal Access Token (PAT)

Personal Access Tokens are the simplest way to authenticate with the Asana API. They're ideal for:
- Single-user scripts and automation
- Internal tools
- Testing and development

```typescript
import { AsanaSDK } from '@q8t/asana-sdk';

// Create SDK instance with PAT
const asana = AsanaSDK.createWithPAT({
  personalAccessToken: process.env.ASANA_PAT!
});

// Get all workspaces
const workspaces = await asana.getWorkspaces();
console.log('Workspaces:', workspaces);

// Get tasks assigned to me
const tasks = await asana.getTasks({
  assignee: 'me',
  workspace: 'your-workspace-gid'
});
console.log('My tasks:', tasks);

// Create a new task
const newTask = await asana.createTask({
  data: {
    name: 'Complete documentation',
    notes: 'Write comprehensive API documentation',
    workspace: 'your-workspace-gid'
  }
});
console.log('Created task:', newTask);
```

### Using OAuth 2.0

OAuth 2.0 is recommended for multi-user applications. The SDK supports:
- Authorization code flow
- Automatic token refresh
- Token expiration handling

```typescript
import { AsanaSDK } from '@q8t/asana-sdk';

// Step 1: Generate authorization URL
const { url, state } = AsanaSDK.OAuth.generateAuthUrl({
  clientId: process.env.ASANA_CLIENT_ID!,
  clientSecret: process.env.ASANA_CLIENT_SECRET!,
  redirectUri: 'https://yourapp.com/callback',
  scopes: [AsanaSDK.OAuth.SCOPES.DEFAULT]
});

// Store state for CSRF protection and redirect user to url
console.log('Authorization URL:', url);

// Step 2: Exchange authorization code for tokens (in your callback handler)
const tokens = await AsanaSDK.OAuth.exchangeCodeForToken({
  clientId: process.env.ASANA_CLIENT_ID!,
  clientSecret: process.env.ASANA_CLIENT_SECRET!,
  code: authorizationCode, // From callback query params
  redirectUri: 'https://yourapp.com/callback'
});

console.log('Access token:', tokens.access_token);
console.log('Refresh token:', tokens.refresh_token);

// Step 3: Create SDK instance with OAuth2
const asana = AsanaSDK.createWithOAuth2({
  accessToken: tokens.access_token,
  refreshToken: tokens.refresh_token,
  clientId: process.env.ASANA_CLIENT_ID!,
  clientSecret: process.env.ASANA_CLIENT_SECRET!,
  onTokenRefresh: (newAccessToken, newRefreshToken) => {
    // Save new tokens to your database
    console.log('Token refreshed!');
    saveTokens(newAccessToken, newRefreshToken);
  }
});

// Use the SDK - tokens will be automatically refreshed when needed
const projects = await asana.getProjects({ workspace: 'workspace-gid' });
console.log('Projects:', projects);
```

## Authentication Methods

### 1. Personal Access Token (PAT)

**Best for:** Single-user apps, scripts, testing

**How to get a PAT:**
1. Go to [Asana Developer Console](https://app.asana.com/0/my-apps)
2. Click "Create new token"
3. Name your token and copy it securely

```typescript
const asana = AsanaSDK.createWithPAT({
  personalAccessToken: 'your-pat-token'
});
```

### 2. OAuth 2.0

**Best for:** Multi-user applications, public apps

**Setup:**
1. Create an app in [Asana Developer Console](https://app.asana.com/0/my-apps)
2. Configure redirect URIs
3. Get your client ID and secret

```typescript
const asana = AsanaSDK.createWithOAuth2({
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
  clientId: 'client-id',
  clientSecret: 'client-secret',
  onTokenRefresh: (newAccessToken, newRefreshToken) => {
    // Save new tokens
  }
});
```

### 3. Service Account

**Best for:** Enterprise automation, admin tasks

**Note:** Service Accounts use PAT authentication but provide elevated permissions.

```typescript
// Service accounts use the same PAT authentication
const asana = AsanaSDK.createWithPAT({
  personalAccessToken: 'service-account-pat'
});
```

## Available OAuth Scopes

```typescript
import { AsanaSDK } from '@q8t/asana-sdk';

const scopes = AsanaSDK.OAuth.SCOPES;

// Available scopes:
scopes.DEFAULT            // Full API access (default)
scopes.OPENID             // OpenID Connect
scopes.EMAIL              // User email via OpenID Connect
scopes.PROFILE            // User profile via OpenID Connect
scopes.ATTACHMENTS_READ   // View attachments
scopes.ATTACHMENTS_WRITE  // Create/modify attachments
scopes.ATTACHMENTS_DELETE // Delete attachments
scopes.CUSTOM_FIELDS_READ // View custom fields
scopes.CUSTOM_FIELDS_WRITE // Create/modify custom fields
scopes.GOALS_READ         // View goals
scopes.GOALS_WRITE        // Create/modify goals
scopes.MEMBERSHIPS_READ   // View memberships
scopes.MEMBERSHIPS_WRITE  // Manage memberships
scopes.PORTFOLIOS_READ    // View portfolios
scopes.PORTFOLIOS_WRITE   // Create/modify portfolios
scopes.PROJECTS_READ      // View projects
scopes.PROJECTS_WRITE     // Create/modify projects
scopes.SECTIONS_READ      // View sections
scopes.SECTIONS_WRITE     // Create/modify sections
scopes.STORIES_READ       // View stories/comments
scopes.STORIES_WRITE      // Create stories/comments
scopes.TAGS_READ          // View tags
scopes.TAGS_WRITE         // Create/modify tags
scopes.TASKS_READ         // View tasks
scopes.TASKS_WRITE        // Create/modify tasks
scopes.TEAMS_READ         // View teams
scopes.TEAMS_WRITE        // Manage teams
scopes.USERS_READ         // View users
scopes.WORKSPACES_READ    // View workspaces
```

## API Examples

### Working with Tasks

```typescript
// Get tasks
const tasks = await asana.getTasks({
  assignee: 'me',
  workspace: 'workspace-gid',
  completed_since: 'now'
});

// Get a specific task
const task = await asana.getTask('task-gid', {
  opt_fields: 'name,notes,assignee,due_on'
});

// Create a task
const newTask = await asana.createTask({
  data: {
    name: 'New task',
    notes: 'Task description',
    workspace: 'workspace-gid',
    projects: ['project-gid'],
    assignee: 'user-gid',
    due_on: '2025-12-31'
  }
});

// Update a task
const updatedTask = await asana.updateTask('task-gid', {
  data: {
    name: 'Updated task name',
    completed: true
  }
});

// Delete a task
await asana.deleteTask('task-gid');
```

### Working with Projects

```typescript
// Get projects in a workspace
const projects = await asana.getProjects({
  workspace: 'workspace-gid',
  archived: false
});

// Get a specific project
const project = await asana.getProject('project-gid', {
  opt_fields: 'name,notes,owner,team'
});

// Create a project
const newProject = await asana.createProject({
  data: {
    name: 'New Project',
    workspace: 'workspace-gid',
    team: 'team-gid',
    notes: 'Project description'
  }
});

// Update a project
const updatedProject = await asana.updateProject('project-gid', {
  data: {
    name: 'Updated Project Name',
    archived: true
  }
});
```

### Working with Workspaces

```typescript
// Get all workspaces
const workspaces = await asana.getWorkspaces();

// Get a specific workspace
const workspace = await asana.getWorkspace('workspace-gid');

// Get users in a workspace
const users = await asana.getUsersForWorkspace('workspace-gid');
```

### Working with Custom Fields

```typescript
// Get custom fields for a workspace
const customFields = await asana.getCustomFieldsForWorkspace('workspace-gid');

// Create a custom field
const customField = await asana.createCustomField({
  data: {
    name: 'Priority',
    resource_subtype: 'enum',
    workspace: 'workspace-gid',
    enum_options: [
      { name: 'High', color: 'red' },
      { name: 'Medium', color: 'yellow' },
      { name: 'Low', color: 'green' }
    ]
  }
});
```

### Working with Goals

```typescript
// Get goals
const goals = await asana.getGoals({
  workspace: 'workspace-gid',
  is_workspace_level: true
});

// Create a goal
const goal = await asana.createGoal({
  data: {
    name: 'Increase customer satisfaction',
    workspace: 'workspace-gid',
    owner: 'user-gid',
    time_period: 'time-period-gid'
  }
});

// Add a supporting relationship
await asana.addSupportingRelationship('goal-gid', {
  data: {
    supporting_resource: 'project-gid'
  }
});
```

### Working with Portfolios

```typescript
// Get portfolios
const portfolios = await asana.getPortfolios({
  workspace: 'workspace-gid',
  owner: 'me'
});

// Create a portfolio
const portfolio = await asana.createPortfolio({
  data: {
    name: 'Q4 2025 Projects',
    workspace: 'workspace-gid',
    color: 'light-green'
  }
});

// Add a project to portfolio
await asana.addItemForPortfolio('portfolio-gid', {
  data: {
    item: 'project-gid',
    insert_before: 'project-gid-2' // optional
  }
});
```

### Batch API

```typescript
// Execute multiple API calls in a single request
const batchResponse = await asana.createBatchRequest({
  data: {
    actions: [
      {
        method: 'GET',
        relative_path: '/workspaces',
        options: {}
      },
      {
        method: 'GET',
        relative_path: '/tasks?assignee=me',
        options: {}
      },
      {
        method: 'POST',
        relative_path: '/tasks',
        data: {
          name: 'New task from batch',
          workspace: 'workspace-gid'
        }
      }
    ]
  }
});
```

## API Coverage

The SDK provides complete coverage of all Asana API endpoints:

### Resources (153 endpoints)
- **Access Requests** - Approve/reject access requests
- **Allocations** - Resource allocation management
- **Attachments** - File attachments on tasks
- **Audit Log** - Enterprise audit logging (Service Accounts only)
- **Batch API** - Execute multiple requests in one call
- **Budgets** - Project budget tracking
- **Custom Fields** - Custom field definitions and settings
- **Custom Types** - Custom field types (Enterprise)
- **Events** - Real-time event streams
- **Exports** - Data exports (graph and resource)
- **Goals** - Goal setting and tracking
- **Goal Relationships** - Goal hierarchies and dependencies
- **Jobs** - Long-running async jobs
- **Memberships** - Resource membership management
- **Organization Exports** - Full organization exports
- **Portfolio Memberships** - Portfolio access control
- **Portfolios** - Portfolio management
- **Project Briefs** - Project overview documents
- **Project Memberships** - Project access control
- **Project Statuses** - Project status updates
- **Projects** - Project management
- **Project Templates** - Reusable project templates
- **Rules** - Automation rules
- **Sections** - Task sections within projects
- **Status Updates** - Status update posts
- **Stories** - Task comments and activity
- **Tags** - Task tags
- **Tasks** - Task management (core functionality)
- **Team Memberships** - Team member management
- **Teams** - Team management
- **Time Periods** - Time period definitions for goals
- **User Task Lists** - User's My Tasks lists
- **Users** - User information
- **Webhooks** - Event webhooks
- **Workspace Memberships** - Workspace member management
- **Workspaces** - Workspace management

### Type Definitions (244 types)
All API request and response types are fully typed with TypeScript interfaces generated from the OpenAPI specification.

## Development

### Generate SDK from OpenAPI Spec

```bash
# Regenerate types and API from OpenAPI spec
pnpm generate
```

### Build

```bash
# Build the SDK
pnpm build
```

### Type Check

```bash
# Run TypeScript type checking
pnpm check
```

### Lint and Format

```bash
# Lint code
pnpm lint

# Format code
pnpm format
```

## Architecture

The SDK is organized into several layers:

```
packages/asana-sdk/
├── api/
│   └── asana_oas.yaml          # Official Asana OpenAPI spec
├── src/
│   ├── auth/                   # Authentication layer
│   │   ├── config.ts           # API configuration and constants
│   │   ├── pat-client.ts       # PAT authentication client
│   │   ├── oauth2.ts           # OAuth2 flow helpers
│   │   ├── oauth2-client.ts    # OAuth2 authentication client
│   │   └── index.ts            # Auth exports
│   ├── generator/              # Code generation
│   │   ├── parser.ts           # OpenAPI spec parser
│   │   ├── type-generator.ts   # TypeScript type generator
│   │   ├── api-generator.ts    # API method generator
│   │   └── index.ts            # Generator entry point
│   └── index.ts                # Main SDK exports
└── lib/                        # Generated code
    ├── types.ts                # Generated TypeScript types
    ├── api.ts                  # Generated API methods
    └── index.ts                # Generated exports
```

## Resources

- [Asana API Documentation](https://developers.asana.com/docs)
- [Asana Developer Console](https://app.asana.com/0/my-apps)
- [Asana OpenAPI Specification](https://github.com/Asana/openapi)
- [OAuth 2.0 Guide](https://developers.asana.com/docs/oauth)
- [Personal Access Tokens](https://developers.asana.com/docs/personal-access-token)

## License

MIT
