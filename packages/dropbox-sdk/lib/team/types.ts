// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Dropbox Team API

export interface TeamMemberInfo {
  profile?: {
    team_member_id?: string;
    email?: string;
    email_verified?: boolean;
    status?: { ".tag"?: "active" | "invited" | "suspended" | "removed" };
    name?: { given_name?: string; surname?: string; familiar_name?: string; display_name?: string };
    membership_type?: { ".tag"?: "full" | "limited" };
    joined_on?: string;
    account_id?: string;
  };
  role?: { ".tag"?: "team_admin" | "user_management_admin" | "support_admin" | "member_only" };
}

export interface GroupInfo {
  group_name?: string;
  group_id?: string;
  group_management_type?: { ".tag"?: "user_managed" | "company_managed" | "system_managed" };
  group_type?: { ".tag"?: "team" | "user_managed" };
  member_count?: number;
  created?: number;
}

export interface TeamFolderMetadata {
  team_folder_id?: string;
  name?: string;
  status?: { ".tag"?: "active" | "archived" | "archive_in_progress" };
  is_team_shared_dropbox?: boolean;
  sync_setting?: { ".tag"?: "default" | "not_synced" | "sync_all" };
  content_sync_settings?: Record<string, unknown>[];
}

export interface DeviceSession {
  session_id?: string;
  ip_address?: string;
  country?: string;
  created?: string;
  updated?: string;
}

export interface MemberDevices {
  team_member_id?: string;
  web_sessions?: DeviceSession[];
  desktop_clients?: {
    session_id?: string;
    host_name?: string;
    client_type?: { ".tag"?: string };
    platform?: string;
  }[];
  mobile_clients?: {
    session_id?: string;
    device_name?: string;
    client_type?: { ".tag"?: string };
  }[];
}

export interface TeamNamespace {
  name?: string;
  namespace_id?: string;
  namespace_type?: {
    ".tag"?: "app_folder" | "shared_folder" | "team_folder" | "team_member_folder";
  };
  team_member_id?: string;
}

export interface Error {
  error_summary?: string;
  error?: Record<string, unknown>;
}
