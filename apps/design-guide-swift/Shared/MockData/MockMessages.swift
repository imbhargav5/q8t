import Foundation

class MockMessages {
    static let messages: [Message] = [
        // Messages for conv-1 (WhatsApp - Alex Kumar)
        Message(
            id: "msg-1",
            conversationId: "conv-1",
            type: .dm,
            contentPreview: "Hi! I need help with the enterprise plan upgrade.",
            isFromContact: true,
            isRead: false,
            mediaCount: 0,
            createdAt: Date().addingTimeInterval(-2 * 60 * 60)
        ),
        Message(
            id: "msg-2",
            conversationId: "conv-1",
            type: .dm,
            contentPreview: "Of course! I can help you with that. What specific features are you looking for?",
            isFromContact: false,
            isRead: true,
            mediaCount: 0,
            createdAt: Date().addingTimeInterval(-1 * 60 * 60 - 45 * 60)
        ),
        Message(
            id: "msg-3",
            conversationId: "conv-1",
            type: .dm,
            contentPreview: "We need advanced analytics and custom integrations.",
            isFromContact: true,
            isRead: false,
            mediaCount: 1,
            createdAt: Date().addingTimeInterval(-1 * 60 * 60 - 30 * 60)
        ),

        // Messages for conv-2 (Twitter - Jessica Lee)
        Message(
            id: "msg-4",
            conversationId: "conv-2",
            type: .mention,
            contentPreview: "@chatsian This looks amazing! Can you DM me pricing details?",
            isFromContact: true,
            isRead: false,
            mediaCount: 0,
            createdAt: Date().addingTimeInterval(-5 * 60 * 60)
        ),
        Message(
            id: "msg-5",
            conversationId: "conv-2",
            type: .dm,
            contentPreview: "Absolutely! I'll send you our pricing information right now.",
            isFromContact: false,
            isRead: true,
            mediaCount: 0,
            createdAt: Date().addingTimeInterval(-4 * 60 * 60 - 55 * 60)
        ),

        // Messages for conv-3 (Instagram - David Park)
        Message(
            id: "msg-6",
            conversationId: "conv-3",
            type: .dm,
            contentPreview: "Love the new features! Would you be interested in a collaboration?",
            isFromContact: true,
            isRead: true,
            mediaCount: 2,
            createdAt: Date().addingTimeInterval(-24 * 60 * 60)
        ),
        Message(
            id: "msg-7",
            conversationId: "conv-3",
            type: .dm,
            contentPreview: "Thank you! We'd love to explore that. Let's schedule a call this week.",
            isFromContact: false,
            isRead: true,
            mediaCount: 0,
            createdAt: Date().addingTimeInterval(-23 * 60 * 60)
        ),

        // Messages for conv-5 (LinkedIn - Robert Smith)
        Message(
            id: "msg-8",
            conversationId: "conv-5",
            type: .dm,
            contentPreview: "Our contract is up for renewal soon. Can we discuss the terms?",
            isFromContact: true,
            isRead: false,
            mediaCount: 1,
            createdAt: Date().addingTimeInterval(-1 * 60 * 60)
        ),
        Message(
            id: "msg-9",
            conversationId: "conv-5",
            type: .dm,
            contentPreview: "Hi Robert! I'll have our account manager reach out to you today.",
            isFromContact: false,
            isRead: true,
            mediaCount: 0,
            createdAt: Date().addingTimeInterval(-45 * 60)
        ),

        // Messages for conv-7 (Threads - Lisa Anderson)
        Message(
            id: "msg-10",
            conversationId: "conv-7",
            type: .dm,
            contentPreview: "I'm having trouble connecting my Instagram account. Can you help?",
            isFromContact: true,
            isRead: false,
            mediaCount: 1,
            createdAt: Date().addingTimeInterval(-12 * 60 * 60)
        ),

        // Messages for conv-8 (Discord - Chris Taylor)
        Message(
            id: "msg-11",
            conversationId: "conv-8",
            type: .groupMessage,
            contentPreview: "Hey team! What's the best way to schedule posts across multiple platforms?",
            isFromContact: true,
            isRead: false,
            mediaCount: 0,
            createdAt: Date().addingTimeInterval(-6 * 60 * 60)
        ),

        // Messages for conv-10 (TikTok - David Park)
        Message(
            id: "msg-12",
            conversationId: "conv-10",
            type: .comment,
            contentPreview: "This is exactly what I've been looking for! 🔥",
            isFromContact: true,
            isRead: false,
            mediaCount: 0,
            createdAt: Date().addingTimeInterval(-30 * 60)
        ),
        Message(
            id: "msg-13",
            conversationId: "conv-10",
            type: .dm,
            contentPreview: "Thanks for the comment! Let me know if you have any questions.",
            isFromContact: false,
            isRead: true,
            mediaCount: 0,
            createdAt: Date().addingTimeInterval(-25 * 60)
        ),
        Message(
            id: "msg-14",
            conversationId: "conv-10",
            type: .dm,
            contentPreview: "Actually, yes! How does the analytics dashboard work?",
            isFromContact: true,
            isRead: false,
            mediaCount: 0,
            createdAt: Date().addingTimeInterval(-20 * 60)
        )
    ]

    static func getMessagesByConversation(_ conversationId: String) -> [Message] {
        messages.filter { $0.conversationId == conversationId }
            .sorted { $0.createdAt < $1.createdAt }
    }
}
