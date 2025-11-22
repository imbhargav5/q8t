import SwiftUI

@main
struct DesignGuideiOSApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    @State private var selectedTab: Tab = .home

    var body: some View {
        TabView(selection: $selectedTab) {
            // Home Tab
            NavigationStack {
                LandingPageView()
                    .navigationTitle("Chatsian")
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

            // Workspace Tab
            NavigationStack {
                WorkspaceNavigationView()
                    .navigationTitle("Workspace")
            }
            .tabItem {
                Label("Workspace", systemImage: "building.2.fill")
            }
            .tag(Tab.workspace)

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

enum Tab {
    case home
    case inbox
    case workspace
    case more
}

struct WorkspaceNavigationView: View {
    var body: some View {
        List {
            NavigationLink(destination: WorkspaceHomeView()) {
                Label("Dashboard", systemImage: "square.grid.2x2.fill")
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
                NavigationLink(destination: ComingSoonView(feature: "Publishing")) {
                    Label("Publishing", systemImage: "calendar")
                }

                NavigationLink(destination: ComingSoonView(feature: "Analytics")) {
                    Label("Analytics", systemImage: "chart.bar.fill")
                }

                NavigationLink(destination: ComingSoonView(feature: "CRM")) {
                    Label("CRM", systemImage: "person.3.fill")
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
    }
}
