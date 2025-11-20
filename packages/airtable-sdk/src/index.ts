// Main entry point for @q8t/airtable-sdk

// Re-export authentication utilities
export * from "./auth";

// Re-export generated API classes and types
export * from "../lib";

// Import necessary types and classes for SDK factory
import { PATHttpClient, createPATClient } from "./auth/pat-client";
import { OAuthHttpClient, createOAuthClient } from "./auth/oauth-client";
import type { AirtablePATConfig, AirtableOAuthClientConfig } from "./auth/config";
import {
  AirtableWebApi,
  AirtableOAuthApi,
  AirtableWebhooksApi,
  AirtableCommentsApi,
  AirtableEnterpriseApi,
} from "../lib";

/**
 * Unified Airtable SDK with Personal Access Token authentication
 */
export class AirtablePATSDK {
  private client: PATHttpClient;

  public readonly web: AirtableWebApi;
  public readonly webhooks: AirtableWebhooksApi;
  public readonly comments: AirtableCommentsApi;
  public readonly enterprise: AirtableEnterpriseApi;

  constructor(config: AirtablePATConfig) {
    this.client = createPATClient(config);

    // Initialize all API modules
    this.web = new AirtableWebApi(this.client);
    this.webhooks = new AirtableWebhooksApi(this.client);
    this.comments = new AirtableCommentsApi(this.client);
    this.enterprise = new AirtableEnterpriseApi(this.client);
  }

  /**
   * Get the underlying HTTP client
   */
  getClient(): PATHttpClient {
    return this.client;
  }
}

/**
 * Unified Airtable SDK with OAuth 2.0 authentication
 */
export class AirtableOAuthSDK {
  private client: OAuthHttpClient;

  public readonly web: AirtableOAuthApi;
  public readonly webhooks: AirtableWebhooksApi;
  public readonly comments: AirtableCommentsApi;
  public readonly enterprise: AirtableEnterpriseApi;

  constructor(config: AirtableOAuthClientConfig) {
    this.client = createOAuthClient(config);

    // Initialize all API modules
    // Note: OAuth API has additional endpoints like /meta/whoami
    this.web = new AirtableOAuthApi(this.client);
    this.webhooks = new AirtableWebhooksApi(this.client as any); // Webhooks can work with both
    this.comments = new AirtableCommentsApi(this.client as any); // Comments can work with both
    this.enterprise = new AirtableEnterpriseApi(this.client as any); // Enterprise can work with both
  }

  /**
   * Get the underlying HTTP client
   */
  getClient(): OAuthHttpClient {
    return this.client;
  }

  /**
   * Get current access token
   */
  getAccessToken(): string {
    return this.client.getAccessToken();
  }
}

/**
 * Main Airtable SDK factory
 */
export class AirtableSDK {
  /**
   * Create SDK instance with Personal Access Token
   */
  static withPAT(config: AirtablePATConfig): AirtablePATSDK {
    return new AirtablePATSDK(config);
  }

  /**
   * Create SDK instance with OAuth 2.0
   */
  static withOAuth(config: AirtableOAuthClientConfig): AirtableOAuthSDK {
    return new AirtableOAuthSDK(config);
  }

  /**
   * Shorthand for creating SDK with PAT (most common use case)
   */
  static create(accessToken: string): AirtablePATSDK {
    return new AirtablePATSDK({ accessToken });
  }
}

// Default export
export default AirtableSDK;
