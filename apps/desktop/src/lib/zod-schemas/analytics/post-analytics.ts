import { z } from "zod";
import { ContentPerformanceTierSchema, SocialPlatformSchema } from "./shared";

export const PostAnalyticsSchema = z.object({
  id: z.string().uuid(),
  workspaceId: z.string().uuid(),
  postId: z.string().uuid(),
  platform: SocialPlatformSchema,

  // Engagement metrics
  likes: z.number().default(0),
  comments: z.number().default(0),
  shares: z.number().default(0),
  saves: z.number().default(0),
  totalEngagement: z.number().default(0),
  engagementRate: z.number().default(0), // Percentage

  // Reach metrics
  impressions: z.number().default(0),
  uniqueReach: z.number().default(0),
  organicReach: z.number().default(0),
  paidReach: z.number().default(0),

  // Click metrics
  linkClicks: z.number().default(0),
  clickThroughRate: z.number().default(0),

  // Video metrics
  videoViews: z.number().default(0),
  videoCompletionRate: z.number().default(0),

  // Performance
  performanceScore: z.number().default(0), // 0-100
  performanceTier: ContentPerformanceTierSchema.optional(),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PostAnalyticsSnapshotSchema = z.object({
  id: z.string().uuid(),
  postAnalyticsId: z.string().uuid(),
  likes: z.number(),
  comments: z.number(),
  shares: z.number(),
  impressions: z.number(),
  uniqueReach: z.number(),
  snapshotAt: z.date(),
});

export type PostAnalytics = z.infer<typeof PostAnalyticsSchema>;
export type PostAnalyticsSnapshot = z.infer<typeof PostAnalyticsSnapshotSchema>;
