// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Trustpilot Business API OpenAPI specification

import { Effect } from "effect";
import { HttpClient } from "@q8t/effect-sdk-base";
import type { HttpError, NetworkError, ParseError } from "@q8t/effect-sdk-base";
import type * as Types from "./types";

export class TrustpilotBusinessApi {
  constructor() {}

  /**
   * Get private business unit reviews
   */
  getPrivateBusinessUnitReviews(businessUnitId: string, params?: { stars?: string; language?: string; state?: string; tag?: string; startDateTime?: string; endDateTime?: string; perPage?: number; page?: number }): Effect.Effect<Types.PrivateReviewsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.stars !== undefined) queryParams["stars"] = params.stars;
    if (params?.language !== undefined) queryParams["language"] = params.language;
    if (params?.state !== undefined) queryParams["state"] = params.state;
    if (params?.tag !== undefined) queryParams["tag"] = params.tag;
    if (params?.startDateTime !== undefined) queryParams["startDateTime"] = params.startDateTime;
    if (params?.endDateTime !== undefined) queryParams["endDateTime"] = params.endDateTime;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params?.page !== undefined) queryParams["page"] = params.page;
    return yield* client.get<Types.PrivateReviewsResponse>(`/private/business-units/${businessUnitId}/reviews`, queryParams);
  }

  /**
   * Post a reply to a review
   */
  replyToReview(reviewId: string, body: Types.ReplyToReview): Effect.Effect<Types.ReplyResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.ReplyResponse>(`/private/reviews/${reviewId}/reply`, body);
  }

  /**
   * Delete a reply to a review
   */
  deleteReviewReply(reviewId: string): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<void>(`/private/reviews/${reviewId}/reply`);
  }

  /**
   * Add tags to a review
   */
  addReviewTags(reviewId: string, body: Types.TagOperation): Effect.Effect<Types.TagsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.TagsResponse>(`/private/reviews/${reviewId}/tags`, body);
  }

  /**
   * Set tags on a review
   */
  setReviewTags(reviewId: string, body: Types.TagOperation): Effect.Effect<Types.TagsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.put<Types.TagsResponse>(`/private/reviews/${reviewId}/tags`, body);
  }

  /**
   * Remove tags from a review
   */
  removeReviewTags(reviewId: string, body: Types.TagOperation): Effect.Effect<Types.TagsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<Types.TagsResponse>(`/private/reviews/${reviewId}/tags`);
  }

  /**
   * Send review invitation email
   */
  sendEmailInvitation(businessUnitId: string, body: Types.EmailInvitation): Effect.Effect<Types.InvitationResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.InvitationResponse>(`/private/business-units/${businessUnitId}/email-invitations`, body, { baseUrl: "https://invitations-api.trustpilot.com/v1" });
  }

  /**
   * Create invitation link
   */
  createInvitationLink(businessUnitId: string, body: Types.InvitationLink): Effect.Effect<Types.InvitationLinkResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.InvitationLinkResponse>(`/private/business-units/${businessUnitId}/invitation-links`, body, { baseUrl: "https://invitations-api.trustpilot.com/v1" });
  }

  /**
   * Get invitation templates
   */
  getInvitationTemplates(businessUnitId: string): Effect.Effect<Types.TemplatesResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<Types.TemplatesResponse>(`/private/business-units/${businessUnitId}/templates`, { baseUrl: "https://invitations-api.trustpilot.com/v1" });
  }

  /**
   * Get private product reviews
   */
  getPrivateProductReviews(businessUnitId: string, params?: { sku?: string[]; productUrl?: string[]; state?: string; perPage?: number; page?: number }): Effect.Effect<Types.PrivateProductReviewsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.sku !== undefined) queryParams["sku"] = params.sku;
    if (params?.productUrl !== undefined) queryParams["productUrl"] = params.productUrl;
    if (params?.state !== undefined) queryParams["state"] = params.state;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params?.page !== undefined) queryParams["page"] = params.page;
    return yield* client.get<Types.PrivateProductReviewsResponse>(`/private/product-reviews/business-units/${businessUnitId}/reviews`, queryParams);
  }

  /**
   * Get product review summaries
   */
  getProductReviewSummaries(businessUnitId: string, params?: { sku?: string[]; productUrl?: string[] }): Effect.Effect<Types.ProductReviewSummariesResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.sku !== undefined) queryParams["sku"] = params.sku;
    if (params?.productUrl !== undefined) queryParams["productUrl"] = params.productUrl;
    return yield* client.get<Types.ProductReviewSummariesResponse>(`/private/product-reviews/business-units/${businessUnitId}/summaries`, queryParams);
  }

  /**
   * Create product review invitation link
   */
  createProductInvitationLink(businessUnitId: string, body: Types.ProductInvitationLink): Effect.Effect<Types.InvitationLinkResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.InvitationLinkResponse>(`/private/product-reviews/business-units/${businessUnitId}/invitation-links`, body, { baseUrl: "https://invitations-api.trustpilot.com/v1" });
  }

  /**
   * Get private products
   */
  getPrivateProducts(businessUnitId: string, params?: { perPage?: number; page?: number }): Effect.Effect<Types.PrivateProductsResponse, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    const queryParams: Record<string, any> = {};
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params?.page !== undefined) queryParams["page"] = params.page;
    return yield* client.get<Types.PrivateProductsResponse>(`/private/business-units/${businessUnitId}/products`, queryParams);
  }

  /**
   * Create private product
   */
  createPrivateProduct(businessUnitId: string, body: Types.PrivateProduct): Effect.Effect<Types.PrivateProduct, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.post<Types.PrivateProduct>(`/private/business-units/${businessUnitId}/products`, body);
  }

  /**
   * Update private product
   */
  updatePrivateProduct(businessUnitId: string, productId: string, body: Types.PrivateProduct): Effect.Effect<Types.PrivateProduct, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.put<Types.PrivateProduct>(`/private/business-units/${businessUnitId}/products/${productId}`, body);
  }

  /**
   * Delete private product
   */
  deletePrivateProduct(businessUnitId: string, productId: string): Effect.Effect<void, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.delete<void>(`/private/business-units/${businessUnitId}/products/${productId}`);
  }

  /**
   * Get consumer profile
   */
  getConsumerProfile(consumerId: string): Effect.Effect<{ id?: unknown; displayName?: unknown; email?: unknown; numberOfReviews?: unknown }, HttpError | NetworkError | ParseError, HttpClient> {
    return Effect.gen(function* () {
      const client = yield* HttpClient;
    return yield* client.get<{ id?: unknown; displayName?: unknown; email?: unknown; numberOfReviews?: unknown }>(`/private/consumers/${consumerId}`);
  }

}