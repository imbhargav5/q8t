import SwiftUI

struct AutomationsView: View {
    private let overview = MockAutomations.overview

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                // Header
                headerSection

                // Stats Grid
                statsGrid

                // RSS Feeds Section
                rssFeedsSection

                // Content Queues Section
                contentQueuesSection

                // Evergreen Content Section
                evergreenContentSection
            }
            .padding()
        }
        .navigationTitle("Automations")
    }

    // MARK: - Header Section

    private var headerSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Automations")
                .font(.largeTitle)
                .fontWeight(.bold)

            Text("Automate your social media workflows and save time")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
    }

    // MARK: - Stats Grid

    private var statsGrid: some View {
        LazyVGrid(columns: [
            GridItem(.flexible()),
            GridItem(.flexible()),
            GridItem(.flexible()),
            GridItem(.flexible())
        ], spacing: 16) {
            ForEach(overview.stats, id: \.category) { stat in
                AutomationStatCard(stat: stat)
            }
        }
    }

    // MARK: - RSS Feeds Section

    private var rssFeedsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Label("RSS Feeds", systemImage: "antenna.radiowaves.left.and.right")
                    .font(.headline)
                Spacer()
                Button("View All") {
                    // Navigate to RSS feeds list
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
            }

            VStack(spacing: 12) {
                ForEach(overview.rssFeeds.prefix(3)) { feed in
                    RSSFeedCard(feed: feed)
                }
            }
        }
    }

    // MARK: - Content Queues Section

    private var contentQueuesSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Label("Content Queues", systemImage: "list.bullet.rectangle")
                    .font(.headline)
                Spacer()
                Button("View All") {
                    // Navigate to content queues list
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
            }

            VStack(spacing: 12) {
                ForEach(overview.contentQueues.prefix(3)) { queue in
                    ContentQueueCard(queue: queue)
                }
            }
        }
    }

    // MARK: - Evergreen Content Section

    private var evergreenContentSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Label("Evergreen Content", systemImage: "arrow.triangle.2.circlepath")
                    .font(.headline)
                Spacer()
                Button("View All") {
                    // Navigate to evergreen content list
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
            }

            VStack(spacing: 12) {
                ForEach(overview.evergreenPosts.prefix(3)) { post in
                    EvergreenPostCard(post: post)
                }
            }
        }
    }
}

// MARK: - Automation Stat Card

struct AutomationStatCard: View {
    let stat: AutomationStats

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Image(systemName: stat.category.icon)
                    .foregroundColor(.blue)
                Spacer()
            }

            Text(stat.category.displayName)
                .font(.caption)
                .foregroundColor(.secondary)

            HStack(alignment: .firstTextBaseline, spacing: 4) {
                Text("\(stat.activeCount)")
                    .font(.title2)
                    .fontWeight(.bold)
                Text("active")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            HStack {
                Text("\(stat.totalActions) actions")
                    .font(.caption2)
                    .foregroundColor(.secondary)
                Spacer()
                Text(String(format: "%.1f%%", stat.successRate))
                    .font(.caption2)
                    .foregroundColor(.green)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

// MARK: - RSS Feed Card

struct RSSFeedCard: View {
    let feed: RSSFeed

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text(feed.name)
                        .font(.subheadline)
                        .fontWeight(.semibold)
                    Spacer()
                    Text(feed.status.displayName)
                        .font(.caption)
                        .fontWeight(.medium)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.blue.opacity(0.1))
                        .foregroundColor(.blue)
                        .cornerRadius(4)
                }

                Text(feed.url)
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .lineLimit(1)

                HStack(spacing: 8) {
                    ForEach(feed.platforms.prefix(3), id: \.self) { platform in
                        PlatformBadge(platform: platform)
                            .scaleEffect(0.7)
                    }
                    if feed.platforms.count > 3 {
                        Text("+\(feed.platforms.count - 3)")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                }

                HStack {
                    Label("\(feed.postsCreated) posts", systemImage: "doc.text")
                        .font(.caption2)
                        .foregroundColor(.secondary)

                    Spacer()

                    Text(String(format: "%.1f%% success", feed.successRate))
                        .font(.caption2)
                        .foregroundColor(.green)

                    if let lastFetched = feed.lastFetched {
                        Text("• \(formatRelativeTime(lastFetched))")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
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

// MARK: - Content Queue Card

struct ContentQueueCard: View {
    let queue: ContentQueue

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(queue.name)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                Spacer()
                Text(queue.status.displayName)
                    .font(.caption)
                    .fontWeight(.medium)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.blue.opacity(0.1))
                    .foregroundColor(.blue)
                    .cornerRadius(4)
            }

            Text(queue.description)
                .font(.caption)
                .foregroundColor(.secondary)
                .lineLimit(2)

            HStack(spacing: 8) {
                ForEach(queue.platforms.prefix(3), id: \.self) { platform in
                    PlatformBadge(platform: platform)
                        .scaleEffect(0.7)
                }
                if queue.platforms.count > 3 {
                    Text("+\(queue.platforms.count - 3)")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }

            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("\(queue.postsInQueue)")
                        .font(.caption)
                        .fontWeight(.medium)
                    Text("in queue")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }

                Spacer()

                VStack(alignment: .leading, spacing: 2) {
                    Text("\(queue.postsPublished)")
                        .font(.caption)
                        .fontWeight(.medium)
                    Text("published")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }

                Spacer()

                if let nextPost = queue.nextPostTime {
                    VStack(alignment: .trailing, spacing: 2) {
                        Text(formatRelativeTime(nextPost))
                            .font(.caption)
                            .fontWeight(.medium)
                        Text("next post")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
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

// MARK: - Evergreen Post Card

struct EvergreenPostCard: View {
    let post: EvergreenPost

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(post.content)
                .font(.subheadline)
                .lineLimit(3)

            HStack(spacing: 8) {
                ForEach(post.platforms.prefix(3), id: \.self) { platform in
                    PlatformBadge(platform: platform)
                        .scaleEffect(0.7)
                }
                if post.platforms.count > 3 {
                    Text("+\(post.platforms.count - 3)")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }

            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("\(post.timesPosted)")
                        .font(.caption)
                        .fontWeight(.medium)
                    Text("times posted")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }

                Spacer()

                VStack(alignment: .leading, spacing: 2) {
                    Text(formatNumber(post.performance.averageEngagement))
                        .font(.caption)
                        .fontWeight(.medium)
                    Text("avg engagement")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }

                Spacer()

                VStack(alignment: .trailing, spacing: 2) {
                    Text(String(format: "%.1f%%", post.performance.engagementRate))
                        .font(.caption)
                        .fontWeight(.medium)
                        .foregroundColor(.green)
                    Text("eng. rate")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }

            if let nextScheduled = post.nextScheduled {
                HStack {
                    Image(systemName: "clock")
                        .font(.caption2)
                    Text("Next: \(formatRelativeTime(nextScheduled))")
                        .font(.caption2)
                    Spacer()
                    Text("Every \(post.recycleIntervalDays) days")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
                .foregroundColor(.secondary)
            }
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

    private func formatRelativeTime(_ date: Date) -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .abbreviated
        return formatter.localizedString(for: date, relativeTo: Date())
    }
}

// MARK: - Preview

#Preview {
    NavigationView {
        AutomationsView()
    }
}
