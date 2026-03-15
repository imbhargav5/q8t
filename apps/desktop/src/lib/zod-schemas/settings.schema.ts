import { z } from "zod";

// ===== GENERAL SETTINGS =====

export const ThemeEnum = z.enum(["light", "dark", "system"]);
export type Theme = z.infer<typeof ThemeEnum>;

export const TimezoneEnum = z.enum([
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Australia/Sydney",
]);
export type Timezone = z.infer<typeof TimezoneEnum>;

export const LanguageEnum = z.enum(["en", "es", "fr", "de", "ja", "zh"]);
export type Language = z.infer<typeof LanguageEnum>;

export const NotificationChannelEnum = z.enum(["email", "push", "in_app", "sms"]);
export type NotificationChannel = z.infer<typeof NotificationChannelEnum>;

export const GeneralSettingsSchema = z.object({
  user_id: z.string().uuid(),
  theme: ThemeEnum.default("system"),
  language: LanguageEnum.default("en"),
  timezone: TimezoneEnum.default("UTC"),
  date_format: z.enum(["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]).default("MM/DD/YYYY"),
  time_format: z.enum(["12h", "24h"]).default("12h"),
  default_workspace_id: z.string().uuid().nullable(),
  updated_at: z.string().datetime(),
});

export type GeneralSettings = z.infer<typeof GeneralSettingsSchema>;

export const NotificationPreferencesSchema = z.object({
  user_id: z.string().uuid(),
  // Channel preferences
  email_enabled: z.boolean().default(true),
  push_enabled: z.boolean().default(true),
  in_app_enabled: z.boolean().default(true),
  sms_enabled: z.boolean().default(false),

  // Event preferences
  new_message: z.boolean().default(true),
  new_mention: z.boolean().default(true),
  new_comment: z.boolean().default(true),
  post_published: z.boolean().default(true),
  post_scheduled: z.boolean().default(false),
  team_invitation: z.boolean().default(true),
  workspace_updates: z.boolean().default(true),
  security_alerts: z.boolean().default(true),
  marketing_emails: z.boolean().default(false),

  // Digest preferences
  daily_digest: z.boolean().default(false),
  weekly_digest: z.boolean().default(true),

  updated_at: z.string().datetime(),
});

export type NotificationPreferences = z.infer<typeof NotificationPreferencesSchema>;

// ===== PRIVACY SETTINGS =====

export const DataSharingLevelEnum = z.enum(["none", "team", "workspace", "everyone"]);
export type DataSharingLevel = z.infer<typeof DataSharingLevelEnum>;

export const PrivacySettingsSchema = z.object({
  user_id: z.string().uuid(),

  // Profile visibility
  profile_visible_to: DataSharingLevelEnum.default("workspace"),
  email_visible_to: DataSharingLevelEnum.default("team"),
  activity_visible_to: DataSharingLevelEnum.default("workspace"),

  // Data sharing
  allow_analytics: z.boolean().default(true),
  allow_personalization: z.boolean().default(true),
  share_crash_reports: z.boolean().default(true),

  // Third-party integrations
  allow_third_party_integrations: z.boolean().default(true),

  // Communication
  allow_direct_messages: z.boolean().default(true),
  show_online_status: z.boolean().default(true),
  show_typing_indicator: z.boolean().default(true),

  updated_at: z.string().datetime(),
});

export type PrivacySettings = z.infer<typeof PrivacySettingsSchema>;

export const ConnectedAppSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  app_name: z.string(),
  app_icon: z.string().url().nullable(),
  permissions: z.array(z.string()),
  connected_at: z.string().datetime(),
  last_used_at: z.string().datetime().nullable(),
});

export type ConnectedApp = z.infer<typeof ConnectedAppSchema>;

// ===== SECURITY SETTINGS =====

export const TwoFactorMethodEnum = z.enum(["authenticator", "sms", "email"]);
export type TwoFactorMethod = z.infer<typeof TwoFactorMethodEnum>;

export const TwoFactorAuthSchema = z.object({
  user_id: z.string().uuid(),
  enabled: z.boolean().default(false),
  method: TwoFactorMethodEnum.nullable(),
  backup_codes_count: z.number().int().default(0),
  verified_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime(),
});

export type TwoFactorAuth = z.infer<typeof TwoFactorAuthSchema>;

export const LoginSessionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  device_name: z.string(),
  device_type: z.enum(["desktop", "mobile", "tablet"]),
  browser: z.string(),
  os: z.string(),
  ip_address: z.string(),
  location: z.string().nullable(),
  is_current: z.boolean().default(false),
  created_at: z.string().datetime(),
  last_active_at: z.string().datetime(),
});

export type LoginSession = z.infer<typeof LoginSessionSchema>;

export const LoginHistorySchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  event_type: z.enum(["login", "logout", "failed_login"]),
  device_name: z.string(),
  browser: z.string(),
  ip_address: z.string(),
  location: z.string().nullable(),
  success: z.boolean(),
  timestamp: z.string().datetime(),
});

export type LoginHistory = z.infer<typeof LoginHistorySchema>;

export const APIKeySchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  name: z.string(),
  key_prefix: z.string(), // First few characters for identification
  permissions: z.array(z.string()),
  last_used_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
  expires_at: z.string().datetime().nullable(),
});

export type APIKey = z.infer<typeof APIKeySchema>;

export const SecurityAuditLogSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  action: z.string(),
  details: z.string(),
  ip_address: z.string(),
  timestamp: z.string().datetime(),
});

export type SecurityAuditLog = z.infer<typeof SecurityAuditLogSchema>;

// ===== COMBINED SETTINGS =====

export const UserSettingsSchema = z.object({
  general: GeneralSettingsSchema,
  notifications: NotificationPreferencesSchema,
  privacy: PrivacySettingsSchema,
  two_factor: TwoFactorAuthSchema,
});

export type UserSettings = z.infer<typeof UserSettingsSchema>;
