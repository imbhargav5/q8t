/**
 * Platform identifiers and capabilities
 *
 * This file defines all supported publishing platforms, their upload patterns,
 * and media capabilities.
 */

/**
 * All supported publishing platforms
 */
export const PLATFORMS = {
  // Social Media
  LINKEDIN: 'linkedin',
  REDDIT: 'reddit',
  X: 'twitter', // Keep as 'twitter' for DB compatibility
  INSTAGRAM: 'instagram',
  THREADS: 'threads',
  FACEBOOK: 'facebook',
  BLUESKY: 'bluesky',

  // Visual/Video
  PINTEREST: 'pinterest',
  YOUTUBE: 'youtube',
  TIKTOK: 'tiktok',

  // Decentralized
  FARCASTER: 'farcaster',
  NOSTR: 'nostr',

  // Messaging
  DISCORD: 'discord',
  SLACK: 'slack',
  TELEGRAM: 'telegram',
  WHATSAPP: 'whatsapp',
} as const;

export type Platform = typeof PLATFORMS[keyof typeof PLATFORMS];

/**
 * Media upload patterns by platform
 * Defines how media should be uploaded for each platform
 */
export const MEDIA_UPLOAD_PATTERNS = {
  /** Single API call with media embedded */
  DIRECT: 'direct',
  /** Register → Upload parts → Post */
  MULTI_PART: 'multi_part',
  /** Create container → Publish */
  CONTAINER: 'container',
  /** Init → Upload → Poll status */
  ASYNC_UPLOAD: 'async_upload',
  /** Upload → Get ID → Post with ID */
  PRE_UPLOAD: 'pre_upload',
  /** Decentralized relay publishing */
  RELAY: 'relay',
} as const;

export type MediaUploadPattern = typeof MEDIA_UPLOAD_PATTERNS[keyof typeof MEDIA_UPLOAD_PATTERNS];

/**
 * Platform capabilities and upload patterns
 */
export const PLATFORM_CAPABILITIES: Record<Platform, {
  supportsText: boolean;
  supportsImages: boolean;
  supportsVideo: boolean;
  maxImages?: number;
  maxVideoDurationSeconds?: number;
  uploadPattern: MediaUploadPattern;
  requiresChunking?: boolean;
  requiresResumableUpload?: boolean;
}> = {
  [PLATFORMS.LINKEDIN]: {
    supportsText: true,
    supportsImages: true,
    supportsVideo: true,
    maxImages: 9,
    maxVideoDurationSeconds: 600,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.MULTI_PART,
    requiresChunking: true,
  },
  [PLATFORMS.REDDIT]: {
    supportsText: true,
    supportsImages: true,
    supportsVideo: true,
    maxImages: 20,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.DIRECT,
  },
  [PLATFORMS.X]: {
    supportsText: true,
    supportsImages: true,
    supportsVideo: true,
    maxImages: 4,
    maxVideoDurationSeconds: 140,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.DIRECT,
  },
  [PLATFORMS.INSTAGRAM]: {
    supportsText: true,
    supportsImages: true,
    supportsVideo: true,
    maxImages: 10,
    maxVideoDurationSeconds: 60,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.CONTAINER,
  },
  [PLATFORMS.THREADS]: {
    supportsText: true,
    supportsImages: true,
    supportsVideo: true,
    maxImages: 10,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.DIRECT,
  },
  [PLATFORMS.FACEBOOK]: {
    supportsText: true,
    supportsImages: true,
    supportsVideo: true,
    maxImages: 10,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.PRE_UPLOAD,
  },
  [PLATFORMS.BLUESKY]: {
    supportsText: true,
    supportsImages: true,
    supportsVideo: true,
    maxImages: 4,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.DIRECT,
  },
  [PLATFORMS.PINTEREST]: {
    supportsText: true,
    supportsImages: true,
    supportsVideo: false,
    maxImages: 1,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.DIRECT,
  },
  [PLATFORMS.YOUTUBE]: {
    supportsText: true,
    supportsImages: false,
    supportsVideo: true,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.ASYNC_UPLOAD,
    requiresResumableUpload: true,
  },
  [PLATFORMS.TIKTOK]: {
    supportsText: true,
    supportsImages: false,
    supportsVideo: true,
    maxVideoDurationSeconds: 600,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.ASYNC_UPLOAD,
  },
  [PLATFORMS.FARCASTER]: {
    supportsText: true,
    supportsImages: true,
    supportsVideo: false,
    maxImages: 2,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.DIRECT,
  },
  [PLATFORMS.NOSTR]: {
    supportsText: true,
    supportsImages: false, // Via external hosting + URL
    supportsVideo: false,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.RELAY,
  },
  [PLATFORMS.DISCORD]: {
    supportsText: true,
    supportsImages: true,
    supportsVideo: true,
    maxImages: 10,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.DIRECT,
  },
  [PLATFORMS.SLACK]: {
    supportsText: true,
    supportsImages: true,
    supportsVideo: true,
    maxImages: 10,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.DIRECT,
  },
  [PLATFORMS.TELEGRAM]: {
    supportsText: true,
    supportsImages: true,
    supportsVideo: true,
    maxImages: 10,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.DIRECT,
  },
  [PLATFORMS.WHATSAPP]: {
    supportsText: true,
    supportsImages: true,
    supportsVideo: true,
    maxImages: 1,
    uploadPattern: MEDIA_UPLOAD_PATTERNS.PRE_UPLOAD,
  },
};

/**
 * Platforms that support text-based posts
 */
export const TEXT_PLATFORMS = Object.entries(PLATFORM_CAPABILITIES)
  .filter(([_, caps]) => caps.supportsText)
  .map(([platform]) => platform as Platform);

/**
 * Platforms that support image posts
 */
export const IMAGE_PLATFORMS = Object.entries(PLATFORM_CAPABILITIES)
  .filter(([_, caps]) => caps.supportsImages)
  .map(([platform]) => platform as Platform);

/**
 * Platforms that support video posts
 */
export const VIDEO_PLATFORMS = Object.entries(PLATFORM_CAPABILITIES)
  .filter(([_, caps]) => caps.supportsVideo)
  .map(([platform]) => platform as Platform);
