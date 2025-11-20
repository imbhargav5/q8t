import { TIKTOK_API_BASE_URL, TIKTOK_AUTH_ENDPOINTS } from "./config";

/**
 * Configuration for Client Credentials authentication
 *
 * @public
 */
export interface ClientCredentialsConfig {
  /**
   * TikTok application client key
   */
  clientKey: string;

  /**
   * TikTok application client secret
   */
  clientSecret: string;
}

/**
 * Response from client credentials token endpoint
 *
 * @public
 */
export interface ClientCredentialsTokenResponse {
  /**
   * Access token for making API requests
   */
  access_token: string;

  /**
   * Token expiration time in seconds (typically 7200 = 2 hours)
   */
  expires_in: number;

  /**
   * Type of token (always "Bearer")
   */
  token_type: string;
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
 * Obtains an access token using the OAuth 2.0 Client Credentials flow
 *
 * This is a server-to-server authentication method that doesn't require user interaction.
 * The token is used for accessing Research API and Commercial Content API.
 *
 * @param config - Client credentials configuration
 * @returns Promise resolving to the token response
 * @throws Error if token request fails
 *
 * @example
 * ```typescript
 * const tokenResponse = await getClientCredentialsToken({
 *   clientKey: "YOUR_CLIENT_KEY",
 *   clientSecret: "YOUR_CLIENT_SECRET"
 * });
 *
 * console.log(tokenResponse.access_token); // Use this token for API requests
 * ```
 *
 * @public
 */
export async function getClientCredentialsToken(
  config: ClientCredentialsConfig
): Promise<ClientCredentialsTokenResponse> {
  const body = new URLSearchParams({
    client_key: config.clientKey,
    client_secret: config.clientSecret,
    grant_type: "client_credentials",
  });

  const response = await fetch(TIKTOK_AUTH_ENDPOINTS.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Client credentials token request failed: ${error}`);
  }

  return response.json() as Promise<ClientCredentialsTokenResponse>;
}

/**
 * Creates an HTTP client for TikTok Client Credentials API
 *
 * This client is used for app-authenticated operations including:
 * - Research API (query videos, user info, comments)
 * - Commercial Content API (search ads, get ad details)
 *
 * **Authentication Method:** OAuth 2.0 Client Credentials Flow
 *
 * **Features:**
 * - Automatic token acquisition on first request
 * - Token caching and automatic refresh before expiration
 * - No manual token management required
 * - Tokens are managed internally with 1-minute buffer before expiry
 *
 * @param config - Client credentials configuration
 * @returns HTTP client instance with methods for making API requests
 *
 * @example
 * ```typescript
 * const client = createClientCredentialsClient({
 *   clientKey: "YOUR_CLIENT_KEY",
 *   clientSecret: "YOUR_CLIENT_SECRET"
 * });
 *
 * // The client automatically handles token acquisition
 * const response = await client.post("/research/video/query/", {
 *   query: { and: [{ operation: "EQ", field_name: "region_code", field_values: ["US"] }] },
 *   fields: ["id", "create_time", "view_count"],
 *   max_count: 20
 * });
 * ```
 *
 * @public
 */
export function createClientCredentialsClient(config: ClientCredentialsConfig): HttpClient {
  let accessToken: string | null = null;
  let tokenExpiry: number = 0;

  async function ensureValidToken(): Promise<string> {
    const now = Date.now();

    // Refresh token if it's expired or will expire in the next minute
    if (!accessToken || now >= tokenExpiry - 60000) {
      const tokenResponse = await getClientCredentialsToken(config);
      accessToken = tokenResponse.access_token;
      // Set expiry time (expires_in is in seconds, typically 7200 seconds = 2 hours)
      tokenExpiry = now + tokenResponse.expires_in * 1000;
    }

    return accessToken;
  }

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    const token = await ensureValidToken();

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
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    if (body && (method === "POST" || method === "PUT")) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    // If we get a 401, the token might have been revoked, try to get a new one
    if (response.status === 401) {
      accessToken = null;
      const newToken = await ensureValidToken();
      headers.Authorization = `Bearer ${newToken}`;

      const retryResponse = await fetch(url, requestOptions);

      if (!retryResponse.ok) {
        const errorText = await retryResponse.text();
        throw new Error(`TikTok Client Credentials API error (${retryResponse.status}): ${errorText}`);
      }

      return retryResponse.json() as Promise<T>;
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`TikTok Client Credentials API error (${response.status}): ${errorText}`);
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
