import SwiftUI

struct AnalyticsView: View {
    @State private var selectedPeriod: AnalyticsPeriod = .last30Days
    @State private var showDatePicker = false
    @State private var showExport = false

    private let overview = MockAnalytics.overview

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                // Header
                headerSection

                // Key Metrics Grid (4x2)
                metricsGrid

                // Quick Insights
                quickInsights

                // Platform Performance
                platformPerformance

                // Top Posts
                topPosts

                // Activity Timeline
                activityTimeline
            }
            .padding()
        }
        .navigationTitle("Analytics")
        #if os(macOS)
        .frame(minWidth: 900, minHeight: 600)
        #endif
        .sheet(isPresented: $showDatePicker) {
            DatePickerSheet(selectedPeriod: $selectedPeriod)
        }
        .sheet(isPresented: $showExport) {
            ExportSheet()
        }
    }

    // MARK: - Header Section

    private var headerSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Analytics Overview")
                .font(.largeTitle)
                .fontWeight(.bold)

            Text("Track your social media performance across all platforms")
                .font(.subheadline)
                .foregroundColor(.secondary)

            HStack(spacing: 12) {
                Button(action: { showDatePicker = true }) {
                    Label(selectedPeriod.displayName, systemImage: "calendar")
                }
                .buttonStyle(.bordered)

                Button(action: { showExport = true }) {
                    Label("Export", systemImage: "arrow.down.doc")
                }
                .buttonStyle(.bordered)

                Spacer()
            }
            .padding(.top, 8)
        }
    }

    // MARK: - Metrics Grid

    private var metricsGrid: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Key Metrics")
                .font(.headline)

            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible()),
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 16) {
                ForEach(overview.metrics.prefix(8)) { metric in
                    MetricCard(metric: metric)
                }
            }
        }
    }

    // MARK: - Quick Insights

    private var quickInsights: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "sparkles")
                    .foregroundColor(.yellow)
                Text("Quick Insights")
                    .font(.headline)
            }

            VStack(spacing: 12) {
                ForEach(overview.insights) { insight in
                    InsightCard(insight: insight)
                }
            }
        }
    }

    // MARK: - Platform Performance

    private var platformPerformance: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Platform Performance")
                .font(.headline)

            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 16) {
                ForEach(overview.platformPerformance) { performance in
                    PlatformPerformanceCard(performance: performance)
                }
            }
        }
    }

    // MARK: - Top Posts

    private var topPosts: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Top Performing Posts")
                .font(.headline)

            VStack(spacing: 12) {
                ForEach(overview.topPosts.prefix(5)) { post in
                    TopPostCard(post: post)
                }
            }
        }
    }

    // MARK: - Activity Timeline

    private var activityTimeline: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Recent Activity")
                .font(.headline)

            VStack(alignment: .leading, spacing: 16) {
                ForEach(overview.timeline) { event in
                    TimelineEventRow(event: event)
                }
            }
        }
    }
}

// MARK: - Metric Card

struct MetricCard: View {
    let metric: AnalyticsMetric

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(metric.name)
                .font(.caption)
                .foregroundColor(.secondary)

            Text(metric.formattedValue)
                .font(.title2)
                .fontWeight(.bold)

            HStack(spacing: 4) {
                Image(systemName: trendIcon)
                    .font(.caption)
                Text("\(String(format: "%.1f", abs(metric.trend.percentage)))%")
                    .font(.caption)
            }
            .foregroundColor(trendColor)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }

    private var trendIcon: String {
        switch metric.trend.direction {
        case .up: return "arrow.up.right"
        case .down: return "arrow.down.right"
        case .neutral: return "arrow.right"
        }
    }

    private var trendColor: Color {
        switch metric.trend.direction {
        case .up: return .green
        case .down: return .red
        case .neutral: return .gray
        }
    }
}

// MARK: - Insight Card

struct InsightCard: View {
    let insight: QuickInsight

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: insightIcon)
                .font(.title3)
                .foregroundColor(insightColor)
                .frame(width: 24)

            VStack(alignment: .leading, spacing: 4) {
                Text(insight.title)
                    .font(.subheadline)
                    .fontWeight(.semibold)

                Text(insight.description)
                    .font(.caption)
                    .foregroundColor(.secondary)

                if let actionText = insight.actionText {
                    Button(actionText) {
                        // Action handler
                    }
                    .font(.caption)
                    .padding(.top, 4)
                }
            }

            Spacer()
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }

    private var insightIcon: String {
        switch insight.type {
        case .success: return "checkmark.circle.fill"
        case .warning: return "exclamationmark.triangle.fill"
        case .info: return "info.circle.fill"
        case .tip: return "lightbulb.fill"
        }
    }

    private var insightColor: Color {
        switch insight.type {
        case .success: return .green
        case .warning: return .orange
        case .info: return .blue
        case .tip: return .yellow
        }
    }
}

// MARK: - Platform Performance Card

struct PlatformPerformanceCard: View {
    let performance: PlatformPerformance

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                PlatformBadge(platform: performance.platform)
                Spacer()
                HStack(spacing: 4) {
                    Image(systemName: trendIcon)
                        .font(.caption)
                    Text("\(String(format: "%.1f", abs(performance.trend.percentage)))%")
                        .font(.caption)
                }
                .foregroundColor(trendColor)
            }

            VStack(alignment: .leading, spacing: 8) {
                StatRow(label: "Followers", value: formatNumber(performance.followers))
                StatRow(label: "Engagement", value: formatNumber(performance.engagement))
                StatRow(label: "Reach", value: formatNumber(performance.reach))
                StatRow(label: "Posts", value: "\(performance.posts)")
                StatRow(label: "Eng. Rate", value: String(format: "%.1f%%", performance.engagementRate))
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }

    private var trendIcon: String {
        switch performance.trend.direction {
        case .up: return "arrow.up.right"
        case .down: return "arrow.down.right"
        case .neutral: return "arrow.right"
        }
    }

    private var trendColor: Color {
        switch performance.trend.direction {
        case .up: return .green
        case .down: return .red
        case .neutral: return .gray
        }
    }

    private func formatNumber(_ number: Int) -> String {
        if number >= 1000000 {
            return String(format: "%.1fM", Double(number) / 1000000)
        } else if number >= 1000 {
            return String(format: "%.1fK", Double(number) / 1000)
        }
        return "\(number)"
    }
}

struct StatRow: View {
    let label: String
    let value: String

    var body: some View {
        HStack {
            Text(label)
                .font(.caption)
                .foregroundColor(.secondary)
            Spacer()
            Text(value)
                .font(.caption)
                .fontWeight(.medium)
        }
    }
}

// MARK: - Top Post Card

struct TopPostCard: View {
    let post: PostAnalytics

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            PlatformBadge(platform: post.platform)

            VStack(alignment: .leading, spacing: 6) {
                Text(post.content)
                    .font(.subheadline)
                    .lineLimit(2)

                Text(formatDate(post.publishedAt))
                    .font(.caption)
                    .foregroundColor(.secondary)

                HStack(spacing: 16) {
                    Label("\(formatNumber(post.engagement))", systemImage: "heart.fill")
                        .font(.caption)
                    Label("\(formatNumber(post.reach))", systemImage: "eye.fill")
                        .font(.caption)
                    Label(String(format: "%.1f%%", post.engagementRate), systemImage: "chart.bar.fill")
                        .font(.caption)
                }
                .foregroundColor(.secondary)
            }

            Spacer()
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }

    private func formatNumber(_ number: Int) -> String {
        if number >= 1000000 {
            return String(format: "%.1fM", Double(number) / 1000000)
        } else if number >= 1000 {
            return String(format: "%.1fK", Double(number) / 1000)
        }
        return "\(number)"
    }

    private func formatDate(_ date: Date) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .abbreviated
        return formatter.localizedString(for: date, relativeTo: Date())
    }
}

// MARK: - Timeline Event Row

struct TimelineEventRow: View {
    let event: TimelineEvent

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: eventIcon)
                .font(.title3)
                .foregroundColor(eventColor)
                .frame(width: 24)

            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(event.title)
                        .font(.subheadline)
                        .fontWeight(.semibold)

                    if let platform = event.platform {
                        PlatformBadge(platform: platform)
                            .scaleEffect(0.8)
                    }
                }

                Text(event.description)
                    .font(.caption)
                    .foregroundColor(.secondary)

                Text(formatDate(event.timestamp))
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }

            Spacer()
        }
    }

    private var eventIcon: String {
        switch event.type {
        case .milestone: return "flag.fill"
        case .alert: return "bell.fill"
        case .achievement: return "star.fill"
        }
    }

    private var eventColor: Color {
        switch event.type {
        case .milestone: return .blue
        case .alert: return .orange
        case .achievement: return .yellow
        }
    }

    private func formatDate(_ date: Date) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .full
        return formatter.localizedString(for: date, relativeTo: Date())
    }
}

// MARK: - Date Picker Sheet

struct DatePickerSheet: View {
    @Environment(\.dismiss) var dismiss
    @Binding var selectedPeriod: AnalyticsPeriod

    var body: some View {
        NavigationView {
            List(AnalyticsPeriod.allCases, id: \.self) { period in
                Button(action: {
                    selectedPeriod = period
                    dismiss()
                }) {
                    HStack {
                        Text(period.displayName)
                        Spacer()
                        if selectedPeriod == period {
                            Image(systemName: "checkmark")
                                .foregroundColor(.blue)
                        }
                    }
                }
                .buttonStyle(.plain)
            }
            .navigationTitle("Select Period")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
            }
        }
        #if os(iOS)
        .presentationDetents([.medium])
        #endif
    }
}

// MARK: - Export Sheet

struct ExportSheet: View {
    @Environment(\.dismiss) var dismiss
    @State private var selectedFormat = "PDF"
    @State private var includeCharts = true
    @State private var includeRawData = false

    private let formats = ["PDF", "CSV", "Excel"]

    var body: some View {
        NavigationView {
            Form {
                Section("Export Format") {
                    Picker("Format", selection: $selectedFormat) {
                        ForEach(formats, id: \.self) { format in
                            Text(format).tag(format)
                        }
                    }
                    #if os(iOS)
                    .pickerStyle(.segmented)
                    #endif
                }

                Section("Options") {
                    Toggle("Include Charts", isOn: $includeCharts)
                    Toggle("Include Raw Data", isOn: $includeRawData)
                }

                Section {
                    Button("Export Analytics") {
                        // Export action
                        dismiss()
                    }
                }
            }
            .navigationTitle("Export Analytics")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
            }
        }
        #if os(iOS)
        .presentationDetents([.medium])
        #endif
    }
}

// MARK: - Preview

#Preview {
    NavigationView {
        AnalyticsView()
    }
}
