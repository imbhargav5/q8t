// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class WhatsAppApi {
  constructor() {}

  /**
   * Send a message
   */
  sendMessage(phone_number_id: string, body: Types.SendMessageRequest): Effect.Effect<Types.SendMessageResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.SendMessageResponse>(`/${phone_number_id}/messages`, body);
  }

  /**
   * Mark message as read
   */
  markMessageAsRead(phone_number_id: string, body: Types.MarkAsReadRequest): Effect.Effect<Types.SuccessResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.SuccessResponse>(`/${phone_number_id}/markAsRead`, body);
  }

  /**
   * Upload media
   */
  uploadMedia(phone_number_id: string): Effect.Effect<Types.MediaUploadResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.MediaUploadResponse>(`/${phone_number_id}/media`);
  }

  /**
   * Get media URL
   */
  getMediaUrl(media_id: string): Effect.Effect<Types.MediaUrlResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.MediaUrlResponse>(`/${media_id}`);
  }

  /**
   * Delete media
   */
  deleteMedia(media_id: string): Effect.Effect<Types.SuccessResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.SuccessResponse>(`/${media_id}`);
  }

  /**
   * List message templates
   */
  listTemplates(waba_id: string, queryParams?: { name?: string; status?: string; limit?: number }): Effect.Effect<Types.TemplatesListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.TemplatesListResponse>(`/${waba_id}/message_templates`, queryParams);
  }

  /**
   * Create message template
   */
  createTemplate(waba_id: string, body: Types.CreateTemplateRequest): Effect.Effect<Types.TemplateResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.TemplateResponse>(`/${waba_id}/message_templates`, body);
  }

  /**
   * Get template
   */
  getTemplate(template_id: string): Effect.Effect<Types.Template, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.Template>(`/${template_id}/template`);
  }

  /**
   * Delete template
   */
  deleteTemplate(template_id: string, queryParams?: { name?: string }): Effect.Effect<Types.SuccessResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.SuccessResponse>(`/${template_id}/template`);
  }

  /**
   * List phone numbers
   */
  listPhoneNumbers(waba_id: string): Effect.Effect<Types.PhoneNumbersResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.PhoneNumbersResponse>(`/${waba_id}/phone_numbers`);
  }

  /**
   * Get phone number
   */
  getPhoneNumber(phone_number_id: string): Effect.Effect<Types.PhoneNumber, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.PhoneNumber>(`/${phone_number_id}/phoneNumber`);
  }

  /**
   * Register phone number
   */
  registerPhoneNumber(phone_number_id: string, body: Types.RegisterPhoneRequest): Effect.Effect<Types.SuccessResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.SuccessResponse>(`/${phone_number_id}/register`, body);
  }

  /**
   * Deregister phone number
   */
  deregisterPhoneNumber(phone_number_id: string, body: Types.DeregisterPhoneRequest): Effect.Effect<Types.SuccessResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.SuccessResponse>(`/${phone_number_id}/deregister`, body);
  }

  /**
   * Request verification code
   */
  requestVerificationCode(phone_number_id: string, body: Types.RequestCodeRequest): Effect.Effect<Types.SuccessResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.SuccessResponse>(`/${phone_number_id}/request_code`, body);
  }

  /**
   * Verify phone number
   */
  verifyPhoneNumber(phone_number_id: string, body: Types.VerifyCodeRequest): Effect.Effect<Types.SuccessResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.SuccessResponse>(`/${phone_number_id}/verify_code`, body);
  }

  /**
   * List QR codes
   */
  listQRCodes(phone_number_id: string): Effect.Effect<Types.QRCodesResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.QRCodesResponse>(`/${phone_number_id}/message_qrdls`);
  }

  /**
   * Create QR code
   */
  createQRCode(phone_number_id: string, body: Types.CreateQRCodeRequest): Effect.Effect<Types.QRCode, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.QRCode>(`/${phone_number_id}/message_qrdls`, body);
  }

  /**
   * Get QR code
   */
  getQRCode(phone_number_id: string, qr_code_id: string): Effect.Effect<Types.QRCode, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.QRCode>(`/${phone_number_id}/message_qrdls/${qr_code_id}`);
  }

  /**
   * Update QR code
   */
  updateQRCode(phone_number_id: string, qr_code_id: string, body: Types.UpdateQRCodeRequest): Effect.Effect<Types.QRCode, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.QRCode>(`/${phone_number_id}/message_qrdls/${qr_code_id}`, body);
  }

  /**
   * Delete QR code
   */
  deleteQRCode(phone_number_id: string, qr_code_id: string): Effect.Effect<Types.SuccessResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.SuccessResponse>(`/${phone_number_id}/message_qrdls/${qr_code_id}`);
  }

  /**
   * Get business profile
   */
  getBusinessProfile(phone_number_id: string): Effect.Effect<Types.BusinessProfileResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.BusinessProfileResponse>(`/${phone_number_id}/whatsapp_business_profile`);
  }

  /**
   * Update business profile
   */
  updateBusinessProfile(phone_number_id: string, body: Types.UpdateBusinessProfileRequest): Effect.Effect<Types.SuccessResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.SuccessResponse>(`/${phone_number_id}/whatsapp_business_profile`, body);
  }

  /**
   * Get WABA info
   */
  getWABA(waba_id: string): Effect.Effect<Types.WABA, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.WABA>(`/${waba_id}/waba`);
  }

  /**
   * Get subscribed apps
   */
  getSubscribedApps(waba_id: string): Effect.Effect<Types.SubscribedAppsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.SubscribedAppsResponse>(`/${waba_id}/subscribed_apps`);
  }

  /**
   * Subscribe to webhooks
   */
  subscribeToWebhooks(waba_id: string): Effect.Effect<Types.SuccessResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.SuccessResponse>(`/${waba_id}/subscribed_apps`);
  }

}