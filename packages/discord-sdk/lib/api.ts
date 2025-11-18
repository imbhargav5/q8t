// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class DiscordApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get Current User
   */
  async getCurrentUser(): Promise<Types.User> {
    return this.client.get<Types.User>("/users/@me");
  }

  /**
   * Update Current User
   */
  async updateCurrentUser(body: Types.UpdateUserRequest): Promise<Types.User> {
    return this.client.patch<Types.User>("/users/@me", body);
  }

  /**
   * Get User
   */
  async getUser(user_id: string): Promise<Types.User> {
    return this.client.get<Types.User>(`/users/${user_id}`);
  }

  /**
   * Get Guild
   */
  async getGuild(guild_id: string): Promise<Types.Guild> {
    return this.client.get<Types.Guild>(`/guilds/${guild_id}`);
  }

  /**
   * Update Guild
   */
  async updateGuild(guild_id: string, body: Types.UpdateGuildRequest): Promise<Types.Guild> {
    return this.client.patch<Types.Guild>(`/guilds/${guild_id}`, body);
  }

  /**
   * Get Guild Channels
   */
  async getGuildChannels(guild_id: string): Promise<Types.ChannelList> {
    return this.client.get<Types.ChannelList>(`/guilds/${guild_id}/channels`);
  }

  /**
   * Create Guild Channel
   */
  async createGuildChannel(guild_id: string, body: Types.CreateChannelRequest): Promise<Types.Channel> {
    return this.client.post<Types.Channel>(`/guilds/${guild_id}/channels`, body);
  }

  /**
   * List Guild Members
   */
  async listGuildMembers(guild_id: string, params?: { limit?: number; after?: string }): Promise<Types.GuildMemberList> {
    return this.client.get<Types.GuildMemberList>(`/guilds/${guild_id}/members`, {
      "limit": params?.limit,
      "after": params?.after,
    });
  }

  /**
   * Get Guild Member
   */
  async getGuildMember(guild_id: string, user_id: string): Promise<Types.GuildMember> {
    return this.client.get<Types.GuildMember>(`/guilds/${guild_id}/members/${user_id}`);
  }

  /**
   * Get Guild Roles
   */
  async getGuildRoles(guild_id: string): Promise<Types.RoleList> {
    return this.client.get<Types.RoleList>(`/guilds/${guild_id}/roles`);
  }

  /**
   * Create Guild Role
   */
  async createGuildRole(guild_id: string, body: Types.CreateRoleRequest): Promise<Types.Role> {
    return this.client.post<Types.Role>(`/guilds/${guild_id}/roles`, body);
  }

  /**
   * Get Channel
   */
  async getChannel(channel_id: string): Promise<Types.Channel> {
    return this.client.get<Types.Channel>(`/channels/${channel_id}`);
  }

  /**
   * Delete Channel
   */
  async deleteChannel(channel_id: string): Promise<Types.Channel> {
    return this.client.delete<Types.Channel>(`/channels/${channel_id}`);
  }

  /**
   * Update Channel
   */
  async updateChannel(channel_id: string, body: Types.UpdateChannelRequest): Promise<Types.Channel> {
    return this.client.patch<Types.Channel>(`/channels/${channel_id}`, body);
  }

  /**
   * Get Channel Messages
   */
  async getChannelMessages(channel_id: string, params?: { around?: string; before?: string; after?: string; limit?: number }): Promise<Types.MessageList> {
    return this.client.get<Types.MessageList>(`/channels/${channel_id}/messages`, {
      "around": params?.around,
      "before": params?.before,
      "after": params?.after,
      "limit": params?.limit,
    });
  }

  /**
   * Create Message
   */
  async createMessage(channel_id: string, body: Types.CreateMessageRequest): Promise<Types.Message> {
    return this.client.post<Types.Message>(`/channels/${channel_id}/messages`, body);
  }

  /**
   * Get Message
   */
  async getMessage(channel_id: string, message_id: string): Promise<Types.Message> {
    return this.client.get<Types.Message>(`/channels/${channel_id}/messages/${message_id}`);
  }

  /**
   * Delete Message
   */
  async deleteMessage(channel_id: string, message_id: string): Promise<void> {
    return this.client.delete<void>(`/channels/${channel_id}/messages/${message_id}`);
  }

  /**
   * Update Message
   */
  async updateMessage(channel_id: string, message_id: string, body: Types.UpdateMessageRequest): Promise<Types.Message> {
    return this.client.patch<Types.Message>(`/channels/${channel_id}/messages/${message_id}`, body);
  }

  /**
   * Bulk Delete Messages
   */
  async bulkDeleteMessages(channel_id: string, body: Types.BulkDeleteRequest): Promise<void> {
    return this.client.post<void>(`/channels/${channel_id}/messages/bulk-delete`, body);
  }

  /**
   * Add Reaction
   */
  async addReaction(channel_id: string, message_id: string, emoji: string): Promise<void> {
    return this.client.put<void>(`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`);
  }

  /**
   * Delete Own Reaction
   */
  async deleteOwnReaction(channel_id: string, message_id: string, emoji: string): Promise<void> {
    return this.client.delete<void>(`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`);
  }

  /**
   * Delete User Reaction
   */
  async deleteUserReaction(channel_id: string, message_id: string, emoji: string, user_id: string): Promise<void> {
    return this.client.delete<void>(`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/${user_id}`);
  }

  /**
   * Get Reactions
   */
  async getReactions(channel_id: string, message_id: string, emoji: string, params?: { after?: string; limit?: number }): Promise<Types.UserList> {
    return this.client.get<Types.UserList>(`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}`, {
      "after": params?.after,
      "limit": params?.limit,
    });
  }

}