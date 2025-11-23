import { describe, it, expect } from 'vitest'
import { PostValidator } from '../src/platforms/post-validator'

describe('PostValidator', () => {
  describe('validate', () => {
    it('should validate a complete valid post for Instagram', () => {
      const result = PostValidator.validate({
        content: {
          text: 'Check out this amazing photo! #travel #photography #nature',
          hashtags: ['travel', 'photography', 'nature'],
          mentions: ['user1', 'user2'],
          links: ['https://example.com'],
        },
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should validate text-only post', () => {
      const result = PostValidator.validate({
        content: {
          text: 'Just a simple status update',
        },
        platform: 'twitter',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should combine errors from multiple validators', () => {
      const result = PostValidator.validate({
        content: {
          text: 'a'.repeat(300), // Too long for Twitter
          hashtags: Array(20).fill('test'), // Too many for Twitter
          mentions: Array(15).fill('user'), // Too many for Twitter
          links: Array(10).fill('https://example.com'), // Too many for Twitter
        },
        platform: 'twitter',
      })

      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.errors.some((e) => e.code === 'TEXT_TOO_LONG')).toBe(true)
      expect(result.errors.some((e) => e.code === 'TOO_MANY_HASHTAGS')).toBe(true)
      expect(result.errors.some((e) => e.code === 'TOO_MANY_MENTIONS')).toBe(true)
      expect(result.errors.some((e) => e.code === 'TOO_MANY_LINKS')).toBe(true)
    })

    it('should validate post with media', () => {
      const result = PostValidator.validate({
        content: {
          text: 'Check out this photo!',
        },
        platform: 'instagram',
        media: [
          {
            type: 'image',
            sizeBytes: 5 * 1024 * 1024,
            format: 'jpg',
            width: 1080,
            height: 1080,
            platform: 'instagram',
          },
        ],
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should include media errors in validation', () => {
      const result = PostValidator.validate({
        content: {
          text: 'Photo post',
        },
        platform: 'instagram',
        media: [
          {
            type: 'image',
            sizeBytes: 20 * 1024 * 1024, // Too large
            format: 'jpg',
            platform: 'instagram',
          },
        ],
      })

      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.code === 'IMAGE_TOO_LARGE')).toBe(true)
    })

    it('should collect warnings from validators', () => {
      const result = PostValidator.validate({
        content: {
          text: 'Post with minimal hashtags',
          hashtags: ['one', 'two'],
          links: ['http://example.com'], // HTTP warning
        },
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.warnings.length).toBeGreaterThan(0)
    })

    it('should handle empty optional fields', () => {
      const result = PostValidator.validate({
        content: {
          text: 'Simple post',
          hashtags: [],
          mentions: [],
          links: [],
        },
        platform: 'twitter',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })
  })

  describe('validateMulti', () => {
    it('should validate against multiple platforms', () => {
      const results = PostValidator.validateMulti({
        content: {
          text: 'Short post',
        },
        platforms: ['instagram', 'twitter', 'facebook'],
      })

      expect(Object.keys(results)).toHaveLength(3)
      expect(results.instagram).toBeDefined()
      expect(results.twitter).toBeDefined()
      expect(results.facebook).toBeDefined()
      expect(results.instagram.valid).toBe(true)
      expect(results.twitter.valid).toBe(true)
      expect(results.facebook.valid).toBe(true)
    })

    it('should show different results for different platforms', () => {
      const results = PostValidator.validateMulti({
        content: {
          text: 'a'.repeat(290), // Too long for Twitter (280), ok for Instagram (2200)
        },
        platforms: ['instagram', 'twitter'],
      })

      expect(results.instagram.valid).toBe(true)
      expect(results.twitter.valid).toBe(false)
      expect(results.twitter.errors.some((e) => e.code === 'TEXT_TOO_LONG')).toBe(true)
    })

    it('should validate media across platforms', () => {
      const results = PostValidator.validateMulti({
        content: {
          text: 'Multi-platform post',
        },
        platforms: ['instagram', 'twitter'],
        media: Array(5).fill({
          type: 'image',
          sizeBytes: 1024 * 1024,
          format: 'jpg',
          platform: 'instagram',
        }),
      })

      // Instagram allows 10 images, Twitter allows 4
      expect(results.instagram.valid).toBe(true)
      expect(results.twitter.valid).toBe(false)
    })
  })

  describe('getValidPlatforms', () => {
    it('should return platforms where content is valid', () => {
      const validPlatforms = PostValidator.getValidPlatforms({
        content: {
          text: 'a'.repeat(290),
        },
        platforms: ['instagram', 'twitter', 'facebook'],
      })

      expect(validPlatforms).toContain('instagram')
      expect(validPlatforms).toContain('facebook')
      expect(validPlatforms).not.toContain('twitter')
    })

    it('should return all platforms when content is valid everywhere', () => {
      const validPlatforms = PostValidator.getValidPlatforms({
        content: {
          text: 'Short post',
        },
        platforms: ['instagram', 'twitter', 'facebook'],
      })

      expect(validPlatforms).toHaveLength(3)
    })

    it('should return empty array when content is invalid everywhere', () => {
      const validPlatforms = PostValidator.getValidPlatforms({
        content: {
          text: '', // Empty text with unrealistic media
        },
        platforms: ['instagram', 'twitter'],
        media: Array(50).fill({
          type: 'image',
          sizeBytes: 1024 * 1024,
          format: 'jpg',
          platform: 'instagram',
        }),
      })

      expect(validPlatforms).toHaveLength(0)
    })
  })

  describe('getInvalidPlatforms', () => {
    it('should return platforms where content is invalid', () => {
      const invalidPlatforms = PostValidator.getInvalidPlatforms({
        content: {
          text: 'a'.repeat(290),
        },
        platforms: ['instagram', 'twitter', 'facebook'],
      })

      expect(invalidPlatforms).toContain('twitter')
      expect(invalidPlatforms).not.toContain('instagram')
      expect(invalidPlatforms).not.toContain('facebook')
    })
  })

  describe('isValidForAll', () => {
    it('should return true when valid for all platforms', () => {
      const result = PostValidator.isValidForAll({
        content: {
          text: 'Short post',
        },
        platforms: ['instagram', 'twitter', 'facebook'],
      })

      expect(result).toBe(true)
    })

    it('should return false when invalid for any platform', () => {
      const result = PostValidator.isValidForAll({
        content: {
          text: 'a'.repeat(290),
        },
        platforms: ['instagram', 'twitter'],
      })

      expect(result).toBe(false)
    })
  })

  describe('getSummary', () => {
    it('should provide summary of validation across platforms', () => {
      const summary = PostValidator.getSummary({
        content: {
          text: 'a'.repeat(290),
        },
        platforms: ['instagram', 'twitter', 'facebook', 'linkedin'],
      })

      expect(summary.totalPlatforms).toBe(4)
      expect(summary.validPlatforms).toBe(3) // Instagram, Facebook, LinkedIn
      expect(summary.invalidPlatforms).toBe(1) // Twitter
      expect(summary.platforms.valid).toContain('instagram')
      expect(summary.platforms.invalid).toContain('twitter')
    })

    it('should handle all valid scenario', () => {
      const summary = PostValidator.getSummary({
        content: {
          text: 'Short post',
        },
        platforms: ['instagram', 'twitter'],
      })

      expect(summary.totalPlatforms).toBe(2)
      expect(summary.validPlatforms).toBe(2)
      expect(summary.invalidPlatforms).toBe(0)
      expect(summary.platforms.invalid).toHaveLength(0)
    })

    it('should handle all invalid scenario', () => {
      const summary = PostValidator.getSummary({
        content: {
          text: '',
        },
        platforms: ['instagram', 'twitter'],
        media: Array(50).fill({
          type: 'image',
          sizeBytes: 100 * 1024 * 1024,
          format: 'jpg',
          platform: 'instagram',
        }),
      })

      expect(summary.totalPlatforms).toBe(2)
      expect(summary.validPlatforms).toBe(0)
      expect(summary.invalidPlatforms).toBe(2)
    })
  })
})
