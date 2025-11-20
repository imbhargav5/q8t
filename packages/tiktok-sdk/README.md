# TikTok SDK

A comprehensive TypeScript SDK for TikTok APIs with auto-generated type-safe clients and multiple authentication methods.

## Features

- **Complete API Coverage**: Support for all major TikTok API products
  - User OAuth API (Display API, Content Posting API)
  - Client Credentials API (Research API, Commercial Content API)
  - Business/Marketing API (Campaign, Ad, Creative Management)
- **Type-Safe**: Auto-generated TypeScript types from OpenAPI specifications
- **Multiple Authentication Methods**: OAuth 2.0, Client Credentials, Business API auth
- **Automatic Token Refresh**: Built-in token refresh for user OAuth flows
- **Code Generation**: YAML-based API definitions with automated client generation

## Architecture

The SDK is organized into three main API clients, each with its own authentication method:

### 1. User OAuth API Client

**Use Cases**: Display API, Content Posting API, user-authenticated operations
**Authentication**: OAuth 2.0 Authorization Code Flow with PKCE
**Base URL**: `https://open.tiktokapis.com/v2`

**Available Operations**:
- User Info (GET /user/info/)
- Video List (POST /video/list/)
- Video Query (POST /video/query/)
- Content Posting - Creator Info (POST /post/publish/creator_info/query/)
- Content Posting - Initialize (POST /post/publish/video/init/)
- Content Posting - Upload (POST /post/publish/video/upload/)
- Content Posting - Status (POST /post/publish/status/fetch/)

### 2. Client Credentials API Client

**Use Cases**: Research API, Commercial Content API
**Authentication**: OAuth 2.0 Client Credentials Flow
**Base URL**: `https://open.tiktokapis.com/v2`

**Available Operations**:
- Research Video Query (POST /research/video/query/)
- Research User Info (POST /research/user/info/)
- Video Comments List (POST /research/video/comment/list/)
- Ad Query (POST /research/adlib/ad/query/)
- Ad Details (POST /research/adlib/ad/detail/)
- Commercial Content Query (POST /research/adlib/commercial_content/report/)

### 3. Business API Client

**Use Cases**: Marketing/Advertising campaigns, ad management
**Authentication**: App-level auth code exchange
**Base URL**: `https://business-api.tiktok.com/open_api/v1.3`

**Available Operations**:
- Campaign Management (create, get, update, status update)
- Ad Group Management (create, get, update, status update)
- Ad Management (create, get, update, status update)
- Creative Assets (upload video, upload image)
- Reporting (integrated reports)
- Audience Management (custom audiences)

## Installation

```bash
pnpm install @q8t/tiktok-sdk
```

## Quick Start

### User OAuth API (Display API, Content Posting)

```typescript
import { TikTokSDK, generateAuthUrl, exchangeCodeForToken } from "@q8t/tiktok-sdk";

// Step 1: Generate authorization URL
const authConfig = {
  clientId: "YOUR_CLIENT_KEY",
  clientSecret: "YOUR_CLIENT_SECRET",
  redirectUri: "https://your-app.com/callback",
  scopes: ["user.info.basic", "video.list", "video.upload"],
};

const { url, state, codeVerifier } = await generateAuthUrl(authConfig);
// Redirect user to `url` and store `state` and `codeVerifier`

// Step 2: Exchange authorization code for tokens (in your callback handler)
const tokens = await exchangeCodeForToken({
  clientId: authConfig.clientId,
  clientSecret: authConfig.clientSecret,
  code: authorizationCode, // from callback query params
  redirectUri: authConfig.redirectUri,
  codeVerifier: storedCodeVerifier,
});

// Step 3: Create API client
const userApi = TikTokSDK.createUserOAuthClient({
  clientId: authConfig.clientId,
  clientSecret: authConfig.clientSecret,
  accessToken: tokens.access_token,
  refreshToken: tokens.refresh_token,
  onTokenRefresh: (newTokens) => {
    // Save new tokens to your database
    console.log("New access token:", newTokens.accessToken);
  },
});

// Step 4: Make API calls
const userInfo = await userApi.getUserInfo({
  fields: "open_id,display_name,avatar_url,follower_count",
});

const videos = await userApi.listVideos({
  fields: "id,title,create_time,view_count,like_count",
  max_count: 20,
});
```

### Client Credentials API (Research API, Commercial Content)

```typescript
import { TikTokSDK } from "@q8t/tiktok-sdk";

// Create client - automatically handles token acquisition and refresh
const researchApi = TikTokSDK.createClientCredentialsClient({
  clientKey: "YOUR_CLIENT_KEY",
  clientSecret: "YOUR_CLIENT_SECRET",
});

// Query videos
const videoResults = await researchApi.queryResearchVideos({
  query: {
    and: [
      {
        operation: "EQ",
        field_name: "region_code",
        field_values: ["US"],
      },
      {
        operation: "IN",
        field_name: "hashtag_name",
        field_values: ["technology", "ai"],
      },
    ],
  },
  fields: ["id", "create_time", "view_count", "like_count", "share_count"],
  max_count: 100,
  start_date: "20250101",
  end_date: "20250131",
});

// Query user information
const userInfo = await researchApi.queryResearchUserInfo({
  username: "example_user",
  fields: ["display_name", "follower_count", "video_count"],
});

// Query ads from Commercial Content Library
const ads = await researchApi.queryAds({
  filters: {
    ad_published_date_range: {
      start_date: "2025-01-01",
      end_date: "2025-01-31",
    },
    country: ["US", "UK"],
    search_term: "technology",
  },
  fields: ["ad_id", "ad_text", "advertiser_page_name", "ad_reach"],
  max_count: 50,
});
```

### Business API (Marketing/Advertising)

```typescript
import { TikTokSDK, exchangeBusinessAuthCode } from "@q8t/tiktok-sdk";

// Step 1: Exchange auth code for access token
const tokenResponse = await exchangeBusinessAuthCode({
  appId: "YOUR_APP_ID",
  secret: "YOUR_APP_SECRET",
  authCode: "AUTHORIZATION_CODE", // from TikTok Ads Manager
});

// Step 2: Create API client
const businessApi = TikTokSDK.createBusinessAPIClient({
  accessToken: tokenResponse.data.access_token,
});

// Step 3: Manage campaigns
const campaignResponse = await businessApi.createCampaign({
  advertiser_id: "YOUR_ADVERTISER_ID",
  campaign_name: "My Campaign",
  objective_type: "TRAFFIC",
  budget_mode: "BUDGET_MODE_DAY",
  budget: 100.0,
});

const campaigns = await businessApi.getCampaigns({
  advertiser_id: "YOUR_ADVERTISER_ID",
  page: 1,
  page_size: 10,
});

// Create ad group
const adGroupResponse = await businessApi.createAdGroup({
  advertiser_id: "YOUR_ADVERTISER_ID",
  campaign_id: campaignResponse.data.campaign_id,
  adgroup_name: "My Ad Group",
  placement_type: "PLACEMENT_TYPE_AUTOMATIC",
  budget_mode: "BUDGET_MODE_DAY",
  budget: 50.0,
});

// Get reporting data
const report = await businessApi.getIntegratedReport({
  advertiser_id: "YOUR_ADVERTISER_ID",
  report_type: "BASIC",
  data_level: "AUCTION_CAMPAIGN",
  dimensions: ["campaign_id", "stat_time_day"],
  metrics: ["spend", "impressions", "clicks", "ctr", "cpc"],
  start_date: "2025-01-01",
  end_date: "2025-01-31",
  page: 1,
  page_size: 100,
});
```

## API Reference

### Available Scopes (User OAuth)

- `user.info.basic` - Read basic user profile information
- `user.info.profile` - Read detailed user profile
- `user.info.stats` - Read user statistics
- `video.list` - List user's videos
- `video.upload` - Upload videos to TikTok
- `video.publish` - Publish videos directly

### Client Credentials Operations

The Client Credentials API supports:
- **Research API**: Query public videos, user profiles, and comments
- **Commercial Content API**: Search ads and commercial content from the library

### Business API Operations

The Business API supports:
- **Campaign Management**: CRUD operations for advertising campaigns
- **Ad Group Management**: Target audiences, placements, budgets
- **Ad Management**: Creative assets, ad formats, landing pages
- **Creative Management**: Upload videos and images
- **Reporting**: Comprehensive analytics and metrics
- **Audience Management**: Custom audiences for targeting

## Development

### Generate API Clients

The SDK uses code generation from OpenAPI/YAML specifications:

```bash
pnpm generate
```

This reads the YAML files from `api/` directory and generates:
- `lib/user-oauth/` - User OAuth API client and types
- `lib/client-credentials/` - Client Credentials API client and types
- `lib/business/` - Business API client and types

### Build

```bash
pnpm build
```

### API Specifications

The SDK is generated from three OpenAPI specifications:
- `api/user-oauth-api.yaml` - User OAuth API (Display, Content Posting)
- `api/client-credentials-api.yaml` - Research and Commercial Content APIs
- `api/business-api.yaml` - Business/Marketing API

To add new endpoints:
1. Update the appropriate YAML file in `api/`
2. Run `pnpm generate` to regenerate the TypeScript clients
3. The SDK will automatically include the new methods

## Error Handling

All API methods throw errors with descriptive messages:

```typescript
try {
  const userInfo = await userApi.getUserInfo({ fields: "open_id" });
} catch (error) {
  if (error instanceof Error) {
    console.error("API Error:", error.message);
    // Error format: "TikTok User OAuth API error (status): details"
  }
}
```

## Token Management

### User OAuth Tokens

User OAuth tokens automatically refresh when they expire (if a refresh token is provided):

```typescript
const userApi = TikTokSDK.createUserOAuthClient({
  clientId: "YOUR_CLIENT_KEY",
  clientSecret: "YOUR_CLIENT_SECRET",
  accessToken: "current_access_token",
  refreshToken: "refresh_token",
  onTokenRefresh: (newTokens) => {
    // Persist new tokens to your database
    saveTokens(newTokens);
  },
});
```

### Client Credentials Tokens

Client Credentials tokens are managed automatically by the SDK:
- Tokens are acquired on-demand
- Automatically refreshed before expiration
- No manual token management required

### Business API Tokens

Business API access tokens are long-lived and managed manually:

```typescript
// Exchange auth code once to get access token
const tokenResponse = await exchangeBusinessAuthCode({
  appId: "YOUR_APP_ID",
  secret: "YOUR_APP_SECRET",
  authCode: "AUTH_CODE",
});

// Use the access token (valid for 30+ days typically)
const businessApi = TikTokSDK.createBusinessAPIClient({
  accessToken: tokenResponse.data.access_token,
});
```

## Type Safety

The SDK is fully typed with TypeScript:

```typescript
import type { UserOAuthTypes, ClientCredentialsTypes, BusinessTypes } from "@q8t/tiktok-sdk";

// User info response type
type UserInfo = UserOAuthTypes.UserInfoResponse;

// Campaign create request type
type CampaignRequest = BusinessTypes.CampaignCreateRequest;

// Research video type
type ResearchVideo = ClientCredentialsTypes.ResearchVideo;
```

## License

Private

## Support

For issues and questions:
- Check the [TikTok Developer Documentation](https://developers.tiktok.com/)
- Review the YAML specifications in the `api/` directory
- Open an issue in the repository
