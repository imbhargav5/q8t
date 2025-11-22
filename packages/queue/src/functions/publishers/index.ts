/**
 * Publishers module exports
 *
 * This file exports all platform publisher functions.
 * Additional publishers can be added following the same pattern.
 */

export * from './base-publisher';
export * from './linkedin-publisher';
export * from './reddit-publisher';

// Additional publishers would be exported here:
// export * from './x-publisher';
// export * from './instagram-publisher';
// export * from './youtube-publisher';
// export * from './tiktok-publisher';
// export * from './facebook-publisher';
// export * from './threads-publisher';
// export * from './bluesky-publisher';
// export * from './pinterest-publisher';
// export * from './farcaster-publisher';
// export * from './nostr-publisher';
// export * from './discord-publisher';
// export * from './slack-publisher';
// export * from './telegram-publisher';
// export * from './whatsapp-publisher';

/**
 * NOTE: The remaining publishers follow similar patterns:
 *
 * Direct Upload Pattern (like Reddit):
 * - X/Twitter
 * - Bluesky
 * - Discord
 * - Slack
 * - Telegram
 *
 * Container Pattern:
 * - Instagram (create container → publish)
 *
 * Pre-Upload Pattern:
 * - Facebook (upload media → post with ID)
 * - WhatsApp (upload media → send with ID)
 *
 * Async Upload Pattern:
 * - YouTube (init → upload chunks → publish)
 * - TikTok (init → upload → poll status)
 *
 * Each publisher extends BasePublisher and implements the publish() method
 * following the appropriate pattern for that platform.
 */
