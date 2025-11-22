# Social Inbox - Responsive Design Quick Reference

## Layout Breakpoints

| Device | Breakpoint | Layout Type | Panels Visible |
|--------|-----------|-------------|----------------|
| Mobile | < 768px | Single column, stack navigation | 1 at a time (list OR thread OR detail) |
| Tablet | 768px - 1024px | Two column | 2 (list + thread) |
| Desktop | > 1024px | Three column | 3-4 (sidebar + list + thread + context) |

---

## Mobile Layout (< 768px)

### Stack-based Navigation
Users navigate between three views using routing:

1. **Inbox List View** (`/inbox`)
   - Full-screen conversation list
   - Search bar at top
   - Filter button (opens bottom sheet)
   - Bottom navigation bar
   - Floating action button (compose)

2. **Thread View** (`/inbox/[id]`)
   - Back button to list
   - Thread header with person info
   - Message timeline (full width)
   - Reply composer at bottom
   - More button (opens detail sheet)

3. **Detail Sheet** (Bottom Sheet Modal)
   - Person information
   - Tags
   - Notes
   - Assignment

### Key Mobile Features
- **Swipe Gestures**: Right = mark read, Left = archive
- **Pull to Refresh**: Sync new messages
- **Long Press**: Multi-select mode
- **Touch Targets**: Minimum 44x44px
- **Bottom Sheet**: Quick actions and filters

---

## Tablet Layout (768px - 1024px)

### Split View (List + Thread)

```
┌──────────────────────────────────────────────┐
│          Header (Search + Actions)           │
├───────────────────┬──────────────────────────┤
│                   │                          │
│   Conversation    │     Thread View          │
│   List (40%)      │     (60%)                │
│                   │                          │
│   - Filters       │     - Messages           │
│   - Search        │     - Reply box          │
│   - Conversations │                          │
│                   │                          │
│   [Resizable]     │                          │
└───────────────────┴──────────────────────────┘
```

### Key Tablet Features
- **Persistent List**: Conversation list stays visible
- **Resizable Divider**: Adjust split ratio
- **Detail Modal**: Context panel slides over as modal/sheet
- **Compact Cards**: Smaller conversation cards than mobile

---

## Desktop Layout (> 1024px)

### Three Column (Sidebar + List + Thread + Context)

```
┌────┬──────────┬────────────┬──────────┐
│    │  Header  │            │          │
│ S  ├──────────┼────────────┤ Context  │
│ i  │          │            │ Panel    │
│ d  │  Inbox   │  Thread    │          │
│ e  │  List    │  View      │ - Person │
│ b  │          │            │ - Notes  │
│ a  │ - Filter │ - Messages │ - Tags   │
│ r  │ - Search │ - Timeline │ - Files  │
│    │ - Convos │ - Reply    │          │
│    │          │            │          │
└────┴──────────┴────────────┴──────────┘
 Nav   25-30%      40-50%       20-25%
```

### Key Desktop Features
- **Keyboard Shortcuts**: j/k navigation, r for reply, etc.
- **Multi-Select**: Shift/Cmd + click for bulk actions
- **Context Menus**: Right-click for actions
- **Resizable Panels**: All panels adjustable
- **Collapsible Sidebars**: Hide sidebar/context panel
- **Hover Previews**: Preview on hover

---

## Component Visibility Matrix

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Left Sidebar | ❌ (Drawer) | ❌ (Drawer) | ✅ Visible |
| Conversation List | ✅ Full screen | ✅ Split (40%) | ✅ Split (30%) |
| Thread View | ✅ Full screen | ✅ Split (60%) | ✅ Split (45%) |
| Context Panel | ❌ (Sheet) | ❌ (Modal) | ✅ Visible (25%) |
| Bottom Nav | ✅ Visible | ❌ Hidden | ❌ Hidden |
| Top Header | ✅ Compact | ✅ Full | ✅ Full |
| FAB (Compose) | ✅ Visible | ❌ Hidden | ❌ Hidden |

---

## Interaction Patterns

### Mobile-Specific
| Action | Gesture/Control |
|--------|----------------|
| View thread | Tap conversation |
| Mark as read | Swipe right →  |
| Archive | Swipe left ← |
| Multi-select | Long press |
| Refresh | Pull down ↓ |
| Quick actions | Bottom sheet (More button) |
| View person | Sheet (tap avatar/name) |
| Filter inbox | Bottom nav → Filter |

### Tablet-Specific
| Action | Interaction |
|--------|------------|
| View thread | Click conversation (stays in split) |
| Resize panels | Drag divider |
| View person | Modal/sheet overlay |
| Multi-select | Checkbox + bulk actions bar |

### Desktop-Specific
| Action | Interaction |
|--------|------------|
| Next conversation | `j` or `↓` |
| Previous conversation | `k` or `↑` |
| Open conversation | `Enter` or `o` |
| Reply | `r` |
| Archive | `e` |
| Mark as read | `Shift + i` |
| Search | `/` |
| Multi-select | `Shift + Click` or `Cmd + Click` |
| Context menu | Right click |
| View person | Always visible in context panel |

---

## Conversation Card Density

### Mobile (Large & Scannable)
```
┌──────────────────────────────────────┐
│  [Avatar]  John Doe                  │
│  48x48px   @johndoe · Twitter    [!] │
│                                      │
│  Hey, I have a question about the    │
│  pricing for the enterprise plan...  │
│                                      │
│  2 unread · 5m ago                   │
└──────────────────────────────────────┘
  Height: 88-96px | Padding: 16px
```

### Desktop (Compact & Dense)
```
┌────────────────────────────────────┐
│ [Av] John Doe · @johndoe  🐦 5m [!]│
│ 32px Hey, I have a question...  (2)│
└────────────────────────────────────┘
  Height: 64px | Padding: 8px
```

---

## Message Bubble Layout

### Mobile (Full Width)
```
┌─────────────────────────────────────┐
│                                     │
│  [Avatar] Name                      │
│  ┌──────────────────────────────┐  │
│  │ Message content here that    │  │
│  │ spans the full width of the  │  │
│  │ container                    │  │
│  └──────────────────────────────┘  │
│  Platform · 2:30 PM                 │
│                                     │
└─────────────────────────────────────┘
```

### Desktop (Chat Style, 65% Width)
```
┌──────────────────────────────────────────┐
│                                          │
│  [Av] Name                               │
│  ┌────────────────────┐                  │
│  │ Inbound message    │                  │
│  │ max 65% width      │                  │
│  └────────────────────┘                  │
│  Platform · 2:30 PM                      │
│                                          │
│                   ┌────────────────────┐ │
│                   │ Outbound message   │ │
│                   │ right-aligned      │ │
│                   └────────────────────┘ │
│                   You · 2:31 PM      [✓] │
└──────────────────────────────────────────┘
```

---

## State Management Summary

### URL State (Router)
- Current conversation: `/inbox/[conversationId]`
- Filters: `/inbox?filter=unread&platform=twitter`
- Deep links: `/inbox/[conversationId]/[messageId]`

### Local State (Zustand/Context)
- Selected conversation IDs (multi-select)
- Sidebar collapsed state
- Panel sizes (resizable)
- Active filters and search

### Server State (TanStack Query)
- Conversations list
- Messages for thread
- Person details
- Tags, assignments, notes

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Initial page load | < 2s |
| Time to interactive | < 3s |
| Conversation list render | < 100ms |
| Thread switch | < 200ms |
| Virtual scroll FPS | 60fps |
| Message send (optimistic) | Instant feel |

---

## Critical User Flows

### Flow 1: Read and Reply (Mobile)
1. Open app → See inbox list
2. Tap unread conversation
3. Navigate to thread view
4. Read messages (scroll)
5. Tap reply box
6. Type message
7. Send
8. See optimistic update
9. Back button → Return to list

### Flow 2: Bulk Archive (Desktop)
1. View inbox list
2. `Shift + Click` multiple conversations
3. See bulk actions bar appear
4. Click "Archive" or press `e`
5. See optimistic removal from list
6. Success toast notification

### Flow 3: Person Lookup (Desktop)
1. Click conversation
2. View thread in center
3. See person info in right context panel
4. View all social identities
5. Add notes
6. Add tags
7. View conversation history

---

## Implementation Priority

### Must Have (MVP)
✅ Mobile conversation list
✅ Mobile thread view
✅ Desktop three-column layout
✅ Basic filtering (unread, assigned)
✅ Search functionality
✅ Mark as read/unread
✅ Reply to messages

### Should Have (V1.1)
🔶 Swipe gestures
🔶 Multi-select + bulk actions
🔶 Tags and assignments
🔶 Notes (conversation + message)
🔶 Platform-specific renderers
🔶 Virtual scrolling

### Nice to Have (V1.2+)
⭐ Keyboard shortcuts
⭐ Resizable panels
⭐ Context menus
⭐ Saved filters/views
⭐ Snooze conversations
⭐ Priority levels

---

## Accessibility Checklist

- [ ] All touch targets ≥ 44x44px (mobile)
- [ ] All click targets ≥ 32x32px (desktop)
- [ ] Keyboard navigation works everywhere
- [ ] Focus visible on all interactive elements
- [ ] ARIA labels on all buttons/links
- [ ] Screen reader announcements for actions
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] No keyboard traps
- [ ] Skip links for main content
- [ ] Reduced motion support

---

## Next Steps

1. **Review** this plan with the team
2. **Create** detailed Figma mockups for each breakpoint
3. **Set up** project structure and dependencies
4. **Build** mobile layout first (mobile-first approach)
5. **Test** continuously on real devices
6. **Iterate** based on feedback

---

## Questions to Answer Before Implementation

1. **Multi-workspace**: Should inbox support multiple workspaces simultaneously?
2. **Real-time Updates**: WebSockets or polling for new messages?
3. **Offline Support**: Should we support offline mode with service workers?
4. **Notification Preferences**: In-app, browser, or both?
5. **Platform Priority**: Which platforms to implement renderers for first?
6. **Team Size**: Single developer or team? (Affects timeline)
7. **Design Resources**: Are high-fidelity mockups available or needed?

---

**Status**: Ready for implementation planning
**Document Version**: 1.0
**Last Updated**: 2025-11-22
**Owner**: Development Team
