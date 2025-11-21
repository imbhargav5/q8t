/**
 * Effect-based HTTP client for LinkedIn API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { LINKEDIN_API_BASE_URL } from "./config";

export interface LinkedInClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for LinkedIn API
 */
export const makeLinkedInHttpClientLayer = (
  config: LinkedInClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || LINKEDIN_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create LinkedIn SDK with Effect-based API
 */
export const createLinkedInSDK = (config: LinkedInClientConfig) => {
  const layer = makeLinkedInHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the LinkedIn layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
