import SwiftUI

struct FeedsView: View {
    @State private var selectedFeedId: String? = nil

    private let feeds = MockFeeds.shared.feeds
    private let posts = MockPosts.shared.posts

    var selectedFeed: Feed? {
        guard let id = selectedFeedId else { return feeds.first { $0.isDefault } }
        return feeds.first { $0.id == id }
    }

    var body: some View {
        VStack(spacing: 0) {
            // Header with feed selector
            HStack {
                Menu {
                    ForEach(feeds) { feed in
                        Button(action: { selectedFeedId = feed.id }) {
                            Label {
                                HStack {
                                    if let icon = feed.icon {
                                        Text(icon)
                                    }
                                    Text(feed.name)
                                }
                            } icon: {
                                if feed.isDefault {
                                    Image(systemName: "checkmark")
                                }
                            }
                        }
                    }
                } label: {
                    HStack {
                        if let feed = selectedFeed {
                            if let icon = feed.icon {
                                Text(icon)
                            }
                            Text(feed.name)
                                .font(.headline)
                        }
                        Image(systemName: "chevron.down")
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(Color(nsColor: .controlBackgroundColor))
                    .cornerRadius(8)
                }

                Spacer()

                Button(action: {}) {
                    Label("New Feed", systemImage: "plus")
                }
            }
            .padding()

            Divider()

            // Stream Columns
            if let feed = selectedFeed {
                ScrollView(.horizontal, showsIndicators: true) {
                    HStack(alignment: .top, spacing: 0) {
                        ForEach(feed.streams.sorted(by: { $0.order < $1.order })) { stream in
                            StreamColumnView(stream: stream, posts: filterPosts(for: stream))
                                .frame(width: 380)
                            Divider()
                        }
                    }
                }
            }
        }
        .navigationTitle("Feeds")
    }

    func filterPosts(for stream: StreamConfig) -> [Post] {
        var filtered = posts

        // Filter by stream type
        switch stream.streamType {
        case .scheduled:
            filtered = filtered.filter { $0.status == .scheduled }
        case .published:
            filtered = filtered.filter { $0.status == .published }
        case .drafts:
            filtered = filtered.filter { $0.status == .draft }
        case .failed:
            filtered = filtered.filter { $0.status == .failed }
        case .highEngagement:
            filtered = filtered.filter { ($0.engagement?.engagementRate ?? 0) > 0.06 }
        case .mentions:
            filtered = filtered.filter { !$0.mentions.isEmpty }
        case .home:
            break // Show all
        default:
            break
        }

        // Filter by platform
        if !stream.platformFilters.isEmpty {
            filtered = filtered.filter { post in
                !Set(post.platforms).isDisjoint(with: Set(stream.platformFilters))
            }
        }

        return filtered
    }
}

// MARK: - Stream Column View
struct StreamColumnView: View {
    let stream: StreamConfig
    let posts: [Post]

    var body: some View {
        VStack(spacing: 0) {
            // Column Header
            HStack {
                Image(systemName: streamIcon)
                    .foregroundColor(.accentColor)
                Text(stream.displayName)
                    .font(.headline)

                Spacer()

                Button(action: {}) {
                    Image(systemName: "arrow.clockwise")
                }
                .buttonStyle(PlainButtonStyle())

                Menu {
                    Button("Settings", action: {})
                    Button("Move Left", action: {})
                    Button("Move Right", action: {})
                    Divider()
                    Button("Remove", action: {})
                } label: {
                    Image(systemName: "ellipsis")
                }
                .menuStyle(BorderlessButtonMenuStyle())
            }
            .padding()
            .background(Color(nsColor: .controlBackgroundColor))

            // Filter badges
            if !stream.platformFilters.isEmpty || stream.timeRange != "all" {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack {
                        ForEach(stream.platformFilters, id: \.self) { platform in
                            Text(platform.displayName)
                                .font(.system(size: 11))
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(Color.accentColor.opacity(0.1))
                                .cornerRadius(8)
                        }
                        if stream.timeRange != "all" {
                            Text(stream.timeRange)
                                .font(.system(size: 11))
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(Color.secondary.opacity(0.1))
                                .cornerRadius(8)
                        }
                    }
                    .padding(.horizontal)
                }
                .padding(.vertical, 8)
            }

            Divider()

            // Posts
            ScrollView {
                LazyVStack(spacing: 8) {
                    ForEach(posts) { post in
                        PostCardView(post: post)
                    }
                }
                .padding()
            }
        }
    }

    var streamIcon: String {
        switch stream.streamType {
        case .home: return "house"
        case .mentions: return "at"
        case .scheduled: return "clock"
        case .published: return "checkmark.circle"
        case .drafts: return "doc.text"
        case .failed: return "exclamationmark.triangle"
        case .highEngagement: return "arrow.up.right"
        case .lowEngagement: return "arrow.down.right"
        case .platformSpecific: return "grid"
        case .hashtagSearch: return "number"
        }
    }
}

// MARK: - Post Card View
struct PostCardView: View {
    let post: Post

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            // Header
            HStack(spacing: 8) {
                AsyncImage(url: URL(string: post.authorAvatar ?? "")) { image in
                    image.resizable()
                } placeholder: {
                    Color.gray
                }
                .frame(width: 32, height: 32)
                .clipShape(Circle())

                VStack(alignment: .leading, spacing: 2) {
                    Text(post.authorName)
                        .font(.system(size: 13, weight: .medium))
                    if let scheduledFor = post.scheduledFor {
                        Text(scheduledFor, style: .relative)
                            .font(.system(size: 11))
                            .foregroundColor(.secondary)
                    } else if let publishedAt = post.publishedAt {
                        Text(publishedAt, style: .relative)
                            .font(.system(size: 11))
                            .foregroundColor(.secondary)
                    }
                }

                Spacer()

                // Platform icons
                HStack(spacing: 4) {
                    ForEach(post.platforms.prefix(3), id: \.self) { platform in
                        Image(systemName: platformIcon(platform))
                            .font(.system(size: 12))
                            .foregroundColor(Color(hex: platform.color))
                    }
                    if post.platforms.count > 3 {
                        Text("+\(post.platforms.count - 3)")
                            .font(.system(size: 10))
                            .foregroundColor(.secondary)
                    }
                }
            }

            // Content
            Text(post.content)
                .font(.system(size: 14))
                .lineLimit(4)

            // Media preview
            if let firstMedia = post.media.first {
                AsyncImage(url: URL(string: firstMedia.url)) { image in
                    image.resizable().aspectRatio(contentMode: .fill)
                } placeholder: {
                    Color.gray
                }
                .frame(height: 120)
                .clipped()
                .cornerRadius(8)
                .overlay(alignment: .topTrailing) {
                    if post.media.count > 1 {
                        Text("+\(post.media.count - 1)")
                            .font(.system(size: 11))
                            .padding(.horizontal, 6)
                            .padding(.vertical, 3)
                            .background(.ultraThinMaterial)
                            .cornerRadius(6)
                            .padding(6)
                    }
                }
            }

            // Hashtags
            if !post.hashtags.isEmpty {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 6) {
                        ForEach(post.hashtags.prefix(3), id: \.self) { hashtag in
                            Text("#\(hashtag)")
                                .font(.system(size: 11))
                                .foregroundColor(.accentColor)
                        }
                        if post.hashtags.count > 3 {
                            Text("+\(post.hashtags.count - 3) more")
                                .font(.system(size: 11))
                                .foregroundColor(.secondary)
                        }
                    }
                }
            }

            // Engagement (for published posts)
            if let engagement = post.engagement {
                HStack(spacing: 16) {
                    Label("\(engagement.likes)", systemImage: "heart")
                    Label("\(engagement.comments)", systemImage: "message")
                    Label("\(engagement.shares)", systemImage: "arrow.2.squarepath")
                }
                .font(.system(size: 11))
                .foregroundColor(.secondary)
            }

            // Status and actions
            HStack {
                PostStatusBadgeView(status: post.status)

                if post.engagement?.engagementRate ?? 0 > 0.06 {
                    Text("🔥 High Engagement")
                        .font(.system(size: 10))
                        .padding(.horizontal, 6)
                        .padding(.vertical, 3)
                        .background(Color.orange.opacity(0.2))
                        .cornerRadius(6)
                }

                Spacer()

                Button(action: {}) {
                    Image(systemName: "eye")
                }
                .buttonStyle(PlainButtonStyle())
            }
        }
        .padding(12)
        .background(Color(nsColor: .controlBackgroundColor))
        .cornerRadius(10)
    }

    func platformIcon(_ platform: SocialPlatform) -> String {
        switch platform {
        case .twitter: return "message"
        case .instagram: return "camera"
        case .linkedin: return "briefcase"
        case .facebook: return "person.3"
        case .tiktok: return "video"
        case .youtube: return "play.rectangle"
        default: return "app"
        }
    }
}

// MARK: - Post Status Badge
struct PostStatusBadgeView: View {
    let status: PostStatus

    var body: some View {
        HStack(spacing: 4) {
            Image(systemName: statusIcon)
            Text(status.displayName)
        }
        .font(.system(size: 11, weight: .medium))
        .padding(.horizontal, 8)
        .padding(.vertical, 4)
        .background(statusColor.opacity(0.2))
        .foregroundColor(statusColor)
        .cornerRadius(8)
    }

    var statusIcon: String {
        switch status {
        case .draft: return "doc.text"
        case .scheduled: return "clock"
        case .publishing: return "arrow.clockwise"
        case .published: return "checkmark.circle"
        case .failed: return "exclamationmark.triangle"
        case .archived: return "archivebox"
        }
    }

    var statusColor: Color {
        switch status {
        case .draft: return .gray
        case .scheduled: return .blue
        case .publishing: return .yellow
        case .published: return .green
        case .failed: return .red
        case .archived: return .gray
        }
    }
}
