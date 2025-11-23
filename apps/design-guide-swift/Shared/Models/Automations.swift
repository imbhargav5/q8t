import Foundation

// MARK: - Automation Enums

enum AutomationCategory: String, Codable, CaseIterable {
    case content = "content"
    case monitoring = "monitoring"
    case analytics = "analytics"
    case workflow = "workflow"

    var displayName: String {
        switch self {
        case .content: return "Content Automation"
        case .monitoring: return "Monitoring & Listening"
        case .analytics: return "Analytics & Reporting"
        case .workflow: return "Workflow Automation"
        }
    }

    var icon: String {
        switch self {
        case .content: return "doc.text.fill"
        case .monitoring: return "waveform"
        case .analytics: return "chart.bar.fill"
        case .workflow: return "gearshape.2.fill"
        }
    }
}

enum AutomationStatus: String, Codable {
    case active = "active"
    case paused = "paused"
    case inactive = "inactive"

    var displayName: String {
        switch self {
        case .active: return "Active"
        case .paused: return "Paused"
        case .inactive: return "Inactive"
        }
    }

    var color: String {
        switch self {
        case .active: return "green"
        case .paused: return "orange"
        case .inactive: return "gray"
        }
    }
}

enum QueueScheduleType: String, Codable {
    case interval = "interval"
    case timeSlots = "time_slots"
    case optimal = "optimal"

    var displayName: String {
        switch self {
        case .interval: return "Fixed Interval"
        case .timeSlots: return "Time Slots"
        case .optimal: return "Optimal Times"
        }
    }
}

// MARK: - RSS Feed Models

struct RSSFeed: Codable, Identifiable {
    let id: String
    let name: String
    let url: String
    let status: AutomationStatus
    let platforms: [SocialPlatform]
    let lastFetched: Date?
    let postsCreated: Int
    let successRate: Double
    let autoPublish: Bool
    let fetchInterval: Int // in minutes

    init(id: String = UUID().uuidString, name: String, url: String, status: AutomationStatus, platforms: [SocialPlatform], lastFetched: Date?, postsCreated: Int, successRate: Double, autoPublish: Bool, fetchInterval: Int) {
        self.id = id
        self.name = name
        self.url = url
        self.status = status
        self.platforms = platforms
        self.lastFetched = lastFetched
        self.postsCreated = postsCreated
        self.successRate = successRate
        self.autoPublish = autoPublish
        self.fetchInterval = fetchInterval
    }
}

// MARK: - Content Queue Models

struct ContentQueue: Codable, Identifiable {
    let id: String
    let name: String
    let description: String
    let status: AutomationStatus
    let platforms: [SocialPlatform]
    let scheduleType: QueueScheduleType
    let postsInQueue: Int
    let postsPublished: Int
    let nextPostTime: Date?
    let intervalMinutes: Int?
    let timeSlots: [String]?

    init(id: String = UUID().uuidString, name: String, description: String, status: AutomationStatus, platforms: [SocialPlatform], scheduleType: QueueScheduleType, postsInQueue: Int, postsPublished: Int, nextPostTime: Date?, intervalMinutes: Int? = nil, timeSlots: [String]? = nil) {
        self.id = id
        self.name = name
        self.description = description
        self.status = status
        self.platforms = platforms
        self.scheduleType = scheduleType
        self.postsInQueue = postsInQueue
        self.postsPublished = postsPublished
        self.nextPostTime = nextPostTime
        self.intervalMinutes = intervalMinutes
        self.timeSlots = timeSlots
    }
}

// MARK: - Evergreen Content Models

struct EvergreenPost: Codable, Identifiable {
    let id: String
    let content: String
    let platforms: [SocialPlatform]
    let media: [PostMedia]
    let timesPosted: Int
    let lastPosted: Date?
    let nextScheduled: Date?
    let recycleIntervalDays: Int
    let performance: EvergreenPerformance

    init(id: String = UUID().uuidString, content: String, platforms: [SocialPlatform], media: [PostMedia], timesPosted: Int, lastPosted: Date?, nextScheduled: Date?, recycleIntervalDays: Int, performance: EvergreenPerformance) {
        self.id = id
        self.content = content
        self.platforms = platforms
        self.media = media
        self.timesPosted = timesPosted
        self.lastPosted = lastPosted
        self.nextScheduled = nextScheduled
        self.recycleIntervalDays = recycleIntervalDays
        self.performance = performance
    }
}

struct EvergreenPerformance: Codable {
    let averageEngagement: Int
    let averageReach: Int
    let engagementRate: Double
}

// MARK: - Automation Stats

struct AutomationStats: Codable {
    let category: AutomationCategory
    let activeCount: Int
    let inactiveCount: Int
    let totalActions: Int
    let successRate: Double
}

struct AutomationOverview: Codable {
    let stats: [AutomationStats]
    let rssFeeds: [RSSFeed]
    let contentQueues: [ContentQueue]
    let evergreenPosts: [EvergreenPost]
}
