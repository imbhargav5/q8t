import Foundation

// MARK: - CRM Activity Log
struct CRMActivityLog: Codable, Identifiable {
    let id: String
    let workspaceId: String
    let personId: String?

    // Activity Details
    let activityType: CRMActivityType
    let activityDescription: String?
    let activityData: [String: String]

    // Actor Tracking
    let performedBy: String?
    let performedByName: String?

    // Related Entities
    let relatedConversationId: String?
    let relatedNoteId: String?
    let relatedMessageId: String?

    let isVisibleInTimeline: Bool
    let createdAt: Date

    init(
        id: String,
        workspaceId: String,
        personId: String? = nil,
        activityType: CRMActivityType,
        activityDescription: String? = nil,
        activityData: [String: String] = [:],
        performedBy: String? = nil,
        performedByName: String? = nil,
        relatedConversationId: String? = nil,
        relatedNoteId: String? = nil,
        relatedMessageId: String? = nil,
        isVisibleInTimeline: Bool = true,
        createdAt: Date
    ) {
        self.id = id
        self.workspaceId = workspaceId
        self.personId = personId
        self.activityType = activityType
        self.activityDescription = activityDescription
        self.activityData = activityData
        self.performedBy = performedBy
        self.performedByName = performedByName
        self.relatedConversationId = relatedConversationId
        self.relatedNoteId = relatedNoteId
        self.relatedMessageId = relatedMessageId
        self.isVisibleInTimeline = isVisibleInTimeline
        self.createdAt = createdAt
    }
}

// MARK: - CRM Segment
struct CRMSegment: Codable, Identifiable {
    let id: String
    let workspaceId: String

    // Metadata
    let name: String
    let description: String?
    let icon: String?

    // Type
    let isSystem: Bool
    let isFavorite: Bool

    // Member Count
    let memberCount: Int

    // Display
    let color: String?

    let createdAt: Date
    let updatedAt: Date

    init(
        id: String,
        workspaceId: String,
        name: String,
        description: String? = nil,
        icon: String? = nil,
        isSystem: Bool = false,
        isFavorite: Bool = false,
        memberCount: Int = 0,
        color: String? = nil,
        createdAt: Date,
        updatedAt: Date
    ) {
        self.id = id
        self.workspaceId = workspaceId
        self.name = name
        self.description = description
        self.icon = icon
        self.isSystem = isSystem
        self.isFavorite = isFavorite
        self.memberCount = memberCount
        self.color = color
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
}

// MARK: - Conversation Note
struct ConversationNote: Codable, Identifiable {
    let id: String
    let workspaceId: String
    let conversationId: String?
    let personId: String?

    // Content
    let content: String
    let noteType: NoteType
    let visibility: String // "private" or "team"

    // Author
    let authorId: String
    let authorName: String?
    let authorAvatar: String?

    // Organization
    let isPinned: Bool

    let createdAt: Date
    let updatedAt: Date

    init(
        id: String,
        workspaceId: String,
        conversationId: String? = nil,
        personId: String? = nil,
        content: String,
        noteType: NoteType,
        visibility: String = "team",
        authorId: String,
        authorName: String? = nil,
        authorAvatar: String? = nil,
        isPinned: Bool = false,
        createdAt: Date,
        updatedAt: Date
    ) {
        self.id = id
        self.workspaceId = workspaceId
        self.conversationId = conversationId
        self.personId = personId
        self.content = content
        self.noteType = noteType
        self.visibility = visibility
        self.authorId = authorId
        self.authorName = authorName
        self.authorAvatar = authorAvatar
        self.isPinned = isPinned
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
}
