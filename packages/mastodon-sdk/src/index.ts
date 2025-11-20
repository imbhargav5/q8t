/**
 * @q8t/mastodon-sdk
 *
 * Comprehensive Mastodon API SDK with OAuth 2.0 PKCE support
 * Supports all Mastodon API endpoints including streaming
 */

// Re-export auth utilities
export * from "./auth";

// Re-export streaming client
export * from "./streaming";

// Re-export generated types and API (after generation)
// These will be available after running `pnpm generate`
export type { MastodonApi } from "../lib/api";
export type * as MastodonTypes from "../lib/types";

import { createMastodonClient, type MastodonClientConfig } from "./auth/client";
import type { HttpClient } from "./auth/client";
import { type MastodonScope, type AppRegistrationParams, type AppRegistrationResponse } from "./auth/config";
import {
  registerApplication,
  generateAuthUrl,
  exchangeCodeForToken,
  getClientCredentialsToken,
  revokeToken,
  verifyToken,
  type AuthUrlResult,
  type TokenResponse,
  type ExchangeCodeParams,
  type RevokeTokenParams,
} from "./auth/oauth2";
import { MastodonStreamingClient, type MastodonStreamingConfig } from "./streaming";

/**
 * Main SDK class for Mastodon API
 * Provides factory methods for creating different types of clients
 */
export class MastodonSDK {
  /**
   * Register a new application with a Mastodon instance
   * This must be done before initiating OAuth flow
   *
   * @example
   * ```typescript
   * const app = await MastodonSDK.registerApp("mastodon.social", {
   *   clientName: "My Cool App",
   *   redirectUris: "https://myapp.com/callback",
   *   scopes: ["read", "write"],
   *   website: "https://myapp.com"
   * });
   *
   * console.log("Client ID:", app.client_id);
   * console.log("Client Secret:", app.client_secret);
   * ```
   */
  static async registerApp(
    instanceUrl: string,
    params: AppRegistrationParams,
  ): Promise<AppRegistrationResponse> {
    return registerApplication(instanceUrl, params);
  }

  /**
   * Generate OAuth authorization URL with PKCE
   * Returns URL to redirect user to, along with state and PKCE parameters
   * Store codeVerifier securely - you'll need it to exchange the code for a token
   *
   * @example
   * ```typescript
   * const authResult = await MastodonSDK.generateAuthUrl({
   *   instanceUrl: "mastodon.social",
   *   clientId: "your_client_id",
   *   clientSecret: "your_client_secret",
   *   redirectUri: "https://myapp.com/callback",
   *   scopes: ["read", "write"]
   * });
   *
   * // Store authResult.codeVerifier and authResult.state securely
   * // Redirect user to authResult.url
   * ```
   */
  static async generateAuthUrl(config: {
    instanceUrl: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scopes: MastodonScope[];
  }): Promise<AuthUrlResult> {
    return generateAuthUrl(config);
  }

  /**
   * Exchange authorization code for access token
   * Use the codeVerifier that was generated with the auth URL
   *
   * @example
   * ```typescript
   * const tokens = await MastodonSDK.exchangeCode({
   *   instanceUrl: "mastodon.social",
   *   clientId: "your_client_id",
   *   clientSecret: "your_client_secret",
   *   code: "authorization_code_from_callback",
   *   redirectUri: "https://myapp.com/callback",
   *   codeVerifier: "stored_code_verifier"
   * });
   *
   * console.log("Access Token:", tokens.access_token);
   * ```
   */
  static async exchangeCode(params: ExchangeCodeParams): Promise<TokenResponse> {
    return exchangeCodeForToken(params);
  }

  /**
   * Obtain token using client credentials flow
   * This is limited to read scope only and is for applications that don't act on behalf of users
   *
   * @example
   * ```typescript
   * const tokens = await MastodonSDK.getAppToken(
   *   "mastodon.social",
   *   "your_client_id",
   *   "your_client_secret"
   * );
   * ```
   */
  static async getAppToken(
    instanceUrl: string,
    clientId: string,
    clientSecret: string,
  ): Promise<TokenResponse> {
    return getClientCredentialsToken(instanceUrl, clientId, clientSecret);
  }

  /**
   * Revoke an access token
   *
   * @example
   * ```typescript
   * await MastodonSDK.revokeToken({
   *   instanceUrl: "mastodon.social",
   *   clientId: "your_client_id",
   *   clientSecret: "your_client_secret",
   *   token: "access_token_to_revoke"
   * });
   * ```
   */
  static async revokeToken(params: RevokeTokenParams): Promise<void> {
    return revokeToken(params);
  }

  /**
   * Verify an access token
   *
   * @example
   * ```typescript
   * const appInfo = await MastodonSDK.verifyToken(
   *   "mastodon.social",
   *   "access_token"
   * );
   * ```
   */
  static async verifyToken(
    instanceUrl: string,
    accessToken: string,
  ): Promise<AppRegistrationResponse> {
    return verifyToken(instanceUrl, accessToken);
  }

  /**
   * Create a user-authenticated API client
   * Uses an access token obtained via OAuth authorization code flow
   *
   * @example
   * ```typescript
   * const client = MastodonSDK.createUserClient({
   *   instanceUrl: "mastodon.social",
   *   accessToken: "user_access_token"
   * });
   *
   * // Use the client
   * const account = await client.verifyCredentials();
   * const timeline = await client.getHomeTimeline();
   * ```
   */
  static async createUserClient(config: MastodonClientConfig): Promise<any> {
    const httpClient = createMastodonClient(config);

    // Dynamically import the generated API class
    const { MastodonApi } = await import("../lib/api");

    return new MastodonApi(httpClient);
  }

  /**
   * Create an application API client
   * Uses client credentials flow (read-only access)
   *
   * @example
   * ```typescript
   * const client = await MastodonSDK.createAppClient(
   *   "mastodon.social",
   *   "your_client_id",
   *   "your_client_secret"
   * );
   *
   * // Use the client (read-only)
   * const publicTimeline = await client.getPublicTimeline();
   * ```
   */
  static async createAppClient(
    instanceUrl: string,
    clientId: string,
    clientSecret: string,
  ): Promise<any> {
    const tokens = await getClientCredentialsToken(instanceUrl, clientId, clientSecret);

    return MastodonSDK.createUserClient({
      instanceUrl,
      accessToken: tokens.access_token,
    });
  }

  /**
   * Create a streaming client for real-time updates
   *
   * @example
   * ```typescript
   * const streamingClient = MastodonSDK.createStreamingClient({
   *   instanceUrl: "mastodon.social",
   *   accessToken: "your_access_token"
   * });
   *
   * // Subscribe to user timeline and notifications
   * const subscription = streamingClient.subscribeToUserStream({
   *   onUpdate: (status) => {
   *     console.log("New status:", status);
   *   },
   *   onNotification: (notification) => {
   *     console.log("New notification:", notification);
   *   },
   *   onError: (error) => {
   *     console.error("Stream error:", error);
   *   }
   * });
   *
   * // Later: unsubscribe
   * subscription.unsubscribe();
   * ```
   */
  static createStreamingClient(config: MastodonStreamingConfig): MastodonStreamingClient {
    return new MastodonStreamingClient(config);
  }

  /**
   * Create an HTTP client directly (advanced usage)
   * Most users should use createUserClient() or createAppClient() instead
   */
  static createHttpClient(config: MastodonClientConfig): HttpClient {
    return createMastodonClient(config);
  }
}

// Default export
export default MastodonSDK;
