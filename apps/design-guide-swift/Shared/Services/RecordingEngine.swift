#if os(macOS)
import Foundation
import ScreenCaptureKit
import AVFoundation

actor RecordingEngine {
    // MARK: - Types

    enum EngineState {
        case idle
        case preparing
        case recording
        case stopping
    }

    enum EngineError: LocalizedError {
        case alreadyRecording
        case notRecording
        case writerSetupFailed(String)
        case streamSetupFailed(String)
        case timeout(String)
        case writingFailed(String)

        var errorDescription: String? {
            switch self {
            case .alreadyRecording: return "Recording already in progress"
            case .notRecording: return "No recording in progress"
            case .writerSetupFailed(let msg): return "Writer setup failed: \(msg)"
            case .streamSetupFailed(let msg): return "Stream setup failed: \(msg)"
            case .timeout(let operation): return "Operation timed out: \(operation)"
            case .writingFailed(let msg): return "Writing failed: \(msg)"
            }
        }
    }

    // MARK: - Private Properties

    private var state: EngineState = .idle
    private var stream: SCStream?
    private var assetWriter: AVAssetWriter?
    private var sampleBufferWriter: SampleBufferWriter?
    private var outputURL: URL?

    // MARK: - Constants

    private static let operationTimeout: TimeInterval = 5.0

    // MARK: - Public API

    func startRecording(
        filter: SCContentFilter,
        config: SCStreamConfiguration,
        captureAudio: Bool,
        outputURL: URL
    ) async throws {
        guard state == .idle else {
            throw EngineError.alreadyRecording
        }

        state = .preparing
        self.outputURL = outputURL

        do {
            // Setup asset writer (off main thread - this is the key!)
            let writer = try AVAssetWriter(url: outputURL, fileType: .mp4)

            // Setup video input
            let videoSettings: [String: Any] = [
                AVVideoCodecKey: AVVideoCodecType.h264,
                AVVideoWidthKey: config.width,
                AVVideoHeightKey: config.height
            ]
            let videoInput = AVAssetWriterInput(mediaType: .video, outputSettings: videoSettings)
            videoInput.expectsMediaDataInRealTime = true
            writer.add(videoInput)

            // Setup audio input if needed
            var audioInput: AVAssetWriterInput?
            if captureAudio {
                let audioSettings: [String: Any] = [
                    AVFormatIDKey: kAudioFormatMPEG4AAC,
                    AVSampleRateKey: 44100,
                    AVNumberOfChannelsKey: 2
                ]
                let input = AVAssetWriterInput(mediaType: .audio, outputSettings: audioSettings)
                input.expectsMediaDataInRealTime = true
                writer.add(input)
                audioInput = input
            }

            // Start writing (blocking but now off main thread)
            guard writer.startWriting() else {
                throw EngineError.writerSetupFailed(writer.error?.localizedDescription ?? "Unknown error")
            }
            writer.startSession(atSourceTime: .zero)

            self.assetWriter = writer

            // Create sample buffer writer with thread-safe handling
            let bufferWriter = SampleBufferWriter(
                videoInput: videoInput,
                audioInput: audioInput
            )
            sampleBufferWriter = bufferWriter

            // Setup and start stream
            let newStream = SCStream(filter: filter, configuration: config, delegate: nil)

            try newStream.addStreamOutput(
                bufferWriter,
                type: .screen,
                sampleHandlerQueue: bufferWriter.processingQueue
            )

            if captureAudio {
                try newStream.addStreamOutput(
                    bufferWriter,
                    type: .audio,
                    sampleHandlerQueue: bufferWriter.processingQueue
                )
            }

            // Start capture with timeout
            try await withTimeout(seconds: Self.operationTimeout, operation: "startCapture") {
                try await newStream.startCapture()
            }

            self.stream = newStream
            state = .recording

        } catch let error as EngineError {
            await cleanup()
            state = .idle
            throw error
        } catch {
            await cleanup()
            state = .idle
            throw EngineError.streamSetupFailed(error.localizedDescription)
        }
    }

    func stopRecording() async throws -> URL {
        guard state == .recording else {
            throw EngineError.notRecording
        }

        state = .stopping

        // Stop capture with timeout
        if let stream = stream {
            do {
                try await withTimeout(seconds: Self.operationTimeout, operation: "stopCapture") {
                    try await stream.stopCapture()
                }
            } catch {
                // Log but continue - we still need to finalize the file
                print("Warning: stopCapture failed: \(error)")
            }
        }

        stream = nil
        sampleBufferWriter?.markAsFinished()

        // Finish writing with timeout
        guard let writer = assetWriter else {
            throw EngineError.writingFailed("No asset writer")
        }

        try await withTimeout(seconds: Self.operationTimeout, operation: "finishWriting") {
            await withCheckedContinuation { continuation in
                writer.finishWriting {
                    continuation.resume()
                }
            }
        }

        guard writer.status == .completed else {
            throw EngineError.writingFailed(writer.error?.localizedDescription ?? "Unknown error")
        }

        guard let url = outputURL else {
            throw EngineError.writingFailed("No output URL")
        }

        await cleanup()
        state = .idle

        return url
    }

    func cancelRecording() async {
        if let stream = stream {
            try? await stream.stopCapture()
        }

        assetWriter?.cancelWriting()
        await cleanup()
        state = .idle
    }

    // MARK: - Private Helpers

    private func cleanup() async {
        stream = nil
        sampleBufferWriter = nil

        // Clean up temp file on cancel
        if let url = outputURL, assetWriter?.status != .completed {
            try? FileManager.default.removeItem(at: url)
        }

        assetWriter = nil
        outputURL = nil
    }

    private func withTimeout<T>(
        seconds: TimeInterval,
        operation: String,
        _ work: @escaping () async throws -> T
    ) async throws -> T {
        try await withThrowingTaskGroup(of: T.self) { group in
            group.addTask {
                try await work()
            }

            group.addTask {
                try await Task.sleep(nanoseconds: UInt64(seconds * 1_000_000_000))
                throw EngineError.timeout(operation)
            }

            guard let result = try await group.next() else {
                throw EngineError.timeout(operation)
            }
            group.cancelAll()
            return result
        }
    }
}
#endif
