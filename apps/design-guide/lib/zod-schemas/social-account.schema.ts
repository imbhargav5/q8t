import { z } from "zod";
import { SocialPlatformEnum } from "./enums.schema";

// Social Account Schema - represents connected social media accounts
export const SocialAccountSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),

  // Platform details
  platform: SocialPlatformEnum,
  account_name: z.string(),
  handle: z.string(), // @username
  avatar_url: z.string().url().nullable(),

  // Connection status
  is_active: z.boolean().default(true),
  is_connected: z.boolean().default(true),
  last_synced_at: z.string().datetime().nullable(),

  // Platform-specific data
  platform_user_id: z.string().nullable(),
  access_token_expires_at: z.string().datetime().nullable(),

  // Metadata
  followers_count: z.number().int().nullable(),
  metadata: z.record(z.string(), z.unknown()).default({}),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type SocialAccount = z.infer<typeof SocialAccountSchema>;
