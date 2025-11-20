import type { AirtableOAuthClientConfig, TokenResponse } from "./config";
import { getBaseUrl } from "./config";
import { refreshAccessToken } from "./oauth2";

/**
 * HTTP Client for OAuth 2.0 authentication with automatic token refresh
 */
export class OAuthHttpClient {
  private accessToken: string;
  private refreshToken?: string;
  private clientId?: string;
  private clientSecret?: string;
  private onTokenRefresh?: (tokens: TokenResponse) => void;
  private baseUrl: string;

  constructor(config: AirtableOAuthClientConfig) {
    this.accessToken = config.accessToken;
    this.refreshToken = config.refreshToken;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.onTokenRefresh = config.onTokenRefresh;
    this.baseUrl = getBaseUrl(config);
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>
  ): Promise<T> {
    let url = `${this.baseUrl}${path}`;

    if (queryParams) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            for (const item of value) {
              params.append(key, String(item));
            }
          } else {
            params.append(key, String(value));
          }
        }
      }
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    let response = await fetch(url, options);

    // Handle token refresh on 401 Unauthorized
    if (response.status === 401 && this.refreshToken && this.clientId && this.clientSecret) {
      try {
        const newTokens = await refreshAccessToken({
          clientId: this.clientId,
          clientSecret: this.clientSecret,
          refreshToken: this.refreshToken,
        });

        this.accessToken = newTokens.access_token;
        if (newTokens.refresh_token) {
          this.refreshToken = newTokens.refresh_token;
        }

        if (this.onTokenRefresh) {
          this.onTokenRefresh(newTokens);
        }

        // Retry the request with new token
        headers.Authorization = `Bearer ${this.accessToken}`;
        response = await fetch(url, { ...options, headers });
      } catch (error) {
        throw new Error(`Token refresh failed: ${error}`);
      }
    }

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Airtable API error: ${response.status} ${response.statusText} - ${errorBody}`
      );
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json() as Promise<T>;
  }

  async get<T>(
    path: string,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>
  ): Promise<T> {
    return this.request<T>("GET", path, undefined, queryParams);
  }

  async post<T>(
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>
  ): Promise<T> {
    return this.request<T>("POST", path, body, queryParams);
  }

  async patch<T>(
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>
  ): Promise<T> {
    return this.request<T>("PATCH", path, body, queryParams);
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("PUT", path, body);
  }

  async delete<T>(
    path: string,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>
  ): Promise<T> {
    return this.request<T>("DELETE", path, undefined, queryParams);
  }

  /**
   * Get current access token
   */
  getAccessToken(): string {
    return this.accessToken;
  }

  /**
   * Update tokens manually
   */
  updateTokens(tokens: TokenResponse): void {
    this.accessToken = tokens.access_token;
    if (tokens.refresh_token) {
      this.refreshToken = tokens.refresh_token;
    }
  }
}

/**
 * Create an Airtable client using OAuth 2.0
 */
export function createOAuthClient(config: AirtableOAuthClientConfig): OAuthHttpClient {
  return new OAuthHttpClient(config);
}
