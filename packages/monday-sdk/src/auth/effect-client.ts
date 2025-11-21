/**
 * Effect-based HTTP client for Monday API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { MONDAY_API_BASE_URL } from "./config";

export interface MondayClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Monday API
 */
export const makeMondayHttpClientLayer = (
  config: MondayClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || MONDAY_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Monday SDK with Effect-based API
 */
export const createMondaySDK = (config: MondayClientConfig) => {
  const layer = makeMondayHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Monday layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
