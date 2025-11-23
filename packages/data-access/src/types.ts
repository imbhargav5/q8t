import { z } from 'zod'

/**
 * Database enum types
 */
export const ContentTypeSchema = z.enum(['text', 'image', 'video'])
export type ContentType = z.infer<typeof ContentTypeSchema>

export const PostStatusSchema = z.enum(['draft', 'scheduled', 'publishing', 'published', 'failed'])
export type PostStatus = z.infer<typeof PostStatusSchema>

export const PublicationStatusSchema = z.enum(['pending', 'publishing', 'published', 'failed'])
export type PublicationStatus = z.infer<typeof PublicationStatusSchema>

export const MediaTypeSchema = z.enum(['image', 'video', 'gif'])
export type MediaType = z.infer<typeof MediaTypeSchema>

export const SocialPlatformSchema = z.enum([
  'whatsapp',
  'threads',
  'twitter',
  'facebook',
  'instagram',
  'linkedin',
  'pinterest',
  'reddit',
  'slack',
  'discord',
  'tiktok',
  'youtube',
  'bluesky',
  'google_my_business',
])
export type SocialPlatform = z.infer<typeof SocialPlatformSchema>

/**
 * Database table types
 */
export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: Date
  updated_at: Date
}

export interface SocialAccount {
  id: string
  user_id: string
  platform: SocialPlatform
  platform_user_id: string
  platform_username: string | null
  access_token: string | null
  refresh_token: string | null
  token_expires_at: Date | null
  account_data: Record<string, unknown>
  is_active: boolean
  connected_at: Date
  last_synced_at: Date | null
  created_at: Date
  updated_at: Date
}

export interface Post {
  id: string
  user_id: string
  content_type: ContentType
  title: string | null
  body: string | null
  media_urls: string[]
  status: PostStatus
  scheduled_for: Date | null
  published_at: Date | null
  metadata: Record<string, unknown>
  created_at: Date
  updated_at: Date
}

export interface PostPublication {
  id: string
  post_id: string
  social_account_id: string
  platform: SocialPlatform
  status: PublicationStatus
  platform_post_id: string | null
  platform_post_url: string | null
  platform_config: Record<string, unknown>
  error_message: string | null
  published_at: Date | null
  created_at: Date
  updated_at: Date
}

export interface MediaAsset {
  id: string
  user_id: string
  type: MediaType
  url: string
  thumbnail_url: string | null
  filename: string
  mime_type: string
  size_bytes: number
  width: number | null
  height: number | null
  duration_seconds: number | null
  alt_text: string | null
  metadata: Record<string, unknown>
  created_at: Date
  updated_at: Date
}

/**
 * Repository query types
 */
export interface QueryOptions {
  limit?: number
  offset?: number
  orderBy?: { field: string; direction: 'asc' | 'desc' }[]
}

export interface WhereClause {
  [key: string]: unknown
}

export interface FindManyOptions<T> extends QueryOptions {
  where?: Partial<T>
  select?: (keyof T)[]
}

/**
 * Transaction type
 */
export type Transaction = unknown // Will be typed based on Supabase client

/**
 * Repository interface
 */
export interface Repository<T, CreateInput, UpdateInput> {
  findById(id: string, tx?: Transaction): Promise<T | null>
  findMany(options?: FindManyOptions<T>, tx?: Transaction): Promise<T[]>
  create(data: CreateInput, tx?: Transaction): Promise<T>
  update(id: string, data: UpdateInput, tx?: Transaction): Promise<T>
  delete(id: string, tx?: Transaction): Promise<void>
}

/**
 * Create/Update input types (omit auto-generated fields)
 */
export type CreateUserInput = Omit<User, 'created_at' | 'updated_at'>
export type UpdateUserInput = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>

export type CreateSocialAccountInput = Omit<
  SocialAccount,
  'id' | 'created_at' | 'updated_at' | 'connected_at'
>
export type UpdateSocialAccountInput = Partial<
  Omit<SocialAccount, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'platform'>
>

export type CreatePostInput = Omit<Post, 'id' | 'created_at' | 'updated_at'>
export type UpdatePostInput = Partial<Omit<Post, 'id' | 'created_at' | 'updated_at' | 'user_id'>>

export type CreatePostPublicationInput = Omit<PostPublication, 'id' | 'created_at' | 'updated_at'>
export type UpdatePostPublicationInput = Partial<
  Omit<PostPublication, 'id' | 'created_at' | 'updated_at' | 'post_id' | 'social_account_id'>
>

export type CreateMediaAssetInput = Omit<MediaAsset, 'id' | 'created_at' | 'updated_at'>
export type UpdateMediaAssetInput = Partial<
  Omit<MediaAsset, 'id' | 'created_at' | 'updated_at' | 'user_id'>
>
