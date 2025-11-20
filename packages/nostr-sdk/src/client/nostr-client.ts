import type { Signer } from "../auth/signer";
import { createEvent, now } from "../crypto";
import type { Event, Filter, UnsignedEvent, UserMetadata } from "../crypto/types";
import { EventKind } from "../crypto/types";
import { RelayPool, type RelayPoolOptions } from "../relay/relay-pool";

/**
 * NostrClient options
 */
export interface NostrClientOptions extends RelayPoolOptions {
  /**
   * Relay URLs to connect to
   */
  relays: string[];

  /**
   * Signer for signing events
   */
  signer: Signer;
}

/**
 * High-level Nostr client combining all SDK functionality
 */
export class NostrClient {
  public readonly pool: RelayPool;
  public readonly signer: Signer;
  private pubkey?: string;

  constructor(options: NostrClientOptions) {
    this.signer = options.signer;
    this.pool = new RelayPool(options.relays, {
      autoConnect: options.autoConnect ?? true,
      handlers: options.handlers,
    });
  }

  /**
   * Get the public key for this client
   */
  async getPublicKey(): Promise<string> {
    if (!this.pubkey) {
      this.pubkey = await this.signer.getPublicKey();
    }
    return this.pubkey;
  }

  /**
   * Publish a text note (kind 1)
   */
  async publishNote(content: string, tags: string[][] = []): Promise<Event> {
    const pubkey = await this.getPublicKey();
    const unsigned = createEvent(pubkey, EventKind.Text, content, tags);
    const event = await this.signer.signEvent(unsigned);
    await this.pool.publish(event);
    return event;
  }

  /**
   * Set user metadata (kind 0)
   */
  async setMetadata(metadata: UserMetadata): Promise<Event> {
    const pubkey = await this.getPublicKey();
    const unsigned = createEvent(pubkey, EventKind.Metadata, JSON.stringify(metadata));
    const event = await this.signer.signEvent(unsigned);
    await this.pool.publish(event);
    return event;
  }

  /**
   * Get user metadata
   */
  async getMetadata(pubkey: string): Promise<UserMetadata | null> {
    const events = await this.pool.get([
      { authors: [pubkey], kinds: [EventKind.Metadata], limit: 1 },
    ]);

    if (events.length === 0) return null;

    try {
      return JSON.parse(events[0].content);
    } catch {
      return null;
    }
  }

  /**
   * Publish a reaction to an event (kind 7)
   */
  async publishReaction(eventId: string, content = "+", author?: string): Promise<Event> {
    const pubkey = await this.getPublicKey();
    const tags: string[][] = [["e", eventId]];

    if (author) {
      tags.push(["p", author]);
    }

    const unsigned = createEvent(pubkey, EventKind.Reaction, content, tags);
    const event = await this.signer.signEvent(unsigned);
    await this.pool.publish(event);
    return event;
  }

  /**
   * Repost an event (kind 6)
   */
  async repost(eventId: string, author: string, relayUrl?: string): Promise<Event> {
    const pubkey = await this.getPublicKey();
    const tags: string[][] = [
      ["e", eventId, relayUrl || ""],
      ["p", author],
    ];

    const unsigned = createEvent(pubkey, EventKind.Repost, "", tags);
    const event = await this.signer.signEvent(unsigned);
    await this.pool.publish(event);
    return event;
  }

  /**
   * Set contact list (kind 3)
   */
  async setContacts(
    contacts: Array<{ pubkey: string; relay?: string; petname?: string }>,
  ): Promise<Event> {
    const pubkey = await this.getPublicKey();
    const tags = contacts.map((c) => {
      const tag = ["p", c.pubkey];
      if (c.relay) tag.push(c.relay);
      if (c.petname) tag.push(c.petname);
      return tag;
    });

    const unsigned = createEvent(pubkey, EventKind.Contacts, "", tags);
    const event = await this.signer.signEvent(unsigned);
    await this.pool.publish(event);
    return event;
  }

  /**
   * Get contact list
   */
  async getContacts(pubkey: string): Promise<string[]> {
    const events = await this.pool.get([
      { authors: [pubkey], kinds: [EventKind.Contacts], limit: 1 },
    ]);

    if (events.length === 0) return [];

    return events[0].tags.filter((tag) => tag[0] === "p").map((tag) => tag[1]);
  }

  /**
   * Follow a user
   */
  async followUser(followPubkey: string, relay?: string): Promise<Event> {
    const pubkey = await this.getPublicKey();
    const currentContacts = await this.getContacts(pubkey);

    if (currentContacts.includes(followPubkey)) {
      throw new Error("Already following this user");
    }

    const contacts = [
      ...currentContacts.map((pk) => ({ pubkey: pk })),
      { pubkey: followPubkey, relay },
    ];

    return await this.setContacts(contacts);
  }

  /**
   * Unfollow a user
   */
  async unfollowUser(unfollowPubkey: string): Promise<Event> {
    const pubkey = await this.getPublicKey();
    const currentContacts = await this.getContacts(pubkey);
    const contacts = currentContacts
      .filter((pk) => pk !== unfollowPubkey)
      .map((pk) => ({ pubkey: pk }));

    return await this.setContacts(contacts);
  }

  /**
   * Send encrypted direct message (kind 4 - NIP-04, deprecated)
   */
  async sendEncryptedDM(recipientPubkey: string, plaintext: string): Promise<Event> {
    if (!this.signer.nip04) {
      throw new Error("Signer does not support NIP-04 encryption");
    }

    const pubkey = await this.getPublicKey();
    const ciphertext = await this.signer.nip04.encrypt(recipientPubkey, plaintext);
    const tags = [["p", recipientPubkey]];

    const unsigned = createEvent(pubkey, EventKind.EncryptedDirectMessage, ciphertext, tags);
    const event = await this.signer.signEvent(unsigned);
    await this.pool.publish(event);
    return event;
  }

  /**
   * Delete events (kind 5)
   */
  async deleteEvents(eventIds: string[], reason = ""): Promise<Event> {
    const pubkey = await this.getPublicKey();
    const tags = eventIds.map((id) => ["e", id]);

    const unsigned = createEvent(pubkey, EventKind.EventDeletion, reason, tags);
    const event = await this.signer.signEvent(unsigned);
    await this.pool.publish(event);
    return event;
  }

  /**
   * Subscribe to profile updates
   */
  subscribeToProfile(pubkey: string, callback: (event: Event) => void) {
    return this.pool.subscribe(
      [{ authors: [pubkey], kinds: [EventKind.Metadata, EventKind.Text] }],
      callback,
    );
  }

  /**
   * Subscribe to feed (following users)
   */
  async subscribeToFeed(callback: (event: Event) => void) {
    const pubkey = await this.getPublicKey();
    const contacts = await this.getContacts(pubkey);

    return this.pool.subscribe(
      [
        {
          authors: contacts,
          kinds: [EventKind.Text, EventKind.Repost],
        },
      ],
      callback,
    );
  }

  /**
   * Subscribe to mentions
   */
  async subscribeToMentions(callback: (event: Event) => void) {
    const pubkey = await this.getPublicKey();

    return this.pool.subscribe(
      [
        {
          "#p": [pubkey],
          kinds: [EventKind.Text],
        },
      ],
      callback,
    );
  }

  /**
   * Get user's recent notes
   */
  async getUserNotes(pubkey: string, limit = 20): Promise<Event[]> {
    return await this.pool.get([
      {
        authors: [pubkey],
        kinds: [EventKind.Text],
        limit,
      },
    ]);
  }

  /**
   * Get reactions to an event
   */
  async getReactions(eventId: string): Promise<Event[]> {
    return await this.pool.get([
      {
        "#e": [eventId],
        kinds: [EventKind.Reaction],
      },
    ]);
  }

  /**
   * Get replies to an event
   */
  async getReplies(eventId: string): Promise<Event[]> {
    return await this.pool.get([
      {
        "#e": [eventId],
        kinds: [EventKind.Text],
      },
    ]);
  }

  /**
   * Publish a custom event
   */
  async publishEvent(unsigned: UnsignedEvent): Promise<Event> {
    const event = await this.signer.signEvent(unsigned);
    await this.pool.publish(event);
    return event;
  }

  /**
   * Query events with custom filters
   */
  async query(filters: Filter[]): Promise<Event[]> {
    return await this.pool.get(filters);
  }

  /**
   * Disconnect from all relays
   */
  disconnect(): void {
    this.pool.disconnectAll();
  }
}
