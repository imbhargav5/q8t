/**
 * Media processor utility
 *
 * Handles validation, downloading, and preparation of media for platform-specific uploads
 */

import { MEDIA_LIMITS, CHUNK_SIZES, DEFAULT_CHUNK_SIZE, type Platform } from '../constants';
import type { MediaAsset, MediaValidationResult } from '../types';
import { ValidationError } from './errors';

/**
 * Media processor utility class
 */
export class MediaProcessor {
  /**
   * Validate media against platform capabilities
   */
  static async validateMedia(
    media: MediaAsset,
    platform: Platform
  ): Promise<MediaValidationResult> {
    const limits = MEDIA_LIMITS[platform];
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!limits) {
      return { valid: true, errors: [], warnings: ['No limits defined for platform'] };
    }

    // Validate images
    if (media.type === 'image' && limits.image) {
      const sizeMB = media.sizeBytes / (1024 * 1024);

      // Check file size
      if (sizeMB > limits.image.maxSizeMB) {
        errors.push(`Image size ${sizeMB.toFixed(2)}MB exceeds ${limits.image.maxSizeMB}MB limit`);
      }

      // Check format
      const extension = media.mimeType.split('/')[1]?.toLowerCase();
      if (extension && !limits.image.formats.includes(extension)) {
        errors.push(`Format ${extension} not supported. Allowed: ${limits.image.formats.join(', ')}`);
      }

      // Check dimensions
      if (limits.image.minWidth && media.width && media.width < limits.image.minWidth) {
        errors.push(`Image width ${media.width}px is below minimum ${limits.image.minWidth}px`);
      }

      if (limits.image.maxWidth && media.width && media.width > limits.image.maxWidth) {
        errors.push(`Image width ${media.width}px exceeds maximum ${limits.image.maxWidth}px`);
      }
    }

    // Validate videos
    if (media.type === 'video' && limits.video) {
      const sizeMB = media.sizeBytes / (1024 * 1024);
      const sizeGB = media.sizeBytes / (1024 * 1024 * 1024);

      // Check file size
      if (limits.video.maxSizeMB && sizeMB > limits.video.maxSizeMB) {
        errors.push(`Video size ${sizeMB.toFixed(2)}MB exceeds ${limits.video.maxSizeMB}MB limit`);
      }

      if (limits.video.maxSizeGB && sizeGB > limits.video.maxSizeGB) {
        errors.push(`Video size ${sizeGB.toFixed(2)}GB exceeds ${limits.video.maxSizeGB}GB limit`);
      }

      // Check format
      const extension = media.mimeType.split('/')[1]?.toLowerCase();
      if (extension && !limits.video.formats.includes(extension)) {
        errors.push(`Format ${extension} not supported. Allowed: ${limits.video.formats.join(', ')}`);
      }

      // Check duration
      if (media.durationSeconds) {
        if (limits.video.minDurationSeconds && media.durationSeconds < limits.video.minDurationSeconds) {
          errors.push(`Video duration ${media.durationSeconds}s is below minimum ${limits.video.minDurationSeconds}s`);
        }

        if (limits.video.maxDurationSeconds && media.durationSeconds > limits.video.maxDurationSeconds) {
          errors.push(`Video duration ${media.durationSeconds}s exceeds maximum ${limits.video.maxDurationSeconds}s`);
        }

        if (limits.video.maxDurationHours) {
          const hours = media.durationSeconds / 3600;
          if (hours > limits.video.maxDurationHours) {
            errors.push(`Video duration ${hours.toFixed(2)}h exceeds maximum ${limits.video.maxDurationHours}h`);
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Download media from a URL
   */
  static async downloadMedia(url: string): Promise<Buffer> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to download media: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  /**
   * Split file into chunks for multi-part upload
   */
  static async *chunkFile(
    buffer: Buffer,
    chunkSize: number
  ): AsyncGenerator<{ chunk: Buffer; index: number; total: number; offset: number }> {
    const totalChunks = Math.ceil(buffer.length / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, buffer.length);
      const chunk = buffer.slice(start, end);

      yield {
        chunk,
        index: i,
        total: totalChunks,
        offset: start,
      };
    }
  }

  /**
   * Get chunk size for a platform
   */
  static getChunkSize(platform: Platform): number {
    return CHUNK_SIZES[platform] ?? DEFAULT_CHUNK_SIZE;
  }

  /**
   * Calculate total chunks needed for a file
   */
  static calculateTotalChunks(fileSize: number, chunkSize: number): number {
    return Math.ceil(fileSize / chunkSize);
  }

  /**
   * Validate and prepare media for upload
   */
  static async prepareMedia(
    media: MediaAsset,
    platform: Platform
  ): Promise<{ buffer: Buffer; validation: MediaValidationResult }> {
    // Validate media
    const validation = await this.validateMedia(media, platform);

    if (!validation.valid) {
      throw new ValidationError(
        platform,
        `Media validation failed: ${validation.errors.join(', ')}`,
        validation.errors
      );
    }

    // Download media
    const buffer = await this.downloadMedia(media.url);

    return { buffer, validation };
  }
}
