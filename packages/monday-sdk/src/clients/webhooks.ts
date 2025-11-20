// Webhooks API client for Monday.com

import type { MondayGraphQLClient } from "../auth/client";

export interface Webhook {
  id: string;
  board_id: string;
  url: string;
  event: string;
  config?: string;
}

export interface QueryWebhooksParams extends Record<string, unknown> {
  board_id?: number;
  app_webhooks_only?: boolean;
}

export interface CreateWebhookParams extends Record<string, unknown> {
  board_id: number;
  url: string;
  event: string;
  config?: string;
}

export class WebhooksClient {
  constructor(private client: MondayGraphQLClient) {}

  /**
   * Query webhooks
   */
  async query(params?: QueryWebhooksParams): Promise<Webhook[]> {
    const query = `
      query ($board_id: ID, $app_webhooks_only: Boolean) {
        webhooks(board_id: $board_id, app_webhooks_only: $app_webhooks_only) {
          id
          board_id
          url
          event
          config
        }
      }
    `;

    const result = await this.client.query<{ webhooks: Webhook[] }>(query, params);
    return result.webhooks;
  }

  /**
   * Create a new webhook
   */
  async create(params: CreateWebhookParams): Promise<Webhook> {
    const mutation = `
      mutation ($board_id: ID!, $url: String!, $event: WebhookEventType!, $config: JSON) {
        create_webhook(board_id: $board_id, url: $url, event: $event, config: $config) {
          id
          board_id
          url
          event
          config
        }
      }
    `;

    const result = await this.client.mutate<{ create_webhook: Webhook }>(mutation, params);
    return result.create_webhook;
  }

  /**
   * Delete a webhook
   */
  async delete(webhookId: number): Promise<Webhook> {
    const mutation = `
      mutation ($id: ID!) {
        delete_webhook(id: $id) {
          id
          board_id
        }
      }
    `;

    const result = await this.client.mutate<{ delete_webhook: Webhook }>(mutation, {
      id: webhookId,
    });
    return result.delete_webhook;
  }
}
