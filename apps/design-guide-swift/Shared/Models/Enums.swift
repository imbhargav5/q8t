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

// MARK: - CRM Activity Type
enum CRMActivityType: String, Codable, CaseIterable {
    case personCreated = "person_created"
    case personUpdated = "person_updated"
    case personDeleted = "person_deleted"
    case profileUpdated = "profile_updated"
    case tagAdded = "tag_added"
    case tagRemoved = "tag_removed"
    case noteAdded = "note_added"
    case noteUpdated = "note_updated"
    case noteDeleted = "note_deleted"
    case socialIdentityAdded = "social_identity_added"
    case socialIdentityRemoved = "social_identity_removed"
    case vipStatusChanged = "vip_status_changed"
    case blockedStatusChanged = "blocked_status_changed"
    case verifiedStatusChanged = "verified_status_changed"
    case conversationStarted = "conversation_started"
    case conversationResolved = "conversation_resolved"
    case messageSent = "message_sent"
    case messageReceived = "message_received"
    case assignedToUser = "assigned_to_user"
    case unassignedFromUser = "unassigned_from_user"
    case customFieldUpdated = "custom_field_updated"
}

// MARK: - Sentiment
enum Sentiment: String, Codable, CaseIterable, Identifiable {
    case positive
    case neutral
    case negative
    case mixed
    case unclassified

    var id: String { rawValue }

    var displayName: String {
        rawValue.capitalized
    }

    var color: String {
        switch self {
        case .positive: return "green"
        case .neutral: return "gray"
        case .negative: return "red"
        case .mixed: return "yellow"
        case .unclassified: return "gray"
        }
    }
}

// MARK: - Priority
enum Priority: String, Codable, CaseIterable, Identifiable {
    case low
    case medium
    case high
    case critical

    var id: String { rawValue }

    var displayName: String {
        rawValue.capitalized
    }

    var color: String {
        switch self {
        case .low: return "gray"
        case .medium: return "yellow"
        case .high: return "orange"
        case .critical: return "red"
        }
    }
}

// MARK: - Post Status
enum PostStatus: String, Codable, CaseIterable, Identifiable {
    case draft
    case scheduled
    case publishing
    case published
    case failed
    case archived

    var id: String { rawValue }

    var displayName: String {
        rawValue.capitalized
    }

    var color: String {
        switch self {
        case .draft: return "gray"
        case .scheduled: return "blue"
        case .publishing: return "yellow"
        case .published: return "green"
        case .failed: return "red"
        case .archived: return "gray"
        }
    }
}

// MARK: - Post Type
enum PostType: String, Codable, CaseIterable, Identifiable {
    case text
    case image
    case video
    case carousel
    case link
    case poll
    case story
    case reel
    case thread

    var id: String { rawValue }

    var displayName: String {
        rawValue.capitalized
    }
}

// MARK: - Stream Type
enum StreamType: String, Codable, CaseIterable, Identifiable {
    case home
    case mentions
    case scheduled
    case published
    case drafts
    case failed
    case highEngagement = "high_engagement"
    case lowEngagement = "low_engagement"
    case platformSpecific = "platform_specific"
    case hashtagSearch = "hashtag_search"

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .home: return "Home"
        case .mentions: return "Mentions"
        case .scheduled: return "Scheduled"
        case .published: return "Published"
        case .drafts: return "Drafts"
        case .failed: return "Failed"
        case .highEngagement: return "High Engagement"
        case .lowEngagement: return "Low Engagement"
        case .platformSpecific: return "Platform Specific"
        case .hashtagSearch: return "Hashtag Search"
        }
    }
}

// MARK: - Integration Status
enum IntegrationStatus: String, Codable, CaseIterable, Identifiable {
    case connected
    case disconnected
    case error
    case pending

    var id: String { rawValue }

    var displayName: String {
        rawValue.capitalized
    }

    var color: String {
        switch self {
        case .connected: return "green"
        case .disconnected: return "gray"
        case .error: return "red"
        case .pending: return "yellow"
        }
    }
}

// MARK: - Integration Category
enum IntegrationCategory: String, Codable, CaseIterable, Identifiable {
    case socialMedia = "social-media"
    case communication
    case productivity
    case business
    case media

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .socialMedia: return "Social Media"
        case .communication: return "Communication"
        case .productivity: return "Productivity"
        case .business: return "Business"
        case .media: return "Media"
        }
    }
}

// MARK: - Integration Provider
enum IntegrationProvider: String, Codable, CaseIterable, Identifiable {
    // Social Media
    case x
    case facebook
    case instagram
    case linkedin
    case reddit
    case bluesky
    case mastodon
    case threads
    case tiktok
    case youtube
    case pinterest
    case farcaster
    case nostr

    // Communication
    case slack
    case discord
    case telegram
    case whatsapp

    // Productivity
    case notion
    case asana
    case clickup
    case monday
    case airtable

    // Business
    case salesforce
    case googleMyBusiness = "google-my-business"
    case trustpilot

    // Media
    case cloudinary
    case dropbox
    case dribbble

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .x: return "X (Twitter)"
        case .facebook: return "Facebook"
        case .instagram: return "Instagram"
        case .linkedin: return "LinkedIn"
        case .reddit: return "Reddit"
        case .bluesky: return "Bluesky"
        case .mastodon: return "Mastodon"
        case .threads: return "Threads"
        case .tiktok: return "TikTok"
        case .youtube: return "YouTube"
        case .pinterest: return "Pinterest"
        case .farcaster: return "Farcaster"
        case .nostr: return "Nostr"
        case .slack: return "Slack"
        case .discord: return "Discord"
        case .telegram: return "Telegram"
        case .whatsapp: return "WhatsApp"
        case .notion: return "Notion"
        case .asana: return "Asana"
        case .clickup: return "ClickUp"
        case .monday: return "Monday.com"
        case .airtable: return "Airtable"
        case .salesforce: return "Salesforce"
        case .googleMyBusiness: return "Google My Business"
        case .trustpilot: return "Trustpilot"
        case .cloudinary: return "Cloudinary"
        case .dropbox: return "Dropbox"
        case .dribbble: return "Dribbble"
        }
    }

    var category: IntegrationCategory {
        switch self {
        case .x, .facebook, .instagram, .linkedin, .reddit, .bluesky, .mastodon, .threads, .tiktok, .youtube, .pinterest, .farcaster, .nostr:
            return .socialMedia
        case .slack, .discord, .telegram, .whatsapp:
            return .communication
        case .notion, .asana, .clickup, .monday, .airtable:
            return .productivity
        case .salesforce, .googleMyBusiness, .trustpilot:
            return .business
        case .cloudinary, .dropbox, .dribbble:
            return .media
        }
    }
}
