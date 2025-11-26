import SwiftUI

struct EditorNavBar: View {
    let capturedContent: CapturedContent
    let onBack: () -> Void
    let onExport: () -> Void

    @State private var isHoveringBack = false
    @State private var isHoveringExport = false

    var body: some View {
        HStack(spacing: 16) {
            // Back Button
            Button(action: onBack) {
                HStack(spacing: 6) {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 14, weight: .semibold))
                    Text("New Capture")
                        .font(.subheadline)
                        .fontWeight(.medium)
                }
                .foregroundColor(isHoveringBack ? .primary : .secondary)
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(
                    RoundedRectangle(cornerRadius: 6)
                        .fill(isHoveringBack ? Color(.controlBackgroundColor) : Color.clear)
                )
            }
            .buttonStyle(.plain)
            .onHover { isHoveringBack = $0 }

            Spacer()

            // Content Info
            HStack(spacing: 12) {
                // Content type badge
                HStack(spacing: 6) {
                    Image(systemName: capturedContent.type.icon)
                        .font(.system(size: 12))
                    Text(capturedContent.type.displayName)
                        .font(.caption)
                        .fontWeight(.medium)
                }
                .foregroundColor(.secondary)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(
                    Capsule()
                        .fill(Color(.controlBackgroundColor))
                )

                // Size info
                Text("\(Int(capturedContent.originalSize.width)) × \(Int(capturedContent.originalSize.height))")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .fontDesign(.monospaced)

                // Duration for recordings
                if let duration = capturedContent.duration {
                    Text(formatDuration(duration))
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .fontDesign(.monospaced)
                }
            }

            Spacer()

            // Export Button
            Button(action: onExport) {
                HStack(spacing: 6) {
                    Image(systemName: "square.and.arrow.up")
                        .font(.system(size: 14, weight: .semibold))
                    Text("Export")
                        .font(.subheadline)
                        .fontWeight(.semibold)
                }
                .foregroundColor(.white)
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background(
                    RoundedRectangle(cornerRadius: 8)
                        .fill(
                            LinearGradient(
                                colors: [.purple, .blue],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                )
                .scaleEffect(isHoveringExport ? 1.02 : 1.0)
            }
            .buttonStyle(.plain)
            .onHover { isHoveringExport = $0 }
            .animation(.easeInOut(duration: 0.15), value: isHoveringExport)
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 12)
        .background(
            Rectangle()
                .fill(Color(.windowBackgroundColor))
                .shadow(color: .black.opacity(0.1), radius: 2, y: 1)
        )
    }

    private func formatDuration(_ duration: TimeInterval) -> String {
        let minutes = Int(duration) / 60
        let seconds = Int(duration) % 60
        let milliseconds = Int((duration.truncatingRemainder(dividingBy: 1)) * 10)
        return String(format: "%02d:%02d.%d", minutes, seconds, milliseconds)
    }
}

#Preview {
    VStack(spacing: 0) {
        EditorNavBar(
            capturedContent: CapturedContent(
                type: .recording,
                mode: .allDisplays,
                originalSize: CGSize(width: 1920, height: 1080),
                duration: 125.3,
                hasAudio: true
            ),
            onBack: {},
            onExport: {}
        )

        Spacer()
    }
    .frame(width: 900, height: 600)
    .background(Color(.windowBackgroundColor))
}
