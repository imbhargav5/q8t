import Foundation

// MARK: - Analytics Enums

enum AnalyticsPeriod: String, Codable, CaseIterable {
    case last7Days = "last_7_days"
    case last30Days = "last_30_days"
    case last90Days = "last_90_days"
    case thisMonth = "this_month"
    case lastMonth = "last_month"
    case custom = "custom"

    var displayName: String {
        switch self {
        case .last7Days: return "Last 7 days"
        case .last30Days: return "Last 30 days"
        case .last90Days: return "Last 90 days"
        case .thisMonth: return "This month"
        case .lastMonth: return "Last month"
        case .custom: return "Custom range"
        }
    }
}

enum MetricType: String, Codable {
    case engagement = "engagement"
    case reach = "reach"
    case followers = "followers"
    case engagementRate = "engagement_rate"
    case posts = "posts"
    case responseTime = "response_time"
    case satisfaction = "satisfaction"
    case performance = "performance"
}

enum InsightType: String, Codable {
    case success = "success"
    case warning = "warning"
    case info = "info"
    case tip = "tip"
}

enum TimelineEventType: String, Codable {
    case milestone = "milestone"
    case alert = "alert"
    case achievement = "achievement"
}

// MARK: - Analytics Models

struct AnalyticsMetric: Codable, Identifiable {
    let id: String
    let type: MetricType
    let name: String
    let value: Double
    let formattedValue: String
    let trend: MetricTrend
    let period: AnalyticsPeriod

    init(id: String = UUID().uuidString, type: MetricType, name: String, value: Double, formattedValue: String, trend: MetricTrend, period: AnalyticsPeriod) {
        self.id = id
        self.type = type
        self.name = name
        self.value = value
        self.formattedValue = formattedValue
        self.trend = trend
        self.period = period
    }
}

struct MetricTrend: Codable {
    let direction: TrendDirection
    let percentage: Double
    let comparisonPeriod: String

    enum TrendDirection: String, Codable {
        case up = "up"
        case down = "down"
        case neutral = "neutral"
    }
}

struct PlatformPerformance: Codable, Identifiable {
    let id: String
    let platform: SocialPlatform
    let followers: Int
    let engagement: Int
    let reach: Int
    let posts: Int
    let engagementRate: Double
    let trend: MetricTrend

    init(id: String = UUID().uuidString, platform: SocialPlatform, followers: Int, engagement: Int, reach: Int, posts: Int, engagementRate: Double, trend: MetricTrend) {
        self.id = id
        self.platform = platform
        self.followers = followers
        self.engagement = engagement
        self.reach = reach
        self.posts = posts
        self.engagementRate = engagementRate
        self.trend = trend
    }
}

struct PostAnalytics: Codable, Identifiable {
    let id: String
    let platform: SocialPlatform
    let content: String
    let publishedAt: Date
    let engagement: Int
    let reach: Int
    let likes: Int
    let comments: Int
    let shares: Int
    let clicks: Int
    let engagementRate: Double

    init(id: String = UUID().uuidString, platform: SocialPlatform, content: String, publishedAt: Date, engagement: Int, reach: Int, likes: Int, comments: Int, shares: Int, clicks: Int, engagementRate: Double) {
        self.id = id
        self.platform = platform
        self.content = content
        self.publishedAt = publishedAt
        self.engagement = engagement
        self.reach = reach
        self.likes = likes
        self.comments = comments
        self.shares = shares
        self.clicks = clicks
        self.engagementRate = engagementRate
    }
}

struct QuickInsight: Codable, Identifiable {
    let id: String
    let type: InsightType
    let title: String
    let description: String
    let actionText: String?

    init(id: String = UUID().uuidString, type: InsightType, title: String, description: String, actionText: String? = nil) {
        self.id = id
        self.type = type
        self.title = title
        self.description = description
        self.actionText = actionText
    }
}

struct TimelineEvent: Codable, Identifiable {
    let id: String
    let type: TimelineEventType
    let title: String
    let description: String
    let timestamp: Date
    let platform: SocialPlatform?

    init(id: String = UUID().uuidString, type: TimelineEventType, title: String, description: String, timestamp: Date, platform: SocialPlatform? = nil) {
        self.id = id
        self.type = type
        self.title = title
        self.description = description
        self.timestamp = timestamp
        self.platform = platform
    }
}

struct AnalyticsOverview: Codable {
    let metrics: [AnalyticsMetric]
    let platformPerformance: [PlatformPerformance]
    let topPosts: [PostAnalytics]
    let insights: [QuickInsight]
    let timeline: [TimelineEvent]
    let period: AnalyticsPeriod
}
