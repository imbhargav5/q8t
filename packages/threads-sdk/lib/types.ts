// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface UserProfile {
  id: string;
  username?: string;
  threads_profile_picture_url?: string;
  threads_biography?: string;
}

export interface CreateThreadRequest {
  media_type: "TEXT" | "IMAGE" | "VIDEO" | "CAROUSEL";
  text?: string;
  image_url?: string;
  video_url?: string;
  children?: string[];
  reply_to_id?: string;
  reply_control?: "everyone" | "accounts_you_follow" | "mentioned_only";
}

export interface ThreadContainer {
  id: string;
}

export interface ThreadsList {
  data: Thread[];
  paging?: Paging;
}

export interface Thread {
  id: string;
  media_product_type?: string;
  media_type?: "TEXT_POST" | "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | "AUDIO" | "REPOST_FACADE";
  media_url?: string;
  permalink?: string;
  owner?: { id?: string };
  username?: string;
  text?: string;
  timestamp?: string;
  shortcode?: string;
  thumbnail_url?: string;
  children?: { data?: { id?: string }[] };
  is_quote_post?: boolean;
  alt_text?: string;
  has_replies?: boolean;
  is_reply?: boolean;
  is_reply_owned_by_me?: boolean;
  root_post?: { id?: string };
  replied_to?: { id?: string };
  hide_status?: "NOT_HUSHED" | "UNHUSHED" | "HIDDEN" | "COVERED" | "BLOCKED" | "RESTRICTED";
  reply_audience?: "EVERYONE" | "ACCOUNTS_YOU_FOLLOW" | "MENTIONED_ONLY";
}

export interface Paging {
  cursors?: { before?: string; after?: string };
  next?: string;
  previous?: string;
}
