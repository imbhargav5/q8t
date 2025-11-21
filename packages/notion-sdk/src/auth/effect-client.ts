/**
 * Effect-based HTTP client for Notion API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { NOTION_API_BASE_URL } from "./config";

export interface NotionClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Notion API
 */
export const makeNotionHttpClientLayer = (
  config: NotionClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || NOTION_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Notion SDK with Effect-based API
 */
export const createNotionSDK = (config: NotionClientConfig) => {
  const layer = makeNotionHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Notion layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
