// Token management for Monday.com API

export interface TokenManager {
  getAuthorizationHeader(): string;
  getToken(): string;
}

export class PersonalTokenManager implements TokenManager {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  getAuthorizationHeader(): string {
    return this.token;
  }

  getToken(): string {
    return this.token;
  }
}

export class OAuthTokenManager implements TokenManager {
  private accessToken: string;
  private onTokenRefresh?: (newToken: string) => void;

  constructor(accessToken: string, onTokenRefresh?: (newToken: string) => void) {
    this.accessToken = accessToken;
    this.onTokenRefresh = onTokenRefresh;
  }

  getAuthorizationHeader(): string {
    return this.accessToken;
  }

  getToken(): string {
    return this.accessToken;
  }

  updateToken(newToken: string): void {
    this.accessToken = newToken;
    if (this.onTokenRefresh) {
      this.onTokenRefresh(newToken);
    }
  }
}

export class ShortLivedTokenManager implements TokenManager {
  private token: string;
  private expiresAt: number;

  constructor(token: string, validityInMinutes = 1) {
    this.token = token;
    this.expiresAt = Date.now() + validityInMinutes * 60 * 1000;
  }

  getAuthorizationHeader(): string {
    if (Date.now() > this.expiresAt) {
      throw new Error("Short-lived token has expired. Please obtain a new token.");
    }
    return this.token;
  }

  getToken(): string {
    return this.token;
  }

  isExpired(): boolean {
    return Date.now() > this.expiresAt;
  }
}
