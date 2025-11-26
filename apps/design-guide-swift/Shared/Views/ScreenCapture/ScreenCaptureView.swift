import SwiftUI

enum ScreenCaptureState {
    case permissionOnboarding
    case captureSelection
    case recording
    case editor(CapturedContent)
}

struct ScreenCaptureView: View {
    @StateObject private var permissionManager = PermissionManager.shared
    @StateObject private var recorder = ScreenRecorder()
    @StateObject private var screenshotCapture = ScreenshotCapture()

    @State private var state: ScreenCaptureState = .permissionOnboarding
    @State private var captureType: CaptureType = .screenshot
    @State private var captureMode: CaptureMode = .allDisplays
    @State private var selectedTarget: CaptureTarget = .allDisplays

    @State private var regionSelectorController: RegionSelectorWindowController?
    @State private var showingRecordingOverlay = false

    var body: some View {
        Group {
            switch state {
            case .permissionOnboarding:
                PermissionOnboardingView(permissionManager: permissionManager)

            case .captureSelection:
                CaptureSelectionView(
                    recorder: recorder,
                    screenshotCapture: screenshotCapture,
                    captureType: $captureType,
                    captureMode: $captureMode,
                    selectedTarget: $selectedTarget,
                    onCapture: handleCapture
                )

            case .recording:
                RecordingView(
                    recorder: recorder,
                    onStop: handleStopRecording,
                    onCancel: handleCancelRecording
                )

            case .editor(let content):
                CaptureEditorView(
                    capturedContent: content,
                    onBack: { state = .captureSelection }
                )
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .onAppear {
            updateStateBasedOnPermissions()
        }
        .onChange(of: permissionManager.screenRecordingPermission) { _, _ in
            updateStateBasedOnPermissions()
        }
    }

    private func updateStateBasedOnPermissions() {
        if permissionManager.isOnboardingComplete {
            if case .permissionOnboarding = state {
                state = .captureSelection
            }
        } else {
            state = .permissionOnboarding
        }
    }

    private func handleCapture() {
        switch captureType {
        case .screenshot:
            handleScreenshot()
        case .recording:
            handleStartRecording()
        }
    }

    private func handleScreenshot() {
        if captureMode == .region {
            // Show region selector
            regionSelectorController = RegionSelectorWindowController()
            regionSelectorController?.showRegionSelector { rect in
                if let rect = rect {
                    Task {
                        do {
                            let content = try await screenshotCapture.captureRegion(rect)
                            await MainActor.run {
                                state = .editor(content)
                            }
                        } catch {
                            print("Screenshot failed: \(error)")
                        }
                    }
                }
                regionSelectorController = nil
            }
        } else {
            Task {
                do {
                    let content = try await screenshotCapture.captureWithTarget(selectedTarget)
                    await MainActor.run {
                        state = .editor(content)
                    }
                } catch {
                    print("Screenshot failed: \(error)")
                }
            }
        }
    }

    private func handleStartRecording() {
        if captureMode == .region {
            // Show region selector first
            regionSelectorController = RegionSelectorWindowController()
            regionSelectorController?.showRegionSelector { rect in
                if let rect = rect {
                    selectedTarget = .region(rect)
                    startRecording()
                }
                regionSelectorController = nil
            }
        } else {
            startRecording()
        }
    }

    private func startRecording() {
        recorder.selectedTarget = selectedTarget
        state = .recording

        Task {
            do {
                try await recorder.startRecording()
            } catch {
                print("Recording failed: \(error)")
                await MainActor.run {
                    state = .captureSelection
                }
            }
        }
    }

    private func handleStopRecording() {
        Task {
            if let content = await recorder.stopRecording() {
                await MainActor.run {
                    state = .editor(content)
                }
            } else {
                await MainActor.run {
                    state = .captureSelection
                }
            }
        }
    }

    private func handleCancelRecording() {
        Task {
            await recorder.cancelRecording()
            await MainActor.run {
                state = .captureSelection
            }
        }
    }
}

// MARK: - Recording View

struct RecordingView: View {
    @ObservedObject var recorder: ScreenRecorder
    let onStop: () -> Void
    let onCancel: () -> Void

    @State private var isHoveringStop = false
    @State private var isHoveringCancel = false

    var body: some View {
        VStack(spacing: 40) {
            // Recording indicator
            HStack(spacing: 16) {
                Circle()
                    .fill(Color.red)
                    .frame(width: 16, height: 16)
                    .overlay(
                        Circle()
                            .fill(Color.red.opacity(0.5))
                            .frame(width: 24, height: 24)
                            .opacity(recorder.state.isRecording ? 1 : 0)
                            .animation(.easeInOut(duration: 0.5).repeatForever(autoreverses: true), value: recorder.state.isRecording)
                    )

                Text("Recording")
                    .font(.title)
                    .fontWeight(.bold)
            }

            // Duration
            Text(formatDuration(recorder.recordingDuration))
                .font(.system(size: 64, weight: .light, design: .monospaced))
                .foregroundColor(.primary)

            // Controls
            HStack(spacing: 24) {
                // Cancel Button
                Button(action: onCancel) {
                    VStack(spacing: 8) {
                        Image(systemName: "xmark.circle.fill")
                            .font(.system(size: 48))
                            .foregroundColor(isHoveringCancel ? .red : .secondary)

                        Text("Cancel")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                }
                .buttonStyle(.plain)
                .onHover { isHoveringCancel = $0 }

                // Stop Button
                Button(action: onStop) {
                    VStack(spacing: 8) {
                        ZStack {
                            Circle()
                                .fill(Color.red)
                                .frame(width: 72, height: 72)

                            RoundedRectangle(cornerRadius: 6)
                                .fill(Color.white)
                                .frame(width: 24, height: 24)
                        }
                        .scaleEffect(isHoveringStop ? 1.1 : 1.0)

                        Text("Stop Recording")
                            .font(.subheadline)
                            .foregroundColor(.primary)
                    }
                }
                .buttonStyle(.plain)
                .onHover { isHoveringStop = $0 }
                .animation(.easeInOut(duration: 0.15), value: isHoveringStop)
            }

            // Recording info
            HStack(spacing: 24) {
                if recorder.captureAudio {
                    Label("Audio Enabled", systemImage: "mic.fill")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }

                Label(targetDescription, systemImage: targetIcon)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.windowBackgroundColor))
    }

    private func formatDuration(_ duration: TimeInterval) -> String {
        let hours = Int(duration) / 3600
        let minutes = (Int(duration) % 3600) / 60
        let seconds = Int(duration) % 60

        if hours > 0 {
            return String(format: "%02d:%02d:%02d", hours, minutes, seconds)
        }
        return String(format: "%02d:%02d", minutes, seconds)
    }

    private var targetDescription: String {
        switch recorder.selectedTarget {
        case .allDisplays:
            return "All Displays"
        case .display(let display):
            return "Display \(display.displayID)"
        case .window(let window):
            return window.title ?? "Window"
        case .region:
            return "Custom Region"
        }
    }

    private var targetIcon: String {
        switch recorder.selectedTarget {
        case .allDisplays:
            return "rectangle.on.rectangle"
        case .display:
            return "display"
        case .window:
            return "macwindow"
        case .region:
            return "crop"
        }
    }
}

#Preview("Permission Onboarding") {
    ScreenCaptureView()
        .frame(width: 800, height: 600)
}

#Preview("Recording") {
    RecordingView(
        recorder: ScreenRecorder(),
        onStop: {},
        onCancel: {}
    )
    .frame(width: 600, height: 500)
}
