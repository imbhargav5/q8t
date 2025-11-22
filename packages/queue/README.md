# @q8t/queue

SDK-agnostic publishing queue system for Q8T using Inngest.

## Overview

This package provides a comprehensive queue system for publishing content to 17+ social media platforms with full support for images and videos.

## Features

- ✅ **17 Supported Platforms**: LinkedIn, Reddit, X/Twitter, Instagram, Threads, Facebook, Bluesky, Pinterest, YouTube, TikTok, Farcaster, Nostr, Discord, Slack, Telegram, WhatsApp, and more
- ✅ **Multiple Upload Patterns**: Direct, multi-part, container, async, pre-upload, and relay patterns
- ✅ **Media Support**: Full image and video upload support with validation
- ✅ **Chunked Uploads**: For large files (LinkedIn, YouTube)
- ✅ **Retry Strategies**: Exponential backoff with configurable delays
- ✅ **Type-Safe**: Full TypeScript support with Zod validation
- ✅ **Observable**: Comprehensive logging and error tracking

## Architecture

### Upload Patterns

#### 1. Direct Upload (Simple)
Platforms: Reddit, X, Bluesky, Discord, Slack, Telegram

Single API call with media embedded.

#### 2. Multi-Part Upload (Complex)
Platforms: LinkedIn

1. Register upload
2. Upload in chunks
3. Finalize upload
4. Create post with asset URN

#### 3. Container Pattern
Platforms: Instagram

1. Create media container
2. Publish container

#### 4. Async Upload
Platforms: YouTube, TikTok

1. Initialize upload
2. Upload video (chunked/resumable)
3. Poll status until complete

#### 5. Pre-Upload Pattern
Platforms: Facebook, WhatsApp

1. Upload media, get media ID
2. Create post with media ID

#### 6. Relay-Based
Platforms: Nostr

Sign event, broadcast to multiple relays.

## Installation

```bash
pnpm install
```

## Usage

### Basic Setup

```typescript
import { inngest, publishOrchestrator, linkedinPublisher } from '@q8t/queue';

// Export for Inngest
export const functions = [
  publishOrchestrator,
  linkedinPublisher,
  // ... other publishers
];
```

### Publishing a Post

```typescript
// Send event to orchestrator
await inngest.send({
  name: 'orchestrator/publish.requested',
  data: {
    postId: 'uuid-here',
    workspaceId: 'uuid-here',
    userId: 'uuid-here',
    platforms: ['linkedin', 'reddit', 'twitter'],
  },
});
```

### Environment Variables

```env
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
INNGEST_EVENT_KEY=your-inngest-event-key
```

## Platform Support

### Social Media
- **LinkedIn**: Text, images (9 max), videos (10min max) - Multi-part upload
- **Reddit**: Text, images (20 max), videos - Direct upload
- **X/Twitter**: Text, images (4 max), videos (140s max) - Direct upload
- **Instagram**: Images (10 max), videos (60s max) - Container pattern
- **Threads**: Text, images (10 max), videos (90s max) - Direct upload
- **Facebook**: Text, images (10 max), videos - Pre-upload
- **Bluesky**: Text, images (4 max), videos (60s max) - Direct upload

### Visual/Video
- **Pinterest**: Images (1 max) - Direct upload
- **YouTube**: Videos (256GB max, 12h max) - Resumable upload
- **TikTok**: Videos (287MB max, 10min max) - Async upload

### Decentralized
- **Farcaster**: Text, images (2 max) via Warpcast
- **Nostr**: Text via relay network

### Messaging
- **Discord**: Text, images (10 max), videos - Direct upload
- **Slack**: Text, images (10 max), videos - Direct upload
- **Telegram**: Text, images (10 max), videos - Direct upload
- **WhatsApp**: Text, images (1 max), videos (16MB max) - Pre-upload

## Adding a New Platform

1. Create a new publisher file in `src/functions/publishers/`
2. Extend `BasePublisher` class
3. Implement the `publish()` method
4. Create an Inngest function following the pattern
5. Export from `publishers/index.ts`
6. Add to `allFunctions` in `src/index.ts`

Example:

```typescript
import { BasePublisher } from './base-publisher';
import { inngest } from '../../client';
import { EVENT_NAMES, FUNCTION_IDS, PLATFORMS } from '../../constants';

class MyPlatformPublisher extends BasePublisher {
  protected platformName = PLATFORMS.MY_PLATFORM;

  async publish(context) {
    // Implement platform-specific publishing logic
  }
}

export const myPlatformPublisher = inngest.createFunction(
  {
    id: FUNCTION_IDS.PUBLISHERS.MY_PLATFORM,
    name: 'My Platform Publisher',
    concurrency: [{ key: 'event.data.socialAccountId', limit: 1 }],
  },
  { event: EVENT_NAMES.PLATFORMS.MY_PLATFORM.PUBLISH_REQUESTED },
  async ({ event, step }) => {
    // Implement function logic
  }
);
```

## Media Handling

### Validation

Media is validated against platform-specific limits:

```typescript
import { MediaProcessor } from '@q8t/queue';

const validation = await MediaProcessor.validateMedia(mediaAsset, 'linkedin');

if (!validation.valid) {
  console.error(validation.errors);
}
```

### Chunked Uploads

For large files, media is automatically chunked:

```typescript
const chunkSize = MediaProcessor.getChunkSize(platform);
const buffer = await MediaProcessor.downloadMedia(url);

for await (const { chunk, index, total } of MediaProcessor.chunkFile(buffer, chunkSize)) {
  // Upload chunk
}
```

## Error Handling

The system provides comprehensive error types:

- `NetworkError` - Retryable network issues
- `AuthenticationError` - Authentication failures (not retryable)
- `RateLimitError` - Rate limit exceeded (retryable with delay)
- `ValidationError` - Invalid data (not retryable)
- `MediaUploadError` - Media upload failures
- `PlatformError` - Platform-specific errors

## Event Flow

```
1. User triggers publish
   ↓
2. Orchestrator receives request
   ↓
3. Creates publication records
   ↓
4. Fans out to platform publishers
   ↓
5. Each publisher:
   - Fetches data
   - Validates media
   - Uploads media (if needed)
   - Creates post
   - Updates status
   ↓
6. Orchestrator aggregates results
   ↓
7. Updates final post status
```

## Constants

### Event Names
All event names follow the pattern: `<domain>/<entity>.<action>.<status>`

```typescript
import { EVENT_NAMES } from '@q8t/queue';

EVENT_NAMES.ORCHESTRATOR.PUBLISH_REQUESTED
EVENT_NAMES.PLATFORMS.LINKEDIN.PUBLISH_SUCCESS
EVENT_NAMES.SCHEDULER.CHECK_SCHEDULED_POSTS
```

### Function IDs
Used for concurrency control and monitoring:

```typescript
import { FUNCTION_IDS } from '@q8t/queue';

FUNCTION_IDS.PUBLISHERS.LINKEDIN
FUNCTION_IDS.ORCHESTRATOR.PUBLISH_ORCHESTRATOR
```

## Development

### Running Tests

```bash
pnpm test
```

### Type Checking

```bash
pnpm check
```

### Linting

```bash
pnpm lint
```

## Contributing

When adding a new platform publisher:

1. Study the platform's API documentation
2. Identify the upload pattern (direct, multi-part, etc.)
3. Check media limits and requirements
4. Extend `BasePublisher`
5. Add comprehensive error handling
6. Include media validation
7. Add to constants and types
8. Export from module

## License

Private - Part of Q8T workspace
