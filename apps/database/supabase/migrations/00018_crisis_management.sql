-- Crisis Management and Sentiment Analysis
-- This migration adds crisis detection, incident management, status page, and sentiment tracking

-- Create enum types for crisis management
CREATE TYPE crisis_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE crisis_status AS ENUM ('detected', 'acknowledged', 'investigating', 'resolving', 'resolved');
CREATE TYPE crisis_detection_type AS ENUM ('sentiment_spike', 'keyword_match', 'volume_spike', 'manual');
CREATE TYPE component_status AS ENUM ('operational', 'degraded', 'partial_outage', 'major_outage', 'maintenance');
CREATE TYPE sentiment_type AS ENUM ('positive', 'neutral', 'negative');

-- ============================================================================
-- MESSAGE SENTIMENT TABLE
-- ============================================================================

CREATE TABLE message_sentiment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Sentiment scores
  sentiment sentiment_type NOT NULL,
  score DECIMAL(4,3) NOT NULL, -- -1.000 to 1.000
  confidence DECIMAL(4,3), -- 0.000 to 1.000

  -- Detailed analysis (optional)
  emotions JSONB, -- { "anger": 0.8, "fear": 0.2, "joy": 0.1 }
  keywords TEXT[],
  categories TEXT[], -- e.g., ["complaint", "question", "feedback"]

  -- Analysis metadata
  analyzer TEXT NOT NULL, -- "openai", "huggingface", "aws_comprehend", etc.
  model_version TEXT, -- Model version used for analysis
  analyzed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(message_id)
);

-- ============================================================================
-- CRISIS DETECTION RULES TABLE
-- ============================================================================

CREATE TABLE crisis_detection_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL,

  -- Detection configuration
  detection_type crisis_detection_type NOT NULL,
  threshold_config JSONB NOT NULL,
  /*
    Examples:
    {
      "sentiment_spike": {
        "negative_count": 20,
        "time_window_minutes": 60,
        "platforms": ["twitter", "facebook", "instagram"]
      },
      "keyword_match": {
        "keywords": ["data breach", "hack", "lawsuit", "scam"],
        "case_sensitive": false,
        "severity": "critical"
      },
      "volume_spike": {
        "threshold_multiplier": 3.0, // 3x normal volume
        "time_window_minutes": 30,
        "baseline_period_hours": 24
      }
    }
  */

  -- Filter conditions
  filter_platforms social_platform[], -- Only monitor these platforms
  filter_sentiment sentiment_type[], -- Only trigger on specific sentiment

  -- Actions when rule triggers
  auto_create_incident BOOLEAN DEFAULT true NOT NULL,
  notify_users UUID[], -- User IDs to notify
  notification_channels TEXT[], -- ["slack", "email", "sms", "push"]

  -- Priority (higher = checked first)
  priority INTEGER DEFAULT 0 NOT NULL,

  -- Execution tracking
  last_triggered_at TIMESTAMPTZ,
  trigger_count INTEGER DEFAULT 0 NOT NULL,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- CRISIS INCIDENTS TABLE
-- ============================================================================

CREATE TABLE crisis_incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Incident details
  title TEXT NOT NULL,
  description TEXT,
  severity crisis_severity NOT NULL,
  status crisis_status NOT NULL DEFAULT 'detected',

  -- Detection information
  detection_type crisis_detection_type NOT NULL,
  detection_rule_id UUID REFERENCES crisis_detection_rules(id) ON DELETE SET NULL,
  detection_config JSONB, -- Configuration snapshot at detection time

  -- Affected platforms
  platforms social_platform[] NOT NULL,

  -- Sentiment data (if detected via sentiment analysis)
  negative_message_count INTEGER DEFAULT 0,
  total_message_count INTEGER DEFAULT 0,
  average_sentiment_score DECIMAL(4,3), -- -1.000 to 1.000

  -- Timeline
  detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID REFERENCES users(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Resolution
  resolution_notes TEXT,
  resolution_actions JSONB DEFAULT '[]', -- Array of actions taken
  /*
    [
      { "timestamp": "2025-11-22T10:00:00Z", "action": "Posted statement on Twitter", "user_id": "uuid" },
      { "timestamp": "2025-11-22T10:30:00Z", "action": "Updated status page", "user_id": "uuid" }
    ]
  */

  -- Related data
  related_conversation_ids UUID[] DEFAULT '{}',
  related_message_ids UUID[] DEFAULT '{}',

  -- Status updates timeline
  status_updates JSONB DEFAULT '[]',
  /*
    [
      { "timestamp": "2025-11-22T10:00:00Z", "from": "detected", "to": "acknowledged", "user_id": "uuid" },
      { "timestamp": "2025-11-22T12:00:00Z", "from": "acknowledged", "to": "investigating", "user_id": "uuid" }
    ]
  */

  -- Impact assessment
  estimated_reach INTEGER, -- Estimated number of people affected/exposed
  impact_notes TEXT,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- STATUS COMPONENTS TABLE
-- ============================================================================

CREATE TABLE status_components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  component_type TEXT NOT NULL, -- e.g., "publishing", "inbox", "analytics", "listening"

  -- Current status
  status component_status DEFAULT 'operational' NOT NULL,

  -- Display settings
  display_order INTEGER DEFAULT 0 NOT NULL,
  is_visible BOOLEAN DEFAULT true NOT NULL,

  -- Status metadata
  last_status_change TIMESTAMPTZ,
  last_incident_at TIMESTAMPTZ,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, name)
);

-- ============================================================================
-- STATUS PAGE UPDATES TABLE
-- ============================================================================

CREATE TABLE status_page_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  component_id UUID REFERENCES status_components(id) ON DELETE SET NULL,
  incident_id UUID REFERENCES crisis_incidents(id) ON DELETE SET NULL,

  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status component_status NOT NULL,

  -- Display settings
  is_pinned BOOLEAN DEFAULT false NOT NULL,

  -- Visibility
  is_public BOOLEAN DEFAULT false NOT NULL, -- Public status page vs internal only

  posted_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  posted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- SENTIMENT ANALYSIS CONFIG TABLE
-- ============================================================================

CREATE TABLE sentiment_analysis_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Provider configuration
  provider TEXT NOT NULL DEFAULT 'openai', -- "openai", "huggingface", "aws_comprehend", "custom"
  provider_config JSONB DEFAULT '{}',
  /*
    {
      "openai": {
        "model": "gpt-4o-mini",
        "api_key_ref": "vault_key_id"
      },
      "huggingface": {
        "model": "cardiffnlp/twitter-roberta-base-sentiment",
        "api_key_ref": "vault_key_id"
      }
    }
  */

  -- Analysis settings
  auto_analyze BOOLEAN DEFAULT true NOT NULL, -- Auto-analyze all new messages
  analyze_platforms social_platform[], -- Only analyze these platforms (null = all)
  analyze_message_types inbox_message_type[], -- Only analyze these types

  -- Rate limiting / cost control
  max_requests_per_day INTEGER, -- null = unlimited
  current_usage_count INTEGER DEFAULT 0,
  usage_reset_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Fallback settings
  fallback_provider TEXT, -- Fallback if primary fails
  fallback_config JSONB,

  is_active BOOLEAN DEFAULT true NOT NULL,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id)
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_crisis_detection_rules_updated_at BEFORE UPDATE ON crisis_detection_rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crisis_incidents_updated_at BEFORE UPDATE ON crisis_incidents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_status_components_updated_at BEFORE UPDATE ON status_components
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sentiment_analysis_config_updated_at BEFORE UPDATE ON sentiment_analysis_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update component status and track changes
CREATE OR REPLACE FUNCTION update_component_status(
  component_uuid UUID,
  new_status component_status
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE status_components
  SET
    status = new_status,
    last_status_change = NOW(),
    updated_at = NOW()
  WHERE id = component_uuid;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function to add status update to incident timeline
CREATE OR REPLACE FUNCTION add_incident_status_update(
  incident_uuid UUID,
  new_status crisis_status,
  user_uuid UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  current_status crisis_status;
  updates JSONB;
BEGIN
  -- Get current status
  SELECT status INTO current_status FROM crisis_incidents WHERE id = incident_uuid;

  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  -- Get current status_updates
  SELECT status_updates INTO updates FROM crisis_incidents WHERE id = incident_uuid;

  -- Append new update
  updates := updates || jsonb_build_object(
    'timestamp', NOW(),
    'from', current_status,
    'to', new_status,
    'user_id', user_uuid
  );

  -- Update incident
  UPDATE crisis_incidents
  SET
    status = new_status,
    status_updates = updates,
    updated_at = NOW(),
    acknowledged_at = CASE WHEN new_status = 'acknowledged' THEN NOW() ELSE acknowledged_at END,
    acknowledged_by = CASE WHEN new_status = 'acknowledged' THEN user_uuid ELSE acknowledged_by END,
    resolved_at = CASE WHEN new_status = 'resolved' THEN NOW() ELSE resolved_at END,
    resolved_by = CASE WHEN new_status = 'resolved' THEN user_uuid ELSE resolved_by END
  WHERE id = incident_uuid;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate sentiment trend for crisis detection
CREATE OR REPLACE FUNCTION calculate_sentiment_trend(
  ws_id UUID,
  time_window_minutes INTEGER DEFAULT 60,
  target_platforms social_platform[] DEFAULT NULL
)
RETURNS TABLE(
  negative_count BIGINT,
  neutral_count BIGINT,
  positive_count BIGINT,
  total_count BIGINT,
  avg_score DECIMAL,
  platforms social_platform[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*) FILTER (WHERE ms.sentiment = 'negative') AS negative_count,
    COUNT(*) FILTER (WHERE ms.sentiment = 'neutral') AS neutral_count,
    COUNT(*) FILTER (WHERE ms.sentiment = 'positive') AS positive_count,
    COUNT(*) AS total_count,
    AVG(ms.score) AS avg_score,
    ARRAY_AGG(DISTINCT sim.platform) AS platforms
  FROM message_sentiment ms
  JOIN social_inbox_messages sim ON ms.message_id = sim.id
  WHERE
    ms.workspace_id = ws_id
    AND ms.analyzed_at >= NOW() - (time_window_minutes || ' minutes')::INTERVAL
    AND (target_platforms IS NULL OR sim.platform = ANY(target_platforms));
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE message_sentiment ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_detection_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_page_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE sentiment_analysis_config ENABLE ROW LEVEL SECURITY;

-- Message sentiment policies
CREATE POLICY "Workspace members can view message sentiment"
  ON message_sentiment FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "System can insert message sentiment"
  ON message_sentiment FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

-- Crisis detection rules policies
CREATE POLICY "Workspace members can view crisis rules"
  ON crisis_detection_rules FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can manage crisis rules"
  ON crisis_detection_rules FOR ALL
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Crisis incidents policies
CREATE POLICY "Workspace members can view crisis incidents"
  ON crisis_incidents FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can create crisis incidents"
  ON crisis_incidents FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can update crisis incidents"
  ON crisis_incidents FOR UPDATE
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Status components policies
CREATE POLICY "Workspace members can view status components"
  ON status_components FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can manage status components"
  ON status_components FOR ALL
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Status page updates policies (allow public read if is_public = true)
CREATE POLICY "Anyone can view public status updates"
  ON status_page_updates FOR SELECT
  USING (is_public = true);

CREATE POLICY "Workspace members can view all status updates"
  ON status_page_updates FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can create status updates"
  ON status_page_updates FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

-- Sentiment analysis config policies
CREATE POLICY "Workspace members can view sentiment config"
  ON sentiment_analysis_config FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can manage sentiment config"
  ON sentiment_analysis_config FOR ALL
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Message sentiment indexes
CREATE INDEX idx_message_sentiment_workspace ON message_sentiment(workspace_id);
CREATE INDEX idx_message_sentiment_message ON message_sentiment(message_id);
CREATE INDEX idx_message_sentiment_sentiment ON message_sentiment(workspace_id, sentiment);
CREATE INDEX idx_message_sentiment_analyzed_at ON message_sentiment(workspace_id, analyzed_at DESC);
CREATE INDEX idx_message_sentiment_score ON message_sentiment(workspace_id, score);

-- Crisis detection rules indexes
CREATE INDEX idx_crisis_rules_workspace ON crisis_detection_rules(workspace_id);
CREATE INDEX idx_crisis_rules_active ON crisis_detection_rules(workspace_id, is_active) WHERE is_active = true;
CREATE INDEX idx_crisis_rules_detection_type ON crisis_detection_rules(detection_type);
CREATE INDEX idx_crisis_rules_priority ON crisis_detection_rules(workspace_id, priority DESC);

-- Crisis incidents indexes
CREATE INDEX idx_crisis_incidents_workspace ON crisis_incidents(workspace_id);
CREATE INDEX idx_crisis_incidents_status ON crisis_incidents(workspace_id, status);
CREATE INDEX idx_crisis_incidents_severity ON crisis_incidents(workspace_id, severity);
CREATE INDEX idx_crisis_incidents_detected_at ON crisis_incidents(workspace_id, detected_at DESC);
CREATE INDEX idx_crisis_incidents_platforms ON crisis_incidents USING GIN(platforms);

-- Status components indexes
CREATE INDEX idx_status_components_workspace ON status_components(workspace_id);
CREATE INDEX idx_status_components_status ON status_components(workspace_id, status);
CREATE INDEX idx_status_components_display_order ON status_components(workspace_id, display_order);
CREATE INDEX idx_status_components_visible ON status_components(workspace_id, is_visible) WHERE is_visible = true;

-- Status page updates indexes
CREATE INDEX idx_status_updates_workspace ON status_page_updates(workspace_id);
CREATE INDEX idx_status_updates_component ON status_page_updates(component_id);
CREATE INDEX idx_status_updates_incident ON status_page_updates(incident_id);
CREATE INDEX idx_status_updates_posted_at ON status_page_updates(workspace_id, posted_at DESC);
CREATE INDEX idx_status_updates_public ON status_page_updates(is_public, posted_at DESC) WHERE is_public = true;

-- Sentiment config indexes
CREATE INDEX idx_sentiment_config_workspace ON sentiment_analysis_config(workspace_id);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE message_sentiment IS 'Sentiment analysis results for inbox messages';
COMMENT ON TABLE crisis_detection_rules IS 'Automated crisis detection rules';
COMMENT ON TABLE crisis_incidents IS 'Crisis incidents detected or manually created';
COMMENT ON TABLE status_components IS 'System components for status page';
COMMENT ON TABLE status_page_updates IS 'Status page updates and incident communications';
COMMENT ON TABLE sentiment_analysis_config IS 'Sentiment analysis provider configuration';

COMMENT ON FUNCTION update_component_status IS 'Update status component status and track change time';
COMMENT ON FUNCTION add_incident_status_update IS 'Add status change to incident timeline';
COMMENT ON FUNCTION calculate_sentiment_trend IS 'Calculate sentiment metrics for crisis detection';
