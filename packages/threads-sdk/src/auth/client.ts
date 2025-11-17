import { THREADS_API_BASE_URL } from "./config";
import { refreshAccessToken } from "./oauth2";

export interface ThreadsClientConfig {
  clientId: string;
  clientSecret?: string;
  accessToken: string;
  refreshToken?: string;
  onTokenRefresh?: (newTokens: { accessToken: string; refreshToken?: string }) => void;
}

export interface HttpClient {
  get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
  put<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

export function createThreadsClient(config: ThreadsClientConfig): HttpClient {
  let accessToken = config.accessToken;

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    let url = `${THREADS_API_BASE_URL}${path}`;

    // Build query parameters
    const searchParams = new URLSearchParams();
    searchParams.append("access_token", accessToken);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      }
    }

    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    const headers: Record<string, string> = {
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
        const retryParams = new URLSearchParams();
        retryParams.append("access_token", accessToken);
        if (params) {
          for (const [key, value] of Object.entries(params)) {
            if (value !== undefined) {
              retryParams.append(key, String(value));
            }
          }
        }
        const retryUrl = `${THREADS_API_BASE_URL}${path}?${retryParams.toString()}`;
        response = await fetch(retryUrl, requestOptions);
      } catch {
        throw new Error("Token refresh failed");
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Threads API error (${response.status}): ${errorText}`);
    }

    return response.json();
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
