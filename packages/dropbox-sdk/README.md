# @q8t/dropbox-sdk

A comprehensive TypeScript SDK for the Dropbox API with full type safety and support for both Core and Team APIs.

## Features

- **Multiple Client Types** - Separate clients for Core API (user operations) and Team API (administration)
- **Type-safe API client** - Generated from OpenAPI specifications with full TypeScript support
- **OAuth 2.0 authentication** - Complete auth flow with automatic token refresh
- **Comprehensive API coverage** - All Dropbox API v2 endpoints
  - Files (list, upload, download, search, metadata)
  - Sharing (shared links, folders, permissions)
  - Users (account info, space usage)
  - Team (members, groups, folders, devices, namespaces)
  - File requests
- **Auto-generated** - SDK generated from YAML specifications

## Installation

```bash
pnpm install @q8t/dropbox-sdk
```

## Quick Start

### 1. OAuth 2.0 Authentication Flow

```typescript
import { DropboxSDK } from '@q8t/dropbox-sdk';

// Generate authorization URL
const { url, state } = DropboxSDK.generateAuthUrl({
  clientId: 'your-client-id',
  redirectUri: 'https://your-app.com/callback',
  scopes: [
    'files.content.read',
    'files.content.write',
    'files.metadata.read',
    'sharing.read',
    'sharing.write'
  ],
});

// Redirect user to `url`
// Store `state` to verify callback

// After user authorizes, exchange code for tokens
const tokens = await DropboxSDK.exchangeCodeForToken({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  code: 'authorization-code-from-callback',
  redirectUri: 'https://your-app.com/callback',
});

const { access_token, refresh_token } = tokens;
```

### 2. Using Core API Client (User Operations)

```typescript
import { DropboxSDK } from '@q8t/dropbox-sdk';

// Create Core API client
const coreClient = DropboxSDK.createCoreClient({
  accessToken: access_token,
  refreshToken: refresh_token,
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  onTokenRefresh: (tokens) => {
    // Save new tokens to your database
    console.log('Tokens refreshed:', tokens);
  },
});

// Get current user account
const account = await coreClient.getCurrentAccount();
console.log('Account:', account);

// List folder contents
const folder = await coreClient.listFolder({ path: '' });
console.log('Files:', folder.entries);

// Get space usage
const space = await coreClient.getSpaceUsage();
console.log('Space used:', space.used);

// Create a folder
const newFolder = await coreClient.createFolderV2({
  path: '/My New Folder',
  autorename: false,
});

// Search for files
const searchResults = await coreClient.searchV2({
  query: 'project',
  options: {
    max_results: 20,
    file_status: 'active',
  },
});

// Create shared link
const sharedLink = await coreClient.createSharedLinkWithSettings({
  path: '/My Folder/document.pdf',
  settings: {
    requested_visibility: 'public',
  },
});
console.log('Shared link:', sharedLink.url);

// Create file request
const fileRequest = await coreClient.createFileRequest({
  title: 'Upload your documents',
  destination: '/File Requests',
  open: true,
});
console.log('File request URL:', fileRequest.url);
```

### 3. Using Team API Client (Team Administration)

```typescript
import { DropboxSDK } from '@q8t/dropbox-sdk';

// Create Team API client (requires team admin access token)
const teamClient = DropboxSDK.createTeamClient({
  accessToken: team_access_token,
  refreshToken: team_refresh_token,
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

// List team members
const members = await teamClient.listMembersV2({ limit: 100 });
console.log('Team members:', members.members);

// Get member info
const memberInfo = await teamClient.getMembersInfo({
  members: [
    { '.tag': 'team_member_id', team_member_id: 'dbmid:...' },
    { '.tag': 'email', email: 'user@company.com' },
  ],
});

// Add team member
await teamClient.addMember({
  new_members: [
    {
      member_email: 'newuser@company.com',
      member_given_name: 'John',
      member_surname: 'Doe',
      role: 'member_only',
    },
  ],
});

// List groups
const groups = await teamClient.listGroups({ limit: 100 });
console.log('Groups:', groups.groups);

// Create group
const newGroup = await teamClient.createGroup({
  group_name: 'Engineering',
  group_management_type: 'company_managed',
});

// Add members to group
await teamClient.addMembersToGroup({
  group: {
    '.tag': 'group_id',
    group_id: newGroup.group_id,
  },
  members: [
    {
      user: { '.tag': 'team_member_id', team_member_id: 'dbmid:...' },
      access_type: 'member',
    },
  ],
});

// List team folders
const teamFolders = await teamClient.listTeamFolders({ limit: 100 });
console.log('Team folders:', teamFolders.team_folders);

// Create team folder
const teamFolder = await teamClient.createTeamFolder({
  name: 'Engineering Projects',
  sync_setting: 'sync_all',
});

// List member devices
const devices = await teamClient.listMemberDevices({
  team_member_id: 'dbmid:...',
  include_web_sessions: true,
  include_desktop_clients: true,
  include_mobile_clients: true,
});
console.log('Member devices:', devices);

// List team namespaces
const namespaces = await teamClient.listNamespaces({ limit: 100 });
console.log('Namespaces:', namespaces.namespaces);
```

## API Coverage

### Core API (User Operations)

#### Files Endpoints (8 methods)
- `listFolder` - List folder contents
- `listFolderContinue` - Continue listing with cursor
- `getMetadata` - Get file/folder metadata
- `createFolderV2` - Create a new folder
- `deleteV2` - Delete file or folder
- `copyV2` - Copy file or folder
- `moveV2` - Move file or folder
- `searchV2` - Search for files and folders

#### Users Endpoints (2 methods)
- `getCurrentAccount` - Get current user account info
- `getSpaceUsage` - Get space usage information

#### Sharing Endpoints (3 methods)
- `createSharedLinkWithSettings` - Create shared link with settings
- `listSharedLinks` - List shared links
- `revokeSharedLink` - Revoke a shared link

#### File Requests Endpoints (3 methods)
- `listFileRequestsV2` - List file requests
- `createFileRequest` - Create file request
- `getFileRequest` - Get file request details

### Team API (Administration)

#### Team Members (6 methods)
- `listMembersV2` - List team members
- `listMembersContinueV2` - Continue listing with cursor
- `getMembersInfo` - Get member information
- `addMember` - Add team member
- `removeMember` - Remove team member
- `suspendMember` - Suspend team member
- `unsuspendMember` - Unsuspend team member

#### Groups (5 methods)
- `listGroups` - List groups
- `createGroup` - Create group
- `deleteGroup` - Delete group
- `addMembersToGroup` - Add members to group
- `removeMembersFromGroup` - Remove members from group

#### Team Folders (3 methods)
- `listTeamFolders` - List team folders
- `createTeamFolder` - Create team folder
- `archiveTeamFolder` - Archive team folder

#### Devices (2 methods)
- `listMemberDevices` - List member's devices
- `listMembersDevices` - List all members' devices

#### Namespaces (2 methods)
- `listNamespaces` - List team namespaces
- `listNamespacesContinue` - Continue listing with cursor

## OAuth 2.0 Scopes

### Core API Scopes
- `account_info.read` - Read account info
- `files.content.write` - Create, edit, and delete files and folders
- `files.content.read` - View content of files and folders
- `files.metadata.write` - Edit metadata on files and folders
- `files.metadata.read` - View metadata on files and folders
- `sharing.write` - Create and modify shared links and groups
- `sharing.read` - View shared links and groups
- `file_requests.write` - Create and update file requests
- `file_requests.read` - Read file requests

### Team API Scopes
- `team_info.read` - View team information
- `members.read` - View team member information
- `members.write` - Add, remove, and manage team members
- `groups.read` - View team group information
- `groups.write` - Create and manage team groups
- `events.read` - View team events
- `sessions.list` - List team member sessions
- `team_data.member` - Access team member data

## Authentication Methods

The SDK supports multiple authentication methods as provided by Dropbox:

### 1. OAuth 2.0 (Recommended)
Full OAuth 2.0 flow with automatic token refresh:

```typescript
const coreClient = DropboxSDK.createCoreClient({
  accessToken: 'your-access-token',
  refreshToken: 'your-refresh-token',
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  onTokenRefresh: (tokens) => {
    // Save new tokens
  },
});
```

### 2. Access Token Only
For short-lived operations or testing:

```typescript
const coreClient = DropboxSDK.createCoreClient({
  accessToken: 'your-access-token',
});
```

## Development

```bash
# Generate SDK from OpenAPI specs
pnpm generate

# Build
pnpm build

# Type check
pnpm check

# Lint
pnpm lint
```

## Architecture

The SDK is organized into separate clients for different API types:

- `api/core-api.yaml` - Core API specification (files, sharing, users, file requests)
- `api/team-api.yaml` - Team API specification (members, groups, folders, devices)
- `src/generator/` - Code generation utilities
- `lib/core/` - Generated Core API code (types & API methods)
- `lib/team/` - Generated Team API code (types & API methods)
- `src/auth/` - OAuth 2.0 authentication helpers
- `src/clients/` - HTTP clients for Core and Team APIs

## Resources

- [Dropbox API Documentation](https://www.dropbox.com/developers/documentation)
- [OAuth 2.0 Guide](https://developers.dropbox.com/oauth-guide)
- [Core API Reference](https://www.dropbox.com/developers/documentation/http/documentation)
- [Team API Reference](https://www.dropbox.com/developers/documentation/http/teams)

## License

MIT
