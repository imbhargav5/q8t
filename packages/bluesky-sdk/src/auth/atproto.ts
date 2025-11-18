import { BLUESKY_ENDPOINTS, type BlueskyAuthConfig } from "./config";

export interface SessionData {
  did: string;
  handle: string;
  email?: string;
  accessJwt: string;
  refreshJwt: string;
}

export async function createSession(config: BlueskyAuthConfig): Promise<SessionData> {
  const response = await fetch(BLUESKY_ENDPOINTS.createSession, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: config.identifier,
      password: config.password,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create session: ${error}`);
  }

  return response.json();
}

export async function refreshSession(refreshJwt: string): Promise<SessionData> {
  const response = await fetch(BLUESKY_ENDPOINTS.refreshSession, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshJwt}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to refresh session: ${error}`);
  }

  return response.json();
}

export async function deleteSession(refreshJwt: string): Promise<void> {
  const response = await fetch(BLUESKY_ENDPOINTS.deleteSession, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshJwt}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to delete session: ${error}`);
  }
}
