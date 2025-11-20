// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from OpenAPI specification

export interface SignerRequest {
  result?: { signedKeyRequest?: { token?: string; deeplinkUrl?: string; key?: string; requestFid?: number; state?: string; isSponsored?: boolean } };
}

export interface SignerRequestStatus {
  result?: { signedKeyRequest?: { token?: string; deeplinkUrl?: string; key?: string; requestFid?: number; state?: "pending" | "approved" | "completed"; isSponsored?: boolean; userFid?: number; metadata?: Record<string, unknown> } };
}

export interface NotificationResponse {
  result?: { successCount?: number; failureCount?: number; rateLimitedCount?: number; invalidTokensCount?: number };
}
