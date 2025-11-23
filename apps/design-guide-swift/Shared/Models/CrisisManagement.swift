import Foundation

// MARK: - Crisis Enums

enum IncidentSeverity: String, Codable, CaseIterable {
    case low = "low"
    case medium = "medium"
    case high = "high"
    case critical = "critical"

    var displayName: String {
        switch self {
        case .low: return "Low"
        case .medium: return "Medium"
        case .high: return "High"
        case .critical: return "Critical"
        }
    }

    var color: String {
        switch self {
        case .low: return "blue"
        case .medium: return "yellow"
        case .high: return "orange"
        case .critical: return "red"
        }
    }
}

enum IncidentStatus: String, Codable {
    case detected = "detected"
    case acknowledged = "acknowledged"
    case investigating = "investigating"
    case resolving = "resolving"
    case resolved = "resolved"

    var displayName: String {
        switch self {
        case .detected: return "Detected"
        case .acknowledged: return "Acknowledged"
        case .investigating: return "Investigating"
        case .resolving: return "Resolving"
        case .resolved: return "Resolved"
        }
    }

    var color: String {
        switch self {
        case .detected: return "red"
        case .acknowledged: return "orange"
        case .investigating: return "yellow"
        case .resolving: return "blue"
        case .resolved: return "green"
        }
    }
}

enum DetectionRuleType: String, Codable {
    case sentimentSpike = "sentiment_spike"
    case keywordMatch = "keyword_match"
    case volumeSpike = "volume_spike"

    var displayName: String {
        switch self {
        case .sentimentSpike: return "Sentiment Spike"
        case .keywordMatch: return "Keyword Match"
        case .volumeSpike: return "Volume Spike"
        }
    }

    var icon: String {
        switch self {
        case .sentimentSpike: return "chart.line.downtrend.xyaxis"
        case .keywordMatch: return "text.word.spacing"
        case .volumeSpike: return "chart.bar.fill"
        }
    }
}

enum ComponentStatus: String, Codable {
    case operational = "operational"
    case degraded = "degraded"
    case outage = "outage"
    case maintenance = "maintenance"

    var displayName: String {
        switch self {
        case .operational: return "Operational"
        case .degraded: return "Degraded"
        case .outage: return "Outage"
        case .maintenance: return "Maintenance"
        }
    }

    var color: String {
        switch self {
        case .operational: return "green"
        case .degraded: return "yellow"
        case .outage: return "red"
        case .maintenance: return "blue"
        }
    }
}

// MARK: - Crisis Models

struct CrisisIncident: Codable, Identifiable {
    let id: String
    let title: String
    let description: String
    let severity: IncidentSeverity
    let status: IncidentStatus
    let detectedAt: Date
    let acknowledgedAt: Date?
    let resolvedAt: Date?
    let affectedPlatforms: [SocialPlatform]
    let mentionCount: Int
    let sentimentScore: Double
    let potentialReach: Int
    let assignedTo: String?

    init(id: String = UUID().uuidString, title: String, description: String, severity: IncidentSeverity, status: IncidentStatus, detectedAt: Date, acknowledgedAt: Date? = nil, resolvedAt: Date? = nil, affectedPlatforms: [SocialPlatform], mentionCount: Int, sentimentScore: Double, potentialReach: Int, assignedTo: String? = nil) {
        self.id = id
        self.title = title
        self.description = description
        self.severity = severity
        self.status = status
        self.detectedAt = detectedAt
        self.acknowledgedAt = acknowledgedAt
        self.resolvedAt = resolvedAt
        self.affectedPlatforms = affectedPlatforms
        self.mentionCount = mentionCount
        self.sentimentScore = sentimentScore
        self.potentialReach = potentialReach
        self.assignedTo = assignedTo
    }
}

struct DetectionRule: Codable, Identifiable {
    let id: String
    let name: String
    let type: DetectionRuleType
    let isActive: Bool
    let platforms: [SocialPlatform]
    let keywords: [String]?
    let sentimentThreshold: Double?
    let volumeThreshold: Int?
    let triggeredCount: Int

    init(id: String = UUID().uuidString, name: String, type: DetectionRuleType, isActive: Bool, platforms: [SocialPlatform], keywords: [String]? = nil, sentimentThreshold: Double? = nil, volumeThreshold: Int? = nil, triggeredCount: Int) {
        self.id = id
        self.name = name
        self.type = type
        self.isActive = isActive
        self.platforms = platforms
        self.keywords = keywords
        self.sentimentThreshold = sentimentThreshold
        self.volumeThreshold = volumeThreshold
        self.triggeredCount = triggeredCount
    }
}

struct StatusComponent: Codable, Identifiable {
    let id: String
    let name: String
    let status: ComponentStatus
    let lastUpdated: Date
    let description: String?

    init(id: String = UUID().uuidString, name: String, status: ComponentStatus, lastUpdated: Date, description: String? = nil) {
        self.id = id
        self.name = name
        self.status = status
        self.lastUpdated = lastUpdated
        self.description = description
    }
}

struct SocialSignal: Codable, Identifiable {
    let id: String
    let platform: SocialPlatform
    let authorName: String
    let authorUsername: String
    let content: String
    let timestamp: Date
    let sentimentScore: Double
    let engagement: Int
    let reach: Int
    let url: String

    init(id: String = UUID().uuidString, platform: SocialPlatform, authorName: String, authorUsername: String, content: String, timestamp: Date, sentimentScore: Double, engagement: Int, reach: Int, url: String) {
        self.id = id
        self.platform = platform
        self.authorName = authorName
        self.authorUsername = authorUsername
        self.content = content
        self.timestamp = timestamp
        self.sentimentScore = sentimentScore
        self.engagement = engagement
        self.reach = reach
        self.url = url
    }
}

struct CrisisOverview: Codable {
    let activeIncidents: [CrisisIncident]
    let resolvedIncidents: [CrisisIncident]
    let detectionRules: [DetectionRule]
    let statusComponents: [StatusComponent]
}
