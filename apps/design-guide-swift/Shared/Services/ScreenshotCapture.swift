#if os(macOS)
import Foundation
import Combine
import ScreenCaptureKit
import AppKit
import CoreGraphics

@MainActor
class ScreenshotCapture: ObservableObject {
    // MARK: - Published Properties
    @Published private(set) var availableDisplays: [SCDisplay] = []
    @Published private(set) var availableWindows: [SCWindow] = []
    @Published private(set) var isCapturing = false

    // MARK: - Initialization

    init() {
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
                guard let title = window.title, !title.isEmpty else { return false }
                guard window.isOnScreen else { return false }
                let excludedApps = ["Dock", "Control Center", "Notification Center"]
                if let appName = window.owningApplication?.applicationName,
                   excludedApps.contains(appName) {
                    return false
                }
                return true
            }
            print("[ScreenshotCapture] Refreshed: \(availableDisplays.count) displays, \(availableWindows.count) windows")
        } catch {
            print("[ScreenshotCapture] Failed to get shareable content: \(error)")
        }
    }

    // MARK: - Screenshot Capture

    func captureAllDisplays() async throws -> CapturedContent {
        isCapturing = true
        defer { isCapturing = false }

        print("[ScreenshotCapture] captureAllDisplays - availableDisplays: \(availableDisplays.count)")
        guard let primaryDisplay = availableDisplays.first else {
            print("[ScreenshotCapture] ERROR: No display available")
            throw ScreenshotError.noDisplayAvailable
        }

        print("[ScreenshotCapture] Using display: \(primaryDisplay.displayID), size: \(primaryDisplay.width)x\(primaryDisplay.height)")
        let filter = SCContentFilter(display: primaryDisplay, excludingWindows: [])
        return try await captureWithFilter(filter, mode: .allDisplays)
    }

    func captureDisplay(_ display: SCDisplay) async throws -> CapturedContent {
        isCapturing = true
        defer { isCapturing = false }

        let filter = SCContentFilter(display: display, excludingWindows: [])
        return try await captureWithFilter(filter, mode: .singleDisplay, displayName: "Display \(display.displayID)")
    }

    func captureWindow(_ window: SCWindow) async throws -> CapturedContent {
        isCapturing = true
        defer { isCapturing = false }

        let filter = SCContentFilter(desktopIndependentWindow: window)
        return try await captureWithFilter(filter, mode: .window, windowTitle: window.title)
    }

    func captureRegion(_ rect: CGRect) async throws -> CapturedContent {
        isCapturing = true
        defer { isCapturing = false }

        // Find the display that matches the main display (where region selector is shown)
        let mainDisplayID = CGMainDisplayID()
        let targetDisplay = availableDisplays.first { $0.displayID == mainDisplayID } ?? availableDisplays.first

        guard let display = targetDisplay else {
            throw ScreenshotError.noDisplayAvailable
        }

        print("[ScreenshotCapture] captureRegion - using display \(display.displayID), size: \(display.width)x\(display.height)")
        print("[ScreenshotCapture] captureRegion - CGMainDisplayID: \(mainDisplayID)")

        let filter = SCContentFilter(display: display, excludingWindows: [])
        return try await captureRegionWithFilter(filter, region: rect)
    }

    func captureWithTarget(_ target: CaptureTarget) async throws -> CapturedContent {
        switch target {
        case .allDisplays:
            return try await captureAllDisplays()
        case .display(let display):
            return try await captureDisplay(display)
        case .window(let window):
            return try await captureWindow(window)
        case .region(let rect):
            return try await captureRegion(rect)
        case .application:
            // For application mode, fall back to all displays
            return try await captureAllDisplays()
        }
    }

    // MARK: - Private Methods

    private func captureWithFilter(_ filter: SCContentFilter, mode: CaptureMode, displayName: String? = nil, windowTitle: String? = nil) async throws -> CapturedContent {
        let config = SCStreamConfiguration()
        config.scalesToFit = false
        config.showsCursor = true

        // Get the size from filter
        let width = filter.contentRect.width
        let height = filter.contentRect.height
        config.width = Int(width * 2) // Retina scaling
        config.height = Int(height * 2)

        let cgImage = try await SCScreenshotManager.captureImage(contentFilter: filter, configuration: config)

        let nsImage = NSImage(cgImage: cgImage, size: NSSize(width: width, height: height))

        return CapturedContent(
            type: .screenshot,
            mode: mode,
            originalSize: CGSize(width: width, height: height),
            image: nsImage,
            displayName: displayName,
            windowTitle: windowTitle
        )
    }

    private func captureRegionWithFilter(_ filter: SCContentFilter, region: CGRect) async throws -> CapturedContent {
        print("[ScreenshotCapture] captureRegion input rect: \(region)")
        print("[ScreenshotCapture] filter contentRect: \(filter.contentRect)")

        let config = SCStreamConfiguration()
        config.scalesToFit = false
        config.showsCursor = true
        config.sourceRect = region
        config.width = Int(region.width * 2)
        config.height = Int(region.height * 2)

        print("[ScreenshotCapture] sourceRect set to: \(config.sourceRect)")

        let cgImage = try await SCScreenshotManager.captureImage(contentFilter: filter, configuration: config)

        let nsImage = NSImage(cgImage: cgImage, size: NSSize(width: region.width, height: region.height))

        return CapturedContent(
            type: .screenshot,
            mode: .region,
            originalSize: region.size,
            image: nsImage
        )
    }
}

// MARK: - Screenshot Error

enum ScreenshotError: LocalizedError {
    case noDisplayAvailable
    case captureFailed
    case invalidRegion

    var errorDescription: String? {
        switch self {
        case .noDisplayAvailable:
            return "No display available for screenshot"
        case .captureFailed:
            return "Failed to capture screenshot"
        case .invalidRegion:
            return "Invalid region specified"
        }
    }
}

#endif
