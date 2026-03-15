import SwiftUI

struct PersonDetailView: View {
    let person: Person
    let activities: [CRMActivityLog]

    @State private var selectedTab = 0

    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack(spacing: 16) {
                // Avatar
                if let avatarUrl = person.avatar {
                    AsyncImage(url: URL(string: avatarUrl)) { image in
                        image.resizable()
                    } placeholder: {
                        Color.gray
                    }
                    .frame(width: 80, height: 80)
                    .clipShape(Circle())
                } else {
                    Circle()
                        .fill(Color.blue)
                        .frame(width: 80, height: 80)
                        .overlay(
                            Text(String(person.name.prefix(1)))
                                .foregroundColor(.white)
                                .font(.largeTitle)
                        )
                }

                VStack(alignment: .leading, spacing: 6) {
                    HStack {
                        Text(person.name)
                            .font(.title2.weight(.bold))
                        if person.isVIP {
                            Image(systemName: "star.fill")
                                .foregroundColor(.yellow)
                        }
                        if person.isVerified {
                            Image(systemName: "checkmark.seal.fill")
                                .foregroundColor(.blue)
                        }
                    }

                    if let jobTitle = person.jobTitle, let company = person.company {
                        Text("\(jobTitle) at \(company)")
                            .foregroundColor(.secondary)
                    } else if let company = person.company {
                        Text(company)
                            .foregroundColor(.secondary)
                    }

                    if let location = person.location {
                        HStack {
                            Image(systemName: "location")
                                .font(.system(size: 12))
                            Text(location)
                                .font(.system(size: 13))
                        }
                        .foregroundColor(.secondary)
                    }

                    // Tags
                    if !person.tags.isEmpty {
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 6) {
                                ForEach(person.tags, id: \.self) { tag in
                                    Text(tag)
                                        .font(.system(size: 11))
                                        .padding(.horizontal, 8)
                                        .padding(.vertical, 4)
                                        .background(Color.accentColor.opacity(0.1))
                                        .cornerRadius(12)
                                }
                            }
                        }
                    }
                }

                Spacer()

                // Action buttons
                VStack(spacing: 8) {
                    Button(action: {}) {
                        Label("Email", systemImage: "envelope")
                    }
                    .buttonStyle(.borderedProminent)

                    Button(action: {}) {
                        Label("Message", systemImage: "message")
                    }
                }
            }
            .padding()

            Divider()

            // Tabs
            Picker("", selection: $selectedTab) {
                Text("Overview").tag(0)
                Text("Conversations").tag(1)
                Text("Timeline").tag(2)
                Text("Notes").tag(3)
            }
            .pickerStyle(.segmented)
            .padding(.horizontal)
            .padding(.vertical, 8)

            Divider()

            // Tab Content
            ScrollView {
                switch selectedTab {
                case 0:
                    PersonOverviewTab(person: person)
                case 1:
                    PersonConversationsTab(person: person)
                case 2:
                    PersonTimelineTab(activities: activities)
                case 3:
                    PersonNotesTab()
                default:
                    Text("Unknown tab")
                }
            }
        }
    }
}

// MARK: - Overview Tab
struct PersonOverviewTab: View {
    let person: Person

    var body: some View {
        VStack(spacing: 16) {
            // Contact Information
            GroupBox(label: Label("Contact Information", systemImage: "info.circle")) {
                VStack(alignment: .leading, spacing: 12) {
                    if let email = person.email {
                        InfoRow(icon: "envelope", label: "Email", value: email)
                    }
                    if let phone = person.phone {
                        InfoRow(icon: "phone", label: "Phone", value: phone)
                    }
                    if let website = person.website {
                        InfoRow(icon: "globe", label: "Website", value: website)
                    }
                    if let timezone = person.timezone {
                        InfoRow(icon: "clock", label: "Timezone", value: timezone)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }

            // Professional Information
            GroupBox(label: Label("Professional Information", systemImage: "briefcase")) {
                VStack(alignment: .leading, spacing: 12) {
                    if let company = person.company {
                        InfoRow(icon: "building.2", label: "Company", value: company)
                    }
                    if let jobTitle = person.jobTitle {
                        InfoRow(icon: "person.badge.key", label: "Job Title", value: jobTitle)
                    }
                    if let bio = person.bio {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Bio")
                                .font(.caption)
                                .foregroundColor(.secondary)
                            Text(bio)
                                .font(.body)
                        }
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }

            // Engagement Overview
            GroupBox(label: Label("Engagement Overview", systemImage: "chart.bar")) {
                HStack(spacing: 24) {
                    MetricBox(title: "Messages", value: "\(person.totalMessages)")
                    MetricBox(title: "Conversations", value: "\(person.totalConversations)")
                    if let lastContact = person.lastContactAt {
                        MetricBox(title: "Last Contact", value: lastContact.timeAgoDisplay())
                    }
                }
                .frame(maxWidth: .infinity)
            }
        }
        .padding()
    }
}

struct InfoRow: View {
    let icon: String
    let label: String
    let value: String

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .foregroundColor(.secondary)
                .frame(width: 20)
            VStack(alignment: .leading, spacing: 2) {
                Text(label)
                    .font(.caption)
                    .foregroundColor(.secondary)
                Text(value)
                    .font(.body)
            }
        }
    }
}

struct MetricBox: View {
    let title: String
    let value: String

    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.title2.weight(.bold))
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
        }
    }
}

// MARK: - Conversations Tab
struct PersonConversationsTab: View {
    let person: Person
    private let conversations = MockConversations.conversations.prefix(3)

    var body: some View {
        VStack(spacing: 12) {
            ForEach(Array(conversations), id: \.id) { conversation in
                HStack(spacing: 12) {
                    Image(systemName: platformIcon(conversation.platform))
                        .foregroundColor(platformColor(conversation.platform))
                        .frame(width: 32)

                    VStack(alignment: .leading, spacing: 4) {
                        Text("Conversation on \(conversation.platform.displayName)")
                            .font(.system(size: 14, weight: .medium))
                        Text("\(conversation.unreadCount) messages")
                            .font(.system(size: 12))
                            .foregroundColor(.secondary)
                    }

                    Spacer()

                    StatusBadge(status: conversation.status)
                }
                .padding()
                .background(Color(nsColor: .controlBackgroundColor))
                .cornerRadius(8)
            }
        }
        .padding()
    }

    func platformIcon(_ platform: SocialPlatform) -> String {
        switch platform {
        case .twitter: return "message"
        case .instagram: return "camera"
        case .linkedin: return "briefcase"
        default: return "message"
        }
    }

    func platformColor(_ platform: SocialPlatform) -> Color {
        Color(hex: platform.color)
    }
}

// MARK: - Timeline Tab
struct PersonTimelineTab: View {
    let activities: [CRMActivityLog]

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            ForEach(activities) { activity in
                HStack(alignment: .top, spacing: 12) {
                    Image(systemName: activityIcon(activity.activityType))
                        .foregroundColor(.accentColor)
                        .frame(width: 24)

                    VStack(alignment: .leading, spacing: 4) {
                        Text(activity.activityDescription ?? activity.activityType.rawValue)
                            .font(.system(size: 14, weight: .medium))

                        if let performedBy = activity.performedByName {
                            Text(performedBy)
                                .font(.system(size: 12))
                                .foregroundColor(.secondary)
                        }

                        Text(activity.createdAt.timeAgoDisplay())
                            .font(.system(size: 11))
                            .foregroundColor(.secondary)
                    }

                    Spacer()
                }
                .padding()
                .background(Color(nsColor: .controlBackgroundColor))
                .cornerRadius(8)
            }
        }
        .padding()
    }

    func activityIcon(_ type: CRMActivityType) -> String {
        switch type {
        case .messageSent, .messageReceived: return "message"
        case .tagAdded: return "tag"
        case .vipStatusChanged: return "star"
        case .conversationStarted: return "bubble.left.and.bubble.right"
        default: return "circle"
        }
    }
}

// MARK: - Notes Tab
struct PersonNotesTab: View {
    private let notes = MockCRM.shared.notes

    var body: some View {
        VStack(spacing: 12) {
            ForEach(notes) { note in
                VStack(alignment: .leading, spacing: 8) {
                    HStack {
                        if let authorAvatar = note.authorAvatar {
                            AsyncImage(url: URL(string: authorAvatar)) { image in
                                image.resizable()
                            } placeholder: {
                                Color.gray
                            }
                            .frame(width: 24, height: 24)
                            .clipShape(Circle())
                        }

                        Text(note.authorName ?? "Unknown")
                            .font(.system(size: 13, weight: .medium))

                        Spacer()

                        if note.isPinned {
                            Image(systemName: "pin.fill")
                                .foregroundColor(.accentColor)
                        }

                        Text(note.createdAt.timeAgoDisplay())
                            .font(.system(size: 11))
                            .foregroundColor(.secondary)
                    }

                    Text(note.content)
                        .font(.body)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .padding()
                .background(note.isPinned ? Color.accentColor.opacity(0.05) : Color(nsColor: .controlBackgroundColor))
                .cornerRadius(8)
            }
        }
        .padding()
    }
}

// MARK: - Date Extension
extension Date {
    func timeAgoDisplay() -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .abbreviated
        return formatter.localizedString(for: self, relativeTo: Date())
    }
}
