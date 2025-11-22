import Foundation

class MockPeople {
    static let people: [Person] = [
        Person(
            id: "person-1",
            email: "alex.kumar@techcorp.com",
            name: "Alex Kumar",
            company: "TechCorp Inc.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            tags: ["customer", "enterprise"],
            isVIP: true,
            customFields: ["Account Value": "$50,000", "Region": "North America"],
            createdAt: Date().addingTimeInterval(-90 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-2 * 60 * 60)
        ),
        Person(
            id: "person-2",
            email: "jessica.lee@startup.io",
            name: "Jessica Lee",
            company: "Startup.io",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
            tags: ["prospect", "startup"],
            isVIP: false,
            customFields: ["Industry": "SaaS", "Team Size": "25"],
            createdAt: Date().addingTimeInterval(-30 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-5 * 60 * 60)
        ),
        Person(
            id: "person-3",
            email: "david.park@example.com",
            name: "David Park",
            company: nil,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
            tags: ["influencer", "tech"],
            isVIP: true,
            customFields: ["Followers": "150K", "Platform": "Twitter"],
            createdAt: Date().addingTimeInterval(-60 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-24 * 60 * 60)
        ),
        Person(
            id: "person-4",
            email: "maria.garcia@agency.com",
            name: "Maria Garcia",
            company: "Creative Agency",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
            tags: ["partner", "agency"],
            isVIP: false,
            customFields: ["Partnership Type": "Referral", "Commission": "15%"],
            createdAt: Date().addingTimeInterval(-120 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-3 * 24 * 60 * 60)
        ),
        Person(
            id: "person-5",
            email: "robert.smith@enterprise.com",
            name: "Robert Smith",
            company: "Enterprise Solutions",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
            tags: ["customer", "vip"],
            isVIP: true,
            customFields: ["Contract End": "2025-12-31", "Support Level": "Premium"],
            createdAt: Date().addingTimeInterval(-180 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-1 * 60 * 60)
        ),
        Person(
            id: "person-6",
            email: "spammer@example.com",
            name: "Spam Account",
            company: nil,
            avatar: nil,
            tags: ["spam"],
            isVIP: false,
            customFields: [:],
            createdAt: Date().addingTimeInterval(-7 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-7 * 24 * 60 * 60)
        ),
        Person(
            id: "person-7",
            email: "lisa.anderson@smallbiz.com",
            name: "Lisa Anderson",
            company: "Small Business Co.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
            tags: ["customer", "smb"],
            isVIP: false,
            customFields: ["Plan": "Starter", "Renewal Date": "2025-06-15"],
            createdAt: Date().addingTimeInterval(-45 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-12 * 60 * 60)
        ),
        Person(
            id: "person-8",
            email: "chris.taylor@freelance.com",
            name: "Chris Taylor",
            company: nil,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
            tags: ["prospect", "freelancer"],
            isVIP: false,
            customFields: ["Specialty": "Design", "Rate": "$75/hr"],
            createdAt: Date().addingTimeInterval(-15 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-6 * 60 * 60)
        )
    ]

    static func getPersonById(_ id: String) -> Person? {
        people.first { $0.id == id }
    }
}
