import { z } from "zod";
import { SocialPlatformEnum } from "./enums.schema";
import { PostTypeEnum } from "./post.schema";

// Stream Type Enum
export const StreamTypeEnum = z.enum([
  "home",
  "mentions",
  "scheduled",
  "published",
  "drafts",
  "failed",
  "high_engagement",
  "low_engagement",
  "platform_specific",
  "hashtag_search",
]);

export type StreamType = z.infer<typeof StreamTypeEnum>;

// Stream Configuration Schema
export const StreamConfigSchema = z.object({
  id: z.string(),
  stream_type: StreamTypeEnum,
  label: z.string().nullable(), // Custom name override
  platform_filters: z.array(SocialPlatformEnum).default([]), // empty = all
  time_range: z.enum(["24h", "7d", "30d", "all"]).default("7d"),
  sort_order: z.enum(["newest", "oldest", "most_engaged"]).default("newest"),
  filters: z
    .object({
      content_types: z.array(PostTypeEnum).default([]),
      min_engagement: z.number().default(0),
      show_media_only: z.boolean().default(false),
      show_verified_only: z.boolean().default(false),
    })
    .default({
      content_types: [],
      min_engagement: 0,
      show_media_only: false,
      show_verified_only: false,
    }),
  order: z.number(), // Position in feed (0-indexed)
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type StreamConfig = z.infer<typeof StreamConfigSchema>;
