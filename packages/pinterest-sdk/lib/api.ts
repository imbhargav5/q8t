// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class PinterestApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get user account info
   */
  async getUserAccount(): Promise<Types.UserAccount> {
    return this.client.get<Types.UserAccount>("/user_account");
  }

  /**
   * List boards
   */
  async listBoards({ bookmark?: string, page_size?: number, privacy?: string }: { bookmark?: string; page_size?: number; privacy?: string } = {}): Promise<Types.BoardsListResponse> {
    return this.client.get<Types.BoardsListResponse>("/boards", {
      "bookmark": bookmark,
      "page_size": page_size,
      "privacy": privacy,
    });
  }

  /**
   * List pins
   */
  async listPins({ bookmark?: string, page_size?: number, pin_filter?: string }: { bookmark?: string; page_size?: number; pin_filter?: string } = {}): Promise<Types.PinsListResponse> {
    return this.client.get<Types.PinsListResponse>("/pins", {
      "bookmark": bookmark,
      "page_size": page_size,
      "pin_filter": pin_filter,
    });
  }

  /**
   * Create a pin
   */
  async createPin(body: Types.PinCreate): Promise<Types.Pin> {
    return this.client.post<Types.Pin>("/pins", body);
  }

}