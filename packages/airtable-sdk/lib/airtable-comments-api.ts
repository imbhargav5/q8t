// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Airtable Comments API

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class AirtableCommentsApi {
  constructor() {}

  /**
   * List comments
   */
  listComments(baseId: string, tableIdOrName: string, recordId: string, queryParams?: { offset?: string; pageSize?: number }): Effect.Effect<Types.CommentList, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      const params: Record<string, string | number | boolean | string[] | undefined> = {};
      if (queryParams?.offset !== undefined) params["offset"] = queryParams.offset;
      if (queryParams?.pageSize !== undefined) params["pageSize"] = queryParams.pageSize;
      return yield* client.get<Types.CommentList>(`/${baseId}/${tableIdOrName}/${recordId}/comments`, { queryParams: params });
    });
  }

  /**
   * Create comment
   */
  createComment(baseId: string, tableIdOrName: string, recordId: string, body: Types.CreateCommentRequest): Effect.Effect<Types.Comment, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.Comment>(`/${baseId}/${tableIdOrName}/${recordId}/comments`, { body });
    });
  }

  /**
   * Get comment
   */
  getComment(baseId: string, tableIdOrName: string, recordId: string, commentId: string): Effect.Effect<Types.Comment, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.Comment>(`/${baseId}/${tableIdOrName}/${recordId}/comments/${commentId}`);
    });
  }

  /**
   * Delete comment
   */
  deleteComment(baseId: string, tableIdOrName: string, recordId: string, commentId: string): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.delete<void>(`/${baseId}/${tableIdOrName}/${recordId}/comments/${commentId}`);
    });
  }

  /**
   * Update comment
   */
  updateComment(baseId: string, tableIdOrName: string, recordId: string, commentId: string, body: Types.UpdateCommentRequest): Effect.Effect<Types.Comment, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.patch<Types.Comment>(`/${baseId}/${tableIdOrName}/${recordId}/comments/${commentId}`, { body });
    });
  }

}