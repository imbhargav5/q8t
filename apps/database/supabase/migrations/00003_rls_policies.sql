-- Row Level Security (RLS) Policies
-- This migration enables RLS and creates policies to ensure users can only access their own data

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_capabilities ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- USERS TABLE POLICIES
-- ============================================================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile (for initial setup)
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- SOCIAL ACCOUNTS TABLE POLICIES
-- ============================================================================

-- Users can view their own social accounts
CREATE POLICY "Users can view own social accounts"
  ON social_accounts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own social accounts
CREATE POLICY "Users can insert own social accounts"
  ON social_accounts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own social accounts
CREATE POLICY "Users can update own social accounts"
  ON social_accounts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own social accounts
CREATE POLICY "Users can delete own social accounts"
  ON social_accounts
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- POSTS TABLE POLICIES
-- ============================================================================

-- Users can view their own posts
CREATE POLICY "Users can view own posts"
  ON posts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own posts
CREATE POLICY "Users can insert own posts"
  ON posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own posts
CREATE POLICY "Users can update own posts"
  ON posts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete own posts"
  ON posts
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- POST PUBLICATIONS TABLE POLICIES
-- ============================================================================

-- Users can view publications for their own posts
CREATE POLICY "Users can view own post publications"
  ON post_publications
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_publications.post_id
      AND posts.user_id = auth.uid()
    )
  );

-- Users can insert publications for their own posts
CREATE POLICY "Users can insert own post publications"
  ON post_publications
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_publications.post_id
      AND posts.user_id = auth.uid()
    )
  );

-- Users can update publications for their own posts
CREATE POLICY "Users can update own post publications"
  ON post_publications
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_publications.post_id
      AND posts.user_id = auth.uid()
    )
  );

-- Users can delete publications for their own posts
CREATE POLICY "Users can delete own post publications"
  ON post_publications
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_publications.post_id
      AND posts.user_id = auth.uid()
    )
  );

-- ============================================================================
-- MEDIA ASSETS TABLE POLICIES
-- ============================================================================

-- Users can view their own media assets
CREATE POLICY "Users can view own media assets"
  ON media_assets
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own media assets
CREATE POLICY "Users can insert own media assets"
  ON media_assets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own media assets
CREATE POLICY "Users can update own media assets"
  ON media_assets
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own media assets
CREATE POLICY "Users can delete own media assets"
  ON media_assets
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- PLATFORM CAPABILITIES TABLE POLICIES
-- ============================================================================

-- Platform capabilities are read-only reference data - all authenticated users can view
CREATE POLICY "All users can view platform capabilities"
  ON platform_capabilities
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Only service role can modify platform capabilities (no user policies for INSERT/UPDATE/DELETE)

-- Add comments
COMMENT ON POLICY "Users can view own profile" ON users IS 'Users can only view their own profile data';
COMMENT ON POLICY "Users can view own social accounts" ON social_accounts IS 'Users can only view social accounts they own';
COMMENT ON POLICY "Users can view own posts" ON posts IS 'Users can only view posts they created';
COMMENT ON POLICY "Users can view own post publications" ON post_publications IS 'Users can only view publications for their own posts';
COMMENT ON POLICY "Users can view own media assets" ON media_assets IS 'Users can only view media assets they uploaded';
COMMENT ON POLICY "All users can view platform capabilities" ON platform_capabilities IS 'All authenticated users can view platform capabilities (reference data)';
