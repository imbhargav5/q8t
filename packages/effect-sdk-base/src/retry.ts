/**
 * Retry policies and utilities for Effect-based SDKs
 * Following effect.website patterns
 */

import { Schedule, Duration } from "effect"

/**
 * Default retry policy for transient failures
 * Exponential backoff with max 5 retries
 */
export const defaultRetryPolicy = Schedule.exponential(Duration.millis(100)).pipe(
  Schedule.union(Schedule.spaced(Duration.seconds(1))),
  Schedule.upTo(Duration.seconds(30)),
  Schedule.compose(Schedule.recurs(5))
)

/**
 * Aggressive retry policy for critical operations
 * Exponential backoff with max 10 retries
 */
export const aggressiveRetryPolicy = Schedule.exponential(Duration.millis(50)).pipe(
  Schedule.union(Schedule.spaced(Duration.millis(500))),
  Schedule.upTo(Duration.minutes(2)),
  Schedule.compose(Schedule.recurs(10))
)

/**
 * Conservative retry policy for rate-limited endpoints
 * Linear backoff with max 3 retries
 */
export const conservativeRetryPolicy = Schedule.spaced(Duration.seconds(2)).pipe(
  Schedule.upTo(Duration.seconds(30)),
  Schedule.compose(Schedule.recurs(3))
)

/**
 * Retry policy for OAuth token refresh
 * Quick retries for transient auth failures
 */
export const oauthRetryPolicy = Schedule.exponential(Duration.millis(100)).pipe(
  Schedule.union(Schedule.spaced(Duration.millis(500))),
  Schedule.upTo(Duration.seconds(10)),
  Schedule.compose(Schedule.recurs(3))
)

/**
 * No retry policy (immediate failure)
 */
export const noRetryPolicy = Schedule.once
