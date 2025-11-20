// Main entry point for @q8t/tiktok-sdk

// Main SDK class and utilities
export { TikTokSDK } from "./tiktok-sdk";

// Export all API classes
export { UserOAuthApi, ClientCredentialsApi, BusinessApi } from "./tiktok-sdk";

// Export authentication utilities
export * from "./auth";

// Export types
export type {
  UserOAuthClientConfig,
  ClientCredentialsConfig,
  BusinessAPIClientConfig,
} from "./tiktok-sdk";

export * as UserOAuthTypes from "../lib/user-oauth/types";
export * as ClientCredentialsTypes from "../lib/client-credentials/types";
export * as BusinessTypes from "../lib/business/types";

// Re-export generated APIs for direct access
export * from "../lib";
