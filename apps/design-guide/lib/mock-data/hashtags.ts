import type { HashtagSet, HashtagAnalytics, TrendingHashtag } from "../zod-schemas/hashtag.schema";

export const mockHashtagSets: HashtagSet[] = [
  {
    id: "set-1",
    workspace_id: "workspace-1",
    user_id: "user-1",
    name: "Monday Motivation",
    description: "Inspirational hashtags for Monday posts",
    hashtags: ["#MondayMotivation", "#MotivationMonday", "#MondayVibes", "#NewWeek", "#Goals"],
    category: "Engagement",
    usage_count: 24,
    last_used_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date("2024-01-15").toISOString(),
    updated_at: new Date("2024-11-01").toISOString(),
  },
  {
    id: "set-2",
    workspace_id: "workspace-1",
    user_id: "user-1",
    name: "Product Launch",
    description: "Hashtags for product announcements",
    hashtags: ["#NewProduct", "#ProductLaunch", "#Innovation", "#TechNews", "#Startup"],
    category: "Promotional",
    usage_count: 12,
    last_used_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date("2024-02-10").toISOString(),
    updated_at: new Date("2024-10-15").toISOString(),
  },
  {
    id: "set-3",
    workspace_id: "workspace-1",
    user_id: "user-1",
    name: "Social Media Marketing",
    description: "General social media and marketing hashtags",
    hashtags: ["#SocialMedia", "#Marketing", "#DigitalMarketing", "#ContentMarketing", "#SMM"],
    category: "Marketing",
    usage_count: 45,
    last_used_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date("2024-01-05").toISOString(),
    updated_at: new Date("2024-11-15").toISOString(),
  },
  {
    id: "set-4",
    workspace_id: "workspace-1",
    user_id: "user-1",
    name: "Tech & Innovation",
    description: "Technology-focused hashtags",
    hashtags: ["#Technology", "#Innovation", "#AI", "#Tech", "#FutureTech", "#TechTrends"],
    category: "Technology",
    usage_count: 18,
    last_used_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date("2024-03-20").toISOString(),
    updated_at: new Date("2024-11-10").toISOString(),
  },
  {
    id: "set-5",
    workspace_id: "workspace-1",
    user_id: "user-1",
    name: "Business Growth",
    description: "Hashtags for business and entrepreneurship content",
    hashtags: ["#Business", "#Entrepreneur", "#Startup", "#Growth", "#BusinessTips", "#Success"],
    category: "Business",
    usage_count: 31,
    last_used_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date("2024-04-01").toISOString(),
    updated_at: new Date("2024-11-18").toISOString(),
  },
];

export const mockHashtagAnalytics: HashtagAnalytics[] = [
  {
    id: "analytics-1",
    hashtag: "#MondayMotivation",
    platform: "twitter",
    impressions: 45200,
    reach: 32100,
    engagements: 3420,
    clicks: 892,
    posts_count: 24,
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "analytics-2",
    hashtag: "#MondayMotivation",
    platform: "instagram",
    impressions: 67800,
    reach: 54200,
    engagements: 5640,
    clicks: 1230,
    posts_count: 24,
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "analytics-3",
    hashtag: "#ProductLaunch",
    platform: "linkedin",
    impressions: 23400,
    reach: 18900,
    engagements: 1890,
    clicks: 456,
    posts_count: 12,
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "analytics-4",
    hashtag: "#SocialMedia",
    platform: "twitter",
    impressions: 89300,
    reach: 72100,
    engagements: 7230,
    clicks: 1890,
    posts_count: 45,
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "analytics-5",
    hashtag: "#AI",
    platform: "twitter",
    impressions: 156000,
    reach: 128000,
    engagements: 12400,
    clicks: 3200,
    posts_count: 18,
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockTrendingHashtags: TrendingHashtag[] = [
  {
    hashtag: "#AIRevolution",
    category: "Technology",
    trending_score: 95,
    volume: 245000,
    growth_rate: 156,
    related_hashtags: ["#AI", "#MachineLearning", "#TechTrends", "#Innovation"],
  },
  {
    hashtag: "#SustainableLiving",
    category: "Lifestyle",
    trending_score: 88,
    volume: 189000,
    growth_rate: 142,
    related_hashtags: ["#Sustainability", "#EcoFriendly", "#GreenLiving", "#ClimateAction"],
  },
  {
    hashtag: "#RemoteWork",
    category: "Business",
    trending_score: 82,
    volume: 167000,
    growth_rate: 98,
    related_hashtags: ["#WorkFromHome", "#DigitalNomad", "#FutureOfWork", "#Productivity"],
  },
  {
    hashtag: "#MentalHealthMatters",
    category: "Health",
    trending_score: 79,
    volume: 142000,
    growth_rate: 124,
    related_hashtags: ["#MentalHealth", "#SelfCare", "#Wellness", "#MentalHealthAwareness"],
  },
  {
    hashtag: "#ContentCreator",
    category: "Creator Economy",
    trending_score: 75,
    volume: 128000,
    growth_rate: 112,
    related_hashtags: ["#ContentMarketing", "#Creator", "#InfluencerMarketing", "#SocialMedia"],
  },
];

export function getHashtagAnalytics(hashtag: string): HashtagAnalytics[] {
  return mockHashtagAnalytics.filter((a) => a.hashtag === hashtag);
}

export function getHashtagSetsByCategory(category: string): HashtagSet[] {
  return mockHashtagSets.filter((s) => s.category === category);
}

export function getMostUsedHashtagSets(limit: number = 5): HashtagSet[] {
  return [...mockHashtagSets].sort((a, b) => b.usage_count - a.usage_count).slice(0, limit);
}
