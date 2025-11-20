import { describe, expect, it } from "vitest";
import { generateSecretKey, getPublicKey, nip19 } from "../src";

describe("NIP-19: Bech32 encoding", () => {
  it("should encode and decode npub", () => {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);

    const npub = nip19.npubEncode(pk);
    expect(npub).toMatch(/^npub1/);

    const decoded = nip19.decode(npub);
    expect(decoded.type).toBe("npub");
    expect(decoded.data).toBe(pk);
  });

  it("should encode and decode nsec", () => {
    const sk = generateSecretKey();

    const nsec = nip19.nsecEncode(sk);
    expect(nsec).toMatch(/^nsec1/);

    const decoded = nip19.decode(nsec);
    expect(decoded.type).toBe("nsec");
  });

  it("should encode and decode note", () => {
    const eventId = "a".repeat(64);

    const note = nip19.noteEncode(eventId);
    expect(note).toMatch(/^note1/);

    const decoded = nip19.decode(note);
    expect(decoded.type).toBe("note");
    expect(decoded.data).toBe(eventId);
  });

  it("should encode and decode nprofile", () => {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);

    const nprofile = nip19.nprofileEncode({
      pubkey: pk,
      relays: ["wss://relay.damus.io"],
    });
    expect(nprofile).toMatch(/^nprofile1/);

    const decoded = nip19.decode(nprofile);
    expect(decoded.type).toBe("nprofile");
    if (decoded.type === "nprofile") {
      expect(decoded.data.pubkey).toBe(pk);
      expect(decoded.data.relays).toEqual(["wss://relay.damus.io"]);
    }
  });

  it("should encode and decode nevent", () => {
    const eventId = "a".repeat(64);
    const author = "b".repeat(64);

    const nevent = nip19.neventEncode({
      id: eventId,
      relays: ["wss://relay.damus.io"],
      author,
      kind: 1,
    });
    expect(nevent).toMatch(/^nevent1/);

    const decoded = nip19.decode(nevent);
    expect(decoded.type).toBe("nevent");
    if (decoded.type === "nevent") {
      expect(decoded.data.id).toBe(eventId);
      expect(decoded.data.author).toBe(author);
      expect(decoded.data.kind).toBe(1);
    }
  });

  it("should encode and decode naddr", () => {
    const pk = "a".repeat(64);

    const naddr = nip19.naddrEncode({
      identifier: "my-article",
      pubkey: pk,
      kind: 30023,
      relays: ["wss://relay.damus.io"],
    });
    expect(naddr).toMatch(/^naddr1/);

    const decoded = nip19.decode(naddr);
    expect(decoded.type).toBe("naddr");
    if (decoded.type === "naddr") {
      expect(decoded.data.identifier).toBe("my-article");
      expect(decoded.data.pubkey).toBe(pk);
      expect(decoded.data.kind).toBe(30023);
    }
  });

  it("should encode and decode nrelay", () => {
    const url = "wss://relay.damus.io";

    const nrelay = nip19.nrelayEncode(url);
    expect(nrelay).toMatch(/^nrelay1/);

    const decoded = nip19.decode(nrelay);
    expect(decoded.type).toBe("nrelay");
    expect(decoded.data).toBe(url);
  });
});
