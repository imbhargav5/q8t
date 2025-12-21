#if os(macOS)
import SwiftUI

struct GradientPicker: View {
    @Binding var selectedGradient: GradientBackground
    @State private var selectedCategory: GradientCategory = .all

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Category Tabs
            HStack(spacing: 0) {
                ForEach(GradientCategory.allCases) { category in
                    Button(action: { selectedCategory = category }) {
                        Text(category.displayName)
                            .font(.caption)
                            .fontWeight(selectedCategory == category ? .semibold : .regular)
                            .foregroundColor(selectedCategory == category ? .primary : .secondary)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 6)
                            .background(
                                RoundedRectangle(cornerRadius: 6)
                                    .fill(selectedCategory == category ? Color(.controlBackgroundColor) : Color.clear)
                            )
                    }
                    .buttonStyle(.plain)
                }
            }

            // Gradient Grid
            ScrollView {
                LazyVGrid(columns: [
                    GridItem(.adaptive(minimum: 60, maximum: 80), spacing: 8)
                ], spacing: 8) {
                    ForEach(filteredGradients) { gradient in
                        GradientThumbnail(
                            gradient: gradient,
                            isSelected: gradient.id == selectedGradient.id,
                            action: { selectedGradient = gradient }
                        )
                    }
                }
            }
        }
    }

    private var filteredGradients: [GradientBackground] {
        switch selectedCategory {
        case .all:
            return MockGradients.presets
        case .linear:
            return MockGradients.linearGradients
        case .radial:
            return MockGradients.radialGradients
        case .angular:
            return MockGradients.angularGradients
        case .solid:
            return MockGradients.solidColors
        }
    }
}

// MARK: - Gradient Category

enum GradientCategory: String, CaseIterable, Identifiable {
    case all
    case linear
    case radial
    case angular
    case solid

    var id: String { rawValue }

    var displayName: String {
        rawValue.capitalized
    }
}

// MARK: - Gradient Thumbnail

struct GradientThumbnail: View {
    let gradient: GradientBackground
    let isSelected: Bool
    let action: () -> Void

    @State private var isHovering = false

    var body: some View {
        Button(action: action) {
            ZStack {
                RoundedRectangle(cornerRadius: 8)
                    .fill(Color.clear)
                    .overlay(
                        gradient.makeView()
                            .clipShape(RoundedRectangle(cornerRadius: 8))
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 8)
                            .strokeBorder(
                                isSelected ? Color.white : (isHovering ? Color.white.opacity(0.5) : Color.clear),
                                lineWidth: isSelected ? 3 : 2
                            )
                    )
                    .shadow(
                        color: isSelected ? .accentColor.opacity(0.5) : .clear,
                        radius: 4
                    )

                if isSelected {
                    Image(systemName: "checkmark")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundColor(.white)
                        .shadow(color: .black.opacity(0.5), radius: 2)
                }
            }
            .aspectRatio(1, contentMode: .fit)
        }
        .buttonStyle(.plain)
        .onHover { isHovering = $0 }
        .help(gradient.name)
    }
}

#Preview {
    GradientPicker(selectedGradient: .constant(MockGradients.default))
        .frame(width: 300, height: 400)
        .padding()
        .background(Color(.windowBackgroundColor))
}
#endif
