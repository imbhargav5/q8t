import Foundation

class MockIntegrations {
    static let shared = MockIntegrations()

    let integrations: [Integration] = [
        Integration(
            id: "int-1",
            workspaceId: "workspace-1",
            provider: .twitter,
            providerName: "X (Twitter)",
            category: .socialMedia,
            accountName: "@chatsian",
            accountIdentifier: "chatsian",
            status: .connected,
            connectedAt: Date().addingTimeInterval(-86400 * 60),
            lastSyncAt: Date().addingTimeInterval(-1800),
            tokenExpiresAt: Date().addingTimeInterval(86400 * 30),
            permissions: ["read:posts", "write:posts", "read:messages", "write:messages"],
            stats: IntegrationStats(
                apiCallsToday: 1247,
                apiCallsLimit: 5000,
                itemsSynced: 3456
            ),
            createdAt: Date().addingTimeInterval(-86400 * 60),
            updatedAt: Date().addingTimeInterval(-1800)
        ),
        Integration(
            id: "int-2",
            workspaceId: "workspace-1",
            provider: .instagram,
            providerName: "Instagram",
            category: .socialMedia,
            accountName: "@chatsian_official",
            accountIdentifier: "chatsian_official",
            status: .connected,
            connectedAt: Date().addingTimeInterval(-86400 * 45),
            lastSyncAt: Date().addingTimeInterval(-3600),
            tokenExpiresAt: Date().addingTimeInterval(86400 * 60),
            permissions: ["read:posts", "write:posts", "read:comments", "write:comments"],
            stats: IntegrationStats(
                apiCallsToday: 892,
                apiCallsLimit: 5000,
                itemsSynced: 2134
            ),
            createdAt: Date().addingTimeInterval(-86400 * 45),
            updatedAt: Date().addingTimeInterval(-3600)
        ),
        Integration(
            id: "int-3",
            workspaceId: "workspace-1",
            provider: .linkedin,
            providerName: "LinkedIn",
            category: .socialMedia,
            accountName: "Chatsian Inc.",
            accountIdentifier: "chatsian-inc",
            status: .connected,
            connectedAt: Date().addingTimeInterval(-86400 * 30),
            lastSyncAt: Date().addingTimeInterval(-7200),
            tokenExpiresAt: Date().addingTimeInterval(86400 * 90),
            permissions: ["read:posts", "write:posts", "read:profile"],
            stats: IntegrationStats(
                apiCallsToday: 456,
                apiCallsLimit: 2000,
                itemsSynced: 876
            ),
            createdAt: Date().addingTimeInterval(-86400 * 30),
            updatedAt: Date().addingTimeInterval(-7200)
        ),
        Integration(
            id: "int-4",
            workspaceId: "workspace-1",
            provider: .slack,
            providerName: "Slack",
            category: .communication,
            accountName: "Chatsian Workspace",
            accountIdentifier: "chatsian-team",
            status: .connected,
            connectedAt: Date().addingTimeInterval(-86400 * 90),
            lastSyncAt: Date().addingTimeInterval(-900),
            permissions: ["channels:read", "chat:write", "users:read"],
            stats: IntegrationStats(
                apiCallsToday: 234,
                apiCallsLimit: 10000,
                itemsSynced: 5432
            ),
            createdAt: Date().addingTimeInterval(-86400 * 90),
            updatedAt: Date().addingTimeInterval(-900)
        ),
        Integration(
            id: "int-5",
            workspaceId: "workspace-1",
            provider: .cloudinary,
            providerName: "Cloudinary",
            category: .media,
            accountName: "chatsian-media",
            status: .connected,
            connectedAt: Date().addingTimeInterval(-86400 * 120),
            lastSyncAt: Date().addingTimeInterval(-14400),
            permissions: ["upload:images", "upload:videos", "read:assets"],
            stats: IntegrationStats(
                apiCallsToday: 67,
                apiCallsLimit: 1000,
                storageUsed: 5368709120, // 5GB in bytes
                storageLimit: 107374182400, // 100GB in bytes
                itemsSynced: 1234
            ),
            createdAt: Date().addingTimeInterval(-86400 * 120),
            updatedAt: Date().addingTimeInterval(-14400)
        ),
        Integration(
            id: "int-6",
            workspaceId: "workspace-1",
            provider: .facebook,
            providerName: "Facebook",
            category: .socialMedia,
            accountName: "Chatsian",
            accountIdentifier: "chatsian",
            status: .error,
            connectedAt: Date().addingTimeInterval(-86400 * 15),
            lastSyncAt: Date().addingTimeInterval(-86400 * 2),
            tokenExpiresAt: Date().addingTimeInterval(-86400),
            permissions: ["pages_read_engagement", "pages_manage_posts"],
            errorMessage: "Token expired. Please reconnect your account.",
            createdAt: Date().addingTimeInterval(-86400 * 15),
            updatedAt: Date().addingTimeInterval(-3600)
        )
    ]

    let providers: [ProviderDefinition] = [
        ProviderDefinition(
            id: "provider-1",
            provider: .notion,
            name: "Notion",
            description: "Connect your Notion workspace to create and sync content seamlessly",
            category: .productivity,
            features: ["Content Library", "Team Collaboration", "Database Sync"],
            capabilities: ["read:pages", "write:pages", "read:databases"],
            documentationUrl: "https://developers.notion.com"
        ),
        ProviderDefinition(
            id: "provider-2",
            provider: .salesforce,
            name: "Salesforce",
            description: "Sync customer data and interactions with your Salesforce CRM",
            category: .business,
            features: ["CRM Integration", "Lead Management", "Analytics"],
            capabilities: ["read:contacts", "write:contacts", "read:leads"],
            documentationUrl: "https://developer.salesforce.com"
        ),
        ProviderDefinition(
            id: "provider-3",
            provider: .tiktok,
            name: "TikTok",
            description: "Publish and manage your TikTok content directly from Chatsian",
            category: .socialMedia,
            features: ["Video Publishing", "Analytics", "Comment Management"],
            capabilities: ["read:videos", "write:videos", "read:comments"],
            documentationUrl: "https://developers.tiktok.com"
        ),
        ProviderDefinition(
            id: "provider-4",
            provider: .youtube,
            name: "YouTube",
            description: "Manage your YouTube channel and upload videos seamlessly",
            category: .socialMedia,
            features: ["Video Upload", "Channel Analytics", "Comment Moderation"],
            capabilities: ["upload:videos", "read:analytics", "manage:comments"],
            documentationUrl: "https://developers.google.com/youtube"
        ),
        ProviderDefinition(
            id: "provider-5",
            provider: .discord,
            name: "Discord",
            description: "Post updates and engage with your Discord community",
            category: .communication,
            features: ["Channel Posting", "Message Management", "Server Analytics"],
            capabilities: ["send:messages", "read:messages", "manage:webhooks"],
            documentationUrl: "https://discord.com/developers"
        )
    ]
}
