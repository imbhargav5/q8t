#if os(macOS)
import SwiftUI
import AVKit

struct CanvasView: View {
    let capturedContent: CapturedContent
    @Binding var configuration: CanvasConfiguration

    @State private var dragOffset: CGSize = .zero
    @State private var isDragging = false

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                // Background Gradient
                configuration.background.makeView()
                    .ignoresSafeArea()

                // Content Container
                contentView
                    .clipShape(RoundedRectangle(cornerRadius: configuration.styling.cornerRadius))
                    .shadow(
                        color: configuration.styling.shadow.enabled
                            ? Color(hex: configuration.styling.shadow.color).opacity(configuration.styling.shadow.opacity)
                            : .clear,
                        radius: configuration.styling.shadow.radius,
                        x: configuration.styling.shadow.offsetX,
                        y: configuration.styling.shadow.offsetY
                    )
                    .scaleEffect(configuration.styling.scale)
                    .offset(x: totalOffsetX(in: geometry.size), y: totalOffsetY(in: geometry.size))
                    .gesture(
                        DragGesture()
                            .onChanged { value in
                                isDragging = true
                                dragOffset = value.translation
                            }
                            .onEnded { value in
                                isDragging = false
                                // Update the position in configuration
                                let maxOffsetX = (geometry.size.width - contentSize(in: geometry.size).width * configuration.styling.scale) / 2
                                let maxOffsetY = (geometry.size.height - contentSize(in: geometry.size).height * configuration.styling.scale) / 2

                                let newOffsetX = configuration.styling.positionX * maxOffsetX + value.translation.width
                                let newOffsetY = configuration.styling.positionY * maxOffsetY + value.translation.height

                                configuration.styling.positionX = maxOffsetX > 0 ? (newOffsetX / maxOffsetX).clamped(to: -1...1) : 0
                                configuration.styling.positionY = maxOffsetY > 0 ? (newOffsetY / maxOffsetY).clamped(to: -1...1) : 0

                                dragOffset = .zero
                            }
                    )
                    .animation(.easeOut(duration: 0.2), value: isDragging)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
    }

    @ViewBuilder
    private var contentView: some View {
        if capturedContent.type == .screenshot, let image = capturedContent.image {
            Image(nsImage: image)
                .resizable()
                .aspectRatio(contentMode: .fit)
        } else if capturedContent.type == .recording, let videoURL = capturedContent.videoURL {
            VideoPlayerView(url: videoURL)
        } else {
            // Placeholder
            Rectangle()
                .fill(Color.gray.opacity(0.3))
                .overlay(
                    Image(systemName: "photo")
                        .font(.system(size: 48))
                        .foregroundColor(.secondary)
                )
        }
    }

    private func contentSize(in canvasSize: CGSize) -> CGSize {
        let aspectRatio = capturedContent.originalSize.width / capturedContent.originalSize.height
        let padding = configuration.styling.padding * 2

        let availableWidth = canvasSize.width - padding
        let availableHeight = canvasSize.height - padding

        if availableWidth / availableHeight > aspectRatio {
            // Height-constrained
            let height = availableHeight
            let width = height * aspectRatio
            return CGSize(width: width, height: height)
        } else {
            // Width-constrained
            let width = availableWidth
            let height = width / aspectRatio
            return CGSize(width: width, height: height)
        }
    }

    private func totalOffsetX(in canvasSize: CGSize) -> CGFloat {
        let maxOffset = (canvasSize.width - contentSize(in: canvasSize).width * configuration.styling.scale) / 2
        return configuration.styling.positionX * maxOffset + dragOffset.width
    }

    private func totalOffsetY(in canvasSize: CGSize) -> CGFloat {
        let maxOffset = (canvasSize.height - contentSize(in: canvasSize).height * configuration.styling.scale) / 2
        return configuration.styling.positionY * maxOffset + dragOffset.height
    }
}

// MARK: - Video Player View

struct VideoPlayerView: View {
    let url: URL

    @State private var player: AVPlayer?
    @State private var isPlaying = false

    var body: some View {
        ZStack {
            if let player = player {
                VideoPlayer(player: player)
                    .onAppear {
                        player.play()
                        isPlaying = true

                        // Loop video
                        NotificationCenter.default.addObserver(
                            forName: .AVPlayerItemDidPlayToEndTime,
                            object: player.currentItem,
                            queue: .main
                        ) { _ in
                            player.seek(to: .zero)
                            player.play()
                        }
                    }
                    .onDisappear {
                        player.pause()
                    }
            } else {
                ProgressView()
            }
        }
        .onAppear {
            player = AVPlayer(url: url)
        }
    }
}

// MARK: - Comparable Extension

extension Comparable {
    func clamped(to range: ClosedRange<Self>) -> Self {
        return min(max(self, range.lowerBound), range.upperBound)
    }
}

#Preview {
    CanvasView(
        capturedContent: CapturedContent(
            type: .screenshot,
            mode: .allDisplays,
            originalSize: CGSize(width: 1920, height: 1080)
        ),
        configuration: .constant(CanvasConfiguration())
    )
    .frame(width: 800, height: 600)
}
#endif
