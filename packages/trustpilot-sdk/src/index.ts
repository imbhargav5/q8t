// Main SDK exports

// Client factories
export { TrustpilotPublicClient } from "./clients/public-client";
export { TrustpilotBusinessClient } from "./clients/business-client";
import { createPublicClient } from "./clients/public-client";
import { createBusinessClient } from "./clients/business-client";

// Configuration types
export type { ApiKeyConfig } from "./auth/api-key-client";
export type { OAuth2Config, TokenResponse, AuthorizationUrlParams } from "./auth/oauth2-client";

// HTTP clients (for advanced use cases)
export { ApiKeyHttpClient } from "./auth/api-key-client";
export { OAuth2HttpClient } from "./auth/oauth2-client";
export type { HttpClient, HttpClientOptions } from "./auth/http-client";

// Generated API classes
export { TrustpilotPublicApi } from "../lib/public";
export { TrustpilotBusinessApi } from "../lib/business";

// Re-export all types from generated APIs
export * as PublicTypes from "../lib/public/types";
export * as BusinessTypes from "../lib/business/types";

/**
 * Main Trustpilot SDK namespace
 *
 * This SDK provides two types of clients:
 *
 * 1. **Public Client** (API Key authentication):
 *    - Access public business information and reviews
 *    - Search for businesses and categories
 *    - Get resource metadata (locales, countries, images)
 *    - Read public product reviews
 *
 * 2. **Business Client** (OAuth 2.0 authentication):
 *    - Manage private reviews with customer details
 *    - Reply to and tag reviews
 *    - Send review invitations via email or links
 *    - Manage private products and product reviews
 *    - Access detailed consumer profiles
 *
 * @example
 * ```typescript
 * import { createPublicClient, createBusinessClient } from '@q8t/trustpilot-sdk';
 *
 * // Create a public API client
 * const publicClient = createPublicClient({
 *   apiKey: 'your-api-key',
 * });
 *
 * // Get business unit information
 * const business = await publicClient.api.getBusinessUnit('business-unit-id');
 *
 * // Create a business API client with OAuth2
 * const businessClient = createBusinessClient({
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 *   accessToken: 'your-access-token',
 *   onTokenRefresh: (tokens) => {
 *     // Save new tokens
 *     console.log('New access token:', tokens.access_token);
 *   },
 * });
 *
 * // Send a review invitation
 * await businessClient.api.sendEmailInvitation('business-unit-id', {
 *   recipientEmail: 'customer@example.com',
 *   recipientName: 'John Doe',
 *   referenceId: 'order-12345',
 * });
 * ```
 */
export { createPublicClient, createBusinessClient };

export const TrustpilotSDK = {
  createPublicClient,
  createBusinessClient,
} as const;
