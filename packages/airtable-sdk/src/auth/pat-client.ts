import type { AirtablePATConfig } from "./config";
import { getBaseUrl } from "./config";

/**
 * HTTP Client for Personal Access Token (PAT) authentication
 */
export class PATHttpClient {
  private accessToken: string;
  private baseUrl: string;

  constructor(config: AirtablePATConfig) {
    this.accessToken = config.accessToken;
    this.baseUrl = getBaseUrl(config);
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>
  ): Promise<T> {
    let url = `${this.baseUrl}${path}`;

    if (queryParams) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            for (const item of value) {
              params.append(key, String(item));
            }
          } else {
            params.append(key, String(value));
          }
        }
      }
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.accessToken}`,
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
        `Airtable API error: ${response.status} ${response.statusText} - ${errorBody}`
      );
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json() as Promise<T>;
  }

  async get<T>(
    path: string,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>
  ): Promise<T> {
    return this.request<T>("GET", path, undefined, queryParams);
  }

  async post<T>(
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>
  ): Promise<T> {
    return this.request<T>("POST", path, body, queryParams);
  }

  async patch<T>(
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>
  ): Promise<T> {
    return this.request<T>("PATCH", path, body, queryParams);
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("PUT", path, body);
  }

  async delete<T>(
    path: string,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>
  ): Promise<T> {
    return this.request<T>("DELETE", path, undefined, queryParams);
  }
}

/**
 * Create an Airtable client using Personal Access Token
 */
export function createPATClient(config: AirtablePATConfig): PATHttpClient {
  return new PATHttpClient(config);
}
