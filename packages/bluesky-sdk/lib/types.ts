// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface app.bsky.actor.defs.profileViewBasic {
  did: string;
  handle: string;
  displayName?: string;
  pronouns?: string;
  avatar?: string;
  associated?: app.bsky.actor.defs.profileAssociated;
  viewer?: app.bsky.actor.defs.viewerState;
  labels?: com.atproto.label.defs.label[];
  createdAt?: string;
  verification?: app.bsky.actor.defs.verificationState;
  status?: app.bsky.actor.defs.statusView;
  debug?: unknown;
}

export interface app.bsky.actor.defs.profileView {
  did: string;
  handle: string;
  displayName?: string;
  pronouns?: string;
  description?: string;
  avatar?: string;
  associated?: app.bsky.actor.defs.profileAssociated;
  indexedAt?: string;
  createdAt?: string;
  viewer?: app.bsky.actor.defs.viewerState;
  labels?: com.atproto.label.defs.label[];
  verification?: app.bsky.actor.defs.verificationState;
  status?: app.bsky.actor.defs.statusView;
  debug?: unknown;
}

export interface app.bsky.actor.defs.profileViewDetailed {
  did: string;
  handle: string;
  displayName?: string;
  description?: string;
  pronouns?: string;
  website?: string;
  avatar?: string;
  banner?: string;
  followersCount?: number;
  followsCount?: number;
  postsCount?: number;
  associated?: app.bsky.actor.defs.profileAssociated;
  joinedViaStarterPack?: app.bsky.graph.defs.starterPackViewBasic;
  indexedAt?: string;
  createdAt?: string;
  viewer?: app.bsky.actor.defs.viewerState;
  labels?: com.atproto.label.defs.label[];
  pinnedPost?: com.atproto.repo.strongRef;
  verification?: app.bsky.actor.defs.verificationState;
  status?: app.bsky.actor.defs.statusView;
  debug?: unknown;
}

export interface app.bsky.actor.defs.profileAssociated {
  lists?: number;
  feedgens?: number;
  starterPacks?: number;
  labeler?: boolean;
  chat?: app.bsky.actor.defs.profileAssociatedChat;
  activitySubscription?: app.bsky.actor.defs.profileAssociatedActivitySubscription;
}

export interface app.bsky.actor.defs.profileAssociatedChat {
  allowIncoming: "all" | "none" | "following";
}

export interface app.bsky.actor.defs.profileAssociatedActivitySubscription {
  allowSubscriptions: "followers" | "mutuals" | "none";
}

export interface app.bsky.actor.defs.viewerState {
  muted?: boolean;
  mutedByList?: app.bsky.graph.defs.listViewBasic;
  blockedBy?: boolean;
  blocking?: string;
  blockingByList?: app.bsky.graph.defs.listViewBasic;
  following?: string;
  followedBy?: string;
  knownFollowers?: app.bsky.actor.defs.knownFollowers;
  activitySubscription?: app.bsky.notification.defs.activitySubscription;
}

export interface app.bsky.actor.defs.knownFollowers {
  count: number;
  followers: app.bsky.actor.defs.profileViewBasic[];
}

export interface app.bsky.actor.defs.verificationState {
  verifications: app.bsky.actor.defs.verificationView[];
  verifiedStatus: "valid" | "invalid" | "none";
  trustedVerifierStatus: "valid" | "invalid" | "none";
}

export interface app.bsky.actor.defs.verificationView {
  issuer: string;
  uri: string;
  isValid: boolean;
  createdAt: string;
}

export interface app.bsky.actor.defs.preferences {
}

export interface app.bsky.actor.defs.adultContentPref {
  enabled: boolean;
}

export interface app.bsky.actor.defs.contentLabelPref {
  labelerDid?: string;
  label: string;
  visibility: "ignore" | "show" | "warn" | "hide";
}

export interface app.bsky.actor.defs.savedFeed {
  id: string;
  type: "feed" | "list" | "timeline";
  value: string;
  pinned: boolean;
}

export interface app.bsky.actor.defs.savedFeedsPrefV2 {
  items: app.bsky.actor.defs.savedFeed[];
}

export interface app.bsky.actor.defs.savedFeedsPref {
  pinned: string[];
  saved: string[];
  timelineIndex?: number;
}

export interface app.bsky.actor.defs.personalDetailsPref {
  birthDate?: string;
}

export interface app.bsky.actor.defs.feedViewPref {
  feed: string;
  hideReplies?: boolean;
  hideRepliesByUnfollowed?: boolean;
  hideRepliesByLikeCount?: number;
  hideReposts?: boolean;
  hideQuotePosts?: boolean;
}

export interface app.bsky.actor.defs.threadViewPref {
  sort?: "oldest" | "newest" | "most-likes" | "random" | "hotness";
}

export interface app.bsky.actor.defs.interestsPref {
  tags: string[];
}

export interface app.bsky.actor.defs.mutedWordTarget {
}

export interface app.bsky.actor.defs.mutedWord {
  id?: string;
  value: string;
  targets: app.bsky.actor.defs.mutedWordTarget[];
  actorTarget?: "all" | "exclude-following";
  expiresAt?: string;
}

export interface app.bsky.actor.defs.mutedWordsPref {
  items: app.bsky.actor.defs.mutedWord[];
}

export interface app.bsky.actor.defs.hiddenPostsPref {
  items: string[];
}

export interface app.bsky.actor.defs.labelersPref {
  labelers: app.bsky.actor.defs.labelerPrefItem[];
}

export interface app.bsky.actor.defs.labelerPrefItem {
  did: string;
}

export interface app.bsky.actor.defs.bskyAppStatePref {
  activeProgressGuide?: app.bsky.actor.defs.bskyAppProgressGuide;
  queuedNudges?: string[];
  nuxs?: app.bsky.actor.defs.nux[];
}

export interface app.bsky.actor.defs.bskyAppProgressGuide {
  guide: string;
}

export interface app.bsky.actor.defs.nux {
  id: string;
  completed: boolean;
  data?: string;
  expiresAt?: string;
}

export interface app.bsky.actor.defs.verificationPrefs {
  hideBadges?: boolean;
}

export interface app.bsky.actor.defs.postInteractionSettingsPref {
  threadgateAllowRules?: unknown[];
  postgateEmbeddingRules?: unknown[];
}

export interface app.bsky.actor.defs.statusView {
  status: "app.bsky.actor.status#live";
  record: unknown;
  embed?: unknown;
  expiresAt?: string;
  isActive?: boolean;
}

export interface app.bsky.actor.profile {
  displayName?: string;
  description?: string;
  pronouns?: string;
  website?: string;
  avatar?: string;
  banner?: string;
  labels?: unknown;
  joinedViaStarterPack?: com.atproto.repo.strongRef;
  pinnedPost?: com.atproto.repo.strongRef;
  createdAt?: string;
}

export interface app.bsky.actor.status {
  status: "app.bsky.actor.status#live";
  embed?: unknown;
  durationMinutes?: number;
  createdAt: string;
}

export interface app.bsky.actor.status.live {
}

export interface app.bsky.bookmark.defs.bookmark {
  subject: com.atproto.repo.strongRef;
}

export interface app.bsky.bookmark.defs.bookmarkView {
  subject: com.atproto.repo.strongRef;
  createdAt?: string;
  item: unknown;
}

export interface app.bsky.embed.defs.aspectRatio {
  width: number;
  height: number;
}

export interface app.bsky.embed.external {
  external: app.bsky.embed.external.external;
}

export interface app.bsky.embed.external.external {
  uri: string;
  title: string;
  description: string;
  thumb?: string;
}

export interface app.bsky.embed.external.view {
  external: app.bsky.embed.external.viewExternal;
}

export interface app.bsky.embed.external.viewExternal {
  uri: string;
  title: string;
  description: string;
  thumb?: string;
}

export interface app.bsky.embed.images {
  images: app.bsky.embed.images.image[];
}

export interface app.bsky.embed.images.image {
  image: string;
  alt: string;
  aspectRatio?: app.bsky.embed.defs.aspectRatio;
}

export interface app.bsky.embed.images.view {
  images: app.bsky.embed.images.viewImage[];
}

export interface app.bsky.embed.images.viewImage {
  thumb: string;
  fullsize: string;
  alt: string;
  aspectRatio?: app.bsky.embed.defs.aspectRatio;
}

export interface app.bsky.embed.record {
  record: com.atproto.repo.strongRef;
}

export interface app.bsky.embed.record.view {
  record: unknown;
}

export interface app.bsky.embed.record.viewRecord {
  uri: string;
  cid: string;
  author: app.bsky.actor.defs.profileViewBasic;
  value: unknown;
  labels?: com.atproto.label.defs.label[];
  replyCount?: number;
  repostCount?: number;
  likeCount?: number;
  quoteCount?: number;
  embeds?: unknown[];
  indexedAt: string;
}

export interface app.bsky.embed.record.viewNotFound {
  uri: string;
  notFound: boolean;
}

export interface app.bsky.embed.record.viewBlocked {
  uri: string;
  blocked: boolean;
  author: app.bsky.feed.defs.blockedAuthor;
}

export interface app.bsky.embed.record.viewDetached {
  uri: string;
  detached: boolean;
}

export interface app.bsky.embed.recordWithMedia {
  record: app.bsky.embed.record;
  media: unknown;
}

export interface app.bsky.embed.recordWithMedia.view {
  record: app.bsky.embed.record.view;
  media: unknown;
}

export interface app.bsky.embed.video {
  video: string;
  captions?: app.bsky.embed.video.caption[];
  alt?: string;
  aspectRatio?: app.bsky.embed.defs.aspectRatio;
}

export interface app.bsky.embed.video.caption {
  lang: string;
  file: string;
}

export interface app.bsky.embed.video.view {
  cid: string;
  playlist: string;
  thumbnail?: string;
  alt?: string;
  aspectRatio?: app.bsky.embed.defs.aspectRatio;
}

export interface app.bsky.feed.defs.postView {
  uri: string;
  cid: string;
  author: app.bsky.actor.defs.profileViewBasic;
  record: unknown;
  embed?: unknown;
  bookmarkCount?: number;
  replyCount?: number;
  repostCount?: number;
  likeCount?: number;
  quoteCount?: number;
  indexedAt: string;
  viewer?: app.bsky.feed.defs.viewerState;
  labels?: com.atproto.label.defs.label[];
  threadgate?: app.bsky.feed.defs.threadgateView;
  debug?: unknown;
}

export interface app.bsky.feed.defs.viewerState {
  repost?: string;
  like?: string;
  bookmarked?: boolean;
  threadMuted?: boolean;
  replyDisabled?: boolean;
  embeddingDisabled?: boolean;
  pinned?: boolean;
}

export interface app.bsky.feed.defs.threadContext {
  rootAuthorLike?: string;
}

export interface app.bsky.feed.defs.feedViewPost {
  post: app.bsky.feed.defs.postView;
  reply?: app.bsky.feed.defs.replyRef;
  reason?: unknown;
  feedContext?: string;
  reqId?: string;
}

export interface app.bsky.feed.defs.replyRef {
  root: unknown;
  parent: unknown;
  grandparentAuthor?: app.bsky.actor.defs.profileViewBasic;
}

export interface app.bsky.feed.defs.reasonRepost {
  by: app.bsky.actor.defs.profileViewBasic;
  uri?: string;
  cid?: string;
  indexedAt: string;
}

export interface app.bsky.feed.defs.reasonPin {
}

export interface app.bsky.feed.defs.threadViewPost {
  post: app.bsky.feed.defs.postView;
  parent?: unknown;
  replies?: unknown[];
  threadContext?: app.bsky.feed.defs.threadContext;
}

export interface app.bsky.feed.defs.notFoundPost {
  uri: string;
  notFound: boolean;
}

export interface app.bsky.feed.defs.blockedPost {
  uri: string;
  blocked: boolean;
  author: app.bsky.feed.defs.blockedAuthor;
}

export interface app.bsky.feed.defs.blockedAuthor {
  did: string;
  viewer?: app.bsky.actor.defs.viewerState;
}

export interface app.bsky.feed.defs.generatorView {
  uri: string;
  cid: string;
  did: string;
  creator: app.bsky.actor.defs.profileView;
  displayName: string;
  description?: string;
  descriptionFacets?: app.bsky.richtext.facet[];
  avatar?: string;
  likeCount?: number;
  acceptsInteractions?: boolean;
  labels?: com.atproto.label.defs.label[];
  viewer?: app.bsky.feed.defs.generatorViewerState;
  contentMode?: "app.bsky.feed.defs#contentModeUnspecified" | "app.bsky.feed.defs#contentModeVideo";
  indexedAt: string;
}

export interface app.bsky.feed.defs.generatorViewerState {
  like?: string;
}

export interface app.bsky.feed.defs.skeletonFeedPost {
  post: string;
  reason?: unknown;
  feedContext?: string;
}

export interface app.bsky.feed.defs.skeletonReasonRepost {
  repost: string;
}

export interface app.bsky.feed.defs.skeletonReasonPin {
}

export interface app.bsky.feed.defs.threadgateView {
  uri?: string;
  cid?: string;
  record?: unknown;
  lists?: app.bsky.graph.defs.listViewBasic[];
}

export interface app.bsky.feed.defs.interaction {
  item?: string;
  event?: "app.bsky.feed.defs#requestLess" | "app.bsky.feed.defs#requestMore" | "app.bsky.feed.defs#clickthroughItem" | "app.bsky.feed.defs#clickthroughAuthor" | "app.bsky.feed.defs#clickthroughReposter" | "app.bsky.feed.defs#clickthroughEmbed" | "app.bsky.feed.defs#interactionSeen" | "app.bsky.feed.defs#interactionLike" | "app.bsky.feed.defs#interactionRepost" | "app.bsky.feed.defs#interactionReply" | "app.bsky.feed.defs#interactionQuote" | "app.bsky.feed.defs#interactionShare";
  feedContext?: string;
  reqId?: string;
}

export interface app.bsky.feed.defs.requestLess {
}

export interface app.bsky.feed.defs.requestMore {
}

export interface app.bsky.feed.defs.clickthroughItem {
}

export interface app.bsky.feed.defs.clickthroughAuthor {
}

export interface app.bsky.feed.defs.clickthroughReposter {
}

export interface app.bsky.feed.defs.clickthroughEmbed {
}

export interface app.bsky.feed.defs.contentModeUnspecified {
}

export interface app.bsky.feed.defs.contentModeVideo {
}

export interface app.bsky.feed.defs.interactionSeen {
}

export interface app.bsky.feed.defs.interactionLike {
}

export interface app.bsky.feed.defs.interactionRepost {
}

export interface app.bsky.feed.defs.interactionReply {
}

export interface app.bsky.feed.defs.interactionQuote {
}

export interface app.bsky.feed.defs.interactionShare {
}

export interface app.bsky.feed.describeFeedGenerator.feed {
  uri: string;
}

export interface app.bsky.feed.describeFeedGenerator.links {
  privacyPolicy?: string;
  termsOfService?: string;
}

export interface app.bsky.feed.detach {
  post: string;
  targets: string[];
  updatedAt: string;
}

export interface app.bsky.feed.generator {
  did: string;
  displayName: string;
  description?: string;
  descriptionFacets?: app.bsky.richtext.facet[];
  avatar?: string;
  acceptsInteractions?: boolean;
  labels?: unknown;
  contentMode?: "app.bsky.feed.defs#contentModeUnspecified" | "app.bsky.feed.defs#contentModeVideo";
  createdAt: string;
}

export interface app.bsky.feed.getLikes.like {
  indexedAt: string;
  createdAt: string;
  actor: app.bsky.actor.defs.profileView;
}

export interface app.bsky.feed.like {
  subject: com.atproto.repo.strongRef;
  createdAt: string;
  via?: com.atproto.repo.strongRef;
}

export interface app.bsky.feed.post {
  text: string;
  entities?: app.bsky.feed.post.entity[];
  facets?: app.bsky.richtext.facet[];
  reply?: app.bsky.feed.post.replyRef;
  embed?: unknown;
  langs?: string[];
  labels?: unknown;
  tags?: string[];
  createdAt: string;
}

export interface app.bsky.feed.post.replyRef {
  root: com.atproto.repo.strongRef;
  parent: com.atproto.repo.strongRef;
}

export interface app.bsky.feed.post.entity {
  index: app.bsky.feed.post.textSlice;
  type: string;
  value: string;
}

export interface app.bsky.feed.post.textSlice {
  start: number;
  end: number;
}

export interface app.bsky.feed.postgate {
  createdAt: string;
  post: string;
  detachedEmbeddingUris?: string[];
  embeddingRules?: unknown[];
}

export interface app.bsky.feed.postgate.disableRule {
}

export interface app.bsky.feed.repost {
  subject: com.atproto.repo.strongRef;
  createdAt: string;
  via?: com.atproto.repo.strongRef;
}

export interface app.bsky.feed.threadgate {
  post: string;
  allow?: unknown[];
  createdAt: string;
  hiddenReplies?: string[];
}

export interface app.bsky.feed.threadgate.mentionRule {
}

export interface app.bsky.feed.threadgate.followerRule {
}

export interface app.bsky.feed.threadgate.followingRule {
}

export interface app.bsky.feed.threadgate.listRule {
  list: string;
}

export interface app.bsky.graph.block {
  subject: string;
  createdAt: string;
}

export interface app.bsky.graph.defs.listViewBasic {
  uri: string;
  cid: string;
  name: string;
  purpose: app.bsky.graph.defs.listPurpose;
  avatar?: string;
  listItemCount?: number;
  labels?: com.atproto.label.defs.label[];
  viewer?: app.bsky.graph.defs.listViewerState;
  indexedAt?: string;
}

export interface app.bsky.graph.defs.listView {
  uri: string;
  cid: string;
  creator: app.bsky.actor.defs.profileView;
  name: string;
  purpose: app.bsky.graph.defs.listPurpose;
  description?: string;
  descriptionFacets?: app.bsky.richtext.facet[];
  avatar?: string;
  listItemCount?: number;
  labels?: com.atproto.label.defs.label[];
  viewer?: app.bsky.graph.defs.listViewerState;
  indexedAt: string;
}

export interface app.bsky.graph.defs.listItemView {
  uri: string;
  subject: app.bsky.actor.defs.profileView;
}

export interface app.bsky.graph.defs.starterPackView {
  uri: string;
  cid: string;
  record: unknown;
  creator: app.bsky.actor.defs.profileViewBasic;
  list?: app.bsky.graph.defs.listViewBasic;
  listItemsSample?: app.bsky.graph.defs.listItemView[];
  feeds?: app.bsky.feed.defs.generatorView[];
  joinedWeekCount?: number;
  joinedAllTimeCount?: number;
  labels?: com.atproto.label.defs.label[];
  indexedAt: string;
}

export interface app.bsky.graph.defs.starterPackViewBasic {
  uri: string;
  cid: string;
  record: unknown;
  creator: app.bsky.actor.defs.profileViewBasic;
  listItemCount?: number;
  joinedWeekCount?: number;
  joinedAllTimeCount?: number;
  labels?: com.atproto.label.defs.label[];
  indexedAt: string;
}

export interface app.bsky.graph.defs.listPurpose {
}

export interface app.bsky.graph.defs.modlist {
}

export interface app.bsky.graph.defs.curatelist {
}

export interface app.bsky.graph.defs.referencelist {
}

export interface app.bsky.graph.defs.listViewerState {
  muted?: boolean;
  blocked?: string;
}

export interface app.bsky.graph.defs.notFoundActor {
  actor: string;
  notFound: boolean;
}

export interface app.bsky.graph.defs.relationship {
  did: string;
  following?: string;
  followedBy?: string;
}

export interface app.bsky.graph.follow {
  subject: string;
  createdAt: string;
  via?: com.atproto.repo.strongRef;
}

export interface app.bsky.graph.getListsWithMembership.listWithMembership {
  list: app.bsky.graph.defs.listView;
  listItem?: app.bsky.graph.defs.listItemView;
}

export interface app.bsky.graph.getStarterPacksWithMembership.starterPackWithMembership {
  starterPack: app.bsky.graph.defs.starterPackView;
  listItem?: app.bsky.graph.defs.listItemView;
}

export interface app.bsky.graph.list {
  purpose: app.bsky.graph.defs.listPurpose;
  name: string;
  description?: string;
  descriptionFacets?: app.bsky.richtext.facet[];
  avatar?: string;
  labels?: unknown;
  createdAt: string;
}

export interface app.bsky.graph.listblock {
  subject: string;
  createdAt: string;
}

export interface app.bsky.graph.listitem {
  subject: string;
  list: string;
  createdAt: string;
}

export interface app.bsky.graph.starterpack {
  name: string;
  description?: string;
  descriptionFacets?: app.bsky.richtext.facet[];
  list: string;
  feeds?: app.bsky.graph.starterpack.feedItem[];
  createdAt: string;
}

export interface app.bsky.graph.starterpack.feedItem {
  uri: string;
}

export interface app.bsky.graph.verification {
  subject: string;
  handle: string;
  displayName: string;
  createdAt: string;
}

export interface app.bsky.labeler.defs.labelerView {
  uri: string;
  cid: string;
  creator: app.bsky.actor.defs.profileView;
  likeCount?: number;
  viewer?: app.bsky.labeler.defs.labelerViewerState;
  indexedAt: string;
  labels?: com.atproto.label.defs.label[];
}

export interface app.bsky.labeler.defs.labelerViewDetailed {
  uri: string;
  cid: string;
  creator: app.bsky.actor.defs.profileView;
  policies: app.bsky.labeler.defs.labelerPolicies;
  likeCount?: number;
  viewer?: app.bsky.labeler.defs.labelerViewerState;
  indexedAt: string;
  labels?: com.atproto.label.defs.label[];
  reasonTypes?: com.atproto.moderation.defs.reasonType[];
  subjectTypes?: com.atproto.moderation.defs.subjectType[];
  subjectCollections?: string[];
}

export interface app.bsky.labeler.defs.labelerViewerState {
  like?: string;
}

export interface app.bsky.labeler.defs.labelerPolicies {
  labelValues: com.atproto.label.defs.labelValue[];
  labelValueDefinitions?: com.atproto.label.defs.labelValueDefinition[];
}

export interface app.bsky.labeler.service {
  policies: app.bsky.labeler.defs.labelerPolicies;
  labels?: unknown;
  createdAt: string;
  reasonTypes?: com.atproto.moderation.defs.reasonType[];
  subjectTypes?: com.atproto.moderation.defs.subjectType[];
  subjectCollections?: string[];
}

export interface app.bsky.notification.declaration {
  allowSubscriptions: "followers" | "mutuals" | "none";
}

export interface app.bsky.notification.defs.recordDeleted {
}

export interface app.bsky.notification.defs.chatPreference {
  include: "all" | "accepted";
  push: boolean;
}

export interface app.bsky.notification.defs.filterablePreference {
  include: "all" | "follows";
  list: boolean;
  push: boolean;
}

export interface app.bsky.notification.defs.preference {
  list: boolean;
  push: boolean;
}

export interface app.bsky.notification.defs.preferences {
  chat: app.bsky.notification.defs.chatPreference;
  follow: app.bsky.notification.defs.filterablePreference;
  like: app.bsky.notification.defs.filterablePreference;
  likeViaRepost: app.bsky.notification.defs.filterablePreference;
  mention: app.bsky.notification.defs.filterablePreference;
  quote: app.bsky.notification.defs.filterablePreference;
  reply: app.bsky.notification.defs.filterablePreference;
  repost: app.bsky.notification.defs.filterablePreference;
  repostViaRepost: app.bsky.notification.defs.filterablePreference;
  starterpackJoined: app.bsky.notification.defs.preference;
  subscribedPost: app.bsky.notification.defs.preference;
  unverified: app.bsky.notification.defs.preference;
  verified: app.bsky.notification.defs.preference;
}

export interface app.bsky.notification.defs.activitySubscription {
  post: boolean;
  reply: boolean;
}

export interface app.bsky.notification.defs.subjectActivitySubscription {
  subject: string;
  activitySubscription: app.bsky.notification.defs.activitySubscription;
}

export interface app.bsky.notification.listNotifications.notification {
  uri: string;
  cid: string;
  author: app.bsky.actor.defs.profileView;
  reason: "like" | "repost" | "follow" | "mention" | "reply" | "quote" | "starterpack-joined" | "verified" | "unverified" | "like-via-repost" | "repost-via-repost" | "subscribed-post";
  reasonSubject?: string;
  record: unknown;
  isRead: boolean;
  indexedAt: string;
  labels?: com.atproto.label.defs.label[];
}

export interface app.bsky.richtext.facet {
  index: app.bsky.richtext.facet.byteSlice;
  features: unknown[];
}

export interface app.bsky.richtext.facet.mention {
  did: string;
}

export interface app.bsky.richtext.facet.link {
  uri: string;
}

export interface app.bsky.richtext.facet.tag {
  tag: string;
}

export interface app.bsky.richtext.facet.byteSlice {
  byteStart: number;
  byteEnd: number;
}

export interface app.bsky.unspecced.checkHandleAvailability.resultAvailable {
}

export interface app.bsky.unspecced.checkHandleAvailability.resultUnavailable {
  suggestions: app.bsky.unspecced.checkHandleAvailability.suggestion[];
}

export interface app.bsky.unspecced.checkHandleAvailability.suggestion {
  handle: string;
  method: string;
}

export interface app.bsky.unspecced.defs.skeletonSearchPost {
  uri: string;
}

export interface app.bsky.unspecced.defs.skeletonSearchActor {
  did: string;
}

export interface app.bsky.unspecced.defs.skeletonSearchStarterPack {
  uri: string;
}

export interface app.bsky.unspecced.defs.trendingTopic {
  topic: string;
  displayName?: string;
  description?: string;
  link: string;
}

export interface app.bsky.unspecced.defs.skeletonTrend {
  topic: string;
  displayName: string;
  link: string;
  startedAt: string;
  postCount: number;
  status?: "hot";
  category?: string;
  dids: string[];
}

export interface app.bsky.unspecced.defs.trendView {
  topic: string;
  displayName: string;
  link: string;
  startedAt: string;
  postCount: number;
  status?: "hot";
  category?: string;
  actors: app.bsky.actor.defs.profileViewBasic[];
}

export interface app.bsky.unspecced.defs.threadItemPost {
  post: app.bsky.feed.defs.postView;
  moreParents: boolean;
  moreReplies: number;
  opThread: boolean;
  hiddenByThreadgate: boolean;
  mutedByViewer: boolean;
}

export interface app.bsky.unspecced.defs.threadItemNoUnauthenticated {
}

export interface app.bsky.unspecced.defs.threadItemNotFound {
}

export interface app.bsky.unspecced.defs.threadItemBlocked {
  author: app.bsky.feed.defs.blockedAuthor;
}

export interface app.bsky.unspecced.defs.ageAssuranceState {
  lastInitiatedAt?: string;
  status: "unknown" | "pending" | "assured" | "blocked";
}

export interface app.bsky.unspecced.defs.ageAssuranceEvent {
  createdAt: string;
  status: "unknown" | "pending" | "assured";
  attemptId: string;
  email?: string;
  initIp?: string;
  initUa?: string;
  completeIp?: string;
  completeUa?: string;
}

export interface app.bsky.unspecced.getConfig.liveNowConfig {
  did: string;
  domains: string[];
}

export interface app.bsky.unspecced.getPostThreadHiddenV2.threadHiddenItem {
  uri: string;
  depth: number;
  value: unknown;
}

export interface app.bsky.unspecced.getPostThreadOtherV2.threadItem {
  uri: string;
  depth: number;
  value: unknown;
}

export interface app.bsky.unspecced.getPostThreadV2.threadItem {
  uri: string;
  depth: number;
  value: unknown;
}

export interface app.bsky.unspecced.getTaggedSuggestions.suggestion {
  tag: string;
  subjectType: "actor" | "feed";
  subject: string;
}

export interface app.bsky.video.defs.jobStatus {
  jobId: string;
  did: string;
  state: "JOB_STATE_COMPLETED" | "JOB_STATE_FAILED";
  progress?: number;
  blob?: string;
  error?: string;
  message?: string;
}

export interface chat.bsky.actor.declaration {
  allowIncoming: "all" | "none" | "following";
}

export interface chat.bsky.actor.defs.profileViewBasic {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
  associated?: app.bsky.actor.defs.profileAssociated;
  viewer?: app.bsky.actor.defs.viewerState;
  labels?: com.atproto.label.defs.label[];
  chatDisabled?: boolean;
  verification?: app.bsky.actor.defs.verificationState;
}

export interface chat.bsky.convo.defs.messageRef {
  did: string;
  convoId: string;
  messageId: string;
}

export interface chat.bsky.convo.defs.messageInput {
  text: string;
  facets?: app.bsky.richtext.facet[];
  embed?: unknown;
}

export interface chat.bsky.convo.defs.messageView {
  id: string;
  rev: string;
  text: string;
  facets?: app.bsky.richtext.facet[];
  embed?: unknown;
  reactions?: chat.bsky.convo.defs.reactionView[];
  sender: chat.bsky.convo.defs.messageViewSender;
  sentAt: string;
}

export interface chat.bsky.convo.defs.deletedMessageView {
  id: string;
  rev: string;
  sender: chat.bsky.convo.defs.messageViewSender;
  sentAt: string;
}

export interface chat.bsky.convo.defs.messageViewSender {
  did: string;
}

export interface chat.bsky.convo.defs.reactionView {
  value: string;
  sender: chat.bsky.convo.defs.reactionViewSender;
  createdAt: string;
}

export interface chat.bsky.convo.defs.reactionViewSender {
  did: string;
}

export interface chat.bsky.convo.defs.messageAndReactionView {
  message: chat.bsky.convo.defs.messageView;
  reaction: chat.bsky.convo.defs.reactionView;
}

export interface chat.bsky.convo.defs.convoView {
  id: string;
  rev: string;
  members: chat.bsky.actor.defs.profileViewBasic[];
  lastMessage?: unknown;
  lastReaction?: unknown;
  muted: boolean;
  status?: "request" | "accepted";
  unreadCount: number;
}

export interface chat.bsky.convo.defs.logBeginConvo {
  rev: string;
  convoId: string;
}

export interface chat.bsky.convo.defs.logAcceptConvo {
  rev: string;
  convoId: string;
}

export interface chat.bsky.convo.defs.logLeaveConvo {
  rev: string;
  convoId: string;
}

export interface chat.bsky.convo.defs.logMuteConvo {
  rev: string;
  convoId: string;
}

export interface chat.bsky.convo.defs.logUnmuteConvo {
  rev: string;
  convoId: string;
}

export interface chat.bsky.convo.defs.logCreateMessage {
  rev: string;
  convoId: string;
  message: unknown;
}

export interface chat.bsky.convo.defs.logDeleteMessage {
  rev: string;
  convoId: string;
  message: unknown;
}

export interface chat.bsky.convo.defs.logReadMessage {
  rev: string;
  convoId: string;
  message: unknown;
}

export interface chat.bsky.convo.defs.logAddReaction {
  rev: string;
  convoId: string;
  message: unknown;
  reaction: chat.bsky.convo.defs.reactionView;
}

export interface chat.bsky.convo.defs.logRemoveReaction {
  rev: string;
  convoId: string;
  message: unknown;
  reaction: chat.bsky.convo.defs.reactionView;
}

export interface chat.bsky.convo.sendMessageBatch.batchItem {
  convoId: string;
  message: chat.bsky.convo.defs.messageInput;
}

export interface chat.bsky.moderation.getActorMetadata.metadata {
  messagesSent: number;
  messagesReceived: number;
  convos: number;
  convosStarted: number;
}

export interface com.atproto.admin.defs.statusAttr {
  applied: boolean;
  ref?: string;
}

export interface com.atproto.admin.defs.accountView {
  did: string;
  handle: string;
  email?: string;
  relatedRecords?: unknown[];
  indexedAt: string;
  invitedBy?: com.atproto.server.defs.inviteCode;
  invites?: com.atproto.server.defs.inviteCode[];
  invitesDisabled?: boolean;
  emailConfirmedAt?: string;
  inviteNote?: string;
  deactivatedAt?: string;
  threatSignatures?: com.atproto.admin.defs.threatSignature[];
}

export interface com.atproto.admin.defs.repoRef {
  did: string;
}

export interface com.atproto.admin.defs.repoBlobRef {
  did: string;
  cid: string;
  recordUri?: string;
}

export interface com.atproto.admin.defs.threatSignature {
  property: string;
  value: string;
}

export interface com.atproto.identity.defs.identityInfo {
  did: string;
  handle: string;
  didDoc: unknown;
}

export interface com.atproto.label.defs.label {
  ver?: number;
  src: string;
  uri: string;
  cid?: string;
  val: string;
  neg?: boolean;
  cts: string;
  exp?: string;
  sig?: string;
}

export interface com.atproto.label.defs.selfLabels {
  values: com.atproto.label.defs.selfLabel[];
}

export interface com.atproto.label.defs.selfLabel {
  val: string;
}

export interface com.atproto.label.defs.labelValueDefinition {
  identifier: string;
  severity: "inform" | "alert" | "none";
  blurs: "content" | "media" | "none";
  defaultSetting?: "ignore" | "warn" | "hide";
  adultOnly?: boolean;
  locales: com.atproto.label.defs.labelValueDefinitionStrings[];
}

export interface com.atproto.label.defs.labelValueDefinitionStrings {
  lang: string;
  name: string;
  description: string;
}

export interface com.atproto.label.defs.labelValue {
}

export interface com.atproto.label.subscribeLabels.labels {
  seq: number;
  labels: com.atproto.label.defs.label[];
}

export interface com.atproto.label.subscribeLabels.info {
  name: "OutdatedCursor";
  message?: string;
}

export interface com.atproto.lexicon.schema {
  lexicon: number;
}

export interface com.atproto.moderation.createReport.modTool {
  name: string;
  meta?: unknown;
}

export interface com.atproto.moderation.defs.reasonType {
}

export interface com.atproto.moderation.defs.reasonSpam {
}

export interface com.atproto.moderation.defs.reasonViolation {
}

export interface com.atproto.moderation.defs.reasonMisleading {
}

export interface com.atproto.moderation.defs.reasonSexual {
}

export interface com.atproto.moderation.defs.reasonRude {
}

export interface com.atproto.moderation.defs.reasonOther {
}

export interface com.atproto.moderation.defs.reasonAppeal {
}

export interface com.atproto.moderation.defs.subjectType {
}

export interface com.atproto.repo.applyWrites.create {
  collection: string;
  rkey?: string;
  value: unknown;
}

export interface com.atproto.repo.applyWrites.update {
  collection: string;
  rkey: string;
  value: unknown;
}

export interface com.atproto.repo.applyWrites.delete {
  collection: string;
  rkey: string;
}

export interface com.atproto.repo.applyWrites.createResult {
  uri: string;
  cid: string;
  validationStatus?: "valid" | "unknown";
}

export interface com.atproto.repo.applyWrites.updateResult {
  uri: string;
  cid: string;
  validationStatus?: "valid" | "unknown";
}

export interface com.atproto.repo.applyWrites.deleteResult {
}

export interface com.atproto.repo.defs.commitMeta {
  cid: string;
  rev: string;
}

export interface com.atproto.repo.listMissingBlobs.recordBlob {
  cid: string;
  recordUri: string;
}

export interface com.atproto.repo.listRecords.record {
  uri: string;
  cid: string;
  value: unknown;
}

export interface com.atproto.repo.strongRef {
  uri: string;
  cid: string;
}

export interface com.atproto.server.createAppPassword.appPassword {
  name: string;
  password: string;
  createdAt: string;
  privileged?: boolean;
}

export interface com.atproto.server.createInviteCodes.accountCodes {
  account: string;
  codes: string[];
}

export interface com.atproto.server.defs.inviteCode {
  code: string;
  available: number;
  disabled: boolean;
  forAccount: string;
  createdBy: string;
  createdAt: string;
  uses: com.atproto.server.defs.inviteCodeUse[];
}

export interface com.atproto.server.defs.inviteCodeUse {
  usedBy: string;
  usedAt: string;
}

export interface com.atproto.server.describeServer.links {
  privacyPolicy?: string;
  termsOfService?: string;
}

export interface com.atproto.server.describeServer.contact {
  email?: string;
}

export interface com.atproto.server.listAppPasswords.appPassword {
  name: string;
  createdAt: string;
  privileged?: boolean;
}

export interface com.atproto.sync.defs.hostStatus {
}

export interface com.atproto.sync.listHosts.host {
  hostname: string;
  seq?: number;
  accountCount?: number;
  status?: com.atproto.sync.defs.hostStatus;
}

export interface com.atproto.sync.listRepos.repo {
  did: string;
  head: string;
  rev: string;
  active?: boolean;
  status?: "takendown" | "suspended" | "deleted" | "deactivated" | "desynchronized" | "throttled";
}

export interface com.atproto.sync.listReposByCollection.repo {
  did: string;
}

export interface com.atproto.sync.subscribeRepos.commit {
  seq: number;
  rebase: boolean;
  tooBig: boolean;
  repo: string;
  commit: string;
  rev: string;
  since: string;
  blocks: string;
  ops: com.atproto.sync.subscribeRepos.repoOp[];
  blobs: string[];
  prevData?: string;
  time: string;
}

export interface com.atproto.sync.subscribeRepos.sync {
  seq: number;
  did: string;
  blocks: string;
  rev: string;
  time: string;
}

export interface com.atproto.sync.subscribeRepos.identity {
  seq: number;
  did: string;
  time: string;
  handle?: string;
}

export interface com.atproto.sync.subscribeRepos.account {
  seq: number;
  did: string;
  time: string;
  active: boolean;
  status?: "takendown" | "suspended" | "deleted" | "deactivated" | "desynchronized" | "throttled";
}

export interface com.atproto.sync.subscribeRepos.info {
  name: "OutdatedCursor";
  message?: string;
}

export interface com.atproto.sync.subscribeRepos.repoOp {
  action: "create" | "update" | "delete";
  path: string;
  cid: string;
  prev?: string;
}

export interface com.atproto.temp.checkHandleAvailability.resultAvailable {
}

export interface com.atproto.temp.checkHandleAvailability.resultUnavailable {
  suggestions: com.atproto.temp.checkHandleAvailability.suggestion[];
}

export interface com.atproto.temp.checkHandleAvailability.suggestion {
  handle: string;
  method: string;
}

export interface tools.ozone.communication.defs.templateView {
  id: string;
  name: string;
  subject?: string;
  contentMarkdown: string;
  disabled: boolean;
  lang?: string;
  lastUpdatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface tools.ozone.hosting.getAccountHistory.event {
  details: unknown;
  createdBy: string;
  createdAt: string;
}

export interface tools.ozone.hosting.getAccountHistory.accountCreated {
  email?: string;
  handle?: string;
}

export interface tools.ozone.hosting.getAccountHistory.emailUpdated {
  email: string;
}

export interface tools.ozone.hosting.getAccountHistory.emailConfirmed {
  email: string;
}

export interface tools.ozone.hosting.getAccountHistory.passwordUpdated {
}

export interface tools.ozone.hosting.getAccountHistory.handleUpdated {
  handle: string;
}

export interface tools.ozone.moderation.cancelScheduledActions.cancellationResults {
  succeeded: string[];
  failed: tools.ozone.moderation.cancelScheduledActions.failedCancellation[];
}

export interface tools.ozone.moderation.cancelScheduledActions.failedCancellation {
  did: string;
  error: string;
  errorCode?: string;
}

export interface tools.ozone.moderation.defs.modEventView {
  id: number;
  event: unknown;
  subject: unknown;
  subjectBlobCids: string[];
  createdBy: string;
  createdAt: string;
  creatorHandle?: string;
  subjectHandle?: string;
  modTool?: tools.ozone.moderation.defs.modTool;
}

export interface tools.ozone.moderation.defs.modEventViewDetail {
  id: number;
  event: unknown;
  subject: unknown;
  subjectBlobs: tools.ozone.moderation.defs.blobView[];
  createdBy: string;
  createdAt: string;
  modTool?: tools.ozone.moderation.defs.modTool;
}

export interface tools.ozone.moderation.defs.subjectStatusView {
  id: number;
  subject: unknown;
  hosting?: unknown;
  subjectBlobCids?: string[];
  subjectRepoHandle?: string;
  updatedAt: string;
  createdAt: string;
  reviewState: tools.ozone.moderation.defs.subjectReviewState;
  comment?: string;
  priorityScore?: number;
  muteUntil?: string;
  muteReportingUntil?: string;
  lastReviewedBy?: string;
  lastReviewedAt?: string;
  lastReportedAt?: string;
  lastAppealedAt?: string;
  takendown?: boolean;
  appealed?: boolean;
  suspendUntil?: string;
  tags?: string[];
  accountStats?: tools.ozone.moderation.defs.accountStats;
  recordsStats?: tools.ozone.moderation.defs.recordsStats;
  accountStrike?: tools.ozone.moderation.defs.accountStrike;
  ageAssuranceState?: "pending" | "assured" | "unknown" | "reset" | "blocked";
  ageAssuranceUpdatedBy?: "admin" | "user";
}

export interface tools.ozone.moderation.defs.subjectView {
  type: com.atproto.moderation.defs.subjectType;
  subject: string;
  status?: tools.ozone.moderation.defs.subjectStatusView;
  repo?: tools.ozone.moderation.defs.repoViewDetail;
  profile?: unknown;
  record?: tools.ozone.moderation.defs.recordViewDetail;
}

export interface tools.ozone.moderation.defs.accountStats {
  reportCount?: number;
  appealCount?: number;
  suspendCount?: number;
  escalateCount?: number;
  takedownCount?: number;
}

export interface tools.ozone.moderation.defs.recordsStats {
  totalReports?: number;
  reportedCount?: number;
  escalatedCount?: number;
  appealedCount?: number;
  subjectCount?: number;
  pendingCount?: number;
  processedCount?: number;
  takendownCount?: number;
}

export interface tools.ozone.moderation.defs.accountStrike {
  activeStrikeCount?: number;
  totalStrikeCount?: number;
  firstStrikeAt?: string;
  lastStrikeAt?: string;
}

export interface tools.ozone.moderation.defs.subjectReviewState {
}

export interface tools.ozone.moderation.defs.reviewOpen {
}

export interface tools.ozone.moderation.defs.reviewEscalated {
}

export interface tools.ozone.moderation.defs.reviewClosed {
}

export interface tools.ozone.moderation.defs.reviewNone {
}

export interface tools.ozone.moderation.defs.modEventTakedown {
  comment?: string;
  durationInHours?: number;
  acknowledgeAccountSubjects?: boolean;
  policies?: string[];
  severityLevel?: string;
  strikeCount?: number;
  strikeExpiresAt?: string;
}

export interface tools.ozone.moderation.defs.modEventReverseTakedown {
  comment?: string;
  policies?: string[];
  severityLevel?: string;
  strikeCount?: number;
}

export interface tools.ozone.moderation.defs.modEventResolveAppeal {
  comment?: string;
}

export interface tools.ozone.moderation.defs.modEventComment {
  comment?: string;
  sticky?: boolean;
}

export interface tools.ozone.moderation.defs.modEventReport {
  comment?: string;
  isReporterMuted?: boolean;
  reportType: com.atproto.moderation.defs.reasonType;
}

export interface tools.ozone.moderation.defs.modEventLabel {
  comment?: string;
  createLabelVals: string[];
  negateLabelVals: string[];
  durationInHours?: number;
}

export interface tools.ozone.moderation.defs.modEventPriorityScore {
  comment?: string;
  score: number;
}

export interface tools.ozone.moderation.defs.ageAssuranceEvent {
  createdAt: string;
  status: "unknown" | "pending" | "assured";
  attemptId: string;
  initIp?: string;
  initUa?: string;
  completeIp?: string;
  completeUa?: string;
}

export interface tools.ozone.moderation.defs.ageAssuranceOverrideEvent {
  status: "assured" | "reset" | "blocked";
  comment: string;
}

export interface tools.ozone.moderation.defs.revokeAccountCredentialsEvent {
  comment: string;
}

export interface tools.ozone.moderation.defs.modEventAcknowledge {
  comment?: string;
  acknowledgeAccountSubjects?: boolean;
}

export interface tools.ozone.moderation.defs.modEventEscalate {
  comment?: string;
}

export interface tools.ozone.moderation.defs.modEventMute {
  comment?: string;
  durationInHours: number;
}

export interface tools.ozone.moderation.defs.modEventUnmute {
  comment?: string;
}

export interface tools.ozone.moderation.defs.modEventMuteReporter {
  comment?: string;
  durationInHours?: number;
}

export interface tools.ozone.moderation.defs.modEventUnmuteReporter {
  comment?: string;
}

export interface tools.ozone.moderation.defs.modEventEmail {
  subjectLine: string;
  content?: string;
  comment?: string;
  policies?: string[];
  severityLevel?: string;
  strikeCount?: number;
  strikeExpiresAt?: string;
}

export interface tools.ozone.moderation.defs.modEventDivert {
  comment?: string;
}

export interface tools.ozone.moderation.defs.modEventTag {
  add: string[];
  remove: string[];
  comment?: string;
}

export interface tools.ozone.moderation.defs.accountEvent {
  comment?: string;
  active: boolean;
  status?: "unknown" | "deactivated" | "deleted" | "takendown" | "suspended" | "tombstoned";
  timestamp: string;
}

export interface tools.ozone.moderation.defs.identityEvent {
  comment?: string;
  handle?: string;
  pdsHost?: string;
  tombstone?: boolean;
  timestamp: string;
}

export interface tools.ozone.moderation.defs.recordEvent {
  comment?: string;
  op: "create" | "update" | "delete";
  cid?: string;
  timestamp: string;
}

export interface tools.ozone.moderation.defs.scheduleTakedownEvent {
  comment?: string;
  executeAt?: string;
  executeAfter?: string;
  executeUntil?: string;
}

export interface tools.ozone.moderation.defs.cancelScheduledTakedownEvent {
  comment?: string;
}

export interface tools.ozone.moderation.defs.repoView {
  did: string;
  handle: string;
  email?: string;
  relatedRecords: unknown[];
  indexedAt: string;
  moderation: tools.ozone.moderation.defs.moderation;
  invitedBy?: com.atproto.server.defs.inviteCode;
  invitesDisabled?: boolean;
  inviteNote?: string;
  deactivatedAt?: string;
  threatSignatures?: com.atproto.admin.defs.threatSignature[];
}

export interface tools.ozone.moderation.defs.repoViewDetail {
  did: string;
  handle: string;
  email?: string;
  relatedRecords: unknown[];
  indexedAt: string;
  moderation: tools.ozone.moderation.defs.moderationDetail;
  labels?: com.atproto.label.defs.label[];
  invitedBy?: com.atproto.server.defs.inviteCode;
  invites?: com.atproto.server.defs.inviteCode[];
  invitesDisabled?: boolean;
  inviteNote?: string;
  emailConfirmedAt?: string;
  deactivatedAt?: string;
  threatSignatures?: com.atproto.admin.defs.threatSignature[];
}

export interface tools.ozone.moderation.defs.repoViewNotFound {
  did: string;
}

export interface tools.ozone.moderation.defs.recordView {
  uri: string;
  cid: string;
  value: unknown;
  blobCids: string[];
  indexedAt: string;
  moderation: tools.ozone.moderation.defs.moderation;
  repo: tools.ozone.moderation.defs.repoView;
}

export interface tools.ozone.moderation.defs.recordViewDetail {
  uri: string;
  cid: string;
  value: unknown;
  blobs: tools.ozone.moderation.defs.blobView[];
  labels?: com.atproto.label.defs.label[];
  indexedAt: string;
  moderation: tools.ozone.moderation.defs.moderationDetail;
  repo: tools.ozone.moderation.defs.repoView;
}

export interface tools.ozone.moderation.defs.recordViewNotFound {
  uri: string;
}

export interface tools.ozone.moderation.defs.moderation {
  subjectStatus?: tools.ozone.moderation.defs.subjectStatusView;
}

export interface tools.ozone.moderation.defs.moderationDetail {
  subjectStatus?: tools.ozone.moderation.defs.subjectStatusView;
}

export interface tools.ozone.moderation.defs.blobView {
  cid: string;
  mimeType: string;
  size: number;
  createdAt: string;
  details?: unknown;
  moderation?: tools.ozone.moderation.defs.moderation;
}

export interface tools.ozone.moderation.defs.imageDetails {
  width: number;
  height: number;
}

export interface tools.ozone.moderation.defs.videoDetails {
  width: number;
  height: number;
  length: number;
}

export interface tools.ozone.moderation.defs.accountHosting {
  status: "takendown" | "suspended" | "deleted" | "deactivated" | "unknown";
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
  deactivatedAt?: string;
  reactivatedAt?: string;
}

export interface tools.ozone.moderation.defs.recordHosting {
  status: "deleted" | "unknown";
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface tools.ozone.moderation.defs.reporterStats {
  did: string;
  accountReportCount: number;
  recordReportCount: number;
  reportedAccountCount: number;
  reportedRecordCount: number;
  takendownAccountCount: number;
  takendownRecordCount: number;
  labeledAccountCount: number;
  labeledRecordCount: number;
}

export interface tools.ozone.moderation.defs.modTool {
  name: string;
  meta?: unknown;
}

export interface tools.ozone.moderation.defs.timelineEventPlcCreate {
}

export interface tools.ozone.moderation.defs.timelineEventPlcOperation {
}

export interface tools.ozone.moderation.defs.timelineEventPlcTombstone {
}

export interface tools.ozone.moderation.defs.scheduledActionView {
  id: number;
  action: "takedown";
  eventData?: unknown;
  did: string;
  executeAt?: string;
  executeAfter?: string;
  executeUntil?: string;
  randomizeExecution?: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  status: "pending" | "executed" | "cancelled" | "failed";
  lastExecutedAt?: string;
  lastFailureReason?: string;
  executionEventId?: number;
}

export interface tools.ozone.moderation.getAccountTimeline.timelineItem {
  day: string;
  summary: tools.ozone.moderation.getAccountTimeline.timelineItemSummary[];
}

export interface tools.ozone.moderation.getAccountTimeline.timelineItemSummary {
  eventSubjectType: "account" | "record" | "chat";
  eventType: "tools.ozone.moderation.defs#modEventTakedown" | "tools.ozone.moderation.defs#modEventReverseTakedown" | "tools.ozone.moderation.defs#modEventComment" | "tools.ozone.moderation.defs#modEventReport" | "tools.ozone.moderation.defs#modEventLabel" | "tools.ozone.moderation.defs#modEventAcknowledge" | "tools.ozone.moderation.defs#modEventEscalate" | "tools.ozone.moderation.defs#modEventMute" | "tools.ozone.moderation.defs#modEventUnmute" | "tools.ozone.moderation.defs#modEventMuteReporter" | "tools.ozone.moderation.defs#modEventUnmuteReporter" | "tools.ozone.moderation.defs#modEventEmail" | "tools.ozone.moderation.defs#modEventResolveAppeal" | "tools.ozone.moderation.defs#modEventDivert" | "tools.ozone.moderation.defs#modEventTag" | "tools.ozone.moderation.defs#accountEvent" | "tools.ozone.moderation.defs#identityEvent" | "tools.ozone.moderation.defs#recordEvent" | "tools.ozone.moderation.defs#modEventPriorityScore" | "tools.ozone.moderation.defs#revokeAccountCredentialsEvent" | "tools.ozone.moderation.defs#ageAssuranceEvent" | "tools.ozone.moderation.defs#ageAssuranceOverrideEvent" | "tools.ozone.moderation.defs#timelineEventPlcCreate" | "tools.ozone.moderation.defs#timelineEventPlcOperation" | "tools.ozone.moderation.defs#timelineEventPlcTombstone" | "tools.ozone.hosting.getAccountHistory#accountCreated" | "tools.ozone.hosting.getAccountHistory#emailConfirmed" | "tools.ozone.hosting.getAccountHistory#passwordUpdated" | "tools.ozone.hosting.getAccountHistory#handleUpdated" | "tools.ozone.moderation.defs#scheduleTakedownEvent" | "tools.ozone.moderation.defs#cancelScheduledTakedownEvent";
  count: number;
}

export interface tools.ozone.moderation.scheduleAction.takedown {
  comment?: string;
  durationInHours?: number;
  acknowledgeAccountSubjects?: boolean;
  policies?: string[];
}

export interface tools.ozone.moderation.scheduleAction.schedulingConfig {
  executeAt?: string;
  executeAfter?: string;
  executeUntil?: string;
}

export interface tools.ozone.moderation.scheduleAction.scheduledActionResults {
  succeeded: string[];
  failed: tools.ozone.moderation.scheduleAction.failedScheduling[];
}

export interface tools.ozone.moderation.scheduleAction.failedScheduling {
  subject: string;
  error: string;
  errorCode?: string;
}

export interface tools.ozone.report.defs.reasonType {
}

export interface tools.ozone.report.defs.reasonAppeal {
}

export interface tools.ozone.report.defs.reasonOther {
}

export interface tools.ozone.report.defs.reasonViolenceAnimal {
}

export interface tools.ozone.report.defs.reasonViolenceThreats {
}

export interface tools.ozone.report.defs.reasonViolenceGraphicContent {
}

export interface tools.ozone.report.defs.reasonViolenceGlorification {
}

export interface tools.ozone.report.defs.reasonViolenceExtremistContent {
}

export interface tools.ozone.report.defs.reasonViolenceTrafficking {
}

export interface tools.ozone.report.defs.reasonViolenceOther {
}

export interface tools.ozone.report.defs.reasonSexualAbuseContent {
}

export interface tools.ozone.report.defs.reasonSexualNCII {
}

export interface tools.ozone.report.defs.reasonSexualDeepfake {
}

export interface tools.ozone.report.defs.reasonSexualAnimal {
}

export interface tools.ozone.report.defs.reasonSexualUnlabeled {
}

export interface tools.ozone.report.defs.reasonSexualOther {
}

export interface tools.ozone.report.defs.reasonChildSafetyCSAM {
}

export interface tools.ozone.report.defs.reasonChildSafetyGroom {
}

export interface tools.ozone.report.defs.reasonChildSafetyPrivacy {
}

export interface tools.ozone.report.defs.reasonChildSafetyHarassment {
}

export interface tools.ozone.report.defs.reasonChildSafetyOther {
}

export interface tools.ozone.report.defs.reasonHarassmentTroll {
}

export interface tools.ozone.report.defs.reasonHarassmentTargeted {
}

export interface tools.ozone.report.defs.reasonHarassmentHateSpeech {
}

export interface tools.ozone.report.defs.reasonHarassmentDoxxing {
}

export interface tools.ozone.report.defs.reasonHarassmentOther {
}

export interface tools.ozone.report.defs.reasonMisleadingBot {
}

export interface tools.ozone.report.defs.reasonMisleadingImpersonation {
}

export interface tools.ozone.report.defs.reasonMisleadingSpam {
}

export interface tools.ozone.report.defs.reasonMisleadingScam {
}

export interface tools.ozone.report.defs.reasonMisleadingElections {
}

export interface tools.ozone.report.defs.reasonMisleadingOther {
}

export interface tools.ozone.report.defs.reasonRuleSiteSecurity {
}

export interface tools.ozone.report.defs.reasonRuleProhibitedSales {
}

export interface tools.ozone.report.defs.reasonRuleBanEvasion {
}

export interface tools.ozone.report.defs.reasonRuleOther {
}

export interface tools.ozone.report.defs.reasonSelfHarmContent {
}

export interface tools.ozone.report.defs.reasonSelfHarmED {
}

export interface tools.ozone.report.defs.reasonSelfHarmStunts {
}

export interface tools.ozone.report.defs.reasonSelfHarmSubstances {
}

export interface tools.ozone.report.defs.reasonSelfHarmOther {
}

export interface tools.ozone.safelink.defs.event {
  id: number;
  eventType: tools.ozone.safelink.defs.eventType;
  url: string;
  pattern: tools.ozone.safelink.defs.patternType;
  action: tools.ozone.safelink.defs.actionType;
  reason: tools.ozone.safelink.defs.reasonType;
  createdBy: string;
  createdAt: string;
  comment?: string;
}

export interface tools.ozone.safelink.defs.eventType {
}

export interface tools.ozone.safelink.defs.patternType {
}

export interface tools.ozone.safelink.defs.actionType {
}

export interface tools.ozone.safelink.defs.reasonType {
}

export interface tools.ozone.safelink.defs.urlRule {
  url: string;
  pattern: tools.ozone.safelink.defs.patternType;
  action: tools.ozone.safelink.defs.actionType;
  reason: tools.ozone.safelink.defs.reasonType;
  comment?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface tools.ozone.server.getConfig.serviceConfig {
  url?: string;
}

export interface tools.ozone.server.getConfig.viewerConfig {
  role?: "tools.ozone.team.defs#roleAdmin" | "tools.ozone.team.defs#roleModerator" | "tools.ozone.team.defs#roleTriage" | "tools.ozone.team.defs#roleVerifier";
}

export interface tools.ozone.set.defs.set {
  name: string;
  description?: string;
}

export interface tools.ozone.set.defs.setView {
  name: string;
  description?: string;
  setSize: number;
  createdAt: string;
  updatedAt: string;
}

export interface tools.ozone.setting.defs.option {
  key: string;
  did: string;
  value: unknown;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  managerRole?: "tools.ozone.team.defs#roleModerator" | "tools.ozone.team.defs#roleTriage" | "tools.ozone.team.defs#roleAdmin" | "tools.ozone.team.defs#roleVerifier";
  scope: "instance" | "personal";
  createdBy: string;
  lastUpdatedBy: string;
}

export interface tools.ozone.signature.defs.sigDetail {
  property: string;
  value: string;
}

export interface tools.ozone.signature.findRelatedAccounts.relatedAccount {
  account: com.atproto.admin.defs.accountView;
  similarities?: tools.ozone.signature.defs.sigDetail[];
}

export interface tools.ozone.team.defs.member {
  did: string;
  disabled?: boolean;
  profile?: app.bsky.actor.defs.profileViewDetailed;
  createdAt?: string;
  updatedAt?: string;
  lastUpdatedBy?: string;
  role: "#roleAdmin" | "#roleModerator" | "#roleTriage" | "#roleVerifier";
}

export interface tools.ozone.team.defs.roleAdmin {
}

export interface tools.ozone.team.defs.roleModerator {
}

export interface tools.ozone.team.defs.roleTriage {
}

export interface tools.ozone.team.defs.roleVerifier {
}

export interface tools.ozone.verification.defs.verificationView {
  issuer: string;
  uri: string;
  subject: string;
  handle: string;
  displayName: string;
  createdAt: string;
  revokeReason?: string;
  revokedAt?: string;
  revokedBy?: string;
  subjectProfile?: unknown;
  issuerProfile?: unknown;
  subjectRepo?: unknown;
  issuerRepo?: unknown;
}

export interface tools.ozone.verification.grantVerifications.verificationInput {
  subject: string;
  handle: string;
  displayName: string;
  createdAt?: string;
}

export interface tools.ozone.verification.grantVerifications.grantError {
  error: string;
  subject: string;
}

export interface tools.ozone.verification.revokeVerifications.revokeError {
  uri: string;
  error: string;
}
