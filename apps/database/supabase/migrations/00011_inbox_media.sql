-- Social Inbox Media - Media Attachments and Previews
-- This migration handles media (images, videos, documents) from inbox messages

-- Create enum types for media
CREATE TYPE inbox_media_type AS ENUM (
  'image',
  'video',
  'audio',
  'document',
  'gif',
  'sticker',
  'voice_note',
  'file',
  'link_preview'
);

CREATE TYPE inbox_media_processing_status AS ENUM (
  'pending',      -- Waiting to be processed
  'downloading',  -- Currently downloading preview
  'processing',   -- Generating thumbnail
  'completed',    -- Ready to use
  'failed',       -- Processing failed
  'skipped'       -- Skipped (too large, unsupported format, etc.)
);

-- ============================================================================
-- SOCIAL INBOX MEDIA TABLE
-- ============================================================================

CREATE TABLE social_inbox_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Media identification
  platform social_platform NOT NULL,
  platform_media_id TEXT, -- Platform's media identifier

  -- Media type and format
  media_type inbox_media_type NOT NULL,
  mime_type TEXT,
  file_extension TEXT,

  -- Original media URLs from platform
  original_url TEXT NOT NULL, -- Direct URL from platform
  original_expires_at TIMESTAMPTZ, -- For platforms with expiring URLs

  -- Stored media in Supabase Storage
  thumbnail_url TEXT, -- Our stored thumbnail/preview
  thumbnail_storage_path TEXT, -- Path in Supabase Storage bucket

  -- Processing status
  processing_status inbox_media_processing_status DEFAULT 'pending' NOT NULL,
  processing_error TEXT,
  processed_at TIMESTAMPTZ,

  -- Media metadata
  file_size_bytes BIGINT,
  width INTEGER,
  height INTEGER,
  duration_seconds INTEGER, -- For video/audio

  -- Thumbnail metadata
  thumbnail_width INTEGER,
  thumbnail_height INTEGER,
  thumbnail_size_bytes BIGINT,

  -- Alt text and descriptions
  alt_text TEXT,
  caption TEXT,

  -- Platform-specific metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- STORAGE BUCKET CONFIGURATION
-- ============================================================================

-- Create storage bucket for inbox media (thumbnails/previews)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'social-inbox-media',
  'social-inbox-media',
  false, -- Private bucket, requires authentication
  10485760, -- 10MB limit for thumbnails
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/webm',
    'audio/mpeg',
    'audio/wav',
    'audio/ogg'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for social inbox media bucket
CREATE POLICY "Workspace members can view inbox media"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'social-inbox-media' AND
    EXISTS (
      SELECT 1 FROM social_inbox_media sim
      WHERE sim.thumbnail_storage_path = storage.objects.name
      AND is_workspace_member(sim.workspace_id, auth.uid())
    )
  );

CREATE POLICY "Workspace members can upload inbox media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'social-inbox-media' AND
    -- Path should be: {workspace_id}/{year}/{month}/{filename}
    (storage.foldername(name))[1] IN (
      SELECT w.id::text
      FROM workspaces w
      JOIN workspace_members wm ON wm.workspace_id = w.id
      WHERE wm.user_id = auth.uid()
      AND wm.status = 'active'
    )
  );

CREATE POLICY "Workspace admins can delete inbox media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'social-inbox-media' AND
    EXISTS (
      SELECT 1 FROM social_inbox_media sim
      WHERE sim.thumbnail_storage_path = storage.objects.name
      AND has_workspace_role(sim.workspace_id, auth.uid(), 'admin')
    )
  );

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_social_inbox_media_updated_at BEFORE UPDATE ON social_inbox_media
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to generate storage path for inbox media
CREATE OR REPLACE FUNCTION generate_inbox_media_storage_path(
  workspace_uuid UUID,
  file_extension_param TEXT DEFAULT 'jpg'
)
RETURNS TEXT AS $$
DECLARE
  year TEXT;
  month TEXT;
  random_id TEXT;
BEGIN
  year := TO_CHAR(NOW(), 'YYYY');
  month := TO_CHAR(NOW(), 'MM');
  random_id := SUBSTRING(gen_random_uuid()::TEXT FROM 1 FOR 12);

  RETURN workspace_uuid::TEXT || '/' || year || '/' || month || '/' || random_id || '.' || file_extension_param;
END;
$$ LANGUAGE plpgsql;

-- Function to update message media flags
CREATE OR REPLACE FUNCTION update_message_media_flags()
RETURNS TRIGGER AS $$
DECLARE
  media_count_val INTEGER;
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    -- Count total media for the message
    SELECT COUNT(*) INTO media_count_val
    FROM social_inbox_media
    WHERE message_id = NEW.message_id
    AND processing_status = 'completed';

    -- Update message flags
    UPDATE social_inbox_messages
    SET
      has_media = (media_count_val > 0),
      media_count = media_count_val
    WHERE id = NEW.message_id;
  ELSIF TG_OP = 'DELETE' THEN
    -- Recalculate after deletion
    SELECT COUNT(*) INTO media_count_val
    FROM social_inbox_media
    WHERE message_id = OLD.message_id
    AND processing_status = 'completed';

    UPDATE social_inbox_messages
    SET
      has_media = (media_count_val > 0),
      media_count = media_count_val
    WHERE id = OLD.message_id;
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to update message media flags
CREATE TRIGGER update_message_media_flags_trigger
  AFTER INSERT OR UPDATE OR DELETE ON social_inbox_media
  FOR EACH ROW
  EXECUTE FUNCTION update_message_media_flags();

-- Function to clean up expired media
CREATE OR REPLACE FUNCTION cleanup_expired_inbox_media()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  -- Delete media where original URL has expired and we have no thumbnail
  DELETE FROM social_inbox_media
  WHERE original_expires_at < NOW()
  AND thumbnail_url IS NULL
  AND processing_status IN ('failed', 'skipped');

  GET DIAGNOSTICS deleted_count = ROW_COUNT;

  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get media statistics for workspace
CREATE OR REPLACE FUNCTION get_workspace_inbox_media_stats(workspace_uuid UUID)
RETURNS TABLE(
  total_media BIGINT,
  total_images BIGINT,
  total_videos BIGINT,
  total_audio BIGINT,
  total_documents BIGINT,
  total_storage_bytes BIGINT,
  pending_processing BIGINT,
  failed_processing BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*) as total_media,
    COUNT(*) FILTER (WHERE media_type = 'image') as total_images,
    COUNT(*) FILTER (WHERE media_type = 'video') as total_videos,
    COUNT(*) FILTER (WHERE media_type = 'audio') as total_audio,
    COUNT(*) FILTER (WHERE media_type = 'document') as total_documents,
    COALESCE(SUM(thumbnail_size_bytes), 0) as total_storage_bytes,
    COUNT(*) FILTER (WHERE processing_status = 'pending') as pending_processing,
    COUNT(*) FILTER (WHERE processing_status = 'failed') as failed_processing
  FROM social_inbox_media
  WHERE workspace_id = workspace_uuid;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE social_inbox_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workspace members can view inbox media"
  ON social_inbox_media
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can insert inbox media"
  ON social_inbox_media
  FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can update inbox media"
  ON social_inbox_media
  FOR UPDATE
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can delete inbox media"
  ON social_inbox_media
  FOR DELETE
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Primary lookup indexes
CREATE INDEX idx_inbox_media_workspace_id ON social_inbox_media(workspace_id);
CREATE INDEX idx_inbox_media_message_id ON social_inbox_media(message_id);
CREATE INDEX idx_inbox_media_platform ON social_inbox_media(platform);
CREATE INDEX idx_inbox_media_media_type ON social_inbox_media(media_type);
CREATE INDEX idx_inbox_media_processing_status ON social_inbox_media(processing_status);

-- Composite indexes for common queries
CREATE INDEX idx_inbox_media_workspace_type ON social_inbox_media(workspace_id, media_type);
CREATE INDEX idx_inbox_media_workspace_status ON social_inbox_media(workspace_id, processing_status);
CREATE INDEX idx_inbox_media_message_type ON social_inbox_media(message_id, media_type);

-- Performance indexes
CREATE INDEX idx_inbox_media_pending_processing ON social_inbox_media(workspace_id, created_at)
  WHERE processing_status = 'pending';

CREATE INDEX idx_inbox_media_failed_processing ON social_inbox_media(workspace_id, created_at DESC)
  WHERE processing_status = 'failed';

CREATE INDEX idx_inbox_media_expired_urls ON social_inbox_media(original_expires_at)
  WHERE original_expires_at IS NOT NULL AND original_expires_at < NOW();

CREATE INDEX idx_inbox_media_storage_path ON social_inbox_media(thumbnail_storage_path)
  WHERE thumbnail_storage_path IS NOT NULL;

CREATE INDEX idx_inbox_media_created_at ON social_inbox_media(workspace_id, created_at DESC);

-- GIN index for metadata search
CREATE INDEX idx_inbox_media_metadata ON social_inbox_media USING GIN (metadata);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE social_inbox_media IS 'Media attachments from inbox messages with thumbnails stored in Supabase Storage';

COMMENT ON COLUMN social_inbox_media.original_url IS 'Direct URL to media from platform (may expire)';
COMMENT ON COLUMN social_inbox_media.thumbnail_url IS 'Public URL to our stored thumbnail/preview in Supabase Storage';
COMMENT ON COLUMN social_inbox_media.thumbnail_storage_path IS 'Path in Supabase Storage bucket: workspace_id/year/month/filename';
COMMENT ON COLUMN social_inbox_media.processing_status IS 'Status of thumbnail generation and download process';
COMMENT ON COLUMN social_inbox_media.original_expires_at IS 'Expiration time for platform URLs (WhatsApp, some others have temporary URLs)';

COMMENT ON FUNCTION generate_inbox_media_storage_path IS 'Generates organized storage path for inbox media: {workspace_id}/{year}/{month}/{random_id}.{ext}';
COMMENT ON FUNCTION update_message_media_flags IS 'Automatically updates has_media and media_count flags in social_inbox_messages';
COMMENT ON FUNCTION cleanup_expired_inbox_media IS 'Removes media records with expired URLs and no stored thumbnails';
COMMENT ON FUNCTION get_workspace_inbox_media_stats IS 'Returns media statistics for a workspace';
