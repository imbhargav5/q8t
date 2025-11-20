// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from Trustpilot Public API OpenAPI specification

import type { HttpClient } from "../../src/auth/http-client";
import type * as Types from "./types";

export class TrustpilotPublicApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get a business unit by ID
   */
  async getBusinessUnit(businessUnitId: string): Promise<Types.BusinessUnit> {
    return this.client.get<Types.BusinessUnit>(`/business-units/${businessUnitId}`);
  }

  /**
   * Find a business unit by domain
   */
  async findBusinessUnit(params?: { name?: string }): Promise<Types.BusinessUnit> {
    const queryParams: Record<string, any> = {};
    if (params?.name !== undefined) queryParams["name"] = params.name;
    return this.client.get<Types.BusinessUnit>("/business-units/find", queryParams);
  }

  /**
   * Search for business units
   */
  async searchBusinessUnits(params?: { query?: string; country?: string; perPage?: number }): Promise<{ businessUnits?: Types.BusinessUnit[] }> {
    const queryParams: Record<string, any> = {};
    if (params?.query !== undefined) queryParams["query"] = params.query;
    if (params?.country !== undefined) queryParams["country"] = params.country;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    return this.client.get<{ businessUnits?: Types.BusinessUnit[] }>("/business-units/search", queryParams);
  }

  /**
   * Get reviews for a business unit
   */
  async getBusinessUnitReviews(businessUnitId: string, params?: { stars?: string; language?: string; perPage?: number; page?: number; orderBy?: string }): Promise<Types.ReviewsResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.stars !== undefined) queryParams["stars"] = params.stars;
    if (params?.language !== undefined) queryParams["language"] = params.language;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params?.page !== undefined) queryParams["page"] = params.page;
    if (params?.orderBy !== undefined) queryParams["orderBy"] = params.orderBy;
    return this.client.get<Types.ReviewsResponse>(`/business-units/${businessUnitId}/reviews`, queryParams);
  }

  /**
   * Get web links for a business unit
   */
  async getBusinessUnitWebLinks(businessUnitId: string, params?: { locale?: string }): Promise<{ profileUrl?: unknown }> {
    const queryParams: Record<string, any> = {};
    if (params?.locale !== undefined) queryParams["locale"] = params.locale;
    return this.client.get<{ profileUrl?: unknown }>(`/business-units/${businessUnitId}/web-links`, queryParams);
  }

  /**
   * Get company logo
   */
  async getBusinessUnitLogo(businessUnitId: string): Promise<{ logoUrl?: unknown }> {
    return this.client.get<{ logoUrl?: unknown }>(`/business-units/${businessUnitId}/images/logo`);
  }

  /**
   * Get reviews by a consumer
   */
  async getConsumerReviews(consumerId: string, params?: { stars?: string; language?: string; perPage?: number; page?: number }): Promise<Types.ReviewsResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.stars !== undefined) queryParams["stars"] = params.stars;
    if (params?.language !== undefined) queryParams["language"] = params.language;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params?.page !== undefined) queryParams["page"] = params.page;
    return this.client.get<Types.ReviewsResponse>(`/consumers/${consumerId}/reviews`, queryParams);
  }

  /**
   * Get all categories
   */
  async getCategories(params?: { country?: string; locale?: string }): Promise<Types.CategoriesResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.country !== undefined) queryParams["country"] = params.country;
    if (params?.locale !== undefined) queryParams["locale"] = params.locale;
    return this.client.get<Types.CategoriesResponse>("/categories", queryParams);
  }

  /**
   * Get a specific category
   */
  async getCategory(categoryId: string, params?: { locale?: string }): Promise<Types.Category> {
    const queryParams: Record<string, any> = {};
    if (params?.locale !== undefined) queryParams["locale"] = params.locale;
    return this.client.get<Types.Category>(`/categories/${categoryId}`, queryParams);
  }

  /**
   * Get business units in a category
   */
  async getCategoryBusinessUnits(categoryId: string, params?: { country?: string; perPage?: number }): Promise<{ businessUnits?: Types.BusinessUnit[] }> {
    const queryParams: Record<string, any> = {};
    if (params?.country !== undefined) queryParams["country"] = params.country;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    return this.client.get<{ businessUnits?: Types.BusinessUnit[] }>(`/categories/${categoryId}/business-units`, queryParams);
  }

  /**
   * Get supported locales
   */
  async getLocales(): Promise<Types.Locale[]> {
    return this.client.get<Types.Locale[]>("/resources/metadata/locales");
  }

  /**
   * Get countries
   */
  async getCountries(params?: { translationLocale?: string }): Promise<Types.Country[]> {
    const queryParams: Record<string, any> = {};
    if (params?.translationLocale !== undefined) queryParams["translationLocale"] = params.translationLocale;
    return this.client.get<Types.Country[]>("/resources/metadata/countries", queryParams);
  }

  /**
   * Get image resources
   */
  async getImageResources(): Promise<Types.ImageResources> {
    return this.client.get<Types.ImageResources>("/resources/images");
  }

  /**
   * Get localized star rating text
   */
  async getStarRatingString(stars: string, params?: { locale?: string }): Promise<{ text?: unknown }> {
    const queryParams: Record<string, any> = {};
    if (params?.locale !== undefined) queryParams["locale"] = params.locale;
    return this.client.get<{ text?: unknown }>(`/resources/strings/stars/${stars}`, queryParams);
  }

  /**
   * Get public product reviews
   */
  async getProductReviews(businessUnitId: string, params?: { sku?: string; productUrl?: string; perPage?: number; page?: number }): Promise<Types.ProductReviewsResponse> {
    const queryParams: Record<string, any> = {};
    if (params?.sku !== undefined) queryParams["sku"] = params.sku;
    if (params?.productUrl !== undefined) queryParams["productUrl"] = params.productUrl;
    if (params?.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params?.page !== undefined) queryParams["page"] = params.page;
    return this.client.get<Types.ProductReviewsResponse>(`/product-reviews/business-units/${businessUnitId}/reviews`, queryParams);
  }

  /**
   * Get a specific product review
   */
  async getProductReview(businessUnitId: string, reviewId: string): Promise<Types.ProductReview> {
    return this.client.get<Types.ProductReview>(`/product-reviews/business-units/${businessUnitId}/reviews/${reviewId}`);
  }

}