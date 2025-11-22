import { z } from "zod";
import { SocialPlatformEnum } from "./enums.schema";

// Sentiment Enum
export const SentimentEnum = z.enum(["positive", "negative", "neutral"]);
export type Sentiment = z.infer<typeof SentimentEnum>;

// Listening Keyword Schema
export const ListeningKeywordSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),

  // Keyword details
  keyword: z.string(),
  type: z.enum(["keyword", "hashtag", "mention", "brand"]),

  // Tracking settings
  platforms: z.array(SocialPlatformEnum),
  is_active: z.boolean().default(true),

  // Filters
  languages: z.array(z.string()).default([]),
  sentiment_filter: SentimentEnum.nullable(),

  // Notifications
  notify_on_mention: z.boolean().default(false),
  notification_threshold: z.number().int().default(10), // Notify when mentions exceed this

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type ListeningKeyword = z.infer<typeof ListeningKeywordSchema>;

// Social Mention Schema
export const SocialMentionSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  keyword_id: z.string().uuid(),

  // Platform details
  platform: SocialPlatformEnum,
  platform_post_id: z.string(),
  platform_url: z.string().url(),

  // Author
  author_name: z.string(),
  author_handle: z.string(),
  author_avatar_url: z.string().url().nullable(),
  author_followers: z.number().int().nullable(),

  // Content
  content: z.string(),
  media_urls: z.array(z.string().url()).default([]),

  // Engagement
  likes: z.number().int().default(0),
  comments: z.number().int().default(0),
  shares: z.number().int().default(0),

  // Analysis
  sentiment: SentimentEnum,
  language: z.string().nullable(),
  location: z.string().nullable(),

  // Flags
  is_read: z.boolean().default(false),
  is_starred: z.boolean().default(false),
  is_responded: z.boolean().default(false),

  mentioned_at: z.string().datetime(),
  created_at: z.string().datetime(),
});

export type SocialMention = z.infer<typeof SocialMentionSchema>;

// Trending Topic Schema
export const TrendingTopicSchema = z.object({
  id: z.string().uuid(),

  // Topic details
  topic: z.string(),
  hashtag: z.string().nullable(),

  // Platforms
  platforms: z.array(SocialPlatformEnum),

  // Metrics
  mention_count: z.number().int(),
  growth_rate: z.number(), // Percentage growth

  // Context
  category: z.string().nullable(),
  related_topics: z.array(z.string()).default([]),

  // Timing
  trending_since: z.string().datetime(),
  peak_time: z.string().datetime().nullable(),
});

export type TrendingTopic = z.infer<typeof TrendingTopicSchema>;
