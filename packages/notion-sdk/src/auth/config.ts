// Notion API Configuration

export const NOTION_API_VERSION = "2022-06-28";
export const NOTION_API_BASE_URL = "https://api.notion.com/v1";

/**
 * Configuration for Notion API clients
 */
export interface NotionConfig {
  /**
   * Notion API version header
   * @default "2022-06-28"
   */
  apiVersion?: string;

  /**
   * Custom base URL (useful for testing)
   * @default "https://api.notion.com/v1"
   */
  baseUrl?: string;
}

/**
 * Configuration for Bearer Token (Internal Integration) authentication
 */
export interface BearerTokenConfig extends NotionConfig {
  /**
   * Internal integration token from Notion integration settings
   */
  token: string;
}

/**
 * Configuration for OAuth 2.0 (Public Integration) authentication
 */
export interface OAuthConfig extends NotionConfig {
  /**
   * OAuth client ID from Notion integration settings
   */
  clientId: string;

  /**
   * OAuth client secret from Notion integration settings
   */
  clientSecret: string;

  /**
   * Redirect URI registered with your Notion integration
   */
  redirectUri: string;

  /**
   * OAuth scopes (Notion doesn't use scopes, but included for completeness)
   */
  scopes?: string[];
}

/**
 * OAuth token response from Notion
 */
export interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  bot_id: string;
  workspace_id: string;
  workspace_name: string;
  workspace_icon?: string;
  owner: {
    type: string;
    user?: {
      object: string;
      id: string;
    };
  };
  duplicated_template_id?: string;
  refresh_token?: string;
}

export function getBaseUrl(config: NotionConfig): string {
  return config.baseUrl || NOTION_API_BASE_URL;
}

export function getApiVersion(config: NotionConfig): string {
  return config.apiVersion || NOTION_API_VERSION;
}
