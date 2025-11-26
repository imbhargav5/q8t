import SwiftUI

struct PersonEmailView: View {
    let person: Person
    @State private var selectedThread: EmailThread?
    @State private var showCompose = false
    @State private var searchText = ""
    @State private var selectedFilter = EmailFilter.all

    private let threads = MockEmails.emailThreads

    enum EmailFilter: String, CaseIterable {
        case all = "All"
        case unread = "Unread"
        case starred = "Starred"
        case hasAttachments = "With Attachments"

        var icon: String {
            switch self {
            case .all: return "tray"
            case .unread: return "envelope.badge"
            case .starred: return "star.fill"
            case .hasAttachments: return "paperclip"
            }
        }
    }

    var filteredThreads: [EmailThread] {
        threads.filter { thread in
            let matchesSearch = searchText.isEmpty ||
                thread.subject.localizedCaseInsensitiveContains(searchText) ||
                thread.participants.contains { $0.name.localizedCaseInsensitiveContains(searchText) }

            let matchesFilter: Bool
            switch selectedFilter {
            case .all:
                matchesFilter = true
            case .unread:
                matchesFilter = thread.messages.contains { $0.status == .unread }
            case .starred:
                matchesFilter = thread.isStarred
            case .hasAttachments:
                matchesFilter = thread.hasAttachments
            }

            return matchesSearch && matchesFilter
        }
    }

    var body: some View {
        #if os(macOS)
        macOSLayout
        #else
        iOSLayout
        #endif
    }

    // MARK: - macOS Layout

    #if os(macOS)
    private var macOSLayout: some View {
        HSplitView {
            // Left: Thread List
            threadListSection
                .frame(minWidth: 300, maxWidth: 400)

            // Right: Thread Detail
            if let thread = selectedThread {
                EmailThreadDetailView(thread: thread)
                    .frame(minWidth: 500)
            } else {
                emptyDetailView
                    .frame(minWidth: 500)
            }
        }
        .navigationTitle("Email: \(person.name)")
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Button(action: { showCompose = true }) {
                    Label("Compose", systemImage: "square.and.pencil")
                }
            }
        }
        .sheet(isPresented: $showCompose) {
            ComposeEmailView(person: person)
        }
    }
    #endif

    // MARK: - iOS Layout

    #if os(iOS)
    private var iOSLayout: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Filters
                filterBar

                // Thread List
                threadList
            }
            .navigationTitle("Email")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button(action: { showCompose = true }) {
                        Image(systemName: "square.and.pencil")
                    }
                }
            }
            .searchable(text: $searchText, prompt: "Search emails")
            .sheet(isPresented: $showCompose) {
                ComposeEmailView(person: person)
            }
        }
    }
    #endif

    // MARK: - Thread List Section

    private var threadListSection: some View {
        VStack(spacing: 0) {
            // Search and Filter
            VStack(spacing: 12) {
                HStack {
                    Image(systemName: "magnifyingglass")
                        .foregroundColor(.secondary)
                    TextField("Search emails", text: $searchText)
                        .textFieldStyle(.plain)
                }
                .padding(8)
                .background(Color(.systemGray6))
                .cornerRadius(8)

                filterBar
            }
            .padding()

            Divider()

            // Thread List
            threadList
        }
    }

    // MARK: - Filter Bar

    private var filterBar: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(EmailFilter.allCases, id: \.self) { filter in
                    Button(action: { selectedFilter = filter }) {
                        Label(filter.rawValue, systemImage: filter.icon)
                            .font(.caption)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 6)
                            .background(selectedFilter == filter ? Color.blue : Color(.systemGray6))
                            .foregroundColor(selectedFilter == filter ? .white : .primary)
                            .cornerRadius(16)
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.horizontal)
        }
    }

    // MARK: - Thread List

    private var threadList: some View {
        ScrollView {
            LazyVStack(spacing: 1) {
                ForEach(filteredThreads) { thread in
                    Button(action: {
                        selectedThread = thread
                    }) {
                        EmailThreadRow(
                            thread: thread,
                            isSelected: selectedThread?.id == thread.id
                        )
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }

    // MARK: - Empty Detail View

    private var emptyDetailView: some View {
        VStack(spacing: 16) {
            Image(systemName: "envelope.open")
                .font(.system(size: 60))
                .foregroundColor(.secondary)
            Text("Select an email to read")
                .font(.title3)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

// MARK: - Email Thread Row

struct EmailThreadRow: View {
    let thread: EmailThread
    let isSelected: Bool

    var hasUnread: Bool {
        thread.messages.contains { $0.status == .unread }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                // Participants
                Text(participantNames)
                    .font(.subheadline)
                    .fontWeight(hasUnread ? .semibold : .regular)
                    .lineLimit(1)

                Spacer()

                // Time
                Text(formatTime(thread.lastMessageAt))
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            // Subject
            HStack {
                Text(thread.subject)
                    .font(.caption)
                    .foregroundColor(hasUnread ? .primary : .secondary)
                    .lineLimit(1)

                if thread.isStarred {
                    Image(systemName: "star.fill")
                        .font(.caption)
                        .foregroundColor(.yellow)
                }
            }

            // Labels and indicators
            HStack(spacing: 8) {
                if thread.hasAttachments {
                    Image(systemName: "paperclip")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }

                ForEach(thread.labels.prefix(2)) { label in
                    Text(label.name)
                        .font(.caption2)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(labelColor(label.color).opacity(0.2))
                        .foregroundColor(labelColor(label.color))
                        .cornerRadius(4)
                }

                if thread.messageCount > 1 {
                    Text("\(thread.messageCount)")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }
        }
        .padding()
        .background(isSelected ? Color.blue.opacity(0.1) : Color.clear)
        .overlay(
            Rectangle()
                .fill(hasUnread ? Color.blue : Color.clear)
                .frame(width: 3),
            alignment: .leading
        )
    }

    private var participantNames: String {
        thread.participants
            .filter { $0.email != MockEmails.currentUser.email }
            .map { $0.name }
            .joined(separator: ", ")
    }

    private func formatTime(_ date: Date) -> String {
        let calendar = Calendar.current
        if calendar.isDateInToday(date) {
            let formatter = DateFormatter()
            formatter.timeStyle = .short
            return formatter.string(from: date)
        } else if calendar.isDateInYesterday(date) {
            return "Yesterday"
        } else {
            let formatter = DateFormatter()
            formatter.dateStyle = .short
            return formatter.string(from: date)
        }
    }

    private func labelColor(_ colorName: String) -> Color {
        switch colorName {
        case "red": return .red
        case "blue": return .blue
        case "green": return .green
        case "yellow": return .orange
        default: return .gray
        }
    }
}

// MARK: - Email Thread Detail View

struct EmailThreadDetailView: View {
    let thread: EmailThread

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Header
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text(thread.subject)
                            .font(.title2)
                            .fontWeight(.bold)

                        Spacer()

                        Button(action: {}) {
                            Image(systemName: thread.isStarred ? "star.fill" : "star")
                                .foregroundColor(thread.isStarred ? .yellow : .secondary)
                        }
                        .buttonStyle(.plain)
                    }

                    HStack {
                        ForEach(thread.labels) { label in
                            Text(label.name)
                                .font(.caption)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(labelColor(label.color).opacity(0.2))
                                .foregroundColor(labelColor(label.color))
                                .cornerRadius(6)
                        }
                    }
                }
                .padding()

                Divider()

                // Messages
                ForEach(thread.messages) { message in
                    EmailMessageView(message: message)
                }
            }
        }
    }

    private func labelColor(_ colorName: String) -> Color {
        switch colorName {
        case "red": return .red
        case "blue": return .blue
        case "green": return .green
        case "yellow": return .orange
        default: return .gray
        }
    }
}

// MARK: - Email Message View

struct EmailMessageView: View {
    let message: EmailMessage
    @State private var isExpanded = true

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header
            HStack(alignment: .top) {
                Circle()
                    .fill(Color.blue)
                    .frame(width: 40, height: 40)
                    .overlay(
                        Text(String(message.from.name.prefix(1)))
                            .foregroundColor(.white)
                            .fontWeight(.bold)
                    )

                VStack(alignment: .leading, spacing: 4) {
                    Text(message.from.name)
                        .font(.subheadline)
                        .fontWeight(.semibold)

                    Text(message.from.email)
                        .font(.caption)
                        .foregroundColor(.secondary)

                    Text(formatTime(message.sentAt))
                        .font(.caption)
                        .foregroundColor(.secondary)
                }

                Spacer()

                Button(action: { isExpanded.toggle() }) {
                    Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                        .foregroundColor(.secondary)
                }
                .buttonStyle(.plain)
            }

            if isExpanded {
                // To/CC info
                VStack(alignment: .leading, spacing: 4) {
                    Text("To: \(message.to.map { $0.name }.joined(separator: ", "))")
                        .font(.caption)
                        .foregroundColor(.secondary)

                    if let cc = message.cc, !cc.isEmpty {
                        Text("CC: \(cc.map { $0.name }.joined(separator: ", "))")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }

                Divider()

                // Body
                Text(message.body)
                    .font(.body)

                // Attachments
                if !message.attachments.isEmpty {
                    Divider()

                    VStack(alignment: .leading, spacing: 8) {
                        Text("Attachments")
                            .font(.caption)
                            .fontWeight(.semibold)
                            .foregroundColor(.secondary)

                        ForEach(message.attachments) { attachment in
                            AttachmentRow(attachment: attachment)
                        }
                    }
                }

                // Action buttons
                HStack(spacing: 12) {
                    Button(action: {}) {
                        Label("Reply", systemImage: "arrowshape.turn.up.left")
                            .font(.caption)
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)

                    Button(action: {}) {
                        Label("Forward", systemImage: "arrowshape.turn.up.right")
                            .font(.caption)
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                }
                .padding(.top, 8)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
        .padding(.horizontal)
    }

    private func formatTime(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
}

struct AttachmentRow: View {
    let attachment: EmailAttachment

    var body: some View {
        HStack {
            Image(systemName: iconForAttachment)
                .foregroundColor(.blue)

            VStack(alignment: .leading, spacing: 2) {
                Text(attachment.name)
                    .font(.caption)
                    .fontWeight(.medium)

                Text(attachment.formattedSize)
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }

            Spacer()

            Button(action: {}) {
                Image(systemName: "arrow.down.circle")
                    .foregroundColor(.blue)
            }
            .buttonStyle(.plain)
        }
        .padding(8)
        .background(Color(.systemGray5))
        .cornerRadius(8)
    }

    private var iconForAttachment: String {
        if attachment.mimeType.starts(with: "image/") {
            return "photo"
        } else if attachment.mimeType.starts(with: "video/") {
            return "video"
        } else if attachment.mimeType.contains("pdf") {
            return "doc.text"
        } else {
            return "doc"
        }
    }
}

// MARK: - Compose Email View

struct ComposeEmailView: View {
    @Environment(\.dismiss) var dismiss
    let person: Person?
    @State private var draft = MockEmails.draftEmail

    init(person: Person? = nil) {
        self.person = person
    }

    var body: some View {
        NavigationView {
            Form {
                Section {
                    HStack {
                        Text("To:")
                        TextField("Recipients", text: .constant(draft.to.map { $0.email }.joined(separator: ", ")))
                    }

                    HStack {
                        Text("CC:")
                        TextField("CC", text: .constant(""))
                    }

                    HStack {
                        Text("Subject:")
                        TextField("Subject", text: $draft.subject)
                    }
                }

                Section("Message") {
                    TextEditor(text: $draft.body)
                        .frame(minHeight: 200)
                }

                if !draft.attachments.isEmpty {
                    Section("Attachments") {
                        ForEach(draft.attachments) { attachment in
                            AttachmentRow(attachment: attachment)
                        }
                    }
                }
            }
            .navigationTitle("Compose Email")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .primaryAction) {
                    Button("Send") {
                        // Send email
                        dismiss()
                    }
                }
            }
        }
    }
}

// MARK: - Preview

#Preview {
    PersonEmailView(person: MockPeople.shared.people[0])
}
