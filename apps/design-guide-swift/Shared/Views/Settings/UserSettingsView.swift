import SwiftUI

enum UserSettingsTab: String, CaseIterable {
    case general = "General"
    case privacy = "Privacy"
    case security = "Security"
}

struct UserSettingsView: View {
    @State private var selectedTab: UserSettingsTab = .general

    var body: some View {
        VStack(spacing: 0) {
            // Header
            Text("User Settings")
                .font(.title)
                .fontWeight(.bold)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()

            Divider()

            // Tabs
            HStack(spacing: 0) {
                ForEach(UserSettingsTab.allCases, id: \.self) { tab in
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
                        GeneralSettingsView()
                    case .privacy:
                        PrivacySettingsView()
                    case .security:
                        SecuritySettingsView()
                    }
                }
                .padding()
            }
        }
    }
}

struct GeneralSettingsView: View {
    @State private var settings = MockSettings.generalSettings

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            SettingsSection(title: "Appearance") {
                SettingsRow(label: "Theme") {
                    Picker("Theme", selection: $settings.theme) {
                        ForEach(Theme.allCases) { theme in
                            Text(theme.displayName).tag(theme)
                        }
                    }
                    .pickerStyle(.segmented)
                    .frame(width: 200)
                }
            }

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
        }
    }
}

struct PrivacySettingsView: View {
    @State private var settings = MockSettings.privacySettings

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            SettingsSection(title: "Profile Visibility") {
                SettingsRow(label: "Show Email") {
                    Toggle("", isOn: .constant(settings.showEmail))
                        .labelsHidden()
                }

                SettingsRow(label: "Show Activity") {
                    Toggle("", isOn: .constant(settings.showActivity))
                        .labelsHidden()
                }
            }

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
        }
    }
}

struct SecuritySettingsView: View {
    @State private var twoFactorAuth = MockSettings.twoFactorAuth
    private var sessions = MockSettings.loginSessions

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            SettingsSection(title: "Two-Factor Authentication") {
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Two-Factor Authentication")
                            .font(.body)
                        Text(twoFactorAuth.enabled ? "Enabled via \(twoFactorAuth.method?.displayName ?? "")" : "Not enabled")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }

                    Spacer()

                    if twoFactorAuth.enabled {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundColor(.green)
                    }
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(8)
            }

            SettingsSection(title: "Active Sessions") {
                ForEach(sessions) { session in
                    SessionRow(session: session)
                }
            }
        }
    }
}

struct SessionRow: View {
    let session: LoginSession

    var body: some View {
        HStack {
            Image(systemName: session.deviceType == "desktop" ? "desktopcomputer" : session.deviceType == "mobile" ? "iphone" : "ipad")
                .foregroundColor(.secondary)

            VStack(alignment: .leading, spacing: 4) {
                Text(session.deviceName)
                    .font(.body)
                Text("\(session.location) • Last active \(timeAgo(session.lastActive))")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            Spacer()

            if session.isCurrent {
                Text("Current")
                    .font(.caption)
                    .foregroundColor(.green)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.green.opacity(0.1))
                    .cornerRadius(4)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }

    private func timeAgo(_ date: Date) -> String {
        let interval = Date().timeIntervalSince(date)
        let hours = Int(interval / 3600)
        let days = Int(interval / 86400)

        if hours < 1 {
            return "just now"
        } else if hours < 24 {
            return "\(hours)h ago"
        } else {
            return "\(days)d ago"
        }
    }
}

struct SettingsSection<Content: View>: View {
    let title: String
    @ViewBuilder let content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title)
                .font(.headline)

            content
        }
    }
}

struct SettingsRow<Content: View>: View {
    let label: String
    @ViewBuilder let content: Content

    var body: some View {
        HStack {
            Text(label)
                .font(.body)

            Spacer()

            content
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }
}
