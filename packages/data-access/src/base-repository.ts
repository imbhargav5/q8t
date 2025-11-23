import type { SupabaseClient } from '@supabase/supabase-js'
import type { FindManyOptions, QueryOptions, Repository } from './types'

/**
 * Base repository class with common CRUD operations
 */
export abstract class BaseRepository<T, CreateInput, UpdateInput>
  implements Repository<T, CreateInput, UpdateInput>
{
  protected tableName: string
  protected client: SupabaseClient

  constructor(tableName: string, client: SupabaseClient) {
    this.tableName = tableName
    this.client = client
  }

  /**
   * Find a single record by ID
   */
  async findById(id: string): Promise<T | null> {
    const { data, error } = await this.client.from(this.tableName).select('*').eq('id', id).single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return null
      }
      throw new Error(`Failed to find ${this.tableName} by id: ${error.message}`)
    }

    return this.mapFromDb(data)
  }

  /**
   * Find multiple records
   */
  async findMany(options?: FindManyOptions<T>): Promise<T[]> {
    let query = this.client.from(this.tableName).select('*')

    // Apply where clauses
    if (options?.where) {
      for (const [key, value] of Object.entries(options.where)) {
        if (value !== undefined) {
          query = query.eq(key, value)
        }
      }
    }

    // Apply ordering
    if (options?.orderBy) {
      for (const { field, direction } of options.orderBy) {
        query = query.order(field, { ascending: direction === 'asc' })
      }
    }

    // Apply pagination
    if (options?.limit) {
      query = query.limit(options.limit)
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(`Failed to find ${this.tableName}: ${error.message}`)
    }

    return (data || []).map((item) => this.mapFromDb(item))
  }

  /**
   * Create a new record
   */
  async create(input: CreateInput): Promise<T> {
    const dbData = this.mapToDb(input)

    const { data, error } = await this.client
      .from(this.tableName)
      .insert(dbData)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create ${this.tableName}: ${error.message}`)
    }

    return this.mapFromDb(data)
  }

  /**
   * Update an existing record
   */
  async update(id: string, input: UpdateInput): Promise<T> {
    const dbData = this.mapToDb(input)

    const { data, error } = await this.client
      .from(this.tableName)
      .update({ ...dbData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update ${this.tableName}: ${error.message}`)
    }

    return this.mapFromDb(data)
  }

  /**
   * Delete a record
   */
  async delete(id: string): Promise<void> {
    const { error } = await this.client.from(this.tableName).delete().eq('id', id)

    if (error) {
      throw new Error(`Failed to delete ${this.tableName}: ${error.message}`)
    }
  }

  /**
   * Map database record to domain type
   * Override in subclasses if custom mapping is needed
   */
  protected mapFromDb(data: any): T {
    // Convert timestamp strings to Date objects
    const result: any = { ...data }

    // Common date fields
    const dateFields = [
      'created_at',
      'updated_at',
      'published_at',
      'scheduled_for',
      'token_expires_at',
      'connected_at',
      'last_synced_at',
    ]

    for (const field of dateFields) {
      if (result[field]) {
        result[field] = new Date(result[field])
      }
    }

    return result as T
  }

  /**
   * Map domain type to database record
   * Override in subclasses if custom mapping is needed
   */
  protected mapToDb(data: any): any {
    const result: any = { ...data }

    // Convert Date objects to ISO strings
    for (const [key, value] of Object.entries(result)) {
      if (value instanceof Date) {
        result[key] = value.toISOString()
      }
    }

    return result
  }

  /**
   * Count records matching criteria
   */
  async count(where?: Partial<T>): Promise<number> {
    let query = this.client.from(this.tableName).select('id', { count: 'exact', head: true })

    if (where) {
      for (const [key, value] of Object.entries(where)) {
        if (value !== undefined) {
          query = query.eq(key, value)
        }
      }
    }

    const { count, error } = await query

    if (error) {
      throw new Error(`Failed to count ${this.tableName}: ${error.message}`)
    }

    return count || 0
  }

  /**
   * Check if a record exists
   */
  async exists(id: string): Promise<boolean> {
    const record = await this.findById(id)
    return record !== null
  }
}
