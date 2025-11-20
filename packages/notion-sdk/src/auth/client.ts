import type { BearerTokenManager } from "./bearer-token";
import type { NotionConfig } from "./config";
import { getBaseUrl } from "./config";
import type { OAuthManager } from "./oauth";

/**
 * HTTP client for making requests to Notion API
 */
export class HttpClient {
  private tokenManager: BearerTokenManager | OAuthManager;
  private baseUrl: string;

  constructor(tokenManager: BearerTokenManager | OAuthManager, config: NotionConfig) {
    this.tokenManager = tokenManager;
    this.baseUrl = getBaseUrl(config);
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    let url = `${this.baseUrl}${path}`;

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

    const headers = this.tokenManager.getHeaders();

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
      throw new Error(`Notion API error: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }

  async get<T>(
    path: string,
    queryParams?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    return this.request<T>("GET", path, undefined, queryParams);
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("POST", path, body);
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("PUT", path, body);
  }

  async patch<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("PATCH", path, body);
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>("DELETE", path);
  }
}
