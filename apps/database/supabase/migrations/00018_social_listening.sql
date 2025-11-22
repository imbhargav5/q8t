-- Social Media Listening System
-- This migration creates the comprehensive listening infrastructure for monitoring
-- social media conversations, tracking keywords, analyzing sentiment, and managing queries

-- Create enum types for listening
CREATE TYPE listening_query_type AS ENUM (
  'keyword',           -- Keyword/phrase tracking
  'hashtag',           -- Hashtag monitoring
  'mention',           -- Account mentions
  'brand',             -- Brand name variations
  'competitor',        -- Competitor monitoring
  'topic',             -- Topic/theme tracking
  'sentiment',         -- Sentiment-based monitoring
  'location',          -- Geographic tracking
  'custom'             -- Custom advanced query
);

CREATE TYPE listening_sentiment AS ENUM ('positive', 'neutral', 'negative', 'mixed', 'unclassified');

CREATE TYPE listening_mention_type AS ENUM (
  'direct_mention',    -- Direct @mention
  'keyword_match',     -- Keyword found in content
  'hashtag_match',     -- Hashtag found in content
  'brand_mention',     -- Brand name mentioned
  'reply',             -- Reply to tracked content
  'repost',            -- Repost/retweet/share
  'quote',             -- Quote tweet/post
  'media_tag',         -- Tagged in media
  'bio_mention'        -- Mentioned in profile bio
);

CREATE TYPE listening_priority AS ENUM ('low', 'medium', 'high', 'critical');

CREATE TYPE listening_alert_trigger AS ENUM (
  'volume_spike',      -- Sudden increase in mentions
  'volume_threshold',  -- Mentions exceed count
  'sentiment_shift',   -- Sentiment change detected
  'negative_spike',    -- Increase in negative sentiment
  'viral_potential',   -- Content gaining traction
  'influencer_mention',-- High-reach account mentioned
  'keyword_match',     -- Specific keyword detected
  'competitor_activity'-- Competitor activity detected
);

-- ============================================================================
-- LISTENING QUERIES TABLE
-- Saved queries that define what to monitor
-- ============================================================================

CREATE TABLE listening_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Query identification
  name TEXT NOT NULL,
  description TEXT,
  query_type listening_query_type NOT NULL,

  -- Query configuration
  keywords TEXT[] DEFAULT '{}', -- Keywords to track
  hashtags TEXT[] DEFAULT '{}', -- Hashtags to track (without #)
  mentions TEXT[] DEFAULT '{}', -- Account handles to track (without @)

  -- Boolean query support for advanced searches
  boolean_query TEXT, -- e.g., "(urgent OR help) AND support NOT spam"

  -- Platform filters
  platforms social_platform[], -- Limit to specific platforms (null = all)
  excluded_platforms social_platform[], -- Exclude specific platforms

  -- Geographic filters
  countries TEXT[], -- ISO country codes
  languages TEXT[], -- ISO language codes

  -- Author filters
  include_authors TEXT[], -- Only from these authors (platform:username)
  exclude_authors TEXT[], -- Exclude these authors
  min_follower_count INTEGER, -- Minimum author follower count
  verified_only BOOLEAN DEFAULT false,

  -- Content filters
  include_media_only BOOLEAN DEFAULT false, -- Only posts with media
  include_links_only BOOLEAN DEFAULT false, -- Only posts with links
  min_engagement INTEGER, -- Minimum likes/shares/comments

  -- Sentiment filters
  sentiment_filter listening_sentiment[], -- Only track specific sentiments

  -- Time filters
  start_date TIMESTAMPTZ, -- Start monitoring from this date
  end_date TIMESTAMPTZ, -- Stop monitoring at this date

  -- Advanced configuration
  case_sensitive BOOLEAN DEFAULT false,
  whole_word_match BOOLEAN DEFAULT false, -- Match whole words only
  include_retweets BOOLEAN DEFAULT true,
  include_replies BOOLEAN DEFAULT true,

  -- Status and settings
  is_active BOOLEAN DEFAULT true NOT NULL,
  is_starred BOOLEAN DEFAULT false NOT NULL,

  -- Statistics
  total_mentions INTEGER DEFAULT 0 NOT NULL,
  mention_count_24h INTEGER DEFAULT 0 NOT NULL,
  mention_count_7d INTEGER DEFAULT 0 NOT NULL,
  last_mention_at TIMESTAMPTZ,

  -- Alert configuration
  alerts_enabled BOOLEAN DEFAULT false NOT NULL,
  alert_threshold_volume INTEGER, -- Alert when mentions exceed this per hour
  alert_threshold_sentiment NUMERIC(3,2), -- Alert when sentiment score drops below this

  -- Metadata
  color TEXT, -- UI color for visualization
  icon TEXT, -- UI icon
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- LISTENING MENTIONS TABLE
-- Individual mentions/posts captured by listening queries
-- ============================================================================

CREATE TABLE listening_mentions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  query_id UUID NOT NULL REFERENCES listening_queries(id) ON DELETE CASCADE,

  -- Platform and source
  platform social_platform NOT NULL,
  social_account_id UUID REFERENCES social_accounts(id) ON DELETE SET NULL,

  -- Platform identification
  platform_post_id TEXT NOT NULL, -- Unique ID from platform
  platform_post_url TEXT, -- Direct URL to post
  platform_parent_id TEXT, -- Parent post ID if this is a reply

  -- Author information
  author_platform_id TEXT NOT NULL, -- Platform user ID
  author_username TEXT NOT NULL,
  author_display_name TEXT,
  author_avatar_url TEXT,
  author_verified BOOLEAN DEFAULT false,
  author_follower_count INTEGER,
  author_bio TEXT,

  -- Mention classification
  mention_type listening_mention_type NOT NULL,
  matched_keywords TEXT[], -- Which keywords triggered this mention
  matched_hashtags TEXT[], -- Which hashtags matched
  matched_mentions TEXT[], -- Which account mentions matched

  -- Content
  content TEXT NOT NULL, -- Full text content
  content_preview TEXT, -- First 280 chars
  language TEXT, -- ISO language code

  -- Media
  has_media BOOLEAN DEFAULT false NOT NULL,
  media_count INTEGER DEFAULT 0 NOT NULL,
  media_urls TEXT[], -- URLs to media assets
  media_types TEXT[], -- Types: image, video, gif

  -- Links
  has_links BOOLEAN DEFAULT false NOT NULL,
  link_urls TEXT[],

  -- Engagement metrics (at time of capture)
  likes_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0, -- Retweets/shares
  comments_count INTEGER DEFAULT 0,
  views_count INTEGER,
  engagement_score NUMERIC(10,2), -- Calculated engagement metric

  -- Reach estimation
  potential_reach BIGINT, -- Based on author followers
  actual_reach BIGINT, -- If available from platform

  -- Sentiment analysis
  sentiment listening_sentiment DEFAULT 'unclassified' NOT NULL,
  sentiment_score NUMERIC(3,2), -- -1.0 (negative) to 1.0 (positive)
  sentiment_confidence NUMERIC(3,2), -- 0.0 to 1.0 confidence score
  sentiment_keywords TEXT[], -- Keywords that influenced sentiment

  -- Manual sentiment override
  manual_sentiment listening_sentiment,
  manual_sentiment_by UUID REFERENCES users(id) ON DELETE SET NULL,
  manual_sentiment_at TIMESTAMPTZ,

  -- Priority and flags
  priority listening_priority DEFAULT 'medium' NOT NULL,
  is_viral BOOLEAN DEFAULT false, -- Trending/viral indicator
  is_influencer BOOLEAN DEFAULT false, -- From high-reach account
  is_verified_author BOOLEAN DEFAULT false,

  -- Status flags
  is_read BOOLEAN DEFAULT false NOT NULL,
  is_starred BOOLEAN DEFAULT false NOT NULL,
  is_archived BOOLEAN DEFAULT false NOT NULL,
  is_spam BOOLEAN DEFAULT false NOT NULL,
  is_duplicate BOOLEAN DEFAULT false NOT NULL,

  -- Conversation linking
  conversation_id UUID REFERENCES social_inbox_conversations(id) ON DELETE SET NULL,
  person_id UUID REFERENCES crm_people(id) ON DELETE SET NULL,
  moved_to_inbox_at TIMESTAMPTZ,
  moved_to_inbox_by UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Assignment
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  assigned_at TIMESTAMPTZ,

  -- Geographic data
  location_name TEXT, -- City, region name
  country_code TEXT, -- ISO country code
  coordinates POINT, -- Geographic coordinates if available

  -- Timestamps
  published_at TIMESTAMPTZ NOT NULL, -- When post was published on platform
  captured_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_updated_at TIMESTAMPTZ, -- Last time metrics were updated

  -- Metadata
  platform_data JSONB DEFAULT '{}', -- Raw platform-specific data
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, platform, platform_post_id, query_id)
);

-- ============================================================================
-- LISTENING MENTION TAGS (many-to-many with inbox_tags)
-- ============================================================================

CREATE TABLE listening_mention_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mention_id UUID NOT NULL REFERENCES listening_mentions(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES inbox_tags(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  added_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(mention_id, tag_id)
);

-- ============================================================================
-- LISTENING NOTES TABLE
-- Internal notes on mentions
-- ============================================================================

CREATE TABLE listening_mention_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mention_id UUID NOT NULL REFERENCES listening_mentions(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  content TEXT NOT NULL,
  note_type inbox_note_type DEFAULT 'general' NOT NULL,

  -- Mentions in notes (@username)
  mentioned_users UUID[] DEFAULT '{}',

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- LISTENING ALERTS TABLE
-- Alert definitions and triggers
-- ============================================================================

CREATE TABLE listening_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  query_id UUID REFERENCES listening_queries(id) ON DELETE CASCADE, -- null = workspace-wide

  -- Alert identification
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL,

  -- Trigger configuration
  trigger_type listening_alert_trigger NOT NULL,
  trigger_config JSONB NOT NULL,
  /*
    Examples:
    - volume_spike: { "threshold_multiplier": 3, "time_window_minutes": 60 }
    - volume_threshold: { "count": 100, "time_window_minutes": 60 }
    - sentiment_shift: { "threshold_change": 0.3, "time_window_minutes": 120 }
    - negative_spike: { "threshold_percentage": 0.7, "min_count": 10 }
    - viral_potential: { "engagement_threshold": 1000, "time_window_minutes": 30 }
    - influencer_mention: { "min_follower_count": 10000 }
  */

  -- Notification configuration
  notify_users UUID[], -- Array of user IDs to notify
  notify_email BOOLEAN DEFAULT false,
  notify_slack BOOLEAN DEFAULT false,
  notify_webhook BOOLEAN DEFAULT false,
  webhook_url TEXT,

  -- Execution tracking
  last_triggered_at TIMESTAMPTZ,
  trigger_count INTEGER DEFAULT 0 NOT NULL,

  -- Cooldown to prevent spam
  cooldown_minutes INTEGER DEFAULT 60,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- LISTENING ALERT TRIGGERS TABLE
-- Log of alert executions
-- ============================================================================

CREATE TABLE listening_alert_triggers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  alert_id UUID NOT NULL REFERENCES listening_alerts(id) ON DELETE CASCADE,
  query_id UUID REFERENCES listening_queries(id) ON DELETE SET NULL,

  -- Trigger details
  trigger_reason TEXT NOT NULL,
  trigger_data JSONB, -- Data that caused the trigger

  -- Related mentions
  mention_ids UUID[], -- Mentions involved in this alert

  -- Notification results
  notifications_sent JSONB, -- Log of sent notifications

  triggered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- LISTENING ANALYTICS TABLE
-- Time-series analytics for queries
-- ============================================================================

CREATE TABLE listening_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  query_id UUID NOT NULL REFERENCES listening_queries(id) ON DELETE CASCADE,

  -- Time bucket
  bucket_start TIMESTAMPTZ NOT NULL,
  bucket_end TIMESTAMPTZ NOT NULL,
  bucket_size INTERVAL NOT NULL, -- e.g., '1 hour', '1 day'

  -- Volume metrics
  mention_count INTEGER DEFAULT 0 NOT NULL,
  unique_authors INTEGER DEFAULT 0 NOT NULL,

  -- Engagement metrics
  total_likes INTEGER DEFAULT 0 NOT NULL,
  total_shares INTEGER DEFAULT 0 NOT NULL,
  total_comments INTEGER DEFAULT 0 NOT NULL,
  total_engagement INTEGER DEFAULT 0 NOT NULL,
  avg_engagement NUMERIC(10,2),

  -- Reach metrics
  total_potential_reach BIGINT DEFAULT 0,
  total_actual_reach BIGINT DEFAULT 0,

  -- Sentiment metrics
  positive_count INTEGER DEFAULT 0 NOT NULL,
  neutral_count INTEGER DEFAULT 0 NOT NULL,
  negative_count INTEGER DEFAULT 0 NOT NULL,
  avg_sentiment_score NUMERIC(3,2),

  -- Top entities (stored as JSON for flexibility)
  top_keywords JSONB DEFAULT '[]', -- [{ "keyword": "...", "count": N }]
  top_hashtags JSONB DEFAULT '[]',
  top_authors JSONB DEFAULT '[]',
  top_posts JSONB DEFAULT '[]', -- Most engaging posts

  -- Platform breakdown
  platform_breakdown JSONB DEFAULT '{}', -- { "twitter": 45, "instagram": 23, ... }

  -- Geographic breakdown
  top_countries JSONB DEFAULT '[]',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(query_id, bucket_start, bucket_size)
);

-- ============================================================================
-- LISTENING SAVED FILTERS TABLE
-- Saved filter/view configurations for the listening dashboard
-- ============================================================================

CREATE TABLE listening_saved_filters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Filter identification
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,

  -- Filter configuration
  filters JSONB NOT NULL,
  /*
    Example:
    {
      "query_ids": ["uuid1", "uuid2"],
      "platforms": ["twitter", "instagram"],
      "sentiment": ["negative", "neutral"],
      "priority": ["high", "critical"],
      "date_range": { "from": "2024-01-01", "to": "2024-12-31" },
      "has_media": true,
      "is_viral": true,
      "min_engagement": 100,
      "authors": ["twitter:elonmusk"],
      "tags": ["urgent", "support"]
    }
  */

  -- Sort configuration
  sort_field TEXT DEFAULT 'published_at',
  sort_direction TEXT DEFAULT 'desc',

  -- Visibility
  is_shared BOOLEAN DEFAULT false NOT NULL,
  is_default BOOLEAN DEFAULT false NOT NULL,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_listening_queries_updated_at BEFORE UPDATE ON listening_queries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listening_mentions_updated_at BEFORE UPDATE ON listening_mentions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listening_mention_notes_updated_at BEFORE UPDATE ON listening_mention_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listening_alerts_updated_at BEFORE UPDATE ON listening_alerts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listening_saved_filters_updated_at BEFORE UPDATE ON listening_saved_filters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update query mention statistics
CREATE OR REPLACE FUNCTION update_listening_query_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE listening_queries
    SET
      total_mentions = total_mentions + 1,
      last_mention_at = NEW.published_at
    WHERE id = NEW.query_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE listening_queries
    SET total_mentions = GREATEST(0, total_mentions - 1)
    WHERE id = OLD.query_id;
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_query_stats_on_mention_change
  AFTER INSERT OR DELETE ON listening_mentions
  FOR EACH ROW
  EXECUTE FUNCTION update_listening_query_stats();

-- Function to create analytics buckets (called by scheduled job)
CREATE OR REPLACE FUNCTION generate_listening_analytics(
  query_uuid UUID,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  bucket_interval INTERVAL
)
RETURNS VOID AS $$
DECLARE
  bucket_start TIMESTAMPTZ;
  bucket_end TIMESTAMPTZ;
  workspace_uuid UUID;
BEGIN
  -- Get workspace_id
  SELECT workspace_id INTO workspace_uuid FROM listening_queries WHERE id = query_uuid;

  bucket_start := start_time;

  WHILE bucket_start < end_time LOOP
    bucket_end := bucket_start + bucket_interval;

    INSERT INTO listening_analytics (
      workspace_id,
      query_id,
      bucket_start,
      bucket_end,
      bucket_size,
      mention_count,
      unique_authors,
      total_likes,
      total_shares,
      total_comments,
      total_engagement,
      positive_count,
      neutral_count,
      negative_count,
      avg_sentiment_score
    )
    SELECT
      workspace_uuid,
      query_uuid,
      bucket_start,
      bucket_end,
      bucket_interval,
      COUNT(*),
      COUNT(DISTINCT author_username),
      COALESCE(SUM(likes_count), 0),
      COALESCE(SUM(shares_count), 0),
      COALESCE(SUM(comments_count), 0),
      COALESCE(SUM(likes_count + shares_count + comments_count), 0),
      COUNT(*) FILTER (WHERE sentiment = 'positive'),
      COUNT(*) FILTER (WHERE sentiment = 'neutral'),
      COUNT(*) FILTER (WHERE sentiment = 'negative'),
      AVG(sentiment_score)
    FROM listening_mentions
    WHERE
      query_id = query_uuid
      AND published_at >= bucket_start
      AND published_at < bucket_end
      AND is_spam = false
      AND is_duplicate = false
    ON CONFLICT (query_id, bucket_start, bucket_size)
    DO UPDATE SET
      mention_count = EXCLUDED.mention_count,
      unique_authors = EXCLUDED.unique_authors,
      total_likes = EXCLUDED.total_likes,
      total_shares = EXCLUDED.total_shares,
      total_comments = EXCLUDED.total_comments,
      total_engagement = EXCLUDED.total_engagement,
      positive_count = EXCLUDED.positive_count,
      neutral_count = EXCLUDED.neutral_count,
      negative_count = EXCLUDED.negative_count,
      avg_sentiment_score = EXCLUDED.avg_sentiment_score;

    bucket_start := bucket_end;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to move mention to inbox
CREATE OR REPLACE FUNCTION move_mention_to_inbox(
  mention_uuid UUID,
  user_uuid UUID
)
RETURNS UUID AS $$
DECLARE
  mention_record RECORD;
  conversation_uuid UUID;
  person_uuid UUID;
BEGIN
  -- Get mention details
  SELECT * INTO mention_record FROM listening_mentions WHERE id = mention_uuid;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Mention not found';
  END IF;

  -- Find or create person
  SELECT id INTO person_uuid
  FROM crm_people
  WHERE
    workspace_id = mention_record.workspace_id
    AND platform = mention_record.platform
    AND platform_user_id = mention_record.author_platform_id;

  IF NOT FOUND THEN
    -- Create new person
    INSERT INTO crm_people (
      workspace_id,
      platform,
      platform_user_id,
      display_name,
      username,
      avatar_url,
      bio,
      follower_count,
      is_verified
    )
    VALUES (
      mention_record.workspace_id,
      mention_record.platform,
      mention_record.author_platform_id,
      mention_record.author_display_name,
      mention_record.author_username,
      mention_record.author_avatar_url,
      mention_record.author_bio,
      mention_record.author_follower_count,
      mention_record.author_verified
    )
    RETURNING id INTO person_uuid;
  END IF;

  -- Find or create conversation
  SELECT id INTO conversation_uuid
  FROM social_inbox_conversations
  WHERE
    workspace_id = mention_record.workspace_id
    AND person_id = person_uuid
    AND social_account_id = mention_record.social_account_id
    AND platform = mention_record.platform;

  IF NOT FOUND THEN
    -- Create new conversation
    INSERT INTO social_inbox_conversations (
      workspace_id,
      person_id,
      social_account_id,
      platform,
      status,
      first_message_at,
      last_message_at
    )
    VALUES (
      mention_record.workspace_id,
      person_uuid,
      mention_record.social_account_id,
      mention_record.platform,
      'open',
      mention_record.published_at,
      mention_record.published_at
    )
    RETURNING id INTO conversation_uuid;
  END IF;

  -- Update mention to link to conversation
  UPDATE listening_mentions
  SET
    conversation_id = conversation_uuid,
    person_id = person_uuid,
    moved_to_inbox_at = NOW(),
    moved_to_inbox_by = user_uuid
  WHERE id = mention_uuid;

  RETURN conversation_uuid;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE listening_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_mention_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_mention_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_alert_triggers ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_saved_filters ENABLE ROW LEVEL SECURITY;

-- Queries policies
CREATE POLICY "Workspace members can view listening queries"
  ON listening_queries FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage listening queries"
  ON listening_queries FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Mentions policies
CREATE POLICY "Workspace members can view listening mentions"
  ON listening_mentions FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage listening mentions"
  ON listening_mentions FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Mention tags policies
CREATE POLICY "Workspace members can view mention tags"
  ON listening_mention_tags FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage mention tags"
  ON listening_mention_tags FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Mention notes policies
CREATE POLICY "Workspace members can view mention notes"
  ON listening_mention_notes FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage mention notes"
  ON listening_mention_notes FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Alerts policies
CREATE POLICY "Workspace members can view alerts"
  ON listening_alerts FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can manage alerts"
  ON listening_alerts FOR ALL
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Alert triggers policies (read-only audit log)
CREATE POLICY "Workspace members can view alert triggers"
  ON listening_alert_triggers FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Analytics policies
CREATE POLICY "Workspace members can view analytics"
  ON listening_analytics FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Saved filters policies
CREATE POLICY "Users can view their own and shared filters"
  ON listening_saved_filters FOR SELECT
  USING (
    is_workspace_member(workspace_id, auth.uid()) AND
    (created_by = auth.uid() OR is_shared = true)
  );

CREATE POLICY "Users can manage their own filters"
  ON listening_saved_filters FOR ALL
  USING (created_by = auth.uid());

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Queries indexes
CREATE INDEX idx_listening_queries_workspace_id ON listening_queries(workspace_id);
CREATE INDEX idx_listening_queries_is_active ON listening_queries(is_active) WHERE is_active = true;
CREATE INDEX idx_listening_queries_created_by ON listening_queries(created_by);
CREATE INDEX idx_listening_queries_query_type ON listening_queries(query_type);
CREATE INDEX idx_listening_queries_platforms ON listening_queries USING GIN(platforms);
CREATE INDEX idx_listening_queries_keywords ON listening_queries USING GIN(keywords);
CREATE INDEX idx_listening_queries_hashtags ON listening_queries USING GIN(hashtags);

-- Mentions indexes
CREATE INDEX idx_listening_mentions_workspace_id ON listening_mentions(workspace_id);
CREATE INDEX idx_listening_mentions_query_id ON listening_mentions(query_id);
CREATE INDEX idx_listening_mentions_platform ON listening_mentions(platform);
CREATE INDEX idx_listening_mentions_social_account_id ON listening_mentions(social_account_id);
CREATE INDEX idx_listening_mentions_platform_post_id ON listening_mentions(platform, platform_post_id);
CREATE INDEX idx_listening_mentions_author ON listening_mentions(platform, author_platform_id);
CREATE INDEX idx_listening_mentions_published_at ON listening_mentions(workspace_id, published_at DESC);
CREATE INDEX idx_listening_mentions_captured_at ON listening_mentions(workspace_id, captured_at DESC);
CREATE INDEX idx_listening_mentions_sentiment ON listening_mentions(sentiment);
CREATE INDEX idx_listening_mentions_priority ON listening_mentions(priority);
CREATE INDEX idx_listening_mentions_conversation_id ON listening_mentions(conversation_id) WHERE conversation_id IS NOT NULL;
CREATE INDEX idx_listening_mentions_person_id ON listening_mentions(person_id) WHERE person_id IS NOT NULL;
CREATE INDEX idx_listening_mentions_assigned_to ON listening_mentions(assigned_to) WHERE assigned_to IS NOT NULL;
CREATE INDEX idx_listening_mentions_is_read ON listening_mentions(workspace_id, is_read);
CREATE INDEX idx_listening_mentions_is_starred ON listening_mentions(workspace_id, is_starred) WHERE is_starred = true;
CREATE INDEX idx_listening_mentions_is_viral ON listening_mentions(workspace_id, is_viral) WHERE is_viral = true;
CREATE INDEX idx_listening_mentions_matched_keywords ON listening_mentions USING GIN(matched_keywords);
CREATE INDEX idx_listening_mentions_matched_hashtags ON listening_mentions USING GIN(matched_hashtags);
CREATE INDEX idx_listening_mentions_content_search ON listening_mentions USING GIN(to_tsvector('english', content));
CREATE INDEX idx_listening_mentions_engagement ON listening_mentions(workspace_id, engagement_score DESC);
CREATE INDEX idx_listening_mentions_country ON listening_mentions(country_code) WHERE country_code IS NOT NULL;

-- Mention tags indexes
CREATE INDEX idx_listening_mention_tags_mention_id ON listening_mention_tags(mention_id);
CREATE INDEX idx_listening_mention_tags_tag_id ON listening_mention_tags(tag_id);
CREATE INDEX idx_listening_mention_tags_workspace_id ON listening_mention_tags(workspace_id);

-- Mention notes indexes
CREATE INDEX idx_listening_mention_notes_mention_id ON listening_mention_notes(mention_id);
CREATE INDEX idx_listening_mention_notes_workspace_id ON listening_mention_notes(workspace_id);
CREATE INDEX idx_listening_mention_notes_created_by ON listening_mention_notes(created_by);

-- Alerts indexes
CREATE INDEX idx_listening_alerts_workspace_id ON listening_alerts(workspace_id);
CREATE INDEX idx_listening_alerts_query_id ON listening_alerts(query_id) WHERE query_id IS NOT NULL;
CREATE INDEX idx_listening_alerts_is_active ON listening_alerts(is_active) WHERE is_active = true;
CREATE INDEX idx_listening_alerts_trigger_type ON listening_alerts(trigger_type);

-- Alert triggers indexes
CREATE INDEX idx_listening_alert_triggers_alert_id ON listening_alert_triggers(alert_id);
CREATE INDEX idx_listening_alert_triggers_workspace_id ON listening_alert_triggers(workspace_id);
CREATE INDEX idx_listening_alert_triggers_query_id ON listening_alert_triggers(query_id) WHERE query_id IS NOT NULL;
CREATE INDEX idx_listening_alert_triggers_triggered_at ON listening_alert_triggers(workspace_id, triggered_at DESC);

-- Analytics indexes
CREATE INDEX idx_listening_analytics_query_id ON listening_analytics(query_id);
CREATE INDEX idx_listening_analytics_workspace_id ON listening_analytics(workspace_id);
CREATE INDEX idx_listening_analytics_bucket_start ON listening_analytics(query_id, bucket_start DESC);
CREATE INDEX idx_listening_analytics_bucket_size ON listening_analytics(query_id, bucket_size, bucket_start DESC);

-- Saved filters indexes
CREATE INDEX idx_listening_saved_filters_workspace_id ON listening_saved_filters(workspace_id);
CREATE INDEX idx_listening_saved_filters_created_by ON listening_saved_filters(created_by);
CREATE INDEX idx_listening_saved_filters_is_shared ON listening_saved_filters(workspace_id, is_shared) WHERE is_shared = true;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE listening_queries IS 'Saved listening queries that define what conversations to monitor across social platforms';
COMMENT ON TABLE listening_mentions IS 'Individual mentions/posts captured by listening queries with sentiment analysis and engagement metrics';
COMMENT ON TABLE listening_mention_tags IS 'Many-to-many relationship between mentions and tags';
COMMENT ON TABLE listening_mention_notes IS 'Internal notes on listening mentions for team collaboration';
COMMENT ON TABLE listening_alerts IS 'Alert definitions that trigger notifications based on listening activity';
COMMENT ON TABLE listening_alert_triggers IS 'Audit log of alert executions and notifications sent';
COMMENT ON TABLE listening_analytics IS 'Time-series analytics data for listening queries (volume, sentiment, engagement trends)';
COMMENT ON TABLE listening_saved_filters IS 'Saved filter configurations for the listening dashboard';

COMMENT ON FUNCTION update_listening_query_stats IS 'Updates mention count statistics when mentions are added/removed';
COMMENT ON FUNCTION generate_listening_analytics IS 'Generates time-bucketed analytics for a listening query (called by scheduled job)';
COMMENT ON FUNCTION move_mention_to_inbox IS 'Moves a listening mention to the social inbox, creating conversation and person if needed';
