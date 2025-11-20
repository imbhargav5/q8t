// Core configuration and OAuth utilities
export * from "./config";
export * from "./oauth2";

// User OAuth Client (Display API, Content Posting API)
export { createUserOAuthClient, type UserOAuthClientConfig } from "./user-oauth-client";

// Client Credentials Client (Research API, Commercial Content API)
export {
  createClientCredentialsClient,
  getClientCredentialsToken,
  type ClientCredentialsConfig,
  type ClientCredentialsTokenResponse
} from "./client-credentials-client";

// Business API Client (Marketing/Advertising API)
export {
  createBusinessAPIClient,
  exchangeBusinessAuthCode,
  type BusinessAPIClientConfig,
  type BusinessAPITokenResponse
} from "./business-api-client";

// HttpClient interface (from client.ts)
export type { HttpClient } from "./client";
