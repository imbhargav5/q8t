import { describe, it, expect } from "vitest";
import { FarcasterSDK } from "../src/index";

describe("FarcasterSDK - Comprehensive Method Validation", () => {
  describe("Hub API - All Methods", () => {
    const sdk = new FarcasterSDK({
      hub: { hubUrl: "https://hub.pinata.cloud" },
    });

    describe("Casts API", () => {
      it("should have getCastsByFid method", () => {
        expect(sdk.hub.getCastsByFid).toBeDefined();
        expect(typeof sdk.hub.getCastsByFid).toBe("function");
      });

      it("should have getCastsByParent method", () => {
        expect(sdk.hub.getCastsByParent).toBeDefined();
        expect(typeof sdk.hub.getCastsByParent).toBe("function");
      });

      it("should have getCastsByMention method", () => {
        expect(sdk.hub.getCastsByMention).toBeDefined();
        expect(typeof sdk.hub.getCastsByMention).toBe("function");
      });

      it("should have getCastById method", () => {
        expect(sdk.hub.getCastById).toBeDefined();
        expect(typeof sdk.hub.getCastById).toBe("function");
      });
    });

    describe("Reactions API", () => {
      it("should have getReactionsByFid method", () => {
        expect(sdk.hub.getReactionsByFid).toBeDefined();
        expect(typeof sdk.hub.getReactionsByFid).toBe("function");
      });

      it("should have getReactionsByCast method", () => {
        expect(sdk.hub.getReactionsByCast).toBeDefined();
        expect(typeof sdk.hub.getReactionsByCast).toBe("function");
      });

      it("should have getReactionById method", () => {
        expect(sdk.hub.getReactionById).toBeDefined();
        expect(typeof sdk.hub.getReactionById).toBe("function");
      });
    });

    describe("Links API", () => {
      it("should have getLinksByFid method", () => {
        expect(sdk.hub.getLinksByFid).toBeDefined();
        expect(typeof sdk.hub.getLinksByFid).toBe("function");
      });

      it("should have getLinksByTargetFid method", () => {
        expect(sdk.hub.getLinksByTargetFid).toBeDefined();
        expect(typeof sdk.hub.getLinksByTargetFid).toBe("function");
      });

      it("should have getLinkById method", () => {
        expect(sdk.hub.getLinkById).toBeDefined();
        expect(typeof sdk.hub.getLinkById).toBe("function");
      });
    });

    describe("User Data API", () => {
      it("should have getUserDataByFid method", () => {
        expect(sdk.hub.getUserDataByFid).toBeDefined();
        expect(typeof sdk.hub.getUserDataByFid).toBe("function");
      });
    });

    describe("Verifications API", () => {
      it("should have getVerificationsByFid method", () => {
        expect(sdk.hub.getVerificationsByFid).toBeDefined();
        expect(typeof sdk.hub.getVerificationsByFid).toBe("function");
      });
    });

    describe("Username Proofs API", () => {
      it("should have getUsernameProofsByFid method", () => {
        expect(sdk.hub.getUsernameProofsByFid).toBeDefined();
        expect(typeof sdk.hub.getUsernameProofsByFid).toBe("function");
      });
    });

    describe("Storage API", () => {
      it("should have getStorageLimitsByFid method", () => {
        expect(sdk.hub.getStorageLimitsByFid).toBeDefined();
        expect(typeof sdk.hub.getStorageLimitsByFid).toBe("function");
      });
    });

    describe("OnChain Events API", () => {
      it("should have getOnChainEventsByFid method", () => {
        expect(sdk.hub.getOnChainEventsByFid).toBeDefined();
        expect(typeof sdk.hub.getOnChainEventsByFid).toBe("function");
      });

      it("should have getOnChainSignersByFid method", () => {
        expect(sdk.hub.getOnChainSignersByFid).toBeDefined();
        expect(typeof sdk.hub.getOnChainSignersByFid).toBe("function");
      });
    });

    describe("Info API", () => {
      it("should have getInfo method", () => {
        expect(sdk.hub.getInfo).toBeDefined();
        expect(typeof sdk.hub.getInfo).toBe("function");
      });
    });

    describe("FIDs API", () => {
      it("should have getFids method", () => {
        expect(sdk.hub.getFids).toBeDefined();
        expect(typeof sdk.hub.getFids).toBe("function");
      });
    });

    describe("Submit Message API", () => {
      it("should have submitMessage method", () => {
        expect(sdk.hub.submitMessage).toBeDefined();
        expect(typeof sdk.hub.submitMessage).toBe("function");
      });
    });
  });

  describe("Warpcast API - All Methods", () => {
    const sdk = new FarcasterSDK({
      warpcast: { accessToken: "test-token" },
    });

    describe("User API", () => {
      it("should have getMe method", () => {
        expect(sdk.warpcast.getMe).toBeDefined();
        expect(typeof sdk.warpcast.getMe).toBe("function");
      });
    });

    describe("Channels API", () => {
      it("should have getAllChannels method", () => {
        expect(sdk.warpcast.getAllChannels).toBeDefined();
        expect(typeof sdk.warpcast.getAllChannels).toBe("function");
      });

      it("should have getChannel method", () => {
        expect(sdk.warpcast.getChannel).toBeDefined();
        expect(typeof sdk.warpcast.getChannel).toBe("function");
      });

      it("should have getChannelFollowers method", () => {
        expect(sdk.warpcast.getChannelFollowers).toBeDefined();
        expect(typeof sdk.warpcast.getChannelFollowers).toBe("function");
      });

      it("should have getUserFollowingChannels method", () => {
        expect(sdk.warpcast.getUserFollowingChannels).toBeDefined();
        expect(typeof sdk.warpcast.getUserFollowingChannels).toBe("function");
      });

      it("should have getUserChannel method", () => {
        expect(sdk.warpcast.getUserChannel).toBeDefined();
        expect(typeof sdk.warpcast.getUserChannel).toBe("function");
      });

      it("should have getChannelMembers method", () => {
        expect(sdk.warpcast.getChannelMembers).toBeDefined();
        expect(typeof sdk.warpcast.getChannelMembers).toBe("function");
      });

      it("should have followChannel method", () => {
        expect(sdk.warpcast.followChannel).toBeDefined();
        expect(typeof sdk.warpcast.followChannel).toBe("function");
      });

      it("should have unfollowChannel method", () => {
        expect(sdk.warpcast.unfollowChannel).toBeDefined();
        expect(typeof sdk.warpcast.unfollowChannel).toBe("function");
      });
    });

    describe("Channel Invites API", () => {
      it("should have getChannelInvites method", () => {
        expect(sdk.warpcast.getChannelInvites).toBeDefined();
        expect(typeof sdk.warpcast.getChannelInvites).toBe("function");
      });

      it("should have createChannelInvite method", () => {
        expect(sdk.warpcast.createChannelInvite).toBeDefined();
        expect(typeof sdk.warpcast.createChannelInvite).toBe("function");
      });

      it("should have deleteChannelInvite method", () => {
        expect(sdk.warpcast.deleteChannelInvite).toBeDefined();
        expect(typeof sdk.warpcast.deleteChannelInvite).toBe("function");
      });

      it("should have respondToChannelInvite method", () => {
        expect(sdk.warpcast.respondToChannelInvite).toBeDefined();
        expect(typeof sdk.warpcast.respondToChannelInvite).toBe("function");
      });
    });

    describe("Moderation API", () => {
      it("should have getModeratedCasts method", () => {
        expect(sdk.warpcast.getModeratedCasts).toBeDefined();
        expect(typeof sdk.warpcast.getModeratedCasts).toBe("function");
      });

      it("should have moderateCast method", () => {
        expect(sdk.warpcast.moderateCast).toBeDefined();
        expect(typeof sdk.warpcast.moderateCast).toBe("function");
      });

      it("should have getChannelRestrictedUsers method", () => {
        expect(sdk.warpcast.getChannelRestrictedUsers).toBeDefined();
        expect(typeof sdk.warpcast.getChannelRestrictedUsers).toBe("function");
      });

      it("should have getChannelBans method", () => {
        expect(sdk.warpcast.getChannelBans).toBeDefined();
        expect(typeof sdk.warpcast.getChannelBans).toBe("function");
      });

      it("should have banUser method", () => {
        expect(sdk.warpcast.banUser).toBeDefined();
        expect(typeof sdk.warpcast.banUser).toBe("function");
      });

      it("should have unbanUser method", () => {
        expect(sdk.warpcast.unbanUser).toBeDefined();
        expect(typeof sdk.warpcast.unbanUser).toBe("function");
      });
    });

    describe("Pinning API", () => {
      it("should have pinCast method", () => {
        expect(sdk.warpcast.pinCast).toBeDefined();
        expect(typeof sdk.warpcast.pinCast).toBe("function");
      });

      it("should have unpinCast method", () => {
        expect(sdk.warpcast.unpinCast).toBeDefined();
        expect(typeof sdk.warpcast.unpinCast).toBe("function");
      });
    });

    describe("User Features API", () => {
      it("should have getBlockedUsers method", () => {
        expect(sdk.warpcast.getBlockedUsers).toBeDefined();
        expect(typeof sdk.warpcast.getBlockedUsers).toBe("function");
      });

      it("should have blockUser method", () => {
        expect(sdk.warpcast.blockUser).toBeDefined();
        expect(typeof sdk.warpcast.blockUser).toBe("function");
      });

      it("should have unblockUser method", () => {
        expect(sdk.warpcast.unblockUser).toBeDefined();
        expect(typeof sdk.warpcast.unblockUser).toBe("function");
      });

      it("should have getPrimaryAddress method", () => {
        expect(sdk.warpcast.getPrimaryAddress).toBeDefined();
        expect(typeof sdk.warpcast.getPrimaryAddress).toBe("function");
      });

      it("should have getPrimaryAddresses method", () => {
        expect(sdk.warpcast.getPrimaryAddresses).toBeDefined();
        expect(typeof sdk.warpcast.getPrimaryAddresses).toBe("function");
      });

      it("should have getAccountVerifications method", () => {
        expect(sdk.warpcast.getAccountVerifications).toBeDefined();
        expect(typeof sdk.warpcast.getAccountVerifications).toBe("function");
      });

      it("should have getStarterPackMembers method", () => {
        expect(sdk.warpcast.getStarterPackMembers).toBeDefined();
        expect(typeof sdk.warpcast.getStarterPackMembers).toBe("function");
      });
    });

    describe("Direct Casts API", () => {
      it("should have sendDirectCast method", () => {
        expect(sdk.warpcast.sendDirectCast).toBeDefined();
        expect(typeof sdk.warpcast.sendDirectCast).toBe("function");
      });
    });

    describe("Discovery API", () => {
      it("should have getDiscoverActions method", () => {
        expect(sdk.warpcast.getDiscoverActions).toBeDefined();
        expect(typeof sdk.warpcast.getDiscoverActions).toBe("function");
      });
    });

    describe("Rewards API", () => {
      it("should have getCreatorRewardsWinnerHistory method", () => {
        expect(sdk.warpcast.getCreatorRewardsWinnerHistory).toBeDefined();
        expect(typeof sdk.warpcast.getCreatorRewardsWinnerHistory).toBe(
          "function",
        );
      });

      it("should have getDeveloperRewardsWinnerHistory method", () => {
        expect(sdk.warpcast.getDeveloperRewardsWinnerHistory).toBeDefined();
        expect(typeof sdk.warpcast.getDeveloperRewardsWinnerHistory).toBe(
          "function",
        );
      });

      it("should have getPowerBadgeUsers method", () => {
        expect(sdk.warpcast.getPowerBadgeUsers).toBeDefined();
        expect(typeof sdk.warpcast.getPowerBadgeUsers).toBe("function");
      });
    });
  });

  describe("Signer API - All Methods", () => {
    const sdk = new FarcasterSDK({
      signer: {
        appFid: 123,
        appPrivateKey: "0x1234",
      },
    });

    describe("Signer Request API", () => {
      it("should have createSignerRequest method", () => {
        expect(sdk.signer.createSignerRequest).toBeDefined();
        expect(typeof sdk.signer.createSignerRequest).toBe("function");
      });

      it("should have getSignerRequest method", () => {
        expect(sdk.signer.getSignerRequest).toBeDefined();
        expect(typeof sdk.signer.getSignerRequest).toBe("function");
      });
    });

    describe("Frame Notifications API", () => {
      it("should have sendFrameNotification method", () => {
        expect(sdk.signer.sendFrameNotification).toBeDefined();
        expect(typeof sdk.signer.sendFrameNotification).toBe("function");
      });
    });
  });

  describe("Method Count Validation", () => {
    const sdk = new FarcasterSDK({
      hub: { hubUrl: "https://hub.pinata.cloud" },
      warpcast: { accessToken: "test" },
      signer: { appFid: 123, appPrivateKey: "0x1234" },
    });

    it("should have 19 Hub API methods", () => {
      const hubMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(sdk.hub),
      ).filter((name) => name !== "constructor");
      expect(hubMethods.length).toBe(19);
    });

    it("should have 33 Warpcast API methods", () => {
      const warpcastMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(sdk.warpcast),
      ).filter((name) => name !== "constructor");
      expect(warpcastMethods.length).toBe(33);
    });

    it("should have 3 Signer API methods", () => {
      const signerMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(sdk.signer),
      ).filter((name) => name !== "constructor");
      expect(signerMethods.length).toBe(3);
    });

    it("should have 55 total API methods across all clients", () => {
      const hubMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(sdk.hub),
      ).filter((name) => name !== "constructor");

      const warpcastMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(sdk.warpcast),
      ).filter((name) => name !== "constructor");

      const signerMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(sdk.signer),
      ).filter((name) => name !== "constructor");

      const totalMethods =
        hubMethods.length + warpcastMethods.length + signerMethods.length;
      expect(totalMethods).toBe(55);
    });
  });

  describe("Type Exports Validation", () => {
    it("should export FarcasterSDK class", async () => {
      const { FarcasterSDK } = await import("../src/index");
      expect(FarcasterSDK).toBeDefined();
      expect(typeof FarcasterSDK).toBe("function");
    });

    it("should export authentication configs", async () => {
      const exports = await import("../src/index");
      expect(exports.createHubClient).toBeDefined();
      expect(exports.createWarpcastClient).toBeDefined();
      expect(exports.createSignerClient).toBeDefined();
    });

    it("should export Hub API types", async () => {
      const exports = await import("../src/index");
      expect(exports.HubApi).toBeDefined();
    });

    it("should export Warpcast API types", async () => {
      const exports = await import("../src/index");
      expect(exports.WarpcastApi).toBeDefined();
    });

    it("should export Signer API types", async () => {
      const exports = await import("../src/index");
      expect(exports.SignerApi).toBeDefined();
    });
  });
});
