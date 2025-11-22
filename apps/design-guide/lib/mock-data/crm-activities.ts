import type { CRMActivityLog, TimelineItem } from "../zod-schemas";

const now = Date.now();

export const mockCRMActivities: CRMActivityLog[] = [
  // Activities for person-1 (Sarah Chen)
  {
    id: "activity-1-1",
    workspace_id: "workspace-1",
    person_id: "person-1",
    activity_type: "person_created",
    activity_description: "Contact created",
    activity_data: {
      email: "sarah.chen@example.com",
      full_name: "Sarah Chen",
    },
    performed_by: "user-1",
    performed_by_name: "You (Current User)",
    related_conversation_id: null,
    related_note_id: null,
    related_message_id: null,
    is_visible_in_timeline: true,
    created_at: new Date("2024-11-01T14:30:00Z").toISOString(),
  },
  {
    id: "activity-1-2",
    workspace_id: "workspace-1",
    person_id: "person-1",
    activity_type: "social_identity_added",
    activity_description: "Connected Twitter account",
    activity_data: {
      platform: "twitter",
      username: "@sarahchen",
      platform_user_id: "twitter_1234567890",
    },
    performed_by: "user-1",
    performed_by_name: "You (Current User)",
    related_conversation_id: null,
    related_note_id: null,
    related_message_id: null,
    is_visible_in_timeline: true,
    created_at: new Date("2024-11-01T14:35:00Z").toISOString(),
  },
  {
    id: "activity-1-3",
    workspace_id: "workspace-1",
    person_id: "person-1",
    activity_type: "tag_added",
    activity_description: "Tags added: VIP, Customer",
    activity_data: {
      tags: ["VIP", "Customer"],
    },
    performed_by: "user-1",
    performed_by_name: "You (Current User)",
    related_conversation_id: null,
    related_note_id: null,
    related_message_id: null,
    is_visible_in_timeline: true,
    created_at: new Date("2024-11-01T15:00:00Z").toISOString(),
  },
  {
    id: "activity-1-4",
    workspace_id: "workspace-1",
    person_id: "person-1",
    activity_type: "conversation_started",
    activity_description: "New conversation via Twitter DM",
    activity_data: {
      platform: "twitter",
      subject: "Product inquiry",
    },
    performed_by: null,
    performed_by_name: "Sarah Chen",
    related_conversation_id: "conv-1",
    related_note_id: null,
    related_message_id: null,
    is_visible_in_timeline: true,
    created_at: new Date("2024-11-02T10:20:00Z").toISOString(),
  },
  {
    id: "activity-1-5",
    workspace_id: "workspace-1",
    person_id: "person-1",
    activity_type: "note_added",
    activity_description: "Note added",
    activity_data: {
      note_type: "internal",
      visibility: "team",
      content_preview: "Sarah is a VIP client. She's mentioned interest in our enterprise features before...",
    },
    performed_by: "user-1",
    performed_by_name: "You (Current User)",
    related_conversation_id: null,
    related_note_id: "note-1-1",
    related_message_id: null,
    is_visible_in_timeline: true,
    created_at: new Date("2024-11-05T09:15:00Z").toISOString(),
  },
  {
    id: "activity-1-6",
    workspace_id: "workspace-1",
    person_id: "person-1",
    activity_type: "vip_status_changed",
    activity_description: "Marked as VIP",
    activity_data: {
      is_vip: true,
    },
    performed_by: "user-1",
    performed_by_name: "You (Current User)",
    related_conversation_id: null,
    related_note_id: null,
    related_message_id: null,
    is_visible_in_timeline: true,
    created_at: new Date("2024-11-05T09:20:00Z").toISOString(),
  },
  {
    id: "activity-1-7",
    workspace_id: "workspace-1",
    person_id: "person-1",
    activity_type: "profile_updated",
    activity_description: "Profile updated",
    activity_data: {
      company: {
        old: null,
        new: "TechVentures Inc",
      },
      job_title: {
        old: null,
        new: "CEO",
      },
    },
    performed_by: "user-2",
    performed_by_name: "Sarah Johnson",
    related_conversation_id: null,
    related_note_id: null,
    related_message_id: null,
    is_visible_in_timeline: true,
    created_at: new Date("2024-11-10T14:30:00Z").toISOString(),
  },
  {
    id: "activity-1-8",
    workspace_id: "workspace-1",
    person_id: "person-1",
    activity_type: "social_identity_added",
    activity_description: "Connected LinkedIn account",
    activity_data: {
      platform: "linkedin",
      username: "Sarah Chen",
      platform_user_id: "linkedin_abc123",
    },
    performed_by: "user-1",
    performed_by_name: "You (Current User)",
    related_conversation_id: null,
    related_note_id: null,
    related_message_id: null,
    is_visible_in_timeline: true,
    created_at: new Date("2024-11-15T11:00:00Z").toISOString(),
  },
  {
    id: "activity-1-9",
    workspace_id: "workspace-1",
    person_id: "person-1",
    activity_type: "message_received",
    activity_description: "Received message via Twitter DM",
    activity_data: {
      platform: "twitter",
      content_preview: "Thanks for the quick response! I'm very interested...",
    },
    performed_by: null,
    performed_by_name: "Sarah Chen",
    related_conversation_id: "conv-1",
    related_note_id: null,
    related_message_id: "msg-1-1",
    is_visible_in_timeline: true,
    created_at: new Date(now - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: "activity-1-10",
    workspace_id: "workspace-1",
    person_id: "person-1",
    activity_type: "message_sent",
    activity_description: "Sent message via Twitter DM",
    activity_data: {
      platform: "twitter",
      content_preview: "Great to hear! Let me send you some information...",
    },
    performed_by: "user-1",
    performed_by_name: "You (Current User)",
    related_conversation_id: "conv-1",
    related_note_id: null,
    related_message_id: "msg-1-2",
    is_visible_in_timeline: true,
    created_at: new Date(now - 3600000).toISOString(), // 1 hour ago
  },

  // Activities for person-2 (John Doe)
  {
    id: "activity-2-1",
    workspace_id: "workspace-1",
    person_id: "person-2",
    activity_type: "person_created",
    activity_description: "Contact created",
    activity_data: {
      email: "john.doe@example.com",
      full_name: "John Doe",
    },
    performed_by: "user-2",
    performed_by_name: "Sarah Johnson",
    related_conversation_id: null,
    related_note_id: null,
    related_message_id: null,
    is_visible_in_timeline: true,
    created_at: new Date("2024-11-15T09:00:00Z").toISOString(),
  },
  {
    id: "activity-2-2",
    workspace_id: "workspace-1",
    person_id: "person-2",
    activity_type: "tag_added",
    activity_description: "Tags added: Customer",
    activity_data: {
      tags: ["Customer"],
    },
    performed_by: "user-2",
    performed_by_name: "Sarah Johnson",
    related_conversation_id: null,
    related_note_id: null,
    related_message_id: null,
    is_visible_in_timeline: true,
    created_at: new Date("2024-11-15T09:05:00Z").toISOString(),
  },

  // Activities for person-3 (Emily Rodriguez)
  {
    id: "activity-3-1",
    workspace_id: "workspace-1",
    person_id: "person-3",
    activity_type: "person_created",
    activity_description: "Contact created",
    activity_data: {
      email: "emily.rodriguez@example.com",
      full_name: "Emily Rodriguez",
    },
    performed_by: "user-1",
    performed_by_name: "You (Current User)",
    related_conversation_id: null,
    related_note_id: null,
    related_message_id: null,
    is_visible_in_timeline: true,
    created_at: new Date("2024-10-20T16:00:00Z").toISOString(),
  },
  {
    id: "activity-3-2",
    workspace_id: "workspace-1",
    person_id: "person-3",
    activity_type: "verified_status_changed",
    activity_description: "Contact verified",
    activity_data: {
      is_verified: true,
    },
    performed_by: "user-1",
    performed_by_name: "You (Current User)",
    related_conversation_id: null,
    related_note_id: null,
    related_message_id: null,
    is_visible_in_timeline: true,
    created_at: new Date("2024-10-21T10:00:00Z").toISOString(),
  },
  {
    id: "activity-3-3",
    workspace_id: "workspace-1",
    person_id: "person-3",
    activity_type: "tag_added",
    activity_description: "Tags added: Influencer, Verified",
    activity_data: {
      tags: ["Influencer", "Verified"],
    },
    performed_by: "user-1",
    performed_by_name: "You (Current User)",
    related_conversation_id: null,
    related_note_id: null,
    related_message_id: null,
    is_visible_in_timeline: true,
    created_at: new Date("2024-10-21T10:05:00Z").toISOString(),
  },
];

// Helper function to get activities by person
export function getActivitiesByPerson(personId: string): CRMActivityLog[] {
  return mockCRMActivities
    .filter((a) => a.person_id === personId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

// Helper function to convert activity to timeline item
export function activityToTimelineItem(activity: CRMActivityLog): TimelineItem {
  const iconMap: Record<string, { icon: string; color: string }> = {
    person_created: { icon: "✨", color: "text-green-500" },
    person_updated: { icon: "✏️", color: "text-blue-500" },
    profile_updated: { icon: "👤", color: "text-blue-500" },
    tag_added: { icon: "🏷️", color: "text-purple-500" },
    tag_removed: { icon: "🏷️", color: "text-gray-500" },
    note_added: { icon: "📝", color: "text-amber-500" },
    note_updated: { icon: "📝", color: "text-amber-500" },
    social_identity_added: { icon: "🔗", color: "text-blue-500" },
    social_identity_removed: { icon: "🔗", color: "text-gray-500" },
    vip_status_changed: { icon: "⭐", color: "text-amber-500" },
    blocked_status_changed: { icon: "🚫", color: "text-red-500" },
    verified_status_changed: { icon: "✅", color: "text-green-500" },
    conversation_started: { icon: "💬", color: "text-blue-500" },
    conversation_resolved: { icon: "✅", color: "text-green-500" },
    message_sent: { icon: "📤", color: "text-blue-500" },
    message_received: { icon: "📥", color: "text-green-500" },
    assigned_to_user: { icon: "👥", color: "text-purple-500" },
    custom_field_updated: { icon: "⚙️", color: "text-gray-500" },
    merged_with_person: { icon: "🔀", color: "text-purple-500" },
  };

  const { icon, color } = iconMap[activity.activity_type] || { icon: "•", color: "text-gray-500" };

  return {
    id: activity.id,
    type: activity.activity_type,
    title: activity.activity_description || activity.activity_type,
    description: null,
    icon,
    iconColor: color,
    data: activity.activity_data,
    performedBy: activity.performed_by
      ? {
          id: activity.performed_by,
          name: activity.performed_by_name || "Unknown",
          avatar: null,
        }
      : null,
    timestamp: activity.created_at,
    relatedEntities: {
      conversationId: activity.related_conversation_id,
      noteId: activity.related_note_id,
      messageId: activity.related_message_id,
    },
  };
}

// Helper function to get timeline items for a person
export function getTimelineForPerson(personId: string): TimelineItem[] {
  return getActivitiesByPerson(personId).map(activityToTimelineItem);
}
