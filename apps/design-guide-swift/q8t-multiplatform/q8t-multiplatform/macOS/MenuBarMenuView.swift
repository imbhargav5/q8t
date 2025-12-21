#if os(macOS)
import SwiftUI

struct MenuBarMenuView: View {
    @ObservedObject var manager: MenuBarRecordingManager
    @Environment(\.openWindow) private var openWindow

    var body: some View {
        Group {
            switch manager.menuBarState {
            case .idle, .configuring:
                idleMenu

            case .countdown:
                countdownMenu

            case .recording:
                recordingMenu

            case .paused:
                pausedMenu

            case .processing:
                processingMenu
            }

            Divider()

            Button("Quit") {
                NSApplication.shared.terminate(nil)
            }
            .keyboardShortcut("q")
        }
    }

    // MARK: - Idle State Menu

    private var idleMenu: some View {
        Group {
            Button("Configure Recording...") {
                openWindow(id: "recording-config")
            }

            Divider()

            Button("Record Screen") {
                Task {
                    await manager.refreshContent()
                    manager.pendingTarget = .allDisplays
                    manager.startRecordingFlow(with: .allDisplays)
                }
            }
            .keyboardShortcut("r", modifiers: [.command, .shift])

            // Quick access to different modes
            Menu("Quick Record") {
                Button("All Displays") {
                    Task {
                        await manager.refreshContent()
                        manager.startRecordingFlow(with: .allDisplays)
                    }
                }

                if let firstDisplay = manager.recorder.availableDisplays.first {
                    Button("Primary Display") {
                        manager.startRecordingFlow(with: .display(firstDisplay))
                    }
                }

                Divider()

                Button("Select Region...") {
                    // Open region selector
                    let controller = RegionSelectorWindowController()
                    controller.showRegionSelector { rect in
                        if let rect = rect {
                            manager.startRecordingFlow(with: .region(rect))
                        }
                    }
                }
            }
        }
    }

    // MARK: - Countdown State Menu

    private var countdownMenu: some View {
        Group {
            Text("Starting in \(manager.countdownValue)...")
                .foregroundColor(.secondary)

            Divider()

            Button("Cancel") {
                Task {
                    await manager.cancelRecording()
                }
            }
            .keyboardShortcut(.escape, modifiers: [])
        }
    }

    // MARK: - Recording State Menu

    private var recordingMenu: some View {
        Group {
            HStack {
                Circle()
                    .fill(Color.red)
                    .frame(width: 8, height: 8)
                Text("Recording: \(manager.formattedDuration)")
            }

            Divider()

            Button("Stop Recording") {
                Task {
                    _ = await manager.stopRecording()
                }
            }
            .keyboardShortcut("s", modifiers: [.command, .shift])

            Button("Pause Recording") {
                manager.pauseRecording()
            }
            .keyboardShortcut("p", modifiers: [.command, .shift])

            Divider()

            Button("Cancel Recording") {
                Task {
                    await manager.cancelRecording()
                }
            }
        }
    }

    // MARK: - Paused State Menu

    private var pausedMenu: some View {
        Group {
            HStack {
                Circle()
                    .stroke(Color.red, lineWidth: 2)
                    .frame(width: 8, height: 8)
                Text("Paused: \(manager.formattedDuration)")
            }

            Divider()

            Button("Resume Recording") {
                Task {
                    await manager.resumeRecording()
                }
            }
            .keyboardShortcut("p", modifiers: [.command, .shift])

            Button("Stop Recording") {
                Task {
                    _ = await manager.stopRecording()
                }
            }
            .keyboardShortcut("s", modifiers: [.command, .shift])

            Divider()

            Button("Cancel Recording") {
                Task {
                    await manager.cancelRecording()
                }
            }
        }
    }

    // MARK: - Processing State Menu

    private var processingMenu: some View {
        Group {
            HStack {
                ProgressView()
                    .scaleEffect(0.5)
                Text("Processing...")
            }
        }
    }
}

#Preview {
    MenuBarMenuView(manager: MenuBarRecordingManager())
        .frame(width: 200)
}
#endif
