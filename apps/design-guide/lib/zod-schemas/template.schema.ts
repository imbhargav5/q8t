import { z } from "zod";

export const ContentTemplateSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  user_id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  category: z.enum([
    "promotional",
    "educational",
    "engagement",
    "seasonal",
    "announcement",
    "question",
    "quote",
    "behind_the_scenes",
    "user_generated",
    "other",
  ]),
  content: z.string(),
  media_urls: z.array(z.string()).default([]),
  variables: z.array(
    z.object({
      name: z.string(),
      placeholder: z.string(),
      default_value: z.string().nullable(),
    })
  ).default([]),
  platforms: z.array(z.string()).default([]),
  hashtags: z.array(z.string()).default([]),
  is_public: z.boolean().default(false),
  usage_count: z.number().default(0),
  last_used_at: z.string().nullable(),
  thumbnail_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ContentTemplate = z.infer<typeof ContentTemplateSchema>;
