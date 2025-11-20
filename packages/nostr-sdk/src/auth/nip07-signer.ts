import type { Event, UnsignedEvent } from "../crypto/types";
import type { Signer } from "./signer";

/**
 * window.nostr interface (NIP-07)
 */
interface WindowNostr {
  getPublicKey(): Promise<string>;
  signEvent(event: UnsignedEvent): Promise<Event>;
  nip04?: {
    encrypt(pubkey: string, plaintext: string): Promise<string>;
    decrypt(pubkey: string, ciphertext: string): Promise<string>;
  };
  nip44?: {
    encrypt(pubkey: string, plaintext: string): Promise<string>;
    decrypt(pubkey: string, ciphertext: string): Promise<string>;
  };
}

declare global {
  interface Window {
    nostr?: WindowNostr;
  }
}

/**
 * Signer that uses browser extension (NIP-07)
 * Suitable for web applications
 */
export class Nip07Signer implements Signer {
  private nostr: WindowNostr;

  constructor() {
    const win = typeof window !== "undefined" ? window : undefined;
    if (!win || !win.nostr) {
      throw new Error("window.nostr is not available. Make sure a NIP-07 extension is installed.");
    }
    this.nostr = win.nostr;
  }

  async getPublicKey(): Promise<string> {
    return await this.nostr.getPublicKey();
  }

  async signEvent(event: UnsignedEvent): Promise<Event> {
    return await this.nostr.signEvent(event);
  }

  /**
   * NIP-04 encryption support (if available in extension)
   */
  get nip04() {
    if (!this.nostr.nip04) return undefined;

    const nip04Impl = this.nostr.nip04;
    return {
      encrypt: async (pubkey: string, plaintext: string): Promise<string> => {
        return await nip04Impl.encrypt(pubkey, plaintext);
      },
      decrypt: async (pubkey: string, ciphertext: string): Promise<string> => {
        return await nip04Impl.decrypt(pubkey, ciphertext);
      },
    };
  }

  /**
   * NIP-44 encryption support (if available in extension)
   */
  get nip44() {
    if (!this.nostr.nip44) return undefined;

    const nip44Impl = this.nostr.nip44;
    return {
      encrypt: async (pubkey: string, plaintext: string): Promise<string> => {
        return await nip44Impl.encrypt(pubkey, plaintext);
      },
      decrypt: async (pubkey: string, ciphertext: string): Promise<string> => {
        return await nip44Impl.decrypt(pubkey, ciphertext);
      },
    };
  }

  /**
   * Check if NIP-07 is available
   */
  static isAvailable(): boolean {
    const win = typeof window !== "undefined" ? window : undefined;
    return !!win && !!win.nostr;
  }
}
