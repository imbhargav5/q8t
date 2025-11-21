-- Platform-Specific Message Tables
-- This migration creates dedicated tables for each platform's unique message structure

-- First, update the social_platform enum to include all platforms
ALTER TYPE social_platform ADD VALUE IF NOT EXISTS 'telegram';
ALTER TYPE social_platform ADD VALUE IF NOT EXISTS 'mastodon';
ALTER TYPE social_platform ADD VALUE IF NOT EXISTS 'farcaster';
ALTER TYPE social_platform ADD VALUE IF NOT EXISTS 'nostr';

-- ============================================================================
-- TWITTER/X MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_twitter (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Tweet/DM identification
  tweet_id TEXT UNIQUE NOT NULL,
  conversation_id TEXT, -- Twitter's conversation_id

  -- Content
  text TEXT NOT NULL,
  lang TEXT,

  -- Author information
  author_id TEXT NOT NULL,
  author_username TEXT NOT NULL,
  author_name TEXT NOT NULL,

  -- Engagement metrics
  retweet_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  quote_count INTEGER DEFAULT 0,
  bookmark_count INTEGER DEFAULT 0,
  impression_count INTEGER DEFAULT 0,

  -- Tweet metadata
  is_reply BOOLEAN DEFAULT false,
  is_quote BOOLEAN DEFAULT false,
  is_retweet BOOLEAN DEFAULT false,
  in_reply_to_user_id TEXT,
  referenced_tweet_id TEXT,

  -- Entities (mentions, hashtags, urls, etc.)
  entities JSONB DEFAULT '{}',

  -- Extended metadata
  tweet_metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TELEGRAM MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_telegram (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Message identification
  message_id BIGINT NOT NULL,
  chat_id BIGINT NOT NULL,

  -- Content
  text TEXT,
  caption TEXT,

  -- Author information
  from_user_id BIGINT,
  from_username TEXT,
  from_first_name TEXT,
  from_last_name TEXT,

  -- Message metadata
  forward_from_user_id BIGINT,
  forward_from_chat_id BIGINT,
  reply_to_message_id BIGINT,
  edit_date TIMESTAMPTZ,

  -- Media types
  has_photo BOOLEAN DEFAULT false,
  has_video BOOLEAN DEFAULT false,
  has_document BOOLEAN DEFAULT false,
  has_audio BOOLEAN DEFAULT false,
  has_voice BOOLEAN DEFAULT false,
  has_sticker BOOLEAN DEFAULT false,

  -- Entities
  entities JSONB DEFAULT '{}',

  -- Full message data
  message_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(chat_id, message_id)
);

-- ============================================================================
-- INSTAGRAM MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_instagram (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Message identification
  ig_message_id TEXT UNIQUE NOT NULL,
  ig_thread_id TEXT,

  -- Content
  text TEXT,
  message_type TEXT, -- text, media, story_mention, story_reply, etc.

  -- Author information
  sender_id TEXT NOT NULL,
  sender_username TEXT,

  -- Media information
  media_url TEXT,
  media_type TEXT, -- image, video, audio
  media_id TEXT,

  -- Story context (for story mentions/replies)
  story_id TEXT,
  story_url TEXT,

  -- Metadata
  is_unsupported BOOLEAN DEFAULT false,
  message_metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- DISCORD MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_discord (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Message identification
  discord_message_id TEXT UNIQUE NOT NULL,
  channel_id TEXT NOT NULL,
  guild_id TEXT,

  -- Content
  content TEXT NOT NULL,

  -- Author information
  author_id TEXT NOT NULL,
  author_username TEXT NOT NULL,
  author_discriminator TEXT,
  author_avatar TEXT,

  -- Message metadata
  message_type INTEGER, -- Discord message type enum
  edited_timestamp TIMESTAMPTZ,
  is_pinned BOOLEAN DEFAULT false,
  is_tts BOOLEAN DEFAULT false,

  -- Thread information
  thread_id TEXT,
  referenced_message_id TEXT,

  -- Embeds and attachments
  embeds JSONB DEFAULT '[]',
  attachments JSONB DEFAULT '[]',
  stickers JSONB DEFAULT '[]',

  -- Mentions
  mentions JSONB DEFAULT '{}',

  -- Reactions
  reactions JSONB DEFAULT '[]',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- MASTODON MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_mastodon (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Status identification
  status_id TEXT UNIQUE NOT NULL,
  uri TEXT NOT NULL,
  url TEXT,

  -- Content
  content TEXT NOT NULL, -- HTML content
  text TEXT, -- Plain text version
  spoiler_text TEXT,
  language TEXT,

  -- Author information
  account_id TEXT NOT NULL,
  account_username TEXT NOT NULL,
  account_display_name TEXT,
  account_url TEXT,

  -- Visibility and moderation
  visibility TEXT, -- public, unlisted, private, direct
  sensitive BOOLEAN DEFAULT false,

  -- Engagement
  replies_count INTEGER DEFAULT 0,
  reblogs_count INTEGER DEFAULT 0,
  favourites_count INTEGER DEFAULT 0,

  -- Context
  in_reply_to_id TEXT,
  in_reply_to_account_id TEXT,
  reblog_of_id TEXT,

  -- Media attachments
  media_attachments JSONB DEFAULT '[]',

  -- Entities
  mentions JSONB DEFAULT '[]',
  tags JSONB DEFAULT '[]',
  emojis JSONB DEFAULT '[]',

  -- Poll (if present)
  poll JSONB,

  -- Full status data
  status_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- REDDIT MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_reddit (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Message identification
  reddit_id TEXT UNIQUE NOT NULL, -- Reddit's thing_id (t1_, t4_, etc.)
  reddit_name TEXT UNIQUE NOT NULL, -- Fullname (kind + id)

  -- Content type
  item_type TEXT NOT NULL, -- comment, message, post_reply, username_mention

  -- Content
  body TEXT NOT NULL,
  body_html TEXT,

  -- Author information
  author TEXT NOT NULL,
  author_fullname TEXT,

  -- Context (for comments/replies)
  subreddit TEXT,
  link_id TEXT, -- Post this is related to
  parent_id TEXT, -- Parent comment/message
  context TEXT, -- URL to context

  -- Metadata
  score INTEGER,
  is_new BOOLEAN DEFAULT true,
  distinguished TEXT, -- null, moderator, admin

  -- Full message data
  message_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- SLACK MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_slack (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Message identification
  slack_ts TEXT NOT NULL, -- Message timestamp (unique ID)
  channel_id TEXT NOT NULL,
  team_id TEXT,

  -- Content
  text TEXT NOT NULL,
  message_type TEXT, -- message, app_mention, etc.
  subtype TEXT, -- bot_message, file_share, etc.

  -- Author information
  user_id TEXT,
  username TEXT,
  bot_id TEXT,

  -- Thread information
  thread_ts TEXT, -- Parent message timestamp for threads

  -- Metadata
  is_edited BOOLEAN DEFAULT false,
  is_starred BOOLEAN DEFAULT false,

  -- Attachments and blocks
  attachments JSONB DEFAULT '[]',
  blocks JSONB DEFAULT '[]',
  files JSONB DEFAULT '[]',

  -- Reactions
  reactions JSONB DEFAULT '[]',

  -- Full message data
  message_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(channel_id, slack_ts)
);

-- ============================================================================
-- WHATSAPP MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_whatsapp (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Message identification
  wamid TEXT UNIQUE NOT NULL, -- WhatsApp Message ID

  -- Content
  message_type TEXT NOT NULL, -- text, image, video, audio, document, location, contacts, etc.
  text_body TEXT,
  caption TEXT,

  -- Author information
  from_phone TEXT NOT NULL,
  from_name TEXT,

  -- Context (for replies)
  context_message_id TEXT,

  -- Media information
  media_id TEXT,
  media_mime_type TEXT,
  media_sha256 TEXT,
  media_size INTEGER,

  -- Location (if message_type = location)
  location_latitude DOUBLE PRECISION,
  location_longitude DOUBLE PRECISION,
  location_name TEXT,
  location_address TEXT,

  -- Status tracking
  status TEXT, -- sent, delivered, read, failed

  -- Full message data
  message_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- FACEBOOK MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_facebook (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Message identification
  fb_message_id TEXT UNIQUE NOT NULL,
  fb_thread_id TEXT,

  -- Content
  message_text TEXT,
  message_type TEXT, -- text, image, video, file, etc.

  -- Author information
  sender_id TEXT NOT NULL,
  sender_name TEXT,

  -- Media
  attachments JSONB DEFAULT '[]',

  -- Context
  reply_to_message_id TEXT,

  -- Post context (for comments on posts)
  post_id TEXT,
  comment_id TEXT,

  -- Full message data
  message_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- LINKEDIN MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_linkedin (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Message identification
  linkedin_message_id TEXT UNIQUE NOT NULL,
  conversation_id TEXT,

  -- Content
  message_text TEXT NOT NULL,
  message_type TEXT, -- text, inmail, comment, etc.

  -- Author information
  sender_id TEXT NOT NULL,
  sender_name TEXT,
  sender_headline TEXT,

  -- Attachments
  attachments JSONB DEFAULT '[]',

  -- Post context (for comments)
  post_id TEXT,
  comment_id TEXT,

  -- Full message data
  message_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- FARCASTER MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_farcaster (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Cast identification
  cast_hash TEXT UNIQUE NOT NULL,
  cast_id TEXT,

  -- Content
  text TEXT NOT NULL,

  -- Author information
  fid BIGINT NOT NULL, -- Farcaster ID
  username TEXT,
  display_name TEXT,

  -- Parent cast (for replies)
  parent_cast_hash TEXT,
  parent_fid BIGINT,

  -- Channel
  channel_id TEXT,

  -- Embeds
  embeds JSONB DEFAULT '[]',

  -- Mentions
  mentions JSONB DEFAULT '[]',

  -- Reactions
  reactions_count INTEGER DEFAULT 0,
  recasts_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,

  -- Full cast data
  cast_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- BLUESKY MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_bluesky (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Post identification
  post_uri TEXT UNIQUE NOT NULL,
  cid TEXT NOT NULL,

  -- Content
  text TEXT NOT NULL,
  langs TEXT[],

  -- Author information
  author_did TEXT NOT NULL,
  author_handle TEXT NOT NULL,
  author_display_name TEXT,

  -- Parent post (for replies)
  parent_uri TEXT,
  root_uri TEXT,

  -- Embeds
  embed JSONB,

  -- Facets (mentions, links, tags)
  facets JSONB DEFAULT '[]',

  -- Engagement
  reply_count INTEGER DEFAULT 0,
  repost_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,

  -- Full post data
  post_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- THREADS (META) MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Thread identification
  thread_id TEXT UNIQUE NOT NULL,

  -- Content
  text TEXT NOT NULL,
  media_type TEXT, -- TEXT, IMAGE, VIDEO, CAROUSEL_ALBUM

  -- Author information
  author_id TEXT NOT NULL,
  author_username TEXT,

  -- Parent thread (for replies)
  reply_to_id TEXT,

  -- Media
  media_url TEXT,
  thumbnail_url TEXT,

  -- Engagement
  like_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  quote_count INTEGER DEFAULT 0,

  -- Full thread data
  thread_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TIKTOK MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_tiktok (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Message identification
  tiktok_comment_id TEXT UNIQUE NOT NULL,
  video_id TEXT,

  -- Content
  text TEXT NOT NULL,

  -- Author information
  author_id TEXT NOT NULL,
  author_username TEXT,
  author_nickname TEXT,

  -- Parent comment (for replies)
  parent_comment_id TEXT,

  -- Engagement
  like_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,

  -- Full comment data
  comment_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- PINTEREST MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_pinterest (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Comment identification
  pinterest_comment_id TEXT UNIQUE NOT NULL,
  pin_id TEXT NOT NULL,

  -- Content
  text TEXT NOT NULL,

  -- Author information
  author_id TEXT NOT NULL,
  author_username TEXT,

  -- Full comment data
  comment_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- YOUTUBE MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_youtube (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Comment identification
  youtube_comment_id TEXT UNIQUE NOT NULL,
  video_id TEXT NOT NULL,
  channel_id TEXT,

  -- Content
  text_display TEXT NOT NULL,
  text_original TEXT NOT NULL,

  -- Author information
  author_channel_id TEXT NOT NULL,
  author_display_name TEXT NOT NULL,
  author_profile_image_url TEXT,

  -- Parent comment (for replies)
  parent_comment_id TEXT,

  -- Engagement
  like_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,

  -- Moderation
  can_rate BOOLEAN DEFAULT true,
  viewer_rating TEXT, -- none, like, dislike

  -- Full comment data
  comment_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- NOSTR MESSAGES
-- ============================================================================

CREATE TABLE inbox_messages_nostr (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Event identification
  event_id TEXT UNIQUE NOT NULL,
  pubkey TEXT NOT NULL,

  -- Content
  content TEXT NOT NULL,
  kind INTEGER NOT NULL, -- Nostr event kind

  -- Metadata
  tags JSONB DEFAULT '[]',
  sig TEXT NOT NULL, -- Signature

  -- Full event data
  event_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- GENERIC PLATFORM MESSAGES (fallback for simple platforms)
-- ============================================================================

CREATE TABLE inbox_messages_generic (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Message identification
  platform_message_id TEXT NOT NULL,
  platform_name TEXT NOT NULL,

  -- Content
  content TEXT NOT NULL,
  content_html TEXT,

  -- Author information
  author_id TEXT NOT NULL,
  author_username TEXT,
  author_display_name TEXT,

  -- Parent message (for threading)
  parent_platform_message_id TEXT,

  -- Engagement metrics
  engagement_metrics JSONB DEFAULT '{}',

  -- Full message data (complete platform response)
  message_data JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(platform_name, platform_message_id)
);

-- ============================================================================
-- INDEXES FOR ALL PLATFORM TABLES
-- ============================================================================

-- Twitter indexes
CREATE INDEX idx_inbox_twitter_inbox_message_id ON inbox_messages_twitter(inbox_message_id);
CREATE INDEX idx_inbox_twitter_tweet_id ON inbox_messages_twitter(tweet_id);
CREATE INDEX idx_inbox_twitter_author_id ON inbox_messages_twitter(author_id);
CREATE INDEX idx_inbox_twitter_conversation_id ON inbox_messages_twitter(conversation_id);

-- Telegram indexes
CREATE INDEX idx_inbox_telegram_inbox_message_id ON inbox_messages_telegram(inbox_message_id);
CREATE INDEX idx_inbox_telegram_chat_message ON inbox_messages_telegram(chat_id, message_id);

-- Instagram indexes
CREATE INDEX idx_inbox_instagram_inbox_message_id ON inbox_messages_instagram(inbox_message_id);
CREATE INDEX idx_inbox_instagram_thread_id ON inbox_messages_instagram(ig_thread_id);

-- Discord indexes
CREATE INDEX idx_inbox_discord_inbox_message_id ON inbox_messages_discord(inbox_message_id);
CREATE INDEX idx_inbox_discord_channel_id ON inbox_messages_discord(channel_id);
CREATE INDEX idx_inbox_discord_author_id ON inbox_messages_discord(author_id);

-- Mastodon indexes
CREATE INDEX idx_inbox_mastodon_inbox_message_id ON inbox_messages_mastodon(inbox_message_id);
CREATE INDEX idx_inbox_mastodon_account_id ON inbox_messages_mastodon(account_id);

-- Reddit indexes
CREATE INDEX idx_inbox_reddit_inbox_message_id ON inbox_messages_reddit(inbox_message_id);
CREATE INDEX idx_inbox_reddit_author ON inbox_messages_reddit(author);

-- Slack indexes
CREATE INDEX idx_inbox_slack_inbox_message_id ON inbox_messages_slack(inbox_message_id);
CREATE INDEX idx_inbox_slack_channel_ts ON inbox_messages_slack(channel_id, slack_ts);

-- WhatsApp indexes
CREATE INDEX idx_inbox_whatsapp_inbox_message_id ON inbox_messages_whatsapp(inbox_message_id);
CREATE INDEX idx_inbox_whatsapp_from_phone ON inbox_messages_whatsapp(from_phone);

-- Facebook indexes
CREATE INDEX idx_inbox_facebook_inbox_message_id ON inbox_messages_facebook(inbox_message_id);
CREATE INDEX idx_inbox_facebook_thread_id ON inbox_messages_facebook(fb_thread_id);

-- LinkedIn indexes
CREATE INDEX idx_inbox_linkedin_inbox_message_id ON inbox_messages_linkedin(inbox_message_id);
CREATE INDEX idx_inbox_linkedin_conversation_id ON inbox_messages_linkedin(conversation_id);

-- Farcaster indexes
CREATE INDEX idx_inbox_farcaster_inbox_message_id ON inbox_messages_farcaster(inbox_message_id);
CREATE INDEX idx_inbox_farcaster_fid ON inbox_messages_farcaster(fid);

-- Bluesky indexes
CREATE INDEX idx_inbox_bluesky_inbox_message_id ON inbox_messages_bluesky(inbox_message_id);
CREATE INDEX idx_inbox_bluesky_author_did ON inbox_messages_bluesky(author_did);

-- Threads indexes
CREATE INDEX idx_inbox_threads_inbox_message_id ON inbox_messages_threads(inbox_message_id);
CREATE INDEX idx_inbox_threads_author_id ON inbox_messages_threads(author_id);

-- TikTok indexes
CREATE INDEX idx_inbox_tiktok_inbox_message_id ON inbox_messages_tiktok(inbox_message_id);
CREATE INDEX idx_inbox_tiktok_video_id ON inbox_messages_tiktok(video_id);

-- Pinterest indexes
CREATE INDEX idx_inbox_pinterest_inbox_message_id ON inbox_messages_pinterest(inbox_message_id);
CREATE INDEX idx_inbox_pinterest_pin_id ON inbox_messages_pinterest(pin_id);

-- YouTube indexes
CREATE INDEX idx_inbox_youtube_inbox_message_id ON inbox_messages_youtube(inbox_message_id);
CREATE INDEX idx_inbox_youtube_video_id ON inbox_messages_youtube(video_id);

-- Nostr indexes
CREATE INDEX idx_inbox_nostr_inbox_message_id ON inbox_messages_nostr(inbox_message_id);
CREATE INDEX idx_inbox_nostr_pubkey ON inbox_messages_nostr(pubkey);

-- Generic indexes
CREATE INDEX idx_inbox_generic_inbox_message_id ON inbox_messages_generic(inbox_message_id);
CREATE INDEX idx_inbox_generic_platform_message ON inbox_messages_generic(platform_name, platform_message_id);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE inbox_messages_twitter IS 'Twitter/X specific message data including tweets, DMs, mentions';
COMMENT ON TABLE inbox_messages_telegram IS 'Telegram specific message data from Bot API or Gateway API';
COMMENT ON TABLE inbox_messages_instagram IS 'Instagram specific message data including DMs and story mentions';
COMMENT ON TABLE inbox_messages_discord IS 'Discord specific message data including server messages and DMs';
COMMENT ON TABLE inbox_messages_mastodon IS 'Mastodon specific status/message data';
COMMENT ON TABLE inbox_messages_reddit IS 'Reddit specific messages including comments, DMs, and mentions';
COMMENT ON TABLE inbox_messages_slack IS 'Slack workspace messages and DMs';
COMMENT ON TABLE inbox_messages_whatsapp IS 'WhatsApp Business Platform messages';
COMMENT ON TABLE inbox_messages_facebook IS 'Facebook messages and comments';
COMMENT ON TABLE inbox_messages_linkedin IS 'LinkedIn messages and comments';
COMMENT ON TABLE inbox_messages_farcaster IS 'Farcaster protocol casts and direct casts';
COMMENT ON TABLE inbox_messages_bluesky IS 'Bluesky AT Protocol posts and messages';
COMMENT ON TABLE inbox_messages_threads IS 'Meta Threads posts and replies';
COMMENT ON TABLE inbox_messages_tiktok IS 'TikTok comments and messages';
COMMENT ON TABLE inbox_messages_pinterest IS 'Pinterest comments on pins';
COMMENT ON TABLE inbox_messages_youtube IS 'YouTube comments on videos';
COMMENT ON TABLE inbox_messages_nostr IS 'Nostr protocol events and messages';
COMMENT ON TABLE inbox_messages_generic IS 'Generic fallback table for platforms with simple message structures';
