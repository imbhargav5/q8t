import type { ConversationWithRelations } from "../zod-schemas";
import { mockPeople } from "./people";

const now = Date.now();

export const mockConversations: ConversationWithRelations[] = [
  // 1. Active Twitter DM with Sarah Chen - VIP, unread, most recent
  {
    id: "conv-1",
    workspace_id: "workspace-1",
    person_id: "person-1",
    social_account_id: "account-1",
    platform: "twitter",
    subject: null,
    status: "open",
    message_count: 12,
    unread_count: 2,
    first_message_at: new Date(now - 7200000).toISOString(), // 2 hours ago
    last_message_at: new Date(now - 120000).toISOString(), // 2 minutes ago
    last_read_at: new Date(now - 600000).toISOString(), // 10 minutes ago
    assigned_to: "user-1",
    assigned_at: new Date(now - 3600000).toISOString(),
    platform_thread_id: "thread-twitter-1",
    is_starred: true,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 7200000).toISOString(),
    updated_at: new Date(now - 120000).toISOString(),
    person: mockPeople[0],
    assigned_to_user: {
      id: "user-1",
      full_name: "You (Current User)",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    },
  },

  // 2. Instagram Story Mention - Unassigned, recent
  {
    id: "conv-2",
    workspace_id: "workspace-1",
    person_id: "person-3",
    social_account_id: "account-6",
    platform: "instagram",
    subject: null,
    status: "open",
    message_count: 3,
    unread_count: 3,
    first_message_at: new Date(now - 3600000).toISOString(), // 1 hour ago
    last_message_at: new Date(now - 3600000).toISOString(),
    last_read_at: null,
    assigned_to: null,
    assigned_at: null,
    platform_thread_id: "thread-instagram-1",
    is_starred: false,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 3600000).toISOString(),
    updated_at: new Date(now - 3600000).toISOString(),
    person: mockPeople[2],
    assigned_to_user: null,
  },

  // 3. WhatsApp Support - Assigned to Sarah, pending
  {
    id: "conv-3",
    workspace_id: "workspace-1",
    person_id: "person-2",
    social_account_id: "account-4",
    platform: "whatsapp",
    subject: "Product inquiry",
    status: "pending",
    message_count: 8,
    unread_count: 0,
    first_message_at: new Date(now - 86400000).toISOString(), // 1 day ago
    last_message_at: new Date(now - 7200000).toISOString(), // 2 hours ago
    last_read_at: new Date(now - 3600000).toISOString(),
    assigned_to: "user-2",
    assigned_at: new Date(now - 82800000).toISOString(),
    platform_thread_id: "thread-whatsapp-1",
    is_starred: false,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 86400000).toISOString(),
    updated_at: new Date(now - 7200000).toISOString(),
    person: mockPeople[1],
    assigned_to_user: {
      id: "user-2",
      full_name: "Sarah Johnson",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  },

  // 4. Facebook Comment - Resolved
  {
    id: "conv-4",
    workspace_id: "workspace-1",
    person_id: "person-2",
    social_account_id: "account-5",
    platform: "facebook",
    subject: null,
    status: "resolved",
    message_count: 5,
    unread_count: 0,
    first_message_at: new Date(now - 259200000).toISOString(), // 3 days ago
    last_message_at: new Date(now - 172800000).toISOString(), // 2 days ago
    last_read_at: new Date(now - 172800000).toISOString(),
    assigned_to: "user-3",
    assigned_at: new Date(now - 259200000).toISOString(),
    platform_thread_id: "thread-facebook-1",
    is_starred: false,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 259200000).toISOString(),
    updated_at: new Date(now - 172800000).toISOString(),
    person: mockPeople[1],
    assigned_to_user: {
      id: "user-3",
      full_name: "Mike Peters",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
  },

  // 5. LinkedIn Message - VIP customer, starred
  {
    id: "conv-5",
    workspace_id: "workspace-1",
    person_id: "person-4",
    social_account_id: "account-8",
    platform: "linkedin",
    subject: "Partnership opportunity",
    status: "open",
    message_count: 6,
    unread_count: 1,
    first_message_at: new Date(now - 432000000).toISOString(), // 5 days ago
    last_message_at: new Date(now - 21600000).toISOString(), // 6 hours ago
    last_read_at: new Date(now - 86400000).toISOString(),
    assigned_to: "user-1",
    assigned_at: new Date(now - 432000000).toISOString(),
    platform_thread_id: "thread-linkedin-1",
    is_starred: true,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 432000000).toISOString(),
    updated_at: new Date(now - 21600000).toISOString(),
    person: mockPeople[3],
    assigned_to_user: {
      id: "user-1",
      full_name: "You (Current User)",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    },
  },

  // 6. Discord mention - Open, needs attention
  {
    id: "conv-6",
    workspace_id: "workspace-1",
    person_id: "person-5",
    social_account_id: "account-10",
    platform: "discord",
    subject: null,
    status: "open",
    message_count: 4,
    unread_count: 2,
    first_message_at: new Date(now - 43200000).toISOString(), // 12 hours ago
    last_message_at: new Date(now - 10800000).toISOString(), // 3 hours ago
    last_read_at: new Date(now - 21600000).toISOString(),
    assigned_to: null,
    assigned_at: null,
    platform_thread_id: "thread-discord-1",
    is_starred: false,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 43200000).toISOString(),
    updated_at: new Date(now - 10800000).toISOString(),
    person: mockPeople[4],
    assigned_to_user: null,
  },

  // 7. Telegram - New contact
  {
    id: "conv-7",
    workspace_id: "workspace-1",
    person_id: "person-8",
    social_account_id: "account-15",
    platform: "telegram",
    subject: null,
    status: "open",
    message_count: 3,
    unread_count: 3,
    first_message_at: new Date(now - 1800000).toISOString(), // 30 minutes ago
    last_message_at: new Date(now - 1800000).toISOString(),
    last_read_at: null,
    assigned_to: null,
    assigned_at: null,
    platform_thread_id: "thread-telegram-1",
    is_starred: false,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 1800000).toISOString(),
    updated_at: new Date(now - 1800000).toISOString(),
    person: mockPeople[7],
    assigned_to_user: null,
  },

  // 8. TikTok comment - Quick reply needed
  {
    id: "conv-8",
    workspace_id: "workspace-1",
    person_id: "person-3",
    social_account_id: "account-7",
    platform: "tiktok",
    subject: null,
    status: "open",
    message_count: 2,
    unread_count: 1,
    first_message_at: new Date(now - 14400000).toISOString(), // 4 hours ago
    last_message_at: new Date(now - 14400000).toISOString(),
    last_read_at: null,
    assigned_to: "user-4",
    assigned_at: new Date(now - 10800000).toISOString(),
    platform_thread_id: "thread-tiktok-1",
    is_starred: false,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 14400000).toISOString(),
    updated_at: new Date(now - 14400000).toISOString(),
    person: mockPeople[2],
    assigned_to_user: {
      id: "user-4",
      full_name: "Emma Wilson",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
  },

  // 9. YouTube comment - Public engagement
  {
    id: "conv-9",
    workspace_id: "workspace-1",
    person_id: "person-6",
    social_account_id: "account-12",
    platform: "youtube",
    subject: null,
    status: "pending",
    message_count: 5,
    unread_count: 0,
    first_message_at: new Date(now - 604800000).toISOString(), // 7 days ago
    last_message_at: new Date(now - 432000000).toISOString(), // 5 days ago
    last_read_at: new Date(now - 432000000).toISOString(),
    assigned_to: "user-1",
    assigned_at: new Date(now - 518400000).toISOString(),
    platform_thread_id: "thread-youtube-1",
    is_starred: false,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 604800000).toISOString(),
    updated_at: new Date(now - 432000000).toISOString(),
    person: mockPeople[5],
    assigned_to_user: {
      id: "user-1",
      full_name: "You (Current User)",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    },
  },

  // 10. Twitter mention - Jessica
  {
    id: "conv-10",
    workspace_id: "workspace-1",
    person_id: "person-5",
    social_account_id: "account-9",
    platform: "twitter",
    subject: null,
    status: "open",
    message_count: 3,
    unread_count: 1,
    first_message_at: new Date(now - 86400000).toISOString(), // 1 day ago
    last_message_at: new Date(now - 43200000).toISOString(), // 12 hours ago
    last_read_at: new Date(now - 72000000).toISOString(),
    assigned_to: null,
    assigned_at: null,
    platform_thread_id: "thread-twitter-2",
    is_starred: false,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 86400000).toISOString(),
    updated_at: new Date(now - 43200000).toISOString(),
    person: mockPeople[4],
    assigned_to_user: null,
  },

  // 11. Slack - Spam conversation, archived
  {
    id: "conv-11",
    workspace_id: "workspace-1",
    person_id: "person-7",
    social_account_id: "account-14",
    platform: "slack",
    subject: null,
    status: "archived",
    message_count: 2,
    unread_count: 0,
    first_message_at: new Date(now - 604800000).toISOString(), // 1 week ago
    last_message_at: new Date(now - 604800000).toISOString(),
    last_read_at: new Date(now - 604800000).toISOString(),
    assigned_to: null,
    assigned_at: null,
    platform_thread_id: "thread-slack-1",
    is_starred: false,
    is_spam: true,
    metadata: {},
    created_at: new Date(now - 604800000).toISOString(),
    updated_at: new Date(now - 604800000).toISOString(),
    person: mockPeople[6],
    assigned_to_user: null,
  },

  // 12. Instagram DM - David Kim (influencer), VIP, media heavy
  {
    id: "conv-12",
    workspace_id: "workspace-1",
    person_id: "person-6",
    social_account_id: "account-11",
    platform: "instagram",
    subject: "Brand collaboration",
    status: "open",
    message_count: 15,
    unread_count: 0,
    first_message_at: new Date(now - 1209600000).toISOString(), // 14 days ago
    last_message_at: new Date(now - 172800000).toISOString(), // 2 days ago
    last_read_at: new Date(now - 172800000).toISOString(),
    assigned_to: "user-2",
    assigned_at: new Date(now - 1036800000).toISOString(),
    platform_thread_id: "thread-instagram-2",
    is_starred: true,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 1209600000).toISOString(),
    updated_at: new Date(now - 172800000).toISOString(),
    person: mockPeople[5],
    assigned_to_user: {
      id: "user-2",
      full_name: "Sarah Johnson",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  },

  // 13. LinkedIn - Sarah Chen (multi-platform user)
  {
    id: "conv-13",
    workspace_id: "workspace-1",
    person_id: "person-1",
    social_account_id: "account-2",
    platform: "linkedin",
    subject: "Investment inquiry",
    status: "pending",
    message_count: 4,
    unread_count: 0,
    first_message_at: new Date(now - 1814400000).toISOString(), // 21 days ago
    last_message_at: new Date(now - 1209600000).toISOString(), // 14 days ago
    last_read_at: new Date(now - 1209600000).toISOString(),
    assigned_to: "user-1",
    assigned_at: new Date(now - 1728000000).toISOString(),
    platform_thread_id: "thread-linkedin-2",
    is_starred: false,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 1814400000).toISOString(),
    updated_at: new Date(now - 1209600000).toISOString(),
    person: mockPeople[0],
    assigned_to_user: {
      id: "user-1",
      full_name: "You (Current User)",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    },
  },

  // 14. Instagram - Emily (old conversation)
  {
    id: "conv-14",
    workspace_id: "workspace-1",
    person_id: "person-3",
    social_account_id: "account-6",
    platform: "instagram",
    subject: null,
    status: "resolved",
    message_count: 8,
    unread_count: 0,
    first_message_at: new Date(now - 2592000000).toISOString(), // 30 days ago
    last_message_at: new Date(now - 2419200000).toISOString(), // 28 days ago
    last_read_at: new Date(now - 2419200000).toISOString(),
    assigned_to: "user-3",
    assigned_at: new Date(now - 2592000000).toISOString(),
    platform_thread_id: "thread-instagram-3",
    is_starred: false,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 2592000000).toISOString(),
    updated_at: new Date(now - 2419200000).toISOString(),
    person: mockPeople[2],
    assigned_to_user: {
      id: "user-3",
      full_name: "Mike Peters",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
  },

  // 15. Twitter - David Kim (high priority)
  {
    id: "conv-15",
    workspace_id: "workspace-1",
    person_id: "person-6",
    social_account_id: "account-13",
    platform: "twitter",
    subject: null,
    status: "open",
    message_count: 7,
    unread_count: 3,
    first_message_at: new Date(now - 28800000).toISOString(), // 8 hours ago
    last_message_at: new Date(now - 900000).toISOString(), // 15 minutes ago
    last_read_at: new Date(now - 14400000).toISOString(),
    assigned_to: null,
    assigned_at: null,
    platform_thread_id: "thread-twitter-3",
    is_starred: true,
    is_spam: false,
    metadata: {},
    created_at: new Date(now - 28800000).toISOString(),
    updated_at: new Date(now - 900000).toISOString(),
    person: mockPeople[5],
    assigned_to_user: null,
  },
];
