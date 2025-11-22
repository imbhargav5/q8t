# Chatsian DesignGuide - Swift Edition

Native macOS and iOS applications built with SwiftUI, showcasing the complete Chatsian social media management platform design.

## Overview

This is a design guide and preview application for **Chatsian**, a modern social media management platform. The apps feature:

- **Complete UI/UX** implementation of all major features
- **Mock data** for realistic demonstrations
- **Native Swift/SwiftUI** code for both macOS and iOS
- **Shared codebase** for models, views, and business logic

## Features

### ✅ Implemented Features

1. **Landing Page**
   - Hero section with platform overview
   - Feature showcase
   - Supported platforms
   - Tech stack information

2. **Social Inbox**
   - Unified inbox across 17+ social platforms
   - Three-panel layout (conversations, detail, sidebar)
   - Platform badges and status indicators
   - Real-time conversation filtering
   - Message threading

3. **User Settings**
   - General settings (theme, language, timezone)
   - Privacy settings (visibility, communication preferences)
   - Security settings (2FA, active sessions, API keys)

4. **Workspace Settings**
   - General workspace configuration
   - Team member management
   - Role-based permissions
   - Plan and billing management

5. **Workspace Home**
   - Dashboard with stats and metrics
   - Team member overview
   - Seat usage tracking
   - Quick actions

### 🚧 Coming Soon

- Publishing (schedule posts)
- Analytics (performance dashboards)
- CRM (customer relationship management)
- Automations (workflow automation)

## Project Structure

```
apps/design-guide-swift/
├── Shared/                          # Shared code for both platforms
│   ├── Models/                      # Data models (Codable structs)
│   │   ├── Enums.swift             # All enumerations
│   │   ├── User.swift              # User models
│   │   ├── Person.swift            # Contact/CRM models
│   │   ├── Conversation.swift      # Messaging models
│   │   ├── Message.swift           # Message models
│   │   ├── Workspace.swift         # Workspace models
│   │   └── Settings.swift          # Settings models
│   ├── MockData/                    # Mock data layer
│   │   ├── MockUsers.swift
│   │   ├── MockPeople.swift
│   │   ├── MockConversations.swift
│   │   ├── MockMessages.swift
│   │   ├── MockWorkspaces.swift
│   │   └── MockSettings.swift
│   └── Views/                       # SwiftUI views
│       ├── Components/              # Reusable components
│       │   ├── PlatformBadge.swift
│       │   ├── StatusBadge.swift
│       │   └── UserAvatar.swift
│       ├── SocialInbox/            # Inbox views
│       │   ├── SocialInboxView.swift
│       │   ├── ConversationListView.swift
│       │   ├── ConversationListItem.swift
│       │   ├── ConversationDetailView.swift
│       │   └── ConversationSidebarView.swift
│       ├── Settings/               # Settings views
│       │   └── UserSettingsView.swift
│       ├── Workspace/              # Workspace views
│       │   ├── WorkspaceHomeView.swift
│       │   └── WorkspaceSettingsView.swift
│       └── Landing/                # Landing page
│           └── LandingPageView.swift
├── macOS/                          # macOS-specific code
│   └── DesignGuideMac/
│       ├── DesignGuideMacApp.swift # macOS app entry point
│       └── Info.plist
└── iOS/                            # iOS-specific code
    └── DesignGuideiOS/
        ├── DesignGuideiOSApp.swift # iOS app entry point
        └── Info.plist
```

## Setup Instructions

### Prerequisites

- **Xcode 15.0+** (for macOS development)
- **macOS 13.0+** (Ventura) or **iOS 17.0+**
- Basic knowledge of SwiftUI

### Creating the Xcode Projects

Since Xcode projects are binary files that can't be easily version controlled, you'll need to create them manually:

#### For macOS App:

1. Open Xcode
2. Select **File > New > Project**
3. Choose **macOS > App**
4. Configure the project:
   - Product Name: `DesignGuideMac`
   - Team: Your team
   - Organization Identifier: `com.chatsian`
   - Interface: **SwiftUI**
   - Language: **Swift**
   - Storage: None
5. Save to: `apps/design-guide-swift/macOS/`
6. Add all files from `Shared/` to the project:
   - Right-click on project > Add Files
   - Select the entire `Shared` folder
   - ✅ Check "Create groups"
   - ✅ Check "DesignGuideMac" target
7. Replace the default `ContentView.swift` with our `DesignGuideMacApp.swift`
8. Update deployment target to macOS 13.0+

#### For iOS App:

1. Open Xcode
2. Select **File > New > Project**
3. Choose **iOS > App**
4. Configure the project:
   - Product Name: `DesignGuideiOS`
   - Team: Your team
   - Organization Identifier: `com.chatsian`
   - Interface: **SwiftUI**
   - Language: **Swift**
   - Storage: None
5. Save to: `apps/design-guide-swift/iOS/`
6. Add all files from `Shared/` to the project:
   - Right-click on project > Add Files
   - Select the entire `Shared` folder
   - ✅ Check "Create groups"
   - ✅ Check "DesignGuideiOS" target
7. Replace the default `ContentView.swift` with our `DesignGuideiOSApp.swift`
8. Update deployment target to iOS 17.0+

### Building and Running

#### macOS App:

1. Open `DesignGuideMac.xcodeproj` in Xcode
2. Select **DesignGuideMac** scheme
3. Choose **My Mac** as the destination
4. Press **⌘R** to build and run

#### iOS App:

1. Open `DesignGuideiOS.xcodeproj` in Xcode
2. Select **DesignGuideiOS** scheme
3. Choose an iOS Simulator (e.g., iPhone 15 Pro) or your device
4. Press **⌘R** to build and run

## Data Models

All data models are built using Swift's `Codable` protocol for easy serialization:

### Core Models

- **User** - User accounts and profiles
- **Person** - CRM contacts with social identities
- **Conversation** - Message threads across platforms
- **Message** - Individual messages with engagement
- **Workspace** - Team workspace configuration
- **Settings** - User preferences and security settings

### Enumerations

- **SocialPlatform** - 17 supported platforms (WhatsApp, Twitter, Instagram, etc.)
- **ConversationStatus** - open, pending, resolved, archived
- **WorkspaceRole** - owner, admin, member, guest
- **UserStatus** - online, away, busy, offline
- **Theme** - light, dark, system

## Mock Data

All mock data is realistic and demonstrates various scenarios:

- **5 team members** with different roles and statuses
- **8 CRM contacts** including VIPs, customers, and influencers
- **10+ conversations** across different platforms and statuses
- **Complete settings** including 2FA, sessions, API keys
- **Workspace configuration** with Professional plan subscription

## Key Features by Platform

### macOS App

- **Sidebar navigation** with all main sections
- **Multi-column layouts** optimized for large screens
- **Keyboard shortcuts** and macOS-native controls
- **Settings panel** accessible via menu bar
- **Minimum window size**: 1200x800

### iOS App

- **Tab bar navigation** for quick access
- **Adaptive layouts** for iPhone and iPad
- **Native iOS controls** and gestures
- **Optimized for touch** interaction
- **Supports all orientations** on iPad

## Architecture

### Shared Code Pattern

The project uses a **shared codebase** approach:

1. **Models** are 100% shared (Codable structs)
2. **Mock Data** is 100% shared
3. **Views** are mostly shared with platform-specific adaptations
4. **Navigation** is platform-specific (Sidebar vs TabBar)

### Benefits

- ✅ **Single source of truth** for data models
- ✅ **Consistent UI/UX** across platforms
- ✅ **Reduced code duplication**
- ✅ **Easier maintenance** and updates
- ✅ **Platform-optimized** user experiences

## Development Notes

### Mock Data vs Real Data

This is a **design guide application** using mock data. In a production app:

- Replace mock data with API calls
- Add proper error handling
- Implement authentication
- Add data persistence
- Handle loading states

### Customization

To customize the app:

1. **Colors**: Update `primaryColor` and `secondaryColor` in `MockWorkspaces`
2. **Branding**: Replace app name in navigation titles
3. **Features**: Implement "Coming Soon" views with real functionality
4. **Mock Data**: Edit files in `Shared/MockData/` to add more scenarios

### Adding New Views

1. Create view file in `Shared/Views/`
2. Add navigation item to both apps
3. Update mock data if needed
4. Test on both macOS and iOS

## Supported Platforms

### Social Media Platforms (17)

WhatsApp, Threads, Twitter/X, Facebook, Instagram, LinkedIn, Pinterest, Reddit, Slack, Discord, TikTok, YouTube, Bluesky, Telegram, Mastodon, Farcaster, Nostr

### Subscription Plans (4)

- **Free**: 1 social account, 100 messages/month
- **Starter**: 5 social accounts, 1K messages/month, $19/month
- **Professional**: Unlimited accounts, 10K messages/month, $49/month
- **Enterprise**: Unlimited everything, custom SLA, $199/month

## Screenshots

### macOS App
- Three-panel Social Inbox layout
- Native sidebar navigation
- Settings with tabbed interface
- Workspace management

### iOS App
- Tab bar navigation
- Adaptive layouts for iPhone/iPad
- Touch-optimized controls
- Native iOS design patterns

## Contributing

This is a reference implementation. Feel free to:

- Fork and customize for your needs
- Add new features
- Improve UI/UX
- Submit pull requests

## License

Copyright © 2024 Chatsian. All rights reserved.

## Questions?

For questions about this implementation, please refer to:
- The TypeScript/React version in `apps/design-guide/`
- Apple's SwiftUI documentation
- Xcode's built-in documentation

---

**Built with ❤️ using Swift and SwiftUI**
