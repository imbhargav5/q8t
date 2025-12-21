#if os(macOS)
import Foundation
import ScreenCaptureKit
import AVFoundation
import Combine
import CoreGraphics

@MainActor
class PermissionManager: ObservableObject {
    static let shared = PermissionManager()
    
    // MARK: - Debug Configuration
    // Set to true to bypass permission checks during development
    // This is needed because unsigned debug builds on macOS Sequoia
    // have unreliable permission detection
    #if DEBUG
    private let bypassPermissionChecks = true
    #else
    private let bypassPermissionChecks = false
    #endif

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
        // Guard against concurrent permission checks to prevent state flickering
        guard !isCheckingPermissions else { return }
        isCheckingPermissions = true
        defer { isCheckingPermissions = false }
        
        await checkScreenRecordingPermission()
        await checkMicrophonePermission()
    }

    func checkScreenRecordingPermission() async {
        // Debug bypass for development builds
        if bypassPermissionChecks {
            print("⚠️ DEBUG: Bypassing permission check - assuming AUTHORIZED")
            screenRecordingPermission = .authorized
            return
        }
        
        let preflightResult = CGPreflightScreenCaptureAccess()
        print("🔍 CGPreflightScreenCaptureAccess() = \(preflightResult)")
        
        // Primary check: Use the proper CoreGraphics API
        if preflightResult {
            print("✅ Screen recording permission: AUTHORIZED (CGPreflight)")
            screenRecordingPermission = .authorized
            return
        }
        
        // Fallback: Try actual content access
        // This is the REAL test - can we actually get screen content?
        do {
            print("🔍 Trying SCShareableContent fallback...")
            let content = try await SCShareableContent.excludingDesktopWindows(false, onScreenWindowsOnly: true)
            print("🔍 SCShareableContent returned: \(content.displays.count) displays, \(content.windows.count) windows")
            
            if !content.displays.isEmpty {
                print("✅ Screen recording permission: AUTHORIZED (fallback - found \(content.displays.count) displays)")
                screenRecordingPermission = .authorized
                return
            } else {
                print("⚠️ SCShareableContent returned empty displays")
            }
        } catch let error as NSError {
            print("❌ SCShareableContent error: domain=\(error.domain) code=\(error.code) - \(error.localizedDescription)")
        } catch {
            print("❌ SCShareableContent error: \(error)")
        }
        
        // Last resort: Check if we previously had permission (avoid resetting on transient failures)
        if screenRecordingPermission == .authorized {
            print("⚠️ Keeping existing AUTHORIZED state despite failed checks")
        } else {
            print("❌ Screen recording permission: DENIED (all checks failed)")
            screenRecordingPermission = .denied
        }
    }

    func checkMicrophonePermission() async {
        // Debug bypass for development builds
        if bypassPermissionChecks {
            print("⚠️ DEBUG: Bypassing microphone permission check - assuming AUTHORIZED")
            microphonePermission = .authorized
            return
        }
        
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
        // First, try to trigger the system permission dialog
        // This only works once per app install - subsequent calls are no-ops
        // But it's the proper way to request permission
        CGRequestScreenCaptureAccess()
        
        // Open System Preferences for the user to grant permission
        // This is needed because CGRequestScreenCaptureAccess() may not show a dialog
        // if the user previously denied or if this isn't the first request
        if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture") {
            NSWorkspace.shared.open(url)
        }
        
        // Start polling for permission changes
        startPermissionPolling()
    }

    func requestMicrophonePermission() async {
        print("Requesting microphone permission...")
        let granted = await AVCaptureDevice.requestAccess(for: .audio)
        print("Microphone permission result: \(granted)")
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

    var allPermissionsGranted: Bool {
        screenRecordingPermission == .authorized && microphonePermission == .authorized
    }

    var hasMicrophonePermission: Bool {
        microphonePermission == .authorized
    }

    var currentPermissionStep: PermissionType? {
        if screenRecordingPermission != .authorized {
            return .screenRecording
        }
        // Microphone is optional - only show as current step if user hasn't decided yet
        if microphonePermission == .notDetermined {
            return .microphone
        }
        return nil
    }

    var isOnboardingComplete: Bool {
        // Only screen recording is required for onboarding completion
        // Microphone is optional and can be granted later
        screenRecordingPermission == .authorized
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
#endif
