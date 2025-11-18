import { FACEBOOK_API_BASE_URL } from "./config";
import { exchangeLongLivedToken } from "./oauth2";

export interface FacebookClientConfig {
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

export function createFacebookClient(config: FacebookClientConfig): HttpClient {
  let accessToken = config.accessToken;

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    let url = `${FACEBOOK_API_BASE_URL}${path}`;

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
    if (response.status === 401 && config.clientSecret) {
      try {
        const newTokens = await exchangeLongLivedToken({
          clientId: config.clientId,
          clientSecret: config.clientSecret,
          accessToken: accessToken,
        });

        accessToken = newTokens.access_token;

        if (config.onTokenRefresh) {
          config.onTokenRefresh({
            accessToken: newTokens.access_token,
          });
        }

        // Retry the request with new token
        searchParams.set("access_token", accessToken);
        const newQueryString = searchParams.toString();
        url = `${FACEBOOK_API_BASE_URL}${path}?${newQueryString}`;
        response = await fetch(url, requestOptions);
      } catch {
        throw new Error("Token refresh failed");
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Facebook API error (${response.status}): ${errorText}`);
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
