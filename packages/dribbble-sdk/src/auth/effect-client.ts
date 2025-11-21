/**
 * Effect-based HTTP client for Dribbble API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { DRIBBBLE_API_BASE_URL } from "./config";

export interface DribbbleClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Dribbble API
 */
export const makeDribbbleHttpClientLayer = (
  config: DribbbleClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || DRIBBBLE_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Dribbble SDK with Effect-based API
 */
export const createDribbbleSDK = (config: DribbbleClientConfig) => {
  const layer = makeDribbbleHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Dribbble layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
