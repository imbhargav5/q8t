-- Sync Infrastructure - Webhooks and Polling for Message Synchronization
-- This migration handles webhook configuration and polling-based sync for platforms

-- Create enum types for sync infrastructure
CREATE TYPE webhook_event_status AS ENUM ('pending', 'processing', 'processed', 'failed', 'duplicate');
CREATE TYPE sync_job_status AS ENUM ('idle', 'running', 'completed', 'failed');
CREATE TYPE sync_method AS ENUM ('webhook', 'polling', 'hybrid');

-- ============================================================================
-- WEBHOOK ENDPOINTS TABLE
-- ============================================================================

CREATE TABLE webhook_endpoints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  social_account_id UUID NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,

  -- Platform and webhook info
  platform social_platform NOT NULL,
  webhook_url TEXT NOT NULL, -- Our endpoint URL for this webhook
  platform_webhook_id TEXT, -- Platform's webhook registration ID

  -- Webhook configuration
  subscribed_events TEXT[] DEFAULT '{}', -- Events we're subscribed to
  is_active BOOLEAN DEFAULT true NOT NULL,

  -- Security
  secret_token TEXT, -- For webhook signature verification
  signing_algorithm TEXT, -- e.g., HMAC-SHA256

  -- Status tracking
  last_received_at TIMESTAMPTZ,
  last_successful_at TIMESTAMPTZ,
  last_error TEXT,
  consecutive_failures INTEGER DEFAULT 0 NOT NULL,

  -- Rate limiting
  events_received_today INTEGER DEFAULT 0 NOT NULL,
  events_received_total BIGINT DEFAULT 0 NOT NULL,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, social_account_id, platform)
);

-- ============================================================================
-- WEBHOOK EVENTS TABLE
-- ============================================================================

CREATE TABLE webhook_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  webhook_endpoint_id UUID REFERENCES webhook_endpoints(id) ON DELETE SET NULL,

  -- Event identification
  platform social_platform NOT NULL,
  event_type TEXT NOT NULL, -- Platform-specific event type
  event_id TEXT, -- Platform's unique event ID (for deduplication)

  -- Request details
  request_headers JSONB DEFAULT '{}',
  request_body JSONB NOT NULL,
  signature TEXT, -- Webhook signature for verification
  signature_valid BOOLEAN,

  -- Processing status
  status webhook_event_status DEFAULT 'pending' NOT NULL,
  processed_at TIMESTAMPTZ,
  processing_attempts INTEGER DEFAULT 0 NOT NULL,
  max_retry_attempts INTEGER DEFAULT 3 NOT NULL,
  next_retry_at TIMESTAMPTZ,

  -- Error tracking
  error_message TEXT,
  error_details JSONB,

  -- Result tracking
  created_messages_count INTEGER DEFAULT 0 NOT NULL,
  created_message_ids UUID[] DEFAULT '{}',

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index on event_id for deduplication
CREATE UNIQUE INDEX idx_webhook_events_platform_event_id
  ON webhook_events(platform, event_id)
  WHERE event_id IS NOT NULL;

-- ============================================================================
-- SYNC JOBS TABLE
-- ============================================================================

CREATE TABLE sync_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  social_account_id UUID NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,

  -- Platform and sync configuration
  platform social_platform NOT NULL,
  sync_method sync_method NOT NULL,
  sync_type TEXT NOT NULL, -- 'messages', 'mentions', 'comments', etc.

  -- Scheduling
  is_active BOOLEAN DEFAULT true NOT NULL,
  sync_interval_minutes INTEGER DEFAULT 5 NOT NULL, -- How often to poll
  last_sync_at TIMESTAMPTZ,
  next_sync_at TIMESTAMPTZ NOT NULL,

  -- Status tracking
  status sync_job_status DEFAULT 'idle' NOT NULL,
  current_run_started_at TIMESTAMPTZ,

  -- Cursor/pagination tracking
  sync_cursor TEXT, -- Platform-specific cursor for pagination
  last_message_id TEXT, -- Last message ID we synced
  last_message_timestamp TIMESTAMPTZ, -- Last message timestamp

  -- Success tracking
  total_runs BIGINT DEFAULT 0 NOT NULL,
  successful_runs BIGINT DEFAULT 0 NOT NULL,
  failed_runs BIGINT DEFAULT 0 NOT NULL,
  messages_synced_total BIGINT DEFAULT 0 NOT NULL,
  last_messages_synced_count INTEGER DEFAULT 0 NOT NULL,

  -- Error tracking
  last_error TEXT,
  last_error_at TIMESTAMPTZ,
  consecutive_failures INTEGER DEFAULT 0 NOT NULL,

  -- Performance tracking
  average_duration_seconds NUMERIC(10, 2),
  last_duration_seconds NUMERIC(10, 2),

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, social_account_id, platform, sync_type)
);

-- ============================================================================
-- SYNC JOB RUNS TABLE (History)
-- ============================================================================

CREATE TABLE sync_job_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sync_job_id UUID NOT NULL REFERENCES sync_jobs(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Run details
  status sync_job_status NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  duration_seconds NUMERIC(10, 2),

  -- Results
  messages_synced INTEGER DEFAULT 0 NOT NULL,
  messages_created INTEGER DEFAULT 0 NOT NULL,
  messages_updated INTEGER DEFAULT 0 NOT NULL,
  messages_skipped INTEGER DEFAULT 0 NOT NULL,

  -- Error tracking
  error_message TEXT,
  error_details JSONB,

  -- Cursor tracking
  cursor_before TEXT,
  cursor_after TEXT,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- PLATFORM SYNC CAPABILITIES TABLE
-- ============================================================================

CREATE TABLE platform_sync_capabilities (
  platform social_platform PRIMARY KEY,

  -- Supported sync methods
  supports_webhooks BOOLEAN DEFAULT false NOT NULL,
  supports_polling BOOLEAN DEFAULT true NOT NULL,
  recommended_sync_method sync_method NOT NULL,

  -- Webhook capabilities
  webhook_events TEXT[] DEFAULT '{}', -- Available webhook events
  webhook_requires_verification BOOLEAN DEFAULT false,
  webhook_signature_header TEXT, -- Header name for signature (e.g., 'X-Hub-Signature')

  -- Polling capabilities
  polling_min_interval_minutes INTEGER, -- Minimum safe polling interval
  polling_rate_limit_per_hour INTEGER, -- API rate limit
  polling_cursor_type TEXT, -- 'timestamp', 'id', 'offset', etc.

  -- Endpoint information
  api_base_url TEXT,
  webhook_registration_endpoint TEXT,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_webhook_endpoints_updated_at BEFORE UPDATE ON webhook_endpoints
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webhook_events_updated_at BEFORE UPDATE ON webhook_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sync_jobs_updated_at BEFORE UPDATE ON sync_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_platform_sync_capabilities_updated_at BEFORE UPDATE ON platform_sync_capabilities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to schedule next sync for a job
CREATE OR REPLACE FUNCTION schedule_next_sync(sync_job_uuid UUID)
RETURNS TIMESTAMPTZ AS $$
DECLARE
  next_sync TIMESTAMPTZ;
  interval_minutes INTEGER;
BEGIN
  -- Get the sync interval
  SELECT sync_interval_minutes INTO interval_minutes
  FROM sync_jobs
  WHERE id = sync_job_uuid;

  -- Calculate next sync time
  next_sync := NOW() + (interval_minutes || ' minutes')::INTERVAL;

  -- Update the sync job
  UPDATE sync_jobs
  SET next_sync_at = next_sync
  WHERE id = sync_job_uuid;

  RETURN next_sync;
END;
$$ LANGUAGE plpgsql;

-- Function to mark sync job as started
CREATE OR REPLACE FUNCTION start_sync_job(sync_job_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE sync_jobs
  SET
    status = 'running',
    current_run_started_at = NOW(),
    total_runs = total_runs + 1
  WHERE id = sync_job_uuid
  AND status = 'idle';

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function to complete sync job successfully
CREATE OR REPLACE FUNCTION complete_sync_job(
  sync_job_uuid UUID,
  messages_synced_param INTEGER,
  cursor_param TEXT DEFAULT NULL,
  last_msg_id TEXT DEFAULT NULL,
  last_msg_ts TIMESTAMPTZ DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  duration_secs NUMERIC(10, 2);
  run_started_at TIMESTAMPTZ;
BEGIN
  -- Get run start time
  SELECT current_run_started_at INTO run_started_at
  FROM sync_jobs
  WHERE id = sync_job_uuid;

  -- Calculate duration
  duration_secs := EXTRACT(EPOCH FROM (NOW() - run_started_at));

  -- Update sync job
  UPDATE sync_jobs
  SET
    status = 'idle',
    last_sync_at = NOW(),
    successful_runs = successful_runs + 1,
    consecutive_failures = 0,
    last_error = NULL,
    messages_synced_total = messages_synced_total + messages_synced_param,
    last_messages_synced_count = messages_synced_param,
    last_duration_seconds = duration_secs,
    average_duration_seconds = (
      COALESCE(average_duration_seconds, 0) * (successful_runs) + duration_secs
    ) / (successful_runs + 1),
    sync_cursor = COALESCE(cursor_param, sync_cursor),
    last_message_id = COALESCE(last_msg_id, last_message_id),
    last_message_timestamp = COALESCE(last_msg_ts, last_message_timestamp),
    current_run_started_at = NULL
  WHERE id = sync_job_uuid;

  -- Schedule next sync
  PERFORM schedule_next_sync(sync_job_uuid);

  -- Create sync job run record
  INSERT INTO sync_job_runs (
    sync_job_id,
    workspace_id,
    status,
    started_at,
    completed_at,
    duration_seconds,
    messages_synced,
    messages_created,
    cursor_after
  )
  SELECT
    sync_job_uuid,
    workspace_id,
    'completed'::sync_job_status,
    run_started_at,
    NOW(),
    duration_secs,
    messages_synced_param,
    messages_synced_param,
    cursor_param
  FROM sync_jobs
  WHERE id = sync_job_uuid;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to fail sync job
CREATE OR REPLACE FUNCTION fail_sync_job(
  sync_job_uuid UUID,
  error_msg TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  duration_secs NUMERIC(10, 2);
  run_started_at TIMESTAMPTZ;
BEGIN
  -- Get run start time
  SELECT current_run_started_at INTO run_started_at
  FROM sync_jobs
  WHERE id = sync_job_uuid;

  -- Calculate duration
  duration_secs := EXTRACT(EPOCH FROM (NOW() - run_started_at));

  -- Update sync job
  UPDATE sync_jobs
  SET
    status = 'idle',
    failed_runs = failed_runs + 1,
    consecutive_failures = consecutive_failures + 1,
    last_error = error_msg,
    last_error_at = NOW(),
    last_duration_seconds = duration_secs,
    current_run_started_at = NULL
  WHERE id = sync_job_uuid;

  -- Schedule next sync (with backoff based on consecutive failures)
  UPDATE sync_jobs
  SET next_sync_at = NOW() + (
    sync_interval_minutes * POWER(2, LEAST(consecutive_failures, 5)) || ' minutes'
  )::INTERVAL
  WHERE id = sync_job_uuid;

  -- Create sync job run record
  INSERT INTO sync_job_runs (
    sync_job_id,
    workspace_id,
    status,
    started_at,
    completed_at,
    duration_seconds,
    error_message
  )
  SELECT
    sync_job_uuid,
    workspace_id,
    'failed'::sync_job_status,
    run_started_at,
    NOW(),
    duration_secs,
    error_msg
  FROM sync_jobs
  WHERE id = sync_job_uuid;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to process webhook event
CREATE OR REPLACE FUNCTION process_webhook_event(webhook_event_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE webhook_events
  SET
    status = 'processing',
    processing_attempts = processing_attempts + 1
  WHERE id = webhook_event_uuid
  AND status IN ('pending', 'failed');

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function to get pending sync jobs
CREATE OR REPLACE FUNCTION get_pending_sync_jobs(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
  job_id UUID,
  workspace_id UUID,
  social_account_id UUID,
  platform social_platform,
  sync_type TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    id,
    sync_jobs.workspace_id,
    sync_jobs.social_account_id,
    sync_jobs.platform,
    sync_jobs.sync_type
  FROM sync_jobs
  WHERE is_active = true
  AND status = 'idle'
  AND next_sync_at <= NOW()
  ORDER BY next_sync_at ASC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE webhook_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_job_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_sync_capabilities ENABLE ROW LEVEL SECURITY;

-- Webhook endpoints policies
CREATE POLICY "Workspace members can view webhook endpoints"
  ON webhook_endpoints
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can manage webhook endpoints"
  ON webhook_endpoints
  FOR ALL
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Webhook events policies (service-level access mostly)
CREATE POLICY "Workspace admins can view webhook events"
  ON webhook_events
  FOR SELECT
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Sync jobs policies
CREATE POLICY "Workspace members can view sync jobs"
  ON sync_jobs
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can manage sync jobs"
  ON sync_jobs
  FOR ALL
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Sync job runs policies
CREATE POLICY "Workspace members can view sync job runs"
  ON sync_job_runs
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- Platform capabilities are read-only reference data
CREATE POLICY "All authenticated users can view platform sync capabilities"
  ON platform_sync_capabilities
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Webhook endpoints indexes
CREATE INDEX idx_webhook_endpoints_workspace_id ON webhook_endpoints(workspace_id);
CREATE INDEX idx_webhook_endpoints_social_account_id ON webhook_endpoints(social_account_id);
CREATE INDEX idx_webhook_endpoints_platform ON webhook_endpoints(platform);
CREATE INDEX idx_webhook_endpoints_is_active ON webhook_endpoints(is_active) WHERE is_active = true;

-- Webhook events indexes
CREATE INDEX idx_webhook_events_workspace_id ON webhook_events(workspace_id);
CREATE INDEX idx_webhook_events_webhook_endpoint_id ON webhook_events(webhook_endpoint_id);
CREATE INDEX idx_webhook_events_platform ON webhook_events(platform);
CREATE INDEX idx_webhook_events_event_type ON webhook_events(event_type);
CREATE INDEX idx_webhook_events_status ON webhook_events(status);
CREATE INDEX idx_webhook_events_pending ON webhook_events(created_at)
  WHERE status = 'pending';
CREATE INDEX idx_webhook_events_retry ON webhook_events(next_retry_at)
  WHERE status = 'failed' AND next_retry_at IS NOT NULL;
CREATE INDEX idx_webhook_events_created_at ON webhook_events(workspace_id, created_at DESC);

-- Sync jobs indexes
CREATE INDEX idx_sync_jobs_workspace_id ON sync_jobs(workspace_id);
CREATE INDEX idx_sync_jobs_social_account_id ON sync_jobs(social_account_id);
CREATE INDEX idx_sync_jobs_platform ON sync_jobs(platform);
CREATE INDEX idx_sync_jobs_status ON sync_jobs(status);
CREATE INDEX idx_sync_jobs_next_sync ON sync_jobs(next_sync_at)
  WHERE is_active = true AND status = 'idle';
CREATE INDEX idx_sync_jobs_is_active ON sync_jobs(is_active) WHERE is_active = true;

-- Sync job runs indexes
CREATE INDEX idx_sync_job_runs_sync_job_id ON sync_job_runs(sync_job_id);
CREATE INDEX idx_sync_job_runs_workspace_id ON sync_job_runs(workspace_id);
CREATE INDEX idx_sync_job_runs_created_at ON sync_job_runs(sync_job_id, created_at DESC);
CREATE INDEX idx_sync_job_runs_status ON sync_job_runs(status);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE webhook_endpoints IS 'Webhook registrations for real-time message synchronization';
COMMENT ON TABLE webhook_events IS 'Raw webhook events received from platforms for processing';
COMMENT ON TABLE sync_jobs IS 'Polling-based sync jobs for platforms without webhooks';
COMMENT ON TABLE sync_job_runs IS 'Historical record of sync job executions';
COMMENT ON TABLE platform_sync_capabilities IS 'Reference data defining sync capabilities for each platform';

COMMENT ON FUNCTION schedule_next_sync IS 'Calculates and sets the next sync time for a job';
COMMENT ON FUNCTION start_sync_job IS 'Marks a sync job as started and increments run counter';
COMMENT ON FUNCTION complete_sync_job IS 'Marks a sync job as completed successfully with results';
COMMENT ON FUNCTION fail_sync_job IS 'Marks a sync job as failed with error message and backoff';
COMMENT ON FUNCTION process_webhook_event IS 'Marks a webhook event as processing';
COMMENT ON FUNCTION get_pending_sync_jobs IS 'Returns sync jobs that are due to run';
