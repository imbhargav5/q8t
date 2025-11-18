export interface FacebookAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: FacebookScope[];
}

export type FacebookScope =
  | "public_profile"
  | "email"
  | "pages_show_list"
  | "pages_read_engagement"
  | "pages_read_user_content"
  | "pages_manage_posts"
  | "pages_manage_engagement"
  | "pages_manage_metadata"
  | "pages_messaging"
  | "instagram_basic"
  | "instagram_content_publish"
  | "instagram_manage_comments"
  | "instagram_manage_insights";

export const FACEBOOK_AUTH_ENDPOINTS = {
  authorize: "https://www.facebook.com/v18.0/dialog/oauth",
  token: "https://graph.facebook.com/v18.0/oauth/access_token",
} as const;

export const FACEBOOK_API_BASE_URL = "https://graph.facebook.com/v18.0";
