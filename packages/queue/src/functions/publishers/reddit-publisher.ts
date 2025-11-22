/**
 * Reddit Publisher
 *
 * Handles publishing posts to Reddit (direct upload pattern)
 */

import { inngest } from '../../client';
import { EVENT_NAMES, FUNCTION_IDS, PLATFORMS } from '../../constants';
import { BasePublisher, type PublishResult } from './base-publisher';
import { PlatformPublishEventSchema } from '../../types';

/**
 * Reddit publisher implementation
 */
class RedditPublisherClass extends BasePublisher {
  protected platformName = PLATFORMS.REDDIT as const;

  async publish(context: any): Promise<PublishResult> {
    try {
      const { post, socialAccount, media } = context;
      const credentials = this.getCredentials(socialAccount);

      // Initialize Reddit SDK
      const { RedditApi } = await import('@q8t/reddit-sdk');
      const client = new RedditApi(/* Initialize with credentials */);

      // Determine post type based on media
      const hasMedia = media.length > 0;
      const isVideo = hasMedia && media[0].type === 'video';
      const isImage = hasMedia && media[0].type === 'image';

      // Extract subreddit from post metadata (or use default)
      const subreddit = post.metadata?.subreddit || 'test';

      let result;

      if (isImage) {
        // Submit image post
        result = await client.submitPost({
          sr: subreddit,
          kind: 'image',
          title: post.title || 'Untitled',
          url: media[0].url,
          text: post.body,
        });
      } else if (isVideo) {
        // Submit video post
        result = await client.submitPost({
          sr: subreddit,
          kind: 'videogif',
          title: post.title || 'Untitled',
          url: media[0].url,
          text: post.body,
        });
      } else {
        // Submit text post
        result = await client.submitPost({
          sr: subreddit,
          kind: 'self',
          title: post.title || 'Untitled',
          text: post.body || '',
        });
      }

      return {
        success: true,
        platformPostId: result.json?.data?.id,
        platformPostUrl: result.json?.data?.url,
      };
    } catch (error) {
      return this.handleError(error as Error);
    }
  }
}

/**
 * Reddit publisher Inngest function
 */
export const redditPublisher = inngest.createFunction(
  {
    id: FUNCTION_IDS.PUBLISHERS.REDDIT,
    name: 'Reddit Publisher',
    concurrency: [{ key: 'event.data.socialAccountId', limit: 1 }],
  },
  { event: EVENT_NAMES.PLATFORMS.REDDIT.PUBLISH_REQUESTED },
  async ({ event, step }) => {
    const eventData = PlatformPublishEventSchema.parse(event.data);
    const publisher = new RedditPublisherClass();

    const context = await step.run('fetch-data', async () => {
      return await publisher.fetchPublishContext(
        eventData.publicationId,
        eventData.postId,
        eventData.workspaceId
      );
    });

    await step.run('update-status-publishing', async () => {
      await publisher.updatePublicationStatus(eventData.publicationId, 'publishing');
    });

    const result = await step.run('publish-to-reddit', async () => {
      return await publisher.publish(context);
    });

    await step.run('update-final-status', async () => {
      if (result.success) {
        await publisher.updatePublicationStatus(eventData.publicationId, 'published', {
          platformPostId: result.platformPostId,
          platformPostUrl: result.platformPostUrl,
        });

        await step.sendEvent('publish-success', {
          name: EVENT_NAMES.PLATFORMS.REDDIT.PUBLISH_SUCCESS,
          data: {
            publicationId: eventData.publicationId,
            postId: eventData.postId,
            platform: PLATFORMS.REDDIT,
            platformPostId: result.platformPostId!,
            platformPostUrl: result.platformPostUrl,
          },
        });
      } else {
        await publisher.updatePublicationStatus(eventData.publicationId, 'failed', {
          errorMessage: result.error,
        });

        await step.sendEvent('publish-failed', {
          name: EVENT_NAMES.PLATFORMS.REDDIT.PUBLISH_FAILED,
          data: {
            publicationId: eventData.publicationId,
            postId: eventData.postId,
            platform: PLATFORMS.REDDIT,
            error: result.error!,
            retryable: result.metadata?.retryable ?? false,
          },
        });
      }
    });

    return result;
  }
);
