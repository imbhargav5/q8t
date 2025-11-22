/**
 * Event names for the listening system
 *
 * All event names follow the pattern: <domain>/<entity>.<action>.<status>
 * This provides a clear, hierarchical naming convention for all events.
 */

/**
 * Listening events - for social media listening and monitoring
 */
export const LISTENING_EVENTS = {
  /** Request to check active listening queries */
  CHECK_QUERIES: 'listening/queries.check.requested',
  /** Active queries were found */
  QUERIES_FOUND: 'listening/queries.found',
  /** Request to process a listening query */
  PROCESS_QUERY: 'listening/query.process.requested',
  /** Query processing completed */
  QUERY_PROCESSED: 'listening/query.process.completed',
  /** Query processing failed */
  QUERY_FAILED: 'listening/query.process.failed',
  /** New mentions found */
  MENTIONS_FOUND: 'listening/mentions.found',
  /** Request to analyze sentiment */
  ANALYZE_SENTIMENT: 'listening/sentiment.analyze.requested',
  /** Sentiment analysis completed */
  SENTIMENT_ANALYZED: 'listening/sentiment.analyze.completed',
  /** Request to check alerts */
  CHECK_ALERTS: 'listening/alerts.check.requested',
  /** Alert triggered */
  ALERT_TRIGGERED: 'listening/alert.triggered',
  /** Request to update analytics */
  UPDATE_ANALYTICS: 'listening/analytics.update.requested',
  /** Analytics updated */
  ANALYTICS_UPDATED: 'listening/analytics.update.completed',
} as const;

/**
 * All event names consolidated
 */
export const EVENT_NAMES = {
  LISTENING: LISTENING_EVENTS,
} as const;
