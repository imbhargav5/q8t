/**
 * Media-related types and schemas
 */

import { z } from 'zod';

/**
 * Media type enum
 */
export const MediaTypeSchema = z.enum(['image', 'video', 'gif']);

export type MediaType = z.infer<typeof MediaTypeSchema>;

/**
 * Media asset schema
 */
export const MediaAssetSchema = z.object({
  id: z.string().uuid(),
  type: MediaTypeSchema,
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  filename: z.string(),
  mimeType: z.string(),
  sizeBytes: z.number(),
  width: z.number().optional(),
  height: z.number().optional(),
  durationSeconds: z.number().optional(),
  altText: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type MediaAsset = z.infer<typeof MediaAssetSchema>;

/**
 * Media upload status
 */
export const MediaUploadStatusSchema = z.enum([
  'pending',
  'uploading',
  'uploaded',
  'processing',
  'failed',
]);

export type MediaUploadStatus = z.infer<typeof MediaUploadStatusSchema>;

/**
 * Media upload result
 */
export const MediaUploadResultSchema = z.object({
  platform: z.string(),
  assetId: z.string(),
  url: z.string().url().optional(),
  status: MediaUploadStatusSchema,
  error: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type MediaUploadResult = z.infer<typeof MediaUploadResultSchema>;

/**
 * Multi-part upload session
 */
export const UploadSessionSchema = z.object({
  sessionId: z.string(),
  uploadUrl: z.string().url(),
  assetId: z.string().optional(),
  chunkSize: z.number(),
  totalChunks: z.number(),
  uploadedChunks: z.array(z.number()),
  metadata: z.record(z.unknown()).optional(),
});

export type UploadSession = z.infer<typeof UploadSessionSchema>;

/**
 * Media validation result
 */
export const MediaValidationResultSchema = z.object({
  valid: z.boolean(),
  errors: z.array(z.string()),
  warnings: z.array(z.string()).optional(),
});

export type MediaValidationResult = z.infer<typeof MediaValidationResultSchema>;
