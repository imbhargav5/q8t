import type { CloudinaryProvisioningConfig } from "./config";
import { getProvisioningBaseUrl } from "./config";

/**
 * HTTP Client for Cloudinary Provisioning API (Enterprise only)
 */
export class ProvisioningHttpClient {
  private config: CloudinaryProvisioningConfig;
  private baseUrl: string;

  constructor(config: CloudinaryProvisioningConfig) {
    this.config = config;
    this.baseUrl = getProvisioningBaseUrl(config.account_id);
  }

  private getBasicAuthHeader(): string {
    const credentials = `${this.config.provisioning_key}:${this.config.provisioning_secret}`;
    const encoded = Buffer.from(credentials).toString("base64");
    return `Basic ${encoded}`;
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
      Authorization: this.getBasicAuthHeader(),
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
        `Cloudinary Provisioning API error: ${response.status} ${response.statusText} - ${errorBody}`,
      );
    }

    // Check if response has content
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
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
