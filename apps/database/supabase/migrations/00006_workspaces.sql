-- Workspaces and Multi-Tenancy
-- This migration adds workspace/organization support for team collaboration

-- Create enum types for workspace features
CREATE TYPE workspace_member_role AS ENUM ('owner', 'admin', 'member', 'viewer');
CREATE TYPE workspace_member_status AS ENUM ('active', 'invited', 'suspended');

-- ============================================================================
-- WORKSPACES TABLE
-- ============================================================================

CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- URL-friendly identifier
  description TEXT,
  avatar_url TEXT,
  settings JSONB DEFAULT '{}', -- Workspace-specific settings

  -- Subscription/billing
  plan TEXT DEFAULT 'free' NOT NULL, -- free, pro, enterprise
  subscription_status TEXT DEFAULT 'active' NOT NULL, -- active, canceled, suspended
  trial_ends_at TIMESTAMPTZ,
  subscription_ends_at TIMESTAMPTZ,

  -- Storage quotas
  storage_quota_bytes BIGINT DEFAULT 5368709120 NOT NULL, -- 5GB default
  storage_used_bytes BIGINT DEFAULT 0 NOT NULL,

  -- Owner reference
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- WORKSPACE MEMBERS TABLE
-- ============================================================================

CREATE TABLE workspace_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role workspace_member_role DEFAULT 'member' NOT NULL,
  status workspace_member_status DEFAULT 'active' NOT NULL,

  -- Permissions override (JSONB for granular control)
  permissions JSONB DEFAULT '{}', -- Can override role-based permissions

  -- Invitation tracking
  invited_by UUID REFERENCES users(id) ON DELETE SET NULL,
  invited_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, user_id)
);

-- ============================================================================
-- WORKSPACE INVITATIONS TABLE
-- ============================================================================

CREATE TABLE workspace_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role workspace_member_role DEFAULT 'member' NOT NULL,
  invited_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL, -- Unique invitation token
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  accepted_by UUID REFERENCES users(id) ON DELETE SET NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, email)
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON workspaces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workspace_members_updated_at BEFORE UPDATE ON workspace_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to check if user is workspace member
CREATE OR REPLACE FUNCTION is_workspace_member(workspace_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = workspace_uuid
    AND user_id = user_uuid
    AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has specific role in workspace
CREATE OR REPLACE FUNCTION has_workspace_role(workspace_uuid UUID, user_uuid UUID, required_role workspace_member_role)
RETURNS BOOLEAN AS $$
DECLARE
  user_role workspace_member_role;
BEGIN
  SELECT role INTO user_role
  FROM workspace_members
  WHERE workspace_id = workspace_uuid
  AND user_id = user_uuid
  AND status = 'active';

  -- Role hierarchy: owner > admin > member > viewer
  RETURN CASE required_role
    WHEN 'viewer' THEN user_role IN ('owner', 'admin', 'member', 'viewer')
    WHEN 'member' THEN user_role IN ('owner', 'admin', 'member')
    WHEN 'admin' THEN user_role IN ('owner', 'admin')
    WHEN 'owner' THEN user_role = 'owner'
    ELSE FALSE
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's workspaces
CREATE OR REPLACE FUNCTION get_user_workspaces(user_uuid UUID)
RETURNS TABLE(workspace_id UUID, role workspace_member_role) AS $$
BEGIN
  RETURN QUERY
  SELECT wm.workspace_id, wm.role
  FROM workspace_members wm
  WHERE wm.user_id = user_uuid
  AND wm.status = 'active';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_invitations ENABLE ROW LEVEL SECURITY;

-- Workspace policies: members can view their workspaces
CREATE POLICY "Members can view their workspaces"
  ON workspaces
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = workspaces.id
      AND workspace_members.user_id = auth.uid()
      AND workspace_members.status = 'active'
    )
  );

-- Only owners and admins can update workspace
CREATE POLICY "Owners and admins can update workspace"
  ON workspaces
  FOR UPDATE
  USING (
    has_workspace_role(id, auth.uid(), 'admin')
  );

-- Only owners can delete workspace
CREATE POLICY "Owners can delete workspace"
  ON workspaces
  FOR DELETE
  USING (
    has_workspace_role(id, auth.uid(), 'owner')
  );

-- Users can create workspaces
CREATE POLICY "Users can create workspaces"
  ON workspaces
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Workspace members policies
CREATE POLICY "Members can view workspace members"
  ON workspace_members
  FOR SELECT
  USING (
    is_workspace_member(workspace_id, auth.uid())
  );

-- Only owners and admins can manage members
CREATE POLICY "Admins can insert workspace members"
  ON workspace_members
  FOR INSERT
  WITH CHECK (
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  );

CREATE POLICY "Admins can update workspace members"
  ON workspace_members
  FOR UPDATE
  USING (
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete workspace members"
  ON workspace_members
  FOR DELETE
  USING (
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  );

-- Workspace invitations policies
CREATE POLICY "Members can view workspace invitations"
  ON workspace_invitations
  FOR SELECT
  USING (
    is_workspace_member(workspace_id, auth.uid()) OR
    email = (SELECT email FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can create invitations"
  ON workspace_invitations
  FOR INSERT
  WITH CHECK (
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete invitations"
  ON workspace_invitations
  FOR DELETE
  USING (
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  );

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Workspaces indexes
CREATE INDEX idx_workspaces_created_by ON workspaces(created_by);
CREATE INDEX idx_workspaces_slug ON workspaces(slug);
CREATE INDEX idx_workspaces_created_at ON workspaces(created_at DESC);
CREATE INDEX idx_workspaces_plan ON workspaces(plan);
CREATE INDEX idx_workspaces_subscription_status ON workspaces(subscription_status);

-- Workspace members indexes
CREATE INDEX idx_workspace_members_workspace_id ON workspace_members(workspace_id);
CREATE INDEX idx_workspace_members_user_id ON workspace_members(user_id);
CREATE INDEX idx_workspace_members_status ON workspace_members(status);
CREATE INDEX idx_workspace_members_role ON workspace_members(role);
CREATE INDEX idx_workspace_members_workspace_user ON workspace_members(workspace_id, user_id);
CREATE INDEX idx_workspace_members_user_status ON workspace_members(user_id, status) WHERE status = 'active';

-- Workspace invitations indexes
CREATE INDEX idx_workspace_invitations_workspace_id ON workspace_invitations(workspace_id);
CREATE INDEX idx_workspace_invitations_email ON workspace_invitations(email);
CREATE INDEX idx_workspace_invitations_token ON workspace_invitations(token);
CREATE INDEX idx_workspace_invitations_expires_at ON workspace_invitations(expires_at) WHERE accepted_at IS NULL;

-- GIN index for workspace settings JSONB
CREATE INDEX idx_workspaces_settings ON workspaces USING GIN (settings);

-- GIN index for member permissions JSONB
CREATE INDEX idx_workspace_members_permissions ON workspace_members USING GIN (permissions);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE workspaces IS 'Organizations/teams for multi-user collaboration';
COMMENT ON TABLE workspace_members IS 'Team members with roles and permissions';
COMMENT ON TABLE workspace_invitations IS 'Pending workspace invitations';

COMMENT ON COLUMN workspaces.slug IS 'URL-friendly unique identifier for the workspace';
COMMENT ON COLUMN workspaces.storage_quota_bytes IS 'Maximum storage allowed for this workspace';
COMMENT ON COLUMN workspaces.storage_used_bytes IS 'Current storage usage in bytes';

COMMENT ON FUNCTION is_workspace_member IS 'Check if user is an active member of a workspace';
COMMENT ON FUNCTION has_workspace_role IS 'Check if user has a specific role or higher in a workspace';
COMMENT ON FUNCTION get_user_workspaces IS 'Get all workspaces a user belongs to with their roles';
