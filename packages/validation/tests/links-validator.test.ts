import { describe, it, expect } from 'vitest'
import { LinksValidator } from '../src/content/links-validator'

describe('LinksValidator', () => {
  describe('validate', () => {
    it('should validate links within Instagram limits', () => {
      const links = ['https://example.com']
      const result = LinksValidator.validate({
        links,
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.count).toBe(1)
      expect(result.limit).toBe(1)
    })

    it('should reject too many links on Instagram', () => {
      const links = ['https://example.com', 'https://another.com']
      const result = LinksValidator.validate({
        links,
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].code).toBe('TOO_MANY_LINKS')
      expect(result.errors[0].actual).toBe(2)
      expect(result.errors[0].limit).toBe(1)
    })

    it('should allow multiple links on Facebook', () => {
      const links = [
        'https://example.com',
        'https://another.com',
        'https://third.com',
      ]
      const result = LinksValidator.validate({
        links,
        platform: 'facebook',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.limit).toBe(10)
    })

    it('should reject invalid URL format', () => {
      const result = LinksValidator.validate({
        links: ['not-a-url', 'also invalid'],
        platform: 'facebook',
      })

      expect(result.valid).toBe(false)
      expect(result.errors.length).toBe(2)
      expect(result.errors.every((e) => e.code === 'INVALID_URL_FORMAT')).toBe(true)
    })

    it('should accept http and https URLs', () => {
      const result = LinksValidator.validate({
        links: ['http://example.com', 'https://example.com'],
        platform: 'facebook',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should warn about non-HTTPS URLs', () => {
      const result = LinksValidator.validate({
        links: ['http://example.com'],
        platform: 'facebook',
      })

      expect(result.valid).toBe(true)
      expect(result.warnings.length).toBeGreaterThan(0)
      expect(result.warnings.some((w) => w.message.includes('not using HTTPS'))).toBe(true)
    })

    it('should not warn about HTTPS URLs', () => {
      const result = LinksValidator.validate({
        links: ['https://example.com'],
        platform: 'facebook',
      })

      expect(result.valid).toBe(true)
      expect(result.warnings.filter((w) => w.message.includes('not using HTTPS'))).toHaveLength(0)
    })

    it('should warn about shortened URLs on LinkedIn', () => {
      const result = LinksValidator.validate({
        links: ['https://bit.ly/abc123'],
        platform: 'linkedin',
      })

      expect(result.valid).toBe(true)
      expect(result.warnings.some((w) => w.message.includes('Shortened URL'))).toBe(true)
    })

    it('should warn about shortened URLs on Facebook', () => {
      const result = LinksValidator.validate({
        links: ['https://tinyurl.com/test'],
        platform: 'facebook',
      })

      expect(result.valid).toBe(true)
      expect(result.warnings.some((w) => w.message.includes('Shortened URL'))).toBe(true)
    })

    it('should not warn about shortened URLs on Twitter', () => {
      const result = LinksValidator.validate({
        links: ['https://bit.ly/abc123'],
        platform: 'twitter',
      })

      expect(result.valid).toBe(true)
      expect(result.warnings.filter((w) => w.message.includes('Shortened URL'))).toHaveLength(0)
    })

    it('should handle complex URLs with paths and queries', () => {
      const result = LinksValidator.validate({
        links: ['https://example.com/path/to/page?query=value&another=test'],
        platform: 'facebook',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })
  })

  describe('isValidUrl', () => {
    it('should accept valid HTTP URLs', () => {
      expect(LinksValidator.isValidUrl('http://example.com')).toBe(true)
      expect(LinksValidator.isValidUrl('https://example.com')).toBe(true)
    })

    it('should accept URLs with paths', () => {
      expect(LinksValidator.isValidUrl('https://example.com/path/to/page')).toBe(true)
    })

    it('should accept URLs with query parameters', () => {
      expect(LinksValidator.isValidUrl('https://example.com?query=value')).toBe(true)
    })

    it('should reject invalid URLs', () => {
      expect(LinksValidator.isValidUrl('not-a-url')).toBe(false)
      expect(LinksValidator.isValidUrl('example.com')).toBe(false)
      expect(LinksValidator.isValidUrl('ftp://example.com')).toBe(false)
    })
  })

  describe('isShortenedUrl', () => {
    it('should detect bit.ly URLs', () => {
      expect(LinksValidator.isShortenedUrl('https://bit.ly/abc123')).toBe(true)
    })

    it('should detect tinyurl URLs', () => {
      expect(LinksValidator.isShortenedUrl('https://tinyurl.com/test')).toBe(true)
    })

    it('should detect t.co URLs', () => {
      expect(LinksValidator.isShortenedUrl('https://t.co/abc')).toBe(true)
    })

    it('should detect goo.gl URLs', () => {
      expect(LinksValidator.isShortenedUrl('https://goo.gl/maps/test')).toBe(true)
    })

    it('should not detect regular URLs', () => {
      expect(LinksValidator.isShortenedUrl('https://example.com')).toBe(false)
      expect(LinksValidator.isShortenedUrl('https://google.com')).toBe(false)
    })

    it('should handle www prefix', () => {
      expect(LinksValidator.isShortenedUrl('https://www.bit.ly/abc123')).toBe(true)
    })
  })

  describe('extractFromText', () => {
    it('should extract URLs from text', () => {
      const text = 'Check out https://example.com and http://another.com!'
      const links = LinksValidator.extractFromText(text)

      expect(links).toEqual(['https://example.com', 'http://another.com'])
    })

    it('should handle text with no URLs', () => {
      const text = 'This text has no URLs'
      const links = LinksValidator.extractFromText(text)

      expect(links).toEqual([])
    })

    it('should extract URLs with paths and queries', () => {
      const text = 'Visit https://example.com/path?query=value for more info'
      const links = LinksValidator.extractFromText(text)

      expect(links.length).toBe(1)
      expect(links[0]).toContain('https://example.com/path')
    })
  })
})
