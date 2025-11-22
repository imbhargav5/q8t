import SwiftUI

struct ConversationListView: View {
    @Binding var selectedConversationId: String?
    @State private var searchText = ""
    @State private var filterStatus: ConversationStatus?

    private var conversations: [ConversationWithRelations] {
        MockConversations.getConversationsWithRelations()
            .filter { conversation in
                let matchesSearch = searchText.isEmpty || conversation.person.name.localizedCaseInsensitiveContains(searchText)
                let matchesFilter = filterStatus == nil || conversation.conversation.status == filterStatus
                return matchesSearch && matchesFilter
            }
            .sorted { $0.conversation.lastMessageAt > $1.conversation.lastMessageAt }
    }

    var body: some View {
        VStack(spacing: 0) {
            // Header
            VStack(spacing: 12) {
                Text("Inbox")
                    .font(.title2)
                    .fontWeight(.bold)
                    .frame(maxWidth: .infinity, alignment: .leading)

                // Search
                HStack {
                    Image(systemName: "magnifyingglass")
                        .foregroundColor(.secondary)
                    TextField("Search conversations...", text: $searchText)
                        .textFieldStyle(.plain)
                }
                .padding(8)
                .background(Color(.systemGray6))
                .cornerRadius(8)

                // Filter
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        FilterChip(
                            title: "All",
                            isSelected: filterStatus == nil,
                            action: { filterStatus = nil }
                        )

                        ForEach(ConversationStatus.allCases) { status in
                            FilterChip(
                                title: status.displayName,
                                isSelected: filterStatus == status,
                                action: { filterStatus = status }
                            )
                        }
                    }
                }
            }
            .padding()

            Divider()

            // Conversations List
            ScrollView {
                LazyVStack(spacing: 4) {
                    ForEach(conversations) { conversation in
                        Button(action: {
                            selectedConversationId = conversation.id
                        }) {
                            ConversationListItem(
                                conversation: conversation,
                                isSelected: selectedConversationId == conversation.id
                            )
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal)
            }
        }
    }
}

struct FilterChip: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.caption)
                .fontWeight(.medium)
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(isSelected ? Color.blue : Color(.systemGray6))
                .foregroundColor(isSelected ? .white : .primary)
                .cornerRadius(16)
        }
        .buttonStyle(.plain)
    }
}
