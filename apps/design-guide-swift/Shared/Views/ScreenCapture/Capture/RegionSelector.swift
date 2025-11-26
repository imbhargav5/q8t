import SwiftUI
import AppKit

struct RegionSelectorView: View {
    @Binding var selectedRegion: CGRect?
    @Binding var isSelecting: Bool
    let onComplete: (CGRect) -> Void
    let onCancel: () -> Void

    @State private var startPoint: CGPoint?
    @State private var currentPoint: CGPoint?
    @State private var isDragging = false

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                // Semi-transparent overlay
                Color.black.opacity(0.3)

                // Selection rectangle
                if let rect = selectionRect {
                    // Clear the selected area
                    Rectangle()
                        .fill(.clear)
                        .frame(width: rect.width, height: rect.height)
                        .position(x: rect.midX, y: rect.midY)
                        .background(
                            Rectangle()
                                .stroke(Color.white, lineWidth: 2)
                                .frame(width: rect.width, height: rect.height)
                        )
                        .overlay(
                            // Size indicator
                            VStack {
                                Spacer()
                                HStack {
                                    Spacer()
                                    Text("\(Int(rect.width)) × \(Int(rect.height))")
                                        .font(.system(size: 12, weight: .medium, design: .monospaced))
                                        .foregroundColor(.white)
                                        .padding(.horizontal, 8)
                                        .padding(.vertical, 4)
                                        .background(Color.black.opacity(0.7))
                                        .cornerRadius(4)
                                        .padding(8)
                                }
                            }
                            .frame(width: rect.width, height: rect.height)
                            .position(x: rect.midX, y: rect.midY)
                        )

                    // Cut out the selection from the overlay
                    Rectangle()
                        .fill(Color.black.opacity(0.3))
                        .mask(
                            Rectangle()
                                .fill(Color.white)
                                .overlay(
                                    Rectangle()
                                        .fill(Color.black)
                                        .frame(width: rect.width, height: rect.height)
                                        .position(x: rect.midX, y: rect.midY)
                                        .blendMode(.destinationOut)
                                )
                        )
                }

                // Instructions
                if !isDragging && selectionRect == nil {
                    VStack(spacing: 16) {
                        Text("Drag to select a region")
                            .font(.title2)
                            .fontWeight(.semibold)
                            .foregroundColor(.white)

                        Text("Press Escape to cancel")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.8))
                    }
                    .padding(24)
                    .background(Color.black.opacity(0.7))
                    .cornerRadius(12)
                }

                // Confirm/Cancel buttons when selection is made
                if let rect = selectionRect, !isDragging {
                    VStack {
                        Spacer()
                        HStack(spacing: 12) {
                            Button(action: onCancel) {
                                Label("Cancel", systemImage: "xmark")
                                    .padding(.horizontal, 16)
                                    .padding(.vertical, 8)
                            }
                            .buttonStyle(.bordered)
                            .tint(.white)

                            Button(action: {
                                onComplete(rect)
                            }) {
                                Label("Capture", systemImage: "camera")
                                    .padding(.horizontal, 16)
                                    .padding(.vertical, 8)
                            }
                            .buttonStyle(.borderedProminent)
                        }
                        .padding(.bottom, 40)
                    }
                    .position(x: geometry.size.width / 2, y: geometry.size.height - 60)
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .gesture(
                DragGesture(minimumDistance: 1)
                    .onChanged { value in
                        if startPoint == nil {
                            startPoint = value.startLocation
                        }
                        currentPoint = value.location
                        isDragging = true
                    }
                    .onEnded { value in
                        isDragging = false
                        if let start = startPoint {
                            let rect = CGRect(
                                x: min(start.x, value.location.x),
                                y: min(start.y, value.location.y),
                                width: abs(value.location.x - start.x),
                                height: abs(value.location.y - start.y)
                            )
                            if rect.width > 10 && rect.height > 10 {
                                selectedRegion = rect
                            }
                        }
                    }
            )
            .onKeyPress(.escape) {
                onCancel()
                return .handled
            }
        }
        .ignoresSafeArea()
    }

    private var selectionRect: CGRect? {
        if isDragging, let start = startPoint, let current = currentPoint {
            return CGRect(
                x: min(start.x, current.x),
                y: min(start.y, current.y),
                width: abs(current.x - start.x),
                height: abs(current.y - start.y)
            )
        }
        return selectedRegion
    }
}

// MARK: - Region Selector Window Controller

class RegionSelectorWindowController: NSObject {
    private var window: NSWindow?
    private var completion: ((CGRect?) -> Void)?

    func showRegionSelector(completion: @escaping (CGRect?) -> Void) {
        self.completion = completion

        // Get the main screen
        guard let screen = NSScreen.main else {
            completion(nil)
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

        let hostingView = NSHostingView(rootView: RegionSelectorContentView(
            onComplete: { [weak self] rect in
                self?.close(with: rect)
            },
            onCancel: { [weak self] in
                self?.close(with: nil)
            }
        ))

        window?.contentView = hostingView
        window?.makeKeyAndOrderFront(nil)

        // Monitor for escape key globally
        NSEvent.addLocalMonitorForEvents(matching: .keyDown) { [weak self] event in
            if event.keyCode == 53 { // Escape key
                self?.close(with: nil)
                return nil
            }
            return event
        }
    }

    private func close(with rect: CGRect?) {
        window?.close()
        window = nil
        completion?(rect)
        completion = nil
    }
}

struct RegionSelectorContentView: View {
    let onComplete: (CGRect) -> Void
    let onCancel: () -> Void

    @State private var selectedRegion: CGRect?
    @State private var isSelecting = true

    var body: some View {
        RegionSelectorView(
            selectedRegion: $selectedRegion,
            isSelecting: $isSelecting,
            onComplete: onComplete,
            onCancel: onCancel
        )
    }
}

#Preview {
    RegionSelectorContentView(
        onComplete: { rect in print("Selected: \(rect)") },
        onCancel: { print("Cancelled") }
    )
    .frame(width: 800, height: 600)
}
