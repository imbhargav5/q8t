import SwiftUI

struct CrisisManagementView: View {
    private let overview = MockCrisisManagement.overview

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                // Header
                headerSection

                // Active Incidents
                if !overview.activeIncidents.isEmpty {
                    activeIncidentsSection
                }

                // Detection Rules
                detectionRulesSection

                // System Status
                systemStatusSection

                // Resolved Incidents
                if !overview.resolvedIncidents.isEmpty {
                    resolvedIncidentsSection
                }
            }
            .padding()
        }
        .navigationTitle("Crisis Management")
    }

    // MARK: - Header Section

    private var headerSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Crisis Management")
                        .font(.largeTitle)
                        .fontWeight(.bold)

                    Text("Monitor and manage brand crises in real-time")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }

                Spacer()

                if overview.activeIncidents.isEmpty {
                    HStack {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundColor(.green)
                        Text("All Clear")
                            .font(.headline)
                            .foregroundColor(.green)
                    }
                } else {
                    HStack {
                        Image(systemName: "exclamationmark.triangle.fill")
                            .foregroundColor(.orange)
                        Text("\(overview.activeIncidents.count) Active")
                            .font(.headline)
                            .foregroundColor(.orange)
                    }
                }
            }
        }
    }

    // MARK: - Active Incidents Section

    private var activeIncidentsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Label("Active Incidents", systemImage: "exclamationmark.triangle")
                    .font(.headline)
                    .foregroundColor(.orange)
                Spacer()
                Button("Create Manual Incident") {
                    // Create incident action
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
            }

            VStack(spacing: 12) {
                ForEach(overview.activeIncidents) { incident in
                    IncidentCard(incident: incident)
                }
            }
        }
    }

    // MARK: - Detection Rules Section

    private var detectionRulesSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Label("Detection Rules", systemImage: "shield.checkered")
                    .font(.headline)
                Spacer()
                Text("\(overview.detectionRules.filter { $0.isActive }.count) active")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            VStack(spacing: 12) {
                ForEach(overview.detectionRules.prefix(5)) { rule in
                    DetectionRuleCard(rule: rule)
                }
            }

            if overview.detectionRules.count > 5 {
                Button("View All Rules") {
                    // View all rules
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
            }
        }
    }

    // MARK: - System Status Section

    private var systemStatusSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label("System Status", systemImage: "server.rack")
                .font(.headline)

            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible()),
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 12) {
                ForEach(overview.statusComponents) { component in
                    StatusComponentCard(component: component)
                }
            }
        }
    }

    // MARK: - Resolved Incidents Section

    private var resolvedIncidentsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label("Resolved Incidents", systemImage: "checkmark.circle")
                .font(.headline)
                .foregroundColor(.green)

            VStack(spacing: 12) {
                ForEach(overview.resolvedIncidents.prefix(3)) { incident in
                    IncidentCard(incident: incident)
                }
            }

            if overview.resolvedIncidents.count > 3 {
                Button("View All Resolved Incidents") {
                    // View all resolved
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
            }
        }
    }
}

// MARK: - Incident Card

struct IncidentCard: View {
    let incident: CrisisIncident

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header
            HStack {
                Text(incident.title)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                Spacer()
                SeverityBadge(severity: incident.severity)
            }

            Text(incident.description)
                .font(.caption)
                .foregroundColor(.secondary)
                .lineLimit(2)

            // Platforms
            HStack(spacing: 6) {
                ForEach(incident.affectedPlatforms.prefix(4), id: \.self) { platform in
                    PlatformBadge(platform: platform)
                        .scaleEffect(0.7)
                }
                if incident.affectedPlatforms.count > 4 {
                    Text("+\(incident.affectedPlatforms.count - 4)")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }

            // Metrics
            HStack(spacing: 16) {
                MetricLabel(icon: "bubble.left.and.bubble.right", value: "\(incident.mentionCount)", label: "mentions")
                MetricLabel(icon: "person.3", value: formatNumber(incident.potentialReach), label: "reach")
                MetricLabel(icon: "chart.line.downtrend.xyaxis", value: String(format: "%.0f%%", abs(incident.sentimentScore) * 100), label: "negative")
            }
            .font(.caption2)

            // Footer
            HStack {
                Text(incident.status.displayName)
                    .font(.caption)
                    .fontWeight(.medium)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.orange.opacity(0.1))
                    .foregroundColor(.orange)
                    .cornerRadius(4)

                Text(formatRelativeTime(incident.detectedAt))
                    .font(.caption2)
                    .foregroundColor(.secondary)

                if let assignedTo = incident.assignedTo {
                    Spacer()
                    Label(assignedTo, systemImage: "person.circle")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }
        }
        .padding()
        .background(incident.status == .resolved ? Color(.systemGray6) : Color.orange.opacity(0.1))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(incident.status == .resolved ? Color.clear : Color.orange.opacity(0.3), lineWidth: 1)
        )
    }

    private func formatNumber(_ number: Int) -> String {
        if number >= 1000000 {
            return String(format: "%.1fM", Double(number) / 1000000)
        } else if number >= 1000 {
            return String(format: "%.1fK", Double(number) / 1000)
        }
        return "\(number)"
    }

    private func formatRelativeTime(_ date: Date) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .abbreviated
        return formatter.localizedString(for: date, relativeTo: Date())
    }
}

struct MetricLabel: View {
    let icon: String
    let value: String
    let label: String

    var body: some View {
        HStack(spacing: 4) {
            Image(systemName: icon)
            Text(value)
                .fontWeight(.medium)
            Text(label)
                .foregroundColor(.secondary)
        }
    }
}

// MARK: - Severity Badge

struct SeverityBadge: View {
    let severity: IncidentSeverity

    var body: some View {
        Text(severity.displayName.uppercased())
            .font(.caption2)
            .fontWeight(.bold)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(backgroundColor)
            .foregroundColor(.white)
            .cornerRadius(4)
    }

    private var backgroundColor: Color {
        switch severity {
        case .low: return .blue
        case .medium: return .yellow
        case .high: return .orange
        case .critical: return .red
        }
    }
}

// MARK: - Detection Rule Card

struct DetectionRuleCard: View {
    let rule: DetectionRule

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: rule.type.icon)
                .font(.title3)
                .foregroundColor(rule.isActive ? .blue : .gray)
                .frame(width: 24)

            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Text(rule.name)
                        .font(.subheadline)
                        .fontWeight(.semibold)
                    Spacer()
                    if rule.isActive {
                        Text("ACTIVE")
                            .font(.caption2)
                            .fontWeight(.bold)
                            .foregroundColor(.green)
                    } else {
                        Text("INACTIVE")
                            .font(.caption2)
                            .fontWeight(.bold)
                            .foregroundColor(.gray)
                    }
                }

                Text(rule.type.displayName)
                    .font(.caption)
                    .foregroundColor(.secondary)

                HStack(spacing: 6) {
                    ForEach(rule.platforms.prefix(4), id: \.self) { platform in
                        PlatformBadge(platform: platform)
                            .scaleEffect(0.6)
                    }
                    if rule.platforms.count > 4 {
                        Text("+\(rule.platforms.count - 4)")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                }

                HStack {
                    if let keywords = rule.keywords, !keywords.isEmpty {
                        Text("Keywords: \(keywords.prefix(3).joined(separator: ", "))")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                            .lineLimit(1)
                    }
                    if let threshold = rule.sentimentThreshold {
                        Text("Threshold: \(String(format: "%.1f", threshold))")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                    if let volume = rule.volumeThreshold {
                        Text("Volume: \(volume)+")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                }

                Text("Triggered \(rule.triggeredCount) times")
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

// MARK: - Status Component Card

struct StatusComponentCard: View {
    let component: StatusComponent

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Image(systemName: statusIcon)
                    .foregroundColor(statusColor)
                Spacer()
                Circle()
                    .fill(statusColor)
                    .frame(width: 8, height: 8)
            }

            Text(component.name)
                .font(.caption)
                .fontWeight(.medium)
                .lineLimit(1)

            Text(component.status.displayName)
                .font(.caption2)
                .foregroundColor(statusColor)
        }
        .padding(12)
        .background(Color(.systemGray6))
        .cornerRadius(8)
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
}

// MARK: - Preview

#Preview {
    NavigationView {
        CrisisManagementView()
    }
}
