// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface User {
  /** User ID */
  id?: number;
  /** Display name */
  name?: string;
  /** Username */
  login?: string;
  /** Profile URL */
  html_url?: string;
  /** Avatar image URL */
  avatar_url?: string;
  /** User biography */
  bio?: string;
  /** User location */
  location?: string;
  links?: { web?: string; twitter?: string };
  /** Whether user can upload shots */
  can_upload_shot?: boolean;
  /** Whether user has pro account */
  pro?: boolean;
  /** Number of followers */
  followers_count?: number;
  /** Account creation timestamp */
  created_at?: string;
  /** User type (Player, Team) */
  type?: string;
  teams?: Team[];
}

export interface Team {
  id?: number;
  name?: string;
  login?: string;
  html_url?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  links?: { web?: string; twitter?: string };
  can_upload_shot?: boolean;
  pro?: boolean;
  followers_count?: number;
  created_at?: string;
  type?: string;
}

export interface Shot {
  /** Shot ID */
  id?: number;
  /** Shot title */
  title?: string;
  /** Shot description (HTML) */
  description?: string;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
  images?: ShotImages;
  /** Publication timestamp */
  published_at?: string;
  /** Last update timestamp */
  updated_at?: string;
  /** Shot page URL */
  html_url?: string;
  /** Whether shot is animated */
  animated?: boolean;
  /** Shot tags */
  tags?: string[];
  attachments?: Attachment[];
  projects?: ProjectReference[];
  video?: { url?: string; width?: number; height?: number } | null;
  /** Whether shot is low profile */
  low_profile?: boolean;
  /** Scheduled publication time */
  scheduled_for?: string | null;
}

export interface ShotImages {
  hidpi?: string | null;
  normal?: string;
  teaser?: string;
}

export interface CreateShotRequest {
  /** Shot title */
  title: string;
  /** Shot description */
  description?: string;
  /** Up to 12 tags */
  tags?: string[];
  /** Team ID to publish under */
  team_id?: number;
  /** Original shot ID if this is a rebound */
  rebound_source_id?: number;
  /** Publish as low profile */
  low_profile?: boolean;
  /** Schedule publication time */
  scheduled_for?: string;
}

export interface UpdateShotRequest {
  title?: string;
  description?: string;
  tags?: string[];
  team_id?: number;
  low_profile?: boolean;
  scheduled_for?: string;
}

export interface Attachment {
  id?: number;
  url?: string;
  thumbnail_url?: string;
  /** File size in bytes */
  size?: number;
  /** MIME type */
  content_type?: string;
  created_at?: string;
}

export interface Project {
  id?: number;
  name?: string;
  description?: string;
  shots_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectReference {
  id?: number;
  name?: string;
}

export interface CreateProjectRequest {
  /** Project name */
  name: string;
  /** Project description */
  description?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
}

export interface Error {
  message?: string;
  errors?: Record<string, unknown>[];
}
