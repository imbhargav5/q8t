// Main Monday.com SDK class

import { MondayGraphQLClient } from "./auth/client";
import type { MondayConfig } from "./auth/config";
import { PersonalTokenManager, OAuthTokenManager, ShortLivedTokenManager } from "./auth/token";
import { BoardsClient } from "./clients/boards";
import { ItemsClient } from "./clients/items";
import { ColumnsClient } from "./clients/columns";
import { UpdatesClient } from "./clients/updates";
import { UsersClient } from "./clients/users";
import { WorkspacesClient } from "./clients/workspaces";
import { WebhooksClient } from "./clients/webhooks";

export interface MondayTokenConfig extends MondayConfig {
  token: string;
}

export interface MondayOAuthClientConfig extends MondayConfig {
  accessToken: string;
  onTokenRefresh?: (newToken: string) => void;
}

export interface MondayShortLivedTokenConfig extends MondayConfig {
  shortLivedToken: string;
  validityInMinutes?: number;
}

/**
 * Main Monday.com SDK class
 *
 * Provides organized access to all Monday.com API endpoints through
 * category-specific clients (boards, items, columns, etc.)
 */
export class MondaySDK {
  private graphqlClient: MondayGraphQLClient;

  public readonly boards: BoardsClient;
  public readonly items: ItemsClient;
  public readonly columns: ColumnsClient;
  public readonly updates: UpdatesClient;
  public readonly users: UsersClient;
  public readonly workspaces: WorkspacesClient;
  public readonly webhooks: WebhooksClient;

  private constructor(graphqlClient: MondayGraphQLClient) {
    this.graphqlClient = graphqlClient;

    // Initialize all category clients
    this.boards = new BoardsClient(graphqlClient);
    this.items = new ItemsClient(graphqlClient);
    this.columns = new ColumnsClient(graphqlClient);
    this.updates = new UpdatesClient(graphqlClient);
    this.users = new UsersClient(graphqlClient);
    this.workspaces = new WorkspacesClient(graphqlClient);
    this.webhooks = new WebhooksClient(graphqlClient);
  }

  /**
   * Create SDK instance with Personal API Token (V2)
   *
   * This is the most common authentication method for Monday.com API.
   * Personal tokens mirror your platform-level permissions.
   *
   * @example
   * ```typescript
   * const monday = MondaySDK.createWithToken({
   *   token: 'your-api-token'
   * });
   * ```
   */
  static createWithToken(config: MondayTokenConfig): MondaySDK {
    const tokenManager = new PersonalTokenManager(config.token);
    const graphqlClient = new MondayGraphQLClient(tokenManager, config);
    return new MondaySDK(graphqlClient);
  }

  /**
   * Create SDK instance with OAuth 2.0 access token
   *
   * Use this when your app uses OAuth 2.0 for authentication.
   * Supports token refresh callbacks.
   *
   * @example
   * ```typescript
   * const monday = MondaySDK.createWithOAuth({
   *   accessToken: 'oauth-access-token',
   *   onTokenRefresh: (newToken) => {
   *     // Save new token
   *   }
   * });
   * ```
   */
  static createWithOAuth(config: MondayOAuthClientConfig): MondaySDK {
    const tokenManager = new OAuthTokenManager(config.accessToken, config.onTokenRefresh);
    const graphqlClient = new MondayGraphQLClient(tokenManager, config);
    return new MondaySDK(graphqlClient);
  }

  /**
   * Create SDK instance with short-lived token
   *
   * Use this for seamless authentication when your app receives
   * short-lived tokens from Monday.com (valid for 1 minute).
   *
   * @example
   * ```typescript
   * const monday = MondaySDK.createWithShortLivedToken({
   *   shortLivedToken: 'short-lived-token',
   *   validityInMinutes: 1
   * });
   * ```
   */
  static createWithShortLivedToken(config: MondayShortLivedTokenConfig): MondaySDK {
    const tokenManager = new ShortLivedTokenManager(
      config.shortLivedToken,
      config.validityInMinutes
    );
    const graphqlClient = new MondayGraphQLClient(tokenManager, config);
    return new MondaySDK(graphqlClient);
  }

  /**
   * Execute a raw GraphQL query
   *
   * Use this for custom queries not covered by the SDK clients.
   *
   * @example
   * ```typescript
   * const result = await monday.query(`
   *   query {
   *     boards(limit: 10) {
   *       id
   *       name
   *     }
   *   }
   * `);
   * ```
   */
  async query<T = unknown>(query: string, variables?: Record<string, unknown>): Promise<T> {
    return this.graphqlClient.query<T>(query, variables);
  }

  /**
   * Execute a raw GraphQL mutation
   *
   * Use this for custom mutations not covered by the SDK clients.
   *
   * @example
   * ```typescript
   * const result = await monday.mutate(`
   *   mutation ($board_id: ID!, $item_name: String!) {
   *     create_item(board_id: $board_id, item_name: $item_name) {
   *       id
   *       name
   *     }
   *   }
   * `, { board_id: 123456, item_name: "New Task" });
   * ```
   */
  async mutate<T = unknown>(mutation: string, variables?: Record<string, unknown>): Promise<T> {
    return this.graphqlClient.mutate<T>(mutation, variables);
  }
}
