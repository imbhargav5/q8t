/**
 * Sentiment Analyzer
 *
 * Analyzes sentiment of listening mentions using sentiment analysis package
 */

import { inngest } from '../client';
import { EVENT_NAMES, FUNCTION_IDS } from '../constants';
import { createSupabaseAdapter } from '../adapters';
import { ListeningSentimentAnalyzeEventSchema } from '../types';
import { KeywordAnalyzer } from '@q8t/sentiment';

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
          // Use keyword-based sentiment analysis from @q8t/sentiment package
          // Can be replaced with AI-based analyzers (OpenAI, Claude) when needed
          const analysis = KeywordAnalyzer.analyze({
            text: mention.content,
            language: 'en',
          });

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
