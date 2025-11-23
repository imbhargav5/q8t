/**
 * Supabase database adapter for listening system
 *
 * Handles all database operations for the listening system
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase adapter class for listening operations
 */
export class SupabaseListeningAdapter {
  private client: SupabaseClient;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.client = createClient(supabaseUrl, supabaseKey);
  }

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
 * Create a Supabase adapter instance for listening operations
 * This should be initialized with environment variables
 */
export function createSupabaseAdapter(): SupabaseListeningAdapter {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
  }

  return new SupabaseListeningAdapter(supabaseUrl, supabaseKey);
}
