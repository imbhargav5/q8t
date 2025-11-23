// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from OpenAPI specification

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class UserOAuthApi {
  constructor() {}

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
  getUserInfo(params?: { fields?: string }): Effect.Effect<Types.UserInfoResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.UserInfoResponse>("/user/info/", {
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
  listVideos(body: Types.VideoListRequest): Effect.Effect<Types.VideoListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.VideoListResponse>("/video/list/", body);
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
  queryVideos(body: Types.VideoQueryRequest): Effect.Effect<Types.VideoQueryResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.VideoQueryResponse>("/video/query/", body);
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
  queryCreatorInfo(): Effect.Effect<Types.CreatorInfoResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.CreatorInfoResponse>("/post/publish/creator_info/query/");
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
  initializeVideoPost(body: Types.VideoInitRequest): Effect.Effect<Types.VideoInitResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.VideoInitResponse>("/post/publish/video/init/", body);
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
  uploadVideo(): Effect.Effect<Types.VideoUploadResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.VideoUploadResponse>("/post/publish/video/upload/");
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
  fetchPublishStatus(body: Types.PublishStatusRequest): Effect.Effect<Types.PublishStatusResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.PublishStatusResponse>("/post/publish/status/fetch/", body);
  }

}