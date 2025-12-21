#if os(macOS)
import Foundation
import ScreenCaptureKit
import AVFoundation
import CoreMedia

final class SampleBufferWriter: NSObject, SCStreamOutput {
    // MARK: - Properties

    let processingQueue: DispatchQueue

    private let videoInput: AVAssetWriterInput
    private let audioInput: AVAssetWriterInput?

    // Thread-safe state using lock
    private let lock = NSLock()
    private var _firstSampleTime: CMTime?
    private var _isFinished = false

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

    init(videoInput: AVAssetWriterInput, audioInput: AVAssetWriterInput?) {
        self.videoInput = videoInput
        self.audioInput = audioInput
        self.processingQueue = DispatchQueue(
            label: "com.chatsian.designguide.samplebuffer",
            qos: .userInteractive
        )
        super.init()
    }

    func markAsFinished() {
        isFinished = true
        videoInput.markAsFinished()
        audioInput?.markAsFinished()
    }

    // MARK: - SCStreamOutput

    func stream(_ stream: SCStream, didOutputSampleBuffer sampleBuffer: CMSampleBuffer, of type: SCStreamOutputType) {
        // Early exit if finished or invalid
        guard !isFinished, sampleBuffer.isValid else { return }

        // Initialize first sample time (thread-safe)
        if firstSampleTime == nil {
            firstSampleTime = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
        }

        // Adjust timing
        guard let adjustedBuffer = adjustTiming(of: sampleBuffer) else { return }

        // Append based on type
        switch type {
        case .screen:
            appendToInput(videoInput, buffer: adjustedBuffer)
        case .audio:
            if let audioInput = audioInput {
                appendToInput(audioInput, buffer: adjustedBuffer)
            }
        case .microphone:
            // Handle microphone same as audio if we have audio input
            if let audioInput = audioInput {
                appendToInput(audioInput, buffer: adjustedBuffer)
            }
        @unknown default:
            break
        }
    }

    // MARK: - Private Helpers

    private func appendToInput(_ input: AVAssetWriterInput, buffer: CMSampleBuffer) {
        guard input.isReadyForMoreMediaData else { return }
        input.append(buffer)
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
#endif
