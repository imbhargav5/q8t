import SwiftUI

struct CountdownOverlayView: View {
    let onComplete: () -> Void
    let onCancel: () -> Void

    @State private var currentNumber: Int = 3
    @State private var scale: CGFloat = 1.3
    @State private var opacity: Double = 0

    var body: some View {
        ZStack {
            // Semi-transparent background
            Color.black.opacity(0.6)
                .ignoresSafeArea()

            // Countdown number
            Text("\(currentNumber)")
                .font(.system(size: 200, weight: .bold, design: .rounded))
                .foregroundColor(.white)
                .scaleEffect(scale)
                .opacity(opacity)

            // Cancel button
            VStack {
                Spacer()
                Button(action: onCancel) {
                    HStack {
                        Image(systemName: "xmark")
                        Text("Cancel")
                    }
                    .padding(.horizontal, 20)
                    .padding(.vertical, 10)
                    .background(Color.white.opacity(0.2))
                    .cornerRadius(8)
                }
                .buttonStyle(.plain)
                .foregroundColor(.white)
                .padding(.bottom, 60)
            }

            // Instructions
            VStack {
                HStack {
                    Text("Recording will start in...")
                        .font(.title3)
                        .foregroundColor(.white.opacity(0.8))
                    Spacer()
                }
                .padding(40)
                Spacer()
            }
        }
        .onAppear {
            startCountdown()
        }
    }

    private func startCountdown() {
        // Initial animation for first number
        animateNumber()

        // Schedule countdown
        for i in 1...3 {
            DispatchQueue.main.asyncAfter(deadline: .now() + Double(i)) {
                if i < 3 {
                    currentNumber = 3 - i
                    animateNumber()
                } else {
                    // Countdown complete
                    withAnimation(.easeOut(duration: 0.2)) {
                        opacity = 0
                    }
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
                        onComplete()
                    }
                }
            }
        }
    }

    private func animateNumber() {
        // Reset state
        scale = 1.3
        opacity = 0

        // Animate in
        withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
            scale = 1.0
            opacity = 1.0
        }

        // Animate out before next number
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.7) {
            withAnimation(.easeOut(duration: 0.2)) {
                opacity = 0
            }
        }
    }
}

#Preview {
    CountdownOverlayView(
        onComplete: { print("Complete") },
        onCancel: { print("Cancel") }
    )
    .frame(width: 800, height: 600)
}
