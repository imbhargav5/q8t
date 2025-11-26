// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "DesignGuideMac",
    platforms: [
        .macOS(.v14)
    ],
    products: [
        .executable(name: "DesignGuideMac", targets: ["DesignGuideMac"])
    ],
    targets: [
        .executableTarget(
            name: "DesignGuideMac",
            dependencies: [],
            path: ".",
            exclude: [
                "iOS",
                "README.md",
                "QUICKSTART.md",
                ".gitignore",
                "macOS/DesignGuideMac/Info.plist"
            ],
            sources: [
                "macOS/DesignGuideMac",
                "Shared"
            ],
            swiftSettings: [
                .unsafeFlags(["-parse-as-library"])
            ]
        )
    ]
)
