import { bech32, hex } from "@scure/base";

/**
 * NIP-19: bech32-encoded entities
 * Provides encoding/decoding for npub, nsec, note, nprofile, nevent, naddr, nrelay
 */

const Bech32MaxSize = 5000;

/**
 * Encode public key to npub
 */
export function npubEncode(pubkey: string): string {
  const data = hex.decode(pubkey);
  const words = bech32.toWords(data);
  return bech32.encode("npub", words, Bech32MaxSize);
}

/**
 * Encode private key to nsec
 */
export function nsecEncode(privateKey: Uint8Array | string): string {
  const data = typeof privateKey === "string" ? hex.decode(privateKey) : privateKey;
  const words = bech32.toWords(data);
  return bech32.encode("nsec", words, Bech32MaxSize);
}

/**
 * Encode event ID to note
 */
export function noteEncode(eventId: string): string {
  const data = hex.decode(eventId);
  const words = bech32.toWords(data);
  return bech32.encode("note", words, Bech32MaxSize);
}

/**
 * Profile pointer with relay hints
 */
export interface ProfilePointer {
  pubkey: string;
  relays?: string[];
}

/**
 * Encode profile pointer to nprofile
 */
export function nprofileEncode(profile: ProfilePointer): string {
  const data = encodeTLV({
    0: [hex.decode(profile.pubkey)],
    1: profile.relays?.map((url) => new TextEncoder().encode(url)),
  });
  const words = bech32.toWords(data);
  return bech32.encode("nprofile", words, Bech32MaxSize);
}

/**
 * Event pointer with relay hints
 */
export interface EventPointer {
  id: string;
  relays?: string[];
  author?: string;
  kind?: number;
}

/**
 * Encode event pointer to nevent
 */
export function neventEncode(pointer: EventPointer): string {
  const tlv: Record<number, Uint8Array[]> = {
    0: [hex.decode(pointer.id)],
  };

  if (pointer.relays) {
    tlv[1] = pointer.relays.map((url) => new TextEncoder().encode(url));
  }

  if (pointer.author) {
    tlv[2] = [hex.decode(pointer.author)];
  }

  if (pointer.kind !== undefined) {
    const kindBytes = new Uint8Array(4);
    new DataView(kindBytes.buffer).setUint32(0, pointer.kind, false);
    tlv[3] = [kindBytes];
  }

  const data = encodeTLV(tlv);
  const words = bech32.toWords(data);
  return bech32.encode("nevent", words, Bech32MaxSize);
}

/**
 * Address pointer for parameterized replaceable events
 */
export interface AddressPointer {
  identifier: string;
  pubkey: string;
  kind: number;
  relays?: string[];
}

/**
 * Encode address pointer to naddr
 */
export function naddrEncode(pointer: AddressPointer): string {
  const tlv: Record<number, Uint8Array[]> = {
    0: [new TextEncoder().encode(pointer.identifier)],
    2: [hex.decode(pointer.pubkey)],
  };

  const kindBytes = new Uint8Array(4);
  new DataView(kindBytes.buffer).setUint32(0, pointer.kind, false);
  tlv[3] = [kindBytes];

  if (pointer.relays) {
    tlv[1] = pointer.relays.map((url) => new TextEncoder().encode(url));
  }

  const data = encodeTLV(tlv);
  const words = bech32.toWords(data);
  return bech32.encode("naddr", words, Bech32MaxSize);
}

/**
 * Encode relay URL to nrelay
 */
export function nrelayEncode(url: string): string {
  const data = new TextEncoder().encode(url);
  const words = bech32.toWords(data);
  return bech32.encode("nrelay", words, Bech32MaxSize);
}

/**
 * Decode result type
 */
export type DecodeResult =
  | { type: "npub"; data: string }
  | { type: "nsec"; data: string }
  | { type: "note"; data: string }
  | { type: "nprofile"; data: ProfilePointer }
  | { type: "nevent"; data: EventPointer }
  | { type: "naddr"; data: AddressPointer }
  | { type: "nrelay"; data: string };

/**
 * Decode any bech32-encoded nostr entity
 */
export function decode(nip19: string): DecodeResult {
  const { prefix, words } = bech32.decode(nip19 as `${string}1${string}`, Bech32MaxSize);
  const data = bech32.fromWords(words);

  switch (prefix) {
    case "npub":
      return { type: "npub", data: hex.encode(data) };

    case "nsec":
      return { type: "nsec", data: hex.encode(data) };

    case "note":
      return { type: "note", data: hex.encode(data) };

    case "nprofile": {
      const tlv = decodeTLV(data);
      if (!tlv[0]?.[0]) throw new Error("Missing pubkey in nprofile");

      return {
        type: "nprofile",
        data: {
          pubkey: hex.encode(tlv[0][0]),
          relays: tlv[1]?.map((r) => new TextDecoder().decode(r)),
        },
      };
    }

    case "nevent": {
      const tlv = decodeTLV(data);
      if (!tlv[0]?.[0]) throw new Error("Missing event ID in nevent");

      const pointer: EventPointer = {
        id: hex.encode(tlv[0][0]),
        relays: tlv[1]?.map((r) => new TextDecoder().decode(r)),
      };

      if (tlv[2]?.[0]) {
        pointer.author = hex.encode(tlv[2][0]);
      }

      if (tlv[3]?.[0]) {
        pointer.kind = new DataView(tlv[3][0].buffer).getUint32(0, false);
      }

      return { type: "nevent", data: pointer };
    }

    case "naddr": {
      const tlv = decodeTLV(data);
      if (!tlv[0]?.[0]) throw new Error("Missing identifier in naddr");
      if (!tlv[2]?.[0]) throw new Error("Missing pubkey in naddr");
      if (!tlv[3]?.[0]) throw new Error("Missing kind in naddr");

      return {
        type: "naddr",
        data: {
          identifier: new TextDecoder().decode(tlv[0][0]),
          pubkey: hex.encode(tlv[2][0]),
          kind: new DataView(tlv[3][0].buffer).getUint32(0, false),
          relays: tlv[1]?.map((r) => new TextDecoder().decode(r)),
        },
      };
    }

    case "nrelay":
      return { type: "nrelay", data: new TextDecoder().decode(data) };

    default:
      throw new Error(`Unknown prefix: ${prefix}`);
  }
}

/**
 * TLV (Type-Length-Value) encoding helper
 */
function encodeTLV(tlv: Record<number, Uint8Array[] | undefined>): Uint8Array {
  const entries: Uint8Array[] = [];

  for (const [type, values] of Object.entries(tlv)) {
    if (!values) continue;

    for (const value of values) {
      const entry = new Uint8Array(1 + 1 + value.length);
      entry[0] = Number.parseInt(type, 10);
      entry[1] = value.length;
      entry.set(value, 2);
      entries.push(entry);
    }
  }

  const totalLength = entries.reduce((sum, e) => sum + e.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const entry of entries) {
    result.set(entry, offset);
    offset += entry.length;
  }

  return result;
}

/**
 * TLV (Type-Length-Value) decoding helper
 */
function decodeTLV(data: Uint8Array): Record<number, Uint8Array[]> {
  const result: Record<number, Uint8Array[]> = {};
  let i = 0;

  while (i < data.length) {
    const type = data[i];
    const length = data[i + 1];
    const value = data.slice(i + 2, i + 2 + length);

    if (!result[type]) {
      result[type] = [];
    }
    result[type].push(value);

    i += 2 + length;
  }

  return result;
}
