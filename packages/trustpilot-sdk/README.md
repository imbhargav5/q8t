# @q8t/trustpilot-sdk

A comprehensive TypeScript SDK for the Trustpilot API with support for both API Key and OAuth 2.0 authentication, generated from OpenAPI specifications.

## Features

- **Dual Authentication Support** - API Key for public APIs and OAuth 2.0 for business APIs
- **Type-safe API clients** - Generated from OpenAPI specs with full TypeScript support
- **Comprehensive API coverage** - All Trustpilot API endpoints including public and private operations
- **Auto-generated** - SDK generated from YAML specifications for consistency
- **Automatic token management** - OAuth2 client handles token refresh automatically
- **Multiple client types** - Separate clients for public and business operations

## Installation

```bash
pnpm install @q8t/trustpilot-sdk
```

## Quick Start

### Public API Client (API Key Authentication)

The public client provides access to publicly available Trustpilot data including business information, reviews, categories, and resources.

```typescript
import { createPublicClient } from '@q8t/trustpilot-sdk';

// Create a public API client
const client = createPublicClient({
  apiKey: 'your-api-key',
});

// Get business unit information
const business = await client.api.getBusinessUnit('business-unit-id');
console.log('Business:', business.displayName);

// Search for businesses
const results = await client.api.searchBusinessUnits({
  query: 'example company',
});

// Get business reviews
const reviews = await client.api.getBusinessUnitReviews('business-unit-id', {
  stars: '5',
  perPage: 10,
});

// Get categories
const categories = await client.api.getCategories({
  country: 'US',
});

// Get supported locales
const locales = await client.api.getLocales();
```

### Business API Client (OAuth 2.0 Authentication)

The business client provides access to private business operations including review management, invitations, and private product data.

#### Authorization Code Flow (Recommended for user-facing applications)

```typescript
import { createBusinessClient } from '@q8t/trustpilot-sdk';

// Step 1: Create client and generate authorization URL
const client = createBusinessClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  onTokenRefresh: (tokens) => {
    // Save new tokens to your database
    console.log('New access token:', tokens.access_token);
    console.log('Expires in:', tokens.expires_in, 'seconds');
  },
});

const authUrl = client.generateAuthorizationUrl({
  redirectUri: 'https://your-app.com/callback',
  state: 'random-state-string',
});

// Redirect user to authUrl

// Step 2: Exchange authorization code for tokens (in your callback handler)
const tokens = await client.exchangeCodeForToken(
  authorizationCode,
  'https://your-app.com/callback'
);

// Step 3: Use the API
const reviews = await client.api.getPrivateBusinessUnitReviews('business-unit-id', {
  perPage: 20,
  stars: '1,2,3,4,5',
});
```

#### Client Credentials Flow (For server-to-server applications)

```typescript
import { createBusinessClient } from '@q8t/trustpilot-sdk';

const client = createBusinessClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

// Get access token
await client.getClientCredentialsToken();

// Use the API
const reviews = await client.api.getPrivateBusinessUnitReviews('business-unit-id');
```

#### Using Existing Tokens

```typescript
import { createBusinessClient } from '@q8t/trustpilot-sdk';

const client = createBusinessClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  accessToken: 'existing-access-token',
  refreshToken: 'existing-refresh-token',
  onTokenRefresh: (tokens) => {
    // Save refreshed tokens
    saveTokens(tokens);
  },
});

// The client will automatically refresh the token when needed
const reviews = await client.api.getPrivateBusinessUnitReviews('business-unit-id');
```

## API Coverage

### Public API Client (API Key Authentication)

#### Business Units (11 methods)
- `getBusinessUnit` - Get business unit by ID
- `findBusinessUnit` - Find business unit by domain
- `searchBusinessUnits` - Search for business units
- `getBusinessUnitReviews` - Get public reviews for a business
- `getBusinessUnitWebLinks` - Get links to Trustpilot profile
- `getBusinessUnitLogo` - Get company logo

#### Consumer API (1 method)
- `getConsumerReviews` - Get reviews written by a consumer

#### Categories API (3 methods)
- `getCategories` - Get all categories
- `getCategory` - Get specific category details
- `getCategoryBusinessUnits` - Get businesses in a category

#### Resources API (4 methods)
- `getLocales` - Get supported locales
- `getCountries` - Get supported countries
- `getImageResources` - Get Trustpilot image resources
- `getStarRatingString` - Get localized star rating text

#### Product Reviews API (2 methods)
- `getProductReviews` - Get public product reviews
- `getProductReview` - Get specific product review

### Business API Client (OAuth 2.0 Authentication)

#### Private Reviews (1 method)
- `getPrivateBusinessUnitReviews` - Get private reviews with customer emails and reference IDs

#### Review Management (6 methods)
- `replyToReview` - Post a company reply to a review
- `deleteReviewReply` - Delete a company reply
- `addReviewTags` - Add tags to a review
- `setReviewTags` - Replace all tags on a review
- `removeReviewTags` - Remove specific tags from a review

#### Invitations API (3 methods)
- `sendEmailInvitation` - Send review invitation via email
- `createInvitationLink` - Generate unique invitation link
- `getInvitationTemplates` - Get available invitation templates

#### Private Product Reviews (3 methods)
- `getPrivateProductReviews` - Get private product reviews with customer details
- `getProductReviewSummaries` - Get review statistics for products
- `createProductInvitationLink` - Generate product review invitation link

#### Private Products Management (4 methods)
- `getPrivateProducts` - Get all products for business unit
- `createPrivateProduct` - Add new product
- `updatePrivateProduct` - Update existing product
- `deletePrivateProduct` - Remove product

#### Consumer Profile (1 method)
- `getConsumerProfile` - Get detailed consumer information

## Authentication Methods

### API Key Authentication

Used for accessing public Trustpilot data. Obtain an API key from the Trustpilot Developer Portal.

```typescript
const client = createPublicClient({
  apiKey: 'your-api-key',
});
```

### OAuth 2.0 Authentication

Trustpilot supports multiple OAuth 2.0 flows:

#### 1. Authorization Code Flow
Best for user-facing applications where users grant permission to your app.

```typescript
const client = createBusinessClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

// Generate auth URL and redirect user
const authUrl = client.generateAuthorizationUrl({
  redirectUri: 'https://your-app.com/callback',
  state: 'random-state',
});

// Exchange code for tokens in callback
const tokens = await client.exchangeCodeForToken(code, redirectUri);
```

#### 2. Client Credentials Flow
Best for server-to-server applications without user context.

```typescript
const client = createBusinessClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

await client.getClientCredentialsToken();
```

#### 3. Token Refresh
The SDK automatically refreshes tokens when they expire (access tokens expire after 100 hours).

```typescript
const client = createBusinessClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  accessToken: 'existing-token',
  refreshToken: 'existing-refresh-token',
  onTokenRefresh: (tokens) => {
    // Called automatically when token is refreshed
    saveToDatabase(tokens);
  },
});

// Manual refresh if needed
await client.refreshAccessToken();
```

#### 4. Token Revocation
Revoke refresh tokens when users disconnect or logout.

```typescript
await client.revokeToken();
```

## Examples

### Managing Reviews

```typescript
// Get private reviews with customer details
const reviews = await client.api.getPrivateBusinessUnitReviews('business-unit-id', {
  stars: '1,2,3', // Filter low-rated reviews
  perPage: 50,
  state: 'published',
});

// Reply to a review
await client.api.replyToReview('review-id', {
  message: 'Thank you for your feedback! We appreciate your input.',
});

// Add tags to categorize reviews
await client.api.addReviewTags('review-id', {
  tags: ['customer-service', 'shipping'],
  group: 'generic',
});

// Delete a reply
await client.api.deleteReviewReply('review-id');
```

### Sending Review Invitations

```typescript
// Send email invitation
await client.api.sendEmailInvitation('business-unit-id', {
  recipientEmail: 'customer@example.com',
  recipientName: 'John Doe',
  referenceId: 'order-12345',
  locale: 'en-US',
  preferredSendTime: '2024-01-15T10:00:00Z',
  serviceReviewInvitation: {
    redirectUri: 'https://your-site.com/thankyou',
  },
});

// Generate invitation link
const invitation = await client.api.createInvitationLink('business-unit-id', {
  referenceId: 'order-67890',
  redirectUri: 'https://your-site.com/thankyou',
});

console.log('Invitation URL:', invitation.url);
```

### Managing Products

```typescript
// Create a product
await client.api.createPrivateProduct('business-unit-id', {
  sku: 'PROD-001',
  productUrl: 'https://yourstore.com/products/item-001',
  name: 'Amazing Product',
  brand: 'Your Brand',
  imageUrl: 'https://yourstore.com/images/item-001.jpg',
});

// Get product review summaries
const summaries = await client.api.getProductReviewSummaries('business-unit-id', {
  sku: ['PROD-001', 'PROD-002'],
});

for (const summary of summaries.summaries) {
  console.log(`Product ${summary.sku}: ${summary.starsAverage} stars (${summary.numberOfReviews.total} reviews)`);
}

// Send product review invitation
const productInvite = await client.api.createProductInvitationLink('business-unit-id', {
  referenceId: 'order-12345',
  products: [
    {
      sku: 'PROD-001',
      name: 'Amazing Product',
      productUrl: 'https://yourstore.com/products/item-001',
      imageUrl: 'https://yourstore.com/images/item-001.jpg',
    },
  ],
});
```

### Working with Categories and Resources

```typescript
// Get all categories for a country
const categories = await publicClient.api.getCategories({
  country: 'US',
  locale: 'en-US',
});

// Get businesses in a category
const businesses = await publicClient.api.getCategoryBusinessUnits('category-id', {
  country: 'US',
  perPage: 20,
});

// Get supported locales
const locales = await publicClient.api.getLocales();

// Get countries
const countries = await publicClient.api.getCountries({
  translationLocale: 'en-US',
});

// Get image resources (stars, logos, etc.)
const images = await publicClient.api.getImageResources();
```

## Development

```bash
# Generate SDK from OpenAPI specs
pnpm generate

# Build
pnpm build

# Run tests
pnpm test

# Type check
pnpm check

# Watch mode
pnpm dev
```

## Architecture

The SDK is generated from OpenAPI specifications:

```
trustpilot-sdk/
├── api/
│   ├── public-api.yaml      # Public API specification
│   └── business-api.yaml    # Business API specification
├── src/
│   ├── auth/                # Authentication clients
│   │   ├── http-client.ts   # Base HTTP client interface
│   │   ├── api-key-client.ts    # API Key authentication
│   │   └── oauth2-client.ts     # OAuth2 authentication
│   ├── clients/             # High-level client wrappers
│   │   ├── public-client.ts     # Public API client
│   │   └── business-client.ts   # Business API client
│   ├── generator/           # Code generation utilities
│   │   ├── parser.ts        # OpenAPI parser
│   │   ├── type-generator.ts    # TypeScript type generator
│   │   ├── api-generator.ts     # API method generator
│   │   └── index.ts         # Generation orchestration
│   └── index.ts             # Main SDK exports
└── lib/                     # Generated code
    ├── public/              # Generated public API
    │   ├── types.ts
    │   ├── api.ts
    │   └── index.ts
    └── business/            # Generated business API
        ├── types.ts
        ├── api.ts
        └── index.ts
```

## Resources

- [Trustpilot API Documentation](https://developers.trustpilot.com/)
- [Trustpilot Authentication Guide](https://documentation-apidocumentation.trustpilot.com/authentication)
- [Trustpilot Business Units API](https://developers.trustpilot.com/business-units-api)
- [Trustpilot Invitations API](https://developers.trustpilot.com/invitation-api)

## Token Expiration

- **Access Tokens**: Expire after 100 hours
- **Refresh Tokens**: Expire after 30 days
- The SDK automatically refreshes access tokens using refresh tokens
- Set up the `onTokenRefresh` callback to save new tokens

## Rate Limiting

Trustpilot enforces rate limits on API requests. Refer to the [official documentation](https://documentation-apidocumentation.trustpilot.com/faq) for current rate limit information.

## License

MIT
