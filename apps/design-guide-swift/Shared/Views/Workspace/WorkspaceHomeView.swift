import SwiftUI

struct WorkspaceHomeView: View {
    private let workspace = MockWorkspaces.workspace
    private let subscription = MockWorkspaces.subscription
    private let currentPlan = MockWorkspaces.getCurrentPlan()
    private let members = MockUsers.teamMembers

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                // Header
                VStack(alignment: .leading, spacing: 8) {
                    Text(workspace.name)
                        .font(.largeTitle)
                        .fontWeight(.bold)

                    Text("Workspace Overview")
                        .font(.title3)
                        .foregroundColor(.secondary)
                }

                // Stats Cards
                HStack(spacing: 16) {
                    StatCard(
                        icon: "person.3.fill",
                        title: "Team Members",
                        value: "\(members.count)",
                        color: .blue
                    )

                    StatCard(
                        icon: "star.fill",
                        title: "Current Plan",
                        value: currentPlan?.name ?? "Unknown",
                        color: .purple
                    )

                    StatCard(
                        icon: "checkmark.circle.fill",
                        title: "Subscription",
                        value: subscription.status.capitalized,
                        color: .green
                    )
                }

                // Seat Usage
                VStack(alignment: .leading, spacing: 12) {
                    Text("Seat Usage")
                        .font(.headline)

                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Text("\(subscription.seatsUsed) of \(subscription.seatsIncluded) seats used")
                                .font(.body)

                            Spacer()

                            Text("\(Int((Double(subscription.seatsUsed) / Double(subscription.seatsIncluded)) * 100))%")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }

                        GeometryReader { geometry in
                            ZStack(alignment: .leading) {
                                Rectangle()
                                    .fill(Color(.systemGray5))
                                    .frame(height: 8)
                                    .cornerRadius(4)

                                Rectangle()
                                    .fill(Color.blue)
                                    .frame(
                                        width: geometry.size.width * (Double(subscription.seatsUsed) / Double(subscription.seatsIncluded)),
                                        height: 8
                                    )
                                    .cornerRadius(4)
                            }
                        }
                        .frame(height: 8)
                    }
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                }

                // Team Members
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text("Team Members")
                            .font(.headline)

                        Spacer()

                        Button(action: {}) {
                            Label("Invite", systemImage: "plus")
                                .font(.caption)
                        }
                    }

                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 200))], spacing: 12) {
                        ForEach(members) { member in
                            TeamMemberCard(member: member)
                        }
                    }
                }

                // Quick Actions
                VStack(alignment: .leading, spacing: 12) {
                    Text("Quick Actions")
                        .font(.headline)

                    HStack(spacing: 12) {
                        ActionButton(
                            icon: "gearshape.fill",
                            title: "Settings",
                            color: .gray
                        )

                        ActionButton(
                            icon: "chart.bar.fill",
                            title: "Analytics",
                            color: .blue
                        )

                        ActionButton(
                            icon: "person.badge.plus",
                            title: "Invite Team",
                            color: .green
                        )
                    }
                }
            }
            .padding()
        }
    }
}

struct StatCard: View {
    let icon: String
    let title: String
    let value: String
    let color: Color

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(color)

            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.caption)
                    .foregroundColor(.secondary)

                Text(value)
                    .font(.title3)
                    .fontWeight(.bold)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(color.opacity(0.1))
        .cornerRadius(12)
    }
}

struct TeamMemberCard: View {
    let member: UserWithMemberInfo

    var body: some View {
        HStack {
            UserAvatar(
                avatarURL: member.avatar,
                name: member.name,
                size: 40,
                showBadge: true,
                status: member.status
            )

            VStack(alignment: .leading, spacing: 4) {
                Text(member.name)
                    .font(.body)
                    .fontWeight(.medium)
                    .lineLimit(1)

                Text(member.role.displayName)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            Spacer()
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }
}

struct ActionButton: View {
    let icon: String
    let title: String
    let color: Color

    var body: some View {
        Button(action: {}) {
            VStack(spacing: 8) {
                Image(systemName: icon)
                    .font(.title2)

                Text(title)
                    .font(.caption)
            }
            .frame(maxWidth: .infinity)
            .padding()
            .foregroundColor(color)
            .background(color.opacity(0.1))
            .cornerRadius(8)
        }
        .buttonStyle(.plain)
    }
}
