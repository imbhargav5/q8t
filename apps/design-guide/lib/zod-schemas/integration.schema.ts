import { z } from "zod";

export const IntegrationCategoryEnum = z.enum([
  "social-media",
  "communication",
  "productivity",
  "business",
  "media",
]);
export type IntegrationCategory = z.infer<typeof IntegrationCategoryEnum>;

export const IntegrationProviderEnum = z.enum([
  // Social Media (13)
  "x",
  "facebook",
  "instagram",
  "linkedin",
  "reddit",
  "bluesky",
  "mastodon",
  "threads",
  "tiktok",
  "youtube",
  "pinterest",
  "farcaster",
  "nostr",
  // Communication (4)
  "slack",
  "discord",
  "telegram",
  "whatsapp",
  // Productivity (5)
  "notion",
  "asana",
  "clickup",
  "monday",
  "airtable",
  // Business (3)
  "salesforce",
  "google-my-business",
  "trustpilot",
  // Media (3)
  "cloudinary",
  "dropbox",
  "dribbble",
]);
export type IntegrationProvider = z.infer<typeof IntegrationProviderEnum>;

export const IntegrationStatusEnum = z.enum([
  "connected",
  "disconnected",
  "error",
  "pending",
]);
export type IntegrationStatus = z.infer<typeof IntegrationStatusEnum>;

export const IntegrationSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  provider: IntegrationProviderEnum,
  provider_name: z.string(),
  provider_icon: z.string().optional(),
  category: IntegrationCategoryEnum,
  account_name: z.string(),
  account_identifier: z.string().optional(),
  status: IntegrationStatusEnum,
  connected_at: z.string().datetime().optional(),
  last_sync_at: z.string().datetime().optional(),
  token_expires_at: z.string().datetime().optional(),
  permissions: z.array(z.string()),
  settings: z.record(z.any()).optional(),
  stats: z
    .object({
      api_calls_today: z.number().optional(),
      api_calls_limit: z.number().optional(),
      storage_used: z.number().optional(),
      storage_limit: z.number().optional(),
      items_synced: z.number().optional(),
    })
    .optional(),
  error_message: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type Integration = z.infer<typeof IntegrationSchema>;

export const ProviderDefinitionSchema = z.object({
  id: z.string(),
  provider: IntegrationProviderEnum,
  name: z.string(),
  description: z.string(),
  category: IntegrationCategoryEnum,
  icon: z.string().optional(),
  features: z.array(z.string()),
  capabilities: z.array(z.string()),
  is_available: z.boolean(),
  documentation_url: z.string().url().optional(),
});
export type ProviderDefinition = z.infer<typeof ProviderDefinitionSchema>;
