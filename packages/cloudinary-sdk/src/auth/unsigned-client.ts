import type { CloudinaryUnsignedConfig } from "./config";
import { getApiBaseUrl } from "./config";

/**
 * HTTP Client for unsigned Cloudinary uploads
 */
export class UnsignedHttpClient {
  private config: CloudinaryUnsignedConfig;
  private baseUrl: string;

  constructor(config: CloudinaryUnsignedConfig) {
    this.config = config;
    this.baseUrl = getApiBaseUrl(config.cloud_name, config.secure);
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add upload_preset to the body for unsigned uploads
    const unsignedBody = {
      ...(body as Record<string, unknown>),
      upload_preset: this.config.upload_preset,
    };

    const options: RequestInit = {
      method: "POST",
      headers,
      body: JSON.stringify(unsignedBody),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Cloudinary Unsigned Upload error: ${response.status} ${response.statusText} - ${errorBody}`,
      );
    }

    return response.json() as Promise<T>;
  }
}
