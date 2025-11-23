// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class LinkedInApi {
  constructor() {}

  /**
   * Get user profile
   */
  getProfile(): Effect.Effect<Types.Profile, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.Profile>("/me");
  }

  /**
   * Create a post
   */
  createPost(body: Types.CreatePostRequest): Effect.Effect<Types.PostResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.PostResponse>("/ugcPosts", body);
  }

  /**
   * Get user connections
   */
  getConnections({ start?: number, count?: number }: { start?: number; count?: number } = {}): Effect.Effect<Types.ConnectionsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.ConnectionsResponse>("/connections", {
      "start": start,
      "count": count,
    });
  }

}