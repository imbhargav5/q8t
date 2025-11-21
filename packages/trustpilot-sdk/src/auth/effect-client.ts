/**
 * Effect-based HTTP client for Trustpilot API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { TRUSTPILOT_API_BASE_URL } from "./config";

export interface TrustpilotClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Trustpilot API
 */
export const makeTrustpilotHttpClientLayer = (
  config: TrustpilotClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || TRUSTPILOT_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Trustpilot SDK with Effect-based API
 */
export const createTrustpilotSDK = (config: TrustpilotClientConfig) => {
  const layer = makeTrustpilotHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Trustpilot layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
