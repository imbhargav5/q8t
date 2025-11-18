import { GMB_AUTH_ENDPOINTS, type GMBAuthConfig, scopeToGoogleScope } from "./config";

export interface AuthUrlResult {
  url: string;
  state: string;
  codeVerifier: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

export interface ExchangeCodeParams {
  clientId: string;
  clientSecret?: string;
  code: string;
  redirectUri: string;
  codeVerifier: string;
}

export interface RefreshTokenParams {
  clientId: string;
  clientSecret?: string;
  refreshToken: string;
}

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

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function generateAuthUrl(config: GMBAuthConfig): Promise<AuthUrlResult> {
  const state = generateRandomString(32);
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const googleScopes = config.scopes.map(scopeToGoogleScope).join(" ");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: googleScopes,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    access_type: "offline",
    prompt: "consent",
  });

  const url = `${GMB_AUTH_ENDPOINTS.authorize}?${params.toString()}`;

  return { url, state, codeVerifier };
}

export async function exchangeCodeForToken(params: ExchangeCodeParams): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: params.code,
    redirect_uri: params.redirectUri,
    code_verifier: params.codeVerifier,
    client_id: params.clientId,
  });

  if (params.clientSecret) {
    body.append("client_secret", params.clientSecret);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const response = await fetch(GMB_AUTH_ENDPOINTS.token, {
    method: "POST",
    headers,
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json();
}

export async function refreshAccessToken(params: RefreshTokenParams): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: params.refreshToken,
    client_id: params.clientId,
  });

  if (params.clientSecret) {
    body.append("client_secret", params.clientSecret);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const response = await fetch(GMB_AUTH_ENDPOINTS.token, {
    method: "POST",
    headers,
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token refresh failed: ${error}`);
  }

  return response.json();
}

export async function revokeToken(token: string): Promise<void> {
  const body = new URLSearchParams({
    token,
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const response = await fetch(GMB_AUTH_ENDPOINTS.revoke, {
    method: "POST",
    headers,
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token revocation failed: ${error}`);
  }
}
