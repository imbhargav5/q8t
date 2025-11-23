-- Short Links and UTM Tracking
-- This migration adds URL shortening, UTM parameters, and link analytics

-- ============================================================================
-- SHORT LINKS TABLE
-- ============================================================================

CREATE TABLE short_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- URLs
  original_url TEXT NOT NULL,
  short_code TEXT NOT NULL,
  short_url TEXT NOT NULL,

  -- UTM Parameters
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,

  -- Metadata
  title TEXT,
  description TEXT,
  tags TEXT[] DEFAULT '{}',

  -- QR Code
  qr_code_url TEXT,

  -- Analytics
  clicks INTEGER DEFAULT 0 NOT NULL,
  unique_clicks INTEGER DEFAULT 0 NOT NULL,
  last_clicked_at TIMESTAMPTZ,

  -- Settings
  is_active BOOLEAN DEFAULT true NOT NULL,
  expires_at TIMESTAMPTZ,
  password TEXT, -- Encrypted password for protected links

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, short_code),
  CHECK (LENGTH(original_url) > 0),
  CHECK (LENGTH(short_code) > 0)
);

-- ============================================================================
-- LINK CLICKS TABLE
-- ============================================================================

CREATE TABLE link_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  link_id UUID NOT NULL REFERENCES short_links(id) ON DELETE CASCADE,

  -- Click details
  clicked_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Location
  country TEXT,
  city TEXT,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),

  -- Device
  device_type TEXT, -- mobile, desktop, tablet
  browser TEXT,
  os TEXT,
  screen_resolution TEXT,

  -- Referrer
  referrer TEXT,
  ip_address INET,
  user_agent TEXT,

  -- User identification (for unique click tracking)
  user_fingerprint TEXT, -- Hash of IP + User Agent

  CHECK (device_type IN ('mobile', 'desktop', 'tablet', 'bot', 'other') OR device_type IS NULL)
);

-- ============================================================================
-- LINK ANALYTICS SUMMARY TABLE
-- ============================================================================
-- Aggregated analytics for performance

CREATE TABLE link_analytics_summary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  link_id UUID NOT NULL REFERENCES short_links(id) ON DELETE CASCADE,

  -- Time period
  date DATE NOT NULL,
  hour INTEGER CHECK (hour >= 0 AND hour <= 23),

  -- Metrics
  clicks INTEGER DEFAULT 0 NOT NULL,
  unique_clicks INTEGER DEFAULT 0 NOT NULL,

  -- Geographic breakdown
  top_countries JSONB DEFAULT '{}',
  top_cities JSONB DEFAULT '{}',

  -- Device breakdown
  device_breakdown JSONB DEFAULT '{}',
  /*
    {
      "mobile": 45,
      "desktop": 35,
      "tablet": 20
    }
  */

  -- Referrer breakdown
  top_referrers JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(link_id, date, hour)
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_short_links_updated_at
  BEFORE UPDATE ON short_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_link_analytics_summary_updated_at
  BEFORE UPDATE ON link_analytics_summary
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update link click count
CREATE OR REPLACE FUNCTION update_link_click_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE short_links
  SET
    clicks = clicks + 1,
    last_clicked_at = NOW()
  WHERE id = NEW.link_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_link_click_count_trigger
  AFTER INSERT ON link_clicks
  FOR EACH ROW EXECUTE FUNCTION update_link_click_count();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to get link analytics
CREATE OR REPLACE FUNCTION get_link_analytics(
  p_link_id UUID,
  p_days INTEGER DEFAULT 30
)
RETURNS TABLE (
  total_clicks BIGINT,
  total_unique_clicks BIGINT,
  avg_clicks_per_day NUMERIC,
  top_country TEXT,
  top_device TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_clicks,
    COUNT(DISTINCT user_fingerprint)::BIGINT as total_unique_clicks,
    (COUNT(*)::NUMERIC / p_days) as avg_clicks_per_day,
    MODE() WITHIN GROUP (ORDER BY country) as top_country,
    MODE() WITHIN GROUP (ORDER BY device_type) as top_device
  FROM link_clicks
  WHERE link_id = p_link_id
  AND clicked_at >= NOW() - (p_days || ' days')::INTERVAL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate unique short code
CREATE OR REPLACE FUNCTION generate_short_code(p_length INTEGER DEFAULT 6)
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..p_length LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE short_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_analytics_summary ENABLE ROW LEVEL SECURITY;

-- Members can manage workspace links
CREATE POLICY "Members can manage workspace links"
  ON short_links
  FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()))
  WITH CHECK (
    is_workspace_member(workspace_id, auth.uid()) AND
    user_id = auth.uid()
  );

-- Anyone can click links (insert clicks)
CREATE POLICY "Anyone can click links"
  ON link_clicks
  FOR INSERT
  WITH CHECK (true);

-- Members can view click analytics
CREATE POLICY "Members can view click analytics"
  ON link_clicks
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM short_links sl
      WHERE sl.id = link_clicks.link_id
      AND is_workspace_member(sl.workspace_id, auth.uid())
    )
  );

-- Members can view analytics summary
CREATE POLICY "Members can view analytics summary"
  ON link_analytics_summary
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM short_links sl
      WHERE sl.id = link_analytics_summary.link_id
      AND is_workspace_member(sl.workspace_id, auth.uid())
    )
  );

-- System can manage analytics summary
CREATE POLICY "System can manage analytics summary"
  ON link_analytics_summary
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Short links indexes
CREATE INDEX idx_short_links_workspace_id ON short_links(workspace_id);
CREATE INDEX idx_short_links_user_id ON short_links(user_id);
CREATE INDEX idx_short_links_short_code ON short_links(short_code);
CREATE INDEX idx_short_links_active ON short_links(is_active) WHERE is_active = true;
CREATE INDEX idx_short_links_expires ON short_links(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX idx_short_links_clicks ON short_links(clicks DESC);

-- UTM parameter indexes
CREATE INDEX idx_short_links_utm_campaign ON short_links(utm_campaign) WHERE utm_campaign IS NOT NULL;
CREATE INDEX idx_short_links_utm_source ON short_links(utm_source) WHERE utm_source IS NOT NULL;

-- GIN index for tags
CREATE INDEX idx_short_links_tags ON short_links USING GIN (tags);

-- Link clicks indexes
CREATE INDEX idx_link_clicks_link_id ON link_clicks(link_id);
CREATE INDEX idx_link_clicks_clicked_at ON link_clicks(clicked_at DESC);
CREATE INDEX idx_link_clicks_country ON link_clicks(country) WHERE country IS NOT NULL;
CREATE INDEX idx_link_clicks_device_type ON link_clicks(device_type) WHERE device_type IS NOT NULL;
CREATE INDEX idx_link_clicks_user_fingerprint ON link_clicks(user_fingerprint);

-- Composite index for analytics
CREATE INDEX idx_link_clicks_link_date ON link_clicks(link_id, clicked_at DESC);

-- Link analytics summary indexes
CREATE INDEX idx_link_analytics_summary_link_id ON link_analytics_summary(link_id);
CREATE INDEX idx_link_analytics_summary_date ON link_analytics_summary(date DESC);

-- GIN indexes for JSONB columns
CREATE INDEX idx_link_analytics_summary_countries ON link_analytics_summary USING GIN (top_countries);
CREATE INDEX idx_link_analytics_summary_devices ON link_analytics_summary USING GIN (device_breakdown);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE short_links IS 'Short URLs with UTM tracking and analytics';
COMMENT ON TABLE link_clicks IS 'Individual click events for short links';
COMMENT ON TABLE link_analytics_summary IS 'Aggregated analytics for link performance';

COMMENT ON COLUMN short_links.short_code IS 'Unique code for the short URL';
COMMENT ON COLUMN short_links.password IS 'Optional password protection for link';
COMMENT ON COLUMN link_clicks.user_fingerprint IS 'Hash for unique visitor tracking';
