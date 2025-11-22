import Foundation

// MARK: - Conversation
struct Conversation: Codable, Identifiable {
    let id: String
    let workspaceId: String
    let personId: String
    let platform: SocialPlatform
    let status: ConversationStatus
    let unreadCount: Int
    let lastMessageAt: Date
    let assignedToUserId: String?
    let createdAt: Date
    let updatedAt: Date

    init(
        id: String,
        workspaceId: String,
        personId: String,
        platform: SocialPlatform,
        status: ConversationStatus,
        unreadCount: Int,
        lastMessageAt: Date,
        assignedToUserId: String? = nil,
        createdAt: Date,
        updatedAt: Date
    ) {
        self.id = id
        self.workspaceId = workspaceId
        self.personId = personId
        self.platform = platform
        self.status = status
        self.unreadCount = unreadCount
        self.lastMessageAt = lastMessageAt
        self.assignedToUserId = assignedToUserId
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
}

// MARK: - Conversation With Relations
struct ConversationWithRelations: Identifiable {
    let conversation: Conversation
    let person: Person
    let assignedUser: User?

    var id: String { conversation.id }

    init(conversation: Conversation, person: Person, assignedUser: User? = nil) {
        self.conversation = conversation
        self.person = person
        self.assignedUser = assignedUser
    }
}

// MARK: - Conversation Note
struct ConversationNote: Codable, Identifiable {
    let id: String
    let conversationId: String
    let userId: String
    let type: NoteType
    let content: String
    let createdAt: Date

    init(
        id: String,
        conversationId: String,
        userId: String,
        type: NoteType,
        content: String,
        createdAt: Date
    ) {
        self.id = id
        self.conversationId = conversationId
        self.userId = userId
        self.type = type
        self.content = content
        self.createdAt = createdAt
    }
}
