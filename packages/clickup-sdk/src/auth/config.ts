export const CLICKUP_API_BASE_URL = "https://api.clickup.com/api/v2";

export const CLICKUP_OAUTH_ENDPOINTS = {
  authorize: "https://app.clickup.com/api",
  token: "https://api.clickup.com/api/v2/oauth/token",
};

export interface ClickUpConfig {
  baseUrl?: string;
}

export function getBaseUrl(config?: ClickUpConfig): string {
  return config?.baseUrl || CLICKUP_API_BASE_URL;
}
