// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Telegram Client API (MTProto)

import type { ClientHttpClient } from "../src/client/client";
import type * as Types from "./client-types";

export class ClientApi {
  private client: ClientHttpClient;

  constructor(client: ClientHttpClient) {
    this.client = client;
  }

  /**
   * Send verification code
   * Send a code to verify a phone number
   */
  async authSendCode(body: Types.unknown): Promise<Types.SentCode> {
    return this.client.post<Types.SentCode>("/auth.sendCode", body);
  }

  /**
   * Sign in with code
   * Sign in to the account using the verification code
   */
  async authSignIn(body: Types.unknown): Promise<Types.Authorization> {
    return this.client.post<Types.Authorization>("/auth.signIn", body);
  }

  /**
   * Sign up new account
   * Register a new account if it doesn't exist
   */
  async authSignUp(body: Types.unknown): Promise<Types.Authorization> {
    return this.client.post<Types.Authorization>("/auth.signUp", body);
  }

  /**
   * Check 2FA password
   * Check the 2FA password (SRP protocol)
   */
  async authCheckPassword(body: Types.unknown): Promise<Types.Authorization> {
    return this.client.post<Types.Authorization>("/auth.checkPassword", body);
  }

  /**
   * Log out
   * Log out from the current session
   */
  async authLogOut(): Promise<void> {
    return this.client.post<void>("/auth.logOut");
  }

  /**
   * Reset all authorizations
   * Terminate all other sessions
   */
  async authResetAuthorizations(): Promise<void> {
    return this.client.post<void>("/auth.resetAuthorizations");
  }

  /**
   * Get 2FA password settings
   * Get information about current 2FA password
   */
  async accountGetPassword(): Promise<Types.Password> {
    return this.client.post<Types.Password>("/account.getPassword");
  }

  /**
   * Update profile
   * Update user profile information
   */
  async accountUpdateProfile(body: Types.unknown): Promise<Types.User> {
    return this.client.post<Types.User>("/account.updateProfile", body);
  }

  /**
   * Update online status
   * Update online/offline status
   */
  async accountUpdateStatus(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/account.updateStatus", body);
  }

  /**
   * Get privacy settings
   * Get privacy rules for specified setting
   */
  async accountGetPrivacy(body: Types.unknown): Promise<Types.PrivacyRules> {
    return this.client.post<Types.PrivacyRules>("/account.getPrivacy", body);
  }

  /**
   * Set privacy settings
   * Set privacy rules for specified setting
   */
  async accountSetPrivacy(body: Types.unknown): Promise<Types.PrivacyRules> {
    return this.client.post<Types.PrivacyRules>("/account.setPrivacy", body);
  }

  /**
   * Get users
   * Get information about multiple users
   */
  async usersGetUsers(body: Types.unknown): Promise<Types.User[]> {
    return this.client.post<Types.User[]>("/users.getUsers", body);
  }

  /**
   * Get full user info
   * Get detailed information about a user
   */
  async usersGetFullUser(body: Types.unknown): Promise<Types.UserFull> {
    return this.client.post<Types.UserFull>("/users.getFullUser", body);
  }

  /**
   * Get contacts
   * Get the current user's contact list
   */
  async contactsGetContacts(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/contacts.getContacts", body);
  }

  /**
   * Import contacts
   * Import contacts to the user's contact list
   */
  async contactsImportContacts(body: Types.unknown): Promise<Types.ImportedContacts> {
    return this.client.post<Types.ImportedContacts>("/contacts.importContacts", body);
  }

  /**
   * Delete contacts
   * Delete contacts from the user's contact list
   */
  async contactsDeleteContacts(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/contacts.deleteContacts", body);
  }

  /**
   * Block user
   * Block a user from contacting you
   */
  async contactsBlock(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/contacts.block", body);
  }

  /**
   * Unblock user
   * Unblock a previously blocked user
   */
  async contactsUnblock(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/contacts.unblock", body);
  }

  /**
   * Send message
   * Send a text message to a peer
   */
  async messagesSendMessage(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/messages.sendMessage", body);
  }

  /**
   * Send media
   * Send media to a peer
   */
  async messagesSendMedia(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/messages.sendMedia", body);
  }

  /**
   * Get message history
   * Get messages from a chat
   */
  async messagesGetHistory(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/messages.getHistory", body);
  }

  /**
   * Get dialogs (chat list)
   * Get the user's dialogs (chat list)
   */
  async messagesGetDialogs(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/messages.getDialogs", body);
  }

  /**
   * Mark messages as read
   * Mark messages in a chat as read
   */
  async messagesReadHistory(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/messages.readHistory", body);
  }

  /**
   * Delete messages
   * Delete messages from a chat
   */
  async messagesDeleteMessages(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/messages.deleteMessages", body);
  }

  /**
   * Edit message
   * Edit a sent message
   */
  async messagesEditMessage(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/messages.editMessage", body);
  }

  /**
   * Forward messages
   * Forward messages to another chat
   */
  async messagesForwardMessages(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/messages.forwardMessages", body);
  }

  /**
   * Send reaction
   * React to a message
   */
  async messagesSendReaction(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/messages.sendReaction", body);
  }

  /**
   * Get channels
   * Get information about channels/supergroups
   */
  async channelsGetChannels(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/channels.getChannels", body);
  }

  /**
   * Get full channel info
   * Get detailed information about a channel
   */
  async channelsGetFullChannel(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/channels.getFullChannel", body);
  }

  /**
   * Create channel
   * Create a new channel or supergroup
   */
  async channelsCreateChannel(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/channels.createChannel", body);
  }

  /**
   * Join channel
   * Join a channel or supergroup
   */
  async channelsJoinChannel(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/channels.joinChannel", body);
  }

  /**
   * Leave channel
   * Leave a channel or supergroup
   */
  async channelsLeaveChannel(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/channels.leaveChannel", body);
  }

  /**
   * Get updates state
   * Get current state for receiving updates
   */
  async updatesGetState(): Promise<Types.UpdatesState> {
    return this.client.post<Types.UpdatesState>("/updates.getState");
  }

  /**
   * Get updates difference
   * Get updates since the last state
   */
  async updatesGetDifference(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/updates.getDifference", body);
  }

  /**
   * Update business work hours
   * Update business opening hours for Telegram Business
   */
  async accountUpdateBusinessWorkHours(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/account.updateBusinessWorkHours", body);
  }

  /**
   * Update business location
   * Update business location for Telegram Business
   */
  async accountUpdateBusinessLocation(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/account.updateBusinessLocation", body);
  }

  /**
   * Update business intro
   * Update business introduction for Telegram Business
   */
  async accountUpdateBusinessIntro(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/account.updateBusinessIntro", body);
  }

  /**
   * Get business chat links
   * Get list of business chat links
   */
  async accountGetBusinessChatLinks(): Promise<void> {
    return this.client.post<void>("/account.getBusinessChatLinks");
  }

  /**
   * Get quick replies
   * Get list of quick replies for Telegram Business
   */
  async messagesGetQuickReplies(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/messages.getQuickReplies", body);
  }

  /**
   * Send quick reply
   * Send a quick reply message
   */
  async messagesSendQuickReplyMessages(body: Types.unknown): Promise<void> {
    return this.client.post<void>("/messages.sendQuickReplyMessages", body);
  }

}