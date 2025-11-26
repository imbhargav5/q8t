import Foundation
import SwiftUI
import ScreenCaptureKit

// MARK: - Capture Mode
enum CaptureMode: String, Codable, CaseIterable, Identifiable {
    case allDisplays = "all_displays"
    case singleDisplay = "single_display"
    case window
    case region

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .allDisplays: return "All Displays"
        case .singleDisplay: return "Single Display"
        case .window: return "Window"
        case .region: return "Region"
        }
    }

    var icon: String {
        switch self {
        case .allDisplays: return "rectangle.on.rectangle"
        case .singleDisplay: return "display"
        case .window: return "macwindow"
        case .region: return "crop"
        }
    }

    var description: String {
        switch self {
        case .allDisplays: return "Capture all connected displays"
        case .singleDisplay: return "Capture a single display"
        case .window: return "Capture a specific window"
        case .region: return "Capture a custom region"
        }
    }
}

// MARK: - Capture Type
enum CaptureType: String, Codable, CaseIterable, Identifiable {
    case screenshot
    case recording

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .screenshot: return "Screenshot"
        case .recording: return "Recording"
        }
    }

    var icon: String {
        switch self {
        case .screenshot: return "camera.fill"
        case .recording: return "record.circle"
        }
    }
}

// MARK: - Video Export Format
enum VideoExportFormat: String, Codable, CaseIterable, Identifiable {
    case mp4
    case mov
    case gif

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .mp4: return "MP4"
        case .mov: return "MOV"
        case .gif: return "GIF"
        }
    }

    var fileExtension: String {
        rawValue
    }

    var mimeType: String {
        switch self {
        case .mp4: return "video/mp4"
        case .mov: return "video/quicktime"
        case .gif: return "image/gif"
        }
    }
}

// MARK: - Gradient Type
enum GradientType: String, Codable, CaseIterable, Identifiable {
    case linear
    case radial
    case angular
    case solid

    var id: String { rawValue }

    var displayName: String {
        rawValue.capitalized
    }
}

// MARK: - Gradient Color Stop
struct GradientColorStop: Codable, Identifiable, Equatable {
    let id: UUID
    var color: String // Hex color
    var location: Double // 0.0 to 1.0

    init(id: UUID = UUID(), color: String, location: Double) {
        self.id = id
        self.color = color
        self.location = location
    }
}

// MARK: - Gradient Background
struct GradientBackground: Codable, Identifiable, Equatable {
    let id: UUID
    var name: String
    var type: GradientType
    var colorStops: [GradientColorStop]
    var angle: Double // For linear gradient (degrees)

    init(id: UUID = UUID(), name: String, type: GradientType, colorStops: [GradientColorStop], angle: Double = 0) {
        self.id = id
        self.name = name
        self.type = type
        self.colorStops = colorStops
        self.angle = angle
    }

    // Convert to SwiftUI Gradient
    var gradient: Gradient {
        Gradient(stops: colorStops.map { stop in
            Gradient.Stop(color: Color(hex: stop.color), location: stop.location)
        })
    }

    // Create SwiftUI view for the gradient
    @ViewBuilder
    func makeView() -> some View {
        switch type {
        case .linear:
            LinearGradient(
                gradient: gradient,
                startPoint: startPoint,
                endPoint: endPoint
            )
        case .radial:
            RadialGradient(
                gradient: gradient,
                center: .center,
                startRadius: 0,
                endRadius: 500
            )
        case .angular:
            AngularGradient(
                gradient: gradient,
                center: .center,
                angle: .degrees(angle)
            )
        case .solid:
            if let firstColor = colorStops.first {
                Color(hex: firstColor.color)
            } else {
                Color.black
            }
        }
    }

    private var startPoint: UnitPoint {
        let radians = angle * .pi / 180
        return UnitPoint(
            x: 0.5 - cos(radians) * 0.5,
            y: 0.5 - sin(radians) * 0.5
        )
    }

    private var endPoint: UnitPoint {
        let radians = angle * .pi / 180
        return UnitPoint(
            x: 0.5 + cos(radians) * 0.5,
            y: 0.5 + sin(radians) * 0.5
        )
    }
}

// MARK: - Shadow Configuration
struct ShadowConfiguration: Codable, Equatable {
    var enabled: Bool
    var color: String // Hex color
    var opacity: Double
    var radius: Double
    var offsetX: Double
    var offsetY: Double

    init(enabled: Bool = true, color: String = "#000000", opacity: Double = 0.3, radius: Double = 20, offsetX: Double = 0, offsetY: Double = 10) {
        self.enabled = enabled
        self.color = color
        self.opacity = opacity
        self.radius = radius
        self.offsetX = offsetX
        self.offsetY = offsetY
    }

    static let `default` = ShadowConfiguration()
    static let none = ShadowConfiguration(enabled: false)
}

// MARK: - Content Styling
struct ContentStyling: Codable, Equatable {
    var cornerRadius: Double
    var shadow: ShadowConfiguration
    var padding: Double
    var scale: Double
    var positionX: Double // -1.0 to 1.0, 0 is center
    var positionY: Double // -1.0 to 1.0, 0 is center

    init(
        cornerRadius: Double = 12,
        shadow: ShadowConfiguration = .default,
        padding: Double = 40,
        scale: Double = 1.0,
        positionX: Double = 0,
        positionY: Double = 0
    ) {
        self.cornerRadius = cornerRadius
        self.shadow = shadow
        self.padding = padding
        self.scale = scale
        self.positionX = positionX
        self.positionY = positionY
    }

    static let `default` = ContentStyling()
}

// MARK: - Canvas Configuration
struct CanvasConfiguration: Codable, Equatable {
    var background: GradientBackground
    var styling: ContentStyling
    var aspectRatio: AspectRatio

    init(
        background: GradientBackground = MockGradients.presets.first!,
        styling: ContentStyling = .default,
        aspectRatio: AspectRatio = .sixteenNine
    ) {
        self.background = background
        self.styling = styling
        self.aspectRatio = aspectRatio
    }
}

// MARK: - Aspect Ratio
enum AspectRatio: String, Codable, CaseIterable, Identifiable {
    case original
    case sixteenNine = "16:9"
    case fourThree = "4:3"
    case oneOne = "1:1"
    case nineSixteen = "9:16"

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .original: return "Original"
        case .sixteenNine: return "16:9"
        case .fourThree: return "4:3"
        case .oneOne: return "1:1"
        case .nineSixteen: return "9:16"
        }
    }

    var ratio: CGFloat? {
        switch self {
        case .original: return nil
        case .sixteenNine: return 16.0 / 9.0
        case .fourThree: return 4.0 / 3.0
        case .oneOne: return 1.0
        case .nineSixteen: return 9.0 / 16.0
        }
    }
}

// MARK: - Export Settings
struct ExportSettings: Codable, Equatable {
    var format: VideoExportFormat
    var quality: ExportQuality
    var frameRate: Int // For GIF
    var loopGif: Bool
    var resolution: ExportResolution

    init(
        format: VideoExportFormat = .mp4,
        quality: ExportQuality = .high,
        frameRate: Int = 15,
        loopGif: Bool = true,
        resolution: ExportResolution = .original
    ) {
        self.format = format
        self.quality = quality
        self.frameRate = frameRate
        self.loopGif = loopGif
        self.resolution = resolution
    }
}

// MARK: - Export Quality
enum ExportQuality: String, Codable, CaseIterable, Identifiable {
    case low
    case medium
    case high
    case maximum

    var id: String { rawValue }

    var displayName: String {
        rawValue.capitalized
    }

    var compressionQuality: Double {
        switch self {
        case .low: return 0.3
        case .medium: return 0.5
        case .high: return 0.8
        case .maximum: return 1.0
        }
    }
}

// MARK: - Export Resolution
enum ExportResolution: String, Codable, CaseIterable, Identifiable {
    case original
    case hd720 = "720p"
    case hd1080 = "1080p"
    case uhd4k = "4K"

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .original: return "Original"
        case .hd720: return "720p HD"
        case .hd1080: return "1080p Full HD"
        case .uhd4k: return "4K UHD"
        }
    }

    var height: Int? {
        switch self {
        case .original: return nil
        case .hd720: return 720
        case .hd1080: return 1080
        case .uhd4k: return 2160
        }
    }
}

// MARK: - Captured Content
struct CapturedContent: Identifiable {
    let id: UUID
    let type: CaptureType
    let mode: CaptureMode
    let capturedAt: Date
    let originalSize: CGSize

    // For screenshots
    var image: NSImage?

    // For recordings
    var videoURL: URL?
    var duration: TimeInterval?
    var hasAudio: Bool

    // Metadata
    var displayName: String?
    var windowTitle: String?

    init(
        id: UUID = UUID(),
        type: CaptureType,
        mode: CaptureMode,
        capturedAt: Date = Date(),
        originalSize: CGSize,
        image: NSImage? = nil,
        videoURL: URL? = nil,
        duration: TimeInterval? = nil,
        hasAudio: Bool = false,
        displayName: String? = nil,
        windowTitle: String? = nil
    ) {
        self.id = id
        self.type = type
        self.mode = mode
        self.capturedAt = capturedAt
        self.originalSize = originalSize
        self.image = image
        self.videoURL = videoURL
        self.duration = duration
        self.hasAudio = hasAudio
        self.displayName = displayName
        self.windowTitle = windowTitle
    }
}

// MARK: - Recording State
enum RecordingState: Equatable {
    case idle
    case preparing
    case countdown(Int)
    case recording(startTime: Date)
    case paused(elapsed: TimeInterval)
    case processing
    case completed(CapturedContent)
    case error(String)

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

    static func == (lhs: RecordingState, rhs: RecordingState) -> Bool {
        switch (lhs, rhs) {
        case (.idle, .idle): return true
        case (.preparing, .preparing): return true
        case (.countdown(let a), .countdown(let b)): return a == b
        case (.recording(let a), .recording(let b)): return a == b
        case (.paused(let a), .paused(let b)): return a == b
        case (.processing, .processing): return true
        case (.completed(let a), .completed(let b)): return a.id == b.id
        case (.error(let a), .error(let b)): return a == b
        default: return false
        }
    }
}

// MARK: - Permission State
enum PermissionState: Equatable {
    case notDetermined
    case authorized
    case denied
    case restricted
}

// MARK: - Permission Type
enum PermissionType: String, CaseIterable, Identifiable {
    case screenRecording = "screen_recording"
    case microphone

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .screenRecording: return "Screen Recording"
        case .microphone: return "Microphone"
        }
    }

    var description: String {
        switch self {
        case .screenRecording: return "Required to capture your screen content"
        case .microphone: return "Optional - enables audio recording with your captures"
        }
    }

    var icon: String {
        switch self {
        case .screenRecording: return "rectangle.dashed.badge.record"
        case .microphone: return "mic.fill"
        }
    }

    var isRequired: Bool {
        switch self {
        case .screenRecording: return true
        case .microphone: return false
        }
    }
}

// MARK: - Selected Capture Target
enum CaptureTarget: Equatable {
    case allDisplays
    case display(SCDisplay)
    case window(SCWindow)
    case region(CGRect)

    static func == (lhs: CaptureTarget, rhs: CaptureTarget) -> Bool {
        switch (lhs, rhs) {
        case (.allDisplays, .allDisplays): return true
        case (.display(let a), .display(let b)): return a.displayID == b.displayID
        case (.window(let a), .window(let b)): return a.windowID == b.windowID
        case (.region(let a), .region(let b)): return a == b
        default: return false
        }
    }
}
