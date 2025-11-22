# Q8T Automation Architecture Plan

## Executive Summary

This plan outlines the architecture for implementing comprehensive automation features for the Q8T social media manager platform. The approach emphasizes **separation of concerns** by organizing features into domain-specific packages, each with focused responsibilities and comprehensive test coverage.

---

## 🏗️ Package Architecture

### Proposed New Packages

#### 1. `@q8t/sentiment-analysis`
**Purpose:** Real-time sentiment analysis and crisis detection
**Dependencies:** External sentiment API (e.g., OpenAI, Hugging Face, or specialized sentiment services)

**Core Responsibilities:**
- Analyze message sentiment (positive, negative, neutral)
- Detect sentiment anomalies and spikes
- Calculate sentiment scores and trends
- Provide sentiment classification for messages

**Key Services:**
```typescript
- SentimentAnalyzer: Analyze individual messages
- SentimentAggregator: Calculate sentiment trends over time
- AnomalyDetector: Detect unusual sentiment patterns
```

**Data Flow:**
```
Inbox Message → Sentiment Analysis → Store sentiment score →
Trigger crisis detector if threshold exceeded
```

---

#### 2. `@q8t/crisis-management`
**Purpose:** Crisis detection, incident management, and status tracking
**Dependencies:** `@q8t/sentiment-analysis`, `@q8t/queue`

**Core Responsibilities:**
- Monitor sentiment trends for crisis indicators
- Create and manage crisis incidents
- Coordinate crisis response workflows
- Maintain system status page
- Alert stakeholders during crises

**Key Services:**
```typescript
- CrisisDetector: Monitor for crisis conditions
  - Sentiment spike detection (e.g., 20+ negative messages in 1 hour)
  - Keyword-based crisis detection (e.g., "hack", "breach", "lawsuit")
  - Volume spike detection (unusual message volume)

- IncidentManager: Create and manage incidents
  - Create incident records
  - Track incident lifecycle (detected → acknowledged → resolving → resolved)
  - Log incident timeline and actions taken

- StatusPageManager: Maintain status page
  - Update component statuses (operational, degraded, outage)
  - Post status updates and incident reports
  - Track uptime and availability
```

**Crisis Detection Rules:**
```typescript
// Example crisis conditions
{
  type: "sentiment_spike",
  threshold: {
    negativeCount: 20,
    timeWindow: "1 hour",
    platforms: ["twitter", "facebook", "instagram"]
  }
}

{
  type: "keyword_match",
  keywords: ["data breach", "hack", "lawsuit", "scam"],
  severity: "critical",
  autoCreateIncident: true
}
```

---

#### 3. `@q8t/content-automation`
**Purpose:** Content publishing and scheduling automations
**Dependencies:** `@q8t/queue`, platform SDKs, `@q8t/utils`

**Core Responsibilities:**
- RSS feed monitoring and auto-posting
- Content recycling (evergreen content)
- Optimal posting time calculation
- Bulk scheduling from CSV/imports
- Queue management
- AI content generation integration

**Key Services:**
```typescript
- RSSFeedMonitor: Monitor RSS feeds and auto-publish
- ContentRecycler: Schedule evergreen content re-posts
- OptimalTimeCalculator: Analyze engagement data for best posting times
- BulkScheduler: Import and schedule multiple posts
- QueueManager: Maintain and auto-publish from content queue
- ContentGenerator: AI-powered content creation
```

**Example Automation:**
```typescript
// RSS Auto-Posting
{
  feedUrl: "https://blog.company.com/feed",
  checkInterval: "15 minutes",
  platforms: ["twitter", "linkedin"],
  autoPublish: true,
  template: "{title}\n\n{excerpt}\n\n{link}"
}
```

---

#### 4. `@q8t/inbox-automation`
**Purpose:** Social inbox engagement and routing automations
**Dependencies:** `@q8t/sentiment-analysis`, `@supabase/supabase-js`

**Core Responsibilities:**
- Message routing and assignment
- Auto-responses and chatbots
- Saved replies management
- Conversation tagging and categorization
- Instagram-specific automations (comment-to-DM)
- Escalation workflows

**Key Services:**
```typescript
- MessageRouter: Route messages to team members
  - Keyword-based routing
  - Platform-based routing
  - Sentiment-based routing
  - Round-robin assignment
  - Skill-based routing

- AutoResponder: Send automatic replies
  - Saved reply templates
  - AI-powered smart replies
  - Off-hours auto-responders
  - Welcome messages for new followers

- ConversationManager: Tag and categorize conversations
  - Auto-tagging by topic
  - Auto-categorization
  - Auto-close resolved conversations

- InstagramAutomation: Instagram-specific features
  - Comment-to-DM automation ("comment LINK for details")
  - Auto-reply to story mentions
```

**Example Routing Rule:**
```typescript
{
  name: "Route sales inquiries to sales team",
  trigger: "keyword_match",
  conditions: {
    keywords: ["pricing", "buy", "purchase", "quote"],
    caseSensitive: false
  },
  action: "assign_to_user",
  actionConfig: {
    assignmentStrategy: "round_robin",
    teamMembers: ["user1", "user2", "user3"]
  }
}
```

---

#### 5. `@q8t/social-listening`
**Purpose:** Social listening, monitoring, and alerting
**Dependencies:** Platform SDKs, `@q8t/sentiment-analysis`

**Core Responsibilities:**
- Brand mention tracking
- Competitor monitoring
- Keyword/hashtag tracking
- Influencer mention detection
- Review monitoring across platforms
- Real-time alerts

**Key Services:**
```typescript
- MentionTracker: Track brand and competitor mentions
- KeywordMonitor: Monitor specific keywords and hashtags
- InfluencerDetector: Identify and track influencer mentions
- ReviewAggregator: Collect reviews from multiple platforms
- AlertManager: Send real-time alerts for important mentions
```

**Listening Stream Configuration:**
```typescript
{
  type: "brand_mentions",
  keywords: ["@company", "#company", "company name"],
  platforms: ["twitter", "instagram", "tiktok"],
  alertOn: {
    mentionCount: 10, // Alert if 10+ mentions in timeWindow
    timeWindow: "1 hour",
    sentiment: "negative" // Only alert on negative mentions
  }
}
```

---

#### 6. `@q8t/analytics-automation`
**Purpose:** Automated analytics, reporting, and insights
**Dependencies:** `@supabase/supabase-js`, `@q8t/utils`

**Core Responsibilities:**
- Scheduled report generation
- Automated competitor analysis
- Performance threshold alerts
- ROI calculation
- Data aggregation
- UTM tracking

**Key Services:**
```typescript
- ReportGenerator: Generate scheduled reports
  - Daily/weekly/monthly reports
  - Custom report templates
  - Export to PDF/CSV/Excel

- CompetitorAnalyzer: Automated competitor tracking
- PerformanceMonitor: Track KPIs and send alerts
- ROICalculator: Calculate marketing ROI
- UTMManager: Auto-generate and track UTM parameters
```

**Report Configuration:**
```typescript
{
  name: "Weekly Performance Report",
  schedule: "every Monday at 9am",
  recipients: ["manager@company.com"],
  metrics: [
    "total_posts",
    "engagement_rate",
    "follower_growth",
    "top_performing_posts",
    "sentiment_analysis"
  ],
  format: "pdf",
  platforms: ["all"]
}
```

---

#### 7. `@q8t/workflow-automation`
**Purpose:** Approval workflows, team collaboration, and notifications
**Dependencies:** `@supabase/supabase-js`, integration SDKs (Slack, Teams)

**Core Responsibilities:**
- Multi-level approval workflows
- Content approval routing
- Team notifications (Slack, Teams, Email)
- Task creation from social mentions
- Integration with project management tools

**Key Services:**
```typescript
- ApprovalWorkflow: Manage content approval flows
  - Multi-level reviewers
  - Auto-notify reviewers
  - Auto-approve for trusted members
  - Expiry notifications

- NotificationManager: Send team notifications
  - Slack notifications
  - Teams notifications
  - Email notifications
  - Mobile push notifications

- TaskManager: Create tasks from social interactions
  - Auto-create tasks in Asana/Monday/ClickUp
  - Link social mentions to tasks
```

**Approval Workflow Example:**
```typescript
{
  name: "Standard Post Approval",
  steps: [
    {
      level: 1,
      approvers: ["content_manager"],
      requiredApprovals: 1
    },
    {
      level: 2,
      approvers: ["brand_director"],
      requiredApprovals: 1,
      condition: "post.platforms includes 'facebook' OR 'instagram'"
    }
  ],
  autoScheduleOnApproval: true,
  expiryDays: 7
}
```

---

#### 8. `@q8t/ai-automation`
**Purpose:** AI-powered automation features
**Dependencies:** OpenAI/Anthropic SDKs, `@q8t/utils`

**Core Responsibilities:**
- AI content generation from blog posts
- Auto-generate captions from images
- Hashtag suggestions
- Content idea generation
- Post variation generation for different platforms
- Smart reply suggestions

**Key Services:**
```typescript
- ContentGenerator: Generate content using AI
  - Blog post → social posts
  - Image → caption
  - Topic → content ideas

- HashtagGenerator: Suggest relevant hashtags
- VariationGenerator: Create platform-specific variations
- SmartReplyEngine: Suggest contextual replies
```

---

## 🗄️ Database Migrations Plan

### New Migrations to Create

#### Migration: `00018_crisis_management.sql`

```sql
-- Crisis incidents table
CREATE TABLE crisis_incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Incident details
  title TEXT NOT NULL,
  description TEXT,
  severity crisis_severity NOT NULL, -- enum: low, medium, high, critical
  status crisis_status NOT NULL DEFAULT 'detected', -- enum: detected, acknowledged, investigating, resolving, resolved

  -- Detection information
  detection_type crisis_detection_type NOT NULL, -- enum: sentiment_spike, keyword_match, volume_spike, manual
  detection_config JSONB, -- Configuration that triggered detection

  -- Affected platforms
  platforms social_platform[],

  -- Sentiment data
  negative_message_count INTEGER DEFAULT 0,
  sentiment_score DECIMAL(3,2), -- -1.0 to 1.0

  -- Timeline
  detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID REFERENCES users(id),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES users(id),

  -- Resolution
  resolution_notes TEXT,
  resolution_actions JSONB, -- Actions taken to resolve

  -- Related data
  related_conversation_ids UUID[],
  related_message_ids UUID[],

  -- Status updates
  status_updates JSONB DEFAULT '[]', -- Array of status updates

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Crisis detection rules
CREATE TABLE crisis_detection_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL,

  -- Detection configuration
  detection_type crisis_detection_type NOT NULL,
  threshold_config JSONB NOT NULL,
  /*
    Examples:
    {
      "sentiment_spike": {
        "negative_count": 20,
        "time_window_minutes": 60,
        "platforms": ["twitter", "facebook"]
      },
      "keyword_match": {
        "keywords": ["data breach", "hack"],
        "severity": "critical"
      }
    }
  */

  -- Actions
  auto_create_incident BOOLEAN DEFAULT true,
  notify_users UUID[],
  notification_channels TEXT[], -- ["slack", "email", "sms"]

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- System status components
CREATE TABLE status_components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL, -- e.g., "Instagram Publishing", "Twitter Inbox"
  description TEXT,
  component_type TEXT NOT NULL, -- e.g., "publishing", "inbox", "analytics"

  -- Current status
  status component_status DEFAULT 'operational' NOT NULL, -- enum: operational, degraded, partial_outage, major_outage

  -- Display settings
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Status page incidents (public-facing)
CREATE TABLE status_page_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  component_id UUID REFERENCES status_components(id) ON DELETE SET NULL,
  incident_id UUID REFERENCES crisis_incidents(id) ON DELETE SET NULL,

  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status component_status NOT NULL,

  -- Display
  is_pinned BOOLEAN DEFAULT false,

  posted_by UUID NOT NULL REFERENCES users(id),
  posted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Message sentiment tracking
CREATE TABLE message_sentiment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Sentiment scores
  sentiment sentiment_type NOT NULL, -- enum: positive, neutral, negative
  score DECIMAL(3,2) NOT NULL, -- -1.0 to 1.0
  confidence DECIMAL(3,2), -- 0.0 to 1.0

  -- Detailed analysis
  emotions JSONB, -- { "anger": 0.8, "fear": 0.2, ... }
  keywords TEXT[],

  -- Analysis metadata
  analyzer TEXT NOT NULL, -- "openai", "huggingface", etc.
  analyzed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_crisis_incidents_workspace ON crisis_incidents(workspace_id);
CREATE INDEX idx_crisis_incidents_status ON crisis_incidents(status);
CREATE INDEX idx_crisis_incidents_detected_at ON crisis_incidents(detected_at DESC);
CREATE INDEX idx_message_sentiment_message ON message_sentiment(message_id);
CREATE INDEX idx_message_sentiment_workspace ON message_sentiment(workspace_id);
CREATE INDEX idx_message_sentiment_sentiment ON message_sentiment(sentiment);
```

---

#### Migration: `00019_content_automation.sql`

```sql
-- RSS feed configurations
CREATE TABLE rss_feeds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  feed_url TEXT NOT NULL,

  -- Publishing configuration
  auto_publish BOOLEAN DEFAULT false,
  target_platforms social_platform[],
  post_template TEXT, -- Template for post content

  -- Scheduling
  check_interval_minutes INTEGER DEFAULT 60,
  last_checked_at TIMESTAMPTZ,
  last_published_at TIMESTAMPTZ,

  -- Filters
  keyword_filters TEXT[], -- Only publish items matching these keywords
  exclude_keywords TEXT[],

  is_active BOOLEAN DEFAULT true,

  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RSS feed items (tracking)
CREATE TABLE rss_feed_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  feed_id UUID NOT NULL REFERENCES rss_feeds(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Item details
  guid TEXT NOT NULL, -- RSS item GUID
  title TEXT NOT NULL,
  link TEXT NOT NULL,
  description TEXT,
  published_at TIMESTAMPTZ,

  -- Publishing status
  was_published BOOLEAN DEFAULT false,
  post_id UUID REFERENCES posts(id),

  discovered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(feed_id, guid)
);

-- Evergreen content pool
CREATE TABLE evergreen_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Content
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  media_urls TEXT[],
  platforms social_platform[],

  -- Recycling configuration
  recycle_interval_days INTEGER DEFAULT 30,
  last_posted_at TIMESTAMPTZ,
  next_post_at TIMESTAMPTZ,
  times_posted INTEGER DEFAULT 0,
  max_reposts INTEGER, -- null = unlimited

  is_active BOOLEAN DEFAULT true,

  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Optimal posting times (learned from analytics)
CREATE TABLE optimal_posting_times (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  social_account_id UUID NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,

  -- Time slot
  day_of_week INTEGER NOT NULL, -- 0 = Sunday, 6 = Saturday
  hour INTEGER NOT NULL, -- 0-23

  -- Performance metrics
  avg_engagement_rate DECIMAL(5,4),
  posts_count INTEGER DEFAULT 0,

  -- Score for ranking
  score DECIMAL(5,2), -- 0-100

  calculated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(workspace_id, social_account_id, platform, day_of_week, hour)
);

-- Content queue
CREATE TABLE content_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Queue configuration
  name TEXT NOT NULL,
  description TEXT,

  -- Publishing settings
  platforms social_platform[] NOT NULL,
  social_account_ids UUID[], -- Specific accounts to publish to

  -- Schedule settings
  schedule_type queue_schedule_type NOT NULL, -- enum: interval, time_slots, optimal
  schedule_config JSONB NOT NULL,
  /*
    Examples:
    { "interval": { "hours": 4 } }
    { "time_slots": ["09:00", "13:00", "17:00"] }
    { "optimal": { "use_calculated_times": true, "fallback": "09:00" } }
  */

  -- Queue management
  posts_per_day INTEGER,
  shuffle_posts BOOLEAN DEFAULT false,

  is_active BOOLEAN DEFAULT true,

  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Queue items
CREATE TABLE content_queue_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  queue_id UUID NOT NULL REFERENCES content_queue(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Position in queue
  position INTEGER NOT NULL,

  -- Status
  status queue_item_status DEFAULT 'pending', -- enum: pending, scheduled, published, failed
  scheduled_for TIMESTAMPTZ,
  published_at TIMESTAMPTZ,

  added_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_rss_feeds_workspace ON rss_feeds(workspace_id);
CREATE INDEX idx_rss_feed_items_feed ON rss_feed_items(feed_id);
CREATE INDEX idx_evergreen_content_next_post ON evergreen_content(next_post_at) WHERE is_active = true;
CREATE INDEX idx_content_queue_workspace ON content_queue(workspace_id);
CREATE INDEX idx_queue_items_queue ON content_queue_items(queue_id, position);
```

---

#### Migration: `00020_social_listening.sql`

```sql
-- Listening streams
CREATE TABLE listening_streams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,
  stream_type listening_stream_type NOT NULL, -- enum: brand_mentions, competitor, keyword, hashtag, influencer

  -- Query configuration
  search_config JSONB NOT NULL,
  /*
    Examples:
    {
      "brand_mentions": {
        "keywords": ["@company", "#company", "company name"],
        "exact_match": false
      },
      "competitor": {
        "competitor_name": "Competitor Inc",
        "keywords": ["@competitor", "competitor"]
      },
      "keyword": {
        "keywords": ["social media marketing"],
        "hashtags": ["#smm", "#marketing"]
      }
    }
  */

  platforms social_platform[],

  -- Alert configuration
  alert_enabled BOOLEAN DEFAULT false,
  alert_config JSONB,
  /*
    {
      "threshold": { "mentions": 10, "timeWindow": "1 hour" },
      "sentiment": "negative",
      "notify": ["user1", "user2"],
      "channels": ["slack", "email"]
    }
  */

  -- Refresh settings
  auto_refresh BOOLEAN DEFAULT true,
  refresh_interval_minutes INTEGER DEFAULT 15,
  last_refreshed_at TIMESTAMPTZ,

  is_active BOOLEAN DEFAULT true,

  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Listening stream items (cached results)
CREATE TABLE listening_stream_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stream_id UUID NOT NULL REFERENCES listening_streams(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Platform details
  platform social_platform NOT NULL,
  platform_post_id TEXT NOT NULL,
  platform_url TEXT,

  -- Content
  author_name TEXT NOT NULL,
  author_handle TEXT,
  content TEXT,

  -- Metrics
  engagement_count INTEGER DEFAULT 0,
  follower_count INTEGER,

  -- Sentiment
  sentiment sentiment_type,
  sentiment_score DECIMAL(3,2),

  -- Flags
  is_influencer BOOLEAN DEFAULT false,
  is_read BOOLEAN DEFAULT false,

  posted_at TIMESTAMPTZ,
  discovered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  metadata JSONB DEFAULT '{}',

  UNIQUE(stream_id, platform, platform_post_id)
);

-- Alerts log
CREATE TABLE listening_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  stream_id UUID REFERENCES listening_streams(id) ON DELETE SET NULL,

  alert_type listening_alert_type NOT NULL, -- enum: mention_spike, sentiment_spike, influencer_mention, crisis_keyword

  title TEXT NOT NULL,
  description TEXT,
  severity alert_severity NOT NULL, -- enum: info, warning, critical

  -- Triggered data
  trigger_data JSONB,
  affected_platforms social_platform[],

  -- Notifications
  notified_users UUID[],
  notification_channels TEXT[],

  -- Status
  is_acknowledged BOOLEAN DEFAULT false,
  acknowledged_by UUID REFERENCES users(id),
  acknowledged_at TIMESTAMPTZ,

  triggered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_listening_streams_workspace ON listening_streams(workspace_id);
CREATE INDEX idx_stream_items_stream ON listening_stream_items(stream_id);
CREATE INDEX idx_stream_items_discovered ON listening_stream_items(discovered_at DESC);
CREATE INDEX idx_listening_alerts_workspace ON listening_alerts(workspace_id);
CREATE INDEX idx_listening_alerts_triggered ON listening_alerts(triggered_at DESC);
```

---

#### Migration: `00021_analytics_automation.sql`

```sql
-- Scheduled reports
CREATE TABLE scheduled_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  -- Schedule
  schedule_cron TEXT NOT NULL, -- Cron expression
  timezone TEXT DEFAULT 'UTC',

  -- Report configuration
  report_type report_type NOT NULL, -- enum: performance, competitor, engagement, roi, sentiment
  report_config JSONB NOT NULL,
  /*
    {
      "metrics": ["engagement_rate", "follower_growth"],
      "platforms": ["twitter", "instagram"],
      "date_range": "last_7_days",
      "include_charts": true
    }
  */

  -- Recipients
  recipients TEXT[] NOT NULL, -- Email addresses
  cc_recipients TEXT[],

  -- Format
  format report_format DEFAULT 'pdf', -- enum: pdf, csv, excel, html

  -- Delivery
  delivery_method report_delivery DEFAULT 'email', -- enum: email, slack, webhook

  -- Status
  is_active BOOLEAN DEFAULT true,
  last_sent_at TIMESTAMPTZ,
  next_send_at TIMESTAMPTZ,

  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Report execution history
CREATE TABLE report_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL REFERENCES scheduled_reports(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  status execution_status NOT NULL, -- enum: pending, running, completed, failed

  -- Execution details
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_message TEXT,

  -- Output
  file_url TEXT,
  file_size INTEGER, -- bytes

  -- Delivery
  delivered_to TEXT[],
  delivery_status JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Performance alerts
CREATE TABLE performance_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  -- Alert conditions
  metric TEXT NOT NULL, -- e.g., "engagement_rate", "follower_count"
  threshold_config JSONB NOT NULL,
  /*
    {
      "condition": "below", // or "above", "drops_by", "increases_by"
      "value": 2.5,
      "comparison_period": "previous_day",
      "platforms": ["twitter"]
    }
  */

  -- Notifications
  notify_users UUID[],
  notification_channels TEXT[],

  is_active BOOLEAN DEFAULT true,
  last_triggered_at TIMESTAMPTZ,

  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- UTM tracking
CREATE TABLE utm_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  -- UTM parameters
  utm_source TEXT NOT NULL,
  utm_medium TEXT NOT NULL,
  utm_campaign TEXT NOT NULL,
  utm_term TEXT,
  utm_content TEXT,

  -- Auto-generation settings
  auto_apply BOOLEAN DEFAULT false,
  apply_to_platforms social_platform[],

  -- Tracking
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,

  is_active BOOLEAN DEFAULT true,

  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_scheduled_reports_workspace ON scheduled_reports(workspace_id);
CREATE INDEX idx_scheduled_reports_next_send ON scheduled_reports(next_send_at) WHERE is_active = true;
CREATE INDEX idx_report_executions_report ON report_executions(report_id);
CREATE INDEX idx_performance_alerts_workspace ON performance_alerts(workspace_id);
```

---

#### Migration: `00022_workflow_automation.sql`

```sql
-- Approval workflows
CREATE TABLE approval_workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  description TEXT,

  -- Workflow steps
  steps JSONB NOT NULL,
  /*
    [
      {
        "level": 1,
        "approvers": ["user1", "user2"],
        "required_approvals": 1,
        "condition": null
      },
      {
        "level": 2,
        "approvers": ["user3"],
        "required_approvals": 1,
        "condition": "post.platforms includes 'facebook'"
      }
    ]
  */

  -- Conditions for when to apply this workflow
  apply_conditions JSONB,
  /*
    {
      "platforms": ["facebook", "instagram"],
      "content_types": ["video"],
      "min_budget": 1000
    }
  */

  -- Settings
  auto_schedule_on_approval BOOLEAN DEFAULT false,
  expiry_days INTEGER DEFAULT 7,

  is_active BOOLEAN DEFAULT true,
  is_default BOOLEAN DEFAULT false,

  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Approval requests
CREATE TABLE approval_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  workflow_id UUID NOT NULL REFERENCES approval_workflows(id) ON DELETE CASCADE,

  -- Subject
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,

  -- Current status
  status approval_status DEFAULT 'pending', -- enum: pending, approved, rejected, expired
  current_level INTEGER DEFAULT 1,

  -- Submitted by
  submitted_by UUID NOT NULL REFERENCES users(id),
  submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Resolution
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES users(id),

  -- Expiry
  expires_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Individual approvals
CREATE TABLE approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES approval_requests(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Approver
  approver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  level INTEGER NOT NULL,

  -- Decision
  status approval_decision, -- enum: pending, approved, rejected
  comments TEXT,

  -- Timestamps
  notified_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  responded_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Notification preferences
CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Channel preferences
  email_enabled BOOLEAN DEFAULT true,
  slack_enabled BOOLEAN DEFAULT false,
  teams_enabled BOOLEAN DEFAULT false,
  push_enabled BOOLEAN DEFAULT true,

  -- Event preferences (JSONB for flexibility)
  event_preferences JSONB DEFAULT '{}',
  /*
    {
      "inbox_assignment": { "email": true, "slack": true },
      "approval_request": { "email": true, "slack": false },
      "crisis_detected": { "email": true, "slack": true, "sms": true },
      "report_ready": { "email": true }
    }
  */

  -- Integration tokens
  slack_webhook_url TEXT,
  teams_webhook_url TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(user_id, workspace_id)
);

-- Task integrations (for creating tasks from social mentions)
CREATE TABLE integration_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Source
  conversation_id UUID REFERENCES social_inbox_conversations(id) ON DELETE SET NULL,
  message_id UUID REFERENCES social_inbox_messages(id) ON DELETE SET NULL,

  -- Integration
  integration_type TEXT NOT NULL, -- "asana", "monday", "clickup", "notion"
  integration_id UUID NOT NULL, -- Reference to workspace_integrations

  -- Task details
  external_task_id TEXT NOT NULL,
  external_task_url TEXT,

  -- Status
  sync_status task_sync_status DEFAULT 'synced', -- enum: synced, out_of_sync, failed
  last_synced_at TIMESTAMPTZ,

  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_approval_workflows_workspace ON approval_workflows(workspace_id);
CREATE INDEX idx_approval_requests_workflow ON approval_requests(workflow_id);
CREATE INDEX idx_approval_requests_post ON approval_requests(post_id);
CREATE INDEX idx_approvals_request ON approvals(request_id);
CREATE INDEX idx_approvals_approver ON approvals(approver_id) WHERE status = 'pending';
```

---

## 📊 Mock Data Structure for Design Guide

### New Mock Data Files to Create

#### 1. `lib/mock-data/crisis-management.ts`

```typescript
export const mockCrisisIncidents = [
  {
    id: "crisis-1",
    title: "Negative Sentiment Spike on Twitter",
    severity: "high",
    status: "investigating",
    detectionType: "sentiment_spike",
    platforms: ["twitter"],
    negativeMessageCount: 47,
    detectedAt: "2025-11-22T10:30:00Z",
    description: "Unusual spike in negative sentiment detected..."
  },
  // ... more incidents
];

export const mockStatusComponents = [
  {
    id: "comp-1",
    name: "Instagram Publishing",
    status: "operational",
    componentType: "publishing"
  },
  {
    id: "comp-2",
    name: "Twitter Inbox",
    status: "degraded",
    componentType: "inbox"
  },
  // ... more components
];
```

#### 2. `lib/mock-data/automations.ts`

```typescript
export const mockRSSFeeds = [
  {
    id: "rss-1",
    name: "Company Blog",
    feedUrl: "https://blog.company.com/feed",
    autoPublish: true,
    targetPlatforms: ["twitter", "linkedin"],
    checkIntervalMinutes: 60
  },
  // ... more feeds
];

export const mockContentQueue = [
  {
    id: "queue-1",
    name: "Daily Content Queue",
    platforms: ["twitter", "facebook"],
    scheduleType: "time_slots",
    scheduleConfig: {
      timeSlots: ["09:00", "13:00", "17:00"]
    },
    postsPerDay: 3
  },
  // ... more queues
];

export const mockEvergreenContent = [
  {
    id: "evergreen-1",
    title: "Tips for Social Media Marketing",
    content: "Here are 5 tips...",
    recycleIntervalDays: 30,
    timesPosted: 5,
    lastPostedAt: "2025-11-15T09:00:00Z"
  },
  // ... more evergreen posts
];
```

#### 3. `lib/mock-data/listening-streams.ts`

```typescript
export const mockListeningStreams = [
  {
    id: "stream-1",
    name: "Brand Mentions",
    streamType: "brand_mentions",
    searchConfig: {
      keywords: ["@ourcompany", "#ourcompany"],
      exactMatch: false
    },
    platforms: ["twitter", "instagram"],
    alertEnabled: true
  },
  // ... more streams
];

export const mockListeningStreamItems = [
  {
    id: "item-1",
    streamId: "stream-1",
    platform: "twitter",
    authorName: "John Doe",
    content: "Just tried @ourcompany and it's amazing!",
    sentiment: "positive",
    engagementCount: 145,
    isInfluencer: false
  },
  // ... more items
];
```

#### 4. `lib/mock-data/approvals.ts`

```typescript
export const mockApprovalWorkflows = [
  {
    id: "workflow-1",
    name: "Standard Post Approval",
    steps: [
      {
        level: 1,
        approvers: ["user-1"],
        requiredApprovals: 1
      },
      {
        level: 2,
        approvers: ["user-2"],
        requiredApprovals: 1,
        condition: "platforms includes 'facebook'"
      }
    ],
    autoScheduleOnApproval: true,
    isDefault: true
  },
  // ... more workflows
];

export const mockApprovalRequests = [
  {
    id: "request-1",
    workflowId: "workflow-1",
    postId: "post-1",
    status: "pending",
    currentLevel: 1,
    submittedBy: "user-3",
    submittedAt: "2025-11-22T08:00:00Z",
    expiresAt: "2025-11-29T08:00:00Z"
  },
  // ... more requests
];
```

#### 5. `lib/mock-data/reports.ts`

```typescript
export const mockScheduledReports = [
  {
    id: "report-1",
    name: "Weekly Performance Report",
    scheduleCron: "0 9 * * 1", // Every Monday at 9am
    reportType: "performance",
    reportConfig: {
      metrics: ["engagement_rate", "follower_growth"],
      platforms: ["all"],
      dateRange: "last_7_days"
    },
    recipients: ["manager@company.com"],
    format: "pdf",
    isActive: true
  },
  // ... more reports
];

export const mockPerformanceAlerts = [
  {
    id: "alert-1",
    name: "Low Engagement Alert",
    metric: "engagement_rate",
    thresholdConfig: {
      condition: "below",
      value: 2.5,
      comparisonPeriod: "previous_day"
    },
    notifyUsers: ["user-1", "user-2"],
    isActive: true
  },
  // ... more alerts
];
```

---

## 🎨 Design Guide Pages to Create

### New Pages for UI/UX

1. **Crisis Management Dashboard**
   - Path: `app/(app)/crisis-management/page.tsx`
   - Shows active incidents, sentiment trends, status components

2. **Status Page**
   - Path: `app/(app)/status/page.tsx`
   - Public-facing status page showing system health

3. **Automations Hub**
   - Path: `app/(app)/automations/page.tsx`
   - Central dashboard for all automations

4. **RSS Feeds Management**
   - Path: `app/(app)/automations/rss-feeds/page.tsx`
   - Manage RSS feed configurations

5. **Content Queue Manager**
   - Path: `app/(app)/automations/content-queue/page.tsx`
   - Manage content queues and schedules

6. **Listening Streams**
   - Path: `app/(app)/listening/page.tsx`
   - Monitor brand mentions, competitors, keywords

7. **Approval Workflows**
   - Path: `app/(app)/approvals/page.tsx`
   - Manage approval workflows and pending requests

8. **Reports & Analytics**
   - Path: `app/(app)/reports/page.tsx`
   - Scheduled reports and performance alerts

---

## 🔄 Integration with Existing Systems

### Queue Package Integration

The existing `@q8t/queue` package will be extended with new Inngest functions:

```typescript
// New Inngest functions to add
- RSS feed checker (cron job)
- Content queue publisher (cron job)
- Evergreen content recycler (cron job)
- Sentiment analyzer (event-driven)
- Crisis detector (event-driven)
- Report generator (scheduled)
- Listening stream refresher (cron job)
```

### Database Package Integration

All new migrations will be added to `apps/database/supabase/migrations/` following the existing numbering convention.

### SDK Usage

Automation packages will utilize existing platform SDKs:
- `@q8t/x-sdk` for Twitter automation
- `@q8t/instagram-sdk` for Instagram-specific features
- `@q8t/slack-sdk` for Slack notifications
- `@q8t/asana-sdk`, `@q8t/monday-sdk`, `@q8t/clickup-sdk` for task creation
- etc.

---

## 📦 Package Dependencies

### Dependency Graph

```
@q8t/crisis-management
  ├── @q8t/sentiment-analysis
  ├── @q8t/queue
  └── @supabase/supabase-js

@q8t/content-automation
  ├── @q8t/queue
  ├── @q8t/utils
  └── platform SDKs

@q8t/inbox-automation
  ├── @q8t/sentiment-analysis
  └── @supabase/supabase-js

@q8t/social-listening
  ├── @q8t/sentiment-analysis
  └── platform SDKs

@q8t/analytics-automation
  ├── @q8t/utils
  └── @supabase/supabase-js

@q8t/workflow-automation
  ├── @supabase/supabase-js
  └── integration SDKs (Slack, Teams, etc.)

@q8t/ai-automation
  ├── openai or @anthropic-ai/sdk
  └── @q8t/utils
```

---

## 🚦 Implementation Priority & Phases

### Phase 1: Foundation (Weeks 1-2)
**Goal:** Build core infrastructure

1. ✅ Create `@q8t/sentiment-analysis` package
2. ✅ Migration `00018_crisis_management.sql`
3. ✅ Create `@q8t/crisis-management` package
4. ✅ Design guide: Crisis dashboard + Status page mock data

**Deliverable:** Working crisis detection system with mock UI

---

### Phase 2: Content Automation (Weeks 3-4)
**Goal:** Automated content publishing

1. ✅ Migration `00019_content_automation.sql`
2. ✅ Create `@q8t/content-automation` package
3. ✅ RSS feed monitoring
4. ✅ Content queue management
5. ✅ Evergreen content recycling
6. ✅ Design guide: RSS feeds, queue manager pages

**Deliverable:** Automated RSS posting and content queuing

---

### Phase 3: Inbox & Listening (Weeks 5-6)
**Goal:** Intelligent inbox and social listening

1. ✅ Create `@q8t/inbox-automation` package
2. ✅ Migration `00020_social_listening.sql`
3. ✅ Create `@q8t/social-listening` package
4. ✅ Message routing and auto-responses
5. ✅ Listening streams and alerts
6. ✅ Design guide: Listening streams pages

**Deliverable:** Auto-routing inbox and brand monitoring

---

### Phase 4: Analytics & Workflows (Weeks 7-8)
**Goal:** Automated reporting and approvals

1. ✅ Migration `00021_analytics_automation.sql`
2. ✅ Migration `00022_workflow_automation.sql`
3. ✅ Create `@q8t/analytics-automation` package
4. ✅ Create `@q8t/workflow-automation` package
5. ✅ Scheduled reports
6. ✅ Approval workflows
7. ✅ Design guide: Reports and approvals pages

**Deliverable:** Automated reporting and approval system

---

### Phase 5: AI Enhancement (Weeks 9-10)
**Goal:** AI-powered features

1. ✅ Create `@q8t/ai-automation` package
2. ✅ Content generation
3. ✅ Smart replies
4. ✅ Hashtag suggestions
5. ✅ Platform-specific variations

**Deliverable:** AI-powered content assistance

---

## 🧪 Testing Strategy

### Package-Level Testing

Each package will have comprehensive tests:

```typescript
// Example test structure for @q8t/crisis-management
__tests__/
  ├── crisis-detector.test.ts
  │   ├── Sentiment spike detection
  │   ├── Keyword-based detection
  │   ├── Volume spike detection
  │   └── Threshold calculations
  │
  ├── incident-manager.test.ts
  │   ├── Incident creation
  │   ├── Incident lifecycle
  │   └── Resolution tracking
  │
  └── status-page-manager.test.ts
      ├── Component status updates
      └── Incident posting
```

### Integration Testing

Test interactions between packages:
- Sentiment analysis → Crisis detection
- Inbox message → Auto-response → Saved reply
- RSS feed check → Post creation → Publishing queue

### End-to-End Testing

Test complete workflows in design-guide:
- User creates automation rule → Rule triggers → Action executes
- Crisis detected → Incident created → Team notified → Status page updated

---

## 🔐 Security Considerations

1. **API Keys & Secrets**
   - Store sentiment API keys in environment variables
   - Use Supabase Vault for sensitive credentials

2. **Row Level Security**
   - All new tables have RLS policies
   - Workspace-scoped access
   - User-scoped for user-specific data

3. **Webhook Security**
   - Validate webhook signatures
   - Rate limit webhook endpoints

4. **Data Privacy**
   - Sentiment data stored securely
   - Option to disable sentiment analysis
   - GDPR compliance for data retention

---

## 📈 Performance Considerations

1. **Caching**
   - Cache listening stream results
   - Cache optimal posting times
   - Cache frequently used saved replies

2. **Background Jobs**
   - Use Inngest for all async processing
   - Implement proper retry logic
   - Rate limit API calls to external services

3. **Database Optimization**
   - Indexes on frequently queried fields
   - Partition large tables (message_sentiment, listening_stream_items)
   - Archive old data periodically

4. **Cost Optimization**
   - Batch sentiment analysis requests
   - Use cheaper sentiment APIs for initial filtering
   - Cache expensive calculations

---

## 🎯 Success Metrics

### Technical Metrics
- Test coverage > 80% per package
- API response time < 200ms (p95)
- Queue processing time < 5s per job
- Zero data loss on failures

### Business Metrics
- 50% reduction in manual posting time
- 90% faster crisis detection
- 70% reduction in response time
- 80% approval workflow adoption

---

## ❓ Open Questions for Discussion

1. **Sentiment Analysis Provider**
   - Which provider? OpenAI, Hugging Face, AWS Comprehend, or custom?
   - Cost considerations?

2. **Crisis Thresholds**
   - What are sensible default thresholds for crisis detection?
   - Should they be configurable per workspace?

3. **Status Page Visibility**
   - Public or private status pages?
   - Custom domain support?

4. **RSS Feed Limits**
   - How many RSS feeds per workspace?
   - Frequency limits for checks?

5. **AI Features**
   - OpenAI vs Anthropic for content generation?
   - Budget limits per workspace?

6. **Notification Channels**
   - Priority: Slack, Teams, or both?
   - SMS notifications for critical alerts?

---

## 📝 Next Steps

Once approved, I will:

1. ✅ Create migration files in `apps/database/supabase/migrations/`
2. ✅ Create mock data files in `apps/design-guide/lib/mock-data/`
3. ✅ Create Zod schemas in `apps/design-guide/lib/zod-schemas/`
4. ✅ Create UI components in `apps/design-guide/components/`
5. ✅ Create page layouts in `apps/design-guide/app/(app)/`
6. ⏳ Await approval to begin package implementation

---

## 📚 Summary

This architecture plan provides:

✅ **Clear separation of concerns** - Each package has a single, focused responsibility
✅ **Comprehensive coverage** - All requested automations are addressed
✅ **Scalable design** - Easy to add new features and platforms
✅ **Testable structure** - Packages can be tested in isolation
✅ **Incremental delivery** - Phased approach allows for iterative development
✅ **Integration-ready** - Works with existing queue and SDK packages

The design balances **flexibility** (JSONB configs), **type safety** (Zod schemas), and **performance** (indexes, caching, background jobs).

---

**Ready for your feedback and approval!** 🚀
