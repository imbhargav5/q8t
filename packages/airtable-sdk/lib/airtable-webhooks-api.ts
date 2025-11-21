// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Airtable Webhooks API

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class AirtableWebhooksApi {
  constructor() {}

  /**
   * List webhooks
   */
  listWebhooks(baseId: string): Effect.Effect<Types.WebhookList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.WebhookList>(`/bases/${baseId}/webhooks`);
    });
  }

  /**
   * Create webhook
   */
  createWebhook(baseId: string, body: Types.CreateWebhookRequest): Effect.Effect<Types.Webhook, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.Webhook>(`/bases/${baseId}/webhooks`, { body });
    });
  }

  /**
   * Get webhook
   */
  getWebhook(baseId: string, webhookId: string): Effect.Effect<Types.Webhook, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.Webhook>(`/bases/${baseId}/webhooks/${webhookId}`);
    });
  }

  /**
   * Delete webhook
   */
  deleteWebhook(baseId: string, webhookId: string): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.delete<void>(`/bases/${baseId}/webhooks/${webhookId}`);
    });
  }

  /**
   * Enable or disable webhook notifications
   */
  enableWebhookNotifications(baseId: string, webhookId: string, body: Types.EnableNotificationsRequest): Effect.Effect<Types.Webhook, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.Webhook>(`/bases/${baseId}/webhooks/${webhookId}/enableNotifications`, { body });
    });
  }

  /**
   * List webhook payloads
   * Retrieve webhook payloads for testing and debugging
   */
  listWebhookPayloads(baseId: string, webhookId: string, queryParams?: { cursor?: number; limit?: number }): Effect.Effect<Types.WebhookPayloadList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      const params: Record<string, string | number | boolean | string[] | undefined> = {};
      if (queryParams?.cursor !== undefined) params["cursor"] = queryParams.cursor;
      if (queryParams?.limit !== undefined) params["limit"] = queryParams.limit;
      return yield* client.get<Types.WebhookPayloadList>(`/bases/${baseId}/webhooks/${webhookId}/payloads`, { queryParams: params });
    });
  }

  /**
   * Refresh webhook expiration
   * Extend webhook expiration time
   */
  refreshWebhook(baseId: string, webhookId: string): Effect.Effect<Types.Webhook, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.Webhook>(`/bases/${baseId}/webhooks/${webhookId}/refresh`);
    });
  }

}