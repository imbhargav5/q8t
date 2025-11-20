import { getPublicKey } from "../crypto/keys";
import { getEventHash, signEvent as sign } from "../crypto/signing";
import type { Event, UnsignedEvent } from "../crypto/types";
import * as nip04 from "../nips/nip04";
import * as nip44 from "../nips/nip44";
import type { Signer } from "./signer";

/**
 * Signer that uses a private key directly
 * Suitable for server-side applications, bots, and CLI tools
 */
export class PrivateKeySigner implements Signer {
  private secretKey: Uint8Array | string;
  private _pubkey?: string;

  constructor(secretKey: Uint8Array | string) {
    this.secretKey = secretKey;
  }

  async getPublicKey(): Promise<string> {
    if (!this._pubkey) {
      this._pubkey = getPublicKey(this.secretKey);
    }
    return this._pubkey;
  }

  async signEvent(event: UnsignedEvent): Promise<Event> {
    const id = getEventHash(event);
    const sig = await sign(event, this.secretKey);

    return {
      ...event,
      id,
      sig,
    };
  }

  /**
   * NIP-04 encryption support
   */
  nip04 = {
    encrypt: async (pubkey: string, plaintext: string): Promise<string> => {
      return await nip04.encrypt(this.secretKey, pubkey, plaintext);
    },
    decrypt: async (pubkey: string, ciphertext: string): Promise<string> => {
      return await nip04.decrypt(this.secretKey, pubkey, ciphertext);
    },
  };

  /**
   * NIP-44 encryption support
   */
  nip44 = {
    encrypt: async (pubkey: string, plaintext: string): Promise<string> => {
      return nip44.encryptMessage(this.secretKey, pubkey, plaintext);
    },
    decrypt: async (pubkey: string, ciphertext: string): Promise<string> => {
      return nip44.decryptMessage(this.secretKey, pubkey, ciphertext);
    },
  };
}
