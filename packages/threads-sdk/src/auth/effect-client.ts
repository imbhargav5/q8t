/**
 * Effect-based HTTP client for Threads API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { THREADS_API_BASE_URL } from "./config";

export interface ThreadsClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Threads API
 */
export const makeThreadsHttpClientLayer = (
  config: ThreadsClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || THREADS_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Threads SDK with Effect-based API
 */
export const createThreadsSDK = (config: ThreadsClientConfig) => {
  const layer = makeThreadsHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Threads layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
