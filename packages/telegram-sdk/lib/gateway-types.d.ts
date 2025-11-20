export interface SendVerificationMessageRequest {
    /**
     * Phone number in international format (e.g., +1234567890)
     */
    phone_number: string;
    /**
     * Length of verification code (4-8 digits)
     */
    code_length?: number;
    /**
     * URL for delivery status callback
     */
    callback_url?: string;
    /**
     * Time-to-live for the code in seconds (30-3600)
     */
    ttl?: number;
    /**
     * Custom sender name (optional)
     */
    sender?: string;
    /**
     * Custom payload to include in callback (optional)
     */
    payload?: string;
}
export interface CheckSendAbilityRequest {
    /**
     * Phone number in international format
     */
    phone_number: string;
}
export interface CheckVerificationStatusRequest {
    /**
     * Request ID returned from sendVerificationMessage
     */
    request_id: string;
}
export interface RevokeVerificationMessageRequest {
    /**
     * Request ID of the verification message to revoke
     */
    request_id: string;
}
export interface SendVerificationMessageResponse {
    ok: boolean;
    /**
     * Unique identifier for this verification request
     */
    request_id?: string;
    /**
     * Phone number the message was sent to
     */
    phone_number?: string;
    /**
     * Delivery status
     */
    status?: "sent" | "pending" | "failed";
    /**
     * Unix timestamp when the message was sent
     */
    sent_at?: number;
    /**
     * Length of the verification code
     */
    code_length?: number;
    /**
     * Time-to-live for the code in seconds
     */
    ttl?: number;
    /**
     * Error description if status is failed
     */
    error?: string;
}
export interface CheckSendAbilityResponse {
    ok: boolean;
    phone_number?: string;
    /**
     * Whether verification messages can be sent to this number
     */
    can_send?: boolean;
    /**
     * Reason why messages cannot be sent (if can_send is false)
     */
    reason?: string;
}
export interface CheckVerificationStatusResponse {
    ok: boolean;
    request_id?: string;
    phone_number?: string;
    status?: "sent" | "delivered" | "read" | "expired" | "revoked" | "failed";
    delivery_status?: {
        sent_at?: number;
        delivered_at?: number;
        read_at?: number;
        expired_at?: number;
    };
    verification_status?: {
        verified?: boolean;
        verified_at?: number;
        attempts?: number;
    };
}
export interface RevokeVerificationMessageResponse {
    ok: boolean;
    request_id?: string;
    revoked?: boolean;
    revoked_at?: number;
}
export interface ReportDeliveryRequest {
    request_id: string;
    status: "delivered" | "failed";
    timestamp?: number;
}
export interface ReportDeliveryResponse {
    ok: boolean;
}
export interface DeliveryStatusCallback {
    request_id: string;
    phone_number: string;
    status: "sent" | "delivered" | "read" | "expired" | "failed";
    timestamp?: number;
    /**
     * Custom payload provided in original request
     */
    payload?: string;
}
export interface ErrorResponse {
    ok: boolean;
    error: {
        code?: "INVALID_PHONE_NUMBER" | "PHONE_NUMBER_BANNED" | "RATE_LIMIT_EXCEEDED" | "INVALID_REQUEST_ID" | "REQUEST_NOT_FOUND" | "INSUFFICIENT_BALANCE" | "INVALID_ACCESS_TOKEN" | "INVALID_TTL" | "INVALID_CODE_LENGTH";
        message?: string;
    };
}
//# sourceMappingURL=gateway-types.d.ts.map