/**
 * Event names for the queue system
 *
 * All event names follow the pattern: <domain>/<entity>.<action>.<status>
 * This provides a clear, hierarchical naming convention for all events.
 */

import { PLATFORMS } from './platforms';

/**
 * Scheduler events - for cron jobs and scheduled post management
 */
export const SCHEDULER_EVENTS = {
  /** Request to check for scheduled posts */
  CHECK_SCHEDULED_POSTS: 'scheduler/posts.check.requested',
  /** Scheduled posts were found */
  SCHEDULED_POSTS_FOUND: 'scheduler/posts.found',
  /** Request to check for repurpose slots */
  CHECK_REPURPOSE_SLOTS: 'scheduler/slots.check.requested',
  /** Repurpose slots were found */
  REPURPOSE_SLOTS_FOUND: 'scheduler/slots.found',
} as const;

/**
 * Orchestrator events - for managing multi-platform publishing
 */
export const ORCHESTRATOR_EVENTS = {
  /** Request to publish a post to platforms */
  PUBLISH_REQUESTED: 'orchestrator/publish.requested',
  /** Publishing has started */
  PUBLISH_STARTED: 'orchestrator/publish.started',
  /** Publishing completed successfully */
  PUBLISH_COMPLETED: 'orchestrator/publish.completed',
  /** Publishing failed */
  PUBLISH_FAILED: 'orchestrator/publish.failed',
} as const;

/**
 * Platform-specific publish events
 * Generates events for each platform: <platform>/post.publish.(requested|success|failed)
 */
const createPlatformEvents = (platform: string) => ({
  PUBLISH_REQUESTED: `${platform}/post.publish.requested` as const,
  PUBLISH_SUCCESS: `${platform}/post.publish.success` as const,
  PUBLISH_FAILED: `${platform}/post.publish.failed` as const,
});

/**
 * All platform-specific events
 */
export const PLATFORM_EVENTS = {
  LINKEDIN: createPlatformEvents(PLATFORMS.LINKEDIN),
  REDDIT: createPlatformEvents(PLATFORMS.REDDIT),
  X: createPlatformEvents(PLATFORMS.X),
  INSTAGRAM: createPlatformEvents(PLATFORMS.INSTAGRAM),
  THREADS: createPlatformEvents(PLATFORMS.THREADS),
  FACEBOOK: createPlatformEvents(PLATFORMS.FACEBOOK),
  BLUESKY: createPlatformEvents(PLATFORMS.BLUESKY),
  PINTEREST: createPlatformEvents(PLATFORMS.PINTEREST),
  YOUTUBE: createPlatformEvents(PLATFORMS.YOUTUBE),
  TIKTOK: createPlatformEvents(PLATFORMS.TIKTOK),
  FARCASTER: createPlatformEvents(PLATFORMS.FARCASTER),
  NOSTR: createPlatformEvents(PLATFORMS.NOSTR),
  DISCORD: createPlatformEvents(PLATFORMS.DISCORD),
  SLACK: createPlatformEvents(PLATFORMS.SLACK),
  TELEGRAM: createPlatformEvents(PLATFORMS.TELEGRAM),
  WHATSAPP: createPlatformEvents(PLATFORMS.WHATSAPP),
} as const;

/**
 * All event names consolidated
 */
export const EVENT_NAMES = {
  SCHEDULER: SCHEDULER_EVENTS,
  ORCHESTRATOR: ORCHESTRATOR_EVENTS,
  PLATFORMS: PLATFORM_EVENTS,
} as const;
