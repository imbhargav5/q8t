import { deduplicateEvents, matchFilters } from "../crypto";
import type { Event, Filter, Subscription } from "../crypto/types";
import { Relay, type RelayEventHandlers, type RelayStatus } from "./relay";

/**
 * Relay pool options
 */
export interface RelayPoolOptions {
  /**
   * Auto-connect to relays on initialization
   */
  autoConnect?: boolean;

  /**
   * Event handlers for all relays
   */
  handlers?: RelayEventHandlers;
}

/**
 * Publish result for a single relay
 */
export interface PublishResult {
  relay: string;
  success: boolean;
  error?: Error;
}

/**
 * Pool subscription wrapping multiple relay subscriptions
 */
export interface PoolSubscription extends Subscription {
  relays: string[];
  unsubscribeFromRelay(relayUrl: string): void;
}

/**
 * Get events options
 */
export interface GetOptions {
  /**
   * Timeout in milliseconds (default: 5000)
   */
  timeout?: number;

  /**
   * Wait for EOSE from all relays (default: true)
   */
  waitForEose?: boolean;
}

/**
 * Relay pool for managing multiple relay connections
 */
export class RelayPool {
  private relays = new Map<string, Relay>();
  private options: RelayPoolOptions;

  constructor(relayUrls: string[] = [], options: RelayPoolOptions = {}) {
    this.options = options;

    for (const url of relayUrls) {
      this.addRelay(url);
    }

    if (options.autoConnect) {
      this.connectAll();
    }
  }

  /**
   * Add a relay to the pool
   */
  addRelay(url: string): void {
    if (this.relays.has(url)) return;

    const relay = new Relay(url, this.options.handlers);
    this.relays.set(url, relay);
  }

  /**
   * Remove a relay from the pool
   */
  removeRelay(url: string): void {
    const relay = this.relays.get(url);
    if (relay) {
      relay.disconnect();
      this.relays.delete(url);
    }
  }

  /**
   * Connect to all relays
   */
  async connectAll(): Promise<void> {
    const promises = Array.from(this.relays.values()).map((relay) =>
      relay.connect().catch((error) => {
        console.error(`Failed to connect to ${relay.url}:`, error);
      }),
    );
    await Promise.all(promises);
  }

  /**
   * Disconnect from all relays
   */
  disconnectAll(): void {
    for (const relay of this.relays.values()) {
      relay.disconnect();
    }
  }

  /**
   * Publish event to specified relays (or all if not specified)
   */
  async publish(event: Event, relayUrls?: string[]): Promise<PublishResult[]> {
    const targetRelays = relayUrls
      ? relayUrls.map((url) => this.relays.get(url)).filter((r) => r)
      : Array.from(this.relays.values());

    const results = await Promise.all(
      targetRelays.map(async (relay) => {
        if (!relay) {
          return { relay: "", success: false, error: new Error("Relay not found") };
        }

        try {
          if (!relay.isConnected()) {
            await relay.connect();
          }
          await relay.publish(event);
          return { relay: relay.url, success: true };
        } catch (error) {
          return {
            relay: relay.url,
            success: false,
            error: error as Error,
          };
        }
      }),
    );

    return results;
  }

  /**
   * Subscribe to events across multiple relays
   */
  subscribe(
    filters: Filter[],
    callback: (event: Event) => void,
    relayUrls?: string[],
  ): PoolSubscription {
    const targetRelays = relayUrls
      ? relayUrls.map((url) => this.relays.get(url)).filter((r) => r)
      : Array.from(this.relays.values());

    const seenEvents = new Set<string>();
    const subscriptions = new Map<string, Subscription>();

    for (const relay of targetRelays) {
      if (!relay) continue;

      const sub = relay.subscribe(filters, (event) => {
        // Deduplicate events across relays
        if (!seenEvents.has(event.id)) {
          seenEvents.add(event.id);
          callback(event);
        }
      });

      subscriptions.set(relay.url, sub);
    }

    const poolSub: PoolSubscription = {
      id: subscriptions.values().next().value?.id || "",
      filters,
      relays: Array.from(subscriptions.keys()),
      close: () => {
        for (const sub of subscriptions.values()) {
          sub.close();
        }
        subscriptions.clear();
      },
      unsubscribeFromRelay: (relayUrl: string) => {
        const sub = subscriptions.get(relayUrl);
        if (sub) {
          sub.close();
          subscriptions.delete(relayUrl);
        }
      },
    };

    return poolSub;
  }

  /**
   * Get events from relays (one-time query)
   */
  async get(filters: Filter[], relayUrls?: string[], options: GetOptions = {}): Promise<Event[]> {
    const { timeout = 5000, waitForEose = true } = options;

    const targetRelays = relayUrls
      ? relayUrls.map((url) => this.relays.get(url)).filter((r) => r)
      : Array.from(this.relays.values());

    const events: Event[] = [];
    const eoseReceived = new Set<string>();

    return new Promise((resolve) => {
      const subscriptions: Subscription[] = [];

      for (const relay of targetRelays) {
        if (!relay) continue;

        const sub = relay.subscribe(filters, (event) => {
          events.push(event);
        });

        subscriptions.push(sub);

        // Check for EOSE (simplified - would need relay instance access)
        if (waitForEose) {
          eoseReceived.add(relay.url);
        }
      }

      // Set timeout
      const timer = setTimeout(() => {
        for (const sub of subscriptions) {
          sub.close();
        }
        resolve(deduplicateEvents(events));
      }, timeout);

      // If not waiting for EOSE, resolve after timeout
      if (!waitForEose) {
        return;
      }

      // Check if all EOSE received (simplified)
      const checkEose = setInterval(() => {
        if (eoseReceived.size >= targetRelays.length) {
          clearInterval(checkEose);
          clearTimeout(timer);
          for (const sub of subscriptions) {
            sub.close();
          }
          resolve(deduplicateEvents(events));
        }
      }, 100);
    });
  }

  /**
   * Count events matching filters
   */
  async count(filters: Filter[], relayUrls?: string[]): Promise<number> {
    const events = await this.get(filters, relayUrls);
    return events.length;
  }

  /**
   * Get all relay URLs
   */
  getRelayUrls(): string[] {
    return Array.from(this.relays.keys());
  }

  /**
   * Get relay status
   */
  getRelayStatus(url: string): RelayStatus | null {
    const relay = this.relays.get(url);
    return relay ? relay.getStatus() : null;
  }

  /**
   * Get all relays with their statuses
   */
  getRelays(): Map<string, RelayStatus> {
    const statuses = new Map<string, RelayStatus>();
    for (const [url, relay] of this.relays.entries()) {
      statuses.set(url, relay.getStatus());
    }
    return statuses;
  }

  /**
   * Get number of connected relays
   */
  getConnectedCount(): number {
    let count = 0;
    for (const relay of this.relays.values()) {
      if (relay.isConnected()) {
        count++;
      }
    }
    return count;
  }
}
