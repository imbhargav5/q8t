/**
 * Effect-based HTTP client for Facebook API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { FACEBOOK_GRAPH_API_URL } from "./config";

export interface FacebookClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Facebook API
 */
export const makeFacebookHttpClientLayer = (
  config: FacebookClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || FACEBOOK_GRAPH_API_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Facebook SDK with Effect-based API
 */
export const createFacebookSDK = (config: FacebookClientConfig) => {
  const layer = makeFacebookHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Facebook layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
