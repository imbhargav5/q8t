import WebSocket from "ws";
import type { ClientMessage, Event, Filter, RelayMessage, Subscription } from "../crypto/types";
import { validateEvent } from "../crypto/validation";

/**
 * Relay connection status
 */
export enum RelayStatus {
  Disconnected = "disconnected",
  Connecting = "connecting",
  Connected = "connected",
  Error = "error",
}

/**
 * Relay event handlers
 */
export interface RelayEventHandlers {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
  onNotice?: (message: string) => void;
  onAuth?: (challenge: string) => void;
}

/**
 * Subscription callback
 */
export type SubscriptionCallback = (event: Event) => void;

/**
 * Single relay connection
 */
export class Relay {
  public readonly url: string;
  private ws: WebSocket | null = null;
  private status: RelayStatus = RelayStatus.Disconnected;
  private subscriptions = new Map<
    string,
    { filters: Filter[]; callback: SubscriptionCallback; eose: boolean }
  >();
  private pendingMessages: ClientMessage[] = [];
  private eventHandlers: RelayEventHandlers;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private pingInterval: NodeJS.Timeout | null = null;

  constructor(url: string, handlers: RelayEventHandlers = {}) {
    this.url = url;
    this.eventHandlers = handlers;
  }

  /**
   * Connect to the relay
   */
  async connect(): Promise<void> {
    if (this.status === RelayStatus.Connected) return;

    this.status = RelayStatus.Connecting;

    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        this.ws.on("open", () => {
          this.status = RelayStatus.Connected;
          this.reconnectAttempts = 0;
          this.reconnectDelay = 1000;

          // Send pending messages
          for (const msg of this.pendingMessages) {
            this.send(msg);
          }
          this.pendingMessages = [];

          // Start ping interval
          this.startPingInterval();

          this.eventHandlers.onConnect?.();
          resolve();
        });

        this.ws.on("message", (data: string) => {
          this.handleMessage(data.toString());
        });

        this.ws.on("error", (error: Error) => {
          this.status = RelayStatus.Error;
          this.eventHandlers.onError?.(error);
          reject(error);
        });

        this.ws.on("close", () => {
          this.status = RelayStatus.Disconnected;
          this.stopPingInterval();
          this.eventHandlers.onDisconnect?.();

          // Auto-reconnect
          if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = this.reconnectDelay * 2 ** (this.reconnectAttempts - 1);
            setTimeout(() => this.connect(), delay);
          }
        });
      } catch (error) {
        this.status = RelayStatus.Error;
        reject(error);
      }
    });
  }

  /**
   * Disconnect from the relay
   */
  disconnect(): void {
    this.stopPingInterval();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.status = RelayStatus.Disconnected;
  }

  /**
   * Publish an event to the relay
   */
  async publish(event: Event): Promise<void> {
    const isValid = await validateEvent(event);
    if (!isValid) {
      throw new Error("Invalid event");
    }

    this.send(["EVENT", event]);
  }

  /**
   * Subscribe to events matching filters
   */
  subscribe(filters: Filter[], callback: SubscriptionCallback): Subscription {
    const id = this.generateSubscriptionId();
    this.subscriptions.set(id, { filters, callback, eose: false });

    this.send(["REQ", id, ...filters]);

    return {
      id,
      filters,
      close: () => this.unsubscribe(id),
    };
  }

  /**
   * Unsubscribe from a subscription
   */
  unsubscribe(subscriptionId: string): void {
    this.subscriptions.delete(subscriptionId);
    this.send(["CLOSE", subscriptionId]);
  }

  /**
   * Get relay status
   */
  getStatus(): RelayStatus {
    return this.status;
  }

  /**
   * Check if relay is connected
   */
  isConnected(): boolean {
    return this.status === RelayStatus.Connected;
  }

  /**
   * Send a message to the relay
   */
  private send(message: ClientMessage): void {
    if (!this.isConnected()) {
      this.pendingMessages.push(message);
      return;
    }

    try {
      this.ws?.send(JSON.stringify(message));
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  /**
   * Handle incoming message from relay
   */
  private handleMessage(data: string): void {
    try {
      const message: RelayMessage = JSON.parse(data);

      switch (message[0]) {
        case "EVENT": {
          const [, subId, event] = message;
          const subscription = this.subscriptions.get(subId);
          if (subscription) {
            subscription.callback(event);
          }
          break;
        }

        case "EOSE": {
          const [, subId] = message;
          const subscription = this.subscriptions.get(subId);
          if (subscription) {
            subscription.eose = true;
          }
          break;
        }

        case "OK": {
          const [, eventId, accepted, reason] = message;
          // Can emit event for OK messages if needed
          break;
        }

        case "NOTICE": {
          const [, notice] = message;
          this.eventHandlers.onNotice?.(notice);
          break;
        }

        case "AUTH": {
          const [, challenge] = message;
          this.eventHandlers.onAuth?.(challenge);
          break;
        }

        case "CLOSED": {
          const [, subId, reason] = message;
          this.subscriptions.delete(subId);
          break;
        }
      }
    } catch (error) {
      console.error("Failed to parse relay message:", error);
    }
  }

  /**
   * Generate random subscription ID
   */
  private generateSubscriptionId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  /**
   * Start ping interval to keep connection alive
   */
  private startPingInterval(): void {
    this.pingInterval = setInterval(() => {
      if (this.ws && this.isConnected()) {
        this.ws.ping();
      }
    }, 30000); // Ping every 30 seconds
  }

  /**
   * Stop ping interval
   */
  private stopPingInterval(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
}
