#if os(macOS)
import SwiftUI
import AppKit

// MARK: - Non-Key Thumbnail Window

private class ThumbnailWindow: NSWindow {
    override var canBecomeKey: Bool { false }
    override var canBecomeMain: Bool { false }
}

// MARK: - Screenshot Thumbnail Window Controller

class ScreenshotThumbnailWindowController: NSObject {
    private var window: NSWindow?
    private var dismissTimer: Timer?
    private var capturedImage: NSImage?
    private var onThumbnailClick: (() -> Void)?

    func showThumbnail(
        for image: NSImage,
        onClick: @escaping () -> Void
    ) {
        // Clean up any existing thumbnail
        dismiss()

        self.capturedImage = image
        self.onThumbnailClick = onClick

        guard let screen = NSScreen.main else { return }

        // Calculate position: bottom-right, above the dock
        let thumbnailWidth: CGFloat = 220
        let thumbnailHeight: CGFloat = 160
        let rightMargin: CGFloat = 20
        let bottomMargin: CGFloat = 90 // Above dock

        // Start position (slightly below final position for animation)
        let startY = screen.visibleFrame.minY + bottomMargin - 20
        let finalY = screen.visibleFrame.minY + bottomMargin

        let windowRect = CGRect(
            x: screen.visibleFrame.maxX - thumbnailWidth - rightMargin,
            y: startY,
            width: thumbnailWidth,
            height: thumbnailHeight
        )

        window = ThumbnailWindow(
            contentRect: windowRect,
            styleMask: [.borderless],
            backing: .buffered,
            defer: false
        )

        window?.level = .floating
        window?.isOpaque = false
        window?.backgroundColor = .clear
        window?.ignoresMouseEvents = false
        window?.collectionBehavior = [.canJoinAllSpaces, .stationary]
        window?.hasShadow = false // View handles shadow

        let hostingView = NSHostingView(rootView: ScreenshotThumbnailView(
            image: image,
            onClick: { [weak self] in
                self?.handleClick()
            },
            onDismiss: { [weak self] in
                self?.animateOut()
            }
        ))

        window?.contentView = hostingView
        window?.alphaValue = 0

        // Show window
        window?.orderFrontRegardless()

        // Animate in
        NSAnimationContext.runAnimationGroup { context in
            context.duration = 0.3
            context.timingFunction = CAMediaTimingFunction(name: .easeOut)
            window?.animator().alphaValue = 1.0
            window?.animator().setFrame(
                CGRect(
                    x: windowRect.origin.x,
                    y: finalY,
                    width: thumbnailWidth,
                    height: thumbnailHeight
                ),
                display: true
            )
        }

        // Auto-dismiss after 5 seconds
        dismissTimer = Timer.scheduledTimer(withTimeInterval: 5.0, repeats: false) { [weak self] _ in
            self?.animateOut()
        }
    }

    private func handleClick() {
        dismissTimer?.invalidate()
        dismissTimer = nil

        // Call the click handler
        onThumbnailClick?()

        // Quick dismiss without animation
        dismiss()
    }

    private func animateOut() {
        dismissTimer?.invalidate()
        dismissTimer = nil

        guard let window = window else { return }

        NSAnimationContext.runAnimationGroup({ context in
            context.duration = 0.25
            context.timingFunction = CAMediaTimingFunction(name: .easeIn)
            window.animator().alphaValue = 0

            // Slide down slightly
            if let frame = self.window?.frame {
                window.animator().setFrame(
                    CGRect(
                        x: frame.origin.x,
                        y: frame.origin.y - 10,
                        width: frame.width,
                        height: frame.height
                    ),
                    display: true
                )
            }
        }, completionHandler: { [weak self] in
            self?.dismiss()
        })
    }

    func dismiss() {
        dismissTimer?.invalidate()
        dismissTimer = nil
        window?.close()
        window = nil
        capturedImage = nil
        onThumbnailClick = nil
    }
}
#endif
