// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class InstagramApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get user media
   */
  async getUserMedia(user_id: string, { fields?: string, limit?: number }: { fields?: string; limit?: number } = {}): Promise<Types.MediaListResponse> {
    return this.client.get<Types.MediaListResponse>(`/${user_id}/media`, {
      "fields": fields,
      "limit": limit,
    });
  }

  /**
   * Create media container
   */
  async createMedia(user_id: string, body: Types.CreateMediaRequest): Promise<Types.CreateMediaResponse> {
    return this.client.post<Types.CreateMediaResponse>(`/${user_id}/media`, body);
  }

  /**
   * Get single media
   */
  async getMedia(media_id: string, { fields?: string }: { fields?: string } = {}): Promise<Types.Media> {
    return this.client.get<Types.Media>(`/${media_id}`, {
      "fields": fields,
    });
  }

  /**
   * Get user insights
   */
  async getUserInsights(user_id: string, { metric?: string, period?: string, since?: number, until?: number }: { metric?: string; period?: string; since?: number; until?: number } = {}): Promise<Types.InsightsResponse> {
    return this.client.get<Types.InsightsResponse>(`/${user_id}/insights`, {
      "metric": metric,
      "period": period,
      "since": since,
      "until": until,
    });
  }

  /**
   * Get media insights
   */
  async getMediaInsights(media_id: string, { metric?: string }: { metric?: string } = {}): Promise<Types.InsightsResponse> {
    return this.client.get<Types.InsightsResponse>(`/${media_id}/insights`, {
      "metric": metric,
    });
  }

}