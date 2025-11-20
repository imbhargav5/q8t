/**
 * Configuration for Telegram Bot API
 */

export interface TelegramBotConfig {
  /**
   * Bot token obtained from @BotFather
   * Format: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
   */
  botToken: string;

  /**
   * Base URL for the Bot API
   * @default "https://api.telegram.org"
   */
  baseUrl?: string;
}

export const DEFAULT_BOT_API_URL = "https://api.telegram.org";

/**
 * Get the base URL for Bot API requests
 */
export function getBotApiUrl(config: TelegramBotConfig): string {
  return config.baseUrl || DEFAULT_BOT_API_URL;
}

/**
 * Get the full Bot API endpoint URL with token
 */
export function getBotApiEndpoint(config: TelegramBotConfig): string {
  const baseUrl = getBotApiUrl(config);
  return `${baseUrl}/bot${config.botToken}`;
}
