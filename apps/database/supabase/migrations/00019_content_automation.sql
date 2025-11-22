-- Content Automation
-- This migration adds RSS feeds, content recycling, optimal posting times, and content queues

-- Create enum types for content automation
CREATE TYPE queue_schedule_type AS ENUM ('interval', 'time_slots', 'optimal');
CREATE TYPE queue_item_status AS ENUM ('pending', 'scheduled', 'published', 'failed', 'skipped');

-- ============================================================================
-- RSS FEEDS TABLE
-- ============================================================================

CREATE TABLE rss_feeds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  feed_url TEXT NOT NULL,
  description TEXT,

  -- Publishing configuration
  auto_publish BOOLEAN DEFAULT false NOT NULL,
  target_platforms social_platform[] NOT NULL,
  target_social_account_ids UUID[], -- Specific accounts, null = all accounts for platforms

  -- Post template
  post_template TEXT,
  /*
    Template variables:
    {title} - RSS item title
    {link} - RSS item link
    {description} - RSS item description
    {author} - RSS item author
    {pubDate} - RSS item publication date

    Example: "{title}\n\n{description}\n\nRead more: {link}"
  */

  -- Scheduling
  check_interval_minutes INTEGER DEFAULT 60 NOT NULL,
  last_checked_at TIMESTAMPTZ,
  last_published_at TIMESTAMPTZ,

  -- Filters
  keyword_filters TEXT[], -- Only publish items matching these keywords
  exclude_keywords TEXT[], -- Don't publish items with these keywords
  category_filters TEXT[], -- Only publish from these categories

  -- Limits
  max_posts_per_day INTEGER, -- null = unlimited

  -- Status
  is_active BOOLEAN DEFAULT true NOT NULL,
  health_status TEXT DEFAULT 'healthy', -- "healthy", "warning", "error"
  last_error TEXT,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- RSS FEED ITEMS TABLE
-- ============================================================================

CREATE TABLE rss_feed_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  feed_id UUID NOT NULL REFERENCES rss_feeds(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Item details from RSS
  guid TEXT NOT NULL, -- RSS item GUID (unique identifier)
  title TEXT NOT NULL,
  link TEXT NOT NULL,
  description TEXT,
  author TEXT,
  categories TEXT[] DEFAULT '{}',
  published_at TIMESTAMPTZ,

  -- Publishing status
  was_published BOOLEAN DEFAULT false NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
  published_to_platforms social_platform[] DEFAULT '{}',

  -- Filtering
  matched_filters TEXT[], -- Which filters matched (if any)
  excluded_reason TEXT, -- Why it was excluded (if excluded)

  -- Metadata
  metadata JSONB DEFAULT '{}',

  discovered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(feed_id, guid)
);

-- ============================================================================
-- EVERGREEN CONTENT TABLE
-- ============================================================================

CREATE TABLE evergreen_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Content details
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  media_asset_ids UUID[] DEFAULT '{}', -- References to media_assets

  -- Publishing configuration
  platforms social_platform[] NOT NULL,
  social_account_ids UUID[], -- Specific accounts to publish to

  -- Platform-specific variations
  platform_variations JSONB DEFAULT '{}',
  /*
    {
      "twitter": { "content": "Short version for Twitter...", "hashtags": ["#social"] },
      "linkedin": { "content": "Professional version for LinkedIn..." }
    }
  */

  -- Recycling configuration
  recycle_interval_days INTEGER DEFAULT 30 NOT NULL,
  last_posted_at TIMESTAMPTZ,
  next_post_at TIMESTAMPTZ,

  -- Usage tracking
  times_posted INTEGER DEFAULT 0 NOT NULL,
  max_reposts INTEGER, -- null = unlimited

  -- Performance tracking
  total_engagement INTEGER DEFAULT 0,
  avg_engagement_rate DECIMAL(5,4),

  -- Categories and tags
  categories TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',

  is_active BOOLEAN DEFAULT true NOT NULL,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- OPTIMAL POSTING TIMES TABLE
-- ============================================================================

CREATE TABLE optimal_posting_times (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  social_account_id UUID NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,

  -- Time slot
  day_of_week INTEGER NOT NULL, -- 0 = Sunday, 6 = Saturday
  hour INTEGER NOT NULL, -- 0-23 (in workspace timezone)

  -- Performance metrics (learned from historical data)
  avg_engagement_rate DECIMAL(5,4),
  avg_reach INTEGER,
  avg_impressions INTEGER,
  posts_count INTEGER DEFAULT 0 NOT NULL,

  -- Score for ranking (0-100)
  score DECIMAL(5,2),

  -- Calculation metadata
  calculated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  data_period_days INTEGER DEFAULT 30, -- Based on last N days of data

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, social_account_id, platform, day_of_week, hour)
);

-- ============================================================================
-- CONTENT QUEUE TABLE
-- ============================================================================

CREATE TABLE content_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  color TEXT, -- Hex color for UI

  -- Publishing settings
  platforms social_platform[] NOT NULL,
  social_account_ids UUID[], -- Specific accounts to publish to

  -- Schedule settings
  schedule_type queue_schedule_type NOT NULL,
  schedule_config JSONB NOT NULL,
  /*
    Examples:
    { "interval": { "hours": 4 } }
    { "time_slots": ["09:00", "13:00", "17:00"] }
    { "optimal": { "use_calculated_times": true, "fallback": "09:00", "min_score": 70 } }
  */

  -- Timezone
  timezone TEXT DEFAULT 'UTC' NOT NULL,

  -- Queue management
  posts_per_day INTEGER,
  shuffle_posts BOOLEAN DEFAULT false NOT NULL,
  skip_weekends BOOLEAN DEFAULT false NOT NULL,
  skip_holidays BOOLEAN DEFAULT false NOT NULL,

  -- Auto-fill settings
  auto_fill_enabled BOOLEAN DEFAULT false NOT NULL,
  auto_fill_sources TEXT[], -- ["evergreen", "rss:feed-id"]

  -- Status
  is_active BOOLEAN DEFAULT true NOT NULL,
  paused_until TIMESTAMPTZ,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- CONTENT QUEUE ITEMS TABLE
-- ============================================================================

CREATE TABLE content_queue_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  queue_id UUID NOT NULL REFERENCES content_queue(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Position in queue
  position INTEGER NOT NULL,

  -- Scheduling
  status queue_item_status DEFAULT 'pending' NOT NULL,
  scheduled_for TIMESTAMPTZ,

  -- Publishing
  published_at TIMESTAMPTZ,
  publication_ids UUID[], -- References to post_publications

  -- Error tracking
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  added_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(queue_id, post_id)
);

-- ============================================================================
-- BULK IMPORT BATCHES TABLE
-- ============================================================================

CREATE TABLE bulk_import_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  -- Import details
  source_type TEXT NOT NULL, -- "csv", "excel", "json", "api"
  source_file_url TEXT, -- Storage URL if file upload

  -- Processing status
  status TEXT DEFAULT 'pending' NOT NULL, -- "pending", "processing", "completed", "failed"
  total_items INTEGER,
  processed_items INTEGER DEFAULT 0,
  successful_items INTEGER DEFAULT 0,
  failed_items INTEGER DEFAULT 0,

  -- Target
  queue_id UUID REFERENCES content_queue(id) ON DELETE SET NULL,
  auto_schedule BOOLEAN DEFAULT false,

  -- Processing details
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_log JSONB DEFAULT '[]',

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_rss_feeds_updated_at BEFORE UPDATE ON rss_feeds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evergreen_content_updated_at BEFORE UPDATE ON evergreen_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_queue_updated_at BEFORE UPDATE ON content_queue
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_queue_items_updated_at BEFORE UPDATE ON content_queue_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bulk_import_batches_updated_at BEFORE UPDATE ON bulk_import_batches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to get next post from queue
CREATE OR REPLACE FUNCTION get_next_queue_post(
  queue_uuid UUID
)
RETURNS UUID AS $$
DECLARE
  next_item_id UUID;
  should_shuffle BOOLEAN;
BEGIN
  -- Get queue shuffle setting
  SELECT shuffle_posts INTO should_shuffle FROM content_queue WHERE id = queue_uuid;

  IF should_shuffle THEN
    -- Random selection from pending items
    SELECT id INTO next_item_id
    FROM content_queue_items
    WHERE queue_id = queue_uuid AND status = 'pending'
    ORDER BY RANDOM()
    LIMIT 1;
  ELSE
    -- Sequential by position
    SELECT id INTO next_item_id
    FROM content_queue_items
    WHERE queue_id = queue_uuid AND status = 'pending'
    ORDER BY position ASC
    LIMIT 1;
  END IF;

  RETURN next_item_id;
END;
$$ LANGUAGE plpgsql;

-- Function to schedule next queue posts
CREATE OR REPLACE FUNCTION schedule_queue_posts(
  queue_uuid UUID,
  num_posts INTEGER DEFAULT 1
)
RETURNS INTEGER AS $$
DECLARE
  scheduled_count INTEGER := 0;
  item_record RECORD;
  next_time TIMESTAMPTZ;
  queue_config RECORD;
BEGIN
  -- Get queue configuration
  SELECT * INTO queue_config FROM content_queue WHERE id = queue_uuid AND is_active = true;

  IF NOT FOUND THEN
    RETURN 0;
  END IF;

  -- Check if paused
  IF queue_config.paused_until IS NOT NULL AND queue_config.paused_until > NOW() THEN
    RETURN 0;
  END IF;

  -- Get the next scheduled time from existing items or start from now
  SELECT MAX(scheduled_for) INTO next_time
  FROM content_queue_items
  WHERE queue_id = queue_uuid AND status IN ('pending', 'scheduled');

  IF next_time IS NULL THEN
    next_time := NOW();
  END IF;

  -- Schedule posts based on queue configuration
  FOR i IN 1..num_posts LOOP
    -- Get next item
    SELECT * INTO item_record
    FROM content_queue_items
    WHERE id = get_next_queue_post(queue_uuid);

    EXIT WHEN item_record IS NULL;

    -- Calculate next posting time based on schedule_type
    -- (Simplified - actual implementation would parse schedule_config)
    next_time := next_time + INTERVAL '1 hour';

    -- Update item
    UPDATE content_queue_items
    SET
      status = 'scheduled',
      scheduled_for = next_time,
      updated_at = NOW()
    WHERE id = item_record.id;

    scheduled_count := scheduled_count + 1;
  END LOOP;

  RETURN scheduled_count;
END;
$$ LANGUAGE plpgsql;

-- Function to update evergreen content next post time
CREATE OR REPLACE FUNCTION update_evergreen_next_post()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.last_posted_at IS NOT NULL THEN
    NEW.next_post_at := NEW.last_posted_at + (NEW.recycle_interval_days || ' days')::INTERVAL;
  ELSIF NEW.next_post_at IS NULL THEN
    NEW.next_post_at := NOW() + (NEW.recycle_interval_days || ' days')::INTERVAL;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_evergreen_next_post BEFORE INSERT OR UPDATE ON evergreen_content
  FOR EACH ROW EXECUTE FUNCTION update_evergreen_next_post();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE rss_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE rss_feed_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE evergreen_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimal_posting_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_queue_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulk_import_batches ENABLE ROW LEVEL SECURITY;

-- RSS feeds policies
CREATE POLICY "Workspace members can view RSS feeds"
  ON rss_feeds FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage RSS feeds"
  ON rss_feeds FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- RSS feed items policies
CREATE POLICY "Workspace members can view RSS feed items"
  ON rss_feed_items FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "System can manage RSS feed items"
  ON rss_feed_items FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Evergreen content policies
CREATE POLICY "Workspace members can view evergreen content"
  ON evergreen_content FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage evergreen content"
  ON evergreen_content FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Optimal posting times policies
CREATE POLICY "Workspace members can view optimal posting times"
  ON optimal_posting_times FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "System can manage optimal posting times"
  ON optimal_posting_times FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Content queue policies
CREATE POLICY "Workspace members can view content queues"
  ON content_queue FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage content queues"
  ON content_queue FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Queue items policies
CREATE POLICY "Workspace members can view queue items"
  ON content_queue_items FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage queue items"
  ON content_queue_items FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Bulk import batches policies
CREATE POLICY "Workspace members can view import batches"
  ON bulk_import_batches FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage import batches"
  ON bulk_import_batches FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- ============================================================================
-- INDEXES
-- ============================================================================

-- RSS feeds indexes
CREATE INDEX idx_rss_feeds_workspace ON rss_feeds(workspace_id);
CREATE INDEX idx_rss_feeds_active ON rss_feeds(workspace_id, is_active) WHERE is_active = true;
CREATE INDEX idx_rss_feeds_next_check ON rss_feeds(last_checked_at) WHERE is_active = true;

-- RSS feed items indexes
CREATE INDEX idx_rss_feed_items_feed ON rss_feed_items(feed_id);
CREATE INDEX idx_rss_feed_items_workspace ON rss_feed_items(workspace_id);
CREATE INDEX idx_rss_feed_items_published ON rss_feed_items(was_published);
CREATE INDEX idx_rss_feed_items_discovered ON rss_feed_items(feed_id, discovered_at DESC);

-- Evergreen content indexes
CREATE INDEX idx_evergreen_workspace ON evergreen_content(workspace_id);
CREATE INDEX idx_evergreen_active ON evergreen_content(workspace_id, is_active) WHERE is_active = true;
CREATE INDEX idx_evergreen_next_post ON evergreen_content(next_post_at) WHERE is_active = true;
CREATE INDEX idx_evergreen_categories ON evergreen_content USING GIN(categories);
CREATE INDEX idx_evergreen_tags ON evergreen_content USING GIN(tags);

-- Optimal posting times indexes
CREATE INDEX idx_optimal_times_workspace ON optimal_posting_times(workspace_id);
CREATE INDEX idx_optimal_times_account ON optimal_posting_times(social_account_id);
CREATE INDEX idx_optimal_times_score ON optimal_posting_times(workspace_id, social_account_id, score DESC);
CREATE INDEX idx_optimal_times_slot ON optimal_posting_times(social_account_id, day_of_week, hour);

-- Content queue indexes
CREATE INDEX idx_content_queue_workspace ON content_queue(workspace_id);
CREATE INDEX idx_content_queue_active ON content_queue(workspace_id, is_active) WHERE is_active = true;

-- Queue items indexes
CREATE INDEX idx_queue_items_queue ON content_queue_items(queue_id);
CREATE INDEX idx_queue_items_post ON content_queue_items(post_id);
CREATE INDEX idx_queue_items_status ON content_queue_items(queue_id, status);
CREATE INDEX idx_queue_items_position ON content_queue_items(queue_id, position) WHERE status = 'pending';
CREATE INDEX idx_queue_items_scheduled ON content_queue_items(scheduled_for) WHERE status = 'scheduled';

-- Bulk import batches indexes
CREATE INDEX idx_bulk_imports_workspace ON bulk_import_batches(workspace_id);
CREATE INDEX idx_bulk_imports_status ON bulk_import_batches(status);
CREATE INDEX idx_bulk_imports_created ON bulk_import_batches(workspace_id, created_at DESC);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE rss_feeds IS 'RSS feed configurations for auto-publishing';
COMMENT ON TABLE rss_feed_items IS 'Individual items discovered from RSS feeds';
COMMENT ON TABLE evergreen_content IS 'Evergreen content for periodic recycling';
COMMENT ON TABLE optimal_posting_times IS 'Learned optimal posting times based on engagement data';
COMMENT ON TABLE content_queue IS 'Content queues for scheduled publishing';
COMMENT ON TABLE content_queue_items IS 'Posts in content queues';
COMMENT ON TABLE bulk_import_batches IS 'Bulk import operations for content';

COMMENT ON FUNCTION get_next_queue_post IS 'Get next post from queue (respecting shuffle setting)';
COMMENT ON FUNCTION schedule_queue_posts IS 'Schedule next N posts from queue';
COMMENT ON FUNCTION update_evergreen_next_post IS 'Automatically calculate next post time for evergreen content';
