export interface DribbbleAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: DribbbleScope[];
}

export type DribbbleScope = "public" | "upload";

export const DRIBBBLE_AUTH_ENDPOINTS = {
  authorize: "https://dribbble.com/oauth/authorize",
  token: "https://dribbble.com/oauth/token",
} as const;

export const DRIBBBLE_API_BASE_URL = "https://api.dribbble.com/v2";

export const DRIBBBLE_RATE_LIMITS = {
  requestsPerMinute: 60,
  requestsPerDay: 1440,
} as const;
