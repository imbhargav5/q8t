// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface CampaignCreateRequest {
  advertiser_id: string;
  campaign_name: string;
  objective_type: "REACH" | "TRAFFIC" | "VIDEO_VIEWS" | "LEAD_GENERATION" | "ENGAGEMENT" | "APP_PROMOTION" | "WEB_CONVERSIONS" | "PRODUCT_SALES" | "SHOP_PURCHASES";
  budget_mode?: "BUDGET_MODE_INFINITE" | "BUDGET_MODE_DAY" | "BUDGET_MODE_TOTAL";
  budget?: number;
  operation_status?: "ENABLE" | "DISABLE";
}

export interface CampaignCreateResponse {
  code?: number;
  message?: string;
  data?: { campaign_id?: string };
  request_id?: string;
}

export interface CampaignGetResponse {
  code?: number;
  message?: string;
  data?: { campaigns?: Campaign[]; page_info?: PageInfo };
  request_id?: string;
}

export interface Campaign {
  campaign_id?: string;
  campaign_name?: string;
  advertiser_id?: string;
  objective_type?: string;
  budget?: number;
  budget_mode?: string;
  operation_status?: string;
  create_time?: string;
  modify_time?: string;
}

export interface CampaignUpdateRequest {
  advertiser_id: string;
  campaign_id: string;
  campaign_name?: string;
  budget?: number;
  budget_mode?: string;
}

export interface CampaignUpdateResponse {
  code?: number;
  message?: string;
  data?: { campaign_id?: string };
  request_id?: string;
}

export interface CampaignStatusUpdateRequest {
  advertiser_id: string;
  campaign_ids: string[];
  operation_status: "ENABLE" | "DISABLE" | "DELETE";
}

export interface AdGroupCreateRequest {
  advertiser_id: string;
  campaign_id: string;
  adgroup_name: string;
  placement_type?: "PLACEMENT_TYPE_AUTOMATIC" | "PLACEMENT_TYPE_NORMAL";
  placements?: string[];
  location_ids?: string[];
  age_groups?: string[];
  gender?: "GENDER_MALE" | "GENDER_FEMALE" | "GENDER_UNLIMITED";
  budget_mode?: "BUDGET_MODE_DAY" | "BUDGET_MODE_TOTAL" | "BUDGET_MODE_INFINITE";
  budget?: number;
  schedule_type?: "SCHEDULE_FROM_NOW" | "SCHEDULE_START_END";
  schedule_start_time?: string;
  schedule_end_time?: string;
  dayparting?: string;
  operation_status?: "ENABLE" | "DISABLE";
}

export interface AdGroupCreateResponse {
  code?: number;
  message?: string;
  data?: { adgroup_id?: string };
  request_id?: string;
}

export interface AdGroupGetResponse {
  code?: number;
  message?: string;
  data?: { adgroups?: AdGroup[]; page_info?: PageInfo };
  request_id?: string;
}

export interface AdGroup {
  adgroup_id?: string;
  adgroup_name?: string;
  advertiser_id?: string;
  campaign_id?: string;
  placement_type?: string;
  placements?: string[];
  operation_status?: string;
  budget?: number;
  budget_mode?: string;
  create_time?: string;
  modify_time?: string;
}

export interface AdGroupUpdateRequest {
  advertiser_id: string;
  adgroup_id: string;
  adgroup_name?: string;
  budget?: number;
  budget_mode?: string;
}

export interface AdGroupUpdateResponse {
  code?: number;
  message?: string;
  data?: { adgroup_id?: string };
  request_id?: string;
}

export interface AdGroupStatusUpdateRequest {
  advertiser_id: string;
  adgroup_ids: string[];
  operation_status: "ENABLE" | "DISABLE" | "DELETE";
}

export interface AdCreateRequest {
  advertiser_id: string;
  adgroup_id: string;
  ad_name: string;
  ad_format?: "SINGLE_VIDEO" | "SINGLE_IMAGE" | "CAROUSEL";
  ad_text?: string;
  call_to_action?: string;
  landing_page_url?: string;
  video_id?: string;
  image_ids?: string[];
  operation_status?: "ENABLE" | "DISABLE";
}

export interface AdCreateResponse {
  code?: number;
  message?: string;
  data?: { ad_id?: string };
  request_id?: string;
}

export interface AdGetResponse {
  code?: number;
  message?: string;
  data?: { ads?: Ad[]; page_info?: PageInfo };
  request_id?: string;
}

export interface Ad {
  ad_id?: string;
  ad_name?: string;
  advertiser_id?: string;
  adgroup_id?: string;
  campaign_id?: string;
  ad_format?: string;
  ad_text?: string;
  call_to_action?: string;
  landing_page_url?: string;
  operation_status?: string;
  create_time?: string;
  modify_time?: string;
}

export interface AdUpdateRequest {
  advertiser_id: string;
  ad_id: string;
  ad_name?: string;
  ad_text?: string;
  call_to_action?: string;
}

export interface AdUpdateResponse {
  code?: number;
  message?: string;
  data?: { ad_id?: string };
  request_id?: string;
}

export interface AdStatusUpdateRequest {
  advertiser_id: string;
  ad_ids: string[];
  operation_status: "ENABLE" | "DISABLE" | "DELETE";
}

export interface VideoUploadRequest {
  advertiser_id: string;
  video_file?: string;
  video_signature?: string;
  video_id?: string;
}

export interface VideoUploadResponse {
  code?: number;
  message?: string;
  data?: { video_id?: string };
  request_id?: string;
}

export interface ImageUploadRequest {
  advertiser_id: string;
  image_file?: string;
  image_signature?: string;
}

export interface ImageUploadResponse {
  code?: number;
  message?: string;
  data?: { image_id?: string };
  request_id?: string;
}

export interface IntegratedReportResponse {
  code?: number;
  message?: string;
  data?: { list?: Record<string, unknown>[]; page_info?: PageInfo };
  request_id?: string;
}

export interface CustomAudienceListResponse {
  code?: number;
  message?: string;
  data?: { custom_audiences?: CustomAudience[]; page_info?: PageInfo };
  request_id?: string;
}

export interface CustomAudience {
  custom_audience_id?: string;
  custom_audience_name?: string;
  audience_type?: string;
  size?: number;
  create_time?: string;
  modify_time?: string;
}

export interface CustomAudienceCreateRequest {
  advertiser_id: string;
  custom_audience_name: string;
  audience_type: "CUSTOMER_FILE" | "PIXEL" | "ENGAGEMENT";
  file_paths?: string[];
}

export interface CustomAudienceCreateResponse {
  code?: number;
  message?: string;
  data?: { custom_audience_id?: string };
  request_id?: string;
}

export interface StatusUpdateResponse {
  code?: number;
  message?: string;
  data?: { campaign_ids?: string[]; adgroup_ids?: string[]; ad_ids?: string[] };
  request_id?: string;
}

export interface PageInfo {
  total_number?: number;
  page?: number;
  page_size?: number;
  total_page?: number;
}
