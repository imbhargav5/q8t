import type { SupabaseClient } from '@supabase/supabase-js'
import { BaseRepository } from '../base-repository'
import type { User, CreateUserInput, UpdateUserInput, FindManyOptions } from '../types'

/**
 * Repository for User operations
 */
export class UserRepository extends BaseRepository<User, CreateUserInput, UpdateUserInput> {
  constructor(client: SupabaseClient) {
    super('users', client)
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    const users = await this.findMany({
      where: { email },
      limit: 1,
    })

    return users[0] || null
  }

  /**
   * Search users by name
   */
  async searchByName(searchTerm: string, options?: FindManyOptions<User>): Promise<User[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .ilike('full_name', `%${searchTerm}%`)
      .limit(options?.limit || 10)

    if (error) {
      throw new Error(`Failed to search users: ${error.message}`)
    }

    return (data || []).map((item) => this.mapFromDb(item))
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    profile: { full_name?: string; avatar_url?: string },
  ): Promise<User> {
    return this.update(userId, profile as UpdateUserInput)
  }

  /**
   * Find users with social accounts (joined query)
   */
  async findWithSocialAccounts(userId: string): Promise<User & { social_accounts: any[] }> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select(
        `
        *,
        social_accounts:social_accounts(*)
      `,
      )
      .eq('id', userId)
      .single()

    if (error) {
      throw new Error(`Failed to find user with social accounts: ${error.message}`)
    }

    return this.mapFromDb(data) as User & { social_accounts: any[] }
  }

  /**
   * Check if user exists by email
   */
  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email)
    return user !== null
  }
}
