import Foundation

// MARK: - Person
struct Person: Codable, Identifiable {
    let id: String
    let email: String?
    let name: String
    let company: String?
    let avatar: String?
    let tags: [String]
    let isVIP: Bool
    let customFields: [String: String]
    let createdAt: Date
    let updatedAt: Date

    init(
        id: String,
        email: String? = nil,
        name: String,
        company: String? = nil,
        avatar: String? = nil,
        tags: [String] = [],
        isVIP: Bool = false,
        customFields: [String: String] = [:],
        createdAt: Date,
        updatedAt: Date
    ) {
        self.id = id
        self.email = email
        self.name = name
        self.company = company
        self.avatar = avatar
        self.tags = tags
        self.isVIP = isVIP
        self.customFields = customFields
        self.createdAt = createdAt
        self.updatedAt = updatedAt
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
