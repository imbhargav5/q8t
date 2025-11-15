export interface BlueskyAuthConfig {
  identifier: string;
  password: string;
  service?: string;
}

export const BLUESKY_ENDPOINTS = {
  createSession: "https://bsky.social/xrpc/com.atproto.server.createSession",
  refreshSession: "https://bsky.social/xrpc/com.atproto.server.refreshSession",
  deleteSession: "https://bsky.social/xrpc/com.atproto.server.deleteSession",
} as const;

export const BLUESKY_API_BASE_URL = "https://bsky.social/xrpc";
