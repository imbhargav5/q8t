import { HttpClient, HttpClientOptions, handleResponse, buildUrl } from "./http-client";

export interface OAuth2Config {
  clientId: string;
  clientSecret: string;
  accessToken?: string;
  refreshToken?: string;
  baseUrl?: string;
  onTokenRefresh?: (tokens: TokenResponse) => void | Promise<void>;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

export interface AuthorizationUrlParams {
  redirectUri: string;
  state?: string;
}

export class OAuth2HttpClient implements HttpClient {
  private clientId: string;
  private clientSecret: string;
  private accessToken?: string;
  private refreshToken?: string;
  private defaultBaseUrl: string;
  private tokenExpiresAt?: number;
  private onTokenRefresh?: (tokens: TokenResponse) => void | Promise<void>;

  constructor(config: OAuth2Config) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.accessToken = config.accessToken;
    this.refreshToken = config.refreshToken;
    this.defaultBaseUrl = config.baseUrl || "https://api.trustpilot.com/v1";
    this.onTokenRefresh = config.onTokenRefresh;
  }

  /**
   * Generate authorization URL for OAuth2 authorization code flow
   */
  generateAuthorizationUrl(params: AuthorizationUrlParams): string {
    const url = new URL("https://authenticate.trustpilot.com");
    url.searchParams.append("client_id", this.clientId);
    url.searchParams.append("redirect_uri", params.redirectUri);
    url.searchParams.append("response_type", "code");

    if (params.state) {
      url.searchParams.append("state", params.state);
    }

    return url.toString();
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string, redirectUri: string): Promise<TokenResponse> {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    const response = await fetch(
      "https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/accesstoken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      },
    );

    const tokens = await handleResponse<TokenResponse>(response);
    this.setTokens(tokens);
    return tokens;
  }

  /**
   * Get access token using client credentials flow
   */
  async getClientCredentialsToken(): Promise<TokenResponse> {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    const response = await fetch(
      "https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/accesstoken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      },
    );

    const tokens = await handleResponse<TokenResponse>(response);
    this.setTokens(tokens);
    return tokens;
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(): Promise<TokenResponse> {
    if (!this.refreshToken) {
      throw new Error("No refresh token available");
    }

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: this.refreshToken,
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    const response = await fetch(
      "https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      },
    );

    const tokens = await handleResponse<TokenResponse>(response);
    this.setTokens(tokens);
    return tokens;
  }

  /**
   * Revoke refresh token
   */
  async revokeToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error("No refresh token available");
    }

    const body = new URLSearchParams({
      token: this.refreshToken,
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    const response = await fetch(
      "https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/revoke",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      },
    );

    await handleResponse<void>(response);
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.tokenExpiresAt = undefined;
  }

  private setTokens(tokens: TokenResponse) {
    this.accessToken = tokens.access_token;
    if (tokens.refresh_token) {
      this.refreshToken = tokens.refresh_token;
    }
    // Set expiration time (with 5 minute buffer)
    this.tokenExpiresAt = Date.now() + (tokens.expires_in - 300) * 1000;

    // Call the refresh callback if provided
    if (this.onTokenRefresh) {
      void this.onTokenRefresh(tokens);
    }
  }

  private async ensureValidToken(): Promise<void> {
    if (!this.accessToken) {
      throw new Error("No access token available. Please authenticate first.");
    }

    // Check if token is expired or about to expire
    if (this.tokenExpiresAt && Date.now() >= this.tokenExpiresAt) {
      if (this.refreshToken) {
        await this.refreshAccessToken();
      } else {
        throw new Error("Access token expired and no refresh token available");
      }
    }
  }

  private async getHeaders(): Promise<Record<string, string>> {
    await this.ensureValidToken();

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  async get<T>(
    path: string,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T> {
    const baseUrl = options?.baseUrl || this.defaultBaseUrl;
    const url = buildUrl(baseUrl, path, queryParams);
    const headers = await this.getHeaders();

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    return handleResponse<T>(response);
  }

  async post<T>(
    path: string,
    body?: any,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T> {
    const baseUrl = options?.baseUrl || this.defaultBaseUrl;
    const url = buildUrl(baseUrl, path, queryParams);
    const headers = await this.getHeaders();

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    return handleResponse<T>(response);
  }

  async put<T>(
    path: string,
    body?: any,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T> {
    const baseUrl = options?.baseUrl || this.defaultBaseUrl;
    const url = buildUrl(baseUrl, path, queryParams);
    const headers = await this.getHeaders();

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    return handleResponse<T>(response);
  }

  async patch<T>(
    path: string,
    body?: any,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T> {
    const baseUrl = options?.baseUrl || this.defaultBaseUrl;
    const url = buildUrl(baseUrl, path, queryParams);
    const headers = await this.getHeaders();

    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    return handleResponse<T>(response);
  }

  async delete<T>(
    path: string,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T> {
    const baseUrl = options?.baseUrl || this.defaultBaseUrl;
    const url = buildUrl(baseUrl, path, queryParams);
    const headers = await this.getHeaders();

    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    return handleResponse<T>(response);
  }
}
