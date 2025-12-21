#if os(macOS)
import SwiftUI
import ScreenCaptureKit

struct RecordingConfigurationView: View {
    @ObservedObject var manager: MenuBarRecordingManager
    @Environment(\.dismiss) private var dismiss

    @State private var selectedMode: CaptureMode = .allDisplays
    @State private var selectedTarget: CaptureTarget = .allDisplays
    @State private var captureAudio: Bool = true
    @State private var isLoading = true

    var body: some View {
        VStack(spacing: 0) {
            // Header
            headerView

            Divider()

            // Content
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    // Capture Mode Selection
                    captureModeSection

                    // Target Selection (based on mode)
                    targetSelectionSection

                    // Audio Toggle
                    audioSection
                }
                .padding(24)
            }

            Divider()

            // Footer with actions
            footerView
        }
        .frame(width: 400, height: 500)
        .background(Color(.windowBackgroundColor))
        .task {
            await loadContent()
        }
    }

    // MARK: - Header

    private var headerView: some View {
        HStack {
            Text("Configure Recording")
                .font(.headline)

            Spacer()

            Button(action: { dismiss() }) {
                Image(systemName: "xmark.circle.fill")
                    .foregroundColor(.secondary)
            }
            .buttonStyle(.plain)
        }
        .padding()
    }

    // MARK: - Capture Mode Section

    private var captureModeSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("What to Record")
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(.secondary)

            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 12) {
                ForEach(CaptureMode.allCases) { mode in
                    CaptureModeCard(
                        mode: mode,
                        isSelected: selectedMode == mode,
                        action: {
                            selectedMode = mode
                            updateTargetForMode(mode)
                        }
                    )
                }
            }
        }
    }

    // MARK: - Target Selection Section

    @ViewBuilder
    private var targetSelectionSection: some View {
        if isLoading {
            HStack {
                Spacer()
                ProgressView()
                    .scaleEffect(0.8)
                Text("Loading...")
                    .foregroundColor(.secondary)
                Spacer()
            }
            .padding(.vertical, 20)
        } else {
            switch selectedMode {
            case .allDisplays:
                allDisplaysPreview

            case .singleDisplay:
                displaySelection

            case .window:
                windowSelection

            case .region:
                regionSelection

            case .application:
                allDisplaysPreview // Fallback to all displays preview for application mode
            }
        }
    }

    private var allDisplaysPreview: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("All Displays")
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(.secondary)

            HStack(spacing: 8) {
                ForEach(Array(manager.recorder.availableDisplays.enumerated()), id: \.offset) { index, display in
                    DisplayCard(display: display, displayNumber: index + 1, isSelected: true)
                }
            }
        }
    }

    private var displaySelection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Select Display")
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(.secondary)

            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 12) {
                    ForEach(Array(manager.recorder.availableDisplays.enumerated()), id: \.offset) { index, display in
                        DisplayCard(
                            display: display,
                            displayNumber: index + 1,
                            isSelected: isDisplaySelected(display)
                        )
                        .onTapGesture {
                            selectedTarget = .display(display)
                        }
                    }
                }
            }
        }
    }

    private var windowSelection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Select Window")
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(.secondary)

            if manager.recorder.availableWindows.isEmpty {
                Text("No windows available")
                    .foregroundColor(.secondary)
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.vertical, 20)
            } else {
                ScrollView {
                    LazyVStack(spacing: 8) {
                        ForEach(manager.recorder.availableWindows, id: \.windowID) { window in
                            WindowCard(
                                window: window,
                                isSelected: isWindowSelected(window)
                            )
                            .onTapGesture {
                                selectedTarget = .window(window)
                            }
                        }
                    }
                }
                .frame(maxHeight: 200)
            }
        }
    }

    private var regionSelection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Select Region")
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(.secondary)

            Button(action: selectRegion) {
                HStack {
                    Image(systemName: "crop")
                    Text("Click to select screen region...")
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color(.controlBackgroundColor))
                .cornerRadius(8)
            }
            .buttonStyle(.plain)

            if case .region(let rect) = selectedTarget {
                Text("Selected: \(Int(rect.width)) × \(Int(rect.height))")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
    }

    // MARK: - Audio Section

    private var audioSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Options")
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(.secondary)

            Toggle(isOn: $captureAudio) {
                HStack {
                    Image(systemName: "mic.fill")
                    Text("Record microphone audio")
                }
            }
            .toggleStyle(.switch)
            .disabled(!PermissionManager.shared.hasMicrophonePermission)

            if !PermissionManager.shared.hasMicrophonePermission {
                Text("Microphone permission required")
                    .font(.caption)
                    .foregroundColor(.orange)
            }
        }
    }

    // MARK: - Footer

    private var footerView: some View {
        HStack {
            Button("Cancel") {
                dismiss()
            }
            .keyboardShortcut(.cancelAction)

            Spacer()

            Button(action: startRecording) {
                HStack {
                    Image(systemName: "record.circle")
                    Text("Start Recording")
                }
            }
            .buttonStyle(.borderedProminent)
            .keyboardShortcut(.defaultAction)
            .disabled(!canStartRecording)
        }
        .padding()
    }

    // MARK: - Actions

    private func loadContent() async {
        isLoading = true
        await manager.refreshContent()
        isLoading = false

        // Set default target
        updateTargetForMode(selectedMode)
    }

    private func updateTargetForMode(_ mode: CaptureMode) {
        switch mode {
        case .allDisplays:
            selectedTarget = .allDisplays
        case .singleDisplay:
            if let first = manager.recorder.availableDisplays.first {
                selectedTarget = .display(first)
            }
        case .window:
            if let first = manager.recorder.availableWindows.first {
                selectedTarget = .window(first)
            }
        case .region:
            // Keep existing region or wait for selection
            if case .region = selectedTarget {
                // Keep it
            } else {
                // Will need to select
            }
        case .application:
            selectedTarget = .allDisplays // Default fallback for application mode
        }
    }

    private func selectRegion() {
        dismiss()

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            let controller = RegionSelectorWindowController()
            controller.showRegionSelector { rect in
                if let rect = rect {
                    self.selectedTarget = .region(rect)
                    self.manager.recorder.captureAudio = self.captureAudio
                    self.manager.startRecordingFlow(with: .region(rect))
                }
            }
        }
    }

    private func startRecording() {
        manager.recorder.captureAudio = captureAudio
        dismiss()

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            manager.startRecordingFlow(with: selectedTarget)
        }
    }

    // MARK: - Helpers

    private var canStartRecording: Bool {
        switch selectedMode {
        case .allDisplays:
            return !manager.recorder.availableDisplays.isEmpty
        case .singleDisplay:
            if case .display = selectedTarget { return true }
            return false
        case .window:
            if case .window = selectedTarget { return true }
            return false
        case .region:
            if case .region = selectedTarget { return true }
            return false
        case .application:
            return true
        }
    }

    private func isDisplaySelected(_ display: SCDisplay) -> Bool {
        if case .display(let selected) = selectedTarget {
            return selected.displayID == display.displayID
        }
        return false
    }

    private func isWindowSelected(_ window: SCWindow) -> Bool {
        if case .window(let selected) = selectedTarget {
            return selected.windowID == window.windowID
        }
        return false
    }
}

// MARK: - Capture Mode Card

struct CaptureModeCard: View {
    let mode: CaptureMode
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 8) {
                Image(systemName: mode.icon)
                    .font(.title2)

                Text(mode.displayName)
                    .font(.caption)
                    .lineLimit(1)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(isSelected ? Color.accentColor.opacity(0.2) : Color(.controlBackgroundColor))
            .cornerRadius(8)
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(isSelected ? Color.accentColor : Color.clear, lineWidth: 2)
            )
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Display Card

struct DisplayCard: View {
    let display: SCDisplay
    let displayNumber: Int
    let isSelected: Bool

    var body: some View {
        VStack(spacing: 4) {
            RoundedRectangle(cornerRadius: 4)
                .fill(Color(.controlBackgroundColor))
                .frame(width: 80, height: 50)
                .overlay(
                    Image(systemName: "display")
                        .font(.title2)
                        .foregroundColor(.secondary)
                )

            Text("Display \(displayNumber)")
                .font(.caption)

            Text("\(display.width) × \(display.height)")
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .padding(8)
        .background(isSelected ? Color.accentColor.opacity(0.2) : Color.clear)
        .cornerRadius(8)
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(isSelected ? Color.accentColor : Color.clear, lineWidth: 2)
        )
    }
}

// MARK: - Window Card

struct WindowCard: View {
    let window: SCWindow
    let isSelected: Bool

    var body: some View {
        HStack(spacing: 12) {
            // App Icon placeholder
            RoundedRectangle(cornerRadius: 4)
                .fill(Color(.controlBackgroundColor))
                .frame(width: 32, height: 32)
                .overlay(
                    Image(systemName: "macwindow")
                        .foregroundColor(.secondary)
                )

            VStack(alignment: .leading, spacing: 2) {
                Text(window.owningApplication?.applicationName ?? "Unknown App")
                    .font(.subheadline)
                    .fontWeight(.medium)

                Text(window.title ?? "Untitled")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .lineLimit(1)
            }

            Spacer()

            if isSelected {
                Image(systemName: "checkmark.circle.fill")
                    .foregroundColor(.accentColor)
            }
        }
        .padding(8)
        .background(isSelected ? Color.accentColor.opacity(0.1) : Color(.controlBackgroundColor))
        .cornerRadius(8)
    }
}

#Preview {
    RecordingConfigurationView(manager: MenuBarRecordingManager())
}
#endif
