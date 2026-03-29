-- AI Content Generation
-- This migration adds AI-powered content generation with history and analytics

-- Create enum types
CREATE TYPE ai_tone AS ENUM (
  'professional',
  'casual',
  'friendly',
  'formal',
  'humorous',
  'inspirational',
  'urgent'
);

CREATE TYPE ai_content_type AS ENUM (
  'post',
  'caption',
  'tweet',
  'article',
  'email',
  'ad_copy'
);

-- ============================================================================
-- AI CONTENT REQUESTS TABLE
-- ============================================================================

CREATE TABLE ai_content_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Input
  prompt TEXT NOT NULL,
  tone ai_tone NOT NULL,
  content_type ai_content_type NOT NULL,
  platforms social_platform[] DEFAULT '{}',
  language TEXT DEFAULT 'en' NOT NULL,

  -- Options
  max_length INTEGER,
  include_hashtags BOOLEAN DEFAULT false NOT NULL,
  include_emojis BOOLEAN DEFAULT false NOT NULL,
  variant_count INTEGER DEFAULT 1 NOT NULL CHECK (variant_count >= 1 AND variant_count <= 5),

  -- Context
  context TEXT,
  target_audience TEXT,
  keywords TEXT[] DEFAULT '{}',

  -- Processing
  status TEXT DEFAULT 'pending' NOT NULL,
  error_message TEXT,
  processing_time_ms INTEGER,

  -- Model info
  ai_model TEXT, -- e.g., "gpt-4", "claude-3"
  model_version TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ,

  CHECK (LENGTH(prompt) > 0),
  CHECK (status IN ('pending', 'processing', 'completed', 'failed'))
);

-- ============================================================================
-- AI CONTENT RESPONSES TABLE
-- ============================================================================

CREATE TABLE ai_content_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES ai_content_requests(id) ON DELETE CASCADE,

  -- Generated content
  content TEXT NOT NULL,
  variant_number INTEGER NOT NULL,

  -- Metadata
  word_count INTEGER NOT NULL,
  character_count INTEGER NOT NULL,
  hashtags TEXT[] DEFAULT '{}',

  -- Quality metrics
  readability_score NUMERIC(4, 2) CHECK (readability_score >= 0 AND readability_score <= 10),
  sentiment_score NUMERIC(3, 2) CHECK (sentiment_score >= -1 AND sentiment_score <= 1),
  engagement_prediction NUMERIC(5, 2) CHECK (engagement_prediction >= 0 AND engagement_prediction <= 100),

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (LENGTH(content) > 0),
  CHECK (variant_number > 0)
);

-- ============================================================================
-- AI CONTENT HISTORY TABLE
-- ============================================================================
-- User's content generation history with usage tracking

CREATE TABLE ai_content_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  request_id UUID NOT NULL REFERENCES ai_content_requests(id) ON DELETE CASCADE,

  -- Usage tracking
  used_in_post_id UUID, -- FK to posts table
  is_favorite BOOLEAN DEFAULT false NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- AI USAGE QUOTAS TABLE
-- ============================================================================
-- Track AI usage limits per workspace

CREATE TABLE ai_usage_quotas (
  workspace_id UUID PRIMARY KEY REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Limits
  monthly_limit INTEGER DEFAULT 100 NOT NULL,
  monthly_used INTEGER DEFAULT 0 NOT NULL,

  -- Reset tracking
  last_reset_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  next_reset_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 month') NOT NULL,

  -- Overage
  allow_overage BOOLEAN DEFAULT false NOT NULL,
  overage_used INTEGER DEFAULT 0 NOT NULL,

  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (monthly_used >= 0),
  CHECK (monthly_limit > 0)
);

-- ============================================================================
-- AI PROMPTS LIBRARY TABLE
-- ============================================================================
-- Reusable prompt templates

CREATE TABLE ai_prompts_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  prompt_template TEXT NOT NULL,

  -- Categorization
  category TEXT,
  tags TEXT[] DEFAULT '{}',

  -- Default settings
  default_tone ai_tone,
  default_content_type ai_content_type,

  -- Sharing
  is_public BOOLEAN DEFAULT false NOT NULL,
  is_featured BOOLEAN DEFAULT false NOT NULL,

  -- Usage
  usage_count INTEGER DEFAULT 0 NOT NULL,

  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  CHECK (LENGTH(name) > 0),
  CHECK (LENGTH(prompt_template) > 0)
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_ai_content_history_updated_at
  BEFORE UPDATE ON ai_content_history
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_usage_quotas_updated_at
  BEFORE UPDATE ON ai_usage_quotas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_prompts_library_updated_at
  BEFORE UPDATE ON ai_prompts_library
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to increment usage quota
CREATE OR REPLACE FUNCTION increment_ai_usage()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' THEN
    INSERT INTO ai_usage_quotas (workspace_id, monthly_used)
    VALUES (NEW.workspace_id, 1)
    ON CONFLICT (workspace_id)
    DO UPDATE SET
      monthly_used = ai_usage_quotas.monthly_used + 1,
      updated_at = NOW();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_ai_usage_trigger
  AFTER UPDATE ON ai_content_requests
  FOR EACH ROW
  WHEN (OLD.status != 'completed' AND NEW.status = 'completed')
  EXECUTE FUNCTION increment_ai_usage();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to check if workspace has available quota
CREATE OR REPLACE FUNCTION check_ai_quota(p_workspace_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_quota_available BOOLEAN;
BEGIN
  SELECT
    (monthly_used < monthly_limit) OR allow_overage
  INTO v_quota_available
  FROM ai_usage_quotas
  WHERE workspace_id = p_workspace_id;

  RETURN COALESCE(v_quota_available, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset monthly quotas
CREATE OR REPLACE FUNCTION reset_ai_quotas()
RETURNS INTEGER AS $$
DECLARE
  reset_count INTEGER;
BEGIN
  UPDATE ai_usage_quotas
  SET
    monthly_used = 0,
    overage_used = 0,
    last_reset_at = NOW(),
    next_reset_at = NOW() + INTERVAL '1 month'
  WHERE next_reset_at <= NOW();

  GET DIAGNOSTICS reset_count = ROW_COUNT;
  RETURN reset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE ai_content_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_content_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_content_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_quotas ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_prompts_library ENABLE ROW LEVEL SECURITY;

-- Members can view and create AI content requests
CREATE POLICY "Members can manage AI requests"
  ON ai_content_requests
  FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()))
  WITH CHECK (
    is_workspace_member(workspace_id, auth.uid()) AND
    user_id = auth.uid()
  );

-- Members can view AI responses for their workspace
CREATE POLICY "Members can view AI responses"
  ON ai_content_responses
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM ai_content_requests r
      WHERE r.id = ai_content_responses.request_id
      AND is_workspace_member(r.workspace_id, auth.uid())
    )
  );

-- System can insert AI responses
CREATE POLICY "System can insert AI responses"
  ON ai_content_responses
  FOR INSERT
  WITH CHECK (true);

-- Members can manage their AI content history
CREATE POLICY "Members can manage AI history"
  ON ai_content_history
  FOR ALL
  USING (is_workspace_member(workspace_id, auth.uid()))
  WITH CHECK (
    is_workspace_member(workspace_id, auth.uid()) AND
    user_id = auth.uid()
  );

-- Members can view workspace quotas
CREATE POLICY "Members can view quotas"
  ON ai_usage_quotas
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Admins can manage quotas
CREATE POLICY "Admins can manage quotas"
  ON ai_usage_quotas
  FOR ALL
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'))
  WITH CHECK (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Members can view prompts library
CREATE POLICY "Members can view prompts"
  ON ai_prompts_library
  FOR SELECT
  USING (
    is_public = true OR
    (workspace_id IS NOT NULL AND is_workspace_member(workspace_id, auth.uid()))
  );

-- Members can create prompts
CREATE POLICY "Members can create prompts"
  ON ai_prompts_library
  FOR INSERT
  WITH CHECK (
    workspace_id IS NOT NULL AND
    is_workspace_member(workspace_id, auth.uid()) AND
    created_by = auth.uid()
  );

-- Users can update their own prompts
CREATE POLICY "Users can update own prompts"
  ON ai_prompts_library
  FOR UPDATE
  USING (created_by = auth.uid());

-- ============================================================================
-- INDEXES
-- ============================================================================

-- AI content requests indexes
CREATE INDEX idx_ai_content_requests_workspace ON ai_content_requests(workspace_id);
CREATE INDEX idx_ai_content_requests_user ON ai_content_requests(user_id);
CREATE INDEX idx_ai_content_requests_status ON ai_content_requests(status);
CREATE INDEX idx_ai_content_requests_created_at ON ai_content_requests(created_at DESC);
CREATE INDEX idx_ai_content_requests_tone ON ai_content_requests(tone);
CREATE INDEX idx_ai_content_requests_content_type ON ai_content_requests(content_type);

-- GIN indexes
CREATE INDEX idx_ai_content_requests_keywords ON ai_content_requests USING GIN (keywords);
CREATE INDEX idx_ai_content_requests_platforms ON ai_content_requests USING GIN (platforms);

-- AI content responses indexes
CREATE INDEX idx_ai_content_responses_request ON ai_content_responses(request_id);
CREATE INDEX idx_ai_content_responses_variant ON ai_content_responses(request_id, variant_number);
CREATE INDEX idx_ai_content_responses_engagement ON ai_content_responses(engagement_prediction DESC NULLS LAST);

-- GIN index for hashtags
CREATE INDEX idx_ai_content_responses_hashtags ON ai_content_responses USING GIN (hashtags);

-- AI content history indexes
CREATE INDEX idx_ai_content_history_workspace ON ai_content_history(workspace_id);
CREATE INDEX idx_ai_content_history_user ON ai_content_history(user_id);
CREATE INDEX idx_ai_content_history_request ON ai_content_history(request_id);
CREATE INDEX idx_ai_content_history_favorite ON ai_content_history(is_favorite) WHERE is_favorite = true;
CREATE INDEX idx_ai_content_history_used ON ai_content_history(used_in_post_id) WHERE used_in_post_id IS NOT NULL;

-- AI prompts library indexes
CREATE INDEX idx_ai_prompts_library_workspace ON ai_prompts_library(workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX idx_ai_prompts_library_public ON ai_prompts_library(is_public) WHERE is_public = true;
CREATE INDEX idx_ai_prompts_library_featured ON ai_prompts_library(is_featured) WHERE is_featured = true;
CREATE INDEX idx_ai_prompts_library_usage ON ai_prompts_library(usage_count DESC);

-- GIN indexes
CREATE INDEX idx_ai_prompts_library_tags ON ai_prompts_library USING GIN (tags);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE ai_content_requests IS 'AI content generation requests with input parameters';
COMMENT ON TABLE ai_content_responses IS 'Generated content variants from AI';
COMMENT ON TABLE ai_content_history IS 'User history of AI content generation with usage tracking';
COMMENT ON TABLE ai_usage_quotas IS 'AI usage limits and tracking per workspace';
COMMENT ON TABLE ai_prompts_library IS 'Reusable prompt templates for AI generation';

COMMENT ON COLUMN ai_content_responses.engagement_prediction IS 'Predicted engagement score 0-100';
COMMENT ON COLUMN ai_content_responses.sentiment_score IS 'Sentiment analysis score -1 (negative) to 1 (positive)';
