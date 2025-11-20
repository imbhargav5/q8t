import { SALESFORCE_OAUTH_ENDPOINTS, type OAuth2Config } from "./config";

export interface AuthUrlResult {
  url: string;
  state: string;
}

export interface OAuth2TokenResponse {
  access_token: string;
  refresh_token?: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
  signature: string;
}

export interface ExchangeCodeParams {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
  loginUrl?: string;
}

export interface RefreshTokenParams {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  loginUrl?: string;
}

export interface RevokeTokenParams {
  token: string;
  loginUrl?: string;
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

function getOAuthEndpoints(loginUrl?: string) {
  const isSandbox = loginUrl?.includes("test.salesforce.com");
  return isSandbox ? SALESFORCE_OAUTH_ENDPOINTS.sandbox : SALESFORCE_OAUTH_ENDPOINTS.production;
}

export function generateAuthUrl(
  config: OAuth2Config,
  scopes: string[] = ["api", "refresh_token"],
): AuthUrlResult {
  const state = generateRandomString(32);
  const endpoints = getOAuthEndpoints(config.loginUrl);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: config.clientId,
    redirect_uri: config.redirectUri || "",
    state,
    scope: scopes.join(" "),
  });

  const url = `${endpoints.authorize}?${params.toString()}`;

  return { url, state };
}

export async function exchangeCodeForToken(
  params: ExchangeCodeParams,
): Promise<OAuth2TokenResponse> {
  const endpoints = getOAuthEndpoints(params.loginUrl);

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: params.clientId,
    client_secret: params.clientSecret,
    redirect_uri: params.redirectUri,
    code: params.code,
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

  return response.json() as Promise<OAuth2TokenResponse>;
}

export async function refreshAccessToken(params: RefreshTokenParams): Promise<OAuth2TokenResponse> {
  const endpoints = getOAuthEndpoints(params.loginUrl);

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: params.clientId,
    client_secret: params.clientSecret,
    refresh_token: params.refreshToken,
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
    throw new Error(`Token refresh failed: ${error}`);
  }

  return response.json() as Promise<OAuth2TokenResponse>;
}

export async function revokeToken(params: RevokeTokenParams): Promise<void> {
  const endpoints = getOAuthEndpoints(params.loginUrl);

  const body = new URLSearchParams({
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

export async function introspectToken(token: string, instanceUrl: string): Promise<unknown> {
  const response = await fetch(`${instanceUrl}/services/oauth2/introspect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ token }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token introspection failed: ${error}`);
  }

  return response.json();
}
