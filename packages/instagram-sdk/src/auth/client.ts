import { INSTAGRAM_API_BASE_URL } from "./config";
import { refreshLongLivedToken } from "./oauth2";

export interface InstagramClientConfig {
  clientId: string;
  clientSecret?: string;
  accessToken: string;
  onTokenRefresh?: (newTokens: { accessToken: string }) => void;
}

export interface HttpClient {
  get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
  put<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

export function createInstagramClient(config: InstagramClientConfig): HttpClient {
  let accessToken = config.accessToken;

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    let url = `${INSTAGRAM_API_BASE_URL}${path}`;

    // Add access_token to params
    const allParams = new URLSearchParams();
    allParams.append("access_token", accessToken);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          allParams.append(key, String(value));
        }
      }
    }

    const queryString = allParams.toString();
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
    if (response.status === 401) {
      try {
        const newTokens = await refreshLongLivedToken(accessToken);

        accessToken = newTokens.access_token;

        if (config.onTokenRefresh) {
          config.onTokenRefresh({
            accessToken: newTokens.access_token,
          });
        }

        // Update the URL with new token
        allParams.set("access_token", accessToken);
        url = `${INSTAGRAM_API_BASE_URL}${path}?${allParams.toString()}`;

        // Retry the request with new token
        response = await fetch(url, requestOptions);
      } catch {
        throw new Error("Token refresh failed");
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Instagram API error (${response.status}): ${errorText}`);
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
