-- Audience Insights and Best Times to Post
-- This migration adds audience activity tracking and posting time recommendations

-- ============================================================================
-- AUDIENCE ACTIVITY TABLE
-- ============================================================================
-- Track when audience is most active

CREATE TABLE audience_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,

  -- Activity heatmap data (stored as JSONB for flexibility)
  activity_heatmap JSONB NOT NULL DEFAULT '[]',
  /*
    Array of objects:
    [
      {
        "day_of_week": 0,  // 0 = Sunday, 6 = Saturday
        "hour": 0,         // 0-23
        "engagement_score": 85,
        "post_count": 24,
        "avg_impressions": 5000,
        "avg_engagement_rate": 4.5
      }
    ]
  */

  -- Best times (pre-calculated recommendations)
  best_times JSONB DEFAULT '[]',
  /*
    [
      {
        "day_of_week": 2,
        "hour": 13,
        "score": 92,
        "reason": "Highest engagement rate based on 45 posts"
      }
    ]
  */

  -- Summary stats
  peak_days TEXT[] DEFAULT '{}',
  peak_hours INTEGER[] DEFAULT '{}',

  -- Metadata
  last_analyzed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  data_points INTEGER DEFAULT 0 NOT NULL, -- Number of posts analyzed

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, platform)
);

-- ============================================================================
-- POST PERFORMANCE BY TIME TABLE
-- ============================================================================
-- Individual post performance data for analysis

CREATE TABLE post_performance_by_time (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  post_id UUID, -- FK to posts table

  -- When posted
  posted_at TIMESTAMPTZ NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  hour INTEGER NOT NULL CHECK (hour >= 0 AND hour <= 23),
  week_of_year INTEGER CHECK (week_of_year >= 1 AND week_of_year <= 53),

  -- Performance metrics
  impressions BIGINT DEFAULT 0 NOT NULL,
  engagements BIGINT DEFAULT 0 NOT NULL,
  engagement_rate NUMERIC(5, 2),
  clicks BIGINT DEFAULT 0,
  shares BIGINT DEFAULT 0,
  saves BIGINT DEFAULT 0,

  -- Platform
  platform social_platform NOT NULL,

  -- Post characteristics
  content_type TEXT, -- text, image, video, carousel
  has_media BOOLEAN DEFAULT false,
  has_hashtags BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (content_type IN ('text', 'image', 'video', 'carousel', 'link', 'story', 'reel') OR content_type IS NULL)
);

-- ============================================================================
-- AUDIENCE DEMOGRAPHICS TABLE
-- ============================================================================
-- Demographic information about audience

CREATE TABLE audience_demographics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,

  -- Age distribution
  age_distribution JSONB DEFAULT '{}',
  /*
    {
      "13-17": 5,
      "18-24": 25,
      "25-34": 35,
      "35-44": 20,
      "45-54": 10,
      "55-64": 3,
      "65+": 2
    }
  */

  -- Gender distribution
  gender_distribution JSONB DEFAULT '{}',
  /*
    {
      "male": 45,
      "female": 52,
      "other": 3
    }
  */

  -- Geographic distribution
  top_countries JSONB DEFAULT '[]',
  /*
    [
      { "country": "United States", "percentage": 45 },
      { "country": "United Kingdom", "percentage": 15 }
    ]
  */

  top_cities JSONB DEFAULT '[]',

  -- Interests
  top_interests TEXT[] DEFAULT '{}',

  -- Metadata
  total_followers INTEGER DEFAULT 0,
  last_updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, platform)
);

-- ============================================================================
-- POSTING RECOMMENDATIONS TABLE
-- ============================================================================
-- AI/ML-generated posting recommendations

CREATE TABLE posting_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Recommendation
  recommended_time TIMESTAMPTZ NOT NULL,
  day_of_week INTEGER NOT NULL,
  hour INTEGER NOT NULL,
  platform social_platform NOT NULL,

  -- Reasoning
  confidence_score NUMERIC(5, 2) CHECK (confidence_score >= 0 AND confidence_score <= 100),
  reasoning TEXT,

  -- Factors
  factors JSONB DEFAULT '{}',
  /*
    {
      "audience_activity": 85,
      "historical_performance": 78,
      "industry_benchmarks": 82,
      "seasonal_trends": 90
    }
  */

  -- Status
  used BOOLEAN DEFAULT false NOT NULL,
  used_at TIMESTAMPTZ,

  expires_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (day_of_week >= 0 AND day_of_week <= 6),
  CHECK (hour >= 0 AND hour <= 23)
);

-- ============================================================================
-- OPTIMAL POSTING SCHEDULE TABLE
-- ============================================================================
-- Workspace-specific posting schedule

CREATE TABLE optimal_posting_schedule (
  workspace_id UUID PRIMARY KEY REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Schedule (days and times)
  schedule JSONB NOT NULL DEFAULT '{}',
  /*
    {
      "monday": [8, 12, 17],
      "tuesday": [9, 13, 18],
      ...
    }
  */

  -- Platform-specific schedules
  platform_schedules JSONB DEFAULT '{}',
  /*
    {
      "twitter": {
        "monday": [8, 12, 17],
        "tuesday": [9, 13, 18]
      },
      "instagram": {
        "monday": [10, 19, 21]
      }
    }
  */

  -- Settings
  posts_per_day INTEGER DEFAULT 3 NOT NULL,
  auto_adjust BOOLEAN DEFAULT true NOT NULL,

  last_calculated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_audience_activity_updated_at
  BEFORE UPDATE ON audience_activity
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_audience_demographics_updated_at
  BEFORE UPDATE ON audience_demographics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_optimal_posting_schedule_updated_at
  BEFORE UPDATE ON optimal_posting_schedule
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to analyze audience activity
CREATE OR REPLACE FUNCTION analyze_audience_activity(p_workspace_id UUID, p_platform social_platform)
RETURNS JSONB AS $$
DECLARE
  v_heatmap JSONB;
  v_best_times JSONB;
BEGIN
  -- This is a placeholder - actual implementation would analyze post_performance_by_time
  -- and calculate engagement scores for each day/hour combination

  SELECT jsonb_agg(
    jsonb_build_object(
      'day_of_week', day_of_week,
      'hour', hour,
      'engagement_score', AVG(engagement_rate),
      'post_count', COUNT(*),
      'avg_impressions', AVG(impressions)
    )
  )
  INTO v_heatmap
  FROM post_performance_by_time
  WHERE workspace_id = p_workspace_id
  AND platform = p_platform
  GROUP BY day_of_week, hour;

  RETURN jsonb_build_object(
    'heatmap', v_heatmap,
    'analyzed_at', NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get best posting time for a platform
CREATE OR REPLACE FUNCTION get_best_posting_time(
  p_workspace_id UUID,
  p_platform social_platform,
  p_target_datetime TIMESTAMPTZ DEFAULT NOW()
)
RETURNS TABLE (
  recommended_time TIMESTAMPTZ,
  score NUMERIC,
  reason TEXT
) AS $$
BEGIN
  -- This would use the audience_activity data to find optimal time
  -- For now, return placeholder data
  RETURN QUERY
  SELECT
    p_target_datetime + INTERVAL '1 hour' as recommended_time,
    85.0 as score,
    'Based on historical engagement patterns' as reason;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE audience_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_performance_by_time ENABLE ROW LEVEL SECURITY;
ALTER TABLE audience_demographics ENABLE ROW LEVEL SECURITY;
ALTER TABLE posting_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimal_posting_schedule ENABLE ROW LEVEL SECURITY;

-- Members can view audience activity
CREATE POLICY "Members can view audience activity"
  ON audience_activity
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- System can manage audience activity
CREATE POLICY "System can manage audience activity"
  ON audience_activity
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Members can view post performance
CREATE POLICY "Members can view post performance"
  ON post_performance_by_time
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- System can insert post performance data
CREATE POLICY "System can insert post performance"
  ON post_performance_by_time
  FOR INSERT
  WITH CHECK (true);

-- Members can view demographics
CREATE POLICY "Members can view demographics"
  ON audience_demographics
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- System can manage demographics
CREATE POLICY "System can manage demographics"
  ON audience_demographics
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Members can view recommendations
CREATE POLICY "Members can view recommendations"
  ON posting_recommendations
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Members can mark recommendations as used
CREATE POLICY "Members can update recommendations"
  ON posting_recommendations
  FOR UPDATE
  USING (is_workspace_member(workspace_id, auth.uid()));

-- System can create recommendations
CREATE POLICY "System can create recommendations"
  ON posting_recommendations
  FOR INSERT
  WITH CHECK (true);

-- Members can view posting schedule
CREATE POLICY "Members can view posting schedule"
  ON optimal_posting_schedule
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Admins can manage posting schedule
CREATE POLICY "Admins can manage posting schedule"
  ON optimal_posting_schedule
  FOR ALL
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'))
  WITH CHECK (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Audience activity indexes
CREATE INDEX idx_audience_activity_workspace ON audience_activity(workspace_id);
CREATE INDEX idx_audience_activity_platform ON audience_activity(platform);
CREATE INDEX idx_audience_activity_last_analyzed ON audience_activity(last_analyzed_at DESC);

-- GIN indexes for JSONB
CREATE INDEX idx_audience_activity_heatmap ON audience_activity USING GIN (activity_heatmap);
CREATE INDEX idx_audience_activity_best_times ON audience_activity USING GIN (best_times);

-- Post performance indexes
CREATE INDEX idx_post_performance_workspace ON post_performance_by_time(workspace_id);
CREATE INDEX idx_post_performance_platform ON post_performance_by_time(platform);
CREATE INDEX idx_post_performance_posted_at ON post_performance_by_time(posted_at DESC);
CREATE INDEX idx_post_performance_day_hour ON post_performance_by_time(day_of_week, hour);
CREATE INDEX idx_post_performance_engagement ON post_performance_by_time(engagement_rate DESC NULLS LAST);

-- Composite index for analysis
CREATE INDEX idx_post_performance_analysis
  ON post_performance_by_time(workspace_id, platform, day_of_week, hour);

-- Audience demographics indexes
CREATE INDEX idx_audience_demographics_workspace ON audience_demographics(workspace_id);
CREATE INDEX idx_audience_demographics_platform ON audience_demographics(platform);

-- GIN indexes for JSONB
CREATE INDEX idx_audience_demographics_age ON audience_demographics USING GIN (age_distribution);
CREATE INDEX idx_audience_demographics_gender ON audience_demographics USING GIN (gender_distribution);
CREATE INDEX idx_audience_demographics_countries ON audience_demographics USING GIN (top_countries);

-- Posting recommendations indexes
CREATE INDEX idx_posting_recommendations_workspace ON posting_recommendations(workspace_id);
CREATE INDEX idx_posting_recommendations_platform ON posting_recommendations(platform);
CREATE INDEX idx_posting_recommendations_time ON posting_recommendations(recommended_time);
CREATE INDEX idx_posting_recommendations_unused ON posting_recommendations(used) WHERE used = false;

-- GIN index for factors
CREATE INDEX idx_posting_recommendations_factors ON posting_recommendations USING GIN (factors);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE audience_activity IS 'Audience activity patterns and best posting times';
COMMENT ON TABLE post_performance_by_time IS 'Individual post performance data for time analysis';
COMMENT ON TABLE audience_demographics IS 'Demographic data about workspace audience';
COMMENT ON TABLE posting_recommendations IS 'AI-generated posting time recommendations';
COMMENT ON TABLE optimal_posting_schedule IS 'Optimized posting schedule per workspace';

COMMENT ON COLUMN audience_activity.activity_heatmap IS 'Engagement scores by day and hour';
COMMENT ON COLUMN posting_recommendations.confidence_score IS 'Confidence level 0-100 for recommendation';
