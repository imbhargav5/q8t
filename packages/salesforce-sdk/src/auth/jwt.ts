import * as jwt from "jsonwebtoken";
import { SALESFORCE_OAUTH_ENDPOINTS, type JWTConfig } from "./config";

export interface JWTTokenResponse {
  access_token: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
  signature: string;
}

function getOAuthEndpoints(loginUrl?: string) {
  const isSandbox = loginUrl?.includes("test.salesforce.com");
  return isSandbox ? SALESFORCE_OAUTH_ENDPOINTS.sandbox : SALESFORCE_OAUTH_ENDPOINTS.production;
}

export async function getJWTToken(config: JWTConfig): Promise<JWTTokenResponse> {
  const endpoints = getOAuthEndpoints(config.loginUrl);

  // Create JWT claims
  const claims = {
    iss: config.clientId,
    sub: config.username,
    aud: config.loginUrl || "https://login.salesforce.com",
    exp: Math.floor(Date.now() / 1000) + 3 * 60, // 3 minutes from now
  };

  // Sign the JWT
  const token = jwt.sign(claims, config.privateKey, {
    algorithm: "RS256",
  });

  // Exchange JWT for access token
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: token,
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
    throw new Error(`JWT token exchange failed: ${error}`);
  }

  return response.json() as Promise<JWTTokenResponse>;
}
