import { describe, expect, it } from "vitest";
import { EventKind, PrivateKeySigner, createEvent, generateSecretKey, getPublicKey } from "../src";

describe("PrivateKeySigner", () => {
  it("should create signer with private key", async () => {
    const sk = generateSecretKey();
    const signer = new PrivateKeySigner(sk);

    const pk = await signer.getPublicKey();
    expect(pk).toBe(getPublicKey(sk));
  });

  it("should sign events", async () => {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);
    const signer = new PrivateKeySigner(sk);

    const unsigned = createEvent(pk, EventKind.Text, "Hello!");
    const event = await signer.signEvent(unsigned);

    expect(event.id).toBeDefined();
    expect(event.sig).toBeDefined();
    expect(event.pubkey).toBe(pk);
  });

  it("should support NIP-04 encryption", async () => {
    const sk1 = generateSecretKey();
    const sk2 = generateSecretKey();
    const pk2 = getPublicKey(sk2);

    const signer = new PrivateKeySigner(sk1);

    const plaintext = "Secret message";
    const ciphertext = await signer.nip04.encrypt(pk2, plaintext);
    expect(ciphertext).toBeDefined();
    expect(ciphertext).not.toBe(plaintext);

    // Decrypt with recipient's key
    const signer2 = new PrivateKeySigner(sk2);
    const pk1 = await signer.getPublicKey();
    const decrypted = await signer2.nip04.decrypt(pk1, ciphertext);
    expect(decrypted).toBe(plaintext);
  });

  it("should support NIP-44 encryption", async () => {
    const sk1 = generateSecretKey();
    const sk2 = generateSecretKey();
    const pk2 = getPublicKey(sk2);

    const signer = new PrivateKeySigner(sk1);

    const plaintext = "Secret message with NIP-44";
    const ciphertext = await signer.nip44.encrypt(pk2, plaintext);
    expect(ciphertext).toBeDefined();
    expect(ciphertext).not.toBe(plaintext);

    // Decrypt with recipient's key
    const signer2 = new PrivateKeySigner(sk2);
    const pk1 = await signer.getPublicKey();
    const decrypted = await signer2.nip44.decrypt(pk1, ciphertext);
    expect(decrypted).toBe(plaintext);
  });
});
