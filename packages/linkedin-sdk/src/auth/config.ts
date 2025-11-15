export interface LinkedInOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: LinkedInScope[];
}

export type LinkedInScope =
  | "r_liteprofile"
  | "r_emailaddress"
  | "w_member_social"
  | "r_organization_social"
  | "w_organization_social"
  | "rw_organization_admin";

export const LINKEDIN_AUTH_ENDPOINTS = {
  authorize: "https://www.linkedin.com/oauth/v2/authorization",
  token: "https://www.linkedin.com/oauth/v2/accessToken",
} as const;

export const LINKEDIN_API_BASE_URL = "https://api.linkedin.com/v2";

export const DEFAULT_SCOPES: LinkedInScope[] = [
  "r_liteprofile",
  "r_emailaddress",
  "w_member_social",
];
