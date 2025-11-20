# @q8t/dribbble-sdk

A comprehensive TypeScript SDK for the Dribbble API v2, generated from OpenAPI specifications.

## Features

- **Type-safe API client** - Generated from OpenAPI spec with full TypeScript support
- **OAuth 2.0 authentication** - Complete OAuth2 flow implementation
- **Comprehensive API coverage** - All Dribbble API v2 endpoints
- **Auto-generated** - SDK generated from YAML specifications
- **Rate limit aware** - Built-in rate limit constants (60 req/min, 1440 req/day)

## Installation

```bash
pnpm install @q8t/dribbble-sdk
```

## Authentication

Dribbble uses OAuth 2.0 for authentication. You need to register your application at [Dribbble Developers](https://dribbble.com/account/applications/new) to obtain client credentials.

### OAuth 2.0 Scopes

- `public` - Read-only access to public information (default)
- `upload` - Full access to create, update, and delete shots and attachments

## Quick Start

### 1. Generate Authorization URL

```typescript
import {
  generateAuthUrl,
  exchangeCodeForToken,
  createDribbbleClient,
  DribbbleApi,
  type DribbbleAuthConfig,
} from '@q8t/dribbble-sdk';

// Configure OAuth2
const authConfig: DribbbleAuthConfig = {
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  redirectUri: 'https://your-app.com/callback',
  scopes: ['public', 'upload'],
};

// Generate authorization URL
const { url, state } = generateAuthUrl(authConfig);
// Redirect user to `url` for authorization
// Store `state` to verify callback
```

### 2. Exchange Authorization Code for Token

```typescript
// After user authorizes, Dribbble redirects to your callback URL with a code
const token = await exchangeCodeForToken({
  clientId: authConfig.clientId,
  clientSecret: authConfig.clientSecret,
  code: authorizationCode, // from callback query parameter
  redirectUri: authConfig.redirectUri,
});

console.log('Access token:', token.access_token);
// Save token.access_token securely for future use
```

### 3. Create API Client and Make Requests

```typescript
// Create HTTP client with access token
const client = createDribbbleClient({
  accessToken: token.access_token,
});

// Create API instance
const api = new DribbbleApi(client);

// Get authenticated user profile
const user = await api.getAuthenticatedUser();
console.log('User:', user.name, user.login);

// List user's shots
const shots = await api.listUserShots({
  page: 1,
  per_page: 30,
});
console.log(`Found ${shots.length} shots`);

// Get a specific shot
const shot = await api.getShot(12345);
console.log('Shot:', shot.title);
```

## API Coverage

The SDK provides full coverage of Dribbble API v2 endpoints:

### User

- `getAuthenticatedUser()` - Get authenticated user profile

### Shots

- `listUserShots(params?)` - List authenticated user's shots
- `getShot(id)` - Get a specific shot by ID
- `createShot(body)` - Create a new shot (requires `upload` scope)
- `updateShot(id, body)` - Update a shot (requires `upload` scope)
- `deleteShot(id)` - Delete a shot (requires `upload` scope)

### Attachments

- `createAttachment(shot_id, body)` - Create attachment for a shot (asynchronous)
- `deleteAttachment(shot_id, id)` - Delete an attachment

### Projects

- `listUserProjects(params?)` - List authenticated user's projects
- `createProject(body)` - Create a new project
- `updateProject(id, body)` - Update a project
- `deleteProject(id)` - Delete a project

## Advanced Usage

### Creating a Shot

```typescript
// Create FormData for image upload
const formData = new FormData();
formData.append('title', 'My Amazing Design');
formData.append('description', 'A beautiful design created with love');
formData.append('image', imageFile); // File object (400x300 or 800x600, max 8MB)
formData.append('tags', JSON.stringify(['design', 'ui', 'web']));

// Create shot (returns 202 with Location header for async processing)
const result = await api.createShot(formData);
console.log('Shot creation started at:', result.location);
```

### Working with Projects

```typescript
// Create a project
const project = await api.createProject({
  name: 'Website Redesign',
  description: 'Designs for the new company website',
});

// Update project
const updated = await api.updateProject(project.id, {
  name: 'Website Redesign 2024',
});

// List projects
const projects = await api.listUserProjects({
  page: 1,
  per_page: 50,
});
```

### Error Handling

```typescript
try {
  const shot = await api.getShot(999999);
} catch (error) {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
    // Error message includes status code and response body
  }
}
```

## Rate Limits

Dribbble API has the following rate limits:

- **60 requests per minute** per authenticated user
- **1,440 requests per day** per authenticated user

Rate limit information is returned in response headers:
- `X-RateLimit-Limit` - Maximum requests allowed
- `X-RateLimit-Remaining` - Remaining requests in current window

## Token Management

Dribbble OAuth2 tokens do not expire automatically, but users can revoke access at any time. The SDK does not include automatic token refresh as Dribbble doesn't provide a refresh token mechanism. Store access tokens securely and handle 401 errors by re-authenticating the user.

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

# Lint and format
pnpm lint
pnpm format
```

## Architecture

The SDK is generated from OpenAPI specifications:

- `api/openapi.yaml` - Complete Dribbble API v2 specification
- `src/generator/` - Code generation utilities
  - `parser.ts` - OpenAPI spec parser
  - `type-generator.ts` - TypeScript type generator
  - `api-generator.ts` - API method generator
  - `index.ts` - Main generator entry point
- `lib/` - Generated TypeScript code (types & API)
- `src/auth/` - Authentication helpers
  - `config.ts` - API configuration and constants
  - `oauth2.ts` - OAuth2 flow implementation
  - `client.ts` - HTTP client with bearer token auth

## Resources

- [Dribbble API Documentation](https://developer.dribbble.com/v2/)
- [OAuth 2.0 Flow](https://developer.dribbble.com/v2/oauth/)
- [Register Your Application](https://dribbble.com/account/applications/new)

## Important Notes

### Asynchronous Operations

Some endpoints like `createShot()` and `createAttachment()` return 202 Accepted, indicating asynchronous processing. The response includes a `Location` header pointing to the resource URL.

### Multipart Uploads

Shot creation requires multipart/form-data uploads. Use FormData to upload images:

```typescript
const formData = new FormData();
formData.append('image', file); // exactly 400x300 or 800x600, max 8MB
formData.append('title', 'Shot Title');
await api.createShot(formData);
```

### Scope Requirements

Certain operations require specific OAuth scopes:
- Creating, updating, deleting shots/attachments requires `upload` scope
- Reading public data requires `public` scope (default)

## License

MIT
