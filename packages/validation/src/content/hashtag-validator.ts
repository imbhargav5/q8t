import type { Platform, ValidationError, ValidationWarning } from '../types'
import { getPlatformLimits } from '../rules/platform-limits'

export interface HashtagValidationInput {
  hashtags: string[]
  platform: Platform
}

export interface HashtagValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
  count: number
  limit: number
}

/**
 * Validates hashtags against platform limits and format rules
 */
export class HashtagValidator {
  /**
   * Validate hashtags for a specific platform
   */
  static validate(input: HashtagValidationInput): HashtagValidationResult {
    const { hashtags, platform } = input
    const limits = getPlatformLimits(platform)
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []

    // Check hashtag count
    if (hashtags.length > limits.hashtags.max) {
      errors.push({
        field: 'hashtags',
        message: `Too many hashtags. Maximum ${limits.hashtags.max} allowed for ${platform}.`,
        code: 'TOO_MANY_HASHTAGS',
        limit: limits.hashtags.max,
        actual: hashtags.length,
      })
    }

    // Validate each hashtag
    for (let i = 0; i < hashtags.length; i++) {
      const hashtag = hashtags[i]
      const cleanTag = hashtag.startsWith('#') ? hashtag.slice(1) : hashtag

      // Check hashtag length
      if (cleanTag.length > limits.hashtags.maxLength) {
        errors.push({
          field: `hashtags[${i}]`,
          message: `Hashtag "${hashtag}" exceeds ${limits.hashtags.maxLength} character limit.`,
          code: 'HASHTAG_TOO_LONG',
          limit: limits.hashtags.maxLength,
          actual: cleanTag.length,
        })
      }

      // Check hashtag format
      if (!this.isValidFormat(cleanTag)) {
        errors.push({
          field: `hashtags[${i}]`,
          message: `Hashtag "${hashtag}" contains invalid characters. Only letters, numbers, and underscores allowed.`,
          code: 'INVALID_HASHTAG_FORMAT',
        })
      }

      // Check for empty hashtag
      if (cleanTag.length === 0) {
        errors.push({
          field: `hashtags[${i}]`,
          message: 'Empty hashtag found.',
          code: 'EMPTY_HASHTAG',
        })
      }
    }

    // Add warnings if using very few hashtags on platforms that benefit from more
    if (
      hashtags.length < 3 &&
      (platform === 'instagram' || platform === 'threads' || platform === 'tiktok')
    ) {
      warnings.push({
        field: 'hashtags',
        message: `Only ${hashtags.length} hashtag(s) used.`,
        recommendation: `Consider using more hashtags (up to ${limits.hashtags.max}) to improve discoverability.`,
      })
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      count: hashtags.length,
      limit: limits.hashtags.max,
    }
  }

  /**
   * Check if hashtag format is valid
   * Valid: letters, numbers, underscores (no spaces, special chars)
   */
  static isValidFormat(hashtag: string): boolean {
    // Remove # if present
    const cleanTag = hashtag.startsWith('#') ? hashtag.slice(1) : hashtag
    // Only allow alphanumeric and underscores
    return /^[a-zA-Z0-9_]+$/.test(cleanTag)
  }

  /**
   * Extract hashtags from text
   */
  static extractFromText(text: string): string[] {
    const hashtagRegex = /#(\w+)/g
    const matches = text.matchAll(hashtagRegex)
    return Array.from(matches, (match) => match[1])
  }

  /**
   * Normalize hashtags (remove # prefix, lowercase)
   */
  static normalize(hashtags: string[]): string[] {
    return hashtags.map((tag) => {
      const clean = tag.startsWith('#') ? tag.slice(1) : tag
      return clean.toLowerCase()
    })
  }
}
