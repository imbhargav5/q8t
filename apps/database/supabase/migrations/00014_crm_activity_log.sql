-- CRM Activity Log - Timeline and Audit Trail
-- This migration creates the activity logging system for tracking all CRM interactions

-- Create enum for activity types
CREATE TYPE crm_activity_type AS ENUM (
  'person_created',
  'person_updated',
  'person_deleted',
  'profile_updated',
  'tag_added',
  'tag_removed',
  'note_added',
  'note_updated',
  'note_deleted',
  'social_identity_added',
  'social_identity_removed',
  'vip_status_changed',
  'blocked_status_changed',
  'verified_status_changed',
  'conversation_started',
  'conversation_resolved',
  'message_sent',
  'message_received',
  'assigned_to_user',
  'unassigned_from_user',
  'custom_field_updated',
  'merged_with_person',
  'exported',
  'imported',
  'bulk_action'
);

-- ============================================================================
-- CRM ACTIVITY LOG TABLE
-- ============================================================================

CREATE TABLE crm_activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  person_id UUID REFERENCES crm_people(id) ON DELETE CASCADE,

  -- Activity details
  activity_type crm_activity_type NOT NULL,
  activity_description TEXT, -- Human-readable description

  -- Activity data (flexible JSONB for different activity types)
  activity_data JSONB DEFAULT '{}',

  -- Actor tracking
  performed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  performed_by_name TEXT, -- Denormalized for historical record

  -- Related entities (optional references)
  related_conversation_id UUID, -- Reference to conversation if applicable
  related_note_id UUID, -- Reference to note if applicable
  related_message_id UUID, -- Reference to message if applicable

  -- Visibility
  is_visible_in_timeline BOOLEAN DEFAULT true NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_crm_activity_log_workspace_id ON crm_activity_log(workspace_id);
CREATE INDEX idx_crm_activity_log_person_id ON crm_activity_log(person_id);
CREATE INDEX idx_crm_activity_log_activity_type ON crm_activity_log(activity_type);
CREATE INDEX idx_crm_activity_log_performed_by ON crm_activity_log(performed_by);
CREATE INDEX idx_crm_activity_log_created_at ON crm_activity_log(person_id, created_at DESC);
CREATE INDEX idx_crm_activity_log_timeline ON crm_activity_log(person_id, is_visible_in_timeline, created_at DESC)
  WHERE is_visible_in_timeline = true;
CREATE INDEX idx_crm_activity_log_activity_data ON crm_activity_log USING GIN (activity_data);

-- ============================================================================
-- TRIGGERS FOR AUTO-LOGGING
-- ============================================================================

-- Function to log person updates
CREATE OR REPLACE FUNCTION log_person_update()
RETURNS TRIGGER AS $$
DECLARE
  changed_fields JSONB;
  description TEXT;
BEGIN
  -- Build changed fields JSON
  changed_fields := jsonb_build_object();

  IF OLD.full_name IS DISTINCT FROM NEW.full_name THEN
    changed_fields := changed_fields || jsonb_build_object('full_name', jsonb_build_object('old', OLD.full_name, 'new', NEW.full_name));
  END IF;

  IF OLD.email IS DISTINCT FROM NEW.email THEN
    changed_fields := changed_fields || jsonb_build_object('email', jsonb_build_object('old', OLD.email, 'new', NEW.email));
  END IF;

  IF OLD.company IS DISTINCT FROM NEW.company THEN
    changed_fields := changed_fields || jsonb_build_object('company', jsonb_build_object('old', OLD.company, 'new', NEW.company));
  END IF;

  IF OLD.job_title IS DISTINCT FROM NEW.job_title THEN
    changed_fields := changed_fields || jsonb_build_object('job_title', jsonb_build_object('old', OLD.job_title, 'new', NEW.job_title));
  END IF;

  IF OLD.is_vip IS DISTINCT FROM NEW.is_vip THEN
    changed_fields := changed_fields || jsonb_build_object('is_vip', jsonb_build_object('old', OLD.is_vip, 'new', NEW.is_vip));

    -- Log VIP status change separately
    INSERT INTO crm_activity_log (
      workspace_id, person_id, activity_type, activity_description, activity_data, performed_by
    ) VALUES (
      NEW.workspace_id,
      NEW.id,
      'vip_status_changed',
      CASE WHEN NEW.is_vip THEN 'Marked as VIP' ELSE 'VIP status removed' END,
      jsonb_build_object('is_vip', NEW.is_vip),
      auth.uid()
    );
  END IF;

  IF OLD.is_blocked IS DISTINCT FROM NEW.is_blocked THEN
    changed_fields := changed_fields || jsonb_build_object('is_blocked', jsonb_build_object('old', OLD.is_blocked, 'new', NEW.is_blocked));

    -- Log blocked status change separately
    INSERT INTO crm_activity_log (
      workspace_id, person_id, activity_type, activity_description, activity_data, performed_by
    ) VALUES (
      NEW.workspace_id,
      NEW.id,
      'blocked_status_changed',
      CASE WHEN NEW.is_blocked THEN 'Contact blocked' ELSE 'Contact unblocked' END,
      jsonb_build_object('is_blocked', NEW.is_blocked),
      auth.uid()
    );
  END IF;

  IF OLD.tags IS DISTINCT FROM NEW.tags THEN
    changed_fields := changed_fields || jsonb_build_object('tags', jsonb_build_object('old', OLD.tags, 'new', NEW.tags));

    -- Log tag changes
    DECLARE
      added_tags TEXT[];
      removed_tags TEXT[];
    BEGIN
      added_tags := ARRAY(SELECT unnest(NEW.tags) EXCEPT SELECT unnest(OLD.tags));
      removed_tags := ARRAY(SELECT unnest(OLD.tags) EXCEPT SELECT unnest(NEW.tags));

      IF array_length(added_tags, 1) > 0 THEN
        INSERT INTO crm_activity_log (
          workspace_id, person_id, activity_type, activity_description, activity_data, performed_by
        ) VALUES (
          NEW.workspace_id,
          NEW.id,
          'tag_added',
          'Tags added: ' || array_to_string(added_tags, ', '),
          jsonb_build_object('tags', added_tags),
          auth.uid()
        );
      END IF;

      IF array_length(removed_tags, 1) > 0 THEN
        INSERT INTO crm_activity_log (
          workspace_id, person_id, activity_type, activity_description, activity_data, performed_by
        ) VALUES (
          NEW.workspace_id,
          NEW.id,
          'tag_removed',
          'Tags removed: ' || array_to_string(removed_tags, ', '),
          jsonb_build_object('tags', removed_tags),
          auth.uid()
        );
      END IF;
    END;
  END IF;

  -- Log general profile update if any fields changed
  IF changed_fields != '{}'::jsonb THEN
    INSERT INTO crm_activity_log (
      workspace_id, person_id, activity_type, activity_description, activity_data, performed_by
    ) VALUES (
      NEW.workspace_id,
      NEW.id,
      'profile_updated',
      'Profile updated',
      changed_fields,
      auth.uid()
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for person updates
CREATE TRIGGER log_crm_person_updates
  AFTER UPDATE ON crm_people
  FOR EACH ROW
  EXECUTE FUNCTION log_person_update();

-- Function to log person creation
CREATE OR REPLACE FUNCTION log_person_creation()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO crm_activity_log (
    workspace_id, person_id, activity_type, activity_description, activity_data, performed_by
  ) VALUES (
    NEW.workspace_id,
    NEW.id,
    'person_created',
    'Contact created',
    jsonb_build_object('email', NEW.email, 'full_name', NEW.full_name),
    auth.uid()
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for person creation
CREATE TRIGGER log_crm_person_creation
  AFTER INSERT ON crm_people
  FOR EACH ROW
  EXECUTE FUNCTION log_person_creation();

-- Function to log social identity additions
CREATE OR REPLACE FUNCTION log_social_identity_creation()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO crm_activity_log (
    workspace_id, person_id, activity_type, activity_description, activity_data, performed_by
  ) VALUES (
    NEW.workspace_id,
    NEW.person_id,
    'social_identity_added',
    'Connected ' || NEW.platform || ' account',
    jsonb_build_object(
      'platform', NEW.platform,
      'username', NEW.platform_username,
      'platform_user_id', NEW.platform_user_id
    ),
    auth.uid()
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for social identity creation
CREATE TRIGGER log_crm_social_identity_creation
  AFTER INSERT ON crm_social_identities
  FOR EACH ROW
  EXECUTE FUNCTION log_social_identity_creation();

-- Function to log note creation
CREATE OR REPLACE FUNCTION log_note_creation()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO crm_activity_log (
    workspace_id, person_id, activity_type, activity_description, activity_data, performed_by, related_note_id
  ) VALUES (
    NEW.workspace_id,
    NEW.person_id,
    'note_added',
    'Note added',
    jsonb_build_object(
      'note_type', NEW.note_type,
      'visibility', NEW.visibility,
      'is_pinned', NEW.is_pinned,
      'content_preview', LEFT(NEW.content, 100)
    ),
    NEW.author_id,
    NEW.id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for note creation
CREATE TRIGGER log_crm_note_creation
  AFTER INSERT ON crm_person_notes
  FOR EACH ROW
  EXECUTE FUNCTION log_note_creation();

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get timeline activities for a person
CREATE OR REPLACE FUNCTION get_person_timeline(
  person_uuid UUID,
  limit_count INTEGER DEFAULT 50,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  activity_type crm_activity_type,
  activity_description TEXT,
  activity_data JSONB,
  performed_by UUID,
  performed_by_name TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.id,
    a.activity_type,
    a.activity_description,
    a.activity_data,
    a.performed_by,
    a.performed_by_name,
    a.created_at
  FROM crm_activity_log a
  WHERE a.person_id = person_uuid
    AND a.is_visible_in_timeline = true
  ORDER BY a.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE crm_activity_log ENABLE ROW LEVEL SECURITY;

-- Workspace members can view activity log
CREATE POLICY "Workspace members can view activity log"
  ON crm_activity_log
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- System can insert activity log (via triggers)
CREATE POLICY "System can insert activity log"
  ON crm_activity_log
  FOR INSERT
  WITH CHECK (true);

-- Only admins can delete activity log
CREATE POLICY "Workspace admins can delete activity log"
  ON crm_activity_log
  FOR DELETE
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE crm_activity_log IS 'Comprehensive activity log for CRM timeline and audit trail';
COMMENT ON COLUMN crm_activity_log.activity_data IS 'Flexible JSONB storage for activity-specific data';
COMMENT ON COLUMN crm_activity_log.is_visible_in_timeline IS 'Whether this activity should appear in user-facing timeline';
COMMENT ON FUNCTION get_person_timeline IS 'Retrieve paginated timeline activities for a person';
