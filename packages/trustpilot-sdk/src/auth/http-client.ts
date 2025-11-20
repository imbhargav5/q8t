export interface HttpClientOptions {
  baseUrl?: string;
}

export interface HttpClient {
  get<T>(path: string, queryParams?: Record<string, any>, options?: HttpClientOptions): Promise<T>;
  post<T>(
    path: string,
    body?: any,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T>;
  put<T>(
    path: string,
    body?: any,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T>;
  patch<T>(
    path: string,
    body?: any,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T>;
  delete<T>(
    path: string,
    queryParams?: Record<string, any>,
    options?: HttpClientOptions,
  ): Promise<T>;
}

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorJson.error || errorText;
    } catch {
      if (errorText) {
        errorMessage = errorText;
      }
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

export function buildUrl(baseUrl: string, path: string, queryParams?: Record<string, any>): string {
  const url = new URL(path, baseUrl);

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          for (const item of value) {
            url.searchParams.append(key, String(item));
          }
        } else {
          url.searchParams.append(key, String(value));
        }
      }
    }
  }

  return url.toString();
}
