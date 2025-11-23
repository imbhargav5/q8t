import type { Platform, ValidationError } from '../types'
import { getPlatformLimits } from '../rules/platform-limits'

export interface TextValidationInput {
  text: string
  platform: Platform
}

export interface TextValidationResult {
  valid: boolean
  errors: ValidationError[]
  characterCount: number
  limit: number
}

/**
 * Validates text content against platform limits
 */
export class TextValidator {
  /**
   * Validate text length for a specific platform
   */
  static validate(input: TextValidationInput): TextValidationResult {
    const { text, platform } = input
    const limits = getPlatformLimits(platform)
    const characterCount = text.length
    const errors: ValidationError[] = []

    // Check minimum length
    if (characterCount < limits.text.min) {
      errors.push({
        field: 'text',
        message: `Text is too short. Minimum ${limits.text.min} characters required.`,
        code: 'TEXT_TOO_SHORT',
        limit: limits.text.min,
        actual: characterCount,
      })
    }

    // Check maximum length
    if (characterCount > limits.text.max) {
      errors.push({
        field: 'text',
        message: `Text exceeds ${limits.text.max} character limit for ${platform}.`,
        code: 'TEXT_TOO_LONG',
        limit: limits.text.max,
        actual: characterCount,
      })
    }

    return {
      valid: errors.length === 0,
      errors,
      characterCount,
      limit: limits.text.max,
    }
  }

  /**
   * Calculate remaining characters for a platform
   */
  static getRemainingCharacters(input: TextValidationInput): number {
    const { text, platform } = input
    const limits = getPlatformLimits(platform)
    return Math.max(0, limits.text.max - text.length)
  }

  /**
   * Check if text is within limits without detailed validation
   */
  static isWithinLimits(input: TextValidationInput): boolean {
    const { text, platform } = input
    const limits = getPlatformLimits(platform)
    return text.length >= limits.text.min && text.length <= limits.text.max
  }
}
