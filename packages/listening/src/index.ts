/**
 * Q8T Listening Package
 *
 * Social media listening and monitoring system powered by Inngest
 */

// Export Inngest client
export { inngest } from './client';

// Export constants
export * from './constants';

// Export types
export * from './types';

// Export utilities
export * from './utils';

// Export adapters
export * from './adapters';

// Export functions
export * from './functions';

// Collect all functions for registration
import {
  listeningQueriesCron,
  processListeningQuery,
  analyzeSentiment,
  checkAlerts,
} from './functions';

/**
 * All listening functions that should be registered with Inngest
 */
export const allListeningFunctions = [
  listeningQueriesCron,
  processListeningQuery,
  analyzeSentiment,
  checkAlerts,
];
