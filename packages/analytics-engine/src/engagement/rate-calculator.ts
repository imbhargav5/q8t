import type {
  PostMetrics,
  EngagementRateResult,
  PerformanceTier,
} from '../types'

/**
 * Engagement Rate Calculator
 *
 * Calculates engagement rates and classifies performance tiers.
 * Pure function with no side effects.
 */
export class EngagementCalculator {
  /**
   * Calculate engagement rate
   *
   * Engagement Rate = (Total Engagement / Impressions) * 100
   *
   * Performance tiers based on industry benchmarks:
   * - Viral: > 10%
   * - High: 3-10%
   * - Medium: 1-3%
   * - Low: 0.5-1%
   * - Poor: < 0.5%
   */
  static calculateRate(metrics: PostMetrics): EngagementRateResult {
    const totalEngagement =
      metrics.likes +
      metrics.comments +
      metrics.shares +
      (metrics.saves || 0)

    // Handle zero impressions
    if (metrics.impressions === 0) {
      return {
        rate: 0,
        totalEngagement,
        breakdown: {
          likes: metrics.likes,
          comments: metrics.comments,
          shares: metrics.shares,
          saves: metrics.saves,
        },
        tier: 'poor',
      }
    }

    const rate = (totalEngagement / metrics.impressions) * 100

    return {
      rate: Number(rate.toFixed(2)),
      totalEngagement,
      breakdown: {
        likes: metrics.likes,
        comments: metrics.comments,
        shares: metrics.shares,
        saves: metrics.saves,
      },
      tier: this.classifyTier(rate),
    }
  }

  /**
   * Calculate follower engagement rate
   *
   * Alternative metric based on follower count instead of impressions.
   * Useful when impression data is unavailable.
   *
   * Follower Engagement Rate = (Total Engagement / Follower Count) * 100
   */
  static calculateFollowerEngagementRate(
    metrics: PostMetrics,
  ): EngagementRateResult {
    const totalEngagement =
      metrics.likes +
      metrics.comments +
      metrics.shares +
      (metrics.saves || 0)

    if (metrics.followerCount === 0) {
      return {
        rate: 0,
        totalEngagement,
        breakdown: {
          likes: metrics.likes,
          comments: metrics.comments,
          shares: metrics.shares,
          saves: metrics.saves,
        },
        tier: 'poor',
      }
    }

    const rate = (totalEngagement / metrics.followerCount) * 100

    return {
      rate: Number(rate.toFixed(2)),
      totalEngagement,
      breakdown: {
        likes: metrics.likes,
        comments: metrics.comments,
        shares: metrics.shares,
        saves: metrics.saves,
      },
      tier: this.classifyTier(rate),
    }
  }

  /**
   * Classify performance tier based on engagement rate
   */
  private static classifyTier(rate: number): PerformanceTier {
    if (rate > 10) return 'viral'
    if (rate >= 3) return 'high'
    if (rate >= 1) return 'medium'
    if (rate >= 0.5) return 'low'
    return 'poor'
  }

  /**
   * Calculate weighted engagement rate
   *
   * Gives different weights to different engagement types:
   * - Comments: 3x (highest value - indicates conversation)
   * - Shares: 2x (high value - indicates advocacy)
   * - Saves: 2x (high value - indicates value)
   * - Likes: 1x (baseline engagement)
   */
  static calculateWeightedRate(metrics: PostMetrics): EngagementRateResult {
    const weightedEngagement =
      metrics.likes +
      metrics.comments * 3 +
      metrics.shares * 2 +
      (metrics.saves || 0) * 2

    if (metrics.impressions === 0) {
      return {
        rate: 0,
        totalEngagement: weightedEngagement,
        breakdown: {
          likes: metrics.likes,
          comments: metrics.comments,
          shares: metrics.shares,
          saves: metrics.saves,
        },
        tier: 'poor',
      }
    }

    const rate = (weightedEngagement / metrics.impressions) * 100

    return {
      rate: Number(rate.toFixed(2)),
      totalEngagement: weightedEngagement,
      breakdown: {
        likes: metrics.likes,
        comments: metrics.comments,
        shares: metrics.shares,
        saves: metrics.saves,
      },
      tier: this.classifyTier(rate),
    }
  }

  /**
   * Calculate average engagement rate across multiple posts
   */
  static calculateAverageRate(posts: PostMetrics[]): number {
    if (posts.length === 0) return 0

    const totalRate = posts.reduce((sum, post) => {
      const result = this.calculateRate(post)
      return sum + result.rate
    }, 0)

    return Number((totalRate / posts.length).toFixed(2))
  }
}
