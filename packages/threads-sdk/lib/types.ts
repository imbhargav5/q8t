// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface User {
  id?: string;
  username?: string;
  name?: string;
  threads_profile_picture_url?: string;
  threads_biography?: string;
  is_verified?: boolean;
}

export interface PublishingLimit {
  data?: { quota_usage?: number; config?: { quota_total?: number; quota_duration?: number } }[];
}

export interface MediaType {
}

export interface MediaContainer {
  id: string;
}

export interface PublishedMedia {
  id: string;
}

export interface Media {
  id?: string;
  media_product_type?: string;
  media_type?: string;
  media_url?: string;
  permalink?: string;
  owner?: { id?: string };
  username?: string;
  text?: string;
  timestamp?: string;
  shortcode?: string;
  thumbnail_url?: string;
  children?: Record<string, unknown>;
  is_quote_post?: boolean;
  has_replies?: boolean;
  is_reply?: boolean;
  hide_status?: "NOT_HUSHED" | "UNHIDDEN" | "HIDDEN";
  reply_audience?: "everyone" | "accounts_you_follow" | "mentioned_only" | "parent_post_author_only" | "followers_only";
  alt_text?: string;
  topic_tag?: string;
}

export interface MediaList {
  data?: Media[];
  paging?: Paging;
}

export interface CreateMediaRequest {
  media_type: "TEXT" | "IMAGE" | "VIDEO" | "CAROUSEL";
  text?: string;
  image_url?: string;
  video_url?: string;
  children?: string[];
  alt_text?: string;
  reply_to_id?: string;
  reply_control?: "everyone" | "accounts_you_follow" | "mentioned_only" | "parent_post_author_only" | "followers_only";
  location_id?: string;
  topic_tag?: string;
  poll?: { question?: string; options?: string[]; duration_minutes?: number };
  gif_url?: string;
}

export interface PublishMediaRequest {
  creation_id: string;
}

export interface ManageReplyRequest {
  hide: boolean;
}

export interface ManageReplyResponse {
  success?: boolean;
}

export interface MediaInsight {
  name?: "views" | "likes" | "replies" | "reposts" | "quotes" | "clicks";
  period?: "day" | "week" | "days_28" | "lifetime";
  values?: { value?: number }[];
  title?: string;
  id?: string;
}

export interface MediaInsightsList {
  data?: MediaInsight[];
}

export interface UserInsight {
  name?: "views" | "likes" | "followers_count" | "follower_demographics";
  period?: string;
  values?: Record<string, unknown>[];
  title?: string;
}

export interface ShortLivedTokenResponse {
  access_token?: string;
  user_id?: string;
}

export interface LongLivedTokenResponse {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
}

export interface Paging {
  cursors?: { before?: string; after?: string };
}

export interface Error {
  error: { message?: string; type?: string; code?: number; fbtrace_id?: string };
}

export interface SearchResult {
  data?: Record<string, unknown>[];
}
