/**
 * LinkedIn Publisher
 *
 * Handles publishing posts to LinkedIn with multi-part media upload support.
 * LinkedIn requires registering uploads, uploading in chunks, then creating the post.
 */

import { inngest } from '../../client';
import { EVENT_NAMES, FUNCTION_IDS, PLATFORMS } from '../../constants';
import { BasePublisher, type PublishResult } from './base-publisher';
import { MediaProcessor } from '../../utils/media-processor';
import { PlatformPublishEventSchema } from '../../types';
import { NetworkError, PlatformError } from '../../utils/errors';

/**
 * LinkedIn publisher implementation
 */
class LinkedInPublisherClass extends BasePublisher {
  protected platformName = PLATFORMS.LINKEDIN as const;

  async publish(context: PublishResult): Promise<PublishResult> {
    try {
      const { post, socialAccount, media } = context as any;
      const credentials = this.getCredentials(socialAccount);

      // Initialize LinkedIn SDK
      const { LinkedInApi } = await import('@q8t/linkedin-sdk');
      const client = new LinkedInApi(/* Initialize with credentials */);

      // Upload media if present
      const mediaAssetUrns: string[] = [];

      if (media.length > 0) {
        const preparedMedia = await this.prepareMedia(media);

        for (const { buffer, asset } of preparedMedia) {
          // LinkedIn multi-part upload flow:
          // 1. Register upload
          // 2. Upload in chunks
          // 3. Finalize upload

          const registerResponse = await client.registerUpload({
            owner: `urn:li:person:${credentials.platformUserId}`,
            recipes: asset.type === 'video'
              ? ['urn:li:digitalmediaRecipe:feedshare-video']
              : ['urn:li:digitalmediaRecipe:feedshare-image'],
          });

          // Upload in chunks
          const chunkSize = MediaProcessor.getChunkSize(this.platformName);
          let uploadedBytes = 0;

          for await (const { chunk } of MediaProcessor.chunkFile(buffer, chunkSize)) {
            await client.uploadMediaChunk(
              registerResponse.uploadUrl,
              chunk,
              uploadedBytes,
              buffer.length
            );
            uploadedBytes += chunk.length;
          }

          // Finalize upload
          await client.finalizeUpload(registerResponse.assetId);

          mediaAssetUrns.push(registerResponse.assetId);
        }
      }

      // Create LinkedIn post
      const result = await client.createPost({
        author: `urn:li:person:${credentials.platformUserId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: post.body || '',
            },
            shareMediaCategory: media.length > 0
              ? (media[0].type === 'video' ? 'VIDEO' : 'IMAGE')
              : 'NONE',
            media: mediaAssetUrns.map((urn, index) => ({
              status: 'READY',
              media: urn,
              description: {
                text: media[index]?.alt_text || '',
              },
            })),
          },
        },
      });

      return {
        success: true,
        platformPostId: result.id,
        platformPostUrl: result.url || undefined,
        metadata: { mediaCount: mediaAssetUrns.length },
      };
    } catch (error) {
      return this.handleError(error as Error);
    }
  }
}

/**
 * LinkedIn publisher Inngest function
 */
export const linkedinPublisher = inngest.createFunction(
  {
    id: FUNCTION_IDS.PUBLISHERS.LINKEDIN,
    name: 'LinkedIn Publisher',
    concurrency: [
      {
        key: 'event.data.socialAccountId',
        limit: 1, // One post per account at a time
      },
    ],
  },
  { event: EVENT_NAMES.PLATFORMS.LINKEDIN.PUBLISH_REQUESTED },
  async ({ event, step }) => {
    const eventData = PlatformPublishEventSchema.parse(event.data);
    const publisher = new LinkedInPublisherClass();

    // Step 1: Fetch data
    const context = await step.run('fetch-data', async () => {
      return await publisher.fetchPublishContext(
        eventData.publicationId,
        eventData.postId,
        eventData.workspaceId
      );
    });

    // Step 2: Update status to publishing
    await step.run('update-status-publishing', async () => {
      await publisher.updatePublicationStatus(eventData.publicationId, 'publishing');
    });

    // Step 3: Publish to LinkedIn
    const result = await step.run('publish-to-linkedin', async () => {
      return await publisher.publish(context as any);
    });

    // Step 4: Update final status
    await step.run('update-final-status', async () => {
      if (result.success) {
        await publisher.updatePublicationStatus(eventData.publicationId, 'published', {
          platformPostId: result.platformPostId,
          platformPostUrl: result.platformPostUrl,
        });

        // Send success event
        await step.sendEvent('publish-success', {
          name: EVENT_NAMES.PLATFORMS.LINKEDIN.PUBLISH_SUCCESS,
          data: {
            publicationId: eventData.publicationId,
            postId: eventData.postId,
            platform: PLATFORMS.LINKEDIN,
            platformPostId: result.platformPostId!,
            platformPostUrl: result.platformPostUrl,
          },
        });
      } else {
        await publisher.updatePublicationStatus(eventData.publicationId, 'failed', {
          errorMessage: result.error,
        });

        // Send failed event
        await step.sendEvent('publish-failed', {
          name: EVENT_NAMES.PLATFORMS.LINKEDIN.PUBLISH_FAILED,
          data: {
            publicationId: eventData.publicationId,
            postId: eventData.postId,
            platform: PLATFORMS.LINKEDIN,
            error: result.error!,
            retryable: result.metadata?.retryable ?? false,
          },
        });
      }
    });

    return result;
  }
);
