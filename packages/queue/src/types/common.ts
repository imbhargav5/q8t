/**
 * Common types used across the queue system
 */

import { z } from 'zod';

/**
 * Publication status enum matching database
 */
export const PublicationStatusSchema = z.enum([
  'pending',
  'publishing',
  'published',
  'failed',
]);

export type PublicationStatus = z.infer<typeof PublicationStatusSchema>;

/**
 * Post status enum matching database
 */
export const PostStatusSchema = z.enum([
  'draft',
  'scheduled',
  'publishing',
  'published',
  'failed',
]);

export type PostStatus = z.infer<typeof PostStatusSchema>;

/**
 * Content type enum
 */
export const ContentTypeSchema = z.enum(['text', 'image', 'video']);

export type ContentType = z.infer<typeof ContentTypeSchema>;

/**
 * Base database record fields
 */
export const BaseRecordSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

/**
 * UUID schema for validation
 */
export const UUIDSchema = z.string().uuid();
