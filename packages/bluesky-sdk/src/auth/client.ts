import { BLUESKY_API_BASE_URL, type BlueskyAuthConfig } from "./config";
import { createSession, refreshSession, type SessionData } from "./atproto";

export interface BlueskyClientConfig {
  session?: SessionData;
  identifier?: string;
  password?: string;
  onSessionRefresh?: (newSession: SessionData) => void;
}

export interface HttpClient {
  get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
  put<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

export async function createBlueskyClient(config: BlueskyClientConfig): Promise<HttpClient> {
  let session: SessionData;

  if (config.session) {
    session = config.session;
  } else if (config.identifier && config.password) {
    session = await createSession({
      identifier: config.identifier,
      password: config.password,
    });
  } else {
    throw new Error("Either session or identifier/password must be provided");
  }

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    let url = `${BLUESKY_API_BASE_URL}${path}`;

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
      Authorization: `Bearer ${session.accessJwt}`,
      "Content-Type": "application/json",
    };

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    if (body && (method === "POST" || method === "PUT")) {
      requestOptions.body = JSON.stringify(body);
    }

    let response = await fetch(url, requestOptions);

    // Handle token refresh on 401
    if (response.status === 401) {
      try {
        const newSession = await refreshSession(session.refreshJwt);
        session = newSession;

        if (config.onSessionRefresh) {
          config.onSessionRefresh(newSession);
        }

        // Retry the request with new token
        headers.Authorization = `Bearer ${session.accessJwt}`;
        response = await fetch(url, requestOptions);
      } catch {
        throw new Error("Session refresh failed");
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Bluesky API error (${response.status}): ${errorText}`);
    }

    return response.json();
  }

  return {
    get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
      return makeRequest<T>("GET", path, undefined, params);
    },

    post<T>(path: string, body?: unknown): Promise<T> {
      return makeRequest<T>("POST", path, body);
    },

    put<T>(path: string, body?: unknown): Promise<T> {
      return makeRequest<T>("PUT", path, body);
    },

    delete<T>(path: string): Promise<T> {
      return makeRequest<T>("DELETE", path);
    },
  };
}
