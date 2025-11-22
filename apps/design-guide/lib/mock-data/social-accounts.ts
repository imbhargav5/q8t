import type { SocialAccount } from "../zod-schemas";

const now = Date.now();

export const mockSocialAccounts: SocialAccount[] = [
  // Twitter/X accounts
  {
    id: "account-1",
    workspace_id: "workspace-1",
    platform: "twitter",
    account_name: "Chatsian",
    handle: "@chatsian",
    avatar_url: "https://api.dicebear.com/7.x/shapes/svg?seed=chatsian",
    is_active: true,
    is_connected: true,
    last_synced_at: new Date(now - 300000).toISOString(), // 5 minutes ago
    platform_user_id: "twitter-123456",
    access_token_expires_at: new Date(now + 2592000000).toISOString(), // 30 days
    followers_count: 12543,
    metadata: {},
    created_at: new Date(now - 15552000000).toISOString(), // 6 months ago
    updated_at: new Date(now - 300000).toISOString(),
  },
  {
    id: "account-2",
    workspace_id: "workspace-1",
    platform: "twitter",
    account_name: "Chatsian Support",
    handle: "@chatsian_help",
    avatar_url: "https://api.dicebear.com/7.x/shapes/svg?seed=chatsian-support",
    is_active: true,
    is_connected: true,
    last_synced_at: new Date(now - 600000).toISOString(),
    platform_user_id: "twitter-789012",
    access_token_expires_at: new Date(now + 2592000000).toISOString(),
    followers_count: 5421,
    metadata: {},
    created_at: new Date(now - 7776000000).toISOString(), // 3 months ago
    updated_at: new Date(now - 600000).toISOString(),
  },

  // Instagram accounts
  {
    id: "account-3",
    workspace_id: "workspace-1",
    platform: "instagram",
    account_name: "Chatsian",
    handle: "@chatsian",
    avatar_url: "https://api.dicebear.com/7.x/shapes/svg?seed=chatsian-ig",
    is_active: true,
    is_connected: true,
    last_synced_at: new Date(now - 900000).toISOString(),
    platform_user_id: "ig-987654",
    access_token_expires_at: new Date(now + 5184000000).toISOString(), // 60 days
    followers_count: 28965,
    metadata: {},
    created_at: new Date(now - 31104000000).toISOString(), // 1 year ago
    updated_at: new Date(now - 900000).toISOString(),
  },

  // LinkedIn accounts
  {
    id: "account-4",
    workspace_id: "workspace-1",
    platform: "linkedin",
    account_name: "Chatsian",
    handle: "chatsian",
    avatar_url: "https://api.dicebear.com/7.x/shapes/svg?seed=chatsian-li",
    is_active: true,
    is_connected: true,
    last_synced_at: new Date(now - 1800000).toISOString(),
    platform_user_id: "li-456789",
    access_token_expires_at: new Date(now + 2592000000).toISOString(),
    followers_count: 8934,
    metadata: {},
    created_at: new Date(now - 15552000000).toISOString(),
    updated_at: new Date(now - 1800000).toISOString(),
  },

  // Facebook accounts
  {
    id: "account-5",
    workspace_id: "workspace-1",
    platform: "facebook",
    account_name: "Chatsian",
    handle: "chatsian",
    avatar_url: "https://api.dicebear.com/7.x/shapes/svg?seed=chatsian-fb",
    is_active: true,
    is_connected: true,
    last_synced_at: new Date(now - 3600000).toISOString(),
    platform_user_id: "fb-321654",
    access_token_expires_at: new Date(now + 5184000000).toISOString(),
    followers_count: 15678,
    metadata: {},
    created_at: new Date(now - 31104000000).toISOString(),
    updated_at: new Date(now - 3600000).toISOString(),
  },

  // TikTok account
  {
    id: "account-6",
    workspace_id: "workspace-1",
    platform: "tiktok",
    account_name: "Chatsian",
    handle: "@chatsian",
    avatar_url: "https://api.dicebear.com/7.x/shapes/svg?seed=chatsian-tt",
    is_active: true,
    is_connected: true,
    last_synced_at: new Date(now - 7200000).toISOString(),
    platform_user_id: "tt-654321",
    access_token_expires_at: new Date(now + 2592000000).toISOString(),
    followers_count: 45892,
    metadata: {},
    created_at: new Date(now - 7776000000).toISOString(),
    updated_at: new Date(now - 7200000).toISOString(),
  },

  // YouTube account
  {
    id: "account-7",
    workspace_id: "workspace-1",
    platform: "youtube",
    account_name: "Chatsian",
    handle: "@chatsian",
    avatar_url: "https://api.dicebear.com/7.x/shapes/svg?seed=chatsian-yt",
    is_active: true,
    is_connected: true,
    last_synced_at: new Date(now - 86400000).toISOString(),
    platform_user_id: "yt-147258",
    access_token_expires_at: new Date(now + 2592000000).toISOString(),
    followers_count: 6789,
    metadata: {},
    created_at: new Date(now - 23328000000).toISOString(), // 9 months ago
    updated_at: new Date(now - 86400000).toISOString(),
  },

  // Threads account
  {
    id: "account-8",
    workspace_id: "workspace-1",
    platform: "threads",
    account_name: "Chatsian",
    handle: "@chatsian",
    avatar_url: "https://api.dicebear.com/7.x/shapes/svg?seed=chatsian-threads",
    is_active: true,
    is_connected: true,
    last_synced_at: new Date(now - 1200000).toISOString(),
    platform_user_id: "threads-963852",
    access_token_expires_at: new Date(now + 5184000000).toISOString(),
    followers_count: 3421,
    metadata: {},
    created_at: new Date(now - 2592000000).toISOString(), // 1 month ago
    updated_at: new Date(now - 1200000).toISOString(),
  },
];

// Helper function to get accounts by platform
export function getAccountsByPlatform(platform: string): SocialAccount[] {
  return mockSocialAccounts.filter((account) => account.platform === platform);
}

// Helper function to get active accounts
export function getActiveAccounts(): SocialAccount[] {
  return mockSocialAccounts.filter((account) => account.is_active && account.is_connected);
}
