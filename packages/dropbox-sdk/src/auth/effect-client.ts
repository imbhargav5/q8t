/**
 * Effect-based HTTP client for Dropbox API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { DROPBOX_API_BASE_URL } from "./config";

export interface DropboxClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Dropbox API
 */
export const makeDropboxHttpClientLayer = (
  config: DropboxClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || DROPBOX_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Dropbox SDK with Effect-based API
 */
export const createDropboxSDK = (config: DropboxClientConfig) => {
  const layer = makeDropboxHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Dropbox layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
