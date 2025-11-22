/**
 * Publish Orchestrator
 *
 * Main orchestration function that receives a publish request and fans out
 * to individual platform publishers.
 */

import { inngest } from '../../client';
import { EVENT_NAMES, FUNCTION_IDS, PLATFORM_EVENTS } from '../../constants';
import { createSupabaseAdapter } from '../../adapters';
import { OrchestratorEventSchema } from '../../types';

/**
 * Publish orchestrator Inngest function
 *
 * This function:
 * 1. Receives a publish request for a post
 * 2. Fetches the post and determines target platforms
 * 3. Creates publication records for each platform
 * 4. Fans out publish events to platform-specific publishers
 * 5. Waits for all publications to complete
 * 6. Updates final post status
 */
export const publishOrchestrator = inngest.createFunction(
  {
    id: FUNCTION_IDS.ORCHESTRATOR.PUBLISH_ORCHESTRATOR,
    name: 'Publish Orchestrator',
    concurrency: [
      {
        key: 'event.data.postId',
        limit: 1, // One orchestration per post at a time
      },
    ],
  },
  { event: EVENT_NAMES.ORCHESTRATOR.PUBLISH_REQUESTED },
  async ({ event, step }) => {
    const eventData = OrchestratorEventSchema.parse(event.data);
    const db = createSupabaseAdapter();

    // Step 1: Fetch post data
    const post = await step.run('fetch-post', async () => {
      const postData = await db.getPost(eventData.postId, eventData.workspaceId);
      if (!postData) {
        throw new Error(`Post ${eventData.postId} not found`);
      }
      return postData;
    });

    // Step 2: Get social accounts for the requested platforms
    const socialAccounts = await step.run('fetch-social-accounts', async () => {
      // This would need to be implemented in the adapter
      // For now, we'll assume the platforms are passed with account IDs
      return eventData.platforms;
    });

    // Step 3: Create publication records for each platform
    const publications = await step.run('create-publications', async () => {
      const created = [];

      for (const platform of eventData.platforms) {
        // In a real implementation, we would:
        // 1. Look up the social account for this platform and workspace
        // 2. Create a publication record
        // For demonstration, we're simplifying this

        const publication = await db.createPublication({
          post_id: eventData.postId,
          workspace_id: eventData.workspaceId,
          social_account_id: 'placeholder', // Would be looked up
          platform,
          status: 'pending',
        });

        created.push(publication);
      }

      return created;
    });

    // Step 4: Fan out to platform publishers
    await step.run('fanout-to-publishers', async () => {
      for (const publication of publications) {
        const platformEvents = PLATFORM_EVENTS[publication.platform.toUpperCase() as keyof typeof PLATFORM_EVENTS];

        if (platformEvents) {
          await step.sendEvent(`publish-${publication.platform}-${publication.id}`, {
            name: platformEvents.PUBLISH_REQUESTED,
            data: {
              publicationId: publication.id,
              postId: eventData.postId,
              workspaceId: eventData.workspaceId,
              userId: eventData.userId,
              platform: publication.platform,
              socialAccountId: publication.social_account_id,
            },
          });
        }
      }
    });

    // Step 5: Wait for all publications to complete (success or failure)
    const results = await step.run('wait-for-completions', async () => {
      // In a real implementation, we would wait for success/failure events
      // from each platform publisher using step.waitForEvent
      // For now, we'll return placeholder results
      return publications.map(p => ({ publicationId: p.id, success: true }));
    });

    // Step 6: Update post status based on results
    await step.run('update-post-status', async () => {
      const allSucceeded = results.every(r => r.success);
      const anySucceeded = results.some(r => r.success);

      if (allSucceeded) {
        await db.updatePostStatus(eventData.postId, 'published', new Date().toISOString());
      } else if (anySucceeded) {
        // Partial success - keep as publishing
        await db.updatePostStatus(eventData.postId, 'publishing');
      } else {
        await db.updatePostStatus(eventData.postId, 'failed');
      }
    });

    // Step 7: Send completion event
    await step.sendEvent('orchestrator-complete', {
      name: EVENT_NAMES.ORCHESTRATOR.PUBLISH_COMPLETED,
      data: {
        postId: eventData.postId,
        workspaceId: eventData.workspaceId,
        userId: eventData.userId,
        platforms: eventData.platforms,
        results,
      },
    });

    return {
      postId: eventData.postId,
      platforms: eventData.platforms,
      results,
    };
  }
);
