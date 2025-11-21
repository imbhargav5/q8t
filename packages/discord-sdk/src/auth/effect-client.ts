/**
 * Effect-based HTTP client for Discord API
 */

import { Effect, Layer } from "effect";
import { HttpClient, HttpClientLive, type HttpClientConfig } from "@q8t/effect-sdk-base";
import { DISCORD_API_BASE_URL } from "./config";

export interface DiscordClientConfig {
  accessToken: string;
  baseUrl?: string;
}

/**
 * Create an HttpClient layer for Discord API
 */
export const makeDiscordHttpClientLayer = (
  config: DiscordClientConfig
): Layer.Layer<HttpClient> => {
  const httpConfig: HttpClientConfig = {
    baseUrl: config.baseUrl || DISCORD_API_BASE_URL,
    defaultHeaders: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };

  return HttpClientLive(httpConfig);
};

/**
 * Create Discord SDK with Effect-based API
 */
export const createDiscordSDK = (config: DiscordClientConfig) => {
  const layer = makeDiscordHttpClientLayer(config);

  return {
    layer,
    /**
     * Run an Effect that requires HttpClient with the Discord layer
     */
    run: <A, E>(effect: Effect.Effect<A, E, HttpClient>) =>
      Effect.provide(effect, layer),
  };
};
