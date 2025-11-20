// Personal Access Token (PAT) authentication client for Asana API

import { ASANA_API_BASE_URL } from "./config";

export interface AsanaPATConfig {
  personalAccessToken: string;
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
}

/**
 * Creates an HTTP client for Asana API using Personal Access Token authentication
 *
 * @param config - Configuration with personal access token
 * @returns HTTP client with methods for API requests
 *
 * @example
 * ```typescript
 * const client = createPATClient({
 *   personalAccessToken: 'your-pat-token'
 * });
 *
 * const tasks = await client.get('/tasks');
 * ```
 */
export function createPATClient(config: AsanaPATConfig): HttpClient {
  const { personalAccessToken } = config;

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | string[] | undefined>,
  ): Promise<T> {
    let url = `${ASANA_API_BASE_URL}${path}`;

    // Add query parameters
    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          if (Array.isArray(value)) {
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
      Authorization: `Bearer ${personalAccessToken}`,
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

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Asana API error (${response.status}): ${errorText}`);
    }

    return response.json() as Promise<T>;
  }

  return {
    get<T>(
      path: string,
      params?: Record<string, string | number | boolean | string[] | undefined>,
    ): Promise<T> {
      return makeRequest<T>("GET", path, undefined, params);
    },

    post<T>(
      path: string,
      body?: unknown,
      params?: Record<string, string | number | boolean | string[] | undefined>,
    ): Promise<T> {
      return makeRequest<T>("POST", path, body, params);
    },

    put<T>(
      path: string,
      body?: unknown,
      params?: Record<string, string | number | boolean | string[] | undefined>,
    ): Promise<T> {
      return makeRequest<T>("PUT", path, body, params);
    },

    delete<T>(
      path: string,
      params?: Record<string, string | number | boolean | string[] | undefined>,
    ): Promise<T> {
      return makeRequest<T>("DELETE", path, undefined, params);
    },
  };
}
