export interface XAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: XScope[];
}

export type XScope =
  | "tweet.read"
  | "tweet.write"
  | "tweet.moderate.write"
  | "users.read"
  | "follows.read"
  | "follows.write"
  | "offline.access"
  | "space.read"
  | "mute.read"
  | "mute.write"
  | "like.read"
  | "like.write"
  | "list.read"
  | "list.write"
  | "block.read"
  | "block.write"
  | "bookmark.read"
  | "bookmark.write";

export const X_AUTH_ENDPOINTS = {
  authorize: "https://twitter.com/i/oauth2/authorize",
  token: "https://api.twitter.com/2/oauth2/token",
  revoke: "https://api.twitter.com/2/oauth2/revoke",
} as const;

export const X_API_BASE_URL = "https://api.twitter.com/2";
