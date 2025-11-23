/**
 * @q8t/sentiment
 *
 * Sentiment and emotion analysis for social media content.
 *
 * Pure business logic with no dependencies on:
 * - Platform SDKs
 * - Database clients
 * - Job queues
 * - HTTP clients
 *
 * Can be used anywhere: API routes, background jobs, CLI tools, etc.
 */

// Types
export type {
  Sentiment,
  AnalyzeInput,
  BatchAnalyzeInput,
  SentimentResult,
  BatchSentimentResult,
  Emotion,
  AnalyzerConfig,
} from './types'

export {
  SentimentSchema,
  AnalyzeInputSchema,
  BatchAnalyzeInputSchema,
  SentimentResultSchema,
  BatchSentimentResultSchema,
} from './types'

// Analyzers
export { KeywordAnalyzer } from './analyzers'
