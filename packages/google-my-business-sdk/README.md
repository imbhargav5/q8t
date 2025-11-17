# @q8t/google-my-business-sdk

A TypeScript SDK for Google My Business API with OAuth 2.0 authentication and auto-generated types from OpenAPI definitions.

## Features

- Google OAuth 2.0 authentication with PKCE
- Auto-generated TypeScript types from OpenAPI spec
- Type-safe API client for Google My Business endpoints
- Automatic token refresh on expiration
- Support for locations, reviews, and local posts management

## Installation

```bash
pnpm add @q8t/google-my-business-sdk
```

## Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google My Business API
4. Go to "APIs & Services" > "Credentials"
5. Create OAuth 2.0 Client ID (Web application)
6. Add your redirect URI (e.g., `http://localhost:3000/callback`)
7. Note your Client ID and Client Secret

### 2. Configure OAuth Scopes

The SDK uses the following Google OAuth scopes:

- `https://www.googleapis.com/auth/business.manage` - Full access to manage business information
- `https://www.googleapis.com/auth/plus.business.manage` - Manage Google+ pages for your business

## Usage

### Authentication Flow

```typescript
import {
  generateAuthUrl,
  exchangeCodeForToken,
  createGMBClient,
  type GMBAuthConfig,
} from "@q8t/google-my-business-sdk";

// 1. Configure OAuth
const config: GMBAuthConfig = {
  clientId: "your-client-id.apps.googleusercontent.com",
  clientSecret: "your-client-secret",
  redirectUri: "http://localhost:3000/callback",
  scopes: ["business.manage"],
};

// 2. Generate authorization URL
const { url, state, codeVerifier } = await generateAuthUrl(config);
// Redirect user to `url`
// Store `state` and `codeVerifier` in session

// 3. Handle callback and exchange code for tokens
const tokens = await exchangeCodeForToken({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  code: "authorization-code-from-callback",
  redirectUri: config.redirectUri,
  codeVerifier: codeVerifier,
});

// 4. Create authenticated client
const client = createGMBClient({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  accessToken: tokens.access_token,
  refreshToken: tokens.refresh_token,
  onTokenRefresh: (newTokens) => {
    // Store new tokens
    console.log("Tokens refreshed:", newTokens);
  },
});
```

### Using the API Client

```typescript
import { GoogleMyBusinessApi } from "@q8t/google-my-business-sdk";

const api = new GoogleMyBusinessApi(client);

// List all accounts
const accounts = await api.listAccounts();

// List locations for an account
const locations = await api.listLocations("accounts/123456789");

// Get reviews for a location
const reviews = await api.listReviews(
  "accounts/123456789",
  "locations/987654321"
);

// Create a local post
const post = await api.createLocalPost(
  "accounts/123456789",
  "locations/987654321",
  {
    languageCode: "en-US",
    summary: "Check out our new products!",
    topicType: "STANDARD",
    callToAction: {
      actionType: "LEARN_MORE",
      url: "https://example.com/products",
    },
  }
);
```

## API Endpoints

The SDK provides type-safe methods for the following Google My Business API endpoints:

### Accounts

- `listAccounts()` - List all Google My Business accounts

### Locations

- `listLocations(account)` - List all locations for an account

### Reviews

- `listReviews(account, location)` - Get reviews for a specific location

### Local Posts

- `createLocalPost(account, location, body)` - Create a new local post

## Development

### Generate API Types

```bash
pnpm generate
```

This reads `api/openapi.yaml` and generates TypeScript types and API methods in the `lib/` directory.

### Build

```bash
pnpm build
```

### Type Checking

```bash
pnpm check
```

## Google My Business API Resources

- [API Documentation](https://developers.google.com/my-business/reference/rest)
- [Business Information API](https://developers.google.com/my-business/reference/businessinformation/rest)
- [OAuth 2.0 for Google APIs](https://developers.google.com/identity/protocols/oauth2)
- [API Scopes](https://developers.google.com/identity/protocols/oauth2/scopes#mybusinessbusinessinformation)

## License

MIT
