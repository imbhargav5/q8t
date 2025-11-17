export interface YouTubeAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: YouTubeScope[];
}

export type YouTubeScope =
  | "youtube.readonly"
  | "youtube.upload"
  | "youtube"
  | "youtube.force-ssl"
  | "youtube.channel-memberships.creator"
  | "youtubepartner"
  | "youtubepartner-channel-audit";

export const YOUTUBE_AUTH_ENDPOINTS = {
  authorize: "https://accounts.google.com/o/oauth2/v2/auth",
  token: "https://oauth2.googleapis.com/token",
  revoke: "https://oauth2.googleapis.com/revoke",
} as const;

export const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

export function getScopeUrl(scope: YouTubeScope): string {
  return `https://www.googleapis.com/auth/${scope}`;
}
