export interface InstagramAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: InstagramScope[];
}

export type InstagramScope =
  | "instagram_basic"
  | "instagram_content_publish"
  | "instagram_manage_comments"
  | "instagram_manage_insights"
  | "pages_show_list"
  | "pages_read_engagement"
  | "business_management";

export const INSTAGRAM_AUTH_ENDPOINTS = {
  authorize: "https://www.facebook.com/v18.0/dialog/oauth",
  token: "https://graph.facebook.com/v18.0/oauth/access_token",
} as const;

export const INSTAGRAM_API_BASE_URL = "https://graph.facebook.com/v18.0";
