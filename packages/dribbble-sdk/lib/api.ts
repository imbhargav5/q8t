// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class DribbbleApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get authenticated user
   * Get the authenticated user's profile
   */
  async getAuthenticatedUser(): Promise<Types.User> {
    return this.client.get<Types.User>("/user");
  }

  /**
   * List user's shots
   * List the authenticated user's shots
   */
  async listUserShots(params?: { page?: number; per_page?: number }): Promise<Types.Shot[]> {
    return this.client.get<Types.Shot[]>("/user/shots", {
      page: params?.page,
      per_page: params?.per_page,
    });
  }

  /**
   * Get a shot
   * Get a single shot by ID (must be owned by authenticated user)
   */
  async getShot(id: number): Promise<Types.Shot> {
    return this.client.get<Types.Shot>(`/shots/${id}`);
  }

  /**
   * Update a shot
   * Update a shot owned by the authenticated user
   */
  async updateShot(id: number, body: Types.UpdateShotRequest): Promise<Types.Shot> {
    return this.client.put<Types.Shot>(`/shots/${id}`, body);
  }

  /**
   * Delete a shot
   * Delete a shot owned by the authenticated user
   */
  async deleteShot(id: number): Promise<void> {
    return this.client.delete<void>(`/shots/${id}`);
  }

  /**
   * Create a shot
   * Create a new shot (requires upload scope, user must be a player or team)
   */
  async createShot(body: FormData): Promise<void> {
    return this.client.postMultipart<void>("/shots", body);
  }

  /**
   * Create an attachment
   * Create an attachment for a shot (asynchronous processing)
   */
  async createAttachment(shot_id: number, body: FormData): Promise<void> {
    return this.client.postMultipart<void>(`/shots/${shot_id}/attachments`, body);
  }

  /**
   * Delete an attachment
   * Delete an attachment (must own the attachment)
   */
  async deleteAttachment(shot_id: number, id: number): Promise<void> {
    return this.client.delete<void>(`/shots/${shot_id}/attachments/${id}`);
  }

  /**
   * List user's projects
   * List the authenticated user's projects
   */
  async listUserProjects(params?: { page?: number; per_page?: number }): Promise<Types.Project[]> {
    return this.client.get<Types.Project[]>("/user/projects", {
      page: params?.page,
      per_page: params?.per_page,
    });
  }

  /**
   * Create a project
   * Create a new project
   */
  async createProject(body: Types.CreateProjectRequest): Promise<Types.Project> {
    return this.client.post<Types.Project>("/projects", body);
  }

  /**
   * Update a project
   * Update a project owned by the authenticated user
   */
  async updateProject(id: number, body: Types.UpdateProjectRequest): Promise<Types.Project> {
    return this.client.put<Types.Project>(`/projects/${id}`, body);
  }

  /**
   * Delete a project
   * Delete a project owned by the authenticated user
   */
  async deleteProject(id: number): Promise<Types.Project> {
    return this.client.delete<Types.Project>(`/projects/${id}`);
  }
}
