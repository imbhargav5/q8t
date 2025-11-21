/**
 * Effect-based HTTP client for ClickUp API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { CLICKUP_API_BASE_URL } from "./config";

export interface ClickUpClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for ClickUp API
 */
export const makeClickUpHttpClientLayer = (
  config: ClickUpClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || CLICKUP_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create ClickUp SDK with Effect-based API
 */
export const createClickUpSDK = (config: ClickUpClientConfig) => {
  const layer = makeClickUpHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the ClickUp layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
