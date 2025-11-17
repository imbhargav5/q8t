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
   * Get Guild
   */
  async getGuild(guild_id: string): Promise<Types.Guild> {
    return this.client.get<Types.Guild>(`/guilds/${guild_id}`);
  }

  /**
   * Get Channel Messages
   */
  async getChannelMessages(channel_id: string, { around?: string, before?: string, after?: string, limit?: number }: { around?: string; before?: string; after?: string; limit?: number } = {}): Promise<Types.MessageList> {
    return this.client.get<Types.MessageList>(`/channels/${channel_id}/messages`, {
      "around": around,
      "before": before,
      "after": after,
      "limit": limit,
    });
  }

  /**
   * Create Message
   */
  async createMessage(channel_id: string, body: Types.CreateMessageRequest): Promise<Types.Message> {
    return this.client.post<Types.Message>(`/channels/${channel_id}/messages`, body);
  }

}