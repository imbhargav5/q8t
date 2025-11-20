-- Initial schema for Q8T Social Media Manager
-- This migration creates the core tables for multi-platform content publishing

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE content_type AS ENUM ('text', 'image', 'video');
CREATE TYPE post_status AS ENUM ('draft', 'scheduled', 'publishing', 'published', 'failed');
CREATE TYPE publication_status AS ENUM ('pending', 'publishing', 'published', 'failed');
CREATE TYPE media_type AS ENUM ('image', 'video', 'gif');
CREATE TYPE social_platform AS ENUM (
  'whatsapp',
  'threads',
  'twitter',
  'facebook',
  'instagram',
  'linkedin',
  'pinterest',
  'reddit',
  'slack',
  'discord',
  'tiktok',
  'youtube',
  'bluesky',
  'google_my_business'
);

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Social accounts table - stores connected platform accounts
CREATE TABLE social_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,
  platform_user_id TEXT NOT NULL,
  platform_username TEXT,
  access_token TEXT, -- Should be encrypted at application level
  refresh_token TEXT, -- Should be encrypted at application level
  token_expires_at TIMESTAMPTZ,
  account_data JSONB DEFAULT '{}', -- Platform-specific metadata
  is_active BOOLEAN DEFAULT true NOT NULL,
  connected_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, platform, platform_user_id)
);

-- Posts table - unified content model for all platforms
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_type content_type NOT NULL,
  title TEXT,
  body TEXT,
  media_urls TEXT[], -- Array of URLs to media assets
  status post_status DEFAULT 'draft' NOT NULL,
  scheduled_for TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}', -- Hashtags, mentions, alt_text, etc.
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Post publications table - tracks publishing to each platform
CREATE TABLE post_publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  social_account_id UUID NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,
  platform social_platform NOT NULL, -- Denormalized for easier querying
  status publication_status DEFAULT 'pending' NOT NULL,
  platform_post_id TEXT, -- The ID returned by the platform after publishing
  platform_post_url TEXT, -- Direct URL to the published post
  platform_config JSONB DEFAULT '{}', -- Platform-specific configuration
  error_message TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(post_id, social_account_id)
);

-- Media assets table - reusable media library
CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type media_type NOT NULL,
  url TEXT NOT NULL, -- URL to Supabase Storage
  thumbnail_url TEXT,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  width INTEGER,
  height INTEGER,
  duration_seconds INTEGER, -- For videos
  alt_text TEXT,
  metadata JSONB DEFAULT '{}', -- Additional metadata
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Platform capabilities table - reference data for platform features
CREATE TABLE platform_capabilities (
  platform social_platform PRIMARY KEY,
  supports_text BOOLEAN NOT NULL,
  supports_images BOOLEAN NOT NULL,
  supports_video BOOLEAN NOT NULL,
  max_text_length INTEGER,
  max_images INTEGER,
  max_video_size_mb INTEGER,
  max_video_duration_seconds INTEGER,
  supported_image_formats TEXT[],
  supported_video_formats TEXT[],
  requires_fields JSONB DEFAULT '{}', -- Platform-specific required fields
  optional_fields JSONB DEFAULT '{}', -- Platform-specific optional fields
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_accounts_updated_at BEFORE UPDATE ON social_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_post_publications_updated_at BEFORE UPDATE ON post_publications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_assets_updated_at BEFORE UPDATE ON media_assets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_platform_capabilities_updated_at BEFORE UPDATE ON platform_capabilities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comments to tables for documentation
COMMENT ON TABLE users IS 'User profiles extending Supabase auth.users';
COMMENT ON TABLE social_accounts IS 'Connected social media platform accounts';
COMMENT ON TABLE posts IS 'Unified content model for multi-platform posts';
COMMENT ON TABLE post_publications IS 'Tracks publishing status for each platform';
COMMENT ON TABLE media_assets IS 'Reusable media library for images and videos';
COMMENT ON TABLE platform_capabilities IS 'Reference data defining platform-specific features and limits';
