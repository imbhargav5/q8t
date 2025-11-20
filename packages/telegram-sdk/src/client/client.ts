/**
 * HTTP Client for Telegram Client API (MTProto)
 */

import type { TelegramClientConfig, SessionData } from "./config";
import { getClientApiUrl, getDCUrl } from "./config";

export interface ClientHttpClient {
  get<T>(path: string, queryParams?: Record<string, string | number | undefined>): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
  put<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
  getSession(): SessionData | undefined;
}

/**
 * Create an HTTP client for Telegram Client API
 */
export async function createClientClient(
  config: TelegramClientConfig
): Promise<ClientHttpClient> {
  let session: SessionData | undefined = config.session;

  // Determine base URL (use DC-specific URL if session exists)
  function getBaseUrl(): string {
    if (session && session.dcId) {
      return getDCUrl(session.dcId, config.baseUrl);
    }
    return getClientApiUrl(config);
  }

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | undefined>
  ): Promise<T> {
    let url = `${getBaseUrl()}${path}`;

    // Add query parameters if provided
    if (queryParams) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      }
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add authorization header if session exists
    if (session && session.authKey) {
      headers.Authorization = `Bearer ${session.authKey}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // Update last activity timestamp
    if (session) {
      session.lastActivityAt = Date.now();
      if (config.onSessionUpdate) {
        config.onSessionUpdate(session);
      }
    }

    if (!response.ok) {
      const errorBody = await response.text();

      // Handle session expiration
      if (response.status === 401) {
        // Session expired, clear it
        session = undefined;
        if (config.onSessionUpdate) {
          config.onSessionUpdate(session as any);
        }
        throw new Error("Telegram Client API: Session expired. Please re-authenticate.");
      }

      throw new Error(
        `Telegram Client API error: ${response.status} ${response.statusText} - ${errorBody}`
      );
    }

    return response.json() as Promise<T>;
  }

  return {
    get<T>(path: string, queryParams?: Record<string, string | number | undefined>): Promise<T> {
      return makeRequest<T>("GET", path, undefined, queryParams);
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

    getSession(): SessionData | undefined {
      return session;
    },
  };
}
