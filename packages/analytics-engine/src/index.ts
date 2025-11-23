/**
 * @q8t/analytics-engine
 *
 * Pure analytics calculations for social media metrics.
 *
 * All functions are pure with no dependencies on:
 * - Platform SDKs
 * - Database clients
 * - Job queues
 * - HTTP clients
 *
 * Can be used anywhere: API routes, background jobs, CLI tools, etc.
 */

// Types
export type {
  Platform,
  PerformanceTier,
  PostMetrics,
  EngagementRateResult,
  PerformanceScoreInput,
  PerformanceScoreResult,
  HistoricalPost,
  BestPostingTime,
  GrowthMetrics,
  GrowthResult,
} from './types'

export {
  PlatformSchema,
  PerformanceTierSchema,
  PostMetricsSchema,
  EngagementRateResultSchema,
  PerformanceScoreInputSchema,
  PerformanceScoreResultSchema,
  HistoricalPostSchema,
  BestPostingTimeSchema,
  GrowthMetricsSchema,
  GrowthResultSchema,
} from './types'

// Engagement
export { EngagementCalculator } from './engagement'

// Performance
export { PerformanceScorer } from './performance'
