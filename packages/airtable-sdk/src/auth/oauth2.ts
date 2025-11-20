import {
  AIRTABLE_AUTH_ENDPOINTS,
  type AirtableOAuthConfig,
  type TokenResponse,
} from "./config";

export interface AuthUrlResult {
  url: string;
  state: string;
  codeVerifier?: string;
}

export interface ExchangeCodeParams {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
  codeVerifier?: string;
}

export interface RefreshTokenParams {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

export interface RevokeTokenParams {
  clientId: string;
  clientSecret: string;
  token: string;
}

/**
 * Generate a cryptographically secure random string
 */
function generateRandomString(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
}

/**
 * Generate base64url encoded SHA-256 hash
 */
async function sha256Base64Url(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64 = btoa(String.fromCharCode(...hashArray));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Generate OAuth authorization URL with PKCE support
 */
export async function generateAuthUrl(
  config: AirtableOAuthConfig,
  options?: { usePKCE?: boolean }
): Promise<AuthUrlResult> {
  const state = generateRandomString(32);
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    state,
    scope: config.scopes.join(" "),
  });

  let codeVerifier: string | undefined;

  // Add PKCE if requested
  if (options?.usePKCE) {
    codeVerifier = generateRandomString(64);
    const codeChallenge = await sha256Base64Url(codeVerifier);
    params.append("code_challenge", codeChallenge);
    params.append("code_challenge_method", "S256");
  }

  const url = `${AIRTABLE_AUTH_ENDPOINTS.authorize}?${params.toString()}`;

  return { url, state, codeVerifier };
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(
  params: ExchangeCodeParams
): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: params.clientId,
    client_secret: params.clientSecret,
    redirect_uri: params.redirectUri,
    code: params.code,
  });

  // Add PKCE code verifier if provided
  if (params.codeVerifier) {
    body.append("code_verifier", params.codeVerifier);
  }

  const response = await fetch(AIRTABLE_AUTH_ENDPOINTS.token, {
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
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(
  params: RefreshTokenParams
): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: params.clientId,
    client_secret: params.clientSecret,
    refresh_token: params.refreshToken,
  });

  const response = await fetch(AIRTABLE_AUTH_ENDPOINTS.token, {
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

  return response.json() as Promise<TokenResponse>;
}

/**
 * Revoke access or refresh token
 */
export async function revokeToken(params: RevokeTokenParams): Promise<void> {
  const body = new URLSearchParams({
    client_id: params.clientId,
    client_secret: params.clientSecret,
    token: params.token,
  });

  const response = await fetch(AIRTABLE_AUTH_ENDPOINTS.revoke, {
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
