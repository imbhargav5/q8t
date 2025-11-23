# Q8T Platform - Packages and Database Migrations Plan

**Generated:** 2025-11-23
**Analysis Scope:** Full repository audit including existing packages, recent features, and design guide requirements

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Repository Overview](#repository-overview)
3. [Existing Infrastructure](#existing-infrastructure)
4. [Recently Added Features](#recently-added-features)
5. [Missing Packages Plan](#missing-packages-plan)
6. [Missing Database Migrations Plan](#missing-database-migrations-plan)
7. [Implementation Priorities](#implementation-priorities)
8. [Next Steps](#next-steps)

---

## Executive Summary

**Q8T** is a comprehensive open-source social media management platform currently in the design phase. The platform uses a **mock-first development approach** where the UI is built with Zod schemas and mock data before implementing backend functionality.

**Current State:**
- 34 packages (18 social platform SDKs, 13 business integrations, 3 infrastructure)
- 22 database migrations covering core features
- Rich UI with mock data for most features
- Recent additions: Analytics Overview, Crisis Management, Content Calendar

**Gaps Identified:**
- **14 missing packages** needed for full functionality
- **10 missing database migrations** to support existing UI features
- Business logic layer needed to connect UI mock data to real database operations

---

## Repository Overview

### Architecture
- **Monorepo:** Turborepo with pnpm workspaces
- **Frontend:** Next.js 14 with React Server Components
- **UI:** Tailwind CSS + Shadcn UI components
- **Validation:** Zod schemas for type-safe data models
- **Database:** Supabase (PostgreSQL)
- **Queue:** Inngest for background jobs

### Development Philosophy
1. Design UI first with mock data
2. Define Zod schemas for all data structures
3. Create database migrations when ready for backend
4. Build SDK packages for platform integrations
5. Implement business logic to connect everything

---

## Existing Infrastructure

### Packages (34 total)

#### Social Platform SDKs (18)
| Platform | Package | Status |
|----------|---------|--------|
| Facebook | `@q8t/facebook-sdk` | ✅ |
| Instagram | `@q8t/instagram-sdk` | ✅ |
| X/Twitter | `@q8t/x-sdk` | ✅ |
| LinkedIn | `@q8t/linkedin-sdk` | ✅ |
| TikTok | `@q8t/tiktok-sdk` | ✅ |
| YouTube | `@q8t/youtube-sdk` | ✅ |
| Threads | `@q8t/threads-sdk` | ✅ |
| Bluesky | `@q8t/bluesky-sdk` | ✅ |
| Mastodon | `@q8t/mastodon-sdk` | ✅ |
| Nostr | `@q8t/nostr-sdk` | ✅ |
| Farcaster | `@q8t/farcaster-sdk` | ✅ |
| Pinterest | `@q8t/pinterest-sdk` | ✅ |
| Reddit | `@q8t/reddit-sdk` | ✅ |
| Discord | `@q8t/discord-sdk` | ✅ |
| Slack | `@q8t/slack-sdk` | ✅ |
| WhatsApp | `@q8t/whatsapp-sdk` | ✅ |
| Telegram | `@q8t/telegram-sdk` | ✅ |
| Dribbble | `@q8t/dribbble-sdk` | ✅ |

#### Business Integrations (13)
| Integration | Package | Purpose |
|-------------|---------|---------|
| Salesforce | `@q8t/salesforce-sdk` | CRM integration |
| Monday.com | `@q8t/monday-sdk` | Project management |
| ClickUp | `@q8t/clickup-sdk` | Task management |
| Asana | `@q8t/asana-sdk` | Project management |
| Notion | `@q8t/notion-sdk` | Documentation |
| Airtable | `@q8t/airtable-sdk` | Database |
| Dropbox | `@q8t/dropbox-sdk` | File storage |
| Trustpilot | `@q8t/trustpilot-sdk` | Review management |
| Google My Business | `@q8t/google-my-business-sdk` | Local business |
| Cloudinary | `@q8t/cloudinary-sdk` | Media hosting |

#### Infrastructure (3)
| Package | Purpose |
|---------|---------|
| `@q8t/queue` | Job queue system |
| `@q8t/listening` | Social listening engine |
| `@q8t/utils` | Shared utilities |
| `@q8t/typescript-config` | TS configurations |
| `@q8t/effect-sdk-base` | Effect SDK base |

### Database Tables (100+ tables)

**Core:** users, workspaces, workspace_members, social_accounts, posts, post_publications, media_assets

**CRM:** crm_people, crm_social_identities, crm_activity_log, crm_segments, crm_custom_field_definitions

**Inbox:** social_inbox_conversations, social_inbox_messages, inbox_tags, inbox_views, platform-specific message tables

**Listening:** listening_streams, listening_stream_items, listening_queries, listening_mentions, listening_alerts

**Crisis:** crisis_incidents, crisis_detection_rules, message_sentiment, status_components

**Automation:** content_queue, evergreen_content, rss_feeds, automation_logs, approval_workflows

**Analytics:** post_analytics, account_analytics, analytics_snapshots, hashtag_performance

**Sync:** sync_jobs, sync_job_runs, integration_tasks

---

## Recently Added Features

Analysis of commits from the last 2 weeks:

### 1. Analytics Overview (#57)
- **Added:** Analytics dashboard UI
- **Mock Data:** Platform performance, top posts, quick insights, activity timeline
- **Zod Schemas:** ✅ Created
- **Database Migration:** ⚠️ Partial (00014_analytics_core.sql)
- **Gap:** Missing views and aggregation tables for overview metrics

### 2. Crisis Management with Social Signals (#58)
- **Added:** Crisis incident tracking, social signal monitoring
- **Mock Data:** Crisis incidents, detection rules, status components, social signals
- **Zod Schemas:** ✅ Comprehensive automation.schema.ts
- **Database Migration:** ✅ 00018_crisis_management.sql
- **Status:** Complete

### 3. Content Calendar Compose Screen (#59)
- **Added:** Powerful post composition interface
- **Mock Data:** Posts with rich metadata
- **Zod Schemas:** ✅ post.schema.ts
- **Database Migration:** ✅ In initial schema
- **Gap:** Missing calendar-specific features (views, labels, themes)

### 4. Mini Calendar Component (#63)
- **Added:** Scheduling calendar UI component
- **Purpose:** Visual date/time selection for scheduling
- **Gap:** Needs recurring schedule support in database

### 5. Social Listening System (#53, #47)
- **Added:** Comprehensive listening with Inngest
- **Mock Data:** Listening streams, stream items, keywords
- **Zod Schemas:** ✅ listening.schema.ts
- **Database Migration:** ✅ 00020_social_listening.sql
- **Status:** Complete

### 6. Queue System (#46)
- **Added:** Multi-platform publishing queue
- **Mock Data:** Queue items, schedules
- **Database Migration:** ✅ Included in automation migrations
- **Status:** Complete

---

## Missing Packages Plan

### High Priority

#### 1. Analytics Package
**Path:** `packages/analytics`

**Purpose:** Core analytics engine for social media metrics calculation and aggregation.

**Responsibilities:**
- Calculate engagement rates, reach, impressions
- Track follower growth and trends over time
- Generate performance scores (0-100 scale)
- Aggregate cross-platform metrics
- Time-series data analysis
- Best posting time recommendations
- Audience insights and demographics

**Key Modules:**
```
packages/analytics/
├── src/
│   ├── metrics/
│   │   ├── engagement.ts          # Engagement rate calculations
│   │   ├── reach.ts               # Reach and impressions
│   │   ├── growth.ts              # Follower growth tracking
│   │   └── performance.ts         # Performance scoring
│   ├── aggregators/
│   │   ├── cross-platform.ts      # Multi-platform aggregation
│   │   ├── time-series.ts         # Time-based analysis
│   │   └── comparisons.ts         # Period comparisons
│   ├── insights/
│   │   ├── posting-times.ts       # Optimal posting times
│   │   ├── content-types.ts       # Best performing content
│   │   └── audience.ts            # Audience insights
│   ├── trending/
│   │   ├── detection.ts           # Trend detection algorithms
│   │   └── scoring.ts             # Trend scoring
│   └── index.ts
├── tests/
└── package.json
```

**Tech Stack:**
- Effect for type-safe operations
- Date-fns for time calculations
- Simple-statistics for statistical analysis

**Database Dependencies:**
- post_analytics
- account_analytics
- analytics_snapshots
- social_accounts

**Example Usage:**
```typescript
import { Analytics } from '@q8t/analytics';

const analytics = new Analytics(supabaseClient);

// Calculate engagement rate
const engagementRate = await analytics.calculateEngagementRate({
  postId: 'post-123',
  platform: 'instagram'
});

// Get best posting times
const bestTimes = await analytics.getBestPostingTimes({
  workspaceId: 'workspace-1',
  platform: 'twitter',
  lookbackDays: 30
});

// Generate overview metrics
const overview = await analytics.getOverviewMetrics({
  workspaceId: 'workspace-1',
  period: { start: '2024-01-01', end: '2024-01-31' }
});
```

---

#### 2. Publishing Orchestrator Package
**Path:** `packages/publishing-orchestrator`

**Purpose:** Coordinate multi-platform content publishing with validation, scheduling, and error handling.

**Responsibilities:**
- Validate content against platform requirements
- Queue publishing jobs
- Handle rate limiting per platform
- Implement retry logic with exponential backoff
- Track publishing status
- Process webhooks from platforms
- Generate publishing analytics

**Key Modules:**
```
packages/publishing-orchestrator/
├── src/
│   ├── scheduler/
│   │   ├── queue.ts               # Job queue management
│   │   ├── cron.ts                # Scheduled publishing
│   │   └── priority.ts            # Priority handling
│   ├── validators/
│   │   ├── content.ts             # Content validation
│   │   ├── media.ts               # Media validation
│   │   ├── platform-limits.ts    # Platform-specific rules
│   │   └── compliance.ts          # Compliance checks
│   ├── publishers/
│   │   ├── factory.ts             # Publisher factory
│   │   ├── batch.ts               # Batch publishing
│   │   └── single.ts              # Single post publishing
│   ├── retry/
│   │   ├── strategies.ts          # Retry strategies
│   │   ├── backoff.ts             # Exponential backoff
│   │   └── limits.ts              # Retry limits
│   ├── webhooks/
│   │   ├── handlers.ts            # Webhook processors
│   │   └── verification.ts       # Signature verification
│   └── index.ts
```

**Integration with Queue:**
```typescript
import { PublishingOrchestrator } from '@q8t/publishing-orchestrator';
import { Queue } from '@q8t/queue';

const orchestrator = new PublishingOrchestrator({
  queue: queueClient,
  platforms: {
    twitter: twitterSDK,
    instagram: instagramSDK,
    // ... other platforms
  }
});

// Publish to multiple platforms
await orchestrator.publish({
  postId: 'post-123',
  platforms: ['twitter', 'instagram', 'facebook'],
  scheduledFor: new Date('2024-12-01T10:00:00Z')
});
```

---

#### 3. Media Processing Package
**Path:** `packages/media-processing`

**Purpose:** Image and video optimization, transformation, and platform-specific formatting.

**Responsibilities:**
- Image resizing and optimization
- Video transcoding for platform requirements
- Thumbnail generation
- Format conversion (JPEG, PNG, WebP, MP4, MOV)
- Watermarking
- Platform-specific optimization (Instagram square, Twitter ratio, etc.)
- Alt-text generation using AI
- Face detection and cropping

**Key Modules:**
```
packages/media-processing/
├── src/
│   ├── images/
│   │   ├── resize.ts              # Image resizing
│   │   ├── optimize.ts            # Compression
│   │   ├── crop.ts                # Smart cropping
│   │   └── filters.ts             # Image filters
│   ├── videos/
│   │   ├── transcode.ts           # Video transcoding
│   │   ├── trim.ts                # Video trimming
│   │   ├── compress.ts            # Compression
│   │   └── watermark.ts           # Video watermarking
│   ├── thumbnails/
│   │   ├── generate.ts            # Thumbnail generation
│   │   └── sprite.ts              # Video sprite sheets
│   ├── formats/
│   │   ├── convert.ts             # Format conversion
│   │   └── detect.ts              # Format detection
│   ├── ai/
│   │   ├── alt-text.ts            # AI alt-text generation
│   │   ├── faces.ts               # Face detection
│   │   └── objects.ts             # Object recognition
│   ├── platform-specs/
│   │   ├── instagram.ts           # Instagram requirements
│   │   ├── twitter.ts             # Twitter requirements
│   │   └── index.ts               # All platforms
│   └── index.ts
```

**Tech Stack:**
- Sharp for image processing
- FFmpeg (via fluent-ffmpeg) for video
- OpenAI Vision API for AI features
- Cloudinary SDK for cloud processing

**Example Usage:**
```typescript
import { MediaProcessor } from '@q8t/media-processing';

const processor = new MediaProcessor();

// Optimize image for Instagram
const optimized = await processor.optimizeForPlatform({
  inputPath: '/path/to/image.jpg',
  platform: 'instagram',
  postType: 'feed'  // or 'story', 'reel'
});

// Generate video thumbnail
const thumbnail = await processor.generateVideoThumbnail({
  videoPath: '/path/to/video.mp4',
  timestamp: 5.0  // 5 seconds in
});

// AI alt-text generation
const altText = await processor.generateAltText({
  imagePath: '/path/to/image.jpg'
});
```

---

#### 4. Sentiment Analysis Package
**Path:** `packages/sentiment-analysis`

**Purpose:** AI-powered sentiment and emotion detection for messages, comments, and social mentions.

**Responsibilities:**
- Sentiment classification (positive, negative, neutral)
- Emotion detection (joy, anger, frustration, fear, etc.)
- Keyword extraction
- Category classification
- Multi-language support
- Confidence scoring
- Batch processing for efficiency

**Key Modules:**
```
packages/sentiment-analysis/
├── src/
│   ├── classifiers/
│   │   ├── sentiment.ts           # Sentiment classification
│   │   ├── emotions.ts            # Emotion detection
│   │   └── categories.ts          # Category classification
│   ├── extractors/
│   │   ├── keywords.ts            # Keyword extraction
│   │   ├── entities.ts            # Named entity recognition
│   │   └── topics.ts              # Topic modeling
│   ├── languages/
│   │   ├── detector.ts            # Language detection
│   │   └── processors.ts          # Language-specific processing
│   ├── models/
│   │   ├── openai.ts              # OpenAI integration
│   │   ├── claude.ts              # Claude integration
│   │   └── local.ts               # Local models
│   ├── batch/
│   │   └── processor.ts           # Batch processing
│   └── index.ts
```

**Tech Stack:**
- OpenAI API for sentiment analysis
- Anthropic Claude for nuanced understanding
- Compromise for local NLP (fallback)
- Lingua for language detection

**Example Usage:**
```typescript
import { SentimentAnalyzer } from '@q8t/sentiment-analysis';

const analyzer = new SentimentAnalyzer({
  provider: 'openai',  // or 'claude', 'local'
  apiKey: process.env.OPENAI_API_KEY
});

// Analyze single message
const result = await analyzer.analyze({
  text: "This product is absolutely terrible! Very disappointed.",
  language: 'en'
});
// {
//   sentiment: 'negative',
//   score: -0.85,
//   confidence: 0.92,
//   emotions: { anger: 0.75, disappointment: 0.65 },
//   keywords: ['terrible', 'disappointed']
// }

// Batch analysis
const results = await analyzer.analyzeBatch([
  { id: '1', text: 'Love this!' },
  { id: '2', text: 'Hate it.' },
  { id: '3', text: 'It\'s okay I guess' }
]);
```

---

#### 5. Sync Engine Package
**Path:** `packages/sync-engine`

**Purpose:** Sync data from social platforms (analytics, comments, followers) to local database.

**Responsibilities:**
- Profile and account data sync
- Post performance metrics sync
- Comments and engagement sync
- Follower/subscriber data sync
- Incremental sync strategies
- Conflict resolution
- Sync scheduling and throttling
- Error handling and retry

**Key Modules:**
```
packages/sync-engine/
├── src/
│   ├── schedulers/
│   │   ├── cron.ts                # Scheduled syncs
│   │   ├── realtime.ts            # Real-time updates
│   │   └── manual.ts              # Manual triggers
│   ├── adapters/
│   │   ├── instagram.ts           # Instagram sync
│   │   ├── twitter.ts             # Twitter sync
│   │   └── index.ts               # All platforms
│   ├── strategies/
│   │   ├── full.ts                # Full sync
│   │   ├── incremental.ts         # Incremental sync
│   │   └── selective.ts           # Selective sync
│   ├── mergers/
│   │   ├── data-merger.ts         # Data merging logic
│   │   └── conflicts.ts           # Conflict resolution
│   ├── queue/
│   │   └── sync-queue.ts          # Sync job queue
│   └── index.ts
```

**Example Usage:**
```typescript
import { SyncEngine } from '@q8t/sync-engine';

const syncEngine = new SyncEngine({
  platforms: {
    instagram: instagramSDK,
    twitter: twitterSDK
  }
});

// Sync post analytics
await syncEngine.syncPostAnalytics({
  postId: 'post-123',
  platforms: ['instagram', 'twitter']
});

// Sync all account data
await syncEngine.syncAccount({
  socialAccountId: 'account-456',
  strategy: 'incremental',
  since: new Date('2024-01-01')
});
```

---

### Medium Priority

#### 6. Influencer Management Package
**Path:** `packages/influencer-management`

**Purpose:** Discover, score, and manage influencer partnerships.

**Responsibilities:**
- Influencer discovery by niche/keywords
- Engagement rate calculations
- Audience demographics analysis
- Partnership campaign tracking
- ROI measurement
- Influencer scoring and ranking
- Contact management

**Key Modules:**
```
packages/influencer-management/
├── src/
│   ├── discovery/
│   │   ├── search.ts              # Search influencers
│   │   ├── filters.ts             # Filter criteria
│   │   └── scraping.ts            # Data collection
│   ├── scoring/
│   │   ├── engagement.ts          # Engagement scoring
│   │   ├── authenticity.ts        # Fake follower detection
│   │   ├── relevance.ts           # Niche relevance
│   │   └── composite.ts           # Overall score
│   ├── campaigns/
│   │   ├── manager.ts             # Campaign management
│   │   ├── tracking.ts            # Performance tracking
│   │   └── roi.ts                 # ROI calculations
│   ├── analytics/
│   │   ├── performance.ts         # Influencer performance
│   │   └── demographics.ts        # Audience analysis
│   └── index.ts
```

---

#### 7. Competitor Analysis Package
**Path:** `packages/competitor-analysis`

**Purpose:** Track and analyze competitor social media strategies.

**Responsibilities:**
- Competitor account monitoring
- Content strategy analysis
- Posting frequency tracking
- Engagement comparison
- Hashtag strategy analysis
- Growth rate tracking
- Competitive benchmarking

**Key Modules:**
```
packages/competitor-analysis/
├── src/
│   ├── tracking/
│   │   ├── monitor.ts             # Account monitoring
│   │   ├── content.ts             # Content tracking
│   │   └── schedules.ts           # Posting patterns
│   ├── analysis/
│   │   ├── engagement.ts          # Engagement analysis
│   │   ├── content-themes.ts      # Content themes
│   │   └── hashtags.ts            # Hashtag usage
│   ├── benchmarking/
│   │   ├── metrics.ts             # Metric comparisons
│   │   └── reports.ts             # Benchmark reports
│   └── index.ts
```

---

#### 8. Hashtag Analytics Package
**Path:** `packages/hashtag-analytics`

**Purpose:** Hashtag research, tracking, and AI-powered recommendations.

**Responsibilities:**
- Trending hashtag discovery
- Hashtag performance tracking
- Competition analysis (how crowded)
- AI-powered recommendations
- Cross-platform hashtag analytics
- Hashtag set management

**Key Modules:**
```
packages/hashtag-analytics/
├── src/
│   ├── discovery/
│   │   ├── trending.ts            # Find trending hashtags
│   │   ├── related.ts             # Related hashtags
│   │   └── niche.ts               # Niche-specific
│   ├── tracking/
│   │   ├── performance.ts         # Track performance
│   │   └── competition.ts         # Competition level
│   ├── recommendations/
│   │   ├── ai-suggest.ts          # AI suggestions
│   │   └── mix.ts                 # Hashtag mix optimization
│   └── index.ts
```

---

#### 9. AI Content Generator Package
**Path:** `packages/ai-content-generator`

**Purpose:** AI-powered content creation, optimization, and repurposing.

**Responsibilities:**
- Post caption generation
- Content repurposing across platforms
- Hashtag suggestions
- Image alt-text generation
- Content optimization for engagement
- Multi-language content creation
- Tone/voice customization

**Key Modules:**
```
packages/ai-content-generator/
├── src/
│   ├── generation/
│   │   ├── captions.ts            # Caption generation
│   │   ├── hooks.ts               # Attention-grabbing hooks
│   │   └── variations.ts          # Content variations
│   ├── optimization/
│   │   ├── improve.ts             # Content improvement
│   │   ├── tone.ts                # Tone adjustment
│   │   └── length.ts              # Length optimization
│   ├── repurposing/
│   │   ├── cross-platform.ts      # Platform adaptation
│   │   └── formats.ts             # Format conversion
│   ├── prompts/
│   │   ├── templates.ts           # Prompt templates
│   │   └── builder.ts             # Prompt builder
│   └── index.ts
```

**Tech Stack:**
- OpenAI GPT-4
- Anthropic Claude
- Google Gemini

---

#### 10. URL Shortener Package
**Path:** `packages/url-shortener`

**Purpose:** Link shortening, click tracking, and UTM management.

**Responsibilities:**
- URL shortening with custom slugs
- Click tracking and analytics
- UTM parameter management
- QR code generation
- Custom domain support
- Link expiration
- Geographic analytics

**Key Modules:**
```
packages/url-shortener/
├── src/
│   ├── shortener/
│   │   ├── generator.ts           # Short code generation
│   │   ├── custom.ts              # Custom slugs
│   │   └── domains.ts             # Custom domains
│   ├── tracking/
│   │   ├── clicks.ts              # Click tracking
│   │   ├── analytics.ts           # Click analytics
│   │   └── geographic.ts          # Location tracking
│   ├── utm/
│   │   ├── builder.ts             # UTM builder
│   │   └── campaigns.ts           # Campaign management
│   ├── qr/
│   │   └── generator.ts           # QR code generation
│   └── index.ts
```

---

### Lower Priority

#### 11. Reporting Package
**Path:** `packages/reporting`

**Purpose:** Generate customizable reports and dashboards.

**Modules:** templates/, generators/, schedulers/, visualizations/, exporters/

---

#### 12. Review Management Package
**Path:** `packages/review-management`

**Purpose:** Centralized review monitoring and response management.

**Modules:** aggregators/, sentiment/, responses/, analytics/

---

#### 13. Approval Workflow Package
**Path:** `packages/approval-workflow`

**Purpose:** Team collaboration and content approval workflows.

**Modules:** workflows/, permissions/, notifications/, versioning/

---

#### 14. Webhook Handler Package
**Path:** `packages/webhook-handler`

**Purpose:** Process incoming webhooks from social platforms.

**Modules:** receivers/, verifiers/, processors/, routers/

---

## Missing Database Migrations Plan

### High Priority Migrations

#### 1. Analytics Enhancement (`00023_analytics_enhancement.sql`)

**Purpose:** Support the Analytics Overview UI added in PR #57

**Tables to Add:**

```sql
-- Analytics overview snapshots for historical tracking
CREATE TABLE analytics_overview_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Period
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  period_type analytics_period NOT NULL,

  -- Key metrics
  total_engagement INTEGER DEFAULT 0,
  total_reach INTEGER DEFAULT 0,
  total_impressions INTEGER DEFAULT 0,
  follower_growth INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0,
  posts_published INTEGER DEFAULT 0,

  -- Inbox metrics
  avg_response_time INTEGER DEFAULT 0, -- seconds
  csat_score DECIMAL(3,2), -- 1-5

  -- Overall score
  social_performance_score DECIMAL(5,2) DEFAULT 0, -- 0-100

  -- Trends (comparison to previous period)
  engagement_trend DECIMAL(5,2),
  reach_trend DECIMAL(5,2),
  follower_growth_trend DECIMAL(5,2),
  engagement_rate_trend DECIMAL(5,2),

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, period_start, period_end, period_type)
);

-- Platform performance comparison
CREATE TABLE platform_performance_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  social_account_id UUID NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,

  -- Period
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,

  -- Metrics
  follower_count INTEGER DEFAULT 0,
  follower_growth INTEGER DEFAULT 0,
  growth_percentage DECIMAL(5,2),
  engagement_rate DECIMAL(5,2),
  total_engagement INTEGER DEFAULT 0,
  total_reach INTEGER DEFAULT 0,
  posts_published INTEGER DEFAULT 0,

  -- Top post reference
  top_post_id UUID REFERENCES posts(id),
  top_post_engagement INTEGER,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(social_account_id, period_start, period_end)
);

-- Detailed engagement breakdowns
CREATE TABLE engagement_breakdown (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  post_publication_id UUID REFERENCES post_publications(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,

  -- Detailed engagement by type
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,

  -- Platform-specific
  retweets INTEGER DEFAULT 0, -- Twitter
  quote_tweets INTEGER DEFAULT 0, -- Twitter
  replies INTEGER DEFAULT 0, -- Twitter
  reactions JSONB DEFAULT '{}', -- Facebook reactions

  -- Time-based
  engagement_24h INTEGER DEFAULT 0,
  engagement_7d INTEGER DEFAULT 0,
  engagement_30d INTEGER DEFAULT 0,

  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Audience insights
CREATE TABLE audience_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  social_account_id UUID REFERENCES social_accounts(id),
  platform social_platform,

  -- Demographics
  age_distribution JSONB, -- {"18-24": 25, "25-34": 40, ...}
  gender_distribution JSONB, -- {"male": 60, "female": 38, "other": 2}
  location_distribution JSONB, -- {"US": 40, "UK": 20, ...}

  -- Behavior
  peak_activity_hours INTEGER[], -- [8, 9, 10, 18, 19, 20]
  peak_activity_days INTEGER[], -- [1, 2, 3, 4, 5] (Mon-Fri)

  -- Interests
  top_interests TEXT[],

  -- Period
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,

  synced_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Quick insights (AI-generated)
CREATE TABLE quick_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  category TEXT NOT NULL, -- 'working', 'attention', 'opportunity'
  message TEXT NOT NULL,
  impact TEXT NOT NULL, -- 'high', 'medium', 'low'

  -- Action
  actionable BOOLEAN DEFAULT false,
  action_label TEXT,
  action_url TEXT,

  -- Metadata
  related_platform social_platform,
  related_post_id UUID REFERENCES posts(id),
  related_metric TEXT,

  -- Status
  is_read BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,

  -- Validity
  expires_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Activity timeline items
CREATE TABLE activity_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  type TEXT NOT NULL, -- 'milestone', 'alert', 'achievement', 'warning'
  severity TEXT, -- 'info', 'success', 'warning', 'error'

  title TEXT NOT NULL,
  description TEXT NOT NULL,

  -- References
  related_entity_type TEXT, -- 'post', 'account', 'campaign'
  related_entity_id UUID,

  timestamp TIMESTAMPTZ NOT NULL,

  -- Status
  is_read BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX idx_analytics_overview_workspace_period
  ON analytics_overview_snapshots(workspace_id, period_start, period_end);

CREATE INDEX idx_platform_performance_workspace
  ON platform_performance_snapshots(workspace_id, period_start);

CREATE INDEX idx_engagement_breakdown_post
  ON engagement_breakdown(post_id);

CREATE INDEX idx_audience_insights_workspace
  ON audience_insights(workspace_id, period_start);

CREATE INDEX idx_quick_insights_workspace_unread
  ON quick_insights(workspace_id, is_read, created_at);

CREATE INDEX idx_activity_timeline_workspace
  ON activity_timeline(workspace_id, timestamp DESC);
```

**RLS Policies:** Workspace-scoped access

---

#### 2. Content Calendar Enhancement (`00029_content_calendar.sql`)

**Purpose:** Support the Content Calendar UI features

**Tables to Add:**

```sql
-- Calendar views (saved configurations)
CREATE TABLE calendar_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  view_type TEXT NOT NULL, -- 'month', 'week', 'day', 'agenda'

  -- Filters
  filter_platforms social_platform[],
  filter_social_accounts UUID[],
  filter_labels UUID[],
  filter_status post_status[],

  -- Display settings
  display_settings JSONB DEFAULT '{}',

  is_default BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Recurring posting schedules
CREATE TABLE posting_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  -- Recurrence pattern
  recurrence_rule TEXT NOT NULL, -- iCal RRULE format
  timezone TEXT NOT NULL DEFAULT 'UTC',

  -- Target platforms
  target_platforms social_platform[],
  target_social_accounts UUID[],

  -- Content template
  content_template TEXT,
  default_media UUID[], -- media_asset IDs

  -- Status
  is_active BOOLEAN DEFAULT true,
  next_scheduled_at TIMESTAMPTZ,

  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Content themes/campaigns
CREATE TABLE content_themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  color TEXT, -- Hex color for calendar display

  -- Time range
  start_date DATE,
  end_date DATE,

  -- Metadata
  hashtags TEXT[],
  target_audience TEXT,
  goals TEXT,

  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Calendar labels
CREATE TABLE calendar_labels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  color TEXT NOT NULL, -- Hex color
  description TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, name)
);

-- Post-label associations
CREATE TABLE post_labels (
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  label_id UUID NOT NULL REFERENCES calendar_labels(id) ON DELETE CASCADE,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  PRIMARY KEY(post_id, label_id)
);

-- Post-theme associations
CREATE TABLE post_themes (
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  theme_id UUID NOT NULL REFERENCES content_themes(id) ON DELETE CASCADE,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  PRIMARY KEY(post_id, theme_id)
);

-- Draft auto-save versions
CREATE TABLE draft_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,

  version_number INTEGER NOT NULL,
  content JSONB NOT NULL, -- Full post content snapshot

  auto_saved BOOLEAN DEFAULT true,
  saved_by UUID REFERENCES users(id),
  saved_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(post_id, version_number)
);

-- Indexes
CREATE INDEX idx_calendar_views_workspace ON calendar_views(workspace_id);
CREATE INDEX idx_posting_schedules_workspace ON posting_schedules(workspace_id);
CREATE INDEX idx_content_themes_workspace ON content_themes(workspace_id);
CREATE INDEX idx_post_labels_post ON post_labels(post_id);
CREATE INDEX idx_post_themes_post ON post_themes(post_id);
CREATE INDEX idx_draft_versions_post ON draft_versions(post_id, version_number DESC);
```

---

#### 3. URL Shortening (`00027_url_shortening.sql`)

**Purpose:** Support link shortening feature mentioned in README

**Tables to Add:**

```sql
-- Shortened URLs
CREATE TABLE shortened_urls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- URLs
  original_url TEXT NOT NULL,
  short_code TEXT NOT NULL UNIQUE, -- e.g., 'abc123'
  full_short_url TEXT NOT NULL, -- e.g., 'https://q8t.link/abc123'

  -- Custom domain
  custom_domain TEXT,

  -- Campaign tracking
  campaign_id UUID REFERENCES utm_campaigns(id),
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,

  -- Settings
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,

  -- Stats (denormalized for quick access)
  total_clicks INTEGER DEFAULT 0,
  unique_clicks INTEGER DEFAULT 0,

  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Individual clicks
CREATE TABLE url_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shortened_url_id UUID NOT NULL REFERENCES shortened_urls(id) ON DELETE CASCADE,

  -- Request info
  clicked_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  referrer TEXT,
  user_agent TEXT,

  -- Location (from IP)
  ip_address INET,
  country TEXT,
  city TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),

  -- Device info (parsed from user_agent)
  device_type TEXT, -- 'mobile', 'tablet', 'desktop'
  browser TEXT,
  os TEXT,

  -- Unique visitor tracking
  visitor_id UUID, -- Cookie-based or fingerprint

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Aggregated analytics (for performance)
CREATE TABLE url_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shortened_url_id UUID NOT NULL REFERENCES shortened_urls(id) ON DELETE CASCADE,

  -- Time period
  date DATE NOT NULL,
  hour INTEGER, -- 0-23, null for daily aggregates

  -- Metrics
  total_clicks INTEGER DEFAULT 0,
  unique_clicks INTEGER DEFAULT 0,

  -- Top values
  top_countries JSONB DEFAULT '[]', -- [{"country": "US", "clicks": 50}, ...]
  top_browsers JSONB DEFAULT '[]',
  top_devices JSONB DEFAULT '[]',
  top_referrers JSONB DEFAULT '[]',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(shortened_url_id, date, hour)
);

-- Indexes
CREATE INDEX idx_shortened_urls_workspace ON shortened_urls(workspace_id);
CREATE INDEX idx_shortened_urls_short_code ON shortened_urls(short_code);
CREATE INDEX idx_url_clicks_shortened_url ON url_clicks(shortened_url_id);
CREATE INDEX idx_url_clicks_clicked_at ON url_clicks(clicked_at);
CREATE INDEX idx_url_analytics_shortened_url_date ON url_analytics(shortened_url_id, date);

-- Function to update click counts
CREATE OR REPLACE FUNCTION update_url_click_counts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE shortened_urls
  SET total_clicks = total_clicks + 1,
      updated_at = NOW()
  WHERE id = NEW.shortened_url_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_url_click_counts
  AFTER INSERT ON url_clicks
  FOR EACH ROW
  EXECUTE FUNCTION update_url_click_counts();
```

---

#### 4. Hashtag Tracking Enhancement (`00028_hashtag_tracking.sql`)

**Purpose:** Enhance hashtag analytics beyond basic performance tracking

**Tables to Add:**

```sql
-- Hashtag tracking configuration
CREATE TABLE hashtag_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  hashtag TEXT NOT NULL, -- Without # symbol

  -- Tracking settings
  platforms social_platform[],
  is_active BOOLEAN DEFAULT true,

  -- Notifications
  notify_on_spike BOOLEAN DEFAULT false,
  spike_threshold INTEGER DEFAULT 100, -- % increase

  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, hashtag)
);

-- Trending hashtags by platform
CREATE TABLE hashtag_trends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  hashtag TEXT NOT NULL,
  platform social_platform NOT NULL,

  -- Trend metrics
  post_count INTEGER DEFAULT 0,
  engagement_count INTEGER DEFAULT 0,
  growth_rate DECIMAL(5,2), -- Percentage growth

  -- Ranking
  trend_rank INTEGER,
  category TEXT, -- e.g., 'technology', 'business'

  -- Time period
  trending_since TIMESTAMPTZ,
  trending_until TIMESTAMPTZ,

  -- Geographic
  country_code TEXT,

  discovered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(hashtag, platform, trending_since)
);

-- AI-generated hashtag suggestions
CREATE TABLE hashtag_suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Context
  content_preview TEXT, -- First 100 chars of post
  platform social_platform,

  -- Suggestions
  suggested_hashtags TEXT[] NOT NULL,
  suggestion_scores JSONB, -- {"hashtag1": 0.95, "hashtag2": 0.87}

  -- AI metadata
  model_version TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Usage
  was_used BOOLEAN DEFAULT false,
  used_hashtags TEXT[],

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Reusable hashtag sets
CREATE TABLE hashtag_sets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  hashtags TEXT[] NOT NULL,

  -- Target use case
  recommended_platforms social_platform[],
  category TEXT, -- 'product-launch', 'general', 'seasonal'

  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enhance existing hashtag_performance table
ALTER TABLE hashtag_performance ADD COLUMN IF NOT EXISTS competition_level TEXT; -- 'low', 'medium', 'high'
ALTER TABLE hashtag_performance ADD COLUMN IF NOT EXISTS optimal_for_growth BOOLEAN DEFAULT false;
ALTER TABLE hashtag_performance ADD COLUMN IF NOT EXISTS avg_engagement_rate DECIMAL(5,2);

-- Indexes
CREATE INDEX idx_hashtag_tracking_workspace ON hashtag_tracking(workspace_id);
CREATE INDEX idx_hashtag_trends_platform ON hashtag_trends(platform, trending_since DESC);
CREATE INDEX idx_hashtag_suggestions_workspace ON hashtag_suggestions(workspace_id, created_at DESC);
CREATE INDEX idx_hashtag_sets_workspace ON hashtag_sets(workspace_id);
```

---

#### 5. Review Management (`00026_review_management.sql`)

**Purpose:** Centralized review monitoring (already partially exists in review_monitoring)

**Tables to Enhance/Add:**

```sql
-- Enhanced reviews table (platform-agnostic)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Source
  platform TEXT NOT NULL, -- 'trustpilot', 'google', 'yelp', etc.
  platform_review_id TEXT NOT NULL,
  platform_url TEXT,

  -- Review details
  rating INTEGER NOT NULL, -- 1-5
  title TEXT,
  text TEXT,

  -- Author
  author_name TEXT,
  author_avatar_url TEXT,
  author_is_verified BOOLEAN DEFAULT false,

  -- Sentiment analysis
  sentiment TEXT, -- 'positive', 'negative', 'neutral'
  sentiment_score DECIMAL(5,4),
  sentiment_keywords TEXT[],

  -- Response tracking
  has_response BOOLEAN DEFAULT false,
  response_id UUID REFERENCES review_responses(id),

  -- Status
  is_read BOOLEAN DEFAULT false,
  is_flagged BOOLEAN DEFAULT false,

  -- Timestamps
  reviewed_at TIMESTAMPTZ NOT NULL,
  imported_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(platform, platform_review_id)
);

-- Review responses
CREATE TABLE review_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  response_text TEXT NOT NULL,

  -- Template used
  template_id UUID REFERENCES review_response_templates(id),

  -- Status
  status TEXT DEFAULT 'draft', -- 'draft', 'published', 'failed'

  -- Publishing
  published_at TIMESTAMPTZ,
  published_by UUID REFERENCES users(id),

  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Response templates
CREATE TABLE review_response_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,

  -- Template with variables: {{customer_name}}, {{issue}}, etc.
  template_text TEXT NOT NULL,

  -- Filters (when to suggest this template)
  applicable_ratings INTEGER[], -- e.g., [1, 2] for negative reviews
  applicable_sentiments TEXT[], -- ['negative']
  applicable_categories TEXT[], -- ['shipping', 'quality']

  usage_count INTEGER DEFAULT 0,

  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Review analytics
CREATE TABLE review_analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,

  -- Platform breakdown
  platform TEXT,

  -- Metrics
  total_reviews INTEGER DEFAULT 0,
  avg_rating DECIMAL(3,2),

  -- Sentiment breakdown
  positive_reviews INTEGER DEFAULT 0,
  neutral_reviews INTEGER DEFAULT 0,
  negative_reviews INTEGER DEFAULT 0,

  -- Response metrics
  response_rate DECIMAL(5,2), -- Percentage
  avg_response_time INTEGER, -- Minutes

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, period_start, period_end, platform)
);

-- Indexes
CREATE INDEX idx_reviews_workspace ON reviews(workspace_id, reviewed_at DESC);
CREATE INDEX idx_reviews_platform ON reviews(platform);
CREATE INDEX idx_reviews_sentiment ON reviews(sentiment);
CREATE INDEX idx_review_responses_review ON review_responses(review_id);
CREATE INDEX idx_review_templates_workspace ON review_response_templates(workspace_id);
```

---

### Medium Priority Migrations

#### 6. Influencer Management (`00024_influencer_management.sql`)

**Tables to enhance and add:** (See detailed plan in document above)
- Enhance `influencer_profiles`
- Add `influencer_campaigns`, `influencer_campaign_posts`, `influencer_audience_demographics`

---

#### 7. Competitor Tracking (`00025_competitor_tracking.sql`)

**Tables to enhance and add:**
- Enhance `competitor_profiles`
- Add `competitor_posts`, `competitor_analytics_snapshots`, `competitor_content_themes`

---

#### 8. AI Content Generation (`00030_ai_content.sql`)

**Tables to add:**
- `ai_generation_history`, `ai_prompts`, `ai_content_variants`, `ai_usage_metrics`

---

#### 9. Notification Enhancement (`00031_notifications_enhancement.sql`)

**Tables to enhance:**
- `notification_queue`, `notification_templates`, `notification_delivery_log`

---

#### 10. Team Collaboration (`00032_team_collaboration.sql`)

**Tables to add:**
- `team_mentions`, `activity_feed`, `team_performance_metrics`

---

## Implementation Priorities

### Phase 1: Analytics Foundation (Weeks 1-2)
**Goal:** Support existing analytics UI and enable data-driven decisions

1. ✅ **Analytics Package** - Core metrics engine
2. ✅ **Sentiment Analysis Package** - For crisis/inbox features
3. ✅ **Migration: Analytics Enhancement** - Database support

**Deliverables:**
- Working analytics overview page
- Real engagement calculations
- Sentiment scoring for messages

---

### Phase 2: Content Creation (Weeks 3-4)
**Goal:** Enable complete content creation workflow

1. ✅ **Media Processing Package** - Image/video optimization
2. ✅ **Publishing Orchestrator Package** - Multi-platform publishing
3. ✅ **Migration: Content Calendar Enhancement** - Calendar features
4. ✅ **Migration: URL Shortening** - Link tracking

**Deliverables:**
- Optimized media uploads
- Successful multi-platform publishing
- Enhanced calendar with labels/themes
- URL shortening with tracking

---

### Phase 3: Data Collection (Weeks 5-6)
**Goal:** Sync data from platforms for analytics

1. ✅ **Sync Engine Package** - Platform data sync
2. ✅ **Migration: Hashtag Tracking** - Hashtag analytics
3. ✅ **Migration: Review Management** - Review aggregation

**Deliverables:**
- Automated analytics sync
- Hashtag performance tracking
- Centralized review management

---

### Phase 4: Growth Tools (Weeks 7-8)
**Goal:** Advanced features for growth

1. ✅ **Influencer Management Package**
2. ✅ **Hashtag Analytics Package**
3. ✅ **AI Content Generator Package**
4. ✅ **Migration: Influencer Management**

**Deliverables:**
- Influencer discovery and tracking
- Smart hashtag recommendations
- AI-powered content generation

---

### Phase 5: Competitive Intelligence (Weeks 9-10)
**Goal:** Competitive analysis and benchmarking

1. ✅ **Competitor Analysis Package**
2. ✅ **Migration: Competitor Tracking**
3. ✅ **Reporting Package**

**Deliverables:**
- Competitor monitoring
- Competitive benchmarks
- Custom reports

---

## Next Steps

### Immediate Actions

1. **Review and Approve Plan**
   - Stakeholder review of package priorities
   - Confirm technical approach
   - Allocate resources

2. **Set Up Package Templates**
   - Create package scaffold with TypeScript
   - Set up testing infrastructure
   - Configure build pipeline

3. **Database Migration Strategy**
   - Review all proposed migrations
   - Plan rollout schedule
   - Prepare rollback procedures

4. **Start Phase 1**
   - Begin analytics package development
   - Create analytics enhancement migration
   - Update design-guide to use real data

### Success Metrics

- **Package Quality:** 90%+ test coverage, full TypeScript types
- **Performance:** API response times < 200ms
- **Reliability:** 99.9% uptime for publishing
- **Developer Experience:** Clear documentation, easy setup

### Documentation Requirements

For each package:
- README with installation and usage
- API documentation (TSDoc)
- Integration examples
- Migration guide if applicable

For each migration:
- Migration notes explaining changes
- Rollback procedure
- Data seeding scripts for development

---

## Conclusion

This plan provides a comprehensive roadmap for completing the Q8T platform. The phased approach ensures:

1. **Business Value First:** Analytics and publishing come first
2. **Incremental Delivery:** Each phase delivers working features
3. **Risk Management:** Core features before advanced features
4. **Quality Focus:** Proper testing and documentation throughout

The platform will evolve from a design preview to a fully functional social media management solution, supporting teams and agencies in managing their social presence effectively.

---

**Document Version:** 1.0
**Last Updated:** 2025-11-23
**Next Review:** After Phase 1 completion
