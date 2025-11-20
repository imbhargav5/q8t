// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from OpenAPI specification

import type { HttpClient } from "../../src/auth/client";
import type * as Types from "./types";

export class ClientCredentialsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

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
  async queryResearchVideos(body: Types.ResearchVideoQueryRequest): Promise<Types.ResearchVideoQueryResponse> {
    return this.client.post<Types.ResearchVideoQueryResponse>("/research/video/query/", body);
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
  async queryResearchUserInfo(body: Types.ResearchUserInfoRequest): Promise<Types.ResearchUserInfoResponse> {
    return this.client.post<Types.ResearchUserInfoResponse>("/research/user/info/", body);
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
  async listVideoComments(body: Types.VideoCommentsRequest): Promise<Types.VideoCommentsResponse> {
    return this.client.post<Types.VideoCommentsResponse>("/research/video/comment/list/", body);
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
  async queryAds(body: Types.AdQueryRequest): Promise<Types.AdQueryResponse> {
    return this.client.post<Types.AdQueryResponse>("/research/adlib/ad/query/", body);
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
  async getAdDetails(body: Types.AdDetailRequest): Promise<Types.AdDetailResponse> {
    return this.client.post<Types.AdDetailResponse>("/research/adlib/ad/detail/", body);
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
  async queryCommercialContent(body: Types.CommercialContentRequest): Promise<Types.CommercialContentResponse> {
    return this.client.post<Types.CommercialContentResponse>("/research/adlib/commercial_content/report/", body);
  }

}