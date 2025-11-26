import SwiftUI

struct CaptureEditorView: View {
    let capturedContent: CapturedContent
    let onBack: () -> Void

    @State private var configuration = CanvasConfiguration()
    @State private var showingExportDialog = false

    var body: some View {
        VStack(spacing: 0) {
            // Top Nav Bar
            EditorNavBar(
                capturedContent: capturedContent,
                onBack: onBack,
                onExport: { showingExportDialog = true }
            )

            // Main Content Area
            HSplitView {
                // Left: Canvas Preview
                CanvasView(
                    capturedContent: capturedContent,
                    configuration: $configuration
                )
                .frame(minWidth: 400)
                .background(Color.black.opacity(0.1))

                // Right: Styling Controls
                StylingControls(configuration: $configuration)
                    .frame(width: 280)
                    .background(Color(.windowBackgroundColor))
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .sheet(isPresented: $showingExportDialog) {
            ExportDialog(
                capturedContent: capturedContent,
                configuration: configuration,
                isPresented: $showingExportDialog
            )
        }
    }
}

#Preview {
    CaptureEditorView(
        capturedContent: CapturedContent(
            type: .screenshot,
            mode: .allDisplays,
            originalSize: CGSize(width: 1920, height: 1080)
        ),
        onBack: {}
    )
    .frame(width: 1000, height: 700)
}
