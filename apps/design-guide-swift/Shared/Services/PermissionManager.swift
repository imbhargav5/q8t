import Foundation
import ScreenCaptureKit
import AVFoundation
import Combine

@MainActor
class PermissionManager: ObservableObject {
    static let shared = PermissionManager()

    @Published private(set) var screenRecordingPermission: PermissionState = .notDetermined
    @Published private(set) var microphonePermission: PermissionState = .notDetermined
    @Published private(set) var isCheckingPermissions = false

    private var permissionCheckTimer: Timer?
    private var cancellables = Set<AnyCancellable>()

    private init() {
        Task {
            await checkAllPermissions()
        }
    }

    // MARK: - Permission Checking

    func checkAllPermissions() async {
        isCheckingPermissions = true
        await checkScreenRecordingPermission()
        await checkMicrophonePermission()
        isCheckingPermissions = false
    }

    func checkScreenRecordingPermission() async {
        do {
            // Attempt to get shareable content - this will fail if permission not granted
            let content = try await SCShareableContent.excludingDesktopWindows(false, onScreenWindowsOnly: true)
            // If we can access displays, we have permission
            if !content.displays.isEmpty {
                screenRecordingPermission = .authorized
            } else {
                screenRecordingPermission = .denied
            }
        } catch {
            // Error means no permission
            screenRecordingPermission = .denied
        }
    }

    func checkMicrophonePermission() async {
        switch AVCaptureDevice.authorizationStatus(for: .audio) {
        case .authorized:
            microphonePermission = .authorized
        case .denied:
            microphonePermission = .denied
        case .restricted:
            microphonePermission = .restricted
        case .notDetermined:
            microphonePermission = .notDetermined
        @unknown default:
            microphonePermission = .notDetermined
        }
    }

    // MARK: - Permission Requests

    func requestScreenRecordingPermission() {
        // Open System Preferences to the Screen Recording pane
        if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture") {
            NSWorkspace.shared.open(url)
        }
        // Start polling for permission changes
        startPermissionPolling()
    }

    func requestMicrophonePermission() async {
        let granted = await AVCaptureDevice.requestAccess(for: .audio)
        microphonePermission = granted ? .authorized : .denied
    }

    // MARK: - Permission Polling

    func startPermissionPolling() {
        stopPermissionPolling()

        // Poll every 1 second to check if user has granted permission in System Preferences
        permissionCheckTimer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [weak self] _ in
            Task { @MainActor [weak self] in
                await self?.checkAllPermissions()
            }
        }
    }

    func stopPermissionPolling() {
        permissionCheckTimer?.invalidate()
        permissionCheckTimer = nil
    }

    // MARK: - Computed Properties

    var allRequiredPermissionsGranted: Bool {
        screenRecordingPermission == .authorized
    }

    var hasOptionalMicrophonePermission: Bool {
        microphonePermission == .authorized
    }

    var currentPermissionStep: PermissionType? {
        if screenRecordingPermission != .authorized {
            return .screenRecording
        }
        if microphonePermission == .notDetermined {
            return .microphone
        }
        return nil
    }

    var isOnboardingComplete: Bool {
        screenRecordingPermission == .authorized &&
        (microphonePermission == .authorized || microphonePermission == .denied)
    }

    // MARK: - Open System Preferences

    func openScreenRecordingPreferences() {
        if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture") {
            NSWorkspace.shared.open(url)
        }
    }

    func openMicrophonePreferences() {
        if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone") {
            NSWorkspace.shared.open(url)
        }
    }

    // MARK: - Cleanup

    deinit {
        permissionCheckTimer?.invalidate()
    }
}

// MARK: - Permission Info Helper
extension PermissionType {
    var settingsURL: URL? {
        switch self {
        case .screenRecording:
            return URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture")
        case .microphone:
            return URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone")
        }
    }
}
