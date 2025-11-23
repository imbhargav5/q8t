# @q8t/data-access

Data access layer with repository pattern for database operations.

## Features

- **Repository Pattern**: Clean separation between business logic and data persistence
- **Type-Safe**: Full TypeScript types for all database operations
- **Effect Integration**: Type-safe error handling with Effect
- **Query Builders**: Fluent API for building complex queries
- **Transaction Support**: Atomic operations across multiple tables
- **No Business Logic**: Pure data access - no calculations, validations, or transformations

## Installation

```bash
pnpm add @q8t/data-access
```

## Usage

### Basic Repository Usage

```typescript
import { PostRepository } from '@q8t/data-access'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key)
const postRepo = new PostRepository(supabase)

// Create a post
const result = await postRepo.create({
  content: 'Hello world!',
  platform: 'instagram',
  userId: 'user-id',
  scheduledAt: new Date(),
})

// Get post by ID
const post = await postRepo.findById('post-id')

// Update post
await postRepo.update('post-id', {
  status: 'published',
  publishedAt: new Date(),
})

// Delete post
await postRepo.delete('post-id')
```

### Query Building

```typescript
// Find posts with filters
const posts = await postRepo.findMany({
  where: {
    userId: 'user-id',
    platform: 'instagram',
    status: 'published',
  },
  orderBy: { publishedAt: 'desc' },
  limit: 10,
})

// Find with joins
const postsWithMetrics = await postRepo.findManyWithMetrics({
  where: { userId: 'user-id' },
  includeMetrics: true,
})
```

### Transactions

```typescript
import { withTransaction } from '@q8t/data-access'

await withTransaction(supabase, async (tx) => {
  // Create post
  const post = await postRepo.create(
    {
      content: 'New post',
      userId: 'user-id',
    },
    tx,
  )

  // Create metrics
  await metricsRepo.create(
    {
      postId: post.id,
      likes: 0,
      comments: 0,
    },
    tx,
  )

  // Both operations commit together or rollback on error
})
```

## Architecture

This package is part of **Layer 3: Data Access** in our architecture:

```
Layer 1: Platform SDKs (API clients)
Layer 2: Business Logic (@q8t/sentiment, @q8t/analytics-engine)
Layer 3: Data Access (@q8t/data-access) ← This package
Layer 4: Application Services (orchestration)
Layer 5: Infrastructure (Inngest jobs)
```

### Key Principles

1. **No Business Logic**: Repositories only handle CRUD operations
2. **Type Safety**: All operations are fully typed
3. **Database Agnostic**: Abstract database details behind repository interfaces
4. **Testable**: Easy to mock for testing higher layers
5. **Effect Integration**: Type-safe error handling

## Available Repositories

- `PostRepository` - Posts and scheduled content
- `MetricsRepository` - Post metrics and analytics
- `UserRepository` - User accounts and settings
- `ProfileRepository` - Social media profiles
- `MentionRepository` - Social listening mentions
- `ConversationRepository` - Comment threads
- `CampaignRepository` - Marketing campaigns
- `InfluencerRepository` - Influencer management

## Testing

```bash
pnpm test
```

All repositories are tested with mock Supabase clients.
