// HTTP client for Farcaster Hub API

import type { HubConfig, HttpClient } from "./config";
import { DEFAULT_HUB_URL } from "./config";

export interface HubClientConfig extends HubConfig {
  hubUrl?: string;
}

/**
 * Create an HTTP client for the Farcaster Hub API
 * Hub API is mostly read-only; writes require signed messages
 */
export function createHubClient(config: HubClientConfig = {}): HttpClient {
  const baseUrl = config.hubUrl || DEFAULT_HUB_URL;

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
      "Content-Type": "application/json",
    };

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url.toString(), requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hub API error (${response.status}): ${errorText}`);
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
