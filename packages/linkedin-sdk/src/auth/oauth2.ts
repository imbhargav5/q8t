import type { LinkedInOAuthConfig } from "./config";
import { LINKEDIN_AUTH_ENDPOINTS } from "./config";

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  scope?: string;
}

export class LinkedInOAuth2 {
  private config: LinkedInOAuthConfig;

  constructor(config: LinkedInOAuthConfig) {
    this.config = config;
  }

  getAuthorizationUrl(state?: string): string {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scopes.join(" "),
    });

    if (state) {
      params.set("state", state);
    }

    return `${LINKEDIN_AUTH_ENDPOINTS.authorize}?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<TokenResponse> {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: this.config.redirectUri,
    });

    const response = await fetch(LINKEDIN_AUTH_ENDPOINTS.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token exchange failed: ${response.status} ${errorText}`);
    }

    return response.json() as Promise<TokenResponse>;
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
    });

    const response = await fetch(LINKEDIN_AUTH_ENDPOINTS.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token refresh failed: ${response.status} ${errorText}`);
    }

    return response.json() as Promise<TokenResponse>;
  }
}
