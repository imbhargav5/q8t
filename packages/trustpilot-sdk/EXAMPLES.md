# Trustpilot SDK Examples

This document provides comprehensive examples of using the Trustpilot SDK for various use cases.

## Table of Contents

- [Public API Examples](#public-api-examples)
- [Business API Examples](#business-api-examples)
- [Authentication Flows](#authentication-flows)
- [Error Handling](#error-handling)

## Public API Examples

### Getting Business Information

```typescript
import { createPublicClient } from '@q8t/trustpilot-sdk';

const client = createPublicClient({
  apiKey: process.env.TRUSTPILOT_API_KEY!,
});

// Find a business by domain
const business = await client.api.findBusinessUnit({
  name: 'example.com',
});

console.log(`Business: ${business.displayName}`);
console.log(`Trust Score: ${business.trustScore}`);
console.log(`Total Reviews: ${business.numberOfReviews?.total}`);

// Get business details by ID
const details = await client.api.getBusinessUnit(business.id);
```

### Searching for Businesses

```typescript
// Search for businesses
const results = await client.api.searchBusinessUnits({
  query: 'furniture store',
  country: 'US',
  perPage: 10,
});

for (const biz of results.businessUnits || []) {
  console.log(`${biz.displayName} - ${biz.stars} stars`);
}
```

### Getting Reviews

```typescript
// Get reviews for a business
const reviews = await client.api.getBusinessUnitReviews('business-unit-id', {
  stars: '4,5', // Only 4 and 5 star reviews
  language: 'en',
  perPage: 20,
  page: 1,
  orderBy: 'createdat.desc',
});

for (const review of reviews.reviews || []) {
  console.log(`${review.stars} stars - ${review.title}`);
  console.log(`By: ${review.consumer?.displayName}`);
  console.log(`Text: ${review.text}`);

  if (review.companyReply) {
    console.log(`Company Reply: ${review.companyReply.text}`);
  }
}
```

### Working with Categories

```typescript
// Get all categories
const categories = await client.api.getCategories({
  country: 'US',
  locale: 'en-US',
});

// Get businesses in a category
const categoryBusinesses = await client.api.getCategoryBusinessUnits('electronics', {
  country: 'US',
  perPage: 50,
});
```

### Using Resource APIs

```typescript
// Get supported locales
const locales = await client.api.getLocales();

// Get countries
const countries = await client.api.getCountries({
  translationLocale: 'en-US',
});

// Get image resources
const images = await client.api.getImageResources();

// Get localized star rating text
const ratingText = await client.api.getStarRatingString(5, {
  locale: 'en-US',
});
console.log(`5 stars = ${ratingText.text}`); // "Excellent"
```

### Product Reviews

```typescript
// Get public product reviews
const productReviews = await client.api.getProductReviews('business-unit-id', {
  sku: 'PROD-001',
  perPage: 20,
});

for (const review of productReviews.productReviews || []) {
  console.log(`Product: ${review.productName}`);
  console.log(`Rating: ${review.stars} stars`);
  console.log(`Review: ${review.text}`);
}
```

## Business API Examples

### Authentication Setup

```typescript
import { createBusinessClient } from '@q8t/trustpilot-sdk';

const client = createBusinessClient({
  clientId: process.env.TRUSTPILOT_CLIENT_ID!,
  clientSecret: process.env.TRUSTPILOT_CLIENT_SECRET!,
  accessToken: process.env.TRUSTPILOT_ACCESS_TOKEN,
  refreshToken: process.env.TRUSTPILOT_REFRESH_TOKEN,
  onTokenRefresh: async (tokens) => {
    // Save new tokens to database or environment
    console.log('Token refreshed, expires in:', tokens.expires_in, 'seconds');
    await saveTokensToDatabase(tokens);
  },
});
```

### Managing Private Reviews

```typescript
// Get private reviews with customer emails
const privateReviews = await client.api.getPrivateBusinessUnitReviews('business-unit-id', {
  stars: '1,2,3', // Filter for low ratings
  state: 'published',
  perPage: 50,
  startDateTime: '2024-01-01T00:00:00Z',
  endDateTime: '2024-12-31T23:59:59Z',
});

for (const review of privateReviews.reviews || []) {
  console.log(`Customer: ${review.consumer?.displayName} (${review.consumer?.email})`);
  console.log(`Rating: ${review.stars} stars`);
  console.log(`Reference ID: ${review.referenceId}`);
  console.log(`Review: ${review.text}`);
  console.log(`Tags: ${review.tags?.join(', ')}`);
}
```

### Replying to Reviews

```typescript
// Reply to a review
await client.api.replyToReview('review-id', {
  message: 'Thank you for your feedback! We appreciate your business and are working to improve based on your suggestions.',
});

// Delete a reply
await client.api.deleteReviewReply('review-id');
```

### Tagging Reviews

```typescript
// Add tags to a review
await client.api.addReviewTags('review-id', {
  tags: ['shipping-issue', 'resolved'],
  group: 'generic',
});

// Set tags (replace all existing tags)
await client.api.setReviewTags('review-id', {
  tags: ['customer-service', 'positive'],
  group: 'generic',
});

// Remove specific tags
await client.api.removeReviewTags('review-id', {
  tags: ['shipping-issue'],
  group: 'generic',
});
```

### Sending Review Invitations

```typescript
// Send email invitation for service review
await client.api.sendEmailInvitation('business-unit-id', {
  recipientEmail: 'customer@example.com',
  recipientName: 'Jane Smith',
  referenceId: 'order-12345',
  locale: 'en-US',
  senderEmail: 'support@yourcompany.com',
  senderName: 'Your Company',
  replyTo: 'support@yourcompany.com',
  preferredSendTime: '2024-01-20T10:00:00Z',
  redirectUri: 'https://yourcompany.com/thank-you',
  tags: ['purchase', 'january-2024'],
  serviceReviewInvitation: {
    redirectUri: 'https://yourcompany.com/review-thanks',
  },
});

// Send invitation for both service and product reviews
await client.api.sendEmailInvitation('business-unit-id', {
  recipientEmail: 'customer@example.com',
  recipientName: 'John Doe',
  referenceId: 'order-67890',
  serviceReviewInvitation: {
    redirectUri: 'https://yourcompany.com/service-review-thanks',
  },
  productReviewInvitation: {
    redirectUri: 'https://yourcompany.com/product-review-thanks',
    products: [
      {
        productUrl: 'https://yourstore.com/products/item-001',
        imageUrl: 'https://yourstore.com/images/item-001.jpg',
        name: 'Amazing Widget',
        sku: 'WIDGET-001',
        brand: 'Your Brand',
        gtin: '0123456789012',
      },
    ],
  },
});
```

### Creating Invitation Links

```typescript
// Create invitation link
const invitation = await client.api.createInvitationLink('business-unit-id', {
  referenceId: 'order-54321',
  locale: 'en-US',
  redirectUri: 'https://yourcompany.com/review-complete',
  tags: ['manual-invite', 'high-value-customer'],
});

console.log('Share this link with your customer:');
console.log(invitation.url);

// Send the link via your own channels (SMS, chat, etc.)
await sendSMS(customerPhone, `Please review your recent purchase: ${invitation.url}`);
```

### Managing Products

```typescript
// Create a new product
await client.api.createPrivateProduct('business-unit-id', {
  sku: 'PROD-NEW-001',
  productUrl: 'https://yourstore.com/products/new-item',
  imageUrl: 'https://yourstore.com/images/new-item.jpg',
  name: 'New Amazing Product',
  brand: 'Your Brand',
  gtin: '9876543210123',
  mpn: 'MPN-12345',
});

// Update an existing product
await client.api.updatePrivateProduct('business-unit-id', 'product-id', {
  sku: 'PROD-NEW-001',
  name: 'Updated Product Name',
  productUrl: 'https://yourstore.com/products/updated-url',
  imageUrl: 'https://yourstore.com/images/updated-image.jpg',
  brand: 'Your Brand',
});

// Get all products
const products = await client.api.getPrivateProducts('business-unit-id', {
  perPage: 100,
  page: 1,
});

// Delete a product
await client.api.deletePrivateProduct('business-unit-id', 'product-id');
```

### Product Review Management

```typescript
// Get private product reviews
const productReviews = await client.api.getPrivateProductReviews('business-unit-id', {
  sku: ['PROD-001', 'PROD-002', 'PROD-003'],
  state: 'published',
  perPage: 100,
});

for (const review of productReviews.productReviews || []) {
  console.log(`Product SKU: ${review.sku}`);
  console.log(`Customer: ${review.consumer?.email}`);
  console.log(`Rating: ${review.stars} stars`);
  console.log(`Reference: ${review.referenceId}`);
}

// Get product review summaries
const summaries = await client.api.getProductReviewSummaries('business-unit-id', {
  sku: ['PROD-001', 'PROD-002'],
});

for (const summary of summaries.summaries || []) {
  console.log(`\nProduct: ${summary.sku}`);
  console.log(`Average Rating: ${summary.starsAverage} stars`);
  console.log(`Total Reviews: ${summary.numberOfReviews?.total}`);
  console.log(`5 stars: ${summary.numberOfReviews?.fiveStars}`);
  console.log(`4 stars: ${summary.numberOfReviews?.fourStars}`);
  console.log(`3 stars: ${summary.numberOfReviews?.threeStars}`);
  console.log(`2 stars: ${summary.numberOfReviews?.twoStars}`);
  console.log(`1 star: ${summary.numberOfReviews?.oneStar}`);
}

// Create product review invitation link
const productInvite = await client.api.createProductInvitationLink('business-unit-id', {
  referenceId: 'order-99999',
  locale: 'en-US',
  redirectUri: 'https://yourstore.com/review-thanks',
  products: [
    {
      sku: 'PROD-001',
      name: 'Product Name',
      productUrl: 'https://yourstore.com/products/prod-001',
      imageUrl: 'https://yourstore.com/images/prod-001.jpg',
    },
  ],
});

console.log('Product review link:', productInvite.url);
```

### Getting Invitation Templates

```typescript
// Get available invitation templates
const templates = await client.api.getInvitationTemplates('business-unit-id');

for (const template of templates.templates || []) {
  console.log(`Template: ${template.name} (${template.id})`);
  console.log(`Type: ${template.type}`);
}
```

## Authentication Flows

### Authorization Code Flow

```typescript
import { createBusinessClient } from '@q8t/trustpilot-sdk';

const client = createBusinessClient({
  clientId: process.env.TRUSTPILOT_CLIENT_ID!,
  clientSecret: process.env.TRUSTPILOT_CLIENT_SECRET!,
});

// Step 1: Generate authorization URL
const authUrl = client.generateAuthorizationUrl({
  redirectUri: 'https://yourapp.com/auth/callback',
  state: 'random-secure-state-string',
});

// Redirect user to authUrl...

// Step 2: Handle callback (in your callback route handler)
async function handleCallback(code: string, state: string, redirectUri: string) {
  // Verify state matches what you sent

  const tokens = await client.exchangeCodeForToken(code, redirectUri);

  // Save tokens securely
  await saveToDatabase({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    expiresAt: Date.now() + tokens.expires_in * 1000,
  });

  return tokens;
}
```

### Client Credentials Flow

```typescript
const client = createBusinessClient({
  clientId: process.env.TRUSTPILOT_CLIENT_ID!,
  clientSecret: process.env.TRUSTPILOT_CLIENT_SECRET!,
});

// Get access token using client credentials
const tokens = await client.getClientCredentialsToken();

// Now you can use the API
const reviews = await client.api.getPrivateBusinessUnitReviews('business-unit-id');
```

### Token Refresh

```typescript
const client = createBusinessClient({
  clientId: process.env.TRUSTPILOT_CLIENT_ID!,
  clientSecret: process.env.TRUSTPILOT_CLIENT_SECRET!,
  accessToken: existingAccessToken,
  refreshToken: existingRefreshToken,
  onTokenRefresh: async (tokens) => {
    // This is called automatically when token is refreshed
    await updateDatabase({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || existingRefreshToken,
      expiresAt: Date.now() + tokens.expires_in * 1000,
    });
  },
});

// Token is automatically refreshed when needed
// You can also manually refresh:
const newTokens = await client.refreshAccessToken();
```

### Token Revocation

```typescript
// Revoke token when user disconnects or logs out
await client.revokeToken();

// Clear tokens from database
await deleteTokensFromDatabase();
```

## Error Handling

### Handling API Errors

```typescript
import { createPublicClient } from '@q8t/trustpilot-sdk';

const client = createPublicClient({
  apiKey: process.env.TRUSTPILOT_API_KEY!,
});

try {
  const business = await client.api.getBusinessUnit('invalid-id');
} catch (error) {
  if (error instanceof Error) {
    console.error('API Error:', error.message);

    // Check for specific HTTP errors
    if (error.message.includes('404')) {
      console.error('Business unit not found');
    } else if (error.message.includes('401')) {
      console.error('Invalid API key');
    } else if (error.message.includes('429')) {
      console.error('Rate limit exceeded');
    }
  }
}
```

### Handling Authentication Errors

```typescript
const client = createBusinessClient({
  clientId: process.env.TRUSTPILOT_CLIENT_ID!,
  clientSecret: process.env.TRUSTPILOT_CLIENT_SECRET!,
  accessToken: existingAccessToken,
  refreshToken: existingRefreshToken,
});

try {
  const reviews = await client.api.getPrivateBusinessUnitReviews('business-unit-id');
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes('No access token') || error.message.includes('expired')) {
      // Token is invalid or expired
      console.error('Authentication failed. Please re-authenticate.');

      // Try to refresh
      try {
        await client.refreshAccessToken();
        // Retry the request
        const reviews = await client.api.getPrivateBusinessUnitReviews('business-unit-id');
      } catch (refreshError) {
        console.error('Token refresh failed. User needs to re-authenticate.');
        // Redirect user to re-authenticate
      }
    }
  }
}
```

### Retry Logic

```typescript
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      if (error instanceof Error && error.message.includes('429')) {
        // Rate limit - wait longer
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1) * 2));
      } else {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw new Error('Max retries exceeded');
}

// Usage
const reviews = await withRetry(() =>
  client.api.getBusinessUnitReviews('business-unit-id', { perPage: 100 })
);
```

## Best Practices

### 1. Token Management

Always implement the `onTokenRefresh` callback to save new tokens:

```typescript
const client = createBusinessClient({
  clientId: process.env.TRUSTPILOT_CLIENT_ID!,
  clientSecret: process.env.TRUSTPILOT_CLIENT_SECRET!,
  accessToken: await getTokenFromDatabase(),
  refreshToken: await getRefreshTokenFromDatabase(),
  onTokenRefresh: async (tokens) => {
    await saveTokensToDatabase({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || existingRefreshToken,
      expiresAt: Date.now() + tokens.expires_in * 1000,
    });
  },
});
```

### 2. Rate Limiting

Respect Trustpilot's rate limits by implementing backoff strategies:

```typescript
const reviews = [];
let page = 1;
const perPage = 100;
let hasMore = true;

while (hasMore) {
  const result = await client.api.getBusinessUnitReviews('business-unit-id', {
    page,
    perPage,
  });

  reviews.push(...(result.reviews || []));

  hasMore = result.reviews && result.reviews.length === perPage;
  page++;

  // Add delay between requests
  if (hasMore) {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
```

### 3. Pagination

Handle pagination properly for large datasets:

```typescript
async function getAllReviews(businessUnitId: string) {
  const allReviews = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await client.api.getPrivateBusinessUnitReviews(
      businessUnitId,
      { page, perPage: 100 }
    );

    if (response.reviews && response.reviews.length > 0) {
      allReviews.push(...response.reviews);
      page++;
    } else {
      hasMore = false;
    }
  }

  return allReviews;
}
```

### 4. Environment Variables

Always use environment variables for sensitive data:

```typescript
// .env file
TRUSTPILOT_API_KEY=your-api-key
TRUSTPILOT_CLIENT_ID=your-client-id
TRUSTPILOT_CLIENT_SECRET=your-client-secret
TRUSTPILOT_ACCESS_TOKEN=your-access-token
TRUSTPILOT_REFRESH_TOKEN=your-refresh-token

// Usage
import { createPublicClient, createBusinessClient } from '@q8t/trustpilot-sdk';

const publicClient = createPublicClient({
  apiKey: process.env.TRUSTPILOT_API_KEY!,
});

const businessClient = createBusinessClient({
  clientId: process.env.TRUSTPILOT_CLIENT_ID!,
  clientSecret: process.env.TRUSTPILOT_CLIENT_SECRET!,
  accessToken: process.env.TRUSTPILOT_ACCESS_TOKEN,
  refreshToken: process.env.TRUSTPILOT_REFRESH_TOKEN,
});
```
