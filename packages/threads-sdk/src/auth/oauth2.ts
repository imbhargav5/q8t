import { THREADS_AUTH_ENDPOINTS, type ThreadsAuthConfig } from "./config";

export interface AuthUrlResult {
  url: string;
  state: string;
}

export interface ShortLivedTokenResponse {
  access_token: string;
  user_id: string;
}

export interface LongLivedTokenResponse {
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

export interface ExchangeTokenParams {
  clientSecret: string;
  accessToken: string;
}

export interface RefreshTokenParams {
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

export function generateAuthUrl(config: ThreadsAuthConfig): AuthUrlResult {
  const state = generateRandomString(32);

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scopes.join(","),
    response_type: "code",
    state,
  });

  const url = `${THREADS_AUTH_ENDPOINTS.authorize}?${params.toString()}`;

  return { url, state };
}

export async function exchangeCodeForToken(params: ExchangeCodeParams): Promise<ShortLivedTokenResponse> {
  const body = new URLSearchParams({
    client_id: params.clientId,
    client_secret: params.clientSecret,
    grant_type: "authorization_code",
    redirect_uri: params.redirectUri,
    code: params.code,
  });

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

  return response.json() as Promise<ShortLivedTokenResponse>;
}

export async function exchangeForLongLivedToken(params: ExchangeTokenParams): Promise<LongLivedTokenResponse> {
  const url = new URL(THREADS_AUTH_ENDPOINTS.exchange);
  url.searchParams.append("grant_type", "th_exchange_token");
  url.searchParams.append("client_secret", params.clientSecret);
  url.searchParams.append("access_token", params.accessToken);

  const response = await fetch(url.toString(), {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json() as Promise<LongLivedTokenResponse>;
}

export async function refreshAccessToken(params: RefreshTokenParams): Promise<LongLivedTokenResponse> {
  const url = new URL(THREADS_AUTH_ENDPOINTS.refresh);
  url.searchParams.append("grant_type", "th_refresh_token");
  url.searchParams.append("access_token", params.accessToken);

  const response = await fetch(url.toString(), {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token refresh failed: ${error}`);
  }

  return response.json() as Promise<LongLivedTokenResponse>;
}
