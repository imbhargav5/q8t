// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from OpenAPI specification

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class ClientCredentialsApi {
  constructor() {}

  /**
   * Query research videos
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.queryResearchVideos(requestData);
   * ```
   *
   * @public
   */
  queryResearchVideos(body: Types.ResearchVideoQueryRequest): Effect.Effect<Types.ResearchVideoQueryResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.ResearchVideoQueryResponse>("/research/video/query/", body);
  }

  /**
   * Query research user info
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.queryResearchUserInfo(requestData);
   * ```
   *
   * @public
   */
  queryResearchUserInfo(body: Types.ResearchUserInfoRequest): Effect.Effect<Types.ResearchUserInfoResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.ResearchUserInfoResponse>("/research/user/info/", body);
  }

  /**
   * List video comments
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.listVideoComments(requestData);
   * ```
   *
   * @public
   */
  listVideoComments(body: Types.VideoCommentsRequest): Effect.Effect<Types.VideoCommentsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.VideoCommentsResponse>("/research/video/comment/list/", body);
  }

  /**
   * Query ads
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.queryAds(requestData);
   * ```
   *
   * @public
   */
  queryAds(body: Types.AdQueryRequest): Effect.Effect<Types.AdQueryResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.AdQueryResponse>("/research/adlib/ad/query/", body);
  }

  /**
   * Get ad details
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.getAdDetails(requestData);
   * ```
   *
   * @public
   */
  getAdDetails(body: Types.AdDetailRequest): Effect.Effect<Types.AdDetailResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.AdDetailResponse>("/research/adlib/ad/detail/", body);
  }

  /**
   * Query commercial content
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.queryCommercialContent(requestData);
   * ```
   *
   * @public
   */
  queryCommercialContent(body: Types.CommercialContentRequest): Effect.Effect<Types.CommercialContentResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.CommercialContentResponse>("/research/adlib/commercial_content/report/", body);
  }

}