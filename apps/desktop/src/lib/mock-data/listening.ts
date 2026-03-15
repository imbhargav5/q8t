// Mock data for Social Media Listening features

export type ListeningSentiment = 'positive' | 'neutral' | 'negative' | 'mixed' | 'unclassified';
export type ListeningQueryType = 'keyword' | 'hashtag' | 'mention' | 'brand' | 'competitor' | 'topic' | 'sentiment' | 'location' | 'custom';
export type ListeningMentionType = 'direct_mention' | 'keyword_match' | 'hashtag_match' | 'brand_mention' | 'reply' | 'repost' | 'quote' | 'media_tag' | 'bio_mention';
export type ListeningPriority = 'low' | 'medium' | 'high' | 'critical';

export interface ListeningQuery {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  queryType: ListeningQueryType;
  keywords: string[];
  hashtags: string[];
  mentions: string[];
  booleanQuery?: string;
  platforms?: string[];
  excludedPlatforms?: string[];
  countries?: string[];
  languages?: string[];
  includeAuthors?: string[];
  excludeAuthors?: string[];
  minFollowerCount?: number;
  verifiedOnly: boolean;
  includeMediaOnly: boolean;
  includeLinksOnly: boolean;
  minEngagement?: number;
  sentimentFilter?: ListeningSentiment[];
  startDate?: Date;
  endDate?: Date;
  caseSensitive: boolean;
  wholeWordMatch: boolean;
  includeRetweets: boolean;
  includeReplies: boolean;
  isActive: boolean;
  isStarred: boolean;
  totalMentions: number;
  mentionCount24h: number;
  mentionCount7d: number;
  lastMentionAt?: Date;
  alertsEnabled: boolean;
  alertThresholdVolume?: number;
  alertThresholdSentiment?: number;
  color?: string;
  icon?: string;
  tags: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListeningMention {
  id: string;
  workspaceId: string;
  queryId: string;
  platform: string;
  socialAccountId?: string;
  platformPostId: string;
  platformPostUrl: string;
  platformParentId?: string;
  authorPlatformId: string;
  authorUsername: string;
  authorDisplayName: string;
  authorAvatarUrl?: string;
  authorVerified: boolean;
  authorFollowerCount: number;
  authorBio?: string;
  mentionType: ListeningMentionType;
  matchedKeywords: string[];
  matchedHashtags: string[];
  matchedMentions: string[];
  content: string;
  contentPreview: string;
  language: string;
  hasMedia: boolean;
  mediaCount: number;
  mediaUrls: string[];
  mediaTypes: string[];
  hasLinks: boolean;
  linkUrls: string[];
  likesCount: number;
  sharesCount: number;
  commentsCount: number;
  viewsCount?: number;
  engagementScore: number;
  potentialReach: number;
  actualReach?: number;
  sentiment: ListeningSentiment;
  sentimentScore: number;
  sentimentConfidence: number;
  sentimentKeywords: string[];
  manualSentiment?: ListeningSentiment;
  manualSentimentBy?: string;
  manualSentimentAt?: Date;
  priority: ListeningPriority;
  isViral: boolean;
  isInfluencer: boolean;
  isVerifiedAuthor: boolean;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  isSpam: boolean;
  isDuplicate: boolean;
  conversationId?: string;
  personId?: string;
  movedToInboxAt?: Date;
  movedToInboxBy?: string;
  assignedTo?: string;
  assignedAt?: Date;
  locationName?: string;
  countryCode?: string;
  publishedAt: Date;
  capturedAt: Date;
  lastUpdatedAt?: Date;
}

export interface ListeningAnalytics {
  queryId: string;
  bucketStart: Date;
  bucketEnd: Date;
  mentionCount: number;
  uniqueAuthors: number;
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  totalEngagement: number;
  avgEngagement: number;
  totalPotentialReach: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  avgSentimentScore: number;
  topKeywords: Array<{ keyword: string; count: number }>;
  topHashtags: Array<{ hashtag: string; count: number }>;
  topAuthors: Array<{ username: string; count: number; reach: number }>;
  platformBreakdown: Record<string, number>;
  topCountries: Array<{ country: string; count: number }>;
}

// Mock Listening Queries
export const mockListeningQueries: ListeningQuery[] = [
  {
    id: 'query-1',
    workspaceId: 'ws-1',
    name: 'Brand Mentions',
    description: 'Track all mentions of our brand across social media',
    queryType: 'brand',
    keywords: ['OurBrand', 'Our Brand', '@OurBrand'],
    hashtags: ['OurBrand', 'OurBrandLife'],
    mentions: ['OurBrand'],
    platforms: ['twitter', 'instagram', 'facebook', 'linkedin'],
    languages: ['en', 'es', 'fr'],
    verifiedOnly: false,
    includeMediaOnly: false,
    includeLinksOnly: false,
    caseSensitive: false,
    wholeWordMatch: false,
    includeRetweets: true,
    includeReplies: true,
    isActive: true,
    isStarred: true,
    totalMentions: 2847,
    mentionCount24h: 143,
    mentionCount7d: 892,
    lastMentionAt: new Date('2025-11-22T14:23:00Z'),
    alertsEnabled: true,
    alertThresholdVolume: 50,
    alertThresholdSentiment: 0.3,
    color: '#3b82f6',
    icon: '🎯',
    tags: ['brand', 'monitoring'],
    createdBy: 'user-1',
    createdAt: new Date('2025-01-15T00:00:00Z'),
    updatedAt: new Date('2025-11-20T00:00:00Z'),
  },
  {
    id: 'query-2',
    workspaceId: 'ws-1',
    name: 'Customer Support Issues',
    description: 'Monitor customer complaints and support requests',
    queryType: 'keyword',
    keywords: ['help', 'support', 'issue', 'problem', 'not working', 'broken', 'bug', 'error'],
    hashtags: [],
    mentions: ['OurBrandSupport'],
    sentimentFilter: ['negative', 'neutral'],
    platforms: ['twitter', 'facebook'],
    verifiedOnly: false,
    includeMediaOnly: false,
    includeLinksOnly: false,
    caseSensitive: false,
    wholeWordMatch: false,
    includeRetweets: false,
    includeReplies: true,
    isActive: true,
    isStarred: true,
    totalMentions: 1234,
    mentionCount24h: 67,
    mentionCount7d: 421,
    lastMentionAt: new Date('2025-11-22T15:12:00Z'),
    alertsEnabled: true,
    alertThresholdVolume: 25,
    color: '#ef4444',
    icon: '🆘',
    tags: ['support', 'urgent'],
    createdBy: 'user-1',
    createdAt: new Date('2025-02-01T00:00:00Z'),
    updatedAt: new Date('2025-11-21T00:00:00Z'),
  },
  {
    id: 'query-3',
    workspaceId: 'ws-1',
    name: 'Competitor Analysis',
    description: 'Track competitor mentions and campaigns',
    queryType: 'competitor',
    keywords: ['CompetitorA', 'CompetitorB', 'CompetitorC'],
    hashtags: ['CompetitorA', 'CompetitorB'],
    mentions: ['CompetitorA', 'CompetitorB'],
    platforms: ['twitter', 'linkedin', 'instagram'],
    verifiedOnly: false,
    includeMediaOnly: false,
    includeLinksOnly: false,
    caseSensitive: false,
    wholeWordMatch: true,
    includeRetweets: true,
    includeReplies: true,
    isActive: true,
    isStarred: false,
    totalMentions: 5623,
    mentionCount24h: 287,
    mentionCount7d: 1943,
    lastMentionAt: new Date('2025-11-22T14:45:00Z'),
    alertsEnabled: true,
    alertThresholdVolume: 100,
    color: '#8b5cf6',
    icon: '🔍',
    tags: ['competitor', 'analysis'],
    createdBy: 'user-2',
    createdAt: new Date('2025-03-10T00:00:00Z'),
    updatedAt: new Date('2025-11-22T00:00:00Z'),
  },
  {
    id: 'query-4',
    workspaceId: 'ws-1',
    name: 'Product Launch Campaign',
    description: 'Monitor our new product launch hashtag and mentions',
    queryType: 'topic',
    keywords: ['NewProduct2025', 'Product Launch'],
    hashtags: ['NewProduct2025', 'Innovation2025'],
    mentions: [],
    platforms: ['twitter', 'instagram', 'tiktok'],
    minEngagement: 10,
    verifiedOnly: false,
    includeMediaOnly: false,
    includeLinksOnly: false,
    caseSensitive: false,
    wholeWordMatch: false,
    includeRetweets: true,
    includeReplies: true,
    isActive: true,
    isStarred: true,
    totalMentions: 8934,
    mentionCount24h: 456,
    mentionCount7d: 2876,
    lastMentionAt: new Date('2025-11-22T15:30:00Z'),
    alertsEnabled: true,
    alertThresholdVolume: 150,
    color: '#10b981',
    icon: '🚀',
    tags: ['campaign', 'product-launch'],
    createdBy: 'user-1',
    createdAt: new Date('2025-10-01T00:00:00Z'),
    updatedAt: new Date('2025-11-22T00:00:00Z'),
  },
  {
    id: 'query-5',
    workspaceId: 'ws-1',
    name: 'Influencer Mentions',
    description: 'Track mentions from verified accounts and influencers',
    queryType: 'mention',
    keywords: ['OurBrand'],
    hashtags: [],
    mentions: [],
    minFollowerCount: 10000,
    verifiedOnly: true,
    platforms: ['twitter', 'instagram', 'youtube'],
    includeMediaOnly: false,
    includeLinksOnly: false,
    caseSensitive: false,
    wholeWordMatch: false,
    includeRetweets: false,
    includeReplies: true,
    isActive: true,
    isStarred: true,
    totalMentions: 342,
    mentionCount24h: 12,
    mentionCount7d: 78,
    lastMentionAt: new Date('2025-11-22T13:20:00Z'),
    alertsEnabled: true,
    alertThresholdVolume: 5,
    color: '#f59e0b',
    icon: '⭐',
    tags: ['influencer', 'vip'],
    createdBy: 'user-2',
    createdAt: new Date('2025-04-15T00:00:00Z'),
    updatedAt: new Date('2025-11-21T00:00:00Z'),
  },
];

// Mock Listening Mentions
export const mockListeningMentions: ListeningMention[] = [
  {
    id: 'mention-1',
    workspaceId: 'ws-1',
    queryId: 'query-1',
    platform: 'twitter',
    platformPostId: '1234567890',
    platformPostUrl: 'https://twitter.com/user/status/1234567890',
    authorPlatformId: 'twitter-user-1',
    authorUsername: 'techinfluencer',
    authorDisplayName: 'Tech Influencer',
    authorAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techinfluencer',
    authorVerified: true,
    authorFollowerCount: 125000,
    authorBio: 'Tech reviewer & entrepreneur. Sharing insights on the latest gadgets.',
    mentionType: 'direct_mention',
    matchedKeywords: ['OurBrand'],
    matchedHashtags: [],
    matchedMentions: ['OurBrand'],
    content: 'Just tried @OurBrand new feature and I\'m blown away! 🤯 The user experience is absolutely seamless. This is what innovation looks like! #TechReview #Innovation',
    contentPreview: 'Just tried @OurBrand new feature and I\'m blown away! 🤯 The user experience is absolutely seamless. This is what innovation looks like!',
    language: 'en',
    hasMedia: true,
    mediaCount: 1,
    mediaUrls: ['https://pbs.twimg.com/media/example1.jpg'],
    mediaTypes: ['image'],
    hasLinks: false,
    linkUrls: [],
    likesCount: 3421,
    sharesCount: 876,
    commentsCount: 234,
    viewsCount: 87234,
    engagementScore: 4531,
    potentialReach: 125000,
    actualReach: 87234,
    sentiment: 'positive',
    sentimentScore: 0.92,
    sentimentConfidence: 0.95,
    sentimentKeywords: ['blown away', 'seamless', 'innovation'],
    priority: 'high',
    isViral: true,
    isInfluencer: true,
    isVerifiedAuthor: true,
    isRead: false,
    isStarred: true,
    isArchived: false,
    isSpam: false,
    isDuplicate: false,
    locationName: 'San Francisco, CA',
    countryCode: 'US',
    publishedAt: new Date('2025-11-22T14:23:00Z'),
    capturedAt: new Date('2025-11-22T14:24:15Z'),
    lastUpdatedAt: new Date('2025-11-22T15:30:00Z'),
  },
  {
    id: 'mention-2',
    workspaceId: 'ws-1',
    queryId: 'query-2',
    platform: 'twitter',
    platformPostId: '1234567891',
    platformPostUrl: 'https://twitter.com/user/status/1234567891',
    authorPlatformId: 'twitter-user-2',
    authorUsername: 'frustrated_user',
    authorDisplayName: 'John Smith',
    authorAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=frustrated',
    authorVerified: false,
    authorFollowerCount: 342,
    mentionType: 'keyword_match',
    matchedKeywords: ['help', 'not working'],
    matchedHashtags: [],
    matchedMentions: [],
    content: '@OurBrandSupport I need help! The app is not working properly. I keep getting error messages when trying to upload files. This is urgent! 😤',
    contentPreview: '@OurBrandSupport I need help! The app is not working properly. I keep getting error messages when trying to upload files.',
    language: 'en',
    hasMedia: false,
    mediaCount: 0,
    mediaUrls: [],
    mediaTypes: [],
    hasLinks: false,
    linkUrls: [],
    likesCount: 12,
    sharesCount: 2,
    commentsCount: 5,
    viewsCount: 234,
    engagementScore: 19,
    potentialReach: 342,
    actualReach: 234,
    sentiment: 'negative',
    sentimentScore: -0.78,
    sentimentConfidence: 0.89,
    sentimentKeywords: ['frustrated', 'error', 'urgent'],
    priority: 'critical',
    isViral: false,
    isInfluencer: false,
    isVerifiedAuthor: false,
    isRead: false,
    isStarred: false,
    isArchived: false,
    isSpam: false,
    isDuplicate: false,
    publishedAt: new Date('2025-11-22T15:12:00Z'),
    capturedAt: new Date('2025-11-22T15:12:45Z'),
  },
  {
    id: 'mention-3',
    workspaceId: 'ws-1',
    queryId: 'query-3',
    platform: 'linkedin',
    platformPostId: 'linkedin-post-123',
    platformPostUrl: 'https://linkedin.com/posts/company-abc-123',
    authorPlatformId: 'linkedin-user-3',
    authorUsername: 'competitor_a',
    authorDisplayName: 'Competitor A',
    authorAvatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=CompetitorA',
    authorVerified: true,
    authorFollowerCount: 450000,
    mentionType: 'brand_mention',
    matchedKeywords: ['CompetitorA'],
    matchedHashtags: ['CompetitorA'],
    matchedMentions: [],
    content: 'Excited to announce our Q4 results! We\'ve grown 150% YoY and are now the leading solution in the market. #CompetitorA #GrowthStory #Innovation',
    contentPreview: 'Excited to announce our Q4 results! We\'ve grown 150% YoY and are now the leading solution in the market.',
    language: 'en',
    hasMedia: true,
    mediaCount: 1,
    mediaUrls: ['https://media.licdn.com/dms/image/example.jpg'],
    mediaTypes: ['image'],
    hasLinks: true,
    linkUrls: ['https://competitora.com/blog/q4-results'],
    likesCount: 8932,
    sharesCount: 1234,
    commentsCount: 456,
    engagementScore: 10622,
    potentialReach: 450000,
    sentiment: 'positive',
    sentimentScore: 0.85,
    sentimentConfidence: 0.92,
    sentimentKeywords: ['excited', 'grown', 'leading'],
    priority: 'high',
    isViral: false,
    isInfluencer: true,
    isVerifiedAuthor: true,
    isRead: true,
    isStarred: false,
    isArchived: false,
    isSpam: false,
    isDuplicate: false,
    publishedAt: new Date('2025-11-22T14:45:00Z'),
    capturedAt: new Date('2025-11-22T14:46:30Z'),
  },
  {
    id: 'mention-4',
    workspaceId: 'ws-1',
    queryId: 'query-4',
    platform: 'instagram',
    platformPostId: 'instagram-post-456',
    platformPostUrl: 'https://instagram.com/p/abc123',
    authorPlatformId: 'instagram-user-4',
    authorUsername: 'lifestyle_blogger',
    authorDisplayName: 'Emma Lifestyle',
    authorAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    authorVerified: false,
    authorFollowerCount: 23400,
    mentionType: 'hashtag_match',
    matchedKeywords: [],
    matchedHashtags: ['NewProduct2025'],
    matchedMentions: [],
    content: 'Unboxing time! 📦✨ Got my hands on the #NewProduct2025 and first impressions are amazing! The packaging alone is worth it. Full review coming soon! 💕 #Innovation2025 #Unboxing',
    contentPreview: 'Unboxing time! 📦✨ Got my hands on the #NewProduct2025 and first impressions are amazing! The packaging alone is worth it.',
    language: 'en',
    hasMedia: true,
    mediaCount: 3,
    mediaUrls: [
      'https://instagram.com/p/abc123/media1.jpg',
      'https://instagram.com/p/abc123/media2.jpg',
      'https://instagram.com/p/abc123/media3.jpg',
    ],
    mediaTypes: ['image', 'image', 'image'],
    hasLinks: false,
    linkUrls: [],
    likesCount: 1834,
    sharesCount: 67,
    commentsCount: 143,
    engagementScore: 2044,
    potentialReach: 23400,
    sentiment: 'positive',
    sentimentScore: 0.88,
    sentimentConfidence: 0.91,
    sentimentKeywords: ['amazing', 'worth it'],
    priority: 'medium',
    isViral: false,
    isInfluencer: false,
    isVerifiedAuthor: false,
    isRead: false,
    isStarred: false,
    isArchived: false,
    isSpam: false,
    isDuplicate: false,
    locationName: 'Los Angeles, CA',
    countryCode: 'US',
    publishedAt: new Date('2025-11-22T13:30:00Z'),
    capturedAt: new Date('2025-11-22T13:31:20Z'),
  },
  {
    id: 'mention-5',
    workspaceId: 'ws-1',
    queryId: 'query-1',
    platform: 'twitter',
    platformPostId: '1234567892',
    platformPostUrl: 'https://twitter.com/user/status/1234567892',
    authorPlatformId: 'twitter-user-5',
    authorUsername: 'average_joe',
    authorDisplayName: 'Joe Customer',
    authorAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joe',
    authorVerified: false,
    authorFollowerCount: 87,
    mentionType: 'direct_mention',
    matchedKeywords: ['OurBrand'],
    matchedHashtags: [],
    matchedMentions: ['OurBrand'],
    content: '@OurBrand Been using your product for 3 months now. It\'s okay, does what it says but nothing spectacular. Customer service could be better.',
    contentPreview: '@OurBrand Been using your product for 3 months now. It\'s okay, does what it says but nothing spectacular.',
    language: 'en',
    hasMedia: false,
    mediaCount: 0,
    mediaUrls: [],
    mediaTypes: [],
    hasLinks: false,
    linkUrls: [],
    likesCount: 3,
    sharesCount: 0,
    commentsCount: 1,
    engagementScore: 4,
    potentialReach: 87,
    sentiment: 'neutral',
    sentimentScore: 0.12,
    sentimentConfidence: 0.76,
    sentimentKeywords: ['okay', 'nothing spectacular', 'could be better'],
    priority: 'low',
    isViral: false,
    isInfluencer: false,
    isVerifiedAuthor: false,
    isRead: true,
    isStarred: false,
    isArchived: false,
    isSpam: false,
    isDuplicate: false,
    publishedAt: new Date('2025-11-22T12:15:00Z'),
    capturedAt: new Date('2025-11-22T12:16:45Z'),
  },
  {
    id: 'mention-6',
    workspaceId: 'ws-1',
    queryId: 'query-5',
    platform: 'youtube',
    platformPostId: 'youtube-comment-789',
    platformPostUrl: 'https://youtube.com/watch?v=xyz&lc=789',
    authorPlatformId: 'youtube-user-6',
    authorUsername: 'tech_reviewer_pro',
    authorDisplayName: 'Tech Reviewer Pro',
    authorAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techpro',
    authorVerified: true,
    authorFollowerCount: 2340000,
    authorBio: 'Professional tech reviewer. 2M+ subscribers. Reviews, tutorials, and more!',
    mentionType: 'direct_mention',
    matchedKeywords: ['OurBrand'],
    matchedHashtags: [],
    matchedMentions: [],
    content: 'I\'ve been testing OurBrand for the past 2 weeks and I have to say, this is a game-changer. Full video review dropping next Monday! Subscribe to not miss it. 🔔',
    contentPreview: 'I\'ve been testing OurBrand for the past 2 weeks and I have to say, this is a game-changer.',
    language: 'en',
    hasMedia: false,
    mediaCount: 0,
    mediaUrls: [],
    mediaTypes: [],
    hasLinks: false,
    linkUrls: [],
    likesCount: 12450,
    sharesCount: 0,
    commentsCount: 567,
    engagementScore: 13017,
    potentialReach: 2340000,
    sentiment: 'positive',
    sentimentScore: 0.89,
    sentimentConfidence: 0.93,
    sentimentKeywords: ['game-changer'],
    priority: 'critical',
    isViral: true,
    isInfluencer: true,
    isVerifiedAuthor: true,
    isRead: false,
    isStarred: true,
    isArchived: false,
    isSpam: false,
    isDuplicate: false,
    publishedAt: new Date('2025-11-22T13:20:00Z'),
    capturedAt: new Date('2025-11-22T13:21:10Z'),
  },
  {
    id: 'mention-7',
    workspaceId: 'ws-1',
    queryId: 'query-2',
    platform: 'facebook',
    platformPostId: 'fb-post-987',
    platformPostUrl: 'https://facebook.com/posts/987',
    authorPlatformId: 'fb-user-7',
    authorUsername: 'small_biz_owner',
    authorDisplayName: 'Sarah - Small Biz Owner',
    authorAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    authorVerified: false,
    authorFollowerCount: 1234,
    mentionType: 'keyword_match',
    matchedKeywords: ['support', 'issue'],
    matchedHashtags: [],
    matchedMentions: [],
    content: 'Has anyone else experienced issues with the mobile app crashing? I\'ve reached out to support but haven\'t heard back. Need this fixed ASAP for my business! 😓',
    contentPreview: 'Has anyone else experienced issues with the mobile app crashing? I\'ve reached out to support but haven\'t heard back.',
    language: 'en',
    hasMedia: false,
    mediaCount: 0,
    mediaUrls: [],
    mediaTypes: [],
    hasLinks: false,
    linkUrls: [],
    likesCount: 23,
    sharesCount: 4,
    commentsCount: 8,
    engagementScore: 35,
    potentialReach: 1234,
    sentiment: 'negative',
    sentimentScore: -0.65,
    sentimentConfidence: 0.82,
    sentimentKeywords: ['issues', 'crashing', 'haven\'t heard back', 'ASAP'],
    priority: 'high',
    isViral: false,
    isInfluencer: false,
    isVerifiedAuthor: false,
    isRead: false,
    isStarred: false,
    isArchived: false,
    isSpam: false,
    isDuplicate: false,
    publishedAt: new Date('2025-11-22T14:55:00Z'),
    capturedAt: new Date('2025-11-22T14:56:30Z'),
  },
  {
    id: 'mention-8',
    workspaceId: 'ws-1',
    queryId: 'query-4',
    platform: 'tiktok',
    platformPostId: 'tiktok-video-654',
    platformPostUrl: 'https://tiktok.com/@user/video/654',
    authorPlatformId: 'tiktok-user-8',
    authorUsername: 'gen_z_creator',
    authorDisplayName: 'Gen Z Creator',
    authorAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=genz',
    authorVerified: false,
    authorFollowerCount: 456000,
    mentionType: 'hashtag_match',
    matchedKeywords: [],
    matchedHashtags: ['NewProduct2025'],
    matchedMentions: [],
    content: 'POV: You just got the #NewProduct2025 and it\'s everything you hoped for 😍✨ *transition video showing before/after* #Innovation2025 #TechTok',
    contentPreview: 'POV: You just got the #NewProduct2025 and it\'s everything you hoped for 😍✨',
    language: 'en',
    hasMedia: true,
    mediaCount: 1,
    mediaUrls: ['https://tiktok.com/video/654/media.mp4'],
    mediaTypes: ['video'],
    hasLinks: false,
    linkUrls: [],
    likesCount: 234500,
    sharesCount: 12340,
    commentsCount: 5678,
    viewsCount: 3456000,
    engagementScore: 252518,
    potentialReach: 456000,
    actualReach: 3456000,
    sentiment: 'positive',
    sentimentScore: 0.95,
    sentimentConfidence: 0.97,
    sentimentKeywords: ['everything you hoped for'],
    priority: 'critical',
    isViral: true,
    isInfluencer: true,
    isVerifiedAuthor: false,
    isRead: false,
    isStarred: true,
    isArchived: false,
    isSpam: false,
    isDuplicate: false,
    publishedAt: new Date('2025-11-22T11:00:00Z'),
    capturedAt: new Date('2025-11-22T11:15:45Z'),
    lastUpdatedAt: new Date('2025-11-22T15:00:00Z'),
  },
];

// Mock Analytics Data (24-hour buckets for the past 7 days)
export const mockListeningAnalytics: ListeningAnalytics[] = [];

// Generate analytics for the past 7 days
const generateAnalytics = () => {
  const analytics: ListeningAnalytics[] = [];
  const now = new Date();

  mockListeningQueries.forEach((query) => {
    for (let i = 6; i >= 0; i--) {
      const bucketStart = new Date(now);
      bucketStart.setDate(bucketStart.getDate() - i);
      bucketStart.setHours(0, 0, 0, 0);

      const bucketEnd = new Date(bucketStart);
      bucketEnd.setDate(bucketEnd.getDate() + 1);

      // Generate semi-random but realistic data
      const baseCount = Math.floor(Math.random() * 100) + 50;
      const sentiment = Math.random();

      analytics.push({
        queryId: query.id,
        bucketStart,
        bucketEnd,
        mentionCount: baseCount,
        uniqueAuthors: Math.floor(baseCount * 0.7),
        totalLikes: baseCount * Math.floor(Math.random() * 20),
        totalShares: baseCount * Math.floor(Math.random() * 5),
        totalComments: baseCount * Math.floor(Math.random() * 3),
        totalEngagement: baseCount * Math.floor(Math.random() * 28),
        avgEngagement: Math.floor(Math.random() * 50) + 10,
        totalPotentialReach: baseCount * Math.floor(Math.random() * 1000),
        positiveCount: Math.floor(baseCount * (0.3 + sentiment * 0.4)),
        neutralCount: Math.floor(baseCount * 0.3),
        negativeCount: Math.floor(baseCount * (0.3 - sentiment * 0.2)),
        avgSentimentScore: (sentiment - 0.5) * 2,
        topKeywords: [
          { keyword: query.keywords[0] || 'keyword', count: Math.floor(baseCount * 0.8) },
          { keyword: 'innovation', count: Math.floor(baseCount * 0.4) },
          { keyword: 'product', count: Math.floor(baseCount * 0.3) },
        ],
        topHashtags: [
          { hashtag: query.hashtags[0] || 'hashtag', count: Math.floor(baseCount * 0.6) },
          { hashtag: 'tech', count: Math.floor(baseCount * 0.3) },
        ],
        topAuthors: [
          { username: 'influencer1', count: Math.floor(baseCount * 0.1), reach: 100000 },
          { username: 'user123', count: Math.floor(baseCount * 0.05), reach: 5000 },
        ],
        platformBreakdown: {
          twitter: Math.floor(baseCount * 0.4),
          instagram: Math.floor(baseCount * 0.3),
          facebook: Math.floor(baseCount * 0.2),
          linkedin: Math.floor(baseCount * 0.1),
        },
        topCountries: [
          { country: 'US', count: Math.floor(baseCount * 0.5) },
          { country: 'UK', count: Math.floor(baseCount * 0.2) },
          { country: 'CA', count: Math.floor(baseCount * 0.15) },
        ],
      });
    }
  });

  return analytics;
};

mockListeningAnalytics.push(...generateAnalytics());
