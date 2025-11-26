import SwiftUI

struct PermissionOnboardingView: View {
    @ObservedObject var permissionManager: PermissionManager
    @State private var isAnimating = false

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

            // Skip microphone option
            if permissionManager.screenRecordingPermission == .authorized &&
               permissionManager.microphonePermission == .notDetermined {
                Button("Skip Microphone Permission") {
                    // User chose to skip - this will still allow them to use the app
                    // The permission state will remain .notDetermined but we'll treat it as declined
                }
                .buttonStyle(.plain)
                .foregroundColor(.secondary)
                .font(.footnote)
            }

            Spacer()
        }
        .padding(.top, 60)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.windowBackgroundColor))
        .onAppear {
            isAnimating = true
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
