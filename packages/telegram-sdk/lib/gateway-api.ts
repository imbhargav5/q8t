// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Telegram Gateway API

import type { GatewayHttpClient } from "../src/gateway/client";
import type * as Types from "./gateway-types";

export class GatewayApi {
  private client: GatewayHttpClient;

  constructor(client: GatewayHttpClient) {
    this.client = client;
  }

  /**
   * Send verification code
   * Send a verification code to a Telegram user via the Gateway API
   */
  async sendVerificationMessage(body: Types.SendVerificationMessageRequest): Promise<Types.SendVerificationMessageResponse> {
    return this.client.post<Types.SendVerificationMessageResponse>("/sendVerificationMessage", body);
  }

  /**
   * Check if messages can be sent
   * Check if verification messages can be sent to a specific phone number
   */
  async checkSendAbility(body: Types.CheckSendAbilityRequest): Promise<Types.CheckSendAbilityResponse> {
    return this.client.post<Types.CheckSendAbilityResponse>("/checkSendAbility", body);
  }

  /**
   * Check verification status
   * Check the delivery and verification status of a sent verification message
   */
  async checkVerificationStatus(body: Types.CheckVerificationStatusRequest): Promise<Types.CheckVerificationStatusResponse> {
    return this.client.post<Types.CheckVerificationStatusResponse>("/checkVerificationStatus", body);
  }

  /**
   * Revoke verification message
   * Revoke a previously sent verification message
   */
  async revokeVerificationMessage(body: Types.RevokeVerificationMessageRequest): Promise<Types.RevokeVerificationMessageResponse> {
    return this.client.post<Types.RevokeVerificationMessageResponse>("/revokeVerificationMessage", body);
  }

  /**
   * Report delivery status
   * Report delivery status (for internal use)
   */
  async reportDelivery(body: Types.ReportDeliveryRequest): Promise<Types.ReportDeliveryResponse> {
    return this.client.post<Types.ReportDeliveryResponse>("/reportDelivery", body);
  }

}