/**
 * Effect-based HTTP client for TikTok API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { TIKTOK_API_BASE_URL } from "./config";

export interface TikTokClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for TikTok API
 */
export const makeTikTokHttpClientLayer = (
  config: TikTokClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || TIKTOK_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create TikTok SDK with Effect-based API
 */
export const createTikTokSDK = (config: TikTokClientConfig) => {
  const layer = makeTikTokHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the TikTok layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
