// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from OpenAPI specification

import type { HttpClient } from "../src/auth/config";
import type * as SignerTypes from "./signer-types";

export class SignerApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get signer request status
   */
  async getSignerRequest(params?: { token?: string }): Promise<SignerTypes.SignerRequestStatus> {
    return this.client.get<SignerTypes.SignerRequestStatus>("/v2/signed-key-request", {
      "token": params?.token,
    });
  }

  /**
   * Create signer request
   */
  async createSignerRequest(body: Record<string, unknown>): Promise<SignerTypes.SignerRequest> {
    return this.client.post<SignerTypes.SignerRequest>("/v2/signed-key-request", body);
  }

  /**
   * Send frame notification
   */
  async sendFrameNotification(body: Record<string, unknown>): Promise<SignerTypes.NotificationResponse> {
    return this.client.post<SignerTypes.NotificationResponse>("/v1/frame-notifications", body);
  }

}