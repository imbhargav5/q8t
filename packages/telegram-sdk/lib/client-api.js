"use strict";
// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Telegram Client API (MTProto)
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientApi = void 0;
class ClientApi {
    constructor(client) {
        this.client = client;
    }
    /**
     * Send verification code
     * Send a code to verify a phone number
     */
    async authSendCode(body) {
        return this.client.post("/auth.sendCode", body);
    }
    /**
     * Sign in with code
     * Sign in to the account using the verification code
     */
    async authSignIn(body) {
        return this.client.post("/auth.signIn", body);
    }
    /**
     * Sign up new account
     * Register a new account if it doesn't exist
     */
    async authSignUp(body) {
        return this.client.post("/auth.signUp", body);
    }
    /**
     * Check 2FA password
     * Check the 2FA password (SRP protocol)
     */
    async authCheckPassword(body) {
        return this.client.post("/auth.checkPassword", body);
    }
    /**
     * Log out
     * Log out from the current session
     */
    async authLogOut() {
        return this.client.post("/auth.logOut");
    }
    /**
     * Reset all authorizations
     * Terminate all other sessions
     */
    async authResetAuthorizations() {
        return this.client.post("/auth.resetAuthorizations");
    }
    /**
     * Get 2FA password settings
     * Get information about current 2FA password
     */
    async accountGetPassword() {
        return this.client.post("/account.getPassword");
    }
    /**
     * Update profile
     * Update user profile information
     */
    async accountUpdateProfile(body) {
        return this.client.post("/account.updateProfile", body);
    }
    /**
     * Update online status
     * Update online/offline status
     */
    async accountUpdateStatus(body) {
        return this.client.post("/account.updateStatus", body);
    }
    /**
     * Get privacy settings
     * Get privacy rules for specified setting
     */
    async accountGetPrivacy(body) {
        return this.client.post("/account.getPrivacy", body);
    }
    /**
     * Set privacy settings
     * Set privacy rules for specified setting
     */
    async accountSetPrivacy(body) {
        return this.client.post("/account.setPrivacy", body);
    }
    /**
     * Get users
     * Get information about multiple users
     */
    async usersGetUsers(body) {
        return this.client.post("/users.getUsers", body);
    }
    /**
     * Get full user info
     * Get detailed information about a user
     */
    async usersGetFullUser(body) {
        return this.client.post("/users.getFullUser", body);
    }
    /**
     * Get contacts
     * Get the current user's contact list
     */
    async contactsGetContacts(body) {
        return this.client.post("/contacts.getContacts", body);
    }
    /**
     * Import contacts
     * Import contacts to the user's contact list
     */
    async contactsImportContacts(body) {
        return this.client.post("/contacts.importContacts", body);
    }
    /**
     * Delete contacts
     * Delete contacts from the user's contact list
     */
    async contactsDeleteContacts(body) {
        return this.client.post("/contacts.deleteContacts", body);
    }
    /**
     * Block user
     * Block a user from contacting you
     */
    async contactsBlock(body) {
        return this.client.post("/contacts.block", body);
    }
    /**
     * Unblock user
     * Unblock a previously blocked user
     */
    async contactsUnblock(body) {
        return this.client.post("/contacts.unblock", body);
    }
    /**
     * Send message
     * Send a text message to a peer
     */
    async messagesSendMessage(body) {
        return this.client.post("/messages.sendMessage", body);
    }
    /**
     * Send media
     * Send media to a peer
     */
    async messagesSendMedia(body) {
        return this.client.post("/messages.sendMedia", body);
    }
    /**
     * Get message history
     * Get messages from a chat
     */
    async messagesGetHistory(body) {
        return this.client.post("/messages.getHistory", body);
    }
    /**
     * Get dialogs (chat list)
     * Get the user's dialogs (chat list)
     */
    async messagesGetDialogs(body) {
        return this.client.post("/messages.getDialogs", body);
    }
    /**
     * Mark messages as read
     * Mark messages in a chat as read
     */
    async messagesReadHistory(body) {
        return this.client.post("/messages.readHistory", body);
    }
    /**
     * Delete messages
     * Delete messages from a chat
     */
    async messagesDeleteMessages(body) {
        return this.client.post("/messages.deleteMessages", body);
    }
    /**
     * Edit message
     * Edit a sent message
     */
    async messagesEditMessage(body) {
        return this.client.post("/messages.editMessage", body);
    }
    /**
     * Forward messages
     * Forward messages to another chat
     */
    async messagesForwardMessages(body) {
        return this.client.post("/messages.forwardMessages", body);
    }
    /**
     * Send reaction
     * React to a message
     */
    async messagesSendReaction(body) {
        return this.client.post("/messages.sendReaction", body);
    }
    /**
     * Get channels
     * Get information about channels/supergroups
     */
    async channelsGetChannels(body) {
        return this.client.post("/channels.getChannels", body);
    }
    /**
     * Get full channel info
     * Get detailed information about a channel
     */
    async channelsGetFullChannel(body) {
        return this.client.post("/channels.getFullChannel", body);
    }
    /**
     * Create channel
     * Create a new channel or supergroup
     */
    async channelsCreateChannel(body) {
        return this.client.post("/channels.createChannel", body);
    }
    /**
     * Join channel
     * Join a channel or supergroup
     */
    async channelsJoinChannel(body) {
        return this.client.post("/channels.joinChannel", body);
    }
    /**
     * Leave channel
     * Leave a channel or supergroup
     */
    async channelsLeaveChannel(body) {
        return this.client.post("/channels.leaveChannel", body);
    }
    /**
     * Get updates state
     * Get current state for receiving updates
     */
    async updatesGetState() {
        return this.client.post("/updates.getState");
    }
    /**
     * Get updates difference
     * Get updates since the last state
     */
    async updatesGetDifference(body) {
        return this.client.post("/updates.getDifference", body);
    }
    /**
     * Update business work hours
     * Update business opening hours for Telegram Business
     */
    async accountUpdateBusinessWorkHours(body) {
        return this.client.post("/account.updateBusinessWorkHours", body);
    }
    /**
     * Update business location
     * Update business location for Telegram Business
     */
    async accountUpdateBusinessLocation(body) {
        return this.client.post("/account.updateBusinessLocation", body);
    }
    /**
     * Update business intro
     * Update business introduction for Telegram Business
     */
    async accountUpdateBusinessIntro(body) {
        return this.client.post("/account.updateBusinessIntro", body);
    }
    /**
     * Get business chat links
     * Get list of business chat links
     */
    async accountGetBusinessChatLinks() {
        return this.client.post("/account.getBusinessChatLinks");
    }
    /**
     * Get quick replies
     * Get list of quick replies for Telegram Business
     */
    async messagesGetQuickReplies(body) {
        return this.client.post("/messages.getQuickReplies", body);
    }
    /**
     * Send quick reply
     * Send a quick reply message
     */
    async messagesSendQuickReplyMessages(body) {
        return this.client.post("/messages.sendQuickReplyMessages", body);
    }
}
exports.ClientApi = ClientApi;
//# sourceMappingURL=client-api.js.map