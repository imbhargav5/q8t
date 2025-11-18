// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

import type { HttpClient } from "../src/auth/client";
import type * as Types from "./types";

export class FacebookApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get current user profile
   */
  async getMe(options?: { fields?: string }): Promise<Types.UserProfile> {
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.UserProfile>("/me", params);
  }

  /**
   * Get user by ID
   */
  async getUser(user_id: string, options?: { fields?: string }): Promise<Types.UserProfile> {
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.UserProfile>(`/${user_id}`, params);
  }

  /**
   * Get user posts
   */
  async getUserPosts(user_id: string, options?: { limit?: number; fields?: string }): Promise<Types.PostFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.PostFeed>(`/${user_id}/posts`, params);
  }

  /**
   * Get user photos
   */
  async getUserPhotos(user_id: string, options?: { limit?: number; fields?: string }): Promise<Types.PhotoFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.PhotoFeed>(`/${user_id}/photos`, params);
  }

  /**
   * Upload a photo for user
   */
  async createUserPhoto(user_id: string, body: Types.CreatePhotoRequest): Promise<Types.CreatePhotoResponse> {
    return this.client.post<Types.CreatePhotoResponse>(`/${user_id}/photos`, body);
  }

  /**
   * Get user albums
   */
  async getUserAlbums(user_id: string, options?: { limit?: number; fields?: string }): Promise<Types.AlbumFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.AlbumFeed>(`/${user_id}/albums`, params);
  }

  /**
   * Create an album for user
   */
  async createUserAlbum(user_id: string, body: Types.CreateAlbumRequest): Promise<Types.CreateAlbumResponse> {
    return this.client.post<Types.CreateAlbumResponse>(`/${user_id}/albums`, body);
  }

  /**
   * Get user friends
   */
  async getUserFriends(user_id: string, options?: { limit?: number }): Promise<Types.FriendsFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return this.client.get<Types.FriendsFeed>(`/${user_id}/friends`, params);
  }

  /**
   * Get page by ID
   */
  async getPage(page_id: string, options?: { fields?: string }): Promise<Types.Page> {
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.Page>(`/${page_id}`, params);
  }

  /**
   * Get page feed posts
   */
  async getPageFeed(page_id: string, options?: { limit?: number; fields?: string }): Promise<Types.PageFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.PageFeed>(`/${page_id}/feed`, params);
  }

  /**
   * Create a post on page
   */
  async createPagePost(page_id: string, body: Types.CreatePostRequest): Promise<Types.CreatePostResponse> {
    return this.client.post<Types.CreatePostResponse>(`/${page_id}/feed`, body);
  }

  /**
   * Get page posts
   */
  async getPagePosts(page_id: string, options?: { limit?: number; fields?: string }): Promise<Types.PostFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.PostFeed>(`/${page_id}/posts`, params);
  }

  /**
   * Get page insights and analytics
   */
  async getPageInsights(page_id: string, options?: { metric?: string; period?: string }): Promise<Types.PageInsights> {
    const params: Record<string, any> = {};
    if (options?.metric !== undefined) params["metric"] = options.metric;
    if (options?.period !== undefined) params["period"] = options.period;
    return this.client.get<Types.PageInsights>(`/${page_id}/insights`, params);
  }

  /**
   * Get page photos
   */
  async getPagePhotos(page_id: string, options?: { limit?: number; fields?: string }): Promise<Types.PhotoFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.PhotoFeed>(`/${page_id}/photos`, params);
  }

  /**
   * Upload a photo to page
   */
  async createPagePhoto(page_id: string, body: Types.CreatePhotoRequest): Promise<Types.CreatePhotoResponse> {
    return this.client.post<Types.CreatePhotoResponse>(`/${page_id}/photos`, body);
  }

  /**
   * Get page albums
   */
  async getPageAlbums(page_id: string, options?: { limit?: number; fields?: string }): Promise<Types.AlbumFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.AlbumFeed>(`/${page_id}/albums`, params);
  }

  /**
   * Create an album on page
   */
  async createPageAlbum(page_id: string, body: Types.CreateAlbumRequest): Promise<Types.CreateAlbumResponse> {
    return this.client.post<Types.CreateAlbumResponse>(`/${page_id}/albums`, body);
  }

  /**
   * Get post by ID
   */
  async getPost(post_id: string, options?: { fields?: string }): Promise<Types.Post> {
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.Post>(`/${post_id}`, params);
  }

  /**
   * Delete a post
   */
  async deletePost(post_id: string): Promise<Types.DeleteResponse> {
    return this.client.delete<Types.DeleteResponse>(`/${post_id}`);
  }

  /**
   * Get post comments
   */
  async getPostComments(post_id: string, options?: { limit?: number; filter?: string }): Promise<Types.CommentFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.filter !== undefined) params["filter"] = options.filter;
    return this.client.get<Types.CommentFeed>(`/${post_id}/comments`, params);
  }

  /**
   * Create a comment on post
   */
  async createPostComment(post_id: string, body: Types.CreateCommentRequest): Promise<Types.CreateCommentResponse> {
    return this.client.post<Types.CreateCommentResponse>(`/${post_id}/comments`, body);
  }

  /**
   * Get post likes
   */
  async getPostLikes(post_id: string, options?: { limit?: number }): Promise<Types.LikesFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return this.client.get<Types.LikesFeed>(`/${post_id}/likes`, params);
  }

  /**
   * Like a post
   */
  async createPostLike(post_id: string): Promise<Types.LikeResponse> {
    return this.client.post<Types.LikeResponse>(`/${post_id}/likes`);
  }

  /**
   * Unlike a post
   */
  async deletePostLike(post_id: string): Promise<Types.DeleteResponse> {
    return this.client.delete<Types.DeleteResponse>(`/${post_id}/likes`);
  }

  /**
   * Get post reactions
   */
  async getPostReactions(post_id: string, options?: { type?: string; limit?: number }): Promise<Types.ReactionsFeed> {
    const params: Record<string, any> = {};
    if (options?.type !== undefined) params["type"] = options.type;
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return this.client.get<Types.ReactionsFeed>(`/${post_id}/reactions`, params);
  }

  /**
   * Get post shares
   */
  async getPostShares(post_id: string, options?: { limit?: number }): Promise<Types.SharesFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return this.client.get<Types.SharesFeed>(`/${post_id}/shares`, params);
  }

  /**
   * Get post insights
   */
  async getPostInsights(post_id: string, options?: { metric?: string }): Promise<Types.PostInsights> {
    const params: Record<string, any> = {};
    if (options?.metric !== undefined) params["metric"] = options.metric;
    return this.client.get<Types.PostInsights>(`/${post_id}/insights`, params);
  }

  /**
   * Get photo by ID
   */
  async getPhoto(photo_id: string, options?: { fields?: string }): Promise<Types.Photo> {
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.Photo>(`/${photo_id}`, params);
  }

  /**
   * Delete a photo
   */
  async deletePhoto(photo_id: string): Promise<Types.DeleteResponse> {
    return this.client.delete<Types.DeleteResponse>(`/${photo_id}`);
  }

  /**
   * Get photo comments
   */
  async getPhotoComments(photo_id: string, options?: { limit?: number }): Promise<Types.CommentFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return this.client.get<Types.CommentFeed>(`/${photo_id}/comments`, params);
  }

  /**
   * Create a comment on photo
   */
  async createPhotoComment(photo_id: string, body: Types.CreateCommentRequest): Promise<Types.CreateCommentResponse> {
    return this.client.post<Types.CreateCommentResponse>(`/${photo_id}/comments`, body);
  }

  /**
   * Get photo likes
   */
  async getPhotoLikes(photo_id: string, options?: { limit?: number }): Promise<Types.LikesFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return this.client.get<Types.LikesFeed>(`/${photo_id}/likes`, params);
  }

  /**
   * Like a photo
   */
  async createPhotoLike(photo_id: string): Promise<Types.LikeResponse> {
    return this.client.post<Types.LikeResponse>(`/${photo_id}/likes`);
  }

  /**
   * Unlike a photo
   */
  async deletePhotoLike(photo_id: string): Promise<Types.DeleteResponse> {
    return this.client.delete<Types.DeleteResponse>(`/${photo_id}/likes`);
  }

  /**
   * Get album by ID
   */
  async getAlbum(album_id: string, options?: { fields?: string }): Promise<Types.Album> {
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.Album>(`/${album_id}`, params);
  }

  /**
   * Delete an album
   */
  async deleteAlbum(album_id: string): Promise<Types.DeleteResponse> {
    return this.client.delete<Types.DeleteResponse>(`/${album_id}`);
  }

  /**
   * Get album photos
   */
  async getAlbumPhotos(album_id: string, options?: { limit?: number; fields?: string }): Promise<Types.PhotoFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.PhotoFeed>(`/${album_id}/photos`, params);
  }

  /**
   * Add a photo to album
   */
  async addPhotoToAlbum(album_id: string, body: Types.CreatePhotoRequest): Promise<Types.CreatePhotoResponse> {
    return this.client.post<Types.CreatePhotoResponse>(`/${album_id}/photos`, body);
  }

  /**
   * Get comment by ID
   */
  async getComment(comment_id: string, options?: { fields?: string }): Promise<Types.Comment> {
    const params: Record<string, any> = {};
    if (options?.fields !== undefined) params["fields"] = options.fields;
    return this.client.get<Types.Comment>(`/${comment_id}`, params);
  }

  /**
   * Delete a comment
   */
  async deleteComment(comment_id: string): Promise<Types.DeleteResponse> {
    return this.client.delete<Types.DeleteResponse>(`/${comment_id}`);
  }

  /**
   * Get comment likes
   */
  async getCommentLikes(comment_id: string, options?: { limit?: number }): Promise<Types.LikesFeed> {
    const params: Record<string, any> = {};
    if (options?.limit !== undefined) params["limit"] = options.limit;
    return this.client.get<Types.LikesFeed>(`/${comment_id}/likes`, params);
  }

  /**
   * Like a comment
   */
  async createCommentLike(comment_id: string): Promise<Types.LikeResponse> {
    return this.client.post<Types.LikeResponse>(`/${comment_id}/likes`);
  }

  /**
   * Unlike a comment
   */
  async deleteCommentLike(comment_id: string): Promise<Types.DeleteResponse> {
    return this.client.delete<Types.DeleteResponse>(`/${comment_id}/likes`);
  }

}