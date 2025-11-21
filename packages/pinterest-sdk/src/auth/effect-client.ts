/**
 * Effect-based HTTP client for Pinterest API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { PINTEREST_API_BASE_URL } from "./config";

export interface PinterestClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Pinterest API
 */
export const makePinterestHttpClientLayer = (
  config: PinterestClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || PINTEREST_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Pinterest SDK with Effect-based API
 */
export const createPinterestSDK = (config: PinterestClientConfig) => {
  const layer = makePinterestHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Pinterest layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
