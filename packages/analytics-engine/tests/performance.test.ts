import { describe, it, expect } from 'vitest'
import { PerformanceScorer } from '../src/performance'

describe('PerformanceScorer', () => {
  describe('calculateScore', () => {
    it('calculates performance score correctly', () => {
      const result = PerformanceScorer.calculateScore({
        engagementRate: 3.5,
        reach: 5000,
        followerGrowth: 5,
        platform: 'instagram',
      })

      expect(result.score).toBeGreaterThan(0)
      expect(result.score).toBeLessThanOrEqual(100)
      expect(result.tier).toBeDefined()
      expect(result.factors.engagement).toBeGreaterThan(0)
      expect(result.factors.reach).toBeGreaterThan(0)
      expect(result.factors.growth).toBeGreaterThan(0)
    })

    it('scores high engagement correctly', () => {
      const result = PerformanceScorer.calculateScore({
        engagementRate: 5.0, // Excellent for Instagram
        reach: 10000,
        followerGrowth: 10,
        platform: 'instagram',
      })

      expect(result.score).toBeGreaterThan(80)
      expect(['high', 'viral']).toContain(result.tier)
    })

    it('scores poor performance correctly', () => {
      const result = PerformanceScorer.calculateScore({
        engagementRate: 0.1,
        reach: 100,
        followerGrowth: -5,
        platform: 'instagram',
      })

      expect(result.score).toBeLessThan(50)
      expect(['poor', 'low']).toContain(result.tier)
    })

    it('includes consistency score when provided', () => {
      const result = PerformanceScorer.calculateScore({
        engagementRate: 3.0,
        reach: 5000,
        followerGrowth: 5,
        platform: 'instagram',
        postFrequency: 5,
      })

      expect(result.factors.consistency).toBeDefined()
      expect(result.factors.consistency).toBeGreaterThan(0)
    })

    it('handles different platforms with different benchmarks', () => {
      const instagram = PerformanceScorer.calculateScore({
        engagementRate: 3.0,
        reach: 5000,
        followerGrowth: 5,
        platform: 'instagram',
      })

      const linkedin = PerformanceScorer.calculateScore({
        engagementRate: 3.0, // Same rate, different platform
        reach: 5000,
        followerGrowth: 5,
        platform: 'linkedin',
      })

      // LinkedIn has higher benchmarks, so same rate should score differently
      expect(instagram.factors.engagement).not.toBe(linkedin.factors.engagement)
    })
  })
})
