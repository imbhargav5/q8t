import type { MastodonAuthConfig, AppRegistrationParams, AppRegistrationResponse } from "./config";
import { getMastodonAuthEndpoints, getMastodonApiBaseUrl } from "./config";

export interface AuthUrlResult {
  url: string;
  state: string;
  codeVerifier: string; // PKCE code verifier
  codeChallenge: string; // PKCE code challenge
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  created_at: number;
}

export interface ExchangeCodeParams {
  instanceUrl: string;
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
  codeVerifier: string; // PKCE code verifier
}

export interface RevokeTokenParams {
  instanceUrl: string;
  clientId: string;
  clientSecret: string;
  token: string;
}

// Generate random string for state and PKCE code verifier
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

// Generate PKCE code challenge from code verifier
async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);

  // Convert to base64url
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

/**
 * Register an application with a Mastodon instance
 * This must be done before initiating OAuth flow
 */
export async function registerApplication(
  instanceUrl: string,
  params: AppRegistrationParams,
): Promise<AppRegistrationResponse> {
  const baseUrl = getMastodonApiBaseUrl(instanceUrl);
  const url = `${baseUrl}/v1/apps`;

  const body = {
    client_name: params.clientName,
    redirect_uris: params.redirectUris,
    scopes: params.scopes.join(" "),
    website: params.website,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Application registration failed: ${error}`);
  }

  return response.json() as Promise<AppRegistrationResponse>;
}

/**
 * Generate OAuth authorization URL with PKCE
 * Returns URL to redirect user to, along with state and PKCE parameters
 * Store codeVerifier securely - you'll need it to exchange the code for a token
 */
export async function generateAuthUrl(config: MastodonAuthConfig): Promise<AuthUrlResult> {
  const state = generateRandomString(32);
  const codeVerifier = generateRandomString(128); // PKCE code verifier (43-128 chars)
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const endpoints = getMastodonAuthEndpoints(config.instanceUrl);

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scopes.join(" "),
    response_type: "code",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256", // Only S256 is supported by Mastodon
  });

  const url = `${endpoints.authorize}?${params.toString()}`;

  return { url, state, codeVerifier, codeChallenge };
}

/**
 * Exchange authorization code for access token
 * Use the codeVerifier that was generated with the auth URL
 */
export async function exchangeCodeForToken(params: ExchangeCodeParams): Promise<TokenResponse> {
  const endpoints = getMastodonAuthEndpoints(params.instanceUrl);

  const body = new URLSearchParams({
    client_id: params.clientId,
    client_secret: params.clientSecret,
    grant_type: "authorization_code",
    redirect_uri: params.redirectUri,
    code: params.code,
    code_verifier: params.codeVerifier, // PKCE code verifier
  });

  const response = await fetch(endpoints.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
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
 * Obtain token using client credentials flow
 * This is limited to read scope only and is for applications that don't act on behalf of users
 */
export async function getClientCredentialsToken(
  instanceUrl: string,
  clientId: string,
  clientSecret: string,
): Promise<TokenResponse> {
  const endpoints = getMastodonAuthEndpoints(instanceUrl);

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
    scope: "read", // Only read scope is supported for client credentials
  });

  const response = await fetch(endpoints.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Client credentials token request failed: ${error}`);
  }

  return response.json() as Promise<TokenResponse>;
}

/**
 * Revoke an access token
 */
export async function revokeToken(params: RevokeTokenParams): Promise<void> {
  const endpoints = getMastodonAuthEndpoints(params.instanceUrl);

  const body = new URLSearchParams({
    client_id: params.clientId,
    client_secret: params.clientSecret,
    token: params.token,
  });

  const response = await fetch(endpoints.revoke, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token revocation failed: ${error}`);
  }
}

/**
 * Verify an access token by checking app credentials
 */
export async function verifyToken(
  instanceUrl: string,
  accessToken: string,
): Promise<AppRegistrationResponse> {
  const baseUrl = getMastodonApiBaseUrl(instanceUrl);
  const url = `${baseUrl}/v1/apps/verify_credentials`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token verification failed: ${error}`);
  }

  return response.json() as Promise<AppRegistrationResponse>;
}
