import Foundation

// MARK: - Social Platform
enum SocialPlatform: String, Codable, CaseIterable, Identifiable {
    case whatsapp
    case threads
    case twitter
    case facebook
    case instagram
    case linkedin
    case pinterest
    case reddit
    case slack
    case discord
    case tiktok
    case youtube
    case bluesky
    case telegram
    case mastodon
    case farcaster
    case nostr

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .whatsapp: return "WhatsApp"
        case .threads: return "Threads"
        case .twitter: return "Twitter"
        case .facebook: return "Facebook"
        case .instagram: return "Instagram"
        case .linkedin: return "LinkedIn"
        case .pinterest: return "Pinterest"
        case .reddit: return "Reddit"
        case .slack: return "Slack"
        case .discord: return "Discord"
        case .tiktok: return "TikTok"
        case .youtube: return "YouTube"
        case .bluesky: return "Bluesky"
        case .telegram: return "Telegram"
        case .mastodon: return "Mastodon"
        case .farcaster: return "Farcaster"
        case .nostr: return "Nostr"
        }
    }

    var color: String {
        switch self {
        case .whatsapp: return "#25D366"
        case .threads: return "#000000"
        case .twitter: return "#1DA1F2"
        case .facebook: return "#1877F2"
        case .instagram: return "#E4405F"
        case .linkedin: return "#0A66C2"
        case .pinterest: return "#E60023"
        case .reddit: return "#FF4500"
        case .slack: return "#4A154B"
        case .discord: return "#5865F2"
        case .tiktok: return "#000000"
        case .youtube: return "#FF0000"
        case .bluesky: return "#1185FE"
        case .telegram: return "#26A5E4"
        case .mastodon: return "#6364FF"
        case .farcaster: return "#8465CB"
        case .nostr: return "#8B5CF6"
        }
    }
}

// MARK: - Message Type
enum MessageType: String, Codable, CaseIterable {
    case dm
    case mention
    case reply
    case comment
    case reaction
    case post
    case storyReply = "story_reply"
    case groupMessage = "group_message"
    case directPost = "direct_post"
}

// MARK: - Conversation Status
enum ConversationStatus: String, Codable, CaseIterable, Identifiable {
    case open
    case pending
    case resolved
    case archived

    var id: String { rawValue }

    var displayName: String {
        rawValue.capitalized
    }

    var color: String {
        switch self {
        case .open: return "blue"
        case .pending: return "yellow"
        case .resolved: return "green"
        case .archived: return "gray"
        }
    }
}

// MARK: - Workspace Role
enum WorkspaceRole: String, Codable, CaseIterable, Identifiable {
    case owner
    case admin
    case member
    case guest

    var id: String { rawValue }

    var displayName: String {
        rawValue.capitalized
    }
}

// MARK: - User Status
enum UserStatus: String, Codable, CaseIterable, Identifiable {
    case online
    case away
    case busy
    case offline

    var id: String { rawValue }

    var displayName: String {
        rawValue.capitalized
    }

    var color: String {
        switch self {
        case .online: return "green"
        case .away: return "yellow"
        case .busy: return "red"
        case .offline: return "gray"
        }
    }
}

// MARK: - Media Type
enum MediaType: String, Codable, CaseIterable {
    case image
    case video
    case audio
    case document
    case gif
    case sticker
    case voice
    case location
    case contact
}

// MARK: - Note Type
enum NoteType: String, Codable, CaseIterable {
    case `internal`
    case resolution
    case actionItem = "action_item"
    case followUp = "follow_up"
    case escalation
}

// MARK: - Subscription Plan
enum SubscriptionPlan: String, Codable, CaseIterable, Identifiable {
    case free
    case starter
    case professional
    case enterprise

    var id: String { rawValue }

    var displayName: String {
        rawValue.capitalized
    }
}

// MARK: - Billing Period
enum BillingPeriod: String, Codable, CaseIterable {
    case monthly
    case yearly
}

// MARK: - Theme
enum Theme: String, Codable, CaseIterable, Identifiable {
    case light
    case dark
    case system

    var id: String { rawValue }

    var displayName: String {
        rawValue.capitalized
    }
}

// MARK: - Two Factor Method
enum TwoFactorMethod: String, Codable, CaseIterable, Identifiable {
    case authenticator
    case sms
    case email

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .authenticator: return "Authenticator App"
        case .sms: return "SMS"
        case .email: return "Email"
        }
    }
}

// MARK: - API Permission
enum APIPermission: String, Codable, CaseIterable, Identifiable {
    case readMessages = "read:messages"
    case writeMessages = "write:messages"
    case readAnalytics = "read:analytics"
    case manageWorkspace = "manage:workspace"

    var id: String { rawValue }
}
