"use strict";
// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Telegram Bot API
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotApi = void 0;
class BotApi {
    constructor(client) {
        this.client = client;
    }
    /**
     * Get updates via long polling
     * Use this method to receive incoming updates using long polling
     */
    async getUpdates(token, body) {
        return this.client.post(`/bot${token}/getUpdates`, body);
    }
    /**
     * Set webhook URL
     * Use this method to specify a URL and receive incoming updates via an outgoing webhook
     */
    async setWebhook(token, body) {
        return this.client.post(`/bot${token}/setWebhook`, body);
    }
    /**
     * Remove webhook integration
     * Use this method to remove webhook integration if you decide to switch back to getUpdates
     */
    async deleteWebhook(token, body) {
        return this.client.post(`/bot${token}/deleteWebhook`, body);
    }
    /**
     * Get current webhook status
     * Use this method to get current webhook status
     */
    async getWebhookInfo(token) {
        return this.client.get(`/bot${token}/getWebhookInfo`);
    }
    /**
     * Send text message
     * Use this method to send text messages
     */
    async sendMessage(token, body) {
        return this.client.post(`/bot${token}/sendMessage`, body);
    }
    /**
     * Send photo
     * Use this method to send photos
     */
    async sendPhoto(token, body) {
        return this.client.post(`/bot${token}/sendPhoto`, body);
    }
    /**
     * Send video
     * Use this method to send video files
     */
    async sendVideo(token, body) {
        return this.client.post(`/bot${token}/sendVideo`, body);
    }
    /**
     * Send document
     * Use this method to send general files
     */
    async sendDocument(token, body) {
        return this.client.post(`/bot${token}/sendDocument`, body);
    }
    /**
     * Send audio
     * Use this method to send audio files
     */
    async sendAudio(token, body) {
        return this.client.post(`/bot${token}/sendAudio`, body);
    }
    /**
     * Send voice message
     * Use this method to send audio files as voice messages
     */
    async sendVoice(token, body) {
        return this.client.post(`/bot${token}/sendVoice`, body);
    }
    /**
     * Send location
     * Use this method to send point on the map
     */
    async sendLocation(token, body) {
        return this.client.post(`/bot${token}/sendLocation`, body);
    }
    /**
     * Send poll
     * Use this method to send a native poll
     */
    async sendPoll(token, body) {
        return this.client.post(`/bot${token}/sendPoll`, body);
    }
    /**
     * Send sticker
     * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers
     */
    async sendSticker(token, body) {
        return this.client.post(`/bot${token}/sendSticker`, body);
    }
    /**
     * Forward message
     * Use this method to forward messages of any kind
     */
    async forwardMessage(token, body) {
        return this.client.post(`/bot${token}/forwardMessage`, body);
    }
    /**
     * Copy message
     * Use this method to copy messages of any kind
     */
    async copyMessage(token, body) {
        return this.client.post(`/bot${token}/copyMessage`, body);
    }
    /**
     * Edit text message
     * Use this method to edit text and game messages
     */
    async editMessageText(token, body) {
        return this.client.post(`/bot${token}/editMessageText`, body);
    }
    /**
     * Edit message caption
     * Use this method to edit captions of messages
     */
    async editMessageCaption(token, body) {
        return this.client.post(`/bot${token}/editMessageCaption`, body);
    }
    /**
     * Edit message reply markup
     * Use this method to edit only the reply markup of messages
     */
    async editMessageReplyMarkup(token, body) {
        return this.client.post(`/bot${token}/editMessageReplyMarkup`, body);
    }
    /**
     * Delete message
     * Use this method to delete a message, including service messages
     */
    async deleteMessage(token, body) {
        return this.client.post(`/bot${token}/deleteMessage`, body);
    }
    /**
     * Get chat information
     * Use this method to get up to date information about the chat
     */
    async getChat(token, body) {
        return this.client.post(`/bot${token}/getChat`, body);
    }
    /**
     * Get chat administrators
     * Use this method to get a list of administrators in a chat
     */
    async getChatAdministrators(token, body) {
        return this.client.post(`/bot${token}/getChatAdministrators`, body);
    }
    /**
     * Get chat member count
     * Use this method to get the number of members in a chat
     */
    async getChatMemberCount(token, body) {
        return this.client.post(`/bot${token}/getChatMemberCount`, body);
    }
    /**
     * Get chat member information
     * Use this method to get information about a member of a chat
     */
    async getChatMember(token, body) {
        return this.client.post(`/bot${token}/getChatMember`, body);
    }
    /**
     * Ban chat member
     * Use this method to ban a user in a group, a supergroup or a channel
     */
    async banChatMember(token, body) {
        return this.client.post(`/bot${token}/banChatMember`, body);
    }
    /**
     * Unban chat member
     * Use this method to unban a previously banned user in a supergroup or channel
     */
    async unbanChatMember(token, body) {
        return this.client.post(`/bot${token}/unbanChatMember`, body);
    }
    /**
     * Restrict chat member
     * Use this method to restrict a user in a supergroup
     */
    async restrictChatMember(token, body) {
        return this.client.post(`/bot${token}/restrictChatMember`, body);
    }
    /**
     * Promote chat member
     * Use this method to promote or demote a user in a supergroup or a channel
     */
    async promoteChatMember(token, body) {
        return this.client.post(`/bot${token}/promoteChatMember`, body);
    }
    /**
     * Set chat administrator custom title
     * Use this method to set a custom title for an administrator in a supergroup promoted by the bot
     */
    async setChatAdministratorCustomTitle(token, body) {
        return this.client.post(`/bot${token}/setChatAdministratorCustomTitle`, body);
    }
    /**
     * Set chat permissions
     * Use this method to set default chat permissions for all members
     */
    async setChatPermissions(token, body) {
        return this.client.post(`/bot${token}/setChatPermissions`, body);
    }
    /**
     * Set chat photo
     * Use this method to set a new profile photo for the chat
     */
    async setChatPhoto(token, body) {
        return this.client.post(`/bot${token}/setChatPhoto`, body);
    }
    /**
     * Delete chat photo
     * Use this method to delete a chat photo
     */
    async deleteChatPhoto(token, body) {
        return this.client.post(`/bot${token}/deleteChatPhoto`, body);
    }
    /**
     * Set chat title
     * Use this method to change the title of a chat
     */
    async setChatTitle(token, body) {
        return this.client.post(`/bot${token}/setChatTitle`, body);
    }
    /**
     * Set chat description
     * Use this method to change the description of a group, a supergroup or a channel
     */
    async setChatDescription(token, body) {
        return this.client.post(`/bot${token}/setChatDescription`, body);
    }
    /**
     * Pin chat message
     * Use this method to add a message to the list of pinned messages in a chat
     */
    async pinChatMessage(token, body) {
        return this.client.post(`/bot${token}/pinChatMessage`, body);
    }
    /**
     * Unpin chat message
     * Use this method to remove a message from the list of pinned messages in a chat
     */
    async unpinChatMessage(token, body) {
        return this.client.post(`/bot${token}/unpinChatMessage`, body);
    }
    /**
     * Unpin all chat messages
     * Use this method to clear the list of pinned messages in a chat
     */
    async unpinAllChatMessages(token, body) {
        return this.client.post(`/bot${token}/unpinAllChatMessages`, body);
    }
    /**
     * Leave chat
     * Use this method for your bot to leave a group, supergroup or channel
     */
    async leaveChat(token, body) {
        return this.client.post(`/bot${token}/leaveChat`, body);
    }
    /**
     * Get file information
     * Use this method to get basic info about a file and prepare it for downloading
     */
    async getFile(token, body) {
        return this.client.post(`/bot${token}/getFile`, body);
    }
    /**
     * Get bot information
     * A simple method for testing your bot's authentication token
     */
    async getMe(token) {
        return this.client.get(`/bot${token}/getMe`);
    }
    /**
     * Set bot commands
     * Use this method to change the list of the bot's commands
     */
    async setMyCommands(token, body) {
        return this.client.post(`/bot${token}/setMyCommands`, body);
    }
    /**
     * Get bot commands
     * Use this method to get the current list of the bot's commands
     */
    async getMyCommands(token, body) {
        return this.client.post(`/bot${token}/getMyCommands`, body);
    }
    /**
     * Delete bot commands
     * Use this method to delete the list of the bot's commands
     */
    async deleteMyCommands(token, body) {
        return this.client.post(`/bot${token}/deleteMyCommands`, body);
    }
    /**
     * Get sticker set
     * Use this method to get a sticker set
     */
    async getStickerSet(token, body) {
        return this.client.post(`/bot${token}/getStickerSet`, body);
    }
    /**
     * Get custom emoji stickers
     * Use this method to get information about custom emoji stickers by their identifiers
     */
    async getCustomEmojiStickers(token, body) {
        return this.client.post(`/bot${token}/getCustomEmojiStickers`, body);
    }
    /**
     * Answer inline query
     * Use this method to send answers to an inline query
     */
    async answerInlineQuery(token, body) {
        return this.client.post(`/bot${token}/answerInlineQuery`, body);
    }
    /**
     * Answer callback query
     * Use this method to send answers to callback queries sent from inline keyboards
     */
    async answerCallbackQuery(token, body) {
        return this.client.post(`/bot${token}/answerCallbackQuery`, body);
    }
}
exports.BotApi = BotApi;
//# sourceMappingURL=bot-api.js.map