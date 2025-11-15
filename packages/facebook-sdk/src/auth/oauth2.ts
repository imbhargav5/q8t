import { FACEBOOK_AUTH_ENDPOINTS, type FacebookAuthConfig } from "./config";

export interface AuthUrlResult {
  url: string;
  state: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
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
  accessToken: string;
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

export async function generateAuthUrl(config: FacebookAuthConfig): Promise<AuthUrlResult> {
  const state = generateRandomString(32);

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scopes.join(","),
    state,
    response_type: "code",
  });

  const url = `${FACEBOOK_AUTH_ENDPOINTS.authorize}?${params.toString()}`;

  return { url, state };
}

export async function exchangeCodeForToken(params: ExchangeCodeParams): Promise<TokenResponse> {
  const queryParams = new URLSearchParams({
    client_id: params.clientId,
    client_secret: params.clientSecret,
    code: params.code,
    redirect_uri: params.redirectUri,
  });

  const response = await fetch(`${FACEBOOK_AUTH_ENDPOINTS.token}?${queryParams.toString()}`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json();
}

export async function exchangeLongLivedToken(params: RefreshTokenParams): Promise<TokenResponse> {
  const queryParams = new URLSearchParams({
    grant_type: "fb_exchange_token",
    client_id: params.clientId,
    client_secret: params.clientSecret,
    fb_exchange_token: params.accessToken,
  });

  const response = await fetch(`${FACEBOOK_AUTH_ENDPOINTS.token}?${queryParams.toString()}`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Long-lived token exchange failed: ${error}`);
  }

  return response.json();
}
