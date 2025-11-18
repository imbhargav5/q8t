// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class BlueskyApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get private preferences attached to the current account. Expected use is synchronization between multiple devices, and import/export during account migration. Requires auth.
   */
  async getPreferences(): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.actor.getPreferences");
  }

  /**
   * Get detailed profile view of an actor. Does not require auth, but contains relevant metadata with auth.
   */
  async getProfile({ actor }: { actor: string }): Promise<Types.app.bsky.actor.defs.profileViewDetailed> {
    return this.client.get<Types.app.bsky.actor.defs.profileViewDetailed>("/app.bsky.actor.getProfile", {
      "actor": actor,
    });
  }

  /**
   * Get detailed profile views of multiple actors.
   */
  async getProfiles({ actors }: { actors: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.actor.getProfiles", {
      "actors": actors,
    });
  }

  /**
   * Get a list of suggested actors. Expected use is discovery of accounts to follow during new account onboarding.
   */
  async getSuggestions({ limit, cursor }: { limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.actor.getSuggestions", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Set the private preferences attached to the account.
   */
  async putPreferences(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.actor.putPreferences", body);
  }

  /**
   * Find actors (profiles) matching search criteria. Does not require auth.
   */
  async searchActors({ term, q, limit, cursor }: { term?: string; q?: string; limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.actor.searchActors", {
      "term": term,
      "q": q,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Find actor suggestions for a prefix search term. Expected use is for auto-completion during text field entry. Does not require auth.
   */
  async searchActorsTypeahead({ term, q, limit }: { term?: string; q?: string; limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.actor.searchActorsTypeahead", {
      "term": term,
      "q": q,
      "limit": limit,
    });
  }

  /**
   * Creates a private bookmark for the specified record. Currently, only `app.bsky.feed.post` records are supported. Requires authentication.
   */
  async createBookmark(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.bookmark.createBookmark", body);
  }

  /**
   * Deletes a private bookmark for the specified record. Currently, only `app.bsky.feed.post` records are supported. Requires authentication.
   */
  async deleteBookmark(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.bookmark.deleteBookmark", body);
  }

  /**
   * Gets views of records bookmarked by the authenticated user. Requires authentication.
   */
  async getBookmarks({ limit, cursor }: { limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.bookmark.getBookmarks", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get information about a feed generator, including policies and offered feed URIs. Does not require auth; implemented by Feed Generator services (not App View).
   */
  async describeFeedGenerator(): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.describeFeedGenerator");
  }

  /**
   * Get a list of feeds (feed generator records) created by the actor (in the actor's repo).
   */
  async getActorFeeds({ actor, limit, cursor }: { actor: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getActorFeeds", {
      "actor": actor,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get a list of posts liked by an actor. Requires auth, actor must be the requesting account.
   */
  async getActorLikes({ actor, limit, cursor }: { actor: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getActorLikes", {
      "actor": actor,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get a view of an actor's 'author feed' (post and reposts by the author). Does not require auth.
   */
  async getAuthorFeed({ actor, limit, cursor, filter, includePins }: { actor: string; limit?: number; cursor?: string; filter?: string; includePins?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getAuthorFeed", {
      "actor": actor,
      "limit": limit,
      "cursor": cursor,
      "filter": filter,
      "includePins": includePins,
    });
  }

  /**
   * Get a hydrated feed from an actor's selected feed generator. Implemented by App View.
   */
  async getFeed({ feed, limit, cursor }: { feed: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getFeed", {
      "feed": feed,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get information about a feed generator. Implemented by AppView.
   */
  async getFeedGenerator({ feed }: { feed: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getFeedGenerator", {
      "feed": feed,
    });
  }

  /**
   * Get information about a list of feed generators.
   */
  async getFeedGenerators({ feeds }: { feeds: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getFeedGenerators", {
      "feeds": feeds,
    });
  }

  /**
   * Get a skeleton of a feed provided by a feed generator. Auth is optional, depending on provider requirements, and provides the DID of the requester. Implemented by Feed Generator Service.
   */
  async getFeedSkeleton({ feed, limit, cursor }: { feed: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getFeedSkeleton", {
      "feed": feed,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get like records which reference a subject (by AT-URI and CID).
   */
  async getLikes({ uri, cid, limit, cursor }: { uri: string; cid?: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getLikes", {
      "uri": uri,
      "cid": cid,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get a feed of recent posts from a list (posts and reposts from any actors on the list). Does not require auth.
   */
  async getListFeed({ list, limit, cursor }: { list: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getListFeed", {
      "list": list,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get posts in a thread. Does not require auth, but additional metadata and filtering will be applied for authed requests.
   */
  async getPostThread({ uri, depth, parentHeight }: { uri: string; depth?: number; parentHeight?: number }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getPostThread", {
      "uri": uri,
      "depth": depth,
      "parentHeight": parentHeight,
    });
  }

  /**
   * Gets post views for a specified list of posts (by AT-URI). This is sometimes referred to as 'hydrating' a 'feed skeleton'.
   */
  async getPosts({ uris }: { uris: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getPosts", {
      "uris": uris,
    });
  }

  /**
   * Get a list of quotes for a given post.
   */
  async getQuotes({ uri, cid, limit, cursor }: { uri: string; cid?: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getQuotes", {
      "uri": uri,
      "cid": cid,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get a list of reposts for a given post.
   */
  async getRepostedBy({ uri, cid, limit, cursor }: { uri: string; cid?: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getRepostedBy", {
      "uri": uri,
      "cid": cid,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get a list of suggested feeds (feed generators) for the requesting account.
   */
  async getSuggestedFeeds({ limit, cursor }: { limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getSuggestedFeeds", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get a view of the requesting account's home timeline. This is expected to be some form of reverse-chronological feed.
   */
  async getTimeline({ algorithm, limit, cursor }: { algorithm?: string; limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.getTimeline", {
      "algorithm": algorithm,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Find posts matching search criteria, returning views of those posts. Note that this API endpoint may require authentication (eg, not public) for some service providers and implementations.
   */
  async searchPosts({ q, sort, since, until, mentions, author, lang, domain, url, tag, limit, cursor }: { q: string; sort?: string; since?: string; until?: string; mentions?: string; author?: string; lang?: string; domain?: string; url?: string; tag?: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.feed.searchPosts", {
      "q": q,
      "sort": sort,
      "since": since,
      "until": until,
      "mentions": mentions,
      "author": author,
      "lang": lang,
      "domain": domain,
      "url": url,
      "tag": tag,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Send information about interactions with feed items back to the feed generator that served them.
   */
  async sendInteractions(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/app.bsky.feed.sendInteractions", body);
  }

  /**
   * Get a list of starter packs created by the actor.
   */
  async getActorStarterPacks({ actor, limit, cursor }: { actor: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getActorStarterPacks", {
      "actor": actor,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Enumerates which accounts the requesting account is currently blocking. Requires auth.
   */
  async getBlocks({ limit, cursor }: { limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getBlocks", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Enumerates accounts which follow a specified account (actor).
   */
  async getFollowers({ actor, limit, cursor }: { actor: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getFollowers", {
      "actor": actor,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Enumerates accounts which a specified account (actor) follows.
   */
  async getFollows({ actor, limit, cursor }: { actor: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getFollows", {
      "actor": actor,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Enumerates accounts which follow a specified account (actor) and are followed by the viewer.
   */
  async getKnownFollowers({ actor, limit, cursor }: { actor: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getKnownFollowers", {
      "actor": actor,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Gets a 'view' (with additional context) of a specified list.
   */
  async getList({ list, limit, cursor }: { list: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getList", {
      "list": list,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get mod lists that the requesting account (actor) is blocking. Requires auth.
   */
  async getListBlocks({ limit, cursor }: { limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getListBlocks", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Enumerates mod lists that the requesting account (actor) currently has muted. Requires auth.
   */
  async getListMutes({ limit, cursor }: { limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getListMutes", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Enumerates the lists created by a specified account (actor).
   */
  async getLists({ actor, limit, cursor, purposes }: { actor: string; limit?: number; cursor?: string; purposes?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getLists", {
      "actor": actor,
      "limit": limit,
      "cursor": cursor,
      "purposes": purposes,
    });
  }

  /**
   * Enumerates the lists created by the session user, and includes membership information about `actor` in those lists. Only supports curation and moderation lists (no reference lists, used in starter packs). Requires auth.
   */
  async getListsWithMembership({ actor, limit, cursor, purposes }: { actor: string; limit?: number; cursor?: string; purposes?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getListsWithMembership", {
      "actor": actor,
      "limit": limit,
      "cursor": cursor,
      "purposes": purposes,
    });
  }

  /**
   * Enumerates accounts that the requesting account (actor) currently has muted. Requires auth.
   */
  async getMutes({ limit, cursor }: { limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getMutes", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Enumerates public relationships between one account, and a list of other accounts. Does not require auth.
   */
  async getRelationships({ actor, others }: { actor: string; others?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getRelationships", {
      "actor": actor,
      "others": others,
    });
  }

  /**
   * Gets a view of a starter pack.
   */
  async getStarterPack({ starterPack }: { starterPack: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getStarterPack", {
      "starterPack": starterPack,
    });
  }

  /**
   * Get views for a list of starter packs.
   */
  async getStarterPacks({ uris }: { uris: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getStarterPacks", {
      "uris": uris,
    });
  }

  /**
   * Enumerates the starter packs created by the session user, and includes membership information about `actor` in those starter packs. Requires auth.
   */
  async getStarterPacksWithMembership({ actor, limit, cursor }: { actor: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getStarterPacksWithMembership", {
      "actor": actor,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Enumerates follows similar to a given account (actor). Expected use is to recommend additional accounts immediately after following one account.
   */
  async getSuggestedFollowsByActor({ actor }: { actor: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.getSuggestedFollowsByActor", {
      "actor": actor,
    });
  }

  /**
   * Creates a mute relationship for the specified account. Mutes are private in Bluesky. Requires auth.
   */
  async muteActor(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.graph.muteActor", body);
  }

  /**
   * Creates a mute relationship for the specified list of accounts. Mutes are private in Bluesky. Requires auth.
   */
  async muteActorList(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.graph.muteActorList", body);
  }

  /**
   * Mutes a thread preventing notifications from the thread and any of its children. Mutes are private in Bluesky. Requires auth.
   */
  async muteThread(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.graph.muteThread", body);
  }

  /**
   * Find starter packs matching search criteria. Does not require auth.
   */
  async searchStarterPacks({ q, limit, cursor }: { q: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.graph.searchStarterPacks", {
      "q": q,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Unmutes the specified account. Requires auth.
   */
  async unmuteActor(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.graph.unmuteActor", body);
  }

  /**
   * Unmutes the specified list of accounts. Requires auth.
   */
  async unmuteActorList(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.graph.unmuteActorList", body);
  }

  /**
   * Unmutes the specified thread. Requires auth.
   */
  async unmuteThread(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.graph.unmuteThread", body);
  }

  /**
   * Get information about a list of labeler services.
   */
  async getServices({ dids, detailed }: { dids: string; detailed?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.labeler.getServices", {
      "dids": dids,
      "detailed": detailed,
    });
  }

  /**
   * Get notification-related preferences for an account. Requires auth.
   */
  async notificationGetPreferences(): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.notification.getPreferences");
  }

  /**
   * Count the number of unread notifications for the requesting account. Requires auth.
   */
  async getUnreadCount({ priority, seenAt }: { priority?: string; seenAt?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.notification.getUnreadCount", {
      "priority": priority,
      "seenAt": seenAt,
    });
  }

  /**
   * Enumerate all accounts to which the requesting account is subscribed to receive notifications for. Requires auth.
   */
  async listActivitySubscriptions({ limit, cursor }: { limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.notification.listActivitySubscriptions", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Enumerate notifications for the requesting account. Requires auth.
   */
  async listNotifications({ reasons, limit, priority, cursor, seenAt }: { reasons?: string; limit?: number; priority?: string; cursor?: string; seenAt?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.notification.listNotifications", {
      "reasons": reasons,
      "limit": limit,
      "priority": priority,
      "cursor": cursor,
      "seenAt": seenAt,
    });
  }

  /**
   * Puts an activity subscription entry. The key should be omitted for creation and provided for updates. Requires auth.
   */
  async putActivitySubscription(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/app.bsky.notification.putActivitySubscription", body);
  }

  /**
   * Set notification-related preferences for an account. Requires auth.
   */
  async notificationPutPreferences(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.notification.putPreferences", body);
  }

  /**
   * Set notification-related preferences for an account. Requires auth.
   */
  async putPreferencesV2(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/app.bsky.notification.putPreferencesV2", body);
  }

  /**
   * Register to receive push notifications, via a specified service, for the requesting account. Requires auth.
   */
  async registerPush(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.notification.registerPush", body);
  }

  /**
   * The inverse of registerPush - inform a specified service that push notifications should no longer be sent to the given token for the requesting account. Requires auth.
   */
  async unregisterPush(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.notification.unregisterPush", body);
  }

  /**
   * Notify server that the requesting account has seen notifications. Requires auth.
   */
  async updateSeen(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.notification.updateSeen", body);
  }

  /**
   * Allow a labeler to apply labels directly.
   */
  async applyLabels(body: unknown): Promise<void> {
    return this.client.post<void>("/app.bsky.unspecced.applyLabels", body);
  }

  /**
   * Checks whether the provided handle is available. If the handle is not available, available suggestions will be returned. Optional inputs will be used to generate suggestions.
   */
  async checkHandleAvailability({ handle, email, birthDate }: { handle: string; email?: string; birthDate?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.checkHandleAvailability", {
      "handle": handle,
      "email": email,
      "birthDate": birthDate,
    });
  }

  /**
   * Returns the current state of the age assurance process for an account. This is used to check if the user has completed age assurance or if further action is required.
   */
  async getAgeAssuranceState(): Promise<Types.app.bsky.unspecced.defs.ageAssuranceState> {
    return this.client.get<Types.app.bsky.unspecced.defs.ageAssuranceState>("/app.bsky.unspecced.getAgeAssuranceState");
  }

  /**
   * Get miscellaneous runtime configuration.
   */
  async getConfig(): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getConfig");
  }

  /**
   * Get a list of suggested starterpacks for onboarding
   */
  async getOnboardingSuggestedStarterPacks({ limit }: { limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getOnboardingSuggestedStarterPacks", {
      "limit": limit,
    });
  }

  /**
   * Get a skeleton of suggested starterpacks for onboarding. Intended to be called and hydrated by app.bsky.unspecced.getOnboardingSuggestedStarterPacks
   */
  async getOnboardingSuggestedStarterPacksSkeleton({ viewer, limit }: { viewer?: string; limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getOnboardingSuggestedStarterPacksSkeleton", {
      "viewer": viewer,
      "limit": limit,
    });
  }

  /**
   * DEPRECATED: will be removed soon. Use a feed generator alternative.
   */
  async getPopular({ includeNsfw, limit, cursor }: { includeNsfw?: string; limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getPopular", {
      "includeNsfw": includeNsfw,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * An unspecced view of globally popular feed generators.
   */
  async getPopularFeedGenerators({ limit, cursor, query }: { limit?: number; cursor?: string; query?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getPopularFeedGenerators", {
      "limit": limit,
      "cursor": cursor,
      "query": query,
    });
  }

  /**
   * (NOTE: this endpoint is under development and WILL change without notice. Don't use it until it is moved out of `unspecced` or your application WILL break) Get the hidden posts in a thread. It is based in an anchor post at any depth of the tree, and returns hidden replies (recursive replies, with branching to their replies) below the anchor. It does not include ancestors nor the anchor. This should be called after exhausting `app.bsky.unspecced.getPostThreadV2`. Does not require auth, but additional metadata and filtering will be applied for authed requests.
   */
  async getPostThreadHiddenV2({ anchor, prioritizeFollowedUsers }: { anchor: string; prioritizeFollowedUsers?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getPostThreadHiddenV2", {
      "anchor": anchor,
      "prioritizeFollowedUsers": prioritizeFollowedUsers,
    });
  }

  /**
   * (NOTE: this endpoint is under development and WILL change without notice. Don't use it until it is moved out of `unspecced` or your application WILL break) Get additional posts under a thread e.g. replies hidden by threadgate. Based on an anchor post at any depth of the tree, returns top-level replies below that anchor. It does not include ancestors nor the anchor itself. This should be called after exhausting `app.bsky.unspecced.getPostThreadV2`. Does not require auth, but additional metadata and filtering will be applied for authed requests.
   */
  async getPostThreadOtherV2({ anchor }: { anchor: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getPostThreadOtherV2", {
      "anchor": anchor,
    });
  }

  /**
   * (NOTE: this endpoint is under development and WILL change without notice. Don't use it until it is moved out of `unspecced` or your application WILL break) Get posts in a thread. It is based in an anchor post at any depth of the tree, and returns posts above it (recursively resolving the parent, without further branching to their replies) and below it (recursive replies, with branching to their replies). Does not require auth, but additional metadata and filtering will be applied for authed requests.
   */
  async getPostThreadV2({ anchor, above, below, branchingFactor, sort }: { anchor: string; above?: string; below?: number; branchingFactor?: number; sort?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getPostThreadV2", {
      "anchor": anchor,
      "above": above,
      "below": below,
      "branchingFactor": branchingFactor,
      "sort": sort,
    });
  }

  /**
   * Get a list of suggested feeds
   */
  async unspeccedGetSuggestedFeeds({ limit }: { limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getSuggestedFeeds", {
      "limit": limit,
    });
  }

  /**
   * Get a skeleton of suggested feeds. Intended to be called and hydrated by app.bsky.unspecced.getSuggestedFeeds
   */
  async getSuggestedFeedsSkeleton({ viewer, limit }: { viewer?: string; limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getSuggestedFeedsSkeleton", {
      "viewer": viewer,
      "limit": limit,
    });
  }

  /**
   * Get a list of suggested starterpacks
   */
  async getSuggestedStarterPacks({ limit }: { limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getSuggestedStarterPacks", {
      "limit": limit,
    });
  }

  /**
   * Get a skeleton of suggested starterpacks. Intended to be called and hydrated by app.bsky.unspecced.getSuggestedStarterpacks
   */
  async getSuggestedStarterPacksSkeleton({ viewer, limit }: { viewer?: string; limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getSuggestedStarterPacksSkeleton", {
      "viewer": viewer,
      "limit": limit,
    });
  }

  /**
   * Get a list of suggested users
   */
  async getSuggestedUsers({ category, limit }: { category?: string; limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getSuggestedUsers", {
      "category": category,
      "limit": limit,
    });
  }

  /**
   * Get a skeleton of suggested users. Intended to be called and hydrated by app.bsky.unspecced.getSuggestedUsers
   */
  async getSuggestedUsersSkeleton({ viewer, category, limit }: { viewer?: string; category?: string; limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getSuggestedUsersSkeleton", {
      "viewer": viewer,
      "category": category,
      "limit": limit,
    });
  }

  /**
   * Get a skeleton of suggested actors. Intended to be called and then hydrated through app.bsky.actor.getSuggestions
   */
  async getSuggestionsSkeleton({ viewer, limit, cursor, relativeToDid }: { viewer?: string; limit?: number; cursor?: string; relativeToDid?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getSuggestionsSkeleton", {
      "viewer": viewer,
      "limit": limit,
      "cursor": cursor,
      "relativeToDid": relativeToDid,
    });
  }

  /**
   * Get a list of suggestions (feeds and users) tagged with categories
   */
  async getTaggedSuggestions(): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getTaggedSuggestions");
  }

  /**
   * DEPRECATED: a skeleton of a timeline. Unspecced and will be unavailable soon.
   */
  async getTimelineSkeleton({ limit, cursor }: { limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getTimelineSkeleton", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get a list of trending topics
   */
  async getTrendingTopics({ viewer, limit }: { viewer?: string; limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getTrendingTopics", {
      "viewer": viewer,
      "limit": limit,
    });
  }

  /**
   * Get the current trends on the network
   */
  async getTrends({ limit }: { limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getTrends", {
      "limit": limit,
    });
  }

  /**
   * Get the skeleton of trends on the network. Intended to be called and then hydrated through app.bsky.unspecced.getTrends
   */
  async getTrendsSkeleton({ viewer, limit }: { viewer?: string; limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.getTrendsSkeleton", {
      "viewer": viewer,
      "limit": limit,
    });
  }

  /**
   * Initiate age assurance for an account. This is a one-time action that will start the process of verifying the user's age.
   */
  async initAgeAssurance(body: unknown): Promise<Types.app.bsky.unspecced.defs.ageAssuranceState> {
    return this.client.post<Types.app.bsky.unspecced.defs.ageAssuranceState>("/app.bsky.unspecced.initAgeAssurance", body);
  }

  /**
   * Backend Actors (profile) search, returns only skeleton.
   */
  async searchActorsSkeleton({ q, viewer, typeahead, limit, cursor }: { q: string; viewer?: string; typeahead?: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.searchActorsSkeleton", {
      "q": q,
      "viewer": viewer,
      "typeahead": typeahead,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Backend Posts search, returns only skeleton
   */
  async searchPostsSkeleton({ q, sort, since, until, mentions, author, lang, domain, url, tag, viewer, limit, cursor }: { q: string; sort?: string; since?: string; until?: string; mentions?: string; author?: string; lang?: string; domain?: string; url?: string; tag?: string; viewer?: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.searchPostsSkeleton", {
      "q": q,
      "sort": sort,
      "since": since,
      "until": until,
      "mentions": mentions,
      "author": author,
      "lang": lang,
      "domain": domain,
      "url": url,
      "tag": tag,
      "viewer": viewer,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Backend Starter Pack search, returns only skeleton.
   */
  async searchStarterPacksSkeleton({ q, viewer, limit, cursor }: { q: string; viewer?: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.unspecced.searchStarterPacksSkeleton", {
      "q": q,
      "viewer": viewer,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get status details for a video processing job.
   */
  async getJobStatus({ jobId }: { jobId: string }): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.video.getJobStatus", {
      "jobId": jobId,
    });
  }

  /**
   * Get video upload limits for the authenticated user.
   */
  async getUploadLimits(): Promise<unknown> {
    return this.client.get<unknown>("/app.bsky.video.getUploadLimits");
  }

  /**
   * Upload a video to be processed then stored on the PDS.
   */
  async uploadVideo(): Promise<unknown> {
    return this.client.post<unknown>("/app.bsky.video.uploadVideo");
  }

  async deleteAccount(): Promise<unknown> {
    return this.client.post<unknown>("/chat.bsky.actor.deleteAccount");
  }

  async exportAccountData(): Promise<void> {
    return this.client.get<void>("/chat.bsky.actor.exportAccountData");
  }

  async acceptConvo(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/chat.bsky.convo.acceptConvo", body);
  }

  /**
   * Adds an emoji reaction to a message. Requires authentication. It is idempotent, so multiple calls from the same user with the same emoji result in a single reaction.
   */
  async addReaction(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/chat.bsky.convo.addReaction", body);
  }

  async deleteMessageForSelf(body: unknown): Promise<Types.chat.bsky.convo.defs.deletedMessageView> {
    return this.client.post<Types.chat.bsky.convo.defs.deletedMessageView>("/chat.bsky.convo.deleteMessageForSelf", body);
  }

  async getConvo({ convoId }: { convoId: string }): Promise<unknown> {
    return this.client.get<unknown>("/chat.bsky.convo.getConvo", {
      "convoId": convoId,
    });
  }

  /**
   * Get whether the requester and the other members can chat. If an existing convo is found for these members, it is returned.
   */
  async getConvoAvailability({ members }: { members: string }): Promise<unknown> {
    return this.client.get<unknown>("/chat.bsky.convo.getConvoAvailability", {
      "members": members,
    });
  }

  async getConvoForMembers({ members }: { members: string }): Promise<unknown> {
    return this.client.get<unknown>("/chat.bsky.convo.getConvoForMembers", {
      "members": members,
    });
  }

  async getLog({ cursor }: { cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/chat.bsky.convo.getLog", {
      "cursor": cursor,
    });
  }

  async getMessages({ convoId, limit, cursor }: { convoId: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/chat.bsky.convo.getMessages", {
      "convoId": convoId,
      "limit": limit,
      "cursor": cursor,
    });
  }

  async leaveConvo(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/chat.bsky.convo.leaveConvo", body);
  }

  async listConvos({ limit, cursor, readState, status }: { limit?: number; cursor?: string; readState?: string; status?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/chat.bsky.convo.listConvos", {
      "limit": limit,
      "cursor": cursor,
      "readState": readState,
      "status": status,
    });
  }

  async muteConvo(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/chat.bsky.convo.muteConvo", body);
  }

  /**
   * Removes an emoji reaction from a message. Requires authentication. It is idempotent, so multiple calls from the same user with the same emoji result in that reaction not being present, even if it already wasn't.
   */
  async removeReaction(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/chat.bsky.convo.removeReaction", body);
  }

  async sendMessage(body: unknown): Promise<Types.chat.bsky.convo.defs.messageView> {
    return this.client.post<Types.chat.bsky.convo.defs.messageView>("/chat.bsky.convo.sendMessage", body);
  }

  async sendMessageBatch(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/chat.bsky.convo.sendMessageBatch", body);
  }

  async unmuteConvo(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/chat.bsky.convo.unmuteConvo", body);
  }

  async updateAllRead(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/chat.bsky.convo.updateAllRead", body);
  }

  async updateRead(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/chat.bsky.convo.updateRead", body);
  }

  async getActorMetadata({ actor }: { actor: string }): Promise<unknown> {
    return this.client.get<unknown>("/chat.bsky.moderation.getActorMetadata", {
      "actor": actor,
    });
  }

  async getMessageContext({ convoId, messageId, before, after }: { convoId?: string; messageId: string; before?: number; after?: number }): Promise<unknown> {
    return this.client.get<unknown>("/chat.bsky.moderation.getMessageContext", {
      "convoId": convoId,
      "messageId": messageId,
      "before": before,
      "after": after,
    });
  }

  async updateActorAccess(body: unknown): Promise<void> {
    return this.client.post<void>("/chat.bsky.moderation.updateActorAccess", body);
  }

  /**
   * Administrative action to create a new, re-usable communication (email for now) template.
   */
  async createCommunicationTemplate(body: unknown): Promise<Types.com.atproto.admin.defs.communicationTemplateView> {
    return this.client.post<Types.com.atproto.admin.defs.communicationTemplateView>("/com.atproto.admin.createCommunicationTemplate", body);
  }

  /**
   * Delete a user account as an administrator.
   */
  async adminDeleteAccount(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.admin.deleteAccount", body);
  }

  /**
   * Delete a communication template.
   */
  async deleteCommunicationTemplate(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.admin.deleteCommunicationTemplate", body);
  }

  /**
   * Disable an account from receiving new invite codes, but does not invalidate existing codes.
   */
  async disableAccountInvites(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.admin.disableAccountInvites", body);
  }

  /**
   * Disable some set of codes and/or all codes associated with a set of users.
   */
  async disableInviteCodes(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.admin.disableInviteCodes", body);
  }

  /**
   * Take a moderation action on an actor.
   */
  async emitModerationEvent(body: unknown): Promise<Types.com.atproto.admin.defs.modEventView> {
    return this.client.post<Types.com.atproto.admin.defs.modEventView>("/com.atproto.admin.emitModerationEvent", body);
  }

  /**
   * Re-enable an account's ability to receive invite codes.
   */
  async enableAccountInvites(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.admin.enableAccountInvites", body);
  }

  /**
   * Get details about an account.
   */
  async getAccountInfo({ did }: { did: string }): Promise<Types.com.atproto.admin.defs.accountView> {
    return this.client.get<Types.com.atproto.admin.defs.accountView>("/com.atproto.admin.getAccountInfo", {
      "did": did,
    });
  }

  /**
   * Get details about some accounts.
   */
  async getAccountInfos({ dids }: { dids: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.admin.getAccountInfos", {
      "dids": dids,
    });
  }

  /**
   * Get an admin view of invite codes.
   */
  async getInviteCodes({ sort, limit, cursor }: { sort?: string; limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.admin.getInviteCodes", {
      "sort": sort,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get details about a moderation action.
   */
  async getModerationAction({ id }: { id: number }): Promise<Types.com.atproto.admin.defs.actionViewDetail> {
    return this.client.get<Types.com.atproto.admin.defs.actionViewDetail>("/com.atproto.admin.getModerationAction", {
      "id": id,
    });
  }

  /**
   * Get a list of moderation actions related to a subject.
   */
  async getModerationActions({ subject, limit, cursor }: { subject?: string; limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.admin.getModerationActions", {
      "subject": subject,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Get details about a moderation event.
   */
  async getModerationEvent({ id }: { id: number }): Promise<Types.com.atproto.admin.defs.modEventViewDetail> {
    return this.client.get<Types.com.atproto.admin.defs.modEventViewDetail>("/com.atproto.admin.getModerationEvent", {
      "id": id,
    });
  }

  /**
   * Get details about a moderation report.
   */
  async getModerationReport({ id }: { id: number }): Promise<Types.com.atproto.admin.defs.reportViewDetail> {
    return this.client.get<Types.com.atproto.admin.defs.reportViewDetail>("/com.atproto.admin.getModerationReport", {
      "id": id,
    });
  }

  /**
   * Get moderation reports related to a subject.
   */
  async getModerationReports({ subject, ignoreSubjects, actionedBy, reporters, resolved, actionType, limit, cursor, reverse }: { subject?: string; ignoreSubjects?: string; actionedBy?: string; reporters?: string; resolved?: string; actionType?: string; limit?: number; cursor?: string; reverse?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.admin.getModerationReports", {
      "subject": subject,
      "ignoreSubjects": ignoreSubjects,
      "actionedBy": actionedBy,
      "reporters": reporters,
      "resolved": resolved,
      "actionType": actionType,
      "limit": limit,
      "cursor": cursor,
      "reverse": reverse,
    });
  }

  /**
   * Get details about a record.
   */
  async getRecord({ uri, cid }: { uri: string; cid?: string }): Promise<Types.com.atproto.admin.defs.recordViewDetail> {
    return this.client.get<Types.com.atproto.admin.defs.recordViewDetail>("/com.atproto.admin.getRecord", {
      "uri": uri,
      "cid": cid,
    });
  }

  /**
   * Get details about a repository.
   */
  async getRepo({ did }: { did: string }): Promise<Types.com.atproto.admin.defs.repoViewDetail> {
    return this.client.get<Types.com.atproto.admin.defs.repoViewDetail>("/com.atproto.admin.getRepo", {
      "did": did,
    });
  }

  /**
   * Get the service-specific admin status of a subject (account, record, or blob).
   */
  async getSubjectStatus({ did, uri, blob }: { did?: string; uri?: string; blob?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.admin.getSubjectStatus", {
      "did": did,
      "uri": uri,
      "blob": blob,
    });
  }

  /**
   * Get list of all communication templates.
   */
  async listCommunicationTemplates(): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.admin.listCommunicationTemplates");
  }

  /**
   * List moderation events related to a subject.
   */
  async queryModerationEvents({ types, createdBy, sortDirection, createdAfter, createdBefore, subject, includeAllUserRecords, limit, hasComment, comment, addedLabels, removedLabels, addedTags, removedTags, reportTypes, cursor }: { types?: string; createdBy?: string; sortDirection?: string; createdAfter?: string; createdBefore?: string; subject?: string; includeAllUserRecords?: string; limit?: number; hasComment?: string; comment?: string; addedLabels?: string; removedLabels?: string; addedTags?: string; removedTags?: string; reportTypes?: string; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.admin.queryModerationEvents", {
      "types": types,
      "createdBy": createdBy,
      "sortDirection": sortDirection,
      "createdAfter": createdAfter,
      "createdBefore": createdBefore,
      "subject": subject,
      "includeAllUserRecords": includeAllUserRecords,
      "limit": limit,
      "hasComment": hasComment,
      "comment": comment,
      "addedLabels": addedLabels,
      "removedLabels": removedLabels,
      "addedTags": addedTags,
      "removedTags": removedTags,
      "reportTypes": reportTypes,
      "cursor": cursor,
    });
  }

  /**
   * View moderation statuses of subjects (record or repo).
   */
  async queryModerationStatuses({ subject, comment, reportedAfter, reportedBefore, reviewedAfter, reviewedBefore, includeMuted, reviewState, ignoreSubjects, lastReviewedBy, sortField, sortDirection, takendown, appealed, limit, tags, excludeTags, cursor }: { subject?: string; comment?: string; reportedAfter?: string; reportedBefore?: string; reviewedAfter?: string; reviewedBefore?: string; includeMuted?: string; reviewState?: string; ignoreSubjects?: string; lastReviewedBy?: string; sortField?: string; sortDirection?: string; takendown?: string; appealed?: string; limit?: number; tags?: string; excludeTags?: string; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.admin.queryModerationStatuses", {
      "subject": subject,
      "comment": comment,
      "reportedAfter": reportedAfter,
      "reportedBefore": reportedBefore,
      "reviewedAfter": reviewedAfter,
      "reviewedBefore": reviewedBefore,
      "includeMuted": includeMuted,
      "reviewState": reviewState,
      "ignoreSubjects": ignoreSubjects,
      "lastReviewedBy": lastReviewedBy,
      "sortField": sortField,
      "sortDirection": sortDirection,
      "takendown": takendown,
      "appealed": appealed,
      "limit": limit,
      "tags": tags,
      "excludeTags": excludeTags,
      "cursor": cursor,
    });
  }

  /**
   * Administrative action to rebase an account's repo
   */
  async rebaseRepo(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.admin.rebaseRepo", body);
  }

  /**
   * Resolve moderation reports by an action.
   */
  async resolveModerationReports(body: unknown): Promise<Types.com.atproto.admin.defs.actionView> {
    return this.client.post<Types.com.atproto.admin.defs.actionView>("/com.atproto.admin.resolveModerationReports", body);
  }

  /**
   * Reverse a moderation action.
   */
  async reverseModerationAction(body: unknown): Promise<Types.com.atproto.admin.defs.actionView> {
    return this.client.post<Types.com.atproto.admin.defs.actionView>("/com.atproto.admin.reverseModerationAction", body);
  }

  /**
   * Get list of accounts that matches your search query.
   */
  async searchAccounts({ email, cursor, limit }: { email?: string; cursor?: string; limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.admin.searchAccounts", {
      "email": email,
      "cursor": cursor,
      "limit": limit,
    });
  }

  /**
   * Find repositories based on a search term.
   */
  async searchRepos({ term, q, limit, cursor }: { term?: string; q?: string; limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.admin.searchRepos", {
      "term": term,
      "q": q,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Send email to a user's account email address.
   */
  async sendEmail(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.admin.sendEmail", body);
  }

  /**
   * Take a moderation action on an actor.
   */
  async takeModerationAction(body: unknown): Promise<Types.com.atproto.admin.defs.actionView> {
    return this.client.post<Types.com.atproto.admin.defs.actionView>("/com.atproto.admin.takeModerationAction", body);
  }

  /**
   * Administrative action to update an account's email.
   */
  async updateAccountEmail(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.admin.updateAccountEmail", body);
  }

  /**
   * Administrative action to update an account's handle.
   */
  async updateAccountHandle(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.admin.updateAccountHandle", body);
  }

  /**
   * Update the password for a user account as an administrator.
   */
  async updateAccountPassword(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.admin.updateAccountPassword", body);
  }

  /**
   * Administrative action to update an account's signing key in their Did document.
   */
  async updateAccountSigningKey(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.admin.updateAccountSigningKey", body);
  }

  /**
   * Administrative action to update an existing communication template. Allows passing partial fields to patch specific fields only.
   */
  async updateCommunicationTemplate(body: unknown): Promise<Types.com.atproto.admin.defs.communicationTemplateView> {
    return this.client.post<Types.com.atproto.admin.defs.communicationTemplateView>("/com.atproto.admin.updateCommunicationTemplate", body);
  }

  /**
   * Update the service-specific admin status of a subject (account, record, or blob).
   */
  async updateSubjectStatus(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.admin.updateSubjectStatus", body);
  }

  /**
   * Describe the credentials that should be included in the DID doc of an account that is migrating to this service.
   */
  async getRecommendedDidCredentials(): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.identity.getRecommendedDidCredentials");
  }

  /**
   * Request that the server re-resolve an identity (DID and handle). The server may ignore this request, or require authentication, depending on the role, implementation, and policy of the server.
   */
  async refreshIdentity(body: unknown): Promise<Types.com.atproto.identity.defs.identityInfo> {
    return this.client.post<Types.com.atproto.identity.defs.identityInfo>("/com.atproto.identity.refreshIdentity", body);
  }

  /**
   * Request an email with a code to in order to request a signed PLC operation. Requires Auth.
   */
  async requestPlcOperationSignature(): Promise<void> {
    return this.client.post<void>("/com.atproto.identity.requestPlcOperationSignature");
  }

  /**
   * Resolves DID to DID document. Does not bi-directionally verify handle.
   */
  async resolveDid({ did }: { did: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.identity.resolveDid", {
      "did": did,
    });
  }

  /**
   * Resolves an atproto handle (hostname) to a DID. Does not necessarily bi-directionally verify against the the DID document.
   */
  async resolveHandle({ handle }: { handle: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.identity.resolveHandle", {
      "handle": handle,
    });
  }

  /**
   * Resolves an identity (DID or Handle) to a full identity (DID document and verified handle).
   */
  async resolveIdentity({ identifier }: { identifier: string }): Promise<Types.com.atproto.identity.defs.identityInfo> {
    return this.client.get<Types.com.atproto.identity.defs.identityInfo>("/com.atproto.identity.resolveIdentity", {
      "identifier": identifier,
    });
  }

  /**
   * Signs a PLC operation to update some value(s) in the requesting DID's document.
   */
  async signPlcOperation(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.identity.signPlcOperation", body);
  }

  /**
   * Validates a PLC operation to ensure that it doesn't violate a service's constraints or get the identity into a bad state, then submits it to the PLC registry
   */
  async submitPlcOperation(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.identity.submitPlcOperation", body);
  }

  /**
   * Updates the current account's handle. Verifies handle validity, and updates did:plc document if necessary. Implemented by PDS, and requires auth.
   */
  async updateHandle(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.identity.updateHandle", body);
  }

  /**
   * Find labels relevant to the provided AT-URI patterns. Public endpoint for moderation services, though may return different or additional results with auth.
   */
  async queryLabels({ uriPatterns, sources, limit, cursor }: { uriPatterns: string; sources?: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.label.queryLabels", {
      "uriPatterns": uriPatterns,
      "sources": sources,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Resolves an atproto lexicon (NSID) to a schema.
   */
  async resolveLexicon({ nsid }: { nsid: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.lexicon.resolveLexicon", {
      "nsid": nsid,
    });
  }

  /**
   * Submit a moderation report regarding an atproto account or record. Implemented by moderation services (with PDS proxying), and requires auth.
   */
  async createReport(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.moderation.createReport", body);
  }

  /**
   * Apply a batch transaction of repository creates, updates, and deletes. Requires auth, implemented by PDS.
   */
  async applyWrites(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.repo.applyWrites", body);
  }

  /**
   * Create a single new repository record. Requires auth, implemented by PDS.
   */
  async createRecord(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.repo.createRecord", body);
  }

  /**
   * Delete a repository record, or ensure it doesn't exist. Requires auth, implemented by PDS.
   */
  async deleteRecord(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.repo.deleteRecord", body);
  }

  /**
   * Get information about an account and repository, including the list of collections. Does not require auth.
   */
  async describeRepo({ repo }: { repo: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.repo.describeRepo", {
      "repo": repo,
    });
  }

  /**
   * Get a single record from a repository. Does not require auth.
   */
  async repoGetRecord({ repo, collection, rkey, cid }: { repo: string; collection: string; rkey: string; cid?: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.repo.getRecord", {
      "repo": repo,
      "collection": collection,
      "rkey": rkey,
      "cid": cid,
    });
  }

  /**
   * Import a repo in the form of a CAR file. Requires Content-Length HTTP header to be set.
   */
  async importRepo(): Promise<void> {
    return this.client.post<void>("/com.atproto.repo.importRepo");
  }

  /**
   * Returns a list of missing blobs for the requesting account. Intended to be used in the account migration flow.
   */
  async listMissingBlobs({ limit, cursor }: { limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.repo.listMissingBlobs", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * List a range of records in a repository, matching a specific collection. Does not require auth.
   */
  async listRecords({ repo, collection, limit, cursor, reverse }: { repo: string; collection: string; limit?: number; cursor?: string; reverse?: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.repo.listRecords", {
      "repo": repo,
      "collection": collection,
      "limit": limit,
      "cursor": cursor,
      "reverse": reverse,
    });
  }

  /**
   * Write a repository record, creating or updating it as needed. Requires auth, implemented by PDS.
   */
  async putRecord(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.repo.putRecord", body);
  }

  /**
   * Simple rebase of repo that deletes history
   */
  async repoRebaseRepo(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.repo.rebaseRepo", body);
  }

  /**
   * Upload a new blob, to be referenced from a repository record. The blob will be deleted if it is not referenced within a time window (eg, minutes). Blob restrictions (mimetype, size, etc) are enforced when the reference is created. Requires auth, implemented by PDS.
   */
  async uploadBlob(): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.repo.uploadBlob");
  }

  /**
   * Activates a currently deactivated account. Used to finalize account migration after the account's repo is imported and identity is setup.
   */
  async activateAccount(): Promise<void> {
    return this.client.post<void>("/com.atproto.server.activateAccount");
  }

  /**
   * Returns the status of an account, especially as pertaining to import or recovery. Can be called many times over the course of an account migration. Requires auth and can only be called pertaining to oneself.
   */
  async checkAccountStatus(): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.server.checkAccountStatus");
  }

  /**
   * Confirm an email using a token from com.atproto.server.requestEmailConfirmation.
   */
  async confirmEmail(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.server.confirmEmail", body);
  }

  /**
   * Create an account. Implemented by PDS.
   */
  async createAccount(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.server.createAccount", body);
  }

  /**
   * Create an App Password.
   */
  async createAppPassword(body: unknown): Promise<Types.com.atproto.server.createAppPassword.appPassword> {
    return this.client.post<Types.com.atproto.server.createAppPassword.appPassword>("/com.atproto.server.createAppPassword", body);
  }

  /**
   * Create an invite code.
   */
  async createInviteCode(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.server.createInviteCode", body);
  }

  /**
   * Create invite codes.
   */
  async createInviteCodes(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.server.createInviteCodes", body);
  }

  /**
   * Create an authentication session.
   */
  async createSession(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.server.createSession", body);
  }

  /**
   * Deactivates a currently active account. Stops serving of repo, and future writes to repo until reactivated. Used to finalize account migration with the old host after the account has been activated on the new host.
   */
  async deactivateAccount(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.server.deactivateAccount", body);
  }

  /**
   * Delete an actor's account with a token and password. Can only be called after requesting a deletion token. Requires auth.
   */
  async serverDeleteAccount(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.server.deleteAccount", body);
  }

  /**
   * Delete the current session. Requires auth.
   */
  async deleteSession(): Promise<void> {
    return this.client.post<void>("/com.atproto.server.deleteSession");
  }

  /**
   * Describes the server's account creation requirements and capabilities. Implemented by PDS.
   */
  async describeServer(): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.server.describeServer");
  }

  /**
   * Get all invite codes for the current account. Requires auth.
   */
  async getAccountInviteCodes({ includeUsed, createAvailable }: { includeUsed?: string; createAvailable?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.server.getAccountInviteCodes", {
      "includeUsed": includeUsed,
      "createAvailable": createAvailable,
    });
  }

  /**
   * Get a signed token on behalf of the requesting DID for the requested service.
   */
  async getServiceAuth({ aud, exp, lxm }: { aud: string; exp?: number; lxm?: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.server.getServiceAuth", {
      "aud": aud,
      "exp": exp,
      "lxm": lxm,
    });
  }

  /**
   * Get information about the current auth session. Requires auth.
   */
  async getSession(): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.server.getSession");
  }

  /**
   * List all App Passwords.
   */
  async listAppPasswords(): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.server.listAppPasswords");
  }

  /**
   * Refresh an authentication session. Requires auth using the 'refreshJwt' (not the 'accessJwt').
   */
  async refreshSession(): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.server.refreshSession");
  }

  /**
   * Initiate a user account deletion via email.
   */
  async requestAccountDelete(): Promise<void> {
    return this.client.post<void>("/com.atproto.server.requestAccountDelete");
  }

  /**
   * Request an email with a code to confirm ownership of email.
   */
  async requestEmailConfirmation(): Promise<void> {
    return this.client.post<void>("/com.atproto.server.requestEmailConfirmation");
  }

  /**
   * Request a token in order to update email.
   */
  async requestEmailUpdate(): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.server.requestEmailUpdate");
  }

  /**
   * Initiate a user account password reset via email.
   */
  async requestPasswordReset(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.server.requestPasswordReset", body);
  }

  /**
   * Reserve a repo signing key, for use with account creation. Necessary so that a DID PLC update operation can be constructed during an account migraiton. Public and does not require auth; implemented by PDS. NOTE: this endpoint may change when full account migration is implemented.
   */
  async reserveSigningKey(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.server.reserveSigningKey", body);
  }

  /**
   * Reset a user account password using a token.
   */
  async resetPassword(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.server.resetPassword", body);
  }

  /**
   * Revoke an App Password by name.
   */
  async revokeAppPassword(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.server.revokeAppPassword", body);
  }

  /**
   * Update an account's email.
   */
  async updateEmail(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.server.updateEmail", body);
  }

  /**
   * Get a blob associated with a given account. Returns the full blob as originally uploaded. Does not require auth; implemented by PDS.
   */
  async getBlob({ did, cid }: { did: string; cid: string }): Promise<void> {
    return this.client.get<void>("/com.atproto.sync.getBlob", {
      "did": did,
      "cid": cid,
    });
  }

  /**
   * Get data blocks from a given repo, by CID. For example, intermediate MST nodes, or records. Does not require auth; implemented by PDS.
   */
  async syncGetBlocks({ did, cids }: { did: string; cids: string }): Promise<void> {
    return this.client.get<void>("/com.atproto.sync.getBlocks", {
      "did": did,
      "cids": cids,
    });
  }

  /**
   * DEPRECATED - please use com.atproto.sync.getRepo instead
   */
  async getCheckout({ did }: { did: string }): Promise<void> {
    return this.client.get<void>("/com.atproto.sync.getCheckout", {
      "did": did,
    });
  }

  /**
   * Gets the path of repo commits
   */
  async getCommitPath({ did, latest, earliest }: { did: string; latest?: string; earliest?: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.sync.getCommitPath", {
      "did": did,
      "latest": latest,
      "earliest": earliest,
    });
  }

  /**
   * DEPRECATED - please use com.atproto.sync.getLatestCommit instead
   */
  async getHead({ did }: { did: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.sync.getHead", {
      "did": did,
    });
  }

  /**
   * Returns information about a specified upstream host, as consumed by the server. Implemented by relays.
   */
  async getHostStatus({ hostname }: { hostname: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.sync.getHostStatus", {
      "hostname": hostname,
    });
  }

  /**
   * Get the current commit CID & revision of the specified repo. Does not require auth.
   */
  async getLatestCommit({ did }: { did: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.sync.getLatestCommit", {
      "did": did,
    });
  }

  /**
   * Get data blocks needed to prove the existence or non-existence of record in the current version of repo. Does not require auth.
   */
  async syncGetRecord({ did, collection, rkey }: { did: string; collection: string; rkey: string }): Promise<void> {
    return this.client.get<void>("/com.atproto.sync.getRecord", {
      "did": did,
      "collection": collection,
      "rkey": rkey,
    });
  }

  /**
   * Download a repository export as CAR file. Optionally only a 'diff' since a previous revision. Does not require auth; implemented by PDS.
   */
  async syncGetRepo({ did, since }: { did: string; since?: string }): Promise<void> {
    return this.client.get<void>("/com.atproto.sync.getRepo", {
      "did": did,
      "since": since,
    });
  }

  /**
   * Get the hosting status for a repository, on this server. Expected to be implemented by PDS and Relay.
   */
  async getRepoStatus({ did }: { did: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.sync.getRepoStatus", {
      "did": did,
    });
  }

  /**
   * List blob CIDs for an account, since some repo revision. Does not require auth; implemented by PDS.
   */
  async listBlobs({ did, since, limit, cursor }: { did: string; since?: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.sync.listBlobs", {
      "did": did,
      "since": since,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Enumerates upstream hosts (eg, PDS or relay instances) that this service consumes from. Implemented by relays.
   */
  async listHosts({ limit, cursor }: { limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.sync.listHosts", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Enumerates all the DID, rev, and commit CID for all repos hosted by this service. Does not require auth; implemented by PDS and Relay.
   */
  async listRepos({ limit, cursor }: { limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.sync.listRepos", {
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Enumerates all the DIDs which have records with the given collection NSID.
   */
  async listReposByCollection({ collection, limit, cursor }: { collection: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.sync.listReposByCollection", {
      "collection": collection,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Notify a crawling service of a recent update, and that crawling should resume. Intended use is after a gap between repo stream events caused the crawling service to disconnect. Does not require auth; implemented by Relay. DEPRECATED: just use com.atproto.sync.requestCrawl
   */
  async notifyOfUpdate(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.sync.notifyOfUpdate", body);
  }

  /**
   * Request a service to persistently crawl hosted repos. Expected use is new PDS instances declaring their existence to Relays. Does not require auth.
   */
  async requestCrawl(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.sync.requestCrawl", body);
  }

  /**
   * Add a handle to the set of reserved handles.
   */
  async addReservedHandle(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.temp.addReservedHandle", body);
  }

  /**
   * Checks whether the provided handle is available. If the handle is not available, available suggestions will be returned. Optional inputs will be used to generate suggestions.
   */
  async tempCheckHandleAvailability({ handle, email, birthDate }: { handle: string; email?: string; birthDate?: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.temp.checkHandleAvailability", {
      "handle": handle,
      "email": email,
      "birthDate": birthDate,
    });
  }

  /**
   * Check accounts location in signup queue.
   */
  async checkSignupQueue(): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.temp.checkSignupQueue");
  }

  /**
   * Allows finding the oauth permission scope from a reference
   */
  async dereferenceScope({ scope }: { scope: string }): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.temp.dereferenceScope", {
      "scope": scope,
    });
  }

  /**
   * DEPRECATED: use queryLabels or subscribeLabels instead -- Fetch all labels from a labeler created after a certain date.
   */
  async fetchLabels({ since, limit }: { since?: number; limit?: number } = {}): Promise<unknown> {
    return this.client.get<unknown>("/com.atproto.temp.fetchLabels", {
      "since": since,
      "limit": limit,
    });
  }

  /**
   * Gets the did's repo, optionally catching up from a specific revision.
   */
  async tempImportRepo(): Promise<void> {
    return this.client.post<void>("/com.atproto.temp.importRepo");
  }

  /**
   * Gets the did's repo, optionally catching up from a specific revision.
   */
  async pushBlob(): Promise<void> {
    return this.client.post<void>("/com.atproto.temp.pushBlob");
  }

  /**
   * Request a verification code to be sent to the supplied phone number
   */
  async requestPhoneVerification(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.temp.requestPhoneVerification", body);
  }

  /**
   * Revoke sessions, password, and app passwords associated with account. May be resolved by a password reset.
   */
  async revokeAccountCredentials(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.temp.revokeAccountCredentials", body);
  }

  /**
   * Transfer an account. NOTE: temporary method, necessarily how account migration will be implemented.
   */
  async transferAccount(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/com.atproto.temp.transferAccount", body);
  }

  /**
   * Upgrade a repo to v3
   */
  async upgradeRepoVersion(body: unknown): Promise<void> {
    return this.client.post<void>("/com.atproto.temp.upgradeRepoVersion", body);
  }

  /**
   * Administrative action to create a new, re-usable communication (email for now) template.
   */
  async createTemplate(body: unknown): Promise<Types.tools.ozone.communication.defs.templateView> {
    return this.client.post<Types.tools.ozone.communication.defs.templateView>("/tools.ozone.communication.createTemplate", body);
  }

  /**
   * Delete a communication template.
   */
  async deleteTemplate(body: unknown): Promise<void> {
    return this.client.post<void>("/tools.ozone.communication.deleteTemplate", body);
  }

  /**
   * Get list of all communication templates.
   */
  async listTemplates(): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.communication.listTemplates");
  }

  /**
   * Administrative action to update an existing communication template. Allows passing partial fields to patch specific fields only.
   */
  async updateTemplate(body: unknown): Promise<Types.tools.ozone.communication.defs.templateView> {
    return this.client.post<Types.tools.ozone.communication.defs.templateView>("/tools.ozone.communication.updateTemplate", body);
  }

  /**
   * Get account history, e.g. log of updated email addresses or other identity information.
   */
  async getAccountHistory({ did, events, cursor, limit }: { did: string; events?: string; cursor?: string; limit?: number }): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.hosting.getAccountHistory", {
      "did": did,
      "events": events,
      "cursor": cursor,
      "limit": limit,
    });
  }

  /**
   * Cancel all pending scheduled moderation actions for specified subjects
   */
  async cancelScheduledActions(body: unknown): Promise<Types.tools.ozone.moderation.cancelScheduledActions.cancellationResults> {
    return this.client.post<Types.tools.ozone.moderation.cancelScheduledActions.cancellationResults>("/tools.ozone.moderation.cancelScheduledActions", body);
  }

  /**
   * Take a moderation action on an actor.
   */
  async emitEvent(body: unknown): Promise<Types.tools.ozone.moderation.defs.modEventView> {
    return this.client.post<Types.tools.ozone.moderation.defs.modEventView>("/tools.ozone.moderation.emitEvent", body);
  }

  /**
   * Get timeline of all available events of an account. This includes moderation events, account history and did history.
   */
  async getAccountTimeline({ did }: { did: string }): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.moderation.getAccountTimeline", {
      "did": did,
    });
  }

  /**
   * Get details about a moderation event.
   */
  async getEvent({ id }: { id: number }): Promise<Types.tools.ozone.moderation.defs.modEventViewDetail> {
    return this.client.get<Types.tools.ozone.moderation.defs.modEventViewDetail>("/tools.ozone.moderation.getEvent", {
      "id": id,
    });
  }

  /**
   * Get details about a record.
   */
  async moderationGetRecord({ uri, cid }: { uri: string; cid?: string }): Promise<Types.tools.ozone.moderation.defs.recordViewDetail> {
    return this.client.get<Types.tools.ozone.moderation.defs.recordViewDetail>("/tools.ozone.moderation.getRecord", {
      "uri": uri,
      "cid": cid,
    });
  }

  /**
   * Get details about some records.
   */
  async getRecords({ uris }: { uris: string }): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.moderation.getRecords", {
      "uris": uris,
    });
  }

  /**
   * Get details about a repository.
   */
  async moderationGetRepo({ did }: { did: string }): Promise<Types.tools.ozone.moderation.defs.repoViewDetail> {
    return this.client.get<Types.tools.ozone.moderation.defs.repoViewDetail>("/tools.ozone.moderation.getRepo", {
      "did": did,
    });
  }

  /**
   * Get reporter stats for a list of users.
   */
  async getReporterStats({ dids }: { dids: string }): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.moderation.getReporterStats", {
      "dids": dids,
    });
  }

  /**
   * Get details about some repositories.
   */
  async getRepos({ dids }: { dids: string }): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.moderation.getRepos", {
      "dids": dids,
    });
  }

  /**
   * Get details about subjects.
   */
  async getSubjects({ subjects }: { subjects: string }): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.moderation.getSubjects", {
      "subjects": subjects,
    });
  }

  /**
   * List scheduled moderation actions with optional filtering
   */
  async listScheduledActions(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/tools.ozone.moderation.listScheduledActions", body);
  }

  /**
   * List moderation events related to a subject.
   */
  async queryEvents({ types, createdBy, sortDirection, createdAfter, createdBefore, subject, collections, subjectType, includeAllUserRecords, limit, hasComment, comment, addedLabels, removedLabels, addedTags, removedTags, reportTypes, policies, modTool, batchId, ageAssuranceState, withStrike, cursor }: { types?: string; createdBy?: string; sortDirection?: string; createdAfter?: string; createdBefore?: string; subject?: string; collections?: string; subjectType?: string; includeAllUserRecords?: string; limit?: number; hasComment?: string; comment?: string; addedLabels?: string; removedLabels?: string; addedTags?: string; removedTags?: string; reportTypes?: string; policies?: string; modTool?: string; batchId?: string; ageAssuranceState?: string; withStrike?: string; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.moderation.queryEvents", {
      "types": types,
      "createdBy": createdBy,
      "sortDirection": sortDirection,
      "createdAfter": createdAfter,
      "createdBefore": createdBefore,
      "subject": subject,
      "collections": collections,
      "subjectType": subjectType,
      "includeAllUserRecords": includeAllUserRecords,
      "limit": limit,
      "hasComment": hasComment,
      "comment": comment,
      "addedLabels": addedLabels,
      "removedLabels": removedLabels,
      "addedTags": addedTags,
      "removedTags": removedTags,
      "reportTypes": reportTypes,
      "policies": policies,
      "modTool": modTool,
      "batchId": batchId,
      "ageAssuranceState": ageAssuranceState,
      "withStrike": withStrike,
      "cursor": cursor,
    });
  }

  /**
   * View moderation statuses of subjects (record or repo).
   */
  async queryStatuses({ queueCount, queueIndex, queueSeed, includeAllUserRecords, subject, comment, reportedAfter, reportedBefore, reviewedAfter, hostingDeletedAfter, hostingDeletedBefore, hostingUpdatedAfter, hostingUpdatedBefore, hostingStatuses, reviewedBefore, includeMuted, onlyMuted, reviewState, ignoreSubjects, lastReviewedBy, sortField, sortDirection, takendown, appealed, limit, tags, excludeTags, cursor, collections, subjectType, minAccountSuspendCount, minReportedRecordsCount, minTakendownRecordsCount, minPriorityScore, minStrikeCount, ageAssuranceState }: { queueCount?: number; queueIndex?: number; queueSeed?: string; includeAllUserRecords?: string; subject?: string; comment?: string; reportedAfter?: string; reportedBefore?: string; reviewedAfter?: string; hostingDeletedAfter?: string; hostingDeletedBefore?: string; hostingUpdatedAfter?: string; hostingUpdatedBefore?: string; hostingStatuses?: string; reviewedBefore?: string; includeMuted?: string; onlyMuted?: string; reviewState?: string; ignoreSubjects?: string; lastReviewedBy?: string; sortField?: string; sortDirection?: string; takendown?: string; appealed?: string; limit?: number; tags?: string; excludeTags?: string; cursor?: string; collections?: string; subjectType?: string; minAccountSuspendCount?: number; minReportedRecordsCount?: number; minTakendownRecordsCount?: number; minPriorityScore?: number; minStrikeCount?: number; ageAssuranceState?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.moderation.queryStatuses", {
      "queueCount": queueCount,
      "queueIndex": queueIndex,
      "queueSeed": queueSeed,
      "includeAllUserRecords": includeAllUserRecords,
      "subject": subject,
      "comment": comment,
      "reportedAfter": reportedAfter,
      "reportedBefore": reportedBefore,
      "reviewedAfter": reviewedAfter,
      "hostingDeletedAfter": hostingDeletedAfter,
      "hostingDeletedBefore": hostingDeletedBefore,
      "hostingUpdatedAfter": hostingUpdatedAfter,
      "hostingUpdatedBefore": hostingUpdatedBefore,
      "hostingStatuses": hostingStatuses,
      "reviewedBefore": reviewedBefore,
      "includeMuted": includeMuted,
      "onlyMuted": onlyMuted,
      "reviewState": reviewState,
      "ignoreSubjects": ignoreSubjects,
      "lastReviewedBy": lastReviewedBy,
      "sortField": sortField,
      "sortDirection": sortDirection,
      "takendown": takendown,
      "appealed": appealed,
      "limit": limit,
      "tags": tags,
      "excludeTags": excludeTags,
      "cursor": cursor,
      "collections": collections,
      "subjectType": subjectType,
      "minAccountSuspendCount": minAccountSuspendCount,
      "minReportedRecordsCount": minReportedRecordsCount,
      "minTakendownRecordsCount": minTakendownRecordsCount,
      "minPriorityScore": minPriorityScore,
      "minStrikeCount": minStrikeCount,
      "ageAssuranceState": ageAssuranceState,
    });
  }

  /**
   * Schedule a moderation action to be executed at a future time
   */
  async scheduleAction(body: unknown): Promise<Types.tools.ozone.moderation.scheduleAction.scheduledActionResults> {
    return this.client.post<Types.tools.ozone.moderation.scheduleAction.scheduledActionResults>("/tools.ozone.moderation.scheduleAction", body);
  }

  /**
   * Find repositories based on a search term.
   */
  async moderationSearchRepos({ term, q, limit, cursor }: { term?: string; q?: string; limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.moderation.searchRepos", {
      "term": term,
      "q": q,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Add a new URL safety rule
   */
  async addRule(body: unknown): Promise<Types.tools.ozone.safelink.defs.event> {
    return this.client.post<Types.tools.ozone.safelink.defs.event>("/tools.ozone.safelink.addRule", body);
  }

  /**
   * Query URL safety audit events
   */
  async safelinkQueryEvents(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/tools.ozone.safelink.queryEvents", body);
  }

  /**
   * Query URL safety rules
   */
  async queryRules(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/tools.ozone.safelink.queryRules", body);
  }

  /**
   * Remove an existing URL safety rule
   */
  async removeRule(body: unknown): Promise<Types.tools.ozone.safelink.defs.event> {
    return this.client.post<Types.tools.ozone.safelink.defs.event>("/tools.ozone.safelink.removeRule", body);
  }

  /**
   * Update an existing URL safety rule
   */
  async updateRule(body: unknown): Promise<Types.tools.ozone.safelink.defs.event> {
    return this.client.post<Types.tools.ozone.safelink.defs.event>("/tools.ozone.safelink.updateRule", body);
  }

  /**
   * Get details about ozone's server configuration.
   */
  async serverGetConfig(): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.server.getConfig");
  }

  /**
   * Add values to a specific set. Attempting to add values to a set that does not exist will result in an error.
   */
  async addValues(body: unknown): Promise<void> {
    return this.client.post<void>("/tools.ozone.set.addValues", body);
  }

  /**
   * Delete an entire set. Attempting to delete a set that does not exist will result in an error.
   */
  async deleteSet(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/tools.ozone.set.deleteSet", body);
  }

  /**
   * Delete values from a specific set. Attempting to delete values that are not in the set will not result in an error
   */
  async deleteValues(body: unknown): Promise<void> {
    return this.client.post<void>("/tools.ozone.set.deleteValues", body);
  }

  /**
   * Get a specific set and its values
   */
  async getValues({ name, limit, cursor }: { name: string; limit?: number; cursor?: string }): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.set.getValues", {
      "name": name,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Query available sets
   */
  async querySets({ limit, cursor, namePrefix, sortBy, sortDirection }: { limit?: number; cursor?: string; namePrefix?: string; sortBy?: string; sortDirection?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.set.querySets", {
      "limit": limit,
      "cursor": cursor,
      "namePrefix": namePrefix,
      "sortBy": sortBy,
      "sortDirection": sortDirection,
    });
  }

  /**
   * Create or update set metadata
   */
  async upsertSet(body: Types.tools.ozone.set.defs.set): Promise<Types.tools.ozone.set.defs.setView> {
    return this.client.post<Types.tools.ozone.set.defs.setView>("/tools.ozone.set.upsertSet", body);
  }

  /**
   * List settings with optional filtering
   */
  async listOptions({ limit, cursor, scope, prefix, keys }: { limit?: number; cursor?: string; scope?: string; prefix?: string; keys?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.setting.listOptions", {
      "limit": limit,
      "cursor": cursor,
      "scope": scope,
      "prefix": prefix,
      "keys": keys,
    });
  }

  /**
   * Delete settings by key
   */
  async removeOptions(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/tools.ozone.setting.removeOptions", body);
  }

  /**
   * Create or update setting option
   */
  async upsertOption(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/tools.ozone.setting.upsertOption", body);
  }

  /**
   * Find all correlated threat signatures between 2 or more accounts.
   */
  async findCorrelation({ dids }: { dids: string }): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.signature.findCorrelation", {
      "dids": dids,
    });
  }

  /**
   * Get accounts that share some matching threat signatures with the root account.
   */
  async findRelatedAccounts({ did, cursor, limit }: { did: string; cursor?: string; limit?: number }): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.signature.findRelatedAccounts", {
      "did": did,
      "cursor": cursor,
      "limit": limit,
    });
  }

  /**
   * Search for accounts that match one or more threat signature values.
   */
  async signatureSearchAccounts({ values, cursor, limit }: { values: string; cursor?: string; limit?: number }): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.signature.searchAccounts", {
      "values": values,
      "cursor": cursor,
      "limit": limit,
    });
  }

  /**
   * Add a member to the ozone team. Requires admin role.
   */
  async addMember(body: unknown): Promise<Types.tools.ozone.team.defs.member> {
    return this.client.post<Types.tools.ozone.team.defs.member>("/tools.ozone.team.addMember", body);
  }

  /**
   * Delete a member from ozone team. Requires admin role.
   */
  async deleteMember(body: unknown): Promise<void> {
    return this.client.post<void>("/tools.ozone.team.deleteMember", body);
  }

  /**
   * List all members with access to the ozone service.
   */
  async listMembers({ q, disabled, roles, limit, cursor }: { q?: string; disabled?: string; roles?: string; limit?: number; cursor?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.team.listMembers", {
      "q": q,
      "disabled": disabled,
      "roles": roles,
      "limit": limit,
      "cursor": cursor,
    });
  }

  /**
   * Update a member in the ozone service. Requires admin role.
   */
  async updateMember(body: unknown): Promise<Types.tools.ozone.team.defs.member> {
    return this.client.post<Types.tools.ozone.team.defs.member>("/tools.ozone.team.updateMember", body);
  }

  /**
   * Grant verifications to multiple subjects. Allows batch processing of up to 100 verifications at once.
   */
  async grantVerifications(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/tools.ozone.verification.grantVerifications", body);
  }

  /**
   * List verifications
   */
  async listVerifications({ cursor, limit, createdAfter, createdBefore, issuers, subjects, sortDirection, isRevoked }: { cursor?: string; limit?: number; createdAfter?: string; createdBefore?: string; issuers?: string; subjects?: string; sortDirection?: string; isRevoked?: string } = {}): Promise<unknown> {
    return this.client.get<unknown>("/tools.ozone.verification.listVerifications", {
      "cursor": cursor,
      "limit": limit,
      "createdAfter": createdAfter,
      "createdBefore": createdBefore,
      "issuers": issuers,
      "subjects": subjects,
      "sortDirection": sortDirection,
      "isRevoked": isRevoked,
    });
  }

  /**
   * Revoke previously granted verifications in batches of up to 100.
   */
  async revokeVerifications(body: unknown): Promise<unknown> {
    return this.client.post<unknown>("/tools.ozone.verification.revokeVerifications", body);
  }

}