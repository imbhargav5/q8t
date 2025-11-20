/**
 * Configuration for Telegram Gateway API
 */

export interface TelegramGatewayConfig {
  /**
   * Access token obtained from @VerificationBot
   */
  accessToken: string;

  /**
   * Base URL for the Gateway API
   * @default "https://gatewayapi.telegram.org"
   */
  baseUrl?: string;
}

export const DEFAULT_GATEWAY_API_URL = "https://gatewayapi.telegram.org";

/**
 * Get the base URL for Gateway API requests
 */
export function getGatewayApiUrl(config: TelegramGatewayConfig): string {
  return config.baseUrl || DEFAULT_GATEWAY_API_URL;
}
