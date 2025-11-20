// HTTP client for Farcaster Signer API

import type { SignerConfig, HttpClient } from "./config";
import { SIGNER_API_BASE_URL } from "./config";

export interface SignerClientConfig extends SignerConfig {
  appFid: number;
  appPrivateKey: string;
  baseUrl?: string;
}

/**
 * Create an HTTP client for the Farcaster Signer API
 * Used for managing signer requests and approvals
 */
export function createSignerClient(config: SignerClientConfig): HttpClient {
  const baseUrl = config.baseUrl || SIGNER_API_BASE_URL;

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
      throw new Error(`Signer API error (${response.status}): ${errorText}`);
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
