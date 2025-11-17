export interface WhatsAppConfig {
  accessToken: string;
  phoneNumberId: string;
  businessId?: string;
  baseUrl?: string;
  apiVersion?: string;
}

export const DEFAULT_BASE_URL = "https://graph.facebook.com";
export const DEFAULT_API_VERSION = "v18.0";

export function getBaseUrl(config: WhatsAppConfig): string {
  const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
  const version = config.apiVersion || DEFAULT_API_VERSION;
  return `${baseUrl}/${version}`;
}
