/**
 * Event payload types for Inngest functions
 */

import { z } from 'zod';

/**
 * Listening query process event
 */
export const ListeningQueryProcessEventSchema = z.object({
  queryId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  queryName: z.string(),
});

export type ListeningQueryProcessEvent = z.infer<typeof ListeningQueryProcessEventSchema>;

/**
 * Listening mentions found event
 */
export const ListeningMentionsFoundEventSchema = z.object({
  queryId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  mentionIds: z.array(z.string().uuid()),
  mentionCount: z.number(),
});

export type ListeningMentionsFoundEvent = z.infer<typeof ListeningMentionsFoundEventSchema>;

/**
 * Listening sentiment analyze event
 */
export const ListeningSentimentAnalyzeEventSchema = z.object({
  mentionIds: z.array(z.string().uuid()),
  batchSize: z.number().default(10),
});

export type ListeningSentimentAnalyzeEvent = z.infer<typeof ListeningSentimentAnalyzeEventSchema>;

/**
 * Listening alert check event
 */
export const ListeningAlertCheckEventSchema = z.object({
  queryId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  checkType: z.enum(['volume_spike', 'volume_threshold', 'sentiment_shift', 'negative_spike', 'viral_potential', 'influencer_mention']),
});

export type ListeningAlertCheckEvent = z.infer<typeof ListeningAlertCheckEventSchema>;

/**
 * Listening alert triggered event
 */
export const ListeningAlertTriggeredEventSchema = z.object({
  alertId: z.string().uuid(),
  queryId: z.string().uuid().optional(),
  workspaceId: z.string().uuid(),
  alertType: z.string(),
  triggerReason: z.string(),
  triggerData: z.any().optional(),
  mentionIds: z.array(z.string().uuid()).optional(),
});

export type ListeningAlertTriggeredEvent = z.infer<typeof ListeningAlertTriggeredEventSchema>;
