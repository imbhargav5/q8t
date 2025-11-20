import type { ClientHttpClient } from "../src/client/client";
import type * as Types from "./types";
export declare class ClientApi {
    private client;
    constructor(client: ClientHttpClient);
    /**
     * Send verification code
     * Send a code to verify a phone number
     */
    authSendCode(body: Types.unknown): Promise<SentCode>;
    /**
     * Sign in with code
     * Sign in to the account using the verification code
     */
    authSignIn(body: Types.unknown): Promise<Authorization>;
    /**
     * Sign up new account
     * Register a new account if it doesn't exist
     */
    authSignUp(body: Types.unknown): Promise<Authorization>;
    /**
     * Check 2FA password
     * Check the 2FA password (SRP protocol)
     */
    authCheckPassword(body: Types.unknown): Promise<Authorization>;
    /**
     * Log out
     * Log out from the current session
     */
    authLogOut(): Promise<unknown>;
    /**
     * Reset all authorizations
     * Terminate all other sessions
     */
    authResetAuthorizations(): Promise<unknown>;
    /**
     * Get 2FA password settings
     * Get information about current 2FA password
     */
    accountGetPassword(): Promise<Password>;
    /**
     * Update profile
     * Update user profile information
     */
    accountUpdateProfile(body: Types.unknown): Promise<User>;
    /**
     * Update online status
     * Update online/offline status
     */
    accountUpdateStatus(body: Types.unknown): Promise<unknown>;
    /**
     * Get privacy settings
     * Get privacy rules for specified setting
     */
    accountGetPrivacy(body: Types.unknown): Promise<PrivacyRules>;
    /**
     * Set privacy settings
     * Set privacy rules for specified setting
     */
    accountSetPrivacy(body: Types.unknown): Promise<PrivacyRules>;
    /**
     * Get users
     * Get information about multiple users
     */
    usersGetUsers(body: Types.unknown): Promise<User[]>;
    /**
     * Get full user info
     * Get detailed information about a user
     */
    usersGetFullUser(body: Types.unknown): Promise<UserFull>;
    /**
     * Get contacts
     * Get the current user's contact list
     */
    contactsGetContacts(body: Types.unknown): Promise<unknown>;
    /**
     * Import contacts
     * Import contacts to the user's contact list
     */
    contactsImportContacts(body: Types.unknown): Promise<ImportedContacts>;
    /**
     * Delete contacts
     * Delete contacts from the user's contact list
     */
    contactsDeleteContacts(body: Types.unknown): Promise<unknown>;
    /**
     * Block user
     * Block a user from contacting you
     */
    contactsBlock(body: Types.unknown): Promise<unknown>;
    /**
     * Unblock user
     * Unblock a previously blocked user
     */
    contactsUnblock(body: Types.unknown): Promise<unknown>;
    /**
     * Send message
     * Send a text message to a peer
     */
    messagesSendMessage(body: Types.unknown): Promise<unknown>;
    /**
     * Send media
     * Send media to a peer
     */
    messagesSendMedia(body: Types.unknown): Promise<unknown>;
    /**
     * Get message history
     * Get messages from a chat
     */
    messagesGetHistory(body: Types.unknown): Promise<unknown>;
    /**
     * Get dialogs (chat list)
     * Get the user's dialogs (chat list)
     */
    messagesGetDialogs(body: Types.unknown): Promise<unknown>;
    /**
     * Mark messages as read
     * Mark messages in a chat as read
     */
    messagesReadHistory(body: Types.unknown): Promise<unknown>;
    /**
     * Delete messages
     * Delete messages from a chat
     */
    messagesDeleteMessages(body: Types.unknown): Promise<unknown>;
    /**
     * Edit message
     * Edit a sent message
     */
    messagesEditMessage(body: Types.unknown): Promise<unknown>;
    /**
     * Forward messages
     * Forward messages to another chat
     */
    messagesForwardMessages(body: Types.unknown): Promise<unknown>;
    /**
     * Send reaction
     * React to a message
     */
    messagesSendReaction(body: Types.unknown): Promise<unknown>;
    /**
     * Get channels
     * Get information about channels/supergroups
     */
    channelsGetChannels(body: Types.unknown): Promise<unknown>;
    /**
     * Get full channel info
     * Get detailed information about a channel
     */
    channelsGetFullChannel(body: Types.unknown): Promise<unknown>;
    /**
     * Create channel
     * Create a new channel or supergroup
     */
    channelsCreateChannel(body: Types.unknown): Promise<unknown>;
    /**
     * Join channel
     * Join a channel or supergroup
     */
    channelsJoinChannel(body: Types.unknown): Promise<unknown>;
    /**
     * Leave channel
     * Leave a channel or supergroup
     */
    channelsLeaveChannel(body: Types.unknown): Promise<unknown>;
    /**
     * Get updates state
     * Get current state for receiving updates
     */
    updatesGetState(): Promise<UpdatesState>;
    /**
     * Get updates difference
     * Get updates since the last state
     */
    updatesGetDifference(body: Types.unknown): Promise<unknown>;
    /**
     * Update business work hours
     * Update business opening hours for Telegram Business
     */
    accountUpdateBusinessWorkHours(body: Types.unknown): Promise<unknown>;
    /**
     * Update business location
     * Update business location for Telegram Business
     */
    accountUpdateBusinessLocation(body: Types.unknown): Promise<unknown>;
    /**
     * Update business intro
     * Update business introduction for Telegram Business
     */
    accountUpdateBusinessIntro(body: Types.unknown): Promise<unknown>;
    /**
     * Get business chat links
     * Get list of business chat links
     */
    accountGetBusinessChatLinks(): Promise<unknown>;
    /**
     * Get quick replies
     * Get list of quick replies for Telegram Business
     */
    messagesGetQuickReplies(body: Types.unknown): Promise<unknown>;
    /**
     * Send quick reply
     * Send a quick reply message
     */
    messagesSendQuickReplyMessages(body: Types.unknown): Promise<unknown>;
}
//# sourceMappingURL=client-api.d.ts.map