/**
 * Media configuration and limits
 *
 * This file defines size, format, and duration limits for media uploads
 * across different platforms.
 */

import { PLATFORMS, type Platform } from './platforms';

/**
 * Media size and format limits per platform
 */
export const MEDIA_LIMITS: Partial<Record<Platform, {
  image?: {
    maxSizeMB: number;
    formats: string[];
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
  };
  video?: {
    maxSizeMB?: number;
    maxSizeGB?: number;
    formats: string[];
    minDurationSeconds?: number;
    maxDurationSeconds?: number;
    maxDurationHours?: number;
    aspectRatios?: string[];
  };
}>> = {
  [PLATFORMS.LINKEDIN]: {
    image: {
      maxSizeMB: 10,
      formats: ['jpg', 'jpeg', 'png', 'gif'],
      minWidth: 360,
      maxWidth: 4096,
    },
    video: {
      maxSizeMB: 200,
      formats: ['mp4', 'mov'],
      minDurationSeconds: 3,
      maxDurationSeconds: 600,
    },
  },
  [PLATFORMS.REDDIT]: {
    image: {
      maxSizeMB: 20,
      formats: ['jpg', 'jpeg', 'png', 'gif'],
    },
    video: {
      maxSizeGB: 1,
      formats: ['mp4', 'mov'],
      maxDurationSeconds: 900,
    },
  },
  [PLATFORMS.X]: {
    image: {
      maxSizeMB: 5,
      formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    },
    video: {
      maxSizeMB: 512,
      formats: ['mp4', 'mov'],
      maxDurationSeconds: 140,
    },
  },
  [PLATFORMS.INSTAGRAM]: {
    image: {
      maxSizeMB: 8,
      formats: ['jpg', 'jpeg', 'png'],
      minWidth: 320,
      maxWidth: 1440,
    },
    video: {
      maxSizeMB: 100,
      formats: ['mp4', 'mov'],
      minDurationSeconds: 3,
      maxDurationSeconds: 60,
      aspectRatios: ['1:1', '4:5', '9:16'],
    },
  },
  [PLATFORMS.THREADS]: {
    image: {
      maxSizeMB: 8,
      formats: ['jpg', 'jpeg', 'png'],
    },
    video: {
      maxSizeMB: 100,
      formats: ['mp4', 'mov'],
      maxDurationSeconds: 90,
    },
  },
  [PLATFORMS.FACEBOOK]: {
    image: {
      maxSizeMB: 4,
      formats: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
    },
    video: {
      maxSizeGB: 10,
      formats: ['mp4', 'mov', 'avi'],
      maxDurationSeconds: 14400, // 4 hours
    },
  },
  [PLATFORMS.BLUESKY]: {
    image: {
      maxSizeMB: 1,
      formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    },
    video: {
      maxSizeMB: 50,
      formats: ['mp4'],
      maxDurationSeconds: 60,
    },
  },
  [PLATFORMS.PINTEREST]: {
    image: {
      maxSizeMB: 32,
      formats: ['jpg', 'jpeg', 'png'],
      minWidth: 600,
    },
  },
  [PLATFORMS.YOUTUBE]: {
    video: {
      maxSizeGB: 256,
      formats: ['mp4', 'mov', 'avi', 'wmv', 'flv', 'webm', 'mpeg'],
      maxDurationHours: 12,
    },
  },
  [PLATFORMS.TIKTOK]: {
    video: {
      maxSizeMB: 287,
      formats: ['mp4', 'mov', 'webm'],
      minDurationSeconds: 3,
      maxDurationSeconds: 600,
      aspectRatios: ['9:16', '16:9', '1:1'],
    },
  },
  [PLATFORMS.FARCASTER]: {
    image: {
      maxSizeMB: 10,
      formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    },
  },
  [PLATFORMS.DISCORD]: {
    image: {
      maxSizeMB: 25,
      formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    },
    video: {
      maxSizeMB: 25,
      formats: ['mp4', 'mov', 'webm'],
    },
  },
  [PLATFORMS.SLACK]: {
    image: {
      maxSizeMB: 1000,
      formats: ['jpg', 'jpeg', 'png', 'gif'],
    },
    video: {
      maxSizeMB: 1000,
      formats: ['mp4', 'mov'],
    },
  },
  [PLATFORMS.TELEGRAM]: {
    image: {
      maxSizeMB: 10,
      formats: ['jpg', 'jpeg', 'png'],
    },
    video: {
      maxSizeMB: 2000,
      formats: ['mp4', 'mov', 'avi'],
    },
  },
  [PLATFORMS.WHATSAPP]: {
    image: {
      maxSizeMB: 5,
      formats: ['jpg', 'jpeg', 'png'],
    },
    video: {
      maxSizeMB: 16,
      formats: ['mp4', '3gp'],
      maxDurationSeconds: 180,
    },
  },
};

/**
 * Chunk sizes for multi-part uploads (in bytes)
 */
export const CHUNK_SIZES: Partial<Record<Platform, number>> = {
  [PLATFORMS.LINKEDIN]: 4 * 1024 * 1024, // 4MB chunks
  [PLATFORMS.YOUTUBE]: 256 * 1024, // 256KB chunks (resumable)
  [PLATFORMS.TIKTOK]: 5 * 1024 * 1024, // 5MB chunks
};

/**
 * Default chunk size for platforms not specified above
 */
export const DEFAULT_CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
