import SwiftUI

struct ConversationListItem: View {
    let conversation: ConversationWithRelations
    let isSelected: Bool

    var body: some View {
        HStack(spacing: 12) {
            // Avatar with platform badge
            ZStack(alignment: .bottomTrailing) {
                UserAvatar(
                    avatarURL: conversation.person.avatar,
                    name: conversation.person.name,
                    size: 48
                )

                PlatformBadge(
                    platform: conversation.conversation.platform,
                    size: 18
                )
                .offset(x: 2, y: 2)
            }

            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(conversation.person.name)
                        .font(.system(size: 14, weight: .semibold))
                        .lineLimit(1)

                    if conversation.person.isVIP {
                        Image(systemName: "star.fill")
                            .font(.system(size: 10))
                            .foregroundColor(.yellow)
                    }

                    Spacer()

                    Text(timeAgo(conversation.conversation.lastMessageAt))
                        .font(.caption)
                        .foregroundColor(.secondary)
                }

                if let lastMessage = MockMessages.getMessagesByConversation(conversation.id).last {
                    Text(lastMessage.contentPreview)
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .lineLimit(2)
                }

                HStack(spacing: 6) {
                    StatusBadge(status: conversation.conversation.status)

                    if conversation.conversation.unreadCount > 0 {
                        HStack(spacing: 4) {
                            Circle()
                                .fill(Color.blue)
                                .frame(width: 6, height: 6)
                            Text("\(conversation.conversation.unreadCount) unread")
                                .font(.caption2)
                                .foregroundColor(.secondary)
                        }
                    }

                    Spacer()

                    if let assignedUser = conversation.assignedUser {
                        UserAvatar(
                            avatarURL: assignedUser.avatar,
                            name: assignedUser.name,
                            size: 20
                        )
                    }
                }
            }
        }
        .padding(12)
        .background(isSelected ? Color.blue.opacity(0.1) : Color.clear)
        .cornerRadius(8)
    }

    private func timeAgo(_ date: Date) -> String {
        let interval = Date().timeIntervalSince(date)
        let minutes = Int(interval / 60)
        let hours = Int(interval / 3600)
        let days = Int(interval / 86400)

        if minutes < 60 {
            return "\(minutes)m"
        } else if hours < 24 {
            return "\(hours)h"
        } else {
            return "\(days)d"
        }
    }
}
