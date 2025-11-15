// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class LinkedInApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get user profile
   */
  async getProfile(): Promise<Types.Profile> {
    return this.client.get<Types.Profile>("/me");
  }

  /**
   * Create a post
   */
  async createPost(body: Types.CreatePostRequest): Promise<Types.PostResponse> {
    return this.client.post<Types.PostResponse>("/ugcPosts", body);
  }

  /**
   * Get user connections
   */
  async getConnections({ start?: number, count?: number }: { start?: number; count?: number } = {}): Promise<Types.ConnectionsResponse> {
    return this.client.get<Types.ConnectionsResponse>("/connections", {
      "start": start,
      "count": count,
    });
  }

}