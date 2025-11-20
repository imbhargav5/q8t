import { DEFAULT_API_VERSION } from "./config";

export interface SalesforceClientConfig {
  instanceUrl: string;
  accessToken: string;
  apiVersion?: string;
  onTokenRefresh?: (newToken: string) => void;
}

export interface HttpClient {
  get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T>;
  post<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
  put<T>(path: string, body?: unknown): Promise<T>;
  patch<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

export function createSalesforceClient(config: SalesforceClientConfig): HttpClient {
  let accessToken = config.accessToken;
  const apiVersion = config.apiVersion || DEFAULT_API_VERSION;

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    // Construct full URL
    let url = `${config.instanceUrl}${path}`;

    // Add query parameters
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

    if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Salesforce API error (${response.status}): ${errorText}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return { success: true } as T;
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json() as Promise<T>;
    }

    // Return text for non-JSON responses (like CSV)
    return response.text() as Promise<T>;
  }

  return {
    get<T>(
      path: string,
      params?: Record<string, string | number | boolean | undefined>,
    ): Promise<T> {
      return makeRequest<T>("GET", path, undefined, params);
    },

    post<T>(
      path: string,
      body?: unknown,
      params?: Record<string, string | number | boolean | undefined>,
    ): Promise<T> {
      return makeRequest<T>("POST", path, body, params);
    },

    put<T>(path: string, body?: unknown): Promise<T> {
      return makeRequest<T>("PUT", path, body);
    },

    patch<T>(path: string, body?: unknown): Promise<T> {
      return makeRequest<T>("PATCH", path, body);
    },

    delete<T>(path: string): Promise<T> {
      return makeRequest<T>("DELETE", path);
    },
  };
}
