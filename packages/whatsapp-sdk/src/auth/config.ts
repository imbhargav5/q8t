export interface WhatsAppConfig {
  accessToken: string;
  phoneNumberId: string;
  wabaId?: string;
  baseUrl?: string;
  apiVersion?: string;
}

export const DEFAULT_BASE_URL = "https://graph.facebook.com";
export const DEFAULT_API_VERSION = "v23.0";

export const WHATSAPP_API_ENDPOINTS = {
  messages: "/{phone_number_id}/messages",
  media: "/{phone_number_id}/media",
  templates: "/{waba_id}/message_templates",
  phoneNumbers: "/{waba_id}/phone_numbers",
  qrCodes: "/{phone_number_id}/message_qrdls",
  businessProfile: "/{phone_number_id}/whatsapp_business_profile",
  waba: "/{waba_id}/waba",
} as const;

export function getBaseUrl(config: WhatsAppConfig): string {
  const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
  const version = config.apiVersion || DEFAULT_API_VERSION;
  return `${baseUrl}/${version}`;
}
