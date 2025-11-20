const TIKTOK_BUSINESS_API_BASE_URL = "https://business-api.tiktok.com/open_api/v1.3";
const TIKTOK_BUSINESS_AUTH_ENDPOINT = "https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/";

/**
 * Configuration for exchanging an authorization code for access token
 *
 * @public
 */
export interface BusinessAPIConfig {
  /**
   * TikTok Business application ID
   */
  appId: string;

  /**
   * TikTok Business application secret
   */
  secret: string;

  /**
   * Authorization code obtained from TikTok Ads Manager
   */
  authCode: string;
}

/**
 * Configuration for creating a Business API client
 *
 * @public
 */
export interface BusinessAPIClientConfig {
  /**
   * Long-lived access token for Business API
   */
  accessToken: string;
}

/**
 * Response from Business API token exchange endpoint
 *
 * @public
 */
export interface BusinessAPITokenResponse {
  /**
   * Response code (0 = success)
   */
  code: number;

  /**
   * Response message
   */
  message: string;

  /**
   * Response data containing access token and advertiser IDs
   */
  data: {
    /**
     * Access token for making API requests
     */
    access_token: string;

    /**
     * List of advertiser IDs this token has access to
     */
    advertiser_ids: string[];
  };

  /**
   * Unique request ID for tracking
   */
  request_id: string;
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
   * @param params - Query parameters (supports arrays and objects for Business API)
   * @returns Promise resolving to the response data
   */
  get<T>(path: string, params?: Record<string, string | number | boolean | string[] | object | undefined>): Promise<T>;

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
 * Exchanges an authorization code for a long-lived access token
 *
 * This is the first step in authenticating with the TikTok Business/Marketing API.
 * The authorization code is obtained from TikTok Ads Manager when setting up API access.
 *
 * @param config - Configuration with app credentials and auth code
 * @returns Promise resolving to token response with access token and advertiser IDs
 * @throws Error if the exchange fails or returns a non-zero code
 *
 * @example
 * ```typescript
 * const tokenResponse = await exchangeBusinessAuthCode({
 *   appId: "YOUR_APP_ID",
 *   secret: "YOUR_APP_SECRET",
 *   authCode: "AUTHORIZATION_CODE_FROM_ADS_MANAGER"
 * });
 *
 * console.log(tokenResponse.data.access_token);
 * console.log(tokenResponse.data.advertiser_ids);
 * ```
 *
 * @public
 */
export async function exchangeBusinessAuthCode(
  config: BusinessAPIConfig
): Promise<BusinessAPITokenResponse> {
  const body = {
    app_id: config.appId,
    secret: config.secret,
    auth_code: config.authCode,
  };

  const response = await fetch(TIKTOK_BUSINESS_AUTH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Business API auth code exchange failed: ${error}`);
  }

  const result = await response.json() as BusinessAPITokenResponse;

  if (result.code !== 0) {
    throw new Error(`Business API auth code exchange failed: ${result.message}`);
  }

  return result;
}

/**
 * Creates an HTTP client for TikTok Business/Marketing API
 *
 * This client is used for advertising and marketing operations including:
 * - Campaign Management (create, update, get campaigns)
 * - Ad Group Management (targeting, placements, budgets)
 * - Ad Management (creative assets, formats, landing pages)
 * - Creative Assets (upload videos and images)
 * - Reporting (comprehensive analytics and metrics)
 * - Audience Management (custom audiences for targeting)
 *
 * **Authentication Method:** App-level auth code exchange
 *
 * **Features:**
 * - Long-lived access tokens (typically 30+ days)
 * - Supports complex query parameters (arrays, objects)
 * - Automatic error handling for Business API response format
 *
 * @param config - Business API client configuration with access token
 * @returns HTTP client instance with methods for making API requests
 *
 * @example
 * ```typescript
 * // First exchange auth code for access token
 * const tokenResponse = await exchangeBusinessAuthCode({
 *   appId: "YOUR_APP_ID",
 *   secret: "YOUR_APP_SECRET",
 *   authCode: "AUTH_CODE"
 * });
 *
 * // Create client with access token
 * const client = createBusinessAPIClient({
 *   accessToken: tokenResponse.data.access_token
 * });
 *
 * // Make API requests
 * const campaigns = await client.get("/campaign/get/", {
 *   advertiser_id: "YOUR_ADVERTISER_ID",
 *   page: 1,
 *   page_size: 10
 * });
 * ```
 *
 * @public
 */
export function createBusinessAPIClient(config: BusinessAPIClientConfig): HttpClient {
  const accessToken = config.accessToken;

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | string[] | object | undefined>
  ): Promise<T> {
    let url = `${TIKTOK_BUSINESS_API_BASE_URL}${path}`;

    // For GET requests, add access_token and other params to query string
    if (method === "GET" || params) {
      const searchParams = new URLSearchParams();
      searchParams.append("Access-Token", accessToken);

      if (params) {
        for (const [key, value] of Object.entries(params)) {
          if (value !== undefined) {
            if (Array.isArray(value)) {
              searchParams.append(key, JSON.stringify(value));
            } else if (typeof value === "object") {
              searchParams.append(key, JSON.stringify(value));
            } else {
              searchParams.append(key, String(value));
            }
          }
        }
      }

      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // For POST requests, add access_token to the body
    if (method === "POST" && body) {
      headers["Access-Token"] = accessToken;
    }

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    if (body && (method === "POST" || method === "PUT")) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`TikTok Business API error (${response.status}): ${errorText}`);
    }

    const result = await response.json() as any;

    // Business API returns responses with code/message structure
    if (result.code !== 0 && result.code !== undefined) {
      throw new Error(`TikTok Business API error (code ${result.code}): ${result.message}`);
    }

    return result as T;
  }

  return {
    get<T>(path: string, params?: Record<string, string | number | boolean | string[] | object | undefined>): Promise<T> {
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
