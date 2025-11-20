// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from OpenAPI specification

import type { HttpClient } from "../../src/auth/client";
import type * as Types from "./types";

export class UserOAuthApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get user information
   *
   * @param params - Request parameters
   * @param params.fields - Comma-separated list of fields (open_id,union_id,avatar_url,display_name,bio_description,profile_deep_link,is_verified,follower_count,following_count,likes_count,video_count)
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.getUserInfo(queryParams);
   * ```
   *
   * @public
   */
  async getUserInfo(params?: { fields?: string }): Promise<Types.UserInfoResponse> {
    return this.client.get<Types.UserInfoResponse>("/user/info/", {
      "fields": params?.fields,
    });
  }

  /**
   * List user videos
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.listVideos(requestData);
   * ```
   *
   * @public
   */
  async listVideos(body: Types.VideoListRequest): Promise<Types.VideoListResponse> {
    return this.client.post<Types.VideoListResponse>("/video/list/", body);
  }

  /**
   * Query video information
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.queryVideos(requestData);
   * ```
   *
   * @public
   */
  async queryVideos(body: Types.VideoQueryRequest): Promise<Types.VideoQueryResponse> {
    return this.client.post<Types.VideoQueryResponse>("/video/query/", body);
  }

  /**
   * Query creator information for posting
   *
   * @param 
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.queryCreatorInfo();
   * ```
   *
   * @public
   */
  async queryCreatorInfo(): Promise<Types.CreatorInfoResponse> {
    return this.client.post<Types.CreatorInfoResponse>("/post/publish/creator_info/query/");
  }

  /**
   * Initialize video post
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.initializeVideoPost(requestData);
   * ```
   *
   * @public
   */
  async initializeVideoPost(body: Types.VideoInitRequest): Promise<Types.VideoInitResponse> {
    return this.client.post<Types.VideoInitResponse>("/post/publish/video/init/", body);
  }

  /**
   * Upload video content
   *
   * @param 
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.uploadVideo();
   * ```
   *
   * @public
   */
  async uploadVideo(): Promise<Types.VideoUploadResponse> {
    return this.client.post<Types.VideoUploadResponse>("/post/publish/video/upload/");
  }

  /**
   * Fetch publish status
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.fetchPublishStatus(requestData);
   * ```
   *
   * @public
   */
  async fetchPublishStatus(body: Types.PublishStatusRequest): Promise<Types.PublishStatusResponse> {
    return this.client.post<Types.PublishStatusResponse>("/post/publish/status/fetch/", body);
  }

}