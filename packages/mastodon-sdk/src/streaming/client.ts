import WebSocket from "ws";

export type StreamType =
  | "user" // User's home timeline and notifications
  | "public" // Public timeline
  | "public:local" // Local public timeline
  | "public:remote" // Remote public timeline
  | "hashtag" // Hashtag timeline
  | "hashtag:local" // Local hashtag timeline
  | "list" // List timeline
  | "direct"; // Direct messages

export type StreamEventType =
  | "update" // New status
  | "delete" // Status deleted
  | "notification" // New notification
  | "filters_changed" // User's filters changed
  | "announcement" // New announcement
  | "announcement.reaction" // Announcement reaction
  | "announcement.delete" // Announcement deleted
  | "status.update"; // Status edited

export interface StreamEvent {
  event: StreamEventType;
  payload: string; // JSON string that needs to be parsed
}

export interface MastodonStreamingConfig {
  instanceUrl: string; // e.g., "mastodon.social"
  accessToken: string;
}

export interface StreamHandlers {
  onUpdate?: (status: any) => void;
  onDelete?: (statusId: string) => void;
  onNotification?: (notification: any) => void;
  onFiltersChanged?: () => void;
  onAnnouncement?: (announcement: any) => void;
  onAnnouncementReaction?: (reaction: any) => void;
  onAnnouncementDelete?: (announcementId: string) => void;
  onStatusUpdate?: (status: any) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
  onConnect?: () => void;
}

export interface StreamSubscription {
  unsubscribe: () => void;
}

/**
 * Mastodon Streaming Client
 * Connects to Mastodon's WebSocket streaming API for real-time updates
 */
export class MastodonStreamingClient {
  private instanceUrl: string;
  private accessToken: string;
  private ws: WebSocket | null = null;

  constructor(config: MastodonStreamingConfig) {
    this.instanceUrl = config.instanceUrl.startsWith("http")
      ? config.instanceUrl.replace(/^https?:/, "wss:")
      : `wss://${config.instanceUrl}`;
    this.accessToken = config.accessToken;
  }

  /**
   * Subscribe to a stream
   * @param stream The stream type to subscribe to
   * @param handlers Event handlers for stream events
   * @param params Optional parameters (e.g., tag for hashtag streams, list for list streams)
   * @returns Subscription object with unsubscribe method
   */
  subscribeToStream(
    stream: StreamType,
    handlers: StreamHandlers,
    params?: { tag?: string; list?: string },
  ): StreamSubscription {
    const wsUrl = this.buildWebSocketUrl(stream, params);

    this.ws = new WebSocket(wsUrl);

    this.ws.on("open", () => {
      console.log(`Connected to ${stream} stream`);
      if (handlers.onConnect) {
        handlers.onConnect();
      }
    });

    this.ws.on("message", (data: string) => {
      try {
        const event = this.parseStreamEvent(data.toString());
        this.handleEvent(event, handlers);
      } catch (error) {
        console.error("Error parsing stream event:", error);
        if (handlers.onError) {
          handlers.onError(error as Error);
        }
      }
    });

    this.ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      if (handlers.onError) {
        handlers.onError(error);
      }
    });

    this.ws.on("close", () => {
      console.log("WebSocket connection closed");
      if (handlers.onClose) {
        handlers.onClose();
      }
    });

    return {
      unsubscribe: () => {
        if (this.ws) {
          this.ws.close();
          this.ws = null;
        }
      },
    };
  }

  /**
   * Subscribe to user stream (home timeline and notifications)
   */
  subscribeToUserStream(handlers: StreamHandlers): StreamSubscription {
    return this.subscribeToStream("user", handlers);
  }

  /**
   * Subscribe to public timeline
   */
  subscribeToPublicStream(handlers: StreamHandlers, local = false): StreamSubscription {
    return this.subscribeToStream(local ? "public:local" : "public", handlers);
  }

  /**
   * Subscribe to hashtag timeline
   */
  subscribeToHashtagStream(
    tag: string,
    handlers: StreamHandlers,
    local = false,
  ): StreamSubscription {
    return this.subscribeToStream(local ? "hashtag:local" : "hashtag", handlers, { tag });
  }

  /**
   * Subscribe to list timeline
   */
  subscribeToListStream(listId: string, handlers: StreamHandlers): StreamSubscription {
    return this.subscribeToStream("list", handlers, { list: listId });
  }

  /**
   * Subscribe to direct messages
   */
  subscribeToDirectStream(handlers: StreamHandlers): StreamSubscription {
    return this.subscribeToStream("direct", handlers);
  }

  private buildWebSocketUrl(stream: StreamType, params?: { tag?: string; list?: string }): string {
    const url = new URL(`${this.instanceUrl}/api/v1/streaming`);

    url.searchParams.set("access_token", this.accessToken);
    url.searchParams.set("stream", stream);

    if (params?.tag) {
      url.searchParams.set("tag", params.tag);
    }

    if (params?.list) {
      url.searchParams.set("list", params.list);
    }

    return url.toString();
  }

  private parseStreamEvent(data: string): StreamEvent {
    // Mastodon streaming API sends events in the format:
    // event: <event_type>
    // data: <json_payload>
    const lines = data.split("\n");
    let event: StreamEventType | null = null;
    let payload = "";

    for (const line of lines) {
      if (line.startsWith("event:")) {
        event = line.substring(6).trim() as StreamEventType;
      } else if (line.startsWith("data:")) {
        payload = line.substring(5).trim();
      }
    }

    if (!event) {
      throw new Error("Invalid stream event: missing event type");
    }

    return { event, payload };
  }

  private handleEvent(event: StreamEvent, handlers: StreamHandlers): void {
    try {
      switch (event.event) {
        case "update":
          if (handlers.onUpdate) {
            const status = JSON.parse(event.payload);
            handlers.onUpdate(status);
          }
          break;

        case "delete":
          if (handlers.onDelete) {
            handlers.onDelete(event.payload); // Just the status ID
          }
          break;

        case "notification":
          if (handlers.onNotification) {
            const notification = JSON.parse(event.payload);
            handlers.onNotification(notification);
          }
          break;

        case "filters_changed":
          if (handlers.onFiltersChanged) {
            handlers.onFiltersChanged();
          }
          break;

        case "announcement":
          if (handlers.onAnnouncement) {
            const announcement = JSON.parse(event.payload);
            handlers.onAnnouncement(announcement);
          }
          break;

        case "announcement.reaction":
          if (handlers.onAnnouncementReaction) {
            const reaction = JSON.parse(event.payload);
            handlers.onAnnouncementReaction(reaction);
          }
          break;

        case "announcement.delete":
          if (handlers.onAnnouncementDelete) {
            handlers.onAnnouncementDelete(event.payload);
          }
          break;

        case "status.update":
          if (handlers.onStatusUpdate) {
            const status = JSON.parse(event.payload);
            handlers.onStatusUpdate(status);
          }
          break;

        default:
          console.warn(`Unknown event type: ${event.event}`);
      }
    } catch (error) {
      console.error(`Error handling ${event.event} event:`, error);
      if (handlers.onError) {
        handlers.onError(error as Error);
      }
    }
  }
}
