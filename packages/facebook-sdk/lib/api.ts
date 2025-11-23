// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class FacebookApi {
  constructor() {}

  /**
   * Get current user profile
   */
  getMe(options?: { fields?: string }): Effect.Effect<Types.UserProfile, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.UserProfile>("/me", params);
  }

  /**
   * Get user by ID
   */
  getUser(user_id: string, options?: { fields?: string }): Effect.Effect<Types.UserProfile, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.UserProfile>(`/${user_id}`, params);
  }

  /**
   * Get user posts
   */
  getUserPosts(user_id: string, options?: { limit?: number; fields?: string }): Effect.Effect<Types.PostFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.PostFeed>(`/${user_id}/posts`, params);
  }

  /**
   * Get user photos
   */
  getUserPhotos(user_id: string, options?: { limit?: number; fields?: string }): Effect.Effect<Types.PhotoFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.PhotoFeed>(`/${user_id}/photos`, params);
  }

  /**
   * Upload a photo for user
   */
  createUserPhoto(user_id: string, body: Types.CreatePhotoRequest): Effect.Effect<Types.CreatePhotoResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.CreatePhotoResponse>(`/${user_id}/photos`, body);
  }

  /**
   * Get user albums
   */
  getUserAlbums(user_id: string, options?: { limit?: number; fields?: string }): Effect.Effect<Types.AlbumFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.AlbumFeed>(`/${user_id}/albums`, params);
  }

  /**
   * Create an album for user
   */
  createUserAlbum(user_id: string, body: Types.CreateAlbumRequest): Effect.Effect<Types.CreateAlbumResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.CreateAlbumResponse>(`/${user_id}/albums`, body);
  }

  /**
   * Get user friends
   */
  getUserFriends(user_id: string, options?: { limit?: number }): Effect.Effect<Types.FriendsFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return yield* client.get<Types.FriendsFeed>(`/${user_id}/friends`, params);
  }

  /**
   * Get page by ID
   */
  getPage(page_id: string, options?: { fields?: string }): Effect.Effect<Types.Page, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.Page>(`/${page_id}`, params);
  }

  /**
   * Get page feed posts
   */
  getPageFeed(page_id: string, options?: { limit?: number; fields?: string }): Effect.Effect<Types.PageFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.PageFeed>(`/${page_id}/feed`, params);
  }

  /**
   * Create a post on page
   */
  createPagePost(page_id: string, body: Types.CreatePostRequest): Effect.Effect<Types.CreatePostResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.CreatePostResponse>(`/${page_id}/feed`, body);
  }

  /**
   * Get page posts
   */
  getPagePosts(page_id: string, options?: { limit?: number; fields?: string }): Effect.Effect<Types.PostFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.PostFeed>(`/${page_id}/posts`, params);
  }

  /**
   * Get page insights and analytics
   */
  getPageInsights(page_id: string, options?: { metric?: string; period?: string }): Effect.Effect<Types.PageInsights, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.metric !== undefined) params["metric"] = options.metric;
    if (options?.period !== undefined) params["period"] = options.period;
    return yield* client.get<Types.PageInsights>(`/${page_id}/insights`, params);
  }

  /**
   * Get page photos
   */
  getPagePhotos(page_id: string, options?: { limit?: number; fields?: string }): Effect.Effect<Types.PhotoFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.PhotoFeed>(`/${page_id}/photos`, params);
  }

  /**
   * Upload a photo to page
   */
  createPagePhoto(page_id: string, body: Types.CreatePhotoRequest): Effect.Effect<Types.CreatePhotoResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.CreatePhotoResponse>(`/${page_id}/photos`, body);
  }

  /**
   * Get page albums
   */
  getPageAlbums(page_id: string, options?: { limit?: number; fields?: string }): Effect.Effect<Types.AlbumFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.AlbumFeed>(`/${page_id}/albums`, params);
  }

  /**
   * Create an album on page
   */
  createPageAlbum(page_id: string, body: Types.CreateAlbumRequest): Effect.Effect<Types.CreateAlbumResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.CreateAlbumResponse>(`/${page_id}/albums`, body);
  }

  /**
   * Get post by ID
   */
  getPost(post_id: string, options?: { fields?: string }): Effect.Effect<Types.Post, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.Post>(`/${post_id}`, params);
  }

  /**
   * Delete a post
   */
  deletePost(post_id: string): Effect.Effect<Types.DeleteResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.DeleteResponse>(`/${post_id}`);
  }

  /**
   * Get post comments
   */
  getPostComments(post_id: string, options?: { limit?: number; filter?: string }): Effect.Effect<Types.CommentFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.filter !== undefined) params["filter"] = options.filter;
    return yield* client.get<Types.CommentFeed>(`/${post_id}/comments`, params);
  }

  /**
   * Create a comment on post
   */
  createPostComment(post_id: string, body: Types.CreateCommentRequest): Effect.Effect<Types.CreateCommentResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.CreateCommentResponse>(`/${post_id}/comments`, body);
  }

  /**
   * Get post likes
   */
  getPostLikes(post_id: string, options?: { limit?: number }): Effect.Effect<Types.LikesFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return yield* client.get<Types.LikesFeed>(`/${post_id}/likes`, params);
  }

  /**
   * Like a post
   */
  createPostLike(post_id: string): Effect.Effect<Types.LikeResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.LikeResponse>(`/${post_id}/likes`);
  }

  /**
   * Unlike a post
   */
  deletePostLike(post_id: string): Effect.Effect<Types.DeleteResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.DeleteResponse>(`/${post_id}/likes`);
  }

  /**
   * Get post reactions
   */
  getPostReactions(post_id: string, options?: { type?: string; limit?: number }): Effect.Effect<Types.ReactionsFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.type !== undefined) params["type"] = options.type;
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return yield* client.get<Types.ReactionsFeed>(`/${post_id}/reactions`, params);
  }

  /**
   * Get post shares
   */
  getPostShares(post_id: string, options?: { limit?: number }): Effect.Effect<Types.SharesFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return yield* client.get<Types.SharesFeed>(`/${post_id}/shares`, params);
  }

  /**
   * Get post insights
   */
  getPostInsights(post_id: string, options?: { metric?: string }): Effect.Effect<Types.PostInsights, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.metric !== undefined) params["metric"] = options.metric;
    return yield* client.get<Types.PostInsights>(`/${post_id}/insights`, params);
  }

  /**
   * Get photo by ID
   */
  getPhoto(photo_id: string, options?: { fields?: string }): Effect.Effect<Types.Photo, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.Photo>(`/${photo_id}`, params);
  }

  /**
   * Delete a photo
   */
  deletePhoto(photo_id: string): Effect.Effect<Types.DeleteResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.DeleteResponse>(`/${photo_id}`);
  }

  /**
   * Get photo comments
   */
  getPhotoComments(photo_id: string, options?: { limit?: number }): Effect.Effect<Types.CommentFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return yield* client.get<Types.CommentFeed>(`/${photo_id}/comments`, params);
  }

  /**
   * Create a comment on photo
   */
  createPhotoComment(photo_id: string, body: Types.CreateCommentRequest): Effect.Effect<Types.CreateCommentResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.CreateCommentResponse>(`/${photo_id}/comments`, body);
  }

  /**
   * Get photo likes
   */
  getPhotoLikes(photo_id: string, options?: { limit?: number }): Effect.Effect<Types.LikesFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return yield* client.get<Types.LikesFeed>(`/${photo_id}/likes`, params);
  }

  /**
   * Like a photo
   */
  createPhotoLike(photo_id: string): Effect.Effect<Types.LikeResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.LikeResponse>(`/${photo_id}/likes`);
  }

  /**
   * Unlike a photo
   */
  deletePhotoLike(photo_id: string): Effect.Effect<Types.DeleteResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.DeleteResponse>(`/${photo_id}/likes`);
  }

  /**
   * Get album by ID
   */
  getAlbum(album_id: string, options?: { fields?: string }): Effect.Effect<Types.Album, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.Album>(`/${album_id}`, params);
  }

  /**
   * Delete an album
   */
  deleteAlbum(album_id: string): Effect.Effect<Types.DeleteResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.DeleteResponse>(`/${album_id}`);
  }

  /**
   * Get album photos
   */
  getAlbumPhotos(album_id: string, options?: { limit?: number; fields?: string }): Effect.Effect<Types.PhotoFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.PhotoFeed>(`/${album_id}/photos`, params);
  }

  /**
   * Add a photo to album
   */
  addPhotoToAlbum(album_id: string, body: Types.CreatePhotoRequest): Effect.Effect<Types.CreatePhotoResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.CreatePhotoResponse>(`/${album_id}/photos`, body);
  }

  /**
   * Get comment by ID
   */
  getComment(comment_id: string, options?: { fields?: string }): Effect.Effect<Types.Comment, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return yield* client.get<Types.Comment>(`/${comment_id}`, params);
  }

  /**
   * Delete a comment
   */
  deleteComment(comment_id: string): Effect.Effect<Types.DeleteResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.DeleteResponse>(`/${comment_id}`);
  }

  /**
   * Get comment likes
   */
  getCommentLikes(comment_id: string, options?: { limit?: number }): Effect.Effect<Types.LikesFeed, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return yield* client.get<Types.LikesFeed>(`/${comment_id}/likes`, params);
  }

  /**
   * Like a comment
   */
  createCommentLike(comment_id: string): Effect.Effect<Types.LikeResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.LikeResponse>(`/${comment_id}/likes`);
  }

  /**
   * Unlike a comment
   */
  deleteCommentLike(comment_id: string): Effect.Effect<Types.DeleteResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.DeleteResponse>(`/${comment_id}/likes`);
  }

}