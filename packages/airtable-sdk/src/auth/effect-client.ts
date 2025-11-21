/**
 * Effect-based HTTP client for Airtable API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { AIRTABLE_API_BASE_URL } from "./config";

export interface AirtableClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Airtable API
 */
export const makeAirtableHttpClientLayer = (
  config: AirtableClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || AIRTABLE_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Airtable SDK with Effect-based API
 */
export const createAirtableSDK = (config: AirtableClientConfig) => {
  const layer = makeAirtableHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Airtable layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
