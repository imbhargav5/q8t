/**
 * @q8t/queue
 *
 * SDK-agnostic publishing queue system for Q8T
 *
 * This package provides a comprehensive Inngest-based queue system for publishing
 * content to multiple social media platforms with support for:
 * - 17 different platforms (LinkedIn, Reddit, X, Instagram, YouTube, etc.)
 * - Multiple upload patterns (direct, multi-part, container, async, relay)
 * - Image and video support with validation
 * - Chunked uploads for large files
 * - Retry strategies with exponential backoff
 * - Comprehensive error handling
 *
 * @example
 * ```typescript
 * import { inngest, publishOrchestrator, linkedinPublisher } from '@q8t/queue';
 *
 * // Export functions for Inngest to discover
 * export const functions = [publishOrchestrator, linkedinPublisher];
 * ```
 */

// Core
export { inngest } from './client';

// Constants
export * from './constants';

// Types
export * from './types';

// Utilities
export * from './utils';

// Adapters
export * from './adapters';

// Functions
export * from './functions';

/**
 * All Inngest functions for registration
 *
 * Import this array to register all queue functions with Inngest
 */
import { publishOrchestrator } from './functions/orchestrator';
import { linkedinPublisher } from './functions/publishers/linkedin-publisher';
import { redditPublisher } from './functions/publishers/reddit-publisher';

export const allFunctions = [
  publishOrchestrator,
  linkedinPublisher,
  redditPublisher,
  // Additional publishers would be added here as they're implemented
];
