"use strict";
// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Telegram Gateway API
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayApi = void 0;
class GatewayApi {
    constructor(client) {
        this.client = client;
    }
    /**
     * Send verification code
     * Send a verification code to a Telegram user via the Gateway API
     */
    async sendVerificationMessage(body) {
        return this.client.post("/sendVerificationMessage", body);
    }
    /**
     * Check if messages can be sent
     * Check if verification messages can be sent to a specific phone number
     */
    async checkSendAbility(body) {
        return this.client.post("/checkSendAbility", body);
    }
    /**
     * Check verification status
     * Check the delivery and verification status of a sent verification message
     */
    async checkVerificationStatus(body) {
        return this.client.post("/checkVerificationStatus", body);
    }
    /**
     * Revoke verification message
     * Revoke a previously sent verification message
     */
    async revokeVerificationMessage(body) {
        return this.client.post("/revokeVerificationMessage", body);
    }
    /**
     * Report delivery status
     * Report delivery status (for internal use)
     */
    async reportDelivery(body) {
        return this.client.post("/reportDelivery", body);
    }
}
exports.GatewayApi = GatewayApi;
//# sourceMappingURL=gateway-api.js.map