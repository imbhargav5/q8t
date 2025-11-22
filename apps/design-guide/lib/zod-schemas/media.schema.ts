import { z } from "zod";
import { SocialPlatformEnum, MediaTypeEnum, MediaProcessingStatusEnum } from "./enums.schema";

// Media Attachment Schema
export const MediaAttachmentSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  message_id: z.string().uuid(),

  // Media identification
  platform: SocialPlatformEnum,
  platform_media_id: z.string().nullable(),

  // Media type and format
  media_type: MediaTypeEnum,
  mime_type: z.string().nullable(),
  file_extension: z.string().nullable(),

  // Original media URLs from platform
  original_url: z.string().url(),
  original_expires_at: z.string().datetime().nullable(),

  // Stored media in storage
  thumbnail_url: z.string().url().nullable(),
  thumbnail_storage_path: z.string().nullable(),

  // Processing status
  processing_status: MediaProcessingStatusEnum.default("pending"),
  processing_error: z.string().nullable(),
  processed_at: z.string().datetime().nullable(),

  // Media metadata
  file_size_bytes: z.number().int().nullable(),
  width: z.number().int().nullable(),
  height: z.number().int().nullable(),
  duration_seconds: z.number().int().nullable(),

  // Thumbnail metadata
  thumbnail_width: z.number().int().nullable(),
  thumbnail_height: z.number().int().nullable(),
  thumbnail_size_bytes: z.number().int().nullable(),

  // Alt text and descriptions
  alt_text: z.string().nullable(),
  caption: z.string().nullable(),

  // Platform-specific metadata
  metadata: z.record(z.unknown()).default({}),

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type MediaAttachment = z.infer<typeof MediaAttachmentSchema>;
