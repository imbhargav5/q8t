#if os(macOS)
import SwiftUI

struct StylingControls: View {
    @Binding var configuration: CanvasConfiguration

    @State private var expandedSections: Set<StylingSection> = [.background, .corners, .shadow]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                // Background Section
                CollapsibleSection(
                    title: "Background",
                    icon: "paintpalette.fill",
                    isExpanded: expandedSections.contains(.background),
                    onToggle: { toggleSection(.background) }
                ) {
                    GradientPicker(selectedGradient: $configuration.background)
                        .frame(height: 200)
                }

                Divider()

                // Aspect Ratio Section
                CollapsibleSection(
                    title: "Aspect Ratio",
                    icon: "aspectratio",
                    isExpanded: expandedSections.contains(.aspectRatio),
                    onToggle: { toggleSection(.aspectRatio) }
                ) {
                    VStack(spacing: 8) {
                        ForEach(AspectRatio.allCases) { ratio in
                            Button(action: { configuration.aspectRatio = ratio }) {
                                HStack {
                                    Text(ratio.displayName)
                                        .font(.subheadline)
                                    Spacer()
                                    if configuration.aspectRatio == ratio {
                                        Image(systemName: "checkmark")
                                            .foregroundColor(.accentColor)
                                    }
                                }
                                .padding(.vertical, 6)
                                .padding(.horizontal, 12)
                                .background(
                                    RoundedRectangle(cornerRadius: 6)
                                        .fill(configuration.aspectRatio == ratio ? Color.accentColor.opacity(0.1) : Color.clear)
                                )
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }

                Divider()

                // Corner Radius Section
                CollapsibleSection(
                    title: "Corners",
                    icon: "square.on.square",
                    isExpanded: expandedSections.contains(.corners),
                    onToggle: { toggleSection(.corners) }
                ) {
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Text("Radius")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                            Spacer()
                            Text("\(Int(configuration.styling.cornerRadius))px")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                                .fontDesign(.monospaced)
                        }

                        Slider(value: $configuration.styling.cornerRadius, in: 0...48, step: 1)

                        // Quick presets
                        HStack(spacing: 8) {
                            ForEach([0, 8, 16, 24, 32], id: \.self) { value in
                                Button(action: { configuration.styling.cornerRadius = Double(value) }) {
                                    Text("\(value)")
                                        .font(.caption)
                                        .frame(maxWidth: .infinity)
                                        .padding(.vertical, 4)
                                        .background(
                                            RoundedRectangle(cornerRadius: 4)
                                                .fill(configuration.styling.cornerRadius == Double(value) ? Color.accentColor : Color(.controlBackgroundColor))
                                        )
                                        .foregroundColor(configuration.styling.cornerRadius == Double(value) ? .white : .primary)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                    }
                }

                Divider()

                // Shadow Section
                CollapsibleSection(
                    title: "Shadow",
                    icon: "shadow",
                    isExpanded: expandedSections.contains(.shadow),
                    onToggle: { toggleSection(.shadow) }
                ) {
                    VStack(alignment: .leading, spacing: 12) {
                        Toggle("Enable Shadow", isOn: $configuration.styling.shadow.enabled)
                            .toggleStyle(.switch)

                        if configuration.styling.shadow.enabled {
                            VStack(spacing: 12) {
                                // Opacity
                                HStack {
                                    Text("Opacity")
                                        .font(.subheadline)
                                        .foregroundColor(.secondary)
                                    Spacer()
                                    Text("\(Int(configuration.styling.shadow.opacity * 100))%")
                                        .font(.subheadline)
                                        .foregroundColor(.secondary)
                                        .fontDesign(.monospaced)
                                }
                                Slider(value: $configuration.styling.shadow.opacity, in: 0...1, step: 0.05)

                                // Blur Radius
                                HStack {
                                    Text("Blur")
                                        .font(.subheadline)
                                        .foregroundColor(.secondary)
                                    Spacer()
                                    Text("\(Int(configuration.styling.shadow.radius))px")
                                        .font(.subheadline)
                                        .foregroundColor(.secondary)
                                        .fontDesign(.monospaced)
                                }
                                Slider(value: $configuration.styling.shadow.radius, in: 0...50, step: 1)

                                // Offset Y
                                HStack {
                                    Text("Offset Y")
                                        .font(.subheadline)
                                        .foregroundColor(.secondary)
                                    Spacer()
                                    Text("\(Int(configuration.styling.shadow.offsetY))px")
                                        .font(.subheadline)
                                        .foregroundColor(.secondary)
                                        .fontDesign(.monospaced)
                                }
                                Slider(value: $configuration.styling.shadow.offsetY, in: -30...30, step: 1)
                            }
                        }
                    }
                }

                Divider()

                // Padding Section
                CollapsibleSection(
                    title: "Padding",
                    icon: "arrow.up.left.and.arrow.down.right",
                    isExpanded: expandedSections.contains(.padding),
                    onToggle: { toggleSection(.padding) }
                ) {
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Text("Padding")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                            Spacer()
                            Text("\(Int(configuration.styling.padding))px")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                                .fontDesign(.monospaced)
                        }

                        Slider(value: $configuration.styling.padding, in: 0...100, step: 5)

                        // Quick presets
                        HStack(spacing: 8) {
                            ForEach([0, 20, 40, 60, 80], id: \.self) { value in
                                Button(action: { configuration.styling.padding = Double(value) }) {
                                    Text("\(value)")
                                        .font(.caption)
                                        .frame(maxWidth: .infinity)
                                        .padding(.vertical, 4)
                                        .background(
                                            RoundedRectangle(cornerRadius: 4)
                                                .fill(configuration.styling.padding == Double(value) ? Color.accentColor : Color(.controlBackgroundColor))
                                        )
                                        .foregroundColor(configuration.styling.padding == Double(value) ? .white : .primary)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                    }
                }

                Divider()

                // Scale Section
                CollapsibleSection(
                    title: "Scale",
                    icon: "arrow.up.left.and.down.right.magnifyingglass",
                    isExpanded: expandedSections.contains(.scale),
                    onToggle: { toggleSection(.scale) }
                ) {
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Text("Scale")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                            Spacer()
                            Text("\(Int(configuration.styling.scale * 100))%")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                                .fontDesign(.monospaced)
                        }

                        Slider(value: $configuration.styling.scale, in: 0.5...1.5, step: 0.05)

                        // Quick presets
                        HStack(spacing: 8) {
                            ForEach([0.75, 0.9, 1.0, 1.1, 1.25], id: \.self) { value in
                                Button(action: { configuration.styling.scale = value }) {
                                    Text("\(Int(value * 100))%")
                                        .font(.caption)
                                        .frame(maxWidth: .infinity)
                                        .padding(.vertical, 4)
                                        .background(
                                            RoundedRectangle(cornerRadius: 4)
                                                .fill(configuration.styling.scale == value ? Color.accentColor : Color(.controlBackgroundColor))
                                        )
                                        .foregroundColor(configuration.styling.scale == value ? .white : .primary)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                    }
                }

                Divider()

                // Position Section
                CollapsibleSection(
                    title: "Position",
                    icon: "move.3d",
                    isExpanded: expandedSections.contains(.position),
                    onToggle: { toggleSection(.position) }
                ) {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Drag the content on the canvas to reposition, or use the controls below")
                            .font(.caption)
                            .foregroundColor(.secondary)

                        // Position Grid
                        HStack(spacing: 8) {
                            ForEach([-1.0, 0.0, 1.0], id: \.self) { x in
                                VStack(spacing: 8) {
                                    ForEach([-1.0, 0.0, 1.0], id: \.self) { y in
                                        Button(action: {
                                            configuration.styling.positionX = x
                                            configuration.styling.positionY = y
                                        }) {
                                            Circle()
                                                .fill(isPositionSelected(x: x, y: y) ? Color.accentColor : Color(.controlBackgroundColor))
                                                .frame(width: 24, height: 24)
                                                .overlay(
                                                    Circle()
                                                        .strokeBorder(Color.gray.opacity(0.3), lineWidth: 1)
                                                )
                                        }
                                        .buttonStyle(.plain)
                                    }
                                }
                            }
                        }
                        .frame(maxWidth: .infinity)

                        Button(action: {
                            configuration.styling.positionX = 0
                            configuration.styling.positionY = 0
                        }) {
                            Text("Reset Position")
                                .font(.caption)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 6)
                        }
                        .buttonStyle(.bordered)
                    }
                }
            }
            .padding(16)
        }
    }

    private func toggleSection(_ section: StylingSection) {
        if expandedSections.contains(section) {
            expandedSections.remove(section)
        } else {
            expandedSections.insert(section)
        }
    }

    private func isPositionSelected(x: Double, y: Double) -> Bool {
        let tolerance = 0.3
        return abs(configuration.styling.positionX - x) < tolerance &&
               abs(configuration.styling.positionY - y) < tolerance
    }
}

// MARK: - Styling Section

enum StylingSection: String, CaseIterable {
    case background
    case aspectRatio
    case corners
    case shadow
    case padding
    case scale
    case position
}

// MARK: - Collapsible Section

struct CollapsibleSection<Content: View>: View {
    let title: String
    let icon: String
    let isExpanded: Bool
    let onToggle: () -> Void
    @ViewBuilder let content: () -> Content

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Button(action: onToggle) {
                HStack {
                    Image(systemName: icon)
                        .font(.system(size: 14))
                        .foregroundColor(.secondary)
                        .frame(width: 20)

                    Text(title)
                        .font(.subheadline)
                        .fontWeight(.semibold)

                    Spacer()

                    Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundColor(.secondary)
                }
            }
            .buttonStyle(.plain)

            if isExpanded {
                content()
                    .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
        .animation(.easeInOut(duration: 0.2), value: isExpanded)
    }
}

#Preview {
    StylingControls(configuration: .constant(CanvasConfiguration()))
        .frame(width: 280, height: 700)
        .background(Color(.windowBackgroundColor))
}
#endif
