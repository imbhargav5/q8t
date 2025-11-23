import { z } from "zod";
import { SocialPlatformSchema } from "./shared";

export const AnalyticsOverviewMetricsSchema = z.object({
  totalEngagement: z.number(),
  totalReach: z.number(),
  followerGrowth: z.number(),
  engagementRate: z.number(),
  postsPublished: z.number(),
  avgResponseTime: z.number(), // in seconds
  csatScore: z.number(), // 1-5
  socialPerformanceScore: z.number(), // 0-100

  // Trends (vs previous period)
  engagementTrend: z.number(), // percentage change
  reachTrend: z.number(),
  followerGrowthTrend: z.number(),
  engagementRateTrend: z.number(),
});

export const PlatformPerformanceSchema = z.object({
  platform: SocialPlatformSchema,
  name: z.string(),
  followerCount: z.number(),
  growthPercentage: z.number(),
  engagementRate: z.number(),
  topPostThumbnail: z.string().optional(),
  topPostEngagement: z.number().optional(),
});

export const TopPostSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  thumbnail: z.string().optional(),
  platform: SocialPlatformSchema,
  platforms: z.array(SocialPlatformSchema),
  publishedAt: z.date(),
  engagement: z.number(),
  reach: z.number(),
  engagementRate: z.number(),
});

export const ActivityTimelineItemSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["milestone", "alert", "achievement", "warning"]),
  title: z.string(),
  description: z.string(),
  timestamp: z.date(),
  icon: z.string().optional(),
  severity: z.enum(["info", "success", "warning", "error"]).optional(),
});

export const QuickInsightSchema = z.object({
  id: z.string().uuid(),
  category: z.enum(["working", "attention", "opportunity"]),
  message: z.string(),
  impact: z.enum(["high", "medium", "low"]),
  actionable: z.boolean(),
  actionLabel: z.string().optional(),
});

export type AnalyticsOverviewMetrics = z.infer<typeof AnalyticsOverviewMetricsSchema>;
export type PlatformPerformance = z.infer<typeof PlatformPerformanceSchema>;
export type TopPost = z.infer<typeof TopPostSchema>;
export type ActivityTimelineItem = z.infer<typeof ActivityTimelineItemSchema>;
export type QuickInsight = z.infer<typeof QuickInsightSchema>;
