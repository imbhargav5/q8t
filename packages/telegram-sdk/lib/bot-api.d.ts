import type { BotHttpClient } from "../src/bot/client";
import type * as Types from "./types";
export declare class BotApi {
    private client;
    constructor(client: BotHttpClient);
    /**
     * Get updates via long polling
     * Use this method to receive incoming updates using long polling
     */
    getUpdates(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Set webhook URL
     * Use this method to specify a URL and receive incoming updates via an outgoing webhook
     */
    setWebhook(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Remove webhook integration
     * Use this method to remove webhook integration if you decide to switch back to getUpdates
     */
    deleteWebhook(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Get current webhook status
     * Use this method to get current webhook status
     */
    getWebhookInfo(token: string): Promise<unknown>;
    /**
     * Send text message
     * Use this method to send text messages
     */
    sendMessage(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Send photo
     * Use this method to send photos
     */
    sendPhoto(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Send video
     * Use this method to send video files
     */
    sendVideo(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Send document
     * Use this method to send general files
     */
    sendDocument(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Send audio
     * Use this method to send audio files
     */
    sendAudio(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Send voice message
     * Use this method to send audio files as voice messages
     */
    sendVoice(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Send location
     * Use this method to send point on the map
     */
    sendLocation(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Send poll
     * Use this method to send a native poll
     */
    sendPoll(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Send sticker
     * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers
     */
    sendSticker(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Forward message
     * Use this method to forward messages of any kind
     */
    forwardMessage(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Copy message
     * Use this method to copy messages of any kind
     */
    copyMessage(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Edit text message
     * Use this method to edit text and game messages
     */
    editMessageText(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Edit message caption
     * Use this method to edit captions of messages
     */
    editMessageCaption(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Edit message reply markup
     * Use this method to edit only the reply markup of messages
     */
    editMessageReplyMarkup(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Delete message
     * Use this method to delete a message, including service messages
     */
    deleteMessage(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Get chat information
     * Use this method to get up to date information about the chat
     */
    getChat(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Get chat administrators
     * Use this method to get a list of administrators in a chat
     */
    getChatAdministrators(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Get chat member count
     * Use this method to get the number of members in a chat
     */
    getChatMemberCount(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Get chat member information
     * Use this method to get information about a member of a chat
     */
    getChatMember(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Ban chat member
     * Use this method to ban a user in a group, a supergroup or a channel
     */
    banChatMember(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Unban chat member
     * Use this method to unban a previously banned user in a supergroup or channel
     */
    unbanChatMember(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Restrict chat member
     * Use this method to restrict a user in a supergroup
     */
    restrictChatMember(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Promote chat member
     * Use this method to promote or demote a user in a supergroup or a channel
     */
    promoteChatMember(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Set chat administrator custom title
     * Use this method to set a custom title for an administrator in a supergroup promoted by the bot
     */
    setChatAdministratorCustomTitle(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Set chat permissions
     * Use this method to set default chat permissions for all members
     */
    setChatPermissions(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Set chat photo
     * Use this method to set a new profile photo for the chat
     */
    setChatPhoto(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Delete chat photo
     * Use this method to delete a chat photo
     */
    deleteChatPhoto(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Set chat title
     * Use this method to change the title of a chat
     */
    setChatTitle(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Set chat description
     * Use this method to change the description of a group, a supergroup or a channel
     */
    setChatDescription(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Pin chat message
     * Use this method to add a message to the list of pinned messages in a chat
     */
    pinChatMessage(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Unpin chat message
     * Use this method to remove a message from the list of pinned messages in a chat
     */
    unpinChatMessage(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Unpin all chat messages
     * Use this method to clear the list of pinned messages in a chat
     */
    unpinAllChatMessages(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Leave chat
     * Use this method for your bot to leave a group, supergroup or channel
     */
    leaveChat(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Get file information
     * Use this method to get basic info about a file and prepare it for downloading
     */
    getFile(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Get bot information
     * A simple method for testing your bot's authentication token
     */
    getMe(token: string): Promise<unknown>;
    /**
     * Set bot commands
     * Use this method to change the list of the bot's commands
     */
    setMyCommands(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Get bot commands
     * Use this method to get the current list of the bot's commands
     */
    getMyCommands(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Delete bot commands
     * Use this method to delete the list of the bot's commands
     */
    deleteMyCommands(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Get sticker set
     * Use this method to get a sticker set
     */
    getStickerSet(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Get custom emoji stickers
     * Use this method to get information about custom emoji stickers by their identifiers
     */
    getCustomEmojiStickers(token: string, body: Types.unknown): Promise<unknown>;
    /**
     * Answer inline query
     * Use this method to send answers to an inline query
     */
    answerInlineQuery(token: string, body: Types.unknown): Promise<Response>;
    /**
     * Answer callback query
     * Use this method to send answers to callback queries sent from inline keyboards
     */
    answerCallbackQuery(token: string, body: Types.unknown): Promise<Response>;
}
//# sourceMappingURL=bot-api.d.ts.map