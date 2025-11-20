// Asana API configuration and constants

export const ASANA_API_BASE_URL = "https://app.asana.com/api/1.0";

export const ASANA_AUTH_ENDPOINTS = {
  authorize: "https://app.asana.com/-/oauth_authorize",
  token: "https://app.asana.com/-/oauth_token",
  refresh: "https://app.asana.com/-/oauth_token",
} as const;

export interface AsanaOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes?: string[];
}

export interface AsanaPATConfig {
  personalAccessToken: string;
}

export type AsanaAuthConfig = AsanaOAuthConfig | AsanaPATConfig;

// OAuth scopes available in Asana API
export const ASANA_SCOPES = {
  DEFAULT: "default",
  OPENID: "openid",
  EMAIL: "email",
  PROFILE: "profile",
  ATTACHMENTS_READ: "attachments:read",
  ATTACHMENTS_WRITE: "attachments:write",
  ATTACHMENTS_DELETE: "attachments:delete",
  CUSTOM_FIELDS_READ: "custom_fields:read",
  CUSTOM_FIELDS_WRITE: "custom_fields:write",
  GOALS_READ: "goals:read",
  GOALS_WRITE: "goals:write",
  MEMBERSHIPS_READ: "memberships:read",
  MEMBERSHIPS_WRITE: "memberships:write",
  PORTFOLIOS_READ: "portfolios:read",
  PORTFOLIOS_WRITE: "portfolios:write",
  PROJECTS_READ: "projects:read",
  PROJECTS_WRITE: "projects:write",
  SECTIONS_READ: "sections:read",
  SECTIONS_WRITE: "sections:write",
  STORIES_READ: "stories:read",
  STORIES_WRITE: "stories:write",
  TAGS_READ: "tags:read",
  TAGS_WRITE: "tags:write",
  TASKS_READ: "tasks:read",
  TASKS_WRITE: "tasks:write",
  TEAMS_READ: "teams:read",
  TEAMS_WRITE: "teams:write",
  USERS_READ: "users:read",
  WORKSPACES_READ: "workspaces:read",
} as const;
