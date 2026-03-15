import { z } from "zod";

// ============================================================================
// CRISIS MANAGEMENT SCHEMAS
// ============================================================================

export const CrisisSeveritySchema = z.enum(["low", "medium", "high", "critical"]);
export const CrisisStatusSchema = z.enum(["detected", "acknowledged", "investigating", "resolving", "resolved"]);
export const CrisisDetectionTypeSchema = z.enum(["sentiment_spike", "keyword_match", "volume_spike", "manual"]);
export const ComponentStatusSchema = z.enum(["operational", "degraded", "partial_outage", "major_outage", "maintenance"]);
export const SentimentTypeSchema = z.enum(["positive", "neutral", "negative"]);

export const MessageSentimentSchema = z.object({
  id: z.string(),
  messageId: z.string(),
  workspaceId: z.string(),
  sentiment: SentimentTypeSchema,
  score: z.number().min(-1).max(1),
  confidence: z.number().min(0).max(1).optional(),
  emotions: z.record(z.string(), z.number()).optional(),
  keywords: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  analyzer: z.string(),
  modelVersion: z.string().optional(),
  analyzedAt: z.string(),
});

export const CrisisDetectionRuleSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  isActive: z.boolean(),
  detectionType: CrisisDetectionTypeSchema,
  thresholdConfig: z.record(z.string(), z.any()),
  filterPlatforms: z.array(z.string()).optional(),
  filterSentiment: z.array(SentimentTypeSchema).optional(),
  autoCreateIncident: z.boolean(),
  notifyUsers: z.array(z.string()).optional(),
  notificationChannels: z.array(z.string()).optional(),
  priority: z.number(),
  lastTriggeredAt: z.string().optional(),
  triggerCount: z.number(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CrisisIncidentSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  severity: CrisisSeveritySchema,
  status: CrisisStatusSchema,
  detectionType: CrisisDetectionTypeSchema,
  detectionRuleId: z.string().optional(),
  detectionConfig: z.record(z.string(), z.any()).optional(),
  platforms: z.array(z.string()),
  negativeMessageCount: z.number(),
  totalMessageCount: z.number(),
  averageSentimentScore: z.number().optional(),
  detectedAt: z.string(),
  acknowledgedAt: z.string().optional(),
  acknowledgedBy: z.string().optional(),
  resolvedAt: z.string().optional(),
  resolvedBy: z.string().optional(),
  resolutionNotes: z.string().optional(),
  resolutionActions: z.array(z.any()),
  relatedConversationIds: z.array(z.string()),
  relatedMessageIds: z.array(z.string()),
  statusUpdates: z.array(z.any()),
  estimatedReach: z.number().optional(),
  impactNotes: z.string().optional(),
  metadata: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const StatusComponentSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  componentType: z.string(),
  status: ComponentStatusSchema,
  displayOrder: z.number(),
  isVisible: z.boolean(),
  lastStatusChange: z.string().optional(),
  lastIncidentAt: z.string().optional(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const StatusPageUpdateSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  componentId: z.string().optional(),
  incidentId: z.string().optional(),
  title: z.string(),
  body: z.string(),
  status: ComponentStatusSchema,
  isPinned: z.boolean(),
  isPublic: z.boolean(),
  postedBy: z.string(),
  postedAt: z.string(),
  metadata: z.record(z.string(), z.any()),
  createdAt: z.string(),
});

// ============================================================================
// CONTENT AUTOMATION SCHEMAS
// ============================================================================

export const QueueScheduleTypeSchema = z.enum(["interval", "time_slots", "optimal"]);
export const QueueItemStatusSchema = z.enum(["pending", "scheduled", "published", "failed", "skipped"]);

export const RSSFeedSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  name: z.string(),
  feedUrl: z.string(),
  description: z.string().optional(),
  autoPublish: z.boolean(),
  targetPlatforms: z.array(z.string()),
  targetSocialAccountIds: z.array(z.string()).optional(),
  postTemplate: z.string().optional(),
  checkIntervalMinutes: z.number(),
  lastCheckedAt: z.string().optional(),
  lastPublishedAt: z.string().optional(),
  keywordFilters: z.array(z.string()).optional(),
  excludeKeywords: z.array(z.string()).optional(),
  categoryFilters: z.array(z.string()).optional(),
  maxPostsPerDay: z.number().optional(),
  isActive: z.boolean(),
  healthStatus: z.string(),
  lastError: z.string().optional(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const RSSFeedItemSchema = z.object({
  id: z.string(),
  feedId: z.string(),
  workspaceId: z.string(),
  guid: z.string(),
  title: z.string(),
  link: z.string(),
  description: z.string().optional(),
  author: z.string().optional(),
  categories: z.array(z.string()),
  publishedAt: z.string().optional(),
  wasPublished: z.boolean(),
  postId: z.string().optional(),
  publishedToPlatforms: z.array(z.string()),
  matchedFilters: z.array(z.string()).optional(),
  excludedReason: z.string().optional(),
  metadata: z.record(z.string(), z.any()),
  discoveredAt: z.string(),
});

export const EvergreenContentSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  title: z.string(),
  content: z.string(),
  mediaAssetIds: z.array(z.string()),
  platforms: z.array(z.string()),
  socialAccountIds: z.array(z.string()).optional(),
  platformVariations: z.record(z.string(), z.any()),
  recycleIntervalDays: z.number(),
  lastPostedAt: z.string().optional(),
  nextPostAt: z.string().optional(),
  timesPosted: z.number(),
  maxReposts: z.number().optional(),
  totalEngagement: z.number(),
  avgEngagementRate: z.number().optional(),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  isActive: z.boolean(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ContentQueueSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  color: z.string().optional(),
  platforms: z.array(z.string()),
  socialAccountIds: z.array(z.string()).optional(),
  scheduleType: QueueScheduleTypeSchema,
  scheduleConfig: z.record(z.string(), z.any()),
  timezone: z.string(),
  postsPerDay: z.number().optional(),
  shufflePosts: z.boolean(),
  skipWeekends: z.boolean(),
  skipHolidays: z.boolean(),
  autoFillEnabled: z.boolean(),
  autoFillSources: z.array(z.string()).optional(),
  isActive: z.boolean(),
  pausedUntil: z.string().optional(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ContentQueueItemSchema = z.object({
  id: z.string(),
  queueId: z.string(),
  postId: z.string(),
  workspaceId: z.string(),
  position: z.number(),
  status: QueueItemStatusSchema,
  scheduledFor: z.string().optional(),
  publishedAt: z.string().optional(),
  publicationIds: z.array(z.string()).optional(),
  errorMessage: z.string().optional(),
  retryCount: z.number(),
  metadata: z.record(z.string(), z.any()),
  addedAt: z.string(),
  updatedAt: z.string(),
});

// ============================================================================
// SOCIAL LISTENING SCHEMAS
// ============================================================================

export const ListeningStreamTypeSchema = z.enum([
  "brand_mentions",
  "competitor",
  "keyword",
  "hashtag",
  "influencer",
  "industry",
  "custom",
]);

export const ListeningAlertTypeSchema = z.enum([
  "mention_spike",
  "sentiment_spike",
  "influencer_mention",
  "crisis_keyword",
  "competitor_activity",
  "viral_content",
  "review_received",
]);

export const AlertSeveritySchema = z.enum(["info", "warning", "critical"]);

export const ListeningStreamSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  streamType: ListeningStreamTypeSchema,
  color: z.string().optional(),
  searchConfig: z.record(z.string(), z.any()),
  platforms: z.array(z.string()),
  excludedPlatforms: z.array(z.string()),
  alertEnabled: z.boolean(),
  alertConfig: z.record(z.string(), z.any()).optional(),
  autoRefresh: z.boolean(),
  refreshIntervalMinutes: z.number(),
  lastRefreshedAt: z.string().optional(),
  languageCodes: z.array(z.string()).optional(),
  locationFilters: z.record(z.string(), z.any()).optional(),
  minEngagement: z.number().optional(),
  folder: z.string().optional(),
  tags: z.array(z.string()),
  isActive: z.boolean(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ListeningStreamItemSchema = z.object({
  id: z.string(),
  streamId: z.string(),
  workspaceId: z.string(),
  platform: z.string(),
  platformPostId: z.string(),
  platformUrl: z.string().optional(),
  authorName: z.string(),
  authorHandle: z.string().optional(),
  authorProfileUrl: z.string().optional(),
  authorAvatarUrl: z.string().optional(),
  authorVerified: z.boolean(),
  content: z.string().optional(),
  contentPreview: z.string().optional(),
  mediaUrls: z.array(z.string()),
  hashtags: z.array(z.string()),
  mentions: z.array(z.string()),
  engagementCount: z.number(),
  likesCount: z.number(),
  commentsCount: z.number(),
  sharesCount: z.number(),
  viewsCount: z.number().optional(),
  followerCount: z.number().optional(),
  isInfluencer: z.boolean(),
  sentiment: SentimentTypeSchema.optional(),
  sentimentScore: z.number().optional(),
  sentimentConfidence: z.number().optional(),
  sentimentKeywords: z.array(z.string()).optional(),
  emotions: z.record(z.string(), z.number()).optional(),
  categories: z.array(z.string()),
  matchedKeywords: z.array(z.string()),
  potentialReach: z.number().optional(),
  actualReach: z.number().optional(),
  engagementScore: z.number().optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  isRead: z.boolean(),
  isStarred: z.boolean(),
  isArchived: z.boolean(),
  repliedTo: z.boolean(),
  convertedToConversation: z.boolean(),
  conversationId: z.string().optional(),
  postedAt: z.string().optional(),
  discoveredAt: z.string(),
  metadata: z.record(z.string(), z.any()),
  createdAt: z.string(),
});

export const ListeningAlertSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  streamId: z.string().optional(),
  alertType: ListeningAlertTypeSchema,
  severity: AlertSeveritySchema,
  title: z.string(),
  description: z.string().optional(),
  triggerData: z.record(z.string(), z.any()).optional(),
  affectedPlatforms: z.array(z.string()),
  relatedStreamItemIds: z.array(z.string()),
  notifiedUsers: z.array(z.string()),
  notificationChannels: z.array(z.string()),
  notificationSentAt: z.string().optional(),
  isAcknowledged: z.boolean(),
  acknowledgedBy: z.string().optional(),
  acknowledgedAt: z.string().optional(),
  acknowledgmentNotes: z.string().optional(),
  actionsTaken: z.array(z.any()),
  triggeredAt: z.string(),
  metadata: z.record(z.string(), z.any()),
  createdAt: z.string(),
});

// ============================================================================
// ANALYTICS AUTOMATION SCHEMAS
// ============================================================================

export const ReportTypeSchema = z.enum([
  "performance",
  "engagement",
  "growth",
  "competitor",
  "roi",
  "sentiment",
  "content",
  "custom",
]);

export const ReportFormatSchema = z.enum(["pdf", "csv", "excel", "html", "json"]);
export const ReportDeliverySchema = z.enum(["email", "slack", "webhook", "download"]);
export const ExecutionStatusSchema = z.enum(["pending", "running", "completed", "failed", "cancelled"]);

export const ScheduledReportSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  reportType: ReportTypeSchema,
  reportConfig: z.record(z.string(), z.any()),
  scheduleCron: z.string(),
  timezone: z.string(),
  recipients: z.array(z.string()),
  ccRecipients: z.array(z.string()),
  bccRecipients: z.array(z.string()),
  format: ReportFormatSchema,
  deliveryMethod: ReportDeliverySchema,
  deliveryConfig: z.record(z.string(), z.any()),
  isActive: z.boolean(),
  lastSentAt: z.string().optional(),
  nextSendAt: z.string().optional(),
  lastExecutionStatus: ExecutionStatusSchema.optional(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const PerformanceAlertSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  metric: z.string(),
  thresholdConfig: z.record(z.string(), z.any()),
  checkIntervalMinutes: z.number(),
  lastCheckedAt: z.string().optional(),
  notifyUsers: z.array(z.string()),
  notificationChannels: z.array(z.string()),
  notificationConfig: z.record(z.string(), z.any()),
  isActive: z.boolean(),
  lastTriggeredAt: z.string().optional(),
  triggerCount: z.number(),
  cooldownMinutes: z.number(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ============================================================================
// WORKFLOW AUTOMATION SCHEMAS
// ============================================================================

export const ApprovalStatusSchema = z.enum(["pending", "approved", "rejected", "expired", "cancelled"]);
export const ApprovalDecisionSchema = z.enum(["pending", "approved", "rejected"]);

export const ApprovalWorkflowSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  steps: z.array(z.any()),
  applyConditions: z.record(z.string(), z.any()).optional(),
  autoScheduleOnApproval: z.boolean(),
  autoNotifyApprovers: z.boolean(),
  expiryDays: z.number(),
  allowComments: z.boolean(),
  isActive: z.boolean(),
  isDefault: z.boolean(),
  priority: z.number(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ApprovalRequestSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  workflowId: z.string(),
  postId: z.string().optional(),
  workflowSteps: z.array(z.any()),
  status: ApprovalStatusSchema,
  currentLevel: z.number(),
  submittedBy: z.string(),
  submissionNote: z.string().optional(),
  submittedAt: z.string(),
  resolvedAt: z.string().optional(),
  resolvedBy: z.string().optional(),
  resolutionNote: z.string().optional(),
  expiresAt: z.string(),
  commentsCount: z.number(),
  metadata: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ApprovalSchema = z.object({
  id: z.string(),
  requestId: z.string(),
  workspaceId: z.string(),
  approverId: z.string(),
  level: z.number(),
  decision: ApprovalDecisionSchema,
  comments: z.string().optional(),
  notifiedAt: z.string(),
  respondedAt: z.string().optional(),
  reminderSentAt: z.string().optional(),
  metadata: z.record(z.string(), z.any()),
  createdAt: z.string(),
});

// Type exports
export type CrisisSeverity = z.infer<typeof CrisisSeveritySchema>;
export type CrisisStatus = z.infer<typeof CrisisStatusSchema>;
export type CrisisDetectionType = z.infer<typeof CrisisDetectionTypeSchema>;
export type ComponentStatus = z.infer<typeof ComponentStatusSchema>;
export type SentimentType = z.infer<typeof SentimentTypeSchema>;
export type MessageSentiment = z.infer<typeof MessageSentimentSchema>;
export type CrisisDetectionRule = z.infer<typeof CrisisDetectionRuleSchema>;
export type CrisisIncident = z.infer<typeof CrisisIncidentSchema>;
export type StatusComponent = z.infer<typeof StatusComponentSchema>;
export type StatusPageUpdate = z.infer<typeof StatusPageUpdateSchema>;
export type QueueScheduleType = z.infer<typeof QueueScheduleTypeSchema>;
export type QueueItemStatus = z.infer<typeof QueueItemStatusSchema>;
export type RSSFeed = z.infer<typeof RSSFeedSchema>;
export type RSSFeedItem = z.infer<typeof RSSFeedItemSchema>;
export type EvergreenContent = z.infer<typeof EvergreenContentSchema>;
export type ContentQueue = z.infer<typeof ContentQueueSchema>;
export type ContentQueueItem = z.infer<typeof ContentQueueItemSchema>;
export type ListeningStreamType = z.infer<typeof ListeningStreamTypeSchema>;
export type ListeningAlertType = z.infer<typeof ListeningAlertTypeSchema>;
export type AlertSeverity = z.infer<typeof AlertSeveritySchema>;
export type ListeningStream = z.infer<typeof ListeningStreamSchema>;
export type ListeningStreamItem = z.infer<typeof ListeningStreamItemSchema>;
export type ListeningAlert = z.infer<typeof ListeningAlertSchema>;
export type ReportType = z.infer<typeof ReportTypeSchema>;
export type ReportFormat = z.infer<typeof ReportFormatSchema>;
export type ReportDelivery = z.infer<typeof ReportDeliverySchema>;
export type ExecutionStatus = z.infer<typeof ExecutionStatusSchema>;
export type ScheduledReport = z.infer<typeof ScheduledReportSchema>;
export type PerformanceAlert = z.infer<typeof PerformanceAlertSchema>;
export type WorkflowApprovalStatus = z.infer<typeof ApprovalStatusSchema>;
export type WorkflowApprovalDecision = z.infer<typeof ApprovalDecisionSchema>;
export type ApprovalWorkflow = z.infer<typeof ApprovalWorkflowSchema>;
export type ApprovalRequest = z.infer<typeof ApprovalRequestSchema>;
export type Approval = z.infer<typeof ApprovalSchema>;
