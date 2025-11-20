// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from OpenAPI specification

import type { HttpClient } from "../../src/auth/client";
import type * as Types from "./types";

export class BusinessApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Create campaign
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.createCampaign(requestData);
   * ```
   *
   * @public
   */
  async createCampaign(body: Types.CampaignCreateRequest): Promise<Types.CampaignCreateResponse> {
    return this.client.post<Types.CampaignCreateResponse>("/campaign/create/", body);
  }

  /**
   * Get campaigns
   *
   * @param params - Request parameters
   * @param params.advertiser_id - advertiser_id
   * @param params.campaign_ids - campaign_ids
   * @param params.filtering - filtering
   * @param params.page - page
   * @param params.page_size - page_size
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.getCampaigns(queryParams);
   * ```
   *
   * @public
   */
  async getCampaigns(params?: { advertiser_id?: string; campaign_ids?: string; filtering?: string; page?: number; page_size?: number }): Promise<Types.CampaignGetResponse> {
    return this.client.get<Types.CampaignGetResponse>("/campaign/get/", {
      "advertiser_id": params?.advertiser_id,
      "campaign_ids": params?.campaign_ids,
      "filtering": params?.filtering,
      "page": params?.page,
      "page_size": params?.page_size,
    });
  }

  /**
   * Update campaign
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.updateCampaign(requestData);
   * ```
   *
   * @public
   */
  async updateCampaign(body: Types.CampaignUpdateRequest): Promise<Types.CampaignUpdateResponse> {
    return this.client.post<Types.CampaignUpdateResponse>("/campaign/update/", body);
  }

  /**
   * Update campaign status
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.updateCampaignStatus(requestData);
   * ```
   *
   * @public
   */
  async updateCampaignStatus(body: Types.CampaignStatusUpdateRequest): Promise<Types.StatusUpdateResponse> {
    return this.client.post<Types.StatusUpdateResponse>("/campaign/status/update/", body);
  }

  /**
   * Create ad group
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.createAdGroup(requestData);
   * ```
   *
   * @public
   */
  async createAdGroup(body: Types.AdGroupCreateRequest): Promise<Types.AdGroupCreateResponse> {
    return this.client.post<Types.AdGroupCreateResponse>("/adgroup/create/", body);
  }

  /**
   * Get ad groups
   *
   * @param params - Request parameters
   * @param params.advertiser_id - advertiser_id
   * @param params.adgroup_ids - adgroup_ids
   * @param params.campaign_ids - campaign_ids
   * @param params.filtering - filtering
   * @param params.page - page
   * @param params.page_size - page_size
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.getAdGroups(queryParams);
   * ```
   *
   * @public
   */
  async getAdGroups(params?: { advertiser_id?: string; adgroup_ids?: string; campaign_ids?: string; filtering?: string; page?: number; page_size?: number }): Promise<Types.AdGroupGetResponse> {
    return this.client.get<Types.AdGroupGetResponse>("/adgroup/get/", {
      "advertiser_id": params?.advertiser_id,
      "adgroup_ids": params?.adgroup_ids,
      "campaign_ids": params?.campaign_ids,
      "filtering": params?.filtering,
      "page": params?.page,
      "page_size": params?.page_size,
    });
  }

  /**
   * Update ad group
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.updateAdGroup(requestData);
   * ```
   *
   * @public
   */
  async updateAdGroup(body: Types.AdGroupUpdateRequest): Promise<Types.AdGroupUpdateResponse> {
    return this.client.post<Types.AdGroupUpdateResponse>("/adgroup/update/", body);
  }

  /**
   * Update ad group status
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.updateAdGroupStatus(requestData);
   * ```
   *
   * @public
   */
  async updateAdGroupStatus(body: Types.AdGroupStatusUpdateRequest): Promise<Types.StatusUpdateResponse> {
    return this.client.post<Types.StatusUpdateResponse>("/adgroup/status/update/", body);
  }

  /**
   * Create ad
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.createAd(requestData);
   * ```
   *
   * @public
   */
  async createAd(body: Types.AdCreateRequest): Promise<Types.AdCreateResponse> {
    return this.client.post<Types.AdCreateResponse>("/ad/create/", body);
  }

  /**
   * Get ads
   *
   * @param params - Request parameters
   * @param params.advertiser_id - advertiser_id
   * @param params.ad_ids - ad_ids
   * @param params.adgroup_ids - adgroup_ids
   * @param params.campaign_ids - campaign_ids
   * @param params.filtering - filtering
   * @param params.page - page
   * @param params.page_size - page_size
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.getAds(queryParams);
   * ```
   *
   * @public
   */
  async getAds(params?: { advertiser_id?: string; ad_ids?: string; adgroup_ids?: string; campaign_ids?: string; filtering?: string; page?: number; page_size?: number }): Promise<Types.AdGetResponse> {
    return this.client.get<Types.AdGetResponse>("/ad/get/", {
      "advertiser_id": params?.advertiser_id,
      "ad_ids": params?.ad_ids,
      "adgroup_ids": params?.adgroup_ids,
      "campaign_ids": params?.campaign_ids,
      "filtering": params?.filtering,
      "page": params?.page,
      "page_size": params?.page_size,
    });
  }

  /**
   * Update ad
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.updateAd(requestData);
   * ```
   *
   * @public
   */
  async updateAd(body: Types.AdUpdateRequest): Promise<Types.AdUpdateResponse> {
    return this.client.post<Types.AdUpdateResponse>("/ad/update/", body);
  }

  /**
   * Update ad status
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.updateAdStatus(requestData);
   * ```
   *
   * @public
   */
  async updateAdStatus(body: Types.AdStatusUpdateRequest): Promise<Types.StatusUpdateResponse> {
    return this.client.post<Types.StatusUpdateResponse>("/ad/status/update/", body);
  }

  /**
   * Upload video
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
    return this.client.post<Types.VideoUploadResponse>("/file/video/upload/");
  }

  /**
   * Upload image
   *
   * @param 
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.uploadImage();
   * ```
   *
   * @public
   */
  async uploadImage(): Promise<Types.ImageUploadResponse> {
    return this.client.post<Types.ImageUploadResponse>("/file/image/upload/");
  }

  /**
   * Get integrated report
   *
   * @param params - Request parameters
   * @param params.advertiser_id - advertiser_id
   * @param params.report_type - report_type
   * @param params.dimensions - dimensions
   * @param params.metrics - metrics
   * @param params.data_level - data_level
   * @param params.start_date - start_date
   * @param params.end_date - end_date
   * @param params.filtering - filtering
   * @param params.page - page
   * @param params.page_size - page_size
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.getIntegratedReport(queryParams);
   * ```
   *
   * @public
   */
  async getIntegratedReport(params?: { advertiser_id?: string; report_type?: string; dimensions?: string; metrics?: string; data_level?: string; start_date?: string; end_date?: string; filtering?: string; page?: number; page_size?: number }): Promise<Types.IntegratedReportResponse> {
    return this.client.get<Types.IntegratedReportResponse>("/report/integrated/get/", {
      "advertiser_id": params?.advertiser_id,
      "report_type": params?.report_type,
      "dimensions": params?.dimensions,
      "metrics": params?.metrics,
      "data_level": params?.data_level,
      "start_date": params?.start_date,
      "end_date": params?.end_date,
      "filtering": params?.filtering,
      "page": params?.page,
      "page_size": params?.page_size,
    });
  }

  /**
   * List custom audiences
   *
   * @param params - Request parameters
   * @param params.advertiser_id - advertiser_id
   * @param params.page - page
   * @param params.page_size - page_size
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.listCustomAudiences(queryParams);
   * ```
   *
   * @public
   */
  async listCustomAudiences(params?: { advertiser_id?: string; page?: number; page_size?: number }): Promise<Types.CustomAudienceListResponse> {
    return this.client.get<Types.CustomAudienceListResponse>("/dmp/custom_audience/list/", {
      "advertiser_id": params?.advertiser_id,
      "page": params?.page,
      "page_size": params?.page_size,
    });
  }

  /**
   * Create custom audience
   *
   * @param body - Request body data
   * @returns Promise resolving to the API response
   *
   * @example
   * ```typescript
   * const response = await api.createCustomAudience(requestData);
   * ```
   *
   * @public
   */
  async createCustomAudience(body: Types.CustomAudienceCreateRequest): Promise<Types.CustomAudienceCreateResponse> {
    return this.client.post<Types.CustomAudienceCreateResponse>("/dmp/custom_audience/create/", body);
  }

}