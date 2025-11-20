import type { BearerTokenConfig } from "./config";
import { getApiVersion } from "./config";

/**
 * Token manager for Bearer Token (Internal Integration) authentication
 */
export class BearerTokenManager {
  private token: string;
  private apiVersion: string;

  constructor(config: BearerTokenConfig) {
    this.token = config.token;
    this.apiVersion = getApiVersion(config);
  }

  /**
   * Get the authorization header value
   */
  getAuthorizationHeader(): string {
    return `Bearer ${this.token}`;
  }

  /**
   * Get the Notion-Version header value
   */
  getVersionHeader(): string {
    return this.apiVersion;
  }

  /**
   * Get all required headers for Notion API requests
   */
  getHeaders(): Record<string, string> {
    return {
      Authorization: this.getAuthorizationHeader(),
      "Notion-Version": this.getVersionHeader(),
      "Content-Type": "application/json",
    };
  }
}
