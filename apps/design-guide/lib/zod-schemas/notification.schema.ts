import { z } from "zod";

export const NotificationSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  type: z.enum([
    "mention",
    "message",
    "comment",
    "like",
    "share",
    "post_published",
    "post_scheduled",
    "post_failed",
    "campaign_started",
    "campaign_completed",
    "alert",
    "system",
    "team_invitation",
    "security",
  ]),
  title: z.string(),
  body: z.string(),
  action_url: z.string().nullable(),
  actor_id: z.string().nullable(),
  actor_name: z.string().nullable(),
  actor_avatar: z.string().nullable(),
  platform: z.string().nullable(),
  metadata: z.record(z.string(), z.any()).default({}),
  read_at: z.string().nullable(),
  created_at: z.string(),
});

export const NotificationPreferencesSchema = z.object({
  user_id: z.string(),
  email_enabled: z.boolean(),
  push_enabled: z.boolean(),
  in_app_enabled: z.boolean(),
  mention_notifications: z.boolean(),
  message_notifications: z.boolean(),
  engagement_notifications: z.boolean(),
  system_notifications: z.boolean(),
  crisis_notifications: z.boolean(),
  updated_at: z.string(),
});

export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationPreferences = z.infer<typeof NotificationPreferencesSchema>;
