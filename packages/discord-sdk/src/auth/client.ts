import { DISCORD_API_BASE_URL } from "./config";
import { refreshAccessToken } from "./oauth2";

export interface DiscordClientConfig {
  clientId?: string;
  clientSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  botToken?: string;
  onTokenRefresh?: (newTokens: { accessToken: string; refreshToken?: string }) => void;
}

export interface HttpClient {
  get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
  put<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

export function createDiscordClient(config: DiscordClientConfig): HttpClient {
  if (!config.botToken && !config.accessToken) {
    throw new Error("Either botToken or accessToken must be provided");
  }

  let accessToken = config.accessToken;
  const isBotAuth = !!config.botToken;

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    let url = `${DISCORD_API_BASE_URL}${path}`;

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

    const authHeader = isBotAuth
      ? `Bot ${config.botToken}`
      : `Bearer ${accessToken}`;

    const headers: Record<string, string> = {
      Authorization: authHeader,
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

    // Handle token refresh on 401 (only for OAuth, not bot tokens)
    if (response.status === 401 && !isBotAuth && config.refreshToken && config.clientId) {
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
      throw new Error(`Discord API error (${response.status}): ${errorText}`);
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
