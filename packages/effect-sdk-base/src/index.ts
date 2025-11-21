/**
 * @q8t/effect-sdk-base
 *
 * Shared Effect-based infrastructure for Q8T SDKs
 * Provides typed errors, HTTP client abstraction, retry policies, and utilities
 *
 * Following patterns from effect.website
 */

// Export all error types
export * from "./errors.js"

// Export HTTP client
export * from "./http-client.js"

// Export retry policies
export * from "./retry.js"

// Export utilities
export * from "./utils.js"

// Re-export commonly used Effect types for convenience
export { Effect, Context, Layer, Schedule, Duration, Data } from "effect"
