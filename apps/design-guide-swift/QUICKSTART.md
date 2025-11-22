# Quick Start Guide

Get up and running with the Chatsian DesignGuide Swift apps in minutes!

## 🚀 Quick Setup (5 minutes)

### Step 1: Open Xcode

Make sure you have **Xcode 15.0+** installed on your Mac.

### Step 2: Create macOS Project

1. **Open Xcode**
2. **File > New > Project**
3. Select **macOS > App**
4. Fill in details:
   ```
   Product Name: DesignGuideMac
   Team: [Your Team]
   Organization Identifier: com.chatsian
   Interface: SwiftUI
   Language: Swift
   ```
5. **Save** to: `apps/design-guide-swift/macOS/`

### Step 3: Add Shared Code to macOS

1. In Xcode, **right-click** on the `DesignGuideMac` folder in the navigator
2. Select **Add Files to "DesignGuideMac"...**
3. Navigate to `apps/design-guide-swift/Shared/`
4. Select the **entire Shared folder**
5. ✅ Check **"Create groups"**
6. ✅ Check **"DesignGuideMac"** target
7. Click **Add**

### Step 4: Replace App File

1. **Delete** the default `ContentView.swift` file
2. The `DesignGuideMacApp.swift` file is already in the project from the Shared folder
3. Make sure it's set as the **@main** entry point

### Step 5: Set Deployment Target

1. Click on the **project** in the navigator
2. Select the **DesignGuideMac target**
3. Under **General > Minimum Deployments**
4. Set to **macOS 13.0** or later

### Step 6: Build & Run! 🎉

1. Select **DesignGuideMac** scheme
2. Choose **My Mac** as destination
3. Press **⌘R** (or click the Play button)

---

## 📱 iOS Setup (Same Process)

Repeat the same steps for iOS:

1. **File > New > Project**
2. Select **iOS > App**
3. Product Name: `DesignGuideiOS`
4. Save to: `apps/design-guide-swift/iOS/`
5. Add Shared folder to the iOS target
6. Set deployment target to **iOS 17.0+**
7. Press **⌘R** to run on simulator

---

## 🎯 What You'll See

### macOS App
- **Sidebar navigation** on the left
- **Landing page** as default view
- Click **"Social Inbox"** to see the main feature
- Try **"Workspace"** and **"User Settings"**

### iOS App
- **Tab bar** at the bottom
- **Home tab** shows the landing page
- **Inbox tab** shows the social inbox
- **Workspace** and **More tabs** for other features

---

## 🔍 Exploring the Code

### File Structure
```
Shared/
├── Models/          ← Data structures
├── MockData/        ← Sample data
└── Views/           ← UI components
    ├── Components/  ← Reusable pieces
    ├── SocialInbox/ ← Inbox feature
    ├── Settings/    ← Settings screens
    ├── Workspace/   ← Workspace screens
    └── Landing/     ← Landing page
```

### Try These Files First

1. **`DesignGuideMacApp.swift`** - macOS navigation setup
2. **`SocialInboxView.swift`** - Main inbox interface
3. **`MockConversations.swift`** - Sample conversation data
4. **`UserSettingsView.swift`** - Settings interface

---

## 🎨 Customization Tips

### Change Colors
Edit `MockWorkspaces.swift`:
```swift
primaryColor: "#0066FF"    // Your brand color
secondaryColor: "#00CC88"  // Your accent color
```

### Add More Mock Data
Edit files in `Shared/MockData/`:
- `MockConversations.swift` - Add conversations
- `MockPeople.swift` - Add contacts
- `MockUsers.swift` - Add team members

### Modify Views
All views are in `Shared/Views/`:
- Edit existing views to customize UI
- Create new views for new features
- Update navigation in app files

---

## 🐛 Common Issues

### "Cannot find DesignGuideMacApp"
- Make sure you added the Shared folder to your target
- Check that `DesignGuideMacApp.swift` has `@main` attribute

### "Module not found"
- Clean build folder: **⌘⇧K**
- Rebuild: **⌘B**

### Views not showing
- Check that all view files are included in the target
- Verify file membership in File Inspector

### Deployment target error
- Make sure macOS target is 13.0+
- Make sure iOS target is 17.0+

---

## 📚 Next Steps

1. **Explore the UI** - Try all navigation items
2. **Read the code** - Understand the architecture
3. **Customize** - Make it your own
4. **Add features** - Implement "Coming Soon" views
5. **Connect API** - Replace mock data with real data

---

## 🎓 Learning Resources

- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui)
- [Swift Language Guide](https://docs.swift.org/swift-book/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

## ✅ Checklist

- [ ] Xcode 15.0+ installed
- [ ] macOS project created
- [ ] Shared folder added to macOS target
- [ ] macOS app builds and runs
- [ ] iOS project created
- [ ] Shared folder added to iOS target
- [ ] iOS app builds and runs
- [ ] Explored all navigation items
- [ ] Reviewed code structure

---

**You're all set! Enjoy building with SwiftUI! 🚀**
