// Monday.com API configuration

export const MONDAY_API_BASE_URL = "https://api.monday.com/v2";
export const MONDAY_OAUTH_BASE_URL = "https://auth.monday.com/oauth2";

export interface MondayConfig {
  apiVersion?: string;
  timeout?: number;
}

export interface MondayOAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: string[];
}

export const DEFAULT_SCOPES = [
  "boards:read",
  "boards:write",
  "users:read",
  "workspaces:read",
  "workspaces:write",
];

export function getApiUrl(config?: MondayConfig): string {
  return MONDAY_API_BASE_URL;
}
