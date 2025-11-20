// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from OpenAPI specification

import type { HttpClient } from "../src/auth/config";
import type * as WarpcastTypes from "./warpcast-types";

export class WarpcastApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get authenticated user
   */
  async getMe(): Promise<WarpcastTypes.User> {
    return this.client.get<WarpcastTypes.User>("/v2/me");
  }

  /**
   * Get all channels
   */
  async getAllChannels(params?: { limit?: number; cursor?: string }): Promise<WarpcastTypes.ChannelsResponse> {
    return this.client.get<WarpcastTypes.ChannelsResponse>("/v2/all-channels", {
      "limit": params?.limit,
      "cursor": params?.cursor,
    });
  }

  /**
   * Get channel by ID
   */
  async getChannel(params?: { channelId?: string }): Promise<WarpcastTypes.Channel> {
    return this.client.get<WarpcastTypes.Channel>("/v1/channel", {
      "channelId": params?.channelId,
    });
  }

  /**
   * Get channel followers
   */
  async getChannelFollowers(params?: { channelId?: string; limit?: number; cursor?: string }): Promise<WarpcastTypes.ChannelFollowersResponse> {
    return this.client.get<WarpcastTypes.ChannelFollowersResponse>("/v1/channel-followers", {
      "channelId": params?.channelId,
      "limit": params?.limit,
      "cursor": params?.cursor,
    });
  }

  /**
   * Get channels followed by user
   */
  async getUserFollowingChannels(params?: { fid?: number; limit?: number; cursor?: string }): Promise<WarpcastTypes.ChannelsResponse> {
    return this.client.get<WarpcastTypes.ChannelsResponse>("/v1/user-following-channels", {
      "fid": params?.fid,
      "limit": params?.limit,
      "cursor": params?.cursor,
    });
  }

  /**
   * Check if user follows channel
   */
  async getUserChannel(params?: { fid?: number; channelId?: string }): Promise<WarpcastTypes.UserChannel> {
    return this.client.get<WarpcastTypes.UserChannel>("/v1/user-channel", {
      "fid": params?.fid,
      "channelId": params?.channelId,
    });
  }

  /**
   * Get channel members
   */
  async getChannelMembers(params?: { channelId?: string; limit?: number; cursor?: string }): Promise<WarpcastTypes.ChannelMembersResponse> {
    return this.client.get<WarpcastTypes.ChannelMembersResponse>("/fc/channel-members", {
      "channelId": params?.channelId,
      "limit": params?.limit,
      "cursor": params?.cursor,
    });
  }

  /**
   * Follow a channel
   */
  async followChannel(body: Record<string, unknown>): Promise<WarpcastTypes.SuccessResponse> {
    return this.client.post<WarpcastTypes.SuccessResponse>("/fc/channel-follows", body);
  }

  /**
   * Unfollow a channel
   */
  async unfollowChannel(params?: { channelId?: string }): Promise<WarpcastTypes.SuccessResponse> {
    return this.client.delete<WarpcastTypes.SuccessResponse>("/fc/channel-follows", {
      "channelId": params?.channelId,
    });
  }

  /**
   * Get channel invites
   */
  async getChannelInvites(params?: { channelId?: string; limit?: number; cursor?: string }): Promise<WarpcastTypes.ChannelInvitesResponse> {
    return this.client.get<WarpcastTypes.ChannelInvitesResponse>("/fc/channel-invites", {
      "channelId": params?.channelId,
      "limit": params?.limit,
      "cursor": params?.cursor,
    });
  }

  /**
   * Invite user to channel
   */
  async createChannelInvite(body: Record<string, unknown>): Promise<WarpcastTypes.ChannelInvite> {
    return this.client.post<WarpcastTypes.ChannelInvite>("/fc/channel-invites", body);
  }

  /**
   * Remove/revoke channel invite
   */
  async deleteChannelInvite(params?: { channelId?: string; invitedFid?: number }): Promise<WarpcastTypes.SuccessResponse> {
    return this.client.delete<WarpcastTypes.SuccessResponse>("/fc/channel-invites", {
      "channelId": params?.channelId,
      "invitedFid": params?.invitedFid,
    });
  }

  /**
   * Accept or decline channel invite
   */
  async respondToChannelInvite(body: Record<string, unknown>): Promise<WarpcastTypes.SuccessResponse> {
    return this.client.patch<WarpcastTypes.SuccessResponse>("/fc/channel-invites", body);
  }

  /**
   * Get moderated casts
   */
  async getModeratedCasts(params?: { channelId?: string; limit?: number; cursor?: string }): Promise<WarpcastTypes.ModeratedCastsResponse> {
    return this.client.get<WarpcastTypes.ModeratedCastsResponse>("/fc/moderated-casts", {
      "channelId": params?.channelId,
      "limit": params?.limit,
      "cursor": params?.cursor,
    });
  }

  /**
   * Hide or unhide a cast
   */
  async moderateCast(body: Record<string, unknown>): Promise<WarpcastTypes.SuccessResponse> {
    return this.client.post<WarpcastTypes.SuccessResponse>("/fc/moderated-casts", body);
  }

  /**
   * Get restricted users
   */
  async getChannelRestrictedUsers(params?: { channelId?: string; limit?: number; cursor?: string }): Promise<WarpcastTypes.RestrictedUsersResponse> {
    return this.client.get<WarpcastTypes.RestrictedUsersResponse>("/fc/channel-restricted-users", {
      "channelId": params?.channelId,
      "limit": params?.limit,
      "cursor": params?.cursor,
    });
  }

  /**
   * Get banned users
   */
  async getChannelBans(params?: { channelId?: string; limit?: number; cursor?: string }): Promise<WarpcastTypes.BannedUsersResponse> {
    return this.client.get<WarpcastTypes.BannedUsersResponse>("/fc/channel-bans", {
      "channelId": params?.channelId,
      "limit": params?.limit,
      "cursor": params?.cursor,
    });
  }

  /**
   * Ban user from channel
   */
  async banUser(body: Record<string, unknown>): Promise<WarpcastTypes.SuccessResponse> {
    return this.client.post<WarpcastTypes.SuccessResponse>("/fc/channel-bans", body);
  }

  /**
   * Unban user from channel
   */
  async unbanUser(params?: { channelId?: string; fid?: number }): Promise<WarpcastTypes.SuccessResponse> {
    return this.client.delete<WarpcastTypes.SuccessResponse>("/fc/channel-bans", {
      "channelId": params?.channelId,
      "fid": params?.fid,
    });
  }

  /**
   * Pin cast to channel
   */
  async pinCast(body: Record<string, unknown>): Promise<WarpcastTypes.SuccessResponse> {
    return this.client.put<WarpcastTypes.SuccessResponse>("/fc/pinned-casts", body);
  }

  /**
   * Unpin cast from channel
   */
  async unpinCast(params?: { channelId?: string; castHash?: string }): Promise<WarpcastTypes.SuccessResponse> {
    return this.client.delete<WarpcastTypes.SuccessResponse>("/fc/pinned-casts", {
      "channelId": params?.channelId,
      "castHash": params?.castHash,
    });
  }

  /**
   * Get blocked users
   */
  async getBlockedUsers(params?: { fid?: number; limit?: number; cursor?: string }): Promise<WarpcastTypes.BlockedUsersResponse> {
    return this.client.get<WarpcastTypes.BlockedUsersResponse>("/fc/blocked-users", {
      "fid": params?.fid,
      "limit": params?.limit,
      "cursor": params?.cursor,
    });
  }

  /**
   * Block a user
   */
  async blockUser(body: Record<string, unknown>): Promise<WarpcastTypes.SuccessResponse> {
    return this.client.post<WarpcastTypes.SuccessResponse>("/fc/blocked-users", body);
  }

  /**
   * Unblock a user
   */
  async unblockUser(params?: { targetFid?: number }): Promise<WarpcastTypes.SuccessResponse> {
    return this.client.delete<WarpcastTypes.SuccessResponse>("/fc/blocked-users", {
      "targetFid": params?.targetFid,
    });
  }

  /**
   * Get primary address
   */
  async getPrimaryAddress(params?: { fid?: number }): Promise<WarpcastTypes.PrimaryAddress> {
    return this.client.get<WarpcastTypes.PrimaryAddress>("/fc/primary-address", {
      "fid": params?.fid,
    });
  }

  /**
   * Get primary addresses (bulk)
   */
  async getPrimaryAddresses(params?: { fids?: string }): Promise<WarpcastTypes.PrimaryAddressesResponse> {
    return this.client.get<WarpcastTypes.PrimaryAddressesResponse>("/fc/primary-addresses", {
      "fids": params?.fids,
    });
  }

  /**
   * Get account verifications
   */
  async getAccountVerifications(params?: { fid?: number }): Promise<WarpcastTypes.AccountVerificationsResponse> {
    return this.client.get<WarpcastTypes.AccountVerificationsResponse>("/fc/account-verifications", {
      "fid": params?.fid,
    });
  }

  /**
   * Get starter pack members
   */
  async getStarterPackMembers(params?: { starterPackId?: string; limit?: number; cursor?: string }): Promise<WarpcastTypes.StarterPackMembersResponse> {
    return this.client.get<WarpcastTypes.StarterPackMembersResponse>("/fc/starter-pack-members", {
      "starterPackId": params?.starterPackId,
      "limit": params?.limit,
      "cursor": params?.cursor,
    });
  }

  /**
   * Send direct message
   */
  async sendDirectCast(body: Record<string, unknown>): Promise<WarpcastTypes.DirectCastResponse> {
    return this.client.put<WarpcastTypes.DirectCastResponse>("/v2/ext-send-direct-cast", body);
  }

  /**
   * Get Farcaster actions
   */
  async getDiscoverActions(): Promise<WarpcastTypes.ActionsResponse> {
    return this.client.get<WarpcastTypes.ActionsResponse>("/v2/discover-actions");
  }

  /**
   * Get creator rewards history
   */
  async getCreatorRewardsWinnerHistory(params?: { limit?: number; cursor?: string }): Promise<WarpcastTypes.RewardsHistoryResponse> {
    return this.client.get<WarpcastTypes.RewardsHistoryResponse>("/v1/creator-rewards-winner-history", {
      "limit": params?.limit,
      "cursor": params?.cursor,
    });
  }

  /**
   * Get developer rewards history
   */
  async getDeveloperRewardsWinnerHistory(params?: { limit?: number; cursor?: string }): Promise<WarpcastTypes.RewardsHistoryResponse> {
    return this.client.get<WarpcastTypes.RewardsHistoryResponse>("/v1/developer-rewards-winner-history", {
      "limit": params?.limit,
      "cursor": params?.cursor,
    });
  }

  /**
   * Get power badge users
   */
  async getPowerBadgeUsers(params?: { limit?: number; cursor?: string }): Promise<WarpcastTypes.PowerBadgeUsersResponse> {
    return this.client.get<WarpcastTypes.PowerBadgeUsersResponse>("/v2/power-badge-users", {
      "limit": params?.limit,
      "cursor": params?.cursor,
    });
  }

}