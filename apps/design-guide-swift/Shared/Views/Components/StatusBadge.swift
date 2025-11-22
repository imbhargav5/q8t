import SwiftUI

struct StatusBadge: View {
    let status: ConversationStatus

    var body: some View {
        Text(status.displayName)
            .font(.caption)
            .fontWeight(.medium)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(backgroundColor)
            .foregroundColor(foregroundColor)
            .cornerRadius(4)
    }

    private var backgroundColor: Color {
        switch status {
        case .open:
            return Color.blue.opacity(0.1)
        case .pending:
            return Color.yellow.opacity(0.1)
        case .resolved:
            return Color.green.opacity(0.1)
        case .archived:
            return Color.gray.opacity(0.1)
        }
    }

    private var foregroundColor: Color {
        switch status {
        case .open:
            return Color.blue
        case .pending:
            return Color.yellow
        case .resolved:
            return Color.green
        case .archived:
            return Color.gray
        }
    }
}
