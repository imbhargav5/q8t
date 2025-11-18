// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface User {
  name: string;
  id: string;
  created_utc?: number;
  link_karma?: number;
  comment_karma?: number;
  is_gold?: boolean;
  is_mod?: boolean;
  has_verified_email?: boolean;
  icon_img?: string;
}

export interface KarmaResponse {
  kind?: string;
  data?: KarmaBreakdown[];
}

export interface KarmaBreakdown {
  sr?: string;
  comment_karma?: number;
  link_karma?: number;
}

export interface ListingResponse {
  kind?: string;
  data?: ListingData;
}

export interface ListingData {
  after?: string;
  before?: string;
  children?: PostWrapper[];
  dist?: number;
}

export interface PostWrapper {
  kind?: string;
  data?: Post;
}

export interface Post {
  id: string;
  name?: string;
  title: string;
  selftext?: string;
  author?: string;
  subreddit: string;
  score?: number;
  upvote_ratio?: number;
  num_comments?: number;
  created_utc?: number;
  url?: string;
  permalink?: string;
  is_self?: boolean;
  over_18?: boolean;
}

export interface SubmitPostRequest {
  sr: string;
  title: string;
  kind: string;
  text?: string;
  url?: string;
  nsfw?: boolean;
  spoiler?: boolean;
}

export interface SubmitResponse {
  json?: { errors?: string[]; data?: { url?: string; id?: string; name?: string } };
}

export interface CommentRequest {
  thing_id: string;
  text: string;
}

export interface CommentResponse {
  json?: { errors?: string[]; data?: Record<string, unknown> };
}

export interface VoteRequest {
  id: string;
  dir: number;
}

export interface VoteResponse {
  success?: boolean;
}

export interface SaveRequest {
  id: string;
  category?: string;
}

export interface SaveResponse {
  success?: boolean;
}

export interface UserAboutResponse {
  kind?: string;
  data?: User;
}

export interface SubredditAboutResponse {
  kind?: string;
  data?: Subreddit;
}

export interface Subreddit {
  display_name: string;
  id: string;
  title?: string;
  public_description?: string;
  subscribers?: number;
  created_utc?: number;
  over18?: boolean;
  icon_img?: string;
}

export interface SearchSubredditsRequest {
  query: string;
  include_over_18?: boolean;
  include_unadvertisable?: boolean;
}

export interface SearchSubredditsResponse {
  subreddits?: SubredditSearchResult[];
}

export interface SubredditSearchResult {
  name?: string;
  subscriber_count?: number;
  active_user_count?: number;
  icon_img?: string;
}

export interface UnsaveRequest {
  id: string;
}

export interface HideRequest {
  id: string;
}

export interface UnhideRequest {
  id: string;
}

export interface EditUserTextRequest {
  thing_id: string;
  text: string;
}

export interface DeleteRequest {
  id: string;
}

export interface ComposeMessageRequest {
  to: string;
  subject: string;
  text: string;
  from_sr?: string;
}

export interface MoreChildrenResponse {
  json?: { errors?: string[]; data?: { things?: Record<string, unknown>[] } };
}

export interface GenericResponse {
  success?: boolean;
  json?: Record<string, unknown>;
}
