//
//  ContentView.swift
//  q8t-multiplatform
//
//  Created by Bhargav Ponnapalli on 21/12/25.
//

import SwiftUI

// MARK: - iOS Implementation

#if os(iOS)
enum Tab {
    case home
    case inbox
    case calendar
    case crm
    case more
}

struct ContentView: View {
    @State private var selectedTab: Tab = .home

    var body: some View {
        TabView(selection: $selectedTab) {
            // Home Tab
            NavigationStack {
                LandingPageView()
                    .navigationTitle("q8t")
            }
            .tabItem {
                Label("Home", systemImage: "house.fill")
            }
            .tag(Tab.home)

            // Social Inbox Tab
            NavigationStack {
                SocialInboxView()
                    .navigationTitle("Inbox")
                    .navigationBarTitleDisplayMode(.inline)
            }
            .tabItem {
                Label("Inbox", systemImage: "tray.fill")
            }
            .tag(Tab.inbox)

            // Content Calendar Tab
            NavigationStack {
                ContentCalendarView()
                    .navigationTitle("Calendar")
                    .navigationBarTitleDisplayMode(.inline)
            }
            .tabItem {
                Label("Calendar", systemImage: "calendar")
            }
            .tag(Tab.calendar)

            // CRM Tab
            NavigationStack {
                CRMView()
                    .navigationTitle("CRM")
                    .navigationBarTitleDisplayMode(.inline)
            }
            .tabItem {
                Label("CRM", systemImage: "person.3.fill")
            }
            .tag(Tab.crm)

            // More Tab
            NavigationStack {
                MoreView()
                    .navigationTitle("More")
            }
            .tabItem {
                Label("More", systemImage: "ellipsis.circle.fill")
            }
            .tag(Tab.more)
        }
    }
}

struct WorkspaceNavigationView: View {
    var body: some View {
        List {
            NavigationLink(destination: WorkspaceHomeView()) {
                Label("Dashboard", systemImage: "square.grid.2x2.fill")
            }

            NavigationLink(destination: IntegrationsView()) {
                Label("Integrations", systemImage: "link")
            }

            NavigationLink(destination: WorkspaceSettingsView()) {
                Label("Settings", systemImage: "gearshape.fill")
            }
        }
    }
}

struct MoreView: View {
    var body: some View {
        List {
            Section("Features") {
                NavigationLink(destination: FeedsView()) {
                    Label("Feeds", systemImage: "rectangle.3.group")
                }

                NavigationLink(destination: ListeningView()) {
                    Label("Social Listening", systemImage: "ear")
                }

                NavigationLink(destination: ComingSoonView(feature: "Analytics")) {
                    Label("Analytics", systemImage: "chart.bar.fill")
                }

                NavigationLink(destination: ComingSoonView(feature: "Automations")) {
                    Label("Automations", systemImage: "bolt.fill")
                }
            }

            Section("Account") {
                NavigationLink(destination: UserSettingsView()) {
                    Label("User Settings", systemImage: "person.circle.fill")
                }
            }

            Section("About") {
                HStack {
                    Text("Version")
                    Spacer()
                    Text("1.0.0")
                        .foregroundColor(.secondary)
                }

                HStack {
                    Text("Platform")
                    Spacer()
                    Text("iOS")
                        .foregroundColor(.secondary)
                }
            }
        }
    }
}
#endif

// MARK: - macOS Implementation

#if os(macOS)
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

struct ContentView: View {
    @EnvironmentObject var recordingManager: MenuBarRecordingManager
    @State private var selectedView: NavigationItem = .landing
    @State private var capturedContent: CapturedContent?

    var body: some View {
        NavigationSplitView {
            // Sidebar
            SidebarView(selectedView: $selectedView)
                .navigationSplitViewColumnWidth(min: 200, ideal: 250, max: 300)
        } detail: {
            // Main Content
            DetailView(selectedView: selectedView, capturedContent: capturedContent)
        }
        .onReceive(NotificationCenter.default.publisher(for: .recordingCompleted)) { notification in
            if let content = notification.object as? CapturedContent {
                // Navigate to screen capture view with the recorded content
                capturedContent = content
                selectedView = .screenCapture

                // Bring app to front
                NSApplication.shared.activate(ignoringOtherApps: true)
            }
        }
        .onReceive(NotificationCenter.default.publisher(for: .screenshotCompleted)) { notification in
            if let content = notification.object as? CapturedContent {
                // Navigate to screen capture view with the screenshot
                capturedContent = content
                selectedView = .screenCapture

                // Bring app to front
                NSApplication.shared.activate(ignoringOtherApps: true)
            }
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
        .navigationTitle("q8t")
        .listStyle(.sidebar)
    }
}

struct DetailView: View {
    let selectedView: NavigationItem
    var capturedContent: CapturedContent?

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
                ScreenCaptureView(initialContent: capturedContent)
            case .analytics, .automations:
                ComingSoonView(feature: selectedView.rawValue)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
#endif

// MARK: - Shared Views

struct ComingSoonView: View {
    let feature: String

    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "hammer.fill")
                .font(.system(size: 64))
                .foregroundColor(.secondary)

            Text(feature)
                .font(.title)
                .fontWeight(.bold)

            Text("Coming Soon")
                .font(.title2)
                .foregroundColor(.secondary)

            Text("This feature is currently under development")
                .font(.body)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        #if os(macOS)
        .background(Color(.windowBackgroundColor))
        #endif
    }
}

#Preview {
    ContentView()
        #if os(macOS)
        .environmentObject(MenuBarRecordingManager())
        #endif
}
