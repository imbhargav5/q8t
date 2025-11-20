/**
 * Configuration for Telegram Client API (MTProto)
 */

export interface TelegramClientConfig {
  /**
   * API ID obtained from https://my.telegram.org
   */
  apiId: number;

  /**
   * API Hash obtained from https://my.telegram.org
   */
  apiHash: string;

  /**
   * Session data for authenticated session
   * If provided, phone authentication can be skipped
   */
  session?: SessionData;

  /**
   * Phone number for authentication (with country code, e.g., +1234567890)
   * Required if session is not provided
   */
  phoneNumber?: string;

  /**
   * Callback when session is updated (for persistence)
   */
  onSessionUpdate?: (session: SessionData) => void;

  /**
   * Base URL for the Client API
   * @default "https://api.telegram.org"
   */
  baseUrl?: string;

  /**
   * Data Center ID (1-5)
   * Will be determined automatically during authentication
   */
  dcId?: number;
}

/**
 * Session data for persisting authentication state
 */
export interface SessionData {
  /**
   * Authorization key
   */
  authKey: string;

  /**
   * Data Center ID
   */
  dcId: number;

  /**
   * User ID
   */
  userId?: number;

  /**
   * Access hash for the user
   */
  userAccessHash?: string;

  /**
   * Session creation timestamp
   */
  createdAt: number;

  /**
   * Last activity timestamp
   */
  lastActivityAt: number;
}

export const DEFAULT_CLIENT_API_URL = "https://api.telegram.org";

/**
 * Get the base URL for Client API requests
 */
export function getClientApiUrl(config: TelegramClientConfig): string {
  return config.baseUrl || DEFAULT_CLIENT_API_URL;
}

/**
 * Get the DC-specific URL
 */
export function getDCUrl(dcId: number, baseUrl?: string): string {
  const base = baseUrl || DEFAULT_CLIENT_API_URL;
  return `${base}/dc${dcId}`;
}
