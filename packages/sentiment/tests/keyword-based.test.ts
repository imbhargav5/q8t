import { describe, it, expect } from 'vitest'
import { KeywordAnalyzer } from '../src/analyzers/keyword-based'

describe('KeywordAnalyzer', () => {
  describe('analyze', () => {
    it('detects positive sentiment', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'This product is amazing! I love it so much!',
      })

      expect(result.sentiment).toBe('positive')
      expect(result.score).toBeGreaterThan(0)
      expect(result.confidence).toBeGreaterThan(0.6)
      expect(result.keywords).toContain('amazing')
      expect(result.keywords).toContain('love')
    })

    it('detects negative sentiment', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'This is terrible! Very disappointed and frustrated.',
      })

      expect(result.sentiment).toBe('negative')
      expect(result.score).toBeLessThan(0)
      expect(result.confidence).toBeGreaterThan(0.6)
      expect(result.keywords).toContain('terrible')
      expect(result.keywords).toContain('disappointed')
      expect(result.keywords).toContain('frustrated')
    })

    it('detects neutral sentiment for balanced text', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'The product is good but has some bad aspects.',
      })

      expect(result.sentiment).toBe('neutral')
      expect(result.score).toBe(0)
    })

    it('detects neutral sentiment for non-emotional text', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'The package arrived on Tuesday.',
      })

      expect(result.sentiment).toBe('neutral')
      expect(result.score).toBe(0)
      expect(result.confidence).toBe(0.5)
      expect(result.keywords).toHaveLength(0)
    })

    it('returns higher confidence with more keywords', () => {
      const weakPositive = KeywordAnalyzer.analyze({
        text: 'This is good.',
      })

      const strongPositive = KeywordAnalyzer.analyze({
        text: 'This is amazing, excellent, wonderful, and fantastic!',
      })

      expect(strongPositive.confidence).toBeGreaterThan(weakPositive.confidence)
      expect(strongPositive.score).toBeGreaterThan(weakPositive.score)
    })

    it('caps score at 1.0 for very positive text', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'amazing excellent wonderful fantastic superb brilliant outstanding perfect great awesome',
      })

      expect(result.score).toBeLessThanOrEqual(1.0)
    })

    it('caps score at -1.0 for very negative text', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'terrible awful horrible bad worst useless broken failed disappointing frustrating',
      })

      expect(result.score).toBeGreaterThanOrEqual(-1.0)
    })

    it('is case-insensitive', () => {
      const lowercase = KeywordAnalyzer.analyze({
        text: 'this is amazing',
      })

      const uppercase = KeywordAnalyzer.analyze({
        text: 'THIS IS AMAZING',
      })

      const mixed = KeywordAnalyzer.analyze({
        text: 'This Is Amazing',
      })

      expect(lowercase.sentiment).toBe(uppercase.sentiment)
      expect(lowercase.sentiment).toBe(mixed.sentiment)
      expect(lowercase.score).toBe(uppercase.score)
    })
  })

  describe('emotion detection', () => {
    it('detects joy emotion', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'I am so happy and joyful today!',
      })

      expect(result.emotions.joy).toBeGreaterThan(0)
    })

    it('detects anger emotion', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'I am so angry and furious about this!',
      })

      expect(result.emotions.anger).toBeGreaterThan(0)
    })

    it('detects frustration emotion', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'This is so frustrating and annoying!',
      })

      expect(result.emotions.frustration).toBeGreaterThan(0)
    })

    it('detects disappointment emotion', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'I am very disappointed and let down.',
      })

      expect(result.emotions.disappointment).toBeGreaterThan(0)
    })

    it('detects multiple emotions', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'I was excited at first but now I am disappointed and frustrated.',
      })

      expect(result.emotions.excitement).toBeGreaterThan(0)
      expect(result.emotions.disappointment).toBeGreaterThan(0)
      expect(result.emotions.frustration).toBeGreaterThan(0)
    })

    it('returns empty emotions for neutral text', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'The package arrived on Tuesday.',
      })

      expect(Object.keys(result.emotions)).toHaveLength(0)
    })

    it('normalizes emotion scores to max 1.0', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'happy joyful delighted cheerful pleased happy joyful',
      })

      expect(result.emotions.joy).toBeLessThanOrEqual(1.0)
    })
  })

  describe('analyzeBatch', () => {
    it('analyzes multiple texts', () => {
      const results = KeywordAnalyzer.analyzeBatch([
        { id: '1', text: 'This is amazing!' },
        { id: '2', text: 'This is terrible!' },
        { id: '3', text: 'This is okay.' },
      ])

      expect(results).toHaveLength(3)
      expect(results[0].id).toBe('1')
      expect(results[0].sentiment).toBe('positive')
      expect(results[1].id).toBe('2')
      expect(results[1].sentiment).toBe('negative')
      expect(results[2].id).toBe('3')
      expect(results[2].sentiment).toBe('neutral')
    })

    it('handles empty array', () => {
      const results = KeywordAnalyzer.analyzeBatch([])
      expect(results).toHaveLength(0)
    })

    it('preserves IDs in results', () => {
      const inputs = [
        { id: 'post-123', text: 'Great product!' },
        { id: 'post-456', text: 'Bad quality.' },
      ]

      const results = KeywordAnalyzer.analyzeBatch(inputs)

      expect(results[0].id).toBe('post-123')
      expect(results[1].id).toBe('post-456')
    })
  })

  describe('real-world examples', () => {
    it('handles customer review - positive', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'Absolutely love this product! Customer service was amazing and shipping was super fast! 😍✨',
      })

      expect(result.sentiment).toBe('positive')
      expect(result.score).toBeGreaterThan(0.5)
    })

    it('handles customer review - negative', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'Really disappointed with the quality. Product arrived broken and customer service won\'t respond. Terrible experience.',
      })

      expect(result.sentiment).toBe('negative')
      expect(result.score).toBeLessThan(-0.5)
    })

    it('handles social media comment - mixed', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'The product is good but the shipping was terrible. I love the quality but hate the packaging.',
      })

      expect(result.sentiment).toBe('neutral')
    })

    it('handles brief social media post', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'Best purchase ever! 🔥',
      })

      expect(result.sentiment).toBe('positive')
    })

    it('handles complaint', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'This is absolutely unacceptable! I\'ve been waiting for 3 weeks. Frustrated and angry.',
      })

      expect(result.sentiment).toBe('negative')
      expect(result.emotions.frustration).toBeGreaterThan(0)
      expect(result.emotions.anger).toBeGreaterThan(0)
    })
  })

  describe('edge cases', () => {
    it('handles empty string', () => {
      const result = KeywordAnalyzer.analyze({
        text: '',
      })

      expect(result.sentiment).toBe('neutral')
      expect(result.score).toBe(0)
    })

    it('handles single word', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'amazing',
      })

      expect(result.sentiment).toBe('positive')
    })

    it('handles very long text', () => {
      const longText = 'This is great. '.repeat(100)
      const result = KeywordAnalyzer.analyze({
        text: longText,
      })

      expect(result.sentiment).toBe('positive')
    })

    it('handles special characters', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'This is @#$%^&* amazing!!!',
      })

      expect(result.sentiment).toBe('positive')
      expect(result.keywords).toContain('amazing')
    })

    it('handles numbers', () => {
      const result = KeywordAnalyzer.analyze({
        text: 'I give this 10/10, it\'s perfect!',
      })

      expect(result.sentiment).toBe('positive')
    })
  })
})
