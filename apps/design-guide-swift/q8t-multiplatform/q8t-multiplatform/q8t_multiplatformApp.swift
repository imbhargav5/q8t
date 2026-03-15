//
//  q8t_multiplatformApp.swift
//  q8t-multiplatform
//
//  Created by Bhargav Ponnapalli on 21/12/25.
//

import SwiftUI

@main
struct q8t_multiplatformApp: App {
    #if os(macOS)
    @StateObject private var recordingManager = MenuBarRecordingManager()
    @StateObject private var screenshotManager = MenuBarScreenshotManager()
    #endif

    var body: some Scene {
        WindowGroup {
            ContentView()
                #if os(macOS)
                .frame(minWidth: 1200, minHeight: 800)
                .environmentObject(recordingManager)
                #endif
        }
        #if os(macOS)
        .windowStyle(.hiddenTitleBar)
        .commands {
            CommandGroup(replacing: .newItem) {}
        }
        #endif

        #if os(macOS)
        // Configuration Panel Window (floating)
        Window("Configure Recording", id: "recording-config") {
            RecordingConfigurationView(manager: recordingManager)
        }
        .windowStyle(.hiddenTitleBar)
        .defaultSize(width: 400, height: 500)
        .windowResizability(.contentSize)

        // Menu Bar (always visible, menu style)
        MenuBarExtra {
            MenuBarMenuView(manager: recordingManager, screenshotManager: screenshotManager)
        } label: {
            MenuBarRecordingIcon(manager: recordingManager)
        }
        .menuBarExtraStyle(.menu)

        // Settings
        Settings {
            UserSettingsView()
                .frame(width: 600, height: 500)
        }
        #endif
    }
}
