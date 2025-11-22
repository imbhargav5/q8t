-- Analytics Automation
-- This migration adds scheduled reports, performance alerts, ROI tracking, and analytics automation

-- Create enum types for analytics automation
CREATE TYPE report_type AS ENUM (
  'performance',
  'engagement',
  'growth',
  'competitor',
  'roi',
  'sentiment',
  'content',
  'custom'
);

CREATE TYPE report_format AS ENUM ('pdf', 'csv', 'excel', 'html', 'json');
CREATE TYPE report_delivery AS ENUM ('email', 'slack', 'webhook', 'download');
CREATE TYPE execution_status AS ENUM ('pending', 'running', 'completed', 'failed', 'cancelled');
CREATE TYPE metric_comparison AS ENUM ('above', 'below', 'equals', 'increases_by', 'decreases_by', 'changes_by');

-- ============================================================================
-- SCHEDULED REPORTS TABLE
-- ============================================================================

CREATE TABLE scheduled_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  -- Report type and configuration
  report_type report_type NOT NULL,
  report_config JSONB NOT NULL,
  /*
    {
      "metrics": ["engagement_rate", "follower_growth", "reach", "impressions"],
      "platforms": ["twitter", "instagram", "facebook"],
      "accounts": ["account-id-1", "account-id-2"],
      "date_range": "last_7_days", // or "last_30_days", "last_month", "custom"
      "custom_date_range": { "start": "2025-01-01", "end": "2025-01-31" },
      "group_by": "platform", // or "account", "day", "week"
      "include_charts": true,
      "include_comparisons": true,
      "compare_to": "previous_period"
    }
  */

  -- Schedule
  schedule_cron TEXT NOT NULL, -- Cron expression (e.g., "0 9 * * 1" for Monday 9am)
  timezone TEXT DEFAULT 'UTC' NOT NULL,

  -- Delivery configuration
  recipients TEXT[] NOT NULL, -- Email addresses
  cc_recipients TEXT[] DEFAULT '{}',
  bcc_recipients TEXT[] DEFAULT '{}',

  -- Format and delivery
  format report_format DEFAULT 'pdf' NOT NULL,
  delivery_method report_delivery DEFAULT 'email' NOT NULL,

  -- Delivery options
  delivery_config JSONB DEFAULT '{}',
  /*
    {
      "email": {
        "subject_template": "Weekly Performance Report - {date_range}",
        "body_template": "Here's your weekly performance report...",
        "attach_raw_data": true
      },
      "slack": {
        "webhook_url": "https://hooks.slack.com/...",
        "channel": "#reports",
        "message_template": "New report available: {report_name}"
      },
      "webhook": {
        "url": "https://api.example.com/reports",
        "method": "POST",
        "headers": { "Authorization": "Bearer token" }
      }
    }
  */

  -- Execution tracking
  is_active BOOLEAN DEFAULT true NOT NULL,
  last_sent_at TIMESTAMPTZ,
  next_send_at TIMESTAMPTZ,
  last_execution_status execution_status,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- REPORT EXECUTIONS TABLE
-- ============================================================================

CREATE TABLE report_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL REFERENCES scheduled_reports(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  status execution_status DEFAULT 'pending' NOT NULL,

  -- Execution details
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  duration_seconds INTEGER,

  -- Error handling
  error_message TEXT,
  error_details JSONB,

  -- Output
  file_url TEXT, -- Storage URL for generated report
  file_size INTEGER, -- bytes
  file_name TEXT,

  -- Data snapshot
  data_snapshot JSONB, -- Summary of data included
  /*
    {
      "date_range": { "start": "2025-01-01", "end": "2025-01-07" },
      "platforms": ["twitter", "instagram"],
      "total_posts": 42,
      "total_engagement": 15234,
      "key_metrics": { "avg_engagement_rate": 3.45, "follower_growth": 234 }
    }
  */

  -- Delivery status
  delivered_to TEXT[] DEFAULT '{}',
  delivery_status JSONB DEFAULT '{}',
  /*
    {
      "email": { "sent": true, "recipients": 3, "timestamp": "2025-11-22T09:00:00Z" },
      "slack": { "sent": true, "channel": "#reports", "timestamp": "2025-11-22T09:01:00Z" }
    }
  */

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- PERFORMANCE ALERTS TABLE
-- ============================================================================

CREATE TABLE performance_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  -- Alert metric
  metric TEXT NOT NULL, -- e.g., "engagement_rate", "follower_count", "reach"

  -- Threshold configuration
  threshold_config JSONB NOT NULL,
  /*
    {
      "condition": "below", // or "above", "equals", "increases_by", "decreases_by"
      "value": 2.5,
      "comparison_period": "previous_day", // or "previous_week", "same_day_last_week"
      "platforms": ["twitter", "instagram"],
      "accounts": ["account-id"],
      "consecutive_occurrences": 2 // Alert only if threshold met N times in a row
    }
  */

  -- Evaluation frequency
  check_interval_minutes INTEGER DEFAULT 60 NOT NULL,
  last_checked_at TIMESTAMPTZ,

  -- Notification configuration
  notify_users UUID[] NOT NULL,
  notification_channels TEXT[] DEFAULT '{"email"}',

  notification_config JSONB DEFAULT '{}',
  /*
    {
      "email": {
        "subject": "Alert: {metric} is {condition} {value}",
        "include_chart": true
      },
      "slack": {
        "webhook_url": "https://hooks.slack.com/...",
        "mention_users": true
      },
      "sms": {
        "provider": "twilio",
        "phone_numbers": ["+1234567890"]
      }
    }
  */

  -- Execution tracking
  is_active BOOLEAN DEFAULT true NOT NULL,
  last_triggered_at TIMESTAMPTZ,
  trigger_count INTEGER DEFAULT 0,

  -- Cooldown (don't re-alert for X minutes)
  cooldown_minutes INTEGER DEFAULT 60,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- ALERT TRIGGERS TABLE (History)
-- ============================================================================

CREATE TABLE alert_triggers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alert_id UUID NOT NULL REFERENCES performance_alerts(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Trigger details
  metric_value DECIMAL(12,4),
  threshold_value DECIMAL(12,4),
  comparison_value DECIMAL(12,4), -- Value from comparison period

  -- Context
  platforms social_platform[] DEFAULT '{}',
  accounts_affected UUID[] DEFAULT '{}',

  -- Notification
  notified_users UUID[] DEFAULT '{}',
  notification_channels TEXT[] DEFAULT '{}',
  notification_sent_at TIMESTAMPTZ,

  -- Status
  is_acknowledged BOOLEAN DEFAULT false,
  acknowledged_by UUID REFERENCES users(id) ON DELETE SET NULL,
  acknowledged_at TIMESTAMPTZ,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  triggered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- UTM CAMPAIGNS TABLE
-- ============================================================================

CREATE TABLE utm_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  -- UTM parameters
  utm_source TEXT NOT NULL,
  utm_medium TEXT NOT NULL,
  utm_campaign TEXT NOT NULL,
  utm_term TEXT,
  utm_content TEXT,

  -- Auto-generation settings
  auto_apply BOOLEAN DEFAULT false NOT NULL,
  apply_to_platforms social_platform[] DEFAULT '{}',
  apply_to_post_types TEXT[] DEFAULT '{}', -- e.g., ["blog_promotion", "product_launch"]

  -- URL shortening
  use_url_shortener BOOLEAN DEFAULT false,
  short_domain TEXT, -- e.g., "bit.ly", "tinyurl.com"

  -- Tracking (would be populated by analytics service)
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  revenue DECIMAL(12,2) DEFAULT 0,

  -- Date range
  start_date DATE,
  end_date DATE,

  is_active BOOLEAN DEFAULT true NOT NULL,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- ANALYTICS SNAPSHOTS TABLE
-- ============================================================================
-- Periodic snapshots of key metrics for trending and historical analysis

CREATE TABLE analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  social_account_id UUID REFERENCES social_accounts(id) ON DELETE CASCADE,

  -- Snapshot metadata
  snapshot_type TEXT NOT NULL, -- "daily", "weekly", "monthly"
  platform social_platform,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,

  -- Follower metrics
  follower_count INTEGER,
  follower_growth INTEGER,
  follower_growth_rate DECIMAL(5,4),

  -- Post metrics
  posts_count INTEGER DEFAULT 0,
  total_likes INTEGER DEFAULT 0,
  total_comments INTEGER DEFAULT 0,
  total_shares INTEGER DEFAULT 0,
  total_engagement INTEGER DEFAULT 0,

  -- Calculated metrics
  avg_engagement_rate DECIMAL(5,4),
  avg_reach INTEGER,
  avg_impressions INTEGER,

  -- Top performing post
  top_post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
  top_post_engagement INTEGER,

  -- Sentiment (if analyzed)
  avg_sentiment_score DECIMAL(4,3),
  positive_mentions_count INTEGER DEFAULT 0,
  negative_mentions_count INTEGER DEFAULT 0,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, social_account_id, snapshot_type, period_start)
);

-- ============================================================================
-- CUSTOM DASHBOARDS TABLE
-- ============================================================================

CREATE TABLE custom_dashboards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  -- Layout configuration
  layout JSONB NOT NULL,
  /*
    {
      "widgets": [
        {
          "id": "widget-1",
          "type": "line_chart",
          "title": "Engagement Trend",
          "position": { "x": 0, "y": 0, "width": 6, "height": 4 },
          "config": {
            "metric": "engagement_rate",
            "platforms": ["twitter", "instagram"],
            "date_range": "last_30_days"
          }
        },
        {
          "id": "widget-2",
          "type": "metric_card",
          "title": "Total Followers",
          "position": { "x": 6, "y": 0, "width": 3, "height": 2 },
          "config": {
            "metric": "follower_count",
            "show_change": true,
            "compare_to": "previous_period"
          }
        }
      ]
    }
  */

  -- Sharing
  is_shared BOOLEAN DEFAULT false NOT NULL,
  is_default BOOLEAN DEFAULT false NOT NULL,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_scheduled_reports_updated_at BEFORE UPDATE ON scheduled_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_performance_alerts_updated_at BEFORE UPDATE ON performance_alerts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_utm_campaigns_updated_at BEFORE UPDATE ON utm_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_custom_dashboards_updated_at BEFORE UPDATE ON custom_dashboards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to calculate next report run time
CREATE OR REPLACE FUNCTION calculate_next_report_time(
  cron_expression TEXT,
  tz TEXT DEFAULT 'UTC'
)
RETURNS TIMESTAMPTZ AS $$
BEGIN
  -- Simplified implementation - actual implementation would parse cron expression
  -- For now, return next hour
  RETURN (NOW() + INTERVAL '1 hour') AT TIME ZONE tz;
END;
$$ LANGUAGE plpgsql;

-- Function to check if metric threshold is met
CREATE OR REPLACE FUNCTION check_metric_threshold(
  metric_name TEXT,
  metric_value DECIMAL,
  condition metric_comparison,
  threshold_value DECIMAL,
  comparison_value DECIMAL DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN CASE condition
    WHEN 'above' THEN metric_value > threshold_value
    WHEN 'below' THEN metric_value < threshold_value
    WHEN 'equals' THEN metric_value = threshold_value
    WHEN 'increases_by' THEN comparison_value IS NOT NULL AND
                             (metric_value - comparison_value) >= threshold_value
    WHEN 'decreases_by' THEN comparison_value IS NOT NULL AND
                             (comparison_value - metric_value) >= threshold_value
    WHEN 'changes_by' THEN comparison_value IS NOT NULL AND
                           ABS(metric_value - comparison_value) >= threshold_value
    ELSE FALSE
  END;
END;
$$ LANGUAGE plpgsql;

-- Function to generate UTM URL
CREATE OR REPLACE FUNCTION generate_utm_url(
  base_url TEXT,
  source TEXT,
  medium TEXT,
  campaign TEXT,
  term TEXT DEFAULT NULL,
  content TEXT DEFAULT NULL
)
RETURNS TEXT AS $$
DECLARE
  utm_params TEXT := '';
BEGIN
  utm_params := 'utm_source=' || source || '&utm_medium=' || medium || '&utm_campaign=' || campaign;

  IF term IS NOT NULL THEN
    utm_params := utm_params || '&utm_term=' || term;
  END IF;

  IF content IS NOT NULL THEN
    utm_params := utm_params || '&utm_content=' || content;
  END IF;

  IF base_url LIKE '%?%' THEN
    RETURN base_url || '&' || utm_params;
  ELSE
    RETURN base_url || '?' || utm_params;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE scheduled_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE alert_triggers ENABLE ROW LEVEL SECURITY;
ALTER TABLE utm_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_dashboards ENABLE ROW LEVEL SECURITY;

-- Scheduled reports policies
CREATE POLICY "Workspace members can view scheduled reports"
  ON scheduled_reports FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can manage scheduled reports"
  ON scheduled_reports FOR ALL
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Report executions policies
CREATE POLICY "Workspace members can view report executions"
  ON report_executions FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Performance alerts policies
CREATE POLICY "Workspace members can view performance alerts"
  ON performance_alerts FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage performance alerts"
  ON performance_alerts FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Alert triggers policies
CREATE POLICY "Workspace members can view alert triggers"
  ON alert_triggers FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- UTM campaigns policies
CREATE POLICY "Workspace members can view UTM campaigns"
  ON utm_campaigns FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage UTM campaigns"
  ON utm_campaigns FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Analytics snapshots policies
CREATE POLICY "Workspace members can view analytics snapshots"
  ON analytics_snapshots FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "System can manage analytics snapshots"
  ON analytics_snapshots FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Custom dashboards policies
CREATE POLICY "Users can view their own and shared dashboards"
  ON custom_dashboards FOR SELECT
  USING (
    is_workspace_member(workspace_id, auth.uid()) AND
    (created_by = auth.uid() OR is_shared = true)
  );

CREATE POLICY "Users can manage their own dashboards"
  ON custom_dashboards FOR ALL
  USING (created_by = auth.uid());

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Scheduled reports indexes
CREATE INDEX idx_scheduled_reports_workspace ON scheduled_reports(workspace_id);
CREATE INDEX idx_scheduled_reports_active ON scheduled_reports(workspace_id, is_active) WHERE is_active = true;
CREATE INDEX idx_scheduled_reports_next_send ON scheduled_reports(next_send_at) WHERE is_active = true;
CREATE INDEX idx_scheduled_reports_type ON scheduled_reports(workspace_id, report_type);

-- Report executions indexes
CREATE INDEX idx_report_executions_report ON report_executions(report_id);
CREATE INDEX idx_report_executions_workspace ON report_executions(workspace_id);
CREATE INDEX idx_report_executions_status ON report_executions(status);
CREATE INDEX idx_report_executions_created ON report_executions(workspace_id, created_at DESC);

-- Performance alerts indexes
CREATE INDEX idx_performance_alerts_workspace ON performance_alerts(workspace_id);
CREATE INDEX idx_performance_alerts_active ON performance_alerts(workspace_id, is_active) WHERE is_active = true;
CREATE INDEX idx_performance_alerts_next_check ON performance_alerts(last_checked_at) WHERE is_active = true;
CREATE INDEX idx_performance_alerts_metric ON performance_alerts(workspace_id, metric);

-- Alert triggers indexes
CREATE INDEX idx_alert_triggers_alert ON alert_triggers(alert_id);
CREATE INDEX idx_alert_triggers_workspace ON alert_triggers(workspace_id);
CREATE INDEX idx_alert_triggers_triggered ON alert_triggers(workspace_id, triggered_at DESC);
CREATE INDEX idx_alert_triggers_unacknowledged ON alert_triggers(workspace_id, is_acknowledged) WHERE is_acknowledged = false;

-- UTM campaigns indexes
CREATE INDEX idx_utm_campaigns_workspace ON utm_campaigns(workspace_id);
CREATE INDEX idx_utm_campaigns_active ON utm_campaigns(workspace_id, is_active) WHERE is_active = true;
CREATE INDEX idx_utm_campaigns_dates ON utm_campaigns(workspace_id, start_date, end_date);

-- Analytics snapshots indexes
CREATE INDEX idx_analytics_snapshots_workspace ON analytics_snapshots(workspace_id);
CREATE INDEX idx_analytics_snapshots_account ON analytics_snapshots(social_account_id);
CREATE INDEX idx_analytics_snapshots_type_period ON analytics_snapshots(workspace_id, snapshot_type, period_start DESC);
CREATE INDEX idx_analytics_snapshots_platform ON analytics_snapshots(workspace_id, platform, period_start DESC);

-- Custom dashboards indexes
CREATE INDEX idx_custom_dashboards_workspace ON custom_dashboards(workspace_id);
CREATE INDEX idx_custom_dashboards_creator ON custom_dashboards(created_by);
CREATE INDEX idx_custom_dashboards_shared ON custom_dashboards(workspace_id, is_shared) WHERE is_shared = true;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE scheduled_reports IS 'Automated scheduled reports';
COMMENT ON TABLE report_executions IS 'History of report executions';
COMMENT ON TABLE performance_alerts IS 'Performance metric alerts';
COMMENT ON TABLE alert_triggers IS 'History of alert triggers';
COMMENT ON TABLE utm_campaigns IS 'UTM campaign tracking';
COMMENT ON TABLE analytics_snapshots IS 'Periodic snapshots of analytics metrics';
COMMENT ON TABLE custom_dashboards IS 'Custom analytics dashboards';

COMMENT ON FUNCTION calculate_next_report_time IS 'Calculate next report execution time from cron expression';
COMMENT ON FUNCTION check_metric_threshold IS 'Check if a metric meets the threshold condition';
COMMENT ON FUNCTION generate_utm_url IS 'Generate URL with UTM parameters';
