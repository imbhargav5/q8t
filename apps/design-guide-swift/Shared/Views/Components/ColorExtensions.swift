import SwiftUI

#if os(macOS)
import AppKit

extension NSColor {
    static var systemGray6: NSColor {
        return NSColor.controlBackgroundColor
    }

    static var systemGray5: NSColor {
        return NSColor.unemphasizedSelectedContentBackgroundColor
    }

    static var systemGray4: NSColor {
        return NSColor.separatorColor
    }

    static var systemGray3: NSColor {
        return NSColor.tertiaryLabelColor
    }

    static var systemGray2: NSColor {
        return NSColor.secondaryLabelColor
    }

    static var systemBackground: NSColor {
        return NSColor.windowBackgroundColor
    }

    static var secondarySystemBackground: NSColor {
        return NSColor.controlBackgroundColor
    }

    static var tertiarySystemBackground: NSColor {
        return NSColor.underPageBackgroundColor
    }
}

// CGColor extension to bridge to NSColor
extension CGColor {
    static var systemGray6: CGColor {
        return NSColor.systemGray6.cgColor
    }

    static var systemGray5: CGColor {
        return NSColor.systemGray5.cgColor
    }

    static var systemGray4: CGColor {
        return NSColor.systemGray4.cgColor
    }

    static var systemBackground: CGColor {
        return NSColor.systemBackground.cgColor
    }
}
#endif

// MARK: - Color Hex Extension
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
