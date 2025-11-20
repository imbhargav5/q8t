import { ApiKeyHttpClient, ApiKeyConfig } from "../auth/api-key-client";
import { TrustpilotPublicApi } from "../../lib/public";

/**
 * Client for Trustpilot Public API using API Key authentication
 *
 * This client provides access to public Trustpilot data including:
 * - Business unit information and reviews
 * - Consumer reviews
 * - Categories
 * - Resource metadata (locales, countries, images)
 * - Public product reviews
 */
export class TrustpilotPublicClient {
  public readonly api: TrustpilotPublicApi;
  private httpClient: ApiKeyHttpClient;

  constructor(config: ApiKeyConfig) {
    this.httpClient = new ApiKeyHttpClient(config);
    this.api = new TrustpilotPublicApi(this.httpClient);
  }

  /**
   * Get the underlying HTTP client for advanced use cases
   */
  getHttpClient(): ApiKeyHttpClient {
    return this.httpClient;
  }
}

/**
 * Create a Trustpilot Public API client with API Key authentication
 */
export function createPublicClient(config: ApiKeyConfig): TrustpilotPublicClient {
  return new TrustpilotPublicClient(config);
}
