import { z } from "zod";

export const ShortLinkSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  user_id: z.string(),

  // URLs
  original_url: z.string().url(),
  short_code: z.string(),
  short_url: z.string().url(),

  // UTM Parameters
  utm_source: z.string().nullable(),
  utm_medium: z.string().nullable(),
  utm_campaign: z.string().nullable(),
  utm_term: z.string().nullable(),
  utm_content: z.string().nullable(),

  // Metadata
  title: z.string().nullable(),
  description: z.string().nullable(),
  tags: z.array(z.string()).default([]),

  // QR Code
  qr_code_url: z.string().url().nullable(),

  // Analytics
  clicks: z.number().default(0),
  unique_clicks: z.number().default(0),
  last_clicked_at: z.string().nullable(),

  // Settings
  is_active: z.boolean().default(true),
  expires_at: z.string().nullable(),
  password: z.string().nullable(),

  created_at: z.string(),
  updated_at: z.string(),
});

export const LinkClickSchema = z.object({
  id: z.string(),
  link_id: z.string(),

  // Click details
  clicked_at: z.string(),

  // Location
  country: z.string().nullable(),
  city: z.string().nullable(),

  // Device
  device_type: z.string().nullable(), // mobile, desktop, tablet
  browser: z.string().nullable(),
  os: z.string().nullable(),

  // Referrer
  referrer: z.string().nullable(),
  ip_address: z.string().nullable(),
});

export type ShortLink = z.infer<typeof ShortLinkSchema>;
export type LinkClick = z.infer<typeof LinkClickSchema>;
