/**
 * API Methods Test Suite
 *
 * This test suite verifies that all methods defined in the OpenAPI specification
 * are present in the generated MastodonApi class.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { MastodonApi } from "../lib/api";
import type { HttpClient } from "../src/auth/client";

describe("MastodonApi - Method Existence", () => {
  let api: MastodonApi;
  let mockClient: HttpClient;

  beforeEach(() => {
    // Create a mock HTTP client
    mockClient = {
      get: async () => ({}),
      post: async () => ({}),
      put: async () => ({}),
      delete: async () => ({}),
      patch: async () => ({}),
    } as HttpClient;

    api = new MastodonApi(mockClient);
  });

  describe("Account Operations", () => {
    it("should have getAccount method", () => {
      expect(api.getAccount).toBeDefined();
      expect(typeof api.getAccount).toBe("function");
    });

    it("should have verifyCredentials method", () => {
      expect(api.verifyCredentials).toBeDefined();
      expect(typeof api.verifyCredentials).toBe("function");
    });

    it("should have updateCredentials method", () => {
      expect(api.updateCredentials).toBeDefined();
      expect(typeof api.updateCredentials).toBe("function");
    });

    it("should have lookupAccount method", () => {
      expect(api.lookupAccount).toBeDefined();
      expect(typeof api.lookupAccount).toBe("function");
    });

    it("should have searchAccounts method", () => {
      expect(api.searchAccounts).toBeDefined();
      expect(typeof api.searchAccounts).toBe("function");
    });

    it("should have getAccountStatuses method", () => {
      expect(api.getAccountStatuses).toBeDefined();
      expect(typeof api.getAccountStatuses).toBe("function");
    });

    it("should have getAccountFollowers method", () => {
      expect(api.getAccountFollowers).toBeDefined();
      expect(typeof api.getAccountFollowers).toBe("function");
    });

    it("should have getAccountFollowing method", () => {
      expect(api.getAccountFollowing).toBeDefined();
      expect(typeof api.getAccountFollowing).toBe("function");
    });

    it("should have followAccount method", () => {
      expect(api.followAccount).toBeDefined();
      expect(typeof api.followAccount).toBe("function");
    });

    it("should have unfollowAccount method", () => {
      expect(api.unfollowAccount).toBeDefined();
      expect(typeof api.unfollowAccount).toBe("function");
    });

    it("should have blockAccount method", () => {
      expect(api.blockAccount).toBeDefined();
      expect(typeof api.blockAccount).toBe("function");
    });

    it("should have unblockAccount method", () => {
      expect(api.unblockAccount).toBeDefined();
      expect(typeof api.unblockAccount).toBe("function");
    });

    it("should have muteAccount method", () => {
      expect(api.muteAccount).toBeDefined();
      expect(typeof api.muteAccount).toBe("function");
    });

    it("should have unmuteAccount method", () => {
      expect(api.unmuteAccount).toBeDefined();
      expect(typeof api.unmuteAccount).toBe("function");
    });

    it("should have pinAccount method", () => {
      expect(api.pinAccount).toBeDefined();
      expect(typeof api.pinAccount).toBe("function");
    });

    it("should have unpinAccount method", () => {
      expect(api.unpinAccount).toBeDefined();
      expect(typeof api.unpinAccount).toBe("function");
    });

    it("should have setAccountNote method", () => {
      expect(api.setAccountNote).toBeDefined();
      expect(typeof api.setAccountNote).toBe("function");
    });

    it("should have removeFollower method", () => {
      expect(api.removeFollower).toBeDefined();
      expect(typeof api.removeFollower).toBe("function");
    });

    it("should have getAccountRelationships method", () => {
      expect(api.getAccountRelationships).toBeDefined();
      expect(typeof api.getAccountRelationships).toBe("function");
    });

    it("should have getAccountLists method", () => {
      expect(api.getAccountLists).toBeDefined();
      expect(typeof api.getAccountLists).toBe("function");
    });

    it("should have getAccountFeaturedTags method", () => {
      expect(api.getAccountFeaturedTags).toBeDefined();
      expect(typeof api.getAccountFeaturedTags).toBe("function");
    });

    it("should have getBookmarks method", () => {
      expect(api.getBookmarks).toBeDefined();
      expect(typeof api.getBookmarks).toBe("function");
    });

    it("should have getFavourites method", () => {
      expect(api.getFavourites).toBeDefined();
      expect(typeof api.getFavourites).toBe("function");
    });

    it("should have getBlocks method", () => {
      expect(api.getBlocks).toBeDefined();
      expect(typeof api.getBlocks).toBe("function");
    });

    it("should have getMutes method", () => {
      expect(api.getMutes).toBeDefined();
      expect(typeof api.getMutes).toBe("function");
    });

    it("should have getFollowRequests method", () => {
      expect(api.getFollowRequests).toBeDefined();
      expect(typeof api.getFollowRequests).toBe("function");
    });

    it("should have authorizeFollowRequest method", () => {
      expect(api.authorizeFollowRequest).toBeDefined();
      expect(typeof api.authorizeFollowRequest).toBe("function");
    });

    it("should have rejectFollowRequest method", () => {
      expect(api.rejectFollowRequest).toBeDefined();
      expect(typeof api.rejectFollowRequest).toBe("function");
    });

    it("should have getEndorsements method", () => {
      expect(api.getEndorsements).toBeDefined();
      expect(typeof api.getEndorsements).toBe("function");
    });
  });

  describe("Status Operations", () => {
    it("should have createStatus method", () => {
      expect(api.createStatus).toBeDefined();
      expect(typeof api.createStatus).toBe("function");
    });

    it("should have getStatus method", () => {
      expect(api.getStatus).toBeDefined();
      expect(typeof api.getStatus).toBe("function");
    });

    it("should have updateStatus method", () => {
      expect(api.updateStatus).toBeDefined();
      expect(typeof api.updateStatus).toBe("function");
    });

    it("should have deleteStatus method", () => {
      expect(api.deleteStatus).toBeDefined();
      expect(typeof api.deleteStatus).toBe("function");
    });

    it("should have getStatusContext method", () => {
      expect(api.getStatusContext).toBeDefined();
      expect(typeof api.getStatusContext).toBe("function");
    });

    it("should have getStatusCard method", () => {
      expect(api.getStatusCard).toBeDefined();
      expect(typeof api.getStatusCard).toBe("function");
    });

    it("should have getStatusHistory method", () => {
      expect(api.getStatusHistory).toBeDefined();
      expect(typeof api.getStatusHistory).toBe("function");
    });

    it("should have getStatusSource method", () => {
      expect(api.getStatusSource).toBeDefined();
      expect(typeof api.getStatusSource).toBe("function");
    });

    it("should have translateStatus method", () => {
      expect(api.translateStatus).toBeDefined();
      expect(typeof api.translateStatus).toBe("function");
    });

    it("should have favouriteStatus method", () => {
      expect(api.favouriteStatus).toBeDefined();
      expect(typeof api.favouriteStatus).toBe("function");
    });

    it("should have unfavouriteStatus method", () => {
      expect(api.unfavouriteStatus).toBeDefined();
      expect(typeof api.unfavouriteStatus).toBe("function");
    });

    it("should have reblogStatus method", () => {
      expect(api.reblogStatus).toBeDefined();
      expect(typeof api.reblogStatus).toBe("function");
    });

    it("should have unreblogStatus method", () => {
      expect(api.unreblogStatus).toBeDefined();
      expect(typeof api.unreblogStatus).toBe("function");
    });

    it("should have bookmarkStatus method", () => {
      expect(api.bookmarkStatus).toBeDefined();
      expect(typeof api.bookmarkStatus).toBe("function");
    });

    it("should have unbookmarkStatus method", () => {
      expect(api.unbookmarkStatus).toBeDefined();
      expect(typeof api.unbookmarkStatus).toBe("function");
    });

    it("should have pinStatus method", () => {
      expect(api.pinStatus).toBeDefined();
      expect(typeof api.pinStatus).toBe("function");
    });

    it("should have unpinStatus method", () => {
      expect(api.unpinStatus).toBeDefined();
      expect(typeof api.unpinStatus).toBe("function");
    });

    it("should have muteStatus method", () => {
      expect(api.muteStatus).toBeDefined();
      expect(typeof api.muteStatus).toBe("function");
    });

    it("should have unmuteStatus method", () => {
      expect(api.unmuteStatus).toBeDefined();
      expect(typeof api.unmuteStatus).toBe("function");
    });

    it("should have getStatusFavouritedBy method", () => {
      expect(api.getStatusFavouritedBy).toBeDefined();
      expect(typeof api.getStatusFavouritedBy).toBe("function");
    });

    it("should have getStatusRebloggedBy method", () => {
      expect(api.getStatusRebloggedBy).toBeDefined();
      expect(typeof api.getStatusRebloggedBy).toBe("function");
    });

    it("should have getScheduledStatuses method", () => {
      expect(api.getScheduledStatuses).toBeDefined();
      expect(typeof api.getScheduledStatuses).toBe("function");
    });

    it("should have getScheduledStatus method", () => {
      expect(api.getScheduledStatus).toBeDefined();
      expect(typeof api.getScheduledStatus).toBe("function");
    });

    it("should have updateScheduledStatus method", () => {
      expect(api.updateScheduledStatus).toBeDefined();
      expect(typeof api.updateScheduledStatus).toBe("function");
    });

    it("should have cancelScheduledStatus method", () => {
      expect(api.cancelScheduledStatus).toBeDefined();
      expect(typeof api.cancelScheduledStatus).toBe("function");
    });
  });

  describe("Timeline Operations", () => {
    it("should have getHomeTimeline method", () => {
      expect(api.getHomeTimeline).toBeDefined();
      expect(typeof api.getHomeTimeline).toBe("function");
    });

    it("should have getPublicTimeline method", () => {
      expect(api.getPublicTimeline).toBeDefined();
      expect(typeof api.getPublicTimeline).toBe("function");
    });

    it("should have getHashtagTimeline method", () => {
      expect(api.getHashtagTimeline).toBeDefined();
      expect(typeof api.getHashtagTimeline).toBe("function");
    });

    it("should have getListTimeline method", () => {
      expect(api.getListTimeline).toBeDefined();
      expect(typeof api.getListTimeline).toBe("function");
    });
  });

  describe("Notification Operations", () => {
    it("should have getNotifications method", () => {
      expect(api.getNotifications).toBeDefined();
      expect(typeof api.getNotifications).toBe("function");
    });

    it("should have getNotification method", () => {
      expect(api.getNotification).toBeDefined();
      expect(typeof api.getNotification).toBe("function");
    });

    it("should have dismissNotification method", () => {
      expect(api.dismissNotification).toBeDefined();
      expect(typeof api.dismissNotification).toBe("function");
    });

    it("should have clearNotifications method", () => {
      expect(api.clearNotifications).toBeDefined();
      expect(typeof api.clearNotifications).toBe("function");
    });

    it("should have getUnreadNotificationsCount method", () => {
      expect(api.getUnreadNotificationsCount).toBeDefined();
      expect(typeof api.getUnreadNotificationsCount).toBe("function");
    });
  });

  describe("Search Operations", () => {
    it("should have search method", () => {
      expect(api.search).toBeDefined();
      expect(typeof api.search).toBe("function");
    });
  });

  describe("Media Operations", () => {
    it("should have uploadMedia method", () => {
      expect(api.uploadMedia).toBeDefined();
      expect(typeof api.uploadMedia).toBe("function");
    });

    it("should have getMedia method", () => {
      expect(api.getMedia).toBeDefined();
      expect(typeof api.getMedia).toBe("function");
    });

    it("should have updateMedia method", () => {
      expect(api.updateMedia).toBeDefined();
      expect(typeof api.updateMedia).toBe("function");
    });
  });

  describe("Poll Operations", () => {
    it("should have getPoll method", () => {
      expect(api.getPoll).toBeDefined();
      expect(typeof api.getPoll).toBe("function");
    });

    it("should have votePoll method", () => {
      expect(api.votePoll).toBeDefined();
      expect(typeof api.votePoll).toBe("function");
    });
  });

  describe("List Operations", () => {
    it("should have getLists method", () => {
      expect(api.getLists).toBeDefined();
      expect(typeof api.getLists).toBe("function");
    });

    it("should have createList method", () => {
      expect(api.createList).toBeDefined();
      expect(typeof api.createList).toBe("function");
    });

    it("should have getList method", () => {
      expect(api.getList).toBeDefined();
      expect(typeof api.getList).toBe("function");
    });

    it("should have updateList method", () => {
      expect(api.updateList).toBeDefined();
      expect(typeof api.updateList).toBe("function");
    });

    it("should have deleteList method", () => {
      expect(api.deleteList).toBeDefined();
      expect(typeof api.deleteList).toBe("function");
    });

    it("should have getListAccounts method", () => {
      expect(api.getListAccounts).toBeDefined();
      expect(typeof api.getListAccounts).toBe("function");
    });

    it("should have addAccountsToList method", () => {
      expect(api.addAccountsToList).toBeDefined();
      expect(typeof api.addAccountsToList).toBe("function");
    });

    it("should have removeAccountsFromList method", () => {
      expect(api.removeAccountsFromList).toBeDefined();
      expect(typeof api.removeAccountsFromList).toBe("function");
    });
  });

  describe("Conversation Operations", () => {
    it("should have getConversations method", () => {
      expect(api.getConversations).toBeDefined();
      expect(typeof api.getConversations).toBe("function");
    });

    it("should have deleteConversation method", () => {
      expect(api.deleteConversation).toBeDefined();
      expect(typeof api.deleteConversation).toBe("function");
    });

    it("should have markConversationAsRead method", () => {
      expect(api.markConversationAsRead).toBeDefined();
      expect(typeof api.markConversationAsRead).toBe("function");
    });
  });

  describe("Filter Operations", () => {
    it("should have getFilters method", () => {
      expect(api.getFilters).toBeDefined();
      expect(typeof api.getFilters).toBe("function");
    });

    it("should have createFilter method", () => {
      expect(api.createFilter).toBeDefined();
      expect(typeof api.createFilter).toBe("function");
    });

    it("should have getFilter method", () => {
      expect(api.getFilter).toBeDefined();
      expect(typeof api.getFilter).toBe("function");
    });

    it("should have updateFilter method", () => {
      expect(api.updateFilter).toBeDefined();
      expect(typeof api.updateFilter).toBe("function");
    });

    it("should have deleteFilter method", () => {
      expect(api.deleteFilter).toBeDefined();
      expect(typeof api.deleteFilter).toBe("function");
    });

    it("should have getFilterKeywords method", () => {
      expect(api.getFilterKeywords).toBeDefined();
      expect(typeof api.getFilterKeywords).toBe("function");
    });

    it("should have addFilterKeyword method", () => {
      expect(api.addFilterKeyword).toBeDefined();
      expect(typeof api.addFilterKeyword).toBe("function");
    });

    it("should have getFilterKeyword method", () => {
      expect(api.getFilterKeyword).toBeDefined();
      expect(typeof api.getFilterKeyword).toBe("function");
    });

    it("should have updateFilterKeyword method", () => {
      expect(api.updateFilterKeyword).toBeDefined();
      expect(typeof api.updateFilterKeyword).toBe("function");
    });

    it("should have deleteFilterKeyword method", () => {
      expect(api.deleteFilterKeyword).toBeDefined();
      expect(typeof api.deleteFilterKeyword).toBe("function");
    });
  });

  describe("Marker Operations", () => {
    it("should have getMarkers method", () => {
      expect(api.getMarkers).toBeDefined();
      expect(typeof api.getMarkers).toBe("function");
    });

    it("should have saveMarkers method", () => {
      expect(api.saveMarkers).toBeDefined();
      expect(typeof api.saveMarkers).toBe("function");
    });
  });

  describe("Instance Operations", () => {
    it("should have getInstance method", () => {
      expect(api.getInstance).toBeDefined();
      expect(typeof api.getInstance).toBe("function");
    });

    it("should have getInstancePeers method", () => {
      expect(api.getInstancePeers).toBeDefined();
      expect(typeof api.getInstancePeers).toBe("function");
    });

    it("should have getInstanceActivity method", () => {
      expect(api.getInstanceActivity).toBeDefined();
      expect(typeof api.getInstanceActivity).toBe("function");
    });

    it("should have getInstanceRules method", () => {
      expect(api.getInstanceRules).toBeDefined();
      expect(typeof api.getInstanceRules).toBe("function");
    });

    it("should have getInstanceDomainBlocks method", () => {
      expect(api.getInstanceDomainBlocks).toBeDefined();
      expect(typeof api.getInstanceDomainBlocks).toBe("function");
    });

    it("should have getInstanceExtendedDescription method", () => {
      expect(api.getInstanceExtendedDescription).toBeDefined();
      expect(typeof api.getInstanceExtendedDescription).toBe("function");
    });

    it("should have getCustomEmojis method", () => {
      expect(api.getCustomEmojis).toBeDefined();
      expect(typeof api.getCustomEmojis).toBe("function");
    });

    it("should have getDirectory method", () => {
      expect(api.getDirectory).toBeDefined();
      expect(typeof api.getDirectory).toBe("function");
    });

    it("should have getTrendingTags method", () => {
      expect(api.getTrendingTags).toBeDefined();
      expect(typeof api.getTrendingTags).toBe("function");
    });

    it("should have getTrendingStatuses method", () => {
      expect(api.getTrendingStatuses).toBeDefined();
      expect(typeof api.getTrendingStatuses).toBe("function");
    });

    it("should have getTrendingLinks method", () => {
      expect(api.getTrendingLinks).toBeDefined();
      expect(typeof api.getTrendingLinks).toBe("function");
    });

    it("should have getAnnouncements method", () => {
      expect(api.getAnnouncements).toBeDefined();
      expect(typeof api.getAnnouncements).toBe("function");
    });

    it("should have dismissAnnouncement method", () => {
      expect(api.dismissAnnouncement).toBeDefined();
      expect(typeof api.dismissAnnouncement).toBe("function");
    });

    it("should have addAnnouncementReaction method", () => {
      expect(api.addAnnouncementReaction).toBeDefined();
      expect(typeof api.addAnnouncementReaction).toBe("function");
    });

    it("should have removeAnnouncementReaction method", () => {
      expect(api.removeAnnouncementReaction).toBeDefined();
      expect(typeof api.removeAnnouncementReaction).toBe("function");
    });
  });

  describe("Featured Tag Operations", () => {
    it("should have getFeaturedTags method", () => {
      expect(api.getFeaturedTags).toBeDefined();
      expect(typeof api.getFeaturedTags).toBe("function");
    });

    it("should have featureTag method", () => {
      expect(api.featureTag).toBeDefined();
      expect(typeof api.featureTag).toBe("function");
    });

    it("should have unfeatureTag method", () => {
      expect(api.unfeatureTag).toBeDefined();
      expect(typeof api.unfeatureTag).toBe("function");
    });

    it("should have getFeaturedTagSuggestions method", () => {
      expect(api.getFeaturedTagSuggestions).toBeDefined();
      expect(typeof api.getFeaturedTagSuggestions).toBe("function");
    });
  });

  describe("Preferences Operations", () => {
    it("should have getPreferences method", () => {
      expect(api.getPreferences).toBeDefined();
      expect(typeof api.getPreferences).toBe("function");
    });
  });

  describe("Suggestions Operations", () => {
    it("should have getSuggestions method", () => {
      expect(api.getSuggestions).toBeDefined();
      expect(typeof api.getSuggestions).toBe("function");
    });

    it("should have dismissSuggestion method", () => {
      expect(api.dismissSuggestion).toBeDefined();
      expect(typeof api.dismissSuggestion).toBe("function");
    });
  });

  describe("Reports Operations", () => {
    it("should have submitReport method", () => {
      expect(api.submitReport).toBeDefined();
      expect(typeof api.submitReport).toBe("function");
    });
  });

  describe("Push Subscription Operations", () => {
    it("should have getPushSubscription method", () => {
      expect(api.getPushSubscription).toBeDefined();
      expect(typeof api.getPushSubscription).toBe("function");
    });

    it("should have createPushSubscription method", () => {
      expect(api.createPushSubscription).toBeDefined();
      expect(typeof api.createPushSubscription).toBe("function");
    });

    it("should have updatePushSubscription method", () => {
      expect(api.updatePushSubscription).toBeDefined();
      expect(typeof api.updatePushSubscription).toBe("function");
    });

    it("should have deletePushSubscription method", () => {
      expect(api.deletePushSubscription).toBeDefined();
      expect(typeof api.deletePushSubscription).toBe("function");
    });
  });

  describe("Admin Operations", () => {
    it("should have adminGetAccounts method", () => {
      expect(api.adminGetAccounts).toBeDefined();
      expect(typeof api.adminGetAccounts).toBe("function");
    });

    it("should have adminGetAccount method", () => {
      expect(api.adminGetAccount).toBeDefined();
      expect(typeof api.adminGetAccount).toBe("function");
    });

    it("should have adminPerformAccountAction method", () => {
      expect(api.adminPerformAccountAction).toBeDefined();
      expect(typeof api.adminPerformAccountAction).toBe("function");
    });

    it("should have adminApproveAccount method", () => {
      expect(api.adminApproveAccount).toBeDefined();
      expect(typeof api.adminApproveAccount).toBe("function");
    });

    it("should have adminRejectAccount method", () => {
      expect(api.adminRejectAccount).toBeDefined();
      expect(typeof api.adminRejectAccount).toBe("function");
    });

    it("should have adminEnableAccount method", () => {
      expect(api.adminEnableAccount).toBeDefined();
      expect(typeof api.adminEnableAccount).toBe("function");
    });

    it("should have adminUnsilenceAccount method", () => {
      expect(api.adminUnsilenceAccount).toBeDefined();
      expect(typeof api.adminUnsilenceAccount).toBe("function");
    });

    it("should have adminUnsuspendAccount method", () => {
      expect(api.adminUnsuspendAccount).toBeDefined();
      expect(typeof api.adminUnsuspendAccount).toBe("function");
    });

    it("should have adminGetReports method", () => {
      expect(api.adminGetReports).toBeDefined();
      expect(typeof api.adminGetReports).toBe("function");
    });

    it("should have adminGetReport method", () => {
      expect(api.adminGetReport).toBeDefined();
      expect(typeof api.adminGetReport).toBe("function");
    });

    it("should have adminAssignReport method", () => {
      expect(api.adminAssignReport).toBeDefined();
      expect(typeof api.adminAssignReport).toBe("function");
    });

    it("should have adminUnassignReport method", () => {
      expect(api.adminUnassignReport).toBeDefined();
      expect(typeof api.adminUnassignReport).toBe("function");
    });

    it("should have adminReopenReport method", () => {
      expect(api.adminReopenReport).toBeDefined();
      expect(typeof api.adminReopenReport).toBe("function");
    });

    it("should have adminResolveReport method", () => {
      expect(api.adminResolveReport).toBeDefined();
      expect(typeof api.adminResolveReport).toBe("function");
    });

    it("should have adminGetDomainBlocks method", () => {
      expect(api.adminGetDomainBlocks).toBeDefined();
      expect(typeof api.adminGetDomainBlocks).toBe("function");
    });

    it("should have adminCreateDomainBlock method", () => {
      expect(api.adminCreateDomainBlock).toBeDefined();
      expect(typeof api.adminCreateDomainBlock).toBe("function");
    });

    it("should have adminGetDomainBlock method", () => {
      expect(api.adminGetDomainBlock).toBeDefined();
      expect(typeof api.adminGetDomainBlock).toBe("function");
    });

    it("should have adminUpdateDomainBlock method", () => {
      expect(api.adminUpdateDomainBlock).toBeDefined();
      expect(typeof api.adminUpdateDomainBlock).toBe("function");
    });

    it("should have adminDeleteDomainBlock method", () => {
      expect(api.adminDeleteDomainBlock).toBeDefined();
      expect(typeof api.adminDeleteDomainBlock).toBe("function");
    });
  });

  describe("Method Count Validation", () => {
    it("should have exactly 138 public methods (excluding constructor)", () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(api)).filter(
        (name) => name !== "constructor" && typeof api[name as keyof MastodonApi] === "function"
      );

      expect(methods).toHaveLength(138);
    });

    it("should have all expected methods", () => {
      const expectedMethods = [
        // Account operations
        "getAccount",
        "verifyCredentials",
        "updateCredentials",
        "lookupAccount",
        "searchAccounts",
        "getAccountStatuses",
        "getAccountFollowers",
        "getAccountFollowing",
        "followAccount",
        "unfollowAccount",
        "blockAccount",
        "unblockAccount",
        "muteAccount",
        "unmuteAccount",
        "pinAccount",
        "unpinAccount",
        "setAccountNote",
        "removeFollower",
        "getAccountRelationships",
        "getAccountLists",
        "getAccountFeaturedTags",
        "getBookmarks",
        "getFavourites",
        "getBlocks",
        "getMutes",
        "getFollowRequests",
        "authorizeFollowRequest",
        "rejectFollowRequest",
        "getEndorsements",
        // Status operations
        "createStatus",
        "getStatus",
        "updateStatus",
        "deleteStatus",
        "getStatusContext",
        "getStatusCard",
        "getStatusHistory",
        "getStatusSource",
        "translateStatus",
        "favouriteStatus",
        "unfavouriteStatus",
        "reblogStatus",
        "unreblogStatus",
        "bookmarkStatus",
        "unbookmarkStatus",
        "pinStatus",
        "unpinStatus",
        "muteStatus",
        "unmuteStatus",
        "getStatusFavouritedBy",
        "getStatusRebloggedBy",
        "getScheduledStatuses",
        "getScheduledStatus",
        "updateScheduledStatus",
        "cancelScheduledStatus",
        // Timeline operations
        "getHomeTimeline",
        "getPublicTimeline",
        "getHashtagTimeline",
        "getListTimeline",
        // Notification operations
        "getNotifications",
        "getNotification",
        "dismissNotification",
        "clearNotifications",
        "getUnreadNotificationsCount",
        // Search
        "search",
        // Media
        "uploadMedia",
        "getMedia",
        "updateMedia",
        // Polls
        "getPoll",
        "votePoll",
        // Lists
        "getLists",
        "createList",
        "getList",
        "updateList",
        "deleteList",
        "getListAccounts",
        "addAccountsToList",
        "removeAccountsFromList",
        // Conversations
        "getConversations",
        "deleteConversation",
        "markConversationAsRead",
        // Filters
        "getFilters",
        "createFilter",
        "getFilter",
        "updateFilter",
        "deleteFilter",
        "getFilterKeywords",
        "addFilterKeyword",
        "getFilterKeyword",
        "updateFilterKeyword",
        "deleteFilterKeyword",
        // Markers
        "getMarkers",
        "saveMarkers",
        // Instance
        "getInstance",
        "getInstancePeers",
        "getInstanceActivity",
        "getInstanceRules",
        "getInstanceDomainBlocks",
        "getInstanceExtendedDescription",
        "getCustomEmojis",
        "getDirectory",
        "getTrendingTags",
        "getTrendingStatuses",
        "getTrendingLinks",
        "getAnnouncements",
        "dismissAnnouncement",
        "addAnnouncementReaction",
        "removeAnnouncementReaction",
        // Featured tags
        "getFeaturedTags",
        "featureTag",
        "unfeatureTag",
        "getFeaturedTagSuggestions",
        // Preferences
        "getPreferences",
        // Suggestions
        "getSuggestions",
        "dismissSuggestion",
        // Reports
        "submitReport",
        // Push subscriptions
        "getPushSubscription",
        "createPushSubscription",
        "updatePushSubscription",
        "deletePushSubscription",
        // Admin operations
        "adminGetAccounts",
        "adminGetAccount",
        "adminPerformAccountAction",
        "adminApproveAccount",
        "adminRejectAccount",
        "adminEnableAccount",
        "adminUnsilenceAccount",
        "adminUnsuspendAccount",
        "adminGetReports",
        "adminGetReport",
        "adminAssignReport",
        "adminUnassignReport",
        "adminReopenReport",
        "adminResolveReport",
        "adminGetDomainBlocks",
        "adminCreateDomainBlock",
        "adminGetDomainBlock",
        "adminUpdateDomainBlock",
        "adminDeleteDomainBlock",
      ];

      const actualMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(api)).filter(
        (name) => name !== "constructor"
      );

      for (const method of expectedMethods) {
        expect(actualMethods).toContain(method);
      }
    });
  });
});
