import SwiftUI

// This file contains enhanced versions of the settings views with complete feature parity

// MARK: - Enhanced General Settings

struct EnhancedGeneralSettingsView: View {
    @State private var settings = MockSettings.generalSettings
    @State private var notifications = MockSettings.notificationPreferences
    @State private var profileImage: String? = nil

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Profile Section
            SettingsSection(title: "Profile") {
                VStack(alignment: .leading, spacing: 12) {
                    // Profile Photo
                    HStack {
                        if let image = profileImage {
                            Image(systemName: image)
                                .resizable()
                                .frame(width: 60, height: 60)
                                .clipShape(Circle())
                                .overlay(Circle().stroke(Color.gray, lineWidth: 1))
                        } else {
                            Circle()
                                .fill(Color.gray.opacity(0.3))
                                .frame(width: 60, height: 60)
                                .overlay(
                                    Image(systemName: "person.fill")
                                        .foregroundColor(.white)
                                )
                        }

                        VStack(alignment: .leading, spacing: 4) {
                            Text("Profile Photo")
                                .font(.subheadline)
                                .fontWeight(.medium)
                            Button("Change Photo") {
                                // Photo picker action
                            }
                            .buttonStyle(.bordered)
                            .controlSize(.small)
                        }
                    }
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(8)

                    // Name and Email
                    SettingsRow(label: "Full Name") {
                        Text("Sarah Chen")
                            .foregroundColor(.secondary)
                    }

                    SettingsRow(label: "Email") {
                        Text("sarah.chen@example.com")
                            .foregroundColor(.secondary)
                    }
                }
            }

            // Appearance
            SettingsSection(title: "Appearance") {
                SettingsRow(label: "Theme") {
                    Picker("Theme", selection: $settings.theme) {
                        ForEach(Theme.allCases) { theme in
                            Text(theme.displayName).tag(theme)
                        }
                    }
                    .pickerStyle(.segmented)
                    .frame(width: 250)
                }
            }

            // Preferences
            SettingsSection(title: "Preferences") {
                SettingsRow(label: "Language") {
                    Text("English")
                        .foregroundColor(.secondary)
                }

                SettingsRow(label: "Timezone") {
                    Text(settings.timezone)
                        .foregroundColor(.secondary)
                }

                SettingsRow(label: "Date Format") {
                    Text(settings.dateFormat)
                        .foregroundColor(.secondary)
                }

                SettingsRow(label: "Time Format") {
                    Text(settings.timeFormat)
                        .foregroundColor(.secondary)
                }
            }

            // Notifications
            SettingsSection(title: "Notification Preferences") {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Channels")
                        .font(.subheadline)
                        .foregroundColor(.secondary)

                    SettingsRow(label: "Email Notifications") {
                        Toggle("", isOn: .constant(notifications.email))
                            .labelsHidden()
                    }

                    SettingsRow(label: "Push Notifications") {
                        Toggle("", isOn: .constant(notifications.push))
                            .labelsHidden()
                    }

                    SettingsRow(label: "In-App Notifications") {
                        Toggle("", isOn: .constant(notifications.inApp))
                            .labelsHidden()
                    }

                    SettingsRow(label: "SMS Notifications") {
                        Toggle("", isOn: .constant(notifications.sms))
                            .labelsHidden()
                    }

                    Divider()
                        .padding(.vertical, 8)

                    Text("Events")
                        .font(.subheadline)
                        .foregroundColor(.secondary)

                    SettingsRow(label: "New Messages") {
                        Toggle("", isOn: .constant(notifications.events.newMessages))
                            .labelsHidden()
                    }

                    SettingsRow(label: "Mentions") {
                        Toggle("", isOn: .constant(notifications.events.mentions))
                            .labelsHidden()
                    }

                    SettingsRow(label: "Comments") {
                        Toggle("", isOn: .constant(notifications.events.comments))
                            .labelsHidden()
                    }

                    SettingsRow(label: "New Posts") {
                        Toggle("", isOn: .constant(notifications.events.newPosts))
                            .labelsHidden()
                    }

                    SettingsRow(label: "Team Invitations") {
                        Toggle("", isOn: .constant(notifications.events.teamInvites))
                            .labelsHidden()
                    }

                    Divider()
                        .padding(.vertical, 8)

                    Text("Digest")
                        .font(.subheadline)
                        .foregroundColor(.secondary)

                    SettingsRow(label: "Daily Digest") {
                        Toggle("", isOn: .constant(notifications.digest.enabled && notifications.digest.frequency == "daily"))
                            .labelsHidden()
                    }

                    SettingsRow(label: "Weekly Digest") {
                        Toggle("", isOn: .constant(notifications.digest.enabled && notifications.digest.frequency == "weekly"))
                            .labelsHidden()
                    }
                }
            }
        }
    }
}

// MARK: - Enhanced Privacy Settings

struct EnhancedPrivacySettingsView: View {
    @State private var settings = MockSettings.privacySettings
    @State private var profileVisibility = "workspace"
    @State private var emailVisibility = "team"
    @State private var activityVisibility = "workspace"
    private let connectedApps = MockSettings.connectedApps

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Visibility Controls
            SettingsSection(title: "Visibility") {
                VStack(alignment: .leading, spacing: 12) {
                    SettingsRow(label: "Profile visible to") {
                        Picker("", selection: $profileVisibility) {
                            Text("Only Me").tag("me")
                            Text("My Team").tag("team")
                            Text("My Workspace").tag("workspace")
                            Text("Everyone").tag("everyone")
                        }
                        .frame(width: 180)
                    }

                    SettingsRow(label: "Email visible to") {
                        Picker("", selection: $emailVisibility) {
                            Text("Only Me").tag("me")
                            Text("My Team").tag("team")
                            Text("My Workspace").tag("workspace")
                            Text("Everyone").tag("everyone")
                        }
                        .frame(width: 180)
                    }

                    SettingsRow(label: "Activity visible to") {
                        Picker("", selection: $activityVisibility) {
                            Text("Only Me").tag("me")
                            Text("My Team").tag("team")
                            Text("My Workspace").tag("workspace")
                            Text("Everyone").tag("everyone")
                        }
                        .frame(width: 180)
                    }
                }
            }

            // Communication
            SettingsSection(title: "Communication") {
                SettingsRow(label: "Allow Direct Messages") {
                    Toggle("", isOn: .constant(settings.allowDirectMessages))
                        .labelsHidden()
                }

                SettingsRow(label: "Show Online Status") {
                    Toggle("", isOn: .constant(settings.showOnlineStatus))
                        .labelsHidden()
                }

                SettingsRow(label: "Show Typing Indicator") {
                    Toggle("", isOn: .constant(settings.showTypingIndicator))
                        .labelsHidden()
                }
            }

            // Connected Apps
            SettingsSection(title: "Connected Apps") {
                VStack(alignment: .leading, spacing: 12) {
                    SettingsRow(label: "Third-party Integrations") {
                        Toggle("", isOn: .constant(true))
                            .labelsHidden()
                    }

                    if !connectedApps.isEmpty {
                        Text("You have \(connectedApps.count) apps connected")
                            .font(.caption)
                            .foregroundColor(.secondary)
                            .padding(.horizontal)

                        ForEach(connectedApps) { app in
                            ConnectedAppRow(app: app)
                        }
                    }
                }
            }

            // Data Sharing
            SettingsSection(title: "Data Sharing") {
                SettingsRow(label: "Analytics") {
                    Toggle("", isOn: .constant(settings.dataSharing.analytics))
                        .labelsHidden()
                }

                SettingsRow(label: "Personalization") {
                    Toggle("", isOn: .constant(settings.dataSharing.personalization))
                        .labelsHidden()
                }

                SettingsRow(label: "Crash Reports") {
                    Toggle("", isOn: .constant(settings.dataSharing.crashReports))
                        .labelsHidden()
                }
            }

            // Data Management
            SettingsSection(title: "Data Management") {
                VStack(spacing: 12) {
                    Button(action: {
                        // Export data action
                    }) {
                        HStack {
                            Image(systemName: "arrow.down.doc")
                            Text("Export Your Data")
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                        .padding()
                        .background(Color(.systemGray6))
                        .cornerRadius(8)
                    }
                    .buttonStyle(.plain)

                    Button(action: {
                        // Delete account action
                    }) {
                        HStack {
                            Image(systemName: "trash")
                                .foregroundColor(.red)
                            Text("Delete Account")
                                .foregroundColor(.red)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                        .padding()
                        .background(Color(.systemGray6))
                        .cornerRadius(8)
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }
}

struct ConnectedAppRow: View {
    let app: ConnectedApp

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Circle()
                    .fill(Color.blue)
                    .frame(width: 40, height: 40)
                    .overlay(
                        Text(String(app.name.prefix(1)))
                            .foregroundColor(.white)
                            .fontWeight(.bold)
                    )

                VStack(alignment: .leading, spacing: 4) {
                    Text(app.name)
                        .font(.subheadline)
                        .fontWeight(.medium)

                    Text(app.description)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }

                Spacer()

                Button("Disconnect") {
                    // Disconnect action
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
                .tint(.red)
            }

            Text("Permissions: \(app.permissions.joined(separator: ", "))")
                .font(.caption2)
                .foregroundColor(.secondary)

            Text("Last accessed: \(formatRelativeTime(app.lastAccess))")
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }

    private func formatRelativeTime(_ date: Date) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .abbreviated
        return formatter.localizedString(for: date, relativeTo: Date())
    }
}

// MARK: - Enhanced Security Settings

struct EnhancedSecuritySettingsView: View {
    @State private var selectedSecurityTab = 0
    @State private var showPasswordChange = false
    @State private var show2FASetup = false
    @State private var showCreateAPIKey = false

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Security Tabs
            Picker("", selection: $selectedSecurityTab) {
                Text("Overview").tag(0)
                Text("Login History").tag(1)
                Text("Audit Log").tag(2)
            }
            .pickerStyle(.segmented)

            switch selectedSecurityTab {
            case 0:
                securityOverview
            case 1:
                loginHistoryView
            case 2:
                auditLogView
            default:
                securityOverview
            }
        }
    }

    // MARK: - Security Overview

    private var securityOverview: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Password
            SettingsSection(title: "Password") {
                Button(action: { showPasswordChange = true }) {
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Change Password")
                                .font(.body)
                            Text("Last changed 45 days ago")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                        Spacer()
                        Image(systemName: "chevron.right")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(8)
                }
                .buttonStyle(.plain)
            }

            // Two-Factor Authentication
            SettingsSection(title: "Two-Factor Authentication") {
                let twoFA = MockSettings.twoFactorAuth

                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Two-Factor Authentication")
                                .font(.body)
                            Text(twoFA.enabled ? "Enabled via \(twoFA.method?.displayName ?? "")" : "Not enabled")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }

                        Spacer()

                        if twoFA.enabled {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundColor(.green)
                        } else {
                            Button("Enable") {
                                show2FASetup = true
                            }
                            .buttonStyle(.bordered)
                            .controlSize(.small)
                        }
                    }
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(8)

                    if twoFA.enabled && !twoFA.backupCodes.isEmpty {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Backup Codes")
                                .font(.subheadline)
                                .fontWeight(.medium)

                            Text("Store these codes securely. Each code can only be used once.")
                                .font(.caption)
                                .foregroundColor(.secondary)

                            ForEach(twoFA.backupCodes, id: \.self) { code in
                                Text(code)
                                    .font(.system(.caption, design: .monospaced))
                                    .padding(8)
                                    .background(Color(.systemGray5))
                                    .cornerRadius(4)
                            }

                            HStack {
                                Button("Download Codes") {
                                    // Download action
                                }
                                .buttonStyle(.bordered)
                                .controlSize(.small)

                                Button("Regenerate Codes") {
                                    // Regenerate action
                                }
                                .buttonStyle(.bordered)
                                .controlSize(.small)
                            }
                        }
                        .padding()
                        .background(Color(.systemGray6))
                        .cornerRadius(8)
                    }
                }
            }

            // API Keys
            SettingsSection(title: "API Keys") {
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text("Manage your API keys for programmatic access")
                            .font(.caption)
                            .foregroundColor(.secondary)

                        Spacer()

                        Button("Create New Key") {
                            showCreateAPIKey = true
                        }
                        .buttonStyle(.bordered)
                        .controlSize(.small)
                    }

                    ForEach(MockSettings.apiKeys) { key in
                        APIKeyRow(apiKey: key)
                    }
                }
            }

            // Active Sessions
            SettingsSection(title: "Active Sessions") {
                ForEach(MockSettings.loginSessions) { session in
                    EnhancedSessionRow(session: session)
                }
            }
        }
    }

    // MARK: - Login History View

    private var loginHistoryView: some View {
        SettingsSection(title: "Login History") {
            VStack(alignment: .leading, spacing: 12) {
                Text("Recent login attempts and activity")
                    .font(.caption)
                    .foregroundColor(.secondary)

                ForEach(MockSettings.loginHistory) { entry in
                    LoginHistoryRow(entry: entry)
                }
            }
        }
    }

    // MARK: - Audit Log View

    private var auditLogView: some View {
        SettingsSection(title: "Security Audit Log") {
            VStack(alignment: .leading, spacing: 12) {
                Text("Comprehensive log of security-related events")
                    .font(.caption)
                    .foregroundColor(.secondary)

                ForEach(MockSettings.securityAuditLog) { log in
                    AuditLogRow(log: log)
                }
            }
        }
    }
}

// MARK: - Supporting Views

struct EnhancedSessionRow: View {
    let session: LoginSession

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: session.deviceType == "desktop" ? "desktopcomputer" : session.deviceType == "mobile" ? "iphone" : "ipad")
                .font(.title2)
                .foregroundColor(.secondary)

            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Text(session.deviceName)
                        .font(.subheadline)
                        .fontWeight(.medium)

                    if session.isCurrent {
                        Text("CURRENT")
                            .font(.caption2)
                            .fontWeight(.bold)
                            .foregroundColor(.green)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(Color.green.opacity(0.1))
                            .cornerRadius(4)
                    }
                }

                Text(session.location)
                    .font(.caption)
                    .foregroundColor(.secondary)

                Text("IP: \(session.ipAddress)")
                    .font(.caption2)
                    .foregroundColor(.secondary)

                Text("Last active: \(formatRelativeTime(session.lastActive))")
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }

            Spacer()

            if !session.isCurrent {
                Button("Revoke") {
                    // Revoke session
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
                .tint(.red)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }

    private func formatRelativeTime(_ date: Date) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .abbreviated
        return formatter.localizedString(for: date, relativeTo: Date())
    }
}

struct APIKeyRow: View {
    let apiKey: APIKey

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(apiKey.name)
                        .font(.subheadline)
                        .fontWeight(.medium)

                    Text(apiKey.keyPreview)
                        .font(.system(.caption, design: .monospaced))
                        .foregroundColor(.secondary)
                }

                Spacer()

                Menu {
                    Button("Copy Key") {
                        // Copy action
                    }
                    Button("Delete", role: .destructive) {
                        // Delete action
                    }
                } label: {
                    Image(systemName: "ellipsis.circle")
                        .foregroundColor(.secondary)
                }
            }

            HStack {
                Text("Permissions: \(apiKey.permissions.map { $0.rawValue }.joined(separator: ", "))")
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }

            HStack {
                if let lastUsed = apiKey.lastUsed {
                    Text("Last used: \(formatRelativeTime(lastUsed))")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                } else {
                    Text("Never used")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }

                Spacer()

                if let expiresAt = apiKey.expiresAt {
                    Text("Expires: \(formatDate(expiresAt))")
                        .font(.caption2)
                        .foregroundColor(expiresAt < Date().addingTimeInterval(7 * 24 * 60 * 60) ? .orange : .secondary)
                }
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }

    private func formatRelativeTime(_ date: Date) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .abbreviated
        return formatter.localizedString(for: date, relativeTo: Date())
    }

    private func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        return formatter.string(from: date)
    }
}

struct LoginHistoryRow: View {
    let entry: LoginHistory

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: entry.success ? "checkmark.circle.fill" : "xmark.circle.fill")
                .foregroundColor(entry.success ? .green : .red)

            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(entry.eventType.capitalized)
                        .font(.subheadline)
                        .fontWeight(.medium)

                    Text(entry.success ? "Success" : "Failed")
                        .font(.caption)
                        .foregroundColor(entry.success ? .green : .red)
                }

                Text(entry.deviceName)
                    .font(.caption)
                    .foregroundColor(.secondary)

                Text("\(entry.location) • \(entry.ipAddress)")
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }

            Spacer()

            Text(formatRelativeTime(entry.timestamp))
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }

    private func formatRelativeTime(_ date: Date) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .abbreviated
        return formatter.localizedString(for: date, relativeTo: Date())
    }
}

struct AuditLogRow: View {
    let log: SecurityAuditLog

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text(log.eventType.replacingOccurrences(of: "_", with: " ").capitalized)
                    .font(.subheadline)
                    .fontWeight(.medium)

                Spacer()

                Text(formatRelativeTime(log.timestamp))
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }

            Text(log.description)
                .font(.caption)
                .foregroundColor(.secondary)

            Text("IP: \(log.ipAddress)")
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }

    private func formatRelativeTime(_ date: Date) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .full
        return formatter.localizedString(for: date, relativeTo: Date())
    }
}
