# @q8t/database

Database layer for Q8T Social Media Manager platform using Supabase.

## Overview

This package provides the database schema and migrations for a multi-platform social media management application. It supports posting text, image, and video content across 14+ social media platforms with a unified interface.

## Supported Platforms

- WhatsApp Business
- Threads (Meta)
- X/Twitter
- Facebook
- Instagram
- LinkedIn
- Pinterest
- Reddit
- Slack
- Discord
- TikTok
- YouTube
- Bluesky
- Google My Business

## Database Architecture

### Core Tables

#### `users`
User profiles extending Supabase authentication.

#### `social_accounts`
Connected social media platform accounts with OAuth tokens and platform-specific metadata.

#### `posts`
Unified content model supporting three content types:
- **text**: Text-only posts
- **image**: Posts with images (and optional text)
- **video**: Posts with videos (and optional text)

Each post can target multiple platforms simultaneously.

#### `post_publications`
Tracks the publishing status for each platform. One post can have multiple publications (one per platform/account).

Key features:
- Platform-specific configuration stored in JSONB `platform_config`
- Status tracking: `pending`, `publishing`, `published`, `failed`
- Error tracking for failed publications
- Platform post ID and URL storage for reference

#### `media_assets`
Reusable media library for images and videos with metadata, thumbnails, and alt text.

#### `platform_capabilities`
Reference table defining what each platform supports:
- Content types (text/image/video)
- Character limits
- Media limits (count, size, duration)
- Supported formats
- Required and optional fields

## Setup

### Prerequisites

- Node.js >= 18
- pnpm >= 9
- Supabase CLI (`npm install -g supabase` or `brew install supabase/tap/supabase`)
- Docker (for local Supabase development)

### Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Start local Supabase:**
   ```bash
   pnpm db:start
   ```

   This will:
   - Start Supabase Docker containers
   - Run all migrations
   - Set up local Studio UI at `http://localhost:54323`

4. **Access Supabase Studio:**
   Open `http://localhost:54323` in your browser to view and manage your local database.

### Production Setup

1. **Create a Supabase project:**
   - Go to [https://app.supabase.com](https://app.supabase.com)
   - Create a new project

2. **Update environment variables:**
   - Copy your project URL and keys from Project Settings → API
   - Update `.env` with your production credentials

3. **Run migrations:**
   ```bash
   pnpm db:migrate
   ```

## Available Scripts

```bash
# Start local Supabase (requires Docker)
pnpm db:start

# Stop local Supabase
pnpm db:stop

# Reset database (destructive - drops all data)
pnpm db:reset

# Run pending migrations
pnpm db:migrate

# Generate TypeScript types from schema
pnpm db:generate-types
```

## Migrations

Migrations are located in `supabase/migrations/` and are applied in order:

1. **00001_initial_schema.sql** - Core table definitions and enums
2. **00002_platform_capabilities_seed.sql** - Platform reference data
3. **00003_rls_policies.sql** - Row Level Security policies
4. **00004_storage_buckets.sql** - Supabase Storage setup for media
5. **00005_indexes.sql** - Performance indexes

## Security

### Row Level Security (RLS)

All tables have RLS enabled with policies ensuring:
- Users can only access their own data
- Social accounts are user-scoped
- Posts and publications are user-scoped
- Media assets are user-scoped
- Platform capabilities are read-only for all users

### Storage Policies

Media files are organized by user ID:
```
media/{user_id}/{filename}
thumbnails/{user_id}/{filename}
```

Users can only access files in their own folders.

## Database Design Principles

### Unified Content Model

Instead of having separate tables for each platform, we use a single `posts` table with:
- `content_type` enum to specify text/image/video
- `media_urls` array for flexible media attachments
- `metadata` JSONB for hashtags, mentions, alt text, etc.

### Platform-Specific Configuration

The `post_publications.platform_config` JSONB field allows flexible, platform-specific options:

```json
{
  "twitter": {
    "quote_tweet_id": "123456789",
    "poll": {
      "options": ["Option 1", "Option 2"],
      "duration_minutes": 1440
    }
  },
  "instagram": {
    "location": {
      "name": "San Francisco, CA",
      "lat": 37.7749,
      "lng": -122.4194
    },
    "user_tags": [{"username": "johndoe", "x": 0.5, "y": 0.5}]
  }
}
```

### Multi-Platform Publishing Flow

1. User creates a `post` with content and media
2. User selects target platforms (social accounts)
3. System creates `post_publications` records for each platform
4. Publishing service:
   - Checks `platform_capabilities` for compatibility
   - Validates content against platform limits
   - Publishes to each platform using the respective SDK
   - Updates publication status and stores platform post ID

## Content Type Compatibility

The system automatically validates content types against platform capabilities:

| Platform | Text | Image | Video |
|----------|------|-------|-------|
| WhatsApp | ✅ | ✅ | ✅ |
| Threads | ✅ | ✅ | ✅ |
| Twitter | ✅ | ✅ | ✅ |
| Facebook | ✅ | ✅ | ✅ |
| Instagram | ✅ | ✅ | ✅ |
| LinkedIn | ✅ | ✅ | ✅ |
| Pinterest | ✅ | ✅ | ✅ |
| Reddit | ✅ | ✅ | ✅ |
| Slack | ✅ | ✅ | ✅ |
| Discord | ✅ | ✅ | ✅ |
| TikTok | ❌ | ❌ | ✅ |
| YouTube | ✅ | ❌ | ✅ |
| Bluesky | ✅ | ✅ | ✅ |
| Google My Business | ✅ | ✅ | ✅ |

## Example Usage Flow

### Creating a Multi-Platform Post

```typescript
// 1. User creates a post
const post = {
  user_id: "user-uuid",
  content_type: "image",
  body: "Check out this amazing sunset! #photography #nature",
  media_urls: ["https://storage.supabase.co/media/user-uuid/sunset.jpg"],
  metadata: {
    hashtags: ["photography", "nature"],
    alt_text: "Beautiful sunset over the ocean"
  },
  status: "draft"
};

// 2. User selects platforms (Twitter, Instagram, Facebook)
// System creates post_publications for each

// 3. For Twitter
const twitterPublication = {
  post_id: post.id,
  social_account_id: "twitter-account-uuid",
  platform: "twitter",
  platform_config: {
    // Twitter-specific options
  },
  status: "pending"
};

// 4. Publishing service processes pending publications
// 5. Updates publication status to "published" with platform_post_id
```

## Future Enhancements

- [ ] Add `drafts` table for auto-saving
- [ ] Add `scheduled_posts` queue table for better scheduling
- [ ] Add `analytics` table for post performance metrics
- [ ] Add `templates` table for reusable content templates
- [ ] Add `teams` and `workspaces` for multi-user collaboration
- [ ] Add `webhooks` table for platform event handling

## Support

For issues or questions, please refer to the main Q8T repository.

## License

Private - Not for distribution
