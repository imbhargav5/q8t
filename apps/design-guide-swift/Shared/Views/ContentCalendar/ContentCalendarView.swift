import SwiftUI

struct ContentCalendarView: View {
    @State private var currentMonth = Date()
    @State private var selectedDate: Date? = nil
    @State private var selectedPost: Post? = nil
    @State private var viewMode = 0 // 0 = Calendar, 1 = List

    private let posts = MockPosts.shared.posts
    private let calendar = Calendar.current

    var body: some View {
        HStack(spacing: 0) {
            // Main Content
            VStack(spacing: 0) {
                // Header
                HStack {
                    Picker("", selection: $viewMode) {
                        Text("Calendar").tag(0)
                        Text("List").tag(1)
                    }
                    .pickerStyle(.segmented)
                    .frame(width: 200)

                    Spacer()

                    Button(action: {}) {
                        Label("New Post", systemImage: "plus")
                    }
                    .buttonStyle(.borderedProminent)
                }
                .padding()

                Divider()

                // Content
                if viewMode == 0 {
                    CalendarGridView(currentMonth: $currentMonth, posts: posts, selectedDate: $selectedDate, selectedPost: $selectedPost)
                } else {
                    PostListView(posts: posts, selectedPost: $selectedPost)
                }
            }

            Divider()

            // Right Sidebar
            VStack(alignment: .leading, spacing: 16) {
                if let post = selectedPost {
                    PostSidebarView(post: post)
                } else {
                    CalendarOverviewSidebar(posts: posts)
                }
            }
            .frame(width: 280)
            .padding()
        }
        .navigationTitle("Content Calendar")
    }
}

// MARK: - Calendar Grid View
struct CalendarGridView: View {
    @Binding var currentMonth: Date
    let posts: [Post]
    @Binding var selectedDate: Date?
    @Binding var selectedPost: Post?

    private let calendar = Calendar.current
    private let columns = Array(repeating: GridItem(.flexible()), count: 7)

    var body: some View {
        VStack(spacing: 0) {
            // Month navigation
            HStack {
                Button(action: { changeMonth(by: -1) }) {
                    Image(systemName: "chevron.left")
                }

                Spacer()

                Text(currentMonth, format: .dateTime.month(.wide).year())
                    .font(.headline)

                Spacer()

                Button(action: { changeMonth(by: 1) }) {
                    Image(systemName: "chevron.right")
                }

                Button("Today") {
                    currentMonth = Date()
                }
                .buttonStyle(.bordered)
            }
            .padding()

            Divider()

            // Day headers
            HStack(spacing: 0) {
                ForEach(calendar.veryShortWeekdaySymbols, id: \.self) { day in
                    Text(day)
                        .font(.caption.weight(.semibold))
                        .frame(maxWidth: .infinity)
                        .foregroundColor(.secondary)
                }
            }
            .padding(.vertical, 8)

            Divider()

            // Calendar grid
            ScrollView {
                LazyVGrid(columns: columns, spacing: 1) {
                    ForEach(daysInMonth, id: \.self) { date in
                        CalendarDayCell(date: date, posts: postsForDate(date), isCurrentMonth: isInCurrentMonth(date), isToday: calendar.isDateInToday(date), selectedPost: $selectedPost)
                            .frame(height: 120)
                            .background(Color(nsColor: .controlBackgroundColor).opacity(isInCurrentMonth(date) ? 1 : 0.3))
                    }
                }
            }
        }
    }

    var daysInMonth: [Date] {
        guard let monthInterval = calendar.dateInterval(of: .month, for: currentMonth),
              let monthFirstWeek = calendar.dateInterval(of: .weekOfMonth, for: monthInterval.start),
              let monthLastWeek = calendar.dateInterval(of: .weekOfMonth, for: monthInterval.end - 1) else {
            return []
        }

        var days: [Date] = []
        var currentDate = monthFirstWeek.start

        while currentDate < monthLastWeek.end {
            days.append(currentDate)
            currentDate = calendar.date(byAdding: .day, value: 1, to: currentDate)!
        }

        return days
    }

    func postsForDate(_ date: Date) -> [Post] {
        posts.filter { post in
            if let scheduledFor = post.scheduledFor {
                return calendar.isDate(scheduledFor, inSameDayAs: date)
            } else if let publishedAt = post.publishedAt {
                return calendar.isDate(publishedAt, inSameDayAs: date)
            }
            return false
        }
    }

    func isInCurrentMonth(_ date: Date) -> Bool {
        calendar.isDate(date, equalTo: currentMonth, toGranularity: .month)
    }

    func changeMonth(by value: Int) {
        if let newMonth = calendar.date(byAdding: .month, value: value, to: currentMonth) {
            currentMonth = newMonth
        }
    }
}

// MARK: - Calendar Day Cell
struct CalendarDayCell: View {
    let date: Date
    let posts: [Post]
    let isCurrentMonth: Bool
    let isToday: Bool
    @Binding var selectedPost: Post?

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(date, format: .dateTime.day())
                .font(.system(size: 13, weight: isToday ? .bold : .regular))
                .padding(4)
                .background(isToday ? Color.accentColor : Color.clear)
                .foregroundColor(isToday ? .white : .primary)
                .clipShape(Circle())

            ForEach(posts.prefix(3)) { post in
                Button(action: { selectedPost = post }) {
                    HStack(spacing: 4) {
                        if let scheduled = post.scheduledFor {
                            Text(scheduled, format: .dateTime.hour().minute())
                                .font(.system(size: 10))
                        }
                        PostStatusBadgeView(status: post.status)
                    }
                    Text(post.content)
                        .font(.system(size: 10))
                        .lineLimit(1)
                }
                .buttonStyle(PlainButtonStyle())
                .padding(.horizontal, 4)
                .padding(.vertical, 2)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color.accentColor.opacity(0.1))
                .cornerRadius(4)
            }

            if posts.count > 3 {
                Text("+\(posts.count - 3) more")
                    .font(.system(size: 10))
                    .foregroundColor(.secondary)
                    .padding(.horizontal, 4)
            }

            Spacer()
        }
        .padding(6)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .opacity(isCurrentMonth ? 1 : 0.4)
    }
}

// MARK: - Post List View
struct PostListView: View {
    let posts: [Post]
    @Binding var selectedPost: Post?

    var body: some View {
        ScrollView {
            LazyVStack(spacing: 8) {
                ForEach(posts) { post in
                    PostCardView(post: post)
                        .contentShape(Rectangle())
                        .onTapGesture {
                            selectedPost = post
                        }
                }
            }
            .padding()
        }
    }
}

// MARK: - Post Sidebar
struct PostSidebarView: View {
    let post: Post

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text("Post Details")
                    .font(.headline)

                PostStatusBadgeView(status: post.status)

                // Author
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
                        if let scheduled = post.scheduledFor {
                            Text("Scheduled for \(scheduled, format: .dateTime.month().day().hour().minute())")
                                .font(.system(size: 11))
                                .foregroundColor(.secondary)
                        }
                    }
                }

                Divider()

                // Platforms
                VStack(alignment: .leading, spacing: 8) {
                    Text("Platforms")
                        .font(.caption.weight(.semibold))
                        .foregroundColor(.secondary)

                    ForEach(post.platforms, id: \.self) { platform in
                        HStack {
                            Image(systemName: "circle.fill")
                                .font(.system(size: 8))
                                .foregroundColor(Color(hex: platform.color) ?? .blue)
                            Text(platform.displayName)
                                .font(.system(size: 13))
                        }
                    }
                }

                // Engagement (if published)
                if let engagement = post.engagement {
                    Divider()

                    VStack(alignment: .leading, spacing: 12) {
                        Text("Engagement")
                            .font(.caption.weight(.semibold))
                            .foregroundColor(.secondary)

                        HStack(spacing: 16) {
                            VStack {
                                Text("\(engagement.likes)")
                                    .font(.headline)
                                Text("Likes")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            VStack {
                                Text("\(engagement.comments)")
                                    .font(.headline)
                                Text("Comments")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                        }

                        HStack(spacing: 16) {
                            VStack {
                                Text("\(engagement.shares)")
                                    .font(.headline)
                                Text("Shares")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            VStack {
                                Text(String(format: "%.1f%%", engagement.engagementRate * 100))
                                    .font(.headline)
                                Text("Eng. Rate")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                        }
                    }
                }

                Divider()

                // Actions
                VStack(spacing: 8) {
                    Button("Edit") {}
                        .frame(maxWidth: .infinity)
                    Button("Duplicate") {}
                        .frame(maxWidth: .infinity)
                    Button("Delete") {}
                        .frame(maxWidth: .infinity)
                        .foregroundColor(.red)
                }
            }
        }
    }
}

// MARK: - Calendar Overview Sidebar
struct CalendarOverviewSidebar: View {
    let posts: [Post]

    var scheduledPosts: [Post] {
        posts.filter { $0.status == .scheduled }
    }

    var draftPosts: [Post] {
        posts.filter { $0.status == .draft }
    }

    var publishedPosts: [Post] {
        posts.filter { $0.status == .published }
    }

    var upcomingPosts: [Post] {
        posts.filter { post in
            if let scheduled = post.scheduledFor {
                return scheduled > Date()
            }
            return false
        }.sorted { ($0.scheduledFor ?? Date.distantFuture) < ($1.scheduledFor ?? Date.distantFuture) }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text("Overview")
                    .font(.headline)

                // Stats
                HStack(spacing: 12) {
                    StatCard(title: "Scheduled", value: "\(scheduledPosts.count)")
                    StatCard(title: "Drafts", value: "\(draftPosts.count)")
                }

                HStack(spacing: 12) {
                    StatCard(title: "Published", value: "\(publishedPosts.count)")
                    StatCard(title: "This Month", value: "\(posts.count)")
                }

                Divider()

                // Upcoming posts
                Text("Upcoming Posts")
                    .font(.caption.weight(.semibold))
                    .foregroundColor(.secondary)

                ForEach(upcomingPosts.prefix(5)) { post in
                    VStack(alignment: .leading, spacing: 4) {
                        if let scheduled = post.scheduledFor {
                            Text(scheduled, format: .dateTime.month().day().hour().minute())
                                .font(.system(size: 11))
                                .foregroundColor(.secondary)
                        }
                        PostStatusBadgeView(status: post.status)
                        Text(post.content)
                            .font(.system(size: 12))
                            .lineLimit(2)
                    }
                    .padding(8)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color(nsColor: .controlBackgroundColor))
                    .cornerRadius(6)
                }
            }
        }
    }
}

struct StatCard: View {
    let title: String
    let value: String

    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.title2.bold())
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(Color(nsColor: .controlBackgroundColor))
        .cornerRadius(8)
    }
}
