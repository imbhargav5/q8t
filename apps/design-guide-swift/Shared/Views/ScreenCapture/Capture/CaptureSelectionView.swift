#if os(macOS)
import SwiftUI
import ScreenCaptureKit

struct CaptureSelectionView: View {
    @ObservedObject var recorder: ScreenRecorder
    @ObservedObject var screenshotCapture: ScreenshotCapture

    @Binding var captureType: CaptureType
    @Binding var captureMode: CaptureMode
    @Binding var selectedTarget: CaptureTarget

    let onCapture: () -> Void

    @State private var showingWindowPicker = false
    @State private var showingDisplayPicker = false

    var body: some View {
        VStack(spacing: 32) {
            // Header
            VStack(spacing: 8) {
                Image(systemName: "record.circle")
                    .font(.system(size: 48))
                    .foregroundStyle(.linearGradient(
                        colors: [.purple, .blue],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ))

                Text("Screen Capture")
                    .font(.title)
                    .fontWeight(.bold)

                Text("Choose what you want to capture")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }

            // Capture Type Selection
            VStack(alignment: .leading, spacing: 12) {
                Text("Capture Type")
                    .font(.headline)

                HStack(spacing: 12) {
                    ForEach(CaptureType.allCases) { type in
                        CaptureTypeCard(
                            type: type,
                            isSelected: captureType == type,
                            action: { captureType = type }
                        )
                    }
                }
            }
            .frame(maxWidth: 500)

            // Capture Mode Selection
            VStack(alignment: .leading, spacing: 12) {
                Text("Capture Mode")
                    .font(.headline)

                LazyVGrid(columns: [
                    GridItem(.flexible()),
                    GridItem(.flexible())
                ], spacing: 12) {
                    ForEach(CaptureMode.allCases) { mode in
                        CaptureModeCard(
                            mode: mode,
                            isSelected: captureMode == mode,
                            action: {
                                captureMode = mode
                                handleModeSelection(mode)
                            }
                        )
                    }
                }
            }
            .frame(maxWidth: 500)

            // Target Selection (for display/window modes)
            if captureMode == .singleDisplay && !recorder.availableDisplays.isEmpty {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Select Display")
                        .font(.headline)

                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 12) {
                            ForEach(Array(recorder.availableDisplays.enumerated()), id: \.element.displayID) { index, display in
                                DisplayCard(
                                    display: display,
                                    displayNumber: index + 1,
                                    isSelected: isDisplaySelected(display)
                                )
                                .onTapGesture {
                                    selectedTarget = .display(display)
                                }
                            }
                        }
                    }
                }
                .frame(maxWidth: 500)
            }

            if captureMode == .window && !recorder.availableWindows.isEmpty {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Select Window")
                        .font(.headline)

                    ScrollView {
                        LazyVStack(spacing: 8) {
                            ForEach(recorder.availableWindows, id: \.windowID) { window in
                                WindowCard(
                                    window: window,
                                    isSelected: isWindowSelected(window)
                                )
                                .onTapGesture {
                                    selectedTarget = .window(window)
                                }
                            }
                        }
                    }
                    .frame(maxHeight: 200)
                }
                .frame(maxWidth: 500)
            }

            // Audio Toggle (for recordings only)
            if captureType == .recording {
                Toggle(isOn: $recorder.captureAudio) {
                    Label("Capture Microphone Audio", systemImage: "mic.fill")
                }
                .toggleStyle(.switch)
                .disabled(!PermissionManager.shared.hasMicrophonePermission)
                .frame(maxWidth: 500)
            }

            // Capture Button
            Button(action: onCapture) {
                Label(
                    captureType == .screenshot ? "Take Screenshot" : "Start Recording",
                    systemImage: captureType == .screenshot ? "camera.fill" : "record.circle"
                )
                .font(.headline)
                .frame(maxWidth: 200)
                .padding(.vertical, 12)
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.large)
            .disabled(!isReadyToCapture)

            Spacer()
        }
        .padding(40)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.windowBackgroundColor))
        .onAppear {
            Task {
                await recorder.refreshAvailableContent()
                await screenshotCapture.refreshAvailableContent()
            }
        }
    }

    private var isReadyToCapture: Bool {
        switch captureMode {
        case .allDisplays:
            return true
        case .singleDisplay:
            if case .display = selectedTarget { return true }
            return false
        case .window:
            if case .window = selectedTarget { return true }
            return false
        case .region:
            return true // Region will be selected interactively
        case .application:
            return true
        }
    }

    private func handleModeSelection(_ mode: CaptureMode) {
        switch mode {
        case .allDisplays:
            selectedTarget = .allDisplays
        case .singleDisplay:
            if let firstDisplay = recorder.availableDisplays.first {
                selectedTarget = .display(firstDisplay)
            }
        case .window:
            if let firstWindow = recorder.availableWindows.first {
                selectedTarget = .window(firstWindow)
            }
        case .region:
            selectedTarget = .region(.zero) // Will be set when user selects
        case .application:
            selectedTarget = .allDisplays // Default fallback for application mode
        }
    }

    private func isDisplaySelected(_ display: SCDisplay) -> Bool {
        if case .display(let selected) = selectedTarget {
            return selected.displayID == display.displayID
        }
        return false
    }

    private func isWindowSelected(_ window: SCWindow) -> Bool {
        if case .window(let selected) = selectedTarget {
            return selected.windowID == window.windowID
        }
        return false
    }
}

// MARK: - Capture Type Card

struct CaptureTypeCard: View {
    let type: CaptureType
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 12) {
                Image(systemName: type.icon)
                    .font(.system(size: 32))
                    .foregroundColor(isSelected ? .white : .primary)

                Text(type.displayName)
                    .font(.headline)
                    .foregroundColor(isSelected ? .white : .primary)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 24)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(isSelected ? Color.accentColor : Color(.controlBackgroundColor))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .strokeBorder(isSelected ? Color.accentColor : Color.gray.opacity(0.3), lineWidth: 1)
            )
        }
        .buttonStyle(.plain)
    }
}

#Preview {
    CaptureSelectionView(
        recorder: ScreenRecorder(),
        screenshotCapture: ScreenshotCapture(),
        captureType: .constant(.screenshot),
        captureMode: .constant(.allDisplays),
        selectedTarget: .constant(.allDisplays),
        onCapture: {}
    )
    .frame(width: 800, height: 700)
}
#endif
