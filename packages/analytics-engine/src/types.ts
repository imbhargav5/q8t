import { z } from 'zod'

/**
 * Social media platforms
 */
export const PlatformSchema = z.enum([
  'instagram',
  'facebook',
  'twitter',
  'x',
  'linkedin',
  'tiktok',
  'youtube',
  'pinterest',
  'reddit',
])
export type Platform = z.infer<typeof PlatformSchema>

/**
 * Performance tiers
 */
export const PerformanceTierSchema = z.enum([
  'viral', // Top 1%
  'high', // Top 10%
  'medium', // 11-50%
  'low', // 51-90%
  'poor', // Bottom 10%
])
export type PerformanceTier = z.infer<typeof PerformanceTierSchema>

/**
 * Post metrics for engagement calculation
 */
export const PostMetricsSchema = z.object({
  likes: z.number().int().min(0),
  comments: z.number().int().min(0),
  shares: z.number().int().min(0),
  saves: z.number().int().min(0).optional(),
  impressions: z.number().int().min(0),
  reach: z.number().int().min(0).optional(),
  followerCount: z.number().int().min(0),
})
export type PostMetrics = z.infer<typeof PostMetricsSchema>

/**
 * Engagement rate result
 */
export const EngagementRateResultSchema = z.object({
  rate: z.number().min(0).max(100),
  totalEngagement: z.number().int().min(0),
  breakdown: z.object({
    likes: z.number().int(),
    comments: z.number().int(),
    shares: z.number().int(),
    saves: z.number().int().optional(),
  }),
  tier: PerformanceTierSchema,
})
export type EngagementRateResult = z.infer<typeof EngagementRateResultSchema>

/**
 * Performance score input
 */
export const PerformanceScoreInputSchema = z.object({
  engagementRate: z.number().min(0),
  reach: z.number().int().min(0),
  followerGrowth: z.number(),
  platform: PlatformSchema,
  postFrequency: z.number().optional(), // posts per week
})
export type PerformanceScoreInput = z.infer<typeof PerformanceScoreInputSchema>

/**
 * Performance score result
 */
export const PerformanceScoreResultSchema = z.object({
  score: z.number().min(0).max(100),
  tier: PerformanceTierSchema,
  factors: z.object({
    engagement: z.number().min(0).max(100),
    reach: z.number().min(0).max(100),
    growth: z.number().min(0).max(100),
    consistency: z.number().min(0).max(100).optional(),
  }),
})
export type PerformanceScoreResult = z.infer<typeof PerformanceScoreResultSchema>

/**
 * Historical post for trend analysis
 */
export const HistoricalPostSchema = z.object({
  id: z.string().optional(),
  postedAt: z.date(),
  engagement: z.number().int().min(0),
  reach: z.number().int().min(0).optional(),
  impressions: z.number().int().min(0).optional(),
})
export type HistoricalPost = z.infer<typeof HistoricalPostSchema>

/**
 * Best posting time result
 */
export const BestPostingTimeSchema = z.object({
  hour: z.number().int().min(0).max(23),
  dayOfWeek: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  score: z.number().min(0).max(100),
  avgEngagement: z.number(),
  postCount: z.number().int(),
})
export type BestPostingTime = z.infer<typeof BestPostingTimeSchema>

/**
 * Growth metrics
 */
export const GrowthMetricsSchema = z.object({
  currentFollowers: z.number().int().min(0),
  previousFollowers: z.number().int().min(0),
  periodDays: z.number().int().min(1),
})
export type GrowthMetrics = z.infer<typeof GrowthMetricsSchema>

/**
 * Growth result
 */
export const GrowthResultSchema = z.object({
  absolute: z.number().int(),
  percentage: z.number(),
  dailyAverage: z.number(),
  trend: z.enum(['accelerating', 'steady', 'declining']),
})
export type GrowthResult = z.infer<typeof GrowthResultSchema>
