import SwiftUI

struct SocialInboxView: View {
    @State private var selectedConversationId: String?

    private var selectedConversation: ConversationWithRelations? {
        guard let id = selectedConversationId else { return nil }
        return MockConversations.getConversationById(id)
    }

    var body: some View {
        HStack(spacing: 0) {
            // Left: Conversation List
            ConversationListView(selectedConversationId: $selectedConversationId)
                .frame(width: 350)
                .background(Color(.systemBackground))

            Divider()

            // Center: Conversation Detail
            if let conversation = selectedConversation {
                ConversationDetailView(conversation: conversation)
                    .frame(maxWidth: .infinity)

                Divider()

                // Right: Conversation Sidebar
                ConversationSidebarView(conversation: conversation)
                    .frame(width: 300)
                    .background(Color(.systemBackground))
            } else {
                EmptyInboxView()
                    .frame(maxWidth: .infinity)
            }
        }
    }
}

struct EmptyInboxView: View {
    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "tray")
                .font(.system(size: 64))
                .foregroundColor(.secondary)

            Text("Select a conversation")
                .font(.title2)
                .fontWeight(.medium)

            Text("Choose a conversation from the list to view messages")
                .font(.body)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding()
    }
}
