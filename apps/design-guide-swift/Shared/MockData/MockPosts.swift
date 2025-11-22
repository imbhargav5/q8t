import Foundation

class MockPosts {
    static let shared = MockPosts()

    let posts: [Post] = [
        // Published posts
        Post(
            id: "post-1",
            workspaceId: "workspace-1",
            authorId: "user-1",
            content: "🚀 Excited to announce our new AI-powered content scheduling feature! Now you can optimize your posting times automatically. #SocialMedia #AI",
            type: .text,
            platforms: [.twitter, .linkedin, .facebook],
            publishedAt: Date().addingTimeInterval(-86400 * 2),
            status: .published,
            hashtags: ["SocialMedia", "AI"],
            engagement: PostEngagementMetrics(
                likes: 234,
                comments: 18,
                shares: 42,
                impressions: 5420,
                reach: 3890,
                engagementRate: 0.068
            ),
            authorName: "Sarah Chen",
            authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            createdAt: Date().addingTimeInterval(-86400 * 3),
            updatedAt: Date().addingTimeInterval(-86400 * 2)
        ),
        Post(
            id: "post-2",
            workspaceId: "workspace-1",
            authorId: "user-2",
            content: "Check out our latest blog post on social media trends for 2024! Link in bio. 📊",
            type: .image,
            media: [
                PostMedia(id: "media-1", type: .image, url: "https://picsum.photos/800/600?random=1")
            ],
            platforms: [.instagram, .twitter],
            publishedAt: Date().addingTimeInterval(-86400),
            status: .published,
            engagement: PostEngagementMetrics(
                likes: 456,
                comments: 32,
                shares: 78,
                impressions: 8920,
                reach: 6450,
                engagementRate: 0.063
            ),
            authorName: "Mike Johnson",
            authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
            createdAt: Date().addingTimeInterval(-86400 * 2),
            updatedAt: Date().addingTimeInterval(-86400)
        ),
        // Scheduled posts
        Post(
            id: "post-3",
            workspaceId: "workspace-1",
            authorId: "user-1",
            content: "Join us for our webinar on effective social media strategies! Register now 👉 link.example.com/webinar",
            type: .link,
            linkPreview: LinkPreview(
                url: "https://example.com/webinar",
                title: "Social Media Strategies Webinar",
                description: "Learn from industry experts about the latest social media marketing techniques.",
                imageUrl: "https://picsum.photos/800/400?random=2"
            ),
            platforms: [.linkedin, .twitter],
            scheduledFor: Date().addingTimeInterval(86400 * 2),
            status: .scheduled,
            authorName: "Sarah Chen",
            authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            createdAt: Date().addingTimeInterval(-3600),
            updatedAt: Date().addingTimeInterval(-3600)
        ),
        Post(
            id: "post-4",
            workspaceId: "workspace-1",
            authorId: "user-1",
            content: "Monday motivation! 💪 Start your week strong with these productivity tips.",
            type: .text,
            platforms: [.twitter, .threads, .facebook],
            scheduledFor: Date().addingTimeInterval(86400 * 3),
            status: .scheduled,
            hashtags: ["MondayMotivation", "Productivity"],
            authorName: "Sarah Chen",
            authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            createdAt: Date().addingTimeInterval(-7200),
            updatedAt: Date().addingTimeInterval(-7200)
        ),
        // Draft posts
        Post(
            id: "post-5",
            workspaceId: "workspace-1",
            authorId: "user-2",
            content: "Behind the scenes of our product launch! Stay tuned... 🎬",
            type: .video,
            media: [
                PostMedia(id: "media-2", type: .video, url: "https://example.com/video.mp4", durationSeconds: 45)
            ],
            platforms: [.instagram, .tiktok, .youtube],
            status: .draft,
            authorName: "Mike Johnson",
            authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
            createdAt: Date().addingTimeInterval(-14400),
            updatedAt: Date().addingTimeInterval(-14400)
        ),
        Post(
            id: "post-6",
            workspaceId: "workspace-1",
            authorId: "user-1",
            content: "Customer success story: How @CompanyXYZ increased engagement by 300%",
            type: .text,
            platforms: [.linkedin],
            status: .draft,
            mentions: ["CompanyXYZ"],
            authorName: "Sarah Chen",
            authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            createdAt: Date().addingTimeInterval(-28800),
            updatedAt: Date().addingTimeInterval(-28800)
        ),
        // Failed post
        Post(
            id: "post-7",
            workspaceId: "workspace-1",
            authorId: "user-2",
            content: "Important update about our service changes.",
            type: .text,
            platforms: [.twitter],
            scheduledFor: Date().addingTimeInterval(-3600),
            status: .failed,
            authorName: "Mike Johnson",
            authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
            createdAt: Date().addingTimeInterval(-7200),
            updatedAt: Date().addingTimeInterval(-3600)
        ),
        // High engagement post
        Post(
            id: "post-8",
            workspaceId: "workspace-1",
            authorId: "user-1",
            content: "BREAKING: We've just reached 100K followers! 🎉 Thank you all for your amazing support! Here's to the next milestone 🚀",
            type: .image,
            media: [
                PostMedia(id: "media-3", type: .image, url: "https://picsum.photos/800/600?random=3")
            ],
            platforms: [.twitter, .instagram, .linkedin],
            publishedAt: Date().addingTimeInterval(-86400 * 5),
            status: .published,
            hashtags: ["Milestone", "ThankYou"],
            engagement: PostEngagementMetrics(
                likes: 1842,
                comments: 156,
                shares: 328,
                impressions: 45600,
                reach: 32400,
                engagementRate: 0.075
            ),
            authorName: "Sarah Chen",
            authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            createdAt: Date().addingTimeInterval(-86400 * 6),
            updatedAt: Date().addingTimeInterval(-86400 * 5)
        )
    ]
}
