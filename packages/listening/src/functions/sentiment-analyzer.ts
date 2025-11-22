/**
 * Sentiment Analyzer
 *
 * Analyzes sentiment of listening mentions using AI/ML
 */

import { inngest } from '../client';
import { EVENT_NAMES, FUNCTION_IDS } from '../constants';
import { createSupabaseAdapter } from '../adapters';
import { ListeningSentimentAnalyzeEventSchema } from '../types';

/**
 * Simple sentiment analysis using keyword matching
 * In production, this would use a proper NLP/ML service like:
 * - OpenAI API
 * - Google Cloud Natural Language API
 * - AWS Comprehend
 * - Hugging Face Transformers
 */
function analyzeSentimentSimple(text: string): {
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  confidence: number;
  keywords: string[];
} {
  const lowerText = text.toLowerCase();

  // Positive keywords
  const positiveKeywords = [
    'love', 'great', 'awesome', 'excellent', 'amazing', 'wonderful',
    'fantastic', 'best', 'perfect', 'happy', 'glad', 'thanks', 'thank you',
    'appreciate', 'impressed', 'outstanding', 'brilliant', 'superb',
    'delighted', 'excited', 'innovation', 'seamless', 'beautiful',
  ];

  // Negative keywords
  const negativeKeywords = [
    'hate', 'terrible', 'awful', 'bad', 'worst', 'horrible', 'poor',
    'disappointed', 'frustrating', 'frustrated', 'angry', 'mad', 'sucks',
    'useless', 'broken', 'bug', 'error', 'issue', 'problem', 'fail',
    'failed', 'not working', 'doesn\'t work', 'crash', 'slow', 'laggy',
  ];

  let positiveCount = 0;
  let negativeCount = 0;
  const matchedKeywords: string[] = [];

  // Count positive keywords
  positiveKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      positiveCount++;
      matchedKeywords.push(keyword);
    }
  });

  // Count negative keywords
  negativeKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      negativeCount++;
      matchedKeywords.push(keyword);
    }
  });

  // Determine sentiment
  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
  let score = 0;
  let confidence = 0.5;

  if (positiveCount > negativeCount) {
    sentiment = 'positive';
    score = Math.min(1.0, 0.3 + (positiveCount * 0.15));
    confidence = Math.min(0.95, 0.6 + (positiveCount * 0.1));
  } else if (negativeCount > positiveCount) {
    sentiment = 'negative';
    score = Math.max(-1.0, -0.3 - (negativeCount * 0.15));
    confidence = Math.min(0.95, 0.6 + (negativeCount * 0.1));
  } else if (positiveCount === 0 && negativeCount === 0) {
    sentiment = 'neutral';
    score = 0;
    confidence = 0.5;
  } else {
    // Mixed sentiment
    sentiment = 'neutral';
    score = 0;
    confidence = 0.6;
  }

  return {
    sentiment,
    score,
    confidence,
    keywords: matchedKeywords,
  };
}

/**
 * Analyze sentiment for mentions
 *
 * This function:
 * 1. Receives a batch of mention IDs
 * 2. Fetches unprocessed mentions
 * 3. Analyzes sentiment using NLP
 * 4. Updates mentions with sentiment data
 */
export const analyzeSentiment = inngest.createFunction(
  {
    id: FUNCTION_IDS.LISTENING.ANALYZE_SENTIMENT,
    name: 'Analyze Sentiment',
    concurrency: [
      {
        limit: 5, // Process up to 5 batches concurrently
      },
    ],
  },
  { event: EVENT_NAMES.LISTENING.ANALYZE_SENTIMENT },
  async ({ event, step }) => {
    const eventData = ListeningSentimentAnalyzeEventSchema.parse(event.data);
    const db = createSupabaseAdapter();

    // Step 1: Fetch unprocessed mentions
    const mentions = await step.run('fetch-unprocessed-mentions', async () => {
      // If specific mention IDs provided, fetch those
      // Otherwise, fetch a batch of unprocessed mentions
      const unprocessed = await db.getUnprocessedMentions(eventData.batchSize || 100);

      // Filter to only the requested IDs if provided
      if (eventData.mentionIds && eventData.mentionIds.length > 0) {
        return unprocessed.filter((m: any) => eventData.mentionIds.includes(m.id));
      }

      return unprocessed;
    });

    if (mentions.length === 0) {
      return {
        message: 'No mentions to analyze',
        processed: 0,
      };
    }

    // Step 2: Analyze sentiment for each mention
    const results = await step.run('analyze-sentiments', async () => {
      const analyzed: any[] = [];

      for (const mention of mentions) {
        try {
          // In production, this would call an external AI/ML service
          // For now, using simple keyword-based analysis
          const analysis = analyzeSentimentSimple(mention.content);

          analyzed.push({
            mentionId: mention.id,
            sentiment: analysis.sentiment,
            sentimentScore: analysis.score,
            sentimentConfidence: analysis.confidence,
            sentimentKeywords: analysis.keywords,
            success: true,
          });
        } catch (error: any) {
          analyzed.push({
            mentionId: mention.id,
            error: error.message,
            success: false,
          });
        }
      }

      return analyzed;
    });

    // Step 3: Update mentions with sentiment data
    await step.run('update-mention-sentiments', async () => {
      const updatePromises = results
        .filter((r: any) => r.success)
        .map((r: any) =>
          db.updateMentionSentiment(
            r.mentionId,
            r.sentiment,
            r.sentimentScore,
            r.sentimentConfidence,
            r.sentimentKeywords
          )
        );

      await Promise.all(updatePromises);
    });

    // Step 4: Send completion event
    await step.sendEvent('sentiment-analyzed', {
      name: EVENT_NAMES.LISTENING.SENTIMENT_ANALYZED,
      data: {
        processedCount: results.filter((r: any) => r.success).length,
        failedCount: results.filter((r: any) => !r.success).length,
      },
    });

    return {
      message: 'Sentiment analysis completed',
      totalMentions: mentions.length,
      processed: results.filter((r: any) => r.success).length,
      failed: results.filter((r: any) => !r.success).length,
      results: results.map((r: any) => ({
        mentionId: r.mentionId,
        sentiment: r.sentiment,
        score: r.sentimentScore,
        success: r.success,
      })),
    };
  }
);
