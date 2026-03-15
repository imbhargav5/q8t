#if os(macOS)
import Foundation
import ScreenCaptureKit
import AVFoundation
import CoreMedia

final class SampleBufferWriter: NSObject, SCStreamOutput, @unchecked Sendable {
    // MARK: - Properties (nonisolated for cross-actor access)

    let processingQueue: DispatchQueue
    nonisolated(unsafe) private let videoInput: AVAssetWriterInput
    nonisolated(unsafe) private let audioInput: AVAssetWriterInput?

    // Thread-safe state using lock
    private let lock = NSLock()
    nonisolated(unsafe) private var _firstSampleTime: CMTime?
    nonisolated(unsafe) private var _isFinished = false

    // MARK: - Thread-Safe Accessors

    private var firstSampleTime: CMTime? {
        get {
            lock.lock()
            defer { lock.unlock() }
            return _firstSampleTime
        }
        set {
            lock.lock()
            defer { lock.unlock() }
            _firstSampleTime = newValue
        }
    }

    private var isFinished: Bool {
        get {
            lock.lock()
            defer { lock.unlock() }
            return _isFinished
        }
        set {
            lock.lock()
            defer { lock.unlock() }
            _isFinished = newValue
        }
    }

    // MARK: - Initialization

    nonisolated override init() {
        fatalError("Use init(videoInput:audioInput:)")
    }

    nonisolated init(videoInput: AVAssetWriterInput, audioInput: AVAssetWriterInput?) {
        self.processingQueue = DispatchQueue(
            label: "com.q8t.designguide.samplebuffer",
            qos: .userInteractive
        )
        self.videoInput = videoInput
        self.audioInput = audioInput
        self._firstSampleTime = nil
        self._isFinished = false
        super.init()
    }

    nonisolated func markAsFinished() {
        lock.lock()
        _isFinished = true
        lock.unlock()
        videoInput.markAsFinished()
        audioInput?.markAsFinished()
    }

    // MARK: - SCStreamOutput

    nonisolated func stream(_ stream: SCStream, didOutputSampleBuffer sampleBuffer: CMSampleBuffer, of type: SCStreamOutputType) {
        // Early exit if finished or invalid
        lock.lock()
        let finished = _isFinished
        lock.unlock()

        guard !finished, sampleBuffer.isValid else { return }

        // Initialize first sample time (thread-safe)
        lock.lock()
        if _firstSampleTime == nil {
            _firstSampleTime = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
        }
        let firstTime = _firstSampleTime
        lock.unlock()

        // Adjust timing
        guard let adjustedBuffer = adjustTiming(of: sampleBuffer, firstTime: firstTime) else { return }

        // Append based on type
        switch type {
        case .screen:
            appendToInput(videoInput, buffer: adjustedBuffer)
        case .audio:
            if let audioInput = audioInput {
                appendToInput(audioInput, buffer: adjustedBuffer)
            }
        case .microphone:
            if let audioInput = audioInput {
                appendToInput(audioInput, buffer: adjustedBuffer)
            }
        @unknown default:
            break
        }
    }

    // MARK: - Private Helpers

    nonisolated private func appendToInput(_ input: AVAssetWriterInput, buffer: CMSampleBuffer) {
        guard input.isReadyForMoreMediaData else { return }
        input.append(buffer)
    }

    nonisolated private func adjustTiming(of sampleBuffer: CMSampleBuffer, firstTime: CMTime?) -> CMSampleBuffer? {
        guard let firstTime = firstTime else { return nil }

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
#endif
