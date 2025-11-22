import Foundation

// MARK: - Listening Query
struct ListeningQuery: Codable, Identifiable {
    let id: String
    let workspaceId: String
    let name: String
    let description: String
    let queryType: String // "keyword", "hashtag", "mention", "brand", etc.
    let icon: String?

    // Search Terms
    let keywords: [String]
    let hashtags: [String]
    let mentions: [String]

    // Platform Filters
    let platforms: [SocialPlatform]

    // Status & Configuration
    let isActive: Bool
    let isStarred: Bool
    let alertsEnabled: Bool

    // Metrics
    let totalMentions: Int
    let mentionCount24h: Int
    let mentionCount7d: Int
    let lastMentionAt: Date?

    // Metadata
    let color: String?
    let tags: [String]

    let createdAt: Date
    let updatedAt: Date

    init(
        id: String,
        workspaceId: String,
        name: String,
        description: String,
        queryType: String,
        icon: String? = nil,
        keywords: [String] = [],
        hashtags: [String] = [],
        mentions: [String] = [],
        platforms: [SocialPlatform] = [],
        isActive: Bool = true,
        isStarred: Bool = false,
        alertsEnabled: Bool = false,
        totalMentions: Int = 0,
        mentionCount24h: Int = 0,
        mentionCount7d: Int = 0,
        lastMentionAt: Date? = nil,
        color: String? = nil,
        tags: [String] = [],
        createdAt: Date,
        updatedAt: Date
    ) {
        self.id = id
        self.workspaceId = workspaceId
        self.name = name
        self.description = description
        self.queryType = queryType
        self.icon = icon
        self.keywords = keywords
        self.hashtags = hashtags
        self.mentions = mentions
        self.platforms = platforms
        self.isActive = isActive
        self.isStarred = isStarred
        self.alertsEnabled = alertsEnabled
        self.totalMentions = totalMentions
        self.mentionCount24h = mentionCount24h
        self.mentionCount7d = mentionCount7d
        self.lastMentionAt = lastMentionAt
        self.color = color
        self.tags = tags
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }

    var trend: String {
        let avgDaily = Double(mentionCount7d) / 7.0
        let diff = Double(mentionCount24h) - avgDaily
        let percentChange = avgDaily > 0 ? (diff / avgDaily) * 100 : 0

        if percentChange > 10 {
            return "up"
        } else if percentChange < -10 {
            return "down"
        } else {
            return "stable"
        }
    }
}

// MARK: - Listening Mention
struct ListeningMention: Codable, Identifiable {
    let id: String
    let queryId: String
    let workspaceId: String
    let platform: SocialPlatform
    let platformPostId: String
    let platformPostUrl: String

    // Author Data
    let authorPlatformId: String
    let authorUsername: String
    let authorDisplayName: String
    let authorAvatarUrl: String?
    let authorVerified: Bool
    let authorFollowerCount: Int
    let authorBio: String?

    // Content
    let content: String
    let contentPreview: String
    let mentionType: String // "direct_mention", "keyword_match", "hashtag_match", etc.

    // Matching Data
    let matchedKeywords: [String]
    let matchedHashtags: [String]
    let matchedMentions: [String]

    // Media & Links
    let hasMedia: Bool
    let mediaCount: Int
    let mediaUrls: [String]
    let hasLinks: Bool

    // Engagement Metrics
    let likesCount: Int
    let sharesCount: Int
    let commentsCount: Int
    let viewsCount: Int?
    let engagementScore: Int
    let potentialReach: Int

    // Sentiment Analysis
    let sentiment: Sentiment
    let sentimentScore: Double // -1 to 1
    let sentimentConfidence: Double // 0 to 1
    let sentimentKeywords: [String]

    // Flags & Status
    let priority: Priority
    let isViral: Bool
    let isInfluencer: Bool
    let isRead: Bool
    let isStarred: Bool
    let isArchived: Bool

    // Relationships
    let conversationId: String?
    let personId: String?
    let assignedTo: String?

    // Location & Metadata
    let locationName: String?
    let language: String

    // Timestamps
    let publishedAt: Date
    let capturedAt: Date

    init(
        id: String,
        queryId: String,
        workspaceId: String,
        platform: SocialPlatform,
        platformPostId: String,
        platformPostUrl: String,
        authorPlatformId: String,
        authorUsername: String,
        authorDisplayName: String,
        authorAvatarUrl: String? = nil,
        authorVerified: Bool = false,
        authorFollowerCount: Int = 0,
        authorBio: String? = nil,
        content: String,
        contentPreview: String,
        mentionType: String,
        matchedKeywords: [String] = [],
        matchedHashtags: [String] = [],
        matchedMentions: [String] = [],
        hasMedia: Bool = false,
        mediaCount: Int = 0,
        mediaUrls: [String] = [],
        hasLinks: Bool = false,
        likesCount: Int = 0,
        sharesCount: Int = 0,
        commentsCount: Int = 0,
        viewsCount: Int? = nil,
        engagementScore: Int = 0,
        potentialReach: Int = 0,
        sentiment: Sentiment = .neutral,
        sentimentScore: Double = 0.0,
        sentimentConfidence: Double = 0.0,
        sentimentKeywords: [String] = [],
        priority: Priority = .medium,
        isViral: Bool = false,
        isInfluencer: Bool = false,
        isRead: Bool = false,
        isStarred: Bool = false,
        isArchived: Bool = false,
        conversationId: String? = nil,
        personId: String? = nil,
        assignedTo: String? = nil,
        locationName: String? = nil,
        language: String = "en",
        publishedAt: Date,
        capturedAt: Date
    ) {
        self.id = id
        self.queryId = queryId
        self.workspaceId = workspaceId
        self.platform = platform
        self.platformPostId = platformPostId
        self.platformPostUrl = platformPostUrl
        self.authorPlatformId = authorPlatformId
        self.authorUsername = authorUsername
        self.authorDisplayName = authorDisplayName
        self.authorAvatarUrl = authorAvatarUrl
        self.authorVerified = authorVerified
        self.authorFollowerCount = authorFollowerCount
        self.authorBio = authorBio
        self.content = content
        self.contentPreview = contentPreview
        self.mentionType = mentionType
        self.matchedKeywords = matchedKeywords
        self.matchedHashtags = matchedHashtags
        self.matchedMentions = matchedMentions
        self.hasMedia = hasMedia
        self.mediaCount = mediaCount
        self.mediaUrls = mediaUrls
        self.hasLinks = hasLinks
        self.likesCount = likesCount
        self.sharesCount = sharesCount
        self.commentsCount = commentsCount
        self.viewsCount = viewsCount
        self.engagementScore = engagementScore
        self.potentialReach = potentialReach
        self.sentiment = sentiment
        self.sentimentScore = sentimentScore
        self.sentimentConfidence = sentimentConfidence
        self.sentimentKeywords = sentimentKeywords
        self.priority = priority
        self.isViral = isViral
        self.isInfluencer = isInfluencer
        self.isRead = isRead
        self.isStarred = isStarred
        self.isArchived = isArchived
        self.conversationId = conversationId
        self.personId = personId
        self.assignedTo = assignedTo
        self.locationName = locationName
        self.language = language
        self.publishedAt = publishedAt
        self.capturedAt = capturedAt
    }
}
