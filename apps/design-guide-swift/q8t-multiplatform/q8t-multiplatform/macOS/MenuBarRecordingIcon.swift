#if os(macOS)
import SwiftUI

struct MenuBarRecordingIcon: View {
    @ObservedObject var manager: MenuBarRecordingManager
    @State private var isPulsing = false

    var body: some View {
        Group {
            switch manager.menuBarState {
            case .idle, .configuring:
                // Static record icon
                Image(systemName: "record.circle")

            case .countdown(let value):
                // Show countdown number
                ZStack {
                    Circle()
                        .fill(Color.orange)
                        .frame(width: 16, height: 16)
                    Text("\(value)")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(.white)
                }

            case .recording:
                // Pulsing red circle
                ZStack {
                    Circle()
                        .fill(Color.red)
                        .frame(width: 10, height: 10)
                        .opacity(isPulsing ? 0.5 : 1.0)
                }
                .onAppear {
                    withAnimation(.easeInOut(duration: 0.8).repeatForever(autoreverses: true)) {
                        isPulsing = true
                    }
                }
                .onDisappear {
                    isPulsing = false
                }

            case .paused:
                // Static red circle (no pulse)
                ZStack {
                    Circle()
                        .stroke(Color.red, lineWidth: 2)
                        .frame(width: 10, height: 10)
                }

            case .processing:
                // Processing indicator
                ProgressView()
                    .scaleEffect(0.5)
            }
        }
    }
}

#Preview {
    HStack(spacing: 20) {
        // Preview different states
        MenuBarRecordingIcon(manager: MenuBarRecordingManager())
    }
    .padding()
}
#endif
