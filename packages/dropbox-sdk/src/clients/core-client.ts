import { DROPBOX_API_BASE_URL } from "../auth/config";
import { refreshAccessToken } from "../auth/oauth2";
import { type HttpClient, makeRequest } from "./http-client";

export interface CoreClientConfig {
  accessToken: string;
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
  onTokenRefresh?: (tokens: { accessToken: string; refreshToken?: string }) => void;
}

export function createCoreClient(config: CoreClientConfig): HttpClient {
  let accessToken = config.accessToken;
  let refreshToken = config.refreshToken;

  async function makeAuthenticatedRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    const authHeader = `Bearer ${accessToken}`;

    try {
      return await makeRequest<T>(method, DROPBOX_API_BASE_URL, path, authHeader, body, params);
    } catch (error: unknown) {
      // Handle token refresh on 401
      const err = error as { message?: string };
      if (err.message?.includes("401") && refreshToken && config.clientId && config.clientSecret) {
        try {
          const newTokens = await refreshAccessToken({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            refreshToken: refreshToken,
          });

          accessToken = newTokens.access_token;
          if (newTokens.refresh_token) {
            refreshToken = newTokens.refresh_token;
          }

          if (config.onTokenRefresh) {
            config.onTokenRefresh({
              accessToken: newTokens.access_token,
              refreshToken: newTokens.refresh_token,
            });
          }

          // Retry the request with new token
          const newAuthHeader = `Bearer ${accessToken}`;
          return await makeRequest<T>(
            method,
            DROPBOX_API_BASE_URL,
            path,
            newAuthHeader,
            body,
            params,
          );
        } catch (refreshError) {
          throw new Error("Token refresh failed");
        }
      }

      throw error;
    }
  }

  return {
    get<T>(
      path: string,
      params?: Record<string, string | number | boolean | undefined>,
    ): Promise<T> {
      return makeAuthenticatedRequest<T>("GET", path, undefined, params);
    },

    post<T>(
      path: string,
      body?: unknown,
      params?: Record<string, string | number | boolean | undefined>,
    ): Promise<T> {
      return makeAuthenticatedRequest<T>("POST", path, body, params);
    },

    put<T>(
      path: string,
      body?: unknown,
      params?: Record<string, string | number | boolean | undefined>,
    ): Promise<T> {
      return makeAuthenticatedRequest<T>("PUT", path, body, params);
    },

    delete<T>(
      path: string,
      params?: Record<string, string | number | boolean | undefined>,
    ): Promise<T> {
      return makeAuthenticatedRequest<T>("DELETE", path, undefined, params);
    },
  };
}
