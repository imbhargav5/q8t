-- CRM Views and Helper Functions
-- This migration creates materialized views and helper functions for CRM analytics and performance

-- ============================================================================
-- MATERIALIZED VIEWS
-- ============================================================================

-- Active Contacts View (last 30 days)
CREATE MATERIALIZED VIEW crm_active_contacts AS
SELECT
  p.*,
  COUNT(DISTINCT c.id) as active_conversation_count,
  COUNT(DISTINCT m.id) as recent_message_count
FROM crm_people p
LEFT JOIN social_inbox_conversations c ON c.person_id = p.id
  AND c.last_message_at > NOW() - INTERVAL '30 days'
LEFT JOIN social_inbox_messages m ON m.person_id = p.id
  AND m.created_at > NOW() - INTERVAL '30 days'
WHERE p.last_contact_at > NOW() - INTERVAL '30 days'
  AND p.is_blocked = false
GROUP BY p.id;

CREATE UNIQUE INDEX idx_crm_active_contacts_id ON crm_active_contacts(id);
CREATE INDEX idx_crm_active_contacts_workspace ON crm_active_contacts(workspace_id);

-- Contact Engagement Score View
CREATE MATERIALIZED VIEW crm_contact_engagement AS
SELECT
  p.id,
  p.workspace_id,
  p.full_name,
  p.email,
  p.total_messages,
  p.total_conversations,
  p.last_contact_at,
  p.is_vip,
  -- Calculate engagement score (0-100)
  LEAST(100, (
    -- Recent activity score (40 points max)
    CASE
      WHEN p.last_contact_at > NOW() - INTERVAL '7 days' THEN 40
      WHEN p.last_contact_at > NOW() - INTERVAL '30 days' THEN 30
      WHEN p.last_contact_at > NOW() - INTERVAL '90 days' THEN 15
      ELSE 5
    END +
    -- Message volume score (30 points max)
    LEAST(30, p.total_messages) +
    -- Conversation volume score (20 points max)
    LEAST(20, p.total_conversations * 5) +
    -- VIP bonus (10 points)
    CASE WHEN p.is_vip THEN 10 ELSE 0 END
  )) as engagement_score,
  -- Categorize engagement level
  CASE
    WHEN p.last_contact_at > NOW() - INTERVAL '7 days' AND p.total_messages > 10 THEN 'very_high'
    WHEN p.last_contact_at > NOW() - INTERVAL '30 days' AND p.total_messages > 5 THEN 'high'
    WHEN p.last_contact_at > NOW() - INTERVAL '90 days' THEN 'medium'
    WHEN p.last_contact_at IS NOT NULL THEN 'low'
    ELSE 'none'
  END as engagement_level,
  -- Calculate days since last contact
  CASE
    WHEN p.last_contact_at IS NOT NULL
    THEN EXTRACT(DAY FROM NOW() - p.last_contact_at)::INTEGER
    ELSE NULL
  END as days_since_last_contact
FROM crm_people p;

CREATE UNIQUE INDEX idx_crm_contact_engagement_id ON crm_contact_engagement(id);
CREATE INDEX idx_crm_contact_engagement_workspace ON crm_contact_engagement(workspace_id);
CREATE INDEX idx_crm_contact_engagement_score ON crm_contact_engagement(workspace_id, engagement_score DESC);
CREATE INDEX idx_crm_contact_engagement_level ON crm_contact_engagement(workspace_id, engagement_level);

-- Contact Platform Summary View
CREATE MATERIALIZED VIEW crm_contact_platform_summary AS
SELECT
  p.id as person_id,
  p.workspace_id,
  p.full_name,
  p.email,
  array_agg(DISTINCT si.platform) FILTER (WHERE si.platform IS NOT NULL) as platforms,
  COUNT(DISTINCT si.platform) as platform_count,
  jsonb_object_agg(
    si.platform,
    jsonb_build_object(
      'username', si.platform_username,
      'follower_count', si.follower_count,
      'is_verified', si.is_verified,
      'last_seen_at', si.last_seen_at
    )
  ) FILTER (WHERE si.platform IS NOT NULL) as platform_details
FROM crm_people p
LEFT JOIN crm_social_identities si ON si.person_id = p.id
GROUP BY p.id, p.workspace_id, p.full_name, p.email;

CREATE UNIQUE INDEX idx_crm_contact_platform_summary_id ON crm_contact_platform_summary(person_id);
CREATE INDEX idx_crm_contact_platform_summary_workspace ON crm_contact_platform_summary(workspace_id);
CREATE INDEX idx_crm_contact_platform_summary_platforms ON crm_contact_platform_summary USING GIN (platforms);

-- ============================================================================
-- HELPER VIEWS (Non-Materialized for Real-Time Data)
-- ============================================================================

-- VIP Contacts View
CREATE VIEW crm_vip_contacts AS
SELECT p.*
FROM crm_people p
WHERE p.is_vip = true
  AND p.is_blocked = false
ORDER BY p.last_contact_at DESC NULLS LAST;

-- Inactive Contacts View (90+ days)
CREATE VIEW crm_inactive_contacts AS
SELECT
  p.*,
  EXTRACT(DAY FROM NOW() - p.last_contact_at)::INTEGER as days_inactive
FROM crm_people p
WHERE (
    p.last_contact_at < NOW() - INTERVAL '90 days'
    OR p.last_contact_at IS NULL
  )
  AND p.is_blocked = false
ORDER BY p.last_contact_at ASC NULLS LAST;

-- Recent Contacts View (last 7 days)
CREATE VIEW crm_recent_contacts AS
SELECT p.*
FROM crm_people p
WHERE p.created_at > NOW() - INTERVAL '7 days'
ORDER BY p.created_at DESC;

-- ============================================================================
-- ANALYTICS FUNCTIONS
-- ============================================================================

-- Function to get CRM statistics for a workspace
CREATE OR REPLACE FUNCTION get_crm_statistics(workspace_uuid UUID)
RETURNS TABLE (
  total_contacts INTEGER,
  active_contacts INTEGER,
  vip_contacts INTEGER,
  verified_contacts INTEGER,
  blocked_contacts INTEGER,
  new_this_month INTEGER,
  new_this_week INTEGER,
  avg_messages_per_contact NUMERIC,
  total_conversations INTEGER,
  contacts_by_platform JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::INTEGER as total_contacts,
    COUNT(*) FILTER (WHERE last_contact_at > NOW() - INTERVAL '30 days')::INTEGER as active_contacts,
    COUNT(*) FILTER (WHERE is_vip = true)::INTEGER as vip_contacts,
    COUNT(*) FILTER (WHERE is_verified = true)::INTEGER as verified_contacts,
    COUNT(*) FILTER (WHERE is_blocked = true)::INTEGER as blocked_contacts,
    COUNT(*) FILTER (WHERE created_at > DATE_TRUNC('month', NOW()))::INTEGER as new_this_month,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days')::INTEGER as new_this_week,
    ROUND(AVG(total_messages), 2) as avg_messages_per_contact,
    SUM(total_conversations)::INTEGER as total_conversations,
    (
      SELECT jsonb_object_agg(platform, contact_count)
      FROM (
        SELECT
          si.platform,
          COUNT(DISTINCT si.person_id)::INTEGER as contact_count
        FROM crm_social_identities si
        WHERE si.workspace_id = workspace_uuid
        GROUP BY si.platform
      ) platform_stats
    ) as contacts_by_platform
  FROM crm_people p
  WHERE p.workspace_id = workspace_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get contact growth over time
CREATE OR REPLACE FUNCTION get_contact_growth(
  workspace_uuid UUID,
  period TEXT DEFAULT '30days' -- '7days', '30days', '90days', '1year'
)
RETURNS TABLE (
  date DATE,
  new_contacts INTEGER,
  cumulative_contacts INTEGER
) AS $$
DECLARE
  start_date DATE;
  interval_val INTERVAL;
BEGIN
  -- Determine start date and interval based on period
  CASE period
    WHEN '7days' THEN
      start_date := CURRENT_DATE - INTERVAL '7 days';
      interval_val := INTERVAL '1 day';
    WHEN '30days' THEN
      start_date := CURRENT_DATE - INTERVAL '30 days';
      interval_val := INTERVAL '1 day';
    WHEN '90days' THEN
      start_date := CURRENT_DATE - INTERVAL '90 days';
      interval_val := INTERVAL '1 day';
    WHEN '1year' THEN
      start_date := CURRENT_DATE - INTERVAL '1 year';
      interval_val := INTERVAL '1 week';
    ELSE
      start_date := CURRENT_DATE - INTERVAL '30 days';
      interval_val := INTERVAL '1 day';
  END CASE;

  RETURN QUERY
  WITH date_series AS (
    SELECT generate_series(
      start_date,
      CURRENT_DATE,
      interval_val
    )::DATE as date
  ),
  daily_counts AS (
    SELECT
      ds.date,
      COUNT(p.id)::INTEGER as new_contacts
    FROM date_series ds
    LEFT JOIN crm_people p ON DATE(p.created_at) = ds.date
      AND p.workspace_id = workspace_uuid
    GROUP BY ds.date
  )
  SELECT
    dc.date,
    dc.new_contacts,
    SUM(dc.new_contacts) OVER (ORDER BY dc.date)::INTEGER as cumulative_contacts
  FROM daily_counts dc
  ORDER BY dc.date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get top contacts by engagement
CREATE OR REPLACE FUNCTION get_top_contacts_by_engagement(
  workspace_uuid UUID,
  limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  person_id UUID,
  full_name TEXT,
  email TEXT,
  total_messages INTEGER,
  total_conversations INTEGER,
  engagement_score INTEGER,
  last_contact_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    e.id,
    e.full_name,
    e.email,
    e.total_messages,
    e.total_conversations,
    e.engagement_score,
    e.last_contact_at
  FROM crm_contact_engagement e
  WHERE e.workspace_id = workspace_uuid
  ORDER BY e.engagement_score DESC, e.total_messages DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to search contacts with full-text search
CREATE OR REPLACE FUNCTION search_contacts(
  workspace_uuid UUID,
  search_query TEXT,
  limit_count INTEGER DEFAULT 50
)
RETURNS TABLE (
  person_id UUID,
  full_name TEXT,
  display_name TEXT,
  email TEXT,
  company TEXT,
  tags TEXT[],
  similarity_score REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.full_name,
    p.display_name,
    p.email,
    p.company,
    p.tags,
    GREATEST(
      similarity(COALESCE(p.full_name, ''), search_query),
      similarity(COALESCE(p.email, ''), search_query),
      similarity(COALESCE(p.company, ''), search_query),
      similarity(COALESCE(p.display_name, ''), search_query)
    ) as similarity_score
  FROM crm_people p
  WHERE p.workspace_id = workspace_uuid
    AND (
      p.full_name ILIKE '%' || search_query || '%'
      OR p.email ILIKE '%' || search_query || '%'
      OR p.company ILIKE '%' || search_query || '%'
      OR p.display_name ILIKE '%' || search_query || '%'
      OR search_query = ANY(p.tags)
      OR EXISTS (
        SELECT 1 FROM crm_social_identities si
        WHERE si.person_id = p.id
          AND (
            si.platform_username ILIKE '%' || search_query || '%'
            OR si.platform_display_name ILIKE '%' || search_query || '%'
          )
      )
    )
  ORDER BY similarity_score DESC, p.last_contact_at DESC NULLS LAST
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get contact activity summary
CREATE OR REPLACE FUNCTION get_contact_activity_summary(person_uuid UUID)
RETURNS TABLE (
  total_activities INTEGER,
  total_messages INTEGER,
  total_notes INTEGER,
  total_tags INTEGER,
  platforms_count INTEGER,
  first_activity TIMESTAMPTZ,
  last_activity TIMESTAMPTZ,
  activity_by_type JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::INTEGER as total_activities,
    COUNT(*) FILTER (WHERE activity_type IN ('message_sent', 'message_received'))::INTEGER as total_messages,
    COUNT(*) FILTER (WHERE activity_type = 'note_added')::INTEGER as total_notes,
    COUNT(*) FILTER (WHERE activity_type IN ('tag_added', 'tag_removed'))::INTEGER as total_tags,
    (SELECT COUNT(DISTINCT platform)::INTEGER FROM crm_social_identities WHERE person_id = person_uuid) as platforms_count,
    MIN(created_at) as first_activity,
    MAX(created_at) as last_activity,
    jsonb_object_agg(
      activity_type,
      activity_count
    ) as activity_by_type
  FROM (
    SELECT
      activity_type,
      COUNT(*)::INTEGER as activity_count
    FROM crm_activity_log
    WHERE person_id = person_uuid
    GROUP BY activity_type
  ) activities;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- REFRESH FUNCTIONS FOR MATERIALIZED VIEWS
-- ============================================================================

-- Function to refresh all CRM materialized views
CREATE OR REPLACE FUNCTION refresh_crm_materialized_views()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY crm_active_contacts;
  REFRESH MATERIALIZED VIEW CONCURRENTLY crm_contact_engagement;
  REFRESH MATERIALIZED VIEW CONCURRENTLY crm_contact_platform_summary;
END;
$$ LANGUAGE plpgsql;

-- Schedule automatic refresh (you can set up pg_cron for this)
-- For now, just create the function and manual refresh can be done

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON MATERIALIZED VIEW crm_active_contacts IS 'Contacts with activity in the last 30 days';
COMMENT ON MATERIALIZED VIEW crm_contact_engagement IS 'Contact engagement scores and categorization';
COMMENT ON MATERIALIZED VIEW crm_contact_platform_summary IS 'Summary of platforms connected per contact';

COMMENT ON VIEW crm_vip_contacts IS 'Real-time view of VIP contacts';
COMMENT ON VIEW crm_inactive_contacts IS 'Real-time view of inactive contacts (90+ days)';
COMMENT ON VIEW crm_recent_contacts IS 'Real-time view of recently added contacts (7 days)';

COMMENT ON FUNCTION get_crm_statistics IS 'Get comprehensive CRM statistics for a workspace';
COMMENT ON FUNCTION get_contact_growth IS 'Get contact growth over time for analytics charts';
COMMENT ON FUNCTION get_top_contacts_by_engagement IS 'Get top contacts by engagement score';
COMMENT ON FUNCTION search_contacts IS 'Full-text search across contacts with similarity ranking';
COMMENT ON FUNCTION get_contact_activity_summary IS 'Get activity summary for a specific contact';
COMMENT ON FUNCTION refresh_crm_materialized_views IS 'Refresh all CRM materialized views';
