// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface ChannelListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo?: PageInfo;
  items: Channel[];
}

export interface Channel {
  kind: string;
  etag: string;
  id: string;
  snippet?: ChannelSnippet;
  contentDetails?: ChannelContentDetails;
  statistics?: ChannelStatistics;
}

export interface ChannelSnippet {
  title: string;
  description: string;
  customUrl?: string;
  publishedAt: string;
  thumbnails?: ThumbnailDetails;
  localized?: ChannelLocalization;
  country?: string;
}

export interface ChannelContentDetails {
  relatedPlaylists?: { likes?: string; uploads: string };
}

export interface ChannelStatistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

export interface ChannelLocalization {
  title: string;
  description: string;
}

export interface VideoListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo?: PageInfo;
  items: Video[];
}

export interface Video {
  kind?: string;
  etag?: string;
  id?: string;
  snippet?: VideoSnippet;
  contentDetails?: VideoContentDetails;
  statistics?: VideoStatistics;
  status?: VideoStatus;
}

export interface VideoSnippet {
  publishedAt?: string;
  channelId?: string;
  title: string;
  description: string;
  thumbnails?: ThumbnailDetails;
  channelTitle?: string;
  tags?: string[];
  categoryId: string;
  liveBroadcastContent?: string;
  defaultLanguage?: string;
  localized?: VideoLocalization;
  defaultAudioLanguage?: string;
}

export interface VideoContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  projection: string;
}

export interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount?: string;
  favoriteCount: string;
  commentCount: string;
}

export interface VideoStatus {
  uploadStatus?: string;
  failureReason?: string;
  rejectionReason?: string;
  privacyStatus: "public" | "unlisted" | "private";
  publishAt?: string;
  license?: string;
  embeddable?: boolean;
  publicStatsViewable?: boolean;
  madeForKids?: boolean;
  selfDeclaredMadeForKids?: boolean;
}

export interface VideoLocalization {
  title: string;
  description: string;
}

export interface PlaylistListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo?: PageInfo;
  items: Playlist[];
}

export interface Playlist {
  kind: string;
  etag: string;
  id: string;
  snippet?: PlaylistSnippet;
  contentDetails?: PlaylistContentDetails;
  status?: PlaylistStatus;
}

export interface PlaylistSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails?: ThumbnailDetails;
  channelTitle: string;
  tags?: string[];
  defaultLanguage?: string;
  localized?: PlaylistLocalization;
}

export interface PlaylistContentDetails {
  itemCount: number;
}

export interface PlaylistStatus {
  privacyStatus: "public" | "unlisted" | "private";
}

export interface PlaylistLocalization {
  title: string;
  description: string;
}

export interface ThumbnailDetails {
  default?: Thumbnail;
  medium?: Thumbnail;
  high?: Thumbnail;
  standard?: Thumbnail;
  maxres?: Thumbnail;
}

export interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
