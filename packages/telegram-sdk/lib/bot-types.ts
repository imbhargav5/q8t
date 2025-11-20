// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Telegram Bot API

export interface Response {
  ok: boolean;
  result?: Record<string, unknown>;
  description?: string;
  error_code?: number;
}

export interface User {
  id?: number;
  is_bot?: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface Chat {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface Message {
  message_id: number;
  from?: User;
  sender_chat?: Chat;
  date: number;
  chat: Chat;
  text?: string;
  caption?: string;
  entities?: Array<MessageEntity>;
  photo?: Array<PhotoSize>;
  video?: Video;
  document?: Document;
  audio?: Audio;
  voice?: Voice;
  sticker?: Sticker;
  reply_markup?: InlineKeyboardMarkup;
}

export interface MessageEntity {
  type: "mention" | "hashtag" | "cashtag" | "bot_command" | "url" | "email" | "phone_number" | "bold" | "italic" | "underline" | "strikethrough" | "spoiler" | "code" | "pre" | "text_link" | "text_mention";
  offset: number;
  length: number;
  url?: string;
  user?: User;
  language?: string;
}

export interface PhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
}

export interface Video {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumb?: PhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface Document {
  file_id: string;
  file_unique_id: string;
  thumb?: PhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface Audio {
  file_id: string;
  file_unique_id: string;
  duration: number;
  performer?: string;
  title?: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface Voice {
  file_id: string;
  file_unique_id: string;
  duration: number;
  mime_type?: string;
  file_size?: number;
}

export interface Sticker {
  file_id: string;
  file_unique_id: string;
  type: "regular" | "mask" | "custom_emoji";
  width: number;
  height: number;
  is_animated: boolean;
  is_video: boolean;
  thumb?: PhotoSize;
  emoji?: string;
  set_name?: string;
  file_size?: number;
}

export interface InlineKeyboardMarkup {
  inline_keyboard: Array<Array<InlineKeyboardButton>>;
}

export interface InlineKeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
  web_app?: WebAppInfo;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  pay?: boolean;
}

export interface ReplyKeyboardMarkup {
  keyboard: Array<Array<KeyboardButton>>;
  is_persistent?: boolean;
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  input_field_placeholder?: string;
  selective?: boolean;
}

export interface KeyboardButton {
  text: string;
  request_users?: Record<string, unknown>;
  request_chat?: Record<string, unknown>;
  request_contact?: boolean;
  request_location?: boolean;
  request_poll?: Record<string, unknown>;
  web_app?: WebAppInfo;
}

export interface ReplyKeyboardRemove {
  remove_keyboard: boolean;
  selective?: boolean;
}

export interface Update {
  update_id: number;
  message?: Message;
  edited_message?: Message;
  channel_post?: Message;
  edited_channel_post?: Message;
  callback_query?: CallbackQuery;
  inline_query?: InlineQuery;
  chosen_inline_result?: ChosenInlineResult;
  my_chat_member?: ChatMemberUpdated;
  chat_member?: ChatMemberUpdated;
}

export interface CallbackQuery {
  id: string;
  from: User;
  message?: Message;
  inline_message_id?: string;
  chat_instance?: string;
  data?: string;
  game_short_name?: string;
}

export interface InlineQuery {
  id: string;
  from: User;
  query: string;
  offset: string;
  chat_type?: string;
  location?: Location;
}

export interface ChosenInlineResult {
  result_id: string;
  from: User;
  location?: Location;
  inline_message_id?: string;
  query: string;
}

export interface ChatMemberUpdated {
  chat: Chat;
  from: User;
  date: number;
  old_chat_member: ChatMember;
  new_chat_member: ChatMember;
}

export interface ChatMember {
  user: User;
  status: "creator" | "administrator" | "member" | "restricted" | "left" | "kicked";
}

export interface WebhookInfo {
  url: string;
  has_custom_certificate: boolean;
  pending_update_count: number;
  ip_address?: string;
  last_error_date?: number;
  last_error_message?: string;
  last_synchronization_error_date?: number;
  max_connections?: number;
  allowed_updates?: Array<string>;
}

export interface File {
  file_id: string;
  file_unique_id: string;
  file_size?: number;
  file_path?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
}

export interface WebAppInfo {
  url: string;
}

export interface Poll {
  id: string;
  question: string;
  options: Array<PollOption>;
  total_voter_count: number;
  is_closed: boolean;
  is_anonymous: boolean;
  type: "regular" | "quiz";
  allows_multiple_answers: boolean;
  correct_option_id?: number;
}

export interface PollOption {
  text: string;
  voter_count: number;
}

export interface StickerSet {
  name: string;
  title: string;
  sticker_type: "regular" | "mask" | "custom_emoji";
  stickers: Array<Sticker>;
  thumbnail?: PhotoSize;
}

export interface BotCommand {
  command: string;
  description: string;
}

export interface ChatPermissions {
  can_send_messages?: boolean;
  can_send_audios?: boolean;
  can_send_documents?: boolean;
  can_send_photos?: boolean;
  can_send_videos?: boolean;
  can_send_video_notes?: boolean;
  can_send_voice_notes?: boolean;
  can_send_polls?: boolean;
  can_send_other_messages?: boolean;
  can_add_web_page_previews?: boolean;
  can_change_info?: boolean;
  can_invite_users?: boolean;
  can_pin_messages?: boolean;
  can_manage_topics?: boolean;
}

export interface ChatAdministratorRights {
  is_anonymous?: boolean;
  can_manage_chat?: boolean;
  can_delete_messages?: boolean;
  can_manage_video_chats?: boolean;
  can_restrict_members?: boolean;
  can_promote_members?: boolean;
  can_change_info?: boolean;
  can_invite_users?: boolean;
  can_post_messages?: boolean;
  can_edit_messages?: boolean;
  can_pin_messages?: boolean;
  can_post_stories?: boolean;
  can_edit_stories?: boolean;
  can_delete_stories?: boolean;
  can_manage_topics?: boolean;
}
