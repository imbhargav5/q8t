/**
 * Effect-based HTTP client for GoogleMyBusiness API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { GOOGLE_MY_BUSINESS_API_BASE_URL } from "./config";

export interface GoogleMyBusinessClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for GoogleMyBusiness API
 */
export const makeGoogleMyBusinessHttpClientLayer = (
  config: GoogleMyBusinessClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || GOOGLE_MY_BUSINESS_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create GoogleMyBusiness SDK with Effect-based API
 */
export const createGoogleMyBusinessSDK = (config: GoogleMyBusinessClientConfig) => {
  const layer = makeGoogleMyBusinessHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the GoogleMyBusiness layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
