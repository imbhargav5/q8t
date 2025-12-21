#if os(macOS)
import Foundation
import SwiftUI
import Combine
import ScreenCaptureKit

// MARK: - Menu Bar Recording State
enum MenuBarRecordingState: Equatable {
    case idle
    case configuring
    case countdown(Int)
    case recording
    case paused
    case processing

    var isRecording: Bool {
        if case .recording = self { return true }
        return false
    }

    var isPaused: Bool {
        if case .paused = self { return true }
        return false
    }

    var isIdle: Bool {
        if case .idle = self { return true }
        return false
    }

    var isCountingDown: Bool {
        if case .countdown = self { return true }
        return false
    }
}

// MARK: - Recording Completed Notification
extension Notification.Name {
    static let recordingCompleted = Notification.Name("recordingCompleted")
}

// MARK: - Menu Bar Recording Manager
@MainActor
class MenuBarRecordingManager: ObservableObject {
    // MARK: - Published Properties
    @Published var menuBarState: MenuBarRecordingState = .idle
    @Published var countdownValue: Int = 0
    @Published var pendingTarget: CaptureTarget?
    @Published var recordingDuration: TimeInterval = 0

    // MARK: - Services
    let recorder = ScreenRecorder()
    private var countdownOverlayController: CountdownOverlayWindowController?

    // MARK: - Private Properties
    private var durationTimer: Timer?
    private var recordingStartTime: Date?
    private var pausedElapsedTime: TimeInterval = 0

    // MARK: - Initialization
    init() {
        // Observe recorder state changes
        setupRecorderObservation()
    }

    private func setupRecorderObservation() {
        // We'll sync our state with the recorder's state
    }

    // MARK: - Recording Flow

    /// Start the recording flow with countdown
    func startRecordingFlow(with target: CaptureTarget) {
        pendingTarget = target
        recorder.selectedTarget = target

        // Start countdown
        showCountdown()
    }

    /// Start recording immediately without countdown
    func startRecordingImmediately() async {
        guard let target = pendingTarget else { return }

        recorder.selectedTarget = target
        menuBarState = .recording
        recordingStartTime = Date()
        startDurationTimer()

        do {
            try await recorder.startRecording()
        } catch {
            print("Failed to start recording: \(error)")
            menuBarState = .idle
            stopDurationTimer()
        }
    }

    /// Show countdown overlay
    private func showCountdown() {
        menuBarState = .countdown(3)
        countdownValue = 3

        countdownOverlayController = CountdownOverlayWindowController()
        countdownOverlayController?.showCountdown { [weak self] in
            Task { @MainActor [weak self] in
                await self?.startRecordingImmediately()
            }
        }
    }

    /// Stop the current recording
    func stopRecording() async -> CapturedContent? {
        stopDurationTimer()
        menuBarState = .processing

        let content = await recorder.stopRecording()

        if let content = content {
            menuBarState = .idle
            // Post notification for main app to navigate to editor
            NotificationCenter.default.post(
                name: .recordingCompleted,
                object: content
            )
            return content
        } else {
            menuBarState = .idle
            return nil
        }
    }

    /// Cancel the current recording
    func cancelRecording() async {
        stopDurationTimer()
        await recorder.cancelRecording()
        menuBarState = .idle
        recordingDuration = 0
    }

    /// Pause the current recording
    func pauseRecording() {
        guard menuBarState.isRecording else { return }

        pausedElapsedTime = recordingDuration
        stopDurationTimer()
        recorder.pauseRecording()
        menuBarState = .paused
    }

    /// Resume the paused recording
    func resumeRecording() async {
        guard menuBarState.isPaused else { return }

        do {
            try await recorder.resumeRecording()
            recordingStartTime = Date().addingTimeInterval(-pausedElapsedTime)
            startDurationTimer()
            menuBarState = .recording
        } catch {
            print("Failed to resume recording: \(error)")
        }
    }

    // MARK: - Duration Timer

    private func startDurationTimer() {
        durationTimer = Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true) { [weak self] _ in
            Task { @MainActor [weak self] in
                guard let self = self, let startTime = self.recordingStartTime else { return }
                self.recordingDuration = Date().timeIntervalSince(startTime)
            }
        }
    }

    private func stopDurationTimer() {
        durationTimer?.invalidate()
        durationTimer = nil
    }

    // MARK: - Helpers

    var formattedDuration: String {
        let totalSeconds = Int(recordingDuration)
        let hours = totalSeconds / 3600
        let minutes = (totalSeconds % 3600) / 60
        let seconds = totalSeconds % 60

        if hours > 0 {
            return String(format: "%02d:%02d:%02d", hours, minutes, seconds)
        } else {
            return String(format: "%02d:%02d", minutes, seconds)
        }
    }

    /// Refresh available displays and windows
    func refreshContent() async {
        await recorder.refreshAvailableContent()
    }
}
#endif
