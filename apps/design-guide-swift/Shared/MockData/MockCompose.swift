import Foundation

class MockCompose {
    // MARK: - Social Accounts

    static let socialAccounts: [SocialAccount] = [
        SocialAccount(
            platform: .twitter,
            username: "@techcorp",
            displayName: "TechCorp",
            profileImageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=TechCorp",
            followerCount: 45600
        ),
        SocialAccount(
            platform: .instagram,
            username: "@techcorp",
            displayName: "TechCorp",
            profileImageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=TechCorp",
            followerCount: 78900
        ),
        SocialAccount(
            platform: .facebook,
            username: "TechCorp",
            displayName: "TechCorp",
            profileImageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=TechCorp",
            followerCount: 56700
        ),
        SocialAccount(
            platform: .linkedin,
            username: "techcorp",
            displayName: "TechCorp",
            profileImageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=TechCorp",
            followerCount: 23400
        ),
        SocialAccount(
            platform: .tiktok,
            username: "@techcorp",
            displayName: "TechCorp",
            profileImageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=TechCorp",
            followerCount: 123400
        ),
        SocialAccount(
            platform: .youtube,
            username: "@techcorp",
            displayName: "TechCorp",
            profileImageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=TechCorp",
            followerCount: 34500
        ),
        SocialAccount(
            platform: .pinterest,
            username: "techcorp",
            displayName: "TechCorp",
            profileImageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=TechCorp",
            followerCount: 12300
        ),
        SocialAccount(
            platform: .threads,
            username: "@techcorp",
            displayName: "TechCorp",
            profileImageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=TechCorp",
            followerCount: 28900
        )
    ]

    // MARK: - Best Posting Times

    static let bestPostingTimes: [BestPostingTime] = [
        BestPostingTime(platform: .twitter, dayOfWeek: "Tuesday", hour: 14, engagementScore: 8.7),
        BestPostingTime(platform: .twitter, dayOfWeek: "Wednesday", hour: 10, engagementScore: 8.2),
        BestPostingTime(platform: .twitter, dayOfWeek: "Thursday", hour: 15, engagementScore: 7.9),

        BestPostingTime(platform: .instagram, dayOfWeek: "Monday", hour: 11, engagementScore: 9.1),
        BestPostingTime(platform: .instagram, dayOfWeek: "Wednesday", hour: 13, engagementScore: 8.8),
        BestPostingTime(platform: .instagram, dayOfWeek: "Friday", hour: 17, engagementScore: 8.5),

        BestPostingTime(platform: .facebook, dayOfWeek: "Wednesday", hour: 13, engagementScore: 7.8),
        BestPostingTime(platform: .facebook, dayOfWeek: "Thursday", hour: 12, engagementScore: 7.5),
        BestPostingTime(platform: .facebook, dayOfWeek: "Friday", hour: 9, engagementScore: 7.2),

        BestPostingTime(platform: .linkedin, dayOfWeek: "Tuesday", hour: 9, engagementScore: 8.9),
        BestPostingTime(platform: .linkedin, dayOfWeek: "Wednesday", hour: 8, engagementScore: 8.6),
        BestPostingTime(platform: .linkedin, dayOfWeek: "Thursday", hour: 10, engagementScore: 8.3),

        BestPostingTime(platform: .tiktok, dayOfWeek: "Friday", hour: 18, engagementScore: 9.4),
        BestPostingTime(platform: .tiktok, dayOfWeek: "Saturday", hour: 12, engagementScore: 9.2),
        BestPostingTime(platform: .tiktok, dayOfWeek: "Sunday", hour: 15, engagementScore: 8.9),

        BestPostingTime(platform: .youtube, dayOfWeek: "Saturday", hour: 10, engagementScore: 8.4),
        BestPostingTime(platform: .youtube, dayOfWeek: "Sunday", hour: 14, engagementScore: 8.1),
        BestPostingTime(platform: .youtube, dayOfWeek: "Monday", hour: 19, engagementScore: 7.7),

        BestPostingTime(platform: .pinterest, dayOfWeek: "Saturday", hour: 20, engagementScore: 8.8),
        BestPostingTime(platform: .pinterest, dayOfWeek: "Friday", hour: 21, engagementScore: 8.5),
        BestPostingTime(platform: .pinterest, dayOfWeek: "Sunday", hour: 9, engagementScore: 8.2),

        BestPostingTime(platform: .threads, dayOfWeek: "Tuesday", hour: 14, engagementScore: 8.3),
        BestPostingTime(platform: .threads, dayOfWeek: "Wednesday", hour: 11, engagementScore: 8.0),
        BestPostingTime(platform: .threads, dayOfWeek: "Thursday", hour: 16, engagementScore: 7.8)
    ]

    // MARK: - Sample Media

    static let sampleMedia: [PostMedia] = [
        PostMedia(
            type: .image,
            url: "https://picsum.photos/1200/800?random=1",
            thumbnailUrl: "https://picsum.photos/300/200?random=1",
            altText: "Product launch event"
        ),
        PostMedia(
            type: .image,
            url: "https://picsum.photos/1200/800?random=2",
            thumbnailUrl: "https://picsum.photos/300/200?random=2",
            altText: "Team celebration"
        ),
        PostMedia(
            type: .video,
            url: "https://example.com/video1.mp4",
            thumbnailUrl: "https://picsum.photos/300/200?random=3",
            altText: "Product demo video",
            duration: 45
        )
    ]

    // MARK: - Sample Draft

    static let sampleDraft = ComposeDraft(
        content: "Excited to share our latest product update! 🚀",
        selectedPlatforms: [.twitter, .instagram, .linkedin],
        media: [],
        platformCustomizations: [:],
        schedulingOptions: SchedulingOptions()
    )

    // MARK: - Helper Functions

    static func getAccount(for platform: SocialPlatform) -> SocialAccount? {
        socialAccounts.first { $0.platform == platform }
    }

    static func getBestTimes(for platform: SocialPlatform) -> [BestPostingTime] {
        bestPostingTimes.filter { $0.platform == platform }
    }

    static func getLimit(for platform: SocialPlatform) -> PlatformLimit? {
        PlatformLimit.limits[platform]
    }
}
