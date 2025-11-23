import { describe, it, expect } from 'vitest'
import { TextValidator } from '../src/content/text-validator'

describe('TextValidator', () => {
  describe('validate', () => {
    it('should validate text within Twitter limits', () => {
      const result = TextValidator.validate({
        text: 'This is a valid tweet!',
        platform: 'twitter',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.characterCount).toBe(22)
      expect(result.limit).toBe(280)
    })

    it('should reject text exceeding Twitter limit', () => {
      const longText = 'a'.repeat(281)
      const result = TextValidator.validate({
        text: longText,
        platform: 'twitter',
      })

      expect(result.valid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].code).toBe('TEXT_TOO_LONG')
      expect(result.errors[0].actual).toBe(281)
      expect(result.errors[0].limit).toBe(280)
    })

    it('should validate text within Instagram limits', () => {
      const result = TextValidator.validate({
        text: 'Check out this amazing post! '.repeat(50), // ~1450 chars
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject text exceeding Instagram limit', () => {
      const longText = 'a'.repeat(2201)
      const result = TextValidator.validate({
        text: longText,
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].code).toBe('TEXT_TOO_LONG')
    })

    it('should validate text within LinkedIn limits', () => {
      const result = TextValidator.validate({
        text: 'Professional post content. '.repeat(50), // ~1350 chars
        platform: 'linkedin',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should accept empty text (minimum 0)', () => {
      const result = TextValidator.validate({
        text: '',
        platform: 'twitter',
      })

      expect(result.valid).toBe(true)
      expect(result.characterCount).toBe(0)
    })

    it('should handle Unicode characters correctly', () => {
      const result = TextValidator.validate({
        text: '👋 Hello! 你好 مرحبا',
        platform: 'twitter',
      })

      expect(result.valid).toBe(true)
      // Note: Some emojis count as 2 characters in JavaScript
      expect(result.characterCount).toBe(18)
    })

    it('should handle emojis correctly', () => {
      const result = TextValidator.validate({
        text: '🔥🚀💯 Amazing!',
        platform: 'twitter',
      })

      expect(result.valid).toBe(true)
      expect(result.characterCount).toBeLessThan(20)
    })
  })

  describe('getRemainingCharacters', () => {
    it('should calculate remaining characters correctly', () => {
      const remaining = TextValidator.getRemainingCharacters({
        text: 'Hello world',
        platform: 'twitter',
      })

      expect(remaining).toBe(269) // 280 - 11
    })

    it('should return 0 when over limit', () => {
      const longText = 'a'.repeat(300)
      const remaining = TextValidator.getRemainingCharacters({
        text: longText,
        platform: 'twitter',
      })

      expect(remaining).toBe(0)
    })

    it('should work for different platforms', () => {
      const text = 'Test message'

      const twitterRemaining = TextValidator.getRemainingCharacters({
        text,
        platform: 'twitter',
      })
      expect(twitterRemaining).toBe(268) // 280 - 12

      const instagramRemaining = TextValidator.getRemainingCharacters({
        text,
        platform: 'instagram',
      })
      expect(instagramRemaining).toBe(2188) // 2200 - 12
    })
  })

  describe('isWithinLimits', () => {
    it('should return true for valid text', () => {
      const result = TextValidator.isWithinLimits({
        text: 'Valid tweet',
        platform: 'twitter',
      })

      expect(result).toBe(true)
    })

    it('should return false for text exceeding limits', () => {
      const result = TextValidator.isWithinLimits({
        text: 'a'.repeat(300),
        platform: 'twitter',
      })

      expect(result).toBe(false)
    })

    it('should return true for edge case (exactly at limit)', () => {
      const result = TextValidator.isWithinLimits({
        text: 'a'.repeat(280),
        platform: 'twitter',
      })

      expect(result).toBe(true)
    })
  })
})
