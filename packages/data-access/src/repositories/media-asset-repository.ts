import type { SupabaseClient } from '@supabase/supabase-js'
import { BaseRepository } from '../base-repository'
import type {
  MediaAsset,
  CreateMediaAssetInput,
  UpdateMediaAssetInput,
  MediaType,
  FindManyOptions,
} from '../types'

/**
 * Repository for MediaAsset operations
 */
export class MediaAssetRepository extends BaseRepository<
  MediaAsset,
  CreateMediaAssetInput,
  UpdateMediaAssetInput
> {
  constructor(client: SupabaseClient) {
    super('media_assets', client)
  }

  /**
   * Find media assets by user ID
   */
  async findByUserId(
    userId: string,
    options?: FindManyOptions<MediaAsset>,
  ): Promise<MediaAsset[]> {
    return this.findMany({
      ...options,
      where: { ...options?.where, user_id: userId },
      orderBy: [{ field: 'created_at', direction: 'desc' }],
    })
  }

  /**
   * Find media assets by type
   */
  async findByType(
    userId: string,
    type: MediaType,
    options?: FindManyOptions<MediaAsset>,
  ): Promise<MediaAsset[]> {
    return this.findMany({
      ...options,
      where: { user_id: userId, type },
      orderBy: [{ field: 'created_at', direction: 'desc' }],
    })
  }

  /**
   * Find images by user
   */
  async findImages(
    userId: string,
    options?: FindManyOptions<MediaAsset>,
  ): Promise<MediaAsset[]> {
    return this.findByType(userId, 'image', options)
  }

  /**
   * Find videos by user
   */
  async findVideos(
    userId: string,
    options?: FindManyOptions<MediaAsset>,
  ): Promise<MediaAsset[]> {
    return this.findByType(userId, 'video', options)
  }

  /**
   * Find GIFs by user
   */
  async findGifs(userId: string, options?: FindManyOptions<MediaAsset>): Promise<MediaAsset[]> {
    return this.findByType(userId, 'gif', options)
  }

  /**
   * Search media assets by filename
   */
  async searchByFilename(userId: string, searchTerm: string): Promise<MediaAsset[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .ilike('filename', `%${searchTerm}%`)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to search media assets: ${error.message}`)
    }

    return (data || []).map((item) => this.mapFromDb(item))
  }

  /**
   * Find recent media assets
   */
  async findRecent(userId: string, limit = 20): Promise<MediaAsset[]> {
    return this.findByUserId(userId, {
      limit,
      orderBy: [{ field: 'created_at', direction: 'desc' }],
    })
  }

  /**
   * Count media assets by type
   */
  async countByType(userId: string, type: MediaType): Promise<number> {
    return this.count({ user_id: userId, type } as Partial<MediaAsset>)
  }

  /**
   * Get total storage used by user (in bytes)
   */
  async getTotalStorageUsed(userId: string): Promise<number> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('size_bytes')
      .eq('user_id', userId)

    if (error) {
      throw new Error(`Failed to calculate storage used: ${error.message}`)
    }

    return (data || []).reduce((total, item) => total + (item.size_bytes || 0), 0)
  }

  /**
   * Find media assets larger than size
   */
  async findLargerThan(userId: string, sizeBytes: number): Promise<MediaAsset[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .gt('size_bytes', sizeBytes)
      .order('size_bytes', { ascending: false })

    if (error) {
      throw new Error(`Failed to find large media assets: ${error.message}`)
    }

    return (data || []).map((item) => this.mapFromDb(item))
  }

  /**
   * Update alt text
   */
  async updateAltText(assetId: string, altText: string): Promise<MediaAsset> {
    return this.update(assetId, { alt_text: altText } as UpdateMediaAssetInput)
  }
}
