import SwiftUI

struct ListeningView: View {
    @State private var selectedQueryId: String? = nil
    @State private var selectedMentionId: String? = nil
    @State private var selectedTab = 0

    private let queries = MockListening.shared.queries
    private let mentions = MockListening.shared.mentions

    var selectedQuery: ListeningQuery? {
        guard let id = selectedQueryId else { return nil }
        return queries.first { $0.id == id }
    }

    var filteredMentions: [ListeningMention] {
        guard let queryId = selectedQueryId else { return [] }
        return mentions.filter { $0.queryId == queryId }
    }

    var body: some View {
        HStack(spacing: 0) {
            // Left Sidebar - Queries
            VStack(spacing: 0) {
                HStack {
                    Text("Listening Queries")
                        .font(.headline)
                    Spacer()
                    Button(action: {}) {
                        Image(systemName: "plus")
                    }
                }
                .padding()

                ScrollView {
                    LazyVStack(spacing: 4) {
                        ForEach(queries) { query in
                            ListeningQueryItem(query: query, isSelected: selectedQueryId == query.id)
                                .contentShape(Rectangle())
                                .onTapGesture {
                                    selectedQueryId = query.id
                                    selectedMentionId = nil
                                }
                        }
                    }
                    .padding(.horizontal, 8)
                }
            }
            .frame(width: 320)
            .background(Color(nsColor: .controlBackgroundColor))

            Divider()

            // Main Content Area
            if selectedQuery != nil {
                VStack(spacing: 0) {
                    // Tabs
                    Picker("", selection: $selectedTab) {
                        Text("Dashboard").tag(0)
                        Text("Mentions").tag(1)
                    }
                    .pickerStyle(.segmented)
                    .padding()

                    if selectedTab == 0 {
                        ListeningDashboard(query: selectedQuery!, mentions: filteredMentions)
                    } else {
                        HStack(spacing: 0) {
                            // Mentions List
                            ScrollView {
                                LazyVStack(spacing: 8) {
                                    ForEach(filteredMentions) { mention in
                                        MentionListItem(mention: mention, isSelected: selectedMentionId == mention.id)
                                            .contentShape(Rectangle())
                                            .onTapGesture {
                                                selectedMentionId = mention.id
                                            }
                                    }
                                }
                                .padding()
                            }
                            .frame(width: 384)

                            Divider()

                            // Mention Detail
                            if let selectedMention = filteredMentions.first(where: { $0.id == selectedMentionId }) {
                                MentionDetailView(mention: selectedMention)
                            } else {
                                VStack {
                                    Image(systemName: "message.badge")
                                        .font(.system(size: 48))
                                        .foregroundColor(.secondary)
                                    Text("Select a mention")
                                        .foregroundColor(.secondary)
                                }
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                            }
                        }
                    }
                }
            } else {
                VStack {
                    Image(systemName: "ear")
                        .font(.system(size: 64))
                        .foregroundColor(.secondary)
                    Text("Select a listening query")
                        .font(.title2)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
        }
        .navigationTitle("Social Listening")
    }
}

// MARK: - Listening Query Item
struct ListeningQueryItem: View {
    let query: ListeningQuery
    let isSelected: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                if let icon = query.icon {
                    Text(icon)
                }
                Text(query.name)
                    .font(.system(size: 14, weight: .medium))
                Spacer()
                if query.isStarred {
                    Image(systemName: "star.fill")
                        .font(.system(size: 10))
                        .foregroundColor(.yellow)
                }
            }

            Text(query.description)
                .font(.system(size: 12))
                .foregroundColor(.secondary)
                .lineLimit(2)

            HStack {
                Text("\(query.mentionCount24h)")
                    .font(.system(size: 13, weight: .bold))
                Text("mentions (24h)")
                    .font(.system(size: 11))
                    .foregroundColor(.secondary)

                Spacer()

                Image(systemName: trendIcon(query.trend))
                    .foregroundColor(trendColor(query.trend))
                    .font(.system(size: 10))
            }
        }
        .padding(12)
        .background(isSelected ? Color.accentColor.opacity(0.1) : Color.clear)
        .cornerRadius(8)
    }

    func trendIcon(_ trend: String) -> String {
        switch trend {
        case "up": return "arrow.up.right"
        case "down": return "arrow.down.right"
        default: return "minus"
        }
    }

    func trendColor(_ trend: String) -> Color {
        switch trend {
        case "up": return .green
        case "down": return .red
        default: return .secondary
        }
    }
}

// MARK: - Mention List Item
struct MentionListItem: View {
    let mention: ListeningMention
    let isSelected: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(spacing: 8) {
                AsyncImage(url: URL(string: mention.authorAvatarUrl ?? "")) { image in
                    image.resizable()
                } placeholder: {
                    Color.gray
                }
                .frame(width: 32, height: 32)
                .clipShape(Circle())

                VStack(alignment: .leading, spacing: 2) {
                    HStack {
                        Text(mention.authorDisplayName)
                            .font(.system(size: 13, weight: .medium))
                        if mention.authorVerified {
                            Image(systemName: "checkmark.seal.fill")
                                .font(.system(size: 10))
                                .foregroundColor(.blue)
                        }
                    }
                    Text("@\(mention.authorUsername)")
                        .font(.system(size: 11))
                        .foregroundColor(.secondary)
                }

                Spacer()

                SentimentBadge(sentiment: mention.sentiment)
            }

            Text(mention.contentPreview)
                .font(.system(size: 13))
                .lineLimit(3)

            HStack {
                Label("\(mention.likesCount)", systemImage: "heart")
                Label("\(mention.sharesCount)", systemImage: "arrow.2.squarepath")
                Label("\(mention.commentsCount)", systemImage: "message")

                Spacer()

                if mention.isViral {
                    Text("🔥 Viral")
                        .font(.system(size: 10))
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(Color.orange.opacity(0.2))
                        .cornerRadius(4)
                }
            }
            .font(.system(size: 11))
            .foregroundColor(.secondary)
        }
        .padding(12)
        .background(isSelected ? Color.accentColor.opacity(0.1) : Color(nsColor: .controlBackgroundColor))
        .cornerRadius(8)
    }
}

// MARK: - Mention Detail View
struct MentionDetailView: View {
    let mention: ListeningMention

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Author
                HStack(spacing: 12) {
                    AsyncImage(url: URL(string: mention.authorAvatarUrl ?? "")) { image in
                        image.resizable()
                    } placeholder: {
                        Color.gray
                    }
                    .frame(width: 64, height: 64)
                    .clipShape(Circle())

                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text(mention.authorDisplayName)
                                .font(.headline)
                            if mention.authorVerified {
                                Image(systemName: "checkmark.seal.fill")
                                    .foregroundColor(.blue)
                            }
                        }
                        Text("@\(mention.authorUsername)")
                            .foregroundColor(.secondary)
                        Text("\(mention.authorFollowerCount) followers")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }

                    Spacer()
                }

                // Content
                Text(mention.content)
                    .font(.body)

                // Engagement
                HStack(spacing: 24) {
                    MetricBox(title: "Likes", value: "\(mention.likesCount)")
                    MetricBox(title: "Shares", value: "\(mention.sharesCount)")
                    MetricBox(title: "Comments", value: "\(mention.commentsCount)")
                    if let views = mention.viewsCount {
                        MetricBox(title: "Views", value: "\(views)")
                    }
                }

                // Sentiment
                GroupBox(label: Label("Sentiment Analysis", systemImage: "chart.bar")) {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            SentimentBadge(sentiment: mention.sentiment)
                            Spacer()
                            Text("\(Int(mention.sentimentConfidence * 100))% confident")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }

                        Text("Keywords: \(mention.sentimentKeywords.joined(separator: ", "))")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }

                // Matched Terms
                if !mention.matchedKeywords.isEmpty {
                    GroupBox(label: Text("Matched Keywords")) {
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack {
                                ForEach(mention.matchedKeywords, id: \.self) { keyword in
                                    Text(keyword)
                                        .font(.caption)
                                        .padding(.horizontal, 8)
                                        .padding(.vertical, 4)
                                        .background(Color.blue.opacity(0.1))
                                        .cornerRadius(8)
                                }
                            }
                        }
                    }
                }

                Spacer()
            }
            .padding()
        }
    }
}

// MARK: - Listening Dashboard
struct ListeningDashboard: View {
    let query: ListeningQuery
    let mentions: [ListeningMention]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Metrics
                HStack(spacing: 16) {
                    DashboardMetric(title: "Total Mentions", value: "\(query.totalMentions)", trend: query.trend)
                    DashboardMetric(title: "24h Mentions", value: "\(query.mentionCount24h)")
                    DashboardMetric(title: "7d Mentions", value: "\(query.mentionCount7d)")
                }

                // Sentiment Distribution
                GroupBox(label: Label("Sentiment Distribution", systemImage: "chart.pie")) {
                    HStack(spacing: 16) {
                        let positive = mentions.filter { $0.sentiment == .positive }.count
                        let neutral = mentions.filter { $0.sentiment == .neutral }.count
                        let negative = mentions.filter { $0.sentiment == .negative }.count

                        SentimentBar(label: "Positive", count: positive, color: .green)
                        SentimentBar(label: "Neutral", count: neutral, color: .gray)
                        SentimentBar(label: "Negative", count: negative, color: .red)
                    }
                }

                // High Impact Mentions
                GroupBox(label: Label("High Impact Mentions", systemImage: "star")) {
                    VStack(spacing: 12) {
                        ForEach(mentions.filter { $0.isViral || $0.isInfluencer }.prefix(5)) { mention in
                            MentionListItem(mention: mention, isSelected: false)
                        }
                    }
                }
            }
            .padding()
        }
    }
}

struct DashboardMetric: View {
    let title: String
    let value: String
    var trend: String? = nil

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
            HStack {
                Text(value)
                    .font(.title.bold())
                if let trend = trend, trend != "stable" {
                    Image(systemName: trend == "up" ? "arrow.up" : "arrow.down")
                        .foregroundColor(trend == "up" ? .green : .red)
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color(nsColor: .controlBackgroundColor))
        .cornerRadius(12)
    }
}

struct SentimentBar: View {
    let label: String
    let count: Int
    let color: Color

    var body: some View {
        VStack(spacing: 4) {
            Text("\(count)")
                .font(.title2.bold())
            Text(label)
                .font(.caption)
            Rectangle()
                .fill(color)
                .frame(height: 4)
                .cornerRadius(2)
        }
        .frame(maxWidth: .infinity)
    }
}

// MARK: - Sentiment Badge
struct SentimentBadge: View {
    let sentiment: Sentiment

    var body: some View {
        Text(sentiment.displayName)
            .font(.system(size: 10, weight: .medium))
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(sentimentColor.opacity(0.2))
            .foregroundColor(sentimentColor)
            .cornerRadius(8)
    }

    var sentimentColor: Color {
        switch sentiment {
        case .positive: return .green
        case .negative: return .red
        case .neutral: return .gray
        case .mixed: return .yellow
        case .unclassified: return .gray
        }
    }
}
