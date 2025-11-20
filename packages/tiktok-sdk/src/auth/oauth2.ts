import { TIKTOK_AUTH_ENDPOINTS, type TikTokAuthConfig } from "./config";

/**
 * Result from generating an authorization URL
 *
 * @public
 */
export interface AuthUrlResult {
  /**
   * Complete authorization URL to redirect the user to
   */
  url: string;

  /**
   * State parameter for CSRF protection (store this to verify callback)
   */
  state: string;

  /**
   * Code verifier for PKCE flow (store this to exchange code for token)
   */
  codeVerifier: string;
}

/**
 * OAuth token response from TikTok
 *
 * @public
 */
export interface TokenResponse {
  /**
   * Access token for making API requests
   */
  access_token: string;

  /**
   * Type of token (always "Bearer")
   */
  token_type: string;

  /**
   * Token expiration time in seconds (typically 86400 = 24 hours)
   */
  expires_in: number;

  /**
   * Refresh token for obtaining new access tokens
   */
  refresh_token?: string;

  /**
   * Granted scopes (comma-separated)
   */
  scope: string;

  /**
   * User's unique TikTok identifier
   */
  open_id?: string;
}

/**
 * Parameters for exchanging authorization code for tokens
 *
 * @public
 */
export interface ExchangeCodeParams {
  /**
   * TikTok application client ID
   */
  clientId: string;

  /**
   * TikTok application client secret (optional for PKCE)
   */
  clientSecret?: string;

  /**
   * Authorization code received in callback
   */
  code: string;

  /**
   * Redirect URI that must match the one used in authorization
   */
  redirectUri: string;

  /**
   * Code verifier from PKCE flow (same as used to generate code challenge)
   */
  codeVerifier: string;
}

/**
 * Parameters for refreshing an access token
 *
 * @public
 */
export interface RefreshTokenParams {
  /**
   * TikTok application client ID
   */
  clientId: string;

  /**
   * TikTok application client secret (optional)
   */
  clientSecret?: string;

  /**
   * Refresh token obtained from previous authorization
   */
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

/**
 * Generates an authorization URL for the OAuth 2.0 flow with PKCE
 *
 * This is the first step in the user authentication flow. The user should be
 * redirected to the returned URL to grant permissions to your application.
 *
 * **IMPORTANT:** Store the returned `state` and `codeVerifier` values securely.
 * You'll need them to verify the callback and exchange the authorization code for tokens.
 *
 * @param config - OAuth configuration with client ID, redirect URI, and scopes
 * @returns Promise resolving to authorization URL, state, and code verifier
 *
 * @example
 * ```typescript
 * const { url, state, codeVerifier } = await generateAuthUrl({
 *   clientId: "YOUR_CLIENT_KEY",
 *   clientSecret: "YOUR_CLIENT_SECRET",
 *   redirectUri: "https://your-app.com/callback",
 *   scopes: ["user.info.basic", "video.list"]
 * });
 *
 * // Store state and codeVerifier in session
 * session.set('oauth_state', state);
 * session.set('code_verifier', codeVerifier);
 *
 * // Redirect user to TikTok authorization page
 * response.redirect(url);
 * ```
 *
 * @public
 */
export async function generateAuthUrl(config: TikTokAuthConfig): Promise<AuthUrlResult> {
  const state = generateRandomString(32);
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const params = new URLSearchParams({
    client_key: config.clientId,
    response_type: "code",
    scope: config.scopes.join(","),
    redirect_uri: config.redirectUri,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  const url = `${TIKTOK_AUTH_ENDPOINTS.authorize}?${params.toString()}`;

  return { url, state, codeVerifier };
}

/**
 * Exchanges an authorization code for access and refresh tokens
 *
 * This is the second step in the OAuth flow, called in your redirect URI handler
 * after the user has authorized your application.
 *
 * @param params - Parameters including authorization code and code verifier
 * @returns Promise resolving to access token, refresh token, and user info
 * @throws Error if the token exchange fails
 *
 * @example
 * ```typescript
 * // In your callback handler at /callback
 * const code = request.query.code;
 * const state = request.query.state;
 *
 * // Verify state matches what you stored
 * if (state !== session.get('oauth_state')) {
 *   throw new Error('Invalid state parameter');
 * }
 *
 * const tokens = await exchangeCodeForToken({
 *   clientId: "YOUR_CLIENT_KEY",
 *   clientSecret: "YOUR_CLIENT_SECRET",
 *   code: code,
 *   redirectUri: "https://your-app.com/callback",
 *   codeVerifier: session.get('code_verifier')
 * });
 *
 * // Save tokens to database
 * saveUserTokens(tokens.access_token, tokens.refresh_token, tokens.open_id);
 * ```
 *
 * @public
 */
export async function exchangeCodeForToken(params: ExchangeCodeParams): Promise<TokenResponse> {
  const body = new URLSearchParams({
    client_key: params.clientId,
    grant_type: "authorization_code",
    code: params.code,
    redirect_uri: params.redirectUri,
    code_verifier: params.codeVerifier,
  });

  if (params.clientSecret) {
    body.append("client_secret", params.clientSecret);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const response = await fetch(TIKTOK_AUTH_ENDPOINTS.token, {
    method: "POST",
    headers,
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json() as Promise<TokenResponse>;
}

/**
 * Refreshes an expired access token using a refresh token
 *
 * Access tokens expire after 24 hours. Use this function to obtain a new access token
 * without requiring the user to re-authorize your application.
 *
 * @param params - Parameters including client ID and refresh token
 * @returns Promise resolving to new access token and refresh token
 * @throws Error if the token refresh fails
 *
 * @example
 * ```typescript
 * const newTokens = await refreshAccessToken({
 *   clientId: "YOUR_CLIENT_KEY",
 *   clientSecret: "YOUR_CLIENT_SECRET",
 *   refreshToken: storedRefreshToken
 * });
 *
 * // Update stored tokens
 * updateUserTokens(userId, newTokens.access_token, newTokens.refresh_token);
 * ```
 *
 * @public
 */
export async function refreshAccessToken(params: RefreshTokenParams): Promise<TokenResponse> {
  const body = new URLSearchParams({
    client_key: params.clientId,
    grant_type: "refresh_token",
    refresh_token: params.refreshToken,
  });

  if (params.clientSecret) {
    body.append("client_secret", params.clientSecret);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const response = await fetch(TIKTOK_AUTH_ENDPOINTS.token, {
    method: "POST",
    headers,
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token refresh failed: ${error}`);
  }

  return response.json() as Promise<TokenResponse>;
}
