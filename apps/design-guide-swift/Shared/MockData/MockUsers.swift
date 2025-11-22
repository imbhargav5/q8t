import Foundation

class MockUsers {
    static let users: [User] = [
        User(
            id: "user-1",
            email: "sarah.chen@example.com",
            name: "Sarah Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        ),
        User(
            id: "user-2",
            email: "michael.rodriguez@example.com",
            name: "Michael Rodriguez",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
        ),
        User(
            id: "user-3",
            email: "emma.thompson@example.com",
            name: "Emma Thompson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
        ),
        User(
            id: "user-4",
            email: "james.wilson@example.com",
            name: "James Wilson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
        ),
        User(
            id: "user-5",
            email: "olivia.martinez@example.com",
            name: "Olivia Martinez",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia"
        )
    ]

    static let currentUser = users[0]

    static let teamMembers: [UserWithMemberInfo] = [
        UserWithMemberInfo(
            id: "user-1",
            email: "sarah.chen@example.com",
            name: "Sarah Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            role: .owner,
            status: .online,
            conversationLoad: 8
        ),
        UserWithMemberInfo(
            id: "user-2",
            email: "michael.rodriguez@example.com",
            name: "Michael Rodriguez",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
            role: .admin,
            status: .online,
            conversationLoad: 6
        ),
        UserWithMemberInfo(
            id: "user-3",
            email: "emma.thompson@example.com",
            name: "Emma Thompson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
            role: .member,
            status: .away,
            conversationLoad: 4
        ),
        UserWithMemberInfo(
            id: "user-4",
            email: "james.wilson@example.com",
            name: "James Wilson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
            role: .member,
            status: .busy,
            conversationLoad: 7
        ),
        UserWithMemberInfo(
            id: "user-5",
            email: "olivia.martinez@example.com",
            name: "Olivia Martinez",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
            role: .guest,
            status: .offline,
            conversationLoad: 2
        )
    ]

    static func getUserById(_ id: String) -> User? {
        users.first { $0.id == id }
    }
}
