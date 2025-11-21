/**
 * Effect-based HTTP client for X API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { X_API_BASE_URL } from "./config";

export interface XClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for X API
 */
export const makeXHttpClientLayer = (
  config: XClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || X_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create X SDK with Effect-based API
 */
export const createXSDK = (config: XClientConfig) => {
  const layer = makeXHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the X layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
