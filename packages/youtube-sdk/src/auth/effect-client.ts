/**
 * Effect-based HTTP client for YouTube API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { YOUTUBE_API_BASE_URL } from "./config";

export interface YouTubeClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for YouTube API
 */
export const makeYouTubeHttpClientLayer = (
  config: YouTubeClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || YOUTUBE_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create YouTube SDK with Effect-based API
 */
export const createYouTubeSDK = (config: YouTubeClientConfig) => {
  const layer = makeYouTubeHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the YouTube layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
