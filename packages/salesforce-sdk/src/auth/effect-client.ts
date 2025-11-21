/**
 * Effect-based HTTP client for Salesforce API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { SALESFORCE_API_BASE_URL } from "./config";

export interface SalesforceClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Salesforce API
 */
export const makeSalesforceHttpClientLayer = (
  config: SalesforceClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || SALESFORCE_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Salesforce SDK with Effect-based API
 */
export const createSalesforceSDK = (config: SalesforceClientConfig) => {
  const layer = makeSalesforceHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Salesforce layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
