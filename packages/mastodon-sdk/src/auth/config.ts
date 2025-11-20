export interface MastodonAuthConfig {
  instanceUrl: string; // e.g., "mastodon.social", "mas.to"
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: MastodonScope[];
}

// High-level scopes
export type MastodonScope =
  | "profile" // Minimal authenticated user information
  | "read" // Read data
  | "write" // Write data
  | "push" // Web Push API subscriptions
  | "follow" // Deprecated - manage relationships
  // Granular read scopes
  | "read:accounts"
  | "read:blocks"
  | "read:bookmarks"
  | "read:favourites"
  | "read:filters"
  | "read:follows"
  | "read:lists"
  | "read:mutes"
  | "read:notifications"
  | "read:search"
  | "read:statuses"
  // Granular write scopes
  | "write:accounts"
  | "write:blocks"
  | "write:bookmarks"
  | "write:conversations"
  | "write:favourites"
  | "write:filters"
  | "write:follows"
  | "write:lists"
  | "write:media"
  | "write:mutes"
  | "write:notifications"
  | "write:reports"
  | "write:statuses"
  // Admin read scopes
  | "admin:read"
  | "admin:read:accounts"
  | "admin:read:reports"
  | "admin:read:domain_allows"
  | "admin:read:domain_blocks"
  | "admin:read:ip_blocks"
  | "admin:read:email_domain_blocks"
  | "admin:read:canonical_email_blocks"
  // Admin write scopes
  | "admin:write"
  | "admin:write:accounts"
  | "admin:write:reports"
  | "admin:write:domain_allows"
  | "admin:write:domain_blocks"
  | "admin:write:ip_blocks"
  | "admin:write:email_domain_blocks"
  | "admin:write:canonical_email_blocks";

export function getMastodonAuthEndpoints(instanceUrl: string) {
  const baseUrl = instanceUrl.startsWith("http") ? instanceUrl : `https://${instanceUrl}`;

  return {
    authorize: `${baseUrl}/oauth/authorize`,
    token: `${baseUrl}/oauth/token`,
    revoke: `${baseUrl}/oauth/revoke`,
    serverMetadata: `${baseUrl}/.well-known/oauth-authorization-server`,
  };
}

export function getMastodonApiBaseUrl(instanceUrl: string): string {
  const baseUrl = instanceUrl.startsWith("http") ? instanceUrl : `https://${instanceUrl}`;

  return `${baseUrl}/api`;
}

export interface AppRegistrationParams {
  clientName: string;
  redirectUris: string;
  scopes: MastodonScope[];
  website?: string;
}

export interface AppRegistrationResponse {
  id: string;
  name: string;
  website: string | null;
  redirect_uri: string;
  client_id: string;
  client_secret: string;
  vapid_key: string;
}
