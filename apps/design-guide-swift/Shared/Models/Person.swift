import Foundation

// MARK: - Person
struct Person: Codable, Identifiable {
    let id: String
    let workspaceId: String

    // Identity
    let email: String?
    let fullName: String?
    let displayName: String?
    let avatar: String?

    // Contact Info
    let phone: String?
    let location: String?
    let timezone: String?
    let language: String?

    // Professional
    let bio: String?
    let company: String?
    let jobTitle: String?
    let website: String?

    // Engagement Metrics
    let firstContactAt: Date?
    let lastContactAt: Date?
    let totalMessages: Int
    let totalConversations: Int

    // Flags
    let isVIP: Bool
    let isVerified: Bool
    let isBlocked: Bool

    // Categorization
    let tags: [String]
    let customFields: [String: String]

    let createdAt: Date
    let updatedAt: Date

    init(
        id: String,
        workspaceId: String,
        email: String? = nil,
        fullName: String? = nil,
        displayName: String? = nil,
        avatar: String? = nil,
        phone: String? = nil,
        location: String? = nil,
        timezone: String? = nil,
        language: String? = nil,
        bio: String? = nil,
        company: String? = nil,
        jobTitle: String? = nil,
        website: String? = nil,
        firstContactAt: Date? = nil,
        lastContactAt: Date? = nil,
        totalMessages: Int = 0,
        totalConversations: Int = 0,
        isVIP: Bool = false,
        isVerified: Bool = false,
        isBlocked: Bool = false,
        tags: [String] = [],
        customFields: [String: String] = [:],
        createdAt: Date,
        updatedAt: Date
    ) {
        self.id = id
        self.workspaceId = workspaceId
        self.email = email
        self.fullName = fullName
        self.displayName = displayName
        self.avatar = avatar
        self.phone = phone
        self.location = location
        self.timezone = timezone
        self.language = language
        self.bio = bio
        self.company = company
        self.jobTitle = jobTitle
        self.website = website
        self.firstContactAt = firstContactAt
        self.lastContactAt = lastContactAt
        self.totalMessages = totalMessages
        self.totalConversations = totalConversations
        self.isVIP = isVIP
        self.isVerified = isVerified
        self.isBlocked = isBlocked
        self.tags = tags
        self.customFields = customFields
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }

    // Computed property for name compatibility
    var name: String {
        displayName ?? fullName ?? email ?? "Unknown"
    }
}

// MARK: - Social Identity
struct SocialIdentity: Codable, Identifiable {
    let id: String
    let personId: String
    let platform: SocialPlatform
    let platformUserId: String
    let username: String
    let displayName: String?
    let profileUrl: String?
    let followerCount: Int?
    let isVerified: Bool
    let connectedAt: Date

    init(
        id: String,
        personId: String,
        platform: SocialPlatform,
        platformUserId: String,
        username: String,
        displayName: String? = nil,
        profileUrl: String? = nil,
        followerCount: Int? = nil,
        isVerified: Bool = false,
        connectedAt: Date
    ) {
        self.id = id
        self.personId = personId
        self.platform = platform
        self.platformUserId = platformUserId
        self.username = username
        self.displayName = displayName
        self.profileUrl = profileUrl
        self.followerCount = followerCount
        self.isVerified = isVerified
        self.connectedAt = connectedAt
    }
}
