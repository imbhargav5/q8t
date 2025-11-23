-- Bulk Upload and Import
-- This migration adds bulk content upload functionality with validation and tracking

-- ============================================================================
-- BULK UPLOAD JOBS TABLE
-- ============================================================================

CREATE TABLE bulk_upload_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- File information
  file_name TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL, -- csv, xlsx, xls
  file_url TEXT, -- S3/storage URL

  -- Processing status
  status TEXT DEFAULT 'pending' NOT NULL,
  progress INTEGER DEFAULT 0 NOT NULL CHECK (progress >= 0 AND progress <= 100),

  -- Statistics
  total_rows INTEGER DEFAULT 0 NOT NULL,
  valid_rows INTEGER DEFAULT 0 NOT NULL,
  invalid_rows INTEGER DEFAULT 0 NOT NULL,
  processed_rows INTEGER DEFAULT 0 NOT NULL,
  created_posts INTEGER DEFAULT 0 NOT NULL,

  -- Column mapping
  column_mapping JSONB DEFAULT '{}',
  /*
    {
      "Content": "content",
      "Platforms": "platforms",
      "Scheduled Time": "scheduled_at",
      "Media URL": "media_url"
    }
  */

  -- Errors summary
  errors JSONB DEFAULT '[]',
  /*
    [
      {
        "row": 5,
        "errors": ["Invalid date format", "Missing required field: content"]
      }
    ]
  */

  -- Processing metadata
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  processing_time_ms INTEGER,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (status IN ('pending', 'mapping', 'validating', 'processing', 'completed', 'failed')),
  CHECK (file_type IN ('csv', 'xlsx', 'xls', 'json'))
);

-- ============================================================================
-- BULK UPLOAD ROWS TABLE
-- ============================================================================
-- Individual rows from bulk upload with validation status

CREATE TABLE bulk_upload_rows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES bulk_upload_jobs(id) ON DELETE CASCADE,

  -- Row data
  row_number INTEGER NOT NULL,
  raw_data JSONB NOT NULL,

  -- Parsed data
  content TEXT,
  platforms social_platform[] DEFAULT '{}',
  scheduled_at TIMESTAMPTZ,
  media_urls TEXT[] DEFAULT '{}',
  hashtags TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',

  -- Validation
  is_valid BOOLEAN DEFAULT false NOT NULL,
  validation_errors TEXT[] DEFAULT '{}',

  -- Processing
  status TEXT DEFAULT 'pending' NOT NULL,
  post_id UUID, -- FK to posts table if successfully created

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (status IN ('pending', 'valid', 'invalid', 'processing', 'completed', 'failed'))
);

-- ============================================================================
-- BULK UPLOAD TEMPLATES TABLE
-- ============================================================================
-- Save column mappings as templates for reuse

CREATE TABLE bulk_upload_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  -- Column mapping
  column_mapping JSONB NOT NULL,

  -- File format expectations
  expected_columns TEXT[] DEFAULT '{}',
  file_type TEXT, -- csv, xlsx

  -- Usage
  usage_count INTEGER DEFAULT 0 NOT NULL,
  last_used_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (LENGTH(name) > 0)
);

-- ============================================================================
-- BULK UPLOAD VALIDATION RULES TABLE
-- ============================================================================
-- Customizable validation rules per workspace

CREATE TABLE bulk_upload_validation_rules (
  workspace_id UUID PRIMARY KEY REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Content rules
  min_content_length INTEGER DEFAULT 10,
  max_content_length INTEGER DEFAULT 5000,
  require_hashtags BOOLEAN DEFAULT false,

  -- Scheduling rules
  allow_past_dates BOOLEAN DEFAULT false,
  max_schedule_ahead_days INTEGER DEFAULT 365,

  -- Platform rules
  require_platforms BOOLEAN DEFAULT true,
  allowed_platforms social_platform[] DEFAULT '{}',

  -- Media rules
  require_media BOOLEAN DEFAULT false,
  max_media_per_post INTEGER DEFAULT 10,

  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_bulk_upload_jobs_updated_at
  BEFORE UPDATE ON bulk_upload_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bulk_upload_templates_updated_at
  BEFORE UPDATE ON bulk_upload_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bulk_upload_validation_rules_updated_at
  BEFORE UPDATE ON bulk_upload_validation_rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update template usage
CREATE OR REPLACE FUNCTION update_template_usage()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'mapping' AND OLD.status = 'pending' THEN
    -- Extract template ID from metadata if used
    -- This is a simplified version
    UPDATE bulk_upload_templates
    SET
      usage_count = usage_count + 1,
      last_used_at = NOW()
    WHERE workspace_id = NEW.workspace_id
    LIMIT 1;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_template_usage_trigger
  AFTER UPDATE ON bulk_upload_jobs
  FOR EACH ROW EXECUTE FUNCTION update_template_usage();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to validate bulk upload row
CREATE OR REPLACE FUNCTION validate_bulk_upload_row(
  p_row_id UUID,
  p_workspace_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_row bulk_upload_rows%ROWTYPE;
  v_rules bulk_upload_validation_rules%ROWTYPE;
  v_errors TEXT[] := '{}';
  v_is_valid BOOLEAN := true;
BEGIN
  -- Get row data
  SELECT * INTO v_row FROM bulk_upload_rows WHERE id = p_row_id;

  -- Get validation rules
  SELECT * INTO v_rules FROM bulk_upload_validation_rules WHERE workspace_id = p_workspace_id;

  -- Validate content length
  IF v_row.content IS NULL OR LENGTH(v_row.content) = 0 THEN
    v_errors := array_append(v_errors, 'Content is required');
    v_is_valid := false;
  ELSIF LENGTH(v_row.content) < COALESCE(v_rules.min_content_length, 10) THEN
    v_errors := array_append(v_errors, format('Content too short (minimum %s characters)', v_rules.min_content_length));
    v_is_valid := false;
  ELSIF LENGTH(v_row.content) > COALESCE(v_rules.max_content_length, 5000) THEN
    v_errors := array_append(v_errors, format('Content too long (maximum %s characters)', v_rules.max_content_length));
    v_is_valid := false;
  END IF;

  -- Validate platforms
  IF COALESCE(v_rules.require_platforms, true) AND (v_row.platforms IS NULL OR array_length(v_row.platforms, 1) = 0) THEN
    v_errors := array_append(v_errors, 'At least one platform is required');
    v_is_valid := false;
  END IF;

  -- Validate scheduled time
  IF v_row.scheduled_at IS NOT NULL THEN
    IF NOT COALESCE(v_rules.allow_past_dates, false) AND v_row.scheduled_at < NOW() THEN
      v_errors := array_append(v_errors, 'Cannot schedule posts in the past');
      v_is_valid := false;
    END IF;

    IF v_row.scheduled_at > NOW() + (COALESCE(v_rules.max_schedule_ahead_days, 365) || ' days')::INTERVAL THEN
      v_errors := array_append(v_errors, format('Cannot schedule more than %s days ahead', v_rules.max_schedule_ahead_days));
      v_is_valid := false;
    END IF;
  END IF;

  -- Update row with validation results
  UPDATE bulk_upload_rows
  SET
    is_valid = v_is_valid,
    validation_errors = v_errors,
    status = CASE WHEN v_is_valid THEN 'valid' ELSE 'invalid' END
  WHERE id = p_row_id;

  RETURN v_is_valid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get upload job summary
CREATE OR REPLACE FUNCTION get_upload_job_summary(p_job_id UUID)
RETURNS TABLE (
  total_rows BIGINT,
  valid_rows BIGINT,
  invalid_rows BIGINT,
  completion_percentage NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_rows,
    COUNT(*) FILTER (WHERE is_valid = true)::BIGINT as valid_rows,
    COUNT(*) FILTER (WHERE is_valid = false)::BIGINT as invalid_rows,
    (COUNT(*) FILTER (WHERE status = 'completed')::NUMERIC / NULLIF(COUNT(*), 0) * 100) as completion_percentage
  FROM bulk_upload_rows
  WHERE job_id = p_job_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE bulk_upload_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulk_upload_rows ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulk_upload_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulk_upload_validation_rules ENABLE ROW LEVEL SECURITY;

-- Members can manage upload jobs
CREATE POLICY "Members can manage upload jobs"
  ON bulk_upload_jobs
  FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()))
  WITH CHECK (
    is_workspace_member(workspace_id, auth.uid()) AND
    user_id = auth.uid()
  );

-- Members can view upload rows
CREATE POLICY "Members can view upload rows"
  ON bulk_upload_rows
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bulk_upload_jobs j
      WHERE j.id = bulk_upload_rows.job_id
      AND is_workspace_member(j.workspace_id, auth.uid())
    )
  );

-- System can manage upload rows
CREATE POLICY "System can manage upload rows"
  ON bulk_upload_rows
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Members can manage templates
CREATE POLICY "Members can manage templates"
  ON bulk_upload_templates
  FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()))
  WITH CHECK (
    is_workspace_member(workspace_id, auth.uid()) AND
    user_id = auth.uid()
  );

-- Admins can manage validation rules
CREATE POLICY "Admins can manage validation rules"
  ON bulk_upload_validation_rules
  FOR ALL
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'))
  WITH CHECK (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Bulk upload jobs indexes
CREATE INDEX idx_bulk_upload_jobs_workspace ON bulk_upload_jobs(workspace_id);
CREATE INDEX idx_bulk_upload_jobs_user ON bulk_upload_jobs(user_id);
CREATE INDEX idx_bulk_upload_jobs_status ON bulk_upload_jobs(status);
CREATE INDEX idx_bulk_upload_jobs_created_at ON bulk_upload_jobs(created_at DESC);

-- GIN indexes for JSONB
CREATE INDEX idx_bulk_upload_jobs_column_mapping ON bulk_upload_jobs USING GIN (column_mapping);
CREATE INDEX idx_bulk_upload_jobs_errors ON bulk_upload_jobs USING GIN (errors);

-- Bulk upload rows indexes
CREATE INDEX idx_bulk_upload_rows_job ON bulk_upload_rows(job_id);
CREATE INDEX idx_bulk_upload_rows_valid ON bulk_upload_rows(is_valid);
CREATE INDEX idx_bulk_upload_rows_status ON bulk_upload_rows(status);
CREATE INDEX idx_bulk_upload_rows_post ON bulk_upload_rows(post_id) WHERE post_id IS NOT NULL;

-- GIN indexes
CREATE INDEX idx_bulk_upload_rows_raw_data ON bulk_upload_rows USING GIN (raw_data);
CREATE INDEX idx_bulk_upload_rows_platforms ON bulk_upload_rows USING GIN (platforms);

-- Bulk upload templates indexes
CREATE INDEX idx_bulk_upload_templates_workspace ON bulk_upload_templates(workspace_id);
CREATE INDEX idx_bulk_upload_templates_user ON bulk_upload_templates(user_id);
CREATE INDEX idx_bulk_upload_templates_usage ON bulk_upload_templates(usage_count DESC);

-- GIN index for column mapping
CREATE INDEX idx_bulk_upload_templates_mapping ON bulk_upload_templates USING GIN (column_mapping);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE bulk_upload_jobs IS 'Bulk upload jobs with file processing status';
COMMENT ON TABLE bulk_upload_rows IS 'Individual rows from bulk uploads with validation';
COMMENT ON TABLE bulk_upload_templates IS 'Reusable column mapping templates';
COMMENT ON TABLE bulk_upload_validation_rules IS 'Workspace-specific validation rules for bulk uploads';

COMMENT ON COLUMN bulk_upload_jobs.column_mapping IS 'Mapping of file columns to system fields';
COMMENT ON COLUMN bulk_upload_rows.validation_errors IS 'Array of validation error messages';
