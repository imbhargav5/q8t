-- Workspace Refactor - Add Multi-Tenancy to Existing Tables
-- This migration adds workspace_id to existing tables while maintaining backward compatibility

-- ============================================================================
-- ADD WORKSPACE_ID TO EXISTING TABLES
-- ============================================================================

-- Add workspace_id to social_accounts
ALTER TABLE social_accounts
  ADD COLUMN workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE;

-- Add workspace_id to posts
ALTER TABLE posts
  ADD COLUMN workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE;

-- Add workspace_id to post_publications (denormalized for performance)
ALTER TABLE post_publications
  ADD COLUMN workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE;

-- Add workspace_id to media_assets
ALTER TABLE media_assets
  ADD COLUMN workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE;

-- ============================================================================
-- CREATE DEFAULT WORKSPACES FOR EXISTING USERS
-- ============================================================================

-- Function to create default workspace for a user and migrate their data
CREATE OR REPLACE FUNCTION create_default_workspace_for_user(user_uuid UUID)
RETURNS UUID AS $$
DECLARE
  new_workspace_id UUID;
  user_email TEXT;
  workspace_slug TEXT;
BEGIN
  -- Get user email
  SELECT email INTO user_email FROM users WHERE id = user_uuid;

  -- Generate unique slug from email
  workspace_slug := LOWER(REGEXP_REPLACE(SPLIT_PART(user_email, '@', 1), '[^a-z0-9]', '-', 'g'));
  workspace_slug := workspace_slug || '-' || SUBSTRING(user_uuid::TEXT FROM 1 FOR 8);

  -- Create workspace
  INSERT INTO workspaces (name, slug, created_by, plan)
  VALUES (
    COALESCE((SELECT full_name FROM users WHERE id = user_uuid), 'My Workspace'),
    workspace_slug,
    user_uuid,
    'free'
  )
  RETURNING id INTO new_workspace_id;

  -- Add user as owner
  INSERT INTO workspace_members (workspace_id, user_id, role, status, joined_at)
  VALUES (new_workspace_id, user_uuid, 'owner', 'active', NOW());

  -- Migrate user's social accounts to the workspace
  UPDATE social_accounts
  SET workspace_id = new_workspace_id
  WHERE user_id = user_uuid AND workspace_id IS NULL;

  -- Migrate user's posts to the workspace
  UPDATE posts
  SET workspace_id = new_workspace_id
  WHERE user_id = user_uuid AND workspace_id IS NULL;

  -- Migrate user's post_publications to the workspace
  UPDATE post_publications pp
  SET workspace_id = new_workspace_id
  FROM posts p
  WHERE pp.post_id = p.id
  AND p.user_id = user_uuid
  AND pp.workspace_id IS NULL;

  -- Migrate user's media_assets to the workspace
  UPDATE media_assets
  SET workspace_id = new_workspace_id
  WHERE user_id = user_uuid AND workspace_id IS NULL;

  RETURN new_workspace_id;
END;
$$ LANGUAGE plpgsql;

-- Migrate all existing users' data to default workspaces
DO $$
DECLARE
  user_record RECORD;
BEGIN
  FOR user_record IN SELECT id FROM users LOOP
    PERFORM create_default_workspace_for_user(user_record.id);
  END LOOP;
END $$;

-- ============================================================================
-- MAKE WORKSPACE_ID NOT NULL AFTER MIGRATION
-- ============================================================================

-- Now that all data is migrated, make workspace_id NOT NULL
ALTER TABLE social_accounts
  ALTER COLUMN workspace_id SET NOT NULL;

ALTER TABLE posts
  ALTER COLUMN workspace_id SET NOT NULL;

ALTER TABLE post_publications
  ALTER COLUMN workspace_id SET NOT NULL;

ALTER TABLE media_assets
  ALTER COLUMN workspace_id SET NOT NULL;

-- ============================================================================
-- UPDATE UNIQUE CONSTRAINTS
-- ============================================================================

-- Update social_accounts unique constraint to include workspace_id
ALTER TABLE social_accounts
  DROP CONSTRAINT social_accounts_user_id_platform_platform_user_id_key;

ALTER TABLE social_accounts
  ADD CONSTRAINT social_accounts_workspace_platform_user_unique
  UNIQUE(workspace_id, platform, platform_user_id);

-- Update post_publications unique constraint to include workspace_id
ALTER TABLE post_publications
  DROP CONSTRAINT post_publications_post_id_social_account_id_key;

ALTER TABLE post_publications
  ADD CONSTRAINT post_publications_post_account_unique
  UNIQUE(post_id, social_account_id);

-- ============================================================================
-- DROP OLD RLS POLICIES (will recreate workspace-aware ones)
-- ============================================================================

-- Drop old social_accounts policies
DROP POLICY IF EXISTS "Users can view own social accounts" ON social_accounts;
DROP POLICY IF EXISTS "Users can insert own social accounts" ON social_accounts;
DROP POLICY IF EXISTS "Users can update own social accounts" ON social_accounts;
DROP POLICY IF EXISTS "Users can delete own social accounts" ON social_accounts;

-- Drop old posts policies
DROP POLICY IF EXISTS "Users can view own posts" ON posts;
DROP POLICY IF EXISTS "Users can insert own posts" ON posts;
DROP POLICY IF EXISTS "Users can update own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete own posts" ON posts;

-- Drop old post_publications policies
DROP POLICY IF EXISTS "Users can view own post publications" ON post_publications;
DROP POLICY IF EXISTS "Users can insert own post publications" ON post_publications;
DROP POLICY IF EXISTS "Users can update own post publications" ON post_publications;
DROP POLICY IF EXISTS "Users can delete own post publications" ON post_publications;

-- Drop old media_assets policies
DROP POLICY IF EXISTS "Users can view own media assets" ON media_assets;
DROP POLICY IF EXISTS "Users can insert own media assets" ON media_assets;
DROP POLICY IF EXISTS "Users can update own media assets" ON media_assets;
DROP POLICY IF EXISTS "Users can delete own media assets" ON media_assets;

-- ============================================================================
-- CREATE NEW WORKSPACE-AWARE RLS POLICIES
-- ============================================================================

-- Social accounts policies
CREATE POLICY "Workspace members can view social accounts"
  ON social_accounts
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can insert social accounts"
  ON social_accounts
  FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can update social accounts"
  ON social_accounts
  FOR UPDATE
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can delete social accounts"
  ON social_accounts
  FOR DELETE
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Posts policies
CREATE POLICY "Workspace members can view posts"
  ON posts
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can insert posts"
  ON posts
  FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can update posts"
  ON posts
  FOR UPDATE
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can delete posts"
  ON posts
  FOR DELETE
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Post publications policies
CREATE POLICY "Workspace members can view post publications"
  ON post_publications
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can insert post publications"
  ON post_publications
  FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can update post publications"
  ON post_publications
  FOR UPDATE
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can delete post publications"
  ON post_publications
  FOR DELETE
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Media assets policies
CREATE POLICY "Workspace members can view media assets"
  ON media_assets
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can insert media assets"
  ON media_assets
  FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can update media assets"
  ON media_assets
  FOR UPDATE
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can delete media assets"
  ON media_assets
  FOR DELETE
  USING (is_workspace_member(workspace_id, auth.uid()));

-- ============================================================================
-- ADD NEW INDEXES FOR WORKSPACE QUERIES
-- ============================================================================

-- Social accounts workspace indexes
CREATE INDEX idx_social_accounts_workspace_id ON social_accounts(workspace_id);
CREATE INDEX idx_social_accounts_workspace_platform ON social_accounts(workspace_id, platform);
CREATE INDEX idx_social_accounts_workspace_active ON social_accounts(workspace_id, is_active) WHERE is_active = true;

-- Posts workspace indexes
CREATE INDEX idx_posts_workspace_id ON posts(workspace_id);
CREATE INDEX idx_posts_workspace_status ON posts(workspace_id, status);
CREATE INDEX idx_posts_workspace_created_at ON posts(workspace_id, created_at DESC);

-- Post publications workspace indexes
CREATE INDEX idx_post_publications_workspace_id ON post_publications(workspace_id);
CREATE INDEX idx_post_publications_workspace_status ON post_publications(workspace_id, status);

-- Media assets workspace indexes
CREATE INDEX idx_media_assets_workspace_id ON media_assets(workspace_id);
CREATE INDEX idx_media_assets_workspace_type ON media_assets(workspace_id, type);
CREATE INDEX idx_media_assets_workspace_created_at ON media_assets(workspace_id, created_at DESC);

-- ============================================================================
-- STORAGE USAGE TRACKING FUNCTION
-- ============================================================================

-- Function to update workspace storage usage
CREATE OR REPLACE FUNCTION update_workspace_storage_usage()
RETURNS TRIGGER AS $$
DECLARE
  workspace_uuid UUID;
  size_delta BIGINT;
BEGIN
  -- Determine workspace and size change
  IF TG_OP = 'DELETE' THEN
    workspace_uuid := OLD.workspace_id;
    size_delta := -OLD.size_bytes;
  ELSIF TG_OP = 'INSERT' THEN
    workspace_uuid := NEW.workspace_id;
    size_delta := NEW.size_bytes;
  ELSIF TG_OP = 'UPDATE' THEN
    workspace_uuid := NEW.workspace_id;
    size_delta := NEW.size_bytes - OLD.size_bytes;
  END IF;

  -- Update workspace storage usage
  UPDATE workspaces
  SET storage_used_bytes = storage_used_bytes + size_delta
  WHERE id = workspace_uuid;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to track media asset storage usage
CREATE TRIGGER track_media_storage_usage
  AFTER INSERT OR UPDATE OR DELETE ON media_assets
  FOR EACH ROW
  EXECUTE FUNCTION update_workspace_storage_usage();

-- Calculate and set initial storage usage for all workspaces
UPDATE workspaces w
SET storage_used_bytes = COALESCE(
  (SELECT SUM(size_bytes) FROM media_assets WHERE workspace_id = w.id),
  0
);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON COLUMN social_accounts.workspace_id IS 'Workspace that owns this social account';
COMMENT ON COLUMN posts.workspace_id IS 'Workspace that owns this post';
COMMENT ON COLUMN post_publications.workspace_id IS 'Workspace that owns this publication (denormalized)';
COMMENT ON COLUMN media_assets.workspace_id IS 'Workspace that owns this media asset';

COMMENT ON FUNCTION create_default_workspace_for_user IS 'Creates a default workspace for a user and migrates their data';
COMMENT ON FUNCTION update_workspace_storage_usage IS 'Updates workspace storage usage when media assets are added/removed';
