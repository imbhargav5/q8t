// Main SDK entry point
// Export all generated APIs and authentication modules

export * from "./auth";

// Import types for creating SDK instances
import type { HttpClient, SalesforceClientConfig } from "./auth/client";
import { createSalesforceClient } from "./auth/client";
import type {
  OAuth2Config,
  JWTConfig,
  SessionIdConfig,
  UsernamePasswordConfig,
} from "./auth/config";
import { getJWTToken } from "./auth/jwt";
import { getUsernamePasswordToken } from "./auth/username-password";

// Import generated API classes
import { RestApi } from "../lib/rest/api";
import { BulkApi } from "../lib/bulk/api";
import { ToolingApi } from "../lib/tooling/api";

// Re-export generated types for convenience
export * as RestTypes from "../lib/rest/types";
export * as BulkTypes from "../lib/bulk/types";
export * as ToolingTypes from "../lib/tooling/types";

/**
 * Main Salesforce SDK class
 * Provides access to all Salesforce APIs through a unified interface
 */
export class SalesforceSDK {
  private httpClient: HttpClient;
  private _restApi: RestApi;
  private _bulkApi: BulkApi;
  private _toolingApi: ToolingApi;

  constructor(config: SalesforceClientConfig) {
    this.httpClient = createSalesforceClient(config);
    this._restApi = new RestApi(this.httpClient);
    this._bulkApi = new BulkApi(this.httpClient);
    this._toolingApi = new ToolingApi(this.httpClient);
  }

  /**
   * Get REST API client
   * Provides access to standard Salesforce REST API operations
   */
  rest(): RestApi {
    return this._restApi;
  }

  /**
   * Get Bulk API 2.0 client
   * Provides access to Salesforce Bulk API for large data operations
   */
  bulk(): BulkApi {
    return this._bulkApi;
  }

  /**
   * Get Tooling API client
   * Provides access to Salesforce Tooling API for development tools
   */
  tooling(): ToolingApi {
    return this._toolingApi;
  }

  /**
   * Get the underlying HTTP client
   * Useful for making custom API calls
   */
  getHttpClient(): HttpClient {
    return this.httpClient;
  }
}

/**
 * Create a Salesforce SDK instance using OAuth 2.0 with an existing access token
 */
export function createWithAccessToken(
  instanceUrl: string,
  accessToken: string,
  apiVersion?: string,
): SalesforceSDK {
  return new SalesforceSDK({
    instanceUrl,
    accessToken,
    apiVersion,
  });
}

/**
 * Create a Salesforce SDK instance using JWT Bearer Flow
 */
export async function createWithJWT(config: JWTConfig): Promise<SalesforceSDK> {
  const tokenResponse = await getJWTToken(config);

  return new SalesforceSDK({
    instanceUrl: tokenResponse.instance_url,
    accessToken: tokenResponse.access_token,
    apiVersion: config.apiVersion,
  });
}

/**
 * Create a Salesforce SDK instance using Username-Password Flow
 */
export async function createWithUsernamePassword(
  config: UsernamePasswordConfig,
): Promise<SalesforceSDK> {
  const tokenResponse = await getUsernamePasswordToken(config);

  return new SalesforceSDK({
    instanceUrl: tokenResponse.instance_url,
    accessToken: tokenResponse.access_token,
    apiVersion: config.apiVersion,
  });
}

/**
 * Create a Salesforce SDK instance using a Session ID
 */
export function createWithSessionId(config: SessionIdConfig): SalesforceSDK {
  return new SalesforceSDK({
    instanceUrl: config.instanceUrl,
    accessToken: config.sessionId,
    apiVersion: config.apiVersion,
  });
}
