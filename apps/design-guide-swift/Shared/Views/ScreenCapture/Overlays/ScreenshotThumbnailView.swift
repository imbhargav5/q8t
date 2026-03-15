#if os(macOS)
import SwiftUI

struct ScreenshotThumbnailView: View {
    let image: NSImage
    let onClick: () -> Void
    let onDismiss: () -> Void

    @State private var isHovering = false

    var body: some View {
        VStack(spacing: 0) {
            // Thumbnail image
            Image(nsImage: image)
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: 180, height: 100)
                .clipped()
                .cornerRadius(8)

            // Action bar
            HStack(spacing: 8) {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Screenshot saved")
                        .font(.caption)
                        .fontWeight(.medium)
                        .foregroundColor(.primary)
                    Text("Click to edit")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }

                Spacer()

                // Dismiss button
                Button(action: onDismiss) {
                    Image(systemName: "xmark")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                .buttonStyle(.plain)
                .opacity(isHovering ? 1 : 0.5)
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 8)
        }
        .padding(10)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(.ultraThinMaterial)
                .shadow(color: .black.opacity(0.2), radius: 10, y: 5)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.white.opacity(0.2), lineWidth: 0.5)
        )
        .scaleEffect(isHovering ? 1.02 : 1.0)
        .animation(.easeInOut(duration: 0.15), value: isHovering)
        .onHover { hovering in
            isHovering = hovering
        }
        .contentShape(Rectangle())
        .onTapGesture {
            onClick()
        }
    }
}

#Preview {
    ScreenshotThumbnailView(
        image: NSImage(systemSymbolName: "photo", accessibilityDescription: nil)!,
        onClick: {},
        onDismiss: {}
    )
    .frame(width: 220, height: 160)
    .padding()
    .background(Color.gray.opacity(0.3))
}
#endif
