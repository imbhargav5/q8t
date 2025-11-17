// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class FacebookApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get current user profile
   */
  async getMe({ fields?: string }: { fields?: string } = {}): Promise<Types.UserProfile> {
    return this.client.get<Types.UserProfile>("/me", {
      "fields": fields,
    });
  }

  /**
   * Get page feed posts
   */
  async getPageFeed(page_id: string, { limit?: number, fields?: string }: { limit?: number; fields?: string } = {}): Promise<Types.PageFeed> {
    return this.client.get<Types.PageFeed>(`/${page_id}/feed`, {
      "limit": limit,
      "fields": fields,
    });
  }

  /**
   * Create a post on page
   */
  async createPagePost(page_id: string, body: Types.CreatePostRequest): Promise<Types.CreatePostResponse> {
    return this.client.post<Types.CreatePostResponse>(`/${page_id}/feed`, body);
  }

  /**
   * Get page insights and analytics
   */
  async getPageInsights(page_id: string, { metric?: string, period?: string }: { metric?: string; period?: string } = {}): Promise<Types.PageInsights> {
    return this.client.get<Types.PageInsights>(`/${page_id}/insights`, {
      "metric": metric,
      "period": period,
    });
  }

}