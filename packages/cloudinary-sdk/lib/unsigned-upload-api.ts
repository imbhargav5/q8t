// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/unsigned-upload.yaml

import type { UnsignedHttpClient } from "../src/auth";
import type * as Types from "./types";

export class UnsignedUploadApi {
  private client: UnsignedHttpClient;

  constructor(client: UnsignedHttpClient) {
    this.client = client;
  }

  /**
   * Upload without signature
   */
  async unsignedUpload(body: Types.UnsignedUploadRequest): Promise<Types.UploadResponse> {
    return this.client.post<Types.UploadResponse>("/upload", body);
  }
}
