// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class DiscordApi {
  constructor() {}

  /**
   * Get Current User
   */
  getCurrentUser(): Effect.Effect<Types.User, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.User>("/users/@me");
  }

  /**
   * Update Current User
   */
  updateCurrentUser(body: Types.UpdateUserRequest): Effect.Effect<Types.User, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.patch<Types.User>("/users/@me", body);
  }

  /**
   * Get User
   */
  getUser(user_id: string): Effect.Effect<Types.User, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.User>(`/users/${user_id}`);
  }

  /**
   * Get Guild
   */
  getGuild(guild_id: string): Effect.Effect<Types.Guild, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.Guild>(`/guilds/${guild_id}`);
  }

  /**
   * Update Guild
   */
  updateGuild(guild_id: string, body: Types.UpdateGuildRequest): Effect.Effect<Types.Guild, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.patch<Types.Guild>(`/guilds/${guild_id}`, body);
  }

  /**
   * Get Guild Channels
   */
  getGuildChannels(guild_id: string): Effect.Effect<Types.ChannelList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.ChannelList>(`/guilds/${guild_id}/channels`);
  }

  /**
   * Create Guild Channel
   */
  createGuildChannel(guild_id: string, body: Types.CreateChannelRequest): Effect.Effect<Types.Channel, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.Channel>(`/guilds/${guild_id}/channels`, body);
  }

  /**
   * List Guild Members
   */
  listGuildMembers(guild_id: string, params?: { limit?: number; after?: string }): Effect.Effect<Types.GuildMemberList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.GuildMemberList>(`/guilds/${guild_id}/members`, {
      "limit": params?.limit,
      "after": params?.after,
    });
  }

  /**
   * Get Guild Member
   */
  getGuildMember(guild_id: string, user_id: string): Effect.Effect<Types.GuildMember, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.GuildMember>(`/guilds/${guild_id}/members/${user_id}`);
  }

  /**
   * Get Guild Roles
   */
  getGuildRoles(guild_id: string): Effect.Effect<Types.RoleList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.RoleList>(`/guilds/${guild_id}/roles`);
  }

  /**
   * Create Guild Role
   */
  createGuildRole(guild_id: string, body: Types.CreateRoleRequest): Effect.Effect<Types.Role, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.Role>(`/guilds/${guild_id}/roles`, body);
  }

  /**
   * Get Channel
   */
  getChannel(channel_id: string): Effect.Effect<Types.Channel, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.Channel>(`/channels/${channel_id}`);
  }

  /**
   * Delete Channel
   */
  deleteChannel(channel_id: string): Effect.Effect<Types.Channel, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.Channel>(`/channels/${channel_id}`);
  }

  /**
   * Update Channel
   */
  updateChannel(channel_id: string, body: Types.UpdateChannelRequest): Effect.Effect<Types.Channel, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.patch<Types.Channel>(`/channels/${channel_id}`, body);
  }

  /**
   * Get Channel Messages
   */
  getChannelMessages(channel_id: string, params?: { around?: string; before?: string; after?: string; limit?: number }): Effect.Effect<Types.MessageList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.MessageList>(`/channels/${channel_id}/messages`, {
      "around": params?.around,
      "before": params?.before,
      "after": params?.after,
      "limit": params?.limit,
    });
  }

  /**
   * Create Message
   */
  createMessage(channel_id: string, body: Types.CreateMessageRequest): Effect.Effect<Types.Message, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.Message>(`/channels/${channel_id}/messages`, body);
  }

  /**
   * Get Message
   */
  getMessage(channel_id: string, message_id: string): Effect.Effect<Types.Message, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.Message>(`/channels/${channel_id}/messages/${message_id}`);
  }

  /**
   * Delete Message
   */
  deleteMessage(channel_id: string, message_id: string): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<void>(`/channels/${channel_id}/messages/${message_id}`);
  }

  /**
   * Update Message
   */
  updateMessage(channel_id: string, message_id: string, body: Types.UpdateMessageRequest): Effect.Effect<Types.Message, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.patch<Types.Message>(`/channels/${channel_id}/messages/${message_id}`, body);
  }

  /**
   * Bulk Delete Messages
   */
  bulkDeleteMessages(channel_id: string, body: Types.BulkDeleteRequest): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<void>(`/channels/${channel_id}/messages/bulk-delete`, body);
  }

  /**
   * Add Reaction
   */
  addReaction(channel_id: string, message_id: string, emoji: string): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.put<void>(`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`);
  }

  /**
   * Delete Own Reaction
   */
  deleteOwnReaction(channel_id: string, message_id: string, emoji: string): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<void>(`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`);
  }

  /**
   * Delete User Reaction
   */
  deleteUserReaction(channel_id: string, message_id: string, emoji: string, user_id: string): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<void>(`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/${user_id}`);
  }

  /**
   * Get Reactions
   */
  getReactions(channel_id: string, message_id: string, emoji: string, params?: { after?: string; limit?: number }): Effect.Effect<Types.UserList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.UserList>(`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}`, {
      "after": params?.after,
      "limit": params?.limit,
    });
  }

}