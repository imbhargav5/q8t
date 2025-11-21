/**
 * Shared utilities for Effect-based SDKs
 */

import { Effect, Duration } from "effect"

/**
 * Default timeout duration for API requests (30 seconds)
 */
export const DEFAULT_TIMEOUT = Duration.seconds(30)

/**
 * Apply timeout to an Effect
 */
export const withTimeout = <A, E, R>(
  effect: Effect.Effect<A, E, R>,
  duration: Duration.Duration = DEFAULT_TIMEOUT
): Effect.Effect<A, E | Error, R> =>
  Effect.timeout(effect, duration).pipe(
    Effect.flatMap((option) =>
      option._tag === "Some"
        ? Effect.succeed(option.value)
        : Effect.fail(new Error("Operation timed out"))
    )
  )

/**
 * Safe JSON parse that returns an Effect
 */
export const parseJson = <T>(
  text: string
): Effect.Effect<T, Error> =>
  Effect.try({
    try: () => JSON.parse(text) as T,
    catch: (error) =>
      error instanceof Error
        ? error
        : new Error("JSON parse failed"),
  })

/**
 * Safe JSON stringify that returns an Effect
 */
export const stringifyJson = (
  value: unknown
): Effect.Effect<string, Error> =>
  Effect.try({
    try: () => JSON.stringify(value),
    catch: (error) =>
      error instanceof Error
        ? error
        : new Error("JSON stringify failed"),
  })

/**
 * Delay execution by a duration
 */
export const delay = (duration: Duration.Duration) =>
  Effect.sleep(duration)

/**
 * Create a tagged logger for an SDK
 */
export const createLogger = (sdkName: string) => ({
  debug: (message: string, ...args: unknown[]) =>
    Effect.log(`[${sdkName}] ${message}`, ...args).pipe(
      Effect.withLogLevel("Debug")
    ),
  info: (message: string, ...args: unknown[]) =>
    Effect.log(`[${sdkName}] ${message}`, ...args).pipe(
      Effect.withLogLevel("Info")
    ),
  warn: (message: string, ...args: unknown[]) =>
    Effect.log(`[${sdkName}] ${message}`, ...args).pipe(
      Effect.withLogLevel("Warning")
    ),
  error: (message: string, ...args: unknown[]) =>
    Effect.log(`[${sdkName}] ${message}`, ...args).pipe(
      Effect.withLogLevel("Error")
    ),
})

/**
 * Type guard for checking if a value is defined
 */
export const isDefined = <T>(value: T | undefined | null): value is T =>
  value !== undefined && value !== null

/**
 * Filter undefined values from a record
 */
export const filterUndefined = <T extends Record<string, unknown>>(
  obj: T
): Partial<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => isDefined(value))
  ) as Partial<T>
