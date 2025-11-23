import { describe, it, expect } from 'vitest'
import { HashtagValidator } from '../src/content/hashtag-validator'

describe('HashtagValidator', () => {
  describe('validate', () => {
    it('should validate hashtags within Instagram limits', () => {
      const hashtags = ['travel', 'photography', 'nature', 'beautiful', 'adventure']
      const result = HashtagValidator.validate({
        hashtags,
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.count).toBe(5)
      expect(result.limit).toBe(30)
    })

    it('should reject too many hashtags on Instagram', () => {
      const hashtags = Array(31).fill('test')
      const result = HashtagValidator.validate({
        hashtags,
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].code).toBe('TOO_MANY_HASHTAGS')
      expect(result.errors[0].actual).toBe(31)
      expect(result.errors[0].limit).toBe(30)
    })

    it('should validate hashtags with # prefix', () => {
      const hashtags = ['#travel', '#photography']
      const result = HashtagValidator.validate({
        hashtags,
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject hashtags exceeding length limit', () => {
      const longHashtag = 'a'.repeat(31)
      const result = HashtagValidator.validate({
        hashtags: [longHashtag],
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].code).toBe('HASHTAG_TOO_LONG')
    })

    it('should reject hashtags with invalid characters', () => {
      const result = HashtagValidator.validate({
        hashtags: ['valid', 'invalid-hashtag', 'also!invalid'],
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.errors.some((e) => e.code === 'INVALID_HASHTAG_FORMAT')).toBe(true)
    })

    it('should accept hashtags with underscores and numbers', () => {
      const result = HashtagValidator.validate({
        hashtags: ['travel_2024', 'photo123', 'nature_photography'],
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject empty hashtags', () => {
      const result = HashtagValidator.validate({
        hashtags: ['valid', '', 'another'],
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.code === 'EMPTY_HASHTAG')).toBe(true)
    })

    it('should warn when using very few hashtags on Instagram', () => {
      const result = HashtagValidator.validate({
        hashtags: ['travel', 'photo'],
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.warnings.length).toBeGreaterThan(0)
      expect(result.warnings[0].field).toBe('hashtags')
    })

    it('should not warn about few hashtags on Twitter', () => {
      const result = HashtagValidator.validate({
        hashtags: ['news', 'breaking'],
        platform: 'twitter',
      })

      expect(result.valid).toBe(true)
      expect(result.warnings).toHaveLength(0)
    })

    it('should respect Twitter hashtag limits', () => {
      const hashtags = Array(11).fill('test')
      const result = HashtagValidator.validate({
        hashtags,
        platform: 'twitter',
      })

      expect(result.valid).toBe(false)
      expect(result.errors[0].code).toBe('TOO_MANY_HASHTAGS')
      expect(result.limit).toBe(10)
    })
  })

  describe('isValidFormat', () => {
    it('should accept valid hashtags', () => {
      expect(HashtagValidator.isValidFormat('travel')).toBe(true)
      expect(HashtagValidator.isValidFormat('travel2024')).toBe(true)
      expect(HashtagValidator.isValidFormat('travel_photography')).toBe(true)
      expect(HashtagValidator.isValidFormat('_private')).toBe(true)
    })

    it('should reject hashtags with invalid characters', () => {
      expect(HashtagValidator.isValidFormat('travel-2024')).toBe(false)
      expect(HashtagValidator.isValidFormat('travel!photo')).toBe(false)
      expect(HashtagValidator.isValidFormat('travel photo')).toBe(false)
      expect(HashtagValidator.isValidFormat('travel@home')).toBe(false)
    })

    it('should handle hashtags with # prefix', () => {
      expect(HashtagValidator.isValidFormat('#travel')).toBe(true)
      expect(HashtagValidator.isValidFormat('#travel-invalid')).toBe(false)
    })
  })

  describe('extractFromText', () => {
    it('should extract hashtags from text', () => {
      const text = 'Check out this #amazing #photo from my #travel adventures!'
      const hashtags = HashtagValidator.extractFromText(text)

      expect(hashtags).toEqual(['amazing', 'photo', 'travel'])
    })

    it('should handle text with no hashtags', () => {
      const text = 'This text has no hashtags'
      const hashtags = HashtagValidator.extractFromText(text)

      expect(hashtags).toEqual([])
    })

    it('should handle multiple hashtags together', () => {
      const text = '#travel#photography#nature'
      const hashtags = HashtagValidator.extractFromText(text)

      expect(hashtags).toEqual(['travel', 'photography', 'nature'])
    })

    it('should handle hashtags with underscores and numbers', () => {
      const text = 'Love #travel_2024 and #photo_123!'
      const hashtags = HashtagValidator.extractFromText(text)

      expect(hashtags).toEqual(['travel_2024', 'photo_123'])
    })
  })

  describe('normalize', () => {
    it('should remove # prefix and lowercase', () => {
      const hashtags = ['#Travel', '#PHOTOGRAPHY', 'nature']
      const normalized = HashtagValidator.normalize(hashtags)

      expect(normalized).toEqual(['travel', 'photography', 'nature'])
    })

    it('should handle hashtags without # prefix', () => {
      const hashtags = ['Travel', 'Photography', 'Nature']
      const normalized = HashtagValidator.normalize(hashtags)

      expect(normalized).toEqual(['travel', 'photography', 'nature'])
    })

    it('should handle mixed case and prefixes', () => {
      const hashtags = ['#Travel', 'PHOTO', '#nature']
      const normalized = HashtagValidator.normalize(hashtags)

      expect(normalized).toEqual(['travel', 'photo', 'nature'])
    })
  })
})
