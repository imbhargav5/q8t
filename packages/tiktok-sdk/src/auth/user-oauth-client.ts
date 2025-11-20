import { TIKTOK_API_BASE_URL } from "./config";
import { refreshAccessToken } from "./oauth2";

/**
 * Configuration for creating a User OAuth API client
 *
 * @public
 */
export interface UserOAuthClientConfig {
  /**
   * TikTok application client ID (also called client_key)
   */
  clientId: string;

  /**
   * TikTok application client secret (optional for PKCE flow)
   */
  clientSecret?: string;

  /**
   * User's OAuth access token
   */
  accessToken: string;

  /**
   * User's OAuth refresh token (optional, enables automatic token refresh)
   */
  refreshToken?: string;

  /**
   * Callback invoked when tokens are refreshed
   * Use this to persist new tokens to your database
   *
   * @param newTokens - The refreshed access and refresh tokens
   */
  onTokenRefresh?: (newTokens: { accessToken: string; refreshToken?: string }) => void;
}

/**
 * HTTP client interface for making authenticated API requests
 *
 * @public
 */
export interface HttpClient {
  /**
   * Make a GET request
   *
   * @param path - API endpoint path
   * @param params - Query parameters
   * @returns Promise resolving to the response data
   */
  get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T>;

  /**
   * Make a POST request
   *
   * @param path - API endpoint path
   * @param body - Request body
   * @returns Promise resolving to the response data
   */
  post<T>(path: string, body?: unknown): Promise<T>;

  /**
   * Make a PUT request
   *
   * @param path - API endpoint path
   * @param body - Request body
   * @returns Promise resolving to the response data
   */
  put<T>(path: string, body?: unknown): Promise<T>;

  /**
   * Make a DELETE request
   *
   * @param path - API endpoint path
   * @returns Promise resolving to the response data
   */
  delete<T>(path: string): Promise<T>;
}

/**
 * Creates an HTTP client for TikTok User OAuth API
 *
 * This client is used for user-authenticated operations including:
 * - Display API (get user info, list videos, query videos)
 * - Content Posting API (upload and publish videos)
 * - User profile and statistics
 *
 * **Authentication Method:** OAuth 2.0 Authorization Code Flow with PKCE
 *
 * **Features:**
 * - Automatic token refresh when access token expires
 * - Bearer token authentication
 * - Callback for persisting refreshed tokens
 *
 * @param config - Configuration for the User OAuth client
 * @returns HTTP client instance with methods for making API requests
 *
 * @example
 * ```typescript
 * const client = createUserOAuthClient({
 *   clientId: "YOUR_CLIENT_KEY",
 *   clientSecret: "YOUR_CLIENT_SECRET",
 *   accessToken: "user_access_token",
 *   refreshToken: "refresh_token",
 *   onTokenRefresh: (newTokens) => {
 *     // Save tokens to database
 *     saveTokens(newTokens);
 *   }
 * });
 *
 * // Use the client
 * const response = await client.get("/user/info/", { fields: "open_id,display_name" });
 * ```
 *
 * @public
 */
export function createUserOAuthClient(config: UserOAuthClientConfig): HttpClient {
  let accessToken = config.accessToken;

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    let url = `${TIKTOK_API_BASE_URL}${path}`;

    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      }
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    if (body && (method === "POST" || method === "PUT")) {
      requestOptions.body = JSON.stringify(body);
    }

    let response = await fetch(url, requestOptions);

    // Handle token refresh on 401
    if (response.status === 401 && config.refreshToken) {
      try {
        const newTokens = await refreshAccessToken({
          clientId: config.clientId,
          clientSecret: config.clientSecret,
          refreshToken: config.refreshToken,
        });

        accessToken = newTokens.access_token;

        if (config.onTokenRefresh) {
          config.onTokenRefresh({
            accessToken: newTokens.access_token,
            refreshToken: newTokens.refresh_token,
          });
        }

        // Retry the request with new token
        headers.Authorization = `Bearer ${accessToken}`;
        response = await fetch(url, requestOptions);
      } catch {
        throw new Error("Token refresh failed");
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`TikTok User OAuth API error (${response.status}): ${errorText}`);
    }

    return response.json() as Promise<T>;
  }

  return {
    get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
      return makeRequest<T>("GET", path, undefined, params);
    },

    post<T>(path: string, body?: unknown): Promise<T> {
      return makeRequest<T>("POST", path, body);
    },

    put<T>(path: string, body?: unknown): Promise<T> {
      return makeRequest<T>("PUT", path, body);
    },

    delete<T>(path: string): Promise<T> {
      return makeRequest<T>("DELETE", path);
    },
  };
}
