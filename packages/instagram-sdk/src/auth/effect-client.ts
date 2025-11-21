/**
 * Effect-based HTTP client for Instagram Graph API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { INSTAGRAM_API_BASE_URL } from "./config";

export interface InstagramEffectClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Instagram Graph API
 */
export const makeInstagramHttpClientLayer = (
  config: InstagramEffectClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || INSTAGRAM_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Instagram SDK with Effect-based API
 */
export const createInstagramSDK = (config: InstagramEffectClientConfig) => {
  const layer = makeInstagramHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Instagram layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
