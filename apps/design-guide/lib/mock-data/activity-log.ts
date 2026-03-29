import type { ActivityLog } from "../zod-schemas/activity-log.schema";

export const mockActivityLog: ActivityLog[] = [
  {
    id: "activity-1",
    workspace_id: "workspace-1",
    user_id: "user-1",
    actor_id: "user-1",
    actor_name: "You",
    actor_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    action: "post_published",
    entity_type: "post",
    entity_id: "post-123",
    entity_name: "Summer Sale Announcement",
    details: "Published post to Twitter and LinkedIn",
    ip_address: "192.168.1.100",
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    metadata: {
      platforms: ["twitter", "linkedin"],
      scheduled: false,
    },
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
  },
  {
    id: "activity-2",
    workspace_id: "workspace-1",
    user_id: "user-1",
    actor_id: "user-2",
    actor_name: "Sarah Chen",
    actor_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
    action: "member_invited",
    entity_type: "user",
    entity_id: "user-5",
    entity_name: "Lisa Chen",
    details: "Invited Lisa Chen to join the workspace as a member",
    ip_address: "192.168.1.101",
    user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    metadata: {
      role: "member",
      email: "lisa.chen@example.com",
    },
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    id: "activity-3",
    workspace_id: "workspace-1",
    user_id: "user-1",
    actor_id: null,
    actor_name: "System",
    actor_avatar: null,
    action: "automation_executed",
    entity_type: "automation",
    entity_id: "auto-456",
    entity_name: "RSS Feed Auto-Post",
    details: "Automatically posted new blog article to social media",
    ip_address: null,
    user_agent: null,
    metadata: {
      source: "blog.example.com",
      post_count: 1,
    },
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: "activity-4",
    workspace_id: "workspace-1",
    user_id: "user-1",
    actor_id: "user-1",
    actor_name: "You",
    actor_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    action: "settings_updated",
    entity_type: "workspace",
    entity_id: "workspace-1",
    entity_name: "Chatsian",
    details: "Changed workspace timezone to America/New_York",
    ip_address: "192.168.1.100",
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    metadata: {
      field: "timezone",
      old_value: "America/Los_Angeles",
      new_value: "America/New_York",
    },
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
  },
  {
    id: "activity-5",
    workspace_id: "workspace-1",
    user_id: "user-1",
    actor_id: "user-3",
    actor_name: "Alex Martinez",
    actor_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexMartinez",
    action: "social_account_connected",
    entity_type: "social_account",
    entity_id: "account-789",
    entity_name: "@company_instagram",
    details: "Connected Instagram account @company_instagram",
    ip_address: "192.168.1.102",
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    metadata: {
      platform: "instagram",
      username: "@company_instagram",
      followers: 25400,
    },
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
  },
  {
    id: "activity-6",
    workspace_id: "workspace-1",
    user_id: "user-1",
    actor_id: "user-1",
    actor_name: "You",
    actor_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    action: "media_uploaded",
    entity_type: "media",
    entity_id: "media-555",
    entity_name: "product-launch-video.mp4",
    details: "Uploaded video file to content library",
    ip_address: "192.168.1.100",
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    metadata: {
      file_size: 15728640,
      file_type: "video/mp4",
      folder: "Brand Assets",
    },
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
  },
  {
    id: "activity-7",
    workspace_id: "workspace-1",
    user_id: "user-1",
    actor_id: "user-2",
    actor_name: "Sarah Chen",
    actor_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
    action: "post_scheduled",
    entity_type: "post",
    entity_id: "post-666",
    entity_name: "Holiday Promotion",
    details: "Scheduled post for December 25, 2024 at 10:00 AM",
    ip_address: "192.168.1.101",
    user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    metadata: {
      scheduled_for: "2024-12-25T10:00:00Z",
      platforms: ["facebook", "instagram", "twitter"],
    },
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
  },
  {
    id: "activity-8",
    workspace_id: "workspace-1",
    user_id: "user-1",
    actor_id: "user-1",
    actor_name: "You",
    actor_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    action: "crm_contact_created",
    entity_type: "person",
    entity_id: "person-888",
    entity_name: "Michael Brown",
    details: "Added new contact to CRM",
    ip_address: "192.168.1.100",
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    metadata: {
      email: "michael.brown@example.com",
      company: "Tech Innovations Inc",
      source: "linkedin",
    },
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
  },
  {
    id: "activity-9",
    workspace_id: "workspace-1",
    user_id: "user-1",
    actor_id: null,
    actor_name: "System",
    actor_avatar: null,
    action: "api_key_used",
    entity_type: "api_key",
    entity_id: "key-999",
    entity_name: "Production API Key",
    details: "API request to create post via REST API",
    ip_address: "203.0.113.42",
    user_agent: "Python/3.11 requests/2.31.0",
    metadata: {
      endpoint: "/api/v1/posts",
      method: "POST",
      response_code: 201,
    },
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: "activity-10",
    workspace_id: "workspace-1",
    user_id: "user-1",
    actor_id: "user-1",
    actor_name: "You",
    actor_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    action: "password_changed",
    entity_type: "security",
    entity_id: null,
    entity_name: null,
    details: "Changed account password",
    ip_address: "192.168.1.100",
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    metadata: {
      two_factor_verified: true,
    },
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
];

export function getActivityLogByUser(userId: string): ActivityLog[] {
  return mockActivityLog.filter((log) => log.actor_id === userId);
}

export function getActivityLogByType(entityType: string): ActivityLog[] {
  return mockActivityLog.filter((log) => log.entity_type === entityType);
}

export function getActivityLogByAction(action: string): ActivityLog[] {
  return mockActivityLog.filter((log) => log.action === action);
}

export function getRecentActivity(limit: number = 10): ActivityLog[] {
  return mockActivityLog.slice(0, limit);
}
