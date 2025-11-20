import { getEventHash } from "../crypto/signing";
import type { Event, UnsignedEvent } from "../crypto/types";

/**
 * NIP-13: Proof of Work
 * Implements mining and validation of proof-of-work for events
 */

/**
 * Count leading zero bits in a hex string
 */
function countLeadingZeroBits(hex: string): number {
  let count = 0;
  for (let i = 0; i < hex.length; i++) {
    const nibble = Number.parseInt(hex[i], 16);
    if (nibble === 0) {
      count += 4;
    } else {
      count += Math.clz32(nibble) - 28; // clz32 counts leading zeros in 32-bit
      break;
    }
  }
  return count;
}

/**
 * Get proof-of-work difficulty of an event
 * @param event - Event to check
 * @returns Number of leading zero bits in the event ID
 */
export function getPowDifficulty(event: Event | { id: string }): number {
  return countLeadingZeroBits(event.id);
}

/**
 * Get target difficulty from nonce tag
 * @param event - Event to check
 * @returns Target difficulty specified in nonce tag, or 0 if not found
 */
export function getTargetDifficulty(event: Event | { tags: string[][] }): number {
  const nonceTag = event.tags.find((tag) => tag[0] === "nonce");
  if (!nonceTag || !nonceTag[2]) return 0;

  const target = Number.parseInt(nonceTag[2], 10);
  return Number.isNaN(target) ? 0 : target;
}

/**
 * Validate proof-of-work
 * @param event - Event to validate
 * @param minDifficulty - Minimum required difficulty
 * @returns true if event meets the difficulty requirement
 */
export function validatePow(event: Event, minDifficulty: number): boolean {
  const difficulty = getPowDifficulty(event);
  return difficulty >= minDifficulty;
}

/**
 * Mine proof-of-work for an event
 * @param event - Unsigned event to mine
 * @param targetDifficulty - Target number of leading zero bits
 * @param maxIterations - Maximum number of iterations (default: no limit)
 * @returns Event with nonce tag, or null if max iterations reached
 */
export function minePow(
  event: UnsignedEvent,
  targetDifficulty: number,
  maxIterations = Number.POSITIVE_INFINITY,
): UnsignedEvent | null {
  let nonce = 0;

  // Remove existing nonce tag if any
  const tags = event.tags.filter((tag) => tag[0] !== "nonce");

  while (nonce < maxIterations) {
    const eventWithNonce: UnsignedEvent = {
      ...event,
      tags: [...tags, ["nonce", nonce.toString(), targetDifficulty.toString()]],
    };

    const hash = getEventHash(eventWithNonce);
    const difficulty = countLeadingZeroBits(hash);

    if (difficulty >= targetDifficulty) {
      return eventWithNonce;
    }

    nonce++;
  }

  return null;
}

/**
 * Mine proof-of-work asynchronously (yields to event loop)
 * Useful for browser environments to avoid blocking
 */
export async function minePowAsync(
  event: UnsignedEvent,
  targetDifficulty: number,
  batchSize = 10000,
): Promise<UnsignedEvent> {
  let nonce = 0;
  const tags = event.tags.filter((tag) => tag[0] !== "nonce");

  while (true) {
    for (let i = 0; i < batchSize; i++) {
      const eventWithNonce: UnsignedEvent = {
        ...event,
        tags: [...tags, ["nonce", nonce.toString(), targetDifficulty.toString()]],
      };

      const hash = getEventHash(eventWithNonce);
      const difficulty = countLeadingZeroBits(hash);

      if (difficulty >= targetDifficulty) {
        return eventWithNonce;
      }

      nonce++;
    }

    // Yield to event loop
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}
