# Responsive Social Inbox - Implementation Strategy

## Executive Summary

This document outlines the strategy for implementing a fully responsive social inbox UI for the Q8T platform. The inbox will support mobile-first design principles while providing rich desktop experiences, handling messages from 30+ social platforms in a unified interface.

## Design Philosophy

### 1. Mobile-First Approach
- Start with mobile layout (320px-640px)
- Progressive enhancement for larger screens
- Touch-friendly interactions on mobile
- Keyboard shortcuts on desktop

### 2. Adaptive Layouts
- **Mobile (< 768px)**: Single-column stacked views with bottom navigation
- **Tablet (768px - 1024px)**: Two-column layout (list + detail)
- **Desktop (> 1024px)**: Three-column layout (sidebar + list + detail + context panel)

### 3. Performance Priorities
- Lazy load conversations as user scrolls
- Virtual scrolling for large message lists
- Optimistic UI updates for instant feedback
- Skeleton loaders for perceived performance

---

## Screen Breakpoint Strategy

Using Tailwind CSS default breakpoints:

```typescript
const breakpoints = {
  sm: '640px',   // Large phones
  md: '768px',   // Tablets
  lg: '1024px',  // Small laptops
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Large desktop
}
```

### Layout Transformation by Breakpoint

#### Mobile (< 768px)
```
┌─────────────────┐
│  Top Nav Bar    │
├─────────────────┤
│                 │
│  Content View   │
│  (Full screen)  │
│                 │
│  - Inbox List   │
│  OR             │
│  - Thread View  │
│  OR             │
│  - Detail Panel │
│                 │
├─────────────────┤
│  Bottom Nav     │
└─────────────────┘
```

**Characteristics:**
- Stack-based navigation (navigate between views)
- Floating action button for compose
- Swipe gestures for actions (archive, delete)
- Pull-to-refresh
- Bottom sheet for filters/actions

#### Tablet (768px - 1024px)
```
┌───────────────────────────────────┐
│         Top Navigation            │
├──────────────┬────────────────────┤
│              │                    │
│  Inbox List  │   Thread View      │
│  (Fixed)     │   (Scrollable)     │
│              │                    │
│  - Convos    │   - Messages       │
│              │   - Reply box      │
│              │                    │
└──────────────┴────────────────────┘
```

**Characteristics:**
- Split view with resizable divider
- Inbox list stays visible
- Detail panel slides over as modal
- Compact conversation cards

#### Desktop (> 1024px)
```
┌──────┬─────────────┬──────────────┬────────────┐
│      │   Top Nav   │              │            │
│ Side ├─────────────┼──────────────┤   Context  │
│ bar  │             │              │   Panel    │
│      │ Inbox List  │ Thread View  │            │
│ Nav  │             │              │  - Person  │
│      │ - Filters   │  - Messages  │  - Notes   │
│      │ - Views     │  - Timeline  │  - Tags    │
│      │ - Convos    │  - Reply     │  - Actions │
│      │             │              │            │
└──────┴─────────────┴──────────────┴────────────┘
```

**Characteristics:**
- Three-panel layout
- Keyboard navigation (j/k, vim-style)
- Right-click context menus
- Hover previews
- Multi-select with shift/cmd
- Collapsible sidebars

---

## Component Architecture

### Core Components Hierarchy

```
/app/inbox/
├── page.tsx                          # Main inbox route
├── layout.tsx                        # Inbox-specific layout
└── [conversationId]/
    └── page.tsx                      # Thread detail page

/components/inbox/
├── inbox-shell.tsx                   # Master layout component
├── inbox-header.tsx                  # Top navigation/search
├── inbox-sidebar.tsx                 # Left sidebar (desktop only)
├── conversation-list/
│   ├── conversation-list.tsx         # List container
│   ├── conversation-card.tsx         # Individual conversation
│   ├── conversation-filters.tsx      # Filter UI
│   └── conversation-search.tsx       # Search input
├── thread-view/
│   ├── thread-view.tsx               # Message thread container
│   ├── message-item.tsx              # Single message
│   ├── message-composer.tsx          # Reply interface
│   ├── platform-renderers/
│   │   ├── twitter-message.tsx       # Twitter-specific UI
│   │   ├── instagram-message.tsx     # Instagram-specific UI
│   │   ├── telegram-message.tsx      # Telegram-specific UI
│   │   └── generic-message.tsx       # Fallback renderer
│   └── thread-header.tsx             # Thread metadata/actions
├── context-panel/
│   ├── context-panel.tsx             # Right sidebar (desktop)
│   ├── person-info.tsx               # CRM person details
│   ├── conversation-notes.tsx        # Thread notes
│   ├── message-notes.tsx             # Message annotations
│   └── tags-section.tsx              # Tag management
├── mobile/
│   ├── mobile-header.tsx             # Mobile top bar
│   ├── mobile-bottom-nav.tsx         # Bottom navigation
│   ├── mobile-detail-sheet.tsx       # Detail bottom sheet
│   └── mobile-fab.tsx                # Floating action button
└── shared/
    ├── avatar-with-platform.tsx      # Avatar + platform icon
    ├── platform-badge.tsx            # Platform indicator
    ├── message-status.tsx            # Read/unread indicator
    ├── timestamp-display.tsx         # Relative timestamps
    └── media-gallery.tsx             # Image/video attachments
```

---

## Responsive Patterns

### Pattern 1: Adaptive Navigation

**Mobile:**
```tsx
<MobileBottomNav>
  <NavItem icon={Inbox} label="Inbox" />
  <NavItem icon={Filter} label="Filter" />
  <NavItem icon={Search} label="Search" />
  <NavItem icon={Settings} label="Settings" />
</MobileBottomNav>
```

**Desktop:**
```tsx
<InboxSidebar>
  <SidebarNav>
    <NavItem>All Conversations</NavItem>
    <NavItem>Unread</NavItem>
    <NavItem>Assigned to Me</NavItem>
    <NavItem>Mentions</NavItem>
  </SidebarNav>
  <ConversationFilters />
</InboxSidebar>
```

### Pattern 2: Conversation List Density

**Mobile:** Large touch targets, preview text
```tsx
<ConversationCard className="p-4 min-h-[88px]">
  <Avatar size="lg" />
  <Content>
    <Name className="text-base font-semibold" />
    <Preview className="text-sm line-clamp-2" />
    <Metadata className="text-xs mt-1" />
  </Content>
</ConversationCard>
```

**Desktop:** Compact list, metadata visible
```tsx
<ConversationCard className="p-2 min-h-[64px] hover:bg-accent">
  <Avatar size="md" />
  <Content className="flex-1 min-w-0">
    <div className="flex items-center justify-between">
      <Name className="text-sm font-medium truncate" />
      <Time className="text-xs text-muted-foreground" />
    </div>
    <Preview className="text-xs truncate" />
  </Content>
  <Badges className="flex gap-1" />
</ConversationCard>
```

### Pattern 3: Thread View Stacking

**Mobile:** Full-width messages
```tsx
<div className="flex flex-col gap-4 p-4">
  <Message className="max-w-full">
    <Avatar className="size-8" />
    <Bubble className="flex-1" />
  </Message>
</div>
```

**Desktop:** Chat-style layout with alternating sides
```tsx
<div className="flex flex-col gap-2 px-6 max-w-4xl mx-auto">
  <Message
    className={cn(
      "flex gap-3",
      isOutbound ? "flex-row-reverse" : "flex-row"
    )}
  >
    <Avatar className="size-10" />
    <Bubble className="max-w-[65%]" />
  </Message>
</div>
```

### Pattern 4: Context Panel Visibility

**Mobile:** Bottom sheet on demand
```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVertical />
    </Button>
  </SheetTrigger>
  <SheetContent side="bottom" className="h-[80vh]">
    <PersonInfo />
    <ConversationNotes />
    <Tags />
  </SheetContent>
</Sheet>
```

**Desktop:** Always-visible sidebar
```tsx
<aside className="hidden lg:flex w-80 border-l flex-col">
  <Tabs defaultValue="person">
    <TabsList>
      <TabsTrigger value="person">Person</TabsTrigger>
      <TabsTrigger value="notes">Notes</TabsTrigger>
      <TabsTrigger value="activity">Activity</TabsTrigger>
    </TabsList>
    <TabsContent value="person">
      <PersonInfo />
    </TabsContent>
    {/* ... */}
  </Tabs>
</aside>
```

---

## Data Model & Schemas

### Zod Schemas

#### Conversation Schema
```typescript
const conversationSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  person_id: z.string().uuid(),
  platform: z.enum([
    'twitter', 'telegram', 'instagram', 'discord', 'mastodon',
    'reddit', 'slack', 'whatsapp', 'facebook', 'linkedin',
    'farcaster', 'bluesky', 'threads', 'tiktok', 'pinterest',
    'youtube', 'nostr', 'generic'
  ]),
  platform_thread_id: z.string(),
  subject: z.string().nullable(),
  status: z.enum(['open', 'snoozed', 'closed']),
  priority: z.enum(['low', 'normal', 'high', 'urgent']),
  is_spam: z.boolean(),
  last_message_at: z.string().datetime(),
  last_message_preview: z.string(),
  unread_count: z.number().int(),
  message_count: z.number().int(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),

  // Relations (joined data)
  person: personSchema,
  assigned_to: workspaceMemberSchema.nullable(),
  tags: z.array(tagSchema),
})

type Conversation = z.infer<typeof conversationSchema>
```

#### Message Schema
```typescript
const messageSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  conversation_id: z.string().uuid(),
  person_id: z.string().uuid(),
  platform: conversationSchema.shape.platform,
  platform_message_id: z.string(),
  message_type: z.enum([
    'message', 'comment', 'reply', 'mention', 'dm', 'reaction'
  ]),
  direction: z.enum(['inbound', 'outbound']),
  content_text: z.string(),
  content_html: z.string().nullable(),
  is_read: z.boolean(),
  platform_created_at: z.string().datetime(),
  created_at: z.string().datetime(),

  // Platform-specific data (from joined table)
  platform_data: z.record(z.any()).nullable(),

  // Media attachments
  media: z.array(mediaSchema),

  // Notes
  notes: z.array(messageNoteSchema),
})

type Message = z.infer<typeof messageSchema>
```

#### Person Schema (CRM)
```typescript
const personSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  email: z.string().email().nullable(),
  full_name: z.string(),
  avatar_url: z.string().url().nullable(),
  bio: z.string().nullable(),
  location: z.string().nullable(),
  language: z.string().nullable(),
  timezone: z.string().nullable(),
  tags: z.array(z.string()),
  custom_fields: z.record(z.any()),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),

  // Relations
  social_identities: z.array(socialIdentitySchema),
})

type Person = z.infer<typeof personSchema>
```

#### Platform-Specific: Twitter Message
```typescript
const twitterMessageDataSchema = z.object({
  tweet_id: z.string(),
  author_username: z.string(),
  author_name: z.string(),
  author_avatar: z.string().url(),
  in_reply_to_tweet_id: z.string().nullable(),
  is_quote_tweet: z.boolean(),
  quoted_tweet: z.any().nullable(),
  retweet_count: z.number(),
  like_count: z.number(),
  reply_count: z.number(),
  quote_count: z.number(),
  is_thread: z.boolean(),
  thread_position: z.number().nullable(),
})

type TwitterMessageData = z.infer<typeof twitterMessageDataSchema>
```

### Mock Data Structure

```
/apps/design-guide/mock-data/inbox/
├── conversations.ts              # Mock conversation list
├── messages/
│   ├── twitter.ts                # Twitter message examples
│   ├── instagram.ts              # Instagram message examples
│   ├── telegram.ts               # Telegram message examples
│   └── generic.ts                # Generic platform messages
├── people.ts                     # Mock CRM people
├── tags.ts                       # Mock tags
├── notes.ts                      # Mock notes (conversation & message)
└── filters.ts                    # Mock saved filters/views
```

---

## Mobile-Specific Interactions

### 1. Swipe Actions
```tsx
<SwipeableConversationCard
  onSwipeLeft={() => handleArchive()}
  onSwipeRight={() => handleMarkRead()}
>
  <ConversationCard {...props} />
</SwipeableConversationCard>
```

**Actions:**
- Swipe right: Mark as read/unread
- Swipe left: Archive/Delete
- Long press: Multi-select mode

### 2. Bottom Sheet Interactions
```tsx
// Quick actions sheet
<Sheet>
  <SheetTrigger>Long press conversation</SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>Actions</SheetHeader>
    <div className="grid grid-cols-4 gap-4">
      <Action icon={Check} label="Mark Read" />
      <Action icon={Archive} label="Archive" />
      <Action icon={Tag} label="Tag" />
      <Action icon={UserPlus} label="Assign" />
    </div>
  </SheetContent>
</Sheet>
```

### 3. Pull-to-Refresh
```tsx
<PullToRefresh onRefresh={async () => {
  await fetchNewConversations()
}}>
  <ConversationList />
</PullToRefresh>
```

### 4. Floating Action Button
```tsx
<MobileFAB className="fixed bottom-20 right-4 md:hidden">
  <Button size="lg" className="rounded-full size-14">
    <Plus className="size-6" />
  </Button>
</MobileFAB>
```

---

## Desktop-Specific Features

### 1. Keyboard Shortcuts
```typescript
const shortcuts = {
  // Navigation
  'j': 'Next conversation',
  'k': 'Previous conversation',
  'o': 'Open conversation',
  'Escape': 'Close conversation',

  // Actions
  'r': 'Reply',
  'e': 'Archive',
  'x': 'Select conversation',
  '!': 'Mark as spam',
  's': 'Toggle star',

  // Filters
  'g i': 'Go to inbox',
  'g u': 'Go to unread',
  'g a': 'Go to assigned',

  // Search
  '/': 'Focus search',
}
```

### 2. Multi-Select
```tsx
<ConversationList
  selectable
  onSelectionChange={(selected) => {
    setSelectedIds(selected)
  }}
>
  {conversations.map(conv => (
    <ConversationCard
      key={conv.id}
      selectable
      selected={selectedIds.includes(conv.id)}
      onSelect={(id) => toggleSelection(id)}
    />
  ))}
</ConversationList>

<BulkActions visible={selectedIds.length > 0}>
  <Button onClick={bulkArchive}>
    Archive {selectedIds.length}
  </Button>
  <Button onClick={bulkTag}>Add Tag</Button>
</BulkActions>
```

### 3. Resizable Panels
```tsx
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
    <ConversationList />
  </ResizablePanel>

  <ResizableHandle />

  <ResizablePanel defaultSize={50} minSize={40}>
    <ThreadView />
  </ResizablePanel>

  <ResizableHandle />

  <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
    <ContextPanel />
  </ResizablePanel>
</ResizablePanelGroup>
```

### 4. Context Menus
```tsx
<ContextMenu>
  <ContextMenuTrigger>
    <ConversationCard {...props} />
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Mark as Read</ContextMenuItem>
    <ContextMenuItem>Archive</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger>Assign to...</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        {/* Team members */}
      </ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>
```

---

## Performance Optimization

### 1. Virtual Scrolling
```tsx
import { useVirtualizer } from '@tanstack/react-virtual'

function ConversationList({ conversations }) {
  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: conversations.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // Estimated row height
    overscan: 5, // Render 5 extra items above/below
  })

  return (
    <div ref={parentRef} className="h-full overflow-auto">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <ConversationCard
              conversation={conversations[virtualRow.index]}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 2. Optimistic Updates
```tsx
function useMarkAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markConversationAsRead,
    onMutate: async (conversationId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(['conversations'])

      // Snapshot previous value
      const previous = queryClient.getQueryData(['conversations'])

      // Optimistically update
      queryClient.setQueryData(['conversations'], old =>
        old.map(conv =>
          conv.id === conversationId
            ? { ...conv, unread_count: 0, is_read: true }
            : conv
        )
      )

      return { previous }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(['conversations'], context.previous)
    },
  })
}
```

### 3. Skeleton Loading
```tsx
function ConversationListSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex gap-3 p-3">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
```

---

## Accessibility Considerations

### 1. Keyboard Navigation
- Tab order follows visual flow
- All interactive elements keyboard accessible
- Focus visible indicators
- Skip links for screen readers

### 2. ARIA Labels
```tsx
<ConversationCard
  role="article"
  aria-label={`Conversation with ${person.name}, ${unreadCount} unread messages`}
  aria-selected={isSelected}
  tabIndex={0}
>
  <time dateTime={lastMessageAt} aria-label={`Last message ${relativeTime}`}>
    {relativeTime}
  </time>
</ConversationCard>
```

### 3. Screen Reader Announcements
```tsx
// Live region for updates
<div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
  {announcement}
</div>

// Example: After marking as read
setAnnouncement('Conversation marked as read')
```

---

## State Management Strategy

### URL State (Routing)
```typescript
// /inbox - List view (mobile) or split view (desktop)
// /inbox?filter=unread - Filtered list
// /inbox?assigned=me - Assigned to me
// /inbox/[conversationId] - Specific conversation
// /inbox/[conversationId]/[messageId] - Deep link to message
```

### Local State (Zustand or Context)
```typescript
interface InboxStore {
  // View state
  activeConversationId: string | null
  selectedConversationIds: string[]

  // Filters
  activeFilter: 'all' | 'unread' | 'assigned' | 'mentions'
  searchQuery: string
  platformFilter: Platform[]

  // UI state
  sidebarCollapsed: boolean
  contextPanelCollapsed: boolean

  // Actions
  setActiveConversation: (id: string) => void
  toggleSelection: (id: string) => void
  clearSelection: () => void
}
```

### Server State (TanStack Query)
```typescript
// Queries
useConversations({ filter, platform, search })
useConversation(conversationId)
useMessages(conversationId)
usePerson(personId)

// Mutations
useMarkAsRead()
useSendMessage()
useArchiveConversation()
useAddTag()
useAssignToMember()
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Create folder structure
- [ ] Define Zod schemas
- [ ] Create mock data files
- [ ] Set up routing structure
- [ ] Build base layout components

### Phase 2: Mobile UI (Week 2)
- [ ] Mobile header
- [ ] Mobile conversation list
- [ ] Mobile thread view
- [ ] Mobile bottom navigation
- [ ] Swipe gestures
- [ ] Bottom sheets for actions

### Phase 3: Desktop UI (Week 3)
- [ ] Desktop sidebar
- [ ] Three-column layout
- [ ] Context panel
- [ ] Keyboard shortcuts
- [ ] Multi-select functionality
- [ ] Resizable panels

### Phase 4: Platform Renderers (Week 4)
- [ ] Generic message renderer
- [ ] Twitter-specific renderer
- [ ] Instagram-specific renderer
- [ ] Telegram-specific renderer
- [ ] Additional platform renderers
- [ ] Media attachment handling

### Phase 5: Polish & Performance (Week 5)
- [ ] Virtual scrolling
- [ ] Optimistic updates
- [ ] Loading states & skeletons
- [ ] Error boundaries
- [ ] Accessibility audit
- [ ] Responsive testing on real devices

---

## Testing Strategy

### 1. Responsive Testing
```typescript
// Test different viewport sizes
const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

viewports.forEach(({ name, width, height }) => {
  test(`inbox renders correctly on ${name}`, () => {
    // Test logic
  })
})
```

### 2. Interaction Testing
- Swipe gestures on mobile
- Keyboard shortcuts on desktop
- Multi-select behavior
- Filtering and searching
- Message sending

### 3. Accessibility Testing
- Automated testing with axe-core
- Manual keyboard navigation testing
- Screen reader testing (NVDA/JAWS/VoiceOver)
- Color contrast validation

---

## Dependencies to Add

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.x",
    "@tanstack/react-virtual": "^3.x",
    "date-fns": "^3.x",
    "zustand": "^4.x"
  },
  "devDependencies": {
    "@testing-library/react": "^14.x",
    "@testing-library/user-event": "^14.x",
    "@axe-core/react": "^4.x"
  }
}
```

---

## Success Metrics

### User Experience
- [ ] Smooth scrolling (60fps) on all devices
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Keyboard navigation works for all actions
- [ ] No layout shift during loading
- [ ] Perceived load time < 1 second

### Performance
- [ ] Initial load < 2 seconds
- [ ] Time to interactive < 3 seconds
- [ ] Virtual scrolling handles 10,000+ items
- [ ] Optimistic updates feel instant
- [ ] No memory leaks during extended use

### Accessibility
- [ ] WCAG 2.1 Level AA compliance
- [ ] All interactive elements keyboard accessible
- [ ] Screen reader friendly
- [ ] Proper focus management
- [ ] Color contrast ratios meet standards

---

## Risk Mitigation

### Risk 1: Complex Platform Renderers
**Mitigation:** Start with generic renderer, add platform-specific features incrementally

### Risk 2: Performance with Large Lists
**Mitigation:** Implement virtual scrolling from the start, test with realistic data volumes

### Risk 3: Mobile Gesture Conflicts
**Mitigation:** Use well-tested gesture library, make gestures configurable

### Risk 4: Responsive Layout Complexity
**Mitigation:** Build mobile-first, test continuously on real devices, use CSS Grid for robust layouts

---

## Next Steps

1. **Review & Approval**: Present this strategy to stakeholders
2. **Spike Tasks**: Create small prototypes for risky areas
3. **Design Mockups**: Create high-fidelity designs for each breakpoint
4. **Implementation**: Begin Phase 1 foundation work
5. **Iterate**: Gather feedback early and often

---

## Conclusion

This responsive inbox implementation will provide a world-class experience across all devices while maintaining the flexibility to support 30+ social platforms. The mobile-first approach ensures excellent mobile UX while progressive enhancement delivers powerful desktop features. By following this phased approach, we can deliver value incrementally while maintaining high quality standards.
