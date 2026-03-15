import { z } from "zod";

// Social Platform Enum
export const SocialPlatformEnum = z.enum([
  "whatsapp",
  "threads",
  "twitter",
  "facebook",
  "instagram",
  "linkedin",
  "pinterest",
  "reddit",
  "slack",
  "discord",
  "tiktok",
  "youtube",
  "bluesky",
  "telegram",
  "mastodon",
  "farcaster",
  "nostr",
]);

export type SocialPlatform = z.infer<typeof SocialPlatformEnum>;

// Message Type Enum
export const MessageTypeEnum = z.enum([
  "dm",
  "mention",
  "reply",
  "comment",
  "reaction",
  "follow_request",
  "share",
  "story_mention",
  "story_reply",
]);

export type MessageType = z.infer<typeof MessageTypeEnum>;

// Conversation Status Enum
export const ConversationStatusEnum = z.enum([
  "open",
  "pending",
  "resolved",
  "archived",
]);

export type ConversationStatus = z.infer<typeof ConversationStatusEnum>;

// Note Type Enum
export const NoteTypeEnum = z.enum([
  "internal",
  "resolution",
  "action_item",
  "escalation",
  "follow_up",
  "general",
]);

export type NoteType = z.infer<typeof NoteTypeEnum>;

// Note Visibility Enum
export const NoteVisibilityEnum = z.enum(["private", "team"]);

export type NoteVisibility = z.infer<typeof NoteVisibilityEnum>;

// Media Type Enum
export const MediaTypeEnum = z.enum([
  "image",
  "video",
  "audio",
  "document",
  "gif",
  "sticker",
  "voice_note",
  "file",
  "link_preview",
]);

export type MediaType = z.infer<typeof MediaTypeEnum>;

// Media Processing Status Enum
export const MediaProcessingStatusEnum = z.enum([
  "pending",
  "downloading",
  "processing",
  "completed",
  "failed",
  "skipped",
]);

export type MediaProcessingStatus = z.infer<typeof MediaProcessingStatusEnum>;

// Workspace Role Enum
export const WorkspaceRoleEnum = z.enum([
  "owner",
  "admin",
  "member",
  "guest",
]);

export type WorkspaceRole = z.infer<typeof WorkspaceRoleEnum>;

// User Status Enum
export const UserStatusEnum = z.enum(["online", "away", "busy", "offline"]);

export type UserStatus = z.infer<typeof UserStatusEnum>;
