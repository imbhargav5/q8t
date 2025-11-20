/**
 * TikTok OAuth 2.0 permission scopes
 *
 * @public
 */
export type TikTokScope =
  | "user.info.basic" // Basic user profile information
  | "user.info.profile" // Detailed user profile
  | "user.info.stats" // User statistics
  | "video.list" // List user's videos
  | "video.upload"; // Upload videos to TikTok

/**
 * Configuration for TikTok OAuth 2.0 flow
 *
 * @public
 */
export interface TikTokAuthConfig {
  /**
   * TikTok application client ID (also called client_key)
   */
  clientId: string;

  /**
   * TikTok application client secret (optional for PKCE flow)
   */
  clientSecret?: string;

  /**
   * OAuth redirect URI (must match the one registered in your app)
   */
  redirectUri: string;

  /**
   * List of permission scopes to request
   */
  scopes: TikTokScope[];
}

/**
 * TikTok OAuth 2.0 authentication endpoints
 *
 * @public
 */
export const TIKTOK_AUTH_ENDPOINTS = {
  /**
   * Authorization endpoint for user consent
   */
  authorize: "https://www.tiktok.com/v2/auth/authorize/",

  /**
   * Token endpoint for exchanging codes and refreshing tokens
   */
  token: "https://open.tiktokapis.com/v2/oauth/token/",
} as const;

/**
 * Base URL for TikTok API v2 endpoints
 *
 * @public
 */
export const TIKTOK_API_BASE_URL = "https://open.tiktokapis.com/v2";
