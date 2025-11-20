import { getMastodonApiBaseUrl } from "./config";

export interface MastodonClientConfig {
  instanceUrl: string; // e.g., "mastodon.social"
  accessToken: string;
}

export interface HttpClient {
  get<T>(path: string, params?: Record<string, string | number | boolean | string[] | undefined>): Promise<T>;
  post<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | string[] | undefined>,
  ): Promise<T>;
  put<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | string[] | undefined>,
  ): Promise<T>;
  delete<T>(
    path: string,
    params?: Record<string, string | number | boolean | string[] | undefined>,
  ): Promise<T>;
  patch<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | string[] | undefined>,
  ): Promise<T>;
}

/**
 * Create an HTTP client for making authenticated requests to Mastodon API
 * Uses Bearer token authentication in Authorization header
 */
export function createMastodonClient(config: MastodonClientConfig): HttpClient {
  const baseUrl = getMastodonApiBaseUrl(config.instanceUrl);
  const accessToken = config.accessToken;

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | string[] | undefined>,
  ): Promise<T> {
    let url = `${baseUrl}${path}`;

    // Add query parameters if provided
    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            // Handle array parameters (e.g., for multiple types in search)
            for (const item of value) {
              searchParams.append(key, String(item));
            }
          } else {
            searchParams.append(key, String(value));
          }
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

    // Add body for POST, PUT, PATCH requests
    if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
      // Handle FormData (for media uploads)
      if (body instanceof FormData) {
        // Remove Content-Type header to let fetch set it with boundary
        const { "Content-Type": _, ...restHeaders } = headers;
        Object.assign(headers, restHeaders);
        requestOptions.body = body;
      } else {
        requestOptions.body = JSON.stringify(body);
      }
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Mastodon API error (${response.status}): ${errorText}`);
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return {} as T;
    }

    // Handle responses that might not be JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json() as Promise<T>;
    }

    // For non-JSON responses, return text as unknown cast to T
    const text = await response.text();
    return text as unknown as T;
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

    patch<T>(
      path: string,
      body?: unknown,
      params?: Record<string, string | number | boolean | undefined>,
    ): Promise<T> {
      return makeRequest<T>("PATCH", path, body, params);
    },
  };
}
