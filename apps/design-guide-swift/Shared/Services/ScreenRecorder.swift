#if os(macOS)
import Foundation
import ScreenCaptureKit
import AVFoundation
import Combine

@MainActor
class ScreenRecorder: NSObject, ObservableObject {
    // MARK: - Published Properties
    @Published private(set) var state: RecordingState = .idle
    @Published private(set) var availableDisplays: [SCDisplay] = []
    @Published private(set) var availableWindows: [SCWindow] = []
    @Published private(set) var recordingDuration: TimeInterval = 0
    @Published var selectedTarget: CaptureTarget = .allDisplays
    @Published var captureAudio: Bool = true

    // MARK: - Private Properties
    private let engine = RecordingEngine()
    private var recordingStartTime: Date?
    private var durationTimer: Timer?
    private var tempVideoURL: URL?
    private var pausedElapsedTime: TimeInterval = 0

    // MARK: - Initialization

    override init() {
        super.init()
        Task {
            await refreshAvailableContent()
        }
    }

    // MARK: - Content Refresh

    func refreshAvailableContent() async {
        do {
            let content = try await SCShareableContent.excludingDesktopWindows(false, onScreenWindowsOnly: true)
            availableDisplays = content.displays
            availableWindows = content.windows.filter { window in
                // Filter out windows without titles and system windows
                guard let title = window.title, !title.isEmpty else { return false }
                guard window.isOnScreen else { return false }
                // Filter out certain system apps
                let excludedApps = ["Dock", "Control Center", "Notification Center"]
                if let appName = window.owningApplication?.applicationName,
                   excludedApps.contains(appName) {
                    return false
                }
                return true
            }
        } catch {
            print("Failed to get shareable content: \(error)")
        }
    }

    // MARK: - Recording Control

    func startRecording() async throws {
        guard state.isIdle else { return }

        state = .preparing

        // Create temp file for recording
        let tempDir = FileManager.default.temporaryDirectory
        let outputURL = tempDir.appendingPathComponent("recording_\(UUID().uuidString).mp4")
        tempVideoURL = outputURL

        do {
            // Get stream configuration
            let (filter, config) = try await createStreamConfiguration()

            // Delegate to engine (runs off main thread)
            try await engine.startRecording(
                filter: filter,
                config: config,
                captureAudio: captureAudio && PermissionManager.shared.hasMicrophonePermission,
                outputURL: outputURL
            )

            // Update UI state on success
            recordingStartTime = Date()
            state = .recording(startTime: recordingStartTime!)
            startDurationTimer()

        } catch let error as RecordingEngine.EngineError {
            handleEngineError(error)
            throw RecordingError.from(error)
        } catch {
            state = .error("Failed to start recording: \(error.localizedDescription)")
            throw error
        }
    }

    func stopRecording() async -> CapturedContent? {
        guard state.isRecording || state.isPaused else { return nil }

        state = .processing
        stopDurationTimer()

        do {
            let outputURL = try await engine.stopRecording()

            // Create captured content
            let duration = recordingDuration
            let size = await getVideoSize(from: outputURL)

            let content = CapturedContent(
                type: .recording,
                mode: captureMode(for: selectedTarget),
                originalSize: size,
                videoURL: outputURL,
                duration: duration,
                hasAudio: captureAudio && PermissionManager.shared.hasMicrophonePermission
            )

            state = .completed(content)
            return content

        } catch let error as RecordingEngine.EngineError {
            handleEngineError(error)
            return nil
        } catch {
            state = .error("Failed to stop recording: \(error.localizedDescription)")
            return nil
        }
    }

    func cancelRecording() async {
        stopDurationTimer()
        await engine.cancelRecording()

        // Clean up temp file
        if let url = tempVideoURL {
            try? FileManager.default.removeItem(at: url)
            tempVideoURL = nil
        }

        state = .idle
    }

    func resetState() {
        state = .idle
        recordingDuration = 0
    }

    // MARK: - Pause/Resume

    func pauseRecording() {
        guard state.isRecording else { return }

        // Store elapsed time
        pausedElapsedTime = recordingDuration
        stopDurationTimer()

        state = .paused(elapsed: pausedElapsedTime)
    }

    func resumeRecording() async throws {
        guard state.isPaused else { return }

        // Adjust the start time to account for the pause
        recordingStartTime = Date().addingTimeInterval(-pausedElapsedTime)
        startDurationTimer()
        state = .recording(startTime: recordingStartTime!)
    }

    // MARK: - Private Methods

    private func createStreamConfiguration() async throws -> (SCContentFilter, SCStreamConfiguration) {
        let config = SCStreamConfiguration()

        // Set quality settings
        config.scalesToFit = true
        config.queueDepth = 5
        config.showsCursor = true

        let filter: SCContentFilter

        switch selectedTarget {
        case .allDisplays:
            guard let primaryDisplay = availableDisplays.first else {
                throw RecordingError.noDisplayAvailable
            }
            filter = SCContentFilter(display: primaryDisplay, excludingWindows: [])
            config.width = primaryDisplay.width * 2
            config.height = primaryDisplay.height * 2

        case .display(let display):
            filter = SCContentFilter(display: display, excludingWindows: [])
            config.width = display.width * 2
            config.height = display.height * 2

        case .window(let window):
            filter = SCContentFilter(desktopIndependentWindow: window)
            config.width = Int(window.frame.width) * 2
            config.height = Int(window.frame.height) * 2

        case .region(let rect):
            guard let primaryDisplay = availableDisplays.first else {
                throw RecordingError.noDisplayAvailable
            }
            filter = SCContentFilter(display: primaryDisplay, excludingWindows: [])
            config.sourceRect = rect
            config.width = Int(rect.width) * 2
            config.height = Int(rect.height) * 2

        case .application(let app):
            guard let primaryDisplay = availableDisplays.first else {
                throw RecordingError.noDisplayAvailable
            }
            // Filter windows belonging to this application
            let appWindows = availableWindows.filter { $0.owningApplication?.processID == app.processID }
            filter = SCContentFilter(display: primaryDisplay, including: appWindows)
            config.width = primaryDisplay.width * 2
            config.height = primaryDisplay.height * 2
        }

        return (filter, config)
    }

    private func handleEngineError(_ error: RecordingEngine.EngineError) {
        switch error {
        case .timeout(let operation):
            state = .error("Operation timed out: \(operation)")
        case .writerSetupFailed(let msg):
            state = .error("Writer setup failed: \(msg)")
        case .streamSetupFailed(let msg):
            state = .error("Stream setup failed: \(msg)")
        case .writingFailed(let msg):
            state = .error("Writing failed: \(msg)")
        default:
            state = .error(error.localizedDescription)
        }
    }

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

    private func getVideoSize(from url: URL) async -> CGSize {
        let asset = AVURLAsset(url: url)
        guard let track = try? await asset.loadTracks(withMediaType: .video).first,
              let size = try? await track.load(.naturalSize) else {
            return .zero
        }
        return size
    }

    private func captureMode(for target: CaptureTarget) -> CaptureMode {
        switch target {
        case .allDisplays: return .allDisplays
        case .display: return .singleDisplay
        case .window: return .window
        case .region: return .region
        case .application: return .application
        }
    }
}

// MARK: - Recording Error

enum RecordingError: LocalizedError {
    case noDisplayAvailable
    case streamCreationFailed
    case writingFailed
    case timeout

    var errorDescription: String? {
        switch self {
        case .noDisplayAvailable:
            return "No display available for recording"
        case .streamCreationFailed:
            return "Failed to create capture stream"
        case .writingFailed:
            return "Failed to write recording to file"
        case .timeout:
            return "Operation timed out"
        }
    }

    static func from(_ engineError: RecordingEngine.EngineError) -> RecordingError {
        switch engineError {
        case .writerSetupFailed, .writingFailed:
            return .writingFailed
        case .streamSetupFailed:
            return .streamCreationFailed
        case .timeout:
            return .timeout
        default:
            return .streamCreationFailed
        }
    }
}
#endif
