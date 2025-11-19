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
   * Mark message as read
   */
  async markMessageAsRead(phone_number_id: string, body: Types.MarkAsReadRequest): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/${phone_number_id}/markAsRead`, body);
  }

  /**
   * Upload media
   */
  async uploadMedia(phone_number_id: string): Promise<Types.MediaUploadResponse> {
    return this.client.post<Types.MediaUploadResponse>(`/${phone_number_id}/media`);
  }

  /**
   * Get media URL
   */
  async getMediaUrl(media_id: string): Promise<Types.MediaUrlResponse> {
    return this.client.get<Types.MediaUrlResponse>(`/${media_id}`);
  }

  /**
   * Delete media
   */
  async deleteMedia(media_id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/${media_id}`);
  }

  /**
   * List message templates
   */
  async listTemplates(waba_id: string, queryParams?: { name?: string; status?: string; limit?: number }): Promise<Types.TemplatesListResponse> {
    return this.client.get<Types.TemplatesListResponse>(`/${waba_id}/message_templates`, queryParams);
  }

  /**
   * Create message template
   */
  async createTemplate(waba_id: string, body: Types.CreateTemplateRequest): Promise<Types.TemplateResponse> {
    return this.client.post<Types.TemplateResponse>(`/${waba_id}/message_templates`, body);
  }

  /**
   * Get template
   */
  async getTemplate(template_id: string): Promise<Types.Template> {
    return this.client.get<Types.Template>(`/${template_id}/template`);
  }

  /**
   * Delete template
   */
  async deleteTemplate(template_id: string, queryParams?: { name?: string }): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/${template_id}/template`);
  }

  /**
   * List phone numbers
   */
  async listPhoneNumbers(waba_id: string): Promise<Types.PhoneNumbersResponse> {
    return this.client.get<Types.PhoneNumbersResponse>(`/${waba_id}/phone_numbers`);
  }

  /**
   * Get phone number
   */
  async getPhoneNumber(phone_number_id: string): Promise<Types.PhoneNumber> {
    return this.client.get<Types.PhoneNumber>(`/${phone_number_id}/phoneNumber`);
  }

  /**
   * Register phone number
   */
  async registerPhoneNumber(phone_number_id: string, body: Types.RegisterPhoneRequest): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/${phone_number_id}/register`, body);
  }

  /**
   * Deregister phone number
   */
  async deregisterPhoneNumber(phone_number_id: string, body: Types.DeregisterPhoneRequest): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/${phone_number_id}/deregister`, body);
  }

  /**
   * Request verification code
   */
  async requestVerificationCode(phone_number_id: string, body: Types.RequestCodeRequest): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/${phone_number_id}/request_code`, body);
  }

  /**
   * Verify phone number
   */
  async verifyPhoneNumber(phone_number_id: string, body: Types.VerifyCodeRequest): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/${phone_number_id}/verify_code`, body);
  }

  /**
   * List QR codes
   */
  async listQRCodes(phone_number_id: string): Promise<Types.QRCodesResponse> {
    return this.client.get<Types.QRCodesResponse>(`/${phone_number_id}/message_qrdls`);
  }

  /**
   * Create QR code
   */
  async createQRCode(phone_number_id: string, body: Types.CreateQRCodeRequest): Promise<Types.QRCode> {
    return this.client.post<Types.QRCode>(`/${phone_number_id}/message_qrdls`, body);
  }

  /**
   * Get QR code
   */
  async getQRCode(phone_number_id: string, qr_code_id: string): Promise<Types.QRCode> {
    return this.client.get<Types.QRCode>(`/${phone_number_id}/message_qrdls/${qr_code_id}`);
  }

  /**
   * Update QR code
   */
  async updateQRCode(phone_number_id: string, qr_code_id: string, body: Types.UpdateQRCodeRequest): Promise<Types.QRCode> {
    return this.client.post<Types.QRCode>(`/${phone_number_id}/message_qrdls/${qr_code_id}`, body);
  }

  /**
   * Delete QR code
   */
  async deleteQRCode(phone_number_id: string, qr_code_id: string): Promise<Types.SuccessResponse> {
    return this.client.delete<Types.SuccessResponse>(`/${phone_number_id}/message_qrdls/${qr_code_id}`);
  }

  /**
   * Get business profile
   */
  async getBusinessProfile(phone_number_id: string): Promise<Types.BusinessProfileResponse> {
    return this.client.get<Types.BusinessProfileResponse>(`/${phone_number_id}/whatsapp_business_profile`);
  }

  /**
   * Update business profile
   */
  async updateBusinessProfile(phone_number_id: string, body: Types.UpdateBusinessProfileRequest): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/${phone_number_id}/whatsapp_business_profile`, body);
  }

  /**
   * Get WABA info
   */
  async getWABA(waba_id: string): Promise<Types.WABA> {
    return this.client.get<Types.WABA>(`/${waba_id}/waba`);
  }

  /**
   * Get subscribed apps
   */
  async getSubscribedApps(waba_id: string): Promise<Types.SubscribedAppsResponse> {
    return this.client.get<Types.SubscribedAppsResponse>(`/${waba_id}/subscribed_apps`);
  }

  /**
   * Subscribe to webhooks
   */
  async subscribeToWebhooks(waba_id: string): Promise<Types.SuccessResponse> {
    return this.client.post<Types.SuccessResponse>(`/${waba_id}/subscribed_apps`);
  }

}