import SwiftUI

struct CRMView: View {
    @State private var selectedPersonId: String? = nil
    @State private var searchText = ""
    @State private var selectedSegment: CRMSegment? = nil
    @State private var showFilterSidebar = false

    // Mock data
    private let people = MockPeople.shared.people
    private let segments = MockCRM.shared.segments
    private let activities = MockCRM.shared.activities

    var filteredPeople: [Person] {
        var filtered = people

        // Filter by search text
        if !searchText.isEmpty {
            filtered = filtered.filter { person in
                person.name.localizedCaseInsensitiveContains(searchText) ||
                person.email?.localizedCaseInsensitiveContains(searchText) == true ||
                person.company?.localizedCaseInsensitiveContains(searchText) == true
            }
        }

        // Filter by segment
        if let segment = selectedSegment {
            switch segment.name {
            case "VIP Contacts":
                filtered = filtered.filter { $0.isVIP }
            case "Active (30 days)":
                filtered = filtered.filter { person in
                    if let lastContact = person.lastContactAt {
                        return Date().timeIntervalSince(lastContact) <= 86400 * 30
                    }
                    return false
                }
            default:
                break
            }
        }

        return filtered
    }

    var selectedPerson: Person? {
        guard let id = selectedPersonId else { return nil }
        return people.first { $0.id == id }
    }

    var body: some View {
        HStack(spacing: 0) {
            // Left Sidebar - Contact List
            VStack(spacing: 0) {
                // Search bar
                HStack {
                    Image(systemName: "magnifyingglass")
                        .foregroundColor(.secondary)
                    TextField("Search contacts...", text: $searchText)
                }
                .padding(8)
                .background(Color(nsColor: .controlBackgroundColor))
                .cornerRadius(6)
                .padding()

                // Segments filter
                if showFilterSidebar {
                    ScrollView {
                        VStack(alignment: .leading, spacing: 4) {
                            ForEach(segments) { segment in
                                Button(action: {
                                    selectedSegment = segment.id == selectedSegment?.id ? nil : segment
                                }) {
                                    HStack {
                                        Text(segment.icon ?? "📁")
                                        Text(segment.name)
                                            .font(.system(size: 13))
                                        Spacer()
                                        Text("\(segment.memberCount)")
                                            .font(.system(size: 11))
                                            .foregroundColor(.secondary)
                                    }
                                    .padding(.vertical, 6)
                                    .padding(.horizontal, 12)
                                    .background(selectedSegment?.id == segment.id ? Color.accentColor.opacity(0.1) : Color.clear)
                                    .cornerRadius(6)
                                }
                                .buttonStyle(PlainButtonStyle())
                            }
                        }
                        .padding(.horizontal)
                    }
                    .frame(height: 200)
                }

                Divider()

                // Contact list
                ScrollView {
                    LazyVStack(spacing: 1) {
                        ForEach(filteredPeople) { person in
                            PersonListItem(person: person, isSelected: selectedPersonId == person.id)
                                .contentShape(Rectangle())
                                .onTapGesture {
                                    selectedPersonId = person.id
                                }
                        }
                    }
                }
            }
            .frame(width: 280)
            .background(Color(nsColor: .controlBackgroundColor))

            Divider()

            // Main Content - Person Detail
            if let person = selectedPerson {
                PersonDetailView(person: person, activities: activities.filter { $0.personId == person.id })
            } else {
                VStack(spacing: 16) {
                    Image(systemName: "person.3")
                        .font(.system(size: 64))
                        .foregroundColor(.secondary)
                    Text("Select a contact")
                        .font(.title2)
                    Text("\(filteredPeople.count) contacts")
                        .foregroundColor(.secondary)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
        }
        .navigationTitle("CRM")
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                HStack {
                    Button(action: { showFilterSidebar.toggle() }) {
                        Image(systemName: "line.3.horizontal.decrease.circle")
                    }
                    Button(action: {}) {
                        Label("Add Contact", systemImage: "plus")
                    }
                }
            }
        }
    }
}

// MARK: - Person List Item
struct PersonListItem: View {
    let person: Person
    let isSelected: Bool

    var body: some View {
        HStack(spacing: 12) {
            // Avatar
            if let avatarUrl = person.avatar {
                AsyncImage(url: URL(string: avatarUrl)) { image in
                    image.resizable()
                } placeholder: {
                    Color.gray
                }
                .frame(width: 40, height: 40)
                .clipShape(Circle())
            } else {
                Circle()
                    .fill(Color.blue)
                    .frame(width: 40, height: 40)
                    .overlay(
                        Text(String(person.name.prefix(1)))
                            .foregroundColor(.white)
                            .font(.headline)
                    )
            }

            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(person.name)
                        .font(.system(size: 14, weight: .medium))
                    if person.isVIP {
                        Image(systemName: "star.fill")
                            .font(.system(size: 10))
                            .foregroundColor(.yellow)
                    }
                    if person.isVerified {
                        Image(systemName: "checkmark.seal.fill")
                            .font(.system(size: 10))
                            .foregroundColor(.blue)
                    }
                }

                if let company = person.company {
                    Text(company)
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                }

                HStack {
                    Text("\(person.totalMessages) messages")
                        .font(.system(size: 11))
                        .foregroundColor(.secondary)
                    if !person.tags.isEmpty {
                        Text("•")
                            .foregroundColor(.secondary)
                        Text(person.tags.prefix(2).joined(separator: ", "))
                            .font(.system(size: 11))
                            .foregroundColor(.secondary)
                            .lineLimit(1)
                    }
                }
            }

            Spacer()
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .background(isSelected ? Color.accentColor.opacity(0.1) : Color.clear)
        .cornerRadius(6)
        .padding(.horizontal, 8)
    }
}
