-- Notifications System
-- This migration adds notification management and preferences

-- Create enum types for notifications
CREATE TYPE notification_type AS ENUM (
  'mention',
  'message',
  'comment',
  'like',
  'share',
  'post_published',
  'post_scheduled',
  'post_failed',
  'campaign_started',
  'campaign_completed',
  'alert',
  'system',
  'team_invitation',
  'security'
);

-- ============================================================================
-- NOTIFICATIONS TABLE
-- ============================================================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Notification details
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  action_url TEXT,

  -- Actor information (who triggered this notification)
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  actor_name TEXT,
  actor_avatar TEXT,

  -- Context
  platform social_platform,
  metadata JSONB DEFAULT '{}',

  -- Status
  read_at TIMESTAMPTZ,
  dismissed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Indexes will be created below
  CHECK (LENGTH(title) > 0),
  CHECK (LENGTH(body) > 0)
);

-- ============================================================================
-- NOTIFICATION PREFERENCES TABLE
-- ============================================================================

CREATE TABLE notification_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,

  -- Channels
  email_enabled BOOLEAN DEFAULT true NOT NULL,
  push_enabled BOOLEAN DEFAULT true NOT NULL,
  in_app_enabled BOOLEAN DEFAULT true NOT NULL,
  sms_enabled BOOLEAN DEFAULT false NOT NULL,

  -- Event types
  mention_notifications BOOLEAN DEFAULT true NOT NULL,
  message_notifications BOOLEAN DEFAULT true NOT NULL,
  comment_notifications BOOLEAN DEFAULT true NOT NULL,
  engagement_notifications BOOLEAN DEFAULT true NOT NULL,
  system_notifications BOOLEAN DEFAULT true NOT NULL,
  crisis_notifications BOOLEAN DEFAULT true NOT NULL,

  -- Digests
  daily_digest BOOLEAN DEFAULT false NOT NULL,
  weekly_digest BOOLEAN DEFAULT false NOT NULL,

  -- Quiet hours
  quiet_hours_enabled BOOLEAN DEFAULT false NOT NULL,
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  quiet_hours_timezone TEXT DEFAULT 'UTC',

  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- NOTIFICATION SUBSCRIPTIONS TABLE
-- ============================================================================
-- Track what entities users are subscribed to for notifications

CREATE TABLE notification_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- What they're subscribed to
  entity_type TEXT NOT NULL, -- 'post', 'conversation', 'campaign', etc.
  entity_id UUID NOT NULL,

  -- Subscription settings
  is_subscribed BOOLEAN DEFAULT true NOT NULL,
  notification_types notification_type[] DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(user_id, entity_type, entity_id)
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_notification_preferences_updated_at
  BEFORE UPDATE ON notification_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_subscriptions_updated_at
  BEFORE UPDATE ON notification_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to get unread notification count
CREATE OR REPLACE FUNCTION get_unread_notification_count(p_user_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::INTEGER
    FROM notifications
    WHERE user_id = p_user_id
    AND read_at IS NULL
    AND dismissed_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark all notifications as read
CREATE OR REPLACE FUNCTION mark_all_notifications_read(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE notifications
  SET read_at = NOW()
  WHERE user_id = p_user_id
  AND read_at IS NULL
  AND dismissed_at IS NULL;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "Users can view their notifications"
  ON notifications
  FOR SELECT
  USING (user_id = auth.uid());

-- Users can update their own notifications (mark as read/dismissed)
CREATE POLICY "Users can update their notifications"
  ON notifications
  FOR UPDATE
  USING (user_id = auth.uid());

-- System can insert notifications
CREATE POLICY "System can insert notifications"
  ON notifications
  FOR INSERT
  WITH CHECK (true); -- Will be controlled by application layer

-- Users can manage their own preferences
CREATE POLICY "Users can manage their preferences"
  ON notification_preferences
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users can manage their own subscriptions
CREATE POLICY "Users can manage their subscriptions"
  ON notification_subscriptions
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_workspace_id ON notifications(workspace_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_read_at ON notifications(read_at) WHERE read_at IS NULL;
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, created_at DESC)
  WHERE read_at IS NULL AND dismissed_at IS NULL;
CREATE INDEX idx_notifications_actor_id ON notifications(actor_id) WHERE actor_id IS NOT NULL;
CREATE INDEX idx_notifications_platform ON notifications(platform) WHERE platform IS NOT NULL;

-- GIN index for metadata JSONB
CREATE INDEX idx_notifications_metadata ON notifications USING GIN (metadata);

-- Notification subscriptions indexes
CREATE INDEX idx_notification_subscriptions_user ON notification_subscriptions(user_id);
CREATE INDEX idx_notification_subscriptions_entity ON notification_subscriptions(entity_type, entity_id);
CREATE INDEX idx_notification_subscriptions_workspace ON notification_subscriptions(workspace_id);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE notifications IS 'User notifications for all events in the system';
COMMENT ON TABLE notification_preferences IS 'User preferences for how they receive notifications';
COMMENT ON TABLE notification_subscriptions IS 'Entity-level notification subscriptions';

COMMENT ON COLUMN notifications.actor_id IS 'User who triggered this notification (if applicable)';
COMMENT ON COLUMN notifications.metadata IS 'Additional context data specific to notification type';
COMMENT ON COLUMN notification_preferences.quiet_hours_enabled IS 'Enable do-not-disturb during specified hours';
