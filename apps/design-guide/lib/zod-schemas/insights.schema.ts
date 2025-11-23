import { z } from "zod";

export const BestTimeDataSchema = z.object({
  day_of_week: z.number().min(0).max(6), // 0 = Sunday, 6 = Saturday
  hour: z.number().min(0).max(23),
  engagement_score: z.number().min(0).max(100),
  post_count: z.number(),
  avg_impressions: z.number(),
  avg_engagement_rate: z.number(),
});

export const AudienceActivitySchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  platform: z.string(),

  // Activity by day/hour
  activity_heatmap: z.array(BestTimeDataSchema),

  // Best times
  best_times: z.array(
    z.object({
      day_of_week: z.number(),
      hour: z.number(),
      score: z.number(),
      reason: z.string(),
    })
  ),

  // Audience demographics
  peak_days: z.array(z.string()),
  peak_hours: z.array(z.number()),

  // Metadata
  last_analyzed_at: z.string(),
  data_points: z.number(),

  created_at: z.string(),
  updated_at: z.string(),
});

export const PostPerformanceByTimeSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),

  posted_at: z.string(),
  day_of_week: z.number(),
  hour: z.number(),

  // Performance
  impressions: z.number(),
  engagements: z.number(),
  engagement_rate: z.number(),

  platform: z.string(),
});

export type BestTimeData = z.infer<typeof BestTimeDataSchema>;
export type AudienceActivity = z.infer<typeof AudienceActivitySchema>;
export type PostPerformanceByTime = z.infer<typeof PostPerformanceByTimeSchema>;
