/**
 * TikTok SDK - Unified SDK for all TikTok APIs
 *
 * This SDK provides three main client types for different TikTok API products:
 *
 * 1. UserOAuthClient - For user-authenticated operations (Display API, Content Posting API)
 * 2. ClientCredentialsClient - For app-authenticated operations (Research API, Commercial Content API)
 * 3. BusinessAPIClient - For advertising and marketing operations
 */

import { createUserOAuthClient, type UserOAuthClientConfig } from "./auth/user-oauth-client";
import { createClientCredentialsClient, type ClientCredentialsConfig } from "./auth/client-credentials-client";
import { createBusinessAPIClient, type BusinessAPIClientConfig } from "./auth/business-api-client";
import { UserOAuthApi } from "../lib/user-oauth";
import { ClientCredentialsApi } from "../lib/client-credentials";
import { BusinessApi } from "../lib/business";

// Re-export auth utilities for manual token management
export * from "./auth/oauth2";
export * from "./auth/config";

// Re-export types
export type { UserOAuthClientConfig, ClientCredentialsConfig, BusinessAPIClientConfig };
export * as UserOAuthTypes from "../lib/user-oauth/types";
export * as ClientCredentialsTypes from "../lib/client-credentials/types";
export * as BusinessTypes from "../lib/business/types";

/**
 * TikTok SDK - Main class providing access to all TikTok APIs
 */
export class TikTokSDK {
  /**
   * Create a User OAuth API client
   * Used for: Display API, Content Posting API, user profile information
   * Authentication: OAuth 2.0 Authorization Code Flow with PKCE
   *
   * @example
   * ```typescript
   * const userApi = TikTokSDK.createUserOAuthClient({
   *   clientId: "YOUR_CLIENT_KEY",
   *   clientSecret: "YOUR_CLIENT_SECRET",
   *   accessToken: "user_access_token",
   *   refreshToken: "refresh_token"
   * });
   *
   * const userInfo = await userApi.getUserInfo({
   *   fields: "open_id,display_name,avatar_url"
   * });
   * ```
   */
  static createUserOAuthClient(config: UserOAuthClientConfig): UserOAuthApi {
    const httpClient = createUserOAuthClient(config);
    return new UserOAuthApi(httpClient);
  }

  /**
   * Create a Client Credentials API client
   * Used for: Research API, Commercial Content API
   * Authentication: OAuth 2.0 Client Credentials Flow
   *
   * @example
   * ```typescript
   * const researchApi = TikTokSDK.createClientCredentialsClient({
   *   clientKey: "YOUR_CLIENT_KEY",
   *   clientSecret: "YOUR_CLIENT_SECRET"
   * });
   *
   * const videos = await researchApi.queryResearchVideos({
   *   query: {
   *     and: [{
   *       operation: "EQ",
   *       field_name: "region_code",
   *       field_values: ["US"]
   *     }]
   *   },
   *   fields: ["id", "create_time", "view_count"],
   *   max_count: 20
   * });
   * ```
   */
  static createClientCredentialsClient(config: ClientCredentialsConfig): ClientCredentialsApi {
    const httpClient = createClientCredentialsClient(config);
    return new ClientCredentialsApi(httpClient);
  }

  /**
   * Create a Business API client
   * Used for: Marketing API, campaign management, ad management, reporting
   * Authentication: App-level auth code exchange
   *
   * @example
   * ```typescript
   * const businessApi = TikTokSDK.createBusinessAPIClient({
   *   accessToken: "business_access_token"
   * });
   *
   * const campaigns = await businessApi.getCampaigns({
   *   advertiser_id: "YOUR_ADVERTISER_ID",
   *   page: 1,
   *   page_size: 10
   * });
   * ```
   */
  static createBusinessAPIClient(config: BusinessAPIClientConfig): BusinessApi {
    const httpClient = createBusinessAPIClient(config);
    return new BusinessApi(httpClient);
  }
}

// Export individual API classes for direct usage
export { UserOAuthApi, ClientCredentialsApi, BusinessApi };
