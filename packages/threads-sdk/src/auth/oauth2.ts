import { THREADS_AUTH_ENDPOINTS, type ThreadsAuthConfig } from "./config";

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
  scope?: string;
  user_id?: string;
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

export interface LongLivedTokenParams {
  clientId: string;
  clientSecret: string;
  accessToken: string;
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

export async function generateAuthUrl(config: ThreadsAuthConfig): Promise<AuthUrlResult> {
  const state = generateRandomString(32);
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scopes.join(","),
    response_type: "code",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  const url = `${THREADS_AUTH_ENDPOINTS.authorize}?${params.toString()}`;

  return { url, state, codeVerifier };
}

export async function exchangeCodeForToken(params: ExchangeCodeParams): Promise<TokenResponse> {
  const body = new URLSearchParams({
    client_id: params.clientId,
    grant_type: "authorization_code",
    code: params.code,
    redirect_uri: params.redirectUri,
    code_verifier: params.codeVerifier,
  });

  if (params.clientSecret) {
    body.append("client_secret", params.clientSecret);
  }

  const response = await fetch(THREADS_AUTH_ENDPOINTS.token, {
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

  return response.json();
}

export async function refreshAccessToken(params: RefreshTokenParams): Promise<TokenResponse> {
  const urlParams = new URLSearchParams({
    grant_type: "th_refresh_token",
    access_token: params.refreshToken,
  });

  const url = `${THREADS_AUTH_ENDPOINTS.refresh}?${urlParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token refresh failed: ${error}`);
  }

  return response.json();
}

export async function exchangeForLongLivedToken(
  params: LongLivedTokenParams
): Promise<TokenResponse> {
  const urlParams = new URLSearchParams({
    grant_type: "th_exchange_token",
    client_secret: params.clientSecret,
    access_token: params.accessToken,
  });

  const url = `${THREADS_AUTH_ENDPOINTS.token}?${urlParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Long-lived token exchange failed: ${error}`);
  }

  return response.json();
}
