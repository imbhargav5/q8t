#if os(macOS)
import SwiftUI

struct PermissionOnboardingView: View {
    @ObservedObject var permissionManager: PermissionManager
    @State private var isAnimating = false
    @State private var microphonePromptTask: Task<Void, Never>?

    var body: some View {
        VStack(spacing: 40) {
            // Header
            VStack(spacing: 16) {
                Image(systemName: "record.circle")
                    .font(.system(size: 72))
                    .foregroundStyle(.linearGradient(
                        colors: [.purple, .blue],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ))
                    .symbolEffect(.pulse, isActive: isAnimating)

                Text("Screen Capture")
                    .font(.largeTitle)
                    .fontWeight(.bold)

                Text("Grant permissions to capture your screen and create beautiful recordings")
                    .font(.body)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 400)
            }

            // Permission Steps
            VStack(spacing: 20) {
                PermissionStepView(
                    permissionType: .screenRecording,
                    state: permissionManager.screenRecordingPermission,
                    isCurrentStep: permissionManager.currentPermissionStep == .screenRecording,
                    onRequest: {
                        permissionManager.requestScreenRecordingPermission()
                    }
                )

                PermissionStepView(
                    permissionType: .microphone,
                    state: permissionManager.microphonePermission,
                    isCurrentStep: permissionManager.currentPermissionStep == .microphone,
                    onRequest: {
                        Task {
                            await permissionManager.requestMicrophonePermission()
                        }
                    }
                )
            }
            .padding(.horizontal, 40)

            Spacer()
        }
        .padding(.top, 60)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.windowBackgroundColor))
        .onAppear {
            isAnimating = true
            // Start polling to detect permission changes from System Settings
            permissionManager.startPermissionPolling()
        }
        .onDisappear {
            permissionManager.stopPermissionPolling()
            // Cancel any pending microphone prompt when view disappears
            microphonePromptTask?.cancel()
            microphonePromptTask = nil
        }
        .onChange(of: permissionManager.currentPermissionStep) { _, newStep in
            // Cancel any existing microphone prompt task
            microphonePromptTask?.cancel()
            microphonePromptTask = nil
            
            // Auto-trigger microphone permission request when it becomes the current step
            // Add a delay to avoid jarring immediate prompts after screen recording is granted
            if newStep == .microphone {
                microphonePromptTask = Task {
                    // Wait 1 second before showing microphone prompt
                    // This gives user time to see the updated UI and prevents
                    // immediate popup if they're still interacting with System Settings
                    try? await Task.sleep(nanoseconds: 1_000_000_000)
                    
                    // Check if task was cancelled or if we should still show the prompt
                    guard !Task.isCancelled else { return }
                    guard permissionManager.currentPermissionStep == .microphone else { return }
                    guard permissionManager.microphonePermission == .notDetermined else { return }
                    
                    await permissionManager.requestMicrophonePermission()
                }
            }
        }
    }
}

struct PermissionStepView: View {
    let permissionType: PermissionType
    let state: PermissionState
    let isCurrentStep: Bool
    let onRequest: () -> Void

    var body: some View {
        HStack(spacing: 16) {
            // Status Icon
            ZStack {
                Circle()
                    .fill(statusColor.opacity(0.15))
                    .frame(width: 44, height: 44)

                Image(systemName: statusIcon)
                    .font(.system(size: 20))
                    .foregroundColor(statusColor)
            }

            // Content
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(permissionType.displayName)
                        .font(.headline)

                    if !permissionType.isRequired {
                        Text("Optional")
                            .font(.caption)
                            .foregroundColor(.secondary)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 2)
                            .background(Color.secondary.opacity(0.1))
                            .cornerRadius(4)
                    }
                }

                Text(permissionType.description)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }

            Spacer()

            // Action Button
            actionButton
        }
        .padding(16)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(isCurrentStep ? Color.accentColor.opacity(0.05) : Color(.controlBackgroundColor))
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .strokeBorder(isCurrentStep ? Color.accentColor.opacity(0.3) : Color.clear, lineWidth: 1)
                )
        )
        .opacity(shouldDim ? 0.5 : 1.0)
    }

    @ViewBuilder
    private var actionButton: some View {
        switch state {
        case .authorized:
            Image(systemName: "checkmark.circle.fill")
                .font(.title2)
                .foregroundColor(.green)

        case .denied, .restricted:
            Button("Open Settings") {
                if let url = permissionType.settingsURL {
                    NSWorkspace.shared.open(url)
                }
            }
            .buttonStyle(.borderedProminent)
            .tint(.orange)

        case .notDetermined:
            Button(isCurrentStep ? "Grant Access" : "Waiting...") {
                onRequest()
            }
            .buttonStyle(.borderedProminent)
            .disabled(!isCurrentStep)
        }
    }

    private var statusIcon: String {
        switch state {
        case .authorized:
            return "checkmark"
        case .denied, .restricted:
            return "xmark"
        case .notDetermined:
            return permissionType.icon
        }
    }

    private var statusColor: Color {
        switch state {
        case .authorized:
            return .green
        case .denied, .restricted:
            return .red
        case .notDetermined:
            return isCurrentStep ? .accentColor : .secondary
        }
    }

    private var shouldDim: Bool {
        !isCurrentStep && state == .notDetermined
    }
}

#Preview {
    PermissionOnboardingView(permissionManager: PermissionManager.shared)
        .frame(width: 600, height: 600)
}
#endif
