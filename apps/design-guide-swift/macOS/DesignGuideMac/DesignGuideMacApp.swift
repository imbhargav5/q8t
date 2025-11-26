import SwiftUI

@main
struct DesignGuideMacApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .frame(minWidth: 1200, minHeight: 800)
        }
        .windowStyle(.hiddenTitleBar)
        .commands {
            CommandGroup(replacing: .newItem) {}
        }

        Settings {
            UserSettingsView()
                .frame(width: 600, height: 500)
        }
    }
}

struct ContentView: View {
    @State private var selectedView: NavigationItem = .landing

    var body: some View {
        NavigationSplitView {
            // Sidebar
            SidebarView(selectedView: $selectedView)
                .navigationSplitViewColumnWidth(min: 200, ideal: 250, max: 300)
        } detail: {
            // Main Content
            DetailView(selectedView: selectedView)
        }
    }
}

enum NavigationItem: String, CaseIterable, Identifiable {
    case landing = "Home"
    case socialInbox = "Social Inbox"
    case contentCalendar = "Content Calendar"
    case feeds = "Feeds"
    case listening = "Social Listening"
    case analytics = "Analytics"
    case crm = "CRM"
    case integrations = "Integrations"
    case automations = "Automations"
    case workspace = "Workspace"
    case workspaceSettings = "Workspace Settings"
    case userSettings = "User Settings"
    case screenCapture = "Screen Capture"

    var id: String { rawValue }

    var icon: String {
        switch self {
        case .landing:
            return "house.fill"
        case .socialInbox:
            return "tray.fill"
        case .contentCalendar:
            return "calendar"
        case .feeds:
            return "rectangle.3.group"
        case .listening:
            return "ear"
        case .analytics:
            return "chart.bar.fill"
        case .crm:
            return "person.3.fill"
        case .integrations:
            return "link"
        case .automations:
            return "bolt.fill"
        case .workspace:
            return "building.2.fill"
        case .workspaceSettings:
            return "gearshape.fill"
        case .userSettings:
            return "person.circle.fill"
        case .screenCapture:
            return "record.circle"
        }
    }

    var isImplemented: Bool {
        switch self {
        case .landing, .socialInbox, .contentCalendar, .feeds, .listening, .crm, .integrations, .workspace, .workspaceSettings, .userSettings, .screenCapture:
            return true
        default:
            return false
        }
    }
}

struct SidebarView: View {
    @Binding var selectedView: NavigationItem

    var body: some View {
        List(selection: $selectedView) {
            Section("Main") {
                ForEach([NavigationItem.landing, .socialInbox, .contentCalendar, .feeds, .listening, .analytics, .crm, .automations]) { item in
                    NavigationLink(value: item) {
                        Label(item.rawValue, systemImage: item.icon)
                    }
                    .disabled(!item.isImplemented)
                    .opacity(item.isImplemented ? 1.0 : 0.5)
                }
            }

            Section("Workspace") {
                ForEach([NavigationItem.workspace, .integrations, .workspaceSettings]) { item in
                    NavigationLink(value: item) {
                        Label(item.rawValue, systemImage: item.icon)
                    }
                    .disabled(!item.isImplemented)
                    .opacity(item.isImplemented ? 1.0 : 0.5)
                }
            }

            Section("Account") {
                NavigationLink(value: NavigationItem.userSettings) {
                    Label(NavigationItem.userSettings.rawValue, systemImage: NavigationItem.userSettings.icon)
                }
            }

            Section("Tools") {
                NavigationLink(value: NavigationItem.screenCapture) {
                    Label(NavigationItem.screenCapture.rawValue, systemImage: NavigationItem.screenCapture.icon)
                }
            }
        }
        .navigationTitle("Chatsian")
        .listStyle(.sidebar)
    }
}

struct DetailView: View {
    let selectedView: NavigationItem

    var body: some View {
        Group {
            switch selectedView {
            case .landing:
                LandingPageView()
            case .socialInbox:
                SocialInboxView()
            case .contentCalendar:
                ContentCalendarView()
            case .feeds:
                FeedsView()
            case .listening:
                ListeningView()
            case .crm:
                CRMView()
            case .integrations:
                IntegrationsView()
            case .workspace:
                WorkspaceHomeView()
            case .workspaceSettings:
                WorkspaceSettingsView()
            case .userSettings:
                UserSettingsView()
            case .screenCapture:
                ScreenCaptureView()
            case .analytics, .automations:
                ComingSoonView(feature: selectedView.rawValue)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

struct ComingSoonView: View {
    let feature: String

    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "hammer.fill")
                .font(.system(size: 64))
                .foregroundColor(.secondary)

            Text("\(feature)")
                .font(.title)
                .fontWeight(.bold)

            Text("Coming Soon")
                .font(.title2)
                .foregroundColor(.secondary)

            Text("This feature is currently under development")
                .font(.body)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.windowBackgroundColor))
    }
}
