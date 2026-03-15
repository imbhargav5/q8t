import { z } from "zod";
import { NoteTypeEnum, NoteVisibilityEnum } from "./enums.schema";

// Conversation Note Schema
export const ConversationNoteSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  conversation_id: z.string().uuid(),

  // Note content
  content: z.string().min(1),
  note_type: NoteTypeEnum.default("internal"),
  visibility: NoteVisibilityEnum.default("team"),

  // Author tracking
  author_id: z.string().uuid(),
  author_name: z.string().nullable(),
  author_avatar: z.string().url().nullable(),

  // @mentions for notifications
  mentioned_user_ids: z.array(z.string().uuid()).default([]),

  // Organization
  is_pinned: z.boolean().default(false),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type ConversationNote = z.infer<typeof ConversationNoteSchema>;

// Message Note Schema
export const MessageNoteSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  message_id: z.string().uuid(),

  // Note content
  content: z.string().min(1),
  note_type: NoteTypeEnum.default("general"),
  visibility: NoteVisibilityEnum.default("team"),

  // Author tracking
  author_id: z.string().uuid(),
  author_name: z.string().nullable(),
  author_avatar: z.string().url().nullable(),

  created_at: z.string().datetime(),
});

export type MessageNote = z.infer<typeof MessageNoteSchema>;
