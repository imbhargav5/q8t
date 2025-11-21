-- CRM Core - People, Social Identities, and Notes
-- This migration creates the CRM foundation for contact management

-- Create enum types for CRM
CREATE TYPE crm_person_note_type AS ENUM ('general', 'customer_info', 'preferences', 'internal', 'alert');
CREATE TYPE crm_note_visibility AS ENUM ('private', 'team');

-- ============================================================================
-- CRM PEOPLE TABLE
-- ============================================================================

CREATE TABLE crm_people (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Core identity fields
  email TEXT, -- Primary identifier for person unification
  full_name TEXT,
  display_name TEXT,
  avatar_url TEXT,

  -- Contact information
  phone TEXT,
  location TEXT,
  timezone TEXT,
  language TEXT,

  -- Profile information
  bio TEXT,
  company TEXT,
  job_title TEXT,
  website_url TEXT,

  -- Engagement metrics
  first_contact_at TIMESTAMPTZ,
  last_contact_at TIMESTAMPTZ,
  total_messages INTEGER DEFAULT 0 NOT NULL,
  total_conversations INTEGER DEFAULT 0 NOT NULL,

  -- Flags
  is_vip BOOLEAN DEFAULT false NOT NULL,
  is_verified BOOLEAN DEFAULT false NOT NULL,
  is_blocked BOOLEAN DEFAULT false NOT NULL,

  -- Tags and categorization
  tags TEXT[] DEFAULT '{}',

  -- Custom fields (flexible JSONB storage)
  custom_fields JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}', -- Platform-agnostic metadata

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Unique constraint on workspace + email combination
  UNIQUE(workspace_id, email)
);

-- ============================================================================
-- CRM SOCIAL IDENTITIES TABLE
-- ============================================================================

CREATE TABLE crm_social_identities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES crm_people(id) ON DELETE CASCADE,
  social_account_id UUID REFERENCES social_accounts(id) ON DELETE SET NULL, -- Link to connected account

  -- Platform identity
  platform social_platform NOT NULL,
  platform_user_id TEXT NOT NULL,
  platform_username TEXT,
  platform_display_name TEXT,

  -- Profile information
  profile_url TEXT,
  avatar_url TEXT,
  bio TEXT,

  -- Social metrics
  follower_count INTEGER,
  following_count INTEGER,
  post_count INTEGER,
  is_verified BOOLEAN DEFAULT false NOT NULL,
  is_business_account BOOLEAN DEFAULT false NOT NULL,

  -- Activity tracking
  first_seen_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_seen_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_message_at TIMESTAMPTZ,

  -- Platform-specific data (JSONB for flexibility)
  platform_data JSONB DEFAULT '{}', -- Store platform-specific fields

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Unique constraint: one identity per platform per person
  UNIQUE(workspace_id, platform, platform_user_id)
);

-- ============================================================================
-- CRM PERSON NOTES TABLE
-- ============================================================================

CREATE TABLE crm_person_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES crm_people(id) ON DELETE CASCADE,

  -- Note content
  content TEXT NOT NULL,
  note_type crm_person_note_type DEFAULT 'general' NOT NULL,
  visibility crm_note_visibility DEFAULT 'team' NOT NULL,

  -- Author tracking
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Organization
  is_pinned BOOLEAN DEFAULT false NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_crm_people_updated_at BEFORE UPDATE ON crm_people
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_social_identities_updated_at BEFORE UPDATE ON crm_social_identities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_person_notes_updated_at BEFORE UPDATE ON crm_person_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to find or create person by email
CREATE OR REPLACE FUNCTION find_or_create_person_by_email(
  workspace_uuid UUID,
  person_email TEXT,
  person_name TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  person_uuid UUID;
BEGIN
  -- Try to find existing person by email
  SELECT id INTO person_uuid
  FROM crm_people
  WHERE workspace_id = workspace_uuid
  AND email = person_email;

  -- If not found, create new person
  IF person_uuid IS NULL THEN
    INSERT INTO crm_people (workspace_id, email, full_name, first_contact_at)
    VALUES (workspace_uuid, person_email, person_name, NOW())
    RETURNING id INTO person_uuid;
  END IF;

  RETURN person_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to find or create person by social identity
CREATE OR REPLACE FUNCTION find_or_create_person_by_social_identity(
  workspace_uuid UUID,
  platform_name social_platform,
  platform_uid TEXT,
  platform_uname TEXT DEFAULT NULL,
  platform_dname TEXT DEFAULT NULL,
  person_email TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  person_uuid UUID;
  identity_uuid UUID;
BEGIN
  -- Try to find existing social identity
  SELECT person_id INTO person_uuid
  FROM crm_social_identities
  WHERE workspace_id = workspace_uuid
  AND platform = platform_name
  AND platform_user_id = platform_uid;

  -- If identity exists, return the person
  IF person_uuid IS NOT NULL THEN
    -- Update last_seen_at
    UPDATE crm_social_identities
    SET last_seen_at = NOW(),
        platform_username = COALESCE(platform_uname, platform_username),
        platform_display_name = COALESCE(platform_dname, platform_display_name)
    WHERE workspace_id = workspace_uuid
    AND platform = platform_name
    AND platform_user_id = platform_uid;

    RETURN person_uuid;
  END IF;

  -- If email provided, try to find person by email
  IF person_email IS NOT NULL THEN
    person_uuid := find_or_create_person_by_email(workspace_uuid, person_email, platform_dname);
  ELSE
    -- Create new person without email
    INSERT INTO crm_people (workspace_id, full_name, display_name, first_contact_at)
    VALUES (workspace_uuid, platform_dname, platform_dname, NOW())
    RETURNING id INTO person_uuid;
  END IF;

  -- Create social identity
  INSERT INTO crm_social_identities (
    workspace_id,
    person_id,
    platform,
    platform_user_id,
    platform_username,
    platform_display_name
  ) VALUES (
    workspace_uuid,
    person_uuid,
    platform_name,
    platform_uid,
    platform_uname,
    platform_dname
  );

  RETURN person_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to merge duplicate people
CREATE OR REPLACE FUNCTION merge_crm_people(
  primary_person_uuid UUID,
  duplicate_person_uuid UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Move all social identities to primary person
  UPDATE crm_social_identities
  SET person_id = primary_person_uuid
  WHERE person_id = duplicate_person_uuid;

  -- Move all person notes to primary person
  UPDATE crm_person_notes
  SET person_id = primary_person_uuid
  WHERE person_id = duplicate_person_uuid;

  -- Update conversation references (will be created in next migration)
  -- This is a forward reference, will be handled when inbox tables exist

  -- Merge engagement metrics
  UPDATE crm_people
  SET
    total_messages = total_messages + (SELECT total_messages FROM crm_people WHERE id = duplicate_person_uuid),
    total_conversations = total_conversations + (SELECT total_conversations FROM crm_people WHERE id = duplicate_person_uuid),
    first_contact_at = LEAST(first_contact_at, (SELECT first_contact_at FROM crm_people WHERE id = duplicate_person_uuid)),
    last_contact_at = GREATEST(last_contact_at, (SELECT last_contact_at FROM crm_people WHERE id = duplicate_person_uuid))
  WHERE id = primary_person_uuid;

  -- Delete duplicate person
  DELETE FROM crm_people WHERE id = duplicate_person_uuid;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE crm_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_social_identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_person_notes ENABLE ROW LEVEL SECURITY;

-- CRM People policies
CREATE POLICY "Workspace members can view people"
  ON crm_people
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can insert people"
  ON crm_people
  FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can update people"
  ON crm_people
  FOR UPDATE
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can delete people"
  ON crm_people
  FOR DELETE
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Social identities policies
CREATE POLICY "Workspace members can view social identities"
  ON crm_social_identities
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can insert social identities"
  ON crm_social_identities
  FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can update social identities"
  ON crm_social_identities
  FOR UPDATE
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can delete social identities"
  ON crm_social_identities
  FOR DELETE
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Person notes policies
CREATE POLICY "Team members can view team notes"
  ON crm_person_notes
  FOR SELECT
  USING (
    is_workspace_member(workspace_id, auth.uid())
    AND (visibility = 'team' OR author_id = auth.uid())
  );

CREATE POLICY "Workspace members can insert notes"
  ON crm_person_notes
  FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Note authors can update their notes"
  ON crm_person_notes
  FOR UPDATE
  USING (author_id = auth.uid());

CREATE POLICY "Note authors and admins can delete notes"
  ON crm_person_notes
  FOR DELETE
  USING (
    author_id = auth.uid() OR
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  );

-- ============================================================================
-- INDEXES
-- ============================================================================

-- CRM People indexes
CREATE INDEX idx_crm_people_workspace_id ON crm_people(workspace_id);
CREATE INDEX idx_crm_people_email ON crm_people(email);
CREATE INDEX idx_crm_people_workspace_email ON crm_people(workspace_id, email);
CREATE INDEX idx_crm_people_full_name ON crm_people(full_name);
CREATE INDEX idx_crm_people_is_vip ON crm_people(workspace_id, is_vip) WHERE is_vip = true;
CREATE INDEX idx_crm_people_is_blocked ON crm_people(workspace_id, is_blocked) WHERE is_blocked = true;
CREATE INDEX idx_crm_people_last_contact_at ON crm_people(workspace_id, last_contact_at DESC NULLS LAST);
CREATE INDEX idx_crm_people_created_at ON crm_people(workspace_id, created_at DESC);
CREATE INDEX idx_crm_people_tags ON crm_people USING GIN (tags);
CREATE INDEX idx_crm_people_custom_fields ON crm_people USING GIN (custom_fields);
CREATE INDEX idx_crm_people_metadata ON crm_people USING GIN (metadata);

-- Text search index for people
CREATE INDEX idx_crm_people_full_name_trgm ON crm_people USING GIN (full_name gin_trgm_ops);
CREATE INDEX idx_crm_people_email_trgm ON crm_people USING GIN (email gin_trgm_ops);

-- CRM Social Identities indexes
CREATE INDEX idx_crm_social_identities_workspace_id ON crm_social_identities(workspace_id);
CREATE INDEX idx_crm_social_identities_person_id ON crm_social_identities(person_id);
CREATE INDEX idx_crm_social_identities_platform ON crm_social_identities(platform);
CREATE INDEX idx_crm_social_identities_workspace_platform ON crm_social_identities(workspace_id, platform);
CREATE INDEX idx_crm_social_identities_platform_user_id ON crm_social_identities(platform, platform_user_id);
CREATE INDEX idx_crm_social_identities_platform_username ON crm_social_identities(platform, platform_username);
CREATE INDEX idx_crm_social_identities_social_account_id ON crm_social_identities(social_account_id);
CREATE INDEX idx_crm_social_identities_last_seen_at ON crm_social_identities(workspace_id, last_seen_at DESC);
CREATE INDEX idx_crm_social_identities_platform_data ON crm_social_identities USING GIN (platform_data);

-- CRM Person Notes indexes
CREATE INDEX idx_crm_person_notes_workspace_id ON crm_person_notes(workspace_id);
CREATE INDEX idx_crm_person_notes_person_id ON crm_person_notes(person_id);
CREATE INDEX idx_crm_person_notes_author_id ON crm_person_notes(author_id);
CREATE INDEX idx_crm_person_notes_note_type ON crm_person_notes(note_type);
CREATE INDEX idx_crm_person_notes_visibility ON crm_person_notes(visibility);
CREATE INDEX idx_crm_person_notes_is_pinned ON crm_person_notes(person_id, is_pinned) WHERE is_pinned = true;
CREATE INDEX idx_crm_person_notes_created_at ON crm_person_notes(person_id, created_at DESC);

-- ============================================================================
-- ENABLE PG_TRGM EXTENSION FOR FUZZY SEARCH
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE crm_people IS 'Unified contact records across all platforms';
COMMENT ON TABLE crm_social_identities IS 'Platform-specific social media profiles linked to people';
COMMENT ON TABLE crm_person_notes IS 'Internal notes about people for team collaboration';

COMMENT ON COLUMN crm_people.email IS 'Primary identifier for person unification across platforms';
COMMENT ON COLUMN crm_people.is_vip IS 'Flag for VIP customers requiring special attention';
COMMENT ON COLUMN crm_people.custom_fields IS 'Flexible JSONB storage for workspace-specific custom fields';

COMMENT ON COLUMN crm_social_identities.platform_data IS 'Platform-specific metadata (e.g., Twitter blue checkmark, Instagram business category)';
COMMENT ON COLUMN crm_social_identities.social_account_id IS 'Link to connected social account if this identity belongs to workspace';

COMMENT ON FUNCTION find_or_create_person_by_email IS 'Find existing person by email or create new one';
COMMENT ON FUNCTION find_or_create_person_by_social_identity IS 'Find or create person by social platform identity';
COMMENT ON FUNCTION merge_crm_people IS 'Merge duplicate person records and move all related data';
