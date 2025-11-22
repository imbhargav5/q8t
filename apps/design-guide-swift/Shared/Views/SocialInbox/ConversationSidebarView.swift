import SwiftUI

struct ConversationSidebarView: View {
    let conversation: ConversationWithRelations

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Contact Info
                VStack(alignment: .leading, spacing: 12) {
                    Text("Contact Information")
                        .font(.headline)

                    UserAvatar(
                        avatarURL: conversation.person.avatar,
                        name: conversation.person.name,
                        size: 60
                    )

                    VStack(alignment: .leading, spacing: 4) {
                        Text(conversation.person.name)
                            .font(.title3)
                            .fontWeight(.bold)

                        if let email = conversation.person.email {
                            Label(email, systemImage: "envelope")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }

                        if let company = conversation.person.company {
                            Label(company, systemImage: "building.2")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                }

                Divider()

                // Tags
                if !conversation.person.tags.isEmpty {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Tags")
                            .font(.headline)

                        FlowLayout(spacing: 6) {
                            ForEach(conversation.person.tags, id: \.self) { tag in
                                Text(tag)
                                    .font(.caption)
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 4)
                                    .background(Color.blue.opacity(0.1))
                                    .foregroundColor(.blue)
                                    .cornerRadius(4)
                            }
                        }
                    }

                    Divider()
                }

                // Custom Fields
                if !conversation.person.customFields.isEmpty {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Custom Fields")
                            .font(.headline)

                        ForEach(Array(conversation.person.customFields.keys.sorted()), id: \.self) { key in
                            HStack {
                                Text(key)
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text(conversation.person.customFields[key] ?? "")
                                    .font(.caption)
                                    .fontWeight(.medium)
                            }
                        }
                    }

                    Divider()
                }

                // Assigned To
                VStack(alignment: .leading, spacing: 8) {
                    Text("Assigned To")
                        .font(.headline)

                    if let assignedUser = conversation.assignedUser {
                        HStack {
                            UserAvatar(
                                avatarURL: assignedUser.avatar,
                                name: assignedUser.name,
                                size: 32
                            )

                            Text(assignedUser.name)
                                .font(.body)
                        }
                    } else {
                        Text("Unassigned")
                            .font(.body)
                            .foregroundColor(.secondary)
                    }
                }

                Divider()

                // Actions
                VStack(spacing: 8) {
                    Button(action: {}) {
                        Label("View Full Profile", systemImage: "person.circle")
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(8)
                    }

                    Button(action: {}) {
                        Label("View History", systemImage: "clock")
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color(.systemGray6))
                            .foregroundColor(.primary)
                            .cornerRadius(8)
                    }
                }
            }
            .padding()
        }
    }
}

// Simple flow layout for tags
struct FlowLayout: Layout {
    var spacing: CGFloat

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let sizes = subviews.map { $0.sizeThatFits(.unspecified) }
        var totalHeight: CGFloat = 0
        var totalWidth: CGFloat = 0
        var lineWidth: CGFloat = 0
        var lineHeight: CGFloat = 0

        for size in sizes {
            if lineWidth + size.width > proposal.width ?? 0 {
                totalHeight += lineHeight + spacing
                lineWidth = size.width
                lineHeight = size.height
            } else {
                lineWidth += size.width + spacing
                lineHeight = max(lineHeight, size.height)
            }
            totalWidth = max(totalWidth, lineWidth)
        }

        totalHeight += lineHeight
        return CGSize(width: totalWidth, height: totalHeight)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        var lineX = bounds.minX
        var lineY = bounds.minY
        var lineHeight: CGFloat = 0

        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)

            if lineX + size.width > bounds.maxX {
                lineY += lineHeight + spacing
                lineHeight = 0
                lineX = bounds.minX
            }

            subview.place(at: CGPoint(x: lineX, y: lineY), proposal: .unspecified)
            lineX += size.width + spacing
            lineHeight = max(lineHeight, size.height)
        }
    }
}
