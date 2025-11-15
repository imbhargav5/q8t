export interface PinterestAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: PinterestScope[];
}

export type PinterestScope =
  | "boards:read"
  | "boards:write"
  | "pins:read"
  | "pins:write"
  | "user_accounts:read";

export const PINTEREST_AUTH_ENDPOINTS = {
  authorize: "https://www.pinterest.com/oauth/",
  token: "https://api.pinterest.com/v5/oauth/token",
} as const;

export const PINTEREST_API_BASE_URL = "https://api.pinterest.com/v5";
