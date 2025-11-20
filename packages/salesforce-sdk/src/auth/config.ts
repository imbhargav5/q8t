export interface SalesforceAuthConfig {
  instanceUrl: string;
  apiVersion?: string;
}

export interface OAuth2Config extends SalesforceAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri?: string;
  loginUrl?: string;
}

export interface JWTConfig extends SalesforceAuthConfig {
  clientId: string;
  username: string;
  privateKey: string;
  loginUrl?: string;
}

export interface SessionIdConfig extends SalesforceAuthConfig {
  sessionId: string;
}

export interface UsernamePasswordConfig extends SalesforceAuthConfig {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  securityToken?: string;
  loginUrl?: string;
}

export const SALESFORCE_OAUTH_ENDPOINTS = {
  production: {
    authorize: "https://login.salesforce.com/services/oauth2/authorize",
    token: "https://login.salesforce.com/services/oauth2/token",
    revoke: "https://login.salesforce.com/services/oauth2/revoke",
    introspect: "https://login.salesforce.com/services/oauth2/introspect",
  },
  sandbox: {
    authorize: "https://test.salesforce.com/services/oauth2/authorize",
    token: "https://test.salesforce.com/services/oauth2/token",
    revoke: "https://test.salesforce.com/services/oauth2/revoke",
    introspect: "https://test.salesforce.com/services/oauth2/introspect",
  },
};

export const DEFAULT_API_VERSION = "65.0";
