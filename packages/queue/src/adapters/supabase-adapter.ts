/**
 * Supabase database adapter
 *
 * Handles all database operations for the queue system
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type {
  Post,
  PostPublication,
  SocialAccount,
  MediaAssetDb,
  PublicationStatus,
  PostStatus,
} from '../types';

/**
 * Supabase adapter class
 */
export class SupabaseAdapter {
  private client: SupabaseClient;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Get a post by ID
   */
  async getPost(postId: string, workspaceId: string): Promise<Post | null> {
    const { data, error } = await this.client
      .from('posts')
      .select('*')
      .eq('id', postId)
      .eq('workspace_id', workspaceId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get post publications for a post
   */
  async getPostPublications(postId: string): Promise<PostPublication[]> {
    const { data, error } = await this.client
      .from('post_publications')
      .select('*')
      .eq('post_id', postId);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get a single publication by ID
   */
  async getPublication(publicationId: string): Promise<PostPublication | null> {
    const { data, error } = await this.client
      .from('post_publications')
      .select('*')
      .eq('id', publicationId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get social account by ID
   */
  async getSocialAccount(accountId: string): Promise<SocialAccount | null> {
    const { data, error } = await this.client
      .from('social_accounts')
      .select('*')
      .eq('id', accountId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get media assets for a post
   */
  async getMediaAssets(postId: string): Promise<MediaAssetDb[]> {
    const { data: post, error: postError } = await this.client
      .from('posts')
      .select('media_urls')
      .eq('id', postId)
      .single();

    if (postError) throw postError;

    if (!post?.media_urls || post.media_urls.length === 0) {
      return [];
    }

    // Assuming media_urls contains IDs of media assets
    const { data, error } = await this.client
      .from('media_assets')
      .select('*')
      .in('url', post.media_urls);

    if (error) throw error;
    return data || [];
  }

  /**
   * Update publication status
   */
  async updatePublicationStatus(
    publicationId: string,
    status: PublicationStatus,
    updates: {
      platform_post_id?: string;
      platform_post_url?: string;
      error_message?: string;
      published_at?: string;
      platform_config?: Record<string, unknown>;
    } = {}
  ): Promise<void> {
    const { error } = await this.client
      .from('post_publications')
      .update({
        status,
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', publicationId);

    if (error) throw error;
  }

  /**
   * Update post status
   */
  async updatePostStatus(
    postId: string,
    status: PostStatus,
    publishedAt?: string
  ): Promise<void> {
    const updates: {
      status: PostStatus;
      updated_at: string;
      published_at?: string;
    } = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (publishedAt) {
      updates.published_at = publishedAt;
    }

    const { error } = await this.client
      .from('posts')
      .update(updates)
      .eq('id', postId);

    if (error) throw error;
  }

  /**
   * Create a post publication record
   */
  async createPublication(publication: {
    post_id: string;
    workspace_id: string;
    social_account_id: string;
    platform: string;
    status?: PublicationStatus;
    platform_config?: Record<string, unknown>;
  }): Promise<PostPublication> {
    const { data, error } = await this.client
      .from('post_publications')
      .insert({
        ...publication,
        status: publication.status || 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get scheduled posts for a specific time
   */
  async getScheduledPosts(scheduledTime: string): Promise<Post[]> {
    const { data, error } = await this.client
      .from('posts')
      .select('*')
      .eq('status', 'scheduled')
      .eq('scheduled_for', scheduledTime);

    if (error) throw error;
    return data || [];
  }

  /**
   * Count scheduled posts for a specific time
   */
  async countScheduledPosts(scheduledTime: string): Promise<number> {
    const { count, error } = await this.client
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'scheduled')
      .eq('scheduled_for', scheduledTime);

    if (error) throw error;
    return count || 0;
  }

  /**
   * Get post with all related data (publications, media, social accounts)
   */
  async getPostWithRelations(postId: string, workspaceId: string): Promise<{
    post: Post;
    publications: PostPublication[];
    media: MediaAssetDb[];
  } | null> {
    const post = await this.getPost(postId, workspaceId);
    if (!post) return null;

    const [publications, media] = await Promise.all([
      this.getPostPublications(postId),
      this.getMediaAssets(postId),
    ]);

    return { post, publications, media };
  }
}

/**
 * Create a Supabase adapter instance
 * This should be initialized with environment variables
 */
export function createSupabaseAdapter(): SupabaseAdapter {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
  }

  return new SupabaseAdapter(supabaseUrl, supabaseKey);
}
