/**
 * Inngest client setup
 *
 * This client is used by all queue functions to interact with Inngest
 */

import { Inngest } from 'inngest';

/**
 * Create a typed Inngest client for the queue system
 */
export const inngest = new Inngest({
  id: 'q8t-queue',
  name: 'Q8T Publishing Queue',
});
