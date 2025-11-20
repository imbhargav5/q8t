import {
  OAuth2HttpClient,
  OAuth2Config,
  TokenResponse,
  AuthorizationUrlParams,
} from "../auth/oauth2-client";
import { TrustpilotBusinessApi } from "../../lib/business";

/**
 * Client for Trustpilot Business API using OAuth 2.0 authentication
 *
 * This client provides access to private business operations including:
 * - Private business unit reviews with consumer emails
 * - Review management (replies, tags)
 * - Review invitations (email and links)
 * - Private product reviews and management
 * - Consumer profile information
 */
export class TrustpilotBusinessClient {
  public readonly api: TrustpilotBusinessApi;
  private httpClient: OAuth2HttpClient;

  constructor(config: OAuth2Config) {
    this.httpClient = new OAuth2HttpClient(config);
    this.api = new TrustpilotBusinessApi(this.httpClient);
  }

  /**
   * Generate authorization URL for OAuth2 authorization code flow
   */
  generateAuthorizationUrl(params: AuthorizationUrlParams): string {
    return this.httpClient.generateAuthorizationUrl(params);
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string, redirectUri: string): Promise<TokenResponse> {
    return this.httpClient.exchangeCodeForToken(code, redirectUri);
  }

  /**
   * Get access token using client credentials flow
   */
  async getClientCredentialsToken(): Promise<TokenResponse> {
    return this.httpClient.getClientCredentialsToken();
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(): Promise<TokenResponse> {
    return this.httpClient.refreshAccessToken();
  }

  /**
   * Revoke refresh token
   */
  async revokeToken(): Promise<void> {
    return this.httpClient.revokeToken();
  }

  /**
   * Get the underlying HTTP client for advanced use cases
   */
  getHttpClient(): OAuth2HttpClient {
    return this.httpClient;
  }
}

/**
 * Create a Trustpilot Business API client with OAuth 2.0 authentication
 */
export function createBusinessClient(config: OAuth2Config): TrustpilotBusinessClient {
  return new TrustpilotBusinessClient(config);
}
