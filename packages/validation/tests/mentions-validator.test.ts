import { describe, it, expect } from 'vitest'
import { MentionsValidator } from '../src/content/mentions-validator'

describe('MentionsValidator', () => {
  describe('validate', () => {
    it('should validate mentions within Instagram limits', () => {
      const mentions = ['user1', 'user2', 'user3']
      const result = MentionsValidator.validate({
        mentions,
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.count).toBe(3)
      expect(result.limit).toBe(20)
    })

    it('should reject too many mentions on Instagram', () => {
      const mentions = Array(21).fill('user')
      const result = MentionsValidator.validate({
        mentions,
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].code).toBe('TOO_MANY_MENTIONS')
      expect(result.errors[0].actual).toBe(21)
      expect(result.errors[0].limit).toBe(20)
    })

    it('should validate mentions with @ prefix', () => {
      const mentions = ['@user1', '@user2']
      const result = MentionsValidator.validate({
        mentions,
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject empty mentions', () => {
      const result = MentionsValidator.validate({
        mentions: ['user1', '', 'user2'],
        platform: 'instagram',
      })

      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.code === 'EMPTY_MENTION')).toBe(true)
    })

    it('should validate Twitter username format', () => {
      const result = MentionsValidator.validate({
        mentions: ['twitter', 'user_123', 'valid_user'],
        platform: 'twitter',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject invalid Twitter username (too long)', () => {
      const result = MentionsValidator.validate({
        mentions: ['this_is_too_long_username'],
        platform: 'twitter',
      })

      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.code === 'INVALID_MENTION_FORMAT')).toBe(true)
    })

    it('should reject invalid Twitter username (special chars)', () => {
      const result = MentionsValidator.validate({
        mentions: ['user-name', 'user.name'],
        platform: 'twitter',
      })

      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it('should validate Instagram username with dots', () => {
      const result = MentionsValidator.validate({
        mentions: ['user.name', 'test.user.123'],
        platform: 'instagram',
      })

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should respect LinkedIn mention limits', () => {
      const mentions = Array(11).fill('user')
      const result = MentionsValidator.validate({
        mentions,
        platform: 'linkedin',
      })

      expect(result.valid).toBe(false)
      expect(result.limit).toBe(10)
    })
  })

  describe('isValidFormat', () => {
    it('should validate Twitter format correctly', () => {
      expect(MentionsValidator.isValidFormat('twitter', 'twitter')).toBe(true)
      expect(MentionsValidator.isValidFormat('user_123', 'twitter')).toBe(true)
      expect(MentionsValidator.isValidFormat('valid', 'twitter')).toBe(true)
    })

    it('should reject invalid Twitter format', () => {
      expect(MentionsValidator.isValidFormat('user.name', 'twitter')).toBe(false)
      expect(MentionsValidator.isValidFormat('user-name', 'twitter')).toBe(false)
      expect(MentionsValidator.isValidFormat('this_is_too_long_name', 'twitter')).toBe(false)
    })

    it('should validate Instagram format correctly', () => {
      expect(MentionsValidator.isValidFormat('user.name', 'instagram')).toBe(true)
      expect(MentionsValidator.isValidFormat('user_123', 'instagram')).toBe(true)
      expect(MentionsValidator.isValidFormat('test.user.123', 'instagram')).toBe(true)
    })

    it('should validate LinkedIn format correctly', () => {
      expect(MentionsValidator.isValidFormat('john-doe', 'linkedin')).toBe(true)
      expect(MentionsValidator.isValidFormat('user123', 'linkedin')).toBe(true)
    })

    it('should handle @ prefix', () => {
      expect(MentionsValidator.isValidFormat('@twitter', 'twitter')).toBe(true)
      expect(MentionsValidator.isValidFormat('@user.name', 'instagram')).toBe(true)
    })
  })

  describe('extractFromText', () => {
    it('should extract mentions from text', () => {
      const text = 'Hey @user1 and @user2, check this out!'
      const mentions = MentionsValidator.extractFromText(text)

      expect(mentions).toEqual(['user1', 'user2'])
    })

    it('should handle text with no mentions', () => {
      const text = 'This text has no mentions'
      const mentions = MentionsValidator.extractFromText(text)

      expect(mentions).toEqual([])
    })

    it('should handle multiple mentions together', () => {
      const text = '@user1@user2@user3'
      const mentions = MentionsValidator.extractFromText(text)

      expect(mentions).toEqual(['user1', 'user2', 'user3'])
    })

    it('should extract mentions with underscores', () => {
      const text = 'Thanks @user_123 and @test_user!'
      const mentions = MentionsValidator.extractFromText(text)

      expect(mentions).toEqual(['user_123', 'test_user'])
    })
  })

  describe('normalize', () => {
    it('should remove @ prefix', () => {
      const mentions = ['@user1', '@user2', 'user3']
      const normalized = MentionsValidator.normalize(mentions)

      expect(normalized).toEqual(['user1', 'user2', 'user3'])
    })

    it('should handle mentions without @ prefix', () => {
      const mentions = ['user1', 'user2']
      const normalized = MentionsValidator.normalize(mentions)

      expect(normalized).toEqual(['user1', 'user2'])
    })
  })
})
