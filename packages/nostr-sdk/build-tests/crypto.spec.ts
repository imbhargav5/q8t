import { describe, expect, it } from "vitest";
import {
  EventKind,
  createEvent,
  finishEvent,
  generateSecretKey,
  getEventHash,
  getPublicKey,
  isValidPrivateKey,
  isValidPublicKey,
  validateEvent,
} from "../src";

describe("Crypto utilities", () => {
  it("should generate valid keypair", () => {
    const sk = generateSecretKey();
    expect(sk).toBeInstanceOf(Uint8Array);
    expect(sk.length).toBe(32);

    const pk = getPublicKey(sk);
    expect(typeof pk).toBe("string");
    expect(pk.length).toBe(64);
  });

  it("should validate private keys", () => {
    const validSk = generateSecretKey();
    expect(isValidPrivateKey(validSk)).toBe(true);

    const invalidSk = new Uint8Array(16);
    expect(isValidPrivateKey(invalidSk)).toBe(false);
  });

  it("should validate public keys", () => {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);
    expect(isValidPublicKey(pk)).toBe(true);

    expect(isValidPublicKey("invalid")).toBe(false);
  });

  it("should create and sign events", async () => {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);

    const unsigned = createEvent(pk, EventKind.Text, "Hello Nostr!");
    expect(unsigned.pubkey).toBe(pk);
    expect(unsigned.content).toBe("Hello Nostr!");
    expect(unsigned.kind).toBe(EventKind.Text);

    const event = await finishEvent(unsigned, sk);
    expect(event.id).toBeDefined();
    expect(event.sig).toBeDefined();
    expect(event.id.length).toBe(64);
    expect(event.sig.length).toBe(128);
  });

  it("should validate events", async () => {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);
    const unsigned = createEvent(pk, EventKind.Text, "Test");
    const event = await finishEvent(unsigned, sk);

    const isValid = await validateEvent(event);
    expect(isValid).toBe(true);
  });

  it("should compute correct event hash", () => {
    const pk = "a".repeat(64);
    const unsigned = createEvent(pk, 1, "test", [], 1234567890);
    const hash = getEventHash(unsigned);

    expect(hash).toBeDefined();
    expect(hash.length).toBe(64);
  });
});
