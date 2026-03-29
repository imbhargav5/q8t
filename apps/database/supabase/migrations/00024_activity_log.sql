-- Activity Log and Audit Trail
-- This migration adds comprehensive activity tracking for compliance and debugging

-- ============================================================================
-- ACTIVITY LOG TABLE
-- ============================================================================

CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Who performed the action
  user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- User who owns the session
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL, -- User who performed action (can be different for team actions)
  actor_name TEXT NOT NULL,
  actor_avatar TEXT,

  -- What action was performed
  action TEXT NOT NULL,
  action_category TEXT, -- 'post', 'user', 'system', 'api', 'security', 'settings', 'integration'

  -- What was affected
  entity_type TEXT,
  entity_id UUID,
  entity_name TEXT,

  -- Details
  details TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',

  -- Context
  ip_address INET,
  user_agent TEXT,
  device_type TEXT, -- 'desktop', 'mobile', 'tablet', 'api'
  browser TEXT,
  os TEXT,
  location TEXT, -- City, Country

  -- API-specific fields
  api_key_id UUID,
  api_endpoint TEXT,
  api_method TEXT, -- GET, POST, PUT, DELETE
  api_status_code INTEGER,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (LENGTH(action) > 0),
  CHECK (LENGTH(details) > 0)
);

-- ============================================================================
-- ACTIVITY LOG SETTINGS TABLE
-- ============================================================================

CREATE TABLE activity_log_settings (
  workspace_id UUID PRIMARY KEY REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Retention
  retention_days INTEGER DEFAULT 90 NOT NULL,
  auto_delete_enabled BOOLEAN DEFAULT true NOT NULL,

  -- What to log
  log_user_actions BOOLEAN DEFAULT true NOT NULL,
  log_system_events BOOLEAN DEFAULT true NOT NULL,
  log_api_calls BOOLEAN DEFAULT true NOT NULL,
  log_security_events BOOLEAN DEFAULT true NOT NULL,
  log_settings_changes BOOLEAN DEFAULT true NOT NULL,

  -- Export
  export_enabled BOOLEAN DEFAULT true NOT NULL,
  export_formats TEXT[] DEFAULT ARRAY['csv', 'json']::TEXT[],

  -- Alerts
  alert_on_suspicious_activity BOOLEAN DEFAULT true NOT NULL,
  alert_threshold_failed_logins INTEGER DEFAULT 5,

  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- SECURITY AUDIT LOG TABLE
-- ============================================================================
-- Separate table for critical security events (stricter retention, immutable)

CREATE TABLE security_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL, -- Allow null for user-level events
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Security event details
  event_type TEXT NOT NULL, -- 'login', 'logout', 'failed_login', 'password_change', '2fa_enabled', etc.
  severity TEXT NOT NULL, -- 'info', 'warning', 'critical'

  details TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',

  -- Context
  ip_address INET,
  user_agent TEXT,
  location TEXT,

  -- Risk assessment
  risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
  is_suspicious BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (LENGTH(event_type) > 0),
  CHECK (severity IN ('info', 'warning', 'critical'))
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_activity_log_settings_updated_at
  BEFORE UPDATE ON activity_log_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to log an activity
CREATE OR REPLACE FUNCTION log_activity(
  p_workspace_id UUID,
  p_user_id UUID,
  p_actor_id UUID,
  p_actor_name TEXT,
  p_action TEXT,
  p_details TEXT,
  p_entity_type TEXT DEFAULT NULL,
  p_entity_id UUID DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'::JSONB
)
RETURNS UUID AS $$
DECLARE
  v_activity_id UUID;
BEGIN
  INSERT INTO activity_log (
    workspace_id,
    user_id,
    actor_id,
    actor_name,
    action,
    entity_type,
    entity_id,
    details,
    metadata
  ) VALUES (
    p_workspace_id,
    p_user_id,
    p_actor_id,
    p_actor_name,
    p_action,
    p_entity_type,
    p_entity_id,
    p_details,
    p_metadata
  )
  RETURNING id INTO v_activity_id;

  RETURN v_activity_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get recent activity for a workspace
CREATE OR REPLACE FUNCTION get_recent_activity(
  p_workspace_id UUID,
  p_limit INTEGER DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  actor_name TEXT,
  action TEXT,
  details TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.id,
    a.actor_name,
    a.action,
    a.details,
    a.created_at
  FROM activity_log a
  WHERE a.workspace_id = p_workspace_id
  ORDER BY a.created_at DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to auto-delete old activity logs
CREATE OR REPLACE FUNCTION cleanup_old_activity_logs()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
  retention_days INTEGER;
BEGIN
  -- Get default retention or use 90 days
  SELECT COALESCE(
    (SELECT retention_days FROM activity_log_settings LIMIT 1),
    90
  ) INTO retention_days;

  DELETE FROM activity_log
  WHERE created_at < NOW() - (retention_days || ' days')::INTERVAL;

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_audit_log ENABLE ROW LEVEL SECURITY;

-- Workspace members can view activity log
CREATE POLICY "Members can view workspace activity"
  ON activity_log
  FOR SELECT
  USING (
    is_workspace_member(workspace_id, auth.uid())
  );

-- Only system can insert activity logs (controlled by application)
CREATE POLICY "System can insert activity logs"
  ON activity_log
  FOR INSERT
  WITH CHECK (true); -- Application layer will enforce this

-- Admins can manage activity log settings
CREATE POLICY "Admins can manage activity log settings"
  ON activity_log_settings
  FOR ALL
  USING (
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  )
  WITH CHECK (
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  );

-- Users can view their own security audit logs
CREATE POLICY "Users can view their security audit logs"
  ON security_audit_log
  FOR SELECT
  USING (
    user_id = auth.uid() OR
    (workspace_id IS NOT NULL AND is_workspace_member(workspace_id, auth.uid()))
  );

-- Only system can insert security audit logs
CREATE POLICY "System can insert security audit logs"
  ON security_audit_log
  FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Activity log indexes
CREATE INDEX idx_activity_log_workspace_id ON activity_log(workspace_id);
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_activity_log_actor_id ON activity_log(actor_id) WHERE actor_id IS NOT NULL;
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);
CREATE INDEX idx_activity_log_action ON activity_log(action);
CREATE INDEX idx_activity_log_action_category ON activity_log(action_category) WHERE action_category IS NOT NULL;
CREATE INDEX idx_activity_log_entity ON activity_log(entity_type, entity_id) WHERE entity_type IS NOT NULL;
CREATE INDEX idx_activity_log_workspace_date ON activity_log(workspace_id, created_at DESC);

-- Composite index for common queries
CREATE INDEX idx_activity_log_workspace_action_date
  ON activity_log(workspace_id, action, created_at DESC);

-- GIN index for metadata JSONB
CREATE INDEX idx_activity_log_metadata ON activity_log USING GIN (metadata);

-- Security audit log indexes
CREATE INDEX idx_security_audit_user_id ON security_audit_log(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_security_audit_workspace_id ON security_audit_log(workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX idx_security_audit_created_at ON security_audit_log(created_at DESC);
CREATE INDEX idx_security_audit_event_type ON security_audit_log(event_type);
CREATE INDEX idx_security_audit_severity ON security_audit_log(severity);
CREATE INDEX idx_security_audit_suspicious ON security_audit_log(is_suspicious) WHERE is_suspicious = true;

-- GIN index for metadata JSONB
CREATE INDEX idx_security_audit_metadata ON security_audit_log USING GIN (metadata);

-- Partial index for high-risk events
CREATE INDEX idx_security_audit_high_risk
  ON security_audit_log(created_at DESC)
  WHERE severity = 'critical' OR is_suspicious = true;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE activity_log IS 'Comprehensive activity tracking for all workspace actions';
COMMENT ON TABLE security_audit_log IS 'Critical security events with stricter retention policies';
COMMENT ON TABLE activity_log_settings IS 'Workspace-level settings for activity logging';

COMMENT ON COLUMN activity_log.action IS 'Action performed (e.g., post_published, settings_updated, member_invited)';
COMMENT ON COLUMN activity_log.actor_id IS 'User who performed the action (can differ from user_id for team actions)';
COMMENT ON COLUMN activity_log.metadata IS 'Additional context data in JSON format';
COMMENT ON COLUMN security_audit_log.risk_score IS 'Risk score from 0-100 based on behavior analysis';
