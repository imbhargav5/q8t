#if os(macOS)
import SwiftUI
import AppKit

// MARK: - Non-Key Overlay Window

private class OverlayWindow: NSWindow {
    override var canBecomeKey: Bool { false }
    override var canBecomeMain: Bool { false }
}

// MARK: - Countdown Overlay Window Controller

class CountdownOverlayWindowController: NSObject {
    private var window: NSWindow?
    private var completion: (() -> Void)?
    private var eventMonitor: Any?

    func showCountdown(completion: @escaping () -> Void) {
        self.completion = completion

        // Get the main screen
        guard let screen = NSScreen.main else {
            completion()
            return
        }

        // Create a borderless overlay window that can't become key
        window = OverlayWindow(
            contentRect: screen.frame,
            styleMask: [.borderless],
            backing: .buffered,
            defer: false
        )

        window?.level = .screenSaver
        window?.isOpaque = false
        window?.backgroundColor = .clear
        window?.ignoresMouseEvents = true  // Don't intercept mouse events
        window?.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary]

        let hostingView = NSHostingView(rootView: CountdownOverlayView(
            onComplete: { [weak self] in
                self?.close()
                self?.completion?()
            },
            onCancel: { [weak self] in
                self?.close()
            }
        ))

        window?.contentView = hostingView
        window?.orderFrontRegardless()  // Show without becoming key

        // Monitor for escape key to cancel
        eventMonitor = NSEvent.addLocalMonitorForEvents(matching: .keyDown) { [weak self] event in
            if event.keyCode == 53 { // Escape key
                self?.close()
                return nil
            }
            return event
        }
    }

    private func close() {
        // Clean up event monitor
        if let monitor = eventMonitor {
            NSEvent.removeMonitor(monitor)
            eventMonitor = nil
        }

        window?.close()
        window = nil
    }
}
#endif
