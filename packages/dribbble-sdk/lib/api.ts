// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class DribbbleApi {
  constructor() {}

  /**
   * Get authenticated user
   * Get the authenticated user's profile
   */
  getAuthenticatedUser(): Effect.Effect<Types.User, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.User>("/user");
    });
  }

  /**
   * List user's shots
   * List the authenticated user's shots
   */
  listUserShots(params?: { page?: number; per_page?: number }): Effect.Effect<Types.Shot[], HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.Shot[]>("/user/shots", {
        queryParams: {
          "page": params?.page,
          "per_page": params?.per_page,
        }
      });
    });
  }

  /**
   * Get a shot
   * Get a single shot by ID (must be owned by authenticated user)
   */
  getShot(id: number): Effect.Effect<Types.Shot, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.Shot>(`/shots/${id}`);
    });
  }

  /**
   * Update a shot
   * Update a shot owned by the authenticated user
   */
  updateShot(id: number, body: Types.UpdateShotRequest): Effect.Effect<Types.Shot, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.put<Types.Shot>(`/shots/${id}`, { body });
    });
  }

  /**
   * Delete a shot
   * Delete a shot owned by the authenticated user
   */
  deleteShot(id: number): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.delete<void>(`/shots/${id}`);
    });
  }

  /**
   * Create a shot
   * Create a new shot (requires upload scope, user must be a player or team)
   */
  createShot(body: FormData): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<void>("/shots", { body });
    });
  }

  /**
   * Create an attachment
   * Create an attachment for a shot (asynchronous processing)
   */
  createAttachment(shot_id: number, body: FormData): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<void>(`/shots/${shot_id}/attachments`, { body });
    });
  }

  /**
   * Delete an attachment
   * Delete an attachment (must own the attachment)
   */
  deleteAttachment(shot_id: number, id: number): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.delete<void>(`/shots/${shot_id}/attachments/${id}`);
    });
  }

  /**
   * List user's projects
   * List the authenticated user's projects
   */
  listUserProjects(params?: { page?: number; per_page?: number }): Effect.Effect<Types.Project[], HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.get<Types.Project[]>("/user/projects", {
        queryParams: {
          "page": params?.page,
          "per_page": params?.per_page,
        }
      });
    });
  }

  /**
   * Create a project
   * Create a new project
   */
  createProject(body: Types.CreateProjectRequest): Effect.Effect<Types.Project, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.post<Types.Project>("/projects", { body });
    });
  }

  /**
   * Update a project
   * Update a project owned by the authenticated user
   */
  updateProject(id: number, body: Types.UpdateProjectRequest): Effect.Effect<Types.Project, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.put<Types.Project>(`/projects/${id}`, { body });
    });
  }

  /**
   * Delete a project
   * Delete a project owned by the authenticated user
   */
  deleteProject(id: number): Effect.Effect<Types.Project, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
      return yield* client.delete<Types.Project>(`/projects/${id}`);
    });
  }

}