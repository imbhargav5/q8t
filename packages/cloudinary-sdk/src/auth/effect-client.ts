/**
 * Effect-based HTTP client for Cloudinary API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { CLOUDINARY_API_BASE_URL } from "./config";

export interface CloudinaryClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Cloudinary API
 */
export const makeCloudinaryHttpClientLayer = (
  config: CloudinaryClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || CLOUDINARY_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Cloudinary SDK with Effect-based API
 */
export const createCloudinarySDK = (config: CloudinaryClientConfig) => {
  const layer = makeCloudinaryHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Cloudinary layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
