-- CRM Segments - Smart Contact Lists and Filters
-- This migration creates the segmentation system for organizing contacts

-- Create enum for segment types
CREATE TYPE crm_segment_type AS ENUM ('static', 'dynamic');

-- ============================================================================
-- CRM SEGMENTS TABLE
-- ============================================================================

CREATE TABLE crm_segments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Segment metadata
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Emoji or icon identifier

  -- Segment type
  segment_type crm_segment_type DEFAULT 'dynamic' NOT NULL,

  -- Filter configuration (JSONB for flexible query building)
  filters JSONB DEFAULT '{}' NOT NULL,
  -- Example filters structure:
  -- {
  --   "conditions": [
  --     {"field": "is_vip", "operator": "equals", "value": true},
  --     {"field": "total_messages", "operator": "greater_than", "value": 10}
  --   ],
  --   "logic": "AND" // or "OR"
  -- }

  -- Sort configuration
  sort_by TEXT DEFAULT 'last_contact_at',
  sort_order TEXT DEFAULT 'desc', -- 'asc' or 'desc'

  -- Static segment members (only for static segments)
  member_ids UUID[], -- Array of person IDs for static segments

  -- Metadata
  is_system BOOLEAN DEFAULT false NOT NULL, -- System-generated segments
  is_favorite BOOLEAN DEFAULT false NOT NULL,
  color TEXT, -- Color coding for UI

  -- Creator tracking
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Usage tracking
  last_accessed_at TIMESTAMPTZ,
  access_count INTEGER DEFAULT 0 NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- CRM SEGMENT MEMBERS (for static segments)
-- ============================================================================

CREATE TABLE crm_segment_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  segment_id UUID NOT NULL REFERENCES crm_segments(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES crm_people(id) ON DELETE CASCADE,

  -- Added by tracking
  added_by UUID REFERENCES users(id) ON DELETE SET NULL,
  added_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(segment_id, person_id)
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_crm_segments_updated_at BEFORE UPDATE ON crm_segments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to evaluate segment filters and return matching person IDs
CREATE OR REPLACE FUNCTION evaluate_segment_filters(
  segment_uuid UUID,
  workspace_uuid UUID
)
RETURNS TABLE (person_id UUID) AS $$
DECLARE
  segment_filters JSONB;
  segment_type_val crm_segment_type;
  query TEXT;
BEGIN
  -- Get segment details
  SELECT s.filters, s.segment_type, s.member_ids
  INTO segment_filters, segment_type_val
  FROM crm_segments s
  WHERE s.id = segment_uuid;

  -- For static segments, return member_ids
  IF segment_type_val = 'static' THEN
    RETURN QUERY
    SELECT sm.person_id
    FROM crm_segment_members sm
    WHERE sm.segment_id = segment_uuid;
    RETURN;
  END IF;

  -- For dynamic segments, evaluate filters
  -- This is a simplified version - in production, you'd build dynamic SQL based on filters
  RETURN QUERY
  SELECT p.id
  FROM crm_people p
  WHERE p.workspace_id = workspace_uuid;
  -- TODO: Add dynamic filter evaluation based on segment_filters JSONB
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get segment contact count
CREATE OR REPLACE FUNCTION get_segment_count(segment_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  segment_type_val crm_segment_type;
  contact_count INTEGER;
BEGIN
  SELECT segment_type INTO segment_type_val
  FROM crm_segments
  WHERE id = segment_uuid;

  IF segment_type_val = 'static' THEN
    SELECT COUNT(*)::INTEGER INTO contact_count
    FROM crm_segment_members
    WHERE segment_id = segment_uuid;
  ELSE
    -- For dynamic segments, count matching people
    SELECT COUNT(*)::INTEGER INTO contact_count
    FROM evaluate_segment_filters(segment_uuid,
      (SELECT workspace_id FROM crm_segments WHERE id = segment_uuid)
    );
  END IF;

  RETURN contact_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add person to static segment
CREATE OR REPLACE FUNCTION add_person_to_segment(
  segment_uuid UUID,
  person_uuid UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  INSERT INTO crm_segment_members (segment_id, person_id, added_by)
  VALUES (segment_uuid, person_uuid, auth.uid())
  ON CONFLICT (segment_id, person_id) DO NOTHING;

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to remove person from static segment
CREATE OR REPLACE FUNCTION remove_person_from_segment(
  segment_uuid UUID,
  person_uuid UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  DELETE FROM crm_segment_members
  WHERE segment_id = segment_uuid AND person_id = person_uuid;

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- SEED SYSTEM SEGMENTS
-- ============================================================================

-- Function to create default system segments for a workspace
CREATE OR REPLACE FUNCTION create_default_segments(workspace_uuid UUID)
RETURNS VOID AS $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Get a workspace admin to set as creator
  SELECT user_id INTO admin_user_id
  FROM workspace_members
  WHERE workspace_id = workspace_uuid
    AND role IN ('owner', 'admin')
  LIMIT 1;

  IF admin_user_id IS NULL THEN
    RETURN;
  END IF;

  -- All Contacts
  INSERT INTO crm_segments (workspace_id, name, description, icon, segment_type, filters, is_system, created_by)
  VALUES (
    workspace_uuid,
    'All Contacts',
    'All contacts in your workspace',
    '👥',
    'dynamic',
    '{"conditions": [], "logic": "AND"}'::jsonb,
    true,
    admin_user_id
  );

  -- VIP Contacts
  INSERT INTO crm_segments (workspace_id, name, description, icon, segment_type, filters, is_system, created_by)
  VALUES (
    workspace_uuid,
    'VIP Contacts',
    'High-value contacts marked as VIP',
    '⭐',
    'dynamic',
    '{"conditions": [{"field": "is_vip", "operator": "equals", "value": true}], "logic": "AND"}'::jsonb,
    true,
    admin_user_id
  );

  -- Active Contacts (30 days)
  INSERT INTO crm_segments (workspace_id, name, description, icon, segment_type, filters, is_system, created_by)
  VALUES (
    workspace_uuid,
    'Active (30d)',
    'Contacts active in the last 30 days',
    '🟢',
    'dynamic',
    '{"conditions": [{"field": "last_contact_at", "operator": "greater_than", "value": "30_days_ago"}], "logic": "AND"}'::jsonb,
    true,
    admin_user_id
  );

  -- Inactive Contacts (90+ days)
  INSERT INTO crm_segments (workspace_id, name, description, icon, segment_type, filters, is_system, created_by)
  VALUES (
    workspace_uuid,
    'Inactive (90d+)',
    'Contacts with no activity in 90+ days',
    '😴',
    'dynamic',
    '{"conditions": [{"field": "last_contact_at", "operator": "less_than", "value": "90_days_ago"}], "logic": "AND"}'::jsonb,
    true,
    admin_user_id
  );

  -- High Engagement
  INSERT INTO crm_segments (workspace_id, name, description, icon, segment_type, filters, is_system, created_by)
  VALUES (
    workspace_uuid,
    'High Engagement',
    'Contacts with 10+ messages',
    '🔥',
    'dynamic',
    '{"conditions": [{"field": "total_messages", "operator": "greater_than", "value": 10}], "logic": "AND"}'::jsonb,
    true,
    admin_user_id
  );

  -- Verified
  INSERT INTO crm_segments (workspace_id, name, description, icon, segment_type, filters, is_system, created_by)
  VALUES (
    workspace_uuid,
    'Verified',
    'Verified contacts',
    '✅',
    'dynamic',
    '{"conditions": [{"field": "is_verified", "operator": "equals", "value": true}], "logic": "AND"}'::jsonb,
    true,
    admin_user_id
  );

  -- Blocked
  INSERT INTO crm_segments (workspace_id, name, description, icon, segment_type, filters, is_system, created_by)
  VALUES (
    workspace_uuid,
    'Blocked',
    'Blocked contacts',
    '🚫',
    'dynamic',
    '{"conditions": [{"field": "is_blocked", "operator": "equals", "value": true}], "logic": "AND"}'::jsonb,
    true,
    admin_user_id
  );
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_crm_segments_workspace_id ON crm_segments(workspace_id);
CREATE INDEX idx_crm_segments_created_by ON crm_segments(created_by);
CREATE INDEX idx_crm_segments_segment_type ON crm_segments(segment_type);
CREATE INDEX idx_crm_segments_is_system ON crm_segments(workspace_id, is_system);
CREATE INDEX idx_crm_segments_is_favorite ON crm_segments(workspace_id, is_favorite) WHERE is_favorite = true;
CREATE INDEX idx_crm_segments_filters ON crm_segments USING GIN (filters);

CREATE INDEX idx_crm_segment_members_segment_id ON crm_segment_members(segment_id);
CREATE INDEX idx_crm_segment_members_person_id ON crm_segment_members(person_id);
CREATE INDEX idx_crm_segment_members_added_by ON crm_segment_members(added_by);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE crm_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_segment_members ENABLE ROW LEVEL SECURITY;

-- Segments policies
CREATE POLICY "Workspace members can view segments"
  ON crm_segments
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can create segments"
  ON crm_segments
  FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Segment creators and admins can update segments"
  ON crm_segments
  FOR UPDATE
  USING (
    created_by = auth.uid() OR
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  );

CREATE POLICY "Segment creators and admins can delete non-system segments"
  ON crm_segments
  FOR DELETE
  USING (
    is_system = false AND (
      created_by = auth.uid() OR
      has_workspace_role(workspace_id, auth.uid(), 'admin')
    )
  );

-- Segment members policies
CREATE POLICY "Workspace members can view segment members"
  ON crm_segment_members
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM crm_segments s
      WHERE s.id = segment_id AND is_workspace_member(s.workspace_id, auth.uid())
    )
  );

CREATE POLICY "Workspace members can add segment members"
  ON crm_segment_members
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM crm_segments s
      WHERE s.id = segment_id AND is_workspace_member(s.workspace_id, auth.uid())
    )
  );

CREATE POLICY "Workspace members can remove segment members"
  ON crm_segment_members
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM crm_segments s
      WHERE s.id = segment_id AND is_workspace_member(s.workspace_id, auth.uid())
    )
  );

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE crm_segments IS 'Smart contact lists and filters for CRM organization';
COMMENT ON TABLE crm_segment_members IS 'Members of static segments';
COMMENT ON COLUMN crm_segments.filters IS 'JSONB query builder configuration for dynamic segments';
COMMENT ON COLUMN crm_segments.segment_type IS 'Static segments have fixed members, dynamic segments use filters';
COMMENT ON FUNCTION create_default_segments IS 'Create system segments for a new workspace';
COMMENT ON FUNCTION evaluate_segment_filters IS 'Evaluate segment filters and return matching person IDs';
COMMENT ON FUNCTION get_segment_count IS 'Get the contact count for a segment';
