export interface TikTokAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: TikTokScope[];
}

export type TikTokScope =
  | "user.info.basic"
  | "user.info.profile"
  | "user.info.stats"
  | "video.list"
  | "video.upload";

export const TIKTOK_AUTH_ENDPOINTS = {
  authorize: "https://www.tiktok.com/v2/auth/authorize/",
  token: "https://open.tiktokapis.com/v2/oauth/token/",
} as const;

export const TIKTOK_API_BASE_URL = "https://open.tiktokapis.com/v2";
