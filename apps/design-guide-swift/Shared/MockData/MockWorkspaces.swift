import Foundation

class MockWorkspaces {
    static let workspace = Workspace(
        id: "workspace-1",
        name: "Chatsian HQ",
        slug: "chatsian-hq",
        logo: nil,
        primaryColor: "#0066FF",
        secondaryColor: "#00CC88",
        timezone: "America/New_York",
        language: "en",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12h",
        createdAt: Date().addingTimeInterval(-180 * 24 * 60 * 60)
    )

    static let subscription = WorkspaceSubscription(
        id: "sub-1",
        workspaceId: "workspace-1",
        plan: .professional,
        billingPeriod: .monthly,
        seatsIncluded: 10,
        seatsUsed: 5,
        pricePerMonth: 49.0,
        currentPeriodStart: Date().addingTimeInterval(-15 * 24 * 60 * 60),
        currentPeriodEnd: Date().addingTimeInterval(15 * 24 * 60 * 60),
        status: "active"
    )

    static let plans: [PlanDetails] = [
        PlanDetails(
            id: .free,
            name: "Free",
            description: "Perfect for trying out Chatsian",
            monthlyPrice: 0,
            yearlyPrice: 0,
            features: [
                "1 social account",
                "100 messages per month",
                "Basic analytics",
                "Email support"
            ],
            seatsIncluded: 1,
            maxSocialAccounts: 1,
            maxMessagesPerMonth: 100
        ),
        PlanDetails(
            id: .starter,
            name: "Starter",
            description: "For small teams getting started",
            monthlyPrice: 19,
            yearlyPrice: 190,
            features: [
                "5 social accounts",
                "1,000 messages per month",
                "Advanced analytics",
                "Priority email support",
                "Team collaboration"
            ],
            seatsIncluded: 3,
            maxSocialAccounts: 5,
            maxMessagesPerMonth: 1000
        ),
        PlanDetails(
            id: .professional,
            name: "Professional",
            description: "For growing businesses",
            monthlyPrice: 49,
            yearlyPrice: 490,
            features: [
                "Unlimited social accounts",
                "10,000 messages per month",
                "Custom analytics dashboards",
                "24/7 chat support",
                "Advanced automation",
                "Custom integrations",
                "API access"
            ],
            seatsIncluded: 10,
            maxSocialAccounts: nil,
            maxMessagesPerMonth: 10000
        ),
        PlanDetails(
            id: .enterprise,
            name: "Enterprise",
            description: "For large organizations",
            monthlyPrice: 199,
            yearlyPrice: 1990,
            features: [
                "Unlimited everything",
                "Dedicated account manager",
                "Custom SLA",
                "Advanced security",
                "SAML SSO",
                "Custom training",
                "White-label options",
                "Priority feature requests"
            ],
            seatsIncluded: 50,
            maxSocialAccounts: nil,
            maxMessagesPerMonth: nil
        )
    ]

    static let invitations: [WorkspaceInvitation] = [
        WorkspaceInvitation(
            id: "inv-1",
            workspaceId: "workspace-1",
            email: "john.doe@example.com",
            role: .member,
            invitedBy: "user-1",
            invitedAt: Date().addingTimeInterval(-2 * 24 * 60 * 60),
            expiresAt: Date().addingTimeInterval(5 * 24 * 60 * 60),
            status: "pending"
        ),
        WorkspaceInvitation(
            id: "inv-2",
            workspaceId: "workspace-1",
            email: "jane.smith@example.com",
            role: .admin,
            invitedBy: "user-1",
            invitedAt: Date().addingTimeInterval(-5 * 24 * 60 * 60),
            expiresAt: Date().addingTimeInterval(2 * 24 * 60 * 60),
            status: "pending"
        )
    ]

    static func getPlanById(_ plan: SubscriptionPlan) -> PlanDetails? {
        plans.first { $0.id == plan }
    }

    static func getCurrentPlan() -> PlanDetails? {
        getPlanById(subscription.plan)
    }
}
