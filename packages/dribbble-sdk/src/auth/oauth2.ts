import { DRIBBBLE_AUTH_ENDPOINTS, type DribbbleAuthConfig } from "./config";

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
 * Generate OAuth2 authorization URL for Dribbble
 * @param config - Dribbble authentication configuration
 * @returns Authorization URL and state parameter
 */
export function generateAuthUrl(config: DribbbleAuthConfig): AuthUrlResult {
  const state = generateRandomString(32);

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scopes.join(" "),
    state,
  });

  const url = `${DRIBBBLE_AUTH_ENDPOINTS.authorize}?${params.toString()}`;

  return { url, state };
}

/**
 * Exchange authorization code for access token
 * @param params - Exchange parameters including code from OAuth callback
 * @returns Access token and metadata
 */
export async function exchangeCodeForToken(params: ExchangeCodeParams): Promise<TokenResponse> {
  const body = new URLSearchParams({
    client_id: params.clientId,
    client_secret: params.clientSecret,
    code: params.code,
    redirect_uri: params.redirectUri,
  });

  const response = await fetch(DRIBBBLE_AUTH_ENDPOINTS.token, {
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
