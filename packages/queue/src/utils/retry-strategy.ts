/**
 * Retry strategy utilities
 *
 * Provides retry logic with exponential backoff and configurable delays
 */

import { RateLimitError, NetworkError } from './errors';

/**
 * Retry configuration
 */
export interface RetryConfig {
  /** Maximum number of retry attempts */
  maxAttempts: number;
  /** Initial delay in milliseconds */
  initialDelayMs: number;
  /** Maximum delay in milliseconds */
  maxDelayMs: number;
  /** Multiplier for exponential backoff */
  backoffMultiplier: number;
}

/**
 * Default retry configuration for network errors
 */
export const DEFAULT_NETWORK_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 4,
  initialDelayMs: 2000, // 2 seconds
  maxDelayMs: 16000, // 16 seconds
  backoffMultiplier: 2,
};

/**
 * Default retry configuration for rate limits
 */
export const DEFAULT_RATE_LIMIT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  initialDelayMs: 60000, // 1 minute
  maxDelayMs: 300000, // 5 minutes
  backoffMultiplier: 2,
};

/**
 * Calculate delay for next retry using exponential backoff
 */
export function calculateBackoffDelay(
  attempt: number,
  config: RetryConfig
): number {
  const delay = config.initialDelayMs * Math.pow(config.backoffMultiplier, attempt);
  return Math.min(delay, config.maxDelayMs);
}

/**
 * Sleep for a specified duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  config: RetryConfig = DEFAULT_NETWORK_RETRY_CONFIG,
  shouldRetry: (error: Error) => boolean = () => true
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < config.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Check if we should retry this error
      if (!shouldRetry(lastError)) {
        throw lastError;
      }

      // Don't sleep after the last attempt
      if (attempt < config.maxAttempts - 1) {
        const delay = calculateBackoffDelay(attempt, config);
        await sleep(delay);
      }
    }
  }

  throw lastError!;
}

/**
 * Check if an error is retryable
 */
export function isRetryableError(error: Error): boolean {
  if (error instanceof NetworkError) {
    return error.retryable;
  }

  if (error instanceof RateLimitError) {
    return error.retryable;
  }

  // Check for common network error messages
  const networkErrorMessages = [
    'ECONNRESET',
    'ETIMEDOUT',
    'ENOTFOUND',
    'ECONNREFUSED',
    'ENETUNREACH',
    'EAI_AGAIN',
  ];

  return networkErrorMessages.some(msg => error.message.includes(msg));
}

/**
 * Get retry delay from rate limit error
 */
export function getRateLimitDelay(error: RateLimitError): number {
  if (error.retryAfterSeconds) {
    return error.retryAfterSeconds * 1000;
  }

  return DEFAULT_RATE_LIMIT_RETRY_CONFIG.initialDelayMs;
}
