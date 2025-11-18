// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface CreateSessionRequest {
  identifier: string;
  password: string;
}

export interface SessionResponse {
  did: string;
  handle: string;
  email?: string;
  accessJwt: string;
  refreshJwt: string;
}

export interface ProfileViewDetailed {
  did: string;
  handle: string;
  displayName?: string;
  description?: string;
  avatar?: string;
  banner?: string;
  followersCount?: number;
  followsCount?: number;
  postsCount?: number;
  indexedAt?: string;
}

export interface ProfilesResponse {
  profiles?: ProfileViewDetailed[];
}

export interface FeedResponse {
  feed?: FeedViewPost[];
  cursor?: string;
}

export interface FeedViewPost {
  post: PostView;
  reply?: ReplyRef;
  reason?: ReasonRepost;
}

export interface PostView {
  uri: string;
  cid: string;
  author: ProfileViewBasic;
  record: Record<string, unknown>;
  replyCount?: number;
  repostCount?: number;
  likeCount?: number;
  indexedAt: string;
}

export interface ProfileViewBasic {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

export interface ReplyRef {
  root?: PostView;
  parent?: PostView;
}

export interface ReasonRepost {
  by?: ProfileViewBasic;
  indexedAt?: string;
}

export interface ThreadResponse {
  thread?: ThreadViewPost;
}

export interface ThreadViewPost {
  post?: PostView;
  parent?: ThreadViewPost;
  replies?: ThreadViewPost[];
}

export interface CreateRecordRequest {
  repo: string;
  collection: string;
  rkey?: string;
  validate?: boolean;
  record: Record<string, unknown>;
}

export interface CreateRecordResponse {
  uri: string;
  cid: string;
}

export interface DeleteRecordRequest {
  repo: string;
  collection: string;
  rkey: string;
}

export interface DeleteRecordResponse {
  success?: boolean;
}

export interface FollowersResponse {
  subject?: ProfileViewDetailed;
  followers?: ProfileViewBasic[];
  cursor?: string;
}

export interface FollowsResponse {
  subject?: ProfileViewDetailed;
  follows?: ProfileViewBasic[];
  cursor?: string;
}

export interface NotificationsResponse {
  notifications?: Notification[];
  cursor?: string;
}

export interface Notification {
  uri: string;
  cid: string;
  author: ProfileViewBasic;
  reason: string;
  reasonSubject?: string;
  record?: Record<string, unknown>;
  isRead: boolean;
  indexedAt: string;
}
