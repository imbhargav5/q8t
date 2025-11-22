import type {
  GeneralSettings,
  NotificationPreferences,
  PrivacySettings,
  TwoFactorAuth,
  LoginSession,
  LoginHistory,
  APIKey,
  SecurityAuditLog,
  ConnectedApp,
  UserSettings,
} from "../zod-schemas";

// Current user ID (matching mockUsers[0])
const CURRENT_USER_ID = "user-1";

// ===== GENERAL SETTINGS =====

export const mockGeneralSettings: GeneralSettings = {
  user_id: CURRENT_USER_ID,
  theme: "system",
  language: "en",
  timezone: "America/New_York",
  date_format: "MM/DD/YYYY",
  time_format: "12h",
  default_workspace_id: "workspace-1",
  updated_at: new Date("2024-11-15").toISOString(),
};

export const mockNotificationPreferences: NotificationPreferences = {
  user_id: CURRENT_USER_ID,
  // Channels
  email_enabled: true,
  push_enabled: true,
  in_app_enabled: true,
  sms_enabled: false,
  // Events
  new_message: true,
  new_mention: true,
  new_comment: true,
  post_published: true,
  post_scheduled: false,
  team_invitation: true,
  workspace_updates: true,
  security_alerts: true,
  marketing_emails: false,
  // Digests
  daily_digest: false,
  weekly_digest: true,
  updated_at: new Date("2024-11-10").toISOString(),
};

// ===== PRIVACY SETTINGS =====

export const mockPrivacySettings: PrivacySettings = {
  user_id: CURRENT_USER_ID,
  // Visibility
  profile_visible_to: "workspace",
  email_visible_to: "team",
  activity_visible_to: "workspace",
  // Data sharing
  allow_analytics: true,
  allow_personalization: true,
  share_crash_reports: true,
  // Third-party
  allow_third_party_integrations: true,
  // Communication
  allow_direct_messages: true,
  show_online_status: true,
  show_typing_indicator: true,
  updated_at: new Date("2024-11-12").toISOString(),
};

export const mockConnectedApps: ConnectedApp[] = [
  {
    id: "app-1",
    user_id: CURRENT_USER_ID,
    app_name: "Zapier",
    app_icon: "https://api.dicebear.com/7.x/shapes/svg?seed=zapier",
    permissions: ["Read posts", "Create posts", "Access analytics"],
    connected_at: new Date("2024-10-01").toISOString(),
    last_used_at: new Date("2024-11-20").toISOString(),
  },
  {
    id: "app-2",
    user_id: CURRENT_USER_ID,
    app_name: "Canva",
    app_icon: "https://api.dicebear.com/7.x/shapes/svg?seed=canva",
    permissions: ["Read media library", "Upload images"],
    connected_at: new Date("2024-09-15").toISOString(),
    last_used_at: new Date("2024-11-18").toISOString(),
  },
  {
    id: "app-3",
    user_id: CURRENT_USER_ID,
    app_name: "Google Analytics",
    app_icon: "https://api.dicebear.com/7.x/shapes/svg?seed=analytics",
    permissions: ["Read analytics data"],
    connected_at: new Date("2024-08-20").toISOString(),
    last_used_at: new Date("2024-11-21").toISOString(),
  },
];

// ===== SECURITY SETTINGS =====

export const mockTwoFactorAuth: TwoFactorAuth = {
  user_id: CURRENT_USER_ID,
  enabled: true,
  method: "authenticator",
  backup_codes_count: 8,
  verified_at: new Date("2024-09-01").toISOString(),
  updated_at: new Date("2024-09-01").toISOString(),
};

export const mockLoginSessions: LoginSession[] = [
  {
    id: "session-1",
    user_id: CURRENT_USER_ID,
    device_name: "MacBook Pro",
    device_type: "desktop",
    browser: "Chrome 120",
    os: "macOS 14.1",
    ip_address: "192.168.1.100",
    location: "New York, NY, USA",
    is_current: true,
    created_at: new Date("2024-11-21T08:00:00").toISOString(),
    last_active_at: new Date().toISOString(),
  },
  {
    id: "session-2",
    user_id: CURRENT_USER_ID,
    device_name: "iPhone 15 Pro",
    device_type: "mobile",
    browser: "Safari 17",
    os: "iOS 17.1",
    ip_address: "192.168.1.101",
    location: "New York, NY, USA",
    is_current: false,
    created_at: new Date("2024-11-20T14:30:00").toISOString(),
    last_active_at: new Date("2024-11-21T19:45:00").toISOString(),
  },
  {
    id: "session-3",
    user_id: CURRENT_USER_ID,
    device_name: "iPad Air",
    device_type: "tablet",
    browser: "Safari 17",
    os: "iPadOS 17.1",
    ip_address: "192.168.1.102",
    location: "New York, NY, USA",
    is_current: false,
    created_at: new Date("2024-11-19T10:00:00").toISOString(),
    last_active_at: new Date("2024-11-20T22:15:00").toISOString(),
  },
];

export const mockLoginHistory: LoginHistory[] = [
  {
    id: "history-1",
    user_id: CURRENT_USER_ID,
    event_type: "login",
    device_name: "MacBook Pro",
    browser: "Chrome 120",
    ip_address: "192.168.1.100",
    location: "New York, NY, USA",
    success: true,
    timestamp: new Date("2024-11-21T08:00:00").toISOString(),
  },
  {
    id: "history-2",
    user_id: CURRENT_USER_ID,
    event_type: "login",
    device_name: "iPhone 15 Pro",
    browser: "Safari 17",
    ip_address: "192.168.1.101",
    location: "New York, NY, USA",
    success: true,
    timestamp: new Date("2024-11-20T14:30:00").toISOString(),
  },
  {
    id: "history-3",
    user_id: CURRENT_USER_ID,
    event_type: "failed_login",
    device_name: "Unknown Device",
    browser: "Chrome 119",
    ip_address: "185.220.101.45",
    location: "Unknown",
    success: false,
    timestamp: new Date("2024-11-19T03:22:00").toISOString(),
  },
  {
    id: "history-4",
    user_id: CURRENT_USER_ID,
    event_type: "login",
    device_name: "iPad Air",
    browser: "Safari 17",
    ip_address: "192.168.1.102",
    location: "New York, NY, USA",
    success: true,
    timestamp: new Date("2024-11-19T10:00:00").toISOString(),
  },
  {
    id: "history-5",
    user_id: CURRENT_USER_ID,
    event_type: "logout",
    device_name: "MacBook Pro",
    browser: "Chrome 120",
    ip_address: "192.168.1.100",
    location: "New York, NY, USA",
    success: true,
    timestamp: new Date("2024-11-18T18:30:00").toISOString(),
  },
];

export const mockAPIKeys: APIKey[] = [
  {
    id: "key-1",
    user_id: CURRENT_USER_ID,
    name: "Production API Key",
    key_prefix: "pk_live_abc123",
    permissions: ["read:posts", "write:posts", "read:analytics"],
    last_used_at: new Date("2024-11-21").toISOString(),
    created_at: new Date("2024-06-01").toISOString(),
    expires_at: new Date("2025-06-01").toISOString(),
  },
  {
    id: "key-2",
    user_id: CURRENT_USER_ID,
    name: "Development API Key",
    key_prefix: "pk_test_xyz789",
    permissions: ["read:posts"],
    last_used_at: new Date("2024-11-15").toISOString(),
    created_at: new Date("2024-10-01").toISOString(),
    expires_at: null,
  },
  {
    id: "key-3",
    user_id: CURRENT_USER_ID,
    name: "Analytics Integration",
    key_prefix: "pk_live_def456",
    permissions: ["read:analytics", "read:insights"],
    last_used_at: null,
    created_at: new Date("2024-11-01").toISOString(),
    expires_at: new Date("2025-11-01").toISOString(),
  },
];

export const mockSecurityAuditLog: SecurityAuditLog[] = [
  {
    id: "audit-1",
    user_id: CURRENT_USER_ID,
    action: "Password Changed",
    details: "Password was successfully updated",
    ip_address: "192.168.1.100",
    timestamp: new Date("2024-11-15T10:30:00").toISOString(),
  },
  {
    id: "audit-2",
    user_id: CURRENT_USER_ID,
    action: "2FA Enabled",
    details: "Two-factor authentication enabled using authenticator app",
    ip_address: "192.168.1.100",
    timestamp: new Date("2024-09-01T14:20:00").toISOString(),
  },
  {
    id: "audit-3",
    user_id: CURRENT_USER_ID,
    action: "API Key Created",
    details: "New API key 'Production API Key' created",
    ip_address: "192.168.1.100",
    timestamp: new Date("2024-06-01T09:15:00").toISOString(),
  },
  {
    id: "audit-4",
    user_id: CURRENT_USER_ID,
    action: "Session Revoked",
    details: "Active session from 'Old MacBook' was revoked",
    ip_address: "192.168.1.100",
    timestamp: new Date("2024-05-20T16:45:00").toISOString(),
  },
  {
    id: "audit-5",
    user_id: CURRENT_USER_ID,
    action: "Privacy Settings Updated",
    details: "Changed profile visibility to workspace only",
    ip_address: "192.168.1.100",
    timestamp: new Date("2024-04-10T11:00:00").toISOString(),
  },
];

// ===== COMBINED SETTINGS =====

export const mockUserSettings: UserSettings = {
  general: mockGeneralSettings,
  notifications: mockNotificationPreferences,
  privacy: mockPrivacySettings,
  two_factor: mockTwoFactorAuth,
};
