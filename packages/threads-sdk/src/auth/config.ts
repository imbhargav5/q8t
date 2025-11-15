export interface ThreadsAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: ThreadsScope[];
}

export type ThreadsScope =
  | "threads_basic"
  | "threads_content_publish"
  | "threads_manage_insights"
  | "threads_manage_replies"
  | "threads_read_replies";

export const THREADS_AUTH_ENDPOINTS = {
  authorize: "https://threads.net/oauth/authorize",
  token: "https://graph.threads.net/oauth/access_token",
  refresh: "https://graph.threads.net/refresh_access_token",
} as const;

export const THREADS_API_BASE_URL = "https://graph.threads.net/v1.0";
