/**
 * Exports Test Suite
 *
 * This test suite verifies that all exported functions and classes from the
 * Nostr SDK are present and properly typed.
 */

import { describe, expect, it } from "vitest";
import * as NostrSDK from "../src";

describe("Nostr SDK - Exported Functions and Classes", () => {
  describe("Core Crypto Functions", () => {
    it("should export generateSecretKey", () => {
      expect(NostrSDK.generateSecretKey).toBeDefined();
      expect(typeof NostrSDK.generateSecretKey).toBe("function");
    });

    it("should export getPublicKey", () => {
      expect(NostrSDK.getPublicKey).toBeDefined();
      expect(typeof NostrSDK.getPublicKey).toBe("function");
    });

    it("should export isValidPrivateKey", () => {
      expect(NostrSDK.isValidPrivateKey).toBeDefined();
      expect(typeof NostrSDK.isValidPrivateKey).toBe("function");
    });

    it("should export isValidPublicKey", () => {
      expect(NostrSDK.isValidPublicKey).toBeDefined();
      expect(typeof NostrSDK.isValidPublicKey).toBe("function");
    });
  });

  describe("Signing Functions", () => {
    it("should export signEvent", () => {
      expect(NostrSDK.signEvent).toBeDefined();
      expect(typeof NostrSDK.signEvent).toBe("function");
    });

    it("should export finishEvent", () => {
      expect(NostrSDK.finishEvent).toBeDefined();
      expect(typeof NostrSDK.finishEvent).toBe("function");
    });

    it("should export getEventHash", () => {
      expect(NostrSDK.getEventHash).toBeDefined();
      expect(typeof NostrSDK.getEventHash).toBe("function");
    });

    it("should export serializeEvent", () => {
      expect(NostrSDK.serializeEvent).toBeDefined();
      expect(typeof NostrSDK.serializeEvent).toBe("function");
    });
  });

  describe("Validation Functions", () => {
    it("should export validateEvent", () => {
      expect(NostrSDK.validateEvent).toBeDefined();
      expect(typeof NostrSDK.validateEvent).toBe("function");
    });

    it("should export verifySignature", () => {
      expect(NostrSDK.verifySignature).toBeDefined();
      expect(typeof NostrSDK.verifySignature).toBe("function");
    });

    it("should export matchFilter", () => {
      expect(NostrSDK.matchFilter).toBeDefined();
      expect(typeof NostrSDK.matchFilter).toBe("function");
    });

    it("should export matchFilters", () => {
      expect(NostrSDK.matchFilters).toBeDefined();
      expect(typeof NostrSDK.matchFilters).toBe("function");
    });

    it("should export validateFilter", () => {
      expect(NostrSDK.validateFilter).toBeDefined();
      expect(typeof NostrSDK.validateFilter).toBe("function");
    });

    it("should export isExpired", () => {
      expect(NostrSDK.isExpired).toBeDefined();
      expect(typeof NostrSDK.isExpired).toBe("function");
    });
  });

  describe("Utility Functions", () => {
    it("should export createEvent", () => {
      expect(NostrSDK.createEvent).toBeDefined();
      expect(typeof NostrSDK.createEvent).toBe("function");
    });

    it("should export now", () => {
      expect(NostrSDK.now).toBeDefined();
      expect(typeof NostrSDK.now).toBe("function");
    });

    it("should export getEventKindCategory", () => {
      expect(NostrSDK.getEventKindCategory).toBeDefined();
      expect(typeof NostrSDK.getEventKindCategory).toBe("function");
    });
  });

  describe("NIP-04 Functions", () => {
    it("should export nip04.encrypt", () => {
      expect(NostrSDK.nip04).toBeDefined();
      expect(NostrSDK.nip04.encrypt).toBeDefined();
      expect(typeof NostrSDK.nip04.encrypt).toBe("function");
    });

    it("should export nip04.decrypt", () => {
      expect(NostrSDK.nip04).toBeDefined();
      expect(NostrSDK.nip04.decrypt).toBeDefined();
      expect(typeof NostrSDK.nip04.decrypt).toBe("function");
    });
  });

  describe("NIP-05 Functions", () => {
    it("should export nip05.verifyNip05", () => {
      expect(NostrSDK.nip05).toBeDefined();
      expect(NostrSDK.nip05.verifyNip05).toBeDefined();
      expect(typeof NostrSDK.nip05.verifyNip05).toBe("function");
    });

    it("should export nip05.queryProfile", () => {
      expect(NostrSDK.nip05).toBeDefined();
      expect(NostrSDK.nip05.queryProfile).toBeDefined();
      expect(typeof NostrSDK.nip05.queryProfile).toBe("function");
    });

    it("should export nip05.extractDomain", () => {
      expect(NostrSDK.nip05).toBeDefined();
      expect(NostrSDK.nip05.extractDomain).toBeDefined();
      expect(typeof NostrSDK.nip05.extractDomain).toBe("function");
    });

    it("should export nip05.extractName", () => {
      expect(NostrSDK.nip05).toBeDefined();
      expect(NostrSDK.nip05.extractName).toBeDefined();
      expect(typeof NostrSDK.nip05.extractName).toBe("function");
    });

    it("should export nip05.isValidNip05", () => {
      expect(NostrSDK.nip05).toBeDefined();
      expect(NostrSDK.nip05.isValidNip05).toBeDefined();
      expect(typeof NostrSDK.nip05.isValidNip05).toBe("function");
    });
  });

  describe("NIP-13 Functions", () => {
    it("should export nip13.getPowDifficulty", () => {
      expect(NostrSDK.nip13).toBeDefined();
      expect(NostrSDK.nip13.getPowDifficulty).toBeDefined();
      expect(typeof NostrSDK.nip13.getPowDifficulty).toBe("function");
    });

    it("should export nip13.getTargetDifficulty", () => {
      expect(NostrSDK.nip13).toBeDefined();
      expect(NostrSDK.nip13.getTargetDifficulty).toBeDefined();
      expect(typeof NostrSDK.nip13.getTargetDifficulty).toBe("function");
    });

    it("should export nip13.validatePow", () => {
      expect(NostrSDK.nip13).toBeDefined();
      expect(NostrSDK.nip13.validatePow).toBeDefined();
      expect(typeof NostrSDK.nip13.validatePow).toBe("function");
    });

    it("should export nip13.minePow", () => {
      expect(NostrSDK.nip13).toBeDefined();
      expect(NostrSDK.nip13.minePow).toBeDefined();
      expect(typeof NostrSDK.nip13.minePow).toBe("function");
    });

    it("should export nip13.minePowAsync", () => {
      expect(NostrSDK.nip13).toBeDefined();
      expect(NostrSDK.nip13.minePowAsync).toBeDefined();
      expect(typeof NostrSDK.nip13.minePowAsync).toBe("function");
    });
  });

  describe("NIP-19 Functions", () => {
    it("should export nip19.npubEncode", () => {
      expect(NostrSDK.nip19).toBeDefined();
      expect(NostrSDK.nip19.npubEncode).toBeDefined();
      expect(typeof NostrSDK.nip19.npubEncode).toBe("function");
    });

    it("should export nip19.nsecEncode", () => {
      expect(NostrSDK.nip19).toBeDefined();
      expect(NostrSDK.nip19.nsecEncode).toBeDefined();
      expect(typeof NostrSDK.nip19.nsecEncode).toBe("function");
    });

    it("should export nip19.noteEncode", () => {
      expect(NostrSDK.nip19).toBeDefined();
      expect(NostrSDK.nip19.noteEncode).toBeDefined();
      expect(typeof NostrSDK.nip19.noteEncode).toBe("function");
    });

    it("should export nip19.nprofileEncode", () => {
      expect(NostrSDK.nip19).toBeDefined();
      expect(NostrSDK.nip19.nprofileEncode).toBeDefined();
      expect(typeof NostrSDK.nip19.nprofileEncode).toBe("function");
    });

    it("should export nip19.neventEncode", () => {
      expect(NostrSDK.nip19).toBeDefined();
      expect(NostrSDK.nip19.neventEncode).toBeDefined();
      expect(typeof NostrSDK.nip19.neventEncode).toBe("function");
    });

    it("should export nip19.naddrEncode", () => {
      expect(NostrSDK.nip19).toBeDefined();
      expect(NostrSDK.nip19.naddrEncode).toBeDefined();
      expect(typeof NostrSDK.nip19.naddrEncode).toBe("function");
    });

    it("should export nip19.nrelayEncode", () => {
      expect(NostrSDK.nip19).toBeDefined();
      expect(NostrSDK.nip19.nrelayEncode).toBeDefined();
      expect(typeof NostrSDK.nip19.nrelayEncode).toBe("function");
    });

    it("should export nip19.decode", () => {
      expect(NostrSDK.nip19).toBeDefined();
      expect(NostrSDK.nip19.decode).toBeDefined();
      expect(typeof NostrSDK.nip19.decode).toBe("function");
    });
  });

  describe("NIP-44 Functions", () => {
    it("should export nip44.encrypt", () => {
      expect(NostrSDK.nip44).toBeDefined();
      expect(NostrSDK.nip44.encrypt).toBeDefined();
      expect(typeof NostrSDK.nip44.encrypt).toBe("function");
    });

    it("should export nip44.decrypt", () => {
      expect(NostrSDK.nip44).toBeDefined();
      expect(NostrSDK.nip44.decrypt).toBeDefined();
      expect(typeof NostrSDK.nip44.decrypt).toBe("function");
    });
  });

  describe("Authentication Classes", () => {
    it("should export PrivateKeySigner", () => {
      expect(NostrSDK.PrivateKeySigner).toBeDefined();
      expect(typeof NostrSDK.PrivateKeySigner).toBe("function");
    });

    it("should export Nip07Signer", () => {
      expect(NostrSDK.Nip07Signer).toBeDefined();
      expect(typeof NostrSDK.Nip07Signer).toBe("function");
    });
  });

  describe("Relay Classes", () => {
    it("should export Relay", () => {
      expect(NostrSDK.Relay).toBeDefined();
      expect(typeof NostrSDK.Relay).toBe("function");
    });

    it("should export RelayStatus enum", () => {
      expect(NostrSDK.RelayStatus).toBeDefined();
      expect(typeof NostrSDK.RelayStatus).toBe("object");
    });

    it("should export RelayPool", () => {
      expect(NostrSDK.RelayPool).toBeDefined();
      expect(typeof NostrSDK.RelayPool).toBe("function");
    });
  });

  describe("Client Classes", () => {
    it("should export NostrClient", () => {
      expect(NostrSDK.NostrClient).toBeDefined();
      expect(typeof NostrSDK.NostrClient).toBe("function");
    });

    it("should export default as NostrClient", () => {
      expect(NostrSDK.default).toBeDefined();
      expect(NostrSDK.default).toBe(NostrSDK.NostrClient);
    });
  });

  describe("Factory Functions", () => {
    it("should export createPrivateKeyClient", () => {
      expect(NostrSDK.createPrivateKeyClient).toBeDefined();
      expect(typeof NostrSDK.createPrivateKeyClient).toBe("function");
    });

    it("should export createNip07Client", () => {
      expect(NostrSDK.createNip07Client).toBeDefined();
      expect(typeof NostrSDK.createNip07Client).toBe("function");
    });
  });

  describe("EventKind Enum", () => {
    it("should export EventKind", () => {
      expect(NostrSDK.EventKind).toBeDefined();
      expect(typeof NostrSDK.EventKind).toBe("object");
    });

    it("should have common event kinds", () => {
      expect(NostrSDK.EventKind.Metadata).toBe(0);
      expect(NostrSDK.EventKind.Text).toBe(1);
      expect(NostrSDK.EventKind.RecommendRelay).toBe(2);
      expect(NostrSDK.EventKind.Contacts).toBe(3);
      expect(NostrSDK.EventKind.EncryptedDirectMessage).toBe(4);
      expect(NostrSDK.EventKind.EventDeletion).toBe(5);
      expect(NostrSDK.EventKind.Repost).toBe(6);
      expect(NostrSDK.EventKind.Reaction).toBe(7);
    });
  });
});

describe("NostrClient - Method Existence", () => {
  describe("All NostrClient methods should be defined", () => {
    const mockSigner = {
      getPublicKey: async () => "test",
      signEvent: async (event: NostrSDK.UnsignedEvent) =>
        ({ ...event, id: "test", sig: "test", pubkey: "test" }) as NostrSDK.Event,
    };

    const client = new NostrSDK.NostrClient({
      relays: ["wss://relay.test"],
      signer: mockSigner,
      autoConnect: false,
    });

    it("should have getPublicKey method", () => {
      expect(client.getPublicKey).toBeDefined();
      expect(typeof client.getPublicKey).toBe("function");
    });

    it("should have publishNote method", () => {
      expect(client.publishNote).toBeDefined();
      expect(typeof client.publishNote).toBe("function");
    });

    it("should have setMetadata method", () => {
      expect(client.setMetadata).toBeDefined();
      expect(typeof client.setMetadata).toBe("function");
    });

    it("should have getMetadata method", () => {
      expect(client.getMetadata).toBeDefined();
      expect(typeof client.getMetadata).toBe("function");
    });

    it("should have publishReaction method", () => {
      expect(client.publishReaction).toBeDefined();
      expect(typeof client.publishReaction).toBe("function");
    });

    it("should have repost method", () => {
      expect(client.repost).toBeDefined();
      expect(typeof client.repost).toBe("function");
    });

    it("should have setContacts method", () => {
      expect(client.setContacts).toBeDefined();
      expect(typeof client.setContacts).toBe("function");
    });

    it("should have getContacts method", () => {
      expect(client.getContacts).toBeDefined();
      expect(typeof client.getContacts).toBe("function");
    });

    it("should have followUser method", () => {
      expect(client.followUser).toBeDefined();
      expect(typeof client.followUser).toBe("function");
    });

    it("should have unfollowUser method", () => {
      expect(client.unfollowUser).toBeDefined();
      expect(typeof client.unfollowUser).toBe("function");
    });

    it("should have sendEncryptedDM method", () => {
      expect(client.sendEncryptedDM).toBeDefined();
      expect(typeof client.sendEncryptedDM).toBe("function");
    });

    it("should have deleteEvents method", () => {
      expect(client.deleteEvents).toBeDefined();
      expect(typeof client.deleteEvents).toBe("function");
    });

    it("should have subscribeToProfile method", () => {
      expect(client.subscribeToProfile).toBeDefined();
      expect(typeof client.subscribeToProfile).toBe("function");
    });

    it("should have subscribeToFeed method", () => {
      expect(client.subscribeToFeed).toBeDefined();
      expect(typeof client.subscribeToFeed).toBe("function");
    });

    it("should have subscribeToMentions method", () => {
      expect(client.subscribeToMentions).toBeDefined();
      expect(typeof client.subscribeToMentions).toBe("function");
    });

    it("should have getUserNotes method", () => {
      expect(client.getUserNotes).toBeDefined();
      expect(typeof client.getUserNotes).toBe("function");
    });

    it("should have getReactions method", () => {
      expect(client.getReactions).toBeDefined();
      expect(typeof client.getReactions).toBe("function");
    });

    it("should have getReplies method", () => {
      expect(client.getReplies).toBeDefined();
      expect(typeof client.getReplies).toBe("function");
    });

    it("should have publishEvent method", () => {
      expect(client.publishEvent).toBeDefined();
      expect(typeof client.publishEvent).toBe("function");
    });

    it("should have query method", () => {
      expect(client.query).toBeDefined();
      expect(typeof client.query).toBe("function");
    });

    it("should have disconnect method", () => {
      expect(client.disconnect).toBeDefined();
      expect(typeof client.disconnect).toBe("function");
    });

    it("should have pool property", () => {
      expect(client.pool).toBeDefined();
      expect(client.pool).toBeInstanceOf(NostrSDK.RelayPool);
    });

    it("should have signer property", () => {
      expect(client.signer).toBeDefined();
      expect(client.signer).toBe(mockSigner);
    });
  });
});
