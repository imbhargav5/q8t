# @q8t/sentiment

Sentiment and emotion analysis for social media content.

## Features

- **Sentiment Classification**: Positive, negative, or neutral
- **Emotion Detection**: Joy, anger, frustration, disappointment, etc.
- **Keyword Extraction**: Extract sentiment-driving keywords
- **Confidence Scoring**: Measure confidence in classifications
- **Multiple Analyzers**: Keyword-based (fast) and AI-based (accurate)
- **Batch Processing**: Analyze multiple texts efficiently

## Installation

```bash
pnpm add @q8t/sentiment
```

## Usage

### Keyword-Based Analysis (Fast, Offline)

```typescript
import { KeywordAnalyzer } from '@q8t/sentiment'

const analyzer = KeywordAnalyzer.create()

const result = await analyzer.analyze({
  text: "This product is terrible! Very disappointed.",
  language: 'en'
})

// Result:
// {
//   sentiment: 'negative',
//   score: -0.85,
//   confidence: 0.92,
//   emotions: { anger: 0.7, disappointment: 0.8 },
//   keywords: ['terrible', 'disappointed']
// }
```

### Batch Processing

```typescript
const results = await analyzer.analyzeBatch([
  { id: '1', text: 'Love this!' },
  { id: '2', text: 'Hate it!' },
  { id: '3', text: 'It\'s okay I guess' }
])

// Returns array of results with IDs
```

## Architecture

This package contains **pure business logic** with no dependencies on:
- ❌ Platform SDKs
- ❌ Database clients
- ❌ HTTP clients
- ❌ Job queues (Inngest)

It can be used anywhere: API routes, background jobs, CLI tools, etc.

## API

### Types

```typescript
export type Sentiment = 'positive' | 'negative' | 'neutral'

export interface SentimentResult {
  sentiment: Sentiment
  score: number        // -1 to 1
  confidence: number   // 0 to 1
  emotions: Record<string, number>
  keywords: string[]
}

export interface AnalyzeInput {
  text: string
  language?: string
}
```

### Analyzers

- `KeywordAnalyzer` - Fast keyword matching (offline)
- `OpenAIAnalyzer` - OpenAI API-based (accurate, requires API key)
- `ClaudeAnalyzer` - Anthropic Claude API-based (accurate, requires API key)

## Testing

```bash
pnpm test
```

All functions are pure and easily testable without mocks.
