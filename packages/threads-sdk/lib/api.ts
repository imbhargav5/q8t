// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class ThreadsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get authenticated user profile
   */
  async getMe({ fields?: string }: { fields?: string } = {}): Promise<Types.UserProfile> {
    return this.client.get<Types.UserProfile>("/me", {
      "fields": fields,
    });
  }

  /**
   * List user's threads
   */
  async getUserThreads(user_id: string, { fields?: string, limit?: number, since?: string, until?: string }: { fields?: string; limit?: number; since?: string; until?: string } = {}): Promise<Types.ThreadsList> {
    return this.client.get<Types.ThreadsList>(`/${user_id}/threads`, {
      "fields": fields,
      "limit": limit,
      "since": since,
      "until": until,
    });
  }

  /**
   * Create a new thread
   */
  async createThread(user_id: string, body: Types.CreateThreadRequest): Promise<Types.ThreadContainer> {
    return this.client.post<Types.ThreadContainer>(`/${user_id}/threads`, body);
  }

  /**
   * Get a specific thread
   */
  async getThread(thread_id: string, { fields?: string }: { fields?: string } = {}): Promise<Types.Thread> {
    return this.client.get<Types.Thread>(`/${thread_id}`, {
      "fields": fields,
    });
  }

}