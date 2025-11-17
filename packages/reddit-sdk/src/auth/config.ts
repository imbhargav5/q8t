export interface RedditAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: RedditScope[];
  duration?: "temporary" | "permanent";
}

export type RedditScope =
  | "identity"
  | "edit"
  | "flair"
  | "history"
  | "modconfig"
  | "modflair"
  | "modlog"
  | "modposts"
  | "modwiki"
  | "mysubreddits"
  | "privatemessages"
  | "read"
  | "report"
  | "save"
  | "submit"
  | "subscribe"
  | "vote"
  | "wikiedit"
  | "wikiread";

export const REDDIT_AUTH_ENDPOINTS = {
  authorize: "https://www.reddit.com/api/v1/authorize",
  token: "https://www.reddit.com/api/v1/access_token",
  revoke: "https://www.reddit.com/api/v1/revoke_token",
} as const;

export const REDDIT_API_BASE_URL = "https://oauth.reddit.com";
