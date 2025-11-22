import { z } from "zod";
import { SocialPlatformEnum, ConversationStatusEnum } from "./enums.schema";
import { PersonSchema } from "./person.schema";

// Base Conversation Schema
export const ConversationSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),

  // Participants
  person_id: z.string().uuid(),
  social_account_id: z.string().uuid(),
  platform: SocialPlatformEnum,

  // Conversation metadata
  subject: z.string().nullable(),
  status: ConversationStatusEnum.default("open"),

  // Message counts
  message_count: z.number().int().default(0),
  unread_count: z.number().int().default(0),

  // Timestamps
  first_message_at: z.string().datetime().nullable(),
  last_message_at: z.string().datetime().nullable(),
  last_read_at: z.string().datetime().nullable(),

  // Assignment for team collaboration
  assigned_to: z.string().uuid().nullable(),
  assigned_at: z.string().datetime().nullable(),

  // Thread identification (platform-specific)
  platform_thread_id: z.string().nullable(),

  // Flags
  is_starred: z.boolean().default(false),
  is_spam: z.boolean().default(false),

  // Platform-specific metadata
  metadata: z.record(z.unknown()).default({}),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Conversation = z.infer<typeof ConversationSchema>;

// Conversation with relations
export const ConversationWithRelationsSchema = ConversationSchema.merge(
  z.object({
    person: PersonSchema,
    assigned_to_user: z.object({
      id: z.string().uuid(),
      full_name: z.string().nullable(),
      avatar_url: z.string().url().nullable(),
    }).nullable(),
  })
);

export type ConversationWithRelations = z.infer<typeof ConversationWithRelationsSchema>;
