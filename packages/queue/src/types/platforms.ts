/**
 * Platform-specific types and database models
 */

import { z } from 'zod';
import { BaseRecordSchema, PublicationStatusSchema, PostStatusSchema, ContentTypeSchema } from './common';

/**
 * Social account schema (from database)
 */
export const SocialAccountSchema = BaseRecordSchema.extend({
  workspace_id: z.string().uuid(),
  user_id: z.string().uuid(),
  platform: z.string(),
  platform_user_id: z.string(),
  platform_username: z.string().nullable(),
  access_token: z.string().nullable(),
  refresh_token: z.string().nullable(),
  token_expires_at: z.string().datetime().nullable(),
  account_data: z.record(z.unknown()).optional(),
  is_active: z.boolean(),
  connected_at: z.string().datetime(),
  last_synced_at: z.string().datetime().nullable(),
});

export type SocialAccount = z.infer<typeof SocialAccountSchema>;

/**
 * Post schema (from database)
 */
export const PostSchema = BaseRecordSchema.extend({
  workspace_id: z.string().uuid(),
  user_id: z.string().uuid(),
  content_type: ContentTypeSchema,
  title: z.string().nullable(),
  body: z.string().nullable(),
  media_urls: z.array(z.string()).optional(),
  status: PostStatusSchema,
  scheduled_for: z.string().datetime().nullable(),
  published_at: z.string().datetime().nullable(),
  metadata: z.record(z.unknown()).optional(),
});

export type Post = z.infer<typeof PostSchema>;

/**
 * Post publication schema (from database)
 */
export const PostPublicationSchema = BaseRecordSchema.extend({
  post_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  social_account_id: z.string().uuid(),
  platform: z.string(),
  status: PublicationStatusSchema,
  platform_post_id: z.string().nullable(),
  platform_post_url: z.string().nullable(),
  platform_config: z.record(z.unknown()).optional(),
  error_message: z.string().nullable(),
  published_at: z.string().datetime().nullable(),
});

export type PostPublication = z.infer<typeof PostPublicationSchema>;

/**
 * Media asset schema (from database)
 */
export const MediaAssetDbSchema = BaseRecordSchema.extend({
  workspace_id: z.string().uuid(),
  user_id: z.string().uuid(),
  type: z.enum(['image', 'video', 'gif']),
  url: z.string(),
  thumbnail_url: z.string().nullable(),
  filename: z.string(),
  mime_type: z.string(),
  size_bytes: z.number(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  duration_seconds: z.number().nullable(),
  alt_text: z.string().nullable(),
  metadata: z.record(z.unknown()).optional(),
});

export type MediaAssetDb = z.infer<typeof MediaAssetDbSchema>;

/**
 * Platform credentials (extracted from social account)
 */
export const PlatformCredentialsSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  platformUserId: z.string(),
  platformUsername: z.string().optional(),
  tokenExpiresAt: z.string().datetime().optional(),
  accountData: z.record(z.unknown()).optional(),
});

export type PlatformCredentials = z.infer<typeof PlatformCredentialsSchema>;
