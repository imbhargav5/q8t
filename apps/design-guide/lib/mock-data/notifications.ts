import type { Notification, NotificationPreferences } from "../zod-schemas/notification.schema";

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    user_id: "user-1",
    type: "mention",
    title: "New mention on Twitter",
    body: "@johndoe mentioned you in a tweet about product launch",
    action_url: "/social-inbox?conversation=conv-123",
    actor_id: "person-5",
    actor_name: "John Doe",
    actor_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe",
    platform: "twitter",
    metadata: {
      tweet_id: "1234567890",
      tweet_text: "@yourcompany just launched an amazing product! Can't wait to try it.",
    },
    read_at: null,
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
  },
  {
    id: "notif-2",
    user_id: "user-1",
    type: "message",
    title: "New direct message on LinkedIn",
    body: "Sarah Chen sent you a message",
    action_url: "/social-inbox?conversation=conv-456",
    actor_id: "person-1",
    actor_name: "Sarah Chen",
    actor_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
    platform: "linkedin",
    metadata: {
      message_preview: "Hi! I loved your recent post about...",
    },
    read_at: null,
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
  },
  {
    id: "notif-3",
    user_id: "user-1",
    type: "comment",
    title: "New comment on your Instagram post",
    body: "Alex Martinez commented: 'This is amazing! 🔥'",
    action_url: "/analytics?post=post-123",
    actor_id: "person-3",
    actor_name: "Alex Martinez",
    actor_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexMartinez",
    platform: "instagram",
    metadata: {
      post_id: "post-123",
      comment_text: "This is amazing! 🔥",
    },
    read_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
  },
  {
    id: "notif-4",
    user_id: "user-1",
    type: "post_published",
    title: "Post published successfully",
    body: "Your scheduled post 'Product Launch Announcement' is now live on Twitter and LinkedIn",
    action_url: "/content-calendar?post=post-456",
    actor_id: null,
    actor_name: null,
    actor_avatar: null,
    platform: null,
    metadata: {
      post_id: "post-456",
      platforms: ["twitter", "linkedin"],
    },
    read_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    id: "notif-5",
    user_id: "user-1",
    type: "alert",
    title: "High engagement detected",
    body: "Your post 'Summer Sale' has received 1,200 likes and 350 comments in the last hour",
    action_url: "/analytics?post=post-789",
    actor_id: null,
    actor_name: null,
    actor_avatar: null,
    platform: "instagram",
    metadata: {
      post_id: "post-789",
      likes: 1200,
      comments: 350,
      shares: 89,
    },
    read_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: "notif-6",
    user_id: "user-1",
    type: "system",
    title: "Workspace storage almost full",
    body: "Your workspace has used 4.2GB of 5GB storage. Consider upgrading your plan.",
    action_url: "/settings?tab=plan",
    actor_id: null,
    actor_name: null,
    actor_avatar: null,
    platform: null,
    metadata: {
      storage_used: 4200000000,
      storage_total: 5000000000,
      usage_percentage: 84,
    },
    read_at: null,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
  },
  {
    id: "notif-7",
    user_id: "user-1",
    type: "post_failed",
    title: "Failed to publish post",
    body: "Could not publish your post to Facebook. Invalid access token.",
    action_url: "/content-calendar?post=post-999",
    actor_id: null,
    actor_name: null,
    actor_avatar: null,
    platform: "facebook",
    metadata: {
      post_id: "post-999",
      error_code: "AUTH_ERROR",
      error_message: "Invalid access token",
    },
    read_at: null,
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
  },
  {
    id: "notif-8",
    user_id: "user-1",
    type: "team_invitation",
    title: "New team member joined",
    body: "Lisa Chen has accepted your invitation and joined the workspace",
    action_url: "/settings?tab=team",
    actor_id: "user-5",
    actor_name: "Lisa Chen",
    actor_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LisaChen",
    platform: null,
    metadata: {
      role: "member",
    },
    read_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
  },
  {
    id: "notif-9",
    user_id: "user-1",
    type: "like",
    title: "Your post is trending",
    body: "Your post received 500 new likes in the past hour",
    action_url: "/analytics?post=post-111",
    actor_id: null,
    actor_name: null,
    actor_avatar: null,
    platform: "twitter",
    metadata: {
      post_id: "post-111",
      new_likes: 500,
      total_likes: 2340,
    },
    read_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
  },
  {
    id: "notif-10",
    user_id: "user-1",
    type: "security",
    title: "New login from unknown device",
    body: "A login was detected from a new device in New York, NY",
    action_url: "/user/settings/security",
    actor_id: null,
    actor_name: null,
    actor_avatar: null,
    platform: null,
    metadata: {
      device: "iPhone 15 Pro",
      location: "New York, NY",
      ip_address: "192.168.1.105",
    },
    read_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
];

export const mockNotificationPreferences: NotificationPreferences = {
  user_id: "user-1",
  email_enabled: true,
  push_enabled: true,
  in_app_enabled: true,
  mention_notifications: true,
  message_notifications: true,
  engagement_notifications: true,
  system_notifications: true,
  crisis_notifications: true,
  updated_at: new Date("2024-11-01").toISOString(),
};

export function getUnreadNotifications(): Notification[] {
  return mockNotifications.filter((n) => n.read_at === null);
}

export function getNotificationsByType(type: Notification["type"]): Notification[] {
  return mockNotifications.filter((n) => n.type === type);
}

export function getNotificationsByPlatform(platform: string): Notification[] {
  return mockNotifications.filter((n) => n.platform === platform);
}

export function markNotificationAsRead(notificationId: string): void {
  const notification = mockNotifications.find((n) => n.id === notificationId);
  if (notification) {
    notification.read_at = new Date().toISOString();
  }
}

export function markAllAsRead(): void {
  mockNotifications.forEach((n) => {
    if (!n.read_at) {
      n.read_at = new Date().toISOString();
    }
  });
}
