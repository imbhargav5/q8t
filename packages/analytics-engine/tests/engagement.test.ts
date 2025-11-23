import { describe, it, expect } from 'vitest'
import { EngagementCalculator } from '../src/engagement'

describe('EngagementCalculator', () => {
  describe('calculateRate', () => {
    it('calculates engagement rate correctly', () => {
      const result = EngagementCalculator.calculateRate({
        likes: 100,
        comments: 20,
        shares: 10,
        impressions: 1000,
        followerCount: 5000,
      })

      expect(result.rate).toBe(13.0) // (100+20+10)/1000 * 100
      expect(result.totalEngagement).toBe(130)
      expect(result.tier).toBe('viral') // >10%
    })

    it('handles zero impressions', () => {
      const result = EngagementCalculator.calculateRate({
        likes: 100,
        comments: 20,
        shares: 10,
        impressions: 0,
        followerCount: 5000,
      })

      expect(result.rate).toBe(0)
      expect(result.tier).toBe('poor')
    })

    it('classifies high engagement', () => {
      const result = EngagementCalculator.calculateRate({
        likes: 50,
        comments: 5,
        shares: 5,
        impressions: 1000,
        followerCount: 5000,
      })

      expect(result.rate).toBe(6.0)
      expect(result.tier).toBe('high') // 3-10%
    })

    it('classifies medium engagement', () => {
      const result = EngagementCalculator.calculateRate({
        likes: 20,
        comments: 2,
        shares: 1,
        impressions: 1000,
        followerCount: 5000,
      })

      expect(result.rate).toBe(2.3)
      expect(result.tier).toBe('medium') // 1-3%
    })

    it('includes saves in calculation', () => {
      const result = EngagementCalculator.calculateRate({
        likes: 100,
        comments: 20,
        shares: 10,
        saves: 15,
        impressions: 1000,
        followerCount: 5000,
      })

      expect(result.totalEngagement).toBe(145)
      expect(result.breakdown.saves).toBe(15)
    })
  })

  describe('calculateWeightedRate', () => {
    it('applies weights correctly', () => {
      const result = EngagementCalculator.calculateWeightedRate({
        likes: 100,
        comments: 10, // 3x weight = 30
        shares: 5, // 2x weight = 10
        saves: 5, // 2x weight = 10
        impressions: 1000,
        followerCount: 5000,
      })

      // 100 + 30 + 10 + 10 = 150
      expect(result.totalEngagement).toBe(150)
    })
  })

  describe('calculateAverageRate', () => {
    it('calculates average across posts', () => {
      const posts = [
        {
          likes: 100,
          comments: 10,
          shares: 5,
          impressions: 1000,
          followerCount: 5000,
        },
        {
          likes: 50,
          comments: 5,
          shares: 2,
          impressions: 500,
          followerCount: 5000,
        },
      ]

      const avg = EngagementCalculator.calculateAverageRate(posts)
      expect(avg).toBeGreaterThan(0)
    })

    it('handles empty array', () => {
      const avg = EngagementCalculator.calculateAverageRate([])
      expect(avg).toBe(0)
    })
  })
})
