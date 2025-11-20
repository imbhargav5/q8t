/**
 * @q8t/asana-sdk
 *
 * A comprehensive TypeScript SDK for the Asana API with multiple authentication methods.
 *
 * ## Features
 *
 * - **Personal Access Token (PAT) Authentication** - Simple token-based auth for single-user apps
 * - **OAuth 2.0 Authentication** - Full OAuth flow for multi-user applications
 * - **Complete API Coverage** - All 153 Asana API endpoints
 * - **Type-Safe** - Generated from OpenAPI specification with full TypeScript support
 * - **Auto-generated** - SDK generated from official Asana OpenAPI spec
 *
 * @example
 * ```typescript
 * // Using Personal Access Token
 * import { AsanaSDK } from '@q8t/asana-sdk';
 *
 * const asana = AsanaSDK.createWithPAT({
 *   personalAccessToken: 'your-pat-token'
 * });
 *
 * const workspaces = await asana.getWorkspaces();
 * ```
 *
 * @example
 * ```typescript
 * // Using OAuth 2.0
 * import { AsanaSDK } from '@q8t/asana-sdk';
 *
 * const asana = AsanaSDK.createWithOAuth2({
 *   accessToken: 'your-access-token',
 *   refreshToken: 'your-refresh-token',
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 *   onTokenRefresh: (newAccessToken, newRefreshToken) => {
 *     // Save new tokens
 *   }
 * });
 *
 * const tasks = await asana.getTasks();
 * ```
 */

// Export all generated types and API
export { AsanaApi } from "../lib/api";
export * as AsanaTypes from "../lib/types";

// Export authentication utilities
export * from "./auth";

// Export unified SDK
import { AsanaApi } from "../lib/api";
import { ASANA_SCOPES, type AsanaOAuthConfig } from "./auth/config";
import {
  type AuthUrlResult,
  type ExchangeCodeParams,
  type RefreshTokenParams,
  type TokenResponse,
  exchangeCodeForToken,
  generateAuthUrl,
  refreshAccessToken,
} from "./auth/oauth2";
import { type AsanaOAuth2ClientConfig, createOAuth2Client } from "./auth/oauth2-client";
import { type AsanaPATConfig, createPATClient } from "./auth/pat-client";

/**
 * Main Asana SDK class with factory methods for different authentication types
 */
export class AsanaSDK extends AsanaApi {
  /**
   * Creates an Asana SDK client using Personal Access Token authentication
   *
   * @param config - Configuration with personal access token
   * @returns AsanaSDK instance with PAT authentication
   *
   * @example
   * ```typescript
   * const asana = AsanaSDK.createWithPAT({
   *   personalAccessToken: process.env.ASANA_PAT
   * });
   *
   * const workspaces = await asana.getWorkspaces();
   * console.log('Workspaces:', workspaces);
   * ```
   */
  static createWithPAT(config: AsanaPATConfig): AsanaSDK {
    const client = createPATClient(config);
    return new AsanaSDK(client);
  }

  /**
   * Creates an Asana SDK client using OAuth 2.0 authentication
   *
   * Supports automatic token refresh when refresh token and client credentials are provided
   *
   * @param config - OAuth2 configuration with access token and optional refresh token
   * @returns AsanaSDK instance with OAuth2 authentication
   *
   * @example
   * ```typescript
   * const asana = AsanaSDK.createWithOAuth2({
   *   accessToken: 'your-access-token',
   *   refreshToken: 'your-refresh-token',
   *   clientId: 'your-client-id',
   *   clientSecret: 'your-client-secret',
   *   onTokenRefresh: (newAccessToken, newRefreshToken) => {
   *     // Save new tokens to your database
   *     console.log('Token refreshed!');
   *   }
   * });
   *
   * const tasks = await asana.getTasks({ assignee: 'me' });
   * ```
   */
  static createWithOAuth2(config: AsanaOAuth2ClientConfig): AsanaSDK {
    const client = createOAuth2Client(config);
    return new AsanaSDK(client);
  }

  /**
   * OAuth helper methods
   */
  static OAuth = {
    /**
     * Available OAuth scopes for Asana API
     */
    SCOPES: ASANA_SCOPES,

    /**
     * Generates an OAuth authorization URL
     *
     * @param config - OAuth configuration
     * @returns Authorization URL and state parameter for CSRF protection
     *
     * @example
     * ```typescript
     * const { url, state } = AsanaSDK.OAuth.generateAuthUrl({
     *   clientId: 'your-client-id',
     *   clientSecret: 'your-client-secret',
     *   redirectUri: 'https://yourapp.com/callback',
     *   scopes: [AsanaSDK.OAuth.SCOPES.DEFAULT]
     * });
     *
     * // Store state for validation
     * // Redirect user to url
     * ```
     */
    generateAuthUrl: (config: AsanaOAuthConfig): AuthUrlResult => generateAuthUrl(config),

    /**
     * Exchanges an authorization code for tokens
     *
     * @param params - Parameters with authorization code
     * @returns Access token and optional refresh token
     *
     * @example
     * ```typescript
     * const tokens = await AsanaSDK.OAuth.exchangeCodeForToken({
     *   clientId: 'your-client-id',
     *   clientSecret: 'your-client-secret',
     *   code: 'authorization-code-from-callback',
     *   redirectUri: 'https://yourapp.com/callback'
     * });
     *
     * console.log('Access token:', tokens.access_token);
     * console.log('Refresh token:', tokens.refresh_token);
     * ```
     */
    exchangeCodeForToken: (params: ExchangeCodeParams): Promise<TokenResponse> =>
      exchangeCodeForToken(params),

    /**
     * Refreshes an access token
     *
     * @param params - Parameters with refresh token
     * @returns New access token
     *
     * @example
     * ```typescript
     * const newTokens = await AsanaSDK.OAuth.refreshAccessToken({
     *   clientId: 'your-client-id',
     *   clientSecret: 'your-client-secret',
     *   refreshToken: 'your-refresh-token'
     * });
     *
     * console.log('New access token:', newTokens.access_token);
     * ```
     */
    refreshAccessToken: (params: RefreshTokenParams): Promise<TokenResponse> =>
      refreshAccessToken(params),
  };
}
