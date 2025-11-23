import { z } from "zod";

export const AIContentRequestSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  user_id: z.string(),

  // Input
  prompt: z.string(),
  tone: z.enum(["professional", "casual", "friendly", "formal", "humorous", "inspirational", "urgent"]),
  content_type: z.enum(["post", "caption", "tweet", "article", "email", "ad_copy"]),
  platforms: z.array(z.string()),
  language: z.string().default("en"),

  // Options
  max_length: z.number().nullable(),
  include_hashtags: z.boolean().default(false),
  include_emojis: z.boolean().default(false),
  variant_count: z.number().min(1).max(5).default(1),

  // Context
  context: z.string().nullable(),
  target_audience: z.string().nullable(),
  keywords: z.array(z.string()).default([]),

  created_at: z.string(),
});

export const AIContentResponseSchema = z.object({
  id: z.string(),
  request_id: z.string(),

  // Generated content
  content: z.string(),
  variant_number: z.number(),

  // Metadata
  word_count: z.number(),
  character_count: z.number(),
  hashtags: z.array(z.string()).default([]),

  // Quality metrics
  readability_score: z.number().nullable(),
  sentiment_score: z.number().nullable(), // -1 to 1
  engagement_prediction: z.number().nullable(), // 0 to 100

  created_at: z.string(),
});

export const AIContentHistorySchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  user_id: z.string(),

  prompt: z.string(),
  tone: z.string(),
  content_type: z.string(),
  variants: z.array(AIContentResponseSchema),

  // Usage
  used_in_post_id: z.string().nullable(),
  is_favorite: z.boolean().default(false),

  created_at: z.string(),
});

export type AIContentRequest = z.infer<typeof AIContentRequestSchema>;
export type AIContentResponse = z.infer<typeof AIContentResponseSchema>;
export type AIContentHistory = z.infer<typeof AIContentHistorySchema>;
