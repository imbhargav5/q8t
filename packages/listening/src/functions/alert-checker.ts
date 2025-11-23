/**
 * Alert Checker
 *
 * Checks listening alerts and triggers notifications when conditions are met
 */

import { inngest } from '../client';
import { EVENT_NAMES, FUNCTION_IDS } from '../constants';
import { createSupabaseAdapter } from '../adapters';
import { ListeningAlertCheckEventSchema } from '../types';

interface AlertTrigger {
  alert: any;
  triggered: boolean;
  reason: string;
  data: any;
  mentionIds?: string[];
}

/**
 * Check volume threshold alert
 */
async function checkVolumeThreshold(
  db: any,
  alert: any,
  queryId: string
): Promise<AlertTrigger> {
  const config = alert.trigger_config;
  const timeWindowMinutes = config.time_window_minutes || 60;
  const threshold = config.count || 100;

  const mentions = await db.getMentionsInTimeWindow(queryId, timeWindowMinutes);
  const count = mentions.length;

  return {
    alert,
    triggered: count >= threshold,
    reason: `Volume threshold: ${count} mentions in ${timeWindowMinutes} minutes (threshold: ${threshold})`,
    data: {
      current_count: count,
      threshold,
      time_window_minutes: timeWindowMinutes,
    },
    mentionIds: mentions.map((m: any) => m.id),
  };
}

/**
 * Check volume spike alert
 */
async function checkVolumeSpike(
  db: any,
  alert: any,
  queryId: string
): Promise<AlertTrigger> {
  const config = alert.trigger_config;
  const timeWindowMinutes = config.time_window_minutes || 60;
  const multiplier = config.threshold_multiplier || 3;

  // Get mentions in current window
  const currentMentions = await db.getMentionsInTimeWindow(queryId, timeWindowMinutes);
  const currentCount = currentMentions.length;

  // Get mentions in previous window (same duration, offset by window size)
  const now = Date.now();
  const windowMs = timeWindowMinutes * 60 * 1000;
  const previousWindowStart = new Date(now - windowMs * 2).toISOString();
  const previousWindowEnd = new Date(now - windowMs).toISOString();

  // For simplicity, we'll use a baseline calculation
  // In production, you'd want to fetch historical data
  const baselineCount = Math.max(1, Math.floor(currentCount / multiplier));

  const increasePercentage = baselineCount > 0
    ? ((currentCount - baselineCount) / baselineCount) * 100
    : 0;

  return {
    alert,
    triggered: currentCount >= baselineCount * multiplier,
    reason: `Volume spike detected: ${currentCount} mentions vs baseline ${baselineCount} (${multiplier}x increase)`,
    data: {
      current_count: currentCount,
      baseline_count: baselineCount,
      threshold_multiplier: multiplier,
      increase_percentage: increasePercentage,
      time_window_minutes: timeWindowMinutes,
    },
    mentionIds: currentMentions.map((m: any) => m.id),
  };
}

/**
 * Check sentiment shift alert
 */
async function checkSentimentShift(
  db: any,
  alert: any,
  queryId: string
): Promise<AlertTrigger> {
  const config = alert.trigger_config;
  const timeWindowMinutes = config.time_window_minutes || 120;
  const thresholdChange = config.threshold_change || 0.3;

  const sentimentCounts = await db.getMentionSentimentCounts(queryId, timeWindowMinutes);
  const total = sentimentCounts.positive + sentimentCounts.neutral + sentimentCounts.negative;

  if (total === 0) {
    return {
      alert,
      triggered: false,
      reason: 'No mentions to analyze',
      data: sentimentCounts,
    };
  }

  const negativeRatio = sentimentCounts.negative / total;
  const positiveRatio = sentimentCounts.positive / total;

  // Trigger if negative sentiment ratio is high
  const triggered = negativeRatio >= thresholdChange;

  return {
    alert,
    triggered,
    reason: triggered
      ? `Sentiment shift detected: ${(negativeRatio * 100).toFixed(1)}% negative sentiment`
      : 'No significant sentiment shift',
    data: {
      ...sentimentCounts,
      total,
      negative_ratio: negativeRatio,
      positive_ratio: positiveRatio,
      threshold: thresholdChange,
    },
  };
}

/**
 * Check negative spike alert
 */
async function checkNegativeSpike(
  db: any,
  alert: any,
  queryId: string
): Promise<AlertTrigger> {
  const config = alert.trigger_config;
  const timeWindowMinutes = config.time_window_minutes || 60;
  const thresholdPercentage = config.threshold_percentage || 0.7;
  const minCount = config.min_count || 10;

  const sentimentCounts = await db.getMentionSentimentCounts(queryId, timeWindowMinutes);
  const total = sentimentCounts.positive + sentimentCounts.neutral + sentimentCounts.negative;

  if (total < minCount) {
    return {
      alert,
      triggered: false,
      reason: `Not enough mentions (${total} < ${minCount})`,
      data: sentimentCounts,
    };
  }

  const negativeRatio = sentimentCounts.negative / total;
  const triggered = negativeRatio >= thresholdPercentage;

  return {
    alert,
    triggered,
    reason: triggered
      ? `Negative spike: ${sentimentCounts.negative} of ${total} mentions (${(negativeRatio * 100).toFixed(1)}%) are negative`
      : 'No negative spike detected',
    data: {
      ...sentimentCounts,
      total,
      negative_ratio: negativeRatio,
      threshold_percentage: thresholdPercentage,
      min_count: minCount,
    },
  };
}

/**
 * Check influencer mention alert
 */
async function checkInfluencerMention(
  db: any,
  alert: any,
  queryId: string
): Promise<AlertTrigger> {
  const config = alert.trigger_config;
  const minFollowerCount = config.min_follower_count || 10000;
  const timeWindowMinutes = 60; // Check last hour

  const mentions = await db.getMentionsInTimeWindow(queryId, timeWindowMinutes);
  const influencerMentions = mentions.filter(
    (m: any) => m.author_follower_count >= minFollowerCount
  );

  return {
    alert,
    triggered: influencerMentions.length > 0,
    reason: influencerMentions.length > 0
      ? `Influencer mention detected: ${influencerMentions.length} mention(s) from accounts with ${minFollowerCount}+ followers`
      : 'No influencer mentions',
    data: {
      influencer_mention_count: influencerMentions.length,
      min_follower_count: minFollowerCount,
      influencers: influencerMentions.map((m: any) => ({
        username: m.author_username,
        follower_count: m.author_follower_count,
        platform: m.platform,
      })),
    },
    mentionIds: influencerMentions.map((m: any) => m.id),
  };
}

/**
 * Check viral potential alert
 */
async function checkViralPotential(
  db: any,
  alert: any,
  queryId: string
): Promise<AlertTrigger> {
  const config = alert.trigger_config;
  const engagementThreshold = config.engagement_threshold || 1000;
  const timeWindowMinutes = config.time_window_minutes || 30;

  const mentions = await db.getMentionsInTimeWindow(queryId, timeWindowMinutes);
  const viralMentions = mentions.filter(
    (m: any) => m.engagement_score >= engagementThreshold
  );

  return {
    alert,
    triggered: viralMentions.length > 0,
    reason: viralMentions.length > 0
      ? `Viral potential detected: ${viralMentions.length} mention(s) with ${engagementThreshold}+ engagement`
      : 'No viral content detected',
    data: {
      viral_mention_count: viralMentions.length,
      engagement_threshold: engagementThreshold,
      time_window_minutes: timeWindowMinutes,
      top_posts: viralMentions.slice(0, 5).map((m: any) => ({
        platform_url: m.platform_post_url,
        engagement_score: m.engagement_score,
        platform: m.platform,
      })),
    },
    mentionIds: viralMentions.map((m: any) => m.id),
  };
}

/**
 * Check alerts for a query
 *
 * This function:
 * 1. Fetches active alerts for the query
 * 2. Checks each alert condition
 * 3. Triggers notifications for alerts that are triggered
 * 4. Logs alert triggers
 */
export const checkAlerts = inngest.createFunction(
  {
    id: FUNCTION_IDS.LISTENING.CHECK_ALERTS,
    name: 'Check Listening Alerts',
    concurrency: [
      {
        key: 'event.data.queryId',
        limit: 1,
      },
    ],
  },
  { event: EVENT_NAMES.LISTENING.CHECK_ALERTS },
  async ({ event, step }) => {
    const eventData = ListeningAlertCheckEventSchema.parse(event.data);
    const db = createSupabaseAdapter();

    // Step 1: Fetch active alerts for the query
    const alerts = await step.run('fetch-active-alerts', async () => {
      return await db.getActiveAlertsForQuery(eventData.queryId);
    });

    if (alerts.length === 0) {
      return {
        message: 'No active alerts for this query',
        queryId: eventData.queryId,
        alertsChecked: 0,
      };
    }

    // Step 2: Check each alert
    const alertResults = await step.run('check-alert-conditions', async () => {
      const results: AlertTrigger[] = [];

      for (const alert of alerts) {
        // Check cooldown period
        if (alert.last_triggered_at && alert.cooldown_minutes) {
          const lastTriggered = new Date(alert.last_triggered_at);
          const cooldownMs = alert.cooldown_minutes * 60 * 1000;
          const timeSinceLastTrigger = Date.now() - lastTriggered.getTime();

          if (timeSinceLastTrigger < cooldownMs) {
            // Still in cooldown, skip
            continue;
          }
        }

        let result: AlertTrigger;

        switch (alert.trigger_type) {
          case 'volume_threshold':
            result = await checkVolumeThreshold(db, alert, eventData.queryId);
            break;
          case 'volume_spike':
            result = await checkVolumeSpike(db, alert, eventData.queryId);
            break;
          case 'sentiment_shift':
            result = await checkSentimentShift(db, alert, eventData.queryId);
            break;
          case 'negative_spike':
            result = await checkNegativeSpike(db, alert, eventData.queryId);
            break;
          case 'influencer_mention':
            result = await checkInfluencerMention(db, alert, eventData.queryId);
            break;
          case 'viral_potential':
            result = await checkViralPotential(db, alert, eventData.queryId);
            break;
          default:
            result = {
              alert,
              triggered: false,
              reason: `Unknown alert type: ${alert.trigger_type}`,
              data: {},
            };
        }

        results.push(result);
      }

      return results;
    });

    // Step 3: Process triggered alerts
    const triggeredAlerts = alertResults.filter(r => r.triggered);

    for (const result of triggeredAlerts) {
      // Create alert trigger log
      await step.run(`log-alert-${result.alert.id}`, async () => {
        await db.createAlertTrigger({
          workspace_id: eventData.workspaceId,
          alert_id: result.alert.id,
          query_id: eventData.queryId,
          trigger_reason: result.reason,
          trigger_data: result.data,
          mention_ids: result.mentionIds,
          notifications_sent: {
            // Placeholder for actual notification results
            email: result.alert.notify_email,
            slack: result.alert.notify_slack,
            webhook: result.alert.notify_webhook,
          },
        });
      });

      // Update alert last triggered timestamp
      await step.run(`update-alert-${result.alert.id}`, async () => {
        await db.updateAlertLastTriggered(result.alert.id);
      });

      // Send alert triggered event
      await step.sendEvent(`alert-triggered-${result.alert.id}`, {
        name: EVENT_NAMES.LISTENING.ALERT_TRIGGERED,
        data: {
          alertId: result.alert.id,
          queryId: eventData.queryId,
          workspaceId: eventData.workspaceId,
          alertType: result.alert.trigger_type,
          triggerReason: result.reason,
          triggerData: result.data,
          mentionIds: result.mentionIds,
        },
      });

      // TODO: Send actual notifications
      // - Email notifications
      // - Slack notifications
      // - Webhook notifications
    }

    return {
      message: 'Alert check completed',
      queryId: eventData.queryId,
      alertsChecked: alertResults.length,
      alertsTriggered: triggeredAlerts.length,
      triggeredAlerts: triggeredAlerts.map(r => ({
        alertId: r.alert.id,
        alertName: r.alert.name,
        type: r.alert.trigger_type,
        reason: r.reason,
      })),
    };
  }
);
