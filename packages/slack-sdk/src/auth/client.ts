import { SLACK_API_BASE_URL } from "./config";

export interface SlackClientConfig {
  accessToken: string;
  onTokenRefresh?: (newTokens: { accessToken: string }) => void;
}

export interface HttpClient {
  get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
  put<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
  patch<T>(path: string, body?: unknown): Promise<T>;
}

export function createSlackClient(config: SlackClientConfig): HttpClient {
  const accessToken = config.accessToken;

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    let url = `${SLACK_API_BASE_URL}${path}`;

    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      }
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  return {
    get: <T>(path: string, params?: Record<string, string | number | undefined>) =>
      makeRequest<T>("GET", path, undefined, params),
    post: <T>(path: string, body?: unknown) => makeRequest<T>("POST", path, body),
    put: <T>(path: string, body?: unknown) => makeRequest<T>("PUT", path, body),
    delete: <T>(path: string) => makeRequest<T>("DELETE", path),
    patch: <T>(path: string, body?: unknown) => makeRequest<T>("PATCH", path, body),
  };
}
