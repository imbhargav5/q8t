import type { CloudinarySignedConfig } from "./config";
import { getApiBaseUrl } from "./config";
import { signParams } from "./signature";

/**
 * HTTP Client for signed Cloudinary API requests (Upload and Admin APIs)
 */
export class SignedHttpClient {
  private config: CloudinarySignedConfig;
  private baseUrl: string;

  constructor(config: CloudinarySignedConfig) {
    this.config = config;
    this.baseUrl = getApiBaseUrl(config.cloud_name, config.secure);
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>,
  ): Promise<T> {
    let url = `${this.baseUrl}${path}`;

    // Build query string if provided
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
      "Content-Type": "application/json",
    };

    // Sign the request
    let signedBody = body;
    if (body && typeof body === "object") {
      const paramsToSign = { ...body, api_key: this.config.api_key };
      signedBody = signParams(
        paramsToSign as Record<string, string | number | boolean>,
        this.config.api_secret,
        this.config.signature_algorithm,
      );
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (signedBody) {
      options.body = JSON.stringify(signedBody);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Cloudinary API error: ${response.status} ${response.statusText} - ${errorBody}`,
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
    // For GET requests, add api_key and signature to query params
    const signedParams = signParams(
      { ...queryParams, api_key: this.config.api_key },
      this.config.api_secret,
      this.config.signature_algorithm,
    );

    return this.request<T>(
      "GET",
      path,
      undefined,
      signedParams as Record<string, string | number | boolean>,
    );
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("POST", path, body);
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("PUT", path, body);
  }

  async delete<T>(
    path: string,
    queryParams?: Record<string, string | number | boolean | string[] | undefined>,
  ): Promise<T> {
    // For DELETE requests, add api_key and signature to query params
    const signedParams = signParams(
      { ...queryParams, api_key: this.config.api_key },
      this.config.api_secret,
      this.config.signature_algorithm,
    );

    return this.request<T>(
      "DELETE",
      path,
      undefined,
      signedParams as Record<string, string | number | boolean>,
    );
  }
}
