// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface blocks {
}

export interface defs_app_id {
}

export interface defs_bot_id {
}

export interface defs_channel {
}

export interface defs_channel_id {
}

export interface defs_channel_name {
}

export interface defs_comment_id {
}

export interface defs_dm_id {
}

export interface defs_enterprise_id {
}

export interface defs_enterprise_name {
}

export interface defs_enterprise_user_id {
}

export interface defs_file_id {
}

export interface defs_group_id {
}

export interface defs_ok_false {
}

export interface defs_ok_true {
}

export interface defs_optional_app_id {
}

export interface defs_pinned_info {
}

export interface defs_reminder_id {
}

export interface defs_subteam_id {
}

export interface defs_team {
}

export interface defs_topic_purpose_creator {
}

export interface defs_ts {
}

export interface defs_user_id {
}

export interface defs_workspace_id {
}

export interface objs_bot_profile {
  app_id: defs_app_id;
  deleted: boolean;
  icons: { image_36: string; image_48: string; image_72: string };
  id: defs_bot_id;
  name: string;
  team_id: defs_team;
  updated: number;
}

export interface objs_channel {
  accepted_user?: defs_user_id;
  created: number;
  creator: defs_user_id;
  id: defs_channel_id;
  is_archived?: boolean;
  is_channel: boolean;
  is_frozen?: boolean;
  is_general?: boolean;
  is_member?: boolean;
  is_moved?: number;
  is_mpim: boolean;
  is_non_threadable?: boolean;
  is_org_shared: boolean;
  is_pending_ext_shared?: boolean;
  is_private: boolean;
  is_read_only?: boolean;
  is_shared: boolean;
  is_thread_only?: boolean;
  last_read?: defs_ts;
  latest?: Record<string, unknown>;
  members: defs_user_id[];
  name: string;
  name_normalized: string;
  num_members?: number;
  pending_shared?: defs_team[];
  previous_names?: defs_channel_name[];
  priority?: number;
  purpose: { creator: defs_topic_purpose_creator; last_set: number; value: string };
  topic: { creator: defs_topic_purpose_creator; last_set: number; value: string };
  unlinked?: number;
  unread_count?: number;
  unread_count_display?: number;
}

export interface objs_comment {
  comment: string;
  created: number;
  id: defs_comment_id;
  is_intro: boolean;
  is_starred?: boolean;
  num_stars?: number;
  pinned_info?: defs_pinned_info;
  pinned_to?: defs_channel[];
  reactions?: objs_reaction[];
  timestamp: number;
  user: defs_user_id;
}

export interface objs_comments {
}

export interface objs_conversation {
}

export interface objs_enterprise_user {
  enterprise_id: defs_enterprise_id;
  enterprise_name: defs_enterprise_name;
  id: defs_enterprise_user_id;
  is_admin: boolean;
  is_owner: boolean;
  teams: defs_team[];
}

export interface objs_external_org_migrations {
  current: { date_started: number; team_id: string }[];
  date_updated: number;
}

export interface objs_file {
  channels?: defs_channel_id[];
  comments_count?: number;
  created?: number;
  date_delete?: number;
  display_as_bot?: boolean;
  editable?: boolean;
  editor?: defs_user_id;
  external_id?: string;
  external_type?: string;
  external_url?: string;
  filetype?: string;
  groups?: defs_group_id[];
  has_rich_preview?: boolean;
  id?: defs_file_id;
  image_exif_rotation?: number;
  ims?: defs_dm_id[];
  is_external?: boolean;
  is_public?: boolean;
  is_starred?: boolean;
  is_tombstoned?: boolean;
  last_editor?: defs_user_id;
  mimetype?: string;
  mode?: string;
  name?: string;
  non_owner_editable?: boolean;
  num_stars?: number;
  original_h?: number;
  original_w?: number;
  permalink?: string;
  permalink_public?: string;
  pinned_info?: defs_pinned_info;
  pinned_to?: defs_channel[];
  pretty_type?: string;
  preview?: string;
  public_url_shared?: boolean;
  reactions?: objs_reaction[];
  shares?: { private?: Record<string, unknown>; public?: Record<string, unknown> };
  size?: number;
  source_team?: defs_team;
  state?: string;
  thumb_1024?: string;
  thumb_1024_h?: number;
  thumb_1024_w?: number;
  thumb_160?: string;
  thumb_360?: string;
  thumb_360_h?: number;
  thumb_360_w?: number;
  thumb_480?: string;
  thumb_480_h?: number;
  thumb_480_w?: number;
  thumb_64?: string;
  thumb_720?: string;
  thumb_720_h?: number;
  thumb_720_w?: number;
  thumb_80?: string;
  thumb_800?: string;
  thumb_800_h?: number;
  thumb_800_w?: number;
  thumb_960?: string;
  thumb_960_h?: number;
  thumb_960_w?: number;
  thumb_tiny?: string;
  timestamp?: number;
  title?: string;
  updated?: number;
  url_private?: string;
  url_private_download?: string;
  user?: string;
  user_team?: defs_team;
  username?: string;
}

export interface objs_icon {
  image_102?: string;
  image_132?: string;
  image_230?: string;
  image_34?: string;
  image_44?: string;
  image_68?: string;
  image_88?: string;
  image_default?: boolean;
}

export interface objs_message {
  attachments?: { fallback?: string; id: number; image_bytes?: number; image_height?: number; image_url?: string; image_width?: number }[];
  blocks?: blocks;
  bot_id?: Record<string, unknown>;
  bot_profile?: objs_bot_profile;
  client_msg_id?: string;
  comment?: objs_comment;
  display_as_bot?: boolean;
  file?: objs_file;
  files?: objs_file[];
  icons?: { emoji?: string; image_64?: string };
  inviter?: defs_user_id;
  is_delayed_message?: boolean;
  is_intro?: boolean;
  is_starred?: boolean;
  last_read?: defs_ts;
  latest_reply?: defs_ts;
  name?: string;
  old_name?: string;
  parent_user_id?: defs_user_id;
  permalink?: string;
  pinned_to?: defs_channel[];
  purpose?: string;
  reactions?: objs_reaction[];
  reply_count?: number;
  reply_users?: defs_user_id[];
  reply_users_count?: number;
  source_team?: defs_workspace_id;
  subscribed?: boolean;
  subtype?: string;
  team?: defs_workspace_id;
  text: string;
  thread_ts?: defs_ts;
  topic?: string;
  ts: defs_ts;
  type: string;
  unread_count?: number;
  upload?: boolean;
  user?: defs_user_id;
  user_profile?: objs_user_profile_short;
  user_team?: defs_workspace_id;
  username?: string;
}

export interface objs_paging {
  count?: number;
  page: number;
  pages?: number;
  per_page?: number;
  spill?: number;
  total: number;
}

export interface objs_primary_owner {
  email: string;
  id: string;
}

export interface objs_reaction {
  count: number;
  name: string;
  users: defs_user_id[];
}

export interface objs_reminder {
  complete_ts?: number;
  creator: defs_user_id;
  id: defs_reminder_id;
  recurring: boolean;
  text: string;
  time?: number;
  user: defs_user_id;
}

export interface objs_resources {
  excluded_ids?: Record<string, unknown>[];
  ids: Record<string, unknown>[];
  wildcard?: boolean;
}

export interface objs_response_metadata {
}

export interface objs_scopes {
}

export interface objs_subteam {
  auto_provision: boolean;
  auto_type: Record<string, unknown>;
  channel_count?: number;
  created_by: defs_user_id;
  date_create: number;
  date_delete: number;
  date_update: number;
  deleted_by: Record<string, unknown>;
  description: string;
  enterprise_subteam_id: string;
  handle: string;
  id: defs_subteam_id;
  is_external: boolean;
  is_subteam: boolean;
  is_usergroup: boolean;
  name: string;
  prefs: { channels: defs_channel_id[]; groups: defs_group_id[] };
  team_id: defs_team;
  updated_by: defs_user_id;
  user_count?: number;
  users?: defs_user_id[];
}

export interface objs_team {
  archived?: boolean;
  avatar_base_url?: string;
  created?: number;
  date_create?: number;
  deleted?: boolean;
  discoverable?: Record<string, unknown>;
  domain: string;
  email_domain: string;
  enterprise_id?: defs_enterprise_id;
  enterprise_name?: defs_enterprise_name;
  external_org_migrations?: objs_external_org_migrations;
  has_compliance_export?: boolean;
  icon: objs_icon;
  id: defs_workspace_id;
  is_assigned?: boolean;
  is_enterprise?: number;
  is_over_storage_limit?: boolean;
  limit_ts?: number;
  locale?: string;
  messages_count?: number;
  msg_edit_window_mins?: number;
  name: string;
  over_integrations_limit?: boolean;
  over_storage_limit?: boolean;
  pay_prod_cur?: string;
  plan?: "" | "std" | "plus" | "compliance" | "enterprise";
  primary_owner?: objs_primary_owner;
  sso_provider?: { label?: string; name?: string; type?: string };
}

export interface objs_team_profile_field {
  hint: string;
  id: string;
  is_hidden?: boolean;
  label: string;
  options?: Record<string, unknown>;
  ordering: number;
  type: "text" | "date" | "link" | "mailto" | "options_list" | "user";
}

export interface objs_team_profile_field_option {
}

export interface objs_user {
}

export interface objs_user_profile {
  always_active?: boolean;
  api_app_id?: defs_optional_app_id;
  avatar_hash: string;
  bot_id?: defs_bot_id;
  display_name: string;
  display_name_normalized: string;
  is_app_user?: boolean;
  is_custom_image?: boolean;
  last_avatar_image_hash?: string;
  memberships_count?: number;
  phone: string;
  pronouns?: string;
  real_name: string;
  real_name_normalized: string;
  skype: string;
  status_default_emoji?: string;
  status_default_text?: string;
  status_emoji: string;
  status_expiration?: number;
  status_text: string;
  team?: defs_workspace_id;
  title: string;
  updated?: number;
  user_id?: string;
}

export interface objs_user_profile_short {
  avatar_hash: string;
  display_name: string;
  display_name_normalized?: string;
  image_72: string;
  is_restricted: boolean;
  is_ultra_restricted: boolean;
  name: string;
  real_name: string;
  real_name_normalized?: string;
  team: defs_workspace_id;
}

export interface SlackResponse {
  ok: boolean;
  [key: string]: unknown;
}
