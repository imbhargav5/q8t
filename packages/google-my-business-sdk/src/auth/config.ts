export interface GMBAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: GMBScope[];
}

export type GMBScope =
  | "business.manage"
  | "plus.business.manage";

export const GMB_AUTH_ENDPOINTS = {
  authorize: "https://accounts.google.com/o/oauth2/v2/auth",
  token: "https://oauth2.googleapis.com/token",
  revoke: "https://oauth2.googleapis.com/revoke",
} as const;

export const GMB_API_BASE_URL = "https://mybusinessbusinessinformation.googleapis.com/v1";

export function scopeToGoogleScope(scope: GMBScope): string {
  const scopeMap: Record<GMBScope, string> = {
    "business.manage": "https://www.googleapis.com/auth/business.manage",
    "plus.business.manage": "https://www.googleapis.com/auth/plus.business.manage",
  };
  return scopeMap[scope];
}
