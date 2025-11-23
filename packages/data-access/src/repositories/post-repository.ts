import type { SupabaseClient } from '@supabase/supabase-js'
import { BaseRepository } from '../base-repository'
import type {
  Post,
  CreatePostInput,
  UpdatePostInput,
  PostStatus,
  FindManyOptions,
} from '../types'

/**
 * Repository for Post operations
 */
export class PostRepository extends BaseRepository<Post, CreatePostInput, UpdatePostInput> {
  constructor(client: SupabaseClient) {
    super('posts', client)
  }

  /**
   * Find posts by user ID
   */
  async findByUserId(userId: string, options?: FindManyOptions<Post>): Promise<Post[]> {
    return this.findMany({
      ...options,
      where: { ...options?.where, user_id: userId },
    })
  }

  /**
   * Find posts by status
   */
  async findByStatus(status: PostStatus, options?: FindManyOptions<Post>): Promise<Post[]> {
    return this.findMany({
      ...options,
      where: { ...options?.where, status },
    })
  }

  /**
   * Find scheduled posts ready to publish
   */
  async findScheduledForPublishing(beforeTime: Date): Promise<Post[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('status', 'scheduled')
      .lte('scheduled_for', beforeTime.toISOString())
      .order('scheduled_for', { ascending: true })

    if (error) {
      throw new Error(`Failed to find scheduled posts: ${error.message}`)
    }

    return (data || []).map((item) => this.mapFromDb(item))
  }

  /**
   * Find drafts by user
   */
  async findDrafts(userId: string, options?: FindManyOptions<Post>): Promise<Post[]> {
    return this.findMany({
      ...options,
      where: { user_id: userId, status: 'draft' },
      orderBy: [{ field: 'updated_at', direction: 'desc' }],
    })
  }

  /**
   * Find published posts by user
   */
  async findPublished(userId: string, options?: FindManyOptions<Post>): Promise<Post[]> {
    return this.findMany({
      ...options,
      where: { user_id: userId, status: 'published' },
      orderBy: [{ field: 'published_at', direction: 'desc' }],
    })
  }

  /**
   * Find scheduled posts by user
   */
  async findScheduled(userId: string, options?: FindManyOptions<Post>): Promise<Post[]> {
    return this.findMany({
      ...options,
      where: { user_id: userId, status: 'scheduled' },
      orderBy: [{ field: 'scheduled_for', direction: 'asc' }],
    })
  }

  /**
   * Count posts by status for a user
   */
  async countByStatus(userId: string, status: PostStatus): Promise<number> {
    return this.count({ user_id: userId, status } as Partial<Post>)
  }

  /**
   * Find posts with publications (joined query)
   */
  async findWithPublications(postId: string): Promise<Post & { publications: any[] }> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select(
        `
        *,
        publications:post_publications(*)
      `,
      )
      .eq('id', postId)
      .single()

    if (error) {
      throw new Error(`Failed to find post with publications: ${error.message}`)
    }

    return this.mapFromDb(data) as Post & { publications: any[] }
  }

  /**
   * Update post status
   */
  async updateStatus(postId: string, status: PostStatus): Promise<Post> {
    const updates: Partial<UpdatePostInput> = { status }

    // Set published_at when status changes to published
    if (status === 'published') {
      updates.published_at = new Date()
    }

    return this.update(postId, updates as UpdatePostInput)
  }
}
