# @q8t/analytics-engine

Pure analytics calculations for social media metrics.

## Features

- **Engagement Calculations**: Rates, breakdowns, and trends
- **Performance Scoring**: 0-100 scores with tier classification
- **Trend Analysis**: Growth rates, momentum, and forecasting
- **Optimization**: Best posting times and content recommendations
- **Cross-Platform**: Aggregate metrics across multiple platforms

## Installation

```bash
pnpm add @q8t/analytics-engine
```

## Usage

### Engagement Rate Calculation

```typescript
import { EngagementCalculator } from '@q8t/analytics-engine'

const rate = EngagementCalculator.calculateRate({
  likes: 150,
  comments: 25,
  shares: 10,
  impressions: 5000,
  followerCount: 10000,
})

// Result:
// {
//   rate: 3.7,
//   totalEngagement: 185,
//   breakdown: { likes: 150, comments: 25, shares: 10 },
//   tier: 'high'
// }
```

### Performance Scoring

```typescript
import { PerformanceScorer } from '@q8t/analytics-engine'

const score = PerformanceScorer.calculateScore({
  engagementRate: 3.7,
  reach: 5000,
  followerGrowth: 50,
  platform: 'instagram',
})

// Result:
// {
//   score: 82,
//   tier: 'high',
//   factors: {
//     engagement: 85,
//     reach: 78,
//     growth: 82
//   }
// }
```

### Best Posting Times

```typescript
import { TimeOptimizer } from '@q8t/analytics-engine'

const bestTimes = TimeOptimizer.findBestTimes({
  historicalPosts: [
    { postedAt: new Date('2024-01-01T10:00:00Z'), engagement: 150 },
    { postedAt: new Date('2024-01-02T14:00:00Z'), engagement: 200 },
    // ... more posts
  ],
  timezone: 'America/New_York',
})

// Result:
// [
//   { hour: 10, dayOfWeek: 'Tuesday', score: 95, avgEngagement: 187 },
//   { hour: 14, dayOfWeek: 'Wednesday', score: 92, avgEngagement: 175 },
//   ...
// ]
```

## Architecture

This package contains **pure business logic** with no dependencies on:
- ❌ Platform SDKs
- ❌ Database clients
- ❌ HTTP clients
- ❌ Job queues (Inngest)

All functions are pure and accept plain data objects.

## Testing

```bash
pnpm test
```

All functions are pure and easily testable without mocks.
