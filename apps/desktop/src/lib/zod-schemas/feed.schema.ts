import { z } from "zod";
import { StreamConfigSchema } from "./stream-config.schema";

// Feed Schema
export const FeedSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  name: z.string().min(1).max(50),
  description: z.string().nullable(),
  icon: z.string().nullable(), // emoji or icon name
  is_default: z.boolean().default(false),
  streams: z.array(StreamConfigSchema),
  settings: z
    .object({
      auto_refresh_interval: z.number().default(30), // seconds
      compact_view: z.boolean().default(false),
    })
    .default({
      auto_refresh_interval: 30,
      compact_view: false,
    }),
  last_viewed_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Feed = z.infer<typeof FeedSchema>;
