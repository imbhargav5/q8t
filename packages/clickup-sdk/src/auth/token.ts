export interface TokenManager {
  getAuthorizationHeader(): string;
}

export class PersonalTokenManager implements TokenManager {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  getAuthorizationHeader(): string {
    return this.token;
  }
}

export class OAuth2TokenManager implements TokenManager {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  getAuthorizationHeader(): string {
    return `Bearer ${this.accessToken}`;
  }

  updateAccessToken(newAccessToken: string): void {
    this.accessToken = newAccessToken;
  }
}
