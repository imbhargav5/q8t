// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class WhatsAppApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Send a message
   */
  async sendMessage(phone_number_id: string, body: Types.SendMessageRequest): Promise<Types.SendMessageResponse> {
    return this.client.post<Types.SendMessageResponse>(`/${phone_number_id}/messages`, body);
  }

  /**
   * List message templates
   */
  async getMessageTemplates(phone_number_id: string, { limit?: number }: { limit?: number } = {}): Promise<Types.MessageTemplatesResponse> {
    return this.client.get<Types.MessageTemplatesResponse>(`/${phone_number_id}/message_templates`, {
      "limit": limit,
    });
  }

  /**
   * List phone numbers
   */
  async getPhoneNumbers(business_id: string): Promise<Types.PhoneNumbersResponse> {
    return this.client.get<Types.PhoneNumbersResponse>(`/${business_id}/phone_numbers`);
  }

}