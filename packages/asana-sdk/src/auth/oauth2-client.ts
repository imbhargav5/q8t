// OAuth 2.0 authenticated HTTP client for Asana API

import { ASANA_API_BASE_URL } from "./config";
import { refreshAccessToken } from "./oauth2";

export interface AsanaOAuth2ClientConfig {
  accessToken: string;
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
  onTokenRefresh?: (accessToken: string, refreshToken?: string) => void;
}

export interface HttpClient {
  get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T>;
  post<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
  put<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
  delete<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
}

/**
 * Creates an HTTP client for Asana API using OAuth 2.0 authentication
 *
 * Supports automatic token refresh when a refresh token is provided
 *
 * @param config - OAuth2 client configuration
 * @returns HTTP client with methods for API requests
 *
 * @example
 * ```typescript
 * const client = createOAuth2Client({
 *   accessToken: 'your-access-token',
 *   refreshToken: 'your-refresh-token',
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 *   onTokenRefresh: (newAccessToken, newRefreshToken) => {
 *     // Save new tokens
 *     console.log('Token refreshed!');
 *   }
 * });
 *
 * const tasks = await client.get('/tasks');
 * ```
 */
export function createOAuth2Client(config: AsanaOAuth2ClientConfig): HttpClient {
  let accessToken = config.accessToken;
  let refreshToken = config.refreshToken;

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    let url = `${ASANA_API_BASE_URL}${path}`;

    // Add query parameters
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
      Accept: "application/json",
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
    if (response.status === 401 && refreshToken && config.clientId && config.clientSecret) {
      try {
        const newTokens = await refreshAccessToken({
          clientId: config.clientId,
          clientSecret: config.clientSecret,
          refreshToken,
        });

        accessToken = newTokens.access_token;
        if (newTokens.refresh_token) {
          refreshToken = newTokens.refresh_token;
        }

        if (config.onTokenRefresh) {
          config.onTokenRefresh(accessToken, refreshToken);
        }

        // Retry the request with new token
        headers.Authorization = `Bearer ${accessToken}`;
        response = await fetch(url, { ...requestOptions, headers });
      } catch (error) {
        throw new Error(`Token refresh failed: ${error}`);
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Asana API error (${response.status}): ${errorText}`);
    }

    return response.json() as Promise<T>;
  }

  return {
    get<T>(
      path: string,
      params?: Record<string, string | number | boolean | undefined>,
    ): Promise<T> {
      return makeRequest<T>("GET", path, undefined, params);
    },

    post<T>(
      path: string,
      body?: unknown,
      params?: Record<string, string | number | boolean | undefined>,
    ): Promise<T> {
      return makeRequest<T>("POST", path, body, params);
    },

    put<T>(
      path: string,
      body?: unknown,
      params?: Record<string, string | number | boolean | undefined>,
    ): Promise<T> {
      return makeRequest<T>("PUT", path, body, params);
    },

    delete<T>(
      path: string,
      params?: Record<string, string | number | boolean | undefined>,
    ): Promise<T> {
      return makeRequest<T>("DELETE", path, undefined, params);
    },
  };
}
