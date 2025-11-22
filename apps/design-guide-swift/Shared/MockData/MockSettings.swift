import Foundation

class MockSettings {
    static let generalSettings = GeneralSettings(
        theme: .system,
        language: "en",
        timezone: "America/New_York",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12h"
    )

    static let notificationPreferences = NotificationPreferences(
        email: true,
        push: true,
        inApp: true,
        sms: false,
        events: NotificationEvents(
            newMessages: true,
            mentions: true,
            comments: true,
            newPosts: false,
            teamInvites: true
        ),
        digest: DigestSettings(
            enabled: true,
            frequency: "daily"
        )
    )

    static let privacySettings = PrivacySettings(
        profileVisibility: "workspace",
        showEmail: false,
        showActivity: true,
        allowDirectMessages: true,
        showOnlineStatus: true,
        showTypingIndicator: true,
        dataSharing: DataSharingSettings(
            analytics: true,
            personalization: true,
            crashReports: true
        ),
        connectedApps: []
    )

    static let twoFactorAuth = TwoFactorAuth(
        enabled: true,
        method: .authenticator,
        backupCodes: [
            "ABCD-1234-EFGH-5678",
            "IJKL-9012-MNOP-3456",
            "QRST-7890-UVWX-1234"
        ]
    )

    static let loginSessions: [LoginSession] = [
        LoginSession(
            id: "session-1",
            deviceName: "MacBook Pro",
            deviceType: "desktop",
            location: "New York, US",
            ipAddress: "192.168.1.100",
            isCurrent: true,
            lastActive: Date(),
            createdAt: Date().addingTimeInterval(-30 * 24 * 60 * 60)
        ),
        LoginSession(
            id: "session-2",
            deviceName: "iPhone 15 Pro",
            deviceType: "mobile",
            location: "New York, US",
            ipAddress: "192.168.1.101",
            isCurrent: false,
            lastActive: Date().addingTimeInterval(-2 * 60 * 60),
            createdAt: Date().addingTimeInterval(-60 * 24 * 60 * 60)
        ),
        LoginSession(
            id: "session-3",
            deviceName: "iPad Air",
            deviceType: "tablet",
            location: "Boston, US",
            ipAddress: "10.0.0.50",
            isCurrent: false,
            lastActive: Date().addingTimeInterval(-5 * 24 * 60 * 60),
            createdAt: Date().addingTimeInterval(-90 * 24 * 60 * 60)
        )
    ]

    static let loginHistory: [LoginHistory] = [
        LoginHistory(
            id: "history-1",
            deviceName: "MacBook Pro",
            location: "New York, US",
            ipAddress: "192.168.1.100",
            eventType: "login",
            success: true,
            timestamp: Date()
        ),
        LoginHistory(
            id: "history-2",
            deviceName: "iPhone 15 Pro",
            location: "New York, US",
            ipAddress: "192.168.1.101",
            eventType: "login",
            success: true,
            timestamp: Date().addingTimeInterval(-2 * 60 * 60)
        ),
        LoginHistory(
            id: "history-3",
            deviceName: "Unknown Device",
            location: "Los Angeles, US",
            ipAddress: "203.0.113.42",
            eventType: "login",
            success: false,
            timestamp: Date().addingTimeInterval(-24 * 60 * 60)
        ),
        LoginHistory(
            id: "history-4",
            deviceName: "iPad Air",
            location: "Boston, US",
            ipAddress: "10.0.0.50",
            eventType: "logout",
            success: true,
            timestamp: Date().addingTimeInterval(-5 * 24 * 60 * 60)
        )
    ]

    static let apiKeys: [APIKey] = [
        APIKey(
            id: "key-1",
            name: "Production API Key",
            keyPreview: "sk_live_***abc123",
            permissions: [.readMessages, .writeMessages, .readAnalytics],
            lastUsed: Date().addingTimeInterval(-2 * 60 * 60),
            createdAt: Date().addingTimeInterval(-30 * 24 * 60 * 60),
            expiresAt: nil
        ),
        APIKey(
            id: "key-2",
            name: "Development Key",
            keyPreview: "sk_test_***xyz789",
            permissions: [.readMessages, .readAnalytics],
            lastUsed: Date().addingTimeInterval(-24 * 60 * 60),
            createdAt: Date().addingTimeInterval(-15 * 24 * 60 * 60),
            expiresAt: Date().addingTimeInterval(15 * 24 * 60 * 60)
        )
    ]

    static let connectedApps: [ConnectedApp] = [
        ConnectedApp(
            id: "app-1",
            name: "Zapier",
            description: "Automation and workflow integration",
            icon: "zapier",
            permissions: ["Read messages", "Create posts", "Read analytics"],
            connectedAt: Date().addingTimeInterval(-60 * 24 * 60 * 60),
            lastAccess: Date().addingTimeInterval(-1 * 24 * 60 * 60)
        ),
        ConnectedApp(
            id: "app-2",
            name: "Google Analytics",
            description: "Advanced analytics and tracking",
            icon: "google-analytics",
            permissions: ["Read analytics", "Export data"],
            connectedAt: Date().addingTimeInterval(-90 * 24 * 60 * 60),
            lastAccess: Date().addingTimeInterval(-3 * 60 * 60)
        )
    ]

    static let securityAuditLog: [SecurityAuditLog] = [
        SecurityAuditLog(
            id: "audit-1",
            eventType: "password_changed",
            description: "Password was successfully changed",
            ipAddress: "192.168.1.100",
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            timestamp: Date().addingTimeInterval(-5 * 24 * 60 * 60)
        ),
        SecurityAuditLog(
            id: "audit-2",
            eventType: "2fa_enabled",
            description: "Two-factor authentication was enabled",
            ipAddress: "192.168.1.100",
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            timestamp: Date().addingTimeInterval(-10 * 24 * 60 * 60)
        ),
        SecurityAuditLog(
            id: "audit-3",
            eventType: "api_key_created",
            description: "New API key 'Production API Key' was created",
            ipAddress: "192.168.1.100",
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            timestamp: Date().addingTimeInterval(-30 * 24 * 60 * 60)
        ),
        SecurityAuditLog(
            id: "audit-4",
            eventType: "failed_login",
            description: "Failed login attempt detected",
            ipAddress: "203.0.113.42",
            userAgent: "Unknown",
            timestamp: Date().addingTimeInterval(-24 * 60 * 60)
        )
    ]
}
