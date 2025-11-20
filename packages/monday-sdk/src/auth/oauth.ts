// OAuth 2.0 authentication for Monday.com

import { MONDAY_OAUTH_BASE_URL, type MondayOAuthConfig } from "./config";

export interface AuthUrlResult {
  url: string;
  state: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export interface ExchangeCodeParams {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
}

function generateRandomState(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomValues = new Uint8Array(32);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < 32; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
}

/**
 * Generate OAuth 2.0 authorization URL
 */
export function generateAuthUrl(config: MondayOAuthConfig): AuthUrlResult {
  const state = generateRandomState();

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
  });

  // Add scopes if provided
  if (config.scopes && config.scopes.length > 0) {
    params.append("scope", config.scopes.join(" "));
  }

  const url = `${MONDAY_OAUTH_BASE_URL}/authorize?${params.toString()}`;

  return { url, state };
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(
  params: ExchangeCodeParams
): Promise<TokenResponse> {
  const body = new URLSearchParams({
    client_id: params.clientId,
    client_secret: params.clientSecret,
    code: params.code,
    redirect_uri: params.redirectUri,
  });

  const response = await fetch(`${MONDAY_OAUTH_BASE_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OAuth token exchange failed: ${error}`);
  }

  return response.json() as Promise<TokenResponse>;
}
