import {
  DROPBOX_OAUTH_AUTHORIZE_URL,
  DROPBOX_OAUTH_TOKEN_URL,
  type DropboxAuthConfig,
} from "./config";

export interface OAuth2Tokens {
  access_token: string;
  token_type: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  uid?: string;
  account_id?: string;
}

/**
 * Generate OAuth 2.0 authorization URL
 */
export function generateAuthUrl(config: DropboxAuthConfig): { url: string; state: string } {
  const state = generateRandomString(32);

  const params = new URLSearchParams({
    client_id: config.clientId,
    response_type: "code",
    redirect_uri: config.redirectUri,
    state,
    token_access_type: "offline", // Request offline access for refresh token
  });

  if (config.scopes && config.scopes.length > 0) {
    params.append("scope", config.scopes.join(" "));
  }

  return {
    url: `${DROPBOX_OAUTH_AUTHORIZE_URL}?${params.toString()}`,
    state,
  };
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(params: {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
}): Promise<OAuth2Tokens> {
  const body = new URLSearchParams({
    code: params.code,
    grant_type: "authorization_code",
    client_id: params.clientId,
    client_secret: params.clientSecret,
    redirect_uri: params.redirectUri,
  });

  const response = await fetch(DROPBOX_OAUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to exchange code for token: ${errorText}`);
  }

  return response.json() as Promise<OAuth2Tokens>;
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(params: {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}): Promise<OAuth2Tokens> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: params.refreshToken,
    client_id: params.clientId,
    client_secret: params.clientSecret,
  });

  const response = await fetch(DROPBOX_OAUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to refresh token: ${errorText}`);
  }

  return response.json() as Promise<OAuth2Tokens>;
}

/**
 * Revoke access token
 */
export async function revokeToken(accessToken: string): Promise<void> {
  const response = await fetch("https://api.dropboxapi.com/2/auth/token/revoke", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to revoke token: ${errorText}`);
  }
}

/**
 * Generate a cryptographically secure random string
 */
function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  const randomValues = new Uint8Array(length);

  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(randomValues);
    for (let i = 0; i < length; i++) {
      result += chars[randomValues[i] % chars.length];
    }
  } else {
    // Fallback for Node.js
    const nodeCrypto = require("node:crypto");
    const randomBytes = nodeCrypto.randomBytes(length);
    for (let i = 0; i < length; i++) {
      result += chars[randomBytes[i] % chars.length];
    }
  }

  return result;
}
