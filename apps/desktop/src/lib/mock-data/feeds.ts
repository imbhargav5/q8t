import type { Feed } from "../zod-schemas/feed.schema";

const now = Date.now();

export const mockFeeds: Feed[] = [
  // Workspace 1: Chatsian - Monitoring Feed (default)
  {
    id: "feed-1",
    workspace_id: "workspace-1",
    name: "Monitoring",
    description: "Real-time monitoring of all social activity",
    icon: "📊",
    is_default: true,
    streams: [
      {
        id: "stream-1-1",
        stream_type: "home",
        label: null,
        platform_filters: [],
        time_range: "7d",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 0,
        created_at: new Date(now - 7776000000).toISOString(), // 90 days ago
        updated_at: new Date(now - 86400000).toISOString(),
      },
      {
        id: "stream-1-2",
        stream_type: "mentions",
        label: null,
        platform_filters: [],
        time_range: "7d",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 1,
        created_at: new Date(now - 7776000000).toISOString(),
        updated_at: new Date(now - 86400000).toISOString(),
      },
      {
        id: "stream-1-3",
        stream_type: "failed",
        label: null,
        platform_filters: [],
        time_range: "30d",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 2,
        created_at: new Date(now - 7776000000).toISOString(),
        updated_at: new Date(now - 86400000).toISOString(),
      },
      {
        id: "stream-1-4",
        stream_type: "high_engagement",
        label: "Top Posts",
        platform_filters: [],
        time_range: "7d",
        sort_order: "most_engaged",
        filters: {
          content_types: [],
          min_engagement: 100,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 3,
        created_at: new Date(now - 7776000000).toISOString(),
        updated_at: new Date(now - 86400000).toISOString(),
      },
    ],
    settings: {
      auto_refresh_interval: 30,
      compact_view: false,
    },
    last_viewed_at: new Date(now - 3600000).toISOString(), // 1 hour ago
    created_at: new Date(now - 7776000000).toISOString(),
    updated_at: new Date(now - 86400000).toISOString(),
  },

  // Workspace 1: Chatsian - Content Planning Feed
  {
    id: "feed-2",
    workspace_id: "workspace-1",
    name: "Content Planning",
    description: "Manage drafts, scheduled, and published content",
    icon: "📝",
    is_default: false,
    streams: [
      {
        id: "stream-2-1",
        stream_type: "drafts",
        label: null,
        platform_filters: [],
        time_range: "all",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 0,
        created_at: new Date(now - 6048000000).toISOString(), // 70 days ago
        updated_at: new Date(now - 172800000).toISOString(),
      },
      {
        id: "stream-2-2",
        stream_type: "scheduled",
        label: null,
        platform_filters: [],
        time_range: "all",
        sort_order: "oldest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 1,
        created_at: new Date(now - 6048000000).toISOString(),
        updated_at: new Date(now - 172800000).toISOString(),
      },
      {
        id: "stream-2-3",
        stream_type: "published",
        label: "Recent (7d)",
        platform_filters: [],
        time_range: "7d",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 2,
        created_at: new Date(now - 6048000000).toISOString(),
        updated_at: new Date(now - 172800000).toISOString(),
      },
      {
        id: "stream-2-4",
        stream_type: "published",
        label: "Last 30 Days",
        platform_filters: [],
        time_range: "30d",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 3,
        created_at: new Date(now - 6048000000).toISOString(),
        updated_at: new Date(now - 172800000).toISOString(),
      },
    ],
    settings: {
      auto_refresh_interval: 60,
      compact_view: false,
    },
    last_viewed_at: new Date(now - 172800000).toISOString(), // 2 days ago
    created_at: new Date(now - 6048000000).toISOString(),
    updated_at: new Date(now - 172800000).toISOString(),
  },

  // Workspace 1: Chatsian - Platform Analytics Feed
  {
    id: "feed-3",
    workspace_id: "workspace-1",
    name: "Platform Analytics",
    description: "Monitor performance across all platforms",
    icon: "📈",
    is_default: false,
    streams: [
      {
        id: "stream-3-1",
        stream_type: "platform_specific",
        label: "Twitter",
        platform_filters: ["twitter"],
        time_range: "7d",
        sort_order: "most_engaged",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 0,
        created_at: new Date(now - 5184000000).toISOString(), // 60 days ago
        updated_at: new Date(now - 259200000).toISOString(),
      },
      {
        id: "stream-3-2",
        stream_type: "platform_specific",
        label: "Instagram",
        platform_filters: ["instagram"],
        time_range: "7d",
        sort_order: "most_engaged",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 1,
        created_at: new Date(now - 5184000000).toISOString(),
        updated_at: new Date(now - 259200000).toISOString(),
      },
      {
        id: "stream-3-3",
        stream_type: "platform_specific",
        label: "LinkedIn",
        platform_filters: ["linkedin"],
        time_range: "7d",
        sort_order: "most_engaged",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 2,
        created_at: new Date(now - 5184000000).toISOString(),
        updated_at: new Date(now - 259200000).toISOString(),
      },
      {
        id: "stream-3-4",
        stream_type: "high_engagement",
        label: "All Time Best",
        platform_filters: [],
        time_range: "all",
        sort_order: "most_engaged",
        filters: {
          content_types: [],
          min_engagement: 500,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 3,
        created_at: new Date(now - 5184000000).toISOString(),
        updated_at: new Date(now - 259200000).toISOString(),
      },
    ],
    settings: {
      auto_refresh_interval: 120,
      compact_view: false,
    },
    last_viewed_at: new Date(now - 604800000).toISOString(), // 7 days ago
    created_at: new Date(now - 5184000000).toISOString(),
    updated_at: new Date(now - 259200000).toISOString(),
  },

  // Workspace 2: Client TechCorp - Daily Monitoring (default)
  {
    id: "feed-4",
    workspace_id: "workspace-2",
    name: "Daily Monitoring",
    description: "LinkedIn and Twitter monitoring for TechCorp",
    icon: "💼",
    is_default: true,
    streams: [
      {
        id: "stream-4-1",
        stream_type: "platform_specific",
        label: "LinkedIn Feed",
        platform_filters: ["linkedin"],
        time_range: "7d",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 0,
        created_at: new Date(now - 5184000000).toISOString(),
        updated_at: new Date(now - 86400000).toISOString(),
      },
      {
        id: "stream-4-2",
        stream_type: "platform_specific",
        label: "Twitter Feed",
        platform_filters: ["twitter"],
        time_range: "7d",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 1,
        created_at: new Date(now - 5184000000).toISOString(),
        updated_at: new Date(now - 86400000).toISOString(),
      },
      {
        id: "stream-4-3",
        stream_type: "scheduled",
        label: null,
        platform_filters: [],
        time_range: "all",
        sort_order: "oldest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 2,
        created_at: new Date(now - 5184000000).toISOString(),
        updated_at: new Date(now - 86400000).toISOString(),
      },
    ],
    settings: {
      auto_refresh_interval: 30,
      compact_view: false,
    },
    last_viewed_at: new Date(now - 7200000).toISOString(), // 2 hours ago
    created_at: new Date(now - 5184000000).toISOString(),
    updated_at: new Date(now - 86400000).toISOString(),
  },

  // Workspace 2: Client TechCorp - Performance Review
  {
    id: "feed-5",
    workspace_id: "workspace-2",
    name: "Performance Review",
    description: "Track engagement and performance metrics",
    icon: "📊",
    is_default: false,
    streams: [
      {
        id: "stream-5-1",
        stream_type: "high_engagement",
        label: null,
        platform_filters: [],
        time_range: "30d",
        sort_order: "most_engaged",
        filters: {
          content_types: [],
          min_engagement: 50,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 0,
        created_at: new Date(now - 4320000000).toISOString(), // 50 days ago
        updated_at: new Date(now - 432000000).toISOString(),
      },
      {
        id: "stream-5-2",
        stream_type: "low_engagement",
        label: null,
        platform_filters: [],
        time_range: "30d",
        sort_order: "oldest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 1,
        created_at: new Date(now - 4320000000).toISOString(),
        updated_at: new Date(now - 432000000).toISOString(),
      },
      {
        id: "stream-5-3",
        stream_type: "published",
        label: null,
        platform_filters: [],
        time_range: "30d",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 2,
        created_at: new Date(now - 4320000000).toISOString(),
        updated_at: new Date(now - 432000000).toISOString(),
      },
    ],
    settings: {
      auto_refresh_interval: 60,
      compact_view: false,
    },
    last_viewed_at: new Date(now - 1209600000).toISOString(), // 14 days ago
    created_at: new Date(now - 4320000000).toISOString(),
    updated_at: new Date(now - 432000000).toISOString(),
  },

  // Workspace 3: Personal Brand - Creator Dashboard (default)
  {
    id: "feed-6",
    workspace_id: "workspace-3",
    name: "Creator Dashboard",
    description: "Instagram, TikTok, and Threads content monitoring",
    icon: "🎨",
    is_default: true,
    streams: [
      {
        id: "stream-6-1",
        stream_type: "platform_specific",
        label: "Instagram",
        platform_filters: ["instagram"],
        time_range: "7d",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 0,
        created_at: new Date(now - 6048000000).toISOString(),
        updated_at: new Date(now - 172800000).toISOString(),
      },
      {
        id: "stream-6-2",
        stream_type: "platform_specific",
        label: "TikTok",
        platform_filters: ["tiktok"],
        time_range: "7d",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 1,
        created_at: new Date(now - 6048000000).toISOString(),
        updated_at: new Date(now - 172800000).toISOString(),
      },
      {
        id: "stream-6-3",
        stream_type: "platform_specific",
        label: "Threads",
        platform_filters: ["threads"],
        time_range: "7d",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 2,
        created_at: new Date(now - 6048000000).toISOString(),
        updated_at: new Date(now - 172800000).toISOString(),
      },
      {
        id: "stream-6-4",
        stream_type: "scheduled",
        label: null,
        platform_filters: [],
        time_range: "all",
        sort_order: "oldest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 3,
        created_at: new Date(now - 6048000000).toISOString(),
        updated_at: new Date(now - 172800000).toISOString(),
      },
    ],
    settings: {
      auto_refresh_interval: 30,
      compact_view: false,
    },
    last_viewed_at: new Date(now - 1800000).toISOString(), // 30 minutes ago
    created_at: new Date(now - 6048000000).toISOString(),
    updated_at: new Date(now - 172800000).toISOString(),
  },

  // Workspace 3: Personal Brand - Engagement Tracker
  {
    id: "feed-7",
    workspace_id: "workspace-3",
    name: "Engagement Tracker",
    description: "Monitor mentions and high-performing content",
    icon: "🔥",
    is_default: false,
    streams: [
      {
        id: "stream-7-1",
        stream_type: "high_engagement",
        label: "Viral Content",
        platform_filters: [],
        time_range: "30d",
        sort_order: "most_engaged",
        filters: {
          content_types: [],
          min_engagement: 200,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 0,
        created_at: new Date(now - 5184000000).toISOString(),
        updated_at: new Date(now - 345600000).toISOString(),
      },
      {
        id: "stream-7-2",
        stream_type: "mentions",
        label: null,
        platform_filters: [],
        time_range: "7d",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 1,
        created_at: new Date(now - 5184000000).toISOString(),
        updated_at: new Date(now - 345600000).toISOString(),
      },
      {
        id: "stream-7-3",
        stream_type: "home",
        label: "All Activity",
        platform_filters: [],
        time_range: "24h",
        sort_order: "newest",
        filters: {
          content_types: [],
          min_engagement: 0,
          show_media_only: false,
          show_verified_only: false,
        },
        order: 2,
        created_at: new Date(now - 5184000000).toISOString(),
        updated_at: new Date(now - 345600000).toISOString(),
      },
    ],
    settings: {
      auto_refresh_interval: 30,
      compact_view: true,
    },
    last_viewed_at: new Date(now - 259200000).toISOString(), // 3 days ago
    created_at: new Date(now - 5184000000).toISOString(),
    updated_at: new Date(now - 345600000).toISOString(),
  },
];

// Helper functions
export function getFeedsByWorkspace(workspaceId: string): Feed[] {
  return mockFeeds.filter((feed) => feed.workspace_id === workspaceId);
}

export function getFeedById(feedId: string): Feed | undefined {
  return mockFeeds.find((feed) => feed.id === feedId);
}

export function getDefaultFeed(workspaceId: string): Feed | undefined {
  return mockFeeds.find(
    (feed) => feed.workspace_id === workspaceId && feed.is_default
  );
}
