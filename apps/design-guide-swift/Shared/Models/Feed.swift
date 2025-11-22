import Foundation

// MARK: - Feed
struct Feed: Codable, Identifiable {
    let id: String
    let workspaceId: String
    let name: String
    let description: String?
    let icon: String?
    let isDefault: Bool
    let streams: [StreamConfig]
    let lastViewedAt: Date?
    let createdAt: Date
    let updatedAt: Date

    init(
        id: String,
        workspaceId: String,
        name: String,
        description: String? = nil,
        icon: String? = nil,
        isDefault: Bool = false,
        streams: [StreamConfig] = [],
        lastViewedAt: Date? = nil,
        createdAt: Date,
        updatedAt: Date
    ) {
        self.id = id
        self.workspaceId = workspaceId
        self.name = name
        self.description = description
        self.icon = icon
        self.isDefault = isDefault
        self.streams = streams
        self.lastViewedAt = lastViewedAt
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
}

// MARK: - Stream Config
struct StreamConfig: Codable, Identifiable {
    let id: String
    let streamType: StreamType
    let label: String?
    let platformFilters: [SocialPlatform]
    let timeRange: String // "24h", "7d", "30d", "all"
    let sortOrder: String // "newest", "oldest", "most_engaged"
    let order: Int
    let createdAt: Date
    let updatedAt: Date

    init(
        id: String,
        streamType: StreamType,
        label: String? = nil,
        platformFilters: [SocialPlatform] = [],
        timeRange: String = "all",
        sortOrder: String = "newest",
        order: Int,
        createdAt: Date,
        updatedAt: Date
    ) {
        self.id = id
        self.streamType = streamType
        self.label = label
        self.platformFilters = platformFilters
        self.timeRange = timeRange
        self.sortOrder = sortOrder
        self.order = order
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }

    var displayName: String {
        label ?? streamType.displayName
    }
}
