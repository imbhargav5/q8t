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

export interface Video {
  id?: string;
  title?: string;
  video_description?: string;
  duration?: number;
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

export interface VideoQueryResponse {
  data: VideoQueryData;
  error: ErrorInfo;
}

export interface VideoQueryData {
  videos: Video[];
}

export interface ErrorInfo {
  code: string;
  message: string;
  log_id: string;
}
