/**
 * NIP-05: Mapping Nostr keys to DNS-based internet identifiers
 * Allows verification of user@domain.com identifiers
 */

export interface Nip05Profile {
  names: Record<string, string>;
  relays?: Record<string, string[]>;
}

/**
 * Query a NIP-05 identifier and get the profile
 * @param identifier - user@domain.com or _@domain.com
 * @returns Profile data or null if not found
 */
export async function queryProfile(
  identifier: string,
): Promise<{ pubkey: string; relays?: string[] } | null> {
  const [name, domain] = identifier.split("@");
  if (!domain) return null;

  const url = `https://${domain}/.well-known/nostr.json?name=${encodeURIComponent(name)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = (await response.json()) as Nip05Profile;
    const pubkey = data.names[name];
    if (!pubkey) return null;

    return {
      pubkey,
      relays: data.relays?.[pubkey],
    };
  } catch {
    return null;
  }
}

/**
 * Verify that a pubkey matches a NIP-05 identifier
 * @param pubkey - Public key to verify
 * @param nip05 - NIP-05 identifier (user@domain.com)
 * @returns true if verified, false otherwise
 */
export async function verifyNip05(pubkey: string, nip05: string): Promise<boolean> {
  const profile = await queryProfile(nip05);
  if (!profile) return false;

  return profile.pubkey.toLowerCase() === pubkey.toLowerCase();
}

/**
 * Extract domain from NIP-05 identifier
 */
export function extractDomain(identifier: string): string | null {
  const parts = identifier.split("@");
  return parts.length === 2 ? parts[1] : null;
}

/**
 * Extract name from NIP-05 identifier
 */
export function extractName(identifier: string): string | null {
  const parts = identifier.split("@");
  return parts.length === 2 ? parts[0] : null;
}

/**
 * Validate NIP-05 identifier format
 */
export function isValidNip05(identifier: string): boolean {
  const parts = identifier.split("@");
  if (parts.length !== 2) return false;

  const [name, domain] = parts;
  if (!name || !domain) return false;

  // Basic domain validation
  if (!domain.includes(".")) return false;

  return true;
}
