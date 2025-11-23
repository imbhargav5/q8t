import { z } from "zod";

export const HashtagSetSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  user_id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  hashtags: z.array(z.string()),
  category: z.string().nullable(),
  usage_count: z.number().default(0),
  last_used_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const HashtagAnalyticsSchema = z.object({
  id: z.string(),
  hashtag: z.string(),
  platform: z.string(),
  impressions: z.number(),
  reach: z.number(),
  engagements: z.number(),
  clicks: z.number(),
  posts_count: z.number(),
  date: z.string(),
});

export const TrendingHashtagSchema = z.object({
  hashtag: z.string(),
  category: z.string(),
  trending_score: z.number(),
  volume: z.number(),
  growth_rate: z.number(),
  related_hashtags: z.array(z.string()),
});

export type HashtagSet = z.infer<typeof HashtagSetSchema>;
export type HashtagAnalytics = z.infer<typeof HashtagAnalyticsSchema>;
export type TrendingHashtag = z.infer<typeof TrendingHashtagSchema>;
