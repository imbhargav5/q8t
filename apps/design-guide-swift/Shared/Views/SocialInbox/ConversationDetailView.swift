import SwiftUI

struct ConversationDetailView: View {
    let conversation: ConversationWithRelations
    @State private var messageText = ""

    private var messages: [Message] {
        MockMessages.getMessagesByConversation(conversation.id)
    }

    var body: some View {
        VStack(spacing: 0) {
            // Header
            VStack(spacing: 0) {
                HStack(spacing: 12) {
                    UserAvatar(
                        avatarURL: conversation.person.avatar,
                        name: conversation.person.name,
                        size: 40
                    )

                    VStack(alignment: .leading, spacing: 2) {
                        HStack(spacing: 6) {
                            Text(conversation.person.name)
                                .font(.headline)

                            if conversation.person.isVIP {
                                Image(systemName: "star.fill")
                                    .font(.caption)
                                    .foregroundColor(.yellow)
                            }
                        }

                        HStack(spacing: 6) {
                            PlatformBadge(platform: conversation.conversation.platform, size: 14)
                            Text(conversation.conversation.platform.displayName)
                                .font(.caption)
                                .foregroundColor(.secondary)

                            if let company = conversation.person.company {
                                Text("•")
                                    .foregroundColor(.secondary)
                                Text(company)
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                        }
                    }

                    Spacer()

                    StatusBadge(status: conversation.conversation.status)
                }
                .padding()

                Divider()
            }

            // Messages
            ScrollView {
                LazyVStack(spacing: 12) {
                    ForEach(messages) { message in
                        MessageBubble(message: message)
                    }
                }
                .padding()
            }

            Divider()

            // Message Input
            HStack(spacing: 12) {
                TextField("Type a message...", text: $messageText)
                    .textFieldStyle(.plain)
                    .padding(8)
                    .background(Color(.systemGray6))
                    .cornerRadius(8)

                Button(action: {
                    // Send message
                    messageText = ""
                }) {
                    Image(systemName: "paperplane.fill")
                        .foregroundColor(.white)
                        .padding(8)
                        .background(messageText.isEmpty ? Color.gray : Color.blue)
                        .cornerRadius(8)
                }
                .disabled(messageText.isEmpty)
            }
            .padding()
        }
    }
}

struct MessageBubble: View {
    let message: Message

    var body: some View {
        HStack {
            if !message.isFromContact {
                Spacer()
            }

            VStack(alignment: message.isFromContact ? .leading : .trailing, spacing: 4) {
                Text(message.contentPreview)
                    .font(.body)
                    .padding(12)
                    .background(message.isFromContact ? Color(.systemGray6) : Color.blue)
                    .foregroundColor(message.isFromContact ? .primary : .white)
                    .cornerRadius(16)

                Text(formatDate(message.createdAt))
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }

            if message.isFromContact {
                Spacer()
            }
        }
    }

    private func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "h:mm a"
        return formatter.string(from: date)
    }
}
