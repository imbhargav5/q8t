export const DROPBOX_API_BASE_URL = "https://api.dropboxapi.com/2";
export const DROPBOX_CONTENT_BASE_URL = "https://content.dropboxapi.com/2";
export const DROPBOX_OAUTH_AUTHORIZE_URL = "https://www.dropbox.com/oauth2/authorize";
export const DROPBOX_OAUTH_TOKEN_URL = "https://api.dropboxapi.com/oauth2/token";

export interface DropboxAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes?: string[];
}

export interface DropboxOAuth2Config {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

export interface DropboxAppAuthConfig {
  appKey: string;
  appSecret: string;
}
