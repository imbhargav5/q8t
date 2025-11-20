import type { GatewayHttpClient } from "../src/gateway/client";
import type * as Types from "./types";
export declare class GatewayApi {
    private client;
    constructor(client: GatewayHttpClient);
    /**
     * Send verification code
     * Send a verification code to a Telegram user via the Gateway API
     */
    sendVerificationMessage(body: Types.SendVerificationMessageRequest): Promise<SendVerificationMessageResponse>;
    /**
     * Check if messages can be sent
     * Check if verification messages can be sent to a specific phone number
     */
    checkSendAbility(body: Types.CheckSendAbilityRequest): Promise<CheckSendAbilityResponse>;
    /**
     * Check verification status
     * Check the delivery and verification status of a sent verification message
     */
    checkVerificationStatus(body: Types.CheckVerificationStatusRequest): Promise<CheckVerificationStatusResponse>;
    /**
     * Revoke verification message
     * Revoke a previously sent verification message
     */
    revokeVerificationMessage(body: Types.RevokeVerificationMessageRequest): Promise<RevokeVerificationMessageResponse>;
    /**
     * Report delivery status
     * Report delivery status (for internal use)
     */
    reportDelivery(body: Types.ReportDeliveryRequest): Promise<ReportDeliveryResponse>;
}
//# sourceMappingURL=gateway-api.d.ts.map