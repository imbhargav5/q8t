/**
 * Effect-based HTTP client for Asana API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { ASANA_API_BASE_URL } from "./config";

export interface AsanaClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Asana API
 */
export const makeAsanaHttpClientLayer = (
  config: AsanaClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || ASANA_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Asana SDK with Effect-based API
 */
export const createAsanaSDK = (config: AsanaClientConfig) => {
  const layer = makeAsanaHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Asana layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
