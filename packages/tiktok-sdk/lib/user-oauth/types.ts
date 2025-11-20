// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface UserInfoResponse {
  data: UserData;
  error: ErrorInfo;
}

export interface UserData {
  user: User;
}

export interface User {
  open_id?: string;
  union_id?: string;
  avatar_url?: string;
  avatar_url_100?: string;
  avatar_large_url?: string;
  display_name?: string;
  bio_description?: string;
  profile_deep_link?: string;
  is_verified?: boolean;
  follower_count?: number;
  following_count?: number;
  likes_count?: number;
  video_count?: number;
}

export interface VideoListRequest {
  max_count?: number;
  cursor?: number;
  fields: string;
}

export interface VideoListResponse {
  data: VideoListData;
  error: ErrorInfo;
}

export interface VideoListData {
  videos: Video[];
  cursor?: number;
  has_more: boolean;
}

export interface VideoQueryRequest {
  filters: { video_ids?: string[] };
  fields: string;
}

export interface VideoQueryResponse {
  data: VideoQueryData;
  error: ErrorInfo;
}

export interface VideoQueryData {
  videos: Video[];
}

export interface Video {
  id?: string;
  title?: string;
  video_description?: string;
  duration?: number;
  height?: number;
  width?: number;
  cover_image_url?: string;
  embed_html?: string;
  embed_link?: string;
  like_count?: number;
  comment_count?: number;
  share_count?: number;
  view_count?: number;
  create_time?: number;
  share_url?: string;
}

export interface CreatorInfoResponse {
  data?: { creator_avatar_url?: string; creator_username?: string; creator_nickname?: string; privacy_level_options?: string[]; comment_disabled?: boolean; duet_disabled?: boolean; stitch_disabled?: boolean; max_video_post_duration_sec?: number };
  error?: ErrorInfo;
}

export interface VideoInitRequest {
  post_info?: { title?: string; privacy_level?: "SELF_ONLY" | "MUTUAL_FOLLOW_FRIENDS" | "FOLLOWER_OF_CREATOR" | "PUBLIC_TO_EVERYONE"; disable_duet?: boolean; disable_comment?: boolean; disable_stitch?: boolean; video_cover_timestamp_ms?: number };
  source_info: { source?: "FILE_UPLOAD" | "PULL_FROM_URL"; video_size?: number; chunk_size?: number; total_chunk_count?: number };
}

export interface VideoInitResponse {
  data?: { publish_id?: string; upload_url?: string };
  error?: ErrorInfo;
}

export interface VideoUploadResponse {
  data?: { status?: string };
  error?: ErrorInfo;
}

export interface PublishStatusRequest {
  publish_id: string;
}

export interface PublishStatusResponse {
  data?: { status?: "PROCESSING_UPLOAD" | "PUBLISH_COMPLETE" | "FAILED" | "PROCESSING_DOWNLOAD"; publicaly_available_post_id?: string[]; uploaded_bytes?: number; fail_reason?: string };
  error?: ErrorInfo;
}

export interface ErrorInfo {
  code: string;
  message: string;
  log_id: string;
}
