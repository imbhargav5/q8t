# Social Inbox Schema Documentation

## Overview

The Q8T Social Inbox is an extensible, multi-tenant inbox system designed to handle inbound messages from 30+ social media platforms. The schema is built with the following principles:

- **Extensibility**: Easy to add new platforms without schema changes
- **Proper Typing**: Core fields are typed columns, platform-specific data in JSONB + dedicated tables
- **Multi-Tenancy**: Workspace-based isolation with team collaboration
- **CRM Integration**: Unified contact management with cross-platform identity linking
- **Comprehensive Notes**: Three-level notes system (person, conversation, message)
- **Automation Ready**: Rules, tags, assignments, and saved replies for team productivity

## Architecture Layers

### 1. Foundation Layer (Migrations 00006-00007)
- **Workspaces**: Multi-tenant organization containers
- **Workspace Members**: Team collaboration with roles (owner, admin, member, viewer)
- **Workspace Refactor**: Adds workspace_id to existing tables (social_accounts, posts, etc.)

### 2. CRM Layer (Migration 00008)
- **CRM People**: Unified contact records (email as primary identifier)
- **CRM Social Identities**: Platform-specific profiles linked to people
- **CRM Person Notes**: Profile-level notes for persistent context

### 3. Inbox Core Layer (Migration 00009)
- **Social Inbox Conversations**: Thread grouping by person + platform
- **Social Inbox Messages**: Unified message index linking all entities
- **Conversation Notes**: Thread-level collaboration notes
- **Message Notes**: Individual message annotations

### 4. Platform Layer (Migration 00010)
- **Platform-Specific Tables**: 18 dedicated tables for major platforms
  - Twitter/X, Telegram, Instagram, Discord, Mastodon, Reddit, Slack, WhatsApp, Facebook, LinkedIn, Farcaster, Bluesky, Threads, TikTok, Pinterest, YouTube, Nostr
- **Generic Fallback**: For platforms with simple message structures

### 5. Media Layer (Migration 00011)
- **Social Inbox Media**: Thumbnails/previews stored in Supabase Storage
- **Storage Buckets**: Organized by workspace/year/month
- **Processing Pipeline**: Pending → Downloading → Processing → Completed

### 6. Sync Layer (Migration 00012)
- **Webhook Endpoints**: Real-time message delivery configuration
- **Webhook Events**: Raw incoming webhook payloads
- **Sync Jobs**: Polling-based sync for platforms without webhooks
- **Platform Sync Capabilities**: Reference data for sync methods

### 7. Automation Layer (Migration 00013)
- **Inbox Rules**: Trigger-based automation (keyword match, auto-assign, etc.)
- **Inbox Tags**: Categorization and organization
- **Inbox Assignments**: Team member task assignments
- **Saved Replies**: Pre-written response templates
- **Inbox Views**: Saved filters for custom inbox views

## Core Table Relationships

```
workspaces
  ├─ workspace_members (users in workspace)
  ├─ social_accounts (connected platforms)
  ├─ crm_people (contacts/customers)
  │   ├─ crm_social_identities (platform profiles)
  │   └─ crm_person_notes (profile notes)
  │
  └─ social_inbox_conversations (threads)
      ├─ social_inbox_messages (unified messages)
      │   ├─ inbox_messages_twitter (Twitter data)
      │   ├─ inbox_messages_telegram (Telegram data)
      │   ├─ inbox_messages_instagram (Instagram data)
      │   ├─ ... (other platform tables)
      │   ├─ social_inbox_media (media attachments)
      │   └─ social_inbox_message_notes (message annotations)
      │
      ├─ social_inbox_conversation_notes (thread notes)
      ├─ conversation_tags (tag associations)
      └─ inbox_assignments (team assignments)
```

## Key Design Decisions

### 1. Two-Tier Message Storage

**Why?** Balance between unified querying and platform-specific data richness.

- **Tier 1**: `social_inbox_messages` - Unified index for cross-platform queries
  - Contains: message type, read status, content preview, timestamps, person/conversation links
  - Enables: "Show all unread mentions across all platforms"

- **Tier 2**: Platform-specific tables - Full fidelity data
  - Contains: Complete platform response, engagement metrics, platform-specific fields
  - Enables: "Show Twitter retweet count" or "Display Discord embeds"

### 2. Email-Based Person Unification

**Why?** Most reliable cross-platform identifier.

- Email is the most stable identifier across platforms
- Platforms like Instagram, LinkedIn, etc. can reveal email
- Falls back to separate person records if email unavailable
- Manual merge function available for duplicates

### 3. Workspace-First Multi-Tenancy

**Why?** Team collaboration is core to inbox management.

- All data isolated by workspace_id
- RLS policies enforce workspace boundaries
- Existing user-scoped data automatically migrated to default workspace
- Supports future B2B SaaS model

### 4. JSONB + Typed Columns Hybrid

**Why?** Flexibility without sacrificing query performance.

**Typed Columns**: Fields used for filtering/sorting
- message_type, is_read, platform, platform_created_at
- Enables fast indexes and efficient queries

**JSONB Fields**: Platform-specific or rarely queried data
- metadata, platform_data, entities
- Allows new platforms without schema changes

### 5. Preview-Only Media Strategy

**Why?** Balance cost, speed, and legal considerations.

- **Downloaded**: Thumbnails/previews only (images downsized, video keyframes)
- **Not Downloaded**: Full-resolution originals remain on platform
- **Storage**: Organized in Supabase Storage by workspace/year/month
- **Expiration Handling**: Track URL expiration for platforms like WhatsApp

### 6. Three-Level Notes System

**Why?** Different contexts require different note scopes.

1. **Person Notes** (`crm_person_notes`)
   - Persistent context about the contact
   - Visible across all conversations with this person
   - Example: "VIP customer - 2 hour SLA"

2. **Conversation Notes** (`social_inbox_conversation_notes`)
   - Context for this specific thread
   - Team collaboration on this interaction
   - Example: "Bug reported - ticket #4782 created"

3. **Message Notes** (`social_inbox_message_notes`)
   - Annotations on individual messages
   - Like comments on Google Docs
   - Example: "Feature request - add to roadmap"

## Extensibility Guide

### Adding a New Platform

1. **Update Enum** (if not already present):
   ```sql
   ALTER TYPE social_platform ADD VALUE 'new_platform';
   ```

2. **Create Platform Table**:
   ```sql
   CREATE TABLE inbox_messages_new_platform (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     inbox_message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

     -- Platform-specific fields
     platform_message_id TEXT UNIQUE NOT NULL,
     text TEXT NOT NULL,
     author_id TEXT NOT NULL,
     -- ... other typed fields

     -- Flexible metadata
     message_data JSONB DEFAULT '{}',

     created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
   );

   CREATE INDEX idx_inbox_new_platform_inbox_message_id
     ON inbox_messages_new_platform(inbox_message_id);
   ```

3. **Add Sync Capability**:
   ```sql
   INSERT INTO platform_sync_capabilities (
     platform,
     supports_webhooks,
     supports_polling,
     recommended_sync_method,
     polling_min_interval_minutes
   ) VALUES (
     'new_platform',
     true,
     true,
     'webhook',
     5
   );
   ```

4. **Update Application Code**:
   - Add message handler in sync service
   - Map platform fields to unified schema
   - Handle person/identity creation

### Adding Custom Fields to People

Use `custom_fields` JSONB in `crm_people`:

```sql
UPDATE crm_people
SET custom_fields = custom_fields || '{"vip_tier": "gold", "account_manager": "Sarah"}'
WHERE id = 'person-uuid';
```

Query custom fields:
```sql
SELECT * FROM crm_people
WHERE custom_fields->>'vip_tier' = 'gold';
```

## Performance Considerations

### Indexes Strategy

**Composite Indexes**: For common filter combinations
- `(workspace_id, status)` - Filter by workspace AND status
- `(workspace_id, created_at DESC)` - Paginated lists

**Partial Indexes**: For sparse data
- `WHERE is_read = false` - Only index unread messages
- `WHERE status = 'pending'` - Only index pending items

**GIN Indexes**: For JSONB and arrays
- `metadata JSONB` - Fast JSONB key/value searches
- `tags TEXT[]` - Array containment queries

### Query Patterns

**Inbox List View**:
```sql
SELECT
  c.*,
  p.full_name,
  p.avatar_url,
  COUNT(m.id) FILTER (WHERE NOT m.is_read) as unread_count
FROM social_inbox_conversations c
JOIN crm_people p ON p.id = c.person_id
LEFT JOIN social_inbox_messages m ON m.conversation_id = c.id
WHERE c.workspace_id = 'workspace-uuid'
  AND c.status = 'open'
GROUP BY c.id, p.id
ORDER BY c.last_message_at DESC
LIMIT 50;
```

**Message Thread**:
```sql
SELECT
  m.*,
  CASE
    WHEN m.platform = 'twitter' THEN (SELECT row_to_json(t.*) FROM inbox_messages_twitter t WHERE t.inbox_message_id = m.id)
    WHEN m.platform = 'telegram' THEN (SELECT row_to_json(t.*) FROM inbox_messages_telegram t WHERE t.inbox_message_id = m.id)
    -- ... other platforms
  END as platform_data
FROM social_inbox_messages m
WHERE m.conversation_id = 'conversation-uuid'
ORDER BY m.platform_created_at ASC;
```

## Security Model

### Row Level Security (RLS)

All tables have RLS enabled with workspace-based policies:

**Standard Pattern**:
```sql
-- SELECT: Any workspace member can view
CREATE POLICY "Workspace members can view"
  ON table_name FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

-- INSERT/UPDATE: Any workspace member can modify
CREATE POLICY "Workspace members can modify"
  ON table_name FOR INSERT/UPDATE
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

-- DELETE: Only admins can delete
CREATE POLICY "Workspace admins can delete"
  ON table_name FOR DELETE
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));
```

**Note Visibility**:
- `visibility = 'private'`: Only note author can see
- `visibility = 'team'`: All workspace members can see

### Token Security

**Encryption Required**:
- `social_accounts.access_token` - OAuth access tokens
- `social_accounts.refresh_token` - OAuth refresh tokens
- `webhook_endpoints.secret_token` - Webhook signing secrets

These should be encrypted at the application layer before storage.

## Webhook Flow

1. **Registration** → Platform sends webhook to `webhook_endpoints.webhook_url`
2. **Validation** → Verify signature using `secret_token`
3. **Storage** → Raw payload saved in `webhook_events`
4. **Processing** → Extract messages, create person/identity if needed
5. **Indexing** → Create record in `social_inbox_messages`
6. **Platform Data** → Store full data in platform-specific table
7. **Media** → Queue thumbnails for download in `social_inbox_media`
8. **Automation** → Evaluate `inbox_rules` for matches
9. **Completion** → Mark `webhook_events.status = 'processed'`

## Polling Flow

1. **Scheduling** → `sync_jobs` with `next_sync_at <= NOW()`
2. **Execution** → Call platform API with cursor from `sync_cursor`
3. **Processing** → Same as webhook flow (steps 4-8)
4. **Tracking** → Update `sync_cursor`, `last_message_timestamp`
5. **Completion** → Create `sync_job_runs` record
6. **Rescheduling** → Set `next_sync_at` based on `sync_interval_minutes`

## Migration Guide

### From Single-User to Workspace

Existing users are automatically migrated in `00007_workspace_refactor.sql`:

1. Default workspace created: `{username}-{uuid}`
2. User added as owner
3. All user's data linked to workspace:
   - social_accounts → workspace
   - posts → workspace
   - media_assets → workspace

### Manual Workspace Creation

```sql
-- Create workspace
INSERT INTO workspaces (name, slug, created_by)
VALUES ('Acme Corp', 'acme-corp', 'user-uuid')
RETURNING id;

-- Add team member
INSERT INTO workspace_members (workspace_id, user_id, role, status)
VALUES ('workspace-uuid', 'user-uuid', 'admin', 'active');
```

## Monitoring & Maintenance

### Health Checks

**Pending Sync Jobs**:
```sql
SELECT COUNT(*)
FROM sync_jobs
WHERE is_active = true
  AND status = 'idle'
  AND next_sync_at < NOW();
```

**Failed Webhooks**:
```sql
SELECT COUNT(*)
FROM webhook_events
WHERE status = 'failed'
  AND processing_attempts < max_retry_attempts;
```

**Storage Usage**:
```sql
SELECT workspace_id, storage_used_bytes, storage_quota_bytes
FROM workspaces
WHERE storage_used_bytes > storage_quota_bytes * 0.9;
```

### Cleanup Tasks

**Expired Media URLs** (run daily):
```sql
SELECT cleanup_expired_inbox_media();
```

**Old Webhook Events** (run weekly):
```sql
DELETE FROM webhook_events
WHERE created_at < NOW() - INTERVAL '30 days'
  AND status = 'processed';
```

**Sync Job Runs History** (run monthly):
```sql
DELETE FROM sync_job_runs
WHERE created_at < NOW() - INTERVAL '90 days';
```

## Future Enhancements

### Planned Features
- [ ] AI-powered message categorization
- [ ] Sentiment analysis integration
- [ ] Multi-language support for auto-translation
- [ ] Scheduled message sending
- [ ] Team performance analytics
- [ ] SLA tracking and alerts
- [ ] Customer satisfaction surveys
- [ ] Integration with ticketing systems

### Schema Additions Needed
- `inbox_analytics` - Aggregated metrics
- `scheduled_messages` - Queued outbound messages
- `sla_policies` - Response time requirements
- `team_handoffs` - Conversation transfers between members

## Support

For questions or issues with the schema:
- Check migrations in `apps/database/supabase/migrations/`
- Review RLS policies for permission issues
- Check indexes for slow queries
- Monitor Supabase logs for errors

## Version History

- **v1.0** (2024-01): Initial schema with 8 migrations
  - Workspaces and multi-tenancy
  - CRM with person unification
  - Inbox core with conversations and messages
  - 18 platform-specific tables
  - Media handling with Supabase Storage
  - Webhook and polling sync infrastructure
  - Automation with rules, tags, and assignments
