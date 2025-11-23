import { z } from 'zod'

/**
 * Sentiment classification
 */
export const SentimentSchema = z.enum(['positive', 'negative', 'neutral'])
export type Sentiment = z.infer<typeof SentimentSchema>

/**
 * Input for sentiment analysis
 */
export const AnalyzeInputSchema = z.object({
  text: z.string().min(1),
  language: z.string().optional().default('en'),
})
export type AnalyzeInput = z.infer<typeof AnalyzeInputSchema>

/**
 * Batch analysis input
 */
export const BatchAnalyzeInputSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  language: z.string().optional(),
})
export type BatchAnalyzeInput = z.infer<typeof BatchAnalyzeInputSchema>

/**
 * Sentiment analysis result
 */
export const SentimentResultSchema = z.object({
  sentiment: SentimentSchema,
  score: z.number().min(-1).max(1),
  confidence: z.number().min(0).max(1),
  emotions: z.record(z.string(), z.number()),
  keywords: z.array(z.string()),
})
export type SentimentResult = z.infer<typeof SentimentResultSchema>

/**
 * Batch analysis result
 */
export const BatchSentimentResultSchema = SentimentResultSchema.extend({
  id: z.string(),
})
export type BatchSentimentResult = z.infer<typeof BatchSentimentResultSchema>

/**
 * Emotion types
 */
export type Emotion =
  | 'joy'
  | 'love'
  | 'surprise'
  | 'anger'
  | 'sadness'
  | 'fear'
  | 'disgust'
  | 'frustration'
  | 'disappointment'
  | 'excitement'
  | 'satisfaction'
  | 'confusion'

/**
 * Analyzer configuration
 */
export interface AnalyzerConfig {
  language?: string
  includeEmotions?: boolean
  includeKeywords?: boolean
}
