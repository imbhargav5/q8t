import SwiftUI

struct PlatformBadge: View {
    let platform: SocialPlatform
    let size: CGFloat

    init(platform: SocialPlatform, size: CGFloat = 20) {
        self.platform = platform
        self.size = size
    }

    var body: some View {
        ZStack {
            Circle()
                .fill(Color(hex: platform.color))
                .frame(width: size, height: size)

            Text(String(platform.displayName.prefix(1)))
                .font(.system(size: size * 0.5, weight: .bold))
                .foregroundColor(.white)
        }
    }
}
