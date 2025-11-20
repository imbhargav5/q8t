// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Airtable Webhooks API

import type { PATHttpClient } from "../src/auth/pat-client";
import type * as Types from "./types";

export class AirtableWebhooksApi {
  private client: PATHttpClient;

  constructor(client: PATHttpClient) {
    this.client = client;
  }

  /**
   * List webhooks
   */
  async listWebhooks(baseId: string): Promise<Types.WebhookList> {
    return this.client.get<Types.WebhookList>(`/bases/${baseId}/webhooks`);
  }

  /**
   * Create webhook
   */
  async createWebhook(baseId: string, body: Types.CreateWebhookRequest): Promise<Types.Webhook> {
    return this.client.post<Types.Webhook>(`/bases/${baseId}/webhooks`, body);
  }

  /**
   * Get webhook
   */
  async getWebhook(baseId: string, webhookId: string): Promise<Types.Webhook> {
    return this.client.get<Types.Webhook>(`/bases/${baseId}/webhooks/${webhookId}`);
  }

  /**
   * Delete webhook
   */
  async deleteWebhook(baseId: string, webhookId: string): Promise<void> {
    return this.client.delete<void>(`/bases/${baseId}/webhooks/${webhookId}`);
  }

  /**
   * Enable or disable webhook notifications
   */
  async enableWebhookNotifications(baseId: string, webhookId: string, body: Types.EnableNotificationsRequest): Promise<Types.Webhook> {
    return this.client.post<Types.Webhook>(`/bases/${baseId}/webhooks/${webhookId}/enableNotifications`, body);
  }

  /**
   * List webhook payloads
   * Retrieve webhook payloads for testing and debugging
   */
  async listWebhookPayloads(baseId: string, webhookId: string, queryParams?: { cursor?: number; limit?: number }): Promise<Types.WebhookPayloadList> {
    const params: Record<string, string | number | boolean | string[] | undefined> = {};
    if (queryParams?.cursor !== undefined) params["cursor"] = queryParams.cursor;
    if (queryParams?.limit !== undefined) params["limit"] = queryParams.limit;
    return this.client.get<Types.WebhookPayloadList>(`/bases/${baseId}/webhooks/${webhookId}/payloads`, params);
  }

  /**
   * Refresh webhook expiration
   * Extend webhook expiration time
   */
  async refreshWebhook(baseId: string, webhookId: string): Promise<Types.Webhook> {
    return this.client.post<Types.Webhook>(`/bases/${baseId}/webhooks/${webhookId}/refresh`);
  }

}