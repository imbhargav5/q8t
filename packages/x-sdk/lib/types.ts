// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface Tweet {
  id: string;
  text: string;
  author_id?: string;
  created_at?: string;
  public_metrics?: TweetPublicMetrics;
  entities?: TweetEntities;
}

export interface TweetPublicMetrics {
  retweet_count?: number;
  reply_count?: number;
  like_count?: number;
  quote_count?: number;
}

export interface TweetEntities {
  hashtags?: Hashtag[];
  mentions?: Mention[];
  urls?: UrlEntity[];
}

export interface Hashtag {
  start?: number;
  end?: number;
  tag?: string;
}

export interface Mention {
  start?: number;
  end?: number;
  username?: string;
}

export interface UrlEntity {
  start?: number;
  end?: number;
  url?: string;
  expanded_url?: string;
  display_url?: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  description?: string;
  profile_image_url?: string;
  created_at?: string;
  public_metrics?: UserPublicMetrics;
  verified?: boolean;
}

export interface UserPublicMetrics {
  followers_count?: number;
  following_count?: number;
  tweet_count?: number;
  listed_count?: number;
}

export interface CreateTweetRequest {
  text: string;
  reply?: { in_reply_to_tweet_id?: string };
  quote_tweet_id?: string;
  poll?: { options?: string[]; duration_minutes?: number };
}

export interface TweetResponse {
  data?: Tweet;
}

export interface TweetsResponse {
  data?: Tweet[];
  meta?: PaginationMeta;
}

export interface UserResponse {
  data?: User;
}

export interface UsersResponse {
  data?: User[];
  meta?: PaginationMeta;
}

export interface DeleteTweetResponse {
  data?: { deleted?: boolean };
}

export interface LikeTweetRequest {
  tweet_id: string;
}

export interface LikeResponse {
  data?: { liked?: boolean };
}

export interface RetweetRequest {
  tweet_id: string;
}

export interface RetweetResponse {
  data?: { retweeted?: boolean };
}

export interface PaginationMeta {
  result_count?: number;
  next_token?: string;
  previous_token?: string;
}
