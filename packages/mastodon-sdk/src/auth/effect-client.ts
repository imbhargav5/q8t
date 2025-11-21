/**
 * Effect-based HTTP client for Mastodon API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { MASTODON_API_BASE_URL } from "./config";

export interface MastodonClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Mastodon API
 */
export const makeMastodonHttpClientLayer = (
  config: MastodonClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || MASTODON_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Mastodon SDK with Effect-based API
 */
export const createMastodonSDK = (config: MastodonClientConfig) => {
  const layer = makeMastodonHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Mastodon layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
