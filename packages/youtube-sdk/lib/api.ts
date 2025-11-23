// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class YouTubeApi {
  constructor() {}

  /**
   * List channels
   */
  listChannels({ part?: string, id?: string, mine?: string, maxResults?: number, pageToken?: string }: { part?: string; id?: string; mine?: string; maxResults?: number; pageToken?: string } = {}): Effect.Effect<Types.ChannelListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.ChannelListResponse>("/channels", {
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
  listVideos({ part?: string, id?: string, chart?: string, myRating?: string, maxResults?: number, pageToken?: string, regionCode?: string, videoCategoryId?: string }: { part?: string; id?: string; chart?: string; myRating?: string; maxResults?: number; pageToken?: string; regionCode?: string; videoCategoryId?: string } = {}): Effect.Effect<Types.VideoListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.VideoListResponse>("/videos", {
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
  insertVideo(body: Types.Video, { part?: string, notifySubscribers?: string, onBehalfOfContentOwner?: string, onBehalfOfContentOwnerChannel?: string }: { part?: string; notifySubscribers?: string; onBehalfOfContentOwner?: string; onBehalfOfContentOwnerChannel?: string } = {}): Effect.Effect<Types.Video, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
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
    return yield* client.post<Types.Video>(fullPath, body);
  }

  /**
   * List playlists
   */
  listPlaylists({ part?: string, id?: string, mine?: string, channelId?: string, maxResults?: number, pageToken?: string }: { part?: string; id?: string; mine?: string; channelId?: string; maxResults?: number; pageToken?: string } = {}): Effect.Effect<Types.PlaylistListResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.PlaylistListResponse>("/playlists", {
      "part": part,
      "id": id,
      "mine": mine,
      "channelId": channelId,
      "maxResults": maxResults,
      "pageToken": pageToken,
    });
  }

}