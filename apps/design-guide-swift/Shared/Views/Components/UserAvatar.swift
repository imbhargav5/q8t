import SwiftUI

struct UserAvatar: View {
    let avatarURL: String?
    let name: String
    let size: CGFloat
    let showBadge: Bool
    let status: UserStatus?

    init(
        avatarURL: String?,
        name: String,
        size: CGFloat = 40,
        showBadge: Bool = false,
        status: UserStatus? = nil
    ) {
        self.avatarURL = avatarURL
        self.name = name
        self.size = size
        self.showBadge = showBadge
        self.status = status
    }

    var body: some View {
        ZStack(alignment: .bottomTrailing) {
            if let url = avatarURL, let imageURL = URL(string: url) {
                AsyncImage(url: imageURL) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    initialsView
                }
                .frame(width: size, height: size)
                .clipShape(Circle())
            } else {
                initialsView
            }

            if showBadge, let status = status {
                Circle()
                    .fill(statusColor(status))
                    .frame(width: size * 0.25, height: size * 0.25)
                    .overlay(
                        Circle()
                            .stroke(Color(.systemBackground), lineWidth: 2)
                    )
                    .offset(x: -2, y: -2)
            }
        }
    }

    private var initialsView: some View {
        ZStack {
            Circle()
                .fill(LinearGradient(
                    gradient: Gradient(colors: [Color.blue, Color.purple]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                ))
                .frame(width: size, height: size)

            Text(initials)
                .font(.system(size: size * 0.4, weight: .semibold))
                .foregroundColor(.white)
        }
    }

    private var initials: String {
        let components = name.split(separator: " ")
        if components.count >= 2 {
            return String(components[0].prefix(1) + components[1].prefix(1)).uppercased()
        } else {
            return String(name.prefix(2)).uppercased()
        }
    }

    private func statusColor(_ status: UserStatus) -> Color {
        switch status {
        case .online:
            return .green
        case .away:
            return .yellow
        case .busy:
            return .red
        case .offline:
            return .gray
        }
    }
}
