// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class TikTokApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get user information
   */
  async getUserInfo({ fields?: string }: { fields?: string } = {}): Promise<Types.UserInfoResponse> {
    return this.client.get<Types.UserInfoResponse>("/user/info/", {
      "fields": fields,
    });
  }

  /**
   * List user videos
   */
  async listVideos(body: Types.VideoListRequest): Promise<Types.VideoListResponse> {
    return this.client.post<Types.VideoListResponse>("/video/list/", body);
  }

  /**
   * Query video information
   */
  async queryVideo({ fields?: string, video_ids?: string }: { fields?: string; video_ids?: string } = {}): Promise<Types.VideoQueryResponse> {
    return this.client.get<Types.VideoQueryResponse>("/video/query/", {
      "fields": fields,
      "video_ids": video_ids,
    });
  }

}