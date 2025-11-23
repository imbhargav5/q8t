import type { SupabaseClient } from '@supabase/supabase-js'
import { BaseRepository } from '../base-repository'
import type {
  SocialAccount,
  CreateSocialAccountInput,
  UpdateSocialAccountInput,
  SocialPlatform,
  FindManyOptions,
} from '../types'

/**
 * Repository for SocialAccount operations
 */
export class SocialAccountRepository extends BaseRepository<
  SocialAccount,
  CreateSocialAccountInput,
  UpdateSocialAccountInput
> {
  constructor(client: SupabaseClient) {
    super('social_accounts', client)
  }

  /**
   * Find social accounts by user ID
   */
  async findByUserId(
    userId: string,
    options?: FindManyOptions<SocialAccount>,
  ): Promise<SocialAccount[]> {
    return this.findMany({
      ...options,
      where: { ...options?.where, user_id: userId },
    })
  }

  /**
   * Find active social accounts by user ID
   */
  async findActiveByUserId(userId: string): Promise<SocialAccount[]> {
    return this.findMany({
      where: { user_id: userId, is_active: true },
      orderBy: [{ field: 'platform', direction: 'asc' }],
    })
  }

  /**
   * Find social account by platform and user
   */
  async findByUserAndPlatform(
    userId: string,
    platform: SocialPlatform,
  ): Promise<SocialAccount | null> {
    const accounts = await this.findMany({
      where: { user_id: userId, platform },
      limit: 1,
    })

    return accounts[0] || null
  }

  /**
   * Find social account by platform user ID
   */
  async findByPlatformUserId(
    platform: SocialPlatform,
    platformUserId: string,
  ): Promise<SocialAccount | null> {
    const accounts = await this.findMany({
      where: { platform, platform_user_id: platformUserId },
      limit: 1,
    })

    return accounts[0] || null
  }

  /**
   * Update account tokens
   */
  async updateTokens(
    accountId: string,
    tokens: {
      access_token: string
      refresh_token?: string
      token_expires_at?: Date
    },
  ): Promise<SocialAccount> {
    return this.update(accountId, tokens as UpdateSocialAccountInput)
  }

  /**
   * Mark account as inactive
   */
  async deactivate(accountId: string): Promise<SocialAccount> {
    return this.update(accountId, { is_active: false } as UpdateSocialAccountInput)
  }

  /**
   * Mark account as active
   */
  async activate(accountId: string): Promise<SocialAccount> {
    return this.update(accountId, { is_active: true } as UpdateSocialAccountInput)
  }

  /**
   * Update last synced timestamp
   */
  async updateLastSynced(accountId: string): Promise<SocialAccount> {
    return this.update(accountId, { last_synced_at: new Date() } as UpdateSocialAccountInput)
  }

  /**
   * Find accounts with expiring tokens
   */
  async findWithExpiringTokens(beforeTime: Date): Promise<SocialAccount[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('is_active', true)
      .not('token_expires_at', 'is', null)
      .lte('token_expires_at', beforeTime.toISOString())

    if (error) {
      throw new Error(`Failed to find accounts with expiring tokens: ${error.message}`)
    }

    return (data || []).map((item) => this.mapFromDb(item))
  }

  /**
   * Count active accounts by user
   */
  async countActiveByUser(userId: string): Promise<number> {
    return this.count({ user_id: userId, is_active: true } as Partial<SocialAccount>)
  }

  /**
   * Find accounts by platform
   */
  async findByPlatform(
    platform: SocialPlatform,
    options?: FindManyOptions<SocialAccount>,
  ): Promise<SocialAccount[]> {
    return this.findMany({
      ...options,
      where: { ...options?.where, platform },
    })
  }
}
