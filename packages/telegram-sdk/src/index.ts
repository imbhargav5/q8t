/**
 * Telegram SDK
 *
 * A comprehensive SDK for Telegram with support for:
 * - Bot API: HTTP-based bot interface (~100 methods)
 * - Gateway API: Verification code delivery
 * - Client API: MTProto user client (742+ methods)
 *
 * @example
 * ```typescript
 * import { TelegramSDK } from "@q8t/telegram-sdk";
 *
 * // Create a bot client
 * const bot = TelegramSDK.createBotClient({
 *   botToken: "123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
 * });
 *
 * await bot.sendMessage({
 *   chat_id: 123456,
 *   text: "Hello from Telegram Bot!"
 * });
 *
 * // Create a gateway client
 * const gateway = TelegramSDK.createGatewayClient({
 *   accessToken: "your-gateway-token"
 * });
 *
 * await gateway.sendVerificationMessage({
 *   phone_number: "+1234567890",
 *   code_length: 6
 * });
 *
 * // Create a client API instance
 * const client = await TelegramSDK.createClientClient({
 *   apiId: 12345,
 *   apiHash: "your-api-hash",
 *   session: sessionData
 * });
 *
 * await client.sendMessage({
 *   peer: { user_id: 123456, access_hash: "..." },
 *   message: "Hello!",
 *   random_id: Date.now()
 * });
 * ```
 */

// Export all generated APIs and types
export * from "../lib";

// Export Bot API
export {
  createBotClient,
  type TelegramBotConfig,
  type BotHttpClient
} from "./bot";

// Export Gateway API
export {
  createGatewayClient,
  type TelegramGatewayConfig,
  type GatewayHttpClient
} from "./gateway";

// Export Client API
export {
  createClientClient,
  type TelegramClientConfig,
  type ClientHttpClient,
  type SessionData,
  sendVerificationCode,
  signIn,
  signUp,
  checkPassword,
  isSessionValid,
  createSession,
  type AuthFlowState,
  type SendCodeResult,
  type AuthResult
} from "./client";

// Import APIs and types
import { BotApi } from "../lib/bot-api";
import { GatewayApi } from "../lib/gateway-api";
import { ClientApi } from "../lib/client-api";
import { createBotClient, type TelegramBotConfig } from "./bot";
import { createGatewayClient, type TelegramGatewayConfig } from "./gateway";
import { createClientClient, type TelegramClientConfig } from "./client";

/**
 * Main Telegram SDK namespace with factory methods
 */
export class TelegramSDK {
  /**
   * Create a Bot API client
   *
   * The Bot API is a simple HTTP-based interface for creating Telegram bots.
   * Get your bot token from @BotFather on Telegram.
   *
   * @param config Bot configuration with bot token
   * @returns Bot API instance
   *
   * @example
   * ```typescript
   * const bot = TelegramSDK.createBotClient({
   *   botToken: "123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
   * });
   *
   * const me = await bot.getMe();
   * console.log(`Bot username: @${me.username}`);
   *
   * await bot.sendMessage({
   *   chat_id: 123456,
   *   text: "Hello, World!"
   * });
   * ```
   */
  static createBotClient(config: TelegramBotConfig): BotApi {
    const client = createBotClient(config);
    return new BotApi(client);
  }

  /**
   * Create a Gateway API client
   *
   * The Gateway API allows you to send verification codes via Telegram
   * instead of SMS, reducing costs and improving delivery speed.
   * Get your access token from @VerificationBot on Telegram.
   *
   * @param config Gateway configuration with access token
   * @returns Gateway API instance
   *
   * @example
   * ```typescript
   * const gateway = TelegramSDK.createGatewayClient({
   *   accessToken: "your-gateway-token"
   * });
   *
   * const result = await gateway.sendVerificationMessage({
   *   phone_number: "+1234567890",
   *   code_length: 6,
   *   ttl: 300
   * });
   *
   * console.log(`Code sent! Request ID: ${result.request_id}`);
   * ```
   */
  static createGatewayClient(config: TelegramGatewayConfig): GatewayApi {
    const client = createGatewayClient(config);
    return new GatewayApi(client);
  }

  /**
   * Create a Client API client
   *
   * The Client API uses the MTProto protocol and provides access to all
   * Telegram features (742+ methods). Requires phone number authentication.
   * Get your API ID and hash from https://my.telegram.org
   *
   * NOTE: This is a placeholder that requires MTProto protocol implementation.
   * Consider using libraries like telegram-mtproto or gramjs for full support.
   *
   * @param config Client configuration with API credentials
   * @returns Promise resolving to Client API instance
   *
   * @example
   * ```typescript
   * const client = await TelegramSDK.createClientClient({
   *   apiId: 12345,
   *   apiHash: "your-api-hash",
   *   session: existingSessionData
   * });
   *
   * const dialogs = await client.getDialogs({
   *   offset_date: 0,
   *   offset_id: 0,
   *   offset_peer: { user_id: 0, access_hash: "0" },
   *   limit: 100,
   *   hash: 0
   * });
   * ```
   */
  static async createClientClient(config: TelegramClientConfig): Promise<ClientApi> {
    const client = await createClientClient(config);
    return new ClientApi(client);
  }
}

// Default export
export default TelegramSDK;
