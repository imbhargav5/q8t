import type { WhatsAppConfig } from "./config";

export class TokenManager {
  private config: WhatsAppConfig;

  constructor(config: WhatsAppConfig) {
    this.config = config;
  }

  getAccessToken(): string {
    return this.config.accessToken;
  }

  setAccessToken(token: string): void {
    this.config.accessToken = token;
  }

  getAuthorizationHeader(): string {
    return `Bearer ${this.getAccessToken()}`;
  }
}
