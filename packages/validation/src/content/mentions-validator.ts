import type { Platform, ValidationError } from '../types'
import { getPlatformLimits } from '../rules/platform-limits'

export interface MentionsValidationInput {
  mentions: string[]
  platform: Platform
}

export interface MentionsValidationResult {
  valid: boolean
  errors: ValidationError[]
  count: number
  limit: number
}

/**
 * Validates mentions against platform limits
 */
export class MentionsValidator {
  /**
   * Validate mentions for a specific platform
   */
  static validate(input: MentionsValidationInput): MentionsValidationResult {
    const { mentions, platform } = input
    const limits = getPlatformLimits(platform)
    const errors: ValidationError[] = []

    // Check mentions count
    if (mentions.length > limits.mentions.max) {
      errors.push({
        field: 'mentions',
        message: `Too many mentions. Maximum ${limits.mentions.max} allowed for ${platform}.`,
        code: 'TOO_MANY_MENTIONS',
        limit: limits.mentions.max,
        actual: mentions.length,
      })
    }

    // Validate each mention
    for (let i = 0; i < mentions.length; i++) {
      const mention = mentions[i]
      const cleanMention = mention.startsWith('@') ? mention.slice(1) : mention

      // Check for empty mention
      if (cleanMention.length === 0) {
        errors.push({
          field: `mentions[${i}]`,
          message: 'Empty mention found.',
          code: 'EMPTY_MENTION',
        })
        continue
      }

      // Check mention format (platform-specific)
      if (!this.isValidFormat(cleanMention, platform)) {
        errors.push({
          field: `mentions[${i}]`,
          message: `Mention "${mention}" has invalid format for ${platform}.`,
          code: 'INVALID_MENTION_FORMAT',
        })
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      count: mentions.length,
      limit: limits.mentions.max,
    }
  }

  /**
   * Check if mention format is valid for platform
   */
  static isValidFormat(mention: string, platform: Platform): boolean {
    const cleanMention = mention.startsWith('@') ? mention.slice(1) : mention

    // Twitter/X: alphanumeric and underscores, 1-15 chars
    if (platform === 'twitter' || platform === 'x') {
      return /^[a-zA-Z0-9_]{1,15}$/.test(cleanMention)
    }

    // Instagram/Threads: alphanumeric, dots, underscores
    if (platform === 'instagram' || platform === 'threads') {
      return /^[a-zA-Z0-9._]+$/.test(cleanMention)
    }

    // TikTok: alphanumeric, dots, underscores
    if (platform === 'tiktok') {
      return /^[a-zA-Z0-9._]+$/.test(cleanMention)
    }

    // LinkedIn: more flexible
    if (platform === 'linkedin') {
      return /^[a-zA-Z0-9-]+$/.test(cleanMention)
    }

    // Default: alphanumeric and underscores
    return /^[a-zA-Z0-9_]+$/.test(cleanMention)
  }

  /**
   * Extract mentions from text
   */
  static extractFromText(text: string): string[] {
    const mentionRegex = /@(\w+)/g
    const matches = text.matchAll(mentionRegex)
    return Array.from(matches, (match) => match[1])
  }

  /**
   * Normalize mentions (remove @ prefix)
   */
  static normalize(mentions: string[]): string[] {
    return mentions.map((mention) => (mention.startsWith('@') ? mention.slice(1) : mention))
  }
}
