import Foundation

// MARK: - General Settings
struct GeneralSettings: Codable {
    let theme: Theme
    let language: String
    let timezone: String
    let dateFormat: String
    let timeFormat: String

    init(
        theme: Theme,
        language: String,
        timezone: String,
        dateFormat: String,
        timeFormat: String
    ) {
        self.theme = theme
        self.language = language
        self.timezone = timezone
        self.dateFormat = dateFormat
        self.timeFormat = timeFormat
    }
}

// MARK: - Notification Preferences
struct NotificationPreferences: Codable {
    let email: Bool
    let push: Bool
    let inApp: Bool
    let sms: Bool
    let events: NotificationEvents
    let digest: DigestSettings

    init(
        email: Bool,
        push: Bool,
        inApp: Bool,
        sms: Bool,
        events: NotificationEvents,
        digest: DigestSettings
    ) {
        self.email = email
        self.push = push
        self.inApp = inApp
        self.sms = sms
        self.events = events
        self.digest = digest
    }
}

struct NotificationEvents: Codable {
    let newMessages: Bool
    let mentions: Bool
    let comments: Bool
    let newPosts: Bool
    let teamInvites: Bool

    init(
        newMessages: Bool,
        mentions: Bool,
        comments: Bool,
        newPosts: Bool,
        teamInvites: Bool
    ) {
        self.newMessages = newMessages
        self.mentions = mentions
        self.comments = comments
        self.newPosts = newPosts
        self.teamInvites = teamInvites
    }
}

struct DigestSettings: Codable {
    let enabled: Bool
    let frequency: String

    init(enabled: Bool, frequency: String) {
        self.enabled = enabled
        self.frequency = frequency
    }
}

// MARK: - Privacy Settings
struct PrivacySettings: Codable {
    let profileVisibility: String
    let showEmail: Bool
    let showActivity: Bool
    let allowDirectMessages: Bool
    let showOnlineStatus: Bool
    let showTypingIndicator: Bool
    let dataSharing: DataSharingSettings
    let connectedApps: [String]

    init(
        profileVisibility: String,
        showEmail: Bool,
        showActivity: Bool,
        allowDirectMessages: Bool,
        showOnlineStatus: Bool,
        showTypingIndicator: Bool,
        dataSharing: DataSharingSettings,
        connectedApps: [String]
    ) {
        self.profileVisibility = profileVisibility
        self.showEmail = showEmail
        self.showActivity = showActivity
        self.allowDirectMessages = allowDirectMessages
        self.showOnlineStatus = showOnlineStatus
        self.showTypingIndicator = showTypingIndicator
        self.dataSharing = dataSharing
        self.connectedApps = connectedApps
    }
}

struct DataSharingSettings: Codable {
    let analytics: Bool
    let personalization: Bool
    let crashReports: Bool

    init(analytics: Bool, personalization: Bool, crashReports: Bool) {
        self.analytics = analytics
        self.personalization = personalization
        self.crashReports = crashReports
    }
}

// MARK: - Security Settings
struct TwoFactorAuth: Codable {
    let enabled: Bool
    let method: TwoFactorMethod?
    let backupCodes: [String]

    init(enabled: Bool, method: TwoFactorMethod? = nil, backupCodes: [String] = []) {
        self.enabled = enabled
        self.method = method
        self.backupCodes = backupCodes
    }
}

struct LoginSession: Codable, Identifiable {
    let id: String
    let deviceName: String
    let deviceType: String
    let location: String
    let ipAddress: String
    let isCurrent: Bool
    let lastActive: Date
    let createdAt: Date

    init(
        id: String,
        deviceName: String,
        deviceType: String,
        location: String,
        ipAddress: String,
        isCurrent: Bool,
        lastActive: Date,
        createdAt: Date
    ) {
        self.id = id
        self.deviceName = deviceName
        self.deviceType = deviceType
        self.location = location
        self.ipAddress = ipAddress
        self.isCurrent = isCurrent
        self.lastActive = lastActive
        self.createdAt = createdAt
    }
}

struct LoginHistory: Codable, Identifiable {
    let id: String
    let deviceName: String
    let location: String
    let ipAddress: String
    let eventType: String
    let success: Bool
    let timestamp: Date

    init(
        id: String,
        deviceName: String,
        location: String,
        ipAddress: String,
        eventType: String,
        success: Bool,
        timestamp: Date
    ) {
        self.id = id
        self.deviceName = deviceName
        self.location = location
        self.ipAddress = ipAddress
        self.eventType = eventType
        self.success = success
        self.timestamp = timestamp
    }
}

struct APIKey: Codable, Identifiable {
    let id: String
    let name: String
    let keyPreview: String
    let permissions: [APIPermission]
    let lastUsed: Date?
    let createdAt: Date
    let expiresAt: Date?

    init(
        id: String,
        name: String,
        keyPreview: String,
        permissions: [APIPermission],
        lastUsed: Date? = nil,
        createdAt: Date,
        expiresAt: Date? = nil
    ) {
        self.id = id
        self.name = name
        self.keyPreview = keyPreview
        self.permissions = permissions
        self.lastUsed = lastUsed
        self.createdAt = createdAt
        self.expiresAt = expiresAt
    }
}

struct ConnectedApp: Codable, Identifiable {
    let id: String
    let name: String
    let description: String
    let icon: String?
    let permissions: [String]
    let connectedAt: Date
    let lastAccess: Date

    init(
        id: String,
        name: String,
        description: String,
        icon: String? = nil,
        permissions: [String],
        connectedAt: Date,
        lastAccess: Date
    ) {
        self.id = id
        self.name = name
        self.description = description
        self.icon = icon
        self.permissions = permissions
        self.connectedAt = connectedAt
        self.lastAccess = lastAccess
    }
}

struct SecurityAuditLog: Codable, Identifiable {
    let id: String
    let eventType: String
    let description: String
    let ipAddress: String
    let userAgent: String
    let timestamp: Date

    init(
        id: String,
        eventType: String,
        description: String,
        ipAddress: String,
        userAgent: String,
        timestamp: Date
    ) {
        self.id = id
        self.eventType = eventType
        self.description = description
        self.ipAddress = ipAddress
        self.userAgent = userAgent
        self.timestamp = timestamp
    }
}
