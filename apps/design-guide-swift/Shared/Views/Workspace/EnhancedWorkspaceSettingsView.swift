import SwiftUI

struct EnhancedWorkspaceSettingsView: View {
    @State private var selectedTab = 0
    private let workspace = MockWorkspaces.currentWorkspace

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
            Picker("", selection: $selectedTab) {
                Text("General").tag(0)
                Text("Members").tag(1)
                Text("Plan & Billing").tag(2)
            }
            .pickerStyle(.segmented)
            .padding()

            Divider()

            // Content
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    switch selectedTab {
                    case 0:
                        generalSettingsView
                    case 1:
                        membersView
                    case 2:
                        planBillingView
                    default:
                        generalSettingsView
                    }
                }
                .padding()
            }
        }
    }

    // MARK: - General Settings

    private var generalSettingsView: some View {
        VStack(alignment: .leading, spacing: 20) {
            SettingsSection(title: "Workspace Information") {
                VStack(alignment: .leading, spacing: 12) {
                    SettingsRow(label: "Workspace Name") {
                        Text(workspace.name)
                            .foregroundColor(.secondary)
                    }

                    SettingsRow(label: "Workspace ID") {
                        Text(workspace.id)
                            .font(.system(.caption, design: .monospaced))
                            .foregroundColor(.secondary)
                    }

                    SettingsRow(label: "Created") {
                        Text(formatDate(workspace.createdAt))
                            .foregroundColor(.secondary)
                    }
                }
            }

            SettingsSection(title: "Branding") {
                VStack(alignment: .leading, spacing: 12) {
                    // Logo Upload
                    HStack {
                        if let primaryColor = workspace.settings.primaryColor {
                            Circle()
                                .fill(Color(hex: primaryColor) ?? .blue)
                                .frame(width: 60, height: 60)
                                .overlay(
                                    Text(String(workspace.name.prefix(1)))
                                        .foregroundColor(.white)
                                        .font(.title)
                                        .fontWeight(.bold)
                                )
                        }

                        VStack(alignment: .leading, spacing: 4) {
                            Text("Workspace Logo")
                                .font(.subheadline)
                                .fontWeight(.medium)

                            Button("Upload Logo") {
                                // Upload action
                            }
                            .buttonStyle(.bordered)
                            .controlSize(.small)
                        }
                    }
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(8)

                    SettingsRow(label: "Primary Color") {
                        if let color = workspace.settings.primaryColor {
                            HStack {
                                Circle()
                                    .fill(Color(hex: color) ?? .blue)
                                    .frame(width: 24, height: 24)
                                Text(color)
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                        }
                    }

                    SettingsRow(label: "Secondary Color") {
                        if let color = workspace.settings.secondaryColor {
                            HStack {
                                Circle()
                                    .fill(Color(hex: color) ?? .gray)
                                    .frame(width: 24, height: 24)
                                Text(color)
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                        }
                    }
                }
            }

            SettingsSection(title: "Preferences") {
                VStack(alignment: .leading, spacing: 12) {
                    SettingsRow(label: "Timezone") {
                        Text(workspace.settings.timezone)
                            .foregroundColor(.secondary)
                    }

                    SettingsRow(label: "Date Format") {
                        Text(workspace.settings.dateFormat)
                            .foregroundColor(.secondary)
                    }

                    SettingsRow(label: "Language") {
                        Text(workspace.settings.language)
                            .foregroundColor(.secondary)
                    }
                }
            }
        }
    }

    // MARK: - Members View

    private var membersView: some View {
        VStack(alignment: .leading, spacing: 20) {
            HStack {
                Text("Team Members")
                    .font(.headline)

                Spacer()

                Button("Invite Member") {
                    // Invite action
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
            }

            Text("\(workspace.members.count) / \(workspace.settings.maxSeats) seats used")
                .font(.caption)
                .foregroundColor(.secondary)

            VStack(spacing: 12) {
                ForEach(workspace.members) { member in
                    WorkspaceMemberRow(member: member)
                }
            }
        }
    }

    // MARK: - Plan & Billing View

    private var planBillingView: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Current Plan
            SettingsSection(title: "Current Plan") {
                VStack(alignment: .leading, spacing: 16) {
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text(workspace.plan.rawValue.capitalized)
                                .font(.title2)
                                .fontWeight(.bold)

                            Text("$\(planPrice(workspace.plan)) / month")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                        }

                        Spacer()

                        Button("Upgrade Plan") {
                            // Upgrade action
                        }
                        .buttonStyle(.borderedProminent)
                        .controlSize(.small)
                    }
                    .padding()
                    .background(Color.blue.opacity(0.1))
                    .cornerRadius(12)

                    // Usage Metrics
                    VStack(spacing: 12) {
                        UsageBar(
                            label: "Seats",
                            current: workspace.members.count,
                            maximum: workspace.settings.maxSeats
                        )

                        UsageBar(
                            label: "Social Accounts",
                            current: 12,
                            maximum: planSocialAccounts(workspace.plan)
                        )

                        UsageBar(
                            label: "Messages This Month",
                            current: 4567,
                            maximum: planMessages(workspace.plan)
                        )
                    }
                }
            }

            // Plan Comparison
            SettingsSection(title: "Available Plans") {
                VStack(spacing: 12) {
                    PlanCard(
                        name: "Free",
                        price: 0,
                        features: [
                            "1 social account",
                            "100 messages/month",
                            "Basic analytics",
                            "1 team member"
                        ],
                        isCurrent: workspace.plan == .free
                    )

                    PlanCard(
                        name: "Starter",
                        price: 19,
                        features: [
                            "5 social accounts",
                            "1,000 messages/month",
                            "Advanced analytics",
                            "5 team members"
                        ],
                        isCurrent: workspace.plan == .starter
                    )

                    PlanCard(
                        name: "Professional",
                        price: 49,
                        features: [
                            "Unlimited social accounts",
                            "10,000 messages/month",
                            "Full analytics suite",
                            "10 team members",
                            "Priority support"
                        ],
                        isCurrent: workspace.plan == .professional
                    )

                    PlanCard(
                        name: "Enterprise",
                        price: 199,
                        features: [
                            "Everything in Professional",
                            "Unlimited messages",
                            "Unlimited team members",
                            "Custom SLA",
                            "Dedicated support"
                        ],
                        isCurrent: workspace.plan == .enterprise
                    )
                }
            }

            // Billing Info (placeholder)
            SettingsSection(title: "Billing Information") {
                VStack(alignment: .leading, spacing: 12) {
                    SettingsRow(label: "Payment Method") {
                        HStack {
                            Image(systemName: "creditcard")
                            Text("•••• 4242")
                                .foregroundColor(.secondary)
                        }
                    }

                    SettingsRow(label: "Next Billing Date") {
                        Text(formatDate(Date().addingTimeInterval(30 * 24 * 60 * 60)))
                            .foregroundColor(.secondary)
                    }

                    Button("View Invoices") {
                        // View invoices
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                }
            }
        }
    }

    // MARK: - Helper Functions

    private func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        return formatter.string(from: date)
    }

    private func planPrice(_ plan: WorkspacePlan) -> Int {
        switch plan {
        case .free: return 0
        case .starter: return 19
        case .professional: return 49
        case .enterprise: return 199
        }
    }

    private func planSocialAccounts(_ plan: WorkspacePlan) -> Int {
        switch plan {
        case .free: return 1
        case .starter: return 5
        case .professional: return 999
        case .enterprise: return 999
        }
    }

    private func planMessages(_ plan: WorkspacePlan) -> Int {
        switch plan {
        case .free: return 100
        case .starter: return 1000
        case .professional: return 10000
        case .enterprise: return 999999
        }
    }
}

// MARK: - Workspace Member Row

struct WorkspaceMemberRow: View {
    let member: WorkspaceMember

    var body: some View {
        HStack(spacing: 12) {
            Circle()
                .fill(Color.blue)
                .frame(width: 44, height: 44)
                .overlay(
                    Text(String(member.user.name.prefix(1)))
                        .foregroundColor(.white)
                        .fontWeight(.bold)
                )

            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(member.user.name)
                        .font(.subheadline)
                        .fontWeight(.medium)

                    if member.isCurrent {
                        Text("(You)")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }

                Text(member.user.email)
                    .font(.caption)
                    .foregroundColor(.secondary)

                HStack {
                    RoleBadge(role: member.role)

                    if let lastActive = member.lastActive {
                        Text("• Last active \(formatRelativeTime(lastActive))")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                }
            }

            Spacer()

            if !member.isCurrent && member.role != .owner {
                Menu {
                    Button("Change Role") {
                        // Change role
                    }
                    Button("Remove", role: .destructive) {
                        // Remove member
                    }
                } label: {
                    Image(systemName: "ellipsis.circle")
                        .foregroundColor(.secondary)
                }
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }

    private func formatRelativeTime(_ date: Date) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .abbreviated
        return formatter.localizedString(for: date, relativeTo: Date())
    }
}

struct RoleBadge: View {
    let role: WorkspaceRole

    var body: some View {
        Text(role.rawValue.capitalized)
            .font(.caption2)
            .fontWeight(.medium)
            .padding(.horizontal, 6)
            .padding(.vertical, 2)
            .background(roleColor.opacity(0.2))
            .foregroundColor(roleColor)
            .cornerRadius(4)
    }

    private var roleColor: Color {
        switch role {
        case .owner: return .purple
        case .admin: return .blue
        case .member: return .green
        case .guest: return .gray
        }
    }
}

// MARK: - Usage Bar

struct UsageBar: View {
    let label: String
    let current: Int
    let maximum: Int

    private var percentage: Double {
        Double(current) / Double(maximum)
    }

    private var barColor: Color {
        if percentage >= 0.9 {
            return .red
        } else if percentage >= 0.7 {
            return .orange
        }
        return .blue
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Text(label)
                    .font(.caption)
                    .foregroundColor(.secondary)

                Spacer()

                Text("\(current) / \(maximum)")
                    .font(.caption)
                    .fontWeight(.medium)
            }

            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    Rectangle()
                        .fill(Color(.systemGray5))
                        .frame(height: 8)
                        .cornerRadius(4)

                    Rectangle()
                        .fill(barColor)
                        .frame(width: geometry.size.width * min(percentage, 1.0), height: 8)
                        .cornerRadius(4)
                }
            }
            .frame(height: 8)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }
}

// MARK: - Plan Card

struct PlanCard: View {
    let name: String
    let price: Int
    let features: [String]
    let isCurrent: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(name)
                        .font(.headline)

                    Text("$\(price) / month")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }

                Spacer()

                if isCurrent {
                    Text("CURRENT")
                        .font(.caption2)
                        .fontWeight(.bold)
                        .foregroundColor(.green)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.green.opacity(0.1))
                        .cornerRadius(4)
                } else {
                    Button("Select") {
                        // Select plan
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                }
            }

            Divider()

            VStack(alignment: .leading, spacing: 8) {
                ForEach(features, id: \.self) { feature in
                    HStack(spacing: 8) {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.caption)
                            .foregroundColor(.green)
                        Text(feature)
                            .font(.caption)
                    }
                }
            }
        }
        .padding()
        .background(isCurrent ? Color.blue.opacity(0.05) : Color(.systemGray6))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(isCurrent ? Color.blue : Color.clear, lineWidth: 2)
        )
    }
}

// MARK: - Color Extension

extension Color {
    init?(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            return nil
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Preview

#Preview {
    EnhancedWorkspaceSettingsView()
}
