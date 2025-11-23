import { describe, it, expect } from 'vitest'
import { MediaValidator } from '../src/media/media-validator'

describe('MediaValidator', () => {
  describe('validateImage', () => {
    it('should validate image within Instagram limits', () => {
      const result = MediaValidator.validateImage({
        type: 'image',
        width: 1080,
        height: 1080,
        sizeBytes: 5 * 1024 * 1024, // 5MB
        format: 'jpg',
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject image exceeding size limit', () => {
      const result = MediaValidator.validateImage({
        type: 'image',
        sizeBytes: 10 * 1024 * 1024, // 10MB (exceeds Instagram 8MB limit)
        format: 'jpg',
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].code).toBe('IMAGE_TOO_LARGE')
    })

    it('should reject unsupported image format', () => {
      const result = MediaValidator.validateImage({
        type: 'image',
        sizeBytes: 1024 * 1024,
        format: 'bmp',
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.code === 'INVALID_IMAGE_FORMAT')).toBe(true)
    })

    it('should accept supported image formats', () => {
      const formats = ['jpg', 'jpeg', 'png']

      for (const format of formats) {
        const result = MediaValidator.validateImage({
          type: 'image',
          sizeBytes: 1024 * 1024,
          format,
          platform: 'instagram',
        })

        expect(result.valid).toBe(true)
      }
    })

    it('should reject image exceeding width limit', () => {
      const result = MediaValidator.validateImage({
        type: 'image',
        width: 5000,
        height: 1000,
        sizeBytes: 1024 * 1024,
        format: 'jpg',
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.code === 'IMAGE_WIDTH_EXCEEDED')).toBe(true)
    })

    it('should reject image exceeding height limit', () => {
      const result = MediaValidator.validateImage({
        type: 'image',
        width: 1000,
        height: 2000,
        sizeBytes: 1024 * 1024,
        format: 'jpg',
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.code === 'IMAGE_HEIGHT_EXCEEDED')).toBe(true)
    })

    it('should warn about non-optimal aspect ratio for Instagram', () => {
      const result = MediaValidator.validateImage({
        type: 'image',
        width: 800,
        height: 600,
        sizeBytes: 1024 * 1024,
        format: 'jpg',
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.warnings.length).toBeGreaterThan(0)
    })

    it('should provide recommendations', () => {
      const result = MediaValidator.validateImage({
        type: 'image',
        sizeBytes: 1024 * 1024,
        format: 'jpg',
        platform: 'instagram',
      })

      expect(result.recommendations).toBeDefined()
      expect(result.recommendations?.optimalWidth).toBe(1080)
      expect(result.recommendations?.optimalHeight).toBe(1080)
      expect(result.recommendations?.optimalAspectRatio).toBe('1:1')
    })

    it('should validate different platforms correctly', () => {
      const image = {
        type: 'image' as const,
        sizeBytes: 9 * 1024 * 1024, // 9MB
        format: 'jpg',
      }

      // Valid for Facebook (10MB limit)
      const fbResult = MediaValidator.validateImage({
        ...image,
        platform: 'facebook',
      })
      expect(fbResult.valid).toBe(true)

      // Invalid for Instagram (8MB limit)
      const igResult = MediaValidator.validateImage({
        ...image,
        platform: 'instagram',
      })
      expect(igResult.valid).toBe(false)
    })
  })

  describe('validateVideo', () => {
    it('should validate video within Instagram limits', () => {
      const result = MediaValidator.validateVideo({
        type: 'video',
        width: 1080,
        height: 1920,
        sizeBytes: 100 * 1024 * 1024, // 100MB
        format: 'mp4',
        durationSeconds: 30,
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject video exceeding size limit', () => {
      const result = MediaValidator.validateVideo({
        type: 'video',
        sizeBytes: 700 * 1024 * 1024, // 700MB (exceeds Instagram 650MB limit)
        format: 'mp4',
        durationSeconds: 30,
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.code === 'VIDEO_TOO_LARGE')).toBe(true)
    })

    it('should reject unsupported video format', () => {
      const result = MediaValidator.validateVideo({
        type: 'video',
        sizeBytes: 10 * 1024 * 1024,
        format: 'avi',
        durationSeconds: 30,
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.code === 'INVALID_VIDEO_FORMAT')).toBe(true)
    })

    it('should reject video exceeding duration limit', () => {
      const result = MediaValidator.validateVideo({
        type: 'video',
        sizeBytes: 10 * 1024 * 1024,
        format: 'mp4',
        durationSeconds: 120, // 2 minutes (exceeds Instagram 60s limit)
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.code === 'VIDEO_TOO_LONG')).toBe(true)
    })

    it('should warn about very short videos', () => {
      const result = MediaValidator.validateVideo({
        type: 'video',
        sizeBytes: 1024 * 1024,
        format: 'mp4',
        durationSeconds: 2,
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.warnings.some((w) => w.field === 'durationSeconds')).toBe(true)
    })

    it('should handle different platforms correctly', () => {
      const video = {
        type: 'video' as const,
        sizeBytes: 100 * 1024 * 1024,
        format: 'mp4',
        durationSeconds: 90,
      }

      // Invalid for Instagram (60s limit)
      const igResult = MediaValidator.validateVideo({
        ...video,
        platform: 'instagram',
      })
      expect(igResult.valid).toBe(false)

      // Valid for TikTok (10 min limit)
      const ttResult = MediaValidator.validateVideo({
        ...video,
        platform: 'tiktok',
      })
      expect(ttResult.valid).toBe(true)
    })
  })

  describe('validateMultiple', () => {
    it('should validate multiple images', () => {
      const media = [
        {
          type: 'image' as const,
          sizeBytes: 1024 * 1024,
          format: 'jpg',
          platform: 'instagram' as const,
        },
        {
          type: 'image' as const,
          sizeBytes: 2 * 1024 * 1024,
          format: 'png',
          platform: 'instagram' as const,
        },
      ]

      const result = MediaValidator.validateMultiple(media, 'instagram')

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject too many media files', () => {
      const media = Array(11).fill({
        type: 'image',
        sizeBytes: 1024 * 1024,
        format: 'jpg',
        platform: 'instagram',
      })

      const result = MediaValidator.validateMultiple(media, 'instagram')

      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.code === 'TOO_MANY_MEDIA_FILES')).toBe(true)
    })

    it('should validate each media file individually', () => {
      const media = [
        {
          type: 'image' as const,
          sizeBytes: 1024 * 1024,
          format: 'jpg',
          platform: 'instagram' as const,
        },
        {
          type: 'image' as const,
          sizeBytes: 20 * 1024 * 1024, // Too large
          format: 'jpg',
          platform: 'instagram' as const,
        },
      ]

      const result = MediaValidator.validateMultiple(media, 'instagram')

      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.field.includes('media[1]'))).toBe(true)
    })

    it('should prefix error fields with index', () => {
      const media = [
        {
          type: 'image' as const,
          sizeBytes: 20 * 1024 * 1024,
          format: 'jpg',
          platform: 'instagram' as const,
        },
        {
          type: 'video' as const,
          sizeBytes: 700 * 1024 * 1024,
          format: 'mp4',
          durationSeconds: 30,
          platform: 'instagram' as const,
        },
      ]

      const result = MediaValidator.validateMultiple(media, 'instagram')

      expect(result.valid).toBe(false)
      expect(result.errors[0].field).toContain('media[0]')
      expect(result.errors[1].field).toContain('media[1]')
    })
  })
})
