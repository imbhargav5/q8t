import { SALESFORCE_OAUTH_ENDPOINTS, type UsernamePasswordConfig } from "./config";

export interface UsernamePasswordTokenResponse {
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

export async function getUsernamePasswordToken(
  config: UsernamePasswordConfig,
): Promise<UsernamePasswordTokenResponse> {
  const endpoints = getOAuthEndpoints(config.loginUrl);

  // Combine password and security token if provided
  const password = config.securityToken
    ? `${config.password}${config.securityToken}`
    : config.password;

  const body = new URLSearchParams({
    grant_type: "password",
    client_id: config.clientId,
    client_secret: config.clientSecret,
    username: config.username,
    password: password,
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
    throw new Error(`Username/password authentication failed: ${error}`);
  }

  return response.json() as Promise<UsernamePasswordTokenResponse>;
}
