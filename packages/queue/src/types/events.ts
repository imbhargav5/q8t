/**
 * Event payload types for Inngest functions
 */

import { z } from 'zod';
import { PLATFORMS } from '../constants';

/**
 * Base event payload for all publishing events
 */
export const BasePublishEventSchema = z.object({
  postId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  userId: z.string().uuid(),
});

export type BasePublishEvent = z.infer<typeof BasePublishEventSchema>;

/**
 * Platform-specific publish event payload
 */
export const PlatformPublishEventSchema = BasePublishEventSchema.extend({
  platform: z.enum([
    PLATFORMS.LINKEDIN,
    PLATFORMS.REDDIT,
    PLATFORMS.X,
    PLATFORMS.INSTAGRAM,
    PLATFORMS.THREADS,
    PLATFORMS.FACEBOOK,
    PLATFORMS.BLUESKY,
    PLATFORMS.PINTEREST,
    PLATFORMS.YOUTUBE,
    PLATFORMS.TIKTOK,
    PLATFORMS.FARCASTER,
    PLATFORMS.NOSTR,
    PLATFORMS.DISCORD,
    PLATFORMS.SLACK,
    PLATFORMS.TELEGRAM,
    PLATFORMS.WHATSAPP,
  ] as const),
  socialAccountId: z.string().uuid(),
  publicationId: z.string().uuid(),
});

export type PlatformPublishEvent = z.infer<typeof PlatformPublishEventSchema>;

/**
 * Orchestrator event payload
 */
export const OrchestratorEventSchema = BasePublishEventSchema.extend({
  platforms: z.array(
    z.enum([
      PLATFORMS.LINKEDIN,
      PLATFORMS.REDDIT,
      PLATFORMS.X,
      PLATFORMS.INSTAGRAM,
      PLATFORMS.THREADS,
      PLATFORMS.FACEBOOK,
      PLATFORMS.BLUESKY,
      PLATFORMS.PINTEREST,
      PLATFORMS.YOUTUBE,
      PLATFORMS.TIKTOK,
      PLATFORMS.FARCASTER,
      PLATFORMS.NOSTR,
      PLATFORMS.DISCORD,
      PLATFORMS.SLACK,
      PLATFORMS.TELEGRAM,
      PLATFORMS.WHATSAPP,
    ] as const)
  ),
  scheduledFor: z.string().datetime().optional(),
});

export type OrchestratorEvent = z.infer<typeof OrchestratorEventSchema>;

/**
 * Platform publish success event
 */
export const PlatformPublishSuccessEventSchema = z.object({
  publicationId: z.string().uuid(),
  postId: z.string().uuid(),
  platform: z.string(),
  platformPostId: z.string(),
  platformPostUrl: z.string().url().optional(),
});

export type PlatformPublishSuccessEvent = z.infer<typeof PlatformPublishSuccessEventSchema>;

/**
 * Platform publish failed event
 */
export const PlatformPublishFailedEventSchema = z.object({
  publicationId: z.string().uuid(),
  postId: z.string().uuid(),
  platform: z.string(),
  error: z.string(),
  retryable: z.boolean(),
});

export type PlatformPublishFailedEvent = z.infer<typeof PlatformPublishFailedEventSchema>;

/**
 * Scheduled posts fanout event
 */
export const ScheduledPostsFanoutEventSchema = z.object({
  foundDraftsCount: z.number(),
  currentMinuteIso: z.string().datetime(),
});

export type ScheduledPostsFanoutEvent = z.infer<typeof ScheduledPostsFanoutEventSchema>;

/**
 * Repurpose slots fanout event
 */
export const RepurposeSlotsFanoutEventSchema = z.object({
  foundSlotsCount: z.number(),
  utcTimeOfDay: z.string(),
  utcDayOfWeek: z.enum(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']),
});

export type RepurposeSlotsFanoutEvent = z.infer<typeof RepurposeSlotsFanoutEventSchema>;
