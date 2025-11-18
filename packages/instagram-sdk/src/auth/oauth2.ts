import { INSTAGRAM_AUTH_ENDPOINTS, type InstagramAuthConfig } from "./config";

export interface AuthUrlResult {
  url: string;
  state: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in?: number;
}

export interface ExchangeCodeParams {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
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

export async function generateAuthUrl(config: InstagramAuthConfig): Promise<AuthUrlResult> {
  const state = generateRandomString(32);

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scopes.join(","),
    response_type: "code",
    state,
  });

  const url = `${INSTAGRAM_AUTH_ENDPOINTS.authorize}?${params.toString()}`;

  return { url, state };
}

export async function exchangeCodeForToken(params: ExchangeCodeParams): Promise<TokenResponse> {
  const body = new URLSearchParams({
    client_id: params.clientId,
    client_secret: params.clientSecret,
    grant_type: "authorization_code",
    redirect_uri: params.redirectUri,
    code: params.code,
  });

  const response = await fetch(INSTAGRAM_AUTH_ENDPOINTS.token, {
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

export async function getLongLivedToken(params: LongLivedTokenParams): Promise<TokenResponse> {
  const queryParams = new URLSearchParams({
    grant_type: "fb_exchange_token",
    client_id: params.clientId,
    client_secret: params.clientSecret,
    fb_exchange_token: params.accessToken,
  });

  const url = `${INSTAGRAM_AUTH_ENDPOINTS.token}?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Long-lived token exchange failed: ${error}`);
  }

  return response.json();
}

export async function refreshLongLivedToken(accessToken: string): Promise<TokenResponse> {
  const queryParams = new URLSearchParams({
    grant_type: "fb_exchange_token",
    fb_exchange_token: accessToken,
  });

  const url = `${INSTAGRAM_AUTH_ENDPOINTS.token}?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token refresh failed: ${error}`);
  }

  return response.json();
}
