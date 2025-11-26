import SwiftUI
import AppKit

// MARK: - Countdown Overlay Window Controller

class CountdownOverlayWindowController: NSObject {
    private var window: NSWindow?
    private var completion: (() -> Void)?

    func showCountdown(completion: @escaping () -> Void) {
        self.completion = completion

        // Get the main screen
        guard let screen = NSScreen.main else {
            completion()
            return
        }

        // Create a borderless window covering the entire screen
        window = NSWindow(
            contentRect: screen.frame,
            styleMask: [.borderless],
            backing: .buffered,
            defer: false
        )

        window?.level = .screenSaver
        window?.isOpaque = false
        window?.backgroundColor = .clear
        window?.ignoresMouseEvents = false
        window?.acceptsMouseMovedEvents = true
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
        window?.makeKeyAndOrderFront(nil)

        // Monitor for escape key to cancel
        NSEvent.addLocalMonitorForEvents(matching: .keyDown) { [weak self] event in
            if event.keyCode == 53 { // Escape key
                self?.close()
                return nil
            }
            return event
        }
    }

    private func close() {
        window?.close()
        window = nil
    }
}
