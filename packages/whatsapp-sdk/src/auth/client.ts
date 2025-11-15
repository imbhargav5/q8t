import type { WhatsAppConfig } from "./config";
import { getBaseUrl } from "./config";
import type { TokenManager } from "./token";

export class HttpClient {
  private tokenManager: TokenManager;
  private baseUrl: string;

  constructor(tokenManager: TokenManager, config: WhatsAppConfig) {
    this.tokenManager = tokenManager;
    this.baseUrl = getBaseUrl(config);
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | undefined>
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
        `WhatsApp API error: ${response.status} ${response.statusText} - ${errorBody}`
      );
    }

    return response.json() as Promise<T>;
  }

  async get<T>(
    path: string,
    queryParams?: Record<string, string | number | undefined>
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
