-- Storage buckets for media assets
-- This migration creates Supabase Storage buckets for images and videos

-- Create storage bucket for media assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true, -- Public bucket so users can share links
  524288000, -- 500 MB max file size
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'video/mp4',
    'video/quicktime',
    'video/webm',
    'video/avi',
    'video/3gpp'
  ]
);

-- Create storage bucket for thumbnails
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'thumbnails',
  'thumbnails',
  true,
  10485760, -- 10 MB max file size
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
);

-- ============================================================================
-- STORAGE POLICIES FOR MEDIA BUCKET
-- ============================================================================

-- Users can upload their own media
CREATE POLICY "Users can upload own media"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can view their own media
CREATE POLICY "Users can view own media"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can update their own media
CREATE POLICY "Users can update own media"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can delete their own media
CREATE POLICY "Users can delete own media"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================================================
-- STORAGE POLICIES FOR THUMBNAILS BUCKET
-- ============================================================================

-- Users can upload their own thumbnails
CREATE POLICY "Users can upload own thumbnails"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'thumbnails' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can view their own thumbnails
CREATE POLICY "Users can view own thumbnails"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'thumbnails' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can update their own thumbnails
CREATE POLICY "Users can update own thumbnails"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'thumbnails' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can delete their own thumbnails
CREATE POLICY "Users can delete own thumbnails"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'thumbnails' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Add comments
COMMENT ON POLICY "Users can upload own media" ON storage.objects IS 'Users can upload media to their own folder (bucket_id/user_id/)';
COMMENT ON POLICY "Users can upload own thumbnails" ON storage.objects IS 'Users can upload thumbnails to their own folder (bucket_id/user_id/)';
