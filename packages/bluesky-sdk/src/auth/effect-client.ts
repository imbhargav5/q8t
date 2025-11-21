/**
 * Effect-based HTTP client for Bluesky API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { BLUESKY_API_BASE_URL } from "./config";

export interface BlueskyClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Bluesky API
 */
export const makeBlueskyHttpClientLayer = (
  config: BlueskyClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || BLUESKY_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Bluesky SDK with Effect-based API
 */
export const createBlueskySDK = (config: BlueskyClientConfig) => {
  const layer = makeBlueskyHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Bluesky layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
