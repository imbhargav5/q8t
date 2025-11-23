/**
 * Inngest client setup
 *
 * This client is used by all listening functions to interact with Inngest
 */

import { Inngest } from 'inngest';

/**
 * Create a typed Inngest client for the listening system
 */
export const inngest = new Inngest({
  id: 'q8t-listening',
  name: 'Q8T Social Media Listening',
});
