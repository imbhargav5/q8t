import Foundation

class MockFeeds {
    static let shared = MockFeeds()

    let feeds: [Feed] = [
        Feed(
            id: "feed-1",
            workspaceId: "workspace-1",
            name: "Monitoring",
            description: "Track all social activity in real-time",
            icon: "📊",
            isDefault: true,
            streams: [
                StreamConfig(
                    id: "stream-1",
                    streamType: .home,
                    order: 0,
                    createdAt: Date().addingTimeInterval(-86400 * 30),
                    updatedAt: Date().addingTimeInterval(-86400 * 30)
                ),
                StreamConfig(
                    id: "stream-2",
                    streamType: .mentions,
                    order: 1,
                    createdAt: Date().addingTimeInterval(-86400 * 30),
                    updatedAt: Date().addingTimeInterval(-86400 * 30)
                ),
                StreamConfig(
                    id: "stream-3",
                    streamType: .failed,
                    order: 2,
                    createdAt: Date().addingTimeInterval(-86400 * 30),
                    updatedAt: Date().addingTimeInterval(-86400 * 30)
                ),
                StreamConfig(
                    id: "stream-4",
                    streamType: .highEngagement,
                    order: 3,
                    createdAt: Date().addingTimeInterval(-86400 * 30),
                    updatedAt: Date().addingTimeInterval(-86400 * 30)
                )
            ],
            lastViewedAt: Date().addingTimeInterval(-3600),
            createdAt: Date().addingTimeInterval(-86400 * 30),
            updatedAt: Date().addingTimeInterval(-86400 * 15)
        ),
        Feed(
            id: "feed-2",
            workspaceId: "workspace-1",
            name: "Content Planning",
            description: "Manage drafts and scheduled content",
            icon: "📝",
            isDefault: false,
            streams: [
                StreamConfig(
                    id: "stream-5",
                    streamType: .drafts,
                    order: 0,
                    createdAt: Date().addingTimeInterval(-86400 * 20),
                    updatedAt: Date().addingTimeInterval(-86400 * 20)
                ),
                StreamConfig(
                    id: "stream-6",
                    streamType: .scheduled,
                    order: 1,
                    createdAt: Date().addingTimeInterval(-86400 * 20),
                    updatedAt: Date().addingTimeInterval(-86400 * 20)
                ),
                StreamConfig(
                    id: "stream-7",
                    streamType: .published,
                    timeRange: "7d",
                    order: 2,
                    createdAt: Date().addingTimeInterval(-86400 * 20),
                    updatedAt: Date().addingTimeInterval(-86400 * 20)
                )
            ],
            lastViewedAt: Date().addingTimeInterval(-86400 * 2),
            createdAt: Date().addingTimeInterval(-86400 * 20),
            updatedAt: Date().addingTimeInterval(-86400 * 10)
        ),
        Feed(
            id: "feed-3",
            workspaceId: "workspace-1",
            name: "Platform Analytics",
            description: "Monitor platform-specific performance",
            icon: "📈",
            isDefault: false,
            streams: [
                StreamConfig(
                    id: "stream-8",
                    streamType: .platformSpecific,
                    label: "Twitter",
                    platformFilters: [.twitter],
                    order: 0,
                    createdAt: Date().addingTimeInterval(-86400 * 10),
                    updatedAt: Date().addingTimeInterval(-86400 * 10)
                ),
                StreamConfig(
                    id: "stream-9",
                    streamType: .platformSpecific,
                    label: "Instagram",
                    platformFilters: [.instagram],
                    order: 1,
                    createdAt: Date().addingTimeInterval(-86400 * 10),
                    updatedAt: Date().addingTimeInterval(-86400 * 10)
                ),
                StreamConfig(
                    id: "stream-10",
                    streamType: .platformSpecific,
                    label: "LinkedIn",
                    platformFilters: [.linkedin],
                    order: 2,
                    createdAt: Date().addingTimeInterval(-86400 * 10),
                    updatedAt: Date().addingTimeInterval(-86400 * 10)
                )
            ],
            lastViewedAt: Date().addingTimeInterval(-86400 * 5),
            createdAt: Date().addingTimeInterval(-86400 * 10),
            updatedAt: Date().addingTimeInterval(-86400 * 5)
        )
    ]
}
