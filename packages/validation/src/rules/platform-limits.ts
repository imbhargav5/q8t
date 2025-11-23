import type { Platform, PlatformLimits } from '../types'

/**
 * Platform-specific limits and rules
 *
 * Sources:
 * - Instagram: https://help.instagram.com/1631821640426723
 * - Twitter/X: https://help.twitter.com/en/using-twitter/twitter-character-limit
 * - Facebook: https://www.facebook.com/help/
 * - LinkedIn: https://www.linkedin.com/help/
 * - TikTok: https://support.tiktok.com/
 * - YouTube: https://support.google.com/youtube/
 */
export const PLATFORM_LIMITS: Record<Platform, PlatformLimits> = {
  instagram: {
    text: {
      min: 0,
      max: 2200,
    },
    hashtags: {
      max: 30,
      maxLength: 30,
    },
    mentions: {
      max: 20,
    },
    media: {
      maxCount: 10, // Carousel
      image: {
        maxSizeBytes: 8 * 1024 * 1024, // 8MB
        formats: ['jpg', 'jpeg', 'png'],
        maxWidth: 1080,
        maxHeight: 1350,
        aspectRatios: ['1:1', '4:5', '16:9'],
      },
      video: {
        maxSizeBytes: 650 * 1024 * 1024, // 650MB
        maxDurationSeconds: 60,
        formats: ['mp4', 'mov'],
        maxWidth: 1080,
        maxHeight: 1920,
      },
    },
    links: {
      max: 1,
    },
  },

  facebook: {
    text: {
      min: 0,
      max: 63206,
    },
    hashtags: {
      max: 30,
      maxLength: 30,
    },
    mentions: {
      max: 50,
    },
    media: {
      maxCount: 10,
      image: {
        maxSizeBytes: 10 * 1024 * 1024, // 10MB
        formats: ['jpg', 'jpeg', 'png', 'gif'],
        maxWidth: 2048,
      },
      video: {
        maxSizeBytes: 10 * 1024 * 1024 * 1024, // 10GB
        maxDurationSeconds: 240 * 60, // 240 minutes
        formats: ['mp4', 'mov'],
      },
    },
    links: {
      max: 10,
    },
  },

  twitter: {
    text: {
      min: 0,
      max: 280,
    },
    hashtags: {
      max: 10,
      maxLength: 100,
    },
    mentions: {
      max: 10,
    },
    media: {
      maxCount: 4,
      image: {
        maxSizeBytes: 5 * 1024 * 1024, // 5MB
        formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        maxWidth: 4096,
        maxHeight: 4096,
      },
      video: {
        maxSizeBytes: 512 * 1024 * 1024, // 512MB
        maxDurationSeconds: 140,
        formats: ['mp4', 'mov'],
      },
    },
    links: {
      max: 5,
    },
  },

  x: {
    text: {
      min: 0,
      max: 280,
    },
    hashtags: {
      max: 10,
      maxLength: 100,
    },
    mentions: {
      max: 10,
    },
    media: {
      maxCount: 4,
      image: {
        maxSizeBytes: 5 * 1024 * 1024, // 5MB
        formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        maxWidth: 4096,
        maxHeight: 4096,
      },
      video: {
        maxSizeBytes: 512 * 1024 * 1024, // 512MB
        maxDurationSeconds: 140,
        formats: ['mp4', 'mov'],
      },
    },
    links: {
      max: 5,
    },
  },

  linkedin: {
    text: {
      min: 0,
      max: 3000,
    },
    hashtags: {
      max: 10,
      maxLength: 30,
    },
    mentions: {
      max: 10,
    },
    media: {
      maxCount: 9,
      image: {
        maxSizeBytes: 10 * 1024 * 1024, // 10MB
        formats: ['jpg', 'jpeg', 'png', 'gif'],
        maxWidth: 7680,
        maxHeight: 4320,
      },
      video: {
        maxSizeBytes: 5 * 1024 * 1024 * 1024, // 5GB
        maxDurationSeconds: 10 * 60, // 10 minutes
        formats: ['mp4', 'mov', 'avi'],
      },
    },
    links: {
      max: 5,
    },
  },

  tiktok: {
    text: {
      min: 0,
      max: 2200,
    },
    hashtags: {
      max: 20,
      maxLength: 100,
    },
    mentions: {
      max: 20,
    },
    media: {
      maxCount: 1,
      image: {
        maxSizeBytes: 10 * 1024 * 1024, // 10MB
        formats: ['jpg', 'jpeg', 'png'],
      },
      video: {
        maxSizeBytes: 4 * 1024 * 1024 * 1024, // 4GB
        maxDurationSeconds: 10 * 60, // 10 minutes
        formats: ['mp4', 'mov', 'avi'],
      },
    },
    links: {
      max: 1,
    },
  },

  youtube: {
    text: {
      min: 0,
      max: 5000, // Description
    },
    hashtags: {
      max: 15,
      maxLength: 30,
    },
    mentions: {
      max: 10,
    },
    media: {
      maxCount: 1,
      image: {
        maxSizeBytes: 2 * 1024 * 1024, // 2MB (thumbnail)
        formats: ['jpg', 'jpeg', 'png'],
      },
      video: {
        maxSizeBytes: 256 * 1024 * 1024 * 1024, // 256GB
        maxDurationSeconds: 12 * 60 * 60, // 12 hours
        formats: ['mp4', 'mov', 'avi', 'wmv', 'flv', 'webm'],
      },
    },
    links: {
      max: 5,
    },
  },

  pinterest: {
    text: {
      min: 0,
      max: 500,
    },
    hashtags: {
      max: 20,
      maxLength: 30,
    },
    mentions: {
      max: 10,
    },
    media: {
      maxCount: 5,
      image: {
        maxSizeBytes: 32 * 1024 * 1024, // 32MB
        formats: ['jpg', 'jpeg', 'png'],
        maxWidth: 10000,
        maxHeight: 10000,
      },
      video: {
        maxSizeBytes: 2 * 1024 * 1024 * 1024, // 2GB
        maxDurationSeconds: 60,
        formats: ['mp4', 'mov'],
      },
    },
    links: {
      max: 1,
    },
  },

  reddit: {
    text: {
      min: 0,
      max: 40000,
    },
    hashtags: {
      max: 10,
      maxLength: 50,
    },
    mentions: {
      max: 10,
    },
    media: {
      maxCount: 20,
      image: {
        maxSizeBytes: 20 * 1024 * 1024, // 20MB
        formats: ['jpg', 'jpeg', 'png', 'gif'],
      },
      video: {
        maxSizeBytes: 1 * 1024 * 1024 * 1024, // 1GB
        maxDurationSeconds: 15 * 60, // 15 minutes
        formats: ['mp4', 'mov'],
      },
    },
    links: {
      max: 10,
    },
  },

  threads: {
    text: {
      min: 0,
      max: 500,
    },
    hashtags: {
      max: 30,
      maxLength: 30,
    },
    mentions: {
      max: 20,
    },
    media: {
      maxCount: 10,
      image: {
        maxSizeBytes: 8 * 1024 * 1024, // 8MB
        formats: ['jpg', 'jpeg', 'png'],
        maxWidth: 1080,
        maxHeight: 1350,
      },
      video: {
        maxSizeBytes: 650 * 1024 * 1024, // 650MB
        maxDurationSeconds: 90,
        formats: ['mp4', 'mov'],
      },
    },
    links: {
      max: 5,
    },
  },
}

/**
 * Get platform limits for a specific platform
 */
export function getPlatformLimits(platform: Platform): PlatformLimits {
  return PLATFORM_LIMITS[platform]
}
