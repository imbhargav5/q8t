// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  picture?: { data?: { url?: string; width?: number; height?: number } };
}

export interface PageFeed {
  data?: Post[];
  paging?: Paging;
}

export interface Post {
  id: string;
  message?: string;
  created_time: string;
  story?: string;
  full_picture?: string;
  permalink_url?: string;
}

export interface CreatePostRequest {
  message: string;
  link?: string;
  published?: boolean;
  scheduled_publish_time?: number;
}

export interface CreatePostResponse {
  id: string;
}

export interface PageInsights {
  data?: InsightMetric[];
  paging?: Paging;
}

export interface InsightMetric {
  id: string;
  name: string;
  period: string;
  values: InsightValue[];
  title?: string;
  description?: string;
}

export interface InsightValue {
  value: number;
  end_time: string;
}

export interface Paging {
  cursors?: { before?: string; after?: string };
  next?: string;
  previous?: string;
}

export interface Page {
  id: string;
  name: string;
  about?: string;
  category?: string;
  category_list?: { id?: string; name?: string }[];
  cover?: { cover_id?: string; offset_x?: number; offset_y?: number; source?: string };
  fan_count?: number;
  followers_count?: number;
  picture?: { data?: { url?: string } };
  website?: string;
}

export interface PostFeed {
  data?: Post[];
  paging?: Paging;
}

export interface Photo {
  id: string;
  album?: { id?: string; name?: string };
  created_time: string;
  height?: number;
  width?: number;
  images?: { height?: number; width?: number; source?: string }[];
  link?: string;
  name?: string;
  picture?: string;
}

export interface PhotoFeed {
  data?: Photo[];
  paging?: Paging;
}

export interface CreatePhotoRequest {
  url?: string;
  caption?: string;
  published?: boolean;
  no_story?: boolean;
}

export interface CreatePhotoResponse {
  id: string;
  post_id: string;
}

export interface Album {
  id: string;
  name: string;
  description?: string;
  cover_photo?: { id?: string };
  count?: number;
  created_time?: string;
  updated_time?: string;
  type?: string;
  link?: string;
}

export interface AlbumFeed {
  data?: Album[];
  paging?: Paging;
}

export interface CreateAlbumRequest {
  name: string;
  description?: string;
  privacy?: { value?: "EVERYONE" | "FRIENDS" | "CUSTOM" };
}

export interface CreateAlbumResponse {
  id: string;
}

export interface Comment {
  id: string;
  from?: { id?: string; name?: string };
  message?: string;
  created_time: string;
  like_count?: number;
  comment_count?: number;
  attachment?: { media?: Record<string, unknown>; target?: Record<string, unknown>; type?: string; url?: string };
}

export interface CommentFeed {
  data?: Comment[];
  paging?: Paging;
  summary?: { order?: string; total_count?: number; can_comment?: boolean };
}

export interface CreateCommentRequest {
  message: string;
  attachment_id?: string;
  attachment_share_url?: string;
  attachment_url?: string;
}

export interface CreateCommentResponse {
  id: string;
}

export interface Like {
  id: string;
  name: string;
}

export interface LikesFeed {
  data?: Like[];
  paging?: Paging;
  summary?: { total_count?: number; can_like?: boolean; has_liked?: boolean };
}

export interface LikeResponse {
  success: boolean;
}

export interface Reaction {
  id: string;
  name: string;
  type: "LIKE" | "LOVE" | "WOW" | "HAHA" | "SAD" | "ANGRY" | "CARE";
}

export interface ReactionsFeed {
  data?: Reaction[];
  paging?: Paging;
  summary?: { total_count?: number; viewer_reaction?: string };
}

export interface Share {
  id?: string;
  from?: { id?: string; name?: string };
  link?: string;
}

export interface SharesFeed {
  data?: Share[];
  paging?: Paging;
}

export interface PostInsights {
  data?: InsightMetric[];
  paging?: Paging;
}

export interface FriendsFeed {
  data?: UserProfile[];
  paging?: Paging;
  summary?: { total_count?: number };
}

export interface DeleteResponse {
  success: boolean;
}
