import { z } from "zod";
import { SocialPlatformEnum, MessageTypeEnum } from "./enums.schema";

// Base Message Schema
export const MessageSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),

  // Conversation and person references
  conversation_id: z.string().uuid(),
  person_id: z.string().uuid(),
  social_account_id: z.string().uuid(),
  platform: SocialPlatformEnum,

  // Message identification
  message_type: MessageTypeEnum,
  platform_message_id: z.string(),

  // Message direction
  is_from_contact: z.boolean(),

  // Content preview (first 500 chars for quick display)
  content_preview: z.string().nullable(),
  content_length: z.number().int().nullable(),

  // Media information
  has_media: z.boolean().default(false),
  media_count: z.number().int().default(0),

  // Parent message (for threading/replies)
  parent_message_id: z.string().uuid().nullable(),
  platform_parent_message_id: z.string().nullable(),

  // Status flags
  is_read: z.boolean().default(false),
  is_archived: z.boolean().default(false),
  is_deleted: z.boolean().default(false),

  // Timestamps
  platform_created_at: z.string().datetime(),
  synced_at: z.string().datetime(),
  read_at: z.string().datetime().nullable(),

  // Reference to platform-specific table
  platform_table_name: z.string().nullable(),

  // Metadata
  metadata: z.record(z.unknown()).default({}),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Message = z.infer<typeof MessageSchema>;

// Platform-specific engagement metrics
export const EngagementMetricsSchema = z.object({
  like_count: z.number().int().default(0),
  reply_count: z.number().int().default(0),
  retweet_count: z.number().int().default(0),
  quote_count: z.number().int().default(0),
  bookmark_count: z.number().int().default(0),
  impression_count: z.number().int().default(0),
}).partial();

export type EngagementMetrics = z.infer<typeof EngagementMetricsSchema>;

// Message with engagement (for public messages)
export const MessageWithEngagementSchema = MessageSchema.merge(
  z.object({
    engagement: EngagementMetricsSchema.optional(),
    platform_url: z.string().url().optional(),
  })
);

export type MessageWithEngagement = z.infer<typeof MessageWithEngagementSchema>;
