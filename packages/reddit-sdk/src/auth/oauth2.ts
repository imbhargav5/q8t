import { REDDIT_AUTH_ENDPOINTS, type RedditAuthConfig } from "./config";

export interface AuthUrlResult {
  url: string;
  state: string;
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
  clientSecret: string;
  code: string;
  redirectUri: string;
}

export interface RefreshTokenParams {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
}

export function generateAuthUrl(config: RedditAuthConfig): AuthUrlResult {
  const state = generateRandomString(32);

  const params = new URLSearchParams({
    client_id: config.clientId,
    response_type: "code",
    state,
    redirect_uri: config.redirectUri,
    duration: config.duration || "permanent",
    scope: config.scopes.join(" "),
  });

  const url = `${REDDIT_AUTH_ENDPOINTS.authorize}?${params.toString()}`;

  return { url, state };
}

export async function exchangeCodeForToken(params: ExchangeCodeParams): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: params.code,
    redirect_uri: params.redirectUri,
  });

  const credentials = Buffer.from(`${params.clientId}:${params.clientSecret}`).toString("base64");

  const response = await fetch(REDDIT_AUTH_ENDPOINTS.token, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
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
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: params.refreshToken,
  });

  const credentials = Buffer.from(`${params.clientId}:${params.clientSecret}`).toString("base64");

  const response = await fetch(REDDIT_AUTH_ENDPOINTS.token, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token refresh failed: ${error}`);
  }

  return response.json();
}

export async function revokeToken(
  token: string,
  clientId: string,
  clientSecret: string,
  tokenType: "access_token" | "refresh_token" = "access_token"
): Promise<void> {
  const body = new URLSearchParams({
    token,
    token_type_hint: tokenType,
  });

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(REDDIT_AUTH_ENDPOINTS.revoke, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token revocation failed: ${error}`);
  }
}
