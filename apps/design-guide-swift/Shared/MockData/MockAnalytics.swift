import Foundation

class MockAnalytics {
    // MARK: - Overview Metrics

    static let overviewMetrics: [AnalyticsMetric] = [
        AnalyticsMetric(
            type: .engagement,
            name: "Total Engagement",
            value: 24567,
            formattedValue: "24.6K",
            trend: MetricTrend(direction: .up, percentage: 12.5, comparisonPeriod: "vs last period"),
            period: .last30Days
        ),
        AnalyticsMetric(
            type: .reach,
            name: "Reach",
            value: 156789,
            formattedValue: "156.8K",
            trend: MetricTrend(direction: .up, percentage: 8.3, comparisonPeriod: "vs last period"),
            period: .last30Days
        ),
        AnalyticsMetric(
            type: .followers,
            name: "Follower Growth",
            value: 2345,
            formattedValue: "+2,345",
            trend: MetricTrend(direction: .up, percentage: 15.7, comparisonPeriod: "vs last period"),
            period: .last30Days
        ),
        AnalyticsMetric(
            type: .engagementRate,
            name: "Engagement Rate",
            value: 4.8,
            formattedValue: "4.8%",
            trend: MetricTrend(direction: .up, percentage: 3.2, comparisonPeriod: "vs last period"),
            period: .last30Days
        ),
        AnalyticsMetric(
            type: .posts,
            name: "Posts Published",
            value: 87,
            formattedValue: "87",
            trend: MetricTrend(direction: .down, percentage: 5.4, comparisonPeriod: "vs last period"),
            period: .last30Days
        ),
        AnalyticsMetric(
            type: .responseTime,
            name: "Avg Response Time",
            value: 125,
            formattedValue: "2h 5m",
            trend: MetricTrend(direction: .down, percentage: 18.2, comparisonPeriod: "vs last period"),
            period: .last30Days
        ),
        AnalyticsMetric(
            type: .satisfaction,
            name: "CSAT Score",
            value: 4.7,
            formattedValue: "4.7/5.0",
            trend: MetricTrend(direction: .up, percentage: 6.8, comparisonPeriod: "vs last period"),
            period: .last30Days
        ),
        AnalyticsMetric(
            type: .performance,
            name: "Performance Score",
            value: 87,
            formattedValue: "87/100",
            trend: MetricTrend(direction: .up, percentage: 4.2, comparisonPeriod: "vs last period"),
            period: .last30Days
        )
    ]

    // MARK: - Platform Performance

    static let platformPerformance: [PlatformPerformance] = [
        PlatformPerformance(
            platform: .twitter,
            followers: 45600,
            engagement: 8900,
            reach: 67800,
            posts: 32,
            engagementRate: 5.2,
            trend: MetricTrend(direction: .up, percentage: 12.3, comparisonPeriod: "vs last period")
        ),
        PlatformPerformance(
            platform: .instagram,
            followers: 78900,
            engagement: 12400,
            reach: 98500,
            posts: 24,
            engagementRate: 6.8,
            trend: MetricTrend(direction: .up, percentage: 18.5, comparisonPeriod: "vs last period")
        ),
        PlatformPerformance(
            platform: .linkedin,
            followers: 23400,
            engagement: 4200,
            reach: 45600,
            posts: 18,
            engagementRate: 4.1,
            trend: MetricTrend(direction: .up, percentage: 7.2, comparisonPeriod: "vs last period")
        ),
        PlatformPerformance(
            platform: .facebook,
            followers: 56700,
            engagement: 6800,
            reach: 78900,
            posts: 28,
            engagementRate: 3.9,
            trend: MetricTrend(direction: .down, percentage: 3.4, comparisonPeriod: "vs last period")
        ),
        PlatformPerformance(
            platform: .tiktok,
            followers: 123400,
            engagement: 28900,
            reach: 234500,
            posts: 15,
            engagementRate: 8.7,
            trend: MetricTrend(direction: .up, percentage: 32.1, comparisonPeriod: "vs last period")
        ),
        PlatformPerformance(
            platform: .youtube,
            followers: 34500,
            engagement: 5600,
            reach: 56700,
            posts: 8,
            engagementRate: 5.4,
            trend: MetricTrend(direction: .up, percentage: 15.8, comparisonPeriod: "vs last period")
        )
    ]

    // MARK: - Top Posts

    static let topPosts: [PostAnalytics] = [
        PostAnalytics(
            platform: .tiktok,
            content: "Behind the scenes at our product launch event! 🎉",
            publishedAt: Date().addingTimeInterval(-86400 * 2),
            engagement: 12400,
            reach: 89500,
            likes: 8900,
            comments: 2100,
            shares: 1400,
            clicks: 3400,
            engagementRate: 13.8
        ),
        PostAnalytics(
            platform: .instagram,
            content: "New feature alert! Check out our latest update 🚀",
            publishedAt: Date().addingTimeInterval(-86400 * 5),
            engagement: 8700,
            reach: 56700,
            likes: 6200,
            comments: 1800,
            shares: 700,
            clicks: 2100,
            engagementRate: 15.3
        ),
        PostAnalytics(
            platform: .twitter,
            content: "We're thrilled to announce our partnership with @TechCorp! 🤝",
            publishedAt: Date().addingTimeInterval(-86400 * 3),
            engagement: 5600,
            reach: 34500,
            likes: 3400,
            comments: 890,
            shares: 1310,
            clicks: 1200,
            engagementRate: 16.2
        ),
        PostAnalytics(
            platform: .linkedin,
            content: "5 ways to improve your social media strategy in 2025",
            publishedAt: Date().addingTimeInterval(-86400 * 7),
            engagement: 3400,
            reach: 23400,
            likes: 2100,
            comments: 560,
            shares: 740,
            clicks: 890,
            engagementRate: 14.5
        ),
        PostAnalytics(
            platform: .youtube,
            content: "Complete Tutorial: Getting Started with Q8T",
            publishedAt: Date().addingTimeInterval(-86400 * 10),
            engagement: 4500,
            reach: 45600,
            likes: 2800,
            comments: 890,
            shares: 810,
            clicks: 12300,
            engagementRate: 9.9
        )
    ]

    // MARK: - Quick Insights

    static let insights: [QuickInsight] = [
        QuickInsight(
            type: .success,
            title: "TikTok Performance",
            description: "Your TikTok engagement is up 32% this month. Keep posting short-form video content!",
            actionText: "View TikTok Analytics"
        ),
        QuickInsight(
            type: .tip,
            title: "Best Time to Post",
            description: "Your audience is most active on Tuesday at 2 PM. Schedule posts for maximum reach.",
            actionText: "Optimize Schedule"
        ),
        QuickInsight(
            type: .warning,
            title: "Facebook Engagement Down",
            description: "Facebook engagement decreased by 3.4%. Consider more interactive content like polls.",
            actionText: "View Recommendations"
        ),
        QuickInsight(
            type: .info,
            title: "Response Time Improved",
            description: "Your average response time is down 18%. Great job keeping customers engaged!",
            actionText: nil
        ),
        QuickInsight(
            type: .success,
            title: "Follower Milestone",
            description: "You gained 2,345 new followers this month across all platforms!",
            actionText: "View Growth Report"
        )
    ]

    // MARK: - Timeline Events

    static let timeline: [TimelineEvent] = [
        TimelineEvent(
            type: .milestone,
            title: "100K Total Followers",
            description: "Reached 100,000 combined followers across all platforms",
            timestamp: Date().addingTimeInterval(-86400 * 2),
            platform: nil
        ),
        TimelineEvent(
            type: .achievement,
            title: "Viral Post",
            description: "Your TikTok post reached 89K people and got 12.4K engagements",
            timestamp: Date().addingTimeInterval(-86400 * 2),
            platform: .tiktok
        ),
        TimelineEvent(
            type: .alert,
            title: "Response Time SLA Met",
            description: "Maintained under 3-hour response time for the entire week",
            timestamp: Date().addingTimeInterval(-86400 * 5),
            platform: nil
        ),
        TimelineEvent(
            type: .achievement,
            title: "Engagement Record",
            description: "Instagram post hit record 15.3% engagement rate",
            timestamp: Date().addingTimeInterval(-86400 * 5),
            platform: .instagram
        ),
        TimelineEvent(
            type: .milestone,
            title: "1,000 Posts Published",
            description: "Published your 1,000th post across all platforms",
            timestamp: Date().addingTimeInterval(-86400 * 10),
            platform: nil
        ),
        TimelineEvent(
            type: .achievement,
            title: "Twitter Partnership",
            description: "Partnership announcement got 5.6K engagements",
            timestamp: Date().addingTimeInterval(-86400 * 3),
            platform: .twitter
        )
    ]

    // MARK: - Overview

    static let overview = AnalyticsOverview(
        metrics: overviewMetrics,
        platformPerformance: platformPerformance,
        topPosts: topPosts,
        insights: insights,
        timeline: timeline,
        period: .last30Days
    )
}
