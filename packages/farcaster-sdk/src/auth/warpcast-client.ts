// HTTP client for Warpcast/Farcaster Client API

import type { WarpcastConfig, HttpClient } from "./config";
import { WARPCAST_API_BASE_URL } from "./config";

export interface WarpcastClientConfig extends WarpcastConfig {
  accessToken: string;
  baseUrl?: string;
  onTokenRefresh?: (newToken: string) => void;
}

/**
 * Create an HTTP client for the Warpcast API
 * Supports Bearer token authentication
 */
export function createWarpcastClient(config: WarpcastClientConfig): HttpClient {
  let accessToken = config.accessToken;
  const baseUrl = config.baseUrl || WARPCAST_API_BASE_URL;

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    const url = new URL(`${baseUrl}${path}`);

    // Add query parameters
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
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

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    let response = await fetch(url.toString(), requestOptions);

    // Handle token refresh on 401
    if (response.status === 401 && config.onTokenRefresh) {
      // In a real implementation, you would refresh the token here
      // For now, we just throw an error
      throw new Error("Authentication failed. Token may be expired.");
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Warpcast API error (${response.status}): ${errorText}`);
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return {} as T;
    }

    return response.json() as Promise<T>;
  }

  return {
    get: <T>(path: string, params?: Record<string, string | number | boolean | undefined>) =>
      makeRequest<T>("GET", path, undefined, params),

    post: <T>(
      path: string,
      body?: unknown,
      params?: Record<string, string | number | boolean | undefined>,
    ) => makeRequest<T>("POST", path, body, params),

    put: <T>(
      path: string,
      body?: unknown,
      params?: Record<string, string | number | boolean | undefined>,
    ) => makeRequest<T>("PUT", path, body, params),

    delete: <T>(path: string, params?: Record<string, string | number | boolean | undefined>) =>
      makeRequest<T>("DELETE", path, undefined, params),

    patch: <T>(
      path: string,
      body?: unknown,
      params?: Record<string, string | number | boolean | undefined>,
    ) => makeRequest<T>("PATCH", path, body, params),
  };
}
