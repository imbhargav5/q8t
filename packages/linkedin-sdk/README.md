# LinkedIn SDK

A TypeScript SDK for the LinkedIn API with OAuth 2.0 authentication and auto-generated API methods from OpenAPI specifications.

## Features

- OAuth 2.0 authentication flow
- Type-safe API client generated from OpenAPI spec
- Support for LinkedIn API v2 endpoints
- Profile, posts, and connections management

## Installation

```bash
pnpm install
```

## Authentication

This SDK uses LinkedIn's OAuth 2.0 flow for authentication. You'll need to:

1. Create a LinkedIn Developer Application at https://developer.linkedin.com/
2. Configure your OAuth 2.0 redirect URI
3. Obtain your Client ID and Client Secret

### OAuth 2.0 Configuration

```typescript
import { LinkedInOAuthConfig, LinkedInOAuth2 } from "@q8t/linkedin-sdk";

const config: LinkedInOAuthConfig = {
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  redirectUri: "YOUR_REDIRECT_URI",
  scopes: ["r_liteprofile", "r_emailaddress", "w_member_social"],
};

const oauth = new LinkedInOAuth2(config);
```

### Available Scopes

- `r_liteprofile` - Read basic profile data
- `r_emailaddress` - Read email address
- `w_member_social` - Post, comment, and like content
- `r_organization_social` - Read organization posts
- `w_organization_social` - Write organization posts

### Authentication Flow

1. Generate the authorization URL:

```typescript
const authUrl = oauth.getAuthorizationUrl("optional-state");
// Redirect user to authUrl
```

2. Exchange the authorization code for tokens:

```typescript
const tokens = await oauth.exchangeCodeForToken(code);
// tokens contains access_token and expires_in
```

3. Create an authenticated client:

```typescript
import { createHttpClient } from "@q8t/linkedin-sdk";

const client = createHttpClient(tokens.access_token);
```

4. Use the API:

```typescript
import { LinkedInApi } from "@q8t/linkedin-sdk/lib";

const api = new LinkedInApi(client);

// Get user profile
const profile = await api.getProfile();

// Create a post
const post = await api.createPost({
  author: "urn:li:person:YOUR_ID",
  lifecycleState: "PUBLISHED",
  specificContent: {
    "com.linkedin.ugc.ShareContent": {
      shareCommentary: {
        text: "Hello LinkedIn!",
      },
      shareMediaCategory: "NONE",
    },
  },
  visibility: {
    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
  },
});
```

## Code Generation

The SDK uses code generation to create type-safe API methods from the OpenAPI specification.

```bash
pnpm generate
```

This will generate:
- `lib/types.ts` - TypeScript interfaces for API models
- `lib/api.ts` - API client class with typed methods
- `lib/index.ts` - Main export file

## API Endpoints

### Profile
- `GET /me` - Get authenticated user's profile

### Posts
- `POST /ugcPosts` - Create a new post (User Generated Content)

### Connections
- `GET /connections` - Get user's connections

## Environment Variables

```env
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=your_redirect_uri
```

## License

MIT
