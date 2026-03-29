-- Content Library and Media Management
-- This migration adds advanced media management with folders, tags, and metadata

-- ============================================================================
-- MEDIA FOLDERS TABLE
-- ============================================================================

CREATE TABLE media_folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  parent_folder_id UUID REFERENCES media_folders(id) ON DELETE CASCADE,
  color TEXT, -- Hex color for UI representation

  -- Metadata
  description TEXT,
  is_system BOOLEAN DEFAULT false NOT NULL, -- System folders can't be deleted

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (LENGTH(name) > 0),
  CHECK (color IS NULL OR color ~ '^#[0-9A-Fa-f]{6}$') -- Validate hex color
);

-- ============================================================================
-- MEDIA TAGS TABLE
-- ============================================================================

CREATE TABLE media_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#94a3b8',
  description TEXT,

  -- Usage tracking
  usage_count INTEGER DEFAULT 0 NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, name),
  CHECK (LENGTH(name) > 0),
  CHECK (color ~ '^#[0-9A-Fa-f]{6}$')
);

-- ============================================================================
-- MEDIA LIBRARY ITEMS TABLE
-- ============================================================================
-- Enhanced version of media_assets with library features

CREATE TABLE media_library_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Organization
  folder_id UUID REFERENCES media_folders(id) ON DELETE SET NULL,

  -- Media details
  type media_type NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,

  -- File information
  size_bytes BIGINT NOT NULL CHECK (size_bytes >= 0),
  width INTEGER CHECK (width > 0),
  height INTEGER CHECK (height > 0),
  duration NUMERIC(10, 2) CHECK (duration >= 0), -- In seconds, for videos

  -- Metadata
  alt_text TEXT,
  description TEXT,
  title TEXT,

  -- Copyright & licensing
  copyright TEXT,
  license TEXT,
  source_url TEXT,

  -- AI-generated metadata
  ai_tags TEXT[], -- AI-detected objects/scenes
  ai_description TEXT, -- AI-generated description
  ai_colors TEXT[], -- Dominant colors

  -- Usage tracking
  usage_count INTEGER DEFAULT 0 NOT NULL,
  last_used_at TIMESTAMPTZ,

  -- Flags
  is_favorite BOOLEAN DEFAULT false NOT NULL,
  is_archived BOOLEAN DEFAULT false NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (LENGTH(filename) > 0)
);

-- ============================================================================
-- MEDIA TAG ASSIGNMENTS TABLE
-- ============================================================================
-- Many-to-many relationship between media items and tags

CREATE TABLE media_tag_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  media_id UUID NOT NULL REFERENCES media_library_items(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES media_tags(id) ON DELETE CASCADE,

  assigned_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(media_id, tag_id)
);

-- ============================================================================
-- BRAND ASSETS TABLE
-- ============================================================================
-- Curated brand assets with usage guidelines

CREATE TABLE brand_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'logo', 'color_palette', 'typography', 'template'
  media_id UUID REFERENCES media_library_items(id) ON DELETE SET NULL,

  -- Guidelines
  guidelines TEXT,
  usage_restrictions TEXT,
  approved_uses TEXT[],
  prohibited_uses TEXT[],

  -- Specifications (for logos, colors, etc.)
  specifications JSONB DEFAULT '{}',
  /*
    Examples:
    Logo: { "min_size": "100px", "clear_space": "20px", "file_formats": ["svg", "png"] }
    Color: { "hex": "#6366f1", "rgb": "99, 102, 241", "cmyk": "59, 58, 0, 5" }
  */

  -- Status
  is_active BOOLEAN DEFAULT true NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (LENGTH(name) > 0),
  CHECK (category IN ('logo', 'color_palette', 'typography', 'template', 'icon', 'illustration', 'pattern'))
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_media_folders_updated_at
  BEFORE UPDATE ON media_folders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_library_items_updated_at
  BEFORE UPDATE ON media_library_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brand_assets_updated_at
  BEFORE UPDATE ON brand_assets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update tag usage count
CREATE OR REPLACE FUNCTION update_tag_usage_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE media_tags
    SET usage_count = usage_count + 1
    WHERE id = NEW.tag_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE media_tags
    SET usage_count = GREATEST(usage_count - 1, 0)
    WHERE id = OLD.tag_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tag_usage_count_trigger
  AFTER INSERT OR DELETE ON media_tag_assignments
  FOR EACH ROW EXECUTE FUNCTION update_tag_usage_count();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to get folder path
CREATE OR REPLACE FUNCTION get_folder_path(p_folder_id UUID)
RETURNS TEXT AS $$
DECLARE
  v_path TEXT;
  v_current_id UUID;
  v_current_name TEXT;
  v_parent_id UUID;
BEGIN
  v_current_id := p_folder_id;
  v_path := '';

  LOOP
    SELECT name, parent_folder_id
    INTO v_current_name, v_parent_id
    FROM media_folders
    WHERE id = v_current_id;

    IF NOT FOUND THEN
      EXIT;
    END IF;

    IF v_path = '' THEN
      v_path := v_current_name;
    ELSE
      v_path := v_current_name || ' / ' || v_path;
    END IF;

    IF v_parent_id IS NULL THEN
      EXIT;
    END IF;

    v_current_id := v_parent_id;
  END LOOP;

  RETURN v_path;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get total storage usage for workspace
CREATE OR REPLACE FUNCTION get_workspace_storage_usage(p_workspace_id UUID)
RETURNS BIGINT AS $$
BEGIN
  RETURN (
    SELECT COALESCE(SUM(size_bytes), 0)
    FROM media_library_items
    WHERE workspace_id = p_workspace_id
    AND is_archived = false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE media_folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_tag_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_assets ENABLE ROW LEVEL SECURITY;

-- Workspace members can view and manage folders
CREATE POLICY "Members can manage workspace folders"
  ON media_folders
  FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()))
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

-- Workspace members can manage tags
CREATE POLICY "Members can manage workspace tags"
  ON media_tags
  FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()))
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

-- Workspace members can manage media
CREATE POLICY "Members can manage workspace media"
  ON media_library_items
  FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()))
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

-- Members can manage tag assignments
CREATE POLICY "Members can manage tag assignments"
  ON media_tag_assignments
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM media_library_items m
      WHERE m.id = media_tag_assignments.media_id
      AND is_workspace_member(m.workspace_id, auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM media_library_items m
      WHERE m.id = media_tag_assignments.media_id
      AND is_workspace_member(m.workspace_id, auth.uid())
    )
  );

-- Members can view brand assets
CREATE POLICY "Members can view brand assets"
  ON brand_assets
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Admins can manage brand assets
CREATE POLICY "Admins can manage brand assets"
  ON brand_assets
  FOR ALL
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'))
  WITH CHECK (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Media folders indexes
CREATE INDEX idx_media_folders_workspace_id ON media_folders(workspace_id);
CREATE INDEX idx_media_folders_parent_id ON media_folders(parent_folder_id) WHERE parent_folder_id IS NOT NULL;
CREATE INDEX idx_media_folders_user_id ON media_folders(user_id);

-- Media tags indexes
CREATE INDEX idx_media_tags_workspace_id ON media_tags(workspace_id);
CREATE INDEX idx_media_tags_name ON media_tags(name);
CREATE INDEX idx_media_tags_usage_count ON media_tags(usage_count DESC);

-- Media library items indexes
CREATE INDEX idx_media_library_workspace_id ON media_library_items(workspace_id);
CREATE INDEX idx_media_library_user_id ON media_library_items(user_id);
CREATE INDEX idx_media_library_folder_id ON media_library_items(folder_id) WHERE folder_id IS NOT NULL;
CREATE INDEX idx_media_library_type ON media_library_items(type);
CREATE INDEX idx_media_library_created_at ON media_library_items(created_at DESC);
CREATE INDEX idx_media_library_usage ON media_library_items(usage_count DESC, last_used_at DESC);
CREATE INDEX idx_media_library_favorites ON media_library_items(is_favorite) WHERE is_favorite = true;
CREATE INDEX idx_media_library_archived ON media_library_items(is_archived) WHERE is_archived = false;
CREATE INDEX idx_media_library_filename ON media_library_items(filename);

-- Full-text search on media items
CREATE INDEX idx_media_library_search ON media_library_items
  USING GIN (to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(description, '') || ' ' || COALESCE(alt_text, '')));

-- GIN indexes for array columns
CREATE INDEX idx_media_library_ai_tags ON media_library_items USING GIN (ai_tags);
CREATE INDEX idx_media_library_ai_colors ON media_library_items USING GIN (ai_colors);

-- Media tag assignments indexes
CREATE INDEX idx_media_tag_assignments_media_id ON media_tag_assignments(media_id);
CREATE INDEX idx_media_tag_assignments_tag_id ON media_tag_assignments(tag_id);

-- Brand assets indexes
CREATE INDEX idx_brand_assets_workspace_id ON brand_assets(workspace_id);
CREATE INDEX idx_brand_assets_category ON brand_assets(category);
CREATE INDEX idx_brand_assets_active ON brand_assets(is_active) WHERE is_active = true;
CREATE INDEX idx_brand_assets_media_id ON brand_assets(media_id) WHERE media_id IS NOT NULL;

-- GIN index for specifications JSONB
CREATE INDEX idx_brand_assets_specifications ON brand_assets USING GIN (specifications);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE media_folders IS 'Hierarchical folder structure for organizing media assets';
COMMENT ON TABLE media_tags IS 'Reusable tags for categorizing media items';
COMMENT ON TABLE media_library_items IS 'Enhanced media library with metadata and organization';
COMMENT ON TABLE media_tag_assignments IS 'Many-to-many relationship between media items and tags';
COMMENT ON TABLE brand_assets IS 'Curated brand assets with usage guidelines';

COMMENT ON COLUMN media_library_items.ai_tags IS 'AI-detected objects, scenes, and concepts in the media';
COMMENT ON COLUMN media_library_items.ai_description IS 'AI-generated description for accessibility';
COMMENT ON COLUMN media_library_items.ai_colors IS 'Dominant colors extracted from the image';
COMMENT ON COLUMN brand_assets.specifications IS 'Technical specifications and guidelines in JSON format';
