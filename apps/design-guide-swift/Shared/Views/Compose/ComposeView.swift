import SwiftUI

struct ComposeView: View {
    @Environment(\.dismiss) var dismiss
    @StateObject private var viewModel = ComposeViewModel()

    var body: some View {
        #if os(macOS)
        macOSLayout
        #else
        iOSLayout
        #endif
    }

    // MARK: - macOS Layout

    #if os(macOS)
    private var macOSLayout: some View {
        HSplitView {
            // Left: Accounts & Scheduling
            leftPanel
                .frame(minWidth: 300, maxWidth: 400)

            // Center: Editor
            centerPanel
                .frame(minWidth: 400)

            // Right: Preview
            rightPanel
                .frame(minWidth: 300, maxWidth: 400)
        }
        .frame(minWidth: 1000, minHeight: 700)
        .toolbar {
            ToolbarItem(placement: .cancellationAction) {
                Button("Cancel") {
                    dismiss()
                }
            }
            ToolbarItem(placement: .principal) {
                Text("Compose Post")
                    .font(.headline)
            }
            ToolbarItem(placement: .primaryAction) {
                publishButton
            }
        }
    }
    #endif

    // MARK: - iOS Layout

    #if os(iOS)
    private var iOSLayout: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    // Platform selector
                    platformSelector

                    // Editor
                    editorSection

                    // Media
                    mediaSection

                    // Scheduling
                    schedulingSection

                    // Platform customization
                    if !viewModel.draft.selectedPlatforms.isEmpty {
                        platformCustomizationSection
                    }
                }
                .padding()
            }
            .navigationTitle("Compose")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .primaryAction) {
                    publishButton
                }
            }
        }
    }
    #endif

    // MARK: - Left Panel (macOS)

    private var leftPanel: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                platformSelector
                schedulingSection
            }
            .padding()
        }
    }

    // MARK: - Center Panel

    private var centerPanel: some View {
        VStack(spacing: 0) {
            // Editor
            editorSection
                .padding()

            Divider()

            // Media
            mediaSection
                .padding()

            Divider()

            // AI Controls
            aiControlsSection
                .padding()
        }
    }

    // MARK: - Right Panel (macOS)

    private var rightPanel: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text("Preview")
                    .font(.headline)
                    .padding(.horizontal)

                if viewModel.draft.selectedPlatforms.isEmpty {
                    emptyPreview
                } else {
                    ForEach(viewModel.draft.selectedPlatforms, id: \.self) { platform in
                        PlatformPreviewCard(
                            platform: platform,
                            content: viewModel.draft.content,
                            media: viewModel.draft.media,
                            account: MockCompose.getAccount(for: platform)
                        )
                    }
                }
            }
            .padding()
        }
    }

    // MARK: - Platform Selector

    private var platformSelector: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Select Platforms")
                .font(.headline)

            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                ForEach(MockCompose.socialAccounts.prefix(8)) { account in
                    PlatformAccountButton(
                        account: account,
                        isSelected: viewModel.draft.selectedPlatforms.contains(account.platform),
                        action: {
                            viewModel.togglePlatform(account.platform)
                        }
                    )
                }
            }
        }
    }

    // MARK: - Editor Section

    private var editorSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Content")
                .font(.headline)

            TextEditor(text: $viewModel.draft.content)
                .frame(minHeight: 150)
                .padding(8)
                .background(Color(.systemGray6))
                .cornerRadius(8)
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(Color(.systemGray4), lineWidth: 1)
                )

            // Character count
            HStack {
                Spacer()
                if let limit = viewModel.currentCharacterLimit {
                    Text("\(viewModel.draft.content.count) / \(limit)")
                        .font(.caption)
                        .foregroundColor(viewModel.draft.content.count > limit ? .red : .secondary)
                } else {
                    Text("\(viewModel.draft.content.count) characters")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
        }
    }

    // MARK: - Media Section

    private var mediaSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Media")
                    .font(.headline)
                Spacer()
                Button(action: viewModel.addMedia) {
                    Label("Add Media", systemImage: "photo.on.rectangle.angled")
                        .font(.caption)
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
            }

            if !viewModel.draft.media.isEmpty {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        ForEach(viewModel.draft.media) { media in
                            MediaThumbnail(media: media) {
                                viewModel.removeMedia(media)
                            }
                        }
                    }
                }
            } else {
                EmptyMediaView(action: viewModel.addMedia)
            }
        }
    }

    // MARK: - Scheduling Section

    private var schedulingSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Scheduling")
                .font(.headline)

            Picker("When to post", selection: $viewModel.draft.schedulingOptions.scheduleType) {
                ForEach(ScheduleType.allCases, id: \.self) { type in
                    Text(type.displayName).tag(type)
                }
            }
            #if os(iOS)
            .pickerStyle(.menu)
            #endif

            if viewModel.draft.schedulingOptions.scheduleType == .schedule {
                DatePicker(
                    "Date & Time",
                    selection: Binding(
                        get: { viewModel.draft.schedulingOptions.scheduledDate ?? Date() },
                        set: { viewModel.draft.schedulingOptions.scheduledDate = $0 }
                    ),
                    in: Date()...,
                    displayedComponents: [.date, .hourAndMinute]
                )

                // Best times suggestions
                if !viewModel.draft.selectedPlatforms.isEmpty {
                    bestTimesSuggestions
                }
            }
        }
    }

    // MARK: - Best Times Suggestions

    private var bestTimesSuggestions: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Best times to post")
                .font(.caption)
                .foregroundColor(.secondary)

            ForEach(viewModel.draft.selectedPlatforms.prefix(3), id: \.self) { platform in
                if let bestTime = MockCompose.getBestTimes(for: platform).first {
                    HStack {
                        PlatformBadge(platform: platform)
                            .scaleEffect(0.8)
                        Text("\(bestTime.dayOfWeek) at \(bestTime.displayTime)")
                            .font(.caption)
                        Spacer()
                        Text("Score: \(String(format: "%.1f", bestTime.engagementScore))")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                    .padding(8)
                    .background(Color(.systemGray6))
                    .cornerRadius(6)
                }
            }
        }
    }

    // MARK: - Platform Customization Section

    private var platformCustomizationSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Platform Customization")
                .font(.headline)

            ForEach(viewModel.draft.selectedPlatforms, id: \.self) { platform in
                if let limit = PlatformLimit.limits[platform] {
                    PlatformCustomizationRow(
                        platform: platform,
                        limit: limit,
                        customization: viewModel.draft.platformCustomizations[platform]
                    )
                }
            }
        }
    }

    // MARK: - AI Controls Section

    private var aiControlsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "sparkles")
                    .foregroundColor(.purple)
                Text("AI Assistant")
                    .font(.headline)
            }

            Text("Quick Actions")
                .font(.caption)
                .foregroundColor(.secondary)

            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 8) {
                ForEach(AIAction.allCases, id: \.self) { action in
                    Button(action: {
                        viewModel.applyAIAction(action)
                    }) {
                        Label(action.displayName, systemImage: action.icon)
                            .font(.caption)
                            .frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                }
            }

            Text("Tone")
                .font(.caption)
                .foregroundColor(.secondary)

            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(AITone.allCases, id: \.self) { tone in
                        Button(tone.displayName) {
                            viewModel.applyTone(tone)
                        }
                        .buttonStyle(.bordered)
                        .controlSize(.small)
                    }
                }
            }
        }
    }

    // MARK: - Empty Preview

    private var emptyPreview: some View {
        VStack(spacing: 12) {
            Image(systemName: "eye.slash")
                .font(.largeTitle)
                .foregroundColor(.secondary)
            Text("Select platforms to see preview")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 40)
    }

    // MARK: - Publish Button

    private var publishButton: some View {
        Button(viewModel.draft.schedulingOptions.scheduleType.displayName) {
            viewModel.publish()
            dismiss()
        }
        .disabled(!viewModel.canPublish)
    }
}

// MARK: - View Model

class ComposeViewModel: ObservableObject {
    @Published var draft: ComposeDraft

    init(draft: ComposeDraft = MockCompose.sampleDraft) {
        self.draft = draft
    }

    var canPublish: Bool {
        !draft.selectedPlatforms.isEmpty && !draft.content.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var currentCharacterLimit: Int? {
        guard let firstPlatform = draft.selectedPlatforms.first,
              let limit = PlatformLimit.limits[firstPlatform] else {
            return nil
        }
        return limit.characterLimit
    }

    func togglePlatform(_ platform: SocialPlatform) {
        if let index = draft.selectedPlatforms.firstIndex(of: platform) {
            draft.selectedPlatforms.remove(at: index)
        } else {
            draft.selectedPlatforms.append(platform)
        }
    }

    func addMedia() {
        // Demo: Add sample media
        if let sampleMedia = MockCompose.sampleMedia.randomElement() {
            draft.media.append(sampleMedia)
        }
    }

    func removeMedia(_ media: ComposeMedia) {
        draft.media.removeAll { $0.id == media.id }
    }

    func applyAIAction(_ action: AIAction) {
        // Demo: Show that AI action was applied
        print("Applied AI action: \(action.displayName)")
    }

    func applyTone(_ tone: AITone) {
        // Demo: Show that tone was applied
        print("Applied tone: \(tone.displayName)")
    }

    func publish() {
        print("Publishing post to \(draft.selectedPlatforms.count) platforms")
    }
}

// MARK: - Supporting Views

struct PlatformAccountButton: View {
    let account: SocialAccount
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    PlatformBadge(platform: account.platform)
                        .scaleEffect(0.8)
                    Spacer()
                    if isSelected {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundColor(.blue)
                    }
                }

                Text(account.displayName)
                    .font(.caption)
                    .fontWeight(.medium)
                    .lineLimit(1)

                Text("\(formatNumber(account.followerCount)) followers")
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            .padding(8)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(isSelected ? Color.blue.opacity(0.1) : Color(.systemGray6))
            .cornerRadius(8)
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(isSelected ? Color.blue : Color.clear, lineWidth: 2)
            )
        }
        .buttonStyle(.plain)
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

struct MediaThumbnail: View {
    let media: ComposeMedia
    let onRemove: () -> Void

    var body: some View {
        ZStack(alignment: .topTrailing) {
            // Placeholder for media thumbnail
            RoundedRectangle(cornerRadius: 8)
                .fill(Color(.systemGray5))
                .frame(width: 100, height: 100)
                .overlay(
                    Image(systemName: media.type == .video ? "video.fill" : "photo.fill")
                        .font(.title)
                        .foregroundColor(.secondary)
                )

            // Remove button
            Button(action: onRemove) {
                Image(systemName: "xmark.circle.fill")
                    .foregroundColor(.white)
                    .background(Circle().fill(Color.black.opacity(0.5)))
            }
            .buttonStyle(.plain)
            .padding(4)
        }
    }
}

struct EmptyMediaView: View {
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 12) {
                Image(systemName: "photo.on.rectangle.angled")
                    .font(.largeTitle)
                    .foregroundColor(.secondary)
                Text("Add photos or videos")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 40)
            .background(Color(.systemGray6))
            .cornerRadius(12)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color(.systemGray4), lineWidth: 1)
                    .strokeBorder(style: StrokeStyle(lineWidth: 2, dash: [5]))
            )
        }
        .buttonStyle(.plain)
    }
}

struct PlatformCustomizationRow: View {
    let platform: SocialPlatform
    let limit: PlatformLimit
    let customization: PlatformCustomization?

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                PlatformBadge(platform: platform)
                Text("Customization")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            if limit.supportsThreads {
                Text("• Supports threads")
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            if limit.supportsFirstComment {
                Text("• Supports first comment")
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            if limit.supportsLocation {
                Text("• Supports location tags")
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            if limit.supportsUserTags {
                Text("• Supports user tags")
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
        }
        .padding(8)
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }
}

struct PlatformPreviewCard: View {
    let platform: SocialPlatform
    let content: String
    let media: [ComposeMedia]
    let account: SocialAccount?

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header
            HStack {
                PlatformBadge(platform: platform)
                Text(account?.displayName ?? "Account")
                    .font(.caption)
                    .fontWeight(.medium)
                Spacer()
                Text("Preview")
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }

            // Content
            if !content.isEmpty {
                Text(content)
                    .font(.caption)
                    .lineLimit(4)
            }

            // Media preview
            if !media.isEmpty {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        ForEach(media.prefix(4)) { item in
                            RoundedRectangle(cornerRadius: 4)
                                .fill(Color(.systemGray5))
                                .frame(width: 60, height: 60)
                                .overlay(
                                    Image(systemName: item.type == .video ? "video.fill" : "photo.fill")
                                        .font(.caption)
                                        .foregroundColor(.secondary)
                                )
                        }
                    }
                }
            }

            // Stats placeholder
            HStack(spacing: 16) {
                Label("0", systemImage: "heart")
                Label("0", systemImage: "bubble.right")
                Label("0", systemImage: "arrow.2.squarepath")
            }
            .font(.caption2)
            .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

// MARK: - Preview

#Preview {
    ComposeView()
}
