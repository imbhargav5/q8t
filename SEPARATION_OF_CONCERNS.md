# Q8T - Separation of Concerns & Package Architecture

**Created:** 2025-11-23
**Purpose:** Define clear boundaries between packages and establish a layered architecture without duplication

---

## Table of Contents

1. [Current Architecture Analysis](#current-architecture-analysis)
2. [Problems with Current Approach](#problems-with-current-approach)
3. [Proposed Layered Architecture](#proposed-layered-architecture)
4. [Business Logic Packages (New Layer)](#business-logic-packages-new-layer)
5. [Package Dependency Rules](#package-dependency-rules)
6. [Migration Strategy](#migration-strategy)
7. [Testing Strategy](#testing-strategy)

---

## Current Architecture Analysis

### Existing Package Categories

#### Layer 1: Platform SDKs (18 packages)
**Purpose:** Low-level API clients for social platforms

**Packages:**
- `@q8t/instagram-sdk`, `@q8t/x-sdk`, `@q8t/facebook-sdk`, etc.

**Responsibilities:**
- OAuth authentication
- HTTP API calls
- Platform-specific request/response handling
- Token refresh logic
- API endpoint definitions

**Dependencies:**
- `@q8t/effect-sdk-base` (shared HTTP client)
- `effect` (type-safe error handling)

**What they DON'T do:**
- Business logic
- Data validation beyond API schemas
- Multi-platform orchestration
- Analytics calculations

---

#### Layer 2: Integration SDKs (13 packages)
**Purpose:** Third-party service integrations

**Packages:**
- `@q8t/salesforce-sdk`, `@q8t/monday-sdk`, `@q8t/cloudinary-sdk`, etc.

**Responsibilities:**
- API client implementation
- Authentication
- Service-specific operations

---

#### Layer 3: Infrastructure (5 packages)
**Purpose:** Cross-cutting infrastructure concerns

**Packages:**

##### `@q8t/effect-sdk-base`
- HTTP client abstraction
- Error type hierarchy
- Retry policies
- Common SDK patterns

##### `@q8t/queue`
- **Current State:** Inngest-based publishing orchestration
- **Dependencies:** ALL platform SDKs
- **Problem:** Contains both orchestration AND business logic
  - Example: Validation logic, upload strategies
  - Should be split into orchestration + validation logic

##### `@q8t/listening`
- **Current State:** Social listening job orchestration
- **Dependencies:** Supabase, Inngest
- **Problem:** Contains sentiment analysis logic (`analyzeSentimentSimple`)
  - Sentiment analysis should be extracted to `@q8t/sentiment`
  - Listening should only orchestrate jobs

##### `@q8t/utils`
- **Current State:** Minimal utilities (formatDate, capitalize, sleep)
- **Purpose:** Generic helper functions
- **Good:** No business logic, no dependencies

---

## Problems with Current Approach

### 1. **Business Logic Embedded in Infrastructure**

**Example 1:** `packages/listening/src/functions/sentiment-analyzer.ts`
```typescript
function analyzeSentimentSimple(text: string): {
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  confidence: number;
  keywords: string[];
}
```
- This is business logic that should be testable independently
- Currently mixed with Inngest orchestration
- Cannot be reused outside of listening context

**Example 2:** Queue validation logic
- Content validation mixed with publishing orchestration
- Platform limits checking mixed with API calls
- Should be pure functions

### 2. **Missing Business Logic Packages**

Looking at the design-guide mock data, we need calculations for:
- Engagement rates
- Performance scores
- Sentiment analysis
- Influencer scoring
- Competitor benchmarking
- Hashtag recommendations
- Best posting times
- Crisis detection algorithms

**None of these exist as testable packages!**

### 3. **No Clear Separation Between:**
- Data fetching (SDKs)
- Business logic (calculations)
- Orchestration (queue/jobs)
- Data persistence (database)

### 4. **Testing Challenges**
- Cannot test sentiment analysis without Inngest
- Cannot test engagement calculations (don't exist)
- Cannot test validation rules in isolation

---

## Proposed Layered Architecture

### Layer 1: Platform Integration (No Changes)
**What:** API clients for external platforms
**Packages:** `*-sdk` (18 social + 13 integration)
**Dependencies:** `effect-sdk-base`, `effect` only
**Exports:** API client functions, OAuth flows

**Example:**
```typescript
// @q8t/instagram-sdk
export const InstagramClient = {
  posts: {
    create: (params) => Effect<Post, InstagramError>,
    get: (id) => Effect<Post, InstagramError>,
  },
  auth: {
    getAuthUrl: (config) => AuthUrl,
    exchangeToken: (code) => Effect<Token, OAuthError>,
  }
}
```

---

### Layer 2: Business Logic (NEW - Pure Functions)
**What:** Pure business logic, calculations, algorithms
**No dependencies on:** SDKs, databases, job queues
**Dependencies allowed:** Zod, Effect, math libraries
**Exports:** Pure functions, schemas

**New Packages:**
1. `@q8t/analytics-engine`
2. `@q8t/sentiment`
3. `@q8t/validation`
4. `@q8t/scoring`
5. `@q8t/optimization`
6. `@q8t/media-transforms`

*Details in next section*

---

### Layer 3: Data Access (NEW - Repository Pattern)
**What:** Database queries and data persistence
**Dependencies:** Supabase, Zod schemas
**Exports:** Repository interfaces

**New Packages:**
1. `@q8t/data-access`

**Example:**
```typescript
// @q8t/data-access
export interface PostRepository {
  findById(id: string): Effect<Post, NotFoundError>
  create(data: CreatePostInput): Effect<Post, ValidationError>
  update(id: string, data: UpdatePostInput): Effect<Post, NotFoundError>
}

export const PostRepositoryLive: Layer<PostRepository>
```

---

### Layer 4: Application Services (NEW - Orchestration)
**What:** Coordinate between data access, business logic, and platform SDKs
**Dependencies:** Layer 2 + Layer 3

**Refactored Packages:**
1. `@q8t/publishing-service` (from queue)
2. `@q8t/listening-service` (from listening)
3. `@q8t/analytics-service` (new)
4. `@q8t/sync-service` (new)

**Example:**
```typescript
// @q8t/publishing-service
import { PostRepository } from '@q8t/data-access'
import { validatePost } from '@q8t/validation'
import { InstagramClient } from '@q8t/instagram-sdk'

export const publishPost = (postId: string) =>
  Effect.gen(function* () {
    const repo = yield* PostRepository
    const post = yield* repo.findById(postId)

    // Business logic (pure function)
    const validation = yield* validatePost(post, 'instagram')
    if (!validation.valid) {
      return yield* Effect.fail(new ValidationError(validation.errors))
    }

    // Platform SDK
    const client = yield* InstagramClient
    const result = yield* client.posts.create(post)

    // Update database
    yield* repo.update(postId, { status: 'published' })

    return result
  })
```

---

### Layer 5: Infrastructure (Inngest Jobs)
**What:** Job scheduling, cron, background tasks
**Dependencies:** Application services (Layer 4)

**Refactored Packages:**
1. `@q8t/jobs` (queue + listening jobs)

**Example:**
```typescript
// @q8t/jobs
import { publishPost } from '@q8t/publishing-service'

export const publishPostJob = inngest.createFunction(
  { id: 'publish-post' },
  { event: 'post/publish.requested' },
  async ({ event, step }) => {
    await step.run('publish', async () => {
      await Effect.runPromise(publishPost(event.data.postId))
    })
  }
)
```

---

## Business Logic Packages (New Layer)

### Package 1: `@q8t/analytics-engine`

**Purpose:** Pure analytics calculations (no data fetching)

**Responsibilities:**
- Calculate engagement rates
- Compute performance scores
- Generate trend analysis
- Calculate growth rates
- Compute reach metrics
- Best posting time analysis

**Module Structure:**
```
packages/analytics-engine/
├── src/
│   ├── engagement/
│   │   ├── rate-calculator.ts        # Engagement rate formulas
│   │   ├── breakdown.ts              # By type (likes, comments, etc.)
│   │   └── index.ts
│   ├── performance/
│   │   ├── scoring.ts                # 0-100 performance score
│   │   ├── tier-classification.ts   # Viral/high/medium/low/poor
│   │   ├── benchmarking.ts          # Compare to averages
│   │   └── index.ts
│   ├── trends/
│   │   ├── growth.ts                 # Follower growth calculations
│   │   ├── momentum.ts               # Trend momentum
│   │   ├── seasonality.ts            # Seasonal patterns
│   │   └── index.ts
│   ├── optimization/
│   │   ├── best-times.ts             # Optimal posting times
│   │   ├── content-types.ts          # Best performing content types
│   │   └── index.ts
│   ├── aggregation/
│   │   ├── cross-platform.ts         # Aggregate across platforms
│   │   ├── time-series.ts            # Time-based aggregation
│   │   └── index.ts
│   └── index.ts
├── tests/
│   ├── engagement.test.ts
│   ├── performance.test.ts
│   └── trends.test.ts
└── package.json
```

**Example API:**
```typescript
import { EngagementCalculator } from '@q8t/analytics-engine'

// Input: plain data (from database or API)
interface PostMetrics {
  likes: number
  comments: number
  shares: number
  impressions: number
  followerCount: number
}

// Pure function
const engagementRate = EngagementCalculator.calculateRate({
  likes: 150,
  comments: 25,
  shares: 10,
  impressions: 5000,
  followerCount: 10000
})
// => { rate: 3.7, breakdown: {...}, tier: 'high' }

// Performance scoring
const score = PerformanceScorer.calculateScore({
  engagementRate: 3.7,
  reach: 5000,
  followerGrowth: 50,
  platform: 'instagram'
})
// => { score: 82, tier: 'high', factors: {...} }

// Best posting times
const bestTimes = TimeOptimizer.findBestTimes({
  historicalPosts: [...], // Array of { postedAt, engagement }
  timezone: 'America/New_York'
})
// => [{ hour: 10, day: 'Tuesday', score: 95 }, ...]
```

**Dependencies:**
```json
{
  "dependencies": {
    "effect": "^3.10.0",
    "date-fns": "^3.0.0",
    "zod": "^3.23.8"
  }
}
```

**No dependencies on:**
- ❌ Platform SDKs
- ❌ Database clients
- ❌ Inngest
- ❌ HTTP clients

---

### Package 2: `@q8t/sentiment`

**Purpose:** Sentiment and emotion analysis (extract from listening)

**Responsibilities:**
- Sentiment classification (positive/negative/neutral)
- Emotion detection
- Keyword extraction
- Confidence scoring
- Multi-language support

**Module Structure:**
```
packages/sentiment/
├── src/
│   ├── analyzers/
│   │   ├── keyword-based.ts          # Simple keyword matching
│   │   ├── ml-based.ts               # ML model integration
│   │   ├── openai.ts                 # OpenAI API
│   │   ├── claude.ts                 # Claude API
│   │   └── index.ts
│   ├── emotions/
│   │   ├── detector.ts               # Emotion detection
│   │   ├── aggregator.ts             # Aggregate emotions
│   │   └── index.ts
│   ├── keywords/
│   │   ├── extractor.ts              # Extract keywords
│   │   ├── ranker.ts                 # Rank by importance
│   │   └── index.ts
│   ├── scoring/
│   │   ├── normalizer.ts             # Normalize scores -1 to 1
│   │   ├── confidence.ts             # Calculate confidence
│   │   └── index.ts
│   ├── batch/
│   │   └── processor.ts              # Batch processing
│   └── index.ts
├── tests/
└── package.json
```

**Example API:**
```typescript
import { SentimentAnalyzer } from '@q8t/sentiment'

// Keyword-based (fast, offline)
const keywordAnalyzer = SentimentAnalyzer.keyword()
const result = await keywordAnalyzer.analyze({
  text: "This product is terrible! Very disappointed.",
  language: 'en'
})
// => {
//   sentiment: 'negative',
//   score: -0.85,
//   confidence: 0.92,
//   emotions: { anger: 0.7, disappointment: 0.8 },
//   keywords: ['terrible', 'disappointed']
// }

// AI-based (accurate, requires API)
const aiAnalyzer = SentimentAnalyzer.openai({ apiKey: '...' })
const result = await aiAnalyzer.analyze({ text: '...' })

// Batch processing
const batch = await aiAnalyzer.analyzeBatch([
  { id: '1', text: 'Love this!' },
  { id: '2', text: 'Hate it!' }
])
```

**Migration:**
- Extract `analyzeSentimentSimple` from `packages/listening/src/functions/sentiment-analyzer.ts`
- Move to `packages/sentiment/src/analyzers/keyword-based.ts`
- Update listening package to import from `@q8t/sentiment`

---

### Package 3: `@q8t/validation`

**Purpose:** Content and data validation (extract from queue)

**Responsibilities:**
- Validate post content against platform limits
- Media file validation
- URL validation
- Hashtag validation
- Platform capability checking

**Module Structure:**
```
packages/validation/
├── src/
│   ├── content/
│   │   ├── text-validator.ts         # Text length, encoding
│   │   ├── media-validator.ts        # Image/video validation
│   │   ├── url-validator.ts          # URL checking
│   │   └── index.ts
│   ├── platforms/
│   │   ├── instagram.ts              # Instagram-specific rules
│   │   ├── twitter.ts                # Twitter/X rules
│   │   ├── linkedin.ts               # LinkedIn rules
│   │   └── index.ts
│   ├── rules/
│   │   ├── character-limits.ts       # Platform character limits
│   │   ├── media-limits.ts           # Media size/count limits
│   │   ├── hashtag-limits.ts         # Hashtag rules
│   │   └── index.ts
│   └── index.ts
├── tests/
└── package.json
```

**Example API:**
```typescript
import { PostValidator } from '@q8t/validation'

const validation = PostValidator.validate({
  content: {
    text: "Check out this amazing product!",
    mediaUrls: ["https://..."],
    hashtags: ["#product", "#amazing"]
  },
  platform: 'instagram',
  postType: 'feed' // or 'story', 'reel'
})

// => {
//   valid: true,
//   errors: [],
//   warnings: ["Consider adding more hashtags (max 30)"]
// }

// Cross-platform validation
const multiPlatformValidation = PostValidator.validateMulti({
  content: {...},
  platforms: ['instagram', 'twitter', 'facebook']
})

// => {
//   instagram: { valid: true, ... },
//   twitter: { valid: false, errors: ["Text too long"] },
//   facebook: { valid: true, ... }
// }
```

---

### Package 4: `@q8t/scoring`

**Purpose:** Scoring algorithms (influencers, competitors, content)

**Responsibilities:**
- Influencer scoring
- Competitor ranking
- Content quality scoring
- Engagement quality (fake vs real)

**Module Structure:**
```
packages/scoring/
├── src/
│   ├── influencer/
│   │   ├── engagement-score.ts       # Influencer engagement
│   │   ├── authenticity-score.ts     # Fake follower detection
│   │   ├── relevance-score.ts        # Niche relevance
│   │   ├── composite-score.ts        # Overall influencer score
│   │   └── index.ts
│   ├── competitor/
│   │   ├── performance-score.ts      # Competitor performance
│   │   ├── growth-score.ts           # Growth rate scoring
│   │   └── index.ts
│   ├── content/
│   │   ├── quality-score.ts          # Content quality
│   │   ├── virality-score.ts         # Viral potential
│   │   └── index.ts
│   └── index.ts
├── tests/
└── package.json
```

**Example API:**
```typescript
import { InfluencerScorer } from '@q8t/scoring'

const score = InfluencerScorer.calculate({
  followerCount: 50000,
  avgLikes: 2500,
  avgComments: 150,
  avgShares: 50,
  postingFrequency: 5, // posts per week
  niche: 'technology'
})

// => {
//   overallScore: 87,
//   breakdown: {
//     engagement: 92,
//     authenticity: 88,
//     relevance: 85,
//     consistency: 87
//   },
//   tier: 'micro-influencer',
//   estimatedReach: 12500
// }
```

---

### Package 5: `@q8t/optimization`

**Purpose:** Content and strategy optimization

**Responsibilities:**
- Hashtag recommendations
- Caption optimization
- Posting schedule optimization
- Content mix optimization

**Module Structure:**
```
packages/optimization/
├── src/
│   ├── hashtags/
│   │   ├── recommender.ts            # Hashtag recommendations
│   │   ├── mix-optimizer.ts          # Optimal hashtag mix
│   │   ├── competition-analyzer.ts   # Hashtag competition
│   │   └── index.ts
│   ├── scheduling/
│   │   ├── time-optimizer.ts         # Best posting times
│   │   ├── frequency-optimizer.ts    # Optimal posting frequency
│   │   └── index.ts
│   ├── content/
│   │   ├── mix-optimizer.ts          # Content type mix
│   │   ├── length-optimizer.ts       # Optimal caption length
│   │   └── index.ts
│   └── index.ts
├── tests/
└── package.json
```

**Example API:**
```typescript
import { HashtagOptimizer } from '@q8t/optimization'

const recommendations = HashtagOptimizer.recommend({
  content: "Beautiful sunset at the beach",
  niche: "travel",
  platform: "instagram",
  currentHashtags: ["#sunset", "#beach"],
  competitionLevel: 'medium' // low/medium/high
})

// => {
//   recommended: [
//     { tag: "#sunsetlovers", score: 95, competition: "medium" },
//     { tag: "#beachlife", score: 92, competition: "medium" },
//     { tag: "#goldenhour", score: 88, competition: "high" }
//   ],
//   optimalMix: {
//     popular: 3,  // High competition, high reach
//     moderate: 5, // Medium competition
//     niche: 2     // Low competition, targeted
//   }
// }
```

---

### Package 6: `@q8t/media-transforms`

**Purpose:** Media processing algorithms (no actual file I/O)

**Responsibilities:**
- Dimension calculations
- Aspect ratio conversions
- Crop calculations
- Platform-specific size requirements

**Module Structure:**
```
packages/media-transforms/
├── src/
│   ├── dimensions/
│   │   ├── calculator.ts             # Calculate dimensions
│   │   ├── aspect-ratio.ts           # Aspect ratio handling
│   │   └── index.ts
│   ├── crops/
│   │   ├── smart-crop.ts             # Smart crop calculations
│   │   ├── face-centered.ts          # Face-centered crops
│   │   └── index.ts
│   ├── platforms/
│   │   ├── instagram-specs.ts        # Instagram requirements
│   │   ├── twitter-specs.ts          # Twitter requirements
│   │   └── index.ts
│   └── index.ts
├── tests/
└── package.json
```

**Example API:**
```typescript
import { MediaTransforms } from '@q8t/media-transforms'

// Calculate target dimensions for platform
const dimensions = MediaTransforms.calculateDimensions({
  source: { width: 1920, height: 1080 },
  platform: 'instagram',
  postType: 'feed'
})
// => { width: 1080, height: 1080, crop: {...} }

// Platform compatibility check
const compatibility = MediaTransforms.checkCompatibility({
  width: 1920,
  height: 1080,
  format: 'mp4',
  size: 50_000_000, // 50MB
  platform: 'twitter'
})
// => { compatible: false, issues: ["File too large (max 512MB)"] }
```

---

### Package 7: `@q8t/data-access` (Repository Pattern)

**Purpose:** Database access layer

**Responsibilities:**
- Abstract Supabase queries
- Provide typed repositories
- Handle database errors
- Transaction management

**Module Structure:**
```
packages/data-access/
├── src/
│   ├── repositories/
│   │   ├── post-repository.ts
│   │   ├── social-account-repository.ts
│   │   ├── analytics-repository.ts
│   │   ├── user-repository.ts
│   │   └── index.ts
│   ├── client/
│   │   └── supabase-client.ts
│   ├── errors/
│   │   └── database-errors.ts
│   └── index.ts
├── tests/
└── package.json
```

**Example API:**
```typescript
import { PostRepository, SocialAccountRepository } from '@q8t/data-access'
import { Effect } from 'effect'

// Usage in application service
const publishToInstagram = (postId: string) =>
  Effect.gen(function* () {
    const postRepo = yield* PostRepository
    const accountRepo = yield* SocialAccountRepository

    // Query database
    const post = yield* postRepo.findById(postId)
    const account = yield* accountRepo.findByPlatform(post.workspaceId, 'instagram')

    // ... business logic ...

    // Update database
    yield* postRepo.update(postId, { status: 'published' })
  })
```

---

## Package Dependency Rules

### Allowed Dependencies by Layer

```
Layer 1 (Platform SDKs)
├─ effect-sdk-base ✅
├─ effect ✅
├─ zod ✅
└─ platform-specific libs ✅

Layer 2 (Business Logic)
├─ effect ✅
├─ zod ✅
├─ date-fns ✅
├─ lodash ✅
└─ NO: SDKs ❌, databases ❌, HTTP clients ❌

Layer 3 (Data Access)
├─ @supabase/supabase-js ✅
├─ effect ✅
├─ zod ✅
└─ NO: SDKs ❌, business logic ✅ (can use)

Layer 4 (Application Services)
├─ Layer 2 packages ✅
├─ Layer 3 packages ✅
├─ Layer 1 packages ✅
└─ effect ✅

Layer 5 (Infrastructure/Jobs)
├─ inngest ✅
├─ Layer 4 packages ✅
└─ effect ✅
```

### Dependency Graph

```
┌─────────────────────────────────────────────────┐
│  Layer 5: Infrastructure (Jobs)                 │
│  @q8t/jobs                                      │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  Layer 4: Application Services                  │
│  @q8t/publishing-service                        │
│  @q8t/listening-service                         │
│  @q8t/analytics-service                         │
└────┬──────────────────┬─────────────────────────┘
     │                  │
     ▼                  ▼
┌────────────────┐  ┌──────────────────────────────┐
│  Layer 3:      │  │  Layer 2: Business Logic     │
│  Data Access   │  │  @q8t/analytics-engine       │
│                │  │  @q8t/sentiment              │
│  @q8t/         │  │  @q8t/validation             │
│  data-access   │  │  @q8t/scoring                │
│                │  │  @q8t/optimization           │
│                │  │  @q8t/media-transforms       │
└────────────────┘  └──────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────────┐
                    │  Layer 1: Platform   │
                    │  @q8t/*-sdk          │
                    └──────────────────────┘
```

### Forbidden Patterns ❌

```typescript
// ❌ BAD: Business logic importing SDK
// packages/analytics-engine/src/engagement.ts
import { InstagramClient } from '@q8t/instagram-sdk' // WRONG!

// ❌ BAD: Business logic importing database
// packages/sentiment/src/analyzer.ts
import { createClient } from '@supabase/supabase-js' // WRONG!

// ❌ BAD: SDK importing business logic
// packages/instagram-sdk/src/posts.ts
import { validatePost } from '@q8t/validation' // WRONG!

// ❌ BAD: Business logic importing Inngest
// packages/scoring/src/influencer.ts
import { inngest } from 'inngest' // WRONG!
```

### Correct Patterns ✅

```typescript
// ✅ GOOD: Business logic is pure
// packages/analytics-engine/src/engagement.ts
export const calculateEngagementRate = (metrics: PostMetrics): number => {
  return (metrics.likes + metrics.comments) / metrics.impressions
}

// ✅ GOOD: Application service uses business logic + data + SDK
// packages/publishing-service/src/publish.ts
import { PostRepository } from '@q8t/data-access'
import { validatePost } from '@q8t/validation'
import { InstagramClient } from '@q8t/instagram-sdk'

export const publishPost = (id: string) =>
  Effect.gen(function* () {
    const post = yield* PostRepository.findById(id)
    const validation = yield* validatePost(post, 'instagram')
    const result = yield* InstagramClient.posts.create(post)
    return result
  })

// ✅ GOOD: Job orchestrates service
// packages/jobs/src/publishing.ts
import { publishPost } from '@q8t/publishing-service'

export const publishPostJob = inngest.createFunction(...)
```

---

## Migration Strategy

### Phase 1: Extract Business Logic from Listening

**Steps:**

1. **Create `@q8t/sentiment` package**
   ```bash
   mkdir -p packages/sentiment/src/analyzers
   mkdir -p packages/sentiment/tests
   ```

2. **Move sentiment analysis**
   - Extract `analyzeSentimentSimple` from `packages/listening/src/functions/sentiment-analyzer.ts`
   - Move to `packages/sentiment/src/analyzers/keyword-based.ts`
   - Make it a pure function (remove Inngest dependencies)

3. **Update listening package**
   ```typescript
   // packages/listening/src/functions/sentiment-analyzer.ts
   import { KeywordAnalyzer } from '@q8t/sentiment'

   const analyzer = KeywordAnalyzer.create()
   const result = await analyzer.analyze({ text: mention.content })
   ```

4. **Write tests**
   ```typescript
   // packages/sentiment/tests/keyword-based.test.ts
   import { KeywordAnalyzer } from '../src/analyzers/keyword-based'

   test('detects negative sentiment', () => {
     const result = KeywordAnalyzer.analyze({
       text: "This is terrible!",
       language: 'en'
     })
     expect(result.sentiment).toBe('negative')
     expect(result.score).toBeLessThan(0)
   })
   ```

---

### Phase 2: Create Analytics Engine

**Steps:**

1. **Create `@q8t/analytics-engine` package**
   - Set up package structure
   - Add dependencies (effect, date-fns, zod)

2. **Implement engagement calculator**
   ```typescript
   // packages/analytics-engine/src/engagement/rate-calculator.ts
   export const calculateEngagementRate = (params: {
     likes: number
     comments: number
     shares: number
     impressions: number
   }): number => {
     const totalEngagement = params.likes + params.comments + params.shares
     return (totalEngagement / params.impressions) * 100
   }
   ```

3. **Implement performance scorer**
   ```typescript
   // packages/analytics-engine/src/performance/scoring.ts
   export const calculatePerformanceScore = (params: {
     engagementRate: number
     reach: number
     followerGrowth: number
     platform: Platform
   }): PerformanceScore => {
     // Implementation
   }
   ```

4. **Write comprehensive tests**

---

### Phase 3: Create Validation Package

**Steps:**

1. **Create `@q8t/validation` package**

2. **Extract validation from queue**
   - Move platform limit checking
   - Move media validation
   - Make all validations pure functions

3. **Update queue package**
   ```typescript
   import { PostValidator } from '@q8t/validation'

   const validation = PostValidator.validate({
     content: post,
     platform: 'instagram'
   })
   ```

---

### Phase 4: Create Data Access Layer

**Steps:**

1. **Create `@q8t/data-access` package**

2. **Implement repositories**
   ```typescript
   // packages/data-access/src/repositories/post-repository.ts
   export interface PostRepository {
     findById: (id: string) => Effect<Post, NotFoundError>
     create: (data: CreatePostInput) => Effect<Post, ValidationError>
   }

   export const PostRepositoryLive = Layer.succeed(PostRepository, {
     findById: (id) =>
       Effect.tryPromise({
         try: async () => {
           const { data, error } = await supabase
             .from('posts')
             .select('*')
             .eq('id', id)
             .single()

           if (error) throw error
           return data
         },
         catch: (e) => new NotFoundError({ id, cause: e })
       })
   })
   ```

---

### Phase 5: Create Application Services

**Steps:**

1. **Create service packages**
   - `@q8t/publishing-service`
   - `@q8t/analytics-service`
   - `@q8t/listening-service`

2. **Refactor existing queue/listening**
   - Move business logic to Layer 2
   - Move orchestration to Layer 4
   - Keep only Inngest job definitions in Layer 5

---

## Testing Strategy

### Layer 2: Business Logic (Unit Tests)
**Goal:** 100% coverage, fast tests

```typescript
// packages/analytics-engine/tests/engagement.test.ts
import { describe, it, expect } from 'vitest'
import { EngagementCalculator } from '../src/engagement'

describe('EngagementCalculator', () => {
  it('calculates engagement rate correctly', () => {
    const result = EngagementCalculator.calculateRate({
      likes: 100,
      comments: 20,
      shares: 10,
      impressions: 1000
    })

    expect(result.rate).toBe(13.0) // (100+20+10)/1000 * 100
    expect(result.tier).toBe('high')
  })

  it('handles zero impressions', () => {
    const result = EngagementCalculator.calculateRate({
      likes: 100,
      comments: 20,
      shares: 10,
      impressions: 0
    })

    expect(result.rate).toBe(0)
  })
})
```

**Benefits:**
- ✅ No mocking needed
- ✅ Fast execution (no I/O)
- ✅ Deterministic results
- ✅ Easy to debug

---

### Layer 3: Data Access (Integration Tests)
**Goal:** Test database queries with real database

```typescript
// packages/data-access/tests/post-repository.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { PostRepository } from '../src/repositories/post-repository'
import { setupTestDatabase, cleanupTestDatabase } from './test-helpers'

describe('PostRepository', () => {
  beforeEach(async () => {
    await setupTestDatabase()
  })

  it('finds post by id', async () => {
    const result = await Effect.runPromise(
      PostRepository.findById('post-123')
    )

    expect(result.id).toBe('post-123')
    expect(result.title).toBe('Test Post')
  })

  afterEach(async () => {
    await cleanupTestDatabase()
  })
})
```

---

### Layer 4: Application Services (Integration Tests)
**Goal:** Test coordination between layers

```typescript
// packages/publishing-service/tests/publish.test.ts
import { describe, it, expect, vi } from 'vitest'
import { publishPost } from '../src/publish'

describe('publishPost', () => {
  it('validates, publishes, and updates database', async () => {
    const mockSDK = vi.fn().mockResolvedValue({ id: 'platform-123' })

    const result = await Effect.runPromise(
      publishPost('post-123').pipe(
        Effect.provideService(InstagramClient, {
          posts: { create: mockSDK }
        })
      )
    )

    expect(mockSDK).toHaveBeenCalled()
    expect(result.status).toBe('published')
  })
})
```

---

### Layer 5: Jobs (E2E Tests)
**Goal:** Test full workflow

```typescript
// packages/jobs/tests/publish-job.test.ts
import { describe, it, expect } from 'vitest'
import { publishPostJob } from '../src/publishing'

describe('publishPostJob', () => {
  it('handles publish request end-to-end', async () => {
    const result = await inngest.send({
      name: 'post/publish.requested',
      data: { postId: 'post-123' }
    })

    // Wait for job completion
    await result.wait()

    // Check database
    const post = await db.posts.findById('post-123')
    expect(post.status).toBe('published')
  })
})
```

---

## Summary

### Key Principles

1. **Pure business logic** in Layer 2
   - No I/O, no side effects
   - Easy to test
   - Reusable across contexts

2. **Repository pattern** for data access
   - Abstract database details
   - Type-safe queries
   - Effect-based error handling

3. **Service layer** for orchestration
   - Coordinate between layers
   - Handle complex workflows
   - Business rules enforcement

4. **Jobs layer** for infrastructure
   - Only Inngest definitions
   - Delegate to services
   - Minimal logic

### Benefits

✅ **Testability:** Pure functions are easy to test
✅ **Reusability:** Business logic usable anywhere
✅ **Maintainability:** Clear boundaries between layers
✅ **Type Safety:** Effect + Zod throughout
✅ **No Duplication:** Each concern has one home

### Package Count by Layer

- Layer 1 (Platform SDKs): 31 packages (existing)
- Layer 2 (Business Logic): 6 packages (new)
- Layer 3 (Data Access): 1 package (new)
- Layer 4 (Services): 4 packages (new)
- Layer 5 (Jobs): 1 package (refactored from queue + listening)

**Total:** 43 packages (from 34)

**New packages:** 12
**Refactored:** 2 (queue → services, listening → services)

---

**End of Document**
