// OAuth 2.0 authentication utilities for Asana API

import { ASANA_AUTH_ENDPOINTS, type AsanaOAuthConfig } from "./config";

export interface AuthUrlResult {
  url: string;
  state: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in?: number;
  refresh_token?: string;
  data?: {
    id: string;
    gid: string;
    name: string;
    email: string;
  };
}

export interface ExchangeCodeParams {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
}

export interface RefreshTokenParams {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

/**
 * Generates a cryptographically secure random string for OAuth state parameter
 */
function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
}

/**
 * Generates an OAuth authorization URL for Asana
 *
 * @param config - OAuth configuration with client ID, redirect URI, and scopes
 * @returns Authorization URL and state parameter
 *
 * @example
 * ```typescript
 * const { url, state } = generateAuthUrl({
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 *   redirectUri: 'https://your-app.com/callback',
 *   scopes: ['default']
 * });
 *
 * // Store state for validation
 * // Redirect user to url
 * ```
 */
export function generateAuthUrl(config: AsanaOAuthConfig): AuthUrlResult {
  const state = generateRandomString(32);
  const scopes = config.scopes || ["default"];

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    state,
    scope: scopes.join(" "),
  });

  const url = `${ASANA_AUTH_ENDPOINTS.authorize}?${params.toString()}`;

  return { url, state };
}

/**
 * Exchanges an authorization code for an access token
 *
 * @param params - Parameters including client credentials and authorization code
 * @returns Token response with access token and optional refresh token
 *
 * @example
 * ```typescript
 * const tokens = await exchangeCodeForToken({
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 *   code: 'authorization-code',
 *   redirectUri: 'https://your-app.com/callback'
 * });
 *
 * console.log('Access token:', tokens.access_token);
 * ```
 */
export async function exchangeCodeForToken(params: ExchangeCodeParams): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: params.clientId,
    client_secret: params.clientSecret,
    redirect_uri: params.redirectUri,
    code: params.code,
  });

  const response = await fetch(ASANA_AUTH_ENDPOINTS.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json() as Promise<TokenResponse>;
}

/**
 * Refreshes an access token using a refresh token
 *
 * @param params - Parameters including client credentials and refresh token
 * @returns New token response with fresh access token
 *
 * @example
 * ```typescript
 * const newTokens = await refreshAccessToken({
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 *   refreshToken: 'your-refresh-token'
 * });
 *
 * console.log('New access token:', newTokens.access_token);
 * ```
 */
export async function refreshAccessToken(params: RefreshTokenParams): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: params.clientId,
    client_secret: params.clientSecret,
    refresh_token: params.refreshToken,
  });

  const response = await fetch(ASANA_AUTH_ENDPOINTS.refresh, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token refresh failed: ${error}`);
  }

  return response.json() as Promise<TokenResponse>;
}
