/**
 * Core Nostr types following NIP-01
 */

/**
 * Event without id and sig (before signing)
 */
export interface UnsignedEvent {
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
}

/**
 * Complete signed event
 */
export interface Event extends UnsignedEvent {
  id: string;
  sig: string;
}

/**
 * Filter for querying events
 */
export interface Filter {
  ids?: string[];
  authors?: string[];
  kinds?: number[];
  since?: number;
  until?: number;
  limit?: number;
  [key: `#${string}`]: string[] | undefined;
}

/**
 * Relay message types
 */
export type RelayMessage =
  | ["EVENT", string, Event]
  | ["OK", string, boolean, string]
  | ["EOSE", string]
  | ["CLOSED", string, string]
  | ["NOTICE", string]
  | ["AUTH", string]
  | ["COUNT", string, { count: number }];

/**
 * Client message types
 */
export type ClientMessage =
  | ["EVENT", Event]
  | ["REQ", string, ...Filter[]]
  | ["CLOSE", string]
  | ["AUTH", Event]
  | ["COUNT", string, ...Filter[]];

/**
 * Subscription interface
 */
export interface Subscription {
  id: string;
  filters: Filter[];
  close: () => void;
}

/**
 * Event kinds enum (partial - covers most common)
 */
export enum EventKind {
  Metadata = 0,
  Text = 1,
  RecommendRelay = 2,
  Contacts = 3,
  EncryptedDirectMessage = 4,
  EventDeletion = 5,
  Repost = 6,
  Reaction = 7,
  BadgeAward = 8,
  ChannelCreation = 40,
  ChannelMetadata = 41,
  ChannelMessage = 42,
  ChannelHideMessage = 43,
  ChannelMuteUser = 44,
  Auth = 22242,
  ZapRequest = 9734,
  ZapReceipt = 9735,
  MuteList = 10000,
  PinList = 10001,
  RelayList = 10002,
  Bookmarks = 10003,
  Communities = 10004,
  PublicChats = 10005,
  BlockedRelays = 10006,
  SearchRelays = 10007,
  Interests = 10015,
  LongFormContent = 30023,
  ApplicationData = 30078,
}

/**
 * Common event tag types
 */
export type EventTag =
  | ["e", string, string?, string?] // event reference
  | ["p", string, string?] // pubkey reference
  | ["a", string, string?] // address reference
  | ["r", string] // relay
  | ["t", string] // hashtag
  | ["g", string] // geohash
  | ["nonce", string, string?] // PoW
  | ["subject", string]
  | ["d", string] // identifier for replaceable events
  | ["expiration", string];

/**
 * User metadata (kind 0)
 */
export interface UserMetadata {
  name?: string;
  display_name?: string;
  about?: string;
  picture?: string;
  banner?: string;
  website?: string;
  nip05?: string;
  lud06?: string; // Lightning address
  lud16?: string; // Lightning address
}

/**
 * Relay information
 */
export interface RelayInfo {
  url: string;
  read: boolean;
  write: boolean;
}

/**
 * Contact list entry (kind 3)
 */
export interface Contact {
  pubkey: string;
  relay?: string;
  petname?: string;
}
