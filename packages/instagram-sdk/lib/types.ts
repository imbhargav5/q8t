// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface Media {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  permalink?: string;
  thumbnail_url?: string;
  timestamp?: string;
  username?: string;
  like_count?: number;
  comments_count?: number;
}

export interface MediaListResponse {
  data: Media[];
  paging?: Paging;
}

export interface Paging {
  cursors?: { before?: string; after?: string };
  next?: string;
  previous?: string;
}

export interface CreateMediaRequest {
  image_url?: string;
  video_url?: string;
  caption?: string;
  location_id?: string;
  user_tags?: { username?: string; x?: number; y?: number }[];
  is_carousel_item?: boolean;
  media_type?: string;
}

export interface CreateMediaResponse {
  id: string;
}

export interface InsightsResponse {
  data: Insight[];
}

export interface Insight {
  id: string;
  name: string;
  period?: string;
  values?: { value?: number; end_time?: string }[];
  title?: string;
  description?: string;
}
