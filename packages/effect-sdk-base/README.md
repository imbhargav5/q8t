# @q8t/effect-sdk-base

Shared Effect-based infrastructure for Q8T SDKs.

## Overview

This package provides common utilities, error types, and patterns for building Effect-based SDKs following the patterns from [effect.website](https://effect.website).

## Features

- **Typed Errors**: Comprehensive error hierarchy using `Data.TaggedError`
- **HTTP Client**: Effect-based HTTP client abstraction with automatic error handling
- **Retry Policies**: Pre-configured retry strategies for various scenarios
- **Utilities**: Common helper functions for timeouts, logging, and JSON operations

## Error Types

All errors extend `Data.TaggedError` for type-safe error handling:

- `HttpError` - HTTP-level errors (4xx, 5xx responses)
- `NetworkError` - Network-level failures (connection, DNS)
- `AuthError` - Authentication/authorization failures
- `OAuthError` - OAuth-specific errors
- `TokenRefreshError` - Token refresh failures
- `ValidationError` - Request validation errors
- `RateLimitError` - Rate limiting errors
- `ApiError` - API business logic errors
- `ParseError` - Response parsing errors
- `ConfigError` - SDK configuration errors

## HTTP Client

Effect-based HTTP client with automatic error handling:

```typescript
import { HttpClient, HttpClientLive, HttpError, NetworkError } from "@q8t/effect-sdk-base"
import { Effect } from "effect"

// Create HTTP client layer
const layer = HttpClientLive({
  baseUrl: "https://api.example.com",
  defaultHeaders: { "Authorization": "Bearer token" }
})

// Use in your program
const program = Effect.gen(function* () {
  const client = yield* HttpClient
  const data = yield* client.get<User>("/users/123")
  return data
})

// Run with layer
Effect.runPromise(Effect.provide(program, layer))
```

## Retry Policies

Pre-configured retry strategies:

- `defaultRetryPolicy` - Exponential backoff, 5 retries, 30s max
- `aggressiveRetryPolicy` - Fast retries, 10 attempts, 2m max
- `conservativeRetryPolicy` - Linear backoff, 3 retries, 30s max
- `oauthRetryPolicy` - Quick retries for auth, 3 attempts, 10s max
- `noRetryPolicy` - No retries

## Usage in SDKs

```typescript
import { HttpClient, defaultRetryPolicy, HttpError } from "@q8t/effect-sdk-base"
import { Effect } from "effect"

export const getUser = (id: string) =>
  Effect.gen(function* () {
    const client = yield* HttpClient
    return yield* client.get<User>(`/users/${id}`)
  }).pipe(
    Effect.retry(defaultRetryPolicy)
  )
```
