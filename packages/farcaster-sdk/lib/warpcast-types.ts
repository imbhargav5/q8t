// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from OpenAPI specification

export interface User {
  result?: { user?: { fid?: number; username?: string; displayName?: string; pfp?: { url?: string }; profile?: { bio?: { text?: string } }; followerCount?: number; followingCount?: number; activeOnFcNetwork?: boolean } };
}

export interface Channel {
  result?: { channel?: { id?: string; url?: string; name?: string; description?: string; imageUrl?: string; leadFid?: number; moderatorFids?: number[]; createdAt?: number; followerCount?: number } };
}

export interface ChannelsResponse {
  result?: { channels?: { id?: string; url?: string; name?: string; description?: string; imageUrl?: string; followerCount?: number }[] };
  next?: { cursor?: string };
}

export interface ChannelFollowersResponse {
  result?: { users?: Record<string, unknown>[] };
  next?: { cursor?: string };
}

export interface UserChannel {
  result?: { following?: boolean; channelId?: string };
}

export interface ChannelMembersResponse {
  members?: { fid?: number; role?: string }[];
  next?: { cursor?: string };
}

export interface ChannelInvite {
  channelId?: string;
  invitedFid?: number;
  inviterFid?: number;
  role?: string;
  createdAt?: number;
  status?: string;
}

export interface ChannelInvitesResponse {
  invites?: ChannelInvite[];
  next?: { cursor?: string };
}

export interface ModeratedCastsResponse {
  casts?: { castHash?: string; action?: string; moderatorFid?: number; timestamp?: number }[];
  next?: { cursor?: string };
}

export interface RestrictedUsersResponse {
  users?: { fid?: number; restrictedAt?: number }[];
  next?: { cursor?: string };
}

export interface BannedUsersResponse {
  users?: { fid?: number; bannedAt?: number }[];
  next?: { cursor?: string };
}

export interface BlockedUsersResponse {
  users?: { fid?: number; blockedAt?: number }[];
  next?: { cursor?: string };
}

export interface PrimaryAddress {
  fid?: number;
  address?: string;
}

export interface PrimaryAddressesResponse {
  addresses?: PrimaryAddress[];
}

export interface AccountVerificationsResponse {
  verifications?: Record<string, unknown>[];
}

export interface StarterPackMembersResponse {
  members?: { fid?: number }[];
  next?: { cursor?: string };
}

export interface DirectCastResponse {
  result?: { success?: boolean; messageId?: string };
}

export interface ActionsResponse {
  result?: { actions?: Record<string, unknown>[] };
}

export interface RewardsHistoryResponse {
  result?: { winners?: Record<string, unknown>[] };
  next?: { cursor?: string };
}

export interface PowerBadgeUsersResponse {
  result?: { users?: Record<string, unknown>[] };
  next?: { cursor?: string };
}

export interface SuccessResponse {
  success?: boolean;
  message?: string;
}
