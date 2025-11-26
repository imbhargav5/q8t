import Foundation

class MockCRM {
    static let shared = MockCRM()

    let segments: [CRMSegment] = [
        CRMSegment(
            id: "segment-1",
            workspaceId: "workspace-1",
            name: "All Contacts",
            description: "All contacts in your workspace",
            icon: "👥",
            isSystem: true,
            memberCount: 8,
            createdAt: Date().addingTimeInterval(-86400 * 180),
            updatedAt: Date().addingTimeInterval(-86400 * 180)
        ),
        CRMSegment(
            id: "segment-2",
            workspaceId: "workspace-1",
            name: "VIP Contacts",
            description: "High-value contacts marked as VIP",
            icon: "⭐",
            isSystem: true,
            memberCount: 3,
            color: "#F59E0B",
            createdAt: Date().addingTimeInterval(-86400 * 180),
            updatedAt: Date().addingTimeInterval(-86400 * 180)
        ),
        CRMSegment(
            id: "segment-3",
            workspaceId: "workspace-1",
            name: "Active (30 days)",
            description: "Contacts with activity in the last 30 days",
            icon: "🔥",
            isSystem: true,
            memberCount: 6,
            createdAt: Date().addingTimeInterval(-86400 * 180),
            updatedAt: Date().addingTimeInterval(-86400)
        ),
        CRMSegment(
            id: "segment-4",
            workspaceId: "workspace-1",
            name: "Enterprise Prospects",
            description: "Potential enterprise customers",
            icon: "💼",
            isFavorite: true,
            memberCount: 2,
            color: "#8B5CF6",
            createdAt: Date().addingTimeInterval(-86400 * 60),
            updatedAt: Date().addingTimeInterval(-86400 * 10)
        ),
        CRMSegment(
            id: "segment-5",
            workspaceId: "workspace-1",
            name: "Influencers",
            description: "Social media influencers and content creators",
            icon: "📸",
            isFavorite: true,
            memberCount: 2,
            color: "#EC4899",
            createdAt: Date().addingTimeInterval(-86400 * 45),
            updatedAt: Date().addingTimeInterval(-86400 * 5)
        )
    ]

    let activities: [CRMActivityLog] = [
        CRMActivityLog(
            id: "activity-1",
            workspaceId: "workspace-1",
            personId: "person-1",
            activityType: .messageSent,
            activityDescription: "Sent a message via Twitter DM",
            activityData: ["platform": "Twitter", "message_preview": "Thanks for reaching out! We'd love to discuss..."],
            performedBy: "user-1",
            performedByName: "Sarah Chen",
            relatedConversationId: "conv-1",
            createdAt: Date().addingTimeInterval(-3600)
        ),
        CRMActivityLog(
            id: "activity-2",
            workspaceId: "workspace-1",
            personId: "person-1",
            activityType: .tagAdded,
            activityDescription: "Added tag: Enterprise",
            activityData: ["tag": "Enterprise"],
            performedBy: "user-1",
            performedByName: "Sarah Chen",
            createdAt: Date().addingTimeInterval(-7200)
        ),
        CRMActivityLog(
            id: "activity-3",
            workspaceId: "workspace-1",
            personId: "person-1",
            activityType: .vipStatusChanged,
            activityDescription: "Marked as VIP",
            activityData: ["is_vip": "true"],
            performedBy: "user-1",
            performedByName: "Sarah Chen",
            createdAt: Date().addingTimeInterval(-14400)
        ),
        CRMActivityLog(
            id: "activity-4",
            workspaceId: "workspace-1",
            personId: "person-1",
            activityType: .conversationStarted,
            activityDescription: "Started a conversation on Twitter",
            activityData: ["platform": "Twitter"],
            performedByName: "Sarah Chen",
            relatedConversationId: "conv-1",
            createdAt: Date().addingTimeInterval(-86400)
        ),
        CRMActivityLog(
            id: "activity-5",
            workspaceId: "workspace-1",
            personId: "person-1",
            activityType: .personCreated,
            activityDescription: "Contact created",
            performedBy: "user-1",
            performedByName: "Sarah Chen",
            createdAt: Date().addingTimeInterval(-86400 * 30)
        )
    ]

    let notes: [CRMConversationNote] = [
        CRMConversationNote(
            id: "note-1",
            workspaceId: "workspace-1",
            conversationId: "conv-1",
            personId: "person-1",
            content: "Had a great call with Sarah. She's interested in our Enterprise plan for her company. Follow up next week with a custom proposal.",
            noteType: .followUp,
            authorId: "user-1",
            authorName: "Mike Johnson",
            authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
            isPinned: true,
            createdAt: Date().addingTimeInterval(-7200),
            updatedAt: Date().addingTimeInterval(-7200)
        ),
        CRMConversationNote(
            id: "note-2",
            workspaceId: "workspace-1",
            conversationId: "conv-1",
            personId: "person-1",
            content: "User mentioned they're currently using CompetitorA but are looking for better analytics features.",
            noteType: .internal,
            authorId: "user-2",
            authorName: "Sarah Chen",
            authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            createdAt: Date().addingTimeInterval(-86400),
            updatedAt: Date().addingTimeInterval(-86400)
        ),
        CRMConversationNote(
            id: "note-3",
            workspaceId: "workspace-1",
            conversationId: "conv-2",
            personId: "person-2",
            content: "Resolved login issue. User confirmed everything is working now.",
            noteType: .resolution,
            authorId: "user-1",
            authorName: "Support Team",
            createdAt: Date().addingTimeInterval(-14400),
            updatedAt: Date().addingTimeInterval(-14400)
        )
    ]
}
