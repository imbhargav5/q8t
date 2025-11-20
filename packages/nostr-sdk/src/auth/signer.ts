import type { Event, UnsignedEvent } from "../crypto/types";

/**
 * Signer interface for different signing methods
 */
export interface Signer {
  /**
   * Get the public key for this signer
   */
  getPublicKey(): Promise<string>;

  /**
   * Sign an unsigned event
   */
  signEvent(event: UnsignedEvent): Promise<Event>;

  /**
   * NIP-04 encryption support (optional)
   */
  nip04?: {
    encrypt(pubkey: string, plaintext: string): Promise<string>;
    decrypt(pubkey: string, ciphertext: string): Promise<string>;
  };

  /**
   * NIP-44 encryption support (optional)
   */
  nip44?: {
    encrypt(pubkey: string, plaintext: string): Promise<string>;
    decrypt(pubkey: string, ciphertext: string): Promise<string>;
  };
}
