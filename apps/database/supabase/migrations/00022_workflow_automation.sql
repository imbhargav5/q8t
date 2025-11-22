-- Workflow Automation
-- This migration adds approval workflows, team notifications, and task integrations

-- Create enum types for workflow automation
CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected', 'expired', 'cancelled');
CREATE TYPE approval_decision AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE task_sync_status AS ENUM ('synced', 'out_of_sync', 'failed');
CREATE TYPE notification_event AS ENUM (
  'inbox_assignment',
  'inbox_mention',
  'approval_request',
  'approval_decision',
  'crisis_detected',
  'alert_triggered',
  'report_ready',
  'post_published',
  'post_failed',
  'comment_received',
  'review_received'
);

-- ============================================================================
-- APPROVAL WORKFLOWS TABLE
-- ============================================================================

CREATE TABLE approval_workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  -- Workflow steps configuration
  steps JSONB NOT NULL,
  /*
    [
      {
        "level": 1,
        "name": "Content Review",
        "approvers": ["user-id-1", "user-id-2"],
        "required_approvals": 1,
        "allow_self_approval": false,
        "condition": null
      },
      {
        "level": 2,
        "name": "Legal Review",
        "approvers": ["user-id-3"],
        "required_approvals": 1,
        "allow_self_approval": false,
        "condition": "post.platforms includes 'facebook' OR post.platforms includes 'instagram'"
      }
    ]
  */

  -- Workflow application conditions
  apply_conditions JSONB,
  /*
    {
      "platforms": ["facebook", "instagram"],
      "content_types": ["video"],
      "has_media": true,
      "min_character_count": 500,
      "contains_keywords": ["promotion", "sale"],
      "post_value_min": 1000
    }
  */

  -- Settings
  auto_schedule_on_approval BOOLEAN DEFAULT false NOT NULL,
  auto_notify_approvers BOOLEAN DEFAULT true NOT NULL,
  expiry_days INTEGER DEFAULT 7 NOT NULL,
  allow_comments BOOLEAN DEFAULT true NOT NULL,

  -- Defaults
  is_active BOOLEAN DEFAULT true NOT NULL,
  is_default BOOLEAN DEFAULT false NOT NULL, -- Default workflow if no others match

  -- Priority (higher = checked first when matching conditions)
  priority INTEGER DEFAULT 0 NOT NULL,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, name)
);

-- ============================================================================
-- APPROVAL REQUESTS TABLE
-- ============================================================================

CREATE TABLE approval_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  workflow_id UUID NOT NULL REFERENCES approval_workflows(id) ON DELETE CASCADE,

  -- Subject of approval
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,

  -- Workflow snapshot (at time of creation)
  workflow_steps JSONB NOT NULL, -- Copy of workflow steps

  -- Current status
  status approval_status DEFAULT 'pending' NOT NULL,
  current_level INTEGER DEFAULT 1 NOT NULL,

  -- Submission
  submitted_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  submission_note TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Resolution
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  resolution_note TEXT,

  -- Expiry
  expires_at TIMESTAMPTZ NOT NULL,

  -- Comments thread
  comments_count INTEGER DEFAULT 0,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- APPROVALS TABLE (Individual approval decisions)
-- ============================================================================

CREATE TABLE approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES approval_requests(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Approver details
  approver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  level INTEGER NOT NULL,

  -- Decision
  decision approval_decision DEFAULT 'pending' NOT NULL,
  comments TEXT,

  -- Timestamps
  notified_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  responded_at TIMESTAMPTZ,
  reminder_sent_at TIMESTAMPTZ,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(request_id, approver_id)
);

-- ============================================================================
-- APPROVAL COMMENTS TABLE
-- ============================================================================

CREATE TABLE approval_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES approval_requests(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,

  -- Threading
  parent_comment_id UUID REFERENCES approval_comments(id) ON DELETE CASCADE,

  -- Mentions
  mentioned_users UUID[] DEFAULT '{}',

  posted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- NOTIFICATION PREFERENCES TABLE
-- ============================================================================

CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Channel preferences
  email_enabled BOOLEAN DEFAULT true NOT NULL,
  slack_enabled BOOLEAN DEFAULT false NOT NULL,
  teams_enabled BOOLEAN DEFAULT false NOT NULL,
  push_enabled BOOLEAN DEFAULT true NOT NULL,
  sms_enabled BOOLEAN DEFAULT false NOT NULL,

  -- Event preferences (per event type)
  event_preferences JSONB DEFAULT '{}',
  /*
    {
      "inbox_assignment": {
        "enabled": true,
        "channels": ["email", "push"],
        "immediate": true
      },
      "approval_request": {
        "enabled": true,
        "channels": ["email", "slack"],
        "immediate": true
      },
      "crisis_detected": {
        "enabled": true,
        "channels": ["email", "slack", "sms", "push"],
        "immediate": true
      },
      "report_ready": {
        "enabled": true,
        "channels": ["email"],
        "immediate": false,
        "digest": "daily"
      }
    }
  */

  -- Quiet hours
  quiet_hours_enabled BOOLEAN DEFAULT false,
  quiet_hours_start TIME, -- e.g., "22:00:00"
  quiet_hours_end TIME, -- e.g., "08:00:00"
  quiet_hours_timezone TEXT DEFAULT 'UTC',

  -- Digest settings
  daily_digest_enabled BOOLEAN DEFAULT false,
  daily_digest_time TIME DEFAULT '09:00:00',
  weekly_digest_enabled BOOLEAN DEFAULT false,
  weekly_digest_day INTEGER DEFAULT 1, -- 1 = Monday
  weekly_digest_time TIME DEFAULT '09:00:00',

  -- Integration tokens (encrypted in production)
  slack_webhook_url TEXT,
  teams_webhook_url TEXT,
  slack_user_id TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(user_id, workspace_id)
);

-- ============================================================================
-- NOTIFICATION QUEUE TABLE
-- ============================================================================

CREATE TABLE notification_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Recipient
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Event details
  event_type notification_event NOT NULL,
  event_data JSONB NOT NULL,

  -- Notification content
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  action_url TEXT,

  -- Delivery channels
  channels TEXT[] NOT NULL, -- ["email", "slack", "push"]

  -- Status
  status TEXT DEFAULT 'pending' NOT NULL, -- "pending", "sent", "failed"
  sent_at TIMESTAMPTZ,
  error_message TEXT,

  -- Grouping (for batching/digest)
  digest_key TEXT, -- Group notifications by key for daily/weekly digests
  priority INTEGER DEFAULT 0, -- Higher = more important

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TASK INTEGRATIONS TABLE
-- ============================================================================

CREATE TABLE integration_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Source (what triggered task creation)
  conversation_id UUID REFERENCES social_inbox_conversations(id) ON DELETE SET NULL,
  message_id UUID REFERENCES social_inbox_messages(id) ON DELETE SET NULL,
  listening_stream_item_id UUID REFERENCES listening_stream_items(id) ON DELETE SET NULL,

  -- Integration
  integration_type TEXT NOT NULL, -- "asana", "monday", "clickup", "notion", "jira", "trello"
  integration_account_id TEXT NOT NULL, -- Platform-specific account/workspace ID

  -- Task details
  external_task_id TEXT NOT NULL,
  external_task_url TEXT,
  task_title TEXT NOT NULL,
  task_description TEXT,

  -- Assignment
  assigned_to_external_user TEXT, -- External platform user ID

  -- Status sync
  sync_status task_sync_status DEFAULT 'synced' NOT NULL,
  last_synced_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  sync_error TEXT,

  -- Bidirectional sync
  sync_enabled BOOLEAN DEFAULT true NOT NULL,

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, integration_type, external_task_id)
);

-- ============================================================================
-- AUTOMATION LOGS TABLE
-- ============================================================================

CREATE TABLE automation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Automation details
  automation_type TEXT NOT NULL, -- "approval_workflow", "notification", "task_creation", "rss_publish", etc.
  automation_id UUID, -- Reference to specific automation (workflow_id, rule_id, etc.)

  -- Action
  action TEXT NOT NULL,
  status TEXT NOT NULL, -- "success", "failed", "skipped"

  -- Context
  triggered_by UUID REFERENCES users(id) ON DELETE SET NULL,
  entity_type TEXT, -- "post", "message", "conversation", etc.
  entity_id UUID,

  -- Details
  details JSONB DEFAULT '{}',
  error_message TEXT,

  -- Timing
  duration_ms INTEGER,

  executed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_approval_workflows_updated_at BEFORE UPDATE ON approval_workflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_approval_requests_updated_at BEFORE UPDATE ON approval_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON notification_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integration_tasks_updated_at BEFORE UPDATE ON integration_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to check if approval request should advance to next level
CREATE OR REPLACE FUNCTION advance_approval_level(request_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  req RECORD;
  current_step JSONB;
  required_approvals INTEGER;
  received_approvals INTEGER;
BEGIN
  -- Get request details
  SELECT * INTO req FROM approval_requests WHERE id = request_uuid;

  IF NOT FOUND OR req.status != 'pending' THEN
    RETURN FALSE;
  END IF;

  -- Get current step configuration
  current_step := req.workflow_steps->req.current_level - 1; -- JSONB arrays are 0-indexed
  required_approvals := (current_step->>'required_approvals')::INTEGER;

  -- Count approved decisions at current level
  SELECT COUNT(*) INTO received_approvals
  FROM approvals
  WHERE request_id = request_uuid
    AND level = req.current_level
    AND decision = 'approved';

  -- Check if we have enough approvals
  IF received_approvals >= required_approvals THEN
    -- Check if there are more levels
    IF jsonb_array_length(req.workflow_steps) > req.current_level THEN
      -- Advance to next level
      UPDATE approval_requests
      SET current_level = req.current_level + 1
      WHERE id = request_uuid;
      RETURN TRUE;
    ELSE
      -- All levels complete - approve the request
      UPDATE approval_requests
      SET
        status = 'approved',
        resolved_at = NOW(),
        resolved_by = (SELECT approver_id FROM approvals WHERE request_id = request_uuid AND decision = 'approved' ORDER BY responded_at DESC LIMIT 1)
      WHERE id = request_uuid;
      RETURN TRUE;
    END IF;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-expire pending approval requests
CREATE OR REPLACE FUNCTION expire_old_approval_requests()
RETURNS INTEGER AS $$
DECLARE
  expired_count INTEGER;
BEGIN
  UPDATE approval_requests
  SET
    status = 'expired',
    resolved_at = NOW()
  WHERE
    status = 'pending'
    AND expires_at < NOW();

  GET DIAGNOSTICS expired_count = ROW_COUNT;
  RETURN expired_count;
END;
$$ LANGUAGE plpgsql;

-- Function to check if user should receive notification based on preferences
CREATE OR REPLACE FUNCTION should_notify_user(
  user_uuid UUID,
  ws_id UUID,
  event notification_event,
  channel TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  prefs RECORD;
  event_config JSONB;
BEGIN
  -- Get user preferences
  SELECT * INTO prefs
  FROM notification_preferences
  WHERE user_id = user_uuid AND workspace_id = ws_id;

  -- If no preferences found, use defaults
  IF NOT FOUND THEN
    RETURN TRUE;
  END IF;

  -- Check if channel is globally disabled
  IF channel = 'email' AND NOT prefs.email_enabled THEN RETURN FALSE; END IF;
  IF channel = 'slack' AND NOT prefs.slack_enabled THEN RETURN FALSE; END IF;
  IF channel = 'teams' AND NOT prefs.teams_enabled THEN RETURN FALSE; END IF;
  IF channel = 'push' AND NOT prefs.push_enabled THEN RETURN FALSE; END IF;
  IF channel = 'sms' AND NOT prefs.sms_enabled THEN RETURN FALSE; END IF;

  -- Check event-specific preferences
  event_config := prefs.event_preferences->event::TEXT;

  IF event_config IS NOT NULL THEN
    -- Check if event is enabled
    IF NOT COALESCE((event_config->>'enabled')::BOOLEAN, TRUE) THEN
      RETURN FALSE;
    END IF;

    -- Check if channel is enabled for this event
    IF NOT (event_config->'channels' ? channel) THEN
      RETURN FALSE;
    END IF;
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to update approval request comments count
CREATE OR REPLACE FUNCTION update_approval_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE approval_requests
    SET comments_count = comments_count + 1
    WHERE id = NEW.request_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE approval_requests
    SET comments_count = GREATEST(0, comments_count - 1)
    WHERE id = OLD.request_id;
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_comments_count_trigger
  AFTER INSERT OR DELETE ON approval_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_approval_comments_count();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE approval_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;

-- Approval workflows policies
CREATE POLICY "Workspace members can view approval workflows"
  ON approval_workflows FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can manage approval workflows"
  ON approval_workflows FOR ALL
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Approval requests policies
CREATE POLICY "Workspace members can view approval requests"
  ON approval_requests FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can create approval requests"
  ON approval_requests FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Submitters and approvers can update approval requests"
  ON approval_requests FOR UPDATE
  USING (
    is_workspace_member(workspace_id, auth.uid()) AND
    (submitted_by = auth.uid() OR
     EXISTS (SELECT 1 FROM approvals WHERE request_id = id AND approver_id = auth.uid()))
  );

-- Approvals policies
CREATE POLICY "Workspace members can view approvals"
  ON approvals FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Approvers can update their approvals"
  ON approvals FOR UPDATE
  USING (approver_id = auth.uid());

-- Approval comments policies
CREATE POLICY "Workspace members can view approval comments"
  ON approval_comments FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can create approval comments"
  ON approval_comments FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Comment authors can update their comments"
  ON approval_comments FOR UPDATE
  USING (author_id = auth.uid());

CREATE POLICY "Comment authors can delete their comments"
  ON approval_comments FOR DELETE
  USING (author_id = auth.uid());

-- Notification preferences policies
CREATE POLICY "Users can view their own notification preferences"
  ON notification_preferences FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own notification preferences"
  ON notification_preferences FOR ALL
  USING (user_id = auth.uid());

-- Notification queue policies
CREATE POLICY "Users can view their own notifications"
  ON notification_queue FOR SELECT
  USING (user_id = auth.uid());

-- Integration tasks policies
CREATE POLICY "Workspace members can view integration tasks"
  ON integration_tasks FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage integration tasks"
  ON integration_tasks FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Automation logs policies
CREATE POLICY "Workspace admins can view automation logs"
  ON automation_logs FOR SELECT
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Approval workflows indexes
CREATE INDEX idx_approval_workflows_workspace ON approval_workflows(workspace_id);
CREATE INDEX idx_approval_workflows_active ON approval_workflows(workspace_id, is_active) WHERE is_active = true;
CREATE INDEX idx_approval_workflows_default ON approval_workflows(workspace_id, is_default) WHERE is_default = true;
CREATE INDEX idx_approval_workflows_priority ON approval_workflows(workspace_id, priority DESC);

-- Approval requests indexes
CREATE INDEX idx_approval_requests_workspace ON approval_requests(workspace_id);
CREATE INDEX idx_approval_requests_workflow ON approval_requests(workflow_id);
CREATE INDEX idx_approval_requests_post ON approval_requests(post_id);
CREATE INDEX idx_approval_requests_status ON approval_requests(workspace_id, status);
CREATE INDEX idx_approval_requests_submitted_by ON approval_requests(submitted_by);
CREATE INDEX idx_approval_requests_expires ON approval_requests(expires_at) WHERE status = 'pending';
CREATE INDEX idx_approval_requests_pending ON approval_requests(workspace_id, status) WHERE status = 'pending';

-- Approvals indexes
CREATE INDEX idx_approvals_request ON approvals(request_id);
CREATE INDEX idx_approvals_approver ON approvals(approver_id);
CREATE INDEX idx_approvals_pending ON approvals(approver_id, decision) WHERE decision = 'pending';
CREATE INDEX idx_approvals_level ON approvals(request_id, level);

-- Approval comments indexes
CREATE INDEX idx_approval_comments_request ON approval_comments(request_id);
CREATE INDEX idx_approval_comments_author ON approval_comments(author_id);
CREATE INDEX idx_approval_comments_parent ON approval_comments(parent_comment_id);
CREATE INDEX idx_approval_comments_posted ON approval_comments(request_id, posted_at DESC);

-- Notification preferences indexes
CREATE INDEX idx_notification_prefs_user_workspace ON notification_preferences(user_id, workspace_id);

-- Notification queue indexes
CREATE INDEX idx_notification_queue_user ON notification_queue(user_id);
CREATE INDEX idx_notification_queue_workspace ON notification_queue(workspace_id);
CREATE INDEX idx_notification_queue_status ON notification_queue(status) WHERE status = 'pending';
CREATE INDEX idx_notification_queue_digest ON notification_queue(digest_key, created_at) WHERE digest_key IS NOT NULL;
CREATE INDEX idx_notification_queue_priority ON notification_queue(priority DESC, created_at) WHERE status = 'pending';

-- Integration tasks indexes
CREATE INDEX idx_integration_tasks_workspace ON integration_tasks(workspace_id);
CREATE INDEX idx_integration_tasks_type ON integration_tasks(integration_type);
CREATE INDEX idx_integration_tasks_conversation ON integration_tasks(conversation_id);
CREATE INDEX idx_integration_tasks_message ON integration_tasks(message_id);
CREATE INDEX idx_integration_tasks_sync_status ON integration_tasks(sync_status);

-- Automation logs indexes
CREATE INDEX idx_automation_logs_workspace ON automation_logs(workspace_id);
CREATE INDEX idx_automation_logs_type ON automation_logs(automation_type);
CREATE INDEX idx_automation_logs_executed ON automation_logs(workspace_id, executed_at DESC);
CREATE INDEX idx_automation_logs_status ON automation_logs(workspace_id, status);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE approval_workflows IS 'Approval workflow configurations';
COMMENT ON TABLE approval_requests IS 'Individual approval requests';
COMMENT ON TABLE approvals IS 'Individual approval decisions within a request';
COMMENT ON TABLE approval_comments IS 'Comments on approval requests';
COMMENT ON TABLE notification_preferences IS 'User notification preferences per workspace';
COMMENT ON TABLE notification_queue IS 'Notification delivery queue';
COMMENT ON TABLE integration_tasks IS 'Tasks created in external project management tools';
COMMENT ON TABLE automation_logs IS 'Audit log for all automation executions';

COMMENT ON FUNCTION advance_approval_level IS 'Advance approval request to next level or complete';
COMMENT ON FUNCTION expire_old_approval_requests IS 'Expire pending approval requests past their expiry date';
COMMENT ON FUNCTION should_notify_user IS 'Check if user should receive notification based on preferences';
COMMENT ON FUNCTION update_approval_comments_count IS 'Update comments count on approval requests';
