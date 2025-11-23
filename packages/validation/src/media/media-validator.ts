import type {
  MediaValidationInput,
  ValidationError,
  ValidationWarning,
  Platform,
} from '../types'
import { getPlatformLimits } from '../rules/platform-limits'

export interface MediaValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
  recommendations?: {
    optimalWidth?: number
    optimalHeight?: number
    optimalAspectRatio?: string
  }
}

/**
 * Validates media files against platform limits
 */
export class MediaValidator {
  /**
   * Validate image against platform limits
   */
  static validateImage(input: MediaValidationInput): MediaValidationResult {
    if (input.type !== 'image') {
      return {
        valid: false,
        errors: [
          {
            field: 'type',
            message: 'Expected media type to be "image"',
            code: 'INVALID_MEDIA_TYPE',
          },
        ],
        warnings: [],
      }
    }

    const limits = getPlatformLimits(input.platform)
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []

    // Check file size
    if (input.sizeBytes > limits.media.image.maxSizeBytes) {
      errors.push({
        field: 'sizeBytes',
        message: `Image size exceeds ${this.formatBytes(limits.media.image.maxSizeBytes)} limit for ${input.platform}.`,
        code: 'IMAGE_TOO_LARGE',
        limit: limits.media.image.maxSizeBytes,
        actual: input.sizeBytes,
      })
    }

    // Check format
    const formatLower = input.format.toLowerCase()
    if (!limits.media.image.formats.includes(formatLower)) {
      errors.push({
        field: 'format',
        message: `Format "${input.format}" not supported for ${input.platform}. Allowed: ${limits.media.image.formats.join(', ')}.`,
        code: 'INVALID_IMAGE_FORMAT',
      })
    }

    // Check dimensions if provided
    if (input.width && input.height) {
      if (limits.media.image.maxWidth && input.width > limits.media.image.maxWidth) {
        errors.push({
          field: 'width',
          message: `Image width ${input.width}px exceeds maximum ${limits.media.image.maxWidth}px for ${input.platform}.`,
          code: 'IMAGE_WIDTH_EXCEEDED',
          limit: limits.media.image.maxWidth,
          actual: input.width,
        })
      }

      if (limits.media.image.maxHeight && input.height > limits.media.image.maxHeight) {
        errors.push({
          field: 'height',
          message: `Image height ${input.height}px exceeds maximum ${limits.media.image.maxHeight}px for ${input.platform}.`,
          code: 'IMAGE_HEIGHT_EXCEEDED',
          limit: limits.media.image.maxHeight,
          actual: input.height,
        })
      }

      // Check aspect ratio for platforms that care (Instagram)
      if (limits.media.image.aspectRatios) {
        const aspectRatio = this.calculateAspectRatio(input.width, input.height)
        const isValidRatio = limits.media.image.aspectRatios.some((ratio) =>
          this.matchesAspectRatio(aspectRatio, ratio),
        )

        if (!isValidRatio) {
          warnings.push({
            field: 'dimensions',
            message: `Image aspect ratio ${aspectRatio} may not display optimally.`,
            recommendation: `Recommended ratios for ${input.platform}: ${limits.media.image.aspectRatios.join(', ')}.`,
          })
        }
      }
    }

    // Add recommendations based on platform
    const recommendations = this.getImageRecommendations(input.platform)

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      recommendations,
    }
  }

  /**
   * Validate video against platform limits
   */
  static validateVideo(input: MediaValidationInput): MediaValidationResult {
    if (input.type !== 'video') {
      return {
        valid: false,
        errors: [
          {
            field: 'type',
            message: 'Expected media type to be "video"',
            code: 'INVALID_MEDIA_TYPE',
          },
        ],
        warnings: [],
      }
    }

    const limits = getPlatformLimits(input.platform)
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []

    // Check file size
    if (input.sizeBytes > limits.media.video.maxSizeBytes) {
      errors.push({
        field: 'sizeBytes',
        message: `Video size exceeds ${this.formatBytes(limits.media.video.maxSizeBytes)} limit for ${input.platform}.`,
        code: 'VIDEO_TOO_LARGE',
        limit: limits.media.video.maxSizeBytes,
        actual: input.sizeBytes,
      })
    }

    // Check format
    const formatLower = input.format.toLowerCase()
    if (!limits.media.video.formats.includes(formatLower)) {
      errors.push({
        field: 'format',
        message: `Format "${input.format}" not supported for ${input.platform}. Allowed: ${limits.media.video.formats.join(', ')}.`,
        code: 'INVALID_VIDEO_FORMAT',
      })
    }

    // Check duration
    if (input.durationSeconds) {
      if (input.durationSeconds > limits.media.video.maxDurationSeconds) {
        errors.push({
          field: 'durationSeconds',
          message: `Video duration ${input.durationSeconds}s exceeds maximum ${limits.media.video.maxDurationSeconds}s for ${input.platform}.`,
          code: 'VIDEO_TOO_LONG',
          limit: limits.media.video.maxDurationSeconds,
          actual: input.durationSeconds,
        })
      }

      // Warning for very short videos
      if (input.durationSeconds < 3) {
        warnings.push({
          field: 'durationSeconds',
          message: `Video is very short (${input.durationSeconds}s).`,
          recommendation: 'Videos shorter than 3 seconds may not perform well.',
        })
      }
    }

    // Check dimensions if provided
    if (input.width && input.height) {
      if (limits.media.video.maxWidth && input.width > limits.media.video.maxWidth) {
        warnings.push({
          field: 'width',
          message: `Video width ${input.width}px exceeds recommended ${limits.media.video.maxWidth}px for ${input.platform}.`,
          recommendation: 'Consider resizing to improve compatibility.',
        })
      }

      if (limits.media.video.maxHeight && input.height > limits.media.video.maxHeight) {
        warnings.push({
          field: 'height',
          message: `Video height ${input.height}px exceeds recommended ${limits.media.video.maxHeight}px for ${input.platform}.`,
          recommendation: 'Consider resizing to improve compatibility.',
        })
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    }
  }

  /**
   * Validate multiple media files
   */
  static validateMultiple(
    media: MediaValidationInput[],
    platform: Platform,
  ): MediaValidationResult {
    const limits = getPlatformLimits(platform)
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []

    // Check media count
    if (media.length > limits.media.maxCount) {
      errors.push({
        field: 'media',
        message: `Too many media files. Maximum ${limits.media.maxCount} allowed for ${platform}.`,
        code: 'TOO_MANY_MEDIA_FILES',
        limit: limits.media.maxCount,
        actual: media.length,
      })
    }

    // Validate each media file
    for (let i = 0; i < media.length; i++) {
      const item = media[i]
      const result =
        item.type === 'image' ? this.validateImage(item) : this.validateVideo(item)

      // Prefix field names with index
      result.errors.forEach((error) => {
        errors.push({
          ...error,
          field: `media[${i}].${error.field}`,
        })
      })

      result.warnings.forEach((warning) => {
        warnings.push({
          ...warning,
          field: `media[${i}].${warning.field}`,
        })
      })
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    }
  }

  /**
   * Format bytes to human-readable string
   */
  private static formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(0)}MB`
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}GB`
  }

  /**
   * Calculate aspect ratio as string (e.g., "16:9")
   */
  private static calculateAspectRatio(width: number, height: number): string {
    const gcd = this.gcd(width, height)
    return `${width / gcd}:${height / gcd}`
  }

  /**
   * Greatest common divisor
   */
  private static gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b)
  }

  /**
   * Check if aspect ratio matches target (with tolerance)
   */
  private static matchesAspectRatio(actual: string, target: string): boolean {
    const [aw, ah] = actual.split(':').map(Number)
    const [tw, th] = target.split(':').map(Number)

    const actualRatio = aw / ah
    const targetRatio = tw / th

    // Allow 5% tolerance
    return Math.abs(actualRatio - targetRatio) / targetRatio < 0.05
  }

  /**
   * Get platform-specific image recommendations
   */
  private static getImageRecommendations(platform: Platform) {
    const recommendations: Record<
      Platform,
      { optimalWidth?: number; optimalHeight?: number; optimalAspectRatio?: string }
    > = {
      instagram: { optimalWidth: 1080, optimalHeight: 1080, optimalAspectRatio: '1:1' },
      threads: { optimalWidth: 1080, optimalHeight: 1080, optimalAspectRatio: '1:1' },
      facebook: { optimalWidth: 1200, optimalHeight: 630, optimalAspectRatio: '1.91:1' },
      twitter: { optimalWidth: 1200, optimalHeight: 675, optimalAspectRatio: '16:9' },
      x: { optimalWidth: 1200, optimalHeight: 675, optimalAspectRatio: '16:9' },
      linkedin: { optimalWidth: 1200, optimalHeight: 627, optimalAspectRatio: '1.91:1' },
      tiktok: { optimalWidth: 1080, optimalHeight: 1920, optimalAspectRatio: '9:16' },
      youtube: { optimalWidth: 1280, optimalHeight: 720, optimalAspectRatio: '16:9' },
      pinterest: { optimalWidth: 1000, optimalHeight: 1500, optimalAspectRatio: '2:3' },
      reddit: { optimalWidth: 1200, optimalHeight: 630 },
    }

    return recommendations[platform]
  }
}
