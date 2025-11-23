import SwiftUI

struct StatusPageView: View {
    private let components = MockCrisisManagement.statusComponents
    private var overallStatus: ComponentStatus {
        // Determine overall status based on components
        if components.contains(where: { $0.status == .outage }) {
            return .outage
        } else if components.contains(where: { $0.status == .degraded }) {
            return .degraded
        } else if components.contains(where: { $0.status == .maintenance }) {
            return .maintenance
        }
        return .operational
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 32) {
                // Header with overall status
                headerSection

                // Components Grid
                componentsSection

                // Status Updates Timeline
                timelineSection
            }
            .padding()
        }
        .navigationTitle("System Status")
    }

    // MARK: - Header Section

    private var headerSection: some View {
        VStack(spacing: 16) {
            // Status Icon
            Image(systemName: overallStatusIcon)
                .font(.system(size: 60))
                .foregroundColor(overallStatusColor)

            // Status Text
            Text(overallStatusMessage)
                .font(.title)
                .fontWeight(.bold)

            Text("All systems are operating normally")
                .font(.subheadline)
                .foregroundColor(.secondary)

            // Last Updated
            Text("Last updated: \(formatTime(Date()))")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 32)
    }

    // MARK: - Components Section

    private var componentsSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("System Components")
                .font(.headline)

            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 16) {
                ForEach(components) { component in
                    StatusComponentDetailCard(component: component)
                }
            }
        }
    }

    // MARK: - Timeline Section

    private var timelineSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Recent Updates")
                .font(.headline)

            VStack(alignment: .leading, spacing: 16) {
                // Sample status updates
                StatusUpdateRow(
                    title: "All Systems Operational",
                    description: "All systems are running smoothly with no reported issues.",
                    timestamp: Date().addingTimeInterval(-3600),
                    severity: .operational
                )

                StatusUpdateRow(
                    title: "Scheduled Maintenance Complete",
                    description: "Database maintenance has been completed successfully. All services are back online.",
                    timestamp: Date().addingTimeInterval(-86400),
                    severity: .operational
                )

                StatusUpdateRow(
                    title: "Scheduled Maintenance",
                    description: "Database maintenance scheduled for low-traffic hours. Expected duration: 2 hours.",
                    timestamp: Date().addingTimeInterval(-86400 - 7200),
                    severity: .maintenance
                )
            }
        }
    }

    // MARK: - Computed Properties

    private var overallStatusIcon: String {
        switch overallStatus {
        case .operational: return "checkmark.circle.fill"
        case .degraded: return "exclamationmark.triangle.fill"
        case .outage: return "xmark.circle.fill"
        case .maintenance: return "wrench.and.screwdriver.fill"
        }
    }

    private var overallStatusColor: Color {
        switch overallStatus {
        case .operational: return .green
        case .degraded: return .yellow
        case .outage: return .red
        case .maintenance: return .blue
        }
    }

    private var overallStatusMessage: String {
        switch overallStatus {
        case .operational: return "All Systems Operational"
        case .degraded: return "Degraded Performance"
        case .outage: return "Service Outage"
        case .maintenance: return "Under Maintenance"
        }
    }

    private func formatTime(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
}

// MARK: - Status Component Detail Card

struct StatusComponentDetailCard: View {
    let component: StatusComponent

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(component.name)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                Spacer()
                Circle()
                    .fill(statusColor)
                    .frame(width: 10, height: 10)
            }

            HStack {
                Image(systemName: statusIcon)
                    .foregroundColor(statusColor)
                Text(component.status.displayName)
                    .font(.caption)
                    .foregroundColor(statusColor)
            }

            if let description = component.description {
                Text(description)
                    .font(.caption2)
                    .foregroundColor(.secondary)
                    .lineLimit(2)
            }

            Text("Updated \(formatRelativeTime(component.lastUpdated))")
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }

    private var statusIcon: String {
        switch component.status {
        case .operational: return "checkmark.circle.fill"
        case .degraded: return "exclamationmark.triangle.fill"
        case .outage: return "xmark.circle.fill"
        case .maintenance: return "wrench.and.screwdriver.fill"
        }
    }

    private var statusColor: Color {
        switch component.status {
        case .operational: return .green
        case .degraded: return .yellow
        case .outage: return .red
        case .maintenance: return .blue
        }
    }

    private func formatRelativeTime(_ date: Date) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .abbreviated
        return formatter.localizedString(for: date, relativeTo: Date())
    }
}

// MARK: - Status Update Row

struct StatusUpdateRow: View {
    let title: String
    let description: String
    let timestamp: Date
    let severity: ComponentStatus

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            // Timeline dot
            VStack {
                Circle()
                    .fill(severityColor)
                    .frame(width: 12, height: 12)
                Rectangle()
                    .fill(Color(.systemGray4))
                    .frame(width: 2)
            }

            VStack(alignment: .leading, spacing: 8) {
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.semibold)

                Text(description)
                    .font(.caption)
                    .foregroundColor(.secondary)

                Text(formatTime(timestamp))
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            .padding(.bottom, 12)
        }
    }

    private var severityColor: Color {
        switch severity {
        case .operational: return .green
        case .degraded: return .yellow
        case .outage: return .red
        case .maintenance: return .blue
        }
    }

    private func formatTime(_ date: Date) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .full
        return formatter.localizedString(for: date, relativeTo: Date())
    }
}

// MARK: - Preview

#Preview {
    NavigationView {
        StatusPageView()
    }
}
