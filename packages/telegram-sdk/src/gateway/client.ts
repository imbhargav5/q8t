/**
 * HTTP Client for Telegram Gateway API
 */

import type { TelegramGatewayConfig } from "./config";
import { getGatewayApiUrl } from "./config";

export interface GatewayHttpClient {
  post<T>(path: string, body?: unknown): Promise<T>;
}

/**
 * Create an HTTP client for Telegram Gateway API
 */
export function createGatewayClient(config: TelegramGatewayConfig): GatewayHttpClient {
  const baseUrl = getGatewayApiUrl(config);

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${baseUrl}${path}`;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${config.accessToken}`,
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
      let errorMessage = `Telegram Gateway API error: ${response.status} ${response.statusText}`;

      try {
        const errorData = JSON.parse(errorBody);
        if (errorData.error) {
          const code = errorData.error.code || "UNKNOWN_ERROR";
          const message = errorData.error.message || errorBody;
          errorMessage = `Telegram Gateway API error [${code}]: ${message}`;
        }
      } catch {
        errorMessage += ` - ${errorBody}`;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Gateway API returns { ok: boolean, ...data }
    if (typeof data === "object" && data !== null && "ok" in data) {
      if (!data.ok && "error" in data) {
        const error = (data as any).error;
        const code = error.code || "UNKNOWN_ERROR";
        const message = error.message || "Unknown error";
        throw new Error(`Telegram Gateway API error [${code}]: ${message}`);
      }
    }

    return data as T;
  }

  return {
    post<T>(path: string, body?: unknown): Promise<T> {
      return makeRequest<T>("POST", path, body);
    },
  };
}
