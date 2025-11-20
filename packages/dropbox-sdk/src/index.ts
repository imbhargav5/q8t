// Main entry point for @q8t/dropbox-sdk

// Re-export authentication utilities
export * from "./auth";

// Re-export client creators
export * from "./clients";

// Re-export generated API types and classes
export * as CoreTypes from "../lib/core/types";
export * as TeamTypes from "../lib/team/types";
export { DropboxCoreApi } from "../lib/core/api";
export { DropboxTeamApi } from "../lib/team/api";

import { DropboxCoreApi } from "../lib/core/api";
import { DropboxTeamApi } from "../lib/team/api";
import {
  type DropboxAuthConfig,
  type OAuth2Tokens,
  exchangeCodeForToken,
  generateAuthUrl,
} from "./auth";
// Main SDK factory
import { type CoreClientConfig, createCoreClient } from "./clients/core-client";
import { type TeamClientConfig, createTeamClient } from "./clients/team-client";

/**
 * Main Dropbox SDK namespace with factory methods for different client types
 */
export const DropboxSDK = {
  /**
   * Create a Core API client for user operations (files, sharing, etc.)
   * @param config Configuration with OAuth2 access token
   * @returns Core API client instance
   *
   * @example
   * ```typescript
   * const coreClient = DropboxSDK.createCoreClient({
   *   accessToken: 'your-access-token',
   *   refreshToken: 'your-refresh-token',
   *   clientId: 'your-client-id',
   *   clientSecret: 'your-client-secret',
   *   onTokenRefresh: (tokens) => {
   *     // Save new tokens
   *     console.log('New tokens:', tokens);
   *   }
   * });
   *
   * const account = await coreClient.getCurrentAccount();
   * const files = await coreClient.listFolder({ path: '' });
   * ```
   */
  createCoreClient(config: CoreClientConfig): DropboxCoreApi {
    const httpClient = createCoreClient(config);
    return new DropboxCoreApi(httpClient);
  },

  /**
   * Create a Team API client for team administration operations
   * @param config Configuration with OAuth2 access token (requires team admin permissions)
   * @returns Team API client instance
   *
   * @example
   * ```typescript
   * const teamClient = DropboxSDK.createTeamClient({
   *   accessToken: 'your-team-access-token',
   *   refreshToken: 'your-refresh-token',
   *   clientId: 'your-client-id',
   *   clientSecret: 'your-client-secret'
   * });
   *
   * const members = await teamClient.listMembersV2();
   * const groups = await teamClient.listGroups();
   * ```
   */
  createTeamClient(config: TeamClientConfig): DropboxTeamApi {
    const httpClient = createTeamClient(config);
    return new DropboxTeamApi(httpClient);
  },

  /**
   * Generate OAuth 2.0 authorization URL
   * @param config OAuth configuration with client ID, redirect URI, and scopes
   * @returns Authorization URL and state parameter
   *
   * @example
   * ```typescript
   * const { url, state } = DropboxSDK.generateAuthUrl({
   *   clientId: 'your-client-id',
   *   redirectUri: 'https://your-app.com/callback',
   *   scopes: ['files.content.read', 'files.content.write']
   * });
   *
   * // Redirect user to `url`
   * // Store `state` to verify callback
   * ```
   */
  generateAuthUrl(config: DropboxAuthConfig): { url: string; state: string } {
    return generateAuthUrl(config);
  },

  /**
   * Exchange authorization code for access token
   * @param params Parameters including authorization code from OAuth callback
   * @returns OAuth2 tokens (access token, refresh token, etc.)
   *
   * @example
   * ```typescript
   * const tokens = await DropboxSDK.exchangeCodeForToken({
   *   clientId: 'your-client-id',
   *   clientSecret: 'your-client-secret',
   *   code: 'authorization-code-from-callback',
   *   redirectUri: 'https://your-app.com/callback'
   * });
   *
   * const { access_token, refresh_token } = tokens;
   * ```
   */
  async exchangeCodeForToken(params: {
    clientId: string;
    clientSecret: string;
    code: string;
    redirectUri: string;
  }): Promise<OAuth2Tokens> {
    return exchangeCodeForToken(params);
  },
} as const;

// Default export
export default DropboxSDK;
