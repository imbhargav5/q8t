import type { OAuthConfig, OAuthTokenResponse } from "./config";
import { NOTION_API_BASE_URL, getApiVersion } from "./config";

/**
 * OAuth 2.0 authentication manager for Notion Public Integrations
 */
export class OAuthManager {
  private config: OAuthConfig;
  private accessToken?: string;
  private refreshToken?: string;
  private apiVersion: string;

  constructor(config: OAuthConfig) {
    this.config = config;
    this.apiVersion = getApiVersion(config);
  }

  /**
   * Set the access token (after obtaining it via OAuth flow)
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * Set the refresh token
   */
  setRefreshToken(token: string): void {
    this.refreshToken = token;
  }

  /**
   * Get the authorization header value
   */
  getAuthorizationHeader(): string {
    if (!this.accessToken) {
      throw new Error("Access token not set. Complete OAuth flow first.");
    }
    return `Bearer ${this.accessToken}`;
  }

  /**
   * Get the Notion-Version header value
   */
  getVersionHeader(): string {
    return this.apiVersion;
  }

  /**
   * Get all required headers for Notion API requests
   */
  getHeaders(): Record<string, string> {
    return {
      Authorization: this.getAuthorizationHeader(),
      "Notion-Version": this.getVersionHeader(),
      "Content-Type": "application/json",
    };
  }

  /**
   * Generate the OAuth authorization URL
   */
  generateAuthorizationUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: "code",
      owner: "user",
    });

    if (state) {
      params.append("state", state);
    }

    return `${NOTION_API_BASE_URL}/oauth/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string): Promise<OAuthTokenResponse> {
    const credentials = Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString(
      "base64",
    );

    const response = await fetch(`${NOTION_API_BASE_URL}/oauth/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: this.config.redirectUri,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to exchange code for token: ${error}`);
    }

    const tokenResponse: OAuthTokenResponse = await response.json();
    this.setAccessToken(tokenResponse.access_token);
    if (tokenResponse.refresh_token) {
      this.setRefreshToken(tokenResponse.refresh_token);
    }

    return tokenResponse;
  }

  /**
   * Refresh the access token using refresh token
   */
  async refreshAccessToken(): Promise<OAuthTokenResponse> {
    if (!this.refreshToken) {
      throw new Error("No refresh token available");
    }

    const credentials = Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString(
      "base64",
    );

    const response = await fetch(`${NOTION_API_BASE_URL}/oauth/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: this.refreshToken,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to refresh token: ${error}`);
    }

    const tokenResponse: OAuthTokenResponse = await response.json();
    this.setAccessToken(tokenResponse.access_token);
    if (tokenResponse.refresh_token) {
      this.setRefreshToken(tokenResponse.refresh_token);
    }

    return tokenResponse;
  }

  /**
   * Revoke the current access token
   */
  async revokeToken(): Promise<void> {
    if (!this.accessToken) {
      throw new Error("No access token to revoke");
    }

    const response = await fetch(`${NOTION_API_BASE_URL}/oauth/token/revoke`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: this.accessToken,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to revoke token: ${error}`);
    }

    this.accessToken = undefined;
    this.refreshToken = undefined;
  }
}

/**
 * Helper function to generate authorization URL
 */
export function generateAuthUrl(
  config: OAuthConfig,
  state?: string,
): { url: string; state: string } {
  const manager = new OAuthManager(config);
  const generatedState = state || crypto.randomUUID();
  return {
    url: manager.generateAuthorizationUrl(generatedState),
    state: generatedState,
  };
}

/**
 * Helper function to exchange authorization code for token
 */
export async function exchangeCodeForToken(
  config: OAuthConfig,
  code: string,
): Promise<OAuthTokenResponse> {
  const manager = new OAuthManager(config);
  return manager.exchangeCodeForToken(code);
}
