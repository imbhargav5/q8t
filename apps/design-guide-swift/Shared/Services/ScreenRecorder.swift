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
    private var stream: SCStream?
    private var streamOutput: CaptureStreamOutput?
    private var assetWriter: AVAssetWriter?
    private var videoInput: AVAssetWriterInput?
    private var audioInput: AVAssetWriterInput?
    private var recordingStartTime: Date?
    private var durationTimer: Timer?
    private var tempVideoURL: URL?

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
        tempVideoURL = tempDir.appendingPathComponent("recording_\(UUID().uuidString).mp4")

        guard let outputURL = tempVideoURL else {
            state = .error("Failed to create temp file")
            return
        }

        do {
            // Setup asset writer
            assetWriter = try AVAssetWriter(url: outputURL, fileType: .mp4)

            // Get stream configuration
            let (filter, config) = try await createStreamConfiguration()

            // Setup video input
            let videoSettings: [String: Any] = [
                AVVideoCodecKey: AVVideoCodecType.h264,
                AVVideoWidthKey: config.width,
                AVVideoHeightKey: config.height
            ]
            videoInput = AVAssetWriterInput(mediaType: .video, outputSettings: videoSettings)
            videoInput?.expectsMediaDataInRealTime = true

            if let videoInput = videoInput {
                assetWriter?.add(videoInput)
            }

            // Setup audio input if enabled
            if captureAudio && PermissionManager.shared.hasOptionalMicrophonePermission {
                let audioSettings: [String: Any] = [
                    AVFormatIDKey: kAudioFormatMPEG4AAC,
                    AVSampleRateKey: 44100,
                    AVNumberOfChannelsKey: 2
                ]
                audioInput = AVAssetWriterInput(mediaType: .audio, outputSettings: audioSettings)
                audioInput?.expectsMediaDataInRealTime = true

                if let audioInput = audioInput {
                    assetWriter?.add(audioInput)
                }
            }

            assetWriter?.startWriting()
            assetWriter?.startSession(atSourceTime: .zero)

            // Create and start stream
            stream = SCStream(filter: filter, configuration: config, delegate: nil)

            streamOutput = CaptureStreamOutput(
                videoInput: videoInput,
                audioInput: audioInput,
                startTime: CMTime.zero
            )

            if let streamOutput = streamOutput {
                try stream?.addStreamOutput(streamOutput, type: .screen, sampleHandlerQueue: .global(qos: .userInteractive))

                if captureAudio && PermissionManager.shared.hasOptionalMicrophonePermission {
                    try stream?.addStreamOutput(streamOutput, type: .audio, sampleHandlerQueue: .global(qos: .userInteractive))
                }
            }

            try await stream?.startCapture()

            recordingStartTime = Date()
            state = .recording(startTime: recordingStartTime!)
            startDurationTimer()

        } catch {
            state = .error("Failed to start recording: \(error.localizedDescription)")
            cleanup()
        }
    }

    func stopRecording() async -> CapturedContent? {
        guard state.isRecording else { return nil }

        state = .processing
        stopDurationTimer()

        do {
            try await stream?.stopCapture()
        } catch {
            print("Error stopping capture: \(error)")
        }

        stream = nil
        streamOutput = nil

        // Finish writing
        videoInput?.markAsFinished()
        audioInput?.markAsFinished()

        await withCheckedContinuation { continuation in
            assetWriter?.finishWriting {
                continuation.resume()
            }
        }

        // Create captured content
        guard let outputURL = tempVideoURL else {
            state = .error("No output file")
            return nil
        }

        let duration = recordingDuration
        let size = await getVideoSize(from: outputURL)

        let content = CapturedContent(
            type: .recording,
            mode: captureMode(for: selectedTarget),
            originalSize: size,
            videoURL: outputURL,
            duration: duration,
            hasAudio: captureAudio && PermissionManager.shared.hasOptionalMicrophonePermission
        )

        state = .completed(content)
        return content
    }

    func cancelRecording() async {
        stopDurationTimer()

        if let stream = stream {
            try? await stream.stopCapture()
        }

        cleanup()
        state = .idle
    }

    func resetState() {
        state = .idle
        recordingDuration = 0
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
        }

        return (filter, config)
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

    private func cleanup() {
        stream = nil
        streamOutput = nil
        assetWriter = nil
        videoInput = nil
        audioInput = nil
        recordingStartTime = nil

        // Clean up temp file if needed
        if let url = tempVideoURL {
            try? FileManager.default.removeItem(at: url)
            tempVideoURL = nil
        }
    }

    private func getVideoSize(from url: URL) async -> CGSize {
        let asset = AVAsset(url: url)
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
        }
    }
}

// MARK: - Stream Output Handler

private class CaptureStreamOutput: NSObject, SCStreamOutput {
    private let videoInput: AVAssetWriterInput?
    private let audioInput: AVAssetWriterInput?
    private var firstSampleTime: CMTime?
    private let startTime: CMTime

    init(videoInput: AVAssetWriterInput?, audioInput: AVAssetWriterInput?, startTime: CMTime) {
        self.videoInput = videoInput
        self.audioInput = audioInput
        self.startTime = startTime
        super.init()
    }

    func stream(_ stream: SCStream, didOutputSampleBuffer sampleBuffer: CMSampleBuffer, of type: SCStreamOutputType) {
        guard sampleBuffer.isValid else { return }

        // Track first sample time for timing offset
        if firstSampleTime == nil {
            firstSampleTime = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
        }

        switch type {
        case .screen:
            guard let videoInput = videoInput, videoInput.isReadyForMoreMediaData else { return }

            // Offset the timing
            if let offsetBuffer = adjustTiming(of: sampleBuffer) {
                videoInput.append(offsetBuffer)
            }

        case .audio:
            guard let audioInput = audioInput, audioInput.isReadyForMoreMediaData else { return }

            if let offsetBuffer = adjustTiming(of: sampleBuffer) {
                audioInput.append(offsetBuffer)
            }

        @unknown default:
            break
        }
    }

    private func adjustTiming(of sampleBuffer: CMSampleBuffer) -> CMSampleBuffer? {
        guard let firstTime = firstSampleTime else { return nil }

        var timing = CMSampleTimingInfo()
        guard CMSampleBufferGetSampleTimingInfo(sampleBuffer, at: 0, timingInfoOut: &timing) == noErr else {
            return nil
        }

        timing.presentationTimeStamp = CMTimeSubtract(timing.presentationTimeStamp, firstTime)

        var newBuffer: CMSampleBuffer?
        guard CMSampleBufferCreateCopyWithNewTiming(
            allocator: kCFAllocatorDefault,
            sampleBuffer: sampleBuffer,
            sampleTimingEntryCount: 1,
            sampleTimingArray: &timing,
            sampleBufferOut: &newBuffer
        ) == noErr else {
            return nil
        }

        return newBuffer
    }
}

// MARK: - Recording Error

enum RecordingError: LocalizedError {
    case noDisplayAvailable
    case streamCreationFailed
    case writingFailed

    var errorDescription: String? {
        switch self {
        case .noDisplayAvailable:
            return "No display available for recording"
        case .streamCreationFailed:
            return "Failed to create capture stream"
        case .writingFailed:
            return "Failed to write recording to file"
        }
    }
}
