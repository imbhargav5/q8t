# Social Media Listening System

Comprehensive social media listening and monitoring system built with Inngest for periodic execution and real-time alerts.

## Overview

The social media listening system monitors conversations across multiple social platforms, analyzes sentiment, detects trends, and triggers alerts based on configurable conditions.

## Features

- ✅ **Periodic Monitoring**: Cron-based checking of listening queries every 15 minutes
- ✅ **Multi-Platform Support**: Twitter, Instagram, LinkedIn, Facebook, Reddit, TikTok, YouTube, Bluesky, and more
- ✅ **Sentiment Analysis**: Automatic sentiment classification (positive, neutral, negative)
- ✅ **Real-time Alerts**: Configurable alerts for volume spikes, sentiment shifts, influencer mentions, and viral content
- ✅ **Duplicate Detection**: Prevents duplicate mentions from being stored
- ✅ **Keyword & Hashtag Tracking**: Track specific keywords, hashtags, and mentions
- ✅ **Advanced Filtering**: Filter by language, location, follower count, engagement, and more
- ✅ **Analytics**: Time-series data for mentions, sentiment, and engagement trends

## Architecture

### Database Schema

The system uses the following main tables (defined in migrations):

1. **`listening_queries`**: Saved queries that define what to monitor
2. **`listening_mentions`**: Individual posts/mentions captured by queries
3. **`listening_alerts`**: Alert definitions and triggers
4. **`listening_alert_triggers`**: Log of alert executions
5. **`listening_analytics`**: Time-series analytics data

### Inngest Functions

#### 1. Listening Queries Cron (`listeningQueriesCron`)

**ID**: `listening-queries-cron`
**Trigger**: Cron - Every 15 minutes (`*/15 * * * *`)

**Purpose**: Periodically checks for active listening queries and triggers processing.

**Flow**:
1. Fetches all active queries from database
2. Filters queries that need refreshing based on `refresh_interval_minutes`
3. Fans out to individual query processors

**Example**:
```typescript
// Automatically runs every 15 minutes
// No manual invocation needed
```

#### 2. Process Listening Query (`processListeningQuery`)

**ID**: `listening-process-query`
**Trigger**: Event - `listening/query.process.requested`

**Purpose**: Processes a single query by fetching social media posts.

**Flow**:
1. Fetches query configuration
2. Determines platforms to search
3. Builds search configuration with filters
4. Fetches mentions from social media APIs
5. Filters out duplicates
6. Saves new mentions to database
7. Triggers sentiment analysis
8. Updates query statistics
9. Triggers alert checks if enabled

**Example**:
```typescript
await inngest.send({
  name: 'listening/query.process.requested',
  data: {
    queryId: 'uuid-here',
    workspaceId: 'uuid-here',
    queryName: 'Brand Mentions',
  },
});
```

#### 3. Analyze Sentiment (`analyzeSentiment`)

**ID**: `listening-analyze-sentiment`
**Trigger**: Event - `listening/sentiment.analyze.requested`

**Purpose**: Analyzes sentiment of listening mentions.

**Flow**:
1. Fetches unprocessed mentions (sentiment = 'unclassified')
2. Analyzes sentiment using NLP (currently keyword-based, can integrate AI services)
3. Updates mentions with sentiment data
4. Sends completion event

**Sentiment Analysis**:
- **Current**: Keyword-based matching
- **Production**: Can integrate with:
  - OpenAI API
  - Google Cloud Natural Language API
  - AWS Comprehend
  - Hugging Face Transformers

**Example**:
```typescript
await inngest.send({
  name: 'listening/sentiment.analyze.requested',
  data: {
    mentionIds: ['uuid1', 'uuid2'],
    batchSize: 10,
  },
});
```

#### 4. Check Alerts (`checkAlerts`)

**ID**: `listening-check-alerts`
**Trigger**: Event - `listening/alerts.check.requested`

**Purpose**: Checks alert conditions and triggers notifications.

**Flow**:
1. Fetches active alerts for query
2. Checks each alert condition
3. Respects cooldown periods
4. Logs triggered alerts
5. Sends notifications (email, Slack, webhook)

**Alert Types**:

1. **Volume Threshold**: Triggers when mentions exceed a count in a time window
   ```json
   {
     "count": 100,
     "time_window_minutes": 60
   }
   ```

2. **Volume Spike**: Triggers when mentions spike above baseline
   ```json
   {
     "threshold_multiplier": 3,
     "time_window_minutes": 60
   }
   ```

3. **Sentiment Shift**: Triggers when sentiment changes significantly
   ```json
   {
     "threshold_change": 0.3,
     "time_window_minutes": 120
   }
   ```

4. **Negative Spike**: Triggers when negative sentiment percentage is high
   ```json
   {
     "threshold_percentage": 0.7,
     "min_count": 10,
     "time_window_minutes": 60
   }
   ```

5. **Influencer Mention**: Triggers when high-reach accounts mention you
   ```json
   {
     "min_follower_count": 10000
   }
   ```

6. **Viral Potential**: Triggers when content gains high engagement
   ```json
   {
     "engagement_threshold": 1000,
     "time_window_minutes": 30
   }
   ```

**Example**:
```typescript
await inngest.send({
  name: 'listening/alerts.check.requested',
  data: {
    queryId: 'uuid-here',
    workspaceId: 'uuid-here',
    checkType: 'volume_spike',
  },
});
```

## Usage

### 1. Create a Listening Query

```sql
INSERT INTO listening_queries (
  workspace_id,
  name,
  description,
  query_type,
  keywords,
  hashtags,
  platforms,
  is_active,
  auto_refresh,
  refresh_interval_minutes,
  created_by
) VALUES (
  'workspace-uuid',
  'Brand Mentions',
  'Track all mentions of our brand',
  'brand',
  ARRAY['OurBrand', '@OurBrand'],
  ARRAY['OurBrand', 'OurBrandLife'],
  ARRAY['twitter', 'instagram', 'linkedin'],
  true,
  true,
  15,
  'user-uuid'
);
```

### 2. Create an Alert

```sql
INSERT INTO listening_alerts (
  workspace_id,
  query_id,
  name,
  description,
  is_active,
  trigger_type,
  trigger_config,
  notify_users,
  notify_email,
  notify_slack,
  cooldown_minutes,
  created_by
) VALUES (
  'workspace-uuid',
  'query-uuid',
  'Volume Spike Alert',
  'Alert when mentions spike above normal',
  true,
  'volume_spike',
  '{"threshold_multiplier": 3, "time_window_minutes": 60}'::jsonb,
  ARRAY['user-uuid-1', 'user-uuid-2'],
  true,
  true,
  60,
  'user-uuid'
);
```

### 3. Query Configuration Options

```typescript
interface ListeningQuery {
  // Identification
  name: string;
  description?: string;
  query_type: 'keyword' | 'hashtag' | 'mention' | 'brand' | 'competitor' | 'topic' | 'sentiment' | 'location' | 'custom';

  // Search terms
  keywords: string[];
  hashtags: string[];
  mentions: string[];
  boolean_query?: string; // e.g., "(urgent OR help) AND support NOT spam"

  // Platform filters
  platforms?: string[];
  excluded_platforms?: string[];

  // Geographic filters
  countries?: string[]; // ISO country codes
  languages?: string[]; // ISO language codes

  // Author filters
  include_authors?: string[];
  exclude_authors?: string[];
  min_follower_count?: number;
  verified_only: boolean;

  // Content filters
  include_media_only: boolean;
  include_links_only: boolean;
  min_engagement?: number;

  // Sentiment filters
  sentiment_filter?: ('positive' | 'neutral' | 'negative')[];

  // Time filters
  start_date?: string;
  end_date?: string;

  // Advanced
  case_sensitive: boolean;
  whole_word_match: boolean;
  include_retweets: boolean;
  include_replies: boolean;

  // Refresh settings
  auto_refresh: boolean;
  refresh_interval_minutes: number; // Default: 15

  // Alert settings
  alerts_enabled: boolean;
  alert_threshold_volume?: number;
  alert_threshold_sentiment?: number;
}
```

## Social Media API Integration

The system includes placeholder functions for fetching from various platforms. To enable actual fetching, you need to:

### 1. Set Environment Variables

```env
# Twitter/X
TWITTER_BEARER_TOKEN=your-token

# Instagram
INSTAGRAM_APP_ID=your-app-id
INSTAGRAM_APP_SECRET=your-secret

# LinkedIn
LINKEDIN_ACCESS_TOKEN=your-token

# Facebook
FACEBOOK_APP_ID=your-app-id
FACEBOOK_APP_SECRET=your-secret

# Reddit
REDDIT_CLIENT_ID=your-client-id
REDDIT_CLIENT_SECRET=your-secret

# TikTok
TIKTOK_CLIENT_KEY=your-key
TIKTOK_CLIENT_SECRET=your-secret

# YouTube
GOOGLE_API_KEY=your-key

# Bluesky
BLUESKY_IDENTIFIER=your-identifier
BLUESKY_PASSWORD=your-password
```

### 2. Implement API Fetchers

Update the functions in `/src/utils/social-media-fetchers.ts`:

```typescript
export async function fetchFromTwitter(config: SearchConfig): Promise<SocialMediaMention[]> {
  const query = buildTwitterQuery(config);

  const response = await fetch(
    `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=100`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  return transformTwitterResponse(data);
}
```

### API Rate Limits

Be mindful of rate limits for each platform:

- **Twitter**: 450 requests / 15 min (app auth), 180 requests / 15 min (user auth)
- **Instagram**: 200 calls / hour
- **LinkedIn**: Varies by endpoint
- **Facebook**: 200 calls / hour per user
- **Reddit**: 60 requests / minute
- **YouTube**: 10,000 quota units / day

## Event Flow

```
1. Cron triggers (every 15 min)
   ↓
2. listeningQueriesCron fetches active queries
   ↓
3. Fans out to processListeningQuery for each query
   ↓
4. processListeningQuery:
   - Fetches from social media APIs
   - Filters duplicates
   - Saves mentions
   - Triggers sentiment analysis
   - Triggers alert checks
   ↓
5. analyzeSentiment:
   - Analyzes unprocessed mentions
   - Updates sentiment data
   ↓
6. checkAlerts:
   - Evaluates alert conditions
   - Triggers notifications
   - Logs alert triggers
```

## Monitoring & Debugging

### View Inngest Dashboard

1. Go to your Inngest dashboard
2. View running functions and their status
3. Check logs and execution history

### Database Queries

```sql
-- View active queries
SELECT * FROM listening_queries WHERE is_active = true;

-- View recent mentions
SELECT * FROM listening_mentions
ORDER BY captured_at DESC
LIMIT 100;

-- View alert triggers
SELECT * FROM listening_alert_triggers
ORDER BY triggered_at DESC
LIMIT 50;

-- View sentiment distribution
SELECT
  sentiment,
  COUNT(*) as count
FROM listening_mentions
GROUP BY sentiment;
```

### Event Logs

```typescript
// Monitor events
inngest.on('listening/query.process.completed', (event) => {
  console.log('Query processed:', event.data);
});

inngest.on('listening/alert.triggered', (event) => {
  console.log('Alert triggered:', event.data);
});
```

## Best Practices

1. **Refresh Intervals**:
   - High-priority queries: 5-15 minutes
   - Standard queries: 15-30 minutes
   - Low-priority queries: 60+ minutes

2. **Alert Cooldowns**:
   - Set appropriate cooldown periods (30-60 minutes) to prevent alert spam

3. **Rate Limiting**:
   - Monitor API usage
   - Implement exponential backoff for rate limit errors
   - Use query-level concurrency controls

4. **Sentiment Analysis**:
   - Use AI/ML services for production (OpenAI, Google NLP)
   - Batch process mentions for efficiency
   - Consider caching sentiment for similar content

5. **Duplicate Detection**:
   - Unique constraint on (workspace_id, platform, platform_post_id, query_id)
   - Check before inserting to avoid errors

## Future Enhancements

- [ ] Real-time streaming for high-priority queries
- [ ] Advanced NLP for entity recognition and topic extraction
- [ ] Competitor benchmarking and comparison
- [ ] Influencer relationship management
- [ ] Crisis detection and response workflows
- [ ] Multi-language sentiment analysis
- [ ] Image and video content analysis
- [ ] Automated response suggestions
- [ ] Custom ML model training for brand-specific sentiment
- [ ] Integration with CRM for lead capture

## Support

For questions or issues:
1. Check the Inngest dashboard for function execution logs
2. Review database logs for query errors
3. Monitor social media API rate limits
4. Check environment variables are properly set
