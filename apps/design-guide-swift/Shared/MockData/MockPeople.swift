import Foundation

class MockPeople {
    static let shared = MockPeople()

    let people: [Person] = [
        Person(
            id: "person-1",
            workspaceId: "workspace-1",
            email: "alex.kumar@techcorp.com",
            fullName: "Alex Kumar",
            displayName: "Alex Kumar",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            company: "TechCorp Inc.",
            tags: ["customer", "enterprise"],
            customFields: ["Account Value": "$50,000", "Region": "North America"],
            createdAt: Date().addingTimeInterval(-90 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-2 * 60 * 60)
        ),
        Person(
            id: "person-2",
            workspaceId: "workspace-1",
            email: "jessica.lee@startup.io",
            fullName: "Jessica Lee",
            displayName: "Jessica Lee",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
            company: "Startup.io",
            tags: ["prospect", "startup"],
            customFields: ["Industry": "SaaS", "Team Size": "25"],
            createdAt: Date().addingTimeInterval(-30 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-5 * 60 * 60)
        ),
        Person(
            id: "person-3",
            workspaceId: "workspace-1",
            email: "david.park@example.com",
            fullName: "David Park",
            displayName: "David Park",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
            isVIP: true,
            tags: ["influencer", "tech"],
            customFields: ["Followers": "150K", "Platform": "Twitter"],
            createdAt: Date().addingTimeInterval(-60 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-24 * 60 * 60)
        ),
        Person(
            id: "person-4",
            workspaceId: "workspace-1",
            email: "maria.garcia@agency.com",
            fullName: "Maria Garcia",
            displayName: "Maria Garcia",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
            company: "Creative Agency",
            tags: ["partner", "agency"],
            customFields: ["Partnership Type": "Referral", "Commission": "15%"],
            createdAt: Date().addingTimeInterval(-120 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-3 * 24 * 60 * 60)
        ),
        Person(
            id: "person-5",
            workspaceId: "workspace-1",
            email: "robert.smith@enterprise.com",
            fullName: "Robert Smith",
            displayName: "Robert Smith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
            company: "Enterprise Solutions",
            isVIP: true,
            tags: ["customer", "vip"],
            customFields: ["Contract End": "2025-12-31", "Support Level": "Premium"],
            createdAt: Date().addingTimeInterval(-180 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-1 * 60 * 60)
        ),
        Person(
            id: "person-6",
            workspaceId: "workspace-1",
            email: "spammer@example.com",
            fullName: "Spam Account",
            displayName: "Spam Account",
            tags: ["spam"],
            customFields: [:],
            createdAt: Date().addingTimeInterval(-7 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-7 * 24 * 60 * 60)
        ),
        Person(
            id: "person-7",
            workspaceId: "workspace-1",
            email: "lisa.anderson@smallbiz.com",
            fullName: "Lisa Anderson",
            displayName: "Lisa Anderson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
            company: "Small Business Co.",
            tags: ["customer", "smb"],
            customFields: ["Plan": "Starter", "Renewal Date": "2025-06-15"],
            createdAt: Date().addingTimeInterval(-45 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-12 * 60 * 60)
        ),
        Person(
            id: "person-8",
            workspaceId: "workspace-1",
            email: "chris.taylor@freelance.com",
            fullName: "Chris Taylor",
            displayName: "Chris Taylor",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
            tags: ["prospect", "freelancer"],
            customFields: ["Specialty": "Design", "Rate": "$75/hr"],
            createdAt: Date().addingTimeInterval(-15 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-6 * 60 * 60)
        )
    ]

    func getPersonById(_ id: String) -> Person? {
        people.first { $0.id == id }
    }
}
