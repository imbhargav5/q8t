import Foundation

// MARK: - Post
struct Post: Codable, Identifiable {
    let id: String
    let workspaceId: String
    let authorId: String

    // Content
    let content: String
    let type: PostType
    let media: [PostMedia]
    let linkPreview: LinkPreview?

    // Publishing
    let platforms: [SocialPlatform]
    let scheduledFor: Date?
    let publishedAt: Date?
    let status: PostStatus

    // Organization
    let hashtags: [String]
    let mentions: [String]
    let tags: [String]
    let isPinned: Bool

    // Analytics
    let engagement: PostEngagementMetrics?

    // Author Info (denormalized)
    let authorName: String
    let authorAvatar: String?

    let createdAt: Date
    let updatedAt: Date

    init(
        id: String,
        workspaceId: String,
        authorId: String,
        content: String,
        type: PostType = .text,
        media: [PostMedia] = [],
        linkPreview: LinkPreview? = nil,
        platforms: [SocialPlatform],
        scheduledFor: Date? = nil,
        publishedAt: Date? = nil,
        status: PostStatus,
        hashtags: [String] = [],
        mentions: [String] = [],
        tags: [String] = [],
        isPinned: Bool = false,
        engagement: PostEngagementMetrics? = nil,
        authorName: String,
        authorAvatar: String? = nil,
        createdAt: Date,
        updatedAt: Date
    ) {
        self.id = id
        self.workspaceId = workspaceId
        self.authorId = authorId
        self.content = content
        self.type = type
        self.media = media
        self.linkPreview = linkPreview
        self.platforms = platforms
        self.scheduledFor = scheduledFor
        self.publishedAt = publishedAt
        self.status = status
        self.hashtags = hashtags
        self.mentions = mentions
        self.tags = tags
        self.isPinned = isPinned
        self.engagement = engagement
        self.authorName = authorName
        self.authorAvatar = authorAvatar
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
}

// MARK: - Post Media
struct PostMedia: Codable, Identifiable {
    let id: String
    let type: MediaType
    let url: String
    let thumbnailUrl: String?
    let altText: String?
    let width: Int?
    let height: Int?
    let durationSeconds: Int?

    init(
        id: String,
        type: MediaType,
        url: String,
        thumbnailUrl: String? = nil,
        altText: String? = nil,
        width: Int? = nil,
        height: Int? = nil,
        durationSeconds: Int? = nil
    ) {
        self.id = id
        self.type = type
        self.url = url
        self.thumbnailUrl = thumbnailUrl
        self.altText = altText
        self.width = width
        self.height = height
        self.durationSeconds = durationSeconds
    }
}

// MARK: - Link Preview
struct LinkPreview: Codable {
    let url: String
    let title: String?
    let description: String?
    let imageUrl: String?

    init(
        url: String,
        title: String? = nil,
        description: String? = nil,
        imageUrl: String? = nil
    ) {
        self.url = url
        self.title = title
        self.description = description
        self.imageUrl = imageUrl
    }
}

// MARK: - Post Engagement Metrics
struct PostEngagementMetrics: Codable {
    let likes: Int
    let comments: Int
    let shares: Int
    let saves: Int
    let impressions: Int
    let reach: Int
    let clicks: Int
    let engagementRate: Double

    init(
        likes: Int = 0,
        comments: Int = 0,
        shares: Int = 0,
        saves: Int = 0,
        impressions: Int = 0,
        reach: Int = 0,
        clicks: Int = 0,
        engagementRate: Double = 0.0
    ) {
        self.likes = likes
        self.comments = comments
        self.shares = shares
        self.saves = saves
        self.impressions = impressions
        self.reach = reach
        self.clicks = clicks
        self.engagementRate = engagementRate
    }
}
