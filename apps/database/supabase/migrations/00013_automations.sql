-- Automations and Team Collaboration Features
-- This migration adds rules, assignments, tags, and automation capabilities for the inbox

-- Create enum types for automations
CREATE TYPE inbox_rule_trigger AS ENUM (
  'message_received',      -- New message arrives
  'mention_received',      -- Workspace mentioned
  'keyword_match',         -- Message contains keyword
  'sender_match',          -- From specific sender
  'platform_match',        -- From specific platform
  'media_received',        -- Message has media
  'conversation_created',  -- New conversation started
  'message_count_reached'  -- Conversation reaches N messages
);

CREATE TYPE inbox_rule_action AS ENUM (
  'assign_to_user',       -- Assign conversation to team member
  'add_tag',              -- Add tag to conversation
  'mark_as_priority',     -- Mark conversation as priority
  'send_notification',    -- Send notification to team
  'auto_reply',           -- Send automatic reply
  'archive',              -- Archive conversation
  'mark_as_spam',         -- Mark as spam
  'create_task',          -- Create task/ticket
  'webhook',              -- Call external webhook
  'run_script'            -- Execute custom script
);

CREATE TYPE inbox_tag_color AS ENUM (
  'gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'
);

CREATE TYPE inbox_assignment_status AS ENUM ('assigned', 'accepted', 'completed', 'declined');

-- ============================================================================
-- INBOX TAGS TABLE
-- ============================================================================

CREATE TABLE inbox_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Tag properties
  name TEXT NOT NULL,
  slug TEXT NOT NULL, -- URL-friendly identifier
  description TEXT,
  color inbox_tag_color DEFAULT 'gray' NOT NULL,
  icon TEXT, -- Optional emoji or icon name

  -- Usage tracking
  conversation_count INTEGER DEFAULT 0 NOT NULL,
  last_used_at TIMESTAMPTZ,

  -- Organization
  parent_tag_id UUID REFERENCES inbox_tags(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0 NOT NULL,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, slug)
);

-- ============================================================================
-- CONVERSATION TAGS TABLE (many-to-many)
-- ============================================================================

CREATE TABLE conversation_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES social_inbox_conversations(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES inbox_tags(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Who added the tag
  added_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(conversation_id, tag_id)
);

-- ============================================================================
-- INBOX ASSIGNMENTS TABLE
-- ============================================================================

CREATE TABLE inbox_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  conversation_id UUID NOT NULL REFERENCES social_inbox_conversations(id) ON DELETE CASCADE,

  -- Assignment details
  assigned_to UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assigned_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status inbox_assignment_status DEFAULT 'assigned' NOT NULL,

  -- Notes
  assignment_note TEXT,

  -- Timestamps
  assigned_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  accepted_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  declined_at TIMESTAMPTZ,
  declined_reason TEXT,

  -- Due date (optional)
  due_at TIMESTAMPTZ,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- INBOX RULES TABLE
-- ============================================================================

CREATE TABLE inbox_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Rule identification
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL,

  -- Trigger configuration
  trigger_type inbox_rule_trigger NOT NULL,
  trigger_conditions JSONB NOT NULL, -- Flexible conditions based on trigger type
  /*
    Examples:
    - keyword_match: { "keywords": ["urgent", "help"], "case_sensitive": false }
    - sender_match: { "sender_platform_ids": ["twitter:123", "instagram:456"] }
    - platform_match: { "platforms": ["twitter", "instagram"] }
    - message_count_reached: { "count": 5 }
  */

  -- Filters (optional additional filtering)
  filter_platforms social_platform[], -- Only apply to these platforms
  filter_message_types inbox_message_type[], -- Only apply to these message types
  filter_has_media BOOLEAN, -- Only if message has/doesn't have media

  -- Action configuration
  action_type inbox_rule_action NOT NULL,
  action_config JSONB NOT NULL, -- Flexible action parameters
  /*
    Examples:
    - assign_to_user: { "user_id": "uuid" }
    - add_tag: { "tag_id": "uuid" }
    - auto_reply: { "message_template": "Thanks for reaching out!" }
    - webhook: { "url": "https://...", "method": "POST" }
  */

  -- Execution tracking
  execution_count BIGINT DEFAULT 0 NOT NULL,
  last_executed_at TIMESTAMPTZ,
  last_execution_result TEXT,

  -- Priority (higher = runs first)
  priority INTEGER DEFAULT 0 NOT NULL,

  -- Stop processing more rules after this one executes
  stop_on_match BOOLEAN DEFAULT false NOT NULL,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- INBOX RULE EXECUTIONS TABLE (Audit log)
-- ============================================================================

CREATE TABLE inbox_rule_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  rule_id UUID NOT NULL REFERENCES inbox_rules(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES social_inbox_conversations(id) ON DELETE SET NULL,
  message_id UUID REFERENCES social_inbox_messages(id) ON DELETE SET NULL,

  -- Execution details
  matched BOOLEAN NOT NULL, -- Did the rule conditions match?
  executed BOOLEAN NOT NULL, -- Was the action executed?
  success BOOLEAN, -- Did the action succeed?

  -- Results
  result_message TEXT,
  error_message TEXT,
  action_results JSONB, -- Results from the action execution

  executed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- SAVED REPLIES TABLE
-- ============================================================================

CREATE TABLE saved_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Reply details
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  shortcut TEXT, -- Optional keyboard shortcut (e.g., "/thanks")

  -- Categorization
  category TEXT, -- Optional grouping
  tags TEXT[] DEFAULT '{}',

  -- Usage tracking
  use_count INTEGER DEFAULT 0 NOT NULL,
  last_used_at TIMESTAMPTZ,

  -- Platform-specific variants
  platform_variants JSONB DEFAULT '{}', -- Different versions for different platforms

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- INBOX VIEWS (Saved filters for team members)
-- ============================================================================

CREATE TABLE inbox_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- View details
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,

  -- Filter configuration
  filters JSONB NOT NULL,
  /*
    Example:
    {
      "status": ["open", "pending"],
      "assigned_to": "me",
      "platforms": ["twitter", "instagram"],
      "tags": ["urgent", "support"],
      "has_unread": true,
      "date_range": { "from": "2024-01-01", "to": "2024-12-31" }
    }
  */

  -- Sort configuration
  sort_field TEXT DEFAULT 'last_message_at',
  sort_direction TEXT DEFAULT 'desc',

  -- Visibility
  is_shared BOOLEAN DEFAULT false NOT NULL, -- Shared with all team members
  is_default BOOLEAN DEFAULT false NOT NULL, -- Default view for user

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_inbox_tags_updated_at BEFORE UPDATE ON inbox_tags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inbox_assignments_updated_at BEFORE UPDATE ON inbox_assignments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inbox_rules_updated_at BEFORE UPDATE ON inbox_rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_replies_updated_at BEFORE UPDATE ON saved_replies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inbox_views_updated_at BEFORE UPDATE ON inbox_views
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update tag usage count
CREATE OR REPLACE FUNCTION update_tag_usage_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE inbox_tags
    SET
      conversation_count = conversation_count + 1,
      last_used_at = NOW()
    WHERE id = NEW.tag_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE inbox_tags
    SET conversation_count = GREATEST(0, conversation_count - 1)
    WHERE id = OLD.tag_id;
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tag_usage_on_conversation_tag_change
  AFTER INSERT OR DELETE ON conversation_tags
  FOR EACH ROW
  EXECUTE FUNCTION update_tag_usage_count();

-- Function to update conversation assignment when inbox_assignment changes
CREATE OR REPLACE FUNCTION sync_conversation_assignment()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    -- Update the conversation's assigned_to field
    IF NEW.status = 'assigned' OR NEW.status = 'accepted' THEN
      UPDATE social_inbox_conversations
      SET
        assigned_to = NEW.assigned_to,
        assigned_at = NEW.assigned_at
      WHERE id = NEW.conversation_id;
    ELSIF NEW.status = 'completed' OR NEW.status = 'declined' THEN
      -- Clear assignment if completed or declined
      UPDATE social_inbox_conversations
      SET
        assigned_to = NULL,
        assigned_at = NULL
      WHERE id = NEW.conversation_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    -- Clear assignment
    UPDATE social_inbox_conversations
    SET
      assigned_to = NULL,
      assigned_at = NULL
    WHERE id = OLD.conversation_id;
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sync_conversation_assignment_trigger
  AFTER INSERT OR UPDATE OR DELETE ON inbox_assignments
  FOR EACH ROW
  EXECUTE FUNCTION sync_conversation_assignment();

-- Function to update saved reply usage
CREATE OR REPLACE FUNCTION increment_saved_reply_usage(reply_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE saved_replies
  SET
    use_count = use_count + 1,
    last_used_at = NOW()
  WHERE id = reply_uuid;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to evaluate rule conditions
CREATE OR REPLACE FUNCTION evaluate_inbox_rule(
  rule_uuid UUID,
  conversation_uuid UUID,
  message_uuid UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  rule_record RECORD;
  message_record RECORD;
  conditions JSONB;
  keywords TEXT[];
  keyword TEXT;
BEGIN
  -- Get rule
  SELECT * INTO rule_record FROM inbox_rules WHERE id = rule_uuid AND is_active = true;
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  -- Get message details
  SELECT * INTO message_record FROM social_inbox_messages WHERE id = message_uuid;

  -- Apply platform filters
  IF rule_record.filter_platforms IS NOT NULL THEN
    IF NOT (message_record.platform = ANY(rule_record.filter_platforms)) THEN
      RETURN FALSE;
    END IF;
  END IF;

  -- Apply message type filters
  IF rule_record.filter_message_types IS NOT NULL THEN
    IF NOT (message_record.message_type = ANY(rule_record.filter_message_types)) THEN
      RETURN FALSE;
    END IF;
  END IF;

  -- Apply media filter
  IF rule_record.filter_has_media IS NOT NULL THEN
    IF rule_record.filter_has_media != message_record.has_media THEN
      RETURN FALSE;
    END IF;
  END IF;

  -- Evaluate trigger-specific conditions
  conditions := rule_record.trigger_conditions;

  CASE rule_record.trigger_type
    WHEN 'keyword_match' THEN
      keywords := ARRAY(SELECT jsonb_array_elements_text(conditions->'keywords'));
      FOREACH keyword IN ARRAY keywords LOOP
        IF message_record.content_preview ILIKE '%' || keyword || '%' THEN
          RETURN TRUE;
        END IF;
      END LOOP;
      RETURN FALSE;

    WHEN 'platform_match' THEN
      RETURN message_record.platform = ANY(
        ARRAY(SELECT jsonb_array_elements_text(conditions->'platforms'))::social_platform[]
      );

    WHEN 'media_received' THEN
      RETURN message_record.has_media;

    WHEN 'message_received', 'mention_received' THEN
      RETURN TRUE; -- Always match for these triggers

    ELSE
      RETURN FALSE;
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE inbox_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE inbox_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE inbox_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE inbox_rule_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE inbox_views ENABLE ROW LEVEL SECURITY;

-- Tags policies
CREATE POLICY "Workspace members can view tags"
  ON inbox_tags FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage tags"
  ON inbox_tags FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Conversation tags policies
CREATE POLICY "Workspace members can view conversation tags"
  ON conversation_tags FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage conversation tags"
  ON conversation_tags FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Assignments policies
CREATE POLICY "Workspace members can view assignments"
  ON inbox_assignments FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can create assignments"
  ON inbox_assignments FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Assigned users can update their assignments"
  ON inbox_assignments FOR UPDATE
  USING (assigned_to = auth.uid() OR has_workspace_role(workspace_id, auth.uid(), 'admin'));

CREATE POLICY "Workspace admins can delete assignments"
  ON inbox_assignments FOR DELETE
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Rules policies
CREATE POLICY "Workspace members can view rules"
  ON inbox_rules FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can manage rules"
  ON inbox_rules FOR ALL
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Rule executions policies (read-only for auditing)
CREATE POLICY "Workspace admins can view rule executions"
  ON inbox_rule_executions FOR SELECT
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Saved replies policies
CREATE POLICY "Workspace members can view saved replies"
  ON saved_replies FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can manage saved replies"
  ON saved_replies FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Inbox views policies
CREATE POLICY "Users can view their own and shared views"
  ON inbox_views FOR SELECT
  USING (
    is_workspace_member(workspace_id, auth.uid()) AND
    (created_by = auth.uid() OR is_shared = true)
  );

CREATE POLICY "Users can manage their own views"
  ON inbox_views FOR ALL
  USING (created_by = auth.uid());

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Tags indexes
CREATE INDEX idx_inbox_tags_workspace_id ON inbox_tags(workspace_id);
CREATE INDEX idx_inbox_tags_slug ON inbox_tags(workspace_id, slug);
CREATE INDEX idx_inbox_tags_parent_tag_id ON inbox_tags(parent_tag_id);
CREATE INDEX idx_inbox_tags_conversation_count ON inbox_tags(workspace_id, conversation_count DESC);

-- Conversation tags indexes
CREATE INDEX idx_conversation_tags_conversation_id ON conversation_tags(conversation_id);
CREATE INDEX idx_conversation_tags_tag_id ON conversation_tags(tag_id);
CREATE INDEX idx_conversation_tags_workspace_id ON conversation_tags(workspace_id);
CREATE INDEX idx_conversation_tags_added_by ON conversation_tags(added_by);

-- Assignments indexes
CREATE INDEX idx_inbox_assignments_workspace_id ON inbox_assignments(workspace_id);
CREATE INDEX idx_inbox_assignments_conversation_id ON inbox_assignments(conversation_id);
CREATE INDEX idx_inbox_assignments_assigned_to ON inbox_assignments(assigned_to);
CREATE INDEX idx_inbox_assignments_assigned_by ON inbox_assignments(assigned_by);
CREATE INDEX idx_inbox_assignments_status ON inbox_assignments(status);
CREATE INDEX idx_inbox_assignments_due_at ON inbox_assignments(due_at) WHERE due_at IS NOT NULL;

-- Rules indexes
CREATE INDEX idx_inbox_rules_workspace_id ON inbox_rules(workspace_id);
CREATE INDEX idx_inbox_rules_is_active ON inbox_rules(is_active) WHERE is_active = true;
CREATE INDEX idx_inbox_rules_trigger_type ON inbox_rules(trigger_type);
CREATE INDEX idx_inbox_rules_action_type ON inbox_rules(action_type);
CREATE INDEX idx_inbox_rules_priority ON inbox_rules(workspace_id, priority DESC, created_at);

-- Rule executions indexes
CREATE INDEX idx_inbox_rule_executions_rule_id ON inbox_rule_executions(rule_id);
CREATE INDEX idx_inbox_rule_executions_workspace_id ON inbox_rule_executions(workspace_id);
CREATE INDEX idx_inbox_rule_executions_conversation_id ON inbox_rule_executions(conversation_id);
CREATE INDEX idx_inbox_rule_executions_executed_at ON inbox_rule_executions(workspace_id, executed_at DESC);

-- Saved replies indexes
CREATE INDEX idx_saved_replies_workspace_id ON saved_replies(workspace_id);
CREATE INDEX idx_saved_replies_shortcut ON saved_replies(workspace_id, shortcut) WHERE shortcut IS NOT NULL;
CREATE INDEX idx_saved_replies_category ON saved_replies(workspace_id, category) WHERE category IS NOT NULL;
CREATE INDEX idx_saved_replies_use_count ON saved_replies(workspace_id, use_count DESC);

-- Inbox views indexes
CREATE INDEX idx_inbox_views_workspace_id ON inbox_views(workspace_id);
CREATE INDEX idx_inbox_views_created_by ON inbox_views(created_by);
CREATE INDEX idx_inbox_views_is_shared ON inbox_views(workspace_id, is_shared) WHERE is_shared = true;
CREATE INDEX idx_inbox_views_is_default ON inbox_views(created_by, is_default) WHERE is_default = true;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE inbox_tags IS 'Tags for organizing and categorizing inbox conversations';
COMMENT ON TABLE conversation_tags IS 'Many-to-many relationship between conversations and tags';
COMMENT ON TABLE inbox_assignments IS 'Task assignments for team collaboration on conversations';
COMMENT ON TABLE inbox_rules IS 'Automation rules for inbox management';
COMMENT ON TABLE inbox_rule_executions IS 'Audit log of rule executions';
COMMENT ON TABLE saved_replies IS 'Pre-written reply templates for quick responses';
COMMENT ON TABLE inbox_views IS 'Saved filter configurations for inbox views';

COMMENT ON FUNCTION update_tag_usage_count IS 'Updates conversation count when tags are added/removed';
COMMENT ON FUNCTION sync_conversation_assignment IS 'Keeps conversation assigned_to field in sync with inbox_assignments';
COMMENT ON FUNCTION increment_saved_reply_usage IS 'Increments use count when a saved reply is used';
COMMENT ON FUNCTION evaluate_inbox_rule IS 'Evaluates whether a rule should be executed for a message';
