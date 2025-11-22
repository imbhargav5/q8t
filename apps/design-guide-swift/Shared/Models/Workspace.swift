import Foundation

// MARK: - Workspace
struct Workspace: Codable, Identifiable {
    let id: String
    let name: String
    let slug: String
    let logo: String?
    let primaryColor: String
    let secondaryColor: String
    let timezone: String
    let language: String
    let dateFormat: String
    let timeFormat: String
    let createdAt: Date

    init(
        id: String,
        name: String,
        slug: String,
        logo: String? = nil,
        primaryColor: String,
        secondaryColor: String,
        timezone: String,
        language: String,
        dateFormat: String,
        timeFormat: String,
        createdAt: Date
    ) {
        self.id = id
        self.name = name
        self.slug = slug
        self.logo = logo
        self.primaryColor = primaryColor
        self.secondaryColor = secondaryColor
        self.timezone = timezone
        self.language = language
        self.dateFormat = dateFormat
        self.timeFormat = timeFormat
        self.createdAt = createdAt
    }
}

// MARK: - Workspace Subscription
struct WorkspaceSubscription: Codable, Identifiable {
    let id: String
    let workspaceId: String
    let plan: SubscriptionPlan
    let billingPeriod: BillingPeriod
    let seatsIncluded: Int
    let seatsUsed: Int
    let pricePerMonth: Double
    let currentPeriodStart: Date
    let currentPeriodEnd: Date
    let status: String

    init(
        id: String,
        workspaceId: String,
        plan: SubscriptionPlan,
        billingPeriod: BillingPeriod,
        seatsIncluded: Int,
        seatsUsed: Int,
        pricePerMonth: Double,
        currentPeriodStart: Date,
        currentPeriodEnd: Date,
        status: String = "active"
    ) {
        self.id = id
        self.workspaceId = workspaceId
        self.plan = plan
        self.billingPeriod = billingPeriod
        self.seatsIncluded = seatsIncluded
        self.seatsUsed = seatsUsed
        self.pricePerMonth = pricePerMonth
        self.currentPeriodStart = currentPeriodStart
        self.currentPeriodEnd = currentPeriodEnd
        self.status = status
    }
}

// MARK: - Plan Details
struct PlanDetails: Codable, Identifiable {
    let id: SubscriptionPlan
    let name: String
    let description: String
    let monthlyPrice: Double
    let yearlyPrice: Double
    let features: [String]
    let seatsIncluded: Int
    let maxSocialAccounts: Int?
    let maxMessagesPerMonth: Int?

    init(
        id: SubscriptionPlan,
        name: String,
        description: String,
        monthlyPrice: Double,
        yearlyPrice: Double,
        features: [String],
        seatsIncluded: Int,
        maxSocialAccounts: Int? = nil,
        maxMessagesPerMonth: Int? = nil
    ) {
        self.id = id
        self.name = name
        self.description = description
        self.monthlyPrice = monthlyPrice
        self.yearlyPrice = yearlyPrice
        self.features = features
        self.seatsIncluded = seatsIncluded
        self.maxSocialAccounts = maxSocialAccounts
        self.maxMessagesPerMonth = maxMessagesPerMonth
    }
}

// MARK: - Workspace Invitation
struct WorkspaceInvitation: Codable, Identifiable {
    let id: String
    let workspaceId: String
    let email: String
    let role: WorkspaceRole
    let invitedBy: String
    let invitedAt: Date
    let expiresAt: Date
    let status: String

    init(
        id: String,
        workspaceId: String,
        email: String,
        role: WorkspaceRole,
        invitedBy: String,
        invitedAt: Date,
        expiresAt: Date,
        status: String = "pending"
    ) {
        self.id = id
        self.workspaceId = workspaceId
        self.email = email
        self.role = role
        self.invitedBy = invitedBy
        self.invitedAt = invitedAt
        self.expiresAt = expiresAt
        self.status = status
    }
}
