// Main entry point for @q8t/monday-sdk

// Export main SDK class
export { MondaySDK } from "./sdk";
export type {
  MondayTokenConfig,
  MondayOAuthClientConfig,
  MondayShortLivedTokenConfig,
} from "./sdk";

// Export OAuth utilities
export { generateAuthUrl, exchangeCodeForToken } from "./auth/oauth";
export type { AuthUrlResult, TokenResponse, ExchangeCodeParams } from "./auth/oauth";

// Export config types
export type { MondayConfig, MondayOAuthConfig } from "./auth/config";
export { DEFAULT_SCOPES } from "./auth/config";

// Export all client types for users who want direct access
export type {
  Board,
  QueryBoardsParams,
  CreateBoardParams,
  UpdateBoardParams,
} from "./clients/boards";

export type {
  Item,
  QueryItemsParams,
  CreateItemParams,
  UpdateItemParams,
} from "./clients/items";

export type {
  Column,
  CreateColumnParams,
  ChangeColumnValueParams,
} from "./clients/columns";

export type {
  Update,
  QueryUpdatesParams,
  CreateUpdateParams,
} from "./clients/updates";

export type {
  User,
  QueryUsersParams,
} from "./clients/users";

export type {
  Workspace,
  QueryWorkspacesParams,
  CreateWorkspaceParams,
} from "./clients/workspaces";

export type {
  Webhook,
  QueryWebhooksParams,
  CreateWebhookParams,
} from "./clients/webhooks";

// Re-export clients for advanced usage
export { BoardsClient } from "./clients/boards";
export { ItemsClient } from "./clients/items";
export { ColumnsClient } from "./clients/columns";
export { UpdatesClient } from "./clients/updates";
export { UsersClient } from "./clients/users";
export { WorkspacesClient } from "./clients/workspaces";
export { WebhooksClient } from "./clients/webhooks";
