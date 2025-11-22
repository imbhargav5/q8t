/**
 * Base publisher class
 *
 * Provides common functionality for all platform publishers.
 * Each platform publisher should extend this class.
 */

import type { Platform } from '../../constants';
import type {
  Post,
  PostPublication,
  SocialAccount,
  MediaAssetDb,
  PublicationStatus,
} from '../../types';
import { createSupabaseAdapter, type SupabaseAdapter } from '../../adapters';
import { MediaProcessor } from '../../utils/media-processor';
import { PublishError } from '../../utils/errors';

/**
 * Result returned by a publisher
 */
export interface PublishResult {
  success: boolean;
  platformPostId?: string;
  platformPostUrl?: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Data provided to a publisher
 */
export interface PublishContext {
  post: Post;
  publication: PostPublication;
  socialAccount: SocialAccount;
  media: MediaAssetDb[];
  workspaceId: string;
}

/**
 * Base publisher abstract class
 */
export abstract class BasePublisher {
  protected abstract platformName: Platform;
  protected db: SupabaseAdapter;

  constructor() {
    this.db = createSupabaseAdapter();
  }

  /**
   * Main publish method - must be implemented by each platform
   */
  abstract publish(context: PublishContext): Promise<PublishResult>;

  /**
   * Fetch all required data for publishing
   */
  async fetchPublishContext(
    publicationId: string,
    postId: string,
    workspaceId: string
  ): Promise<PublishContext> {
    const [publication, postData] = await Promise.all([
      this.db.getPublication(publicationId),
      this.db.getPostWithRelations(postId, workspaceId),
    ]);

    if (!publication) {
      throw new Error(`Publication ${publicationId} not found`);
    }

    if (!postData) {
      throw new Error(`Post ${postId} not found`);
    }

    const socialAccount = await this.db.getSocialAccount(publication.social_account_id);

    if (!socialAccount) {
      throw new Error(`Social account ${publication.social_account_id} not found`);
    }

    return {
      post: postData.post,
      publication,
      socialAccount,
      media: postData.media,
      workspaceId,
    };
  }

  /**
   * Update publication status in database
   */
  async updatePublicationStatus(
    publicationId: string,
    status: PublicationStatus,
    metadata?: {
      platformPostId?: string;
      platformPostUrl?: string;
      errorMessage?: string;
    }
  ): Promise<void> {
    await this.db.updatePublicationStatus(publicationId, status, {
      platform_post_id: metadata?.platformPostId,
      platform_post_url: metadata?.platformPostUrl,
      error_message: metadata?.errorMessage,
      published_at: status === 'published' ? new Date().toISOString() : undefined,
    });
  }

  /**
   * Handle errors in a consistent way
   */
  protected handleError(error: Error): PublishResult {
    console.error(`[${this.platformName}] Publish error:`, error);

    return {
      success: false,
      error: error.message,
      metadata: error instanceof PublishError ? { code: error.code, retryable: error.retryable } : undefined,
    };
  }

  /**
   * Validate and prepare media for upload
   */
  protected async prepareMedia(media: MediaAssetDb[]): Promise<Array<{ buffer: Buffer; asset: MediaAssetDb }>> {
    const results = [];

    for (const asset of media) {
      const { buffer } = await MediaProcessor.prepareMedia(
        {
          id: asset.id,
          type: asset.type,
          url: asset.url,
          filename: asset.filename,
          mimeType: asset.mime_type,
          sizeBytes: asset.size_bytes,
          width: asset.width ?? undefined,
          height: asset.height ?? undefined,
          durationSeconds: asset.duration_seconds ?? undefined,
          altText: asset.alt_text ?? undefined,
        },
        this.platformName
      );

      results.push({ buffer, asset });
    }

    return results;
  }

  /**
   * Get platform credentials from social account
   */
  protected getCredentials(socialAccount: SocialAccount): {
    accessToken: string;
    refreshToken?: string;
    platformUserId: string;
  } {
    if (!socialAccount.access_token) {
      throw new Error('Social account is missing access token');
    }

    return {
      accessToken: socialAccount.access_token,
      refreshToken: socialAccount.refresh_token ?? undefined,
      platformUserId: socialAccount.platform_user_id,
    };
  }
}
