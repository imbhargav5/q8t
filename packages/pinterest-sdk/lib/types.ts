// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface UserAccount {
  account_type?: "PINNER" | "BUSINESS";
  profile_image?: string;
  website_url?: string;
  username: string;
  about?: string;
  business_name?: string;
  board_count?: number;
  pin_count?: number;
  follower_count?: number;
  following_count?: number;
  monthly_views?: number;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  owner?: BoardOwner;
  privacy?: "PUBLIC" | "PROTECTED" | "SECRET";
  media?: BoardMedia;
  board_pins_modified_at?: string;
  created_at?: string;
  pin_count?: number;
  follower_count?: number;
  collaborator_count?: number;
}

export interface BoardOwner {
  username?: string;
}

export interface BoardMedia {
  image_cover_url?: string;
  pin_thumbnail_urls?: string[];
}

export interface BoardsListResponse {
  items?: Board[];
  bookmark?: string;
}

export interface Pin {
  id: string;
  created_at?: string;
  link?: string;
  title?: string;
  description?: string;
  dominant_color?: string;
  alt_text?: string;
  board_id?: string;
  board_section_id?: string;
  board_owner?: BoardOwner;
  media?: PinMedia;
  parent_pin_id?: string;
  is_owner?: boolean;
  is_standard?: boolean;
}

export interface PinMedia {
  media_type?: string;
  images?: { 150x150?: ImageDetails; 400x300?: ImageDetails; 600x?: ImageDetails; 1200x?: ImageDetails };
}

export interface ImageDetails {
  width?: number;
  height?: number;
  url?: string;
}

export interface PinsListResponse {
  items?: Pin[];
  bookmark?: string;
}

export interface PinCreate {
  link?: string;
  title?: string;
  description?: string;
  dominant_color?: string;
  alt_text?: string;
  board_id: string;
  board_section_id?: string;
  media_source: PinMediaSource;
  parent_pin_id?: string;
  note?: string;
}

export interface PinMediaSource {
  source_type: "image_url" | "image_base64" | "video_id" | "multiple_image_urls" | "multiple_image_base64";
  url?: string;
  cover_image_url?: string;
  media_id?: string;
  items?: { url?: string; content_type?: string; data?: string }[];
  is_standard?: boolean;
}
