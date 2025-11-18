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

export interface UnlikeResponse {
  data?: { liked?: boolean };
}

export interface UnretweetResponse {
  data?: { retweeted?: boolean };
}

export interface FollowRequest {
  target_user_id: string;
}

export interface FollowResponse {
  data?: { following?: boolean; pending_follow?: boolean };
}

export interface UnfollowResponse {
  data?: { following?: boolean };
}

export interface BookmarkRequest {
  tweet_id: string;
}

export interface BookmarkResponse {
  data?: { bookmarked?: boolean };
}

export interface RemoveBookmarkResponse {
  data?: { bookmarked?: boolean };
}

export interface BlockRequest {
  target_user_id: string;
}

export interface BlockResponse {
  data?: { blocking?: boolean };
}

export interface UnblockResponse {
  data?: { blocking?: boolean };
}

export interface MuteRequest {
  target_user_id: string;
}

export interface MuteResponse {
  data?: { muting?: boolean };
}

export interface UnmuteResponse {
  data?: { muting?: boolean };
}

export interface List {
  id: string;
  name: string;
  description?: string;
  private?: boolean;
  follower_count?: number;
  member_count?: number;
  owner_id?: string;
  created_at?: string;
}

export interface CreateListRequest {
  name: string;
  description?: string;
  private?: boolean;
}

export interface UpdateListRequest {
  name?: string;
  description?: string;
  private?: boolean;
}

export interface ListResponse {
  data?: List;
}

export interface ListsResponse {
  data?: List[];
  meta?: PaginationMeta;
}

export interface DeleteListResponse {
  data?: { deleted?: boolean };
}

export interface AddListMemberRequest {
  user_id: string;
}

export interface AddListMemberResponse {
  data?: { is_member?: boolean };
}

export interface RemoveListMemberResponse {
  data?: { is_member?: boolean };
}

export interface FollowListRequest {
  list_id: string;
}

export interface FollowListResponse {
  data?: { following?: boolean };
}

export interface UnfollowListResponse {
  data?: { following?: boolean };
}

export interface PinListRequest {
  list_id: string;
}

export interface PinListResponse {
  data?: { pinned?: boolean };
}

export interface UnpinListResponse {
  data?: { pinned?: boolean };
}

export interface Space {
  id: string;
  state: "live" | "scheduled" | "ended";
  title?: string;
  created_at?: string;
  started_at?: string;
  ended_at?: string;
  host_ids?: string[];
  speaker_ids?: string[];
  participant_count?: number;
  is_ticketed?: boolean;
  scheduled_start?: string;
}

export interface SpaceResponse {
  data?: Space;
}

export interface SpacesResponse {
  data?: Space[];
  meta?: PaginationMeta;
}
