import Foundation

// MARK: - Compose Enums

enum ComposeMediaType: String, Codable {
    case image = "image"
    case video = "video"
    case gif = "gif"
}

enum ScheduleType: String, Codable, CaseIterable {
    case now = "now"
    case schedule = "schedule"
    case draft = "draft"
    case queue = "queue"

    var displayName: String {
        switch self {
        case .now: return "Publish Now"
        case .schedule: return "Schedule"
        case .draft: return "Save Draft"
        case .queue: return "Add to Queue"
        }
    }
}

enum AITone: String, Codable, CaseIterable {
    case professional = "professional"
    case casual = "casual"
    case friendly = "friendly"
    case excited = "excited"
    case formal = "formal"
    case humorous = "humorous"

    var displayName: String {
        switch self {
        case .professional: return "Professional"
        case .casual: return "Casual"
        case .friendly: return "Friendly"
        case .excited: return "Excited"
        case .formal: return "Formal"
        case .humorous: return "Humorous"
        }
    }
}

enum AIAction: String, Codable, CaseIterable {
    case rewrite = "rewrite"
    case shorten = "shorten"
    case expand = "expand"
    case translate = "translate"
    case fixGrammar = "fix_grammar"
    case addEmojis = "add_emojis"

    var displayName: String {
        switch self {
        case .rewrite: return "Rewrite"
        case .shorten: return "Shorten"
        case .expand: return "Expand"
        case .translate: return "Translate"
        case .fixGrammar: return "Fix Grammar"
        case .addEmojis: return "Add Emojis"
        }
    }

    var icon: String {
        switch self {
        case .rewrite: return "arrow.triangle.2.circlepath"
        case .shorten: return "scissors"
        case .expand: return "arrow.up.left.and.arrow.down.right"
        case .translate: return "globe"
        case .fixGrammar: return "checkmark.circle"
        case .addEmojis: return "face.smiling"
        }
    }
}

// MARK: - Compose Models

struct ComposeMedia: Codable, Identifiable {
    let id: String
    let type: ComposeMediaType
    let url: String
    let thumbnailUrl: String?
    let altText: String?
    let duration: Int? // for videos, in seconds

    init(id: String = UUID().uuidString, type: ComposeMediaType, url: String, thumbnailUrl: String? = nil, altText: String? = nil, duration: Int? = nil) {
        self.id = id
        self.type = type
        self.url = url
        self.thumbnailUrl = thumbnailUrl
        self.altText = altText
        self.duration = duration
    }
}

struct PlatformCustomization: Codable {
    var twitterThread: [String]? // Array of tweet texts for threads
    var instagramFirstComment: String?
    var instagramLocation: String?
    var instagramUserTags: [String]?
    var linkedInMessage: String?
}

struct SchedulingOptions: Codable {
    var scheduleType: ScheduleType
    var scheduledDate: Date?
    var scheduledTime: String?
    var timezone: String

    init(scheduleType: ScheduleType = .now, scheduledDate: Date? = nil, scheduledTime: String? = nil, timezone: String = TimeZone.current.identifier) {
        self.scheduleType = scheduleType
        self.scheduledDate = scheduledDate
        self.scheduledTime = scheduledTime
        self.timezone = timezone
    }
}

struct SocialAccount: Codable, Identifiable {
    let id: String
    let platform: SocialPlatform
    let username: String
    let displayName: String
    let profileImageUrl: String
    let followerCount: Int
    let isConnected: Bool

    init(id: String = UUID().uuidString, platform: SocialPlatform, username: String, displayName: String, profileImageUrl: String, followerCount: Int, isConnected: Bool = true) {
        self.id = id
        self.platform = platform
        self.username = username
        self.displayName = displayName
        self.profileImageUrl = profileImageUrl
        self.followerCount = followerCount
        self.isConnected = isConnected
    }
}

struct PlatformLimit: Codable {
    let platform: SocialPlatform
    let characterLimit: Int
    let mediaLimit: Int
    let videoMaxDuration: Int? // in seconds
    let supportsThreads: Bool
    let supportsFirstComment: Bool
    let supportsLocation: Bool
    let supportsUserTags: Bool

    static let limits: [SocialPlatform: PlatformLimit] = [
        .twitter: PlatformLimit(platform: .twitter, characterLimit: 280, mediaLimit: 4, videoMaxDuration: 140, supportsThreads: true, supportsFirstComment: false, supportsLocation: false, supportsUserTags: true),
        .instagram: PlatformLimit(platform: .instagram, characterLimit: 2200, mediaLimit: 10, videoMaxDuration: 60, supportsThreads: false, supportsFirstComment: true, supportsLocation: true, supportsUserTags: true),
        .facebook: PlatformLimit(platform: .facebook, characterLimit: 63206, mediaLimit: 10, videoMaxDuration: 240, supportsThreads: false, supportsFirstComment: false, supportsLocation: true, supportsUserTags: true),
        .linkedin: PlatformLimit(platform: .linkedin, characterLimit: 3000, mediaLimit: 9, videoMaxDuration: 600, supportsThreads: false, supportsFirstComment: false, supportsLocation: false, supportsUserTags: false),
        .tiktok: PlatformLimit(platform: .tiktok, characterLimit: 2200, mediaLimit: 1, videoMaxDuration: 180, supportsThreads: false, supportsFirstComment: false, supportsLocation: false, supportsUserTags: true),
        .youtube: PlatformLimit(platform: .youtube, characterLimit: 5000, mediaLimit: 1, videoMaxDuration: nil, supportsThreads: false, supportsFirstComment: false, supportsLocation: false, supportsUserTags: false),
        .pinterest: PlatformLimit(platform: .pinterest, characterLimit: 500, mediaLimit: 1, videoMaxDuration: 60, supportsThreads: false, supportsFirstComment: false, supportsLocation: false, supportsUserTags: false),
        .threads: PlatformLimit(platform: .threads, characterLimit: 500, mediaLimit: 10, videoMaxDuration: 60, supportsThreads: true, supportsFirstComment: false, supportsLocation: false, supportsUserTags: true)
    ]
}

struct BestPostingTime: Codable {
    let platform: SocialPlatform
    let dayOfWeek: String
    let hour: Int
    let engagementScore: Double

    var displayTime: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "h a"
        let calendar = Calendar.current
        var components = DateComponents()
        components.hour = hour
        if let date = calendar.date(from: components) {
            return formatter.string(from: date)
        }
        return "\(hour):00"
    }
}

struct ComposeDraft: Codable {
    var id: String
    var content: String
    var selectedPlatforms: [SocialPlatform]
    var media: [ComposeMedia]
    var platformCustomizations: [SocialPlatform: PlatformCustomization]
    var schedulingOptions: SchedulingOptions
    var lastUpdated: Date

    init(id: String = UUID().uuidString, content: String = "", selectedPlatforms: [SocialPlatform] = [], media: [ComposeMedia] = [], platformCustomizations: [SocialPlatform: PlatformCustomization] = [:], schedulingOptions: SchedulingOptions = SchedulingOptions(), lastUpdated: Date = Date()) {
        self.id = id
        self.content = content
        self.selectedPlatforms = selectedPlatforms
        self.media = media
        self.platformCustomizations = platformCustomizations
        self.schedulingOptions = schedulingOptions
        self.lastUpdated = lastUpdated
    }
}
