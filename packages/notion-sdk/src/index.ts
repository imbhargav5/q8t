// Main entry point for @q8t/notion-sdk

// Re-export authentication utilities
export * from "./auth";

// Re-export generated API (will be available after running `pnpm generate`)
export * from "../lib";

import { NotionApi } from "../lib";
import { BearerTokenManager } from "./auth/bearer-token";
import { HttpClient } from "./auth/client";
import type { BearerTokenConfig, OAuthConfig } from "./auth/config";
import { OAuthManager } from "./auth/oauth";

/**
 * Unified Notion SDK with factory methods for different authentication types
 */
// biome-ignore lint/complexity/noStaticOnlyClass: Factory pattern with static methods is intentional for clean API
export class NotionSDK {
  /**
   * Create a Notion client using Bearer Token (Internal Integration) authentication
   *
   * @example
   * ```typescript
   * const client = NotionSDK.createBearerTokenClient({
   *   token: 'secret_...',
   * });
   *
   * // Use the client
   * const page = await client.pages.retrievePage('page-id');
   * ```
   */
  static createBearerTokenClient(config: BearerTokenConfig): NotionClientWithApi {
    const tokenManager = new BearerTokenManager(config);
    const httpClient = new HttpClient(tokenManager, config);
    const api = new NotionApi(httpClient);

    return new NotionClientWithApi(httpClient, api, tokenManager);
  }

  /**
   * Create a Notion client using OAuth 2.0 (Public Integration) authentication
   *
   * @example
   * ```typescript
   * const client = NotionSDK.createOAuthClient({
   *   clientId: 'your-client-id',
   *   clientSecret: 'your-client-secret',
   *   redirectUri: 'https://your-app.com/callback',
   * });
   *
   * // Generate authorization URL
   * const { url, state } = client.oauth.generateAuthUrl();
   * // Redirect user to url
   *
   * // After user authorizes, exchange code for token
   * await client.oauth.exchangeCodeForToken(code);
   *
   * // Now use the client
   * const page = await client.pages.retrievePage('page-id');
   * ```
   */
  static createOAuthClient(config: OAuthConfig): NotionClientWithApi {
    const oauthManager = new OAuthManager(config);
    const httpClient = new HttpClient(oauthManager, config);
    const api = new NotionApi(httpClient);

    return new NotionClientWithApi(httpClient, api, oauthManager);
  }
}

/**
 * Notion client wrapper that provides easy access to all API methods
 */
export class NotionClientWithApi {
  private httpClient: HttpClient;
  private api: NotionApi;
  private authManager: BearerTokenManager | OAuthManager;

  constructor(
    httpClient: HttpClient,
    api: NotionApi,
    authManager: BearerTokenManager | OAuthManager,
  ) {
    this.httpClient = httpClient;
    this.api = api;
    this.authManager = authManager;
  }

  /**
   * Access to OAuth-specific methods (only available for OAuth clients)
   */
  get oauth(): OAuthManager {
    if (!(this.authManager instanceof OAuthManager)) {
      throw new Error(
        "OAuth methods are only available for OAuth clients. Use NotionSDK.createOAuthClient() instead.",
      );
    }
    return this.authManager;
  }

  /**
   * Direct access to the HTTP client
   */
  get client(): HttpClient {
    return this.httpClient;
  }

  // Page methods
  get pages() {
    return {
      create: this.api.createPage.bind(this.api),
      retrieve: this.api.retrievePage.bind(this.api),
      update: this.api.updatePage.bind(this.api),
      retrieveProperty: this.api.retrievePageProperty.bind(this.api),
    };
  }

  // Database methods
  get databases() {
    return {
      create: this.api.createDatabase.bind(this.api),
      retrieve: this.api.retrieveDatabase.bind(this.api),
      update: this.api.updateDatabase.bind(this.api),
      query: this.api.queryDatabase.bind(this.api),
    };
  }

  // Block methods
  get blocks() {
    return {
      retrieve: this.api.retrieveBlock.bind(this.api),
      update: this.api.updateBlock.bind(this.api),
      delete: this.api.deleteBlock.bind(this.api),
      retrieveChildren: this.api.retrieveBlockChildren.bind(this.api),
      appendChildren: this.api.appendBlockChildren.bind(this.api),
    };
  }

  // Data source methods (2025 API)
  get dataSources() {
    return {
      create: this.api.createDataSource.bind(this.api),
      retrieve: this.api.retrieveDataSource.bind(this.api),
      update: this.api.updateDataSource.bind(this.api),
      updateProperties: this.api.updateDataSourceProperties.bind(this.api),
      query: this.api.queryDataSource.bind(this.api),
      listTemplates: this.api.listDataSourceTemplates.bind(this.api),
    };
  }

  // Comment methods
  get comments() {
    return {
      create: this.api.createComment.bind(this.api),
      retrieve: this.api.retrieveComment.bind(this.api),
      list: this.api.listComments.bind(this.api),
    };
  }

  // File upload methods
  get files() {
    return {
      create: this.api.createFileUpload.bind(this.api),
      retrieve: this.api.retrieveFileUpload.bind(this.api),
      list: this.api.listFileUploads.bind(this.api),
      send: this.api.sendFileData.bind(this.api),
      complete: this.api.completeFileUpload.bind(this.api),
    };
  }

  // User methods
  get users() {
    return {
      list: this.api.listUsers.bind(this.api),
      retrieve: this.api.retrieveUser.bind(this.api),
      me: this.api.retrieveBotUser.bind(this.api),
    };
  }

  // Search method
  get search() {
    return this.api.search.bind(this.api);
  }
}

// Re-export for convenience
export { NotionClientWithApi as NotionClient };
