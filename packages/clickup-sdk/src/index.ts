// Main entry point for @q8t/clickup-sdk

import { PersonalTokenManager, OAuth2TokenManager } from "./auth/token";
import { ClickUpHttpClient } from "./auth/client";
import type { ClickUpConfig } from "./auth/config";
import { ClickUpApi } from "../lib/api";

// Re-export authentication utilities
export * from "./auth";

// Re-export generated API
export * from "../lib";

/**
 * Create a ClickUp SDK instance using a personal API token
 * @param token - Personal API token (starts with pk_)
 * @param config - Optional configuration
 * @returns ClickUpApi instance
 */
export function createWithToken(token: string, config?: ClickUpConfig): ClickUpApi {
  const tokenManager = new PersonalTokenManager(token);
  const httpClient = new ClickUpHttpClient(tokenManager, config);
  return new ClickUpApi(httpClient);
}

/**
 * Create a ClickUp SDK instance using OAuth 2.0
 * @param accessToken - OAuth 2.0 access token
 * @param config - Optional configuration
 * @returns ClickUpApi instance
 */
export function createWithOAuth(accessToken: string, config?: ClickUpConfig): ClickUpApi {
  const tokenManager = new OAuth2TokenManager(accessToken);
  const httpClient = new ClickUpHttpClient(tokenManager, config);
  return new ClickUpApi(httpClient);
}
