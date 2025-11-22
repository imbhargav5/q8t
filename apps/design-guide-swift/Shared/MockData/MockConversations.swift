import Foundation

class MockConversations {
    static let conversations: [Conversation] = [
        Conversation(
            id: "conv-1",
            workspaceId: "workspace-1",
            personId: "person-1",
            platform: .whatsapp,
            status: .open,
            unreadCount: 3,
            lastMessageAt: Date().addingTimeInterval(-2 * 60 * 60),
            assignedToUserId: "user-1",
            createdAt: Date().addingTimeInterval(-7 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-2 * 60 * 60)
        ),
        Conversation(
            id: "conv-2",
            workspaceId: "workspace-1",
            personId: "person-2",
            platform: .twitter,
            status: .pending,
            unreadCount: 1,
            lastMessageAt: Date().addingTimeInterval(-5 * 60 * 60),
            assignedToUserId: "user-2",
            createdAt: Date().addingTimeInterval(-3 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-5 * 60 * 60)
        ),
        Conversation(
            id: "conv-3",
            workspaceId: "workspace-1",
            personId: "person-3",
            platform: .instagram,
            status: .open,
            unreadCount: 0,
            lastMessageAt: Date().addingTimeInterval(-24 * 60 * 60),
            assignedToUserId: "user-1",
            createdAt: Date().addingTimeInterval(-10 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-24 * 60 * 60)
        ),
        Conversation(
            id: "conv-4",
            workspaceId: "workspace-1",
            personId: "person-4",
            platform: .facebook,
            status: .resolved,
            unreadCount: 0,
            lastMessageAt: Date().addingTimeInterval(-3 * 24 * 60 * 60),
            assignedToUserId: "user-3",
            createdAt: Date().addingTimeInterval(-14 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-3 * 24 * 60 * 60)
        ),
        Conversation(
            id: "conv-5",
            workspaceId: "workspace-1",
            personId: "person-5",
            platform: .linkedin,
            status: .open,
            unreadCount: 2,
            lastMessageAt: Date().addingTimeInterval(-1 * 60 * 60),
            assignedToUserId: "user-1",
            createdAt: Date().addingTimeInterval(-30 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-1 * 60 * 60)
        ),
        Conversation(
            id: "conv-6",
            workspaceId: "workspace-1",
            personId: "person-6",
            platform: .twitter,
            status: .archived,
            unreadCount: 0,
            lastMessageAt: Date().addingTimeInterval(-7 * 24 * 60 * 60),
            assignedToUserId: nil,
            createdAt: Date().addingTimeInterval(-7 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-7 * 24 * 60 * 60)
        ),
        Conversation(
            id: "conv-7",
            workspaceId: "workspace-1",
            personId: "person-7",
            platform: .threads,
            status: .pending,
            unreadCount: 5,
            lastMessageAt: Date().addingTimeInterval(-12 * 60 * 60),
            assignedToUserId: "user-4",
            createdAt: Date().addingTimeInterval(-5 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-12 * 60 * 60)
        ),
        Conversation(
            id: "conv-8",
            workspaceId: "workspace-1",
            personId: "person-8",
            platform: .discord,
            status: .open,
            unreadCount: 1,
            lastMessageAt: Date().addingTimeInterval(-6 * 60 * 60),
            assignedToUserId: "user-2",
            createdAt: Date().addingTimeInterval(-2 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-6 * 60 * 60)
        ),
        Conversation(
            id: "conv-9",
            workspaceId: "workspace-1",
            personId: "person-1",
            platform: .slack,
            status: .resolved,
            unreadCount: 0,
            lastMessageAt: Date().addingTimeInterval(-5 * 24 * 60 * 60),
            assignedToUserId: "user-3",
            createdAt: Date().addingTimeInterval(-20 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-5 * 24 * 60 * 60)
        ),
        Conversation(
            id: "conv-10",
            workspaceId: "workspace-1",
            personId: "person-3",
            platform: .tiktok,
            status: .open,
            unreadCount: 4,
            lastMessageAt: Date().addingTimeInterval(-30 * 60),
            assignedToUserId: "user-1",
            createdAt: Date().addingTimeInterval(-1 * 24 * 60 * 60),
            updatedAt: Date().addingTimeInterval(-30 * 60)
        )
    ]

    static func getConversationsWithRelations() -> [ConversationWithRelations] {
        conversations.map { conversation in
            let person = MockPeople.getPersonById(conversation.personId)
            let assignedUser = conversation.assignedToUserId.flatMap { MockUsers.getUserById($0) }
            return ConversationWithRelations(
                conversation: conversation,
                person: person ?? MockPeople.people[0],
                assignedUser: assignedUser
            )
        }
    }

    static func getConversationById(_ id: String) -> ConversationWithRelations? {
        getConversationsWithRelations().first { $0.id == id }
    }
}
