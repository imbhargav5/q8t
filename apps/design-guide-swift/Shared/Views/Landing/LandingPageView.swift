import SwiftUI

struct LandingPageView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 40) {
                // Hero Section
                VStack(spacing: 20) {
                    Image(systemName: "bubble.left.and.bubble.right.fill")
                        .font(.system(size: 80))
                        .foregroundStyle(
                            LinearGradient(
                                colors: [.blue, .purple],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )

                    Text("q8t")
                        .font(.system(size: 48, weight: .bold))

                    Text("Modern Social Media Management Platform")
                        .font(.title2)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)

                    Text("Unified inbox, powerful analytics, and seamless team collaboration")
                        .font(.body)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                }
                .padding(.top, 40)

                // Features
                VStack(alignment: .leading, spacing: 20) {
                    Text("Features")
                        .font(.title)
                        .fontWeight(.bold)

                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 250))], spacing: 20) {
                        FeatureCard(
                            icon: "tray.fill",
                            title: "Social Inbox",
                            description: "Manage all your social media messages in one unified inbox"
                        )

                        FeatureCard(
                            icon: "calendar",
                            title: "Publishing",
                            description: "Schedule and publish content across multiple platforms"
                        )

                        FeatureCard(
                            icon: "chart.bar.fill",
                            title: "Analytics",
                            description: "Track performance with comprehensive analytics dashboards"
                        )

                        FeatureCard(
                            icon: "person.3.fill",
                            title: "Team Collaboration",
                            description: "Work together with your team seamlessly"
                        )

                        FeatureCard(
                            icon: "bolt.fill",
                            title: "Automations",
                            description: "Automate repetitive tasks and workflows"
                        )

                        FeatureCard(
                            icon: "link",
                            title: "Integrations",
                            description: "Connect with your favorite tools and services"
                        )
                    }
                }
                .padding()

                // Supported Platforms
                VStack(alignment: .leading, spacing: 20) {
                    Text("Supported Platforms")
                        .font(.title)
                        .fontWeight(.bold)

                    FlowLayout(spacing: 12) {
                        ForEach(SocialPlatform.allCases) { platform in
                            PlatformChip(platform: platform)
                        }
                    }
                }
                .padding()

                // Tech Stack
                VStack(alignment: .leading, spacing: 20) {
                    Text("Built With")
                        .font(.title)
                        .fontWeight(.bold)

                    VStack(alignment: .leading, spacing: 12) {
                        TechItem(icon: "swift", title: "Swift & SwiftUI", description: "Native macOS and iOS apps")
                        TechItem(icon: "hammer.fill", title: "Type-Safe Models", description: "Codable structs for data integrity")
                        TechItem(icon: "paintbrush.fill", title: "Modern Design", description: "Beautiful, intuitive interface")
                        TechItem(icon: "cloud.fill", title: "Mock Data", description: "Complete mock data for testing")
                    }
                }
                .padding()

                // About
                VStack(spacing: 16) {
                    Text("About This App")
                        .font(.title2)
                        .fontWeight(.bold)

                    Text("This is a design guide and preview application for q8t, a modern social media management platform. All data is mock data for demonstration purposes.")
                        .font(.body)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)

                    Text("Built as a native macOS and iOS application using SwiftUI")
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(12)
                .padding()

                // Footer
                Text("© 2024 q8t. All rights reserved.")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .padding(.bottom, 40)
            }
        }
    }
}

struct FeatureCard: View {
    let icon: String
    let title: String
    let description: String

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Image(systemName: icon)
                .font(.title)
                .foregroundColor(.blue)

            Text(title)
                .font(.headline)

            Text(description)
                .font(.caption)
                .foregroundColor(.secondary)
                .lineLimit(3)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

struct PlatformChip: View {
    let platform: SocialPlatform

    var body: some View {
        HStack(spacing: 6) {
            PlatformBadge(platform: platform, size: 16)
            Text(platform.displayName)
                .font(.caption)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 6)
        .background(Color(.systemGray6))
        .cornerRadius(16)
    }
}

struct TechItem: View {
    let icon: String
    let title: String
    let description: String

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(.blue)
                .frame(width: 40)

            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.body)
                    .fontWeight(.medium)

                Text(description)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }
}
