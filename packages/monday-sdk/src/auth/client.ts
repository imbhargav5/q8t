// GraphQL HTTP client for Monday.com API

import type { MondayConfig } from "./config";
import { getApiUrl } from "./config";
import type { TokenManager } from "./token";

export interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export interface GraphQLResponse<T = unknown> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
    extensions?: Record<string, unknown>;
  }>;
  account_id?: number;
}

export class MondayGraphQLClient {
  private tokenManager: TokenManager;
  private baseUrl: string;
  private timeout: number;

  constructor(tokenManager: TokenManager, config?: MondayConfig) {
    this.tokenManager = tokenManager;
    this.baseUrl = getApiUrl(config);
    this.timeout = config?.timeout ?? 30000;
  }

  async query<T = unknown>(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<T> {
    const request: GraphQLRequest = {
      query,
      variables,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.tokenManager.getAuthorizationHeader(),
          "API-Version": "2024-10",
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Monday.com API HTTP error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const result = (await response.json()) as GraphQLResponse<T>;

      if (result.errors && result.errors.length > 0) {
        const errorMessages = result.errors.map((e) => e.message).join(", ");
        throw new Error(`Monday.com API GraphQL errors: ${errorMessages}`);
      }

      if (!result.data) {
        throw new Error("Monday.com API returned no data");
      }

      return result.data;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Monday.com API request timed out after ${this.timeout}ms`);
      }
      throw error;
    }
  }

  async mutate<T = unknown>(
    mutation: string,
    variables?: Record<string, unknown>
  ): Promise<T> {
    // Mutations use the same endpoint and method as queries in GraphQL
    return this.query<T>(mutation, variables);
  }
}
