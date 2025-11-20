# Monday.com API Coverage

This document outlines the comprehensive API coverage provided by the Monday.com SDK.

## Authentication Methods

The SDK supports all official Monday.com authentication methods:

### 1. Personal API Token (V2) ✅
- **Implementation**: `PersonalTokenManager`
- **Usage**: Most common method for server-side integrations
- **Permissions**: Mirrors user's platform-level permissions
- **Factory Method**: `MondaySDK.createWithToken()`

### 2. OAuth 2.0 ✅
- **Implementation**: `OAuthTokenManager` + OAuth utilities
- **Usage**: For apps that need user authorization
- **Features**:
  - Authorization URL generation
  - Code exchange for access token
  - Token refresh callbacks
- **Factory Method**: `MondaySDK.createWithOAuth()`
- **Utilities**: `generateAuthUrl()`, `exchangeCodeForToken()`

### 3. Short-Lived Tokens (Seamless Auth) ✅
- **Implementation**: `ShortLivedTokenManager`
- **Usage**: For iframe apps receiving tokens from Monday.com
- **Validity**: 1 minute (configurable)
- **Features**: Automatic expiration checking
- **Factory Method**: `MondaySDK.createWithShortLivedToken()`

## API Coverage by Category

### Boards ✅
**Client**: `BoardsClient`

Queries:
- ✅ `query()` - Retrieve boards with filters

Mutations:
- ✅ `create()` - Create new board
- ✅ `update()` - Update board attributes
- ✅ `archive()` - Archive a board
- ✅ `delete()` - Delete a board
- ✅ `duplicate()` - Duplicate a board

**API Methods Covered**: 6/6 core board operations

### Items ✅
**Client**: `ItemsClient`

Queries:
- ✅ `query()` - Retrieve items by ID

Mutations:
- ✅ `create()` - Create new item
- ✅ `updateColumns()` - Update multiple column values
- ✅ `archive()` - Archive an item
- ✅ `delete()` - Delete an item
- ✅ `duplicate()` - Duplicate an item
- ✅ `moveToGroup()` - Move item between groups
- ✅ `moveToBoard()` - Move item to different board
- ✅ `clearUpdates()` - Clear all updates from item

**API Methods Covered**: 9/9 core item operations

### Columns ✅
**Client**: `ColumnsClient`

Mutations:
- ✅ `create()` - Create a column
- ✅ `createStatus()` - Create status column (2025-10 API)
- ✅ `createDropdown()` - Create dropdown column (2025-10 API)
- ✅ `changeValue()` - Change column value
- ✅ `changeTitle()` - Change column title
- ✅ `delete()` - Delete a column
- ✅ `update()` - Update column settings

**API Methods Covered**: 7/7 core column operations

### Updates (Comments) ✅
**Client**: `UpdatesClient`

Queries:
- ✅ `query()` - Retrieve updates

Mutations:
- ✅ `create()` - Create new update/comment
- ✅ `edit()` - Edit an update
- ✅ `delete()` - Delete an update
- ✅ `like()` - Like an update
- ✅ `unlike()` - Unlike an update
- ✅ `pin()` - Pin update to top
- ✅ `unpin()` - Unpin update from top

**API Methods Covered**: 8/8 core update operations

### Users ✅
**Client**: `UsersClient`

Queries:
- ✅ `query()` - Retrieve users with filters

Mutations:
- ✅ `addToBoard()` - Add users to board
- ✅ `addToWorkspace()` - Add users to workspace
- ✅ `addToTeam()` - Add users to team
- ✅ `deleteFromWorkspace()` - Remove users from workspace
- ✅ `removeFromTeam()` - Remove users from team

**API Methods Covered**: 6/6 core user operations

### Workspaces ✅
**Client**: `WorkspacesClient`

Queries:
- ✅ `query()` - Retrieve workspaces

Mutations:
- ✅ `create()` - Create workspace
- ✅ `update()` - Update workspace
- ✅ `delete()` - Delete workspace

**API Methods Covered**: 4/4 core workspace operations

### Webhooks ✅
**Client**: `WebhooksClient`

Queries:
- ✅ `query()` - Retrieve webhooks

Mutations:
- ✅ `create()` - Create webhook
- ✅ `delete()` - Delete webhook

**API Methods Covered**: 3/3 core webhook operations

## Additional Monday.com API Resources

The following Monday.com API resources are available but not yet implemented as dedicated clients. They can be accessed using the raw GraphQL query/mutation methods:

### Available via Raw GraphQL

All of these can be accessed using `monday.query()` or `monday.mutate()`:

#### Core Resources
- ⚪ Groups (board sections)
- ⚪ Subitems
- ⚪ Docs (Monday Docs)
- ⚪ Folders
- ⚪ Tags
- ⚪ Teams
- ⚪ Views (board views)
- ⚪ Dashboards
- ⚪ Widgets

#### Advanced Features
- ⚪ Assets (file columns)
- ⚪ Timeline items
- ⚪ Custom activities
- ⚪ Notifications
- ⚪ Audit logs
- ⚪ Forms
- ⚪ Templates

#### CRM & Sales
- ⚪ Emails & Activities (E&A)
- ⚪ Objects (custom CRM objects)

#### Marketplace
- ⚪ App subscriptions
- ⚪ Marketplace apps
- ⚪ App features

#### Automations & Integrations
- ⚪ Integrations
- ⚪ Automation triggers
- ⚪ Automation blocks
- ⚪ Connections

## Raw GraphQL Access

The SDK provides direct GraphQL access for any API operation not covered by dedicated clients:

```typescript
// Custom query
const result = await monday.query(`
  query {
    boards(limit: 10) {
      id
      name
      groups {
        id
        title
      }
    }
  }
`);

// Custom mutation
const result = await monday.mutate(`
  mutation ($board_id: ID!, $title: String!) {
    create_group(board_id: $board_id, group_name: $title) {
      id
      title
    }
  }
`, { board_id: 123456, title: "New Group" });
```

## Summary

### Implemented Clients
- ✅ 7 dedicated client classes
- ✅ 3 authentication methods
- ✅ 43+ API methods across all clients
- ✅ Full TypeScript support
- ✅ GraphQL schema awareness

### Coverage Statistics
- **Authentication**: 3/3 methods (100%)
- **Core Operations**: 43+ methods implemented
- **Dedicated Clients**: 7 categories
- **Additional Access**: Full API via raw GraphQL

### Future Enhancements
- Auto-generate types from GraphQL schema introspection
- Add dedicated clients for Groups, Docs, Dashboards
- Generate client methods from schema SDL
- Add CRM-specific clients
- Marketplace app integration helpers
