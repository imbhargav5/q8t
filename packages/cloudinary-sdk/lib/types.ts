// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/upload.yaml

export interface UploadResponse {
  public_id?: string;
  version?: number;
  signature?: string;
  width?: number;
  height?: number;
  format?: string;
  resource_type?: string;
  created_at?: string;
  tags?: string[];
  bytes?: number;
  type?: string;
  etag?: string;
  url?: string;
  secure_url?: string;
  asset_id?: string;
  original_filename?: string;
}

export interface UploadRequest {
  file: string;
  public_id?: string;
  folder?: string;
  asset_folder?: string;
  use_filename?: boolean;
  unique_filename?: boolean;
  overwrite?: boolean;
  tags?: string;
  context?: string;
  metadata?: string;
  transformation?: string;
  format?: string;
  resource_type?: "image" | "video" | "raw" | "auto";
  type?: "upload" | "private" | "authenticated";
}

export interface ExplicitRequest {
  public_id: string;
  type?: string;
  eager?: string;
  headers?: string;
  tags?: string;
  context?: string;
  metadata?: string;
  face_coordinates?: string;
  custom_coordinates?: string;
  background_removal?: string;
  notification_url?: string;
  eager_notification_url?: string;
  invalidate?: boolean;
  moderation?: string;
  access_control?: string;
}

export interface DestroyRequest {
  public_id: string;
  resource_type?: "image" | "video" | "raw";
  type?: string;
  invalidate?: boolean;
}

export interface DestroyResponse {
  result?: "ok" | "not found";
}

export interface RenameRequest {
  from_public_id: string;
  to_public_id: string;
  resource_type?: string;
  type?: string;
  to_type?: string;
  overwrite?: boolean;
  invalidate?: boolean;
}

export interface ExplodeRequest {
  public_id: string;
  transformation?: string;
  format?: string;
  notification_url?: string;
}

export interface ExplodeResponse {
  status?: string;
  batch_id?: string;
}

export interface GenerateArchiveRequest {
  public_ids?: string[];
  prefixes?: string[];
  tags?: string[];
  target_format?: "zip" | "tar" | "tar.gz";
  flatten_folders?: boolean;
  flatten_transformations?: boolean;
  use_original_filename?: boolean;
  async?: boolean;
  notification_url?: string;
  target_public_id?: string;
  transformations?: string;
}

export interface GenerateArchiveResponse {
  resource_type?: string;
  type?: string;
  public_id?: string;
  version?: number;
  url?: string;
  secure_url?: string;
  created_at?: string;
  asset_id?: string;
  bytes?: number;
  file_count?: number;
}

export interface TagsRequest {
  public_ids: string[];
  tag?: string;
  tags?: string[];
  resource_type?: string;
  type?: string;
  command?: "add" | "remove" | "replace" | "set_exclusive";
}

export interface ContextRequest {
  public_ids: string[];
  context?: string;
  resource_type?: string;
  type?: string;
  command?: "add" | "remove";
}

export interface MetadataRequest {
  public_ids: string[];
  metadata?: string;
  resource_type?: string;
  type?: string;
  clear_invalid?: boolean;
}

export interface SuccessResponse {
  public_ids?: string[];
}

// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/admin.yaml

export interface Resource {
  public_id?: string;
  asset_id?: string;
  folder?: string;
  asset_folder?: string;
  display_name?: string;
  format?: string;
  version?: number;
  resource_type?: string;
  type?: string;
  created_at?: string;
  uploaded_at?: string;
  bytes?: number;
  backup_bytes?: number;
  width?: number;
  height?: number;
  aspect_ratio?: number;
  pixels?: number;
  pages?: number;
  url?: string;
  secure_url?: string;
  tags?: string[];
  context?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ResourcesResponse {
  resources?: Resource[];
  next_cursor?: string;
  rate_limit_allowed?: number;
  rate_limit_remaining?: number;
  rate_limit_reset_at?: string;
}

export interface ResourceResponse {
  asset_id?: string;
  public_id?: string;
  format?: string;
  version?: number;
  resource_type?: string;
  type?: string;
  created_at?: string;
  bytes?: number;
  width?: number;
  height?: number;
  url?: string;
  secure_url?: string;
  tags?: string[];
  context?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  derived?: Record<string, unknown>[];
}

export interface DeleteResourcesResponse {
  deleted?: Record<string, string>;
  deleted_counts?: Record<string, unknown>;
  partial?: boolean;
  rate_limit_allowed?: number;
  rate_limit_remaining?: number;
  rate_limit_reset_at?: string;
}

export interface RestoreResponse {
  public_id?: string;
  asset_id?: string;
  version?: number;
  format?: string;
  resource_type?: string;
  created_at?: string;
  bytes?: number;
}

export interface UpdateRequest {
  tags?: string[];
  context?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  display_name?: string;
  asset_folder?: string;
  access_control?: unknown[];
  moderation_status?: string;
  background_removal?: string;
  raw_convert?: string;
  categorization?: string;
  detection?: string;
  ocr?: string;
  auto_tagging?: number;
  notification_url?: string;
}

export interface Transformation {
  name?: string;
  allowed_for_strict?: boolean;
  used?: boolean;
  named?: boolean;
}

export interface TransformationsResponse {
  transformations?: Transformation[];
  next_cursor?: string;
}

export interface UploadPreset {
  name?: string;
  unsigned?: boolean;
  settings?: Record<string, unknown>;
}

export interface UploadPresetsResponse {
  presets?: UploadPreset[];
  next_cursor?: string;
}

export interface UploadPresetRequest {
  name: string;
  unsigned?: boolean;
  disallow_public_id?: boolean;
  folder?: string;
  tags?: string;
  context?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  transformation?: string;
  format?: string;
  eager?: string;
  allowed_formats?: string;
  access_mode?: string;
}

export interface TagsResponse {
  tags?: string[];
  next_cursor?: string;
}

export interface FoldersResponse {
  folders?: { name?: string; path?: string }[];
  total_count?: number;
}

export interface SearchRequest {
  expression: string;
  max_results?: number;
  next_cursor?: string;
  sort_by?: Record<string, unknown>[];
  aggregate?: string;
  with_field?: string[];
}

export interface SearchResponse {
  total_count?: number;
  resources?: Resource[];
  next_cursor?: string;
  aggregations?: Record<string, unknown>;
  rate_limit_allowed?: number;
  rate_limit_remaining?: number;
}

export interface MetadataField {
  external_id?: string;
  type?: string;
  label?: string;
  mandatory?: boolean;
  default_value?: string;
  validation?: Record<string, unknown>;
  datasource?: Record<string, unknown>;
}

export interface MetadataFieldsResponse {
  metadata_fields?: MetadataField[];
}

// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/unsigned-upload.yaml

export interface UnsignedUploadRequest {
  file: string;
  upload_preset: string;
  public_id?: string;
  public_id_prefix?: string;
  folder?: string;
  asset_folder?: string;
  tags?: string;
  context?: string;
  metadata?: string;
  face_coordinates?: string;
  custom_coordinates?: string;
  regions?: string;
  source?: string;
  filename_override?: string;
}

export interface UploadResponse {
  public_id?: string;
  version?: number;
  signature?: string;
  width?: number;
  height?: number;
  format?: string;
  resource_type?: string;
  created_at?: string;
  tags?: string[];
  bytes?: number;
  type?: string;
  etag?: string;
  url?: string;
  secure_url?: string;
  asset_id?: string;
  original_filename?: string;
}

// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/provisioning.yaml

export interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  enabled?: boolean;
  sub_account_ids?: string[];
  user_group_ids?: string[];
}

export interface UsersResponse {
  users?: User[];
  total?: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role:
    | "master_admin"
    | "admin"
    | "billing"
    | "technical_admin"
    | "reports"
    | "media_library_admin"
    | "media_library_user";
  sub_account_ids?: string[];
  enabled?: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
  sub_account_ids?: string[];
  enabled?: boolean;
}

export interface UserGroup {
  id?: string;
  name?: string;
  sub_account_ids?: string[];
}

export interface UserGroupsResponse {
  user_groups?: UserGroup[];
  total?: number;
}

export interface CreateUserGroupRequest {
  name: string;
  sub_account_ids?: string[];
}

export interface SubAccount {
  id?: string;
  cloud_name?: string;
  name?: string;
  enabled?: boolean;
  custom_attributes?: Record<string, unknown>;
}

export interface SubAccountsResponse {
  sub_accounts?: SubAccount[];
  total?: number;
}

export interface CreateSubAccountRequest {
  name: string;
  cloud_name: string;
  custom_attributes?: Record<string, unknown>;
  enabled?: boolean;
  base_sub_account_id?: string;
}

export interface UpdateSubAccountRequest {
  name?: string;
  custom_attributes?: Record<string, unknown>;
  enabled?: boolean;
}

export interface AccessKey {
  key?: string;
  secret?: string;
  name?: string;
  enabled?: boolean;
  sub_account_id?: string;
}

export interface AccessKeysResponse {
  access_keys?: AccessKey[];
  total?: number;
}

export interface GenerateAccessKeyRequest {
  name?: string;
  enabled?: boolean;
}

export interface UpdateAccessKeyRequest {
  name?: string;
  enabled?: boolean;
}

export interface MessageResponse {
  message?: string;
}
