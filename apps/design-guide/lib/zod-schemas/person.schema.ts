import { z } from "zod";

// CRM Person Schema
export const PersonSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),

  // Core identity fields
  email: z.string().email().nullable(),
  full_name: z.string().nullable(),
  display_name: z.string().nullable(),
  avatar_url: z.string().url().nullable(),

  // Contact information
  phone: z.string().nullable(),
  location: z.string().nullable(),
  timezone: z.string().nullable(),
  language: z.string().nullable(),

  // Profile information
  bio: z.string().nullable(),
  company: z.string().nullable(),
  job_title: z.string().nullable(),
  website_url: z.string().url().nullable(),

  // Engagement metrics
  first_contact_at: z.string().datetime().nullable(),
  last_contact_at: z.string().datetime().nullable(),
  total_messages: z.number().int().default(0),
  total_conversations: z.number().int().default(0),

  // Flags
  is_vip: z.boolean().default(false),
  is_verified: z.boolean().default(false),
  is_blocked: z.boolean().default(false),

  // Tags and categorization
  tags: z.array(z.string()).default([]),

  // Custom fields (flexible storage)
  custom_fields: z.record(z.string(), z.unknown()).default({}),
  metadata: z.record(z.string(), z.unknown()).default({}),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Person = z.infer<typeof PersonSchema>;
