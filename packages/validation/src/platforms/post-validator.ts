import type {
  Platform,
  ContentInput,
  ValidationResult,
  MediaValidationInput,
  PostType,
} from '../types'
import { TextValidator } from '../content/text-validator'
import { HashtagValidator } from '../content/hashtag-validator'
import { MentionsValidator } from '../content/mentions-validator'
import { LinksValidator } from '../content/links-validator'
import { MediaValidator } from '../media/media-validator'

export interface PostValidationInput {
  content: ContentInput
  platform: Platform
  postType?: PostType
  media?: MediaValidationInput[]
}

export interface MultiPlatformValidationInput {
  content: ContentInput
  platforms: Platform[]
  media?: MediaValidationInput[]
}

export interface MultiPlatformValidationResult {
  [platform: string]: ValidationResult
}

/**
 * Main validator that orchestrates all validation rules
 */
export class PostValidator {
  /**
   * Validate content for a single platform
   */
  static validate(input: PostValidationInput): ValidationResult {
    const { content, platform, media } = input
    const allErrors = []
    const allWarnings = []

    // Validate text
    const textResult = TextValidator.validate({
      text: content.text,
      platform,
    })
    allErrors.push(...textResult.errors)

    // Validate hashtags
    if (content.hashtags && content.hashtags.length > 0) {
      const hashtagResult = HashtagValidator.validate({
        hashtags: content.hashtags,
        platform,
      })
      allErrors.push(...hashtagResult.errors)
      allWarnings.push(...hashtagResult.warnings)
    }

    // Validate mentions
    if (content.mentions && content.mentions.length > 0) {
      const mentionsResult = MentionsValidator.validate({
        mentions: content.mentions,
        platform,
      })
      allErrors.push(...mentionsResult.errors)
    }

    // Validate links
    if (content.links && content.links.length > 0) {
      const linksResult = LinksValidator.validate({
        links: content.links,
        platform,
      })
      allErrors.push(...linksResult.errors)
      allWarnings.push(...linksResult.warnings)
    }

    // Validate media
    if (media && media.length > 0) {
      const mediaResult = MediaValidator.validateMultiple(media, platform)
      allErrors.push(...mediaResult.errors)
      allWarnings.push(...mediaResult.warnings)
    }

    return {
      valid: allErrors.length === 0,
      errors: allErrors,
      warnings: allWarnings,
    }
  }

  /**
   * Validate content against multiple platforms
   */
  static validateMulti(input: MultiPlatformValidationInput): MultiPlatformValidationResult {
    const { content, platforms, media } = input
    const results: MultiPlatformValidationResult = {}

    for (const platform of platforms) {
      results[platform] = this.validate({
        content,
        platform,
        media,
      })
    }

    return results
  }

  /**
   * Get platforms where content is valid
   */
  static getValidPlatforms(input: MultiPlatformValidationInput): Platform[] {
    const results = this.validateMulti(input)
    return Object.keys(results).filter((platform) => results[platform].valid) as Platform[]
  }

  /**
   * Get platforms where content is invalid
   */
  static getInvalidPlatforms(input: MultiPlatformValidationInput): Platform[] {
    const results = this.validateMulti(input)
    return Object.keys(results).filter((platform) => !results[platform].valid) as Platform[]
  }

  /**
   * Check if content is valid for all specified platforms
   */
  static isValidForAll(input: MultiPlatformValidationInput): boolean {
    const results = this.validateMulti(input)
    return Object.values(results).every((result) => result.valid)
  }

  /**
   * Get a summary of validation across platforms
   */
  static getSummary(input: MultiPlatformValidationInput): {
    totalPlatforms: number
    validPlatforms: number
    invalidPlatforms: number
    platforms: {
      valid: Platform[]
      invalid: Platform[]
    }
  } {
    const results = this.validateMulti(input)
    const valid = Object.keys(results).filter((p) => results[p].valid) as Platform[]
    const invalid = Object.keys(results).filter((p) => !results[p].valid) as Platform[]

    return {
      totalPlatforms: input.platforms.length,
      validPlatforms: valid.length,
      invalidPlatforms: invalid.length,
      platforms: {
        valid,
        invalid,
      },
    }
  }
}
