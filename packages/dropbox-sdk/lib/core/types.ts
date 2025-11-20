// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Dropbox Core API

export interface Metadata {
  ".tag": "file" | "folder";
  name: string;
  path_lower: string;
  path_display: string;
  id: string;
}

export type FileMetadata = Metadata & unknown;

export type FolderMetadata = Metadata & unknown;

export interface ListFolderResult {
  entries: FileMetadata | FolderMetadata[];
  cursor: string;
  has_more: boolean;
}

export interface CommitInfo {
  path: string;
  mode?: "add" | "overwrite" | "update";
  autorename?: boolean;
  mute?: boolean;
  strict_conflict?: boolean;
}

export interface FullAccount {
  account_id?: string;
  name?: { given_name?: string; surname?: string; familiar_name?: string; display_name?: string };
  email?: string;
  email_verified?: boolean;
  disabled?: boolean;
  country?: string;
  locale?: string;
  profile_photo_url?: string;
  is_paired?: boolean;
  account_type?: { ".tag"?: "basic" | "pro" | "business" };
  root_info?: { ".tag"?: string; root_namespace_id?: string; home_namespace_id?: string };
}

export interface SpaceUsage {
  used?: number;
  allocation?: { ".tag"?: string; allocated?: number };
}

export interface SharedLinkMetadata {
  url?: string;
  name?: string;
  link_permissions?: { can_revoke?: boolean; resolved_visibility?: { ".tag"?: string } };
  path_lower?: string;
  expires?: string;
}

export interface CreateSharedLinkSettings {
  requested_visibility?: "public" | "team_only" | "password";
  link_password?: string;
  expires?: string;
}

export interface FileRequest {
  id?: string;
  url?: string;
  title?: string;
  created?: string;
  is_open?: boolean;
  file_count?: number;
  destination?: string;
  deadline?: { deadline?: string; allow_late_uploads?: string };
}

export interface Error {
  error_summary?: string;
  error?: Record<string, unknown>;
}

export interface SearchMatch {
  match_type?: { ".tag"?: string };
  metadata?: FileMetadata | FolderMetadata;
}

export interface SearchResult {
  matches?: SearchMatch[];
  more?: boolean;
  start?: number;
}
