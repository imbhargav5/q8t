// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Telegram Bot API

import type { BotHttpClient } from "../src/bot/client";
import type * as Types from "./bot-types";

export class BotApi {
  private client: BotHttpClient;

  constructor(client: BotHttpClient) {
    this.client = client;
  }

  /**
   * Get updates via long polling
   * Use this method to receive incoming updates using long polling
   */
  async getUpdates(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/getUpdates`, body);
  }

  /**
   * Set webhook URL
   * Use this method to specify a URL and receive incoming updates via an outgoing webhook
   */
  async setWebhook(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/setWebhook`, body);
  }

  /**
   * Remove webhook integration
   * Use this method to remove webhook integration if you decide to switch back to getUpdates
   */
  async deleteWebhook(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/deleteWebhook`, body);
  }

  /**
   * Get current webhook status
   * Use this method to get current webhook status
   */
  async getWebhookInfo(token: string): Promise<void> {
    return this.client.get<void>(`/bot${token}/getWebhookInfo`);
  }

  /**
   * Send text message
   * Use this method to send text messages
   */
  async sendMessage(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/sendMessage`, body);
  }

  /**
   * Send photo
   * Use this method to send photos
   */
  async sendPhoto(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/sendPhoto`, body);
  }

  /**
   * Send video
   * Use this method to send video files
   */
  async sendVideo(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/sendVideo`, body);
  }

  /**
   * Send document
   * Use this method to send general files
   */
  async sendDocument(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/sendDocument`, body);
  }

  /**
   * Send audio
   * Use this method to send audio files
   */
  async sendAudio(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/sendAudio`, body);
  }

  /**
   * Send voice message
   * Use this method to send audio files as voice messages
   */
  async sendVoice(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/sendVoice`, body);
  }

  /**
   * Send location
   * Use this method to send point on the map
   */
  async sendLocation(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/sendLocation`, body);
  }

  /**
   * Send poll
   * Use this method to send a native poll
   */
  async sendPoll(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/sendPoll`, body);
  }

  /**
   * Send sticker
   * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers
   */
  async sendSticker(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/sendSticker`, body);
  }

  /**
   * Forward message
   * Use this method to forward messages of any kind
   */
  async forwardMessage(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/forwardMessage`, body);
  }

  /**
   * Copy message
   * Use this method to copy messages of any kind
   */
  async copyMessage(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/copyMessage`, body);
  }

  /**
   * Edit text message
   * Use this method to edit text and game messages
   */
  async editMessageText(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/editMessageText`, body);
  }

  /**
   * Edit message caption
   * Use this method to edit captions of messages
   */
  async editMessageCaption(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/editMessageCaption`, body);
  }

  /**
   * Edit message reply markup
   * Use this method to edit only the reply markup of messages
   */
  async editMessageReplyMarkup(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/editMessageReplyMarkup`, body);
  }

  /**
   * Delete message
   * Use this method to delete a message, including service messages
   */
  async deleteMessage(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/deleteMessage`, body);
  }

  /**
   * Get chat information
   * Use this method to get up to date information about the chat
   */
  async getChat(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/getChat`, body);
  }

  /**
   * Get chat administrators
   * Use this method to get a list of administrators in a chat
   */
  async getChatAdministrators(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/getChatAdministrators`, body);
  }

  /**
   * Get chat member count
   * Use this method to get the number of members in a chat
   */
  async getChatMemberCount(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/getChatMemberCount`, body);
  }

  /**
   * Get chat member information
   * Use this method to get information about a member of a chat
   */
  async getChatMember(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/getChatMember`, body);
  }

  /**
   * Ban chat member
   * Use this method to ban a user in a group, a supergroup or a channel
   */
  async banChatMember(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/banChatMember`, body);
  }

  /**
   * Unban chat member
   * Use this method to unban a previously banned user in a supergroup or channel
   */
  async unbanChatMember(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/unbanChatMember`, body);
  }

  /**
   * Restrict chat member
   * Use this method to restrict a user in a supergroup
   */
  async restrictChatMember(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/restrictChatMember`, body);
  }

  /**
   * Promote chat member
   * Use this method to promote or demote a user in a supergroup or a channel
   */
  async promoteChatMember(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/promoteChatMember`, body);
  }

  /**
   * Set chat administrator custom title
   * Use this method to set a custom title for an administrator in a supergroup promoted by the bot
   */
  async setChatAdministratorCustomTitle(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/setChatAdministratorCustomTitle`, body);
  }

  /**
   * Set chat permissions
   * Use this method to set default chat permissions for all members
   */
  async setChatPermissions(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/setChatPermissions`, body);
  }

  /**
   * Set chat photo
   * Use this method to set a new profile photo for the chat
   */
  async setChatPhoto(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/setChatPhoto`, body);
  }

  /**
   * Delete chat photo
   * Use this method to delete a chat photo
   */
  async deleteChatPhoto(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/deleteChatPhoto`, body);
  }

  /**
   * Set chat title
   * Use this method to change the title of a chat
   */
  async setChatTitle(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/setChatTitle`, body);
  }

  /**
   * Set chat description
   * Use this method to change the description of a group, a supergroup or a channel
   */
  async setChatDescription(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/setChatDescription`, body);
  }

  /**
   * Pin chat message
   * Use this method to add a message to the list of pinned messages in a chat
   */
  async pinChatMessage(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/pinChatMessage`, body);
  }

  /**
   * Unpin chat message
   * Use this method to remove a message from the list of pinned messages in a chat
   */
  async unpinChatMessage(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/unpinChatMessage`, body);
  }

  /**
   * Unpin all chat messages
   * Use this method to clear the list of pinned messages in a chat
   */
  async unpinAllChatMessages(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/unpinAllChatMessages`, body);
  }

  /**
   * Leave chat
   * Use this method for your bot to leave a group, supergroup or channel
   */
  async leaveChat(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/leaveChat`, body);
  }

  /**
   * Get file information
   * Use this method to get basic info about a file and prepare it for downloading
   */
  async getFile(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/getFile`, body);
  }

  /**
   * Get bot information
   * A simple method for testing your bot's authentication token
   */
  async getMe(token: string): Promise<void> {
    return this.client.get<void>(`/bot${token}/getMe`);
  }

  /**
   * Set bot commands
   * Use this method to change the list of the bot's commands
   */
  async setMyCommands(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/setMyCommands`, body);
  }

  /**
   * Get bot commands
   * Use this method to get the current list of the bot's commands
   */
  async getMyCommands(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/getMyCommands`, body);
  }

  /**
   * Delete bot commands
   * Use this method to delete the list of the bot's commands
   */
  async deleteMyCommands(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/deleteMyCommands`, body);
  }

  /**
   * Get sticker set
   * Use this method to get a sticker set
   */
  async getStickerSet(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/getStickerSet`, body);
  }

  /**
   * Get custom emoji stickers
   * Use this method to get information about custom emoji stickers by their identifiers
   */
  async getCustomEmojiStickers(token: string, body: Types.unknown): Promise<void> {
    return this.client.post<void>(`/bot${token}/getCustomEmojiStickers`, body);
  }

  /**
   * Answer inline query
   * Use this method to send answers to an inline query
   */
  async answerInlineQuery(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/answerInlineQuery`, body);
  }

  /**
   * Answer callback query
   * Use this method to send answers to callback queries sent from inline keyboards
   */
  async answerCallbackQuery(token: string, body: Types.unknown): Promise<Types.Response> {
    return this.client.post<Types.Response>(`/bot${token}/answerCallbackQuery`, body);
  }

}