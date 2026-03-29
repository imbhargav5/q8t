import { z } from "zod";

export const MediaFolderSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  name: z.string(),
  parent_folder_id: z.string().nullable(),
  color: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const MediaTagSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  name: z.string(),
  color: z.string(),
  created_at: z.string(),
});

export const MediaLibraryItemSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  folder_id: z.string().nullable(),
  type: z.enum(["image", "video", "gif"]),
  url: z.string(),
  thumbnail_url: z.string().nullable(),
  filename: z.string(),
  mime_type: z.string(),
  size_bytes: z.number(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  duration: z.number().nullable(), // for videos
  alt_text: z.string().nullable(),
  description: z.string().nullable(),
  tags: z.array(z.string()),
  usage_count: z.number().default(0),
  last_used_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type MediaFolder = z.infer<typeof MediaFolderSchema>;
export type MediaTag = z.infer<typeof MediaTagSchema>;
export type MediaLibraryItem = z.infer<typeof MediaLibraryItemSchema>;
