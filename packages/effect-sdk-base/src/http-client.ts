/**
 * Effect-based HTTP client interface and implementation
 * Following effect.website patterns
 */

import { Context, Effect, Layer } from "effect"
import { HttpError, NetworkError, ParseError } from "./errors.js"

/**
 * HTTP method types
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

/**
 * HTTP request options
 */
export interface HttpRequestOptions {
  readonly headers?: Record<string, string>
  readonly queryParams?: Record<string, string | number | boolean | undefined>
  readonly body?: unknown
  readonly timeout?: number
}

/**
 * HTTP response wrapper
 */
export interface HttpResponse<T> {
  readonly data: T
  readonly status: number
  readonly statusText: string
  readonly headers: Record<string, string>
}

/**
 * HTTP Client service interface
 * This is the core abstraction that all SDKs will depend on
 */
export interface HttpClientService {
  /**
   * Perform a GET request
   */
  readonly get: <T>(
    path: string,
    options?: HttpRequestOptions
  ) => Effect.Effect<T, HttpError | NetworkError | ParseError>

  /**
   * Perform a POST request
   */
  readonly post: <T>(
    path: string,
    options?: HttpRequestOptions
  ) => Effect.Effect<T, HttpError | NetworkError | ParseError>

  /**
   * Perform a PUT request
   */
  readonly put: <T>(
    path: string,
    options?: HttpRequestOptions
  ) => Effect.Effect<T, HttpError | NetworkError | ParseError>

  /**
   * Perform a PATCH request
   */
  readonly patch: <T>(
    path: string,
    options?: HttpRequestOptions
  ) => Effect.Effect<T, HttpError | NetworkError | ParseError>

  /**
   * Perform a DELETE request
   */
  readonly delete: <T>(
    path: string,
    options?: HttpRequestOptions
  ) => Effect.Effect<T, HttpError | NetworkError | ParseError>

  /**
   * Generic request method
   */
  readonly request: <T>(
    method: HttpMethod,
    path: string,
    options?: HttpRequestOptions
  ) => Effect.Effect<T, HttpError | NetworkError | ParseError>
}

/**
 * HTTP Client service tag
 */
export class HttpClient extends Context.Tag("@q8t/HttpClient")<HttpClient, HttpClientService>() {}

/**
 * Configuration for HTTP client
 */
export interface HttpClientConfig {
  readonly baseUrl: string
  readonly defaultHeaders?: Record<string, string>
  readonly timeout?: number
}

/**
 * Build query string from params
 */
const buildQueryString = (params?: Record<string, string | number | boolean | undefined>): string => {
  if (!params) return ""

  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.append(key, String(value))
    }
  }

  const query = searchParams.toString()
  return query ? `?${query}` : ""
}

/**
 * Build full URL from base URL and path
 */
const buildUrl = (baseUrl: string, path: string, queryParams?: Record<string, string | number | boolean | undefined>): string => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const query = buildQueryString(queryParams)
  return `${normalizedBase}${normalizedPath}${query}`
}

/**
 * Create a live HTTP client implementation using native fetch
 */
export const makeHttpClient = (config: HttpClientConfig): HttpClientService => {
  const request = <T>(
    method: HttpMethod,
    path: string,
    options?: HttpRequestOptions
  ): Effect.Effect<T, HttpError | NetworkError | ParseError> => {
    const url = buildUrl(config.baseUrl, path, options?.queryParams)

    return Effect.tryPromise({
      try: async (): Promise<T> => {
        const headers = {
          "Content-Type": "application/json",
          ...config.defaultHeaders,
          ...options?.headers,
        }

        const init: RequestInit = {
          method,
          headers,
        }

        if (options?.body) {
          init.body = JSON.stringify(options.body)
        }

        const response = await fetch(url, init)

        // Handle non-2xx responses as HttpError
        if (!response.ok) {
          const body = await response.text()
          throw new HttpError({
            status: response.status,
            statusText: response.statusText,
            body,
            url,
            method,
          })
        }

        // Parse response body
        const contentType = response.headers.get("content-type")
        if (contentType?.includes("application/json")) {
          try {
            return (await response.json()) as T
          } catch (error) {
            throw new ParseError({
              message: "Failed to parse JSON response",
              body: await response.text(),
              cause: error,
            })
          }
        }

        // Return text for non-JSON responses
        return (await response.text()) as T
      },
      catch: (error) => {
        // If it's already one of our typed errors, return it
        if (
          error instanceof HttpError ||
          error instanceof NetworkError ||
          error instanceof ParseError
        ) {
          return error
        }

        // Otherwise, wrap in NetworkError
        return new NetworkError({
          message: error instanceof Error ? error.message : "Network request failed",
          url,
          cause: error,
        })
      },
    })
  }

  return {
    get: (path, options) => request("GET", path, options),
    post: (path, options) => request("POST", path, options),
    put: (path, options) => request("PUT", path, options),
    patch: (path, options) => request("PATCH", path, options),
    delete: (path, options) => request("DELETE", path, options),
    request,
  }
}

/**
 * Create an HTTP Client layer
 */
export const HttpClientLive = (config: HttpClientConfig): Layer.Layer<HttpClient> =>
  Effect.sync(() => makeHttpClient(config)).pipe(
    Layer.effect(HttpClient)
  )
