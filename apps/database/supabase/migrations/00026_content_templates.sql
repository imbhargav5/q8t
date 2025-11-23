-- Content Templates
-- This migration adds reusable content templates with variables and metadata

-- Create enum for template categories
CREATE TYPE template_category AS ENUM (
  'promotional',
  'educational',
  'engagement',
  'seasonal',
  'announcement',
  'question',
  'quote',
  'behind_the_scenes',
  'user_generated',
  'other'
);

-- ============================================================================
-- CONTENT TEMPLATES TABLE
-- ============================================================================

CREATE TABLE content_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Template details
  name TEXT NOT NULL,
  description TEXT,
  category template_category NOT NULL,

  -- Content
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  hashtags TEXT[] DEFAULT '{}',

  -- Variables (for content placeholders)
  variables JSONB DEFAULT '[]',
  /*
    Structure:
    [
      {
        "name": "product_name",
        "placeholder": "Enter product name",
        "default_value": null
      }
    ]
  */

  -- Platform targeting
  platforms social_platform[] DEFAULT '{}',
  platform_specific_content JSONB DEFAULT '{}',
  /*
    Platform-specific variations:
    {
      "twitter": { "content": "Shorter version for Twitter...", "max_length": 280 },
      "instagram": { "content": "Instagram version with more hashtags..." }
    }
  */

  -- Visual
  thumbnail_url TEXT,
  preview_images TEXT[] DEFAULT '{}',

  -- Sharing
  is_public BOOLEAN DEFAULT false NOT NULL,
  is_featured BOOLEAN DEFAULT false NOT NULL,

  -- Usage tracking
  usage_count INTEGER DEFAULT 0 NOT NULL,
  last_used_at TIMESTAMPTZ,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (LENGTH(name) > 0),
  CHECK (LENGTH(content) > 0)
);

-- ============================================================================
-- TEMPLATE USAGE TABLE
-- ============================================================================
-- Track when and how templates are used

CREATE TABLE template_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID NOT NULL REFERENCES content_templates(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- What was created from this template
  post_id UUID, -- FK to posts table
  entity_type TEXT, -- 'post', 'draft', 'message'
  entity_id UUID,

  -- Variable values used
  variable_values JSONB DEFAULT '{}',
  /*
    {
      "product_name": "iPhone 15",
      "product_price": "$999",
      "link": "https://..."
    }
  */

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TEMPLATE CATEGORIES TABLE
-- ============================================================================
-- Custom category management for templates

CREATE TABLE template_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  color TEXT,
  icon TEXT, -- Icon name or emoji

  -- Ordering
  display_order INTEGER DEFAULT 0 NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, name),
  CHECK (LENGTH(name) > 0)
);

-- ============================================================================
-- TEMPLATE FAVORITES TABLE
-- ============================================================================

CREATE TABLE template_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID NOT NULL REFERENCES content_templates(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(template_id, user_id)
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_content_templates_updated_at
  BEFORE UPDATE ON content_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_template_categories_updated_at
  BEFORE UPDATE ON template_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update template usage count
CREATE OR REPLACE FUNCTION update_template_usage_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE content_templates
  SET
    usage_count = usage_count + 1,
    last_used_at = NOW()
  WHERE id = NEW.template_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_template_usage_count_trigger
  AFTER INSERT ON template_usage
  FOR EACH ROW EXECUTE FUNCTION update_template_usage_count();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to get popular templates
CREATE OR REPLACE FUNCTION get_popular_templates(
  p_workspace_id UUID,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  category template_category,
  usage_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id,
    t.name,
    t.category,
    t.usage_count
  FROM content_templates t
  WHERE t.workspace_id = p_workspace_id
  AND t.is_public = false -- Only workspace templates
  ORDER BY t.usage_count DESC, t.updated_at DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to apply template variables
CREATE OR REPLACE FUNCTION apply_template_variables(
  p_template_content TEXT,
  p_variables JSONB
)
RETURNS TEXT AS $$
DECLARE
  v_result TEXT;
  v_key TEXT;
  v_value TEXT;
BEGIN
  v_result := p_template_content;

  FOR v_key, v_value IN SELECT * FROM jsonb_each_text(p_variables)
  LOOP
    v_result := REPLACE(v_result, '{{' || v_key || '}}', v_value);
  END LOOP;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_favorites ENABLE ROW LEVEL SECURITY;

-- Workspace members can view their workspace templates
CREATE POLICY "Members can view workspace templates"
  ON content_templates
  FOR SELECT
  USING (
    is_workspace_member(workspace_id, auth.uid()) OR
    is_public = true
  );

-- Users can create templates in their workspace
CREATE POLICY "Users can create templates"
  ON content_templates
  FOR INSERT
  WITH CHECK (
    is_workspace_member(workspace_id, auth.uid()) AND
    user_id = auth.uid()
  );

-- Users can update their own templates
CREATE POLICY "Users can update own templates"
  ON content_templates
  FOR UPDATE
  USING (
    user_id = auth.uid() OR
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  );

-- Users can delete their own templates
CREATE POLICY "Users can delete own templates"
  ON content_templates
  FOR DELETE
  USING (
    user_id = auth.uid() OR
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  );

-- Template usage policies
CREATE POLICY "Members can view template usage"
  ON template_usage
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Users can create template usage records"
  ON template_usage
  FOR INSERT
  WITH CHECK (
    is_workspace_member(workspace_id, auth.uid()) AND
    user_id = auth.uid()
  );

-- Template categories policies
CREATE POLICY "Members can manage template categories"
  ON template_categories
  FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()))
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

-- Template favorites policies
CREATE POLICY "Users can manage their favorites"
  ON template_favorites
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Content templates indexes
CREATE INDEX idx_content_templates_workspace_id ON content_templates(workspace_id);
CREATE INDEX idx_content_templates_user_id ON content_templates(user_id);
CREATE INDEX idx_content_templates_category ON content_templates(category);
CREATE INDEX idx_content_templates_public ON content_templates(is_public) WHERE is_public = true;
CREATE INDEX idx_content_templates_featured ON content_templates(is_featured) WHERE is_featured = true;
CREATE INDEX idx_content_templates_usage ON content_templates(usage_count DESC, last_used_at DESC);
CREATE INDEX idx_content_templates_created_at ON content_templates(created_at DESC);

-- Full-text search on templates
CREATE INDEX idx_content_templates_search ON content_templates
  USING GIN (to_tsvector('english', name || ' ' || COALESCE(description, '') || ' ' || content));

-- GIN indexes for array columns
CREATE INDEX idx_content_templates_platforms ON content_templates USING GIN (platforms);
CREATE INDEX idx_content_templates_hashtags ON content_templates USING GIN (hashtags);

-- GIN indexes for JSONB columns
CREATE INDEX idx_content_templates_variables ON content_templates USING GIN (variables);
CREATE INDEX idx_content_templates_platform_content ON content_templates USING GIN (platform_specific_content);

-- Template usage indexes
CREATE INDEX idx_template_usage_template_id ON template_usage(template_id);
CREATE INDEX idx_template_usage_workspace_id ON template_usage(workspace_id);
CREATE INDEX idx_template_usage_user_id ON template_usage(user_id);
CREATE INDEX idx_template_usage_created_at ON template_usage(created_at DESC);
CREATE INDEX idx_template_usage_entity ON template_usage(entity_type, entity_id) WHERE entity_type IS NOT NULL;

-- Template categories indexes
CREATE INDEX idx_template_categories_workspace_id ON template_categories(workspace_id);
CREATE INDEX idx_template_categories_order ON template_categories(workspace_id, display_order);

-- Template favorites indexes
CREATE INDEX idx_template_favorites_template_id ON template_favorites(template_id);
CREATE INDEX idx_template_favorites_user_id ON template_favorites(user_id);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE content_templates IS 'Reusable content templates with variables and platform-specific variations';
COMMENT ON TABLE template_usage IS 'Tracking of template usage for analytics';
COMMENT ON TABLE template_categories IS 'Custom categories for organizing templates';
COMMENT ON TABLE template_favorites IS 'User-favorited templates for quick access';

COMMENT ON COLUMN content_templates.variables IS 'Array of variable definitions with placeholders';
COMMENT ON COLUMN content_templates.platform_specific_content IS 'Platform-specific content variations';
COMMENT ON COLUMN template_usage.variable_values IS 'Actual values used when template was applied';
