import { isValidPublicKey } from "./keys";
import { getEventHash, verifySignature } from "./signing";
import type { Event, Filter, UnsignedEvent } from "./types";

/**
 * Validate event structure and signature
 */
export async function validateEvent(event: Event): Promise<boolean> {
  // Check required fields
  if (!event.id || !event.pubkey || !event.sig) return false;
  if (typeof event.created_at !== "number") return false;
  if (typeof event.kind !== "number") return false;
  if (!Array.isArray(event.tags)) return false;
  if (typeof event.content !== "string") return false;

  // Validate pubkey format
  if (!isValidPublicKey(event.pubkey)) return false;

  // Validate tags structure
  for (const tag of event.tags) {
    if (!Array.isArray(tag)) return false;
    if (tag.length === 0) return false;
    for (const item of tag) {
      if (typeof item !== "string") return false;
    }
  }

  // Verify ID matches hash
  const hash = getEventHash(event);
  if (hash !== event.id) return false;

  // Verify signature
  return await verifySignature(event);
}

/**
 * Check if event matches filter
 */
export function matchFilter(filter: Filter, event: Event): boolean {
  // Check IDs
  if (filter.ids && !filter.ids.includes(event.id)) {
    return false;
  }

  // Check authors
  if (filter.authors && !filter.authors.includes(event.pubkey)) {
    return false;
  }

  // Check kinds
  if (filter.kinds && !filter.kinds.includes(event.kind)) {
    return false;
  }

  // Check since
  if (filter.since !== undefined && event.created_at < filter.since) {
    return false;
  }

  // Check until
  if (filter.until !== undefined && event.created_at > filter.until) {
    return false;
  }

  // Check tag filters
  for (const [key, values] of Object.entries(filter)) {
    if (key.startsWith("#") && values) {
      const tagName = key.slice(1);
      const eventTagValues = event.tags
        .filter((tag) => tag[0] === tagName)
        .map((tag: string[]) => tag[1]);

      const hasMatch = values.some((value: string) => eventTagValues.includes(value));
      if (!hasMatch) return false;
    }
  }

  return true;
}

/**
 * Check if event matches any of the filters
 */
export function matchFilters(filters: Filter[], event: Event): boolean {
  return filters.some((filter) => matchFilter(filter, event));
}

/**
 * Validate filter structure
 */
export function validateFilter(filter: Filter): boolean {
  // Check IDs format
  if (filter.ids) {
    if (!Array.isArray(filter.ids)) return false;
    for (const id of filter.ids) {
      if (typeof id !== "string" || id.length !== 64) return false;
    }
  }

  // Check authors format
  if (filter.authors) {
    if (!Array.isArray(filter.authors)) return false;
    for (const author of filter.authors) {
      if (!isValidPublicKey(author)) return false;
    }
  }

  // Check kinds format
  if (filter.kinds) {
    if (!Array.isArray(filter.kinds)) return false;
    for (const kind of filter.kinds) {
      if (typeof kind !== "number") return false;
    }
  }

  // Check time bounds
  if (filter.since !== undefined && typeof filter.since !== "number") {
    return false;
  }
  if (filter.until !== undefined && typeof filter.until !== "number") {
    return false;
  }

  // Check limit
  if (filter.limit !== undefined && typeof filter.limit !== "number") {
    return false;
  }

  return true;
}

/**
 * Get current Unix timestamp in seconds
 */
export function now(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Check if event is expired (NIP-40)
 */
export function isExpired(event: Event): boolean {
  const expirationTag = event.tags.find((tag) => tag[0] === "expiration");
  if (!expirationTag || !expirationTag[1]) return false;

  const expiration = Number.parseInt(expirationTag[1], 10);
  return now() > expiration;
}

/**
 * Get event kind category
 */
export function getEventKindCategory(kind: number): string {
  if (kind >= 0 && kind < 1000) return "regular";
  if (kind >= 1000 && kind < 10000) return "regular";
  if (kind >= 10000 && kind < 20000) return "replaceable";
  if (kind >= 20000 && kind < 30000) return "ephemeral";
  if (kind >= 30000 && kind < 40000) return "parameterized-replaceable";
  return "unknown";
}

/**
 * Check if event is replaceable
 */
export function isReplaceable(event: Event): boolean {
  const category = getEventKindCategory(event.kind);
  return category === "replaceable" || category === "parameterized-replaceable";
}

/**
 * Get replaceable event coordinate (for parameterized replaceable events)
 */
export function getReplaceableCoordinate(event: Event): string | null {
  if (getEventKindCategory(event.kind) !== "parameterized-replaceable") {
    return null;
  }

  const dTag = event.tags.find((tag) => tag[0] === "d");
  const identifier = dTag ? dTag[1] : "";

  return `${event.kind}:${event.pubkey}:${identifier}`;
}
