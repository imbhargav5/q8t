import { z } from "zod";
import { SocialPlatformEnum } from "./enums.schema";

// Post Status Enum
export const PostStatusEnum = z.enum([
  "draft",
  "scheduled",
  "publishing",
  "published",
  "failed",
  "archived",
]);

export type PostStatus = z.infer<typeof PostStatusEnum>;

// Post Type Enum
export const PostTypeEnum = z.enum([
  "text",
  "image",
  "video",
  "carousel",
  "link",
  "poll",
  "story",
  "reel",
  "thread",
]);

export type PostType = z.infer<typeof PostTypeEnum>;

// Approval Status Enum
export const ApprovalStatusEnum = z.enum([
  "pending",
  "approved",
  "rejected",
  "needs_review",
]);

export type ApprovalStatus = z.infer<typeof ApprovalStatusEnum>;

// Media Attachment Schema for posts
export const PostMediaSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["image", "video", "gif"]),
  url: z.string().url(),
  thumbnail_url: z.string().url().nullable(),
  alt_text: z.string().nullable(),
  width: z.number().int().nullable(),
  height: z.number().int().nullable(),
  duration_seconds: z.number().nullable(),
});

export type PostMedia = z.infer<typeof PostMediaSchema>;

// Poll Schema
export const PollSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).min(2).max(4),
  duration_hours: z.number().int().min(1).max(168), // 1 hour to 7 days
});

export type Poll = z.infer<typeof PollSchema>;

// Link Preview Schema
export const LinkPreviewSchema = z.object({
  url: z.string().url(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image_url: z.string().url().nullable(),
  shortened_url: z.string().url().nullable(),
});

export type LinkPreview = z.infer<typeof LinkPreviewSchema>;

// Post Engagement Metrics Schema
export const PostEngagementMetricsSchema = z.object({
  likes: z.number().int().default(0),
  comments: z.number().int().default(0),
  shares: z.number().int().default(0),
  saves: z.number().int().default(0),
  impressions: z.number().int().default(0),
  reach: z.number().int().default(0),
  clicks: z.number().int().default(0),
  engagement_rate: z.number().default(0),
});

export type PostEngagementMetrics = z.infer<typeof PostEngagementMetricsSchema>;

// Platform-specific Post Settings
export const PlatformPostSettingsSchema = z.object({
  platform: SocialPlatformEnum,
  account_id: z.string().uuid(),

  // Platform-specific content variations
  content_override: z.string().nullable(), // Platform-specific text override

  // Platform features
  first_comment: z.string().nullable(), // Instagram first comment
  thread_tweets: z.array(z.string()).nullable(), // Twitter thread
  location_tag: z.string().nullable(),
  tagged_users: z.array(z.string()).default([]),

  // Publishing details
  platform_post_id: z.string().nullable(), // ID after publishing
  platform_url: z.string().url().nullable(), // URL to the published post
  published_at: z.string().datetime().nullable(),

  // Status
  status: PostStatusEnum,
  error_message: z.string().nullable(),
});

export type PlatformPostSettings = z.infer<typeof PlatformPostSettingsSchema>;

// Main Post Schema
export const PostSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),

  // Author
  author_id: z.string().uuid(),

  // Content
  content: z.string(), // Main text content
  media: z.array(PostMediaSchema).default([]),
  poll: PollSchema.nullable(),
  link_preview: LinkPreviewSchema.nullable(),

  // Type and platforms
  type: PostTypeEnum,
  platforms: z.array(SocialPlatformEnum), // Which platforms to publish to
  platform_settings: z.array(PlatformPostSettingsSchema).default([]), // Platform-specific settings

  // Scheduling
  scheduled_for: z.string().datetime().nullable(),
  published_at: z.string().datetime().nullable(),

  // Status
  status: PostStatusEnum.default("draft"),

  // Organization
  hashtags: z.array(z.string()).default([]),
  mentions: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]), // Custom labels/categories

  // Collaboration
  approval_status: ApprovalStatusEnum.default("pending"),
  approved_by: z.string().uuid().nullable(),
  approved_at: z.string().datetime().nullable(),
  assigned_to: z.string().uuid().nullable(),

  // Analytics
  engagement: PostEngagementMetricsSchema.nullable(),

  // Metadata
  is_pinned: z.boolean().default(false),
  template_id: z.string().uuid().nullable(), // If created from template
  parent_post_id: z.string().uuid().nullable(), // For recurring posts
  metadata: z.record(z.string(), z.unknown()).default({}),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Post = z.infer<typeof PostSchema>;

// Post with Author relation
export const PostWithAuthorSchema = PostSchema.merge(
  z.object({
    author: z.object({
      id: z.string().uuid(),
      full_name: z.string(),
      avatar_url: z.string().url().nullable(),
    }),
  })
);

export type PostWithAuthor = z.infer<typeof PostWithAuthorSchema>;
