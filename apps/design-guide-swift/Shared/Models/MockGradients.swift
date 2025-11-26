import Foundation

// MARK: - Mock Gradients
struct MockGradients {

    // MARK: - Preset Gradients
    static let presets: [GradientBackground] = [
        // Purple to Blue
        GradientBackground(
            name: "Ocean Breeze",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#667eea", location: 0.0),
                GradientColorStop(color: "#764ba2", location: 1.0)
            ],
            angle: 135
        ),

        // Pink to Orange
        GradientBackground(
            name: "Sunset Glow",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#f093fb", location: 0.0),
                GradientColorStop(color: "#f5576c", location: 1.0)
            ],
            angle: 135
        ),

        // Green to Teal
        GradientBackground(
            name: "Forest Mist",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#11998e", location: 0.0),
                GradientColorStop(color: "#38ef7d", location: 1.0)
            ],
            angle: 135
        ),

        // Blue to Cyan
        GradientBackground(
            name: "Arctic Dawn",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#4facfe", location: 0.0),
                GradientColorStop(color: "#00f2fe", location: 1.0)
            ],
            angle: 135
        ),

        // Dark Purple to Deep Blue
        GradientBackground(
            name: "Midnight",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#0f0c29", location: 0.0),
                GradientColorStop(color: "#302b63", location: 0.5),
                GradientColorStop(color: "#24243e", location: 1.0)
            ],
            angle: 135
        ),

        // Orange to Red
        GradientBackground(
            name: "Ember",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#ff512f", location: 0.0),
                GradientColorStop(color: "#dd2476", location: 1.0)
            ],
            angle: 135
        ),

        // Light Pink to Light Purple
        GradientBackground(
            name: "Cotton Candy",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#ffecd2", location: 0.0),
                GradientColorStop(color: "#fcb69f", location: 1.0)
            ],
            angle: 135
        ),

        // Deep Blue to Purple
        GradientBackground(
            name: "Galaxy",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#1a2a6c", location: 0.0),
                GradientColorStop(color: "#b21f1f", location: 0.5),
                GradientColorStop(color: "#fdbb2d", location: 1.0)
            ],
            angle: 135
        ),

        // Radial Gradient - Blue Center
        GradientBackground(
            name: "Blue Nebula",
            type: .radial,
            colorStops: [
                GradientColorStop(color: "#00d2ff", location: 0.0),
                GradientColorStop(color: "#3a47d5", location: 1.0)
            ],
            angle: 0
        ),

        // Radial Gradient - Warm Center
        GradientBackground(
            name: "Solar Flare",
            type: .radial,
            colorStops: [
                GradientColorStop(color: "#f5af19", location: 0.0),
                GradientColorStop(color: "#f12711", location: 1.0)
            ],
            angle: 0
        ),

        // Angular Gradient - Rainbow
        GradientBackground(
            name: "Spectrum",
            type: .angular,
            colorStops: [
                GradientColorStop(color: "#ff0000", location: 0.0),
                GradientColorStop(color: "#ff8000", location: 0.17),
                GradientColorStop(color: "#ffff00", location: 0.33),
                GradientColorStop(color: "#00ff00", location: 0.5),
                GradientColorStop(color: "#0080ff", location: 0.67),
                GradientColorStop(color: "#8000ff", location: 0.83),
                GradientColorStop(color: "#ff0000", location: 1.0)
            ],
            angle: 0
        ),

        // Solid Colors
        GradientBackground(
            name: "Pure Black",
            type: .solid,
            colorStops: [
                GradientColorStop(color: "#000000", location: 0.0)
            ],
            angle: 0
        ),

        GradientBackground(
            name: "Pure White",
            type: .solid,
            colorStops: [
                GradientColorStop(color: "#ffffff", location: 0.0)
            ],
            angle: 0
        ),

        GradientBackground(
            name: "Slate Gray",
            type: .solid,
            colorStops: [
                GradientColorStop(color: "#1e293b", location: 0.0)
            ],
            angle: 0
        ),

        // More Linear Gradients
        GradientBackground(
            name: "Cyber Purple",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#8b5cf6", location: 0.0),
                GradientColorStop(color: "#6366f1", location: 0.5),
                GradientColorStop(color: "#3b82f6", location: 1.0)
            ],
            angle: 180
        ),

        GradientBackground(
            name: "Mint Fresh",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#84fab0", location: 0.0),
                GradientColorStop(color: "#8fd3f4", location: 1.0)
            ],
            angle: 120
        ),

        GradientBackground(
            name: "Peach Blossom",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#ffecd2", location: 0.0),
                GradientColorStop(color: "#fcb69f", location: 1.0)
            ],
            angle: 90
        ),

        GradientBackground(
            name: "Deep Space",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#000428", location: 0.0),
                GradientColorStop(color: "#004e92", location: 1.0)
            ],
            angle: 180
        ),

        GradientBackground(
            name: "Lavender Dream",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#ee9ca7", location: 0.0),
                GradientColorStop(color: "#ffdde1", location: 1.0)
            ],
            angle: 45
        ),

        GradientBackground(
            name: "Electric Violet",
            type: .linear,
            colorStops: [
                GradientColorStop(color: "#4776E6", location: 0.0),
                GradientColorStop(color: "#8E54E9", location: 1.0)
            ],
            angle: 135
        )
    ]

    // MARK: - Categories
    static var linearGradients: [GradientBackground] {
        presets.filter { $0.type == .linear }
    }

    static var radialGradients: [GradientBackground] {
        presets.filter { $0.type == .radial }
    }

    static var angularGradients: [GradientBackground] {
        presets.filter { $0.type == .angular }
    }

    static var solidColors: [GradientBackground] {
        presets.filter { $0.type == .solid }
    }

    // MARK: - Default
    static var `default`: GradientBackground {
        presets.first!
    }
}
