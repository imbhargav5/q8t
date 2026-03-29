// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Dropbox Core API

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class DropboxCoreApi {
  constructor() {}

  /**
   * List folder contents
   */
  listFolder(body: { path: string; recursive?: boolean; include_deleted?: boolean; include_has_explicit_shared_members?: boolean; include_mounted_folders?: boolean; include_non_downloadable_files?: boolean }): Effect.Effect<Types.ListFolderResult, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.ListFolderResult>("/files/list_folder", { body });
    });
  }

  /**
   * Continue listing folder
   */
  listFolderContinue(body: { cursor: string }): Effect.Effect<Types.ListFolderResult, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.ListFolderResult>("/files/list_folder/continue", { body });
    });
  }

  /**
   * Get file or folder metadata
   */
  getMetadata(body: { path: string; include_deleted?: boolean; include_has_explicit_shared_members?: boolean }): Effect.Effect<unknown, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<unknown>("/files/get_metadata", { body });
    });
  }

  /**
   * Create a folder
   */
  createFolderV2(body: { path: string; autorename?: boolean }): Effect.Effect<{ metadata?: Types.FolderMetadata }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<{ metadata?: Types.FolderMetadata }>("/files/create_folder_v2", { body });
    });
  }

  /**
   * Delete a file or folder
   */
  deleteV2(body: { path: string }): Effect.Effect<{ metadata?: unknown }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<{ metadata?: unknown }>("/files/delete_v2", { body });
    });
  }

  /**
   * Copy a file or folder
   */
  copyV2(body: { from_path: string; to_path: string; allow_shared_folder?: boolean; autorename?: boolean; allow_ownership_transfer?: boolean }): Effect.Effect<{ metadata?: unknown }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<{ metadata?: unknown }>("/files/copy_v2", { body });
    });
  }

  /**
   * Move a file or folder
   */
  moveV2(body: { from_path: string; to_path: string; allow_shared_folder?: boolean; autorename?: boolean; allow_ownership_transfer?: boolean }): Effect.Effect<{ metadata?: unknown }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<{ metadata?: unknown }>("/files/move_v2", { body });
    });
  }

  /**
   * Search for files and folders
   */
  searchV2(body: { query: string; options?: unknown }): Effect.Effect<Types.SearchResult, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.SearchResult>("/files/search_v2", { body });
    });
  }

  /**
   * Get current account info
   */
  getCurrentAccount(): Effect.Effect<Types.FullAccount, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.FullAccount>("/users/get_current_account");
    });
  }

  /**
   * Get space usage
   */
  getSpaceUsage(): Effect.Effect<Types.SpaceUsage, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.SpaceUsage>("/users/get_space_usage");
    });
  }

  /**
   * Create a shared link
   */
  createSharedLinkWithSettings(body: { path: string; settings?: Types.CreateSharedLinkSettings }): Effect.Effect<Types.SharedLinkMetadata, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.SharedLinkMetadata>("/sharing/create_shared_link_with_settings", { body });
    });
  }

  /**
   * List shared links
   */
  listSharedLinks(body: { path?: string; cursor?: string; direct_only?: boolean }): Effect.Effect<{ links?: Types.SharedLinkMetadata[]; has_more?: boolean; cursor?: string }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<{ links?: Types.SharedLinkMetadata[]; has_more?: boolean; cursor?: string }>("/sharing/list_shared_links", { body });
    });
  }

  /**
   * Revoke a shared link
   */
  revokeSharedLink(body: { url: string }): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<void>("/sharing/revoke_shared_link", { body });
    });
  }

  /**
   * List file requests
   */
  listFileRequestsV2(body: { limit?: number }): Effect.Effect<{ file_requests?: Types.FileRequest[] }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<{ file_requests?: Types.FileRequest[] }>("/file_requests/list_v2", { body });
    });
  }

  /**
   * Create a file request
   */
  createFileRequest(body: { title: string; destination: string; deadline?: unknown; open?: boolean }): Effect.Effect<Types.FileRequest, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.FileRequest>("/file_requests/create", { body });
    });
  }

  /**
   * Get a file request
   */
  getFileRequest(body: { id: string }): Effect.Effect<Types.FileRequest, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.FileRequest>("/file_requests/get", { body });
    });
  }

}