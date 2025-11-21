-- Social Inbox Core - Conversations, Messages, and Notes
-- This migration creates the unified inbox system for inbound messages

-- Create enum types for inbox
CREATE TYPE inbox_message_type AS ENUM (
  'dm',              -- Direct message / private message
  'mention',         -- @mention of workspace account
  'reply',           -- Reply to workspace post
  'comment',         -- Comment on workspace post
  'reaction',        -- Reaction/like to workspace post/message
  'follow_request',  -- Follow/friend request
  'share',           -- Content shared with workspace
  'story_mention',   -- Mention in story (Instagram/Facebook)
  'story_reply'      -- Reply to story
);

CREATE TYPE inbox_conversation_status AS ENUM ('open', 'pending', 'resolved', 'archived');
CREATE TYPE inbox_note_type AS ENUM ('internal', 'resolution', 'action_item', 'escalation', 'follow_up', 'general');

-- ============================================================================
-- SOCIAL INBOX CONVERSATIONS TABLE
-- ============================================================================

CREATE TABLE social_inbox_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Participants
  person_id UUID NOT NULL REFERENCES crm_people(id) ON DELETE CASCADE,
  social_account_id UUID NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,
  platform social_platform NOT NULL, -- Denormalized for performance

  -- Conversation metadata
  subject TEXT, -- Optional subject/title for the conversation
  status inbox_conversation_status DEFAULT 'open' NOT NULL,

  -- Message counts
  message_count INTEGER DEFAULT 0 NOT NULL,
  unread_count INTEGER DEFAULT 0 NOT NULL,

  -- Timestamps
  first_message_at TIMESTAMPTZ,
  last_message_at TIMESTAMPTZ,
  last_read_at TIMESTAMPTZ,

  -- Assignment for team collaboration
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  assigned_at TIMESTAMPTZ,

  -- Thread identification (platform-specific)
  platform_thread_id TEXT, -- Platform's conversation/thread ID

  -- Flags
  is_starred BOOLEAN DEFAULT false NOT NULL,
  is_spam BOOLEAN DEFAULT false NOT NULL,

  -- Platform-specific metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Unique constraint: one conversation per person + social_account + platform_thread
  UNIQUE(workspace_id, person_id, social_account_id, platform, platform_thread_id)
);

-- ============================================================================
-- SOCIAL INBOX MESSAGES TABLE
-- ============================================================================

CREATE TABLE social_inbox_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Conversation and person references
  conversation_id UUID NOT NULL REFERENCES social_inbox_conversations(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES crm_people(id) ON DELETE CASCADE,
  social_account_id UUID NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,
  platform social_platform NOT NULL, -- Denormalized for performance

  -- Message identification
  message_type inbox_message_type NOT NULL,
  platform_message_id TEXT NOT NULL, -- Unique ID from platform

  -- Message direction
  is_from_contact BOOLEAN NOT NULL, -- true = from contact, false = from workspace

  -- Content preview (first 500 chars for quick display)
  content_preview TEXT,
  content_length INTEGER,

  -- Media information
  has_media BOOLEAN DEFAULT false NOT NULL,
  media_count INTEGER DEFAULT 0 NOT NULL,

  -- Parent message (for threading/replies)
  parent_message_id UUID REFERENCES social_inbox_messages(id) ON DELETE SET NULL,
  platform_parent_message_id TEXT, -- Platform's parent message ID

  -- Status flags
  is_read BOOLEAN DEFAULT false NOT NULL,
  is_archived BOOLEAN DEFAULT false NOT NULL,
  is_deleted BOOLEAN DEFAULT false NOT NULL,

  -- Timestamps
  platform_created_at TIMESTAMPTZ NOT NULL, -- Original timestamp from platform
  synced_at TIMESTAMPTZ DEFAULT NOW() NOT NULL, -- When we fetched it
  read_at TIMESTAMPTZ,

  -- Reference to platform-specific table
  platform_table_name TEXT, -- e.g., 'inbox_messages_twitter', 'inbox_messages_telegram'

  -- Metadata
  metadata JSONB DEFAULT '{}', -- Additional platform-agnostic data

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Unique constraint: one message per platform + platform_message_id
  UNIQUE(workspace_id, platform, platform_message_id)
);

-- ============================================================================
-- SOCIAL INBOX CONVERSATION NOTES TABLE
-- ============================================================================

CREATE TABLE social_inbox_conversation_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  conversation_id UUID NOT NULL REFERENCES social_inbox_conversations(id) ON DELETE CASCADE,

  -- Note content
  content TEXT NOT NULL,
  note_type inbox_note_type DEFAULT 'internal' NOT NULL,
  visibility crm_note_visibility DEFAULT 'team' NOT NULL,

  -- Author tracking
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- @mentions for notifications
  mentioned_user_ids UUID[] DEFAULT '{}',

  -- Organization
  is_pinned BOOLEAN DEFAULT false NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- SOCIAL INBOX MESSAGE NOTES TABLE
-- ============================================================================

CREATE TABLE social_inbox_message_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  message_id UUID NOT NULL REFERENCES social_inbox_messages(id) ON DELETE CASCADE,

  -- Note content
  content TEXT NOT NULL,
  note_type inbox_note_type DEFAULT 'general' NOT NULL,
  visibility crm_note_visibility DEFAULT 'team' NOT NULL,

  -- Author tracking
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER update_social_inbox_conversations_updated_at BEFORE UPDATE ON social_inbox_conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_inbox_messages_updated_at BEFORE UPDATE ON social_inbox_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_inbox_conversation_notes_updated_at BEFORE UPDATE ON social_inbox_conversation_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update conversation counts when messages change
CREATE OR REPLACE FUNCTION update_conversation_message_counts()
RETURNS TRIGGER AS $$
DECLARE
  conv_id UUID;
  new_unread_count INTEGER;
  new_message_count INTEGER;
  new_last_message_at TIMESTAMPTZ;
BEGIN
  -- Get conversation ID
  IF TG_OP = 'DELETE' THEN
    conv_id := OLD.conversation_id;
  ELSE
    conv_id := NEW.conversation_id;
  END IF;

  -- Recalculate counts
  SELECT
    COUNT(*),
    COUNT(*) FILTER (WHERE NOT is_read AND is_from_contact),
    MAX(platform_created_at)
  INTO new_message_count, new_unread_count, new_last_message_at
  FROM social_inbox_messages
  WHERE conversation_id = conv_id
  AND NOT is_deleted;

  -- Update conversation
  UPDATE social_inbox_conversations
  SET
    message_count = new_message_count,
    unread_count = new_unread_count,
    last_message_at = new_last_message_at,
    first_message_at = COALESCE(
      first_message_at,
      (SELECT MIN(platform_created_at) FROM social_inbox_messages WHERE conversation_id = conv_id AND NOT is_deleted)
    )
  WHERE id = conv_id;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to update conversation counts
CREATE TRIGGER update_conversation_counts_on_message_change
  AFTER INSERT OR UPDATE OR DELETE ON social_inbox_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_message_counts();

-- Function to update person engagement metrics
CREATE OR REPLACE FUNCTION update_person_engagement_metrics()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update total messages and last contact time
    UPDATE crm_people
    SET
      total_messages = total_messages + 1,
      last_contact_at = GREATEST(last_contact_at, NEW.platform_created_at),
      first_contact_at = COALESCE(first_contact_at, NEW.platform_created_at)
    WHERE id = NEW.person_id;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrement message count
    UPDATE crm_people
    SET total_messages = GREATEST(0, total_messages - 1)
    WHERE id = OLD.person_id;
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to update person metrics
CREATE TRIGGER update_person_metrics_on_message_change
  AFTER INSERT OR DELETE ON social_inbox_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_person_engagement_metrics();

-- Function to update conversation unread count when marking as read
CREATE OR REPLACE FUNCTION mark_conversation_as_read(
  conversation_uuid UUID,
  user_uuid UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Mark all unread messages in conversation as read
  UPDATE social_inbox_messages
  SET
    is_read = true,
    read_at = NOW()
  WHERE conversation_id = conversation_uuid
  AND NOT is_read
  AND is_from_contact;

  -- Update conversation last_read_at
  UPDATE social_inbox_conversations
  SET last_read_at = NOW()
  WHERE id = conversation_uuid;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to assign conversation to team member
CREATE OR REPLACE FUNCTION assign_conversation(
  conversation_uuid UUID,
  assignee_uuid UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE social_inbox_conversations
  SET
    assigned_to = assignee_uuid,
    assigned_at = NOW()
  WHERE id = conversation_uuid;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to create or get conversation
CREATE OR REPLACE FUNCTION find_or_create_conversation(
  workspace_uuid UUID,
  person_uuid UUID,
  social_account_uuid UUID,
  platform_name social_platform,
  platform_thread_identifier TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  conversation_uuid UUID;
BEGIN
  -- Try to find existing conversation
  SELECT id INTO conversation_uuid
  FROM social_inbox_conversations
  WHERE workspace_id = workspace_uuid
  AND person_id = person_uuid
  AND social_account_id = social_account_uuid
  AND platform = platform_name
  AND (
    (platform_thread_id = platform_thread_identifier) OR
    (platform_thread_id IS NULL AND platform_thread_identifier IS NULL)
  );

  -- If not found, create new conversation
  IF conversation_uuid IS NULL THEN
    INSERT INTO social_inbox_conversations (
      workspace_id,
      person_id,
      social_account_id,
      platform,
      platform_thread_id,
      status
    ) VALUES (
      workspace_uuid,
      person_uuid,
      social_account_uuid,
      platform_name,
      platform_thread_identifier,
      'open'
    )
    RETURNING id INTO conversation_uuid;

    -- Update person's conversation count
    UPDATE crm_people
    SET total_conversations = total_conversations + 1
    WHERE id = person_uuid;
  END IF;

  RETURN conversation_uuid;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE social_inbox_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_inbox_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_inbox_conversation_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_inbox_message_notes ENABLE ROW LEVEL SECURITY;

-- Conversations policies
CREATE POLICY "Workspace members can view conversations"
  ON social_inbox_conversations
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can insert conversations"
  ON social_inbox_conversations
  FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can update conversations"
  ON social_inbox_conversations
  FOR UPDATE
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can delete conversations"
  ON social_inbox_conversations
  FOR DELETE
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Messages policies
CREATE POLICY "Workspace members can view messages"
  ON social_inbox_messages
  FOR SELECT
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can insert messages"
  ON social_inbox_messages
  FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace members can update messages"
  ON social_inbox_messages
  FOR UPDATE
  USING (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can delete messages"
  ON social_inbox_messages
  FOR DELETE
  USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- Conversation notes policies
CREATE POLICY "Team members can view team conversation notes"
  ON social_inbox_conversation_notes
  FOR SELECT
  USING (
    is_workspace_member(workspace_id, auth.uid())
    AND (visibility = 'team' OR author_id = auth.uid())
  );

CREATE POLICY "Workspace members can insert conversation notes"
  ON social_inbox_conversation_notes
  FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Note authors can update their conversation notes"
  ON social_inbox_conversation_notes
  FOR UPDATE
  USING (author_id = auth.uid());

CREATE POLICY "Note authors and admins can delete conversation notes"
  ON social_inbox_conversation_notes
  FOR DELETE
  USING (
    author_id = auth.uid() OR
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  );

-- Message notes policies
CREATE POLICY "Team members can view team message notes"
  ON social_inbox_message_notes
  FOR SELECT
  USING (
    is_workspace_member(workspace_id, auth.uid())
    AND (visibility = 'team' OR author_id = auth.uid())
  );

CREATE POLICY "Workspace members can insert message notes"
  ON social_inbox_message_notes
  FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Note authors and admins can delete message notes"
  ON social_inbox_message_notes
  FOR DELETE
  USING (
    author_id = auth.uid() OR
    has_workspace_role(workspace_id, auth.uid(), 'admin')
  );

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Conversations indexes
CREATE INDEX idx_inbox_conversations_workspace_id ON social_inbox_conversations(workspace_id);
CREATE INDEX idx_inbox_conversations_person_id ON social_inbox_conversations(person_id);
CREATE INDEX idx_inbox_conversations_social_account_id ON social_inbox_conversations(social_account_id);
CREATE INDEX idx_inbox_conversations_platform ON social_inbox_conversations(platform);
CREATE INDEX idx_inbox_conversations_status ON social_inbox_conversations(workspace_id, status);
CREATE INDEX idx_inbox_conversations_assigned_to ON social_inbox_conversations(assigned_to) WHERE assigned_to IS NOT NULL;
CREATE INDEX idx_inbox_conversations_unread ON social_inbox_conversations(workspace_id, unread_count) WHERE unread_count > 0;
CREATE INDEX idx_inbox_conversations_last_message_at ON social_inbox_conversations(workspace_id, last_message_at DESC NULLS LAST);
CREATE INDEX idx_inbox_conversations_is_starred ON social_inbox_conversations(workspace_id, is_starred) WHERE is_starred = true;
CREATE INDEX idx_inbox_conversations_platform_thread_id ON social_inbox_conversations(platform, platform_thread_id) WHERE platform_thread_id IS NOT NULL;
CREATE INDEX idx_inbox_conversations_metadata ON social_inbox_conversations USING GIN (metadata);

-- Messages indexes
CREATE INDEX idx_inbox_messages_workspace_id ON social_inbox_messages(workspace_id);
CREATE INDEX idx_inbox_messages_conversation_id ON social_inbox_messages(conversation_id);
CREATE INDEX idx_inbox_messages_person_id ON social_inbox_messages(person_id);
CREATE INDEX idx_inbox_messages_social_account_id ON social_inbox_messages(social_account_id);
CREATE INDEX idx_inbox_messages_platform ON social_inbox_messages(platform);
CREATE INDEX idx_inbox_messages_message_type ON social_inbox_messages(message_type);
CREATE INDEX idx_inbox_messages_platform_message_id ON social_inbox_messages(platform, platform_message_id);
CREATE INDEX idx_inbox_messages_is_read ON social_inbox_messages(conversation_id, is_read) WHERE NOT is_read;
CREATE INDEX idx_inbox_messages_is_from_contact ON social_inbox_messages(conversation_id, is_from_contact);
CREATE INDEX idx_inbox_messages_platform_created_at ON social_inbox_messages(conversation_id, platform_created_at DESC);
CREATE INDEX idx_inbox_messages_parent_message_id ON social_inbox_messages(parent_message_id) WHERE parent_message_id IS NOT NULL;
CREATE INDEX idx_inbox_messages_has_media ON social_inbox_messages(conversation_id, has_media) WHERE has_media = true;
CREATE INDEX idx_inbox_messages_synced_at ON social_inbox_messages(workspace_id, synced_at DESC);
CREATE INDEX idx_inbox_messages_metadata ON social_inbox_messages USING GIN (metadata);

-- Conversation notes indexes
CREATE INDEX idx_inbox_conversation_notes_workspace_id ON social_inbox_conversation_notes(workspace_id);
CREATE INDEX idx_inbox_conversation_notes_conversation_id ON social_inbox_conversation_notes(conversation_id);
CREATE INDEX idx_inbox_conversation_notes_author_id ON social_inbox_conversation_notes(author_id);
CREATE INDEX idx_inbox_conversation_notes_note_type ON social_inbox_conversation_notes(note_type);
CREATE INDEX idx_inbox_conversation_notes_is_pinned ON social_inbox_conversation_notes(conversation_id, is_pinned) WHERE is_pinned = true;
CREATE INDEX idx_inbox_conversation_notes_created_at ON social_inbox_conversation_notes(conversation_id, created_at DESC);
CREATE INDEX idx_inbox_conversation_notes_mentioned_users ON social_inbox_conversation_notes USING GIN (mentioned_user_ids);

-- Message notes indexes
CREATE INDEX idx_inbox_message_notes_workspace_id ON social_inbox_message_notes(workspace_id);
CREATE INDEX idx_inbox_message_notes_message_id ON social_inbox_message_notes(message_id);
CREATE INDEX idx_inbox_message_notes_author_id ON social_inbox_message_notes(author_id);
CREATE INDEX idx_inbox_message_notes_created_at ON social_inbox_message_notes(message_id, created_at DESC);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE social_inbox_conversations IS 'Conversation threads grouping related messages by person and platform';
COMMENT ON TABLE social_inbox_messages IS 'Unified inbox messages index with references to platform-specific tables';
COMMENT ON TABLE social_inbox_conversation_notes IS 'Internal team notes on conversation threads';
COMMENT ON TABLE social_inbox_message_notes IS 'Annotations on individual messages';

COMMENT ON COLUMN social_inbox_messages.platform_table_name IS 'Name of platform-specific table containing full message data';
COMMENT ON COLUMN social_inbox_messages.content_preview IS 'First 500 characters of message content for quick display';
COMMENT ON COLUMN social_inbox_messages.is_from_contact IS 'Direction: true = incoming from contact, false = outgoing from workspace';

COMMENT ON FUNCTION update_conversation_message_counts IS 'Automatically updates message counts in conversations when messages change';
COMMENT ON FUNCTION update_person_engagement_metrics IS 'Updates CRM person metrics when messages are added/removed';
COMMENT ON FUNCTION mark_conversation_as_read IS 'Marks all messages in a conversation as read';
COMMENT ON FUNCTION assign_conversation IS 'Assigns a conversation to a team member';
COMMENT ON FUNCTION find_or_create_conversation IS 'Finds existing conversation or creates new one';
