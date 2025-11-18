// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class GoogleMyBusinessApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List all Google My Business accounts
   */
  async listAccounts(): Promise<Types.ListAccountsResponse> {
    return this.client.get<Types.ListAccountsResponse>("/accounts");
  }

  /**
   * List locations for an account
   */
  async listLocations(account: string, { pageSize?: number, pageToken?: string }: { pageSize?: number; pageToken?: string } = {}): Promise<Types.ListLocationsResponse> {
    return this.client.get<Types.ListLocationsResponse>(`/accounts/${account}/locations`, {
      "pageSize": pageSize,
      "pageToken": pageToken,
    });
  }

  /**
   * List reviews for a location
   */
  async listReviews(account: string, location: string, { pageSize?: number, pageToken?: string }: { pageSize?: number; pageToken?: string } = {}): Promise<Types.ListReviewsResponse> {
    return this.client.get<Types.ListReviewsResponse>(`/accounts/${account}/locations/${location}/reviews`, {
      "pageSize": pageSize,
      "pageToken": pageToken,
    });
  }

  /**
   * Create a local post
   */
  async createLocalPost(account: string, location: string, body: Types.LocalPost): Promise<Types.LocalPost> {
    return this.client.post<Types.LocalPost>(`/accounts/${account}/locations/${location}/localPosts`, body);
  }

}