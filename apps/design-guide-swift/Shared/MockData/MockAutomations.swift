import Foundation

class MockAutomations {
    // MARK: - RSS Feeds

    static let rssFeeds: [RSSFeed] = [
        RSSFeed(
            name: "TechCrunch",
            url: "https://techcrunch.com/feed/",
            status: .active,
            platforms: [.twitter, .linkedin],
            lastFetched: Date().addingTimeInterval(-3600),
            postsCreated: 127,
            successRate: 94.5,
            autoPublish: true,
            fetchInterval: 60
        ),
        RSSFeed(
            name: "Product Hunt",
            url: "https://www.producthunt.com/feed",
            status: .active,
            platforms: [.twitter, .facebook],
            lastFetched: Date().addingTimeInterval(-1800),
            postsCreated: 89,
            successRate: 97.8,
            autoPublish: true,
            fetchInterval: 30
        ),
        RSSFeed(
            name: "Industry News",
            url: "https://example.com/industry-news/feed",
            status: .paused,
            platforms: [.linkedin],
            lastFetched: Date().addingTimeInterval(-86400 * 3),
            postsCreated: 45,
            successRate: 88.2,
            autoPublish: false,
            fetchInterval: 120
        ),
        RSSFeed(
            name: "Company Blog",
            url: "https://example.com/blog/feed",
            status: .active,
            platforms: [.twitter, .facebook, .linkedin],
            lastFetched: Date().addingTimeInterval(-7200),
            postsCreated: 234,
            successRate: 99.1,
            autoPublish: true,
            fetchInterval: 120
        )
    ]

    // MARK: - Content Queues

    static let contentQueues: [ContentQueue] = [
        ContentQueue(
            name: "Daily Tips",
            description: "Educational tips and tricks posted throughout the day",
            status: .active,
            platforms: [.twitter, .threads],
            scheduleType: .timeSlots,
            postsInQueue: 24,
            postsPublished: 156,
            nextPostTime: Date().addingTimeInterval(3600),
            timeSlots: ["09:00", "12:00", "15:00", "18:00"]
        ),
        ContentQueue(
            name: "Product Updates",
            description: "Regular product feature announcements",
            status: .active,
            platforms: [.twitter, .linkedin, .facebook],
            scheduleType: .optimal,
            postsInQueue: 12,
            postsPublished: 67,
            nextPostTime: Date().addingTimeInterval(7200)
        ),
        ContentQueue(
            name: "Weekend Content",
            description: "Engaging content for weekend audiences",
            status: .paused,
            platforms: [.instagram, .tiktok],
            scheduleType: .interval,
            postsInQueue: 8,
            postsPublished: 34,
            nextPostTime: nil,
            intervalMinutes: 180
        ),
        ContentQueue(
            name: "Customer Stories",
            description: "User testimonials and success stories",
            status: .active,
            platforms: [.linkedin, .facebook],
            scheduleType: .timeSlots,
            postsInQueue: 16,
            postsPublished: 89,
            nextPostTime: Date().addingTimeInterval(5400),
            timeSlots: ["10:00", "14:00"]
        )
    ]

    // MARK: - Evergreen Posts

    static let evergreenPosts: [EvergreenPost] = [
        EvergreenPost(
            content: "5 ways to boost your productivity with our platform 🚀",
            platforms: [.twitter, .linkedin],
            media: [],
            timesPosted: 12,
            lastPosted: Date().addingTimeInterval(-86400 * 30),
            nextScheduled: Date().addingTimeInterval(86400 * 5),
            recycleIntervalDays: 30,
            performance: EvergreenPerformance(
                averageEngagement: 456,
                averageReach: 3400,
                engagementRate: 5.2
            )
        ),
        EvergreenPost(
            content: "Did you know? Our platform helps teams save 10+ hours per week! ⏰",
            platforms: [.facebook, .linkedin],
            media: [],
            timesPosted: 8,
            lastPosted: Date().addingTimeInterval(-86400 * 45),
            nextScheduled: Date().addingTimeInterval(86400 * 15),
            recycleIntervalDays: 60,
            performance: EvergreenPerformance(
                averageEngagement: 678,
                averageReach: 4500,
                engagementRate: 6.8
            )
        ),
        EvergreenPost(
            content: "Check out our latest case study on how @CustomerName grew their engagement by 300% 📈",
            platforms: [.twitter, .linkedin],
            media: [],
            timesPosted: 6,
            lastPosted: Date().addingTimeInterval(-86400 * 20),
            nextScheduled: Date().addingTimeInterval(86400 * 10),
            recycleIntervalDays: 30,
            performance: EvergreenPerformance(
                averageEngagement: 892,
                averageReach: 5600,
                engagementRate: 7.9
            )
        ),
        EvergreenPost(
            content: "Free webinar: Mastering social media management in 2025 🎓",
            platforms: [.twitter, .facebook, .linkedin],
            media: [],
            timesPosted: 15,
            lastPosted: Date().addingTimeInterval(-86400 * 14),
            nextScheduled: Date().addingTimeInterval(86400 * 1),
            recycleIntervalDays: 15,
            performance: EvergreenPerformance(
                averageEngagement: 1234,
                averageReach: 8900,
                engagementRate: 9.1
            )
        )
    ]

    // MARK: - Automation Stats

    static let stats: [AutomationStats] = [
        AutomationStats(
            category: .content,
            activeCount: 8,
            inactiveCount: 2,
            totalActions: 456,
            successRate: 96.5
        ),
        AutomationStats(
            category: .monitoring,
            activeCount: 12,
            inactiveCount: 1,
            totalActions: 1234,
            successRate: 98.2
        ),
        AutomationStats(
            category: .analytics,
            activeCount: 5,
            inactiveCount: 0,
            totalActions: 89,
            successRate: 100.0
        ),
        AutomationStats(
            category: .workflow,
            activeCount: 3,
            inactiveCount: 1,
            totalActions: 67,
            successRate: 94.0
        )
    ]

    // MARK: - Overview

    static let overview = AutomationOverview(
        stats: stats,
        rssFeeds: rssFeeds,
        contentQueues: contentQueues,
        evergreenPosts: evergreenPosts
    )
}
