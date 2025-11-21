// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class InstagramApi {
  constructor() {}

  /**
   * Get user media
   */
  getUserMedia(user_id: string, params?: { fields?: string; limit?: number }): Effect.Effect<Types.MediaListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.MediaListResponse>(`/${user_id}/media`, {
        queryParams: {
          "fields": params?.fields,
          "limit": params?.limit,
        }
      });
    });
  }

  /**
   * Create media container
   */
  createMedia(user_id: string, body: Types.CreateMediaRequest): Effect.Effect<Types.CreateMediaResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.CreateMediaResponse>(`/${user_id}/media`, { body });
    });
  }

  /**
   * Get single media
   */
  getMedia(media_id: string, params?: { fields?: string }): Effect.Effect<Types.Media, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.Media>(`/${media_id}`, {
        queryParams: {
          "fields": params?.fields,
        }
      });
    });
  }

  /**
   * Get user insights
   */
  getUserInsights(user_id: string, params?: { metric?: string; period?: string; since?: number; until?: number }): Effect.Effect<Types.InsightsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.InsightsResponse>(`/${user_id}/insights`, {
        queryParams: {
          "metric": params?.metric,
          "period": params?.period,
          "since": params?.since,
          "until": params?.until,
        }
      });
    });
  }

  /**
   * Get media insights
   */
  getMediaInsights(media_id: string, params?: { metric?: string }): Effect.Effect<Types.InsightsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.InsightsResponse>(`/${media_id}/insights`, {
        queryParams: {
          "metric": params?.metric,
        }
      });
    });
  }

}