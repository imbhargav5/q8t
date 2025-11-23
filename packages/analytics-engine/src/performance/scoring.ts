import type {
  PerformanceScoreInput,
  PerformanceScoreResult,
  PerformanceTier,
  Platform,
} from '../types'

/**
 * Platform-specific engagement benchmarks
 * These are industry averages - higher engagement rates are better
 */
const PLATFORM_BENCHMARKS: Record<Platform, { good: number; excellent: number }> = {
  instagram: { good: 1.5, excellent: 3.0 },
  facebook: { good: 0.5, excellent: 1.0 },
  twitter: { good: 0.5, excellent: 1.5 },
  x: { good: 0.5, excellent: 1.5 },
  linkedin: { good: 2.0, excellent: 5.0 },
  tiktok: { good: 5.0, excellent: 10.0 },
  youtube: { good: 3.0, excellent: 6.0 },
  pinterest: { good: 0.5, excellent: 1.0 },
  reddit: { good: 2.0, excellent: 5.0 },
}

/**
 * Performance Scorer
 *
 * Calculates overall performance score (0-100) based on multiple factors.
 * Pure function with no side effects.
 */
export class PerformanceScorer {
  /**
   * Calculate overall performance score
   *
   * Score is weighted average of:
   * - Engagement rate (40%)
   * - Reach (30%)
   * - Follower growth (20%)
   * - Posting consistency (10%, optional)
   */
  static calculateScore(input: PerformanceScoreInput): PerformanceScoreResult {
    const engagementScore = this.scoreEngagement(
      input.engagementRate,
      input.platform,
    )
    const reachScore = this.scoreReach(input.reach)
    const growthScore = this.scoreGrowth(input.followerGrowth)
    const consistencyScore = input.postFrequency
      ? this.scoreConsistency(input.postFrequency)
      : undefined

    // Weighted average
    let totalScore: number
    if (consistencyScore !== undefined) {
      totalScore =
        engagementScore * 0.4 +
        reachScore * 0.3 +
        growthScore * 0.2 +
        consistencyScore * 0.1
    } else {
      totalScore =
        engagementScore * 0.45 + reachScore * 0.35 + growthScore * 0.2
    }

    return {
      score: Math.round(totalScore),
      tier: this.classifyTier(totalScore),
      factors: {
        engagement: Math.round(engagementScore),
        reach: Math.round(reachScore),
        growth: Math.round(growthScore),
        consistency: consistencyScore
          ? Math.round(consistencyScore)
          : undefined,
      },
    }
  }

  /**
   * Score engagement rate relative to platform benchmarks
   */
  private static scoreEngagement(
    rate: number,
    platform: Platform,
  ): number {
    const benchmarks = PLATFORM_BENCHMARKS[platform]

    if (rate >= benchmarks.excellent) {
      // Excellent: 90-100
      return 90 + Math.min(10, (rate - benchmarks.excellent) / benchmarks.excellent * 10)
    }

    if (rate >= benchmarks.good) {
      // Good: 70-90
      const range = benchmarks.excellent - benchmarks.good
      const position = (rate - benchmarks.good) / range
      return 70 + position * 20
    }

    // Below average: 0-70
    return Math.min(70, (rate / benchmarks.good) * 70)
  }

  /**
   * Score reach (linear scale with diminishing returns)
   */
  private static scoreReach(reach: number): number {
    // Log scale to handle wide range of reach values
    // 100 reach = ~46
    // 1,000 reach = ~69
    // 10,000 reach = ~92
    // 100,000+ reach = ~100
    if (reach === 0) return 0

    const score = Math.log10(reach + 1) * 23
    return Math.min(100, score)
  }

  /**
   * Score follower growth rate
   */
  private static scoreGrowth(growthRate: number): number {
    // Growth rate is percentage
    // Negative growth = 0-40
    // 0% growth = 50
    // 1-5% growth = 60-80
    // 5-10% growth = 80-90
    // >10% growth = 90-100

    if (growthRate < 0) {
      // Negative growth
      return Math.max(0, 40 + growthRate * 4)
    }

    if (growthRate === 0) {
      return 50
    }

    if (growthRate <= 5) {
      return 60 + (growthRate / 5) * 20
    }

    if (growthRate <= 10) {
      return 80 + ((growthRate - 5) / 5) * 10
    }

    // Exceptional growth
    return Math.min(100, 90 + Math.min(10, growthRate - 10))
  }

  /**
   * Score posting consistency
   */
  private static scoreConsistency(postsPerWeek: number): number {
    // Optimal posting frequency varies by platform, but generally:
    // 3-7 posts per week is considered consistent
    // 0-2 posts = poor
    // 3-5 posts = good
    // 6-7 posts = excellent
    // 8+ posts = diminishing returns

    if (postsPerWeek === 0) return 0
    if (postsPerWeek <= 2) return 40
    if (postsPerWeek <= 5) return 60 + (postsPerWeek - 2) * 10
    if (postsPerWeek <= 7) return 90 + (postsPerWeek - 5) * 5
    return 100
  }

  /**
   * Classify overall performance tier
   */
  private static classifyTier(score: number): PerformanceTier {
    if (score >= 90) return 'viral'
    if (score >= 70) return 'high'
    if (score >= 50) return 'medium'
    if (score >= 30) return 'low'
    return 'poor'
  }
}
