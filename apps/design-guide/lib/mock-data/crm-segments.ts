import type { CRMSegment, CRMSegmentWithCount } from "../zod-schemas";

export const mockCRMSegments: CRMSegmentWithCount[] = [
  {
    id: "segment-1",
    workspace_id: "workspace-1",
    name: "All Contacts",
    description: "All contacts in your workspace",
    icon: "👥",
    segment_type: "dynamic",
    filters: {
      conditions: [],
      logic: "AND",
    },
    sort_by: "last_contact_at",
    sort_order: "desc",
    member_ids: [],
    is_system: true,
    is_favorite: false,
    color: null,
    created_by: "user-1",
    last_accessed_at: new Date().toISOString(),
    access_count: 47,
    created_at: new Date("2024-01-01").toISOString(),
    updated_at: new Date("2024-01-01").toISOString(),
    contact_count: 8,
  },
  {
    id: "segment-2",
    workspace_id: "workspace-1",
    name: "VIP Contacts",
    description: "High-value contacts marked as VIP",
    icon: "⭐",
    segment_type: "dynamic",
    filters: {
      conditions: [
        {
          field: "is_vip",
          operator: "equals",
          value: true,
        },
      ],
      logic: "AND",
    },
    sort_by: "last_contact_at",
    sort_order: "desc",
    member_ids: [],
    is_system: true,
    is_favorite: true,
    color: "amber",
    created_by: "user-1",
    last_accessed_at: new Date(Date.now() - 3600000).toISOString(),
    access_count: 23,
    created_at: new Date("2024-01-01").toISOString(),
    updated_at: new Date("2024-01-01").toISOString(),
    contact_count: 3,
  },
  {
    id: "segment-3",
    workspace_id: "workspace-1",
    name: "Active (30d)",
    description: "Contacts active in the last 30 days",
    icon: "🟢",
    segment_type: "dynamic",
    filters: {
      conditions: [
        {
          field: "last_contact_at",
          operator: "greater_than",
          value: "30_days_ago",
        },
      ],
      logic: "AND",
    },
    sort_by: "last_contact_at",
    sort_order: "desc",
    member_ids: [],
    is_system: true,
    is_favorite: false,
    color: "green",
    created_by: "user-1",
    last_accessed_at: new Date(Date.now() - 86400000).toISOString(),
    access_count: 15,
    created_at: new Date("2024-01-01").toISOString(),
    updated_at: new Date("2024-01-01").toISOString(),
    contact_count: 5,
  },
  {
    id: "segment-4",
    workspace_id: "workspace-1",
    name: "Inactive (90d+)",
    description: "Contacts with no activity in 90+ days",
    icon: "😴",
    segment_type: "dynamic",
    filters: {
      conditions: [
        {
          field: "last_contact_at",
          operator: "less_than",
          value: "90_days_ago",
        },
      ],
      logic: "AND",
    },
    sort_by: "last_contact_at",
    sort_order: "asc",
    member_ids: [],
    is_system: true,
    is_favorite: false,
    color: "gray",
    created_by: "user-1",
    last_accessed_at: new Date(Date.now() - 172800000).toISOString(),
    access_count: 8,
    created_at: new Date("2024-01-01").toISOString(),
    updated_at: new Date("2024-01-01").toISOString(),
    contact_count: 1,
  },
  {
    id: "segment-5",
    workspace_id: "workspace-1",
    name: "High Engagement",
    description: "Contacts with 10+ messages",
    icon: "🔥",
    segment_type: "dynamic",
    filters: {
      conditions: [
        {
          field: "total_messages",
          operator: "greater_than",
          value: 10,
        },
      ],
      logic: "AND",
    },
    sort_by: "total_messages",
    sort_order: "desc",
    member_ids: [],
    is_system: true,
    is_favorite: false,
    color: "red",
    created_by: "user-1",
    last_accessed_at: null,
    access_count: 3,
    created_at: new Date("2024-01-01").toISOString(),
    updated_at: new Date("2024-01-01").toISOString(),
    contact_count: 4,
  },
  {
    id: "segment-6",
    workspace_id: "workspace-1",
    name: "Verified",
    description: "Verified contacts",
    icon: "✅",
    segment_type: "dynamic",
    filters: {
      conditions: [
        {
          field: "is_verified",
          operator: "equals",
          value: true,
        },
      ],
      logic: "AND",
    },
    sort_by: "full_name",
    sort_order: "asc",
    member_ids: [],
    is_system: true,
    is_favorite: false,
    color: "green",
    created_by: "user-1",
    last_accessed_at: null,
    access_count: 5,
    created_at: new Date("2024-01-01").toISOString(),
    updated_at: new Date("2024-01-01").toISOString(),
    contact_count: 3,
  },
  {
    id: "segment-7",
    workspace_id: "workspace-1",
    name: "Blocked",
    description: "Blocked contacts",
    icon: "🚫",
    segment_type: "dynamic",
    filters: {
      conditions: [
        {
          field: "is_blocked",
          operator: "equals",
          value: true,
        },
      ],
      logic: "AND",
    },
    sort_by: "full_name",
    sort_order: "asc",
    member_ids: [],
    is_system: true,
    is_favorite: false,
    color: "red",
    created_by: "user-1",
    last_accessed_at: null,
    access_count: 1,
    created_at: new Date("2024-01-01").toISOString(),
    updated_at: new Date("2024-01-01").toISOString(),
    contact_count: 1,
  },
  {
    id: "segment-8",
    workspace_id: "workspace-1",
    name: "Enterprise Prospects",
    description: "High-value B2B prospects",
    icon: "💼",
    segment_type: "dynamic",
    filters: {
      conditions: [
        {
          field: "tags",
          operator: "contains",
          value: "Enterprise",
        },
        {
          field: "is_blocked",
          operator: "equals",
          value: false,
        },
      ],
      logic: "AND",
    },
    sort_by: "last_contact_at",
    sort_order: "desc",
    member_ids: [],
    is_system: false,
    is_favorite: true,
    color: "blue",
    created_by: "user-1",
    last_accessed_at: new Date(Date.now() - 259200000).toISOString(),
    access_count: 12,
    created_at: new Date("2024-10-15").toISOString(),
    updated_at: new Date("2024-10-15").toISOString(),
    contact_count: 2,
  },
  {
    id: "segment-9",
    workspace_id: "workspace-1",
    name: "Influencers",
    description: "Content creators and influencers",
    icon: "🌟",
    segment_type: "static",
    filters: {
      conditions: [],
      logic: "AND",
    },
    sort_by: "full_name",
    sort_order: "asc",
    member_ids: ["person-3", "person-6"],
    is_system: false,
    is_favorite: false,
    color: "purple",
    created_by: "user-2",
    last_accessed_at: new Date(Date.now() - 604800000).toISOString(),
    access_count: 7,
    created_at: new Date("2024-09-20").toISOString(),
    updated_at: new Date("2024-11-15").toISOString(),
    contact_count: 2,
  },
  {
    id: "segment-10",
    workspace_id: "workspace-1",
    name: "Support Queue",
    description: "Contacts with support-related tags",
    icon: "🎫",
    segment_type: "dynamic",
    filters: {
      conditions: [
        {
          field: "tags",
          operator: "contains",
          value: "Support",
        },
      ],
      logic: "AND",
    },
    sort_by: "last_contact_at",
    sort_order: "desc",
    member_ids: [],
    is_system: false,
    is_favorite: true,
    color: "orange",
    created_by: "user-3",
    last_accessed_at: new Date(Date.now() - 3600000).toISOString(),
    access_count: 34,
    created_at: new Date("2024-08-01").toISOString(),
    updated_at: new Date("2024-11-01").toISOString(),
    contact_count: 1,
  },
];

// Helper function to get segments by workspace
export function getSegmentsByWorkspace(workspaceId: string): CRMSegmentWithCount[] {
  return mockCRMSegments.filter((s) => s.workspace_id === workspaceId);
}

// Helper function to get segment by ID
export function getSegmentById(segmentId: string): CRMSegmentWithCount | undefined {
  return mockCRMSegments.find((s) => s.id === segmentId);
}

// Helper function to get system segments
export function getSystemSegments(workspaceId: string): CRMSegmentWithCount[] {
  return mockCRMSegments.filter((s) => s.workspace_id === workspaceId && s.is_system);
}

// Helper function to get custom segments
export function getCustomSegments(workspaceId: string): CRMSegmentWithCount[] {
  return mockCRMSegments.filter((s) => s.workspace_id === workspaceId && !s.is_system);
}

// Helper function to get favorite segments
export function getFavoriteSegments(workspaceId: string): CRMSegmentWithCount[] {
  return mockCRMSegments.filter((s) => s.workspace_id === workspaceId && s.is_favorite);
}
