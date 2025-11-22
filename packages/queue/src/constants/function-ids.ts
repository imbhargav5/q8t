/**
 * Inngest function IDs
 *
 * Used for concurrency control, cancellation, and monitoring.
 * Each Inngest function must have a unique ID.
 */

import { PLATFORMS } from './platforms';

/**
 * Scheduler function IDs
 */
export const SCHEDULER_FUNCTION_IDS = {
  /** Cron job to check for scheduled posts */
  SCHEDULED_POSTS_CRON: 'scheduled-posts-cron',
  /** Fan out scheduled posts to publishers */
  SCHEDULED_POSTS_FANOUT: 'scheduled-posts-fanout',
  /** Cron job to check for repurpose slots */
  REPURPOSE_SLOTS_CRON: 'repurpose-slots-cron',
  /** Fan out repurpose slots to processors */
  REPURPOSE_SLOTS_FANOUT: 'repurpose-slots-fanout',
  /** Process a single repurpose slot */
  PROCESS_REPURPOSE_SLOT: 'process-repurpose-slot',
} as const;

/**
 * Listening function IDs
 */
export const LISTENING_FUNCTION_IDS = {
  /** Cron job to check active listening queries */
  QUERIES_CRON: 'listening-queries-cron',
  /** Process a single listening query */
  PROCESS_QUERY: 'listening-process-query',
  /** Analyze sentiment for mentions */
  ANALYZE_SENTIMENT: 'listening-analyze-sentiment',
  /** Check and trigger alerts */
  CHECK_ALERTS: 'listening-check-alerts',
  /** Update analytics for queries */
  UPDATE_ANALYTICS: 'listening-update-analytics',
} as const;

/**
 * Orchestrator function IDs
 */
export const ORCHESTRATOR_FUNCTION_IDS = {
  /** Main publish orchestrator */
  PUBLISH_ORCHESTRATOR: 'publish-orchestrator',
  /** Retry handler for failed publishes */
  RETRY_HANDLER: 'retry-handler',
} as const;

/**
 * Platform publisher function IDs
 */
export const PUBLISHER_FUNCTION_IDS = {
  LINKEDIN: `${PLATFORMS.LINKEDIN}-publisher`,
  REDDIT: `${PLATFORMS.REDDIT}-publisher`,
  X: `${PLATFORMS.X}-publisher`,
  INSTAGRAM: `${PLATFORMS.INSTAGRAM}-publisher`,
  THREADS: `${PLATFORMS.THREADS}-publisher`,
  FACEBOOK: `${PLATFORMS.FACEBOOK}-publisher`,
  BLUESKY: `${PLATFORMS.BLUESKY}-publisher`,
  PINTEREST: `${PLATFORMS.PINTEREST}-publisher`,
  YOUTUBE: `${PLATFORMS.YOUTUBE}-publisher`,
  TIKTOK: `${PLATFORMS.TIKTOK}-publisher`,
  FARCASTER: `${PLATFORMS.FARCASTER}-publisher`,
  NOSTR: `${PLATFORMS.NOSTR}-publisher`,
  DISCORD: `${PLATFORMS.DISCORD}-publisher`,
  SLACK: `${PLATFORMS.SLACK}-publisher`,
  TELEGRAM: `${PLATFORMS.TELEGRAM}-publisher`,
  WHATSAPP: `${PLATFORMS.WHATSAPP}-publisher`,
} as const;

/**
 * All function IDs consolidated
 */
export const FUNCTION_IDS = {
  SCHEDULER: SCHEDULER_FUNCTION_IDS,
  ORCHESTRATOR: ORCHESTRATOR_FUNCTION_IDS,
  PUBLISHERS: PUBLISHER_FUNCTION_IDS,
  LISTENING: LISTENING_FUNCTION_IDS,
} as const;
