// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface ResearchVideoQueryRequest {
  query: { and?: { operation?: "EQ" | "IN" | "GT" | "GTE" | "LT" | "LTE"; field_name?: "region_code" | "hashtag_name" | "keyword" | "video_id" | "effect_ids" | "video_length" | "create_date" | "username" | "music_id"; field_values?: string[] }[]; or?: Record<string, unknown>[]; not?: Record<string, unknown>[] };
  fields: "id" | "video_description" | "create_time" | "region_code" | "share_count" | "view_count" | "like_count" | "comment_count" | "music_id" | "hashtag_names" | "username" | "effect_ids" | "playlist_id" | "voice_to_text" | "video_duration"[];
  max_count?: number;
  cursor?: number;
  search_id?: string;
  start_date?: string;
  end_date?: string;
}

export interface ResearchVideoQueryResponse {
  data?: { videos?: ResearchVideo[]; cursor?: number; has_more?: boolean; search_id?: string };
  error?: ErrorInfo;
}

export interface ResearchVideo {
  id?: string;
  video_description?: string;
  create_time?: number;
  region_code?: string;
  share_count?: number;
  view_count?: number;
  like_count?: number;
  comment_count?: number;
  music_id?: string;
  hashtag_names?: string[];
  username?: string;
  effect_ids?: string[];
  playlist_id?: string;
  voice_to_text?: string;
  video_duration?: number;
}

export interface ResearchUserInfoRequest {
  username: string;
  fields: "display_name" | "bio_description" | "avatar_url" | "is_verified" | "follower_count" | "following_count" | "likes_count" | "video_count"[];
}

export interface ResearchUserInfoResponse {
  data?: { display_name?: string; bio_description?: string; avatar_url?: string; is_verified?: boolean; follower_count?: number; following_count?: number; likes_count?: number; video_count?: number };
  error?: ErrorInfo;
}

export interface VideoCommentsRequest {
  video_id: string;
  max_count?: number;
  cursor?: number;
  fields: "id" | "parent_comment_id" | "text" | "like_count" | "create_time" | "video_id"[];
}

export interface VideoCommentsResponse {
  data?: { comments?: Comment[]; cursor?: number; has_more?: boolean };
  error?: ErrorInfo;
}

export interface Comment {
  id?: string;
  parent_comment_id?: string;
  text?: string;
  like_count?: number;
  create_time?: number;
  video_id?: string;
}

export interface AdQueryRequest {
  filters: { ad_published_date_range?: { start_date?: string; end_date?: string }; country?: string[]; search_term?: string };
  fields: "ad_id" | "advertiser_business_id" | "advertiser_paid_by_label_disabled" | "advertiser_page_name" | "ad_reach" | "ad_impressions" | "ad_clicks" | "ad_spend" | "currency" | "call_to_action" | "ad_text" | "ad_image_urls" | "ad_video_urls" | "ad_destination_url"[];
  max_count?: number;
  cursor?: string;
}

export interface AdQueryResponse {
  data?: { ads?: Ad[]; cursor?: string; has_more?: boolean };
  error?: ErrorInfo;
}

export interface Ad {
  ad_id?: string;
  advertiser_business_id?: string;
  advertiser_paid_by_label_disabled?: boolean;
  advertiser_page_name?: string;
  ad_reach?: number;
  ad_impressions?: number;
  ad_clicks?: number;
  ad_spend?: number;
  currency?: string;
  call_to_action?: string;
  ad_text?: string;
  ad_image_urls?: string[];
  ad_video_urls?: string[];
  ad_destination_url?: string;
}

export interface AdDetailRequest {
  ad_ids: string[];
  fields: string[];
}

export interface AdDetailResponse {
  data?: { ads?: Ad[] };
  error?: ErrorInfo;
}

export interface CommercialContentRequest {
  filters: { content_published_date_range?: { start_date?: string; end_date?: string }; creator_country_code?: string[] };
  fields: string[];
  max_count?: number;
  cursor?: string;
}

export interface CommercialContentResponse {
  data?: { contents?: Record<string, unknown>[]; cursor?: string; has_more?: boolean };
  error?: ErrorInfo;
}

export interface ErrorInfo {
  code: string;
  message: string;
  log_id: string;
}
