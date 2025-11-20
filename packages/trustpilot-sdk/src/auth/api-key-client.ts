import { HttpClient, HttpClientOptions, handleResponse, buildUrl } from "./http-client";

export interface ApiKeyConfig {
  apiKey: string;
  baseUrl?: string;
}

export class ApiKeyHttpClient implements HttpClient {
  private apiKey: string;
  private defaultBaseUrl: string;

  constructor(config: ApiKeyConfig) {
    this.apiKey = config.apiKey;
    this.defaultBaseUrl = config.baseUrl || "https://api.trustpilot.com/v1";
  }

  private getHeaders(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      apikey: this.apiKey,
    };
  }

  async get<T>(
    path: string,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T> {
    const baseUrl = options?.baseUrl || this.defaultBaseUrl;
    const url = buildUrl(baseUrl, path, queryParams);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getHeaders(),
    });

    return handleResponse<T>(response);
  }

  async post<T>(
    path: string,
    body?: any,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T> {
    const baseUrl = options?.baseUrl || this.defaultBaseUrl;
    const url = buildUrl(baseUrl, path, queryParams);

    const response = await fetch(url, {
      method: "POST",
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    return handleResponse<T>(response);
  }

  async put<T>(
    path: string,
    body?: any,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T> {
    const baseUrl = options?.baseUrl || this.defaultBaseUrl;
    const url = buildUrl(baseUrl, path, queryParams);

    const response = await fetch(url, {
      method: "PUT",
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    return handleResponse<T>(response);
  }

  async patch<T>(
    path: string,
    body?: any,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T> {
    const baseUrl = options?.baseUrl || this.defaultBaseUrl;
    const url = buildUrl(baseUrl, path, queryParams);

    const response = await fetch(url, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    return handleResponse<T>(response);
  }

  async delete<T>(
    path: string,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T> {
    const baseUrl = options?.baseUrl || this.defaultBaseUrl;
    const url = buildUrl(baseUrl, path, queryParams);

    const response = await fetch(url, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    return handleResponse<T>(response);
  }
}
