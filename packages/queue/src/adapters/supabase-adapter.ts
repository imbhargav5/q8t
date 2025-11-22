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

  // ============================================================================
  // LISTENING OPERATIONS
  // ============================================================================

  /**
   * Get active listening queries that need to be processed
   */
  async getActiveListeningQueries(): Promise<any[]> {
    const { data, error } = await this.client
      .from('listening_queries')
      .select('*')
      .eq('is_active', true)
      .order('updated_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  /**
   * Get a single listening query by ID
   */
  async getListeningQuery(queryId: string): Promise<any | null> {
    const { data, error } = await this.client
      .from('listening_queries')
      .select('*')
      .eq('id', queryId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Create listening mentions in bulk
   */
  async createListeningMentions(mentions: any[]): Promise<any[]> {
    const { data, error } = await this.client
      .from('listening_mentions')
      .insert(mentions)
      .select();

    if (error) throw error;
    return data || [];
  }

  /**
   * Update query statistics after processing
   */
  async updateQueryStats(
    queryId: string,
    stats: {
      mention_count_24h?: number;
      mention_count_7d?: number;
      last_mention_at?: string;
    }
  ): Promise<void> {
    const { error } = await this.client
      .from('listening_queries')
      .update({
        ...stats,
        updated_at: new Date().toISOString(),
      })
      .eq('id', queryId);

    if (error) throw error;
  }

  /**
   * Get unprocessed mentions for sentiment analysis
   */
  async getUnprocessedMentions(limit: number = 100): Promise<any[]> {
    const { data, error } = await this.client
      .from('listening_mentions')
      .select('*')
      .eq('sentiment', 'unclassified')
      .limit(limit)
      .order('captured_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  /**
   * Update mention sentiment
   */
  async updateMentionSentiment(
    mentionId: string,
    sentiment: string,
    sentimentScore: number,
    sentimentConfidence: number,
    sentimentKeywords: string[]
  ): Promise<void> {
    const { error } = await this.client
      .from('listening_mentions')
      .update({
        sentiment,
        sentiment_score: sentimentScore,
        sentiment_confidence: sentimentConfidence,
        sentiment_keywords: sentimentKeywords,
        updated_at: new Date().toISOString(),
      })
      .eq('id', mentionId);

    if (error) throw error;
  }

  /**
   * Get active listening alerts for a query
   */
  async getActiveAlertsForQuery(queryId: string): Promise<any[]> {
    const { data, error } = await this.client
      .from('listening_alerts')
      .select('*')
      .eq('query_id', queryId)
      .eq('is_active', true);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get workspace-wide active alerts
   */
  async getActiveWorkspaceAlerts(workspaceId: string): Promise<any[]> {
    const { data, error } = await this.client
      .from('listening_alerts')
      .select('*')
      .eq('workspace_id', workspaceId)
      .eq('is_active', true)
      .is('query_id', null);

    if (error) throw error;
    return data || [];
  }

  /**
   * Create alert trigger log
   */
  async createAlertTrigger(trigger: {
    workspace_id: string;
    alert_id: string;
    query_id?: string;
    trigger_reason: string;
    trigger_data?: any;
    mention_ids?: string[];
    notifications_sent?: any;
  }): Promise<any> {
    const { data, error } = await this.client
      .from('listening_alert_triggers')
      .insert(trigger)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Update alert last triggered timestamp
   */
  async updateAlertLastTriggered(alertId: string): Promise<void> {
    const { error } = await this.client
      .from('listening_alerts')
      .update({
        last_triggered_at: new Date().toISOString(),
        trigger_count: this.client.rpc('increment', { row_id: alertId }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', alertId);

    if (error) throw error;
  }

  /**
   * Get mentions for a query in a time window
   */
  async getMentionsInTimeWindow(
    queryId: string,
    windowMinutes: number
  ): Promise<any[]> {
    const startTime = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

    const { data, error } = await this.client
      .from('listening_mentions')
      .select('*')
      .eq('query_id', queryId)
      .gte('captured_at', startTime)
      .eq('is_spam', false)
      .eq('is_duplicate', false);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get mention count by sentiment for a query in a time window
   */
  async getMentionSentimentCounts(
    queryId: string,
    windowMinutes: number
  ): Promise<{ positive: number; neutral: number; negative: number }> {
    const startTime = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

    const { data, error } = await this.client
      .from('listening_mentions')
      .select('sentiment')
      .eq('query_id', queryId)
      .gte('captured_at', startTime)
      .eq('is_spam', false)
      .eq('is_duplicate', false);

    if (error) throw error;

    const counts = { positive: 0, neutral: 0, negative: 0 };
    data?.forEach((mention: any) => {
      if (mention.sentiment === 'positive') counts.positive++;
      else if (mention.sentiment === 'neutral') counts.neutral++;
      else if (mention.sentiment === 'negative') counts.negative++;
    });

    return counts;
  }

  /**
   * Check if mention already exists
   */
  async mentionExists(
    workspaceId: string,
    platform: string,
    platformPostId: string,
    queryId: string
  ): Promise<boolean> {
    const { data, error } = await this.client
      .from('listening_mentions')
      .select('id')
      .eq('workspace_id', workspaceId)
      .eq('platform', platform)
      .eq('platform_post_id', platformPostId)
      .eq('query_id', queryId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
    return !!data;
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
