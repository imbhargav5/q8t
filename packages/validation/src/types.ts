import { z } from 'zod'

/**
 * Social media platforms
 */
export const PlatformSchema = z.enum([
  'instagram',
  'facebook',
  'twitter',
  'x',
  'linkedin',
  'tiktok',
  'youtube',
  'pinterest',
  'reddit',
  'threads',
])
export type Platform = z.infer<typeof PlatformSchema>

/**
 * Post types
 */
export const PostTypeSchema = z.enum([
  'feed', // Standard feed post
  'story', // Instagram/Facebook story
  'reel', // Instagram reel / TikTok
  'carousel', // Multi-image post
  'video', // Video post
  'tweet', // Twitter/X tweet
  'thread', // Twitter/X thread
])
export type PostType = z.infer<typeof PostTypeSchema>

/**
 * Media types
 */
export const MediaTypeSchema = z.enum(['image', 'video', 'gif'])
export type MediaType = z.infer<typeof MediaTypeSchema>

/**
 * Content to validate
 */
export const ContentInputSchema = z.object({
  text: z.string(),
  mediaUrls: z.array(z.string().url()).optional(),
  hashtags: z.array(z.string()).optional(),
  mentions: z.array(z.string()).optional(),
  links: z.array(z.string().url()).optional(),
})
export type ContentInput = z.infer<typeof ContentInputSchema>

/**
 * Validation error
 */
export const ValidationErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
  code: z.string(),
  limit: z.number().optional(),
  actual: z.number().optional(),
})
export type ValidationError = z.infer<typeof ValidationErrorSchema>

/**
 * Validation warning
 */
export const ValidationWarningSchema = z.object({
  field: z.string(),
  message: z.string(),
  recommendation: z.string().optional(),
})
export type ValidationWarning = z.infer<typeof ValidationWarningSchema>

/**
 * Validation result
 */
export const ValidationResultSchema = z.object({
  valid: z.boolean(),
  errors: z.array(ValidationErrorSchema),
  warnings: z.array(ValidationWarningSchema),
})
export type ValidationResult = z.infer<typeof ValidationResultSchema>

/**
 * Platform limits
 */
export interface PlatformLimits {
  text: {
    min: number
    max: number
  }
  hashtags: {
    max: number
    maxLength: number
  }
  mentions: {
    max: number
  }
  media: {
    maxCount: number
    image: {
      maxSizeBytes: number
      formats: string[]
      maxWidth?: number
      maxHeight?: number
      aspectRatios?: string[]
    }
    video: {
      maxSizeBytes: number
      maxDurationSeconds: number
      formats: string[]
      maxWidth?: number
      maxHeight?: number
    }
  }
  links: {
    max: number
  }
}

/**
 * Media validation input
 */
export const MediaValidationInputSchema = z.object({
  type: MediaTypeSchema,
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  sizeBytes: z.number().int().positive(),
  format: z.string(),
  durationSeconds: z.number().positive().optional(),
  platform: PlatformSchema,
  postType: PostTypeSchema.optional(),
})
export type MediaValidationInput = z.infer<typeof MediaValidationInputSchema>
