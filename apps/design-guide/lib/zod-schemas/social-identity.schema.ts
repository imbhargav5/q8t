import { z } from "zod";
import { SocialPlatformEnum } from "./enums.schema";

// Social Identity Schema
export const SocialIdentitySchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  person_id: z.string().uuid(),
  social_account_id: z.string().uuid().nullable(),

  // Platform identity
  platform: SocialPlatformEnum,
  platform_user_id: z.string(),
  platform_username: z.string().nullable(),
  platform_display_name: z.string().nullable(),

  // Profile information
  profile_url: z.string().url().nullable(),
  avatar_url: z.string().url().nullable(),
  bio: z.string().nullable(),

  // Social metrics
  follower_count: z.number().int().nullable(),
  following_count: z.number().int().nullable(),
  post_count: z.number().int().nullable(),
  is_verified: z.boolean().default(false),
  is_business_account: z.boolean().default(false),

  // Activity tracking
  first_seen_at: z.string().datetime(),
  last_seen_at: z.string().datetime(),
  last_message_at: z.string().datetime().nullable(),

  // Platform-specific data
  platform_data: z.record(z.unknown()).default({}),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type SocialIdentity = z.infer<typeof SocialIdentitySchema>;
