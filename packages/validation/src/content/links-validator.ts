import type { Platform, ValidationError, ValidationWarning } from '../types'
import { getPlatformLimits } from '../rules/platform-limits'

export interface LinksValidationInput {
  links: string[]
  platform: Platform
}

export interface LinksValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
  count: number
  limit: number
}

/**
 * Validates links against platform limits
 */
export class LinksValidator {
  /**
   * Validate links for a specific platform
   */
  static validate(input: LinksValidationInput): LinksValidationResult {
    const { links, platform } = input
    const limits = getPlatformLimits(platform)
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []

    // Check links count
    if (links.length > limits.links.max) {
      errors.push({
        field: 'links',
        message: `Too many links. Maximum ${limits.links.max} allowed for ${platform}.`,
        code: 'TOO_MANY_LINKS',
        limit: limits.links.max,
        actual: links.length,
      })
    }

    // Validate each link
    for (let i = 0; i < links.length; i++) {
      const link = links[i]

      // Check if valid URL format
      if (!this.isValidUrl(link)) {
        errors.push({
          field: `links[${i}]`,
          message: `Invalid URL format: "${link}".`,
          code: 'INVALID_URL_FORMAT',
        })
        continue
      }

      // Check if HTTPS (security warning)
      if (!link.startsWith('https://')) {
        warnings.push({
          field: `links[${i}]`,
          message: `Link "${link}" is not using HTTPS.`,
          recommendation: 'Consider using HTTPS for better security and trust.',
        })
      }

      // Check for shortened URLs (warning for some platforms)
      if (this.isShortenedUrl(link) && (platform === 'linkedin' || platform === 'facebook')) {
        warnings.push({
          field: `links[${i}]`,
          message: `Shortened URL detected: "${link}".`,
          recommendation: `${platform} may penalize shortened URLs. Consider using full URLs.`,
        })
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      count: links.length,
      limit: limits.links.max,
    }
  }

  /**
   * Check if string is a valid URL
   */
  static isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url)
      return parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {
      return false
    }
  }

  /**
   * Check if URL is a shortened link
   */
  static isShortenedUrl(url: string): boolean {
    const shortenerDomains = [
      'bit.ly',
      'tinyurl.com',
      't.co',
      'goo.gl',
      'ow.ly',
      'rebrand.ly',
      'short.io',
    ]

    try {
      const parsed = new URL(url)
      const hostname = parsed.hostname.replace('www.', '')
      return shortenerDomains.includes(hostname)
    } catch {
      return false
    }
  }

  /**
   * Extract URLs from text
   */
  static extractFromText(text: string): string[] {
    const urlRegex = /https?:\/\/[^\s]+/g
    const matches = text.match(urlRegex)
    if (!matches) return []

    // Remove trailing punctuation from URLs
    return matches.map((url) => url.replace(/[.,;!?]+$/, ''))
  }
}
