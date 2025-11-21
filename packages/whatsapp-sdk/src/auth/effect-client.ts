/**
 * Effect-based HTTP client for WhatsApp API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { WHATSAPP_API_BASE_URL } from "./config";

export interface WhatsAppClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for WhatsApp API
 */
export const makeWhatsAppHttpClientLayer = (
  config: WhatsAppClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || WHATSAPP_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create WhatsApp SDK with Effect-based API
 */
export const createWhatsAppSDK = (config: WhatsAppClientConfig) => {
  const layer = makeWhatsAppHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the WhatsApp layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
