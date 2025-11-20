import { DRIBBBLE_API_BASE_URL } from "./config";

export interface DribbbleClientConfig {
  accessToken: string;
}

export interface HttpClient {
  get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T>;
  post<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
  postMultipart<T>(path: string, formData: FormData): Promise<T>;
  put<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

export function createDribbbleClient(config: DribbbleClientConfig): HttpClient {
  const accessToken = config.accessToken;

  async function makeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
    isMultipart = false,
  ): Promise<T> {
    let url = `${DRIBBBLE_API_BASE_URL}${path}`;

    const searchParams = new URLSearchParams();

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      }
    }

    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Don't set Content-Type for multipart/form-data (browser will set it with boundary)
    if (!isMultipart && body && (method === "POST" || method === "PUT")) {
      headers["Content-Type"] = "application/json";
    }

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    if (body && (method === "POST" || method === "PUT")) {
      if (isMultipart) {
        requestOptions.body = body as FormData;
      } else {
        requestOptions.body = JSON.stringify(body);
      }
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Dribbble API error (${response.status}): ${errorText}`);
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return undefined as T;
    }

    // Handle 202 Accepted with Location header (async processing)
    if (response.status === 202) {
      const location = response.headers.get("Location");
      return { location } as T;
    }

    return response.json() as Promise<T>;
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

    postMultipart<T>(path: string, formData: FormData): Promise<T> {
      return makeRequest<T>("POST", path, formData, undefined, true);
    },

    put<T>(path: string, body?: unknown): Promise<T> {
      return makeRequest<T>("PUT", path, body);
    },

    delete<T>(path: string): Promise<T> {
      return makeRequest<T>("DELETE", path);
    },
  };
}
