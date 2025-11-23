import type { SupabaseClient } from '@supabase/supabase-js'
import { BaseRepository } from '../base-repository'
import type {
  PostPublication,
  CreatePostPublicationInput,
  UpdatePostPublicationInput,
  PublicationStatus,
  SocialPlatform,
  FindManyOptions,
} from '../types'

/**
 * Repository for PostPublication operations
 */
export class PostPublicationRepository extends BaseRepository<
  PostPublication,
  CreatePostPublicationInput,
  UpdatePostPublicationInput
> {
  constructor(client: SupabaseClient) {
    super('post_publications', client)
  }

  /**
   * Find publications by post ID
   */
  async findByPostId(
    postId: string,
    options?: FindManyOptions<PostPublication>,
  ): Promise<PostPublication[]> {
    return this.findMany({
      ...options,
      where: { ...options?.where, post_id: postId },
    })
  }

  /**
   * Find publications by social account
   */
  async findBySocialAccountId(
    socialAccountId: string,
    options?: FindManyOptions<PostPublication>,
  ): Promise<PostPublication[]> {
    return this.findMany({
      ...options,
      where: { ...options?.where, social_account_id: socialAccountId },
      orderBy: [{ field: 'created_at', direction: 'desc' }],
    })
  }

  /**
   * Find publication by post and account
   */
  async findByPostAndAccount(
    postId: string,
    socialAccountId: string,
  ): Promise<PostPublication | null> {
    const publications = await this.findMany({
      where: { post_id: postId, social_account_id: socialAccountId },
      limit: 1,
    })

    return publications[0] || null
  }

  /**
   * Find publications by status
   */
  async findByStatus(
    status: PublicationStatus,
    options?: FindManyOptions<PostPublication>,
  ): Promise<PostPublication[]> {
    return this.findMany({
      ...options,
      where: { ...options?.where, status },
    })
  }

  /**
   * Find pending publications
   */
  async findPending(options?: FindManyOptions<PostPublication>): Promise<PostPublication[]> {
    return this.findByStatus('pending', options)
  }

  /**
   * Find failed publications
   */
  async findFailed(options?: FindManyOptions<PostPublication>): Promise<PostPublication[]> {
    return this.findByStatus('failed', options)
  }

  /**
   * Find publications by platform
   */
  async findByPlatform(
    platform: SocialPlatform,
    options?: FindManyOptions<PostPublication>,
  ): Promise<PostPublication[]> {
    return this.findMany({
      ...options,
      where: { ...options?.where, platform },
    })
  }

  /**
   * Update publication status
   */
  async updateStatus(
    publicationId: string,
    status: PublicationStatus,
    error?: string,
  ): Promise<PostPublication> {
    const updates: Partial<UpdatePostPublicationInput> = { status }

    if (status === 'published') {
      updates.published_at = new Date()
    }

    if (error) {
      updates.error_message = error
    }

    return this.update(publicationId, updates as UpdatePostPublicationInput)
  }

  /**
   * Mark as published with platform details
   */
  async markAsPublished(
    publicationId: string,
    platformPostId: string,
    platformPostUrl?: string,
  ): Promise<PostPublication> {
    return this.update(publicationId, {
      status: 'published',
      platform_post_id: platformPostId,
      platform_post_url: platformPostUrl,
      published_at: new Date(),
    } as UpdatePostPublicationInput)
  }

  /**
   * Mark as failed with error message
   */
  async markAsFailed(publicationId: string, errorMessage: string): Promise<PostPublication> {
    return this.update(publicationId, {
      status: 'failed',
      error_message: errorMessage,
    } as UpdatePostPublicationInput)
  }

  /**
   * Retry a failed publication
   */
  async retry(publicationId: string): Promise<PostPublication> {
    return this.update(publicationId, {
      status: 'pending',
      error_message: null,
    } as UpdatePostPublicationInput)
  }

  /**
   * Count publications by status for a post
   */
  async countByStatusForPost(postId: string, status: PublicationStatus): Promise<number> {
    return this.count({ post_id: postId, status } as Partial<PostPublication>)
  }

  /**
   * Find publications with post details (joined query)
   */
  async findWithPost(publicationId: string): Promise<PostPublication & { post: any }> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select(
        `
        *,
        post:posts(*)
      `,
      )
      .eq('id', publicationId)
      .single()

    if (error) {
      throw new Error(`Failed to find publication with post: ${error.message}`)
    }

    return this.mapFromDb(data) as PostPublication & { post: any }
  }
}
