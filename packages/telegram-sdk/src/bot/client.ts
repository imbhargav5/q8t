/**
 * HTTP Client for Telegram Bot API
 */

import type { TelegramBotConfig } from "./config";
import { getBotApiEndpoint } from "./config";

export interface BotHttpClient {
  get<T>(path: string, queryParams?: Record<string, string | number | boolean | undefined>): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
}

/**
 * Create an HTTP client for Telegram Bot API
 */
export function createBotClient(config: TelegramBotConfig): BotHttpClient {
  const baseUrl = getBotApiEndpoint(config);

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | boolean | undefined>
  ): Promise<T> {
    let url = `${baseUrl}${path}`;

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

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Telegram Bot API error: ${response.status} ${response.statusText} - ${errorBody}`
      );
    }

    const data = await response.json();

    // Telegram Bot API wraps responses in { ok: boolean, result: T }
    if (typeof data === "object" && data !== null && "ok" in data) {
      if (!data.ok) {
        const description = (data as any).description || "Unknown error";
        const errorCode = (data as any).error_code;
        throw new Error(`Telegram Bot API error ${errorCode}: ${description}`);
      }
      return (data as any).result as T;
    }

    return data as T;
  }

  return {
    get<T>(path: string, queryParams?: Record<string, string | number | boolean | undefined>): Promise<T> {
      return makeRequest<T>("GET", path, undefined, queryParams);
    },

    post<T>(path: string, body?: unknown): Promise<T> {
      return makeRequest<T>("POST", path, body);
    },
  };
}
