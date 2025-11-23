// ============================================================================
// CRISIS ANALYTICS DATA
// Time-series and analytics data for crisis incident visualizations
// ============================================================================

export interface SentimentTrendDataPoint {
  timestamp: string;
  sentimentScore: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  totalCount: number;
}

export interface VolumeTrendDataPoint {
  timestamp: string;
  count: number;
  baseline?: number;
}

export interface EmotionDistribution {
  emotion: string;
  value: number;
  color: string;
}

export interface KeywordFrequency {
  keyword: string;
  count: number;
  sentiment: "positive" | "neutral" | "negative";
}

// Sentiment trend data for incident-1 (Sentiment Spike)
export const sentimentTrendDataIncident1: SentimentTrendDataPoint[] = [
  {
    timestamp: "2025-11-22T10:00:00Z",
    sentimentScore: 0.15,
    positiveCount: 5,
    neutralCount: 3,
    negativeCount: 2,
    totalCount: 10,
  },
  {
    timestamp: "2025-11-22T10:15:00Z",
    sentimentScore: 0.08,
    positiveCount: 4,
    neutralCount: 4,
    negativeCount: 3,
    totalCount: 11,
  },
  {
    timestamp: "2025-11-22T10:30:00Z",
    sentimentScore: -0.25,
    positiveCount: 2,
    neutralCount: 3,
    negativeCount: 8,
    totalCount: 13,
  },
  {
    timestamp: "2025-11-22T10:45:00Z",
    sentimentScore: -0.52,
    positiveCount: 2,
    neutralCount: 2,
    negativeCount: 12,
    totalCount: 16,
  },
  {
    timestamp: "2025-11-22T11:00:00Z",
    sentimentScore: -0.68,
    positiveCount: 1,
    neutralCount: 2,
    negativeCount: 15,
    totalCount: 18,
  },
  {
    timestamp: "2025-11-22T11:15:00Z",
    sentimentScore: -0.75,
    positiveCount: 1,
    neutralCount: 1,
    negativeCount: 18,
    totalCount: 20,
  },
  {
    timestamp: "2025-11-22T11:30:00Z",
    sentimentScore: -0.72,
    positiveCount: 2,
    neutralCount: 2,
    negativeCount: 19,
    totalCount: 23,
  },
  {
    timestamp: "2025-11-22T11:45:00Z",
    sentimentScore: -0.65,
    positiveCount: 3,
    neutralCount: 3,
    negativeCount: 20,
    totalCount: 26,
  },
  {
    timestamp: "2025-11-22T12:00:00Z",
    sentimentScore: -0.62,
    positiveCount: 4,
    neutralCount: 4,
    negativeCount: 21,
    totalCount: 29,
  },
];

// Volume trend data with baseline
export const volumeTrendDataIncident1: VolumeTrendDataPoint[] = [
  { timestamp: "2025-11-22T08:00:00Z", count: 8, baseline: 10 },
  { timestamp: "2025-11-22T09:00:00Z", count: 12, baseline: 10 },
  { timestamp: "2025-11-22T10:00:00Z", count: 15, baseline: 10 },
  { timestamp: "2025-11-22T10:30:00Z", count: 35, baseline: 10 },
  { timestamp: "2025-11-22T11:00:00Z", count: 52, baseline: 10 },
  { timestamp: "2025-11-22T11:30:00Z", count: 48, baseline: 10 },
  { timestamp: "2025-11-22T12:00:00Z", count: 42, baseline: 10 },
];

// Emotion distribution for incident-1
export const emotionDistributionIncident1: EmotionDistribution[] = [
  { emotion: "Anger", value: 60, color: "#dc2626" },
  { emotion: "Frustration", value: 50, color: "#ea580c" },
  { emotion: "Disappointment", value: 30, color: "#f59e0b" },
  { emotion: "Confusion", value: 15, color: "#eab308" },
  { emotion: "Sadness", value: 10, color: "#64748b" },
];

// Keyword frequency for incident-1
export const keywordFrequencyIncident1: KeywordFrequency[] = [
  { keyword: "delayed", count: 47, sentiment: "negative" },
  { keyword: "frustrated", count: 32, sentiment: "negative" },
  { keyword: "unacceptable", count: 28, sentiment: "negative" },
  { keyword: "disappointed", count: 24, sentiment: "negative" },
  { keyword: "terrible", count: 21, sentiment: "negative" },
  { keyword: "awful", count: 18, sentiment: "negative" },
  { keyword: "bad", count: 15, sentiment: "negative" },
  { keyword: "poor", count: 12, sentiment: "negative" },
  { keyword: "waiting", count: 35, sentiment: "neutral" },
  { keyword: "shipping", count: 52, sentiment: "neutral" },
  { keyword: "order", count: 45, sentiment: "neutral" },
  { keyword: "customer service", count: 23, sentiment: "neutral" },
];

// Platform distribution for incident-1
export const platformDistributionIncident1 = [
  { platform: "twitter", name: "Twitter", count: 47, percentage: 72 },
  { platform: "instagram", name: "Instagram", count: 12, percentage: 18 },
  { platform: "facebook", name: "Facebook", count: 5, percentage: 8 },
  { platform: "youtube", name: "YouTube", count: 1, percentage: 2 },
];

// Engagement metrics comparison (for engagement drop incidents)
export const engagementMetricsIncident3 = {
  current: {
    likes: 87,
    comments: 32,
    shares: 26,
    views: 1245,
    engagementRate: 8.2,
  },
  baseline: {
    likes: 245,
    comments: 105,
    shares: 70,
    views: 3890,
    engagementRate: 23.5,
  },
  change: {
    likes: -64,
    comments: -70,
    shares: -63,
    views: -68,
    engagementRate: -65,
  },
};

// Engagement rate over time (7 days)
export const engagementRateTrendIncident3 = [
  { day: "Mon", current: 22.5, baseline: 23.5 },
  { day: "Tue", current: 21.8, baseline: 23.5 },
  { day: "Wed", current: 23.1, baseline: 23.5 },
  { day: "Thu", current: 22.3, baseline: 23.5 },
  { day: "Fri", current: 18.5, baseline: 23.5 },
  { day: "Sat", current: 8.2, baseline: 23.5 },
  { day: "Sun", current: 8.2, baseline: 23.5 },
];

// Geographic distribution (for incidents with location data)
export const geographicDistribution = [
  { country: "United States", code: "US", count: 42, percentage: 65, flag: "🇺🇸" },
  { country: "United Kingdom", code: "GB", count: 13, percentage: 20, flag: "🇬🇧" },
  { country: "Canada", code: "CA", count: 6, percentage: 10, flag: "🇨🇦" },
  { country: "Other", code: "XX", count: 4, percentage: 5, flag: "🌍" },
];

// Influencer mentions
export const influencerMentions = [
  {
    id: "influencer-1",
    name: "TechReviewer Pro",
    handle: "@techreviewerpro",
    platform: "youtube",
    followers: 234000,
    verified: true,
    sentiment: -0.62,
    reach: 12500,
    engagement: 401,
    content: "My Honest Review - Major Disappointment",
  },
  {
    id: "influencer-2",
    name: "Unboxing Queen",
    handle: "@unboxingqueen",
    platform: "tiktok",
    followers: 2300000,
    verified: true,
    sentiment: -0.82,
    reach: 234000,
    engagement: 55100,
    content: "Unboxing disaster 😭 This is NOT what I ordered",
  },
  {
    id: "influencer-3",
    name: "Mike Chen",
    handle: "@mikechen",
    platform: "twitter",
    followers: 12500,
    verified: true,
    sentiment: -0.72,
    reach: 4500,
    engagement: 156,
    content: "Really disappointed with the quality of service lately",
  },
];

// Impact metrics
export const impactMetrics = {
  totalMentions: 65,
  uniqueAuthors: 47,
  verifiedAccounts: 8,
  influencers: 3,
  estimatedReach: 150000,
  actualReach: 45600,
  totalEngagement: 57234,
  viralPosts: 2,
  trendingHashtags: [
    { tag: "#brandfail", mentions: 23000 },
    { tag: "#disappointed", mentions: 12000 },
  ],
  crossPlatformSpread: true,
  viralityRisk: "high",
};

// Sentiment over time by platform
export const sentimentByPlatform = [
  {
    timestamp: "2025-11-22T10:00:00Z",
    twitter: 0.12,
    instagram: 0.45,
    facebook: 0.08,
    youtube: -0.15,
  },
  {
    timestamp: "2025-11-22T10:30:00Z",
    twitter: -0.35,
    instagram: 0.28,
    facebook: -0.12,
    youtube: -0.42,
  },
  {
    timestamp: "2025-11-22T11:00:00Z",
    twitter: -0.68,
    instagram: -0.15,
    facebook: -0.35,
    youtube: -0.62,
  },
  {
    timestamp: "2025-11-22T11:30:00Z",
    twitter: -0.72,
    instagram: -0.42,
    facebook: -0.55,
    youtube: -0.62,
  },
  {
    timestamp: "2025-11-22T12:00:00Z",
    twitter: -0.65,
    instagram: -0.38,
    facebook: -0.48,
    youtube: -0.62,
  },
];

// Helper functions to get analytics data by incident ID
export function getSentimentTrendData(incidentId: string): SentimentTrendDataPoint[] {
  switch (incidentId) {
    case "incident-1":
      return sentimentTrendDataIncident1;
    default:
      return [];
  }
}

export function getVolumeTrendData(incidentId: string): VolumeTrendDataPoint[] {
  switch (incidentId) {
    case "incident-1":
      return volumeTrendDataIncident1;
    default:
      return [];
  }
}

export function getEmotionDistribution(incidentId: string): EmotionDistribution[] {
  switch (incidentId) {
    case "incident-1":
      return emotionDistributionIncident1;
    default:
      return [];
  }
}

export function getKeywordFrequency(incidentId: string): KeywordFrequency[] {
  switch (incidentId) {
    case "incident-1":
      return keywordFrequencyIncident1;
    default:
      return [];
  }
}

export function getPlatformDistribution(incidentId: string) {
  switch (incidentId) {
    case "incident-1":
      return platformDistributionIncident1;
    default:
      return [];
  }
}
