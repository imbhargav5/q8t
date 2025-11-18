// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class YouTubeApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List channels
   */
  async listChannels({ part?: string, id?: string, mine?: string, maxResults?: number, pageToken?: string }: { part?: string; id?: string; mine?: string; maxResults?: number; pageToken?: string } = {}): Promise<Types.ChannelListResponse> {
    return this.client.get<Types.ChannelListResponse>("/channels", {
      "part": part,
      "id": id,
      "mine": mine,
      "maxResults": maxResults,
      "pageToken": pageToken,
    });
  }

  /**
   * List videos
   */
  async listVideos({ part?: string, id?: string, chart?: string, myRating?: string, maxResults?: number, pageToken?: string, regionCode?: string, videoCategoryId?: string }: { part?: string; id?: string; chart?: string; myRating?: string; maxResults?: number; pageToken?: string; regionCode?: string; videoCategoryId?: string } = {}): Promise<Types.VideoListResponse> {
    return this.client.get<Types.VideoListResponse>("/videos", {
      "part": part,
      "id": id,
      "chart": chart,
      "myRating": myRating,
      "maxResults": maxResults,
      "pageToken": pageToken,
      "regionCode": regionCode,
      "videoCategoryId": videoCategoryId,
    });
  }

  /**
   * Upload video metadata
   */
  async insertVideo(body: Types.Video, { part?: string, notifySubscribers?: string, onBehalfOfContentOwner?: string, onBehalfOfContentOwnerChannel?: string }: { part?: string; notifySubscribers?: string; onBehalfOfContentOwner?: string; onBehalfOfContentOwnerChannel?: string } = {}): Promise<Types.Video> {
    const queryParams = {
      "part": part,
      "notifySubscribers": notifySubscribers,
      "onBehalfOfContentOwner": onBehalfOfContentOwner,
      "onBehalfOfContentOwnerChannel": onBehalfOfContentOwnerChannel,
    };
    const url = "/videos";
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    }
    const queryString = searchParams.toString();
    const fullPath = queryString ? `${url}?${queryString}` : url;
    return this.client.post<Types.Video>(fullPath, body);
  }

  /**
   * List playlists
   */
  async listPlaylists({ part?: string, id?: string, mine?: string, channelId?: string, maxResults?: number, pageToken?: string }: { part?: string; id?: string; mine?: string; channelId?: string; maxResults?: number; pageToken?: string } = {}): Promise<Types.PlaylistListResponse> {
    return this.client.get<Types.PlaylistListResponse>("/playlists", {
      "part": part,
      "id": id,
      "mine": mine,
      "channelId": channelId,
      "maxResults": maxResults,
      "pageToken": pageToken,
    });
  }

}