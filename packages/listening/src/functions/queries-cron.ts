/**
 * Listening Queries Cron Job
 *
 * Periodically checks for active listening queries and triggers processing
 * Runs every 15 minutes by default (configurable per query)
 */

import { inngest } from '../client';
import { EVENT_NAMES, FUNCTION_IDS } from '../constants';
import { createSupabaseAdapter } from '../adapters';

/**
 * Cron job to check active listening queries
 *
 * This function:
 * 1. Runs every 15 minutes
 * 2. Fetches all active listening queries
 * 3. Filters queries that need to be refreshed based on their refresh_interval_minutes
 * 4. Fans out to individual query processors
 */
export const listeningQueriesCron = inngest.createFunction(
  {
    id: FUNCTION_IDS.LISTENING.QUERIES_CRON,
    name: 'Listening Queries Cron',
  },
  { cron: '*/15 * * * *' }, // Every 15 minutes
  async ({ step }) => {
    const db = createSupabaseAdapter();

    // Step 1: Fetch all active listening queries
    const queries = await step.run('fetch-active-queries', async () => {
      const activeQueries = await db.getActiveListeningQueries();
      return activeQueries;
    });

    if (!queries || queries.length === 0) {
      return {
        message: 'No active listening queries found',
        count: 0,
      };
    }

    // Step 2: Filter queries that need refreshing
    const queriesToProcess = await step.run('filter-queries-to-process', async () => {
      const now = new Date();
      return queries.filter((query: any) => {
        // If auto_refresh is disabled, skip
        if (!query.auto_refresh) return false;

        // If never refreshed, process it
        if (!query.last_refreshed_at) return true;

        // Check if enough time has passed since last refresh
        const lastRefresh = new Date(query.last_refreshed_at);
        const refreshIntervalMs = (query.refresh_interval_minutes || 15) * 60 * 1000;
        const timeSinceLastRefresh = now.getTime() - lastRefresh.getTime();

        return timeSinceLastRefresh >= refreshIntervalMs;
      });
    });

    if (queriesToProcess.length === 0) {
      return {
        message: 'All queries are up to date',
        totalQueries: queries.length,
        processedCount: 0,
      };
    }

    // Step 3: Fan out to individual query processors
    await step.run('fanout-to-processors', async () => {
      for (const query of queriesToProcess) {
        await step.sendEvent(`process-query-${query.id}`, {
          name: EVENT_NAMES.LISTENING.PROCESS_QUERY,
          data: {
            queryId: query.id,
            workspaceId: query.workspace_id,
            queryName: query.name,
          },
        });
      }
    });

    return {
      message: 'Listening queries processing initiated',
      totalQueries: queries.length,
      processedCount: queriesToProcess.length,
      queries: queriesToProcess.map((q: any) => ({
        id: q.id,
        name: q.name,
        queryType: q.query_type,
      })),
    };
  }
);
