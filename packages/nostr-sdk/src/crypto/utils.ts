import { getPublicKey } from "./keys";
import { getEventHash, signEvent } from "./signing";
import type { Event, UnsignedEvent } from "./types";
import { now } from "./validation";

/**
 * Create an unsigned event
 */
export function createEvent(
  pubkey: string,
  kind: number,
  content: string,
  tags: string[][] = [],
  created_at?: number,
): UnsignedEvent {
  return {
    pubkey,
    created_at: created_at ?? now(),
    kind,
    tags,
    content,
  };
}

/**
 * Finalize and sign an event
 */
export async function finishEvent(
  event: UnsignedEvent,
  secretKey: Uint8Array | string,
): Promise<Event> {
  const id = getEventHash(event);
  const sig = await signEvent(event, secretKey);

  return {
    ...event,
    id,
    sig,
  };
}

/**
 * Create and sign an event in one step
 */
export async function createAndSignEvent(
  secretKey: Uint8Array | string,
  kind: number,
  content: string,
  tags: string[][] = [],
  created_at?: number,
): Promise<Event> {
  const pubkey = getPublicKey(secretKey);
  const unsigned = createEvent(pubkey, kind, content, tags, created_at);
  return await finishEvent(unsigned, secretKey);
}

/**
 * Extract referenced event IDs from tags
 */
export function getReferencedEventIds(event: Event): string[] {
  return event.tags.filter((tag) => tag[0] === "e").map((tag) => tag[1]);
}

/**
 * Extract referenced pubkeys from tags
 */
export function getReferencedPubkeys(event: Event): string[] {
  return event.tags.filter((tag) => tag[0] === "p").map((tag) => tag[1]);
}

/**
 * Extract hashtags from tags
 */
export function getHashtags(event: Event): string[] {
  return event.tags.filter((tag) => tag[0] === "t").map((tag) => tag[1]);
}

/**
 * Get relay hints from event
 */
export function getRelayHints(event: Event): string[] {
  return event.tags.filter((tag) => tag[0] === "r").map((tag) => tag[1]);
}

/**
 * Add relay hint to tag
 */
export function addRelayHint(tag: string[], relayUrl: string): string[] {
  if (tag.length >= 3) return tag;
  return [...tag, relayUrl];
}

/**
 * Generate random subscription ID
 */
export function generateSubscriptionId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Deduplicate events by ID
 */
export function deduplicateEvents(events: Event[]): Event[] {
  const seen = new Set<string>();
  return events.filter((event) => {
    if (seen.has(event.id)) return false;
    seen.add(event.id);
    return true;
  });
}

/**
 * Sort events by created_at (newest first)
 */
export function sortEventsByDate(events: Event[]): Event[] {
  return [...events].sort((a, b) => b.created_at - a.created_at);
}
