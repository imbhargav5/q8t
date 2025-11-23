// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class PinterestApi {
  constructor() {}

  /**
   * Get user account info
   */
  getUserAccount(): Effect.Effect<Types.UserAccount, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.UserAccount>("/user_account");
  }

  /**
   * List boards
   */
  listBoards({ bookmark?: string, page_size?: number, privacy?: string }: { bookmark?: string; page_size?: number; privacy?: string } = {}): Effect.Effect<Types.BoardsListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.BoardsListResponse>("/boards", {
      "bookmark": bookmark,
      "page_size": page_size,
      "privacy": privacy,
    });
  }

  /**
   * List pins
   */
  listPins({ bookmark?: string, page_size?: number, pin_filter?: string }: { bookmark?: string; page_size?: number; pin_filter?: string } = {}): Effect.Effect<Types.PinsListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.PinsListResponse>("/pins", {
      "bookmark": bookmark,
      "page_size": page_size,
      "pin_filter": pin_filter,
    });
  }

  /**
   * Create a pin
   */
  createPin(body: Types.PinCreate): Effect.Effect<Types.Pin, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.Pin>("/pins", body);
  }

}