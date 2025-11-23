import Foundation

class MockCrisisManagement {
    // MARK: - Active Incidents

    static let activeIncidents: [CrisisIncident] = [
        CrisisIncident(
            title: "Negative Sentiment Spike on Twitter",
            description: "Detected unusual increase in negative mentions related to recent product update",
            severity: .high,
            status: .investigating,
            detectedAt: Date().addingTimeInterval(-7200),
            acknowledgedAt: Date().addingTimeInterval(-5400),
            affectedPlatforms: [.twitter, .reddit],
            mentionCount: 342,
            sentimentScore: -0.68,
            potentialReach: 156000,
            assignedTo: "Sarah Chen"
        ),
        CrisisIncident(
            title: "Customer Service Complaints Rising",
            description: "Increased volume of customer complaints about delayed response times",
            severity: .medium,
            status: .acknowledged,
            detectedAt: Date().addingTimeInterval(-10800),
            acknowledgedAt: Date().addingTimeInterval(-9000),
            affectedPlatforms: [.twitter, .facebook],
            mentionCount: 89,
            sentimentScore: -0.42,
            potentialReach: 45000,
            assignedTo: "Mike Johnson"
        )
    ]

    // MARK: - Resolved Incidents

    static let resolvedIncidents: [CrisisIncident] = [
        CrisisIncident(
            title: "App Outage Concerns",
            description: "Users reported difficulty accessing the mobile app during peak hours",
            severity: .critical,
            status: .resolved,
            detectedAt: Date().addingTimeInterval(-86400 * 2),
            acknowledgedAt: Date().addingTimeInterval(-86400 * 2 + 600),
            resolvedAt: Date().addingTimeInterval(-86400 * 2 + 7200),
            affectedPlatforms: [.twitter, .facebook, .reddit],
            mentionCount: 1247,
            sentimentScore: -0.82,
            potentialReach: 567000,
            assignedTo: "Sarah Chen"
        ),
        CrisisIncident(
            title: "Pricing Change Backlash",
            description: "Strong negative reaction to announced pricing tier changes",
            severity: .high,
            status: .resolved,
            detectedAt: Date().addingTimeInterval(-86400 * 5),
            acknowledgedAt: Date().addingTimeInterval(-86400 * 5 + 1800),
            resolvedAt: Date().addingTimeInterval(-86400 * 4),
            affectedPlatforms: [.twitter, .linkedin, .reddit],
            mentionCount: 678,
            sentimentScore: -0.71,
            potentialReach: 234000,
            assignedTo: "David Park"
        ),
        CrisisIncident(
            title: "Data Privacy Concerns",
            description: "Questions about data handling practices after competitor breach",
            severity: .medium,
            status: .resolved,
            detectedAt: Date().addingTimeInterval(-86400 * 7),
            acknowledgedAt: Date().addingTimeInterval(-86400 * 7 + 3600),
            resolvedAt: Date().addingTimeInterval(-86400 * 6),
            affectedPlatforms: [.twitter, .linkedin],
            mentionCount: 234,
            sentimentScore: -0.55,
            potentialReach: 89000,
            assignedTo: "Sarah Chen"
        )
    ]

    // MARK: - Detection Rules

    static let detectionRules: [DetectionRule] = [
        DetectionRule(
            name: "Negative Sentiment Alert",
            type: .sentimentSpike,
            isActive: true,
            platforms: [.twitter, .facebook, .reddit],
            sentimentThreshold: -0.6,
            triggeredCount: 23
        ),
        DetectionRule(
            name: "Crisis Keywords",
            type: .keywordMatch,
            isActive: true,
            platforms: [.twitter, .facebook, .instagram, .reddit],
            keywords: ["outage", "broken", "not working", "terrible", "awful", "disappointed"],
            triggeredCount: 67
        ),
        DetectionRule(
            name: "Mention Volume Spike",
            type: .volumeSpike,
            isActive: true,
            platforms: [.twitter, .reddit],
            volumeThreshold: 100,
            triggeredCount: 34
        ),
        DetectionRule(
            name: "Competitor Comparison",
            type: .keywordMatch,
            isActive: true,
            platforms: [.twitter, .linkedin],
            keywords: ["competitor", "better than", "switching to"],
            triggeredCount: 12
        ),
        DetectionRule(
            name: "Support Request Flood",
            type: .volumeSpike,
            isActive: true,
            platforms: [.twitter, .facebook],
            volumeThreshold: 50,
            triggeredCount: 45
        ),
        DetectionRule(
            name: "Refund Requests",
            type: .keywordMatch,
            isActive: false,
            platforms: [.twitter, .facebook],
            keywords: ["refund", "money back", "cancel subscription"],
            triggeredCount: 8
        )
    ]

    // MARK: - Status Components

    static let statusComponents: [StatusComponent] = [
        StatusComponent(
            name: "API",
            status: .operational,
            lastUpdated: Date().addingTimeInterval(-1800),
            description: "All API endpoints responding normally"
        ),
        StatusComponent(
            name: "Web Application",
            status: .operational,
            lastUpdated: Date().addingTimeInterval(-3600),
            description: "Web app fully functional"
        ),
        StatusComponent(
            name: "Mobile Apps",
            status: .operational,
            lastUpdated: Date().addingTimeInterval(-900),
            description: "iOS and Android apps operating normally"
        ),
        StatusComponent(
            name: "Database",
            status: .operational,
            lastUpdated: Date().addingTimeInterval(-600),
            description: "Database performance within normal parameters"
        ),
        StatusComponent(
            name: "Authentication",
            status: .operational,
            lastUpdated: Date().addingTimeInterval(-1200),
            description: "Login and authentication systems functioning"
        ),
        StatusComponent(
            name: "Social Publishing",
            status: .operational,
            lastUpdated: Date().addingTimeInterval(-2400),
            description: "Posts publishing successfully to all platforms"
        ),
        StatusComponent(
            name: "Analytics Engine",
            status: .operational,
            lastUpdated: Date().addingTimeInterval(-4800),
            description: "Analytics data processing normally"
        ),
        StatusComponent(
            name: "CDN",
            status: .operational,
            lastUpdated: Date().addingTimeInterval(-7200),
            description: "Content delivery network performing well"
        )
    ]

    // MARK: - Social Signals (Sample)

    static let socialSignals: [SocialSignal] = [
        SocialSignal(
            platform: .twitter,
            authorName: "John Doe",
            authorUsername: "@johndoe",
            content: "Really disappointed with the recent update. App keeps crashing and I'm losing work. @TechCorp please fix this!",
            timestamp: Date().addingTimeInterval(-3600),
            sentimentScore: -0.85,
            engagement: 234,
            reach: 12000,
            url: "https://twitter.com/johndoe/status/123"
        ),
        SocialSignal(
            platform: .reddit,
            authorName: "user123",
            authorUsername: "u/user123",
            content: "Anyone else having issues with TechCorp's app today? It's been down for hours and customer support isn't responding.",
            timestamp: Date().addingTimeInterval(-5400),
            sentimentScore: -0.72,
            engagement: 156,
            reach: 8900,
            url: "https://reddit.com/r/techcorp/comments/abc123"
        ),
        SocialSignal(
            platform: .twitter,
            authorName: "Jane Smith",
            authorUsername: "@janesmith",
            content: "This is unacceptable @TechCorp. Been a paying customer for 2 years and the app doesn't even work anymore. Considering switching.",
            timestamp: Date().addingTimeInterval(-7200),
            sentimentScore: -0.91,
            engagement: 567,
            reach: 45000,
            url: "https://twitter.com/janesmith/status/456"
        )
    ]

    // MARK: - Overview

    static let overview = CrisisOverview(
        activeIncidents: activeIncidents,
        resolvedIncidents: resolvedIncidents,
        detectionRules: detectionRules,
        statusComponents: statusComponents
    )
}
