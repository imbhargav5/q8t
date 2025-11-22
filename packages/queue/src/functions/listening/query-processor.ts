/**
 * Listening Query Processor
 *
 * Processes a single listening query by fetching social media posts
 * that match the query configuration
 */

import { inngest } from '../../client';
import { EVENT_NAMES, FUNCTION_IDS } from '../../constants';
import { createSupabaseAdapter } from '../../adapters';
import { ListeningQueryProcessEventSchema } from '../../types';

/**
 * Process a listening query
 *
 * This function:
 * 1. Fetches the query configuration
 * 2. Calls appropriate social media APIs based on platforms
 * 3. Filters and processes results
 * 4. Saves new mentions to the database
 * 5. Triggers sentiment analysis and alert checks
 */
export const processListeningQuery = inngest.createFunction(
  {
    id: FUNCTION_IDS.LISTENING.PROCESS_QUERY,
    name: 'Process Listening Query',
    concurrency: [
      {
        key: 'event.data.queryId',
        limit: 1, // One processor per query at a time
      },
    ],
  },
  { event: EVENT_NAMES.LISTENING.PROCESS_QUERY },
  async ({ event, step }) => {
    const eventData = ListeningQueryProcessEventSchema.parse(event.data);
    const db = createSupabaseAdapter();

    // Step 1: Fetch query configuration
    const query = await step.run('fetch-query-config', async () => {
      const queryData = await db.getListeningQuery(eventData.queryId);
      if (!queryData) {
        throw new Error(`Listening query ${eventData.queryId} not found`);
      }
      return queryData;
    });

    // Step 2: Determine platforms to search
    const platforms = await step.run('determine-platforms', async () => {
      const platformsToSearch = query.platforms || [];
      const excludedPlatforms = query.excluded_platforms || [];

      // Filter out excluded platforms
      return platformsToSearch.filter((p: string) => !excludedPlatforms.includes(p));
    });

    if (platforms.length === 0) {
      return {
        queryId: eventData.queryId,
        message: 'No platforms to search',
        mentionsFound: 0,
      };
    }

    // Step 3: Build search configuration
    const searchConfig = await step.run('build-search-config', async () => {
      return {
        keywords: query.keywords || [],
        hashtags: query.hashtags || [],
        mentions: query.mentions || [],
        booleanQuery: query.boolean_query,
        // Filters
        minFollowerCount: query.min_follower_count,
        verifiedOnly: query.verified_only,
        includeMediaOnly: query.include_media_only,
        includeLinksOnly: query.include_links_only,
        minEngagement: query.min_engagement,
        sentimentFilter: query.sentiment_filter,
        // Language and location
        languages: query.languages || [],
        countries: query.countries || [],
        // Settings
        caseSensitive: query.case_sensitive,
        wholeWordMatch: query.whole_word_match,
        includeRetweets: query.include_retweets,
        includeReplies: query.include_replies,
      };
    });

    // Step 4: Fetch mentions from social media platforms
    const allMentions = await step.run('fetch-social-media-mentions', async () => {
      const mentions: any[] = [];

      // For now, we'll create a placeholder for fetching from actual APIs
      // In a real implementation, you would call the appropriate API for each platform
      // For example:
      // - Twitter API v2 for Twitter
      // - Instagram Graph API for Instagram
      // - LinkedIn API for LinkedIn
      // etc.

      // TODO: Implement actual API calls
      // This is a placeholder that would be replaced with real API integrations

      console.log(`Would fetch from platforms: ${platforms.join(', ')}`);
      console.log(`Search config:`, searchConfig);

      // Placeholder: In production, this would make actual API calls
      // const twitterMentions = await fetchFromTwitter(searchConfig);
      // const instagramMentions = await fetchFromInstagram(searchConfig);
      // mentions.push(...twitterMentions, ...instagramMentions);

      return mentions;
    });

    // Step 5: Filter out duplicates
    const newMentions = await step.run('filter-duplicates', async () => {
      const filtered: any[] = [];

      for (const mention of allMentions) {
        const exists = await db.mentionExists(
          eventData.workspaceId,
          mention.platform,
          mention.platform_post_id,
          eventData.queryId
        );

        if (!exists) {
          filtered.push({
            workspace_id: eventData.workspaceId,
            query_id: eventData.queryId,
            ...mention,
            captured_at: new Date().toISOString(),
            sentiment: 'unclassified', // Will be analyzed later
          });
        }
      }

      return filtered;
    });

    // Step 6: Save new mentions to database
    let savedMentions: any[] = [];
    if (newMentions.length > 0) {
      savedMentions = await step.run('save-mentions', async () => {
        return await db.createListeningMentions(newMentions);
      });

      // Step 7: Trigger sentiment analysis
      await step.sendEvent('trigger-sentiment-analysis', {
        name: EVENT_NAMES.LISTENING.ANALYZE_SENTIMENT,
        data: {
          mentionIds: savedMentions.map((m: any) => m.id),
          batchSize: 10,
        },
      });

      // Step 8: Send mentions found event
      await step.sendEvent('mentions-found', {
        name: EVENT_NAMES.LISTENING.MENTIONS_FOUND,
        data: {
          queryId: eventData.queryId,
          workspaceId: eventData.workspaceId,
          mentionIds: savedMentions.map((m: any) => m.id),
          mentionCount: savedMentions.length,
        },
      });
    }

    // Step 9: Update query stats
    await step.run('update-query-stats', async () => {
      // Calculate stats for last 24h and 7d
      const now = new Date();
      const mentions24h = await db.getMentionsInTimeWindow(eventData.queryId, 24 * 60);
      const mentions7d = await db.getMentionsInTimeWindow(eventData.queryId, 7 * 24 * 60);

      await db.updateQueryStats(eventData.queryId, {
        mention_count_24h: mentions24h.length,
        mention_count_7d: mentions7d.length,
        last_mention_at: savedMentions.length > 0 ? now.toISOString() : undefined,
      });
    });

    // Step 10: Trigger alert checks if enabled
    if (query.alerts_enabled && savedMentions.length > 0) {
      await step.sendEvent('trigger-alert-check', {
        name: EVENT_NAMES.LISTENING.CHECK_ALERTS,
        data: {
          queryId: eventData.queryId,
          workspaceId: eventData.workspaceId,
          checkType: 'volume_threshold',
        },
      });
    }

    return {
      queryId: eventData.queryId,
      queryName: query.name,
      platformsSearched: platforms,
      mentionsFound: savedMentions.length,
      totalMentionsProcessed: allMentions.length,
      duplicatesFiltered: allMentions.length - savedMentions.length,
    };
  }
);
