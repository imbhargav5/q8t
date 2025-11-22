-- Social Listening and Monitoring
-- This migration adds listening streams, brand monitoring, competitor tracking, and alerts

-- Create enum types for social listening
CREATE TYPE listening_stream_type AS ENUM (
  'brand_mentions',
  'competitor',
  'keyword',
  'hashtag',
  'influencer',
  'industry',
  'custom'
);

CREATE TYPE listening_alert_type AS ENUM (
  'mention_spike',
  'sentiment_spike',
  'influencer_mention',
  'crisis_keyword',
  'competitor_activity',
  'viral_content',
  'review_received'
);

CREATE TYPE alert_severity AS ENUM ('info', 'warning', 'critical');

-- ============================================================================
-- LISTENING STREAMS TABLE
-- ============================================================================

CREATE TABLE listening_streams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  stream_type listening_stream_type NOT NULL,
  color TEXT, -- Hex color for UI

  -- Query configuration
  search_config JSONB NOT NULL,
  /*
    Examples:
    {
      "brand_mentions": {
        "keywords": ["@ourcompany", "#ourcompany", "our company"],
        "exact_match": false,
        "exclude_keywords": ["competitor"]
      },
      "competitor": {
        "competitor_name": "Competitor Inc",
        "keywords": ["@competitor", "#competitor"],
        "track_products": true
      },
      "keyword": {
        "keywords": ["social media marketing", "smm"],
        "hashtags": ["#smm", "#marketing"],
        "boolean_operator": "OR"
      },
      "hashtag": {
        "hashtags": ["#marketing", "#socialmedia"],
        "related_hashtags": true
      },
      "influencer": {
        "influencer_handles": ["@influencer1", "@influencer2"],
        "min_followers": 10000,
        "track_mentions": true
      }
    }
  */

  -- Platform configuration
  platforms social_platform[] NOT NULL,
  excluded_platforms social_platform[] DEFAULT '{}',

  -- Alert configuration
  alert_enabled BOOLEAN DEFAULT false NOT NULL,
  alert_config JSONB,
  /*
    {
      "threshold": {
        "mentions": 10,
        "time_window_minutes": 60
      },
      "sentiment": "negative",
      "min_engagement": 100,
      "notify_users": ["user1", "user2"],
      "notification_channels": ["slack", "email", "push"]
    }
  */

  -- Refresh settings
  auto_refresh BOOLEAN DEFAULT true NOT NULL,
  refresh_interval_minutes INTEGER DEFAULT 15 NOT NULL,
  last_refreshed_at TIMESTAMPTZ,

  -- Filters
  language_codes TEXT[], -- e.g., ["en", "es"]
  location_filters JSONB, -- Geographic filters
  min_engagement INTEGER, -- Minimum engagement count

  -- Organization
  folder TEXT, -- For grouping streams
  tags TEXT[] DEFAULT '{}',

  is_active BOOLEAN DEFAULT true NOT NULL,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- LISTENING STREAM ITEMS TABLE
-- ============================================================================

CREATE TABLE listening_stream_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stream_id UUID NOT NULL REFERENCES listening_streams(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Platform details
  platform social_platform NOT NULL,
  platform_post_id TEXT NOT NULL,
  platform_url TEXT,

  -- Author information
  author_name TEXT NOT NULL,
  author_handle TEXT,
  author_profile_url TEXT,
  author_avatar_url TEXT,
  author_verified BOOLEAN DEFAULT false,

  -- Content
  content TEXT,
  content_preview TEXT, -- First 280 chars
  media_urls TEXT[] DEFAULT '{}',
  hashtags TEXT[] DEFAULT '{}',
  mentions TEXT[] DEFAULT '{}',

  -- Metrics
  engagement_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  views_count INTEGER,

  -- Author reach
  follower_count INTEGER,
  is_influencer BOOLEAN DEFAULT false,

  -- Sentiment (if analyzed)
  sentiment sentiment_type,
  sentiment_score DECIMAL(4,3),

  -- Classification
  categories TEXT[] DEFAULT '{}',
  matched_keywords TEXT[] DEFAULT '{}',

  -- Status
  is_read BOOLEAN DEFAULT false NOT NULL,
  is_starred BOOLEAN DEFAULT false NOT NULL,
  is_archived BOOLEAN DEFAULT false NOT NULL,

  -- Actions taken
  replied_to BOOLEAN DEFAULT false,
  converted_to_conversation BOOLEAN DEFAULT false,
  conversation_id UUID REFERENCES social_inbox_conversations(id) ON DELETE SET NULL,

  -- Timing
  posted_at TIMESTAMPTZ,
  discovered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(stream_id, platform, platform_post_id)
);

-- ============================================================================
-- LISTENING ALERTS TABLE
-- ============================================================================

CREATE TABLE listening_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  stream_id UUID REFERENCES listening_streams(id) ON DELETE SET NULL,

  alert_type listening_alert_type NOT NULL,
  severity alert_severity NOT NULL,

  title TEXT NOT NULL,
  description TEXT,

  -- Trigger data
  trigger_data JSONB,
  /*
    {
      "mention_spike": {
        "current_count": 45,
        "threshold": 20,
        "time_window": "1 hour",
        "increase_percentage": 225
      },
      "influencer_mention": {
        "influencer": "@biginfluencer",
        "follower_count": 500000,
        "post_url": "https://..."
      }
    }
  */

  affected_platforms social_platform[] DEFAULT '{}',
  related_stream_item_ids UUID[] DEFAULT '{}',

  -- Notifications
  notified_users UUID[] DEFAULT '{}',
  notification_channels TEXT[] DEFAULT '{}',
  notification_sent_at TIMESTAMPTZ,

  -- Status
  is_acknowledged BOOLEAN DEFAULT false NOT NULL,
  acknowledged_by UUID REFERENCES users(id) ON DELETE SET NULL,
  acknowledged_at TIMESTAMPTZ,
  acknowledgment_notes TEXT,

  -- Actions taken
  actions_taken JSONB DEFAULT '[]',
  /*
    [
      { "timestamp": "2025-11-22T10:00:00Z", "action": "Created response post", "user_id": "uuid" },
      { "timestamp": "2025-11-22T10:15:00Z", "action": "Escalated to crisis team", "user_id": "uuid" }
    ]
  */

  triggered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- COMPETITOR PROFILES TABLE
-- ============================================================================

CREATE TABLE competitor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  logo_url TEXT,

  -- Social accounts
  social_handles JSONB NOT NULL,
  /*
    {
      "twitter": "@competitor",
      "instagram": "@competitor",
      "linkedin": "competitor-inc",
      "facebook": "competitorinc"
    }
  */

  -- Tracking configuration
  track_posts BOOLEAN DEFAULT true,
  track_engagement BOOLEAN DEFAULT true,
  track_sentiment BOOLEAN DEFAULT true,

  -- Metrics (updated periodically)
  total_followers JSONB, -- Per platform
  avg_engagement_rate DECIMAL(5,4),
  post_frequency_per_week DECIMAL(5,2),
  last_post_at TIMESTAMPTZ,

  -- Organization
  industry TEXT,
  tags TEXT[] DEFAULT '{}',

  is_active BOOLEAN DEFAULT true NOT NULL,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- INFLUENCER PROFILES TABLE
-- ============================================================================

CREATE TABLE influencer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  avatar_url TEXT,

  -- Social accounts
  social_handles JSONB NOT NULL,
  /*
    {
      "twitter": "@influencer",
      "instagram": "@influencer",
      "tiktok": "@influencer"
    }
  */

  -- Metrics
  total_followers INTEGER,
  avg_engagement_rate DECIMAL(5,4),
  reach_estimate INTEGER,

  -- Classification
  niche TEXT, -- e.g., "tech", "fashion", "fitness"
  tier TEXT, -- "nano", "micro", "macro", "mega"
  location TEXT,

  -- Relationship
  relationship_status TEXT, -- "monitoring", "contacted", "collaborating", "ambassador"
  last_mentioned_at TIMESTAMPTZ,
  mention_count INTEGER DEFAULT 0,

  -- Organization
  tags TEXT[] DEFAULT '{}',

  is_active BOOLEAN DEFAULT true NOT NULL,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- REVIEW MONITORING TABLE
-- ============================================================================

CREATE TABLE review_monitoring (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Review source
  platform social_platform NOT NULL, -- "google_my_business", "trustpilot", "yelp", etc.
  platform_location_id TEXT, -- e.g., Google My Business location ID
  source_name TEXT NOT NULL,

  -- Review details
  platform_review_id TEXT NOT NULL,
  platform_url TEXT,

  -- Reviewer
  reviewer_name TEXT NOT NULL,
  reviewer_avatar_url TEXT,

  -- Review content
  rating DECIMAL(3,2) NOT NULL, -- 1.00 to 5.00
  title TEXT,
  content TEXT NOT NULL,
  photos TEXT[] DEFAULT '{}',

  -- Sentiment (analyzed)
  sentiment sentiment_type,
  sentiment_score DECIMAL(4,3),

  -- Response
  has_response BOOLEAN DEFAULT false,
  response_text TEXT,
  responded_at TIMESTAMPTZ,
  responded_by UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Status
  is_read BOOLEAN DEFAULT false NOT NULL,
  is_flagged BOOLEAN DEFAULT false NOT NULL,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Timing
  posted_at TIMESTAMPTZ NOT NULL,
  discovered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, platform, platform_review_id)
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_listening_streams_updated_at BEFORE UPDATE ON listening_streams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_competitor_profiles_updated_at BEFORE UPDATE ON competitor_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_influencer_profiles_updated_at BEFORE UPDATE ON influencer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to detect mention spikes
CREATE OR REPLACE FUNCTION detect_mention_spike(
  stream_uuid UUID,
  time_window_minutes INTEGER DEFAULT 60,
  threshold INTEGER DEFAULT 20
)
RETURNS BOOLEAN AS $$
DECLARE
  mention_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO mention_count
  FROM listening_stream_items
  WHERE
    stream_id = stream_uuid
    AND discovered_at >= NOW() - (time_window_minutes || ' minutes')::INTERVAL;

  RETURN mention_count >= threshold;
END;
$$ LANGUAGE plpgsql;

-- Function to mark stream items as read
CREATE OR REPLACE FUNCTION mark_stream_items_read(
  stream_uuid UUID,
  user_uuid UUID
)
RETURNS INTEGER AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE listening_stream_items
  SET is_read = true
  WHERE stream_id = stream_uuid AND is_read = false;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- Function to classify influencers by follower count
CREATE OR REPLACE FUNCTION classify_influencer_tier(follower_count INTEGER)
RETURNS TEXT AS $$
BEGIN
  RETURN CASE
    WHEN follower_count < 10000 THEN 'nano'
    WHEN follower_count < 100000 THEN 'micro'
    WHEN follower_count < 1000000 THEN 'macro'
    ELSE 'mega'
  END;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE listening_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_stream_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_monitoring ENABLE ROW LEVEL SECURITY;

-- Listening streams policies
CREATE POLICY "Workspace members can view listening streams"
  ON listening_streams FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage listening streams"
  ON listening_streams FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Stream items policies
CREATE POLICY "Workspace members can view stream items"
  ON listening_stream_items FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "System can manage stream items"
  ON listening_stream_items FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Alerts policies
CREATE POLICY "Workspace members can view listening alerts"
  ON listening_alerts FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage listening alerts"
  ON listening_alerts FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Competitor profiles policies
CREATE POLICY "Workspace members can view competitor profiles"
  ON competitor_profiles FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage competitor profiles"
  ON competitor_profiles FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Influencer profiles policies
CREATE POLICY "Workspace members can view influencer profiles"
  ON influencer_profiles FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage influencer profiles"
  ON influencer_profiles FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Review monitoring policies
CREATE POLICY "Workspace members can view reviews"
  ON review_monitoring FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage reviews"
  ON review_monitoring FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Listening streams indexes
CREATE INDEX idx_listening_streams_workspace ON listening_streams(workspace_id);
CREATE INDEX idx_listening_streams_type ON listening_streams(workspace_id, stream_type);
CREATE INDEX idx_listening_streams_active ON listening_streams(workspace_id, is_active) WHERE is_active = true;
CREATE INDEX idx_listening_streams_refresh ON listening_streams(last_refreshed_at) WHERE is_active = true AND auto_refresh = true;

-- Stream items indexes
CREATE INDEX idx_stream_items_stream ON listening_stream_items(stream_id);
CREATE INDEX idx_stream_items_workspace ON listening_stream_items(workspace_id);
CREATE INDEX idx_stream_items_platform ON listening_stream_items(platform);
CREATE INDEX idx_stream_items_discovered ON listening_stream_items(stream_id, discovered_at DESC);
CREATE INDEX idx_stream_items_unread ON listening_stream_items(stream_id, is_read) WHERE is_read = false;
CREATE INDEX idx_stream_items_influencer ON listening_stream_items(stream_id, is_influencer) WHERE is_influencer = true;
CREATE INDEX idx_stream_items_sentiment ON listening_stream_items(stream_id, sentiment);
CREATE INDEX idx_stream_items_engagement ON listening_stream_items(stream_id, engagement_count DESC);

-- Alerts indexes
CREATE INDEX idx_listening_alerts_workspace ON listening_alerts(workspace_id);
CREATE INDEX idx_listening_alerts_stream ON listening_alerts(stream_id);
CREATE INDEX idx_listening_alerts_type ON listening_alerts(alert_type);
CREATE INDEX idx_listening_alerts_severity ON listening_alerts(workspace_id, severity);
CREATE INDEX idx_listening_alerts_triggered ON listening_alerts(workspace_id, triggered_at DESC);
CREATE INDEX idx_listening_alerts_unacknowledged ON listening_alerts(workspace_id, is_acknowledged) WHERE is_acknowledged = false;

-- Competitor profiles indexes
CREATE INDEX idx_competitor_profiles_workspace ON competitor_profiles(workspace_id);
CREATE INDEX idx_competitor_profiles_active ON competitor_profiles(workspace_id, is_active) WHERE is_active = true;

-- Influencer profiles indexes
CREATE INDEX idx_influencer_profiles_workspace ON influencer_profiles(workspace_id);
CREATE INDEX idx_influencer_profiles_tier ON influencer_profiles(workspace_id, tier);
CREATE INDEX idx_influencer_profiles_niche ON influencer_profiles(workspace_id, niche);
CREATE INDEX idx_influencer_profiles_relationship ON influencer_profiles(workspace_id, relationship_status);

-- Review monitoring indexes
CREATE INDEX idx_review_monitoring_workspace ON review_monitoring(workspace_id);
CREATE INDEX idx_review_monitoring_platform ON review_monitoring(workspace_id, platform);
CREATE INDEX idx_review_monitoring_rating ON review_monitoring(workspace_id, rating);
CREATE INDEX idx_review_monitoring_unread ON review_monitoring(workspace_id, is_read) WHERE is_read = false;
CREATE INDEX idx_review_monitoring_flagged ON review_monitoring(workspace_id, is_flagged) WHERE is_flagged = true;
CREATE INDEX idx_review_monitoring_posted ON review_monitoring(workspace_id, posted_at DESC);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE listening_streams IS 'Social listening streams for brand monitoring';
COMMENT ON TABLE listening_stream_items IS 'Individual posts/mentions discovered from listening streams';
COMMENT ON TABLE listening_alerts IS 'Alerts triggered by listening stream conditions';
COMMENT ON TABLE competitor_profiles IS 'Competitor profiles for tracking';
COMMENT ON TABLE influencer_profiles IS 'Influencer profiles for relationship management';
COMMENT ON TABLE review_monitoring IS 'Reviews from various platforms (Google, Trustpilot, etc.)';

COMMENT ON FUNCTION detect_mention_spike IS 'Detect if mentions have spiked above threshold';
COMMENT ON FUNCTION mark_stream_items_read IS 'Mark all unread items in a stream as read';
COMMENT ON FUNCTION classify_influencer_tier IS 'Classify influencer tier based on follower count';
