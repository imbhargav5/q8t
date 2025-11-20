// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Telegram Client API (MTProto)

export type InputPeer = InputPeerUser | InputPeerChat | InputPeerChannel;

export interface InputPeerUser {
  user_id: number;
  access_hash: number;
}

export interface InputPeerChat {
  chat_id: number;
}

export interface InputPeerChannel {
  channel_id: number;
  access_hash: number;
}

export interface User {
  id: number;
  access_hash?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone?: string;
  photo?: UserProfilePhoto;
  status?: UserStatus;
  bot?: boolean;
  bot_info_version?: number;
  verified?: boolean;
  restricted?: boolean;
  premium?: boolean;
}

export interface UserFull {
  id: number;
  about: string;
  settings: PeerSettings;
  profile_photo: Record<string, unknown>;
  notify_settings: PeerNotifySettings;
  common_chats_count?: number;
  folder_id?: number;
}

export interface UserProfilePhoto {
  photo_id: number;
  dc_id?: number;
}

export type UserStatus = { _?: "userStatusOnline"; expires?: number } | { _?: "userStatusOffline"; was_online?: number } | { _?: "userStatusRecently" | "userStatusLastWeek" | "userStatusLastMonth" };

export interface Message {
  id: number;
  peer_id: Peer;
  from_id?: Peer;
  date: number;
  message?: string;
  media?: MessageMedia;
  reply_to?: MessageReplyHeader;
  entities?: Array<MessageEntity>;
  views?: number;
  forwards?: number;
  replies?: MessageReplies;
  edit_date?: number;
  post_author?: string;
  grouped_id?: number;
  reactions?: MessageReactions;
}

export type Peer = { _?: "peerUser"; user_id?: number } | { _?: "peerChat"; chat_id?: number } | { _?: "peerChannel"; channel_id?: number };

export type MessageMedia = MessageMediaPhoto | MessageMediaDocument | MessageMediaGeo | MessageMediaContact;

export interface MessageMediaPhoto {
  photo?: Record<string, unknown>;
  ttl_seconds?: number;
}

export interface MessageMediaDocument {
  document?: Record<string, unknown>;
  ttl_seconds?: number;
}

export interface MessageMediaGeo {
  geo?: Record<string, unknown>;
}

export interface MessageMediaContact {
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  vcard?: string;
  user_id?: number;
}

export interface MessageEntity {
  offset: number;
  length: number;
  type?: "mention" | "hashtag" | "bot_command" | "url" | "email" | "bold" | "italic" | "code" | "pre" | "text_link" | "text_mention" | "phone_number";
}

export interface MessageReplyHeader {
  reply_to_msg_id?: number;
  reply_to_peer_id?: Peer;
  reply_to_top_id?: number;
}

export interface MessageReplies {
  replies?: number;
  replies_pts?: number;
  comments?: boolean;
  recent_repliers?: Array<Peer>;
  channel_id?: number;
}

export interface MessageReactions {
  results?: Array<Record<string, unknown>>;
  recent_reactions?: Array<Record<string, unknown>>;
}

export interface Chat {
  id: number;
  title: string;
  photo?: Record<string, unknown>;
  participants_count?: number;
  date?: number;
  version?: number;
  migrated_to?: Record<string, unknown>;
  admin_rights?: ChatAdminRights;
  default_banned_rights?: ChatBannedRights;
}

export interface Channel {
  id: number;
  access_hash?: number;
  title: string;
  username?: string;
  photo?: Record<string, unknown>;
  date?: number;
  version?: number;
  restriction_reason?: Array<Record<string, unknown>>;
  admin_rights?: ChatAdminRights;
  banned_rights?: ChatBannedRights;
  default_banned_rights?: ChatBannedRights;
  participants_count?: number;
  megagroup?: boolean;
  broadcast?: boolean;
  verified?: boolean;
}

export interface ChatAdminRights {
  change_info?: boolean;
  post_messages?: boolean;
  edit_messages?: boolean;
  delete_messages?: boolean;
  ban_users?: boolean;
  invite_users?: boolean;
  pin_messages?: boolean;
  add_admins?: boolean;
  anonymous?: boolean;
  manage_call?: boolean;
  other?: boolean;
  manage_topics?: boolean;
}

export interface ChatBannedRights {
  until_date: number;
  view_messages?: boolean;
  send_messages?: boolean;
  send_media?: boolean;
  send_stickers?: boolean;
  send_gifs?: boolean;
  send_games?: boolean;
  send_inline?: boolean;
  embed_links?: boolean;
  send_polls?: boolean;
  change_info?: boolean;
  invite_users?: boolean;
  pin_messages?: boolean;
  manage_topics?: boolean;
}

export interface Dialog {
  peer: Peer;
  top_message: number;
  read_inbox_max_id: number;
  read_outbox_max_id: number;
  unread_count: number;
  unread_mentions_count?: number;
  unread_reactions_count?: number;
  notify_settings: PeerNotifySettings;
  pts?: number;
  draft?: Record<string, unknown>;
  folder_id?: number;
}

export interface PeerNotifySettings {
  show_previews?: boolean;
  silent?: boolean;
  mute_until?: number;
  sound?: string;
}

export interface PeerSettings {
  report_spam?: boolean;
  add_contact?: boolean;
  block_contact?: boolean;
  share_contact?: boolean;
  need_contacts_exception?: boolean;
  report_geo?: boolean;
  autoarchived?: boolean;
  geo_distance?: number;
}

export type Update = UpdateNewMessage | UpdateMessageEdited | UpdateReadHistoryInbox | UpdateUserStatus;

export interface UpdateNewMessage {
  message?: Message;
  pts?: number;
  pts_count?: number;
}

export interface UpdateMessageEdited {
  peer?: Peer;
  msg_id?: number;
  pts?: number;
  pts_count?: number;
}

export interface UpdateReadHistoryInbox {
  peer?: Peer;
  max_id?: number;
  still_unread_count?: number;
  pts?: number;
  pts_count?: number;
}

export interface UpdateUserStatus {
  user_id?: number;
  status?: UserStatus;
}

export interface UpdatesState {
  pts: number;
  qts: number;
  date: number;
  seq: number;
  unread_count?: number;
}

export interface SentCode {
  type: SentCodeType;
  phone_code_hash: string;
  next_type?: CodeType;
  timeout?: number;
}

export type SentCodeType = { _?: "auth.sentCodeTypeApp"; length?: number } | { _?: "auth.sentCodeTypeSms"; length?: number } | { _?: "auth.sentCodeTypeCall"; length?: number } | { _?: "auth.sentCodeTypeFlashCall"; pattern?: string };

export type CodeType = "sms" | "call" | "flash_call" | "missed_call";

export interface Authorization {
  user: User;
}

export interface Password {
  current_algo?: Record<string, unknown>;
  srp_B?: string;
  srp_id?: number;
  hint?: string;
  has_recovery?: boolean;
  has_secure_values?: boolean;
  has_password?: boolean;
}

export interface PrivacyRules {
  rules?: Array<Record<string, unknown>>;
}

export interface ImportedContacts {
  imported?: Array<Record<string, unknown>>;
  popular_invites?: Array<Record<string, unknown>>;
  retry_contacts?: Array<number>;
  users?: Array<User>;
}

export interface BusinessWeeklyOpen {
  start_minute?: number;
  end_minute?: number;
}

export interface BusinessWorkHours {
  open_now?: boolean;
  timezone_id?: string;
  weekly_open?: Array<BusinessWeeklyOpen>;
}

export interface BusinessLocation {
  geo_point?: Record<string, unknown>;
  address?: string;
}

export interface BusinessIntro {
  title?: string;
  description?: string;
  sticker?: Record<string, unknown>;
}

export interface BusinessRecipients {
  existing_chats?: boolean;
  new_chats?: boolean;
  contacts?: boolean;
  non_contacts?: boolean;
  exclude_selected?: boolean;
}

export interface QuickReply {
  shortcut_id?: number;
  shortcut?: string;
  top_message?: number;
  count?: number;
}
