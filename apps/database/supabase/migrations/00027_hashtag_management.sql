-- Hashtag Management and Analytics
-- This migration adds hashtag sets, tracking, and performance analytics

-- ============================================================================
-- HASHTAG SETS TABLE
-- ============================================================================

CREATE TABLE hashtag_sets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Set details
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,

  -- Hashtags
  hashtags TEXT[] NOT NULL DEFAULT '{}',

  -- Usage tracking
  usage_count INTEGER DEFAULT 0 NOT NULL,
  last_used_at TIMESTAMPTZ,

  -- Metadata
  is_favorite BOOLEAN DEFAULT false NOT NULL,
  color TEXT, -- For UI organization

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (LENGTH(name) > 0),
  CHECK (array_length(hashtags, 1) IS NULL OR array_length(hashtags, 1) > 0)
);

-- ============================================================================
-- HASHTAG ANALYTICS TABLE
-- ============================================================================
-- Track performance of individual hashtags across platforms

CREATE TABLE hashtag_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Hashtag details
  hashtag TEXT NOT NULL,
  platform social_platform NOT NULL,

  -- Performance metrics
  impressions BIGINT DEFAULT 0 NOT NULL,
  reach BIGINT DEFAULT 0 NOT NULL,
  engagements BIGINT DEFAULT 0 NOT NULL,
  clicks BIGINT DEFAULT 0 NOT NULL,
  posts_count INTEGER DEFAULT 0 NOT NULL,

  -- Derived metrics
  engagement_rate NUMERIC(5, 2), -- Percentage
  click_through_rate NUMERIC(5, 2), -- Percentage

  -- Time period
  date DATE NOT NULL,
  week_start DATE,
  month_start DATE,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, hashtag, platform, date),
  CHECK (LENGTH(hashtag) > 0),
  CHECK (hashtag ~ '^#[a-zA-Z0-9_]+$') -- Validate hashtag format
);

-- ============================================================================
-- TRENDING HASHTAGS TABLE
-- ============================================================================
-- Store trending hashtags discovered from various sources

CREATE TABLE trending_hashtags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Hashtag details
  hashtag TEXT NOT NULL,
  category TEXT,

  -- Trending metrics
  trending_score INTEGER CHECK (trending_score >= 0 AND trending_score <= 100),
  volume BIGINT DEFAULT 0 NOT NULL, -- Number of posts using this hashtag
  growth_rate NUMERIC(10, 2), -- Percentage growth
  velocity NUMERIC(10, 2), -- Posts per hour

  -- Related information
  related_hashtags TEXT[] DEFAULT '{}',
  top_posts JSONB DEFAULT '[]', -- Array of top post metadata
  demographics JSONB DEFAULT '{}', -- Audience demographics using this hashtag

  -- Platforms
  platforms social_platform[] DEFAULT '{}',
  platform_breakdown JSONB DEFAULT '{}',
  /*
    {
      "twitter": { "volume": 45000, "growth": 125 },
      "instagram": { "volume": 67000, "growth": 98 }
    }
  */

  -- Temporal data
  discovered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  peak_time TIMESTAMPTZ,
  expires_at TIMESTAMPTZ, -- When trend is expected to fade

  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(hashtag, discovered_at::DATE),
  CHECK (LENGTH(hashtag) > 0)
);

-- ============================================================================
-- HASHTAG USAGE TABLE
-- ============================================================================
-- Track when hashtag sets are used in posts

CREATE TABLE hashtag_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hashtag_set_id UUID NOT NULL REFERENCES hashtag_sets(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- What was created using this hashtag set
  post_id UUID, -- FK to posts table
  entity_type TEXT, -- 'post', 'story', 'reel'
  entity_id UUID,

  -- Which hashtags from the set were actually used
  hashtags_used TEXT[] DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- HASHTAG RECOMMENDATIONS TABLE
-- ============================================================================
-- AI-powered hashtag recommendations based on content

CREATE TABLE hashtag_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Input content
  content_text TEXT,
  content_type TEXT, -- 'text', 'image', 'video'
  media_url TEXT,

  -- Recommendations
  recommended_hashtags JSONB NOT NULL,
  /*
    [
      {
        "hashtag": "#marketing",
        "relevance_score": 0.92,
        "category": "industry",
        "popularity": "high"
      }
    ]
  */

  -- Metadata
  ai_model TEXT, -- Which AI model generated these recommendations
  confidence_score NUMERIC(3, 2),

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days' -- Cache recommendations
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_hashtag_sets_updated_at
  BEFORE UPDATE ON hashtag_sets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hashtag_analytics_updated_at
  BEFORE UPDATE ON hashtag_analytics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trending_hashtags_updated_at
  BEFORE UPDATE ON trending_hashtags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update hashtag set usage count
CREATE OR REPLACE FUNCTION update_hashtag_set_usage_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE hashtag_sets
  SET
    usage_count = usage_count + 1,
    last_used_at = NOW()
  WHERE id = NEW.hashtag_set_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_hashtag_set_usage_count_trigger
  AFTER INSERT ON hashtag_usage
  FOR EACH ROW EXECUTE FUNCTION update_hashtag_set_usage_count();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to get top performing hashtags
CREATE OR REPLACE FUNCTION get_top_hashtags(
  p_workspace_id UUID,
  p_platform social_platform DEFAULT NULL,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  hashtag TEXT,
  total_impressions BIGINT,
  total_engagements BIGINT,
  avg_engagement_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ha.hashtag,
    SUM(ha.impressions) as total_impressions,
    SUM(ha.engagements) as total_engagements,
    AVG(ha.engagement_rate) as avg_engagement_rate
  FROM hashtag_analytics ha
  WHERE ha.workspace_id = p_workspace_id
  AND (p_platform IS NULL OR ha.platform = p_platform)
  AND ha.date >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY ha.hashtag
  ORDER BY total_engagements DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to find related hashtags
CREATE OR REPLACE FUNCTION find_related_hashtags(
  p_hashtag TEXT,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  related_hashtag TEXT,
  co_occurrence_count INTEGER
) AS $$
BEGIN
  -- This would typically use a co-occurrence analysis
  -- For now, return related hashtags from trending data
  RETURN QUERY
  SELECT
    UNNEST(t.related_hashtags) as related_hashtag,
    1 as co_occurrence_count
  FROM trending_hashtags t
  WHERE t.hashtag = p_hashtag
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE hashtag_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashtag_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE trending_hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashtag_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashtag_recommendations ENABLE ROW LEVEL SECURITY;

-- Hashtag sets policies
CREATE POLICY "Members can manage workspace hashtag sets"
  ON hashtag_sets
  FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()))
  WITH CHECK (
    is_workspace_member(workspace_id, auth.uid()) AND
    user_id = auth.uid()
  );

-- Hashtag analytics policies
CREATE POLICY "Members can view workspace analytics"
  ON hashtag_analytics
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "System can insert analytics"
  ON hashtag_analytics
  FOR INSERT
  WITH CHECK (true); -- Controlled by application layer

CREATE POLICY "System can update analytics"
  ON hashtag_analytics
  FOR UPDATE
  USING (true);

-- Trending hashtags are public (read-only for all)
CREATE POLICY "Anyone can view trending hashtags"
  ON trending_hashtags
  FOR SELECT
  USING (true);

CREATE POLICY "System can manage trending hashtags"
  ON trending_hashtags
  FOR ALL
  USING (true)
  WITH CHECK (true); -- Managed by background jobs

-- Hashtag usage policies
CREATE POLICY "Members can view hashtag usage"
  ON hashtag_usage
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Users can create hashtag usage records"
  ON hashtag_usage
  FOR INSERT
  WITH CHECK (
    is_workspace_member(workspace_id, auth.uid()) AND
    user_id = auth.uid()
  );

-- Hashtag recommendations policies
CREATE POLICY "Members can view recommendations"
  ON hashtag_recommendations
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "System can manage recommendations"
  ON hashtag_recommendations
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Hashtag sets indexes
CREATE INDEX idx_hashtag_sets_workspace_id ON hashtag_sets(workspace_id);
CREATE INDEX idx_hashtag_sets_user_id ON hashtag_sets(user_id);
CREATE INDEX idx_hashtag_sets_category ON hashtag_sets(category) WHERE category IS NOT NULL;
CREATE INDEX idx_hashtag_sets_usage ON hashtag_sets(usage_count DESC, last_used_at DESC);
CREATE INDEX idx_hashtag_sets_favorites ON hashtag_sets(is_favorite) WHERE is_favorite = true;

-- GIN index for hashtags array
CREATE INDEX idx_hashtag_sets_hashtags ON hashtag_sets USING GIN (hashtags);

-- Hashtag analytics indexes
CREATE INDEX idx_hashtag_analytics_workspace_id ON hashtag_analytics(workspace_id);
CREATE INDEX idx_hashtag_analytics_hashtag ON hashtag_analytics(hashtag);
CREATE INDEX idx_hashtag_analytics_platform ON hashtag_analytics(platform);
CREATE INDEX idx_hashtag_analytics_date ON hashtag_analytics(date DESC);
CREATE INDEX idx_hashtag_analytics_performance ON hashtag_analytics(workspace_id, engagement_rate DESC, date DESC);

-- Composite indexes for common queries
CREATE INDEX idx_hashtag_analytics_workspace_platform_date
  ON hashtag_analytics(workspace_id, platform, date DESC);

-- Trending hashtags indexes
CREATE INDEX idx_trending_hashtags_score ON trending_hashtags(trending_score DESC, discovered_at DESC);
CREATE INDEX idx_trending_hashtags_category ON trending_hashtags(category) WHERE category IS NOT NULL;
CREATE INDEX idx_trending_hashtags_volume ON trending_hashtags(volume DESC);
CREATE INDEX idx_trending_hashtags_discovered ON trending_hashtags(discovered_at DESC);

-- GIN indexes for array columns
CREATE INDEX idx_trending_hashtags_related ON trending_hashtags USING GIN (related_hashtags);
CREATE INDEX idx_trending_hashtags_platforms ON trending_hashtags USING GIN (platforms);

-- GIN indexes for JSONB columns
CREATE INDEX idx_trending_hashtags_platform_breakdown ON trending_hashtags USING GIN (platform_breakdown);

-- Hashtag usage indexes
CREATE INDEX idx_hashtag_usage_set_id ON hashtag_usage(hashtag_set_id);
CREATE INDEX idx_hashtag_usage_workspace_id ON hashtag_usage(workspace_id);
CREATE INDEX idx_hashtag_usage_user_id ON hashtag_usage(user_id);
CREATE INDEX idx_hashtag_usage_created_at ON hashtag_usage(created_at DESC);

-- Hashtag recommendations indexes
CREATE INDEX idx_hashtag_recommendations_workspace ON hashtag_recommendations(workspace_id);
CREATE INDEX idx_hashtag_recommendations_expires ON hashtag_recommendations(expires_at);

-- GIN index for recommendations JSONB
CREATE INDEX idx_hashtag_recommendations_hashtags ON hashtag_recommendations USING GIN (recommended_hashtags);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE hashtag_sets IS 'Reusable collections of hashtags for quick use';
COMMENT ON TABLE hashtag_analytics IS 'Performance metrics for hashtags across platforms';
COMMENT ON TABLE trending_hashtags IS 'Discovered trending hashtags with growth metrics';
COMMENT ON TABLE hashtag_usage IS 'Tracking of when hashtag sets are used in content';
COMMENT ON TABLE hashtag_recommendations IS 'AI-generated hashtag suggestions based on content';

COMMENT ON COLUMN hashtag_analytics.engagement_rate IS 'Calculated as (engagements / impressions) * 100';
COMMENT ON COLUMN trending_hashtags.trending_score IS 'Composite score from 0-100 indicating trend strength';
COMMENT ON COLUMN trending_hashtags.velocity IS 'Average posts per hour using this hashtag';
