/**
 * Effect-based HTTP client for Slack API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { SLACK_API_BASE_URL } from "./config";

export interface SlackClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Slack API
 */
export const makeSlackHttpClientLayer = (
  config: SlackClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || SLACK_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Slack SDK with Effect-based API
 */
export const createSlackSDK = (config: SlackClientConfig) => {
  const layer = makeSlackHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Slack layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
