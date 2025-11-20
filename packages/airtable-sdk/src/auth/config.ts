// Airtable API Configuration

export const AIRTABLE_API_BASE_URL = "https://api.airtable.com/v0";
export const AIRTABLE_OAUTH_BASE_URL = "https://airtable.com/oauth2/v1";

export const AIRTABLE_AUTH_ENDPOINTS = {
  authorize: `${AIRTABLE_OAUTH_BASE_URL}/authorize`,
  token: `${AIRTABLE_OAUTH_BASE_URL}/token`,
  revoke: `${AIRTABLE_OAUTH_BASE_URL}/revoke`,
} as const;

// Personal Access Token Configuration
export interface AirtablePATConfig {
  accessToken: string;
  baseUrl?: string;
}

// OAuth Configuration
export interface AirtableOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: AirtableScope[];
}

// OAuth Client Configuration (with token)
export interface AirtableOAuthClientConfig {
  accessToken: string;
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
  onTokenRefresh?: (tokens: TokenResponse) => void;
  baseUrl?: string;
}

// Available OAuth Scopes
export type AirtableScope =
  | "data.records:read"
  | "data.records:write"
  | "data.recordComments:read"
  | "data.recordComments:write"
  | "schema.bases:read"
  | "schema.bases:write"
  | "webhook:manage"
  | "user.email:read";

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in?: number;
  scope?: string;
}

export function getBaseUrl(config: { baseUrl?: string }): string {
  return config.baseUrl || AIRTABLE_API_BASE_URL;
}
