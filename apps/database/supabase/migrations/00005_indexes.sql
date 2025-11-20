-- Performance indexes for optimized queries
-- This migration creates indexes to speed up common query patterns

-- ============================================================================
-- USERS TABLE INDEXES
-- ============================================================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- ============================================================================
-- SOCIAL ACCOUNTS TABLE INDEXES
-- ============================================================================

-- Index for finding accounts by user
CREATE INDEX idx_social_accounts_user_id ON social_accounts(user_id);

-- Index for finding accounts by platform
CREATE INDEX idx_social_accounts_platform ON social_accounts(platform);

-- Composite index for finding user's accounts on specific platform
CREATE INDEX idx_social_accounts_user_platform ON social_accounts(user_id, platform);

-- Index for finding active accounts
CREATE INDEX idx_social_accounts_is_active ON social_accounts(is_active) WHERE is_active = true;

-- Index for finding accounts with expired tokens
CREATE INDEX idx_social_accounts_token_expires_at ON social_accounts(token_expires_at)
  WHERE token_expires_at IS NOT NULL;

-- ============================================================================
-- POSTS TABLE INDEXES
-- ============================================================================

-- Index for finding posts by user
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Index for finding posts by status
CREATE INDEX idx_posts_status ON posts(status);

-- Composite index for finding user's posts by status
CREATE INDEX idx_posts_user_status ON posts(user_id, status);

-- Index for finding posts by content type
CREATE INDEX idx_posts_content_type ON posts(content_type);

-- Index for scheduled posts (for scheduling workers)
CREATE INDEX idx_posts_scheduled_for ON posts(scheduled_for)
  WHERE scheduled_for IS NOT NULL AND status = 'scheduled';

-- Index for published posts
CREATE INDEX idx_posts_published_at ON posts(published_at DESC)
  WHERE published_at IS NOT NULL;

-- Index for recent posts by user
CREATE INDEX idx_posts_user_created_at ON posts(user_id, created_at DESC);

-- ============================================================================
-- POST PUBLICATIONS TABLE INDEXES
-- ============================================================================

-- Index for finding publications by post
CREATE INDEX idx_post_publications_post_id ON post_publications(post_id);

-- Index for finding publications by social account
CREATE INDEX idx_post_publications_social_account_id ON post_publications(social_account_id);

-- Index for finding publications by platform
CREATE INDEX idx_post_publications_platform ON post_publications(platform);

-- Index for finding publications by status
CREATE INDEX idx_post_publications_status ON post_publications(status);

-- Composite index for finding post's publications by status
CREATE INDEX idx_post_publications_post_status ON post_publications(post_id, status);

-- Index for finding failed publications (for retry logic)
CREATE INDEX idx_post_publications_failed ON post_publications(status, created_at DESC)
  WHERE status = 'failed';

-- Index for finding pending publications (for publishing workers)
CREATE INDEX idx_post_publications_pending ON post_publications(status, created_at)
  WHERE status = 'pending';

-- Index for published publications
CREATE INDEX idx_post_publications_published_at ON post_publications(published_at DESC)
  WHERE published_at IS NOT NULL;

-- Index for finding platform post ID (for webhook lookups)
CREATE INDEX idx_post_publications_platform_post_id ON post_publications(platform_post_id)
  WHERE platform_post_id IS NOT NULL;

-- ============================================================================
-- MEDIA ASSETS TABLE INDEXES
-- ============================================================================

-- Index for finding media by user
CREATE INDEX idx_media_assets_user_id ON media_assets(user_id);

-- Index for finding media by type
CREATE INDEX idx_media_assets_type ON media_assets(type);

-- Composite index for finding user's media by type
CREATE INDEX idx_media_assets_user_type ON media_assets(user_id, type);

-- Index for recent media by user
CREATE INDEX idx_media_assets_user_created_at ON media_assets(user_id, created_at DESC);

-- Index for finding media by filename (for duplicate detection)
CREATE INDEX idx_media_assets_filename ON media_assets(user_id, filename);

-- GIN index for searching metadata JSONB
CREATE INDEX idx_media_assets_metadata ON media_assets USING GIN (metadata);

-- ============================================================================
-- JSONB INDEXES FOR FLEXIBLE QUERYING
-- ============================================================================

-- GIN index for searching post metadata (hashtags, mentions, etc.)
CREATE INDEX idx_posts_metadata ON posts USING GIN (metadata);

-- GIN index for searching social account data
CREATE INDEX idx_social_accounts_account_data ON social_accounts USING GIN (account_data);

-- GIN index for searching publication platform config
CREATE INDEX idx_post_publications_platform_config ON post_publications USING GIN (platform_config);

-- Add comments
COMMENT ON INDEX idx_posts_scheduled_for IS 'Optimizes queries for scheduling workers that need to find posts ready to publish';
COMMENT ON INDEX idx_post_publications_pending IS 'Optimizes queries for publishing workers that need to find pending publications';
COMMENT ON INDEX idx_post_publications_failed IS 'Optimizes queries for retry logic to find failed publications';
COMMENT ON INDEX idx_posts_metadata IS 'Enables fast searches on post metadata like hashtags and mentions using GIN indexing';
