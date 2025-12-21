#if os(macOS)
import SwiftUI
import UniformTypeIdentifiers

struct ExportDialog: View {
    let capturedContent: CapturedContent
    let configuration: CanvasConfiguration
    @Binding var isPresented: Bool

    @State private var exportSettings = ExportSettings()
    @State private var isExporting = false
    @State private var exportProgress: Double = 0
    @State private var exportError: String?

    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack {
                Text("Export")
                    .font(.title2)
                    .fontWeight(.bold)

                Spacer()

                Button(action: { isPresented = false }) {
                    Image(systemName: "xmark.circle.fill")
                        .font(.title2)
                        .foregroundColor(.secondary)
                }
                .buttonStyle(.plain)
            }
            .padding(20)

            Divider()

            // Content
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    // Format Selection
                    if capturedContent.type == .recording {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Format")
                                .font(.headline)

                            HStack(spacing: 12) {
                                ForEach(VideoExportFormat.allCases) { format in
                                    FormatButton(
                                        format: format,
                                        isSelected: exportSettings.format == format,
                                        action: { exportSettings.format = format }
                                    )
                                }
                            }
                        }
                    } else {
                        // Screenshots only support PNG
                        HStack {
                            Text("Format")
                                .font(.headline)
                            Spacer()
                            Text("PNG")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                                .padding(.horizontal, 12)
                                .padding(.vertical, 6)
                                .background(
                                    RoundedRectangle(cornerRadius: 6)
                                        .fill(Color(.controlBackgroundColor))
                                )
                        }
                    }

                    Divider()

                    // Quality Settings (for video/gif)
                    if capturedContent.type == .recording {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Quality")
                                .font(.headline)

                            HStack(spacing: 12) {
                                ForEach(ExportQuality.allCases) { quality in
                                    QualityButton(
                                        quality: quality,
                                        isSelected: exportSettings.quality == quality,
                                        action: { exportSettings.quality = quality }
                                    )
                                }
                            }
                        }

                        Divider()

                        // Resolution
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Resolution")
                                .font(.headline)

                            HStack(spacing: 12) {
                                ForEach(ExportResolution.allCases) { resolution in
                                    ResolutionButton(
                                        resolution: resolution,
                                        isSelected: exportSettings.resolution == resolution,
                                        action: { exportSettings.resolution = resolution }
                                    )
                                }
                            }
                        }

                        // GIF-specific settings
                        if exportSettings.format == .gif {
                            Divider()

                            VStack(alignment: .leading, spacing: 12) {
                                Text("GIF Settings")
                                    .font(.headline)

                                HStack {
                                    Text("Frame Rate")
                                        .font(.subheadline)
                                        .foregroundColor(.secondary)
                                    Spacer()
                                    Text("\(exportSettings.frameRate) fps")
                                        .font(.subheadline)
                                        .foregroundColor(.secondary)
                                        .fontDesign(.monospaced)
                                }
                                Slider(
                                    value: Binding(
                                        get: { Double(exportSettings.frameRate) },
                                        set: { exportSettings.frameRate = Int($0) }
                                    ),
                                    in: 5...30,
                                    step: 1
                                )

                                Toggle("Loop GIF", isOn: $exportSettings.loopGif)
                                    .toggleStyle(.switch)
                            }
                        }
                    }

                    // Export Preview Info
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Export Details")
                            .font(.headline)

                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("Original Size")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Text("\(Int(capturedContent.originalSize.width)) × \(Int(capturedContent.originalSize.height))")
                                    .font(.subheadline)
                                    .fontDesign(.monospaced)
                            }

                            Spacer()

                            VStack(alignment: .trailing, spacing: 4) {
                                Text("Export Size")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Text(exportSizeString)
                                    .font(.subheadline)
                                    .fontDesign(.monospaced)
                            }
                        }
                        .padding(12)
                        .background(
                            RoundedRectangle(cornerRadius: 8)
                                .fill(Color(.controlBackgroundColor))
                        )
                    }

                    // Error message
                    if let error = exportError {
                        HStack {
                            Image(systemName: "exclamationmark.triangle.fill")
                                .foregroundColor(.red)
                            Text(error)
                                .font(.subheadline)
                                .foregroundColor(.red)
                        }
                        .padding(12)
                        .background(
                            RoundedRectangle(cornerRadius: 8)
                                .fill(Color.red.opacity(0.1))
                        )
                    }
                }
                .padding(20)
            }

            Divider()

            // Footer
            HStack {
                Button("Cancel") {
                    isPresented = false
                }
                .keyboardShortcut(.escape)

                Spacer()

                if isExporting {
                    HStack(spacing: 12) {
                        ProgressView(value: exportProgress)
                            .frame(width: 100)
                        Text("\(Int(exportProgress * 100))%")
                            .font(.caption)
                            .foregroundColor(.secondary)
                            .fontDesign(.monospaced)
                    }
                } else {
                    Button(action: performExport) {
                        Label("Export", systemImage: "square.and.arrow.up")
                    }
                    .buttonStyle(.borderedProminent)
                    .keyboardShortcut(.return)
                }
            }
            .padding(20)
        }
        .frame(width: 500, height: capturedContent.type == .recording ? 600 : 400)
        .background(Color(.windowBackgroundColor))
    }

    private var exportSizeString: String {
        if let height = exportSettings.resolution.height {
            let aspectRatio = capturedContent.originalSize.width / capturedContent.originalSize.height
            let width = Int(CGFloat(height) * aspectRatio)
            return "\(width) × \(height)"
        }
        return "\(Int(capturedContent.originalSize.width)) × \(Int(capturedContent.originalSize.height))"
    }

    private func performExport() {
        isExporting = true
        exportError = nil
        exportProgress = 0

        // Show save panel
        let savePanel = NSSavePanel()
        savePanel.canCreateDirectories = true

        if capturedContent.type == .screenshot {
            savePanel.allowedContentTypes = [.png]
            savePanel.nameFieldStringValue = "screenshot.png"
        } else {
            switch exportSettings.format {
            case .mp4:
                savePanel.allowedContentTypes = [.mpeg4Movie]
                savePanel.nameFieldStringValue = "recording.mp4"
            case .mov:
                savePanel.allowedContentTypes = [.quickTimeMovie]
                savePanel.nameFieldStringValue = "recording.mov"
            case .gif:
                savePanel.allowedContentTypes = [.gif]
                savePanel.nameFieldStringValue = "recording.gif"
            }
        }

        savePanel.begin { response in
            if response == .OK, let url = savePanel.url {
                Task {
                    await exportToURL(url)
                }
            } else {
                isExporting = false
            }
        }
    }

    private func exportToURL(_ url: URL) async {
        // Simulate export progress
        for i in 1...10 {
            try? await Task.sleep(nanoseconds: 100_000_000)
            await MainActor.run {
                exportProgress = Double(i) / 10.0
            }
        }

        // Actual export would happen here
        // For now, we'll just copy the file or save the image

        await MainActor.run {
            if capturedContent.type == .screenshot, let image = capturedContent.image {
                if let tiffData = image.tiffRepresentation,
                   let bitmap = NSBitmapImageRep(data: tiffData),
                   let pngData = bitmap.representation(using: .png, properties: [:]) {
                    do {
                        try pngData.write(to: url)
                        isExporting = false
                        isPresented = false
                    } catch {
                        exportError = "Failed to save image: \(error.localizedDescription)"
                        isExporting = false
                    }
                }
            } else if let videoURL = capturedContent.videoURL {
                do {
                    try FileManager.default.copyItem(at: videoURL, to: url)
                    isExporting = false
                    isPresented = false
                } catch {
                    exportError = "Failed to save video: \(error.localizedDescription)"
                    isExporting = false
                }
            }
        }
    }
}

// MARK: - Format Button

struct FormatButton: View {
    let format: VideoExportFormat
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 6) {
                Text(format.displayName)
                    .font(.headline)
                Text(format.mimeType)
                    .font(.caption)
                    .foregroundColor(isSelected ? .white.opacity(0.8) : .secondary)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 12)
            .background(
                RoundedRectangle(cornerRadius: 8)
                    .fill(isSelected ? Color.accentColor : Color(.controlBackgroundColor))
            )
            .foregroundColor(isSelected ? .white : .primary)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Quality Button

struct QualityButton: View {
    let quality: ExportQuality
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(quality.displayName)
                .font(.subheadline)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 8)
                .background(
                    RoundedRectangle(cornerRadius: 6)
                        .fill(isSelected ? Color.accentColor : Color(.controlBackgroundColor))
                )
                .foregroundColor(isSelected ? .white : .primary)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Resolution Button

struct ResolutionButton: View {
    let resolution: ExportResolution
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(resolution.displayName)
                .font(.subheadline)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 8)
                .background(
                    RoundedRectangle(cornerRadius: 6)
                        .fill(isSelected ? Color.accentColor : Color(.controlBackgroundColor))
                )
                .foregroundColor(isSelected ? .white : .primary)
        }
        .buttonStyle(.plain)
    }
}

#Preview {
    ExportDialog(
        capturedContent: CapturedContent(
            type: .recording,
            mode: .allDisplays,
            originalSize: CGSize(width: 1920, height: 1080),
            duration: 30.5,
            hasAudio: true
        ),
        configuration: CanvasConfiguration(),
        isPresented: .constant(true)
    )
}
#endif
