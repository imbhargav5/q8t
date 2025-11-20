// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Trustpilot Business API OpenAPI specification

import type { HttpClient } from "../../src/auth/http-client";
import type * as Types from "./types";

export class TrustpilotBusinessApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get private business unit reviews
   */
  async getPrivateBusinessUnitReviews(businessUnitId: string, params?: { stars?: string; language?: string; state?: string; tag?: string; startDateTime?: string; endDateTime?: string; perPage?: number; page?: number }): Promise<Types.PrivateReviewsResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.stars !== undefined) queryParams["stars"] = params.stars;
    if (params?.language !== undefined) queryParams["language"] = params.language;
    if (params?.state !== undefined) queryParams["state"] = params.state;
    if (params?.tag !== undefined) queryParams["tag"] = params.tag;
    if (params?.startDateTime !== undefined) queryParams["startDateTime"] = params.startDateTime;
    if (params?.endDateTime !== undefined) queryParams["endDateTime"] = params.endDateTime;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params?.page !== undefined) queryParams["page"] = params.page;
    return this.client.get<Types.PrivateReviewsResponse>(`/private/business-units/${businessUnitId}/reviews`, queryParams);
  }

  /**
   * Post a reply to a review
   */
  async replyToReview(reviewId: string, body: Types.ReplyToReview): Promise<Types.ReplyResponse> {
    return this.client.post<Types.ReplyResponse>(`/private/reviews/${reviewId}/reply`, body);
  }

  /**
   * Delete a reply to a review
   */
  async deleteReviewReply(reviewId: string): Promise<void> {
    return this.client.delete<void>(`/private/reviews/${reviewId}/reply`);
  }

  /**
   * Add tags to a review
   */
  async addReviewTags(reviewId: string, body: Types.TagOperation): Promise<Types.TagsResponse> {
    return this.client.post<Types.TagsResponse>(`/private/reviews/${reviewId}/tags`, body);
  }

  /**
   * Set tags on a review
   */
  async setReviewTags(reviewId: string, body: Types.TagOperation): Promise<Types.TagsResponse> {
    return this.client.put<Types.TagsResponse>(`/private/reviews/${reviewId}/tags`, body);
  }

  /**
   * Remove tags from a review
   */
  async removeReviewTags(reviewId: string, body: Types.TagOperation): Promise<Types.TagsResponse> {
    return this.client.delete<Types.TagsResponse>(`/private/reviews/${reviewId}/tags`);
  }

  /**
   * Send review invitation email
   */
  async sendEmailInvitation(businessUnitId: string, body: Types.EmailInvitation): Promise<Types.InvitationResponse> {
    return this.client.post<Types.InvitationResponse>(`/private/business-units/${businessUnitId}/email-invitations`, body, { baseUrl: "https://invitations-api.trustpilot.com/v1" });
  }

  /**
   * Create invitation link
   */
  async createInvitationLink(businessUnitId: string, body: Types.InvitationLink): Promise<Types.InvitationLinkResponse> {
    return this.client.post<Types.InvitationLinkResponse>(`/private/business-units/${businessUnitId}/invitation-links`, body, { baseUrl: "https://invitations-api.trustpilot.com/v1" });
  }

  /**
   * Get invitation templates
   */
  async getInvitationTemplates(businessUnitId: string): Promise<Types.TemplatesResponse> {
    return this.client.get<Types.TemplatesResponse>(`/private/business-units/${businessUnitId}/templates`, { baseUrl: "https://invitations-api.trustpilot.com/v1" });
  }

  /**
   * Get private product reviews
   */
  async getPrivateProductReviews(businessUnitId: string, params?: { sku?: string[]; productUrl?: string[]; state?: string; perPage?: number; page?: number }): Promise<Types.PrivateProductReviewsResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.sku !== undefined) queryParams["sku"] = params.sku;
    if (params?.productUrl !== undefined) queryParams["productUrl"] = params.productUrl;
    if (params?.state !== undefined) queryParams["state"] = params.state;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params?.page !== undefined) queryParams["page"] = params.page;
    return this.client.get<Types.PrivateProductReviewsResponse>(`/private/product-reviews/business-units/${businessUnitId}/reviews`, queryParams);
  }

  /**
   * Get product review summaries
   */
  async getProductReviewSummaries(businessUnitId: string, params?: { sku?: string[]; productUrl?: string[] }): Promise<Types.ProductReviewSummariesResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.sku !== undefined) queryParams["sku"] = params.sku;
    if (params?.productUrl !== undefined) queryParams["productUrl"] = params.productUrl;
    return this.client.get<Types.ProductReviewSummariesResponse>(`/private/product-reviews/business-units/${businessUnitId}/summaries`, queryParams);
  }

  /**
   * Create product review invitation link
   */
  async createProductInvitationLink(businessUnitId: string, body: Types.ProductInvitationLink): Promise<Types.InvitationLinkResponse> {
    return this.client.post<Types.InvitationLinkResponse>(`/private/product-reviews/business-units/${businessUnitId}/invitation-links`, body, { baseUrl: "https://invitations-api.trustpilot.com/v1" });
  }

  /**
   * Get private products
   */
  async getPrivateProducts(businessUnitId: string, params?: { perPage?: number; page?: number }): Promise<Types.PrivateProductsResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params?.page !== undefined) queryParams["page"] = params.page;
    return this.client.get<Types.PrivateProductsResponse>(`/private/business-units/${businessUnitId}/products`, queryParams);
  }

  /**
   * Create private product
   */
  async createPrivateProduct(businessUnitId: string, body: Types.PrivateProduct): Promise<Types.PrivateProduct> {
    return this.client.post<Types.PrivateProduct>(`/private/business-units/${businessUnitId}/products`, body);
  }

  /**
   * Update private product
   */
  async updatePrivateProduct(businessUnitId: string, productId: string, body: Types.PrivateProduct): Promise<Types.PrivateProduct> {
    return this.client.put<Types.PrivateProduct>(`/private/business-units/${businessUnitId}/products/${productId}`, body);
  }

  /**
   * Delete private product
   */
  async deletePrivateProduct(businessUnitId: string, productId: string): Promise<void> {
    return this.client.delete<void>(`/private/business-units/${businessUnitId}/products/${productId}`);
  }

  /**
   * Get consumer profile
   */
  async getConsumerProfile(consumerId: string): Promise<{ id?: unknown; displayName?: unknown; email?: unknown; numberOfReviews?: unknown }> {
    return this.client.get<{ id?: unknown; displayName?: unknown; email?: unknown; numberOfReviews?: unknown }>(`/private/consumers/${consumerId}`);
  }

}