/**
 * Effect-based HTTP client for Reddit API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { REDDIT_API_BASE_URL } from "./config";

export interface RedditClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Reddit API
 */
export const makeRedditHttpClientLayer = (
  config: RedditClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || REDDIT_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Reddit SDK with Effect-based API
 */
export const createRedditSDK = (config: RedditClientConfig) => {
  const layer = makeRedditHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Reddit layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
