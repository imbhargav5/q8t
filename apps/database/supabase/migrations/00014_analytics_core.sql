-- Analytics Core Tables
-- This migration creates the foundation for analytics tracking

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE analytics_metric_type AS ENUM (
  'engagement',
  'reach',
  'impressions',
  'clicks',
  'saves',
  'shares',
  'comments',
  'likes',
  'reactions',
  'views',
  'plays',
  'completion_rate',
  'followers',
  'unfollows'
);

CREATE TYPE analytics_period AS ENUM (
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'quarterly',
  'yearly',
  'custom'
);

CREATE TYPE content_performance_tier AS ENUM (
  'viral',      -- Top 1%
  'high',       -- Top 10%
  'medium',     -- 11-50%
  'low',        -- 51-90%
  'poor'        -- Bottom 10%
);

-- ============================================================================
-- POST ANALYTICS TABLE
-- ============================================================================
-- Stores aggregated analytics for published posts

CREATE TABLE post_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  post_publication_id UUID REFERENCES post_publications(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,

  -- Engagement metrics
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  reactions JSONB DEFAULT '{}', -- Platform-specific reactions {love: 5, haha: 3, etc}
  total_engagement INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0, -- Percentage

  -- Reach metrics
  impressions INTEGER DEFAULT 0,
  unique_reach INTEGER DEFAULT 0,
  organic_reach INTEGER DEFAULT 0,
  paid_reach INTEGER DEFAULT 0,
  viral_reach INTEGER DEFAULT 0,

  -- Click metrics
  link_clicks INTEGER DEFAULT 0,
  other_clicks INTEGER DEFAULT 0,
  click_through_rate DECIMAL(5,2) DEFAULT 0, -- Percentage

  -- Video metrics (if applicable)
  video_views INTEGER DEFAULT 0,
  video_plays INTEGER DEFAULT 0,
  video_completion_rate DECIMAL(5,2) DEFAULT 0,
  avg_watch_time INTEGER DEFAULT 0, -- seconds
  video_3s_views INTEGER DEFAULT 0,
  video_10s_views INTEGER DEFAULT 0,

  -- Growth metrics
  followers_gained INTEGER DEFAULT 0,
  followers_lost INTEGER DEFAULT 0,
  net_followers INTEGER DEFAULT 0,

  -- Performance scoring
  performance_score DECIMAL(5,2) DEFAULT 0, -- 0-100
  performance_tier content_performance_tier,

  -- Timestamps
  last_synced_at TIMESTAMPTZ DEFAULT NOW(),
  first_metrics_at TIMESTAMPTZ, -- When we first got data
  peak_engagement_at TIMESTAMPTZ, -- When engagement peaked

  -- Platform-specific metrics
  platform_metrics JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(post_id, platform)
);

-- ============================================================================
-- POST ANALYTICS SNAPSHOTS TABLE
-- ============================================================================
-- Time-series data for tracking metric changes over time

CREATE TABLE post_analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_analytics_id UUID NOT NULL REFERENCES post_analytics(id) ON DELETE CASCADE,

  -- Snapshot metrics (same as post_analytics but point-in-time)
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  unique_reach INTEGER DEFAULT 0,
  link_clicks INTEGER DEFAULT 0,
  video_views INTEGER DEFAULT 0,

  snapshot_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- ACCOUNT ANALYTICS TABLE
-- ============================================================================
-- Stores aggregated analytics for social accounts (page/profile level)

CREATE TABLE account_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  social_account_id UUID NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,

  -- Period for this snapshot
  period analytics_period NOT NULL,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,

  -- Follower metrics
  followers_count INTEGER DEFAULT 0,
  followers_gained INTEGER DEFAULT 0,
  followers_lost INTEGER DEFAULT 0,
  net_follower_growth INTEGER DEFAULT 0,
  follower_growth_rate DECIMAL(5,2) DEFAULT 0,

  -- Content metrics
  posts_published INTEGER DEFAULT 0,
  avg_posts_per_day DECIMAL(5,2) DEFAULT 0,

  -- Engagement metrics (aggregated)
  total_engagement INTEGER DEFAULT 0,
  avg_engagement_per_post DECIMAL(10,2) DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0,

  -- Reach metrics (aggregated)
  total_impressions INTEGER DEFAULT 0,
  total_reach INTEGER DEFAULT 0,
  avg_reach_per_post DECIMAL(10,2) DEFAULT 0,

  -- Profile/Page metrics
  profile_views INTEGER DEFAULT 0,
  profile_clicks INTEGER DEFAULT 0,
  website_clicks INTEGER DEFAULT 0,

  -- Platform-specific metrics
  platform_metrics JSONB DEFAULT '{}',

  last_synced_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(social_account_id, period, period_start)
);

-- ============================================================================
-- POST PERFORMANCE BREAKDOWN TABLE
-- ============================================================================
-- Hourly/daily breakdown of post performance for detailed analysis

CREATE TABLE post_performance_breakdown (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_analytics_id UUID NOT NULL REFERENCES post_analytics(id) ON DELETE CASCADE,

  -- Time bucket
  time_bucket TIMESTAMPTZ NOT NULL,
  bucket_duration INTERVAL NOT NULL, -- e.g., '1 hour', '1 day'

  -- Metrics for this time bucket
  impressions_delta INTEGER DEFAULT 0,
  reach_delta INTEGER DEFAULT 0,
  engagement_delta INTEGER DEFAULT 0,
  clicks_delta INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(post_analytics_id, time_bucket)
);

-- ============================================================================
-- HASHTAG PERFORMANCE TABLE
-- ============================================================================
-- Tracks performance of hashtags used in posts

CREATE TABLE hashtag_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,

  hashtag TEXT NOT NULL, -- Normalized (lowercase, no #)

  -- Usage stats
  times_used INTEGER DEFAULT 0,
  first_used_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,

  -- Performance metrics (aggregated across all posts using this hashtag)
  avg_engagement DECIMAL(10,2) DEFAULT 0,
  avg_reach DECIMAL(10,2) DEFAULT 0,
  avg_impressions DECIMAL(10,2) DEFAULT 0,
  total_engagement INTEGER DEFAULT 0,
  total_reach INTEGER DEFAULT 0,

  -- Effectiveness score
  performance_score DECIMAL(5,2) DEFAULT 0, -- 0-100

  -- Trending data
  is_trending BOOLEAN DEFAULT false,
  trend_velocity DECIMAL(10,2) DEFAULT 0, -- Rate of usage increase

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, platform, hashtag)
);

-- ============================================================================
-- CONTENT TYPE PERFORMANCE TABLE
-- ============================================================================
-- Aggregated performance by content type

CREATE TABLE content_type_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,

  content_type TEXT NOT NULL, -- 'image', 'video', 'carousel', 'link', 'text', 'reel', 'story'

  -- Period
  period analytics_period NOT NULL,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,

  -- Volume
  posts_count INTEGER DEFAULT 0,

  -- Performance metrics
  avg_engagement DECIMAL(10,2) DEFAULT 0,
  avg_reach DECIMAL(10,2) DEFAULT 0,
  avg_impressions DECIMAL(10,2) DEFAULT 0,
  avg_engagement_rate DECIMAL(5,2) DEFAULT 0,

  total_engagement INTEGER DEFAULT 0,
  total_reach INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, platform, content_type, period, period_start)
);

-- ============================================================================
-- BEST TIME TO POST TABLE
-- ============================================================================
-- Stores optimal posting times based on historical performance

CREATE TABLE best_posting_times (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  social_account_id UUID REFERENCES social_accounts(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,

  -- Time slot
  day_of_week INTEGER NOT NULL, -- 0=Sunday, 6=Saturday
  hour_of_day INTEGER NOT NULL, -- 0-23

  -- Performance metrics for this time slot
  posts_count INTEGER DEFAULT 0,
  avg_engagement DECIMAL(10,2) DEFAULT 0,
  avg_reach DECIMAL(10,2) DEFAULT 0,
  avg_engagement_rate DECIMAL(5,2) DEFAULT 0,

  -- Scoring
  performance_score DECIMAL(5,2) DEFAULT 0, -- 0-100
  rank INTEGER, -- 1 = best time, higher = worse

  -- Optimization goal (what metric this is optimized for)
  optimized_for TEXT DEFAULT 'engagement', -- 'engagement', 'reach', 'clicks', 'awareness'

  last_calculated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, platform, day_of_week, hour_of_day, optimized_for)
);

-- ============================================================================
-- SOCIAL PERFORMANCE SCORE TABLE
-- ============================================================================
-- Stores the overall social performance score and component breakdowns

CREATE TABLE social_performance_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  social_account_id UUID REFERENCES social_accounts(id) ON DELETE CASCADE,
  platform social_platform,

  -- Period
  period analytics_period NOT NULL,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,

  -- Overall score
  overall_score DECIMAL(5,2) NOT NULL, -- 0-100

  -- Component scores with weights
  impressions_score DECIMAL(5,2) DEFAULT 0,
  impressions_weight DECIMAL(3,2) DEFAULT 0.15,

  engagement_score DECIMAL(5,2) DEFAULT 0,
  engagement_weight DECIMAL(3,2) DEFAULT 0.25,

  shares_score DECIMAL(5,2) DEFAULT 0,
  shares_weight DECIMAL(3,2) DEFAULT 0.15,

  comments_score DECIMAL(5,2) DEFAULT 0,
  comments_weight DECIMAL(3,2) DEFAULT 0.15,

  ctr_score DECIMAL(5,2) DEFAULT 0,
  ctr_weight DECIMAL(3,2) DEFAULT 0.15,

  growth_score DECIMAL(5,2) DEFAULT 0,
  growth_weight DECIMAL(3,2) DEFAULT 0.15,

  -- Trend
  score_change DECIMAL(5,2) DEFAULT 0, -- vs previous period
  trend TEXT, -- 'up', 'down', 'stable'

  -- AI insights
  insights JSONB DEFAULT '[]', -- Array of insight objects
  recommendations JSONB DEFAULT '[]', -- Array of recommendation objects

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, social_account_id, platform, period, period_start)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_post_analytics_workspace ON post_analytics(workspace_id);
CREATE INDEX idx_post_analytics_post ON post_analytics(post_id);
CREATE INDEX idx_post_analytics_platform ON post_analytics(platform);
CREATE INDEX idx_post_analytics_score ON post_analytics(performance_score DESC);

CREATE INDEX idx_account_analytics_workspace ON account_analytics(workspace_id);
CREATE INDEX idx_account_analytics_account ON account_analytics(social_account_id);
CREATE INDEX idx_account_analytics_period ON account_analytics(period_start, period_end);

CREATE INDEX idx_hashtag_performance_workspace ON hashtag_performance(workspace_id);
CREATE INDEX idx_hashtag_performance_score ON hashtag_performance(performance_score DESC);
CREATE INDEX idx_hashtag_performance_trending ON hashtag_performance(is_trending) WHERE is_trending = true;

CREATE INDEX idx_best_posting_times_workspace ON best_posting_times(workspace_id);
CREATE INDEX idx_best_posting_times_platform ON best_posting_times(platform);
CREATE INDEX idx_best_posting_times_score ON best_posting_times(performance_score DESC);
