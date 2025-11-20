import type { ClickUpConfig } from "./config";
import { getBaseUrl } from "./config";
import type { TokenManager } from "./token";

export interface HttpClient {
  get<T>(
    path: string,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>,
  ): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
  put<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

export class ClickUpHttpClient implements HttpClient {
  private tokenManager: TokenManager;
  private baseUrl: string;

  constructor(tokenManager: TokenManager, config?: ClickUpConfig) {
    this.tokenManager = tokenManager;
    this.baseUrl = getBaseUrl(config);
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>,
  ): Promise<T> {
    let url = `${this.baseUrl}${path}`;

    if (queryParams) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            // Handle array parameters
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
      Authorization: this.tokenManager.getAuthorizationHeader(),
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
        `ClickUp API error: ${response.status} ${response.statusText} - ${errorBody}`,
      );
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json() as Promise<T>;
    }

    return {} as T;
  }

  async get<T>(
    path: string,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>,
  ): Promise<T> {
    return this.request<T>("GET", path, undefined, queryParams);
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("POST", path, body);
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("PUT", path, body);
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>("DELETE", path);
  }
}
