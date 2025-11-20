-- Seed platform capabilities data
-- This migration populates the platform_capabilities table with data for all supported platforms

INSERT INTO platform_capabilities (
  platform,
  supports_text,
  supports_images,
  supports_video,
  max_text_length,
  max_images,
  max_video_size_mb,
  max_video_duration_seconds,
  supported_image_formats,
  supported_video_formats,
  requires_fields,
  optional_fields
) VALUES
  -- WhatsApp Business Platform
  (
    'whatsapp',
    true,
    true,
    true,
    4096,
    1,
    16,
    NULL,
    ARRAY['image/jpeg', 'image/png'],
    ARRAY['video/mp4', 'video/3gpp'],
    '{"recipient_phone": "string"}',
    '{"template_name": "string", "template_params": "array"}'
  ),

  -- Threads (Meta)
  (
    'threads',
    true,
    true,
    true,
    500,
    10,
    NULL,
    NULL,
    ARRAY['image/jpeg', 'image/png', 'image/gif'],
    ARRAY['video/mp4'],
    '{}',
    '{"reply_to_id": "string", "quote_post_id": "string"}'
  ),

  -- X/Twitter
  (
    'twitter',
    true,
    true,
    true,
    280,
    4,
    512,
    140,
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ARRAY['video/mp4'],
    '{}',
    '{"reply_to_id": "string", "quote_tweet_id": "string", "poll": "object"}'
  ),

  -- Facebook
  (
    'facebook',
    true,
    true,
    true,
    63206,
    NULL,
    NULL,
    NULL,
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'],
    ARRAY['video/mp4', 'video/quicktime'],
    '{}',
    '{"link": "string", "tags": "array", "location": "object", "scheduled_publish_time": "timestamp"}'
  ),

  -- Instagram
  (
    'instagram',
    true,
    true,
    true,
    2200,
    10,
    100,
    60,
    ARRAY['image/jpeg', 'image/png'],
    ARRAY['video/mp4'],
    '{}',
    '{"location": "object", "user_tags": "array", "product_tags": "array"}'
  ),

  -- LinkedIn
  (
    'linkedin',
    true,
    true,
    true,
    3000,
    9,
    200,
    600,
    ARRAY['image/jpeg', 'image/png', 'image/gif'],
    ARRAY['video/mp4'],
    '{}',
    '{"visibility": "string", "share_commentary": "string"}'
  ),

  -- Pinterest
  (
    'pinterest',
    true,
    true,
    true,
    500,
    1,
    NULL,
    NULL,
    ARRAY['image/jpeg', 'image/png'],
    ARRAY['video/mp4'],
    '{"board_id": "string"}',
    '{"link": "string", "alt_text": "string"}'
  ),

  -- Reddit
  (
    'reddit',
    true,
    true,
    true,
    40000,
    20,
    1024,
    NULL,
    ARRAY['image/jpeg', 'image/png', 'image/gif'],
    ARRAY['video/mp4'],
    '{"subreddit": "string"}',
    '{"flair_id": "string", "nsfw": "boolean", "spoiler": "boolean"}'
  ),

  -- Slack
  (
    'slack',
    true,
    true,
    true,
    40000,
    NULL,
    1024,
    NULL,
    ARRAY['image/jpeg', 'image/png', 'image/gif'],
    ARRAY['video/mp4'],
    '{"channel_id": "string"}',
    '{"thread_ts": "string", "reply_broadcast": "boolean", "blocks": "array"}'
  ),

  -- Discord
  (
    'discord',
    true,
    true,
    true,
    2000,
    10,
    25,
    NULL,
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ARRAY['video/mp4', 'video/webm'],
    '{"channel_id": "string"}',
    '{"embeds": "array", "tts": "boolean", "message_reference": "object"}'
  ),

  -- TikTok
  (
    'tiktok',
    false,
    false,
    true,
    2200,
    NULL,
    4096,
    600,
    ARRAY[]::TEXT[],
    ARRAY['video/mp4'],
    '{}',
    '{"privacy_level": "string", "disable_duet": "boolean", "disable_comment": "boolean", "disable_stitch": "boolean"}'
  ),

  -- YouTube
  (
    'youtube',
    true,
    false,
    true,
    5000,
    NULL,
    256000,
    NULL,
    ARRAY[]::TEXT[],
    ARRAY['video/mp4', 'video/quicktime', 'video/avi', 'video/wmv', 'video/flv', 'video/webm'],
    '{"title": "string"}',
    '{"description": "string", "category_id": "string", "tags": "array", "privacy_status": "string", "playlist_id": "string"}'
  ),

  -- Bluesky
  (
    'bluesky',
    true,
    true,
    true,
    300,
    4,
    NULL,
    NULL,
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ARRAY['video/mp4'],
    '{}',
    '{"reply_to": "object", "quote": "object", "langs": "array"}'
  ),

  -- Google My Business
  (
    'google_my_business',
    true,
    true,
    true,
    1500,
    10,
    NULL,
    NULL,
    ARRAY['image/jpeg', 'image/png'],
    ARRAY['video/mp4'],
    '{"location_id": "string"}',
    '{"cta": "object", "event": "object", "offer": "object"}'
  );

-- Add index for faster lookups
CREATE INDEX idx_platform_capabilities_platform ON platform_capabilities(platform);

-- Add comments
COMMENT ON COLUMN platform_capabilities.requires_fields IS 'JSONB object defining required platform-specific fields with their types';
COMMENT ON COLUMN platform_capabilities.optional_fields IS 'JSONB object defining optional platform-specific fields with their types';
