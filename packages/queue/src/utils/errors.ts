/**
 * Custom error classes for the queue system
 */

/**
 * Error codes for different failure scenarios
 */
export enum ErrorCode {
  /** Network-related errors (timeouts, connection issues) */
  NETWORK_ERROR = 'NETWORK_ERROR',
  /** Authentication/authorization errors */
  AUTH_ERROR = 'AUTH_ERROR',
  /** Rate limit exceeded */
  RATE_LIMIT = 'RATE_LIMIT',
  /** Validation errors (invalid data, missing fields) */
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  /** Platform-specific errors */
  PLATFORM_ERROR = 'PLATFORM_ERROR',
  /** Media upload errors */
  MEDIA_UPLOAD_ERROR = 'MEDIA_UPLOAD_ERROR',
  /** Unknown/unexpected errors */
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Base publish error class
 */
export class PublishError extends Error {
  constructor(
    public code: ErrorCode,
    public platform: string,
    public retryable: boolean,
    message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'PublishError';

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PublishError);
    }
  }

  /**
   * Convert error to JSON for logging
   */
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      platform: this.platform,
      retryable: this.retryable,
      message: this.message,
      originalError: this.originalError?.message,
      stack: this.stack,
    };
  }
}

/**
 * Network error (retryable)
 */
export class NetworkError extends PublishError {
  constructor(platform: string, message: string, originalError?: Error) {
    super(ErrorCode.NETWORK_ERROR, platform, true, message, originalError);
    this.name = 'NetworkError';
  }
}

/**
 * Authentication error (not retryable)
 */
export class AuthenticationError extends PublishError {
  constructor(platform: string, message: string, originalError?: Error) {
    super(ErrorCode.AUTH_ERROR, platform, false, message, originalError);
    this.name = 'AuthenticationError';
  }
}

/**
 * Rate limit error (retryable with delay)
 */
export class RateLimitError extends PublishError {
  constructor(
    platform: string,
    message: string,
    public retryAfterSeconds?: number,
    originalError?: Error
  ) {
    super(ErrorCode.RATE_LIMIT, platform, true, message, originalError);
    this.name = 'RateLimitError';
  }
}

/**
 * Validation error (not retryable)
 */
export class ValidationError extends PublishError {
  constructor(
    platform: string,
    message: string,
    public validationErrors: string[],
    originalError?: Error
  ) {
    super(ErrorCode.VALIDATION_ERROR, platform, false, message, originalError);
    this.name = 'ValidationError';
  }
}

/**
 * Media upload error (may be retryable)
 */
export class MediaUploadError extends PublishError {
  constructor(
    platform: string,
    message: string,
    retryable: boolean,
    originalError?: Error
  ) {
    super(ErrorCode.MEDIA_UPLOAD_ERROR, platform, retryable, message, originalError);
    this.name = 'MediaUploadError';
  }
}

/**
 * Platform-specific error
 */
export class PlatformError extends PublishError {
  constructor(
    platform: string,
    message: string,
    retryable: boolean,
    public platformErrorCode?: string,
    originalError?: Error
  ) {
    super(ErrorCode.PLATFORM_ERROR, platform, retryable, message, originalError);
    this.name = 'PlatformError';
  }
}
