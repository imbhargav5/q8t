// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/provisioning.yaml

import type { ProvisioningHttpClient } from "../src/auth";
import type * as Types from "./types";

export class ProvisioningApi {
  private client: ProvisioningHttpClient;

  constructor(client: ProvisioningHttpClient) {
    this.client = client;
  }

  /**
   * List users
   */
  async listUsers(queryParams?: {
    pending?: boolean;
    user_ids?: string[];
    prefix?: string;
    sub_account_id?: string;
  }): Promise<Types.UsersResponse> {
    return this.client.get<Types.UsersResponse>("/users", queryParams);
  }

  /**
   * Create user
   */
  async createUser(body: Types.CreateUserRequest): Promise<Types.User> {
    return this.client.post<Types.User>("/users", body);
  }

  /**
   * Get user
   */
  async getUser(user_id: string): Promise<Types.User> {
    return this.client.get<Types.User>(`/users/${user_id}`);
  }

  /**
   * Update user
   */
  async updateUser(user_id: string, body: Types.UpdateUserRequest): Promise<Types.User> {
    return this.client.put<Types.User>(`/users/${user_id}`, body);
  }

  /**
   * Delete user
   */
  async deleteUser(user_id: string): Promise<Types.MessageResponse> {
    return this.client.delete<Types.MessageResponse>(`/users/${user_id}`);
  }

  /**
   * List user groups
   */
  async listUserGroups(): Promise<Types.UserGroupsResponse> {
    return this.client.get<Types.UserGroupsResponse>("/user_groups");
  }

  /**
   * Create user group
   */
  async createUserGroup(body: Types.CreateUserGroupRequest): Promise<Types.UserGroup> {
    return this.client.post<Types.UserGroup>("/user_groups", body);
  }

  /**
   * Get user group
   */
  async getUserGroup(group_id: string): Promise<Types.UserGroup> {
    return this.client.get<Types.UserGroup>(`/user_groups/${group_id}`);
  }

  /**
   * Update user group
   */
  async updateUserGroup(
    group_id: string,
    body: Types.CreateUserGroupRequest,
  ): Promise<Types.UserGroup> {
    return this.client.put<Types.UserGroup>(`/user_groups/${group_id}`, body);
  }

  /**
   * Delete user group
   */
  async deleteUserGroup(group_id: string): Promise<Types.MessageResponse> {
    return this.client.delete<Types.MessageResponse>(`/user_groups/${group_id}`);
  }

  /**
   * Add user to group
   */
  async addUserToGroup(group_id: string, user_id: string): Promise<Types.User> {
    return this.client.post<Types.User>(`/user_groups/${group_id}/users/${user_id}`);
  }

  /**
   * Remove user from group
   */
  async removeUserFromGroup(group_id: string, user_id: string): Promise<Types.MessageResponse> {
    return this.client.delete<Types.MessageResponse>(`/user_groups/${group_id}/users/${user_id}`);
  }

  /**
   * List sub-accounts
   */
  async listSubAccounts(queryParams?: {
    enabled?: boolean;
    ids?: string[];
    prefix?: string;
  }): Promise<Types.SubAccountsResponse> {
    return this.client.get<Types.SubAccountsResponse>("/sub_accounts", queryParams);
  }

  /**
   * Create sub-account
   */
  async createSubAccount(body: Types.CreateSubAccountRequest): Promise<Types.SubAccount> {
    return this.client.post<Types.SubAccount>("/sub_accounts", body);
  }

  /**
   * Get sub-account
   */
  async getSubAccount(sub_account_id: string): Promise<Types.SubAccount> {
    return this.client.get<Types.SubAccount>(`/sub_accounts/${sub_account_id}`);
  }

  /**
   * Update sub-account
   */
  async updateSubAccount(
    sub_account_id: string,
    body: Types.UpdateSubAccountRequest,
  ): Promise<Types.SubAccount> {
    return this.client.put<Types.SubAccount>(`/sub_accounts/${sub_account_id}`, body);
  }

  /**
   * Delete sub-account
   */
  async deleteSubAccount(sub_account_id: string): Promise<Types.MessageResponse> {
    return this.client.delete<Types.MessageResponse>(`/sub_accounts/${sub_account_id}`);
  }

  /**
   * List access keys
   */
  async listAccessKeys(sub_account_id: string): Promise<Types.AccessKeysResponse> {
    return this.client.get<Types.AccessKeysResponse>(`/sub_accounts/${sub_account_id}/access_keys`);
  }

  /**
   * Generate access key
   */
  async generateAccessKey(
    sub_account_id: string,
    body: Types.GenerateAccessKeyRequest,
  ): Promise<Types.AccessKey> {
    return this.client.post<Types.AccessKey>(`/sub_accounts/${sub_account_id}/access_keys`, body);
  }

  /**
   * Update access key
   */
  async updateAccessKey(
    sub_account_id: string,
    key: string,
    body: Types.UpdateAccessKeyRequest,
  ): Promise<Types.AccessKey> {
    return this.client.put<Types.AccessKey>(
      `/sub_accounts/${sub_account_id}/access_keys/${key}`,
      body,
    );
  }

  /**
   * Delete access key
   */
  async deleteAccessKey(sub_account_id: string, key: string): Promise<Types.MessageResponse> {
    return this.client.delete<Types.MessageResponse>(
      `/sub_accounts/${sub_account_id}/access_keys/${key}`,
    );
  }
}
