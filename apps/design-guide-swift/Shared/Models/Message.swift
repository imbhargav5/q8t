import Foundation

// MARK: - Message
struct Message: Codable, Identifiable {
    let id: String
    let conversationId: String
    let type: MessageType
    let contentPreview: String
    let isFromContact: Bool
    let isRead: Bool
    let mediaCount: Int
    let createdAt: Date

    init(
        id: String,
        conversationId: String,
        type: MessageType,
        contentPreview: String,
        isFromContact: Bool,
        isRead: Bool,
        mediaCount: Int,
        createdAt: Date
    ) {
        self.id = id
        self.conversationId = conversationId
        self.type = type
        self.contentPreview = contentPreview
        self.isFromContact = isFromContact
        self.isRead = isRead
        self.mediaCount = mediaCount
        self.createdAt = createdAt
    }
}

// MARK: - Message Engagement
struct MessageEngagement: Codable {
    let likes: Int
    let retweets: Int
    let replies: Int
    let shares: Int

    init(likes: Int = 0, retweets: Int = 0, replies: Int = 0, shares: Int = 0) {
        self.likes = likes
        self.retweets = retweets
        self.replies = replies
        self.shares = shares
    }
}

// MARK: - Message With Engagement
struct MessageWithEngagement: Codable, Identifiable {
    let id: String
    let conversationId: String
    let type: MessageType
    let contentPreview: String
    let isFromContact: Bool
    let isRead: Bool
    let mediaCount: Int
    let createdAt: Date
    let engagement: MessageEngagement?

    init(
        id: String,
        conversationId: String,
        type: MessageType,
        contentPreview: String,
        isFromContact: Bool,
        isRead: Bool,
        mediaCount: Int,
        createdAt: Date,
        engagement: MessageEngagement? = nil
    ) {
        self.id = id
        self.conversationId = conversationId
        self.type = type
        self.contentPreview = contentPreview
        self.isFromContact = isFromContact
        self.isRead = isRead
        self.mediaCount = mediaCount
        self.createdAt = createdAt
        self.engagement = engagement
    }
}

// MARK: - Media Attachment
struct MediaAttachment: Codable, Identifiable {
    let id: String
    let messageId: String
    let type: MediaType
    let url: String
    let thumbnailUrl: String?
    let filename: String?
    let fileSize: Int?
    let mimeType: String?
    let width: Int?
    let height: Int?
    let duration: Int?
    let processingStatus: String
    let uploadedAt: Date

    init(
        id: String,
        messageId: String,
        type: MediaType,
        url: String,
        thumbnailUrl: String? = nil,
        filename: String? = nil,
        fileSize: Int? = nil,
        mimeType: String? = nil,
        width: Int? = nil,
        height: Int? = nil,
        duration: Int? = nil,
        processingStatus: String = "completed",
        uploadedAt: Date
    ) {
        self.id = id
        self.messageId = messageId
        self.type = type
        self.url = url
        self.thumbnailUrl = thumbnailUrl
        self.filename = filename
        self.fileSize = fileSize
        self.mimeType = mimeType
        self.width = width
        self.height = height
        self.duration = duration
        self.processingStatus = processingStatus
        self.uploadedAt = uploadedAt
    }
}
