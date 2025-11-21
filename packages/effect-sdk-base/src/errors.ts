/**
 * Typed errors for Effect-based SDKs
 * Following effect.website patterns with Data.TaggedError
 */

import { Data } from "effect"

/**
 * Base HTTP error for all HTTP-related failures
 */
export class HttpError extends Data.TaggedError("HttpError")<{
  readonly status: number
  readonly statusText: string
  readonly body?: string
  readonly url: string
  readonly method: string
}> {}

/**
 * Network-level errors (connection failures, timeouts, DNS issues)
 */
export class NetworkError extends Data.TaggedError("NetworkError")<{
  readonly message: string
  readonly url: string
  readonly cause?: unknown
}> {}

/**
 * Authentication and authorization errors
 */
export class AuthError extends Data.TaggedError("AuthError")<{
  readonly message: string
  readonly type: "invalid_token" | "expired_token" | "missing_token" | "invalid_credentials" | "unauthorized"
  readonly details?: string
}> {}

/**
 * OAuth-specific errors
 */
export class OAuthError extends Data.TaggedError("OAuthError")<{
  readonly message: string
  readonly type: "invalid_grant" | "invalid_request" | "invalid_client" | "unauthorized_client" | "unsupported_grant_type"
  readonly error_description?: string
}> {}

/**
 * Token refresh failures
 */
export class TokenRefreshError extends Data.TaggedError("TokenRefreshError")<{
  readonly message: string
  readonly originalError?: unknown
}> {}

/**
 * Request validation errors (invalid parameters, missing required fields)
 */
export class ValidationError extends Data.TaggedError("ValidationError")<{
  readonly message: string
  readonly field?: string
  readonly value?: unknown
}> {}

/**
 * Rate limiting errors
 */
export class RateLimitError extends Data.TaggedError("RateLimitError")<{
  readonly message: string
  readonly retryAfter?: number
  readonly limit?: number
  readonly remaining?: number
  readonly reset?: number
}> {}

/**
 * API-level errors (business logic failures from the API)
 */
export class ApiError extends Data.TaggedError("ApiError")<{
  readonly message: string
  readonly code?: string
  readonly details?: unknown
}> {}

/**
 * Parse errors when response body cannot be parsed
 */
export class ParseError extends Data.TaggedError("ParseError")<{
  readonly message: string
  readonly body: string
  readonly cause?: unknown
}> {}

/**
 * Configuration errors (missing or invalid SDK configuration)
 */
export class ConfigError extends Data.TaggedError("ConfigError")<{
  readonly message: string
  readonly field?: string
}> {}

/**
 * Union of all possible SDK errors
 */
export type SdkError =
  | HttpError
  | NetworkError
  | AuthError
  | OAuthError
  | TokenRefreshError
  | ValidationError
  | RateLimitError
  | ApiError
  | ParseError
  | ConfigError
