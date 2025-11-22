import SwiftUI

struct IntegrationsView: View {
    @State private var selectedTab = 0
    @State private var selectedIntegration: Integration? = nil

    private let integrations = MockIntegrations.shared.integrations
    private let providers = MockIntegrations.shared.providers

    var connectedIntegrations: [Integration] {
        integrations.filter { $0.status == .connected }
    }

    var filteredIntegrations: [Integration] {
        switch selectedTab {
        case 1: // Social Media
            return integrations.filter { $0.category == .socialMedia }
        case 2: // Communication
            return integrations.filter { $0.category == .communication }
        case 3: // Productivity
            return integrations.filter { $0.category == .productivity }
        case 4: // Business
            return integrations.filter { $0.category == .business }
        case 5: // Media
            return integrations.filter { $0.category == .media }
        case 6: // Available
            return []
        default:
            return integrations
        }
    }

    var body: some View {
        VStack(spacing: 0) {
            // Tabs
            Picker("", selection: $selectedTab) {
                Text("All Connected").tag(0)
                Text("Social Media").tag(1)
                Text("Communication").tag(2)
                Text("Productivity").tag(3)
                Text("Business").tag(4)
                Text("Media").tag(5)
                Text("Available").tag(6)
            }
            .pickerStyle(.segmented)
            .padding()

            Divider()

            // Content
            if selectedTab == 6 {
                // Available providers
                ScrollView {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 300))], spacing: 16) {
                        ForEach(providers) { provider in
                            ProviderCard(provider: provider)
                        }
                    }
                    .padding()
                }
            } else {
                // Connected integrations
                if selectedIntegration != nil {
                    IntegrationDetailView(integration: $selectedIntegration)
                } else {
                    ScrollView {
                        LazyVGrid(columns: [GridItem(.adaptive(minimum: 300))], spacing: 16) {
                            ForEach(filteredIntegrations) { integration in
                                IntegrationCard(integration: integration)
                                    .onTapGesture {
                                        selectedIntegration = integration
                                    }
                            }
                        }
                        .padding()
                    }
                }
            }
        }
        .navigationTitle("Integrations")
        .toolbar {
            if selectedIntegration != nil {
                ToolbarItem(placement: .primaryAction) {
                    Button("Close") {
                        selectedIntegration = nil
                    }
                }
            }
        }
    }
}

// MARK: - Integration Card
struct IntegrationCard: View {
    let integration: Integration

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 12) {
                // Provider icon
                Circle()
                    .fill(categoryColor(integration.category))
                    .frame(width: 48, height: 48)
                    .overlay(
                        Text(String(integration.providerName.prefix(1)))
                            .foregroundColor(.white)
                            .font(.title3.bold())
                    )

                VStack(alignment: .leading, spacing: 4) {
                    Text(integration.providerName)
                        .font(.headline)
                    Text(integration.accountName)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }

                Spacer()

                IntegrationStatusBadgeView(status: integration.status)
            }

            if let lastSync = integration.lastSyncAt {
                HStack {
                    Image(systemName: "arrow.clockwise")
                        .font(.system(size: 12))
                    Text("Last synced \(lastSync, style: .relative)")
                        .font(.caption)
                }
                .foregroundColor(.secondary)
            }

            if let errorMessage = integration.errorMessage {
                Text(errorMessage)
                    .font(.caption)
                    .foregroundColor(.red)
                    .padding(8)
                    .background(Color.red.opacity(0.1))
                    .cornerRadius(6)
            }

            HStack {
                Button(integration.status == .error ? "Reconnect" : "Configure") {}
                    .buttonStyle(.bordered)
                    .foregroundColor(integration.status == .error ? .red : .primary)

                Spacer()

                Button(action: {}) {
                    Image(systemName: "arrow.clockwise")
                }
                .buttonStyle(PlainButtonStyle())
            }
        }
        .padding()
        .background(Color(nsColor: .controlBackgroundColor))
        .cornerRadius(12)
    }

    func categoryColor(_ category: IntegrationCategory) -> Color {
        switch category {
        case .socialMedia: return .blue
        case .communication: return .purple
        case .productivity: return .green
        case .business: return .orange
        case .media: return .pink
        }
    }
}

// MARK: - Provider Card
struct ProviderCard: View {
    let provider: ProviderDefinition

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 12) {
                Circle()
                    .fill(categoryColor(provider.category))
                    .frame(width: 48, height: 48)
                    .overlay(
                        Text(String(provider.name.prefix(1)))
                            .foregroundColor(.white)
                            .font(.title3.bold())
                    )

                VStack(alignment: .leading, spacing: 4) {
                    Text(provider.name)
                        .font(.headline)
                    Text(provider.category.displayName)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }

                Spacer()
            }

            Text(provider.description)
                .font(.subheadline)
                .foregroundColor(.secondary)
                .lineLimit(2)

            // Features
            VStack(alignment: .leading, spacing: 4) {
                ForEach(provider.features.prefix(3), id: \.self) { feature in
                    HStack {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundColor(.green)
                            .font(.system(size: 12))
                        Text(feature)
                            .font(.caption)
                    }
                }
            }

            Button("Connect") {}
                .frame(maxWidth: .infinity)
                .buttonStyle(.borderedProminent)
        }
        .padding()
        .background(Color(nsColor: .controlBackgroundColor))
        .cornerRadius(12)
    }

    func categoryColor(_ category: IntegrationCategory) -> Color {
        switch category {
        case .socialMedia: return .blue
        case .communication: return .purple
        case .productivity: return .green
        case .business: return .orange
        case .media: return .pink
        }
    }
}

// MARK: - Integration Detail View
struct IntegrationDetailView: View {
    @Binding var integration: Integration?

    var body: some View {
        if let integration = integration {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    // Header
                    HStack(spacing: 16) {
                        Circle()
                            .fill(.blue)
                            .frame(width: 80, height: 80)
                            .overlay(
                                Text(String(integration.providerName.prefix(1)))
                                    .foregroundColor(.white)
                                    .font(.largeTitle.bold())
                            )

                        VStack(alignment: .leading, spacing: 6) {
                            Text(integration.providerName)
                                .font(.title.bold())
                            Text(integration.accountName)
                                .font(.title3)
                                .foregroundColor(.secondary)
                            IntegrationStatusBadgeView(status: integration.status)
                        }

                        Spacer()

                        VStack(spacing: 8) {
                            Button("Refresh") {}
                                .buttonStyle(.bordered)
                            Button("Settings") {}
                                .buttonStyle(.bordered)
                        }
                    }

                    if let errorMessage = integration.errorMessage {
                        GroupBox {
                            HStack {
                                Image(systemName: "exclamationmark.triangle.fill")
                                    .foregroundColor(.red)
                                VStack(alignment: .leading, spacing: 4) {
                                    Text("Connection Error")
                                        .font(.headline)
                                    Text(errorMessage)
                                        .font(.subheadline)
                                }
                                Spacer()
                                Button("Reconnect") {}
                                    .buttonStyle(.borderedProminent)
                            }
                        }
                    }

                    // Connection Information
                    GroupBox(label: Label("Connection Information", systemImage: "link")) {
                        VStack(alignment: .leading, spacing: 12) {
                            if let connectedAt = integration.connectedAt {
                                InfoRow(icon: "calendar", label: "Connected", value: connectedAt.formatted(date: .abbreviated, time: .shortened))
                            }
                            if let lastSync = integration.lastSyncAt {
                                InfoRow(icon: "arrow.clockwise", label: "Last Sync", value: lastSync.formatted(date: .abbreviated, time: .shortened))
                            }
                            if let tokenExpiry = integration.tokenExpiresAt {
                                InfoRow(icon: "clock", label: "Token Expires", value: tokenExpiry.formatted(date: .abbreviated, time: .shortened))
                            }
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }

                    // Permissions
                    GroupBox(label: Label("Permissions", systemImage: "lock.shield")) {
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack {
                                ForEach(integration.permissions, id: \.self) { permission in
                                    Text(permission)
                                        .font(.caption)
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 6)
                                        .background(Color.accentColor.opacity(0.1))
                                        .cornerRadius(12)
                                }
                            }
                        }
                    }

                    // Usage Statistics
                    if let stats = integration.stats {
                        GroupBox(label: Label("Usage Statistics", systemImage: "chart.bar")) {
                            VStack(spacing: 16) {
                                if let apiCalls = stats.apiCallsToday, let apiLimit = stats.apiCallsLimit {
                                    VStack(alignment: .leading, spacing: 8) {
                                        HStack {
                                            Text("API Calls Today")
                                                .font(.caption.weight(.semibold))
                                            Spacer()
                                            Text("\(apiCalls) / \(apiLimit)")
                                                .font(.caption)
                                                .foregroundColor(.secondary)
                                        }
                                        ProgressView(value: Double(apiCalls), total: Double(apiLimit))
                                    }
                                }

                                if let storageUsed = stats.storageUsed, let storageLimit = stats.storageLimit {
                                    VStack(alignment: .leading, spacing: 8) {
                                        HStack {
                                            Text("Storage Used")
                                                .font(.caption.weight(.semibold))
                                            Spacer()
                                            Text("\(ByteCountFormatter.string(fromByteCount: Int64(storageUsed), countStyle: .file)) / \(ByteCountFormatter.string(fromByteCount: Int64(storageLimit), countStyle: .file))")
                                                .font(.caption)
                                                .foregroundColor(.secondary)
                                        }
                                        ProgressView(value: Double(storageUsed), total: Double(storageLimit))
                                    }
                                }

                                if let itemsSynced = stats.itemsSynced {
                                    HStack {
                                        Text("Items Synced")
                                            .font(.caption.weight(.semibold))
                                        Spacer()
                                        Text("\(itemsSynced)")
                                            .font(.headline)
                                    }
                                }
                            }
                        }
                    }

                    // Danger Zone
                    GroupBox(label: Label("Danger Zone", systemImage: "exclamationmark.triangle")) {
                        Button(action: {}) {
                            Label("Disconnect Integration", systemImage: "trash")
                                .foregroundColor(.red)
                        }
                        .frame(maxWidth: .infinity)
                    }
                }
                .padding()
            }
        }
    }
}

// MARK: - Integration Status Badge
struct IntegrationStatusBadgeView: View {
    let status: IntegrationStatus

    var body: some View {
        HStack(spacing: 4) {
            Circle()
                .fill(statusColor)
                .frame(width: 8, height: 8)
            Text(status.displayName)
                .font(.caption.weight(.medium))
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 5)
        .background(statusColor.opacity(0.2))
        .cornerRadius(12)
    }

    var statusColor: Color {
        switch status {
        case .connected: return .green
        case .disconnected: return .gray
        case .error: return .red
        case .pending: return .yellow
        }
    }
}
