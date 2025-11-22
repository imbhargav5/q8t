/**
 * Inngest function IDs
 *
 * Used for concurrency control, cancellation, and monitoring.
 * Each Inngest function must have a unique ID.
 */

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
 * All function IDs consolidated
 */
export const FUNCTION_IDS = {
  LISTENING: LISTENING_FUNCTION_IDS,
} as const;
