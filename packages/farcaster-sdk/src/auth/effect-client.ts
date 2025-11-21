/**
 * Effect-based HTTP client for Farcaster API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { FARCASTER_API_BASE_URL } from "./config";

export interface FarcasterClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Farcaster API
 */
export const makeFarcasterHttpClientLayer = (
  config: FarcasterClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || FARCASTER_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Farcaster SDK with Effect-based API
 */
export const createFarcasterSDK = (config: FarcasterClientConfig) => {
  const layer = makeFarcasterHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Farcaster layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
