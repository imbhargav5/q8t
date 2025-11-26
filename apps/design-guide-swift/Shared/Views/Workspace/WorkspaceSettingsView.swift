import SwiftUI

enum WorkspaceSettingsTab: String, CaseIterable {
    case general = "General"
    case members = "Members"
    case plan = "Plan"
}

struct WorkspaceSettingsView: View {
    @State private var selectedTab: WorkspaceSettingsTab = .general
    private let workspace = MockWorkspaces.workspace

    var body: some View {
        VStack(spacing: 0) {
            // Header
            Text("Workspace Settings")
                .font(.title)
                .fontWeight(.bold)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()

            Divider()

            // Tabs
            HStack(spacing: 0) {
                ForEach(WorkspaceSettingsTab.allCases, id: \.self) { tab in
                    Button(action: {
                        selectedTab = tab
                    }) {
                        Text(tab.rawValue)
                            .font(.body)
                            .fontWeight(selectedTab == tab ? .semibold : .regular)
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(selectedTab == tab ? Color.blue.opacity(0.1) : Color.clear)
                            .foregroundColor(selectedTab == tab ? .blue : .primary)
                    }
                    .buttonStyle(.plain)
                }
            }

            Divider()

            // Content
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    switch selectedTab {
                    case .general:
                        WorkspaceGeneralView(workspace: workspace)
                    case .members:
                        WorkspaceMembersView()
                    case .plan:
                        WorkspacePlanView()
                    }
                }
                .padding()
            }
        }
    }
}

struct WorkspaceGeneralView: View {
    let workspace: Workspace

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            SettingsSection(title: "Basic Information") {
                SettingsRow(label: "Workspace Name") {
                    Text(workspace.name)
                        .foregroundColor(.secondary)
                }

                SettingsRow(label: "Slug") {
                    Text(workspace.slug)
                        .foregroundColor(.secondary)
                }
            }

            SettingsSection(title: "Branding") {
                SettingsRow(label: "Primary Color") {
                    Circle()
                        .fill(Color(hex: workspace.primaryColor))
                        .frame(width: 24, height: 24)
                }

                SettingsRow(label: "Secondary Color") {
                    Circle()
                        .fill(Color(hex: workspace.secondaryColor))
                        .frame(width: 24, height: 24)
                }
            }

            SettingsSection(title: "Regional Settings") {
                SettingsRow(label: "Timezone") {
                    Text(workspace.timezone)
                        .foregroundColor(.secondary)
                }

                SettingsRow(label: "Language") {
                    Text(workspace.language)
                        .foregroundColor(.secondary)
                }
            }
        }
    }
}

struct WorkspaceMembersView: View {
    private let members = MockUsers.teamMembers
    private let invitations = MockWorkspaces.invitations

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            SettingsSection(title: "Team Members (\(members.count))") {
                ForEach(members) { member in
                    MemberRow(member: member)
                }
            }

            if !invitations.isEmpty {
                SettingsSection(title: "Pending Invitations (\(invitations.count))") {
                    ForEach(invitations) { invitation in
                        InvitationRow(invitation: invitation)
                    }
                }
            }

            Button(action: {}) {
                Label("Invite Team Member", systemImage: "plus")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(8)
            }
        }
    }
}

struct MemberRow: View {
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

                Text(member.email)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            Spacer()

            Text(member.role.displayName)
                .font(.caption)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(Color.blue.opacity(0.1))
                .foregroundColor(.blue)
                .cornerRadius(4)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }
}

struct InvitationRow: View {
    let invitation: WorkspaceInvitation

    var body: some View {
        HStack {
            Image(systemName: "envelope")
                .foregroundColor(.secondary)

            VStack(alignment: .leading, spacing: 4) {
                Text(invitation.email)
                    .font(.body)

                Text("Invited \(timeAgo(invitation.invitedAt)) • Expires \(timeAgo(invitation.expiresAt))")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            Spacer()

            Text(invitation.role.displayName)
                .font(.caption)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(Color.orange.opacity(0.1))
                .foregroundColor(.orange)
                .cornerRadius(4)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }

    private func timeAgo(_ date: Date) -> String {
        let interval = Date().timeIntervalSince(date)
        let days = Int(abs(interval) / 86400)

        if interval > 0 {
            return "\(days)d ago"
        } else {
            return "in \(days)d"
        }
    }
}

struct WorkspacePlanView: View {
    private let subscription = MockWorkspaces.subscription
    private let currentPlan = MockWorkspaces.getCurrentPlan()
    private let allPlans = MockWorkspaces.plans

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Current Plan
            if let plan = currentPlan {
                SettingsSection(title: "Current Plan") {
                    HStack {
                        VStack(alignment: .leading, spacing: 8) {
                            Text(plan.name)
                                .font(.title2)
                                .fontWeight(.bold)

                            Text(plan.description)
                                .font(.caption)
                                .foregroundColor(.secondary)

                            Text("$\(Int(subscription.pricePerMonth))/month")
                                .font(.headline)
                                .foregroundColor(.blue)
                        }

                        Spacer()

                        VStack(alignment: .trailing, spacing: 4) {
                            Text("Seats")
                                .font(.caption)
                                .foregroundColor(.secondary)

                            Text("\(subscription.seatsUsed)/\(subscription.seatsIncluded)")
                                .font(.title3)
                                .fontWeight(.bold)
                        }
                    }
                    .padding()
                    .background(Color.blue.opacity(0.1))
                    .cornerRadius(12)
                }
            }

            // Available Plans
            SettingsSection(title: "Available Plans") {
                ForEach(allPlans) { plan in
                    WorkspacePlanCard(
                        plan: plan,
                        isCurrentPlan: plan.id == subscription.plan
                    )
                }
            }
        }
    }
}

struct WorkspacePlanCard: View {
    let plan: PlanDetails
    let isCurrentPlan: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(plan.name)
                        .font(.headline)

                    Text(plan.description)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }

                Spacer()

                if isCurrentPlan {
                    Text("Current")
                        .font(.caption)
                        .foregroundColor(.blue)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.blue.opacity(0.1))
                        .cornerRadius(4)
                }
            }

            HStack(alignment: .firstTextBaseline, spacing: 4) {
                Text("$\(Int(plan.monthlyPrice))")
                    .font(.title2)
                    .fontWeight(.bold)

                Text("/month")
                    .font(.caption)
                    .foregroundColor(.secondary)

                if plan.yearlyPrice > 0 {
                    Text("or $\(Int(plan.yearlyPrice))/year")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }

            VStack(alignment: .leading, spacing: 6) {
                ForEach(plan.features, id: \.self) { feature in
                    HStack {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundColor(.green)
                            .font(.caption)

                        Text(feature)
                            .font(.caption)
                    }
                }
            }

            if !isCurrentPlan {
                Button(action: {}) {
                    Text("Upgrade to \(plan.name)")
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(8)
                }
            }
        }
        .padding()
        .background(Color(.controlBackgroundColor))
        .cornerRadius(12)
    }
}
