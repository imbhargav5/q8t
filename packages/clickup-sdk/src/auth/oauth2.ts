import { CLICKUP_OAUTH_ENDPOINTS } from "./config";

export interface OAuth2Config {
  clientId: string;
  redirectUri: string;
}

export interface AuthUrlResult {
  url: string;
  state: string;
}

export interface TokenResponse {
  access_token: string;
}

export interface ExchangeCodeParams {
  clientId: string;
  clientSecret: string;
  code: string;
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
 * Generate OAuth 2.0 authorization URL
 * Direct users to this URL to authorize your application
 */
export function generateAuthUrl(config: OAuth2Config): AuthUrlResult {
  const state = generateRandomString(32);

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    state,
  });

  const url = `${CLICKUP_OAUTH_ENDPOINTS.authorize}?${params.toString()}`;

  return { url, state };
}

/**
 * Exchange authorization code for access token
 * Call this after the user is redirected back with an authorization code
 */
export async function exchangeCodeForToken(params: ExchangeCodeParams): Promise<TokenResponse> {
  const body = {
    client_id: params.clientId,
    client_secret: params.clientSecret,
    code: params.code,
  };

  const response = await fetch(CLICKUP_OAUTH_ENDPOINTS.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json() as Promise<TokenResponse>;
}
