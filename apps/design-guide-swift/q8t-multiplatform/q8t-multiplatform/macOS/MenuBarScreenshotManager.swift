#if os(macOS)
import Foundation
import SwiftUI
import Combine
import ScreenCaptureKit

// MARK: - Screenshot Notification

extension Notification.Name {
    static let screenshotCompleted = Notification.Name("screenshotCompleted")
}

// MARK: - Menu Bar Screenshot Manager

@MainActor
class MenuBarScreenshotManager: ObservableObject {
    // MARK: - Published Properties

    @Published private(set) var isCapturing = false

    // MARK: - Services

    private let screenshotCapture = ScreenshotCapture()
    private var thumbnailController: ScreenshotThumbnailWindowController?
    private var regionSelectorController: RegionSelectorWindowController?

    // MARK: - Screenshot Actions

    func captureAllDisplays() async {
        print("[Screenshot] captureAllDisplays() called")
        isCapturing = true
        defer { isCapturing = false }

        do {
            await screenshotCapture.refreshAvailableContent()
            print("[Screenshot] Available displays: \(screenshotCapture.availableDisplays.count)")

            let content = try await screenshotCapture.captureAllDisplays()
            print("[Screenshot] Capture succeeded")

            guard let image = content.image else {
                print("[Screenshot] ERROR: No image")
                return
            }

            // Save to Downloads
            let savedURL = try saveToDownloads(image: image)
            print("[Screenshot] Saved to: \(savedURL.path)")
            print("[Screenshot] SUCCESS - Check Downloads folder")
        } catch {
            print("[Screenshot] ERROR: \(error)")
        }
    }

    func capturePrimaryDisplay() async {
        await screenshotCapture.refreshAvailableContent()
        guard let primaryDisplay = screenshotCapture.availableDisplays.first else { return }

        await performCapture { [weak self] in
            try await self?.screenshotCapture.captureDisplay(primaryDisplay)
        }
    }

    func captureRegion() {
        regionSelectorController = RegionSelectorWindowController()
        regionSelectorController?.showRegionSelector { [weak self] rect in
            guard let rect = rect else {
                self?.regionSelectorController = nil
                return
            }

            Task { @MainActor [weak self] in
                await self?.screenshotCapture.refreshAvailableContent()
                await self?.performCapture {
                    try await self?.screenshotCapture.captureRegion(rect)
                }
                self?.regionSelectorController = nil
            }
        }
    }

    // MARK: - Refresh Content

    func refreshContent() async {
        await screenshotCapture.refreshAvailableContent()
    }

    // MARK: - Private Methods

    private func performCapture(_ capture: @escaping () async throws -> CapturedContent?) async {
        isCapturing = true
        defer { isCapturing = false }

        do {
            print("[Screenshot] Starting capture...")
            guard let content = try await capture() else {
                print("[Screenshot] ERROR: capture() returned nil")
                return
            }
            print("[Screenshot] Capture succeeded, content type: \(content.type)")

            guard let image = content.image else {
                print("[Screenshot] ERROR: content.image is nil")
                return
            }
            print("[Screenshot] Image size: \(image.size)")

            // Save to Downloads
            let savedURL = try saveToDownloads(image: image)
            print("[Screenshot] Saved to: \(savedURL.path)")

            // Show thumbnail
            showThumbnail(for: content, savedURL: savedURL)
            print("[Screenshot] Thumbnail shown")

        } catch {
            print("[Screenshot] ERROR: \(error)")
        }
    }

    private func saveToDownloads(image: NSImage) throws -> URL {
        // Get Downloads directory
        guard let downloadsURL = FileManager.default.urls(for: .downloadsDirectory, in: .userDomainMask).first else {
            throw ScreenshotError.captureFailed
        }

        // Generate filename with timestamp
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd_HH-mm-ss"
        let timestamp = dateFormatter.string(from: Date())
        let filename = "Screenshot_\(timestamp).png"

        let fileURL = downloadsURL.appendingPathComponent(filename)

        // Convert and save as PNG
        guard let tiffData = image.tiffRepresentation,
              let bitmap = NSBitmapImageRep(data: tiffData),
              let pngData = bitmap.representation(using: .png, properties: [:]) else {
            throw ScreenshotError.captureFailed
        }

        try pngData.write(to: fileURL)

        return fileURL
    }

    private func showThumbnail(for content: CapturedContent, savedURL: URL) {
        guard let image = content.image else { return }

        thumbnailController = ScreenshotThumbnailWindowController()
        thumbnailController?.showThumbnail(for: image) { [weak self] in
            // Post notification to open editor
            NotificationCenter.default.post(
                name: .screenshotCompleted,
                object: content
            )

            // Bring app to front
            NSApplication.shared.activate(ignoringOtherApps: true)

            self?.thumbnailController = nil
        }
    }
}
#endif
